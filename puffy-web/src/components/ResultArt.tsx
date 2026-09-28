import type { ArtId } from '../game/types'

// Discovery illustrations, drawn as foam bath cutouts to match the snacks.
// The #foam filter gives each part a darker cut edge offset down-right.

interface Props {
  art: ArtId
  /** Silhouette only: an undiscovered plate in the book. */
  ghost?: boolean
  className?: string
}

export default function ResultArt({ art, ghost, className = '' }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={`result-art result-art--${art} ${ghost ? 'is-ghost' : ''} ${className}`} aria-hidden="true">
      <defs>
        <filter id="foam" x="-10%" y="-10%" width="130%" height="130%">
          <feOffset in="SourceGraphic" dx="4" dy="5" result="off" />
          <feComponentTransfer in="off" result="edge">
            <feFuncR type="linear" slope="0.7" />
            <feFuncG type="linear" slope="0.7" />
            <feFuncB type="linear" slope="0.7" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="edge" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="art-glaze" cx="30%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g filter={ghost ? undefined : 'url(#foam)'} className="result-art__body">
        {ART[art]}
      </g>
    </svg>
  )
}

const INK = '#3A2233'
const smile = (x: number, y: number, w = 16) => (
  <path d={`M${x - w / 2} ${y}q${w / 2} ${w * 0.6} ${w} 0`} fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
)
const eyes = (x: number, y: number, gap = 22) => (
  <g fill={INK}>
    <circle cx={x - gap / 2} cy={y} r="4.5" />
    <circle cx={x + gap / 2} cy={y} r="4.5" />
  </g>
)

const ART: Record<ArtId, React.ReactNode> = {
  water: (
    <g>
      <path d="M18 120c20-22 40-22 60 0s40 22 60 0s30-18 44-6v58a12 12 0 0 1-12 12H30a12 12 0 0 1-12-12Z" fill="#4FB8F0" />
      <path d="M18 120c20-22 40-22 60 0s40 22 60 0s30-18 44-6" fill="none" stroke="#DDF3FF" strokeWidth="6" strokeLinecap="round" />
      <g className="art-fish">
        <path d="M76 150c14-16 40-16 50 0c-10 16-36 16-50 0Z" fill="#FFB24D" />
        <path d="M126 150l16-12v24Z" fill="#FF9A2E" />
        <circle cx="90" cy="147" r="4" fill={INK} />
      </g>
      <g className="art-drops" fill="#7FD4FF">
        <path d="M60 40c6 10 12 16 12 22a12 12 0 0 1-24 0c0-6 6-12 12-22Z" />
        <path d="M130 24c5 8 10 13 10 18a10 10 0 0 1-20 0c0-5 5-10 10-18Z" />
        <path d="M156 70c4 6 8 10 8 14a8 8 0 0 1-16 0c0-4 4-8 8-14Z" />
      </g>
    </g>
  ),
  rocket: (
    <g>
      <g className="art-flame">
        <path d="M88 150c0 20 12 34 12 34s12-14 12-34Z" fill="#FFB24D" />
        <path d="M94 150c0 12 6 22 6 22s6-10 6-22Z" fill="#FFE27A" />
      </g>
      <path d="M72 120l-18 30h28Z" fill="#FF6F8F" />
      <path d="M128 120l18 30h-28Z" fill="#FF6F8F" />
      <path d="M100 18c26 22 32 60 28 132H72c-4-72 2-110 28-132Z" fill="#F4F7FB" />
      <path d="M100 18c10 8 17 20 21 34H79c4-14 11-26 21-34Z" fill="#FF6F8F" />
      <circle cx="100" cy="88" r="17" fill="#7FD4FF" stroke="#C8D6E5" strokeWidth="5" />
      {eyes(100, 86, 12)}
    </g>
  ),
  breath: (
    <g>
      <g fill="none" stroke="#7FD4FF" strokeWidth="14" strokeLinecap="round">
        <path d="M24 80h96a22 22 0 1 0-22-22" />
        <path d="M24 116h124a20 20 0 1 1-20 20" />
        <path d="M40 150h40" />
      </g>
      <g fill="#DDF3FF" stroke="#7FD4FF" strokeWidth="4">
        <circle cx="166" cy="64" r="10" />
        <circle cx="178" cy="92" r="6" />
        <circle cx="30" cy="40" r="7" />
      </g>
    </g>
  ),
  fizz: (
    <g>
      <path d="M118 10l-12 60" stroke="#FF6F8F" strokeWidth="10" strokeLinecap="round" />
      <path d="M52 62h96l-12 118a10 10 0 0 1-10 9H74a10 10 0 0 1-10-9Z" fill="#E9F1F7" />
      <path d="M57 92h86l-9 86a8 8 0 0 1-8 7H74a8 8 0 0 1-8-7Z" fill="#9FB6C8" />
      <g className="art-bubbles" fill="#fff">
        <circle cx="84" cy="160" r="7" />
        <circle cx="112" cy="140" r="9" />
        <circle cx="96" cy="118" r="5" />
        <circle cx="122" cy="168" r="5" />
      </g>
      {eyes(100, 108, 26)}
    </g>
  ),
  salt: (
    <g>
      <path d="M64 40h72l6 18H58Z" fill="#C9CED6" />
      <path d="M58 58h84v112a14 14 0 0 1-14 14H72a14 14 0 0 1-14-14Z" fill="#F4EDE4" />
      <g fill="#8E97A3">
        <circle cx="84" cy="48" r="3" />
        <circle cx="100" cy="48" r="3" />
        <circle cx="116" cy="48" r="3" />
      </g>
      <path d="M58 132h84v38a14 14 0 0 1-14 14H72a14 14 0 0 1-14-14Z" fill="#FFFFFF" />
      {eyes(100, 98, 28)}
      {smile(100, 112, 20)}
      <g className="art-grains" fill="#FFFFFF" stroke="#C9CED6" strokeWidth="2">
        <rect x="40" y="16" width="8" height="8" rx="2" />
        <rect x="150" y="22" width="7" height="7" rx="2" />
        <rect x="160" y="60" width="8" height="8" rx="2" />
      </g>
    </g>
  ),
  flame: (
    <g>
      <ellipse cx="100" cy="164" rx="70" ry="18" fill="#6E6875" />
      <ellipse cx="100" cy="158" rx="52" ry="11" fill="#9A94A2" />
      <g className="art-flame">
        <path d="M100 32c30 40 42 62 42 88a42 42 0 0 1-84 0c0-26 12-48 42-88Z" fill="#FFB24D" />
        <path d="M100 80c18 26 24 38 24 52a24 24 0 0 1-48 0c0-14 6-26 24-52Z" fill="#FFE27A" />
        <path d="M100 134a18 10 0 0 1 36 4H64a18 10 0 0 1 36-4Z" fill="#7FD4FF" />
      </g>
      {eyes(100, 116, 22)}
    </g>
  ),
  diamond: (
    <g>
      <path d="M60 50h80l34 38-74 90-74-90Z" fill="#BFE9FF" />
      <path d="M60 50l14 38h52l14-38Z" fill="#DDF3FF" />
      <path d="M26 88h148l-74 90Z" fill="#8FD3F7" />
      <path d="M74 88l26 90 26-90Z" fill="#A9DDFA" />
      {eyes(100, 108, 26)}
      {smile(100, 124, 18)}
      <g className="art-glints" fill="#FFF6C2">
        <path d="M168 30l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" />
        <path d="M30 34l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" />
      </g>
    </g>
  ),
  tummy: (
    <g>
      <ellipse cx="100" cy="112" rx="72" ry="66" fill="#FFC9A8" />
      <ellipse cx="100" cy="124" rx="44" ry="36" fill="#C6E377" />
      <g className="art-bubbles" fill="#EEF8C8">
        <circle cx="84" cy="130" r="7" />
        <circle cx="112" cy="116" r="9" />
        <circle cx="106" cy="142" r="5" />
      </g>
      {eyes(100, 70, 34)}
      {smile(100, 86, 22)}
      <circle cx="100" cy="164" r="4" fill="#E0A184" />
    </g>
  ),
  balloon: (
    <g>
      <path className="art-string" d="M100 150c-10 14 10 22 0 42" fill="none" stroke="#9E86B8" strokeWidth="4" strokeLinecap="round" />
      <path d="M100 16c36 0 58 28 58 62c0 38-30 64-58 70c-28-6-58-32-58-70c0-34 22-62 58-62Z" fill="#E6C8FF" />
      <path d="M92 148h16l-8 10Z" fill="#C9A6EE" />
      <ellipse cx="76" cy="50" rx="12" ry="20" fill="#fff" opacity="0.55" transform="rotate(20 76 50)" />
      {eyes(100, 80, 26)}
      {smile(100, 96, 16)}
    </g>
  ),
}
