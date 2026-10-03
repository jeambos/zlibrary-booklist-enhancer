# Z-Library Booklist Enhancer Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Delete the untested prototype and create a new, standalone Userscript matching the approved design and test plan.

**Architecture:** A single installable `.user.js` contains small pure decision functions and a browser adapter. The adapter reads only the active booklist, applies script-owned classes/format badges, and updates the panel after coalesced DOM changes. Download filtering remains disabled until a verified successful completion signal; stats are derived from current DOM and never persisted.

**Tech Stack:** JavaScript Userscript, Node.js 22 built-in `node:test`, no runtime dependencies.

**Spec:** `D:\WorkingCloud\zlibrary-booklist-enhancer\DESIGN.md`; test matrix: `D:\WorkingCloud\zlibrary-booklist-enhancer\TEST_PLAN.md`.

## Global Constraints

- Remove the existing `booklist-enhancer.user.js` and create a new file from scratch, even if the final pathname is the same. Do not transplant its body.
- Keep the delivered Userscript standalone. Initially match only the verified `https://1lib.sk/booklist/*` domain.
- No extra network requests, external GIF, book downloads, booklist edits, persistent progress/checkpoints, or logging of tokens/ISBN lists/download maps.
- The initial format selection is empty; format filtering with no valid rule is fail-open with a prompt. `Y` counts this tool's filtering only.
- Unknown download status must never be treated as not downloaded. A failed or timed-out status load disables that filter.
- `marksLoaded` is a plain event; read the site map/API after the event rather than an event payload. Empty-map success and failure semantics require live verification before enabling the feature.
- This directory is not a Git repository. Do not invent commit/branch steps; preserve the design and test documents.

## Review Focus

1. Event missed before Userscript startup: download status stays unknown unless an independently verified completion marker exists (Task 3 test).
2. Empty download map from a successful response versus an initialized empty map: only the successful case enables “仅未下载” (Task 3 test).
3. Native search/sort replacing cards: `X/Y` recompute from the current active container, without old hidden classes leaking (Task 4 test).
4. Missing format and empty custom selection: label says “未知格式”; active empty format rule hides nothing (Task 2 test).
5. Show more adds fewer than 20 cards or fails: stats use actual DOM count, not click count (Task 4 test).

---

### Task 1: Verify the site contract and establish the test baseline

**Files:** Read `DESIGN.md`, `TEST_PLAN.md`, the existing Userscript, and the logged-in page; create `tests/booklist-enhancer.test.cjs` in the next task.

**Interfaces:** Document the verified meaning of `marksLoaded`, whether empty success emits it, failure behavior, `z-cover` ID/ISBN source, total-count header, and Show more append behavior. No code interface yet.

- [ ] **Step 1: Inspect current files and baseline.** Record that there is no package manifest or existing automated suite; run `node --check booklist-enhancer.user.js` only as a syntax baseline.
- [ ] **Step 2: Inspect the logged-in site read-only.** Observe scripts/state around `CurrentUser.markDownloadedBooks`, `ZLibrary.dispatch('marksLoaded', ...)`, and `ZLibrary.checkIsDownloaded`; record only behavior and safe structure, not account tokens or full HTML.
- [ ] **Step 3: Resolve the completion gate.** Confirm empty-success and failure behavior. If site evidence cannot distinguish completion from failure, mark download filtering as fail-closed and report this limitation; do not silently assume success.

### Task 2: New script core, settings, and format behavior

**Files:** Delete then create `booklist-enhancer.user.js`; create `tests/booklist-enhancer.test.cjs` and `tests/dom-fixture.cjs` (small in-memory card/root stubs; no npm dependency).

**Interfaces:** In the new script, pure functions `normalizeExtension(raw) -> string`, `parseCustomFormats(raw) -> Set<string>`, `matchesFormat(extension, selected, custom) -> boolean`, and `computeStats({loaded, matched, total}) -> {loaded, matched, total, pages, remaining, current, approxExpansions}`. Export these only in Node (`module.exports`) and boot only when `document` exists.

- [ ] **Step 1: Write failing Node tests named `normalizes formats and fails open` and `computes 20-book pages`.** Core assertions:

```js
assert.equal(normalizeExtension(' .PDF '), 'pdf');
assert.equal(normalizeExtension(' '), '');
assert.deepEqual([...parseCustomFormats('djvu; .FB2，bad-name')], ['djvu', 'fb2']);
assert.equal(matchesFormat('', new Set(['other']), new Set()), true);
assert.equal(matchesFormat('epub', new Set(), new Set()), true);
assert.deepEqual(computeStats({loaded:20, matched:8, total:774}),
  {loaded:20, matched:8, total:774, pages:39, remaining:38, current:1, approxExpansions:0});
```
- [ ] **Step 2: Run `node --test tests/booklist-enhancer.test.cjs`.** Confirm failures come from absent new interfaces, not a broken test runner.
- [ ] **Step 3: Delete the old Userscript with `apply_patch`, then create the new file with `apply_patch`.** Implement only the tested core, safe settings defaults/persistence, and a no-op guarded browser boot. Do not copy old implementation text.
- [ ] **Step 4: Run the targeted Node tests and `node --check booklist-enhancer.user.js`.** Both must pass before extending browser behavior.
- [ ] **Step 5: Add `renders one badge without replacing metadata` in the Node test file using `tests/dom-fixture.cjs`.** Assert that rendering twice leaves one format badge, original language/year/hover metadata and link unchanged, and late Shadow DOM creation adds the badge on refresh. Implement the badge and settings panel until the fixture test passes. The panel has three immediate switches and gear-committed settings; empty format rule prompts without hiding cards.

### Task 3: Download-state gate and safe filtering

**Files:** Modify the new `booklist-enhancer.user.js`; extend `tests/booklist-enhancer.test.cjs`.

**Interfaces:** `classifyDownload({ready, coverId, isbns, lookup}) -> 'unknown'|'downloaded'|'not-downloaded'`; browser gate states `waiting | ready | timed-out | failed`, with 30-second timeout and late-success recovery.

- [ ] **Step 1: Write failing tests named `download classification is tri-state` and `download gate fails closed`.** Core assertions:

```js
assert.equal(classifyDownload({ready:false, coverId:'a', isbns:[], lookup:()=>false}), 'unknown');
assert.equal(classifyDownload({ready:true, coverId:'a', isbns:[], lookup:()=>false}), 'not-downloaded');
assert.equal(classifyDownload({ready:true, coverId:'a', isbns:['x','y'], lookup:(id, ...isbns)=>isbns.includes('y')}), 'downloaded');
```

The gate fixture must also assert disabled on initialized empty map without event, timeout/failure/missed event; enabled after a verified plain completion event with an empty map; disabled spinner stops at 30 seconds; late verified success reenables.
- [ ] **Step 2: Run the targeted tests and confirm they fail for missing behavior.**
- [ ] **Step 3: Implement the gate and filtering.** Listen at `document-start`; use `z-cover` identity and the site API after a verified successful completion signal. If Task 1 could not verify success semantics, retain disabled fail-closed behavior and state why in the status bar. Use CSS spinner with reduced-motion fallback, stop it after timeout, preserve the user's checked intent.
- [ ] **Step 4: Re-run targeted tests and syntax check.** Confirm no unknown card is classified as not-downloaded.

### Task 4: Live DOM updates, counts, and panel states

**Files:** Modify the new `booklist-enhancer.user.js`; extend `tests/booklist-enhancer.test.cjs`; optionally create `tests/fixture.html` for manual browser checks.

**Interfaces:** `refresh()` reads `.booklist-main.active .readlist-view > z-bookcard`, computes `X/Y/T/P/R/C/N` from current nodes, applies only a script-owned hidden class, and updates status/panel. `scheduleRefresh()` coalesces mutations.

- [ ] **Step 1: Write failing fixture tests named `counts active cards after append or replacement` and `does not hide Show more`.** With `makeBooklist()` from `tests/dom-fixture.cjs`, assert 20/774 gives `pages=39,remaining=38,current=1`, append 20 gives `loaded=40,remaining=37,current=2`, append seven gives `loaded=47` (not 60), and replacing with 20 cards returns `loaded=20`. An empty active format rule gives `matched=loaded`; at `matched=0`, Show more remains visible.
- [ ] **Step 2: Run the targeted tests and confirm failure.**
- [ ] **Step 3: Implement narrow observers, stats parsing, all status messages, and responsive accessible panel behavior.** Never observe the panel as a source of refresh; avoid duplicate labels/observer loops; `T<X` or unavailable total shows unknown rather than a false remaining count.
- [ ] **Step 4: Run all Node tests, syntax check, and a secret/persistence scan.** Verify only preferences are saved and no full URL, `user_token`, ISBN list, download map, or progress count is persisted/logged.

### Task 5: End-to-end validation and handoff

**Files:** Update `TEST_PLAN.md` only with observed test results if a separate results section is useful; do not change the approved requirements. Deliver `booklist-enhancer.user.js`.

- [ ] **Step 1: Test against a local fixture and the logged-in booklist.** Check loading state, format badges, filters, gear commit behavior, 20→40 Show more count, zero matches, refresh, desktop/narrow layout, keyboard focus, and console errors. Do not download books or mutate the list.
- [ ] **Step 2: Exercise/download-status cases according to Task 1 evidence.** Verify an actual downloaded and non-downloaded item, empty result if safely observable, 30-second timeout in fixture, and late success. If empty/failure semantics remain unverified, leave the download switch disabled and disclose the limitation.
- [ ] **Step 3: Run fresh final commands:** `node --test tests/booklist-enhancer.test.cjs` and `node --check booklist-enhancer.user.js`. Review the new script against every `DESIGN.md` section and report which manual cases passed or remain unverified.

## Execution note

Use native in-session execution: subagent delegation is unavailable under the current task instructions. This plan is pending user review; no old script is deleted until the plan is approved.
