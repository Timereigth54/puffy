import type { Element } from '../game/types'

// A snack is a foam bath cutout: a flat coloured top face, a darker foam
// edge offset down-right (the one window light is top-left), a glaze of
// light on the top-left, and a simple face.

const STAR = (() => {
  const pts: string[] = []
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 44 : 23
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    pts.push(`${(60 + r * Math.cos(a)).toFixed(1)},${(64 + r * Math.sin(a)).toFixed(1)}`)
  }
  return `M${pts.join('L')}Z`
})()

const SHAPES: Record<Element['shape'], { d: string; faceY: number; round?: number }> = {
  round: { d: 'M60 22a40 40 0 1 1 0 80a40 40 0 1 1 0-80Z', faceY: 56 },
  drop: { d: 'M60 14C68 30 98 56 98 76a38 38 0 0 1-76 0C22 56 52 30 60 14Z', faceY: 62 },
  block: { d: 'M38 22h44a18 18 0 0 1 18 18v44a18 18 0 0 1-18 18H38a18 18 0 0 1-18-18V40a18 18 0 0 1 18-18Z', faceY: 56 },
  star: { d: STAR, faceY: 58, round: 12 },
  leaf: { d: 'M60 16C98 28 106 70 86 94c-13 14-39 14-52 0C14 72 22 30 60 16Z', faceY: 56 },
  balloon: { d: 'M60 14c22 0 38 18 38 40c0 24-20 42-38 46c-18-4-38-22-38-46c0-22 16-40 38-40Z', faceY: 52 },
  // Pack 2
  cloud: { d: 'M34 98a18 18 0 0 1-5-36a22 22 0 0 1 31-25a23 23 0 0 1 37 10a19 19 0 0 1-2 51Z', faceY: 68 },
  hexagon: { d: 'M40 22h40l22 40-22 40H40L18 62Z', faceY: 60, round: 10 },
  heart: { d: 'M60 104C30 84 14 66 16 46c2-16 16-26 29-24c7 1 12 6 15 12c3-6 8-11 15-12c13-2 27 8 29 24c2 20-14 38-44 58Z', faceY: 62 },
  bar: { d: 'M38 30h44l20 70H18Z', faceY: 70, round: 10 },
  triangle: { d: 'M60 16L104 98H16Z', faceY: 70, round: 14 },
  rhombus: { d: 'M60 14L104 62L60 110L16 62Z', faceY: 60, round: 12 },
}

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16)
  const ch = (s: number) => Math.max(0, Math.min(255, Math.round(((n >> s) & 255) * (1 + amt))))
  return `#${[16, 8, 0].map((s) => ch(s).toString(16).padStart(2, '0')).join('')}`
}

interface Props {
  element: Element
  showSymbol?: boolean
  /** The atomic number, shown on a round foam tag once the child is learning it. */
  number?: number
  mood?: 'normal' | 'happy' | 'sleepy'
}

export default function SnackArt({ element, showSymbol, number, mood = 'normal' }: Props) {
  const s = SHAPES[element.shape]
  const edge = shade(element.color, -0.28)
  const stroke = s.round ? { stroke: element.color, strokeWidth: s.round, strokeLinejoin: 'round' as const } : {}
  const edgeStroke = s.round ? { stroke: edge, strokeWidth: s.round, strokeLinejoin: 'round' as const } : {}
  const id = `glaze-${element.id}`
  return (
    <svg viewBox="0 0 120 124" className="snack-art" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="32%" cy="26%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {element.shape === 'balloon' && (
        <path d="M60 100c-6 8 6 12 0 22" fill="none" stroke={edge} strokeWidth="3" strokeLinecap="round" />
      )}
      {/* foam edge: the cut thickness */}
      <path d={s.d} transform="translate(5 6)" fill={edge} {...edgeStroke} />
      <path d={s.d} fill={element.color} {...stroke} />
      <path d={s.d} fill={`url(#${id})`} />
      {element.shape === 'drop' && (
        <g fill="#fff" opacity="0.75">
          <circle cx="96" cy="30" r="5" />
          <circle cx="104" cy="18" r="3" />
        </g>
      )}
      {element.shape === 'balloon' && <path d="M55 100h10l-5 7Z" fill={edge} />}
      {showSymbol ? (
        <>
          {/* Foam-letter mode: the symbol is the snack; small eyes keep it a character. */}
          {/* sits high on the snack so the letter stays above the waterline */}
          <Eye x={50} y={s.faceY - 30} r={3.5} />
          <Eye x={70} y={s.faceY - 30} r={3.5} />
          <text x="60" y={s.faceY + 6} textAnchor="middle" className="snack-symbol">
            {element.symbol}
          </text>
        </>
      ) : (
        <Face kind={element.face} y={s.faceY} mood={mood} />
      )}
      {number !== undefined && (
        <g className="snack-number">
          <circle cx="100" cy="22" r="16" fill="#fff" stroke={INK} strokeWidth="3" />
          <text x="100" y="29" textAnchor="middle">
            {number}
          </text>
        </g>
      )}
    </svg>
  )
}

const INK = '#3A2233'

function Eye({ x, y, r = 5 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r + 3} fill="#fff" />
      <circle cx={x + 1.2} cy={y + 0.5} r={r} fill={INK} />
      <circle cx={x - 0.8} cy={y - 2} r={1.6} fill="#fff" />
    </g>
  )
}

function Face({ kind, y, mood }: { kind: Element['face']; y: number; mood: 'normal' | 'happy' | 'sleepy' }) {
  const L = 46
  const R = 74
  const ey = y - 6
  if (mood === 'sleepy') {
    return (
      <g stroke={INK} strokeWidth="3.4" fill="none" strokeLinecap="round">
        <path d={`M${L - 6} ${ey} q6 5 12 0 M${R - 6} ${ey} q6 5 12 0`} />
        <path d={`M56 ${y + 12} q4 3 8 0`} />
      </g>
    )
  }
  if (mood === 'happy') {
    return (
      <g stroke={INK} strokeWidth="3.4" fill="none" strokeLinecap="round">
        <path d={`M${L - 6} ${ey + 2} q6 -7 12 0 M${R - 6} ${ey + 2} q6 -7 12 0`} />
        <path d={`M50 ${y + 8} q10 11 20 0`} fill={INK} />
      </g>
    )
  }
  const mouth = (d: string, fill = 'none') => (
    <path d={d} fill={fill} stroke={INK} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
  )
  switch (kind) {
    case 'giggly':
      return (
        <g>
          <Eye x={L} y={ey} />
          <Eye x={R} y={ey} />
          {mouth(`M51 ${y + 8} q9 10 18 0 Z`, INK)}
        </g>
      )
    case 'breathy':
      return (
        <g>
          <Eye x={L} y={ey} />
          <Eye x={R} y={ey} />
          <ellipse cx="60" cy={y + 12} rx="5" ry="6" fill={INK} />
        </g>
      )
    case 'sturdy':
      return (
        <g>
          <path d={`M${L - 8} ${ey - 10} l10 3 M${R + 8} ${ey - 10} l-10 3`} stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
          <Eye x={L} y={ey} />
          <Eye x={R} y={ey} />
          {mouth(`M52 ${y + 11} h16`)}
        </g>
      )
    case 'eager':
      return (
        <g>
          <Eye x={L + 2} y={ey} r={6} />
          <Eye x={R - 2} y={ey} r={6} />
          {mouth(`M50 ${y + 7} q10 13 20 0 q-10 5 -20 0 Z`, INK)}
        </g>
      )
    case 'sneaky':
      return (
        <g>
          <path d={`M${L - 8} ${ey - 6} l12 -4 M${R + 8} ${ey - 6} l-12 -4`} stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
          <Eye x={L} y={ey + 1} r={4.5} />
          <Eye x={R} y={ey + 1} r={4.5} />
          {mouth(`M52 ${y + 10} q10 6 16 -3`)}
        </g>
      )
    case 'floaty':
      return (
        <g>
          <Eye x={L} y={ey} r={4.5} />
          <Eye x={R} y={ey} r={4.5} />
          <circle cx={L - 6} cy={y + 6} r="5" fill="#FF8FBF" opacity="0.5" />
          <circle cx={R + 6} cy={y + 6} r="5" fill="#FF8FBF" opacity="0.5" />
          {mouth(`M55 ${y + 9} q5 4 10 0`)}
        </g>
      )
  }
}
