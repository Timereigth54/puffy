import { useEffect } from 'react'
import Bathroom from '../components/Bathroom'
import Puffy from '../components/Puffy'
import { GearIcon } from '../components/Icons'
import { say, sfx } from '../game/audio'
import { VOICE } from '../data/content'
import type { Level } from '../game/types'

// Bedtime: the parent's time limit ran out. No countdown was ever shown;
// the light warmed, and now Puffy is asleep until a grown-up opens the gate.

export default function SleepScreen({ onParent, level }: { onParent: () => void; level: Level }) {
  useEffect(() => {
    sfx.yawn()
    void say([VOICE[level].sleep])
  }, [level])
  return (
    <Bathroom evening={1} className="sleep">
      <div className="home-stage">
        <button type="button" className="gear" onClick={onParent}>
          <GearIcon />
          <span>Grown-ups</span>
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
