// Puffy's non-verbal sounds are synthesized with WebAudio (no assets).
// The narrator plays pre-rendered clips from /voice when a clip exists for a
// line, and falls back to the browser's speech synthesis when it does not.
import type { Beat, Script } from './engine'
import { lineKey } from './lines'

// Sound must never break play. Tablets without WebAudio (or with it blocked,
// or interrupted by a phone call on iOS) get silence, and the game carries on.
let ctx: AudioContext | null = null
let ctxFailed = false
let sfxBus: GainNode | null = null
let voiceBus: GainNode | null = null

type WindowWithWebkitAudio = Window & { webkitAudioContext?: typeof AudioContext }

function ac(): AudioContext | null {
  if (!ctx && !ctxFailed) {
    // Safari before iOS 14.5 only has the prefixed constructor.
    const Ctor = window.AudioContext ?? (window as WindowWithWebkitAudio).webkitAudioContext
    try {
      if (!Ctor) throw new Error('no WebAudio')
      ctx = new Ctor()
      // Levels from blueprint §17: narrator loudest, effects under it.
      sfxBus = ctx.createGain()
      sfxBus.gain.value = 0.42
      sfxBus.connect(ctx.destination)
      voiceBus = ctx.createGain()
      voiceBus.gain.value = 1
      voiceBus.connect(ctx.destination)
    } catch {
      ctxFailed = true
      ctx = null
    }
  }
  if (ctx && ctx.state !== 'running') ctx.resume().catch(() => {})
  return ctx
}

/** Old WebKit's decodeAudioData takes callbacks and returns nothing. */
function decode(c: AudioContext, data: ArrayBuffer): Promise<AudioBuffer> {
  return new Promise((resolve, reject) => {
    const r = c.decodeAudioData(data, resolve, reject) as Promise<AudioBuffer> | undefined
    r?.then(resolve, reject)
  })
}

/** Call from the first user gesture: iOS will not play audio before one. */
export function unlockAudio() {
  const c = ac()
  try {
    if (c) {
      const s = c.createBufferSource()
      s.buffer = c.createBuffer(1, 1, 22050)
      s.connect(c.destination)
      s.start(0)
    }
  } catch {
    /* silence is fine */
  }
  if (typeof speechSynthesis !== 'undefined') {
    // A silent utterance inside the gesture unlocks speech on iOS Safari.
    const u = new SpeechSynthesisUtterance(' ')
    u.volume = 0
    speechSynthesis.speak(u)
  }
}

function tone(f0: number, f1: number, dur: number, type: OscillatorType = 'sine', vol = 0.5, delay = 0) {
  const c = ac()
  if (!c) return
  const t0 = c.currentTime + delay
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(f0, t0)
  osc.frequency.exponentialRampToValueAtTime(Math.max(f1, 1), t0 + dur)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(g).connect(sfxBus!)
  osc.start(t0)
  osc.stop(t0 + dur + 0.05)
}

let noiseBuf: AudioBuffer | null = null
function noise(dur: number, vol = 0.3, delay = 0, lowpass = 1200, highpass = 0) {
  const c = ac()
  if (!c) return
  if (!noiseBuf) {
    noiseBuf = c.createBuffer(1, c.sampleRate, c.sampleRate)
    const d = noiseBuf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  }
  const t0 = c.currentTime + delay
  const src = c.createBufferSource()
  src.buffer = noiseBuf
  const lp = c.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = lowpass
  const hp = c.createBiquadFilter()
  hp.type = 'highpass'
  hp.frequency.value = highpass
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t0)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  src.connect(lp).connect(hp).connect(g).connect(sfxBus!)
  src.start(t0, Math.random() * 0.5, dur + 0.05)
}

const jitter = (n: number, amt = 0.08) => n * (1 + (Math.random() * 2 - 1) * amt)

const rawSfx = {
  tap() {
    tone(jitter(620), jitter(820), 0.07, 'sine', 0.22)
  },
  grab() {
    // wet foam lifting out of the water
    noise(0.12, 0.18, 0, 2400, 600)
    tone(jitter(420), jitter(760), 0.1, 'sine', 0.22, 0.02)
  },
  splash() {
    noise(0.35, 0.28, 0, 3200, 300)
    tone(jitter(300), 120, 0.2, 'sine', 0.12)
  },
  plop() {
    tone(jitter(700), 180, 0.12, 'sine', 0.3)
    noise(0.1, 0.12, 0.03, 1800, 400)
  },
  gulp() {
    tone(jitter(340), 90, 0.18, 'sine', 0.5)
    noise(0.08, 0.14, 0.05, 800)
  },
  chew(beat = 0) {
    const base = jitter(170 + beat * 35)
    noise(0.09, 0.3, 0, base * 3)
    tone(base, base * 0.7, 0.1, 'triangle', 0.18, 0.01)
  },
  think() {
    tone(jitter(300), 340, 0.15, 'sine', 0.2)
    tone(340, jitter(300), 0.15, 'sine', 0.18, 0.18)
  },
  giggle() {
    const b = jitter(700, 0.1)
    tone(b, b * 1.28, 0.09, 'sine', 0.3)
    tone(b * 1.28, b * 1.57, 0.09, 'sine', 0.3, 0.1)
    tone(b * 1.57, b * 1.14, 0.12, 'sine', 0.28, 0.2)
  },
  chime() {
    tone(880, 880, 0.4, 'sine', 0.25)
    tone(1320, 1320, 0.5, 'sine', 0.15, 0.05)
    tone(1760, 1760, 0.6, 'sine', 0.08, 0.1)
  },
  spit(sweet: boolean) {
    if (sweet) {
      noise(0.25, 0.3, 0, 900)
      tone(520, 260, 0.2, 'sine', 0.2)
    } else {
      tone(420, 150, 0.12, 'square', 0.1)
      noise(0.15, 0.28, 0.08, 1400)
      tone(200, 80, 0.15, 'sawtooth', 0.08, 0.1)
    }
  },
  bubble() {
    tone(jitter(500), jitter(1100), 0.07, 'sine', 0.16)
  },
  pop() {
    tone(jitter(900), 1600, 0.05, 'sine', 0.28)
    noise(0.04, 0.15, 0, 5000, 1500)
  },
  sad() {
    tone(400, 270, 0.3, 'sine', 0.18)
    tone(270, 210, 0.35, 'sine', 0.12, 0.26)
  },
  boing() {
    tone(150, 520, 0.18, 'sine', 0.28)
    tone(520, 260, 0.22, 'sine', 0.22, 0.18)
  },
  fanfare(large: boolean) {
    const notes = large ? [523, 659, 784, 1047, 784, 1047] : [523, 659, 784]
    notes.forEach((n, i) => tone(n, n, 0.22, 'triangle', 0.22, i * 0.13))
  },
  sparkle() {
    for (let i = 0; i < 8; i++) tone(1200 + Math.random() * 1400, 1800 + Math.random() * 1200, 0.07, 'sine', 0.08, i * 0.05)
  },
  spicy() {
    // "hoo-hoo-hoo!" fanning a hot mouth
    for (let i = 0; i < 3; i++) noise(0.12, 0.22, i * 0.16, 2600, 900)
    tone(700, 1100, 0.12, 'sine', 0.14, 0.05)
  },
  yawn() {
    tone(320, 150, 0.9, 'sine', 0.2)
  },
}

/** Every effect is wrapped: a throwing audio node must never stop the game loop. */
export const sfx = Object.fromEntries(
  Object.entries(rawSfx).map(([k, fn]) => [
    k,
    (...args: unknown[]) => {
      try {
        ;(fn as (...a: unknown[]) => void)(...args)
      } catch {
        /* no sound this time */
      }
    },
  ]),
) as typeof rawSfx

// ─── Narrator ───────────────────────────────────────────────────────────────
let voiceEnabled = true
let manifest: Record<string, string> | null = null
let manifestLoading: Promise<void> | null = null
let nameClip: AudioBuffer | null = null
let nameBlob: Blob | null = null
let childName: string | null = null
let speechVoice: SpeechSynthesisVoice | null = null
let generation = 0
let current: { stop: () => void } | null = null
const bufferCache = new Map<string, Promise<AudioBuffer | null>>()

export function setVoiceEnabled(on: boolean) {
  voiceEnabled = on
  if (!on) stopVoice()
}

export function setChildName(name: string | null) {
  childName = name
}

export async function setNameClip(blob: Blob | null) {
  nameBlob = blob
  nameClip = null
  const c = blob ? ac() : null
  if (!blob || !c) return
  try {
    nameClip = await decode(c, await blob.arrayBuffer())
  } catch {
    nameClip = null
  }
}

function loadManifest(): Promise<void> {
  if (!manifestLoading) {
    manifestLoading = fetch(`${import.meta.env.BASE_URL}voice/manifest.json`)
      .then((r) => (r.ok ? r.json() : {}))
      .then((m) => {
        manifest = m
      })
      .catch(() => {
        manifest = {}
      })
  }
  return manifestLoading
}

function clipBuffer(file: string): Promise<AudioBuffer | null> {
  let p = bufferCache.get(file)
  if (!p) {
    p = fetch(`${import.meta.env.BASE_URL}voice/${file}`)
      .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject()))
      .then((b) => {
        const c = ac()
        return c ? decode(c, b) : null
      })
      .catch(() => null)
    bufferCache.set(file, p)
  }
  return p
}

function pickSpeechVoice() {
  if (typeof speechSynthesis === 'undefined') return
  const voices = speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'))
  speechVoice =
    voices.find((v) => /samantha|karen|moira|tessa|serena/i.test(v.name)) ??
    voices.find((v) => /female|zira|aria|jenny/i.test(v.name)) ??
    voices[0] ??
    null
}
if (typeof speechSynthesis !== 'undefined') {
  pickSpeechVoice()
  speechSynthesis.addEventListener?.('voiceschanged', pickSpeechVoice)
}

function playBuffer(buf: AudioBuffer): Promise<void> {
  return new Promise((resolve) => {
    const c = ac()
    if (!c) return resolve()
    const src = c.createBufferSource()
    src.buffer = buf
    src.connect(voiceBus!)
    src.onended = () => resolve()
    current = {
      stop: () => {
        try {
          src.stop()
        } catch {
          /* already stopped */
        }
        resolve()
      },
    }
    src.start()
  })
}

function speak(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof speechSynthesis === 'undefined') return resolve()
    const u = new SpeechSynthesisUtterance(text)
    if (speechVoice) u.voice = speechVoice
    u.pitch = 1.2
    u.rate = 0.85 // blueprint §10: ~80% of conversational pace
    // iOS sometimes never fires onend; cap the wait by text length.
    const cap = window.setTimeout(resolve, 1200 + text.length * 90)
    u.onend = u.onerror = () => {
      clearTimeout(cap)
      resolve()
    }
    current = {
      stop: () => {
        clearTimeout(cap)
        speechSynthesis.cancel()
        resolve()
      },
    }
    speechSynthesis.speak(u)
  })
}

/** For tablets without WebAudio: play the file with a plain audio element. */
function playElement(src: string, revoke = false): Promise<void> {
  return new Promise((resolve) => {
    const a = new Audio(src)
    const done = () => {
      if (revoke) URL.revokeObjectURL(src)
      resolve()
    }
    a.onended = a.onerror = done
    current = {
      stop: () => {
        a.pause()
        done()
      },
    }
    a.play().catch(done)
  })
}

async function playBeat(beat: Beat): Promise<void> {
  if (typeof beat !== 'string') {
    if (nameClip) return playBuffer(nameClip)
    if (nameBlob && !ac()) return playElement(URL.createObjectURL(nameBlob), true)
    return speak(childName ? `${childName}!` : 'Wow!')
  }
  await loadManifest()
  const file = manifest?.[lineKey(beat)]
  if (file) {
    if (!ac()) return playElement(`${import.meta.env.BASE_URL}voice/${file}`)
    const buf = await clipBuffer(file)
    if (buf) return playBuffer(buf)
  }
  return speak(beat)
}

/** Rough reading time for a line when voice is off, so beats still breathe. */
export function silentDuration(script: Script): number {
  const chars = script.reduce<number>((n, b) => n + (typeof b === 'string' ? b.length : 6), 0)
  return Math.max(700, chars * 45)
}

/**
 * Speaks beats in order, each starting when the previous ends. Starting a new
 * script stops the old one. Resolves when finished or interrupted.
 */
export async function say(script: Script): Promise<void> {
  stopVoice()
  const gen = ++generation
  if (!voiceEnabled) {
    await wait(silentDuration(script))
    return
  }
  for (const beat of script) {
    if (gen !== generation) return
    await playBeat(beat)
    if (gen !== generation) return
    await wait(120)
  }
}

export function stopVoice() {
  generation++
  current?.stop()
  current = null
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel()
}

export function wait(ms: number) {
  return new Promise<void>((r) => window.setTimeout(r, ms))
}

/** Warm the clip cache for lines about to be needed. */
export async function preload(lines: string[]) {
  await loadManifest()
  for (const l of lines) {
    const f = manifest?.[lineKey(l)]
    if (f) void clipBuffer(f)
  }
}
