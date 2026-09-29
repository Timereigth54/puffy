import { useEffect, useState } from 'react'
import ResultArt from '../components/ResultArt'
import SnackArt from '../components/SnackArt'
import { CloseIcon, SpeakerIcon } from '../components/Icons'
import { ELEMENT_MAP, LEVELS, VOICE, combosFor, levelForAge } from '../data/content'
import { SKILLS, levelSnacks, roster, skillStatus, type SkillStatus } from '../game/learning'
import { say, voiceCheck } from '../game/audio'
import { SLOW_FPS, type DeviceSpeed } from '../game/smooth'
import { applyUpdate, checkForUpdate, onUpdateStatus, type UpdateStatus } from '../game/update'
import type { Level, Progress, Settings } from '../game/types'

interface Props {
  settings: Settings
  progress: Progress
  onSettings: (s: Settings) => void
  /** Latest measured frame rate on this device. */
  speed: DeviceSpeed | null
  /** Whether smooth mode is on right now. */
  smoothNow: boolean
  /** Whether memory or processor count already marked this device as weak. */
  weakGuess: boolean
  onClearSpeed: () => void
  onName: (name: string | null) => void
  onReset: () => void
  onClose: () => void
}

type Opt<T> = { value: T; label: string }

function Segmented<T extends string | number | null>({ label, value, options, onChange, note }: { label: string; value: T; options: Opt<T>[]; onChange: (v: T) => void; note?: string }) {
  return (
    <div className="setting">
      <div className="setting__head">
        <span className="setting__label">{label}</span>
        {note && <span className="setting__note">{note}</span>}
      </div>
      <div className="segmented" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={o.value === value}
            className={`segmented__opt ${o.value === value ? 'is-on' : ''}`}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

const STATUS: Record<SkillStatus, string> = {
  known: 'Knows it',
  checking: 'Checking',
  learning: 'Learning',
  'not-yet': 'Not yet',
  'needs-sound': 'Needs sound',
  later: 'Older',
}
const SKILL_LABEL = { name: 'Name', letter: 'Letters', number: 'Number' }

const UPDATE_TEXT: Record<UpdateStatus, string> = {
  unsupported: 'Updates arrive when Puffy is reopened.',
  checking: 'Checking for a new version…',
  current: 'This is the newest version.',
  downloading: 'Downloading a new version. Keep Puffy open for a minute.',
  ready: 'A new version is ready. It installs next time Puffy is closed, or now:',
  offline: 'Could not check: no internet.',
}

function speedText(speed: DeviceSpeed | null, smoothNow: boolean, weakGuess: boolean, setting: Settings['smooth']): string {
  const now = smoothNow ? 'Smooth mode is on.' : 'Smooth mode is off.'
  if (!speed) return `${now} Not measured yet: play for a few seconds and come back.${weakGuess && setting === 'auto' ? ' It is on because this device looks low on memory.' : ''}`
  const how = speed.withSmooth ? 'with smooth mode' : 'with full effects'
  const verdict = speed.fps >= SLOW_FPS ? 'smooth' : 'choppy'
  return `${now} Last play ran at ${speed.fps} frames per second ${how} (${verdict}; ${SLOW_FPS} or more is smooth).`
}

function formatMinutes(sec: number) {
  const m = Math.round(sec / 60)
  if (m < 60) return `${m} min`
  return `${Math.floor(m / 60)} h ${m % 60} min`
}

export default function ParentZone({ settings, progress, onSettings, speed, smoothNow, weakGuess, onClearSpeed, onName, onReset, onClose }: Props) {
  const [confirmReset, setConfirmReset] = useState(false)
  const [openedAt] = useState(() => Date.now())
  const [name, setName] = useState(progress.childName ?? '')
  const [voice, setVoice] = useState<string | null>(null)
  const [update, setUpdate] = useState<UpdateStatus>('unsupported')
  useEffect(() => onUpdateStatus(setUpdate), [])
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => onSettings({ ...settings, [k]: v })

  const weekAgo = openedAt - 7 * 24 * 3600 * 1000
  const thisWeek = Object.values(progress.discoveredAt).filter((d) => Date.parse(d) > weekAgo).length
  const topSnack = Object.entries(progress.feedCounts).sort((a, b) => b[1] - a[1])[0]
  const levelInfo = LEVELS[settings.level]
  const combos = combosFor(settings.level)
  const tray = roster(progress.arrived, settings.level, settings.snacks === 'all')

  useEffect(() => {
    void voiceCheck().then((v) =>
      setVoice(
        v.clips > 0
          ? `Recorded voice ready (${v.clips} lines).${v.webAudio ? '' : ' Playing through the basic audio player.'}`
          : 'Recorded voice did not load, so this tablet uses its own robotic voice. Check the internet connection once, then reopen Puffy.',
      ),
    )
  }, [])

  const setAge = (age: number) =>
    onSettings({ ...settings, childAge: age, level: levelForAge(age), levelChosenByHand: false })

  const setLevel = (level: Level) => onSettings({ ...settings, level, levelChosenByHand: settings.childAge === null ? false : level !== levelForAge(settings.childAge) })

  return (
    <div className="cabinet" role="dialog" aria-modal="true" aria-labelledby="parent-title">
      <div className="cabinet__panel parent">
        <header className="parent__head">
          <h1 id="parent-title" className="cabinet__title">Grown-ups</h1>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Back to Puffy">
            <CloseIcon />
          </button>
        </header>

        <section className="parent__section" aria-labelledby="p-progress">
          <h2 id="p-progress" className="parent__h2">
            What {progress.childName ?? 'your child'} found
          </h2>
          <p className="summary">
            {[
              `${combos.filter((c) => progress.discovered.includes(c.id)).length} of ${combos.length} found`,
              thisWeek > 0 && `${thisWeek} new this week`,
              progress.secondsPlayed >= 60 && `${formatMinutes(progress.secondsPlayed)} played`,
              topSnack && `favourite snack: ${(ELEMENT_MAP[topSnack[0]]?.name ?? topSnack[0]).toLowerCase()}`,
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
          <ul className="found-list">
            {combos.filter((c) => progress.discovered.includes(c.id)).map((c) => (
              <li key={c.id} className="found">
                <ResultArt art={c.result.art} className="found__art" />
                <div>
                  <div className="found__name">
                    {c.result.displayName} <span className="found__formula">{c.result.formula}</span>
                  </div>
                  <div className="found__fact">{c.facts.kid}</div>
                </div>
              </li>
            ))}
          </ul>
          {progress.discovered.length === 0 && <p className="hint">Nothing discovered yet. Feed Puffy two snacks to start.</p>}
        </section>

        <section className="parent__section" aria-labelledby="p-learning">
          <h2 id="p-learning" className="parent__h2">
            What {progress.childName ?? 'your child'} is learning
          </h2>
          <p className="hint">
            Now and then Puffy asks for one snack: first by its name, then by its letters, then by its number. At first the answer is shown on the
            snack. Once it is hidden, <strong>Knows it</strong> means 5 right of the last 6 asks, on at least 2 different days. It is a sign of
            learning, not a test score.
          </p>
          <table className="learn">
            <thead>
              <tr>
                <th scope="col">Element</th>
                {SKILLS.map((s) => (
                  <th key={s} scope="col">
                    {SKILL_LABEL[s]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {levelSnacks(settings.level).map((id) => {
                const el = ELEMENT_MAP[id]
                const here = tray.includes(id)
                return (
                  <tr key={id} className={here ? '' : 'is-waiting'}>
                    <th scope="row">
                      <span className="learn__el">
                        <SnackArt element={el} />
                        <span>
                          {el.name} <span className="learn__sym">{el.symbol} · {el.atomicNumber}</span>
                        </span>
                      </span>
                    </th>
                    {here ? (
                      SKILLS.map((s) => {
                        const st = skillStatus(progress.learning[id], el, settings.level, settings.voiceOn, s)
                        return (
                          <td key={s} className={`learn__st learn__st--${st}`}>
                            {STATUS[st]}
                          </td>
                        )
                      })
                    ) : (
                      <td colSpan={3} className="learn__st">
                        Arrives later
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="hint">
            Letters that come from Latin names (Na for sodium, Fe for iron, Cu for copper, Au for gold) and numbers above ten wait until age 4.
            New snacks arrive one a day at most, once every snack in the tub has been taught and everything it makes has been found.
          </p>
        </section>

        <section className="parent__section" aria-labelledby="p-child">
          <h2 id="p-child" className="parent__h2">
            Child
          </h2>
          <div className="setting">
            <div className="setting__head">
              <span className="setting__label">Age</span>
              <span className="setting__note">Sets the level below.</span>
            </div>
            <div className="age-picker age-picker--compact" role="radiogroup" aria-label="Age">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((a) => (
                <button key={a} type="button" role="radio" aria-checked={settings.childAge === a} className={`age ${settings.childAge === a ? 'is-on' : ''}`} onClick={() => setAge(a)}>
                  {a === 8 ? '8+' : a}
                </button>
              ))}
            </div>
          </div>
          <label className="field">
            <span className="field__label">First name (shown here only; Puffy never says it)</span>
            <input
              className="field__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => onName(name.trim() || null)}
              placeholder="e.g. Ada"
              autoComplete="off"
              maxLength={24}
            />
          </label>
        </section>

        <section className="parent__section" aria-labelledby="p-play">
          <h2 id="p-play" className="parent__h2">
            Level
          </h2>
          <Segmented
            label="How Puffy talks"
            value={settings.level}
            options={LEVELS.map((l) => ({ value: l.level, label: `${l.name} · ${l.ages}` }))}
            onChange={setLevel}
            note={levelInfo.note}
          />
          <Segmented
            label="New snacks"
            value={settings.snacks}
            options={[
              { value: 'one-by-one', label: 'One at a time' },
              { value: 'all', label: 'All at once' },
            ]}
            onChange={(v) => set('snacks', v)}
            note="One at a time lets each snack's name sink in before the next arrives."
          />
          <Segmented label="Narrator voice" value={settings.voiceOn ? 1 : 0} options={[{ value: 1, label: 'On' }, { value: 0, label: 'Off' }]} onChange={(v) => set('voiceOn', v === 1)} />
          <div className="row voice-check">
            <span className="hint">{voice ?? 'Checking the voice…'}</span>
            <button type="button" className="btn btn--quiet" onClick={() => void say([VOICE[settings.level].intro])}>
              <SpeakerIcon /> Test the voice
            </button>
          </div>
          <Segmented
            label="Spit sound"
            value={settings.spitSound}
            options={[
              { value: 'silly', label: 'Silly “ptooey”' },
              { value: 'sweet', label: 'Sweet “poof”' },
            ]}
            onChange={(v) => set('spitSound', v)}
          />
          <Segmented
            label="Hints"
            value={settings.hints}
            options={[
              { value: 'always', label: 'Always' },
              { value: 'sometimes', label: 'Sometimes' },
              { value: 'never', label: 'Never' },
            ]}
            onChange={(v) => set('hints', v)}
          />
          <Segmented
            label="Bedtime after"
            value={settings.timeLimitMinutes}
            options={[
              { value: 5, label: '5 min' },
              { value: 10, label: '10' },
              { value: 15, label: '15' },
              { value: 20, label: '20' },
              { value: null, label: 'No limit' },
            ]}
            onChange={(v) => set('timeLimitMinutes', v)}
            note="The bathroom light warms toward evening, then Puffy falls asleep. There is no countdown."
          />
        </section>

        <section className="parent__section" aria-labelledby="p-device">
          <h2 id="p-device" className="parent__h2">
            This device
          </h2>
          <Segmented
            label="Smooth mode"
            value={settings.smooth}
            options={[
              { value: 'auto', label: 'Automatic' },
              { value: 'on', label: 'On' },
              { value: 'off', label: 'Off' },
            ]}
            onChange={(v) => set('smooth', v)}
            note="Fewer effects (soft shadows, blur, ripples) so Puffy moves smoothly on slower devices."
          />
          <p className="hint" data-testid="speed-readout">
            {speedText(speed, smoothNow, weakGuess, settings.smooth)}
          </p>
          {speed?.autoSmooth && settings.smooth === 'auto' && (
            <div className="row">
              <span className="hint">Smooth mode switched itself on after two slow plays in a row.</span>
              <button type="button" className="btn btn--quiet" onClick={onClearSpeed}>
                Try full effects again
              </button>
            </div>
          )}
          <div className="row">
            <span className="hint" data-testid="version">
              Version {__BUILD__.commit} ({__BUILD__.date}). {UPDATE_TEXT[update]}
            </span>
            {update === 'ready' ? (
              <button type="button" className="btn btn--quiet" onClick={applyUpdate}>
                Update now
              </button>
            ) : (
              <button type="button" className="btn btn--quiet" onClick={() => void checkForUpdate()} disabled={update === 'checking' || update === 'downloading'}>
                Check for update
              </button>
            )}
          </div>
        </section>

        <section className="parent__section" aria-labelledby="p-reset">
          <h2 id="p-reset" className="parent__h2">
            Start over
          </h2>
          {confirmReset ? (
            <div className="row">
              <span>Erase all discoveries?</span>
              <span className="row__actions">
                <button type="button" className="btn btn--quiet" onClick={() => setConfirmReset(false)}>
                  Keep everything
                </button>
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={() => {
                    onReset()
                    setConfirmReset(false)
                  }}
                >
                  Erase
                </button>
              </span>
            </div>
          ) : (
            <div className="row">
              <span>Progress is stored only on this device.</span>
              <button type="button" className="btn btn--quiet" onClick={() => setConfirmReset(true)}>
                Reset progress
              </button>
            </div>
          )}
        </section>
        <p className="parent__foot">Puffy works offline. It has no ads, no accounts and no tracking.</p>
      </div>
    </div>
  )
}
