const test = require('node:test');
const assert = require('node:assert/strict');
const { classifyPage, noticeRemainingSeconds, shouldShowNotice,
  classifyBatchProgress, classifyShowMoreIdle, runShowMoreFive, createShowMoreStallTracker,
  attemptShowMoreReset, collectOpenTargets, canOpenAll, bulkClickDecision,
  confirmBulkOpen, runOpenAll } = require('../booklist-enhancer.user.js');
const { makeRuntime } = require('./runtime-fixture.cjs');

test('routes known non-booklist pages to notice and waits silently for mirror fingerprint', () => {
  assert.equal(typeof classifyPage, 'function');
  assert.equal(classifyPage('1lib.sk', '/', false), 'notice');
  assert.equal(classifyPage('1lib.sk', '/booklists', false), 'notice');
  assert.equal(classifyPage('1lib.sk', '/booklist/1', false), 'pending');
  assert.equal(classifyPage('mirror.example', '/booklist/1', false), 'pending');
  assert.equal(classifyPage('mirror.example', '/', false), 'silent');
  assert.equal(classifyPage('mirror.example', '/booklist/1', true), 'booklist');
});

test('iframe cannot start observers or read settings', () => {
  const runtime = makeRuntime({ topFrame: false, fingerprint: true });
  runtime.start();
  assert.equal(runtime.activeObservers, 0);
  assert.equal(runtime.settingsReads, 0);
});

test('late injection and fingerprint arrival start the booklist once', () => {
  const runtime = makeRuntime();
  runtime.start();
  assert.equal(runtime.settingsReads, 0);
  assert.equal(runtime.activeObservers, 1);
  runtime.setFingerprint(true);
  assert.equal(runtime.settingsReads, 2); // global and per-host settings
  assert.equal(runtime.activeObservers, 0);
  runtime.setFingerprint(true);
  assert.equal(runtime.settingsReads, 2);
  assert.equal(runtime.document.listenerCount('marksLoaded'), 1);
});

test('BFCache restoration reattaches exactly one booklist listener', () => {
  const runtime = makeRuntime({ fingerprint: true });
  runtime.start();
  assert.equal(runtime.document.listenerCount('marksLoaded'), 1);
  runtime.window.dispatch('pagehide', { persisted: true });
  assert.equal(runtime.document.listenerCount('marksLoaded'), 0);
  runtime.window.dispatch('pageshow', { persisted: true });
  assert.equal(runtime.document.listenerCount('marksLoaded'), 1);
  runtime.window.dispatch('pageshow', { persisted: true });
  assert.equal(runtime.document.listenerCount('marksLoaded'), 1);
});

test('same-document navigation deactivates the old booklist and can reactivate', () => {
  const runtime = makeRuntime({ hostname: '1lib.sk', fingerprint: true });
  runtime.start();
  assert.equal(runtime.document.listenerCount('marksLoaded'), 1);
  runtime.window.location.pathname = '/search';
  runtime.window.dispatch('popstate');
  assert.equal(runtime.document.listenerCount('marksLoaded'), 0);
  runtime.window.location.pathname = '/booklist/2';
  runtime.window.dispatch('popstate');
  assert.equal(runtime.document.listenerCount('marksLoaded'), 1);
});

test('notice deadline is absolute and never shows negative countdown', () => {
  assert.equal(noticeRemainingSeconds(1000, 1000), 10);
  assert.equal(noticeRemainingSeconds(1000, 1001), 10);
  assert.equal(noticeRemainingSeconds(1000, 9999), 2);
  assert.equal(noticeRemainingSeconds(1000, 11000), 0);
  assert.equal(noticeRemainingSeconds(1000, 20000), 0);
});

test('notice gate is per-host and degrades to document-only dedupe when storage is blocked', () => {
  const seen = new Set();
  const storage = new Map();
  const sessionStore = {
    getItem(key) { return storage.get(key) || null; },
    setItem(key, value) { storage.set(key, value); },
  };
  assert.equal(shouldShowNotice('1lib.sk', true, sessionStore, seen), true);
  assert.equal(storage.get('zble-intro-seen-v3:1lib.sk'), '1');
  assert.equal(shouldShowNotice('1lib.sk', true, sessionStore, seen), false);
  assert.equal(shouldShowNotice('z-lib.sk', true, sessionStore, seen), true);
  assert.equal(shouldShowNotice('libb.la', false, sessionStore, seen), false);
  const copied = { getItem() { return '1'; }, setItem() { throw Error('must not write'); } };
  assert.equal(shouldShowNotice('z-library.sk', true, copied, seen), false);
  const blocked = { getItem() { throw new Error('SecurityError'); }, setItem() { throw new Error('SecurityError'); } };
  assert.equal(shouldShowNotice('z-lib.fm', true, blocked, seen), true);
  assert.equal(shouldShowNotice('z-lib.fm', true, blocked, seen), false);
});

test('known-site notice appears once, counts down, and closes at absolute deadline', () => {
  const runtime = makeRuntime({ hostname: '1lib.sk', pathname: '/', noticeDom: true });
  runtime.start();
  assert.equal(runtime.notices.length, 1);
  assert.equal(runtime.notice.shadowRoot.querySelector('#zble-notice-close').textContent, 'Close · 10s');
  assert.equal(runtime.notice.shadowRoot.querySelector('.try').hidden, false);
  assert.match(runtime.notice.shadowRoot.innerHTML, /prefers-color-scheme:dark/);
  assert.match(runtime.notice.shadowRoot.innerHTML, /prefers-reduced-motion:reduce/);
  runtime.advance(3500);
  assert.equal(runtime.notice.shadowRoot.querySelector('#zble-notice-close').textContent, 'Close · 7s');
  runtime.advance(9000);
  assert.equal(runtime.notice.removed, true);
  assert.equal(runtime.intervals, 0);
  runtime.window.location.pathname = '/search';
  runtime.window.dispatch('popstate');
  assert.equal(runtime.notices.length, 1);
});

test('notice omits self-link and opt-out is per host', () => {
  const runtime = makeRuntime({ hostname: '1lib.sk', pathname: '/booklists', noticeDom: true });
  runtime.start();
  assert.equal(runtime.notice.shadowRoot.querySelector('.try').hidden, true);
  const optout = runtime.notice.shadowRoot.querySelector('#zble-notice-optout');
  optout.checked = true;
  optout.dispatch('change');
  assert.equal(runtime.notice.removed, true);
  assert.equal(runtime.sitePrefs['1lib.sk'].welcomeEnabled, false);
  assert.equal(runtime.sitePrefs['z-lib.sk'], undefined);
});

test('storage access rejection keeps notice usable without repeated mount', () => {
  const runtime = makeRuntime({ hostname: 'z-lib.sk', pathname: '/', noticeDom: true, storageBlocked: true });
  runtime.start();
  assert.equal(runtime.notices.length, 1);
  runtime.window.location.pathname = '/search';
  runtime.window.dispatch('popstate');
  assert.equal(runtime.notices.length, 1);
});

test('manual close releases notice timer and copied session marker suppresses it', () => {
  const sessionData = new Map();
  const first = makeRuntime({ hostname: '1lib.sk', pathname: '/', noticeDom: true, sessionData });
  first.start();
  assert.equal(sessionData.get('zble-intro-seen-v3:1lib.sk'), '1');
  first.notice.shadowRoot.querySelector('#zble-notice-close').dispatch('click');
  assert.equal(first.notice.removed, true);
  assert.equal(first.intervals, 0);
  const copied = makeRuntime({ hostname: '1lib.sk', pathname: '/', noticeDom: true, sessionData });
  copied.start();
  assert.equal(copied.notices.length, 0);
});

test('visibility change catches a delayed notice timer and host reset permits a new session', () => {
  const disabled = makeRuntime({ hostname: 'z-lib.sk', pathname: '/', noticeDom: true,
    sitePrefs: { 'z-lib.sk': { welcomeEnabled: false, bulkOpenEnabled: false } } });
  disabled.start();
  assert.equal(disabled.notices.length, 0);
  const fresh = makeRuntime({ hostname: 'z-lib.sk', pathname: '/', noticeDom: true,
    sitePrefs: { 'z-lib.sk': { welcomeEnabled: true, bulkOpenEnabled: false } } });
  fresh.start();
  assert.equal(fresh.notices.length, 1);
  fresh.advance(9900);
  fresh.window.dispatch('pageshow');
  assert.equal(fresh.notice.shadowRoot.querySelector('#zble-notice-close').textContent, 'Close · 1s');
  fresh.advance(200);
  fresh.document.dispatch('visibilitychange');
  assert.equal(fresh.notice.removed, true);
});

test('batch classifier waits for twenty new cards and a quiet window', () => {
  assert.equal(classifyBatchProgress({ before: 20, now: 39, buttonExists: true,
    quietMs: 750, elapsedMs: 5000 }), 'wait');
  assert.equal(classifyBatchProgress({ before: 20, now: 40, buttonExists: true,
    quietMs: 200, elapsedMs: 5000 }), 'wait');
  assert.equal(classifyBatchProgress({ before: 20, now: 40, buttonExists: true,
    quietMs: 750, elapsedMs: 5000 }), 'next');
  assert.equal(classifyBatchProgress({ before: 20, now: 27, buttonExists: false,
    quietMs: 750, elapsedMs: 5000 }), 'end');
  assert.equal(classifyBatchProgress({ before: 20, now: 39, buttonExists: true,
    quietMs: 10000, elapsedMs: 20000 }), 'timeout');
});

test('Show more idle phase changes at five and ten seconds without negative countdown', () => {
  assert.deepEqual(classifyShowMoreIdle(4999), { phase: 'running', seconds: null });
  assert.deepEqual(classifyShowMoreIdle(5000), { phase: 'warning', seconds: 5 });
  assert.deepEqual(classifyShowMoreIdle(9000), { phase: 'warning', seconds: 1 });
  assert.deepEqual(classifyShowMoreIdle(10000), { phase: 'timeout', seconds: null });
  assert.deepEqual(classifyShowMoreIdle(50000), { phase: 'timeout', seconds: null });
});

test('five-click runner warns, then stops after ten seconds without new book cards', async () => {
  let now = 0;
  let clicks = 0;
  const timers = new Map();
  let nextId = 0;
  const progress = [];
  const clock = { now: () => now, setTimeout(fn, ms) {
    const id = ++nextId; timers.set(id, { at: now + ms, fn }); return id;
  }, clearTimeout(id) { timers.delete(id); } };
  const tick = async at => {
    now = at;
    for (const [id, item] of [...timers]) if (item.at <= now) { timers.delete(id); item.fn(); }
    await Promise.resolve();
  };
  const cards = [{}];
  const result = runShowMoreFive({ getCards: () => cards, findButton: () => ({ click() { clicks++; } }),
    observe: () => () => {}, clock, onProgress: item => progress.push(item) });
  await tick(5000);
  assert.equal(progress.at(-1).phase, 'warning');
  assert.equal(progress.at(-1).seconds, 5);
  await tick(9000);
  assert.equal(progress.at(-1).seconds, 1);
  await tick(10000);
  assert.deepEqual(await result, { completed: 0, added: 0, attempted: 1, failed: 1, reason: 'timeout' });
  assert.equal(clicks, 1);
});

test('manual Show more click enables one reset only after ten seconds with disabled native button', () => {
  let now = 0;
  const cards = [{}];
  const attrs = new Map();
  const button = { disabled: false, getAttribute: key => attrs.get(key) ?? null,
    setAttribute: (key, value) => attrs.set(key, value), removeAttribute: key => attrs.delete(key),
    hasAttribute: key => attrs.has(key) };
  let currentButton = button;
  const states = [];
  const timers = new Map();
  let timerId = 0;
  const tracker = createShowMoreStallTracker({ clock: {
    now: () => now, setTimeout(fn, ms) { const id = ++timerId; timers.set(id, { at: now + ms, fn }); return id; },
    clearTimeout(id) { timers.delete(id); },
  }, getCards: () => cards, getButton: () => currentButton, onState: state => states.push(state) });
  tracker.check();
  assert.equal(states.at(-1).resetEligible, false);
  tracker.noteManualClick(button);
  button.disabled = true;
  now = 9999; tracker.check();
  assert.equal(states.at(-1).resetEligible, false);
  now = 10000; tracker.check();
  assert.equal(states.at(-1).resetEligible, true);
  assert.deepEqual(attemptShowMoreReset({ button, baseline: tracker.baseline(),
    stillEligible: () => tracker.check().resetEligible }), { attempted: true, interactive: true });
  tracker.consumeReset();
  assert.equal(button.disabled, false);
  assert.equal(tracker.check().resetEligible, false);
  button.disabled = true;
  now = 20000; tracker.check();
  assert.equal(tracker.check().resetEligible, false);
  currentButton = { ...button, disabled: true };
  assert.equal(tracker.check().resetEligible, false);
  tracker.dispose();
  assert.equal(timers.size, 0);
});

test('late books or natural native recovery revoke reset eligibility', () => {
  let now = 0;
  const cards = [{}];
  const button = { disabled: false, getAttribute: () => null };
  const tracker = createShowMoreStallTracker({ clock: { now: () => now,
    setTimeout: () => 1, clearTimeout() {} }, getCards: () => cards, getButton: () => button });
  tracker.noteToolClick(button);
  button.disabled = true;
  now = 10000; assert.equal(tracker.check().resetEligible, true);
  cards.push({});
  assert.equal(tracker.check().resetEligible, false);
  now = 19999; assert.equal(tracker.check().resetEligible, false);
  button.disabled = false;
  assert.equal(tracker.check().resetEligible, false);
  button.disabled = true;
  now = 30000; assert.equal(tracker.check().resetEligible, false);
  tracker.dispose();
});

test('reset does not claim an interactive native button when site CSS still blocks clicks', () => {
  const button = { disabled: true, style: { pointerEvents: 'none' },
    getAttribute: () => null };
  const outcome = attemptShowMoreReset({ button, baseline: { disabled: false, ariaDisabled: null },
    stillEligible: () => true });
  assert.deepEqual(outcome, { attempted: true, interactive: false });
  assert.equal(button.disabled, false);
});

test('five-click runner waits for actual card additions and disconnects observers', async () => {
  let cards = Array.from({ length: 20 }, (_, i) => ({ i }));
  let clicks = 0;
  let observerCallback = null;
  let disconnects = 0;
  const progress = [];
  let now = 0;
  const timers = new Map();
  let nextTimer = 1;
  const clock = {
    now: () => now,
    setTimeout(callback, delay) { const id = nextTimer++; timers.set(id, { at: now + delay, callback }); return id; },
    clearTimeout(id) { timers.delete(id); },
  };
  const button = { click() {
    clicks++;
    cards = [...cards, ...Array.from({ length: 20 }, (_, i) => ({ i: clicks * 20 + i }))];
    observerCallback?.();
  } };
  const task = runShowMoreFive({ getCards: () => cards, findButton: () => button,
    observe(callback) { observerCallback = callback; return () => { observerCallback = null; disconnects++; }; },
    clock, onProgress: item => progress.push(item) });
  for (let step = 0; step < 5; step++) {
    await Promise.resolve();
    now += 750;
    for (const [id, timer] of [...timers]) if (timer.at <= now) { timers.delete(id); timer.callback(); }
    await Promise.resolve();
  }
  const result = await task;
  assert.equal(clicks, 5);
  assert.equal(result.completed, 5);
  assert.equal(result.added, 100);
  assert.ok(progress.filter(item => item.reason === 'next').every(item => item.phase === 'running'));
  assert.equal(disconnects, 5);
  assert.equal(timers.size, 0);
});

test('partial 19-card batch does not click again; final seven-card batch ends safely', async () => {
  let cards = Array.from({ length: 20 }, (_, i) => ({ i }));
  let clicks = 0;
  let callback = null;
  let buttonPresent = true;
  let now = 0;
  let nextId = 1;
  const timers = new Map();
  const clock = {
    now: () => now,
    setTimeout(fn, ms) { const id = nextId++; timers.set(id, { at: now + ms, fn }); return id; },
    clearTimeout(id) { timers.delete(id); },
  };
  const advance = async ms => {
    now += ms;
    for (const [id, task] of [...timers]) if (task.at <= now) { timers.delete(id); task.fn(); }
    await Promise.resolve();
  };
  const button = { click() {
    clicks++;
    if (clicks === 1) cards.push(...Array.from({ length: 19 }, (_, i) => ({ i: 20 + i })));
    else { cards.push(...Array.from({ length: 7 }, (_, i) => ({ i: 40 + i }))); buttonPresent = false; }
    callback?.();
  } };
  const task = runShowMoreFive({ getCards: () => cards, findButton: () => buttonPresent ? button : null,
    observe(fn) { callback = fn; return () => { callback = null; }; }, clock });
  await advance(5000);
  assert.equal(clicks, 1);
  cards.push({ i: 39 });
  callback();
  await advance(750);
  assert.equal(clicks, 2);
  await advance(750);
  assert.deepEqual(await task, { completed: 2, added: 27, attempted: 2, failed: 0, reason: 'end' });
  assert.equal(timers.size, 0);
});

test('partial batch times out at 20 seconds and never triggers a second click', async () => {
  let clicks = 0;
  let now = 0;
  let callback = null;
  const timers = new Map();
  const clock = { now: () => now, setTimeout(fn, ms) { timers.set(1, { at: now + ms, fn }); return 1; },
    clearTimeout(id) { timers.delete(id); } };
  let cards = Array.from({ length: 20 }, (_, i) => ({ i }));
  const task = runShowMoreFive({ getCards: () => cards, findButton: () => ({ click() {
    clicks++;
    cards = [...cards, { i: 20 }];
    callback?.();
  } }), observe(fn) { callback = fn; return () => { callback = null; }; }, clock });
  now = 20000;
  const timer = timers.get(1); timers.delete(1); timer.fn();
  const result = await task;
  assert.equal(result.reason, 'timeout');
  assert.equal(result.added, 1);
  assert.equal(clicks, 1);
});

test('Show more task stops on click exception or source-page abort', async () => {
  const cards = Array.from({ length: 20 }, (_, i) => ({ i }));
  let disconnected = 0;
  const errorResult = await runShowMoreFive({ getCards: () => cards,
    findButton: () => ({ click() { throw new Error('site click failed'); } }),
    observe() { return () => { disconnected++; }; },
    clock: { now: () => 0, setTimeout() { throw Error('unexpected timer'); }, clearTimeout() {} } });
  assert.equal(errorResult.reason, 'error');
  assert.equal(disconnected, 1);
  const controller = new AbortController();
  let callback;
  let clicked = 0;
  const abortTask = runShowMoreFive({ getCards: () => cards,
    findButton: () => ({ click() { clicked++; } }),
    observe(fn) { callback = fn; return () => { callback = null; disconnected++; }; },
    clock: { now: () => 0, setTimeout() { return 1; }, clearTimeout() {} }, signal: controller.signal });
  controller.abort();
  assert.equal((await abortTask).reason, 'source-gone');
  assert.equal(clicked, 1);
  assert.equal(callback, null);
});

test('bulk target collection excludes hidden, duplicate and off-origin book links', () => {
  const card = (href, hidden = false) => ({ href, hidden,
    getAttribute(name) { return name === 'href' ? href : null; },
    classList: { contains(name) { return hidden && name === 'zble-hidden'; } } });
  const cards = [card('/book/123/a'), card('https://1lib.sk/book/123/a#fragment'),
    card('/book/456/b', true), card('https://elsewhere.example/book/777'),
    card('/search/1'), card('javascript:alert(1)'),
    card('https://user:secret@1lib.sk/book/888'), card('/book/789/c')];
  assert.deepEqual(collectOpenTargets(cards, 'https://1lib.sk', item => !item.hidden),
    ['https://1lib.sk/book/123/a', 'https://1lib.sk/book/789/c']);
});

test('bulk gate requires host opt-in, ready filters, known download and tab API', () => {
  assert.deepEqual(canOpenAll({ enabled: false, filtersReady: true, unknownDownloads: 0,
    openTabAvailable: true }), { allowed: false, reason: 'disabled' });
  assert.equal(canOpenAll({ enabled: true, filtersReady: false, unknownDownloads: 0,
    openTabAvailable: true }).reason, 'filters-pending');
  assert.equal(canOpenAll({ enabled: true, filtersReady: true, unknownDownloads: 1,
    openTabAvailable: true }).reason, 'unknown-downloads');
  assert.equal(canOpenAll({ enabled: true, filtersReady: true, unknownDownloads: 0,
    openTabAvailable: false }).reason, 'api-unavailable');
  assert.equal(canOpenAll({ enabled: true, filtersReady: true, unknownDownloads: 0,
    openTabAvailable: true }).allowed, true);
});

test('unauthorized bulk-open click leads only to an information dialog before other gates', () => {
  assert.equal(bulkClickDecision({ enabled: false, gate: { allowed: false, reason: 'filters-pending' },
    targetCount: 0 }), 'enable-info');
  assert.equal(bulkClickDecision({ enabled: true, gate: { allowed: false, reason: 'filters-pending' },
    targetCount: 0 }), 'blocked');
  assert.equal(bulkClickDecision({ enabled: true, gate: { allowed: true }, targetCount: 0 }), 'empty');
  assert.equal(bulkClickDecision({ enabled: true, gate: { allowed: true }, targetCount: 3 }), 'confirm');
});

test('bulk confirmation cancels on either warning or changed snapshot before any open', async () => {
  const urls = ['https://1lib.sk/book/1', 'https://1lib.sk/book/2'];
  let calls = 0;
  const base = { urls, getCurrentTargets: () => urls, getDomainEnabled: () => true };
  assert.equal(await confirmBulkOpen({ ...base, showDialog: async () => { calls++; return false; } }), false);
  assert.equal(calls, 1);
  calls = 0;
  assert.equal(await confirmBulkOpen({ ...base, showDialog: async () => ++calls === 1 }), false);
  assert.equal(calls, 2);
  calls = 0;
  let current = urls;
  assert.equal(await confirmBulkOpen({ ...base, getCurrentTargets: () => current,
    showDialog: async () => { calls++; if (calls === 2) current = [urls[0]]; return true; } }), false);
  assert.equal(calls, 2);
  assert.equal(await confirmBulkOpen({ ...base, getDomainEnabled: () => false,
    showDialog: async () => true }), false);
  let signature = 'old';
  let invalid = 0;
  assert.equal(await confirmBulkOpen({ ...base, getFilterSignature: () => signature,
    onInvalid: () => { invalid++; },
    showDialog: async step => { if (step === 2) signature = 'new'; return true; } }), false);
  assert.equal(invalid, 1);
  let cardSnapshot = [{ id: 1 }];
  assert.equal(await confirmBulkOpen({ ...base, getCardSnapshot: () => cardSnapshot,
    showDialog: async step => { if (step === 2) cardSnapshot = [{ id: 1 }]; return true; } }), false);
  assert.equal(await confirmBulkOpen({ ...base, urls: [], showDialog: async () => {
    throw new Error('zero target should not show a dialog');
  } }), false);
});

test('bulk runner submits each target once and counts failures without retry', async () => {
  const calls = [];
  const result = await runOpenAll({ urls: ['a', 'b', 'c'],
    openTab(url, options) { calls.push([url, options]); if (url === 'b') throw new Error('blocked');
      if (url === 'c') return Promise.reject(new Error('rejected')); return {}; },
    delay: async () => {}, isSourceAlive: () => true });
  assert.deepEqual(result, { attempted: 3, submitted: 1, failed: 2 });
  assert.deepEqual(calls.map(item => item[0]), ['a', 'b', 'c']);
  assert.ok(calls.every(item => item[1].active === false));
});

test('bulk runner stops when source page disappears during pacing', async () => {
  let alive = true;
  const calls = [];
  const result = await runOpenAll({ urls: ['a', 'b', 'c'], openTab(url) { calls.push(url); },
    delay: async ms => { assert.equal(ms, 350); alive = false; }, isSourceAlive: () => alive });
  assert.deepEqual(result, { attempted: 1, submitted: 1, failed: 0 });
  assert.deepEqual(calls, ['a']);
});

test('bulk runner has no silent fifty-book cap', async () => {
  let calls = 0;
  const result = await runOpenAll({ urls: Array.from({ length: 55 }, (_, i) => `synthetic-${i}`),
    openTab() { calls++; }, delay: async () => {}, isSourceAlive: () => true });
  assert.equal(calls, 55);
  assert.deepEqual(result, { attempted: 55, submitted: 55, failed: 0 });
});
