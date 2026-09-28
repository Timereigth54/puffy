import { useRef, useState, useCallback } from 'react'
import type { Element } from '../game/types'
import { sfx } from '../game/sfx'

// An element snack: a cute draggable character.
// Supports both drag (pointer) and tap-tap input styles.

interface SnackProps {
  element: Element
  index: number
  textLevel: 'off' | 'symbols' | 'names' | 'formulas' | 'equations'
  disabled?: boolean
  highlighted?: boolean
  onDragStart?: (el: Element) => void
  onDragMove?: (x: number, y: number) => void
  onDragEnd?: (el: Element, x: number, y: number, droppedOnMouth: boolean) => void
  onTap?: (el: Element) => void
  playAreaRef: React.RefObject<HTMLDivElement | null>
}

export default function Snack({
  element,
  index,
  textLevel,
  disabled,
  highlighted,
  onDragStart,
  onDragMove,
  onDragEnd,
  onTap,
  playAreaRef,
}: SnackProps) {
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const startRef = useRef<{ x: number; y: number } | null>(null)
  const movedRef = useRef(false)
  const elRef = useRef<HTMLDivElement>(null)

  const getPos = useCallback(
    (clientX: number, clientY: number) => {
      const area = playAreaRef.current
      if (!area || !elRef.current) return { x: 0, y: 0 }
      const areaRect = area.getBoundingClientRect()
      return { x: clientX - areaRect.left, y: clientY - areaRect.top }
    },
    [playAreaRef],
  )

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return
    e.preventDefault()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    startRef.current = { x: e.clientX, y: e.clientY }
    movedRef.current = false
    sfx.grab()
    onDragStart?.(element)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!startRef.current || disabled) return
    const dx = e.clientX - startRef.current.x
    const dy = e.clientY - startRef.current.y
    if (!dragging && Math.hypot(dx, dy) > 12) {
      setDragging(true)
      movedRef.current = true
    }
    if (dragging) {
      const pos = getPos(e.clientX, e.clientY)
      setDragPos(pos)
      onDragMove?.(pos.x, pos.y)
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (disabled || !startRef.current) return
    const wasDragging = dragging
    const pos = getPos(e.clientX, e.clientY)
    startRef.current = null
    setDragging(false)
    setDragPos(null)
    if (wasDragging) {
      const area = playAreaRef.current
      const mouth = area?.querySelector('[data-mouth-zone]')
      let droppedOnMouth = false
      if (mouth) {
        const r = mouth.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const radius = Math.max(r.width, r.height) / 2 + 30 // generous drop zone
        droppedOnMouth = Math.hypot(e.clientX - cx, e.clientY - cy) < radius
      }
      onDragEnd?.(element, pos.x, pos.y, droppedOnMouth)
    } else {
      // Tap: tap-tap input style
      sfx.grab()
      onTap?.(element)
    }
  }

  const style: React.CSSProperties = {}
  if (dragging && dragPos) {
    style.position = 'absolute'
    style.left = dragPos.x - 45
    style.top = dragPos.y - 45
    style.zIndex = 60
    style.pointerEvents = 'none'
  } else {
    style.animationDelay = `${index * 0.35}s`
  }

  const face = faceFor(element.id)

  return (
    <div
      ref={elRef}
      className={`snack snack-${element.shape.split('-')[0]} ${dragging ? 'snack-dragging' : ''} ${disabled ? 'snack-disabled' : ''} ${highlighted ? 'snack-highlighted' : ''}`}
      style={{ ...style, ['--snack-color' as string]: element.color }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="button"
      aria-label={element.name}
    >
      <div className="snack-float">
        <svg viewBox="0 0 90 90" className="snack-svg">
          <circle cx="45" cy="48" r="32" fill={element.color} opacity="0.95" />
          <ellipse cx="38" cy="36" rx="12" ry="7" fill="#fff" opacity="0.5" />
          {face}
        </svg>
        {textLevel !== 'off' && (
          <span className="snack-symbol">{element.symbol}</span>
        )}
        {textLevel === 'names' && (
          <span className="snack-name">{element.name}</span>
        )}
      </div>
    </div>
  )
}

function faceFor(id: string) {
  const eye = (cx: number, cy: number, r = 4) => (
    <g key={`${cx}-${cy}`}>
      <circle cx={cx} cy={cy} r={r + 2.5} fill="#fff" />
      <circle cx={cx + 1} cy={cy} r={r} fill="#3A2A33" />
    </g>
  )
  switch (id) {
    case 'H': // giggly
      return (
        <g>
          {eye(33, 44)}{eye(57, 44)}
          <path d="M37 58 q8 8 16 0" fill="none" stroke="#3A2A33" strokeWidth="3" strokeLinecap="round" />
        </g>
      )
    case 'O': // breathy bubbles
      return (
        <g>
          {eye(33, 44)}{eye(57, 44)}
          <circle cx="70" cy="20" r="4" fill="#fff" opacity="0.8" />
          <circle cx="76" cy="12" r="2.5" fill="#fff" opacity="0.7" />
          <ellipse cx="45" cy="58" rx="6" ry="4" fill="#3A2A33" opacity="0.9" />
        </g>
      )
    case 'C': // sturdy
      return (
        <g>
          {eye(34, 44)}{eye(56, 44)}
          <path d="M38 57 h14" stroke="#3A2A33" strokeWidth="3" strokeLinecap="round" />
          <path d="M28 36 l6 4 M62 36 l-6 4" stroke="#3A2A33" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )
    case 'N': // sleepy calm
      return (
        <g>
          <path d="M28 44 q5 -5 10 0" fill="none" stroke="#3A2A33" strokeWidth="3" strokeLinecap="round" />
          <path d="M52 44 q5 -5 10 0" fill="none" stroke="#3A2A33" strokeWidth="3" strokeLinecap="round" />
          <path d="M40 58 q5 4 10 0" fill="none" stroke="#3A2A33" strokeWidth="3" strokeLinecap="round" />
        </g>
      )
    case 'Na': // eager
      return (
        <g>
          <circle cx="33" cy="44" r="6.5" fill="#fff" />
          <circle cx="57" cy="44" r="6.5" fill="#fff" />
          <circle cx="35" cy="44" r="4" fill="#3A2A33" />
          <circle cx="59" cy="44" r="4" fill="#3A2A33" />
          <path d="M36 56 q9 10 18 0 q-9 5 -18 0 z" fill="#3A2A33" />
          <path d="M24 34 l7 3 M66 34 l-7 3" stroke="#3A2A33" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )
    case 'Cl': // mischievous
      return (
        <g>
          {eye(33, 44)}{eye(57, 44)}
          <path d="M26 35 l10 -4 M64 35 l-10 -4" stroke="#3A2A33" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M38 56 q7 6 14 0" fill="none" stroke="#3A2A33" strokeWidth="3" strokeLinecap="round" />
        </g>
      )
    default:
      return (
        <g>
          {eye(33, 44)}{eye(57, 44)}
          <path d="M38 56 q7 7 14 0" fill="none" stroke="#3A2A33" strokeWidth="3" strokeLinecap="round" />
        </g>
      )
  }
}
