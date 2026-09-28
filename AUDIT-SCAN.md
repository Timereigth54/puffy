# Audit scan — puffy_app

*Generated 2026-09-28 17:32 by `audit-scan.py`. Deterministic checks only — everything below is something a tool decided, not something anyone judged. Read “What this did not check” before concluding the project is clean.*

## Verdict

Nothing urgent. What follows is quality and hygiene.

| Severity | Count |
|---|---|
| low | 8 |
| info | 1 |

## The project

- **Stack:** node, pwa
- **Files:** 576 (177.4 MB), excluding dependencies and build output
- **History:** 9 commits read, 0 of them reverts
- **Mostly:** `(none)` ×358, `.mp3` ×154, `.tsx` ×15, `.ts` ×12, `.json` ×9, `.md` ×5

## Findings

### What is tracked that should not be <sub>`hygiene`</sub>

- **[low]** 1x console.log left in shipped code in puffy-web/tools/make-icons.mjs
  Fine in development; noise or a leak in production.
- **[low]** 4x console.log left in shipped code in puffy-web/tools/render-voice.mjs
  Fine in development; noise or a leak in production.

### TODO / FIXME inventory <sub>`todos`</sub>

- **[info]** 1 TODO/FIXME marker(s) across the project
  Full list at the bottom of this report.

### Files large enough to be a problem <sub>`size`</sub>

- **[low]** tools/piper/en_US-lessac-high.onnx is 113.9 MB
  Large binaries are cloned by everyone, forever, even after deletion.
- **[low]** tools/piper/piper.zip is 22.5 MB
  Large binaries are cloned by everyone, forever, even after deletion.
- **[low]** tools/piper/piper/espeak-ng-data/cmn_dict is 1.6 MB
  Large binaries are cloned by everyone, forever, even after deletion.
- **[low]** tools/piper/piper/espeak-ng-data/ru_dict is 8.5 MB
  Large binaries are cloned by everyone, forever, even after deletion.
- **[low]** tools/piper/piper/libtashkeel_model.ort is 10.3 MB
  Large binaries are cloned by everyone, forever, even after deletion.
- **[low]** tools/piper/piper/onnxruntime.dll is 9.3 MB
  Large binaries are cloned by everyone, forever, even after deletion.

## Every TODO, in full

- `tools/piper/piper/espeak-ng-data/lang/roa/ht:4` **TODO** somebody should take responsibility for this

## What this did not check

These are mechanical checks. They cannot find a defect that needs two files read together and a judgement made about whether they agree — which is the shape of most real bugs. Nothing above looks for:

- logic that is wrong rather than malformed;
- a contract broken across files — a case missing from one switch of six;
- an endpoint that returns success while doing nothing, or fails silently;
- whether the tests assert anything meaningful;
- whether the behaviour is the intended one.

Those need a reading pass. Bring this report to one, and start at the `history` section: it names the files this project has already proven it gets wrong.

