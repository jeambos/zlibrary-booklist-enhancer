# Execution ledger — plan: D:\WorkingCloud\zlibrary-booklist-enhancer\docs\superpowers\plans\2026-10-03-booklist-enhancer-rewrite.md

Environment: project directory is not a Git repository; no worktree, commits, or git-based task scripts are applicable. Execution stays in the explicitly scoped project directory.

Pre-flight: Tasks 2–4 share pure format/stats/download interfaces. Task 5 consumes their final Userscript and tests. Names in the plan are consistent.

Task 1: baseline `node --check booklist-enhancer.user.js` passed; no existing package manifest or automated test suite.

Task 1: live site showed 20 initial cards, title `BOOKS (774)`, card `extension`, cover ID/ISBN, and `marksLoaded` dispatch after `markDownloadedBooks()` resolves. Site `fetchDownloadedBooks()` uses `ZLibraryResponse.fetch()`. That fetch catches application/network errors and can resolve `undefined`; the caller then converts missing response/downloads to an empty collection, caches it, and dispatches `marksLoaded`. Empty success and failure are therefore indistinguishable from the event/map alone.

Task 1: Ruling: do not enable the downloaded-status filter on `marksLoaded` alone — the site can emit it after failure — cost if wrong: downloaded-status filtering remains unavailable until a reliable success signal can be observed without changing site request behavior.

Task 2: old Userscript deleted as requested, then a new file was created from scratch. Core tests were RED (module absent), then GREEN (2/2). Later format/DOM tests were RED (missing new interfaces), then GREEN (9/9). `node --check` passed. No original code body was transplanted.

Task 3: Ruling: a nonempty `ZLibrary._.downloaded` map after `marksLoaded` is positive evidence of successful acquisition on the observed site code path; an empty map remains ambiguous and keeps the filter disabled. Cost if wrong: an unexpected site implementation could misclassify a nonempty stale map; the script is limited to the inspected 1lib.sk domain.

Task 3: local fixture demonstrated positive map enables the switch and filters 40 cards to 19 PDF/not-downloaded; an empty map afterward disables the switch, preserves checked intent, and returns to 20 PDF cards. Core tests 9/9 passed.

Task 4: Local fixture verified the active-card count, 20→40 Show more transition, partial +7 batch, seven-card replacement, zero-match Show more visibility, format selection commit, and refresh persistence. Desktop and 375px narrow layout were visually checked; a narrow overlap was fixed by placing the panel in document flow under 600px. Late card-internal metadata now returns an explicit pending result; after bounded retries, unresolved badge placement reports a compatibility warning. No script console errors were observed in the fixture.

Task 5: New script was not installed into the logged-in live site, so live end-to-end behavior remains a manual gate. Live site was inspected read-only for selectors, header, card attributes, cover identity, and downloaded-state lifecycle. The positive-map fixture, ambiguous-empty fixture, 30-second timeout, and late success were exercised. Download status remains intentionally unavailable for truly zero-download accounts because the inspected site emits the same empty map/event for success and failure. `TEST_PLAN.md` records the partial verification and untested scenarios.

Final checks: `node --test tests\booklist-enhancer.test.cjs` passed 9/9, `node --check booklist-enhancer.user.js` exited 0. Static scan found only GM settings persistence; no fetch/XHR, logging, or stored progress/book identities in production script. Version remains `1.0.0-dev` pending live install and actual-account end-to-end tests.
