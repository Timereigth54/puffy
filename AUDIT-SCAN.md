# Audit scan — puffy_app

*Generated 2026-09-28 15:14 by `audit-scan.py`. Deterministic checks only — everything below is something a tool decided, not something anyone judged. Read “What this did not check” before concluding the project is clean.*

## Verdict

Nothing urgent. What follows is quality and hygiene.

| Severity | Count |
|---|---|
| medium | 2 |

## The project

- **Stack:** node
- **Files:** 82 (0.6 MB), excluding dependencies and build output
- **Mostly:** `.tsx` ×59, `.ts` ×7, `.json` ×6, `.js` ×3, `.md` ×2, `.css` ×2

## Findings

### What this project is <sub>`recon`</sub>

- **[medium]** Not a git repository
  There is no history to mine, no baseline to revert to, and no way to tell what changed when. Every other safety net in an audit assumes git.

### Decidable risk patterns <sub>`security`</sub>

- **[medium]** dangerouslySetInnerHTML in puffy-web/src/components/ui/chart.tsx:83
  Safe only if the HTML is sanitised on the way IN. Check there is an allowlist, and that it runs at save time rather than at render time.
  ```
  dangerouslySetInnerHTML={{
  ```

## What this did not check

These are mechanical checks. They cannot find a defect that needs two files read together and a judgement made about whether they agree — which is the shape of most real bugs. Nothing above looks for:

- logic that is wrong rather than malformed;
- a contract broken across files — a case missing from one switch of six;
- an endpoint that returns success while doing nothing, or fails silently;
- whether the tests assert anything meaningful;
- whether the behaviour is the intended one.

Those need a reading pass. Bring this report to one, and start at the `history` section: it names the files this project has already proven it gets wrong.

