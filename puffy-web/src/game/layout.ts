// Where each floating snack lives, in percent of the play stage, for any
// number of snacks from 1 to 12. Landscape: one arc under Puffy up to six,
// two rows above six. Portrait: rows of three up to six, rows of four above.
// Each snack drifts around its spot (world.css) but never leaves it, so a
// small hand always finds a snack where it was.

export interface Slot {
  /** Landscape */
  x: number
  y: number
  /** Portrait */
  px: number
  py: number
}

/** Evenly spread `k` points across `width` percent, centred on 50. */
function spread(k: number, width: number): number[] {
  if (k === 1) return [50]
  return Array.from({ length: k }, (_, i) => 50 - width / 2 + (i * width) / (k - 1))
}

function rows<T>(items: T[], sizes: number[]): T[][] {
  const out: T[][] = []
  let i = 0
  for (const n of sizes) {
    out.push(items.slice(i, i + n))
    i += n
  }
  return out
}

function landscape(n: number): { x: number; y: number }[] {
  if (n <= 6) {
    // An arc under Puffy: lower in the middle, higher at the ends (the old six-spot arc).
    const width = [0, 0, 40, 52, 64, 76, 78][n]
    return spread(n, width).map((x) => ({ x, y: 82 - 18 * ((x - 50) / 39) ** 2 }))
  }
  const top = Math.ceil(n / 2)
  const idx = Array.from({ length: n }, (_, i) => i)
  return rows(idx, [top, n - top]).flatMap((row, r) =>
    spread(row.length, Math.min(82, 16.4 * (row.length - 1))).map((x) => ({ x, y: r === 0 ? 63 : 83 })),
  )
}

function portrait(n: number): { px: number; py: number }[] {
  const per = n <= 6 ? 3 : 4
  const ys = n <= 6 ? [61, 79] : [58, 72, 86]
  const sizes: number[] = []
  for (let left = n; left > 0; left -= per) sizes.push(Math.min(per, left))
  const idx = Array.from({ length: n }, (_, i) => i)
  const fullWidth = per === 3 ? 60 : 72
  return rows(idx, sizes).flatMap((row, r) =>
    spread(row.length, (fullWidth * (row.length - 1)) / (per - 1)).map((px) => ({ px, py: sizes.length === 1 ? 70 : ys[r] })),
  )
}

export function slotsFor(n: number): Slot[] {
  const l = landscape(n)
  const p = portrait(n)
  return l.map((s, i) => ({ ...s, ...p[i] }))
}
