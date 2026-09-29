# Audit scan — puffy_app

*Generated 2026-09-29 19:33 by `audit-scan.py`. Deterministic checks only — everything below is something a tool decided, not something anyone judged. Read “What this did not check” before concluding the project is clean.*

## Verdict

**50 high finding(s)**, nothing critical.

| Severity | Count |
|---|---|
| high | 50 |
| medium | 1 |
| low | 42 |
| info | 1 |

## The project

- **Stack:** node, pwa
- **Files:** 5566 (706.7 MB), excluding dependencies and build output
- **History:** 22 commits read, 0 of them reverts
- **Mostly:** `.py` ×1680, `.dat` ×1084, `.mp3` ×985, `(none)` ×951, `.pyi` ×287, `.f90` ×62

## Findings

### Credentials in the source <sub>`secrets`</sub>

- **[low]** Password in a URL in tools/kokoro-venv/Lib/site-packages/rfc3986/builder.py
  It is NOT committed (untracked or ignored), so it has not left this machine. That is how a local environment is meant to look; keep it that way.
  ```
  https://sigmavirus24:not…
  ```

### What is tracked that should not be <sub>`hygiene`</sub>

- **[medium]** 1x a `debugger` statement in tools/kokoro-venv/Lib/site-packages/pyparsing/core.py
  Fine in development; noise or a leak in production.
- **[low]** 1x console.log left in shipped code in puffy-web/tools/capture-ladder.mjs
  Fine in development; noise or a leak in production.
- **[low]** 1x console.log left in shipped code in puffy-web/tools/capture-review.mjs
  Fine in development; noise or a leak in production.
- **[low]** 1x console.log left in shipped code in puffy-web/tools/make-icons.mjs
  Fine in development; noise or a leak in production.
- **[low]** 4x console.log left in shipped code in puffy-web/tools/render-voice.mjs
  Fine in development; noise or a leak in production.
- **[low]** 2x console.log left in shipped code in tools/kokoro-venv/Lib/site-packages/pip/_vendor/rich/console.py
  Fine in development; noise or a leak in production.
- **[low]** 1x console.log left in shipped code in tools/kokoro-venv/Lib/site-packages/pip/_vendor/rich/live.py
  Fine in development; noise or a leak in production.
- **[low]** 3x console.log left in shipped code in tools/kokoro-venv/Lib/site-packages/pip/_vendor/rich/status.py
  Fine in development; noise or a leak in production.
- **[low]** 2x console.log left in shipped code in tools/kokoro-venv/Lib/site-packages/pip/_vendor/urllib3/contrib/emscripten/emscripten_fetch_worker.js
  Fine in development; noise or a leak in production.

### Decidable risk patterns <sub>`security`</sub>

- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/attr/_make.py:227
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  eval(bytecode, globs, locs)
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/babel/plural.py:240
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  eval(code, namespace)
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/cffi/recompiler.py:80
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  flags = eval(self.flags, G_FLAGS)
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/joblib/memory.py:178
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  (namely eval(repr(memorized_instance)) works).
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/joblib/memory.py:1192
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  def eval(self, func, *args, **kwargs):
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/_core/arrayprint.py:1577
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  >>> assert eval(dtype_short_repr(dt)) == dt
  ```
- **[high]** TLS verification disabled in tools/kokoro-venv/Lib/site-packages/numpy/_core/multiarray.py:112
  Disables certificate checking, which is the entire protection TLS offers.
  ```
  module='numpy', docs_from_dispatcher=True, verify=False)
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/auxfuncs.py:632
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  return eval(f"{l1}:{' and '.join(l2)}")
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/auxfuncs.py:640
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  return eval(f"{l1}:{' or '.join(l2)}")
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/auxfuncs.py:644
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  return eval('lambda v,f=f:not f(v)')
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/capi_maps.py:159
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  d = eval(f.read().lower(), {}, {})
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/capi_maps.py:299
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  ret['size'] = repr(eval(ret['size']))
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/capi_maps.py:447
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  v = eval(v, {}, {})
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:1325
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  v = eval(initexpr, {}, params)
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:2274
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  r = eval(e, g, l)
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:2562
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  value = eval(value, {}, params)
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:2639
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  l = str(eval(l, {}, params))
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:2648
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  l = str(eval(l, {}, params))
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:2916
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  kindselect['kind'] = eval(
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:2987
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  p = eval(v, g_params, params)
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:3018
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  item = eval(item, g_params, params)
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:3470
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  v = eval(v)
  ```
- **[high]** TLS verification disabled in tools/kokoro-venv/Lib/site-packages/numpy/lib/_ufunclike_impl.py:18
  Disables certificate checking, which is the entire protection TLS offers.
  ```
  @array_function_dispatch(_dispatcher, verify=False, module='numpy')
  ```
- **[high]** TLS verification disabled in tools/kokoro-venv/Lib/site-packages/numpy/lib/_ufunclike_impl.py:75
  Disables certificate checking, which is the entire protection TLS offers.
  ```
  @array_function_dispatch(_dispatcher, verify=False, module='numpy')
  ```
- **[high]** TLS verification disabled in tools/kokoro-venv/Lib/site-packages/numpy/lib/_ufunclike_impl.py:145
  Disables certificate checking, which is the entire protection TLS offers.
  ```
  @array_function_dispatch(_dispatcher, verify=False, module='numpy')
  ```
- **[high]** subprocess with shell=True in tools/kokoro-venv/Lib/site-packages/pip/_internal/commands/configuration.py:247
  Shell metacharacters in any interpolated value become command injection.
  ```
  subprocess.check_call(f'{editor} "{fname}"', shell=True)
  ```
- **[high]** TLS verification disabled in tools/kokoro-venv/Lib/site-packages/pip/_internal/network/session.py:312
  Disables certificate checking, which is the entire protection TLS offers.
  ```
  super().cert_verify(conn=conn, url=url, verify=False, cert=cert)
  ```
- **[high]** TLS verification disabled in tools/kokoro-venv/Lib/site-packages/pip/_internal/network/session.py:323
  Disables certificate checking, which is the entire protection TLS offers.
  ```
  super().cert_verify(conn=conn, url=url, verify=False, cert=cert)
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/pip/_vendor/pygments/formatters/__init__.py:91
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  this method is equivalent to running ``eval()`` on the input file. The formatter is
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/pyparsing/results.py:66
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  print(f"{s} -> {fn(eval(s))}")
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/rdflib/paths.py:228
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  def eval(
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/rdflib/paths.py:256
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  def eval(
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/rdflib/paths.py:281
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  def eval(
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/rdflib/paths.py:338
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  def eval(
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/rdflib/paths.py:372
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  def eval(
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/rdflib/paths.py:492
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  def eval(self, graph, subj=None, obj=None):
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/rdflib/plugins/sparql/parserutils.py:219
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  def eval(self, ctx: Any = {}) -> Union[SPARQLError, Any]:
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/rdflib/tools/csv2rdf.py:300
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  return eval(v, config_functions)
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/rdflib/tools/csv2rdf.py:497
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  csv2rdf.IDENT = eval(v)
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/rdflib/tools/csv2rdf.py:499
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  csv2rdf.LABEL = eval(v)
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/rdflib/tools/csv2rdf.py:537
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  csv2rdf.LABEL = eval(opts["-l"])
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/rdflib/tools/csv2rdf.py:539
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  csv2rdf.LABEL = eval(opts["--label"])
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/rdflib/tools/csv2rdf.py:542
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  csv2rdf.IDENT = eval(opts["-i"])
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/rdflib/tools/csv2rdf.py:544
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  csv2rdf.IDENT = eval(opts["--ident"])
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/typing_extensions.py:1591
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  (unless you are familiar with how eval() and exec() work).  The
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/typing_extensions.py:4167
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  # as a way of emulating annotation scopes when calling `eval()`
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/typing_extensions.py:4172
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  value if not isinstance(value, str) else eval(value, globals, locals)
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/typing_extensions.py:4219
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  # If we pass None to eval() below, the globals of this module are used.
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/typing_extensions.py:4231
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  # as a way of emulating annotation scopes when calling `eval()`
  ```
- **[high]** eval() in tools/kokoro-venv/Lib/site-packages/typing_extensions.py:4254
  Executes whatever string it is given. If any part of that string can come from a user, it is remote code execution.
  ```
  value = eval(code, globals, locals)
  ```

### TODO / FIXME inventory <sub>`todos`</sub>

- **[low]** XXX in tools/kokoro-venv/Lib/site-packages/attr/_make.py:875
  This can be confused by subclassing a slotted attrs class with
- **[low]** XXX in tools/kokoro-venv/Lib/site-packages/attr/_make.py:876
  a non-attrs class and subclass the resulting class with an attrs
- **[low]** XXX in tools/kokoro-venv/Lib/site-packages/attr/_make.py:877
  class.  See `test_slotted_confused` for details.  For now that's
- **[low]** XXX in tools/kokoro-venv/Lib/site-packages/attr/_make.py:878
  OK with us.
- **[low]** XXX in tools/kokoro-venv/Lib/site-packages/attr/_make.py:2504
  unused, remove along with other cmp code.
- **[low]** XXX in tools/kokoro-venv/Lib/site-packages/babel/core.py:247
  use likely subtag expansion here instead of the
- **[low]** FIXME in tools/kokoro-venv/Lib/site-packages/babel/dates.py:1324
  this currently only supports numbers, but should also support month
- **[low]** XXX in tools/kokoro-venv/Lib/site-packages/babel/messages/plurals.py:15
  remove this file, duplication with babel.plural
- **[low]** XXX in tools/kokoro-venv/Lib/site-packages/babel/plural.py:613
  presently javascript does not support any of the
- **[low]** XXX in tools/kokoro-venv/Lib/site-packages/babel/plural.py:632
  this currently spits out the old syntax instead of the new
- **[low]** XXX in tools/kokoro-venv/Lib/site-packages/cffi/backend_ctypes.py:1006
  not implemented
- **[low]** XXX in tools/kokoro-venv/Lib/site-packages/cffi/cparser.py:309
  for more efficiency we would need to poke into the
- **[low]** XXX in tools/kokoro-venv/Lib/site-packages/cffi/cparser.py:837
  pycparser is inconsistent: 'names' should be a list
- **[low]** XXX in tools/kokoro-venv/Lib/site-packages/cffi/ffiplatform.py:31
  compact but horrible :-(
- **[low]** XXX in tools/kokoro-venv/Lib/site-packages/cffi/model.py:529
  !  The goal is to ensure that the warnings.warn()
- **[info]** 613 TODO/FIXME marker(s) across the project
  Full list at the bottom of this report.

### Files large enough to be a problem <sub>`size`</sub>

- **[low]** tools/kokoro-venv/Lib/site-packages/espeakng_loader/espeak-ng-data/ru_dict is 8.5 MB
  Large binaries are cloned by everyone, forever, even after deletion.
- **[low]** tools/kokoro-venv/Lib/site-packages/google/protobuf/descriptor_pb2.py is 371 KB of source
  Worth asking whether it is one thing.
- **[low]** tools/kokoro-venv/Lib/site-packages/numpy.libs/libscipy_openblas64_-ed4f167a5330424524f45258e7ca2c8d.dll is 20.6 MB
  Large binaries are cloned by everyone, forever, even after deletion.
- **[low]** tools/kokoro-venv/Lib/site-packages/numpy/_core/tests/test_multiarray.py is 441 KB of source
  Worth asking whether it is one thing.
- **[low]** tools/kokoro-venv/Lib/site-packages/numpy/ma/core.py is 294 KB of source
  Worth asking whether it is one thing.
- **[low]** tools/kokoro-venv/Lib/site-packages/numpy/ma/tests/test_core.py is 232 KB of source
  Worth asking whether it is one thing.
- **[low]** tools/kokoro-venv/Lib/site-packages/onnxruntime/capi/onnxruntime.dll is 18.4 MB
  Large binaries are cloned by everyone, forever, even after deletion.
- **[low]** tools/kokoro-venv/Lib/site-packages/onnxruntime/capi/onnxruntime_pybind11_state.pyd is 19.1 MB
  Large binaries are cloned by everyone, forever, even after deletion.
- **[low]** tools/kokoro-venv/Lib/site-packages/pip/_vendor/idna/uts46data.py is 238 KB of source
  Worth asking whether it is one thing.
- **[low]** tools/kokoro-venv/Lib/site-packages/pyparsing/core.py is 247 KB of source
  Worth asking whether it is one thing.
- **[low]** tools/kokoro-venv/Lib/site-packages/rdflib/namespace/_SDO.py is 414 KB of source
  Worth asking whether it is one thing.
- **[low]** tools/kokoro-venv/Lib/site-packages/regex/tests/test_regex.py is 224 KB of source
  Worth asking whether it is one thing.
- **[low]** tools/kokoro/kokoro-v1.0.onnx is 325.5 MB
  Large binaries are cloned by everyone, forever, even after deletion.
- **[low]** tools/kokoro/voices-v1.0.bin is 28.2 MB
  Large binaries are cloned by everyone, forever, even after deletion.
- **[low]** tools/piper/en_US-lessac-high.onnx is 113.9 MB
  Large binaries are cloned by everyone, forever, even after deletion.
- **[low]** tools/piper/piper.zip is 22.5 MB
  Large binaries are cloned by everyone, forever, even after deletion.
- **[low]** tools/piper/piper/libtashkeel_model.ort is 10.3 MB
  Large binaries are cloned by everyone, forever, even after deletion.
- **[low]** tools/piper/piper/onnxruntime.dll is 9.3 MB
  Large binaries are cloned by everyone, forever, even after deletion.

## Every TODO, in full

- `AUDIT-SCAN.md:30` **TODO** / FIXME inventory <sub>`todos`</sub>
- `AUDIT-SCAN.md:32` **TODO** /FIXME marker(s) across the project
- `AUDIT-SCAN.md:50` **TODO** , in full
- `AUDIT-SCAN.md:52` **TODO** ** somebody should take responsibility for this
- `tools/kokoro-venv/Lib/site-packages/typing_extensions.py:3457` **TODO** Use inspect.VALUE here, and make the annotations lazily evaluated
- `tools/kokoro-venv/Lib/site-packages/attr/_make.py:875` **XXX** This can be confused by subclassing a slotted attrs class with
- `tools/kokoro-venv/Lib/site-packages/attr/_make.py:876` **XXX** a non-attrs class and subclass the resulting class with an attrs
- `tools/kokoro-venv/Lib/site-packages/attr/_make.py:877` **XXX** class.  See `test_slotted_confused` for details.  For now that's
- `tools/kokoro-venv/Lib/site-packages/attr/_make.py:878` **XXX** OK with us.
- `tools/kokoro-venv/Lib/site-packages/attr/_make.py:2504` **XXX** unused, remove along with other cmp code.
- `tools/kokoro-venv/Lib/site-packages/babel/core.py:247` **XXX** use likely subtag expansion here instead of the
- `tools/kokoro-venv/Lib/site-packages/babel/core.py:1335` **TODO** (3.0): always return a 5-tuple
- `tools/kokoro-venv/Lib/site-packages/babel/dates.py:161` **TODO** (3.x): Add an assertion/type check for this fallthrough branch:
- `tools/kokoro-venv/Lib/site-packages/babel/dates.py:1324` **FIXME** this currently only supports numbers, but should also support month
- `tools/kokoro-venv/Lib/site-packages/babel/dates.py:1366` **TODO** try ISO format first?
- `tools/kokoro-venv/Lib/site-packages/babel/dates.py:1383` **TODO** support time zones
- `tools/kokoro-venv/Lib/site-packages/babel/dates.py:1679` **TODO** To add support for O:1
- `tools/kokoro-venv/Lib/site-packages/babel/dates.py:1985` **TODO** maybe implement pattern expansion?
- `tools/kokoro-venv/Lib/site-packages/babel/lists.py:25` **TODO** (3.0): Remove this.
- `tools/kokoro-venv/Lib/site-packages/babel/lists.py:119` **TODO** It would likely be better to use the
- `tools/kokoro-venv/Lib/site-packages/babel/numbers.py:19` **TODO** 
- `tools/kokoro-venv/Lib/site-packages/babel/numbers.py:169` **TODO** unused?!
- `tools/kokoro-venv/Lib/site-packages/babel/numbers.py:293` **TODO** validate that the territory exists
- `tools/kokoro-venv/Lib/site-packages/babel/numbers.py:1507` **TODO** (3.x?): Remove this parameter
- `tools/kokoro-venv/Lib/site-packages/babel/plural.py:79` **TODO** c and e are not supported
- `tools/kokoro-venv/Lib/site-packages/babel/plural.py:613` **XXX** presently javascript does not support any of the
- `tools/kokoro-venv/Lib/site-packages/babel/plural.py:632` **XXX** this currently spits out the old syntax instead of the new
- `tools/kokoro-venv/Lib/site-packages/babel/units.py:354` **TODO** this doesn't support "compound_variations" (or "prefix"), and will fall back to the "x/y" representation
- `tools/kokoro-venv/Lib/site-packages/babel/util.py:264` **TODO** (Babel 3.x): Remove this re-export
- `tools/kokoro-venv/Lib/site-packages/babel/util.py:275` **TODO** (Babel 3.x): Remove this class
- `tools/kokoro-venv/Lib/site-packages/babel/util.py:307` **TODO** (3.0): remove these aliases
- `tools/kokoro-venv/Lib/site-packages/babel/localtime/__init__.py:21` **TODO** (3.0): the offset constants are not part of the public API
- `tools/kokoro-venv/Lib/site-packages/babel/messages/extract.py:717` **TODO** we could raise an error or warning when not all nodes are constants
- `tools/kokoro-venv/Lib/site-packages/babel/messages/frontend.py:327` **TODO** Support repetition of this argument
- `tools/kokoro-venv/Lib/site-packages/babel/messages/frontend.py:332` **TODO** Support repetition of this argument
- `tools/kokoro-venv/Lib/site-packages/babel/messages/frontend.py:333` **TODO** (3.x): Remove me.
- `tools/kokoro-venv/Lib/site-packages/babel/messages/plurals.py:15` **XXX** remove this file, duplication with babel.plural
- `tools/kokoro-venv/Lib/site-packages/cffi/backend_ctypes.py:1006` **XXX** not implemented
- `tools/kokoro-venv/Lib/site-packages/cffi/cparser.py:209` **HACK** replace WINAPI or __stdcall with "volatile const".
- `tools/kokoro-venv/Lib/site-packages/cffi/cparser.py:309` **XXX** for more efficiency we would need to poke into the
- `tools/kokoro-venv/Lib/site-packages/cffi/cparser.py:737` **HACK** we absure them
- `tools/kokoro-venv/Lib/site-packages/cffi/cparser.py:837` **XXX** pycparser is inconsistent: 'names' should be a list
- `tools/kokoro-venv/Lib/site-packages/cffi/ffiplatform.py:31` **XXX** compact but horrible :-(
- `tools/kokoro-venv/Lib/site-packages/cffi/model.py:529` **XXX** !  The goal is to ensure that the warnings.warn()
- `tools/kokoro-venv/Lib/site-packages/cffi/vengine_cpy.py:133` **XXX** review all usages of 'self' here!
- `tools/kokoro-venv/Lib/site-packages/cffi/vengine_gen.py:627` **XXX** for ssize_t on some platforms */
- `tools/kokoro-venv/Lib/site-packages/cloudpickle/cloudpickle.py:1349` **TODO** decorrelate reducer_override (which is tied to CPython's
- `tools/kokoro-venv/Lib/site-packages/csvw/metadata.py:134` **FIXME** pylint: disable=W0511
- `tools/kokoro-venv/Lib/site-packages/csvw/metadata.py:1390` **FIXME** We only support Foreign Key references between tables!  pylint: disable=W0511
- `tools/kokoro-venv/Lib/site-packages/csvw/metadata.py:1473` **TODO** raise if any(c is not None for c in values)?  pylint: disable=W0511
- `tools/kokoro-venv/Lib/site-packages/csvw/metadata.py:1607` **FIXME** pylint: disable=W0511
- `tools/kokoro-venv/Lib/site-packages/csvw/metadata.py:1683` **FIXME** id  pylint: disable=W0511
- `tools/kokoro-venv/Lib/site-packages/dateutil/rrule.py:1182` **TODO** Check -numweeks for next year.
- `tools/kokoro-venv/Lib/site-packages/dateutil/parser/_parser.py:55` **TODO** pandas.core.tools.datetimes imports this explicitly.  Might be worth
- `tools/kokoro-venv/Lib/site-packages/dateutil/parser/_parser.py:265` **TODO** "Tues"
- `tools/kokoro-venv/Lib/site-packages/dateutil/parser/_parser.py:267` **TODO** "Thurs"
- `tools/kokoro-venv/Lib/site-packages/dateutil/parser/_parser.py:272` **TODO** "Febr"
- `tools/kokoro-venv/Lib/site-packages/dateutil/parser/_parser.py:291` **TODO** ERA = ["AD", "BC", "CE", "BCE", "Stardate",
- `tools/kokoro-venv/Lib/site-packages/dateutil/parser/_parser.py:777` **TODO** not hit in tests
- `tools/kokoro-venv/Lib/site-packages/dateutil/parser/_parser.py:815` **TODO** check that l[i + 1] is integer?
- `tools/kokoro-venv/Lib/site-packages/dateutil/parser/_parser.py:823` **TODO** Check that l[i+3] is minute-like?
- `tools/kokoro-venv/Lib/site-packages/dateutil/parser/_parser.py:910` **TODO** Check if res attributes already set.
- `tools/kokoro-venv/Lib/site-packages/dateutil/parser/_parser.py:934` **TODO** checking that hour/minute/second are not
- `tools/kokoro-venv/Lib/site-packages/dateutil/parser/_parser.py:941` **TODO** try/except for this?
- `tools/kokoro-venv/Lib/site-packages/dateutil/parser/_parser.py:1032` **TODO** Are we sure this is the right condition here?
- `tools/kokoro-venv/Lib/site-packages/dateutil/parser/_parser.py:1100` **TODO** Every usage of this function sets res.second to the return
- `tools/kokoro-venv/Lib/site-packages/dateutil/parser/_parser.py:1112` **TODO** Is this going to admit a lot of false-positives for when we
- `tools/kokoro-venv/Lib/site-packages/dateutil/zoneinfo/__init__.py:25` **TODO** switch to FileNotFoundError?
- `tools/kokoro-venv/Lib/site-packages/dateutil/zoneinfo/__init__.py:76` **TODO** Remove after deprecation period.
- `tools/kokoro-venv/Lib/site-packages/espeakng_loader/espeak-ng-data/lang/roa/ht:4` **TODO** somebody should take responsibility for this
- `tools/kokoro-venv/Lib/site-packages/flatbuffers/encode.py:36` **TODO** could set .flags.writeable = False to make users jump through
- `tools/kokoro-venv/Lib/site-packages/flatbuffers/flexbuffers.py:23` **TODO** (dkovalev): Add type hints everywhere, so tools like pytypes could work.
- `tools/kokoro-venv/Lib/site-packages/flatbuffers/table.py:120` **TODO** length accounts for bytewidth, right?
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/descriptor.py:26` **TODO** Remove this import after fix api_implementation
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/descriptor.py:294` **TODO** Add function to calculate full_name instead of having it in
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/descriptor.py:526` **TODO** We should have aggressive checking here,
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/descriptor.py:532` **TODO** for this and other *Descriptor classes, we
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/descriptor.py:580` **TODO** Find a way to eliminate this repetition.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/descriptor.py:604` **TODO** Find a way to eliminate this repetition.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/descriptor.py:641` **TODO** Find a way to eliminate this repetition.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/descriptor_database.py:144` **TODO** implement this API.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/descriptor_database.py:148` **TODO** implement this API.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/descriptor_pool.py:1459` **TODO** This pool could be constructed from Python code, when we
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/json_format.py:207` **TODO** b/551998570 - Over the longer term, we can consider putting this
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/message.py:8` **TODO** We should just make these methods all "pure-virtual" and move
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/message.py:49` **TODO** Link to an HTML document here.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/message.py:51` **TODO** Document that instances of this class will also
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/message.py:55` **TODO** Document these fields and methods.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/message.py:72` **TODO** Remove this once the UPB implementation is improved.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/message.py:188` **TODO** MergeFromString() should probably return None and be
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/message.py:223` **TODO** Document handling of unknown fields.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/message.py:224` **TODO** When we switch to a helper, this will return None.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/message.py:278` **TODO** Decide whether we like these better
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/message.py:284` **TODO** Be sure to document (and test) exactly
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/message_factory.py:98` **TODO** Remove this check here. Duplicate extension
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/message_factory.py:138` **TODO** Remove this check here. Duplicate extension
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/symbol_database.py:135` **TODO** Fix the differences with MessageFactory.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/text_format.py:32` **TODO** Import thread contention leads to test failures.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/text_format.py:482` **TODO** refactor and optimize if this becomes an issue.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/text_format.py:1237` **TODO** Change to _allow_singular_overwrites.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/text_format.py:1849` **TODO** Migrate violators to textformat_tokenizer.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/api_implementation.py:92` **TODO** fail back to python
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/builder.py:99` **TODO** Remove this on-op
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/containers.py:120` **TODO** Remove this. BaseContainer does *not* conform to
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/containers.py:281` **TODO** Constrain T to be a subtype of Message.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/extension_dict.py:41` **TODO** Unify error handling of "unknown extension" crap.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/extension_dict.py:42` **TODO** Support iteritems()-style iteration over all
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/python_message.py:10` **TODO** Helpers for verbose, common checks like seeing if a
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/python_message.py:218` **TODO** Escape Python keywords (e.g., yield), and test this support.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/python_message.py:233` **TODO** Remove this method entirely if/when everyone agrees with my
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/python_message.py:535` **TODO** This may be broken since there may not be
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/python_message.py:813` **TODO** This may be broken since there may not be
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/python_message.py:869` **TODO** Remove duplication with similar method
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/python_message.py:930` **TODO** Migrate all users of these attributes to functions like
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/python_message.py:933` **TODO** Use cls.MESSAGE_FACTORY.pool when available.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/python_message.py:1107` **TODO** Don't use the factory of generated messages.
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/python_message.py:1120` **TODO** For now we just strip the hostname.  Better logic will be
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/internal/python_message.py:1170` **TODO** Fix UnknownFieldSet to consider MessageSet extensions,
- `tools/kokoro-venv/Lib/site-packages/google/protobuf/pyext/cpp_message.py:19` **TODO** Remove this import after fix api_implementation
- `tools/kokoro-venv/Lib/site-packages/isodate/duration.py:232` **TODO** there is some weird behaviour in date - timedelta ...
- `tools/kokoro-venv/Lib/site-packages/isodate/isodates.py:162` **FIXME** negative dates not possible with python standard types
- `tools/kokoro-venv/Lib/site-packages/isodate/isoduration.py:67` **FIXME** currently not possible in alternative format
- `tools/kokoro-venv/Lib/site-packages/isodate/isoduration.py:133` **TODO** implement better decision for negative Durations.
- `tools/kokoro-venv/Lib/site-packages/joblib/compressor.py:235` **TODO** python2_drop: is it still needed since we dropped Python 2 support A
- `tools/kokoro-venv/Lib/site-packages/joblib/func_inspect.py:218` **TODO** Maybe add a warning here?
- `tools/kokoro-venv/Lib/site-packages/joblib/func_inspect.py:317` **XXX** Maybe I need an inspect.isbuiltin to detect C-level methods, such
- `tools/kokoro-venv/Lib/site-packages/joblib/func_inspect.py:388` **XXX** Return a sorted list of pairs?
- `tools/kokoro-venv/Lib/site-packages/joblib/func_inspect.py:400` **XXX** Should this use inspect.formatargvalues/formatargspec?
- `tools/kokoro-venv/Lib/site-packages/joblib/func_inspect.py:430` **XXX** Not using logging framework
- `tools/kokoro-venv/Lib/site-packages/joblib/hashing.py:201` **XXX** There might be a more efficient way of doing this
- `tools/kokoro-venv/Lib/site-packages/joblib/logger.py:134` **XXX** This conflicts with the debug flag used in children class
- `tools/kokoro-venv/Lib/site-packages/joblib/logger.py:151` **XXX** Need argument docstring
- `tools/kokoro-venv/Lib/site-packages/joblib/logger.py:181` **XXX** We actually need a debug flag to disable this
- `tools/kokoro-venv/Lib/site-packages/joblib/logger.py:192` **FIXME** Too much logic duplicated
- `tools/kokoro-venv/Lib/site-packages/joblib/logger.py:205` **XXX** We actually need a debug flag to disable this
- `tools/kokoro-venv/Lib/site-packages/joblib/memory.py:44` **TODO** The following object should have a data store object as a sub
- `tools/kokoro-venv/Lib/site-packages/joblib/memory.py:53` **TODO** Same remark for the logger, and probably use the Python logging
- `tools/kokoro-venv/Lib/site-packages/joblib/memory.py:556` **XXX** Should use an exception logger
- `tools/kokoro-venv/Lib/site-packages/joblib/memory.py:592` **TODO** (pierreglaser): do the same with get_func_name?
- `tools/kokoro-venv/Lib/site-packages/joblib/memory.py:787` **XXX** Should be using warnings, and giving stacklevel
- `tools/kokoro-venv/Lib/site-packages/joblib/numpy_pickle_utils.py:237` **TODO** python2_drop: is it still needed? The docstring mentions python 2.6
- `tools/kokoro-venv/Lib/site-packages/joblib/numpy_pickle_utils.py:283` **XXX** Remove this function when numpy 1.X is not supported anymore
- `tools/kokoro-venv/Lib/site-packages/joblib/parallel.py:1575` **XXX** Not using the logger framework: need to
- `tools/kokoro-venv/Lib/site-packages/joblib/parallel.py:2080` **TODO** this iterator should be batch_size * n_jobs
- `tools/kokoro-venv/Lib/site-packages/joblib/pool.py:49` **TODO** python2_drop : can this be simplified ?
- `tools/kokoro-venv/Lib/site-packages/joblib/_memmapping_reducer.py:164` **TODO** check scipy sparse datastructure if scipy is installed
- `tools/kokoro-venv/Lib/site-packages/joblib/_store_backends.py:216` **TODO** (1.5) turn into error
- `tools/kokoro-venv/Lib/site-packages/joblib/_store_backends.py:473` **XXX** the condition is necessary because in `Memory.__init__`, the user
- `tools/kokoro-venv/Lib/site-packages/joblib/externals/loky/_base.py:20` **TODO** investigate why using `concurrent.futures.Future` directly does not
- `tools/kokoro-venv/Lib/site-packages/joblib/externals/loky/backend/resource_tracker.py:130` **TODO** Remove work-around when Python 3.13 is our minimum supported version
- `tools/kokoro-venv/Lib/site-packages/joblib/externals/loky/backend/resource_tracker.py:157` **TODO** Remove block when Python 3.13 is our minimum supported version
- `tools/kokoro-venv/Lib/site-packages/joblib/externals/loky/backend/resource_tracker.py:249` **TODO** could the structure be closer?
- `tools/kokoro-venv/Lib/site-packages/joblib/externals/loky/backend/resource_tracker.py:491` **TODO** not sure about exit_code management with 2-stage clean-up
- `tools/kokoro-venv/Lib/site-packages/joblib/externals/loky/backend/resource_tracker.py:507` **TODO** We should fix loky.backend.spawn.get_executable to return bytes
- `tools/kokoro-venv/Lib/site-packages/joblib/externals/loky/backend/spawn.py:95` **XXX** this is a workaround that may be error prone: in the future, it
- `tools/kokoro-venv/Lib/site-packages/joblib/externals/loky/backend/stdlib_py314_resource_tracker.py:391` **TODO** remove when Python 3.15 is the minimum supported version. For more details about preserve_fd see
- `tools/kokoro-venv/Lib/site-packages/joblib/externals/loky/backend/synchronize.py:11` **TODO** investigate which Python version is required to be able to use
- `tools/kokoro-venv/Lib/site-packages/joblib/test/common.py:18` **TODO** straight removal since in joblib.test.common?
- `tools/kokoro-venv/Lib/site-packages/joblib/test/common.py:44` **TODO** Turn this back on after refactoring yield based tests in test_hashing
- `tools/kokoro-venv/Lib/site-packages/joblib/test/test_memmapping.py:702` **XXX** on Windows, reference cycles can delay timely garbage collection
- `tools/kokoro-venv/Lib/site-packages/joblib/test/test_memory.py:148` **TODO** test that the cache related to the function cache persists across
- `tools/kokoro-venv/Lib/site-packages/joblib/test/test_memory.py:172` **TODO** when Python 3.11 is the minimum supported version, use
- `tools/kokoro-venv/Lib/site-packages/joblib/test/test_parallel.py:1308` **XXX** workaround limitation in cloudpickle
- `tools/kokoro-venv/Lib/site-packages/jsonschema/validators.py:237` **TODO** include new meta-schemas added at runtime
- `tools/kokoro-venv/Lib/site-packages/jsonschema/_format.py:470` **TODO** I don't want to maintain this, so it
- `tools/kokoro-venv/Lib/site-packages/jsonschema/_format.py:533` **FIXME** See bolsote/isoduration#25 and bolsote/isoduration#21
- `tools/kokoro-venv/Lib/site-packages/jsonschema/_keywords.py:422` **FIXME** Include context for each unevaluated property
- `tools/kokoro-venv/Lib/site-packages/jsonschema/_legacy_keywords.py:435` **FIXME** Include context for each unevaluated property
- `tools/kokoro-venv/Lib/site-packages/jsonschema/tests/test_exceptions.py:389` **FIXME** #442
- `tools/kokoro-venv/Lib/site-packages/jsonschema/tests/test_validators.py:820` **TODO** These really need unit tests for each individual keyword, rather
- `tools/kokoro-venv/Lib/site-packages/jsonschema/tests/test_validators.py:1603` **TODO** These all belong upstream
- `tools/kokoro-venv/Lib/site-packages/kokoro_onnx/__init__.py:144` **TODO** make it more accurate
- `tools/kokoro-venv/Lib/site-packages/numpy/conftest.py:117` **FIXME** when yield tests are gone.
- `tools/kokoro-venv/Lib/site-packages/numpy/__init__.py:925` **TODO** Remove the environment variable entirely now that it is "weak"
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/capi_maps.py:252` **TODO** support Fortran `len` function with optional kind parameter
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/capi_maps.py:500` **TODO** Evaluate intent_flags here.
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/cfuncs.py:413` **XXX** Note that CNUMFROMARROBJ is identical with NUMFROMARROBJ
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/cfuncs.py:758` **TODO** change the type of `len` so that we can remove this */
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/cfuncs.py:818` **TODO** update when numpy will support 1-byte and
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/cfuncs.py:843` **TODO** This error (and most other) error handling needs cleaning. */
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/cfuncs.py:866` **TODO** These should be dynamically generated, too many mapped to int things,
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:136` **TODO** 
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:712` **XXX** non-zero reset values need testing
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:1434` **XXX** subsequent init expressions may get wrong values.
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:1440` **XXX** This essentially ignores the value for generating the pyf which is fine:
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:1993` **XXX** apply mapping
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:2039` **TODO** 
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:2142` **XXX** How to catch dependence cycles correctly?
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:2403` **XXX** return something sensible.
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:2414` **XXX** This should be processor dependent
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:2430` **XXX** This should be processor dependent
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:2472` **TODO** test .eq., .neq., etc replacements.
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:2518` **TODO** ]: '
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/crackfortran.py:2561` **TODO** use symbolic from PR #19805
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/f2py2e.py:458` **TODO** Remove all this when scaninputline is replaced
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/f2py2e.py:650` **TODO** Once distutils is dropped completely, i.e. min_ver >= 3.12, unify into --fflags
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/symbolic.py:23` **TODO** support logical constants (Op.BOOLEAN)
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/symbolic.py:24` **TODO** support logical operators (.AND., ...)
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/symbolic.py:25` **TODO** support defined operators (.MYOP., ...)
- `tools/kokoro-venv/Lib/site-packages/numpy/f2py/symbolic.py:519` **TODO** other kind not used
- …and 413 more

## What this did not check

These are mechanical checks. They cannot find a defect that needs two files read together and a judgement made about whether they agree — which is the shape of most real bugs. Nothing above looks for:

- logic that is wrong rather than malformed;
- a contract broken across files — a case missing from one switch of six;
- an endpoint that returns success while doing nothing, or fails silently;
- whether the tests assert anything meaningful;
- whether the behaviour is the intended one.

Those need a reading pass. Bring this report to one, and start at the `history` section: it names the files this project has already proven it gets wrong.

