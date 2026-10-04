const test = require('node:test');
const assert = require('node:assert/strict');
const { classifyPage, noticeRemainingSeconds, shouldShowNotice } = require('../booklist-enhancer.user.js');
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
  assert.equal(runtime.settingsReads, 1);
  assert.equal(runtime.activeObservers, 0);
  runtime.setFingerprint(true);
  assert.equal(runtime.settingsReads, 1);
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
