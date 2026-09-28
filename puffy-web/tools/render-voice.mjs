// Pre-renders every narrator line to an MP3 clip with offline TTS.
//
//   node tools/render-voice.mjs                  render missing clips (Kokoro)
//   node tools/render-voice.mjs --force          re-render everything
//   node tools/render-voice.mjs --engine piper   use the older Piper voice
//
// Kokoro (default) sounds far more natural than Piper, which the owner's
// Samsung tablet test found robotic. See HANDOFF.md "Voice clips" for the
// one-time downloads. Paths can be overridden with KOKORO_DIR, KOKORO_PYTHON,
// PIPER_EXE and PIPER_MODEL. Switching engine needs --force.
// Output: public/voice/<hash>.mp3 and public/voice/manifest.json, which
// src/game/audio.ts reads at runtime. A line with no clip falls back to the
// browser's speech synthesis, so a partial render never breaks the game.

import { build } from 'esbuild'
import { Mp3Encoder } from '@breezystack/lamejs'
import { createHash } from 'node:crypto'
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const piperDir = resolve(root, '..', 'tools', 'piper')
const PIPER = process.env.PIPER_EXE ?? join(piperDir, 'piper', process.platform === 'win32' ? 'piper.exe' : 'piper')
const MODEL = process.env.PIPER_MODEL ?? join(piperDir, 'en_US-lessac-high.onnx')
const kokoroDir = process.env.KOKORO_DIR ?? resolve(root, '..', 'tools', 'kokoro')
const KOKORO_PY =
  process.env.KOKORO_PYTHON ?? resolve(root, '..', 'tools', 'kokoro-venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python')
const OUT = join(root, 'public', 'voice')
const force = process.argv.includes('--force')
const engineArg = process.argv.indexOf('--engine')
const ENGINE = engineArg > 0 ? process.argv[engineArg + 1] : 'kokoro'

// Voice direction from blueprint §10: ~80% pace, warm, unhurried.
const LENGTH_SCALE = '1.18'
const NOISE_SCALE = '0.72'
const NOISE_W = '0.85'
const BITRATE = 48

const needs =
  ENGINE === 'piper'
    ? [['Piper', PIPER], ['voice model', MODEL]]
    : [['Kokoro Python', KOKORO_PY], ['Kokoro model', join(kokoroDir, 'kokoro-v1.0.onnx')], ['Kokoro voices', join(kokoroDir, 'voices-v1.0.bin')]]
for (const [what, p] of needs) {
  if (!existsSync(p)) {
    console.error(`${what} not found at ${p}. See HANDOFF.md "Voice clips".`)
    process.exit(1)
  }
}

// 1. Load the line inventory straight from the game source.
const tmp = join(tmpdir(), `puffy-voice-${process.pid}`)
mkdirSync(tmp, { recursive: true })
const entry = join(tmp, 'entry.ts')
writeFileSync(entry, `export { allLines } from ${JSON.stringify(join(root, 'src/game/voiceLines.ts'))}\nexport { lineKey } from ${JSON.stringify(join(root, 'src/game/lines.ts'))}\n`)
await build({ entryPoints: [entry], bundle: true, format: 'esm', platform: 'node', outfile: join(tmp, 'lines.mjs'), logLevel: 'error' })
const { allLines, lineKey } = await import(pathToFileURL(join(tmp, 'lines.mjs')).href)

const lines = allLines()
mkdirSync(OUT, { recursive: true })
const manifest = {}
const todo = []
for (const text of lines) {
  const key = lineKey(text)
  const file = createHash('sha1').update(key).digest('hex').slice(0, 10) + '.mp3'
  manifest[key] = file
  if (force || !existsSync(join(OUT, file))) todo.push({ text, file })
}
console.log(`${lines.length} lines, ${todo.length} to render`)

// 2. One TTS process for the whole batch (JSON lines on stdin).
if (todo.length) {
  await new Promise((ok, fail) => {
    const p =
      ENGINE === 'piper'
        ? spawn(PIPER, ['-m', MODEL, '--json-input', '--length_scale', LENGTH_SCALE, '--noise_scale', NOISE_SCALE, '--noise_w', NOISE_W, '--sentence_silence', '0.15'], {
            stdio: ['pipe', 'ignore', 'pipe'],
          })
        : spawn(KOKORO_PY, [join(root, 'tools', 'kokoro_render.py')], {
            stdio: ['pipe', 'ignore', 'pipe'],
            env: { ...process.env, KOKORO_DIR: kokoroDir, PYTHONIOENCODING: 'utf-8' },
          })
    let err = ''
    p.stderr.on('data', (d) => {
      err += d
      if (String(d).includes('kokoro:')) process.stderr.write(String(d))
    })
    p.on('error', fail)
    p.on('close', (code) => (code === 0 ? ok() : fail(new Error(`${ENGINE} exited ${code}\n${err.slice(-2000)}`))))
    for (const t of todo) p.stdin.write(JSON.stringify({ text: speakable(t.text), output_file: join(tmp, t.file + '.wav') }) + '\n')
    p.stdin.end()
  })

  // 3. Trim silence and encode each WAV to MP3.
  let bytes = 0
  for (const t of todo) {
    const wav = readFileSync(join(tmp, t.file + '.wav'))
    const { rate, samples } = readWav(wav)
    const mp3 = encodeMp3(trim(samples, rate), rate)
    writeFileSync(join(OUT, t.file), mp3)
    bytes += mp3.length
  }
  console.log(`rendered ${todo.length} clips, ${(bytes / 1024).toFixed(0)} KB`)
}

// 4. Manifest, and remove clips no line uses any more.
writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 0))
const used = new Set(Object.values(manifest))
let removed = 0
for (const f of readdirSync(OUT)) {
  if (f.endsWith('.mp3') && !used.has(f)) {
    rmSync(join(OUT, f))
    removed++
  }
}
if (removed) console.log(`removed ${removed} stale clips`)
rmSync(tmp, { recursive: true, force: true })
console.log('manifest written:', Object.keys(manifest).length, 'entries')

// ─── helpers ────────────────────────────────────────────────────────────────
/** Small spelling tweaks so the voice reads toddler words naturally. */
function speakable(text) {
  return text
    .replace(/soooo/g, 'sooo')
    .replace(/Hmm hmm hmm…/g, 'Hmm, hmm, hmm...')
    .replace(/…/g, '...')
    .replace(/’/g, "'")
}

function readWav(buf) {
  let off = 12
  let rate = 22050
  let data = null
  while (off < buf.length) {
    const id = buf.toString('ascii', off, off + 4)
    const size = buf.readUInt32LE(off + 4)
    if (id === 'fmt ') rate = buf.readUInt32LE(off + 12)
    if (id === 'data') data = buf.subarray(off + 8, off + 8 + size)
    off += 8 + size + (size % 2)
  }
  if (!data) throw new Error('no data chunk')
  const samples = new Int16Array(data.buffer.slice(data.byteOffset, data.byteOffset + data.length))
  return { rate, samples }
}

function trim(s, rate) {
  const thr = 300
  let a = 0
  let b = s.length - 1
  while (a < b && Math.abs(s[a]) < thr) a++
  while (b > a && Math.abs(s[b]) < thr) b--
  const pad = Math.floor(rate * 0.04)
  return s.subarray(Math.max(0, a - pad), Math.min(s.length, b + pad))
}

function encodeMp3(samples, rate) {
  const enc = new Mp3Encoder(1, rate, BITRATE)
  const out = []
  for (let i = 0; i < samples.length; i += 1152) out.push(enc.encodeBuffer(samples.subarray(i, i + 1152)))
  out.push(enc.flush())
  return Buffer.concat(out.map((c) => Buffer.from(c.buffer, c.byteOffset, c.length)))
}
