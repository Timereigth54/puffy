import type { ReactNode } from 'react'

// The one room every child-facing screen lives in: a pink tile wall with a
// window light from the top-left, and a bathtub whose water is the snack tray.

interface Props {
  children?: ReactNode
  /** Rendered on the water surface, in the tub. */
  tub?: ReactNode
  /** 0..1: bath-time light warming toward evening as the time limit nears. */
  evening?: number
  className?: string
}

export default function Bathroom({ children, tub, evening = 0, className = '' }: Props) {
  return (
    <div className={`bathroom ${className}`}>
      <div className="bathroom__wall" aria-hidden="true" />
      <div className="bathroom__window-light" aria-hidden="true" />
      <div className="bathroom__stage">{children}</div>
      <div className="tub">
        <div className="tub__water" aria-hidden="true">
          <svg className="tub__surface" viewBox="0 0 1200 60" preserveAspectRatio="none">
            <path className="tub__wave tub__wave--back" d="M0 30 Q75 14 150 30 T300 30 T450 30 T600 30 T750 30 T900 30 T1050 30 T1200 30 V60 H0Z" />
            <path className="tub__wave tub__wave--front" d="M0 36 Q75 22 150 36 T300 36 T450 36 T600 36 T750 36 T900 36 T1050 36 T1200 36 V60 H0Z" />
          </svg>
          <div className="tub__suds">
            {SUDS.map((s, i) => (
              <span key={i} style={{ left: `${s[0]}%`, width: s[1], height: s[1], animationDelay: `${s[2]}s` }} />
            ))}
          </div>
        </div>
        <div className="tub__tray">{tub}</div>
        <div className="tub__veil" aria-hidden="true" />
        <div className="tub__rim" aria-hidden="true" />
      </div>
      <div className="bathroom__evening" style={{ opacity: evening * 0.55 }} aria-hidden="true" />
    </div>
  )
}

// [left %, size px, delay s]: fixed so the suds do not jump between renders.
const SUDS: [number, number, number][] = [
  [2, 38, 0], [5, 22, 1.2], [9, 30, 0.4], [30, 18, 2.1], [47, 26, 0.9],
  [52, 16, 1.7], [71, 20, 0.2], [88, 34, 1.4], [92, 20, 0.6], [96, 40, 2.4],
]
