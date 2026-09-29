import { describe, expect, it } from 'vitest'
import { SLOW_FPS, afterMeasuring, smoothOn } from './smooth'

const slowTwice = (fps = 30) => afterMeasuring(afterMeasuring(null, fps, false, AT), fps, false, AT)

const AT = '2026-09-29T20:00:00.000Z'

describe('smooth mode', () => {
  it('follows a grown-up who forces it on or off, whatever was measured', () => {
    expect(smoothOn('on', false, null)).toBe(true)
    expect(smoothOn('off', true, slowTwice())).toBe(false)
  })
  it('on automatic, switches on for a device that looks weak, or after two slow plays in a row', () => {
    expect(smoothOn('auto', false, null)).toBe(false)
    expect(smoothOn('auto', true, null)).toBe(true)
    expect(smoothOn('auto', false, afterMeasuring(null, SLOW_FPS - 1, false, AT))).toBe(false)
    expect(smoothOn('auto', false, slowTwice(SLOW_FPS - 1))).toBe(true)
    expect(smoothOn('auto', false, slowTwice(SLOW_FPS))).toBe(false)
  })
  it('forgets one slow play when the next one is smooth', () => {
    const once = afterMeasuring(null, 30, false, AT)
    const fine = afterMeasuring(once, 60, false, AT)
    expect(afterMeasuring(fine, 30, false, AT).autoSmooth).toBe(false)
  })
  it('does not switch on from a slow play that already had smooth mode on', () => {
    expect(afterMeasuring(null, 20, true, AT).autoSmooth).toBe(false)
  })
  it('stays on after switching itself on, even when the next play (in smooth mode) is fast', () => {
    const next = afterMeasuring(slowTwice(), 60, true, AT)
    expect(next.autoSmooth).toBe(true)
    expect(next.fps).toBe(60)
  })
})
