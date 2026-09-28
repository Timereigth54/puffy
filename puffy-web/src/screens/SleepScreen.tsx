import { useEffect } from 'react'
import Bathroom from '../components/Bathroom'
import Puffy from '../components/Puffy'
import { GearIcon } from '../components/Icons'
import { say, sfx } from '../game/audio'

// Bedtime: the parent's time limit ran out. No countdown was ever shown;
// the light warmed, and now Puffy is asleep until a grown-up opens the gate.

export default function SleepScreen({ onParent }: { onParent: () => void }) {
  useEffect(() => {
    sfx.yawn()
    void say(['Puffy is sleepy. Night night!'])
  }, [])
  return (
    <Bathroom evening={1} className="sleep">
      <div className="home-stage">
        <button type="button" className="gear" onClick={onParent} aria-label="Grown-ups">
          <GearIcon />
        </button>
        <div className="puffy-anchor puffy-anchor--home">
          <Puffy state="sleepy" />
          <div className="zzz" aria-hidden="true">
            <span>z</span>
            <span>z</span>
            <span>z</span>
          </div>
        </div>
      </div>
    </Bathroom>
  )
}
