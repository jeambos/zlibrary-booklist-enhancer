const test = require('node:test');
const assert = require('node:assert/strict');
const { classifyPage } = require('../booklist-enhancer.user.js');
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
