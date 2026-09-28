import { useState } from 'react'
import NameRecorder from '../components/NameRecorder'
import ResultArt from '../components/ResultArt'
import { CloseIcon } from '../components/Icons'
import { COMBOS, ELEMENT_MAP } from '../data/content'
import type { Progress, Settings } from '../game/types'

interface Props {
  settings: Settings
  progress: Progress
  onSettings: (s: Settings) => void
  onName: (name: string | null, recording: Blob | null | undefined) => void
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

function formatMinutes(sec: number) {
  const m = Math.round(sec / 60)
  if (m < 60) return `${m} min`
  return `${Math.floor(m / 60)} h ${m % 60} min`
}

export default function ParentZone({ settings, progress, onSettings, onName, onReset, onClose }: Props) {
  const [editingName, setEditingName] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [openedAt] = useState(() => Date.now())
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => onSettings({ ...settings, [k]: v })

  const weekAgo = openedAt - 7 * 24 * 3600 * 1000
  const thisWeek = Object.values(progress.discoveredAt).filter((d) => Date.parse(d) > weekAgo).length
  const topSnack = Object.entries(progress.feedCounts).sort((a, b) => b[1] - a[1])[0]

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
          <dl className="stats">
            <div className="stat">
              <dt>Discoveries</dt>
              <dd>
                {progress.discovered.length}<span className="stat__of"> / {COMBOS.length}</span>
              </dd>
            </div>
            <div className="stat">
              <dt>This week</dt>
              <dd>{thisWeek}</dd>
            </div>
            <div className="stat">
              <dt>Time played</dt>
              <dd>{formatMinutes(progress.secondsPlayed)}</dd>
            </div>
            <div className="stat">
              <dt>Favourite snack</dt>
              <dd>{topSnack ? ELEMENT_MAP[topSnack[0]]?.name ?? topSnack[0] : '—'}</dd>
            </div>
          </dl>
          <ul className="found-list">
            {COMBOS.filter((c) => progress.discovered.includes(c.id)).map((c) => (
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

        <section className="parent__section" aria-labelledby="p-child">
          <h2 id="p-child" className="parent__h2">
            Name
          </h2>
          {editingName ? (
            <NameRecorder
              initialName={progress.childName}
              onSave={(n, r) => {
                onName(n, r)
                setEditingName(false)
              }}
              onSkip={() => setEditingName(false)}
            />
          ) : (
            <div className="row">
              <span>
                {progress.childName ?? 'No name set'}
                {progress.hasNameRecording ? ' · recorded in your voice' : ''}
              </span>
              <button type="button" className="btn btn--quiet" onClick={() => setEditingName(true)}>
                Change
              </button>
            </div>
          )}
        </section>

        <section className="parent__section" aria-labelledby="p-play">
          <h2 id="p-play" className="parent__h2">
            Play
          </h2>
          <Segmented
            label="Lab"
            value={settings.ageMode}
            options={[
              { value: 0, label: 'Tiny Lab · 2–3' },
              { value: 1, label: 'Element Friends · 3–4' },
            ]}
            onChange={(v) => onSettings({ ...settings, ageMode: v, textLevel: v === 0 ? 'off' : settings.textLevel === 'off' ? 'names' : settings.textLevel })}
            note={settings.ageMode === 1 ? 'Adds symbols, words and a fact after each discovery.' : 'Voice only. No words on screen.'}
          />
          <Segmented
            label="Words on screen"
            value={settings.textLevel}
            options={[
              { value: 'off', label: 'None' },
              { value: 'symbols', label: 'Symbols' },
              { value: 'names', label: 'Names' },
              { value: 'formulas', label: 'Formulas' },
            ]}
            onChange={(v) => set('textLevel', v)}
          />
          <Segmented label="Narrator voice" value={settings.voiceOn ? 1 : 0} options={[{ value: 1, label: 'On' }, { value: 0, label: 'Off' }]} onChange={(v) => set('voiceOn', v === 1)} />
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

        <section className="parent__section" aria-labelledby="p-reset">
          <h2 id="p-reset" className="parent__h2">
            Start over
          </h2>
          {confirmReset ? (
            <div className="row">
              <span>Erase all discoveries and the name recording?</span>
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
