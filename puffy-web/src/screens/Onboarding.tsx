import { useState } from 'react'
import Bathroom from '../components/Bathroom'
import Puffy from '../components/Puffy'
import { LEVELS, VOICE, levelForAge } from '../data/content'
import { say, sfx, unlockAudio } from '../game/audio'
import type { Level, PuffyState } from '../game/types'

// First launch: Puffy is asleep. Touching Puffy wakes it (and unlocks audio
// inside that gesture, which iOS requires). Then a grown-up picks the child's
// age, which sets the level.

interface Props {
  childName: string | null
  onChild: (name: string | null, age: number) => void
  onDone: () => void
}

const AGES = [1, 2, 3, 4, 5, 6, 7, 8]

export default function Onboarding({ childName, onChild, onDone }: Props) {
  const [step, setStep] = useState<'asleep' | 'awake' | 'age'>('asleep')
  const [puffy, setPuffy] = useState<PuffyState>('sleepy')
  const [age, setAge] = useState<number | null>(null)
  const [name, setName] = useState(childName ?? '')

  const wake = async () => {
    if (step !== 'asleep') return
    unlockAudio()
    sfx.boing()
    setStep('awake')
    setPuffy('delighted')
    await say([VOICE[1].intro])
    setPuffy('hungry')
    setStep('age')
  }

  const start = async () => {
    if (age === null) return
    const level: Level = levelForAge(age)
    onChild(name.trim() || null, age)
    setStep('awake')
    setPuffy('delighted')
    await say([VOICE[level].feedPuffy])
    onDone()
  }

  const levelInfo = age === null ? null : LEVELS[levelForAge(age)]

  return (
    <Bathroom className="onboarding">
      <div className="home-stage">
        <div className={`puffy-anchor puffy-anchor--home ${step === 'asleep' ? 'is-asleep' : ''}`}>
          <Puffy state={puffy} onTap={wake} />
          {step === 'asleep' && <span className="touch-ring" aria-hidden="true" />}
        </div>
      </div>
      {step === 'age' && (
        <div className="cabinet" role="dialog" aria-modal="true" aria-labelledby="age-title">
          <div className="cabinet__panel">
            <h1 id="age-title" className="cabinet__title">
              Grown-ups: how old is your child?
            </h1>
            <div className="age-picker" role="radiogroup" aria-labelledby="age-title">
              {AGES.map((a) => (
                <button key={a} type="button" role="radio" aria-checked={age === a} className={`age ${age === a ? 'is-on' : ''}`} onClick={() => setAge(a)}>
                  {a === 8 ? '8+' : a}
                </button>
              ))}
            </div>
            <p className="hint">
              {levelInfo
                ? `${levelInfo.name} (${levelInfo.ages}). ${levelInfo.note} You can change this later under Grown-ups.`
                : 'Puffy uses more words and harder ideas as children get older.'}
            </p>
            <label className="field">
              <span className="field__label">First name (optional, shown on the grown-ups page only)</span>
              <input className="field__input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ada" autoComplete="off" maxLength={24} />
            </label>
            <div className="actions">
              <button type="button" className="btn btn--primary" onClick={() => void start()} disabled={age === null}>
                Let’s play
              </button>
            </div>
          </div>
        </div>
      )}
    </Bathroom>
  )
}
