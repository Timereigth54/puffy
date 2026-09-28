"""Renders narrator lines to WAV with Kokoro (offline neural TTS).

Called by render-voice.mjs. Reads JSON lines on stdin:
    {"text": "...", "output_file": "C:/.../x.wav"}
and writes one 24 kHz mono 16-bit WAV per line.

Environment:
    KOKORO_DIR    folder with kokoro-v1.0.onnx and voices-v1.0.bin
    KOKORO_VOICE  voice id (default af_heart)
    KOKORO_SPEED  speaking speed (default 0.88: slower, for toddlers)
"""

import json
import os
import sys
import wave

import numpy as np
from kokoro_onnx import Kokoro

model_dir = os.environ["KOKORO_DIR"]
voice = os.environ.get("KOKORO_VOICE", "af_heart")
speed = float(os.environ.get("KOKORO_SPEED", "0.88"))

kokoro = Kokoro(os.path.join(model_dir, "kokoro-v1.0.onnx"), os.path.join(model_dir, "voices-v1.0.bin"))

done = 0
for raw in sys.stdin:
    raw = raw.strip()
    if not raw:
        continue
    job = json.loads(raw)
    samples, rate = kokoro.create(job["text"], voice=voice, speed=speed, lang="en-us")
    pcm = (np.clip(samples, -1.0, 1.0) * 32767).astype(np.int16)
    with wave.open(job["output_file"], "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(pcm.tobytes())
    done += 1
    if done % 20 == 0:
        print(f"kokoro: {done} lines", file=sys.stderr, flush=True)
