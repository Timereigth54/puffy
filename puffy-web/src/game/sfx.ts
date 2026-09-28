// WebAudio-synthesized Puffy sounds (non-verbal) + SpeechSynthesis narrator.
// All synthesized at runtime — no audio assets needed.

let ctx: AudioContext | null = null
let master: GainNode | null = null
let voiceEnabled = true

function ac(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext()
    master = ctx.createGain()
    master.gain.value = 0.5
    master.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

export function setVoiceEnabled(on: boolean) {
  voiceEnabled = on
  if (!on && typeof speechSynthesis !== 'undefined') speechSynthesis.cancel()
}

function tone(
  freqStart: number,
  freqEnd: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.5,
  delay = 0,
) {
  const c = ac()
  const t0 = c.currentTime + delay
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freqStart, t0)
  osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 1), t0 + duration)
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.connect(gain).connect(master!)
  osc.start(t0)
  osc.stop(t0 + duration + 0.05)
}

function noise(duration: number, volume = 0.3, delay = 0, lowpass = 1200) {
  const c = ac()
  const t0 = c.currentTime + delay
  const buffer = c.createBuffer(1, c.sampleRate * duration, c.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  const src = c.createBufferSource()
  src.buffer = buffer
  const filter = c.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = lowpass
  const gain = c.createGain()
  gain.gain.setValueAtTime(volume, t0)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  src.connect(filter).connect(gain).connect(master!)
  src.start(t0)
}

// ─── Puffy's non-verbal sounds ──────────────────────────────────────────────
export const sfx = {
  grab() {
    tone(500, 750, 0.08, 'sine', 0.25)
  },
  gulp() {
    tone(320, 90, 0.18, 'sine', 0.5)
    noise(0.08, 0.15, 0.05, 800)
  },
  chew(variant = 0) {
    const base = 180 + variant * 40 + Math.random() * 30
    noise(0.09, 0.3, 0, base * 3)
    tone(base, base * 0.7, 0.1, 'triangle', 0.2, 0.01)
  },
  think() {
    tone(300, 340, 0.15, 'sine', 0.2)
    tone(340, 300, 0.15, 'sine', 0.18, 0.18)
  },
  giggle() {
    tone(700, 900, 0.09, 'sine', 0.3)
    tone(900, 1100, 0.09, 'sine', 0.3, 0.1)
    tone(1100, 800, 0.12, 'sine', 0.28, 0.2)
  },
  chime() {
    tone(880, 880, 0.4, 'sine', 0.25)
    tone(1320, 1320, 0.5, 'sine', 0.15, 0.05)
    tone(1760, 1760, 0.6, 'sine', 0.08, 0.1)
  },
  spit(sweet: boolean) {
    if (sweet) {
      noise(0.25, 0.35, 0, 900)
      tone(500, 250, 0.2, 'sine', 0.2)
    } else {
      tone(400, 150, 0.12, 'square', 0.12)
      noise(0.15, 0.3, 0.1, 1400)
      tone(200, 80, 0.15, 'sawtooth', 0.1, 0.1)
    }
  },
  pop() {
    tone(600, 1200, 0.06, 'sine', 0.3)
  },
  sparkle() {
    for (let i = 0; i < 5; i++) {
      tone(1200 + Math.random() * 1400, 1800 + Math.random() * 1200, 0.08, 'sine', 0.1, i * 0.06)
    }
  },
  sad() {
    tone(400, 260, 0.35, 'sine', 0.22)
    tone(260, 200, 0.4, 'sine', 0.15, 0.3)
  },
  sniffle() {
    noise(0.12, 0.12, 0, 600)
    tone(500, 420, 0.1, 'sine', 0.1, 0.13)
  },
  boing() {
    tone(150, 500, 0.18, 'sine', 0.3)
    tone(500, 250, 0.22, 'sine', 0.25, 0.18)
  },
  fanfare(large: boolean) {
    const notes = large ? [523, 659, 784, 1047, 784, 1047] : [523, 659, 784]
    notes.forEach((n, i) => tone(n, n, 0.22, 'triangle', 0.25, i * 0.13))
  },
  confetti() {
    for (let i = 0; i < 10; i++) {
      tone(900 + Math.random() * 1600, 900 + Math.random() * 1600, 0.06, 'sine', 0.08, i * 0.04)
    }
  },
  tear() {
    tone(600, 400, 0.15, 'sine', 0.12)
  },
  yawn() {
    tone(300, 150, 0.8, 'sine', 0.2)
  },
  bounce() {
    tone(200, 480, 0.15, 'sine', 0.28)
  },
}

// ─── Narrator: browser speech synthesis stand-in for recorded voice ─────────
let voice: SpeechSynthesisVoice | null = null

function pickVoice() {
  if (typeof speechSynthesis === 'undefined') return
  const voices = speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'))
  voice =
    voices.find((v) => /female|zira|samantha|karen|tessa/i.test(v.name)) ??
    voices[0] ??
    null
}

if (typeof speechSynthesis !== 'undefined') {
  pickVoice()
  speechSynthesis.onvoiceschanged = pickVoice
}

export function narrate(text: string, pitch = 1.25, rate = 0.88) {
  if (!voiceEnabled || typeof speechSynthesis === 'undefined') return
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  if (voice) u.voice = voice
  u.pitch = pitch
  u.rate = rate
  u.volume = 0.95
  speechSynthesis.speak(u)
}

export function stopNarration() {
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel()
}
