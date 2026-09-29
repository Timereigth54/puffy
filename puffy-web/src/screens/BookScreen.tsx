import { useEffect, useState } from 'react'
import Bathroom from '../components/Bathroom'
import ResultArt from '../components/ResultArt'
import { DuckIcon, PlayIcon } from '../components/Icons'
import { combosFor } from '../data/content'
import { say, sfx } from '../game/audio'
import { rememberLine } from '../game/lines'
import { textForLevel } from '../game/store'
import { VOICE } from '../data/content'
import type { Combo, Progress, Settings } from '../game/types'

// The Discovery Book is a tile panel on the bathroom wall. Each discovery is
// a numbered plate; undiscovered plates show the tile back, a waiting silhouette.

interface Props {
  progress: Progress
  settings: Settings
  evening: number
  onSeen: (comboId: string) => void
  onHome: () => void
  onPlay: () => void
}

export default function BookScreen({ progress, settings, evening, onSeen, onHome, onPlay }: Props) {
  const [wiggle, setWiggle] = useState<string | null>(null)
  const found = progress.discovered.length
  const words = textForLevel(settings.level) !== 'off'
  const level = settings.level
  // Toddlers see the nine starter plates; from age 4 the book holds twenty-four.
  const plates = [...combosFor(level)].sort((a, b) => a.plate - b.plate)

  useEffect(() => {
    void say([found ? VOICE[level].bookFound : VOICE[level].bookEmpty])
  }, [found, level])

  const tap = (c: Combo) => {
    if (!progress.discovered.includes(c.id)) {
      sfx.tap()
      return
    }
    sfx.chime()
    setWiggle(c.id)
    window.setTimeout(() => setWiggle(null), 900)
    onSeen(c.id)
    void say([rememberLine(c, level)])
  }

  return (
    <Bathroom evening={evening} bubbles
      className="book">
      <div className="book-stage">
        <button type="button" className="corner-tile corner-tile--left" onClick={onHome} aria-label="Home">
          <DuckIcon />
        </button>
        <button type="button" className="corner-tile corner-tile--right" onClick={onPlay} aria-label="Play">
          <PlayIcon />
        </button>
        <div className={`plates ${plates.length > 9 ? 'plates--many' : ''}`} role="list">
          {plates.map((c) => {
            const has = progress.discovered.includes(c.id)
            const isNew = progress.unseenStickers.includes(c.id)
            return (
              <button
                key={c.id}
                type="button"
                role="listitem"
                className={`plate ${has ? 'is-found' : 'is-empty'} ${isNew ? 'is-new' : ''} ${wiggle === c.id ? 'is-wiggling' : ''}`}
                onClick={() => tap(c)}
                aria-label={has ? c.result.displayName : 'Not found yet'}
                style={{ '--plate': c.result.color } as React.CSSProperties}
              >
                <ResultArt art={c.result.art} ghost={!has} className="plate__art" />
                {words && (
                  <span className="plate__tag">
                    <span className="plate__no">No. {c.plate}</span>
                    {has && <span className="plate__name">{c.result.displayName}</span>}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </Bathroom>
  )
}
