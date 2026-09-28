import type { Element, PuffyState } from '../game/types'
import SnackArt from './SnackArt'

// Puffy: a pink steam cloud. Semi-transparent, so eaten snacks show in the
// belly. Every expression is a pose of the same face; the body squashes and
// stretches through CSS classes on .puffy (see world.css).

interface Props {
  state: PuffyState
  chewBeat?: number
  fed?: Element[]
  /** Where the finger is, relative to Puffy's centre, in px. Puffy leans toward it. */
  lean?: { x: number; y: number } | null
  sparkle?: boolean
  onTap?: () => void
}

export default function Puffy({ state, chewBeat = 0, fed = [], lean, sparkle, onTap }: Props) {
  const leanStyle = lean
    ? ({
        '--lean-x': `${Math.max(-40, Math.min(40, lean.x * 0.08))}px`,
        '--lean-y': `${Math.max(-10, Math.min(40, lean.y * 0.08))}px`,
        '--lean-r': `${Math.max(-8, Math.min(8, lean.x * 0.02))}deg`,
      } as React.CSSProperties)
    : undefined
  return (
    <div
      className={`puffy puffy--${state} ${state === 'chewing' ? `chew-${chewBeat}` : ''} ${lean ? 'is-leaning' : ''} ${sparkle ? 'has-sparkle' : ''}`}
      style={leanStyle}
      onPointerUp={onTap}
      role={onTap ? 'button' : 'img'}
      aria-label="Puffy"
    >
      <div className="puffy__shadow" aria-hidden="true" />
      <div className="puffy__steam" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="puffy__body">
        <svg viewBox="0 0 300 260" className="puffy__svg" aria-hidden="true">
          <defs>
            <radialGradient id="puffy-fill" cx="36%" cy="30%" r="78%">
              <stop offset="0%" stopColor="#FFE3F0" />
              <stop offset="58%" stopColor="#FFB6D5" />
              <stop offset="100%" stopColor="#E68FBF" />
            </radialGradient>
            <radialGradient id="puffy-belly" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g className="puffy__cloud">
            <circle cx="84" cy="128" r="52" fill="url(#puffy-fill)" />
            <circle cx="150" cy="96" r="64" fill="url(#puffy-fill)" />
            <circle cx="218" cy="124" r="54" fill="url(#puffy-fill)" />
            <ellipse cx="150" cy="160" rx="118" ry="74" fill="url(#puffy-fill)" />
            <ellipse cx="118" cy="62" rx="40" ry="14" fill="#FFF3F9" opacity="0.7" transform="rotate(-16 118 62)" />
          </g>
          <ellipse cx="150" cy="186" rx="70" ry="44" fill="url(#puffy-belly)" />
          <g className="puffy__bubbles" fill="#fff">
            <circle className="b1" cx="96" cy="182" r="9" opacity="0.5" />
            <circle className="b2" cx="206" cy="190" r="12" opacity="0.4" />
            <circle className="b3" cx="150" cy="212" r="7" opacity="0.5" />
          </g>
          <g className="puffy__sparkles" fill="#FFF6C2">
            <path className="s1" d="M104 150l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" />
            <path className="s2" d="M204 142l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" />
            <path className="s3" d="M176 78l2.5 7 7 2.5-7 2.5-2.5 7-2.5-7-7-2.5 7-2.5z" />
          </g>
          <Cheeks state={state} />
          <Eyes state={state} />
          <Mouth state={state} />
          {state === 'sad' && <path className="puffy__tear" d="M104 132q7 13 0 20q-8-7 0-20" fill="#9ED9FF" />}
          {state === 'spicy' && (
            <g className="puffy__fan" stroke="#FF7A59" strokeWidth="5" strokeLinecap="round" fill="none">
              <path d="M118 186q-14 8-30 4" />
              <path d="M116 198q-10 12-24 14" />
              <path d="M182 186q14 8 30 4" />
              <path d="M184 198q10 12 24 14" />
            </g>
          )}
        </svg>
        {/* Belly window: fed snacks bob inside the cloud */}
        <div className="puffy__belly" aria-hidden="true">
          {fed.map((el, i) => (
            <div key={`${el.id}-${i}`} className={`belly-snack belly-snack--${i}`}>
              <SnackArt element={el} mood="happy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const INK = '#5C2744'

function Cheeks({ state }: { state: PuffyState }) {
  const hot = state === 'spicy'
  return (
    <g className="puffy__cheeks" fill={hot ? '#FF6F61' : '#FF8FBF'} opacity={hot ? 0.85 : 0.55}>
      <ellipse className="cheek-l" cx="98" cy="160" rx={hot ? 22 : 17} ry={hot ? 15 : 12} />
      <ellipse className="cheek-r" cx="202" cy="160" rx={hot ? 22 : 17} ry={hot ? 15 : 12} />
    </g>
  )
}

function Eyes({ state }: { state: PuffyState }) {
  const closedHappy = state === 'delighted' || state === 'proud' || state === 'chewing'
  const closedSleepy = state === 'sleepy'
  const squeeze = state === 'spicy'
  if (closedHappy) {
    return (
      <g stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M106 128q14-15 28 0" />
        <path d="M166 128q14-15 28 0" />
      </g>
    )
  }
  if (closedSleepy) {
    return (
      <g stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M106 126q14 9 28 0" />
        <path d="M166 126q14 9 28 0" />
      </g>
    )
  }
  if (squeeze) {
    return (
      <g stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M106 118l22 9-22 9" />
        <path d="M194 118l-22 9 22 9" />
      </g>
    )
  }
  const up = state === 'thinking' || state === 'curious'
  const sad = state === 'sad' || state === 'shrug'
  const big = state === 'hungry' || state === 'encouraging'
  const cy = up ? 116 : 126
  const r = big ? 17 : 15
  return (
    <g className="puffy__eyes">
      <circle cx="120" cy={cy} r={r} fill="#fff" />
      <circle cx="180" cy={cy} r={r} fill="#fff" />
      <circle className="pupil" cx={up ? 118 : 122} cy={up ? cy - 5 : cy + 1} r={big ? 8.5 : 7} fill={INK} />
      <circle className="pupil" cx={up ? 178 : 182} cy={up ? cy - 5 : cy + 1} r={big ? 8.5 : 7} fill={INK} />
      <circle cx={up ? 115 : 119} cy={cy - 6} r="2.8" fill="#fff" />
      <circle cx={up ? 175 : 179} cy={cy - 6} r="2.8" fill="#fff" />
      {sad && (
        <g stroke={INK} strokeWidth="4.5" strokeLinecap="round">
          <path d="M104 104l20-6" />
          <path d="M196 104l-20-6" />
        </g>
      )}
      {up && (
        <path d="M166 94q14-10 28-2" stroke={INK} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      )}
    </g>
  )
}

function Mouth({ state }: { state: PuffyState }) {
  const line = (d: string) => (
    <path d={d} fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  )
  const open = (d: string) => <path d={d} fill="#8E3A63" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
  switch (state) {
    case 'hungry':
      return (
        <g>
          {open('M122 160q28 46 56 0q-28 10-56 0z')}
          <path d="M136 176q14 10 28 0q-14 12-28 0z" fill="#FF8FB1" />
        </g>
      )
    case 'gulp':
      return line('M134 170q16-8 32 0')
    case 'chewing':
      return line('M128 170q11-9 22 0q11 9 22 0')
    case 'thinking':
      return line('M138 174q12-6 24 0')
    case 'delighted':
    case 'proud':
      return open('M120 158q30 40 60 0q-30 14-60 0z')
    case 'spitting':
      return open('M136 160a14 16 0 1 0 28 0a14 16 0 1 0-28 0z')
    case 'curious':
      return open('M140 170a10 9 0 1 0 20 0a10 9 0 1 0-20 0z')
    case 'shrug':
      return line('M134 176q16-4 32 4')
    case 'sad':
      return line('M134 180q16-14 32 0')
    case 'encouraging':
      return open('M128 162q22 30 44 0q-22 8-44 0z')
    case 'spicy':
      return (
        <g>
          {open('M130 162q20 26 40 0q-20 8-40 0z')}
          <path d="M142 172q8 26 16 0z" fill="#FF6F8F" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        </g>
      )
    case 'sleepy':
      return open('M142 172a8 10 0 1 0 16 0a8 10 0 1 0-16 0z')
    default:
      return line('M132 166q18 16 36 0')
  }
}
