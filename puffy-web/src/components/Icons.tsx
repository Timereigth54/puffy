// Authored icons for the bath-time world. Child-facing ones are foam objects
// (duck, book, play); parent-facing ones are simple strokes.

const INK = '#3A2233'

export function DuckIcon() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="icon icon--duck">
      <defs>
        <radialGradient id="duck-body" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFF3A6" />
          <stop offset="55%" stopColor="#FFD94A" />
          <stop offset="100%" stopColor="#F0B21F" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="98" rx="42" ry="7" fill="#7FC8F0" opacity="0.45" />
      <path d="M18 70c0-14 12-22 26-22h8c-10-8-10-30 8-36c18-6 34 6 32 22c0 8-5 12-8 15h10c8 0 10 7 5 12c-6 8-14 11-22 11H40c-12 0-22-8-22-20Z" fill="url(#duck-body)" />
      <path d="M40 70q16 14 36 2q-6 14-22 14q-12 0-14-16Z" fill="#F0B21F" />
      <path d="M90 26l20 4c3 1 3 4 0 5l-20 5Z" fill="#FF8A3D" />
      <path d="M90 32h18" stroke="#E0692A" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="76" cy="24" r="6" fill="#fff" />
      <circle cx="77.5" cy="24.5" r="3.6" fill={INK} />
      <circle cx="76" cy="22.5" r="1.3" fill="#fff" />
      <ellipse cx="72" cy="36" rx="6" ry="4" fill="#FF9FB8" opacity="0.7" />
      <ellipse cx="54" cy="22" rx="8" ry="5" fill="#fff" opacity="0.6" transform="rotate(-25 54 22)" />
    </svg>
  )
}

export function BookIcon() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="icon icon--book">
      <path d="M22 26h70a10 10 0 0 1 10 10v58a10 10 0 0 1-10 10H22Z" fill="#B8418A" />
      {/* rainbow page edges */}
      <path d="M92 30v68" stroke="#FFF6FB" strokeWidth="6" />
      <path d="M96 34v60" stroke="#FFD966" strokeWidth="3" />
      <path d="M99 38v52" stroke="#7FD4FF" strokeWidth="3" />
      <path d="M16 20h70a10 10 0 0 1 10 10v58a10 10 0 0 1-10 10H16a6 6 0 0 1-6-6V26a6 6 0 0 1 6-6Z" fill="#FF7FB5" />
      <path d="M10 26a6 6 0 0 1 6-6h6v78h-6a6 6 0 0 1-6-6Z" fill="#E0579A" />
      {/* a Puffy sticker on the cover */}
      <g transform="translate(30 32)">
        <circle cx="10" cy="22" r="12" fill="#FFD6EA" />
        <circle cx="26" cy="14" r="15" fill="#FFD6EA" />
        <circle cx="42" cy="22" r="12" fill="#FFD6EA" />
        <ellipse cx="26" cy="28" rx="26" ry="14" fill="#FFD6EA" />
        <circle cx="20" cy="22" r="3" fill={INK} />
        <circle cx="32" cy="22" r="3" fill={INK} />
        <path d="M21 30q5 5 10 0" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
      <path d="M74 66l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#FFF6C2" />
      <path d="M36 72l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#FFF6C2" />
      <ellipse cx="34" cy="28" rx="12" ry="4" fill="#fff" opacity="0.45" />
    </svg>
  )
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="icon icon--play">
      <defs>
        <radialGradient id="jelly" cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#C8F7C5" />
          <stop offset="55%" stopColor="#6FD88A" />
          <stop offset="100%" stopColor="#35A85A" />
        </radialGradient>
      </defs>
      <ellipse cx="62" cy="66" rx="52" ry="50" fill="#2B8C4A" />
      <ellipse cx="60" cy="60" rx="52" ry="50" fill="url(#jelly)" />
      <path d="M48 36c0-6 6-9 11-6l30 20c5 4 5 10 0 14L59 84c-5 3-11 0-11-6Z" fill="#fff" />
      <ellipse cx="40" cy="30" rx="18" ry="9" fill="#fff" opacity="0.55" transform="rotate(-30 40 30)" />
      <circle cx="86" cy="86" r="4" fill="#fff" opacity="0.5" />
    </svg>
  )
}

export function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon icon--gear">
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7Zm7.4-2.1l1.8 1.4-1.8 3.1-2.1-.8a7.6 7.6 0 0 1-1.9 1.1l-.3 2.2h-3.6l-.3-2.2a7.6 7.6 0 0 1-1.9-1.1l-2.1.8-1.8-3.1 1.8-1.4a7.8 7.8 0 0 1 0-2.8L4.6 9.2l1.8-3.1 2.1.8a7.6 7.6 0 0 1 1.9-1.1l.3-2.2h3.6l.3 2.2a7.6 7.6 0 0 1 1.9 1.1l2.1-.8 1.8 3.1-1.8 1.4a7.8 7.8 0 0 1 0 2.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <rect x="9" y="3" width="6" height="12" rx="3" fill="currentColor" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function StopIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor" />
    </svg>
  )
}

export function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" fill="currentColor" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function BackspaceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="M9 5h11a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 20 19H9l-6-7Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12 9.5l5 5M17 9.5l-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
