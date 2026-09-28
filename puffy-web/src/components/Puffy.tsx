import type { Element, PuffyState } from '../game/types'
import SnackArt from './SnackArt'

// Puffy: a pink cumulus cloud. Two layers:
//  - the cloud body (CloudBody), SVG blur filters, painted once and only
//    ever moved by CSS transforms, so older iPads keep their frame rate;
//  - the face, a light SVG that changes with every state and blinks.
// Eaten snacks show through the belly window between the two.

interface Props {
  state: PuffyState
  chewBeat?: number
  fed?: Element[]
  /** Where the finger is, relative to Puffy's centre, in px. Puffy leans and looks toward it. */
  lean?: { x: number; y: number } | null
  sparkle?: boolean
  onTap?: () => void
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

export default function Puffy({ state, chewBeat = 0, fed = [], lean, sparkle, onTap }: Props) {
  const leanStyle = lean
    ? ({
        '--lean-x': `${clamp(lean.x * 0.08, -40, 40)}px`,
        '--lean-y': `${clamp(lean.y * 0.08, -10, 40)}px`,
        '--lean-r': `${clamp(lean.x * 0.02, -8, 8)}deg`,
        '--look-x': `${clamp(lean.x * 0.02, -5, 5)}px`,
        '--look-y': `${clamp(lean.y * 0.02, -4, 5)}px`,
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
      <div className="puffy__steam" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="puffy__body">
        <div className="puffy__pose">
          <CloudBody />
          {/* Belly window: fed snacks bob inside the cloud */}
          <div className="puffy__belly" aria-hidden="true">
            {fed.map((el, i) => (
              <div key={`${el.id}-${i}`} className={`belly-snack belly-snack--${i}`}>
                <SnackArt element={el} mood="happy" />
              </div>
            ))}
          </div>
          <svg viewBox="0 0 300 260" className="puffy__face" aria-hidden="true">
            <g transform="translate(150 150) scale(1.12) translate(-150 -150)">
            <g className="puffy__bubbles" fill="#fff">
              <circle className="b1" cx="96" cy="182" r="7" opacity="0.6" />
              <circle className="b2" cx="206" cy="190" r="9" opacity="0.5" />
              <circle className="b3" cx="150" cy="212" r="5" opacity="0.6" />
            </g>
            <g className="puffy__sparkles" fill="#FFF6C2">
              <path className="s1" d="M84 92l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" />
              <path className="s2" d="M224 150l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" />
              <path className="s3" d="M190 66l2.5 7 7 2.5-7 2.5-2.5 7-2.5-7-7-2.5 7-2.5z" />
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
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}

// A cumulus: a row of distinct puffs along the top, body lobes, a flat base.
// [cx, cy, r]
const TOP_PUFFS: [number, number, number][] = [
  [62, 124, 34], [96, 94, 38], [138, 70, 42], [184, 68, 42], [226, 90, 38], [256, 124, 32],
]
const BODY_LOBES: [number, number, number][] = [
  [44, 164, 30], [104, 146, 50], [160, 130, 58], [212, 146, 50], [262, 164, 30],
]
const BILLOWS = [...TOP_PUFFS, ...BODY_LOBES]

/** The cloud body. Static: it never re-renders, so its filters are painted once. */
function CloudBody() {
  return (
    <svg viewBox="-20 -20 340 300" className="puffy__cotton" aria-hidden="true">
      <defs>
        {/* one light for the whole mass: bright crowns, pink middle, shaded flat base */}
        <linearGradient id="cloud-mass" x1="0" y1="30" x2="0" y2="212" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFEAF3" />
          <stop offset="0.45" stopColor="#FFC6DF" />
          <stop offset="0.8" stopColor="#FFB6D5" />
          <stop offset="1" stopColor="#EE9CC4" />
        </linearGradient>
        <radialGradient id="cloud-side" cx="30" cy="40" r="300" gradientUnits="userSpaceOnUse">
          <stop offset="0.35" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#D9779F" stopOpacity="0.28" />
        </radialGradient>
        <clipPath id="cloud-clip">
          <rect x="30" y="150" width="244" height="60" rx="30" />
          {BILLOWS.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} />
          ))}
        </clipPath>
        {/* feathered edge: a real cloud has no hard outline */}
        <filter id="cloud-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="halo" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.9" result="body" />
          <feMerge>
            <feMergeNode in="halo" />
            <feMergeNode in="body" />
          </feMerge>
        </filter>
        <filter id="cloud-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <g filter="url(#cloud-soft)">
        <g fill="url(#cloud-mass)">
          <rect x="30" y="150" width="244" height="60" rx="30" />
          {BILLOWS.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} />
          ))}
        </g>
        <g clipPath="url(#cloud-clip)">
          {/* away from the window the whole mass falls into shade */}
          <rect x="20" y="20" width="280" height="200" fill="url(#cloud-side)" />
          {/* a soft fold shadow under each top puff; kept off the face */}
          <g className="cloud-creases" fill="none" stroke="#E58DB8" strokeWidth="7" strokeLinecap="round" opacity="0.35" filter="url(#cloud-blur)">
            <path d="M40 138q22 12 44 2" />
            <path d="M70 110q24 12 50 0" />
            <path d="M118 84q22 10 44 0M162 82q22 10 44 0" />
            <path d="M204 106q24 12 48 0" />
            <path d="M236 140q20 10 40-2" />
          </g>
          {/* only the crowns catch the window light */}
          <g className="cloud-crowns" fill="#FFFFFF" filter="url(#cloud-blur)">
            <ellipse cx="130" cy="42" rx="26" ry="10" opacity="0.85" />
            <ellipse cx="178" cy="40" rx="24" ry="9" opacity="0.7" />
            <ellipse cx="88" cy="66" rx="20" ry="8" opacity="0.7" />
            <ellipse cx="54" cy="100" rx="14" ry="7" opacity="0.5" />
          </g>
        </g>
      </g>
    </svg>
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
