// Authored icons for the bath-time world. Child-facing ones are foam objects
// (duck, book, play); parent-facing ones are simple strokes.

const INK = '#3A2233'

export function DuckIcon() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="icon icon--duck">
      <g transform="translate(3 4)" fill="#D9A400">
        <path d="M20 64c0-12 10-20 22-20h6c-8-6-8-24 6-30c14-6 28 4 26 18c0 6-4 10-6 12h8c6 0 8 6 4 10c-4 6-10 8-16 8H34c-8 0-14-6-14-14v16Z" />
      </g>
      <path d="M20 64c0-12 10-20 22-20h6c-8-6-8-24 6-30c14-6 28 4 26 18c0 6-4 10-6 12h8c6 0 8 6 4 10c-4 6-10 8-16 8H34c-8 0-14-6-14-14v16Z" fill="#FFD966" />
      <path d="M82 28l14 4-14 6Z" fill="#FF8A3D" />
      <circle cx="68" cy="24" r="4" fill={INK} />
      <path d="M40 58q12 10 26 2" fill="none" stroke="#E0B400" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function BookIcon() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="icon icon--book">
      <path d="M18 22h28c6 0 4 4 4 8v52c-2-4-6-6-10-6H18Z" transform="translate(4 5)" fill="#C75A8E" />
      <path d="M82 22H54c-6 0-4 4-4 8v52c2-4 6-6 10-6h22Z" transform="translate(4 5)" fill="#C75A8E" />
      <path d="M18 22h28c6 0 4 4 4 8v52c-2-4-6-6-10-6H18Z" fill="#FF8FBF" />
      <path d="M82 22H54c-6 0-4 4-4 8v52c2-4 6-6 10-6h22Z" fill="#FF8FBF" />
      <path d="M62 34l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#FFF6C2" />
      <circle cx="32" cy="44" r="7" fill="#7FD4FF" />
      <rect x="25" y="56" width="14" height="10" rx="3" fill="#FFD966" />
    </svg>
  )
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="icon icon--play">
      <path d="M36 24c0-6 6-9 11-6l34 24c5 4 5 10 0 14L47 80c-5 3-11 0-11-6Z" transform="translate(4 5)" fill="#3F9E57" />
      <path d="M36 24c0-6 6-9 11-6l34 24c5 4 5 10 0 14L47 80c-5 3-11 0-11-6Z" fill="#7FD48F" />
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
