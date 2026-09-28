import type { PuffyState } from '../game/types'

// Puffy the cloud — SVG character with expressions for every game state.
// Soft pink, semi-transparent, internal bubbles and sparkles.

interface PuffyProps {
  state: PuffyState
  chewBeat?: number
  onClick?: () => void
}

export default function Puffy({ state, chewBeat = 0, onClick }: PuffyProps) {
  const mouth = mouthPath(state)
  const eyes = eyeShape(state)
  const showTear = state === 'sad'
  const sparkleOpacity =
    state === 'delighted' || state === 'proud' || state === 'spitting'
      ? 1
      : state === 'sad'
        ? 0.15
        : 0.55

  return (
    <div
      className={`puffy-wrap puffy-${state} ${state === 'chewing' ? `chew-beat-${chewBeat}` : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <svg viewBox="0 0 300 260" className="puffy-svg">
        <defs>
          <radialGradient id="puffyGrad" cx="45%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#FFD6E8" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#FFB6D5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E68FBF" stopOpacity="0.95" />
          </radialGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* Cloud body */}
        <g className="puffy-body">
          <ellipse cx="150" cy="150" rx="105" ry="78" fill="url(#puffyGrad)" />
          <circle cx="85" cy="120" r="48" fill="url(#puffyGrad)" />
          <circle cx="150" cy="95" r="58" fill="url(#puffyGrad)" />
          <circle cx="215" cy="120" r="48" fill="url(#puffyGrad)" />
          {/* rim light */}
          <ellipse cx="150" cy="85" rx="70" ry="22" fill="#FFE9F4" opacity="0.55" filter="url(#soft)" />
        </g>

        {/* Internal bubbles */}
        <g opacity="0.5">
          <circle className="inner-bubble b1" cx="110" cy="165" r="10" fill="#fff" opacity="0.55" />
          <circle className="inner-bubble b2" cx="185" cy="175" r="14" fill="#fff" opacity="0.45" />
          <circle className="inner-bubble b3" cx="150" cy="195" r="8" fill="#fff" opacity="0.5" />
        </g>

        {/* Internal sparkles */}
        <g opacity={sparkleOpacity}>
          <path className="puffy-sparkle s1" d="M120 140 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z" fill="#FFF3B0" />
          <path className="puffy-sparkle s2" d="M185 130 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill="#FFF3B0" />
          <path className="puffy-sparkle s3" d="M155 115 l2.5 7 7 2.5 -7 2.5 -2.5 7 -2.5 -7 -7 -2.5 7 -2.5 z" fill="#FFF" />
        </g>

        {/* Cheeks (puff during chew/gulp) */}
        <ellipse className="cheek cheek-l" cx="98" cy="155" rx="16" ry="12" fill="#FF8FBF" opacity="0.6" />
        <ellipse className="cheek cheek-r" cx="202" cy="155" rx="16" ry="12" fill="#FF8FBF" opacity="0.6" />

        {/* Eyes */}
        {eyes}

        {/* Mouth */}
        <path d={mouth.d} fill={mouth.fill} stroke="#A64D79" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fillOpacity={mouth.fill === 'none' ? 0 : 1} />

        {/* Tear (sad) */}
        {showTear && (
          <g className="tear">
            <path d="M100 130 q6 12 0 18 q-7 -6 0 -18" fill="#9ED9FF" />
          </g>
        )}

        {/* Thought bubble stem (curious) */}
        {state === 'curious' && (
          <g className="thought-stem">
            <circle cx="245" cy="80" r="7" fill="#fff" opacity="0.95" />
            <circle cx="262" cy="58" r="10" fill="#fff" opacity="0.95" />
          </g>
        )}
      </svg>
    </div>
  )
}

function eyeShape(state: PuffyState) {
  const lookUp = state === 'thinking' || state === 'curious'
  const cy = lookUp ? 112 : 122
  const closed =
    state === 'delighted' || state === 'proud' || state === 'chewing' || state === 'sleepy'

  if (closed) {
    return (
      <g>
        <path d="M108 122 q12 -12 24 0" fill="none" stroke="#5C374C" strokeWidth="5" strokeLinecap="round" />
        <path d="M168 122 q12 -12 24 0" fill="none" stroke="#5C374C" strokeWidth="5" strokeLinecap="round" />
      </g>
    )
  }
  return (
    <g className="puffy-eyes">
      <circle cx="120" cy={cy} r="13" fill="#fff" />
      <circle cx="180" cy={cy} r="13" fill="#fff" />
      <circle className="pupil" cx={lookUp ? 120 : 122} cy={lookUp ? cy - 3 : cy} r="6" fill="#5C374C" />
      <circle className="pupil" cx={lookUp ? 180 : 182} cy={lookUp ? cy - 3 : cy} r="6" fill="#5C374C" />
      <circle cx={lookUp ? 118 : 120} cy={cy - 5} r="2.2" fill="#fff" />
      <circle cx={lookUp ? 178 : 180} cy={cy - 5} r="2.2" fill="#fff" />
    </g>
  )
}

function mouthPath(state: PuffyState): { d: string; fill: string } {
  switch (state) {
    case 'hungry':
    case 'gulp':
      return { d: 'M132 168 q18 26 36 0 q-8 8 -18 8 q-10 0 -18 -8 z', fill: '#8E3A63' }
    case 'chewing':
      return { d: 'M130 168 q10 -8 20 0 q10 8 20 0', fill: 'none' }
    case 'thinking':
      return { d: 'M140 170 q10 -6 20 0', fill: 'none' }
    case 'delighted':
    case 'proud':
      return { d: 'M125 162 q25 32 50 0 q-25 14 -50 0 z', fill: '#8E3A63' }
    case 'spitting':
      return { d: 'M128 162 q22 34 44 0 q-22 20 -44 0 z', fill: '#8E3A63' }
    case 'curious':
      return { d: 'M140 168 q10 -8 20 0 q-10 6 -20 0 z', fill: '#8E3A63' }
    case 'shrug':
      return { d: 'M138 172 q12 -4 24 0', fill: 'none' }
    case 'sad':
      return { d: 'M135 176 q15 -12 30 0', fill: 'none' }
    case 'encouraging':
      return { d: 'M132 166 q18 20 36 0', fill: 'none' }
    case 'sleepy':
      return { d: 'M140 172 q10 6 20 0', fill: 'none' }
    default:
      return { d: 'M134 166 q16 14 32 0', fill: 'none' }
  }
}
