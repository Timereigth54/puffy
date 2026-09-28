import { useCallback, useEffect, useRef, useState } from 'react'
import Bathroom from './components/Bathroom'
import Puffy from './components/Puffy'
import BookScreen from './screens/BookScreen'
import HomeScreen from './screens/HomeScreen'
import Onboarding from './screens/Onboarding'
import ParentGate from './screens/ParentGate'
import ParentZone from './screens/ParentZone'
import PlayScreen from './screens/PlayScreen'
import SleepScreen from './screens/SleepScreen'
import { COMBOS } from './data/content'
import { setChildName, setNameClip, setVoiceEnabled, unlockAudio } from './game/audio'
import {
  freshProgress,
  loadNameRecording,
  loadProgress,
  loadSettings,
  saveNameRecording,
  saveProgress,
  saveSettings,
} from './game/store'
import type { Combo, Progress, Settings } from './game/types'

type Screen = 'splash' | 'onboarding' | 'home' | 'play' | 'book' | 'sleep'
type Overlay = 'gate' | 'parent' | null

const CHILD_SCREENS: Screen[] = ['home', 'play', 'book']

// Kids' tablets (Amazon Fire, Galaxy Tab A) are far weaker than iPads.
// On 2 GB or less, or 2 cores or fewer, drop the costly paint effects.
const LITE = (() => {
  const nav = navigator as Navigator & { deviceMemory?: number }
  return (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) || (navigator.hardwareConcurrency ?? 8) <= 2 || location.search.includes('lite')
})()

// Counted once per page load (React StrictMode runs initializers twice in dev).
let sessionCounted = false
function bootProgress(): Progress {
  const p = loadProgress()
  if (sessionCounted) return p
  sessionCounted = true
  const next = { ...p, sessions: p.sessions + 1 }
  saveProgress(next)
  return next
}

export default function App() {
  const [settings, setSettings] = useState<Settings>(loadSettings)
  const [progress, setProgress] = useState<Progress>(bootProgress)
  const [screen, setScreen] = useState<Screen>('splash')
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [sessionSeconds, setSessionSeconds] = useState(0)
  const unsavedSeconds = useRef(0)
  const screenRef = useRef(screen)
  useEffect(() => {
    screenRef.current = screen
  }, [screen])

  const update = useCallback((fn: (p: Progress) => Progress) => {
    setProgress((p) => {
      const next = fn(p)
      saveProgress(next)
      return next
    })
  }, [])

  // Boot: count the session, restore the recorded name, then leave the splash.
  useEffect(() => {
    void loadNameRecording().then((b) => setNameClip(b))
    const t = window.setTimeout(() => {
      const p = loadProgress()
      setScreen(p.onboarded ? 'home' : p.childName || p.hasNameRecording ? 'play' : 'onboarding')
    }, 1500)
    // iOS needs a gesture before any sound; the first touch anywhere unlocks it.
    const unlock = () => unlockAudio()
    window.addEventListener('pointerdown', unlock, { once: true })
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('pointerdown', unlock)
    }
  }, [])

  useEffect(() => setChildName(progress.childName), [progress.childName])
  useEffect(() => setVoiceEnabled(settings.voiceOn), [settings.voiceOn])

  // Session clock: only while a child screen is visible and no grown-up panel is open.
  useEffect(() => {
    const iv = window.setInterval(() => {
      if (!CHILD_SCREENS.includes(screenRef.current) || document.visibilityState !== 'visible') return
      setSessionSeconds((s) => s + 1)
      unsavedSeconds.current += 1
      if (unsavedSeconds.current >= 15) {
        const add = unsavedSeconds.current
        unsavedSeconds.current = 0
        update((p) => ({ ...p, secondsPlayed: p.secondsPlayed + add }))
      }
    }, 1000)
    return () => window.clearInterval(iv)
  }, [update])

  const limit = settings.timeLimitMinutes ? settings.timeLimitMinutes * 60 : null
  const evening = limit ? Math.max(0, Math.min(1, (sessionSeconds - limit * 0.8) / (limit * 0.2))) : 0

  // Bedtime is derived, not stored: once the limit passes, child screens show Puffy asleep.
  const bedtime = !!limit && sessionSeconds >= limit && (CHILD_SCREENS.includes(screen) || screen === 'sleep')
  const shown: Screen = bedtime ? 'sleep' : screen === 'sleep' ? 'home' : screen

  const changeSettings = (s: Settings) => {
    setSettings(s)
    saveSettings(s)
  }

  const saveName = async (name: string | null, recording: Blob | null | undefined) => {
    if (recording !== undefined) {
      await saveNameRecording(recording)
      await setNameClip(recording)
    }
    update((p) => ({ ...p, childName: name, hasNameRecording: recording === undefined ? p.hasNameRecording : !!recording }))
  }

  const discover = (combo: Combo) =>
    update((p) =>
      p.discovered.includes(combo.id)
        ? p
        : {
            ...p,
            discovered: [...p.discovered, combo.id],
            discoveredAt: { ...p.discoveredAt, [combo.id]: new Date().toISOString() },
            unseenStickers: [...p.unseenStickers, combo.id],
          },
    )

  const reset = async () => {
    await saveNameRecording(null)
    await setNameClip(null)
    const fresh = { ...freshProgress(), sessions: progress.sessions }
    saveProgress(fresh)
    setProgress(fresh)
    setSessionSeconds(0)
  }

  const closeParent = () => {
    setOverlay(null)
    if (shown === 'sleep') {
      // A grown-up opened the gate at bedtime: start a fresh session clock.
      setSessionSeconds(0)
      setScreen('home')
    }
    if (!progress.onboarded && !progress.childName && !progress.hasNameRecording) setScreen('onboarding')
  }

  const allFound = progress.discovered.length >= COMBOS.length

  return (
    <div className={`app ${LITE ? 'is-lite' : ''}`}>
      {shown === 'splash' && (
        <Bathroom className="splash">
          <div className="home-stage">
            <div className="puffy-anchor puffy-anchor--home puffy-anchor--enter">
              <Puffy state="idle" />
            </div>
          </div>
        </Bathroom>
      )}
      {shown === 'onboarding' && (
        <Onboarding childName={progress.childName} onName={saveName} onDone={() => setScreen('play')} />
      )}
      {shown === 'home' && (
        <HomeScreen
          evening={evening}
          sparkle={allFound}
          newStickers={progress.unseenStickers.length}
          onPlay={() => setScreen('play')}
          onBook={() => setScreen('book')}
          onParent={() => setOverlay('gate')}
        />
      )}
      {shown === 'play' && (
        <PlayScreen
          settings={settings}
          progress={progress}
          evening={evening}
          guided={!progress.onboarded}
          onFeed={(id) => update((p) => ({ ...p, feedCounts: { ...p.feedCounts, [id]: (p.feedCounts[id] ?? 0) + 1 } }))}
          onDiscover={discover}
          onGuidedDone={() => update((p) => ({ ...p, onboarded: true }))}
          onHome={() => setScreen('home')}
          onBook={() => setScreen('book')}
        />
      )}
      {shown === 'book' && (
        <BookScreen
          progress={progress}
          settings={settings}
          evening={evening}
          onSeen={(id) => update((p) => ({ ...p, unseenStickers: p.unseenStickers.filter((s) => s !== id) }))}
          onHome={() => setScreen('home')}
          onPlay={() => setScreen('play')}
        />
      )}
      {shown === 'sleep' && <SleepScreen onParent={() => setOverlay('gate')} />}

      {overlay === 'gate' && <ParentGate onPass={() => setOverlay('parent')} onCancel={() => setOverlay(null)} />}
      {overlay === 'parent' && (
        <ParentZone
          settings={settings}
          progress={progress}
          onSettings={changeSettings}
          onName={(n, r) => void saveName(n, r)}
          onReset={() => void reset()}
          onClose={closeParent}
        />
      )}
    </div>
  )
}
