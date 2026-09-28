import { useEffect, useRef, useState } from 'react'
import { MicIcon, SpeakerIcon, StopIcon } from './Icons'
import { loadNameRecording } from '../game/store'

// Parent-facing: record the child's name once. The clip stays on this device.

interface Props {
  initialName: string | null
  onSave: (name: string | null, recording: Blob | null | undefined) => void
  saveLabel?: string
  onSkip?: () => void
}

type Rec = 'idle' | 'recording' | 'denied' | 'unsupported'

const MAX_MS = 4000

export default function NameRecorder({ initialName, onSave, saveLabel = 'Save', onSkip }: Props) {
  const [name, setName] = useState(initialName ?? '')
  const [rec, setRec] = useState<Rec>(() =>
    typeof MediaRecorder === 'undefined' || !navigator.mediaDevices?.getUserMedia ? 'unsupported' : 'idle',
  )
  /** undefined = unchanged, null = removed, Blob = new recording */
  const [clip, setClip] = useState<Blob | null | undefined>(undefined)
  const [existing, setExisting] = useState<Blob | null>(null)
  const recorder = useRef<MediaRecorder | null>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    void loadNameRecording().then(setExisting)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
      recorder.current?.stream.getTracks().forEach((t) => t.stop())
    }
  }, [])

  const current = clip === undefined ? existing : clip

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
      const type = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm'].find((t) => MediaRecorder.isTypeSupported(t))
      const r = new MediaRecorder(stream, type ? { mimeType: type } : undefined)
      const chunks: Blob[] = []
      r.ondataavailable = (e) => e.data.size && chunks.push(e.data)
      r.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
        setClip(new Blob(chunks, { type: r.mimeType }))
        setRec('idle')
      }
      recorder.current = r
      r.start()
      setRec('recording')
      timer.current = window.setTimeout(stop, MAX_MS)
    } catch {
      setRec('denied')
    }
  }

  const stop = () => {
    if (timer.current) window.clearTimeout(timer.current)
    if (recorder.current?.state === 'recording') recorder.current.stop()
  }

  const play = () => {
    if (!current) return
    const url = URL.createObjectURL(current)
    const a = new Audio(url)
    a.onended = () => URL.revokeObjectURL(url)
    void a.play()
  }

  return (
    <div className="name-recorder">
      <label className="field">
        <span className="field__label">Child's first name</span>
        <input
          className="field__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Ada"
          autoComplete="off"
          maxLength={24}
        />
      </label>

      <div className="rec">
        {rec === 'recording' ? (
          <button type="button" className="btn btn--rec is-live" onClick={stop}>
            <StopIcon /> Stop
          </button>
        ) : (
          <button type="button" className="btn btn--rec" onClick={start} disabled={rec === 'unsupported'}>
            <MicIcon /> {current ? 'Record again' : 'Record their name'}
          </button>
        )}
        {current && rec !== 'recording' && (
          <button type="button" className="btn btn--quiet" onClick={play}>
            <SpeakerIcon /> Play back
          </button>
        )}
        {current && rec !== 'recording' && (
          <button type="button" className="btn btn--quiet" onClick={() => setClip(null)}>
            Remove
          </button>
        )}
      </div>
      <p className="hint">
        {rec === 'recording' && 'Say the name once, warmly. Recording stops by itself after 4 seconds.'}
        {rec === 'idle' && 'Puffy’s narrator will say the name in your voice when your child discovers something. It never leaves this device.'}
        {rec === 'denied' && 'The microphone was blocked. You can allow it in the browser settings, or just type the name.'}
        {rec === 'unsupported' && 'This browser cannot record audio. A typed name will be spoken by the device voice instead.'}
      </p>

      <div className="actions">
        {onSkip && (
          <button type="button" className="btn btn--quiet" onClick={onSkip}>
            Skip for now
          </button>
        )}
        <button type="button" className="btn btn--primary" onClick={() => onSave(name.trim() || null, clip)} disabled={rec === 'recording'}>
          {saveLabel}
        </button>
      </div>
    </div>
  )
}
