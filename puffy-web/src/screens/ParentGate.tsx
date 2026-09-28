import { useRef, useState } from 'react'
import { BackspaceIcon, CloseIcon } from '../components/Icons'

// Apple-style parental gate: a sum a two-year-old cannot answer.

interface Props {
  onPass: () => void
  onCancel: () => void
}

function question() {
  const a = 3 + Math.floor(Math.random() * 7)
  const b = 10 - a + 1 + Math.floor(Math.random() * 5)
  return { a, b, answer: a + b }
}

export default function ParentGate({ onPass, onCancel }: Props) {
  const [q, setQ] = useState(question)
  const [entry, setEntryState] = useState('')
  const entryRef = useRef('')
  const [wrong, setWrong] = useState(false)
  const setEntry = (v: string) => {
    entryRef.current = v
    setEntryState(v)
  }

  const press = (d: string) => {
    // Read from the ref: two quick taps can land before React re-renders.
    const next = (entryRef.current + d).slice(0, 2)
    setEntry(next)
    setWrong(false)
    if (next.length === String(q.answer).length) {
      if (Number(next) === q.answer) onPass()
      else {
        setWrong(true)
        setEntry('')
        setQ(question())
      }
    }
  }

  return (
    <div className="cabinet cabinet--gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="cabinet__panel gate">
        <button type="button" className="icon-btn cabinet__close" onClick={onCancel} aria-label="Back to Puffy">
          <CloseIcon />
        </button>
        <h1 id="gate-title" className="cabinet__title">For grown-ups</h1>
        <p className="gate__q">
          What is {q.a} + {q.b}?
        </p>
        <div className="gate__entry" aria-live="polite">
          {entry || <span className="gate__placeholder">?</span>}
        </div>
        <p className={`gate__msg ${wrong ? 'is-shown' : ''}`}>Not quite. Here is a new one.</p>
        <div className="keypad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
            <button key={d} type="button" className="key" onClick={() => press(d)}>
              {d}
            </button>
          ))}
          <span />
          <button type="button" className="key" onClick={() => press('0')}>
            0
          </button>
          <button type="button" className="key key--quiet" onClick={() => setEntry(entryRef.current.slice(0, -1))} aria-label="Delete">
            <BackspaceIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
