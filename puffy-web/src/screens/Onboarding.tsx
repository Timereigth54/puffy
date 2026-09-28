import { useState } from 'react'
import Bathroom from '../components/Bathroom'
import NameRecorder from '../components/NameRecorder'
import Puffy from '../components/Puffy'
import { say, sfx, unlockAudio } from '../game/audio'
import type { PuffyState } from '../game/types'

// First launch: Puffy is asleep. Touching Puffy wakes it (and unlocks audio
// inside that gesture, which iOS requires). Then a grown-up records the name.

interface Props {
  childName: string | null
  onName: (name: string | null, recording: Blob | null | undefined) => Promise<void>
  onDone: () => void
}

export default function Onboarding({ childName, onName, onDone }: Props) {
  const [step, setStep] = useState<'asleep' | 'awake' | 'name'>('asleep')
  const [puffy, setPuffy] = useState<PuffyState>('sleepy')

  const wake = async () => {
    if (step !== 'asleep') return
    unlockAudio()
    sfx.boing()
    setStep('awake')
    setPuffy('delighted')
    await say(['Hi! Puffy is hungry!'])
    setPuffy('hungry')
    setStep('name')
  }

  const finishName = async (name: string | null, rec: Blob | null | undefined) => {
    await onName(name, rec)
    setStep('awake')
    setPuffy('delighted')
    if (name || rec) await say([{ name: true }, 'Feed Puffy!'])
    else await say(['Feed Puffy!'])
    onDone()
  }

  return (
    <Bathroom className="onboarding">
      <div className="home-stage">
        <div className={`puffy-anchor puffy-anchor--home ${step === 'asleep' ? 'is-asleep' : ''}`}>
          <Puffy state={puffy} onTap={wake} />
          {step === 'asleep' && <span className="touch-ring" aria-hidden="true" />}
        </div>
      </div>
      {step === 'name' && (
        <div className="cabinet" role="dialog" aria-modal="true" aria-labelledby="name-title">
          <div className="cabinet__panel">
            <h1 id="name-title" className="cabinet__title">
              Grown-ups: what should Puffy call your child?
            </h1>
            <NameRecorder initialName={childName} onSave={finishName} saveLabel="Let’s play" onSkip={() => void finishName(null, undefined)} />
          </div>
        </div>
      )}
    </Bathroom>
  )
}
