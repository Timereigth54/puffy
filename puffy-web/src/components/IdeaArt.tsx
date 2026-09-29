import type { IdeaArtId } from '../data/content'

// Puffy's silly ideas, drawn so the joke works with the sound off and with
// no words on screen. Same foam-cutout style as ResultArt: flat fills, a
// darker edge offset down-right (#idea-foam), light from the top-left.

const INK = '#3A2233'

export default function IdeaArt({ art }: { art: IdeaArtId }) {
  return (
    <svg viewBox="0 0 200 200" className={`idea-art idea-art--${art}`} aria-hidden="true">
      <defs>
        <filter id="idea-foam" x="-10%" y="-10%" width="130%" height="130%">
          <feOffset in="SourceGraphic" dx="3" dy="4" result="off" />
          <feComponentTransfer in="off" result="edge">
            <feFuncR type="linear" slope="0.72" />
            <feFuncG type="linear" slope="0.72" />
            <feFuncB type="linear" slope="0.72" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="edge" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#idea-foam)">{IDEAS[art]}</g>
    </svg>
  )
}

/** Little white wings, flapping (see .idea-wing in world.css). */
function Wings({ x, y, span = 70 }: { x: number; y: number; span?: number }) {
  const w = 'M0 0c-10-16-30-22-40-14c8 2 10 6 4 8c8 2 10 6 2 9c10 4 24 2 34-3Z'
  return (
    <g fill="#FFFFFF">
      {/* position on the group, flap on the path: a CSS transform would replace an SVG transform attribute */}
      <g transform={`translate(${x - span / 2} ${y})`}>
        <path className="idea-wing" d={w} />
      </g>
      <g transform={`translate(${x + span / 2} ${y}) scale(-1 1)`}>
        <path className="idea-wing" d={w} />
      </g>
    </g>
  )
}

const eyes = (x: number, y: number, gap = 18) => (
  <g fill={INK}>
    <circle cx={x - gap / 2} cy={y} r="4" />
    <circle cx={x + gap / 2} cy={y} r="4" />
  </g>
)
const smile = (x: number, y: number, w = 14) => (
  <path d={`M${x - w / 2} ${y}q${w / 2} ${w * 0.6} ${w} 0`} fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
)
const sparkle = (x: number, y: number, s = 1) => (
  <path d="M0-10l2.5 7.5 7.5 2.5-7.5 2.5-2.5 7.5-2.5-7.5-7.5-2.5 7.5-2.5z" transform={`translate(${x} ${y}) scale(${s})`} fill="#FFF3A6" />
)

const IDEAS: Record<IdeaArtId, React.ReactNode> = {
  crown: (
    <g>
      <Wings x={100} y={112} span={120} />
      <path d="M46 138l-8-66 34 30 28-44 28 44 34-30-8 66Z" fill="#E0A526" strokeLinejoin="round" />
      <path d="M46 138h108v16a6 6 0 0 1-6 6H52a6 6 0 0 1-6-6Z" fill="#C98E14" />
      <g fill="#FF8FBF">
        <circle cx="72" cy="146" r="6" />
        <circle cx="128" cy="146" r="6" />
      </g>
      <circle cx="100" cy="146" r="7" fill="#7FD4FF" />
      {eyes(100, 112)}
      {smile(100, 122)}
      {sparkle(40, 50, 0.9)}
      {sparkle(166, 60, 0.8)}
    </g>
  ),
  banana: (
    <g>
      <path d="M112 150c-8 12 8 20 0 36" fill="none" stroke="#B8A21E" strokeWidth="4" strokeLinecap="round" />
      <path d="M58 44c-10 40 4 84 52 104c10 4 16-4 10-10c-34-22-44-56-38-92c2-10-20-14-24-2Z" fill="#F7E04B" />
      <path d="M58 44c-2-8 6-14 12-12l12 4c-4 2-6 6-6 10Z" fill="#8A6E1A" />
      <path d="M106 142h14l-6 10Z" fill="#B8A21E" />
      {eyes(84, 96, 16)}
      {smile(86, 108, 12)}
    </g>
  ),
  feather: (
    <g>
      <path d="M60 160C70 100 110 50 160 36c-6 50-40 104-96 126Z" fill="#E6C8FF" />
      <path d="M62 158C90 110 124 72 156 42" fill="none" stroke="#B38BE0" strokeWidth="5" strokeLinecap="round" />
      <path d="M92 118l-16-8M108 96l-16-10M124 76l-14-10M100 110l14 4M118 88l14 2" stroke="#C9A6EE" strokeWidth="4" strokeLinecap="round" />
      {sparkle(46, 60)}
      {sparkle(160, 120, 0.7)}
    </g>
  ),
  puddle: (
    <g>
      <Wings x={100} y={112} span={96} />
      <path d="M40 124c0-18 24-24 40-20c14-12 44-10 54 2c20-2 32 8 28 22c-2 14-24 18-40 16c-16 8-48 8-62 0c-14 0-20-8-20-20Z" fill="#7FD4FF" />
      <ellipse cx="82" cy="116" rx="18" ry="6" fill="#fff" opacity="0.6" />
      {eyes(100, 126)}
      {smile(100, 136)}
      <path d="M70 70c3 6 6 9 6 12a6 6 0 0 1-12 0c0-3 3-6 6-12Z M132 62c3 5 5 8 5 10a5 5 0 0 1-10 0c0-2 2-5 5-10Z" fill="#7FD4FF" />
    </g>
  ),
  bubble: (
    <g>
      <circle cx="100" cy="100" r="62" fill="#EAF6FF" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="#C9A6EE" strokeWidth="6" />
      <path d="M52 78a52 52 0 0 1 40-38" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" />
      <path d="M150 116a52 52 0 0 1-22 34" fill="none" stroke="#FFC4DE" strokeWidth="6" strokeLinecap="round" />
      {eyes(100, 100)}
      {smile(100, 112)}
      {sparkle(166, 46)}
      {sparkle(34, 150, 0.8)}
      {sparkle(160, 164, 0.6)}
    </g>
  ),
  candles: (
    <g>
      <Wings x={100} y={120} span={110} />
      {[70, 100, 130].map((x, i) => (
        <g key={x} transform={`translate(${x} ${i === 1 ? 0 : 12})`}>
          <rect x="-9" y="96" width="18" height="60" rx="5" fill={['#FF8FBF', '#7FD4FF', '#FFD966'][i]} />
          <path d="M-9 108l18-8M-9 126l18-8M-9 144l18-8" stroke="#fff" strokeWidth="4" opacity="0.7" />
          <path className="idea-flame" d="M0 60c10 12 12 20 12 26a12 12 0 0 1-24 0c0-6 2-14 12-26Z" fill="#FFB24D" />
          <path d="M0 74c5 6 6 10 6 13a6 6 0 0 1-12 0c0-3 1-7 6-13Z" fill="#FFE27A" />
        </g>
      ))}
    </g>
  ),
  house: (
    <g>
      <Wings x={100} y={110} span={112} />
      <rect x="58" y="96" width="84" height="68" rx="8" fill="#FFE8C2" />
      <path d="M46 102L100 52l54 50Z" fill="#FF7FB5" strokeLinejoin="round" />
      <rect x="88" y="126" width="24" height="38" rx="6" fill="#C75A8E" />
      <rect x="66" y="106" width="18" height="16" rx="3" fill="#7FD4FF" />
      <rect x="116" y="106" width="18" height="16" rx="3" fill="#7FD4FF" />
      <rect x="120" y="58" width="12" height="26" rx="3" fill="#C75A8E" />
      <circle cx="107" cy="146" r="2.5" fill="#FFD966" />
      {sparkle(44, 58, 0.8)}
    </g>
  ),
  scribble: (
    <g>
      <path d="M100 150c-8 12 8 20 0 36" fill="none" stroke="#9E86B8" strokeWidth="4" strokeLinecap="round" />
      <path d="M100 24c32 0 52 26 52 56c0 34-26 58-52 64c-26-6-52-30-52-64c0-30 20-56 52-56Z" fill="#E6C8FF" />
      <path d="M68 70c10-10 20 8 30-2s18 10 28 0 M62 96c12-8 22 10 34 0s20 10 34-2 M70 122c10-6 18 8 28 0s16 8 26 0" fill="none" stroke="#5B5560" strokeWidth="5" strokeLinecap="round" />
      <path d="M92 144h16l-8 10Z" fill="#C9A6EE" />
    </g>
  ),
  fries: (
    <g>
      <Wings x={100} y={128} span={100} />
      {[74, 88, 102, 116, 128].map((x, i) => (
        <rect key={x} x={x} y={52 + (i % 2) * 10} width="12" height="64" rx="4" fill="#FFD966" transform={`rotate(${(i - 2) * 6} ${x + 6} 116)`} />
      ))}
      <path d="M62 104h76l-10 60H72Z" fill="#FF6F6F" />
      <path d="M72 164h56" stroke="#D94F55" strokeWidth="4" />
      {eyes(100, 126)}
      {smile(100, 138)}
    </g>
  ),
  disco: (
    <g>
      <path d="M100 24l20 44 48 6-36 32 10 48-42-24-42 24 10-48-36-32 48-6Z" fill="#FFD966" strokeLinejoin="round" />
      <path d="M72 88h56M66 110h68M84 64v76M116 64v76" stroke="#E0B400" strokeWidth="3" opacity="0.8" />
      <path d="M86 76l14 10-6 12" fill="#FFF3A6" />
      {sparkle(40, 40)}
      {sparkle(166, 56, 0.8)}
      {sparkle(160, 160, 0.9)}
      {sparkle(34, 140, 0.6)}
    </g>
  ),
  pool: (
    <g>
      <g fill="#FFFFFF">
        <circle cx="60" cy="150" r="22" />
        <circle cx="92" cy="140" r="28" />
        <circle cx="130" cy="146" r="24" />
        <circle cx="152" cy="156" r="16" />
        <rect x="46" y="150" width="112" height="22" rx="11" />
      </g>
      <ellipse cx="100" cy="112" rx="64" ry="24" fill="#FF8FBF" />
      <ellipse cx="100" cy="108" rx="54" ry="16" fill="#4FB8F0" />
      <path d="M62 106q10-6 20 0t20 0 20 0 20 0" fill="none" stroke="#DDF3FF" strokeWidth="4" strokeLinecap="round" />
      <path d="M140 76v34M156 76v34M140 86h16M140 98h16" stroke="#C9CED6" strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  pickle: (
    <g>
      <path d="M104 152c-8 12 8 20 0 34" fill="none" stroke="#3F9E57" strokeWidth="4" strokeLinecap="round" />
      <path d="M78 40c20-20 56-8 60 26c4 30-4 66-26 82c-18 10-40-2-44-24c-6-30-6-68 10-84Z" fill="#7FD48F" />
      <g fill="#A8E6B4">
        <circle cx="94" cy="62" r="5" />
        <circle cx="118" cy="84" r="5" />
        <circle cx="90" cy="108" r="5" />
        <circle cx="116" cy="128" r="4" />
      </g>
      {eyes(104, 92)}
      {smile(104, 104)}
      <path d="M98 148h14l-7 9Z" fill="#3F9E57" />
    </g>
  ),
  squiggle: (
    <g>
      <path d="M54 110c0-40 30-60 56-50c30-18 52 14 40 40c18 22-4 54-36 44c-22 20-66 6-60-34Z" fill="#FFC4DE" />
      {eyes(100, 100)}
      {smile(100, 114)}
    </g>
  ),
}
