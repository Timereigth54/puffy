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
  // ─── Pack 2 ───────────────────────────────────────────────────────────────
  air: (
    <g>
      <g fill="none" stroke="#DDE3FF" strokeWidth="12" strokeLinecap="round">
        <path d="M14 44h74a18 18 0 1 0-18-18" />
        <path d="M112 176h66a16 16 0 1 1-16 16" />
      </g>
      {/* two nitrogens holding on tight: N₂ */}
      <circle cx="78" cy="104" r="44" fill="#A9B8FF" />
      <circle cx="126" cy="104" r="44" fill="#95A6F7" />
      {eyes(78, 98, 20)}
      {smile(78, 114, 14)}
      {eyes(126, 98, 20)}
      {smile(126, 114, 14)}
    </g>
  ),
  spray: (
    <g>
      <path d="M78 40h44v22H78Z" fill="#6FA8C8" />
      <path d="M92 26h58l8 22h-24l-6-10H92Z" fill="#4F8FB4" />
      <path d="M118 62l14 28H72l14-28Z" fill="#6FA8C8" />
      <path d="M68 90h72v84a12 12 0 0 1-12 12H80a12 12 0 0 1-12-12Z" fill="#BFE3F2" />
      <path d="M68 130h72v44a12 12 0 0 1-12 12H80a12 12 0 0 1-12-12Z" fill="#9ED3EA" />
      {eyes(104, 116, 24)}
      {smile(104, 130, 16)}
      <g className="art-bubbles" fill="#DDF3FF">
        <circle cx="170" cy="36" r="6" />
        <circle cx="184" cy="54" r="4" />
        <circle cx="178" cy="20" r="4" />
      </g>
    </g>
  ),
  giggle: (
    <g>
      <path d="M52 150a36 36 0 0 1-8-70a44 44 0 0 1 64-30a40 40 0 0 1 58 34a32 32 0 0 1-12 66Z" fill="#FFD1E8" />
      <g fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round">
        <path d="M78 96q8-10 16 0M112 96q8-10 16 0" />
      </g>
      <path d="M84 116q19 30 38 0Z" fill={INK} />
      <path d="M92 124q11 8 22 0" fill="none" stroke="#FF8FBF" strokeWidth="5" strokeLinecap="round" />
      <g className="art-bubbles" fill="#FFB6D5">
        <circle cx="36" cy="46" r="9" />
        <circle cx="172" cy="40" r="7" />
        <circle cx="180" cy="160" r="6" />
      </g>
    </g>
  ),
  rust: (
    <g>
      <path d="M40 58l18-18 24 24-18 18Z" fill="#9AA3AD" />
      <path d="M60 66l14-14 90 90-10 22-22 2Z" fill="#8C96A1" />
      <g fill="#B5562E">
        <ellipse cx="96" cy="96" rx="14" ry="9" transform="rotate(45 96 96)" />
        <ellipse cx="130" cy="130" rx="16" ry="10" transform="rotate(45 130 130)" />
        <circle cx="52" cy="52" r="6" />
        <circle cx="150" cy="154" r="6" />
      </g>
      <g fill="#D9824F">
        <circle cx="112" cy="116" r="5" />
        <circle cx="80" cy="80" r="4" />
      </g>
      {eyes(112, 98, 18)}
      {smile(118, 110, 12)}
    </g>
  ),
  steel: (
    <g>
      <path d="M30 46h140v26h-50v56h50v26H30v-26h50V72H30Z" fill="#8FA0B0" />
      <path d="M30 46h140v10H30ZM30 128h50v8H30ZM120 128h50v8h-50Z" fill="#B7C4D0" />
      <g fill="#6D7E8E">
        <circle cx="44" cy="62" r="4" />
        <circle cx="156" cy="62" r="4" />
        <circle cx="44" cy="142" r="4" />
        <circle cx="156" cy="142" r="4" />
      </g>
      {eyes(100, 94, 16)}
      {smile(100, 108, 12)}
    </g>
  ),
  pyrite: (
    <g>
      {/* shiny cubes, the way pyrite grows */}
      <g>
        <path d="M40 118l40-20 40 20-40 20Z" fill="#F0D37A" />
        <path d="M40 118v44l40 20v-44Z" fill="#C9A227" />
        <path d="M120 118v44l-40 20v-44Z" fill="#A8861B" />
      </g>
      <g>
        <path d="M96 70l40-20 40 20-40 20Z" fill="#F0D37A" />
        <path d="M96 70v44l40 20V90Z" fill="#C9A227" />
        <path d="M176 70v44l-40 20V90Z" fill="#A8861B" />
      </g>
      {eyes(60, 146, 16)}
      {smile(60, 158, 12)}
      <g className="art-glints" fill="#FFF6C2">
        <path d="M150 30l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" />
        <path d="M34 84l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
      </g>
    </g>
  ),
  penny: (
    <g>
      <circle cx="100" cy="104" r="72" fill="#8A6A5E" />
      <circle cx="100" cy="104" r="58" fill="#5A4A48" />
      {/* one bright copper patch left: the rest has turned black */}
      <path d="M62 70a50 50 0 0 1 30-18l-4 18a34 34 0 0 0-16 10Z" fill="#D9825B" />
      <g fill="#fff">
        <circle cx="86" cy="100" r="7" />
        <circle cx="114" cy="100" r="7" />
      </g>
      <g fill={INK}>
        <circle cx="87" cy="101" r="4" />
        <circle cx="115" cy="101" r="4" />
      </g>
      <path d="M90 124q10 8 20 0" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  firework: (
    <g>
      <g stroke="#4FC9B0" strokeWidth="10" strokeLinecap="round">
        <path d="M100 96V30M100 96l47-47M100 96h66M100 96l47 47M100 96v66M100 96l-47 47M100 96H34M100 96L53 49" />
      </g>
      <g className="art-glints" fill="#7FE0A0">
        <circle cx="100" cy="22" r="8" />
        <circle cx="154" cy="42" r="8" />
        <circle cx="174" cy="96" r="8" />
        <circle cx="154" cy="150" r="8" />
        <circle cx="100" cy="170" r="8" />
        <circle cx="46" cy="150" r="8" />
        <circle cx="26" cy="96" r="8" />
        <circle cx="46" cy="42" r="8" />
      </g>
      <circle cx="100" cy="96" r="26" fill="#3BB39B" />
      {eyes(100, 92, 16)}
      {smile(100, 104, 12)}
    </g>
  ),
  ring: (
    <g>
      <ellipse cx="100" cy="116" rx="60" ry="56" fill="none" stroke="#E8A58C" strokeWidth="22" />
      <path d="M52 86a60 56 0 0 1 36-24" fill="none" stroke="#FFD7C8" strokeWidth="7" strokeLinecap="round" />
      <path d="M78 58l22-26 22 26-22 14Z" fill="#FFC9D9" />
      <path d="M78 58h44l-22 14Z" fill="#FFB0C8" />
      {eyes(100, 112, 24)}
      {smile(100, 126, 16)}
    </g>
  ),
  flash: (
    <g>
      <path d="M100 12l14 44 44-20-20 44 44 14-44 14 20 44-44-20-14 44-14-44-44 20 20-44-44-14 44-14-20-44 44 20Z" fill="#FFF6C2" />
      <circle cx="100" cy="94" r="44" fill="#F4F4F8" />
      <g fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M78 84l10 6-10 6M122 84l-10 6 10 6" />
      </g>
      <path d="M88 108q12 12 24 0Z" fill={INK} />
    </g>
  ),
  flakes: (
    <g>
      <path d="M48 98h104l-10 70a14 14 0 0 1-14 12H72a14 14 0 0 1-14-12Z" fill="#E3F1F7" />
      <path d="M44 92h112a6 6 0 0 1 0 12H44a6 6 0 0 1 0-12Z" fill="#BFDDEB" />
      <g fill="#FFFFFF" stroke="#BFDDEB" strokeWidth="2">
        <path d="M70 60l10-6 6 10-10 6Z" />
        <path d="M112 44l12-4 4 12-12 4Z" />
        <path d="M136 70l9-7 7 9-9 7Z" />
        <path d="M92 78l8-5 5 8-8 5Z" />
        <path d="M78 84l10-3 3 10-10 3Z" />
        <path d="M118 84l9-4 4 9-9 4Z" />
      </g>
      {eyes(100, 132, 26)}
      {smile(100, 146, 18)}
    </g>
  ),

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
        {/* a gas flame is blue where it meets the burner: a crescent cupping the base */}
        <path d="M59 130A42 42 0 0 0 141 130A42 20 0 0 1 59 130Z" fill="#4FB8F0" />
      </g>
      {eyes(100, 112, 22)}
      {smile(100, 124, 18)}
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
