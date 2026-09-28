import { useCallback, useEffect, useRef, useState } from 'react'
import Puffy from '../components/Puffy'
import Snack from '../components/Snack'
import { ELEMENTS } from '../data/content'
import {
  resolve,
  generateInvalidLine,
  generateNobleLine,
  hintFor,
  easyWin,
  normalizeKey,
  type InvalidLine,
} from '../game/engine'
import { sfx, narrate, stopNarration, setVoiceEnabled } from '../game/sfx'
import type { Combo, Element, Progress, PuffyState, Settings } from '../game/types'

interface PlayScreenProps {
  settings: Settings
  progress: Progress
  onDiscover: (comboId: string, elementIds: string[]) => void
  onAttempts: (pairKey: string) => void
  onTick: (seconds: number) => void
  onTimeUp: () => void
  onExit: () => void
}

interface Overlay {
  kind: 'success'
  combo: Combo
  isFirstTime: boolean
}

export default function PlayScreen({
  settings,
  progress,
  onDiscover,
  onAttempts,
  onTick,
  onTimeUp,
  onExit,
}: PlayScreenProps) {
  const [puffyState, setPuffyState] = useState<PuffyState>('idle')
  const [chewBeat, setChewBeat] = useState(0)
  const [slots, setSlots] = useState<Element[]>([])
  const [held, setHeld] = useState<Element[]>([]) // tap-tap holding area
  const [overlay, setOverlay] = useState<Overlay | null>(null)
  const [thought, setThought] = useState<InvalidLine | null>(null)
  const [confetti, setConfetti] = useState(false)
  const [highlighted, setHighlighted] = useState<string[]>([])
  const [trayCap, setTrayCap] = useState(6)

  const busyRef = useRef(false)
  const timersRef = useRef<number[]>([])
  const playAreaRef = useRef<HTMLDivElement>(null)
  const lastInteractRef = useRef(Date.now())
  const lastDiscoveryRef = useRef(Date.now())
  const hintGivenForRef = useRef<string | null>(null)

  const after = useCallback((ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms)
    timersRef.current.push(id)
    return id
  }, [])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  useEffect(() => {
    setVoiceEnabled(settings.voiceOn)
  }, [settings.voiceOn])

  useEffect(() => () => clearTimers(), [clearTimers])

  // Play-time ticking + parent time limit
  useEffect(() => {
    const started = Date.now()
    const iv = setInterval(() => {
      onTick(1)
      const elapsedMin = (Date.now() - started) / 60000
      if (settings.timeLimitMinutes && elapsedMin >= settings.timeLimitMinutes) {
        clearInterval(iv)
        busyRef.current = true
        stopNarration()
        sfx.yawn()
        setPuffyState('sleepy')
        narrate('Puffy is tired! Let’s come back later!')
        after(2600, onTimeUp)
      }
    }, 1000)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.timeLimitMinutes])

  // Idle nudge after 15s + easy-win guarantee after 3 min
  useEffect(() => {
    const iv = setInterval(() => {
      if (busyRef.current) return
      const idleSec = (Date.now() - lastInteractRef.current) / 1000
      if (idleSec > 15 && idleSec < 16) {
        narrate(['Puffy is still hungry!', 'Got more snacks?', 'What should we try?'][Math.floor(Math.random() * 3)])
      }
      const sinceDiscovery = (Date.now() - lastDiscoveryRef.current) / 1000
      if (sinceDiscovery > 180) {
        const win = easyWin(ELEMENTS.map((e) => e.id), progress.discovered)
        if (win) {
          setHighlighted(win.inputs)
          lastDiscoveryRef.current = Date.now()
        }
      }
    }, 1000)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.discovered])

  const touch = () => {
    lastInteractRef.current = Date.now()
  }

  const feed = useCallback(
    (el: Element) => {
      if (busyRef.current || slots.length >= 2) return
      touch()
      setHighlighted([])
      const newSlots = [...slots, el]
      setSlots(newSlots)
      setHeld([])
      sfx.gulp()
      setPuffyState('gulp')
      after(380, () => {
        if (newSlots.length === 1) {
          setPuffyState('hungry')
        } else {
          startChew(newSlots)
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slots, after],
  )

  const startChew = useCallback(
    (fed: Element[]) => {
      busyRef.current = true
      setPuffyState('chewing')
      const chewTimes = [0, 420, 840]
      chewTimes.forEach((t, i) => {
        after(t + 60, () => {
          setChewBeat(i)
          sfx.chew(i)
        })
      })
      after(1400, () => {
        setPuffyState('thinking')
        sfx.think()
      })
      after(2050, () => decide(fed))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [after, progress.discovered],
  )

  const decide = useCallback(
    (fed: Element[]) => {
      const result = resolve(
        fed.map((e) => e.id),
        progress.discovered,
      )
      if (result.type === 'success') {
        const { combo, isFirstTime } = result
        lastDiscoveryRef.current = Date.now()
        hintGivenForRef.current = null
        setPuffyState('spitting')
        sfx.spit(settings.spitSound === 'sweet')
        after(650, () => {
          const big = isFirstTime && combo.celebration !== 'small'
          setConfetti(big)
          setPuffyState(isFirstTime ? 'proud' : 'delighted')
          if (isFirstTime) {
            sfx.fanfare(combo.celebration === 'large')
            sfx.confetti()
          } else {
            sfx.giggle()
            sfx.chime()
          }
          setOverlay({ kind: 'success', combo, isFirstTime })
          onDiscover(combo.id, fed.map((e) => e.id))

          // Voice: praise + result (name on ~1 in 3, praise/comfort only)
          const name = progress.childName
          const useName = name && Math.random() < 0.34
          if (settings.voiceOn) {
            if (isFirstTime) {
              const praise = ['You discovered', 'You made', 'Look at that'][
                Math.floor(Math.random() * 3)
              ]
              narrate(
                (useName ? `${name}! ` : 'Wow! ') + `${praise} ${combo.result.displayName}!`,
              )
            } else {
              const cheer = ['Yeaah!', 'Nice!', 'You got it!'][
                Math.floor(Math.random() * 3)
              ]
              narrate(`${combo.result.displayName}! ${cheer}`)
            }
          }
          after(2600, () => setConfetti(false))
          after(3000, () => {
            setOverlay(null)
            setSlots([])
            setPuffyState('idle')
            busyRef.current = false
          })
        })
      } else {
        // Invalid / noble gas / noble metal — the five-beat imagination sequence
        const line =
          result.type === 'invalid'
            ? generateInvalidLine(fed.map((e) => e.id))
            : generateNobleLine(
                result.type === 'noble-gas' ? 'gas' : 'metal',
                result.elementName,
              )
        const pairKey = normalizeKey(fed.map((e) => e.id))
        const attempts = (progress.attempts[pairKey] ?? 0) + 1
        onAttempts(pairKey)

        // Adaptive: 3rd struggle → gentle hint; 5th → shrink tray
        let hint: string | null = null
        if (
          attempts === 3 &&
          settings.hints !== 'never' &&
          hintGivenForRef.current !== pairKey
        ) {
          hint = hintFor(fed.map((e) => e.id))
          hintGivenForRef.current = pairKey
        }
        if (attempts >= 5) setTrayCap(4)

        setPuffyState('curious')
        if (settings.voiceOn) narrate(line.thinking + ' ' + line.idea + (line.use ? ' ' + line.use : ''))
        setThought(line)
        sfx.think()

        after(2600, () => {
          setPuffyState('shrug')
          sfx.sad()
          if (settings.voiceOn) narrate(line.rejection + ' ' + line.encouragement)
          after(1100, () => {
            setPuffyState('sad')
            sfx.sniffle()
            // Sad capped at 0.8s before Encouraging
            after(800, () => {
              setPuffyState('encouraging')
              sfx.boing()
              if (hint && settings.voiceOn) {
                after(900, () => narrate(hint))
                after(3600, finishInvalid)
              } else {
                after(1200, finishInvalid)
              }
            })
          })
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [after, progress, settings, onDiscover, onAttempts],
  )

  const finishInvalid = useCallback(() => {
    setThought(null)
    setSlots([])
    // Snacks float back
    setPuffyState('idle')
    busyRef.current = false
  }, [])

  const handleDragEnd = (el: Element, _x: number, _y: number, onMouth: boolean) => {
    if (busyRef.current) return
    if (onMouth) {
      feed(el)
    } else {
      // Dropped outside the mouth — snack gently floats back. Never a penalty.
      touch()
    }
  }

  const handleTap = (el: Element) => {
    if (busyRef.current) return
    touch()
    if (held.length === 0) {
      setHeld([el])
      setPuffyState('hungry')
      sfx.gulp()
    } else if (held[0].id !== el.id || held.length === 1) {
      // tap Puffy to feed held snacks
      setHeld([])
      feed(el)
    }
  }

  const handlePuffyTap = () => {
    if (busyRef.current || held.length === 0) return
    touch()
    const el = held[0]
    setHeld([])
    feed(el)
  }

  const showText = settings.textLevel !== 'off'

  return (
    <div className="play-area" ref={playAreaRef}>
      {/* Background */}
      <div className="play-bg" />

      {/* Puffy + mouth drop zone */}
      <div className="puffy-stage">
        <div data-mouth-zone className="mouth-zone" />
        <Puffy state={puffyState} chewBeat={chewBeat} onClick={handlePuffyTap} />
        {puffyState === 'chewing' && (
          <div className="chew-particles">
            {[...Array(6)].map((_, i) => (
              <span key={i} className={`chew-bubble cb-${i}`} />
            ))}
          </div>
        )}
      </div>

      {/* Held snack (tap-tap style) */}
      {held.length > 0 && !busyRef.current && (
        <div className="held-snack">
          <Snack
            element={held[0]}
            index={0}
            textLevel={settings.textLevel}
            playAreaRef={playAreaRef}
            onDragEnd={(el, _x, _y, onMouth) => {
              if (onMouth) {
                setHeld([])
                feed(el)
              }
            }}
          />
          <div className="held-hint">{showText ? 'Tap Puffy to feed!' : '👆'}</div>
        </div>
      )}

      {/* Fed slots indicator */}
      <div className="fed-slots">
        {[0, 1].map((i) => (
          <div key={i} className={`fed-slot ${slots[i] ? 'filled' : ''}`}>
            {slots[i] && (
              <span style={{ color: slots[i].color }}>{slots[i].symbol}</span>
            )}
          </div>
        ))}
      </div>

      {/* Thought bubble (invalid sequence) */}
      {thought && (
        <div className="thought-bubble">
          <p className="thought-idea">{thought.idea}</p>
          {thought.use && <p className="thought-use">{thought.use}</p>}
        </div>
      )}

      {/* Success overlay */}
      {overlay?.kind === 'success' && (
        <ResultOverlay
          combo={overlay.combo}
          isFirstTime={overlay.isFirstTime}
          name={progress.childName}
          textLevel={settings.textLevel}
          onDismiss={() => {
            setOverlay(null)
            setSlots([])
            setPuffyState('idle')
            busyRef.current = false
          }}
        />
      )}

      {/* Confetti */}
      {confetti && (
        <div className="confetti-layer">
          {[...Array(40)].map((_, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                left: `${(i * 37) % 100}%`,
                animationDelay: `${(i % 10) * 0.12}s`,
                backgroundColor: ['#FFD966', '#FF8FBF', '#7FD4FF', '#7FD48F', '#C9A227'][i % 5],
              }}
            />
          ))}
        </div>
      )}

      {/* Back button */}
      <button className="play-back" onClick={onExit} aria-label="Back to home">
        ←
      </button>

      {/* Element tray */}
      <div className="tray">
        {ELEMENTS.slice(0, trayCap).map((el, i) => (
          <Snack
            key={el.id}
            element={el}
            index={i}
            textLevel={settings.textLevel}
            disabled={busyRef.current}
            highlighted={highlighted.includes(el.id)}
            playAreaRef={playAreaRef}
            onDragStart={touch}
            onDragEnd={handleDragEnd}
            onTap={handleTap}
          />
        ))}
      </div>
    </div>
  )
}

function ResultOverlay({
  combo,
  isFirstTime,
  name,
  textLevel,
  onDismiss,
}: {
  combo: Combo
  isFirstTime: boolean
  name: string | null
  textLevel: Settings['textLevel']
  onDismiss: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3000)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div className="result-overlay" onClick={onDismiss}>
      <div className="result-card" style={{ borderColor: combo.result.color }}>
        <ResultAnimation animation={combo.result.animation} color={combo.result.color} />
        <div className="result-text">
          {isFirstTime && name && <div className="result-name-call">{name}!</div>}
          <div className="result-action">
            {isFirstTime ? 'You discovered' : 'You made'}…
          </div>
          <div className="result-display" style={{ color: combo.result.color }}>
            {combo.result.displayName}
          </div>
          {textLevel === 'formulas' || textLevel === 'equations' ? (
            <div className="result-formula">{combo.result.formula}</div>
          ) : null}
          {textLevel !== 'off' && (
            <div className="result-fact">
              {textLevel === 'symbols'
                ? combo.facts.toddler
                : textLevel === 'names'
                  ? combo.facts.kid
                  : combo.facts.junior}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ResultAnimation({ animation, color }: { animation: string; color: string }) {
  // Lightweight canvas-free result animations, one per combo
  switch (animation) {
    case 'water_splash':
      return (
        <div className="result-anim">
          {[...Array(8)].map((_, i) => (
            <span key={i} className={`drop d-${i}`} style={{ backgroundColor: color }} />
          ))}
          <span className="result-emoji">💧</span>
        </div>
      )
    case 'balloon_float':
      return (
        <div className="result-anim">
          <span className="result-emoji balloon">🎈</span>
        </div>
      )
    case 'deep_breath':
      return (
        <div className="result-anim">
          <span className="result-emoji breathe">🫧</span>
        </div>
      )
    case 'blue_mist':
      return (
        <div className="result-anim">
          {[...Array(6)].map((_, i) => (
            <span key={i} className={`mist m-${i}`} />
          ))}
        </div>
      )
    case 'salt_shaker':
      return (
        <div className="result-anim">
          <span className="result-emoji shake">🧂</span>
        </div>
      )
    case 'bubbles_out':
      return (
        <div className="result-anim">
          {[...Array(7)].map((_, i) => (
            <span key={i} className={`bub b-${i}`} />
          ))}
        </div>
      )
    case 'clean_sparkle':
      return (
        <div className="result-anim">
          <span className="result-emoji twinkle">✨</span>
        </div>
      )
    case 'fizzy':
      return (
        <div className="result-anim">
          {[...Array(10)].map((_, i) => (
            <span key={i} className={`fizz f-${i}`} />
          ))}
        </div>
      )
    case 'powder_puff':
      return (
        <div className="result-anim">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`puff p-${i}`} />
          ))}
        </div>
      )
    case 'little_flame':
      return (
        <div className="result-anim">
          <span className="result-emoji flame">🔥</span>
        </div>
      )
    default:
      return (
        <div className="result-anim">
          <span className="result-emoji twinkle">✨</span>
        </div>
      )
  }
}
