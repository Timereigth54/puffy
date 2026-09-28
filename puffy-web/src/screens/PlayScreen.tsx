import { useCallback, useEffect, useRef, useState } from 'react'
import Bathroom from '../components/Bathroom'
import Puffy from '../components/Puffy'
import IdeaArt from '../components/IdeaArt'
import ResultArt from '../components/ResultArt'
import SnackArt from '../components/SnackArt'
import { BookIcon, DuckIcon } from '../components/Icons'
import { ELEMENTS, ELEMENT_MAP, VOICE, normalizeKey } from '../data/content'
import {
  bank,
  discoveryScript,
  easyWin,
  focusedTray,
  hintFor,
  hintLine,
  lonerSequence,
  resolve,
  sameLine,
  spicyScript,
  type SillySequence,
} from '../game/engine'
import { say, sfx, stopVoice, wait } from '../game/audio'
import { textForLevel } from '../game/store'
import type { Combo, Element, Progress, PuffyState, Settings } from '../game/types'

interface Props {
  settings: Settings
  progress: Progress
  evening: number
  guided?: boolean
  onFeed: (elementId: string) => void
  onDiscover: (combo: Combo) => void
  onHome: () => void
  onBook: () => void
  onGuidedDone?: () => void
}

type Drag = { el: Element; x: number; y: number; startX: number; startY: number; moved: boolean; pointerId: number }
/** A tapped snack on its way into Puffy's mouth, in stage pixels. */
type Flight = { key: number; el: Element; sx: number; sy: number; dx: number; dy: number }
type Show =
  | { kind: 'discovery'; combo: Combo; firstTime: boolean; flying: boolean }
  | { kind: 'thought'; seq: SillySequence; pair: Element[]; popped: boolean }
  | { kind: 'spicy'; name: string; formula: string }
  | { kind: 'same'; element: Element }
  | null

const FULL_TRAY = ELEMENTS.map((e) => e.id)
const DRAG_THRESHOLD = 12
const FLIGHT_MS = 560

export default function PlayScreen({ settings, progress, evening, guided, onFeed, onDiscover, onHome, onBook, onGuidedDone }: Props) {
  const [puffy, setPuffy] = useState<PuffyState>('idle')
  const [chewBeat, setChewBeat] = useState(0)
  const [fed, setFed] = useState<Element[]>([])
  const [spat, setSpat] = useState<Element[]>([])
  const [busy, setBusy] = useState(false)
  const [drag, setDrag] = useState<Drag | null>(null)
  const [lean, setLean] = useState<{ x: number; y: number } | null>(null)
  const [flights, setFlights] = useState<Flight[]>([])
  const [tapped, setTapped] = useState<string | null>(null)
  const [show, setShow] = useState<Show>(null)
  const [highlight, setHighlight] = useState<string[]>(guided ? ['H', 'O'] : [])
  const [tray, setTray] = useState<string[]>(FULL_TRAY)
  const [splashAt, setSplashAt] = useState<number | null>(null)
  /** Last resolved outcome, kept on the stage as data-outcome for tests and debugging. */
  const [lastOutcome, setLastOutcome] = useState<string>('none')

  const stageRef = useRef<HTMLDivElement>(null)
  const puffyRef = useRef<HTMLDivElement>(null)
  const alive = useRef(true)
  const busyRef = useRef(false)
  const fedRef = useRef<Element[]>([])
  const inFlight = useRef(0)
  const progressRef = useRef(progress)
  const settingsRef = useRef(settings)
  const attempts = useRef<Record<string, number>>({})
  const missesInRow = useRef(0)
  const lastTouch = useRef(0)
  const lastDiscovery = useRef(0)
  const idleSpoken = useRef(false)
  const firstGrab = useRef(true)

  useEffect(() => {
    progressRef.current = progress
    settingsRef.current = settings
  }, [progress, settings])

  const level = settings.level
  const text = textForLevel(level)
  const showWords = text !== 'off'

  useEffect(() => {
    alive.current = true
    lastTouch.current = Date.now()
    lastDiscovery.current = Date.now()
    return () => {
      alive.current = false
      stopVoice()
    }
  }, [])

  const setBusyBoth = (b: boolean) => {
    busyRef.current = b
    setBusy(b)
  }

  const touch = () => {
    lastTouch.current = Date.now()
    idleSpoken.current = false
  }

  // Idle nudge after 15 s; easy-win highlight after 3 min without a discovery.
  useEffect(() => {
    const iv = window.setInterval(() => {
      if (busyRef.current || drag) return
      const idle = Date.now() - lastTouch.current
      if (idle > 15000 && !idleSpoken.current) {
        idleSpoken.current = true
        const lv = settingsRef.current.level
        void say([bank.pick(`idle${lv}`, VOICE[lv].idle)])
      }
      if (Date.now() - lastDiscovery.current > 180000) {
        const win = easyWin(progressRef.current.discovered, tray)
        if (win) setHighlight(win.inputs)
        lastDiscovery.current = Date.now()
      }
    }, 1000)
    return () => window.clearInterval(iv)
  }, [drag, tray])

  // ─── Outcome sequences ────────────────────────────────────────────────────
  const finish = useCallback(() => {
    if (!alive.current) return
    fedRef.current = []
    setFed([])
    setShow(null)
    setPuffy('idle')
    setBusyBoth(false)
    touch()
  }, [])

  const spitBack = (pair: Element[]) => {
    setSpat(pair)
    sfx.spit(settingsRef.current.spitSound === 'sweet')
    fedRef.current = []
    setFed([])
    window.setTimeout(() => {
      if (!alive.current) return
      setSpat([])
      sfx.splash()
      setSplashAt(Date.now())
    }, 650)
  }

  const runDiscovery = async (combo: Combo, firstTime: boolean) => {
    setPuffy('spitting')
    sfx.spit(settingsRef.current.spitSound === 'sweet')
    fedRef.current = []
    setFed([])
    await wait(320)
    if (!alive.current) return
    setShow({ kind: 'discovery', combo, firstTime, flying: false })
    setPuffy(firstTime ? 'proud' : 'delighted')
    if (firstTime) {
      sfx.fanfare(combo.celebration === 'large')
      sfx.sparkle()
    } else {
      sfx.giggle()
      sfx.chime()
    }
    onDiscover(combo)
    // eslint-disable-next-line react-hooks/purity -- runs from a tap or timer, never during render
    lastDiscovery.current = Date.now()
    missesInRow.current = 0
    setTray(FULL_TRAY)
    setHighlight([])
    await Promise.all([say(discoveryScript(combo, firstTime, settingsRef.current.level)), wait(2200)])
    if (!alive.current) return
    if (firstTime) {
      setShow({ kind: 'discovery', combo, firstTime, flying: true })
      sfx.bubble()
      await wait(700)
    }
    finish()
    if (guided) onGuidedDone?.()
  }

  const runLoner = async (noble: Element, other: Element, pair: Element[]) => {
    const seq = lonerSequence(noble, other, settingsRef.current.level)
    setPuffy('curious')
    setShow({ kind: 'thought', seq, pair, popped: false })
    sfx.think()
    await say([seq.thinking, seq.idea, seq.silly])
    if (!alive.current) return
    sfx.pop()
    setShow({ kind: 'thought', seq, pair, popped: true })
    setPuffy('shrug')
    spitBack(pair)
    await say([seq.rejection, seq.reason].filter(Boolean))
    if (!alive.current) return
    setShow(null)
    // Sad lasts 0.8 s at most, then Puffy bounces back.
    setPuffy('sad')
    sfx.sad()
    await wait(800)
    if (!alive.current) return
    setPuffy('encouraging')
    sfx.boing()
    await say([seq.encouragement])
    await maybeHint(pair)
    finish()
  }

  const runSpicy = async (spicy: { name: string; formula: string; inputs: [string, string]; why: string }, pair: Element[]) => {
    setPuffy('spicy')
    sfx.spicy()
    setShow({ kind: 'spicy', name: spicy.name, formula: spicy.formula })
    spitBack(pair)
    await Promise.all([say(spicyScript(spicy, settingsRef.current.level)), wait(1600)])
    if (!alive.current) return
    setShow(null)
    setPuffy('encouraging')
    sfx.boing()
    await wait(500)
    await maybeHint(pair)
    finish()
  }

  const runSame = async (element: Element, pair: Element[]) => {
    setPuffy('shrug')
    setShow({ kind: 'same', element })
    await say([sameLine(element, settingsRef.current.level)])
    if (!alive.current) return
    spitBack(pair)
    setPuffy('encouraging')
    sfx.boing()
    await wait(700)
    await maybeHint(pair)
    finish()
  }

  const maybeHint = async (pair: Element[]) => {
    const key = normalizeKey(pair.map((e) => e.id))
    const n = (attempts.current[key] = (attempts.current[key] ?? 0) + 1)
    missesInRow.current += 1
    if (missesInRow.current >= 5) setTray((t) => (t.length > 4 ? focusedTray(FULL_TRAY, progressRef.current.discovered, 4) : t))
    const mode = settingsRef.current.hints
    // eslint-disable-next-line react-hooks/purity -- runs from a tap or timer, never during render
    const wantHint = mode !== 'never' && (n === 3 || missesInRow.current === 4) && (mode === 'always' || Math.random() < 0.5)
    if (!wantHint) return
    const hint = hintFor(pair.map((e) => e.id), progressRef.current.discovered, tray)
    if (!hint) return
    setHighlight(hint.inputs)
    const line = hintLine(hint, settingsRef.current.level)
    if (line) await say([line])
  }

  const chewAndDecide = async (pair: Element[]) => {
    setBusyBoth(true)
    setPuffy('chewing')
    for (let beat = 0; beat < 3; beat++) {
      setChewBeat(beat)
      sfx.chew(beat)
      // eslint-disable-next-line react-hooks/purity -- runs from a tap or timer, never during render
      await wait(380 + Math.random() * 90)
      if (!alive.current) return
    }
    setPuffy('thinking')
    sfx.think()
    await wait(560)
    if (!alive.current) return
    // Digested: the belly window empties before the answer appears.
    setFed([])
    const outcome = resolve(pair.map((e) => e.id), progressRef.current.discovered)
    setLastOutcome(outcome.kind)
    switch (outcome.kind) {
      case 'discovery':
        return runDiscovery(outcome.combo, outcome.firstTime)
      case 'loner':
        return runLoner(outcome.noble, outcome.other, pair)
      case 'spicy':
        return runSpicy(outcome.spicy, pair)
      case 'same':
        return runSame(outcome.element, pair)
      case 'unknown':
        setPuffy('curious')
        await say([VOICE[settingsRef.current.level].unknown])
        spitBack(pair)
        finish()
    }
  }

  const feed = (el: Element) => {
    if (busyRef.current || fedRef.current.length >= 2) return
    touch()
    setHighlight((h) => (guided ? h : []))
    const next = [...fedRef.current, el]
    fedRef.current = next
    setFed(next)
    onFeed(el.id)
    sfx.gulp()
    setPuffy('gulp')
    if (next.length === 2) {
      busyRef.current = true
      window.setTimeout(() => void chewAndDecide(next), 320)
    } else {
      window.setTimeout(() => alive.current && !busyRef.current && setPuffy('idle'), 420)
    }
  }

  // ─── Input: tap sends a snack flying into Puffy; drag still works ─────────
  const stagePoint = (clientX: number, clientY: number) => {
    const r = stageRef.current!.getBoundingClientRect()
    return { x: clientX - r.left, y: clientY - r.top }
  }

  const mouthPoint = () => {
    const r = puffyRef.current!.getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + r.height * 0.62 }
  }

  const overMouth = (clientX: number, clientY: number) => {
    const r = puffyRef.current?.getBoundingClientRect()
    if (!r) return false
    const cx = r.left + r.width / 2
    const cy = r.top + r.height * 0.55
    // Generous drop zone: all of Puffy's body counts, but not the wall below it.
    return Math.hypot((clientX - cx) / (r.width * 0.5), (clientY - cy) / (r.height * 0.46)) < 1
  }

  const leanToward = (clientX: number, clientY: number) => {
    const r = puffyRef.current?.getBoundingClientRect()
    if (!r) return
    setLean({ x: clientX - (r.left + r.width / 2), y: clientY - (r.top + r.height / 2) })
  }

  /** One tap: the snack bounces, then flies in an arc into Puffy's open mouth. */
  const launch = (el: Element, from: DOMRect) => {
    if (busyRef.current || fedRef.current.length + inFlight.current >= 2) {
      sfx.tap()
      return
    }
    inFlight.current += 1
    const start = stagePoint(from.left + from.width / 2, from.top + from.height / 2)
    const m = mouthPoint()
    const end = stagePoint(m.x, m.y)
    // eslint-disable-next-line react-hooks/purity -- runs from a tap or timer, never during render
    const flight: Flight = { key: Date.now() + Math.random(), el, sx: start.x, sy: start.y, dx: end.x - start.x, dy: end.y - start.y }
    setTapped(el.id)
    window.setTimeout(() => setTapped((t) => (t === el.id ? null : t)), 360)
    sfx.boing()
    setPuffy('hungry')
    setFlights((f) => [...f, flight])
    window.setTimeout(() => {
      inFlight.current -= 1
      if (!alive.current) return
      setFlights((f) => f.filter((x) => x.key !== flight.key))
      feed(el)
    }, FLIGHT_MS)
  }

  const onSnackDown = (el: Element) => (e: React.PointerEvent) => {
    if (busyRef.current) {
      sfx.tap()
      return
    }
    e.preventDefault()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    const p = stagePoint(e.clientX, e.clientY)
    setDrag({ el, x: p.x, y: p.y, startX: e.clientX, startY: e.clientY, moved: false, pointerId: e.pointerId })
    touch()
    sfx.grab()
    const v = VOICE[settingsRef.current.level]
    if (firstGrab.current) {
      firstGrab.current = false
      void say([v.firstGrab])
    } else if (Math.random() < 0.3) {
      void say([bank.pick(`grab${settingsRef.current.level}`, v.grab)])
    }
  }

  const onSnackMove = (e: React.PointerEvent) => {
    if (!drag || e.pointerId !== drag.pointerId) return
    const moved = drag.moved || Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > DRAG_THRESHOLD
    const p = stagePoint(e.clientX, e.clientY)
    setDrag({ ...drag, x: p.x, y: p.y, moved })
    if (moved) {
      if (fedRef.current.length < 2) setPuffy('hungry')
      leanToward(e.clientX, e.clientY)
    }
  }

  const onSnackUp = (e: React.PointerEvent) => {
    if (!drag || e.pointerId !== drag.pointerId) return
    const d = drag
    setDrag(null)
    setLean(null)
    if (!d.moved) {
      launch(d.el, (e.currentTarget as HTMLElement).getBoundingClientRect())
      return
    }
    if (overMouth(e.clientX, e.clientY)) {
      feed(d.el)
    } else {
      // Dropped away from Puffy: the snack floats back to its spot. Never a penalty.
      sfx.plop()
      if (!busyRef.current) setPuffy('idle')
    }
  }

  const onPuffyTap = () => {
    if (busyRef.current) return
    sfx.giggle()
    setPuffy('delighted')
    window.setTimeout(() => alive.current && !busyRef.current && setPuffy('idle'), 700)
  }

  return (
    <Bathroom evening={evening} bubbles className={`play ${busy ? 'is-busy' : ''}`} tub={splashAt ? <span key={splashAt} className="tub-splash" aria-hidden="true" /> : null}>
      <div className="play-stage" ref={stageRef} data-outcome={lastOutcome} onPointerMove={drag ? onSnackMove : undefined}>
        <button type="button" className="corner-tile corner-tile--left" onClick={onHome} aria-label="Home">
          <DuckIcon />
        </button>
        <button type="button" className={`corner-tile corner-tile--right ${show?.kind === 'discovery' && show.flying ? 'is-receiving' : ''}`} onClick={onBook} aria-label="Discovery book">
          <BookIcon />
        </button>

        <div className="puffy-anchor" ref={puffyRef}>
          <Puffy state={puffy} chewBeat={chewBeat} fed={fed} lean={lean} sparkle={progress.discovered.length >= 9} onTap={onPuffyTap} />
          {spat.map((el, i) => (
            <div key={el.id + i} className={`spat spat--${i}`} aria-hidden="true">
              <SnackArt element={el} mood="sleepy" />
            </div>
          ))}
        </div>

        {/* Snacks float, each around its own home spot in an arc under Puffy */}
        {tray.map((id) => {
          const el = ELEMENT_MAP[id]
          const slot = ELEMENTS.indexOf(el)
          const isDragging = drag?.el.id === el.id && drag.moved
          return (
            <button
              key={el.id}
              type="button"
              className={`snack float-slot float-slot--${slot} ${isDragging ? 'is-dragging' : ''} ${tapped === el.id ? 'is-tapped' : ''} ${highlight.includes(el.id) ? 'is-hinted' : ''}`}
              style={{ '--i': slot } as React.CSSProperties}
              aria-label={el.name}
              onPointerDown={onSnackDown(el)}
              onPointerMove={onSnackMove}
              onPointerUp={onSnackUp}
              onPointerCancel={onSnackUp}
            >
              <span className="snack__drift">
                <span className="snack__bob">
                  <SnackArt element={el} showSymbol={showWords} />
                </span>
              </span>
            </button>
          )
        })}

        {flights.map((f) => (
          <div
            key={f.key}
            className="flight"
            style={{ left: f.sx, top: f.sy, '--dx': `${f.dx}px`, '--dy': `${f.dy}px`, animationDuration: `${FLIGHT_MS}ms` } as React.CSSProperties}
            aria-hidden="true"
          >
            <SnackArt element={f.el} showSymbol={showWords} mood="happy" />
          </div>
        ))}

        {show?.kind === 'discovery' && (
          <div className={`discovery ${show.flying ? 'is-flying' : ''} ${show.firstTime ? 'is-first' : ''}`}>
            <div className="discovery__splash" aria-hidden="true" />
            <ResultArt art={show.combo.result.art} className="discovery__art" />
            {showWords && (
              <div className="discovery__label">
                <span className="discovery__name">{show.combo.result.displayName}</span>
                {text === 'formulas' && <span className="discovery__formula">{show.combo.result.formula}</span>}
              </div>
            )}
            {show.firstTime && (
              <div className="confetti" aria-hidden="true">
                {CONFETTI.map((c, i) => (
                  <span key={i} style={{ '--x': `${c[0]}px`, '--y': `${c[1]}px`, '--r': `${c[2]}deg`, background: c[3], animationDelay: `${(i % 6) * 40}ms` } as React.CSSProperties} />
                ))}
              </div>
            )}
          </div>
        )}

        {show?.kind === 'thought' && (
          <div className={`thought ${show.popped ? 'is-popped' : ''}`} aria-live="polite">
            <span className="thought__stem thought__stem--1" aria-hidden="true" />
            <span className="thought__stem thought__stem--2" aria-hidden="true" />
            <div className="thought__bubble">
              <div className="thought__idea" aria-hidden="true">
                <IdeaArt art={show.seq.art} />
              </div>
              <div className="thought__dance" aria-hidden="true">
                {show.pair.map((el, i) => (
                  <span key={i} className={`thought__snack thought__snack--${i}`}>
                    <SnackArt element={el} mood="happy" />
                  </span>
                ))}
              </div>
              {showWords && <p className="thought__text">{show.seq.idea}</p>}
            </div>
          </div>
        )}

        {show?.kind === 'spicy' && showWords && (
          <div className="caption caption--spicy">
            {show.name} {text === 'formulas' && <span className="caption__formula">{show.formula}</span>}
          </div>
        )}
        {show?.kind === 'same' && showWords && <div className="caption">Still {show.element.name.toLowerCase()}!</div>}

        {guided && !busy && !drag && flights.length === 0 && (
          <div className={`guide-ghost guide-ghost--${fed.length === 0 ? 'first' : 'second'}`} aria-hidden="true">
            <SnackArt element={ELEMENT_MAP[fed.length === 0 ? 'H' : 'O']} mood="happy" />
          </div>
        )}

        {drag?.moved && (
          <div className="drag-ghost" style={{ left: drag.x, top: drag.y }} aria-hidden="true">
            <SnackArt element={drag.el} showSymbol={showWords} mood="happy" />
          </div>
        )}
      </div>
    </Bathroom>
  )
}

// [x, y, rotation, colour]: a fixed burst so it never jitters between renders.
const CONFETTI: [number, number, number, string][] = [
  [-180, -120, 40, '#FFD966'], [-140, -170, -30, '#7FD4FF'], [-90, -200, 60, '#7FD48F'], [-30, -220, -50, '#FF8FBF'],
  [30, -215, 20, '#C9A227'], [90, -195, -70, '#FFD966'], [140, -165, 35, '#7FD4FF'], [185, -115, -20, '#FF8FBF'],
  [-200, -40, 80, '#7FD48F'], [200, -50, -80, '#FFD966'], [-160, 40, 15, '#FF8FBF'], [165, 30, -15, '#7FD4FF'],
  [-60, -150, 90, '#C9A227'], [60, -140, -90, '#7FD48F'], [0, -180, 45, '#FFD966'], [-110, -80, -35, '#7FD4FF'],
]
