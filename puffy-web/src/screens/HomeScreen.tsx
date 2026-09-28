import { useState } from 'react'
import Bathroom from '../components/Bathroom'
import Puffy from '../components/Puffy'
import SnackArt from '../components/SnackArt'
import { BookIcon, GearIcon, PlayIcon } from '../components/Icons'
import { ELEMENTS } from '../data/content'
import { sfx } from '../game/audio'
import type { PuffyState } from '../game/types'

interface Props {
  evening: number
  sparkle: boolean
  newStickers: number
  onPlay: () => void
  onBook: () => void
  onParent: () => void
}

export default function HomeScreen({ evening, sparkle, newStickers, onPlay, onBook, onParent }: Props) {
  const [puffy, setPuffy] = useState<PuffyState>('idle')
  return (
    <Bathroom
      evening={evening}
      className="home"
      tub={
        <div className="snack-row snack-row--resting" style={{ '--count': ELEMENTS.length } as React.CSSProperties}>
          {ELEMENTS.map((el, i) => (
            <span key={el.id} className="snack snack--resting" style={{ '--i': i } as React.CSSProperties} aria-hidden="true">
              <span className="snack__bob">
                <SnackArt element={el} mood="sleepy" />
              </span>
            </span>
          ))}
        </div>
      }
    >
      <div className="home-stage">
        <button type="button" className="gear" onClick={onParent} aria-label="Grown-ups">
          <GearIcon />
        </button>
        <button type="button" className={`corner-tile corner-tile--right ${newStickers ? 'has-news' : ''}`} onClick={onBook} aria-label="Discovery book">
          <BookIcon />
        </button>
        <div className="puffy-anchor puffy-anchor--home">
          <Puffy
            state={puffy}
            sparkle={sparkle}
            onTap={() => {
              sfx.giggle()
              setPuffy('delighted')
              window.setTimeout(() => setPuffy('hungry'), 700)
              window.setTimeout(() => setPuffy('idle'), 1800)
            }}
          />
        </div>
        <button type="button" className="play-button" onClick={onPlay} aria-label="Play">
          <PlayIcon />
        </button>
      </div>
    </Bathroom>
  )
}
