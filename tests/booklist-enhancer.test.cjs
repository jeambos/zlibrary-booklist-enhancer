const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const {
  normalizeExtension,
  parseCustomFormats,
  invalidCustomFormats,
  matchesFormat,
  computeStats,
  parseBookTotal,
  sanitizeSettings,
  hasEffectiveFormatRule,
  classifyDownload,
  createDownloadGate,
  renderFormatBadge,
  readCardData,
  getActiveCards,
  hasBooklistFingerprint,
  evaluateCard,
} = require('../booklist-enhancer.user.js');
const { makeCard, makeBooklist } = require('./dom-fixture.cjs');

test('normalizes formats and fails open without a selection', () => {
  assert.equal(normalizeExtension(' .PDF '), 'pdf');
  assert.equal(normalizeExtension(' '), '');
  assert.deepEqual([...parseCustomFormats('djvu; .FB2，bad-name')], ['djvu', 'fb2']);
  assert.deepEqual(invalidCustomFormats('djvu; bad-name, .FB2'), ['bad-name']);
  assert.equal(matchesFormat('', new Set(['other']), new Set()), true);
  assert.equal(matchesFormat('epub', new Set(), new Set()), true);
  assert.equal(matchesFormat('epub', new Set(['pdf']), new Set()), false);
});

test('computes page estimates from actual loaded cards', () => {
  assert.deepEqual(computeStats({ loaded: 20, matched: 8, total: 774 }), {
    loaded: 20,
    matched: 8,
    total: 774,
    pages: 39,
    remaining: 38,
    current: 1,
    approxExpansions: 0,
  });
  assert.deepEqual(computeStats({ loaded: 40, matched: 4, total: 774 }), {
    loaded: 40,
    matched: 4,
    total: 774,
    pages: 39,
    remaining: 37,
    current: 2,
    approxExpansions: 1,
  });
  assert.equal(computeStats({ loaded: 47, matched: 47, total: 774 }).remaining, 37);
  assert.equal(computeStats({ loaded: 47, matched: 47, total: 12 }).remaining, null);
  assert.equal(computeStats({ loaded: 0, matched: 0, total: null }).current, 0);
});

test('parses only an explicit book count', () => {
  assert.equal(parseBookTotal('Books (774)'), 774);
  assert.equal(parseBookTotal('Books (1,234) Comments (0)'), 1234);
  assert.equal(parseBookTotal('Comments (0)'), null);
});

test('invalid saved settings fall back safely and custom-only empty rule is inactive', () => {
  assert.deepEqual(sanitizeSettings({ showFormat: 'yes', formats: ['pdf', 'bad'], custom: 3 }), {
    showFormat: true,
    filterFormat: false,
    filterDownload: false,
    formats: ['pdf'],
    custom: '',
    downloadRule: 'not-downloaded',
  });
  assert.equal(hasEffectiveFormatRule(new Set(['custom']), new Set()), false);
  assert.equal(hasEffectiveFormatRule(new Set(['custom']), new Set(['djvu'])), true);
  assert.equal(hasEffectiveFormatRule(new Set(['other']), new Set()), true);
});

test('download classification is tri-state and uses cover identity', () => {
  assert.equal(classifyDownload({ ready: false, coverId: 'a', isbns: [], lookup: () => false }), 'unknown');
  assert.equal(classifyDownload({ ready: true, coverId: '', isbns: [], lookup: () => false }), 'unknown');
  assert.equal(classifyDownload({ ready: true, coverId: 'a', isbns: [], lookup: () => false }), 'not-downloaded');
  assert.equal(classifyDownload({
    ready: true, coverId: 'a', isbns: ['x', 'y'], lookup: (_id, ...isbns) => isbns.includes('y'),
  }), 'downloaded');
  assert.equal(classifyDownload({ ready: true, coverId: 'a', isbns: [], lookup: () => { throw Error('lost'); } }), 'unknown');
});

test('download gate rejects ambiguous empty map and recovers from late success', () => {
  const gate = createDownloadGate();
  assert.equal(gate.state, 'waiting');
  gate.onMarksLoaded({ byId: {}, byIsbn: {} });
  assert.equal(gate.state, 'waiting');
  assert.equal(gate.ambiguous, true);
  gate.onMarksLoaded({ byId: [1], byIsbn: {} });
  assert.equal(gate.state, 'waiting');
  gate.onTimeout();
  assert.equal(gate.state, 'timed-out');
  gate.onMarksLoaded({ byId: { 123: 1 }, byIsbn: {} });
  assert.equal(gate.state, 'ready');
  assert.equal(gate.ambiguous, false);
  gate.onMarksLoaded({ byId: {}, byIsbn: {} });
  assert.equal(gate.state, 'waiting');
});

test('renders one badge without replacing native metadata', () => {
  const { card, root, idle } = makeCard();
  assert.equal(renderFormatBadge(card, 'pdf', true), true);
  assert.equal(renderFormatBadge(card, 'pdf', true), true);
  assert.equal(idle.children.length, 1);
  assert.equal(idle.children[0].textContent, 'PDF');
  assert.equal(idle.nativeText, 'Chinese, 2024');
  assert.equal(root.children.length, 1);
  assert.equal(card.hasAttribute('data-zble-show-format'), true);
  renderFormatBadge(card, 'pdf', false);
  assert.equal(card.hasAttribute('data-zble-show-format'), false);
  const late = makeCard({ extension: '' , shadowReady: false });
  assert.equal(renderFormatBadge(late.card, '', true), false);
  late.card.shadowRoot = late.root;
  assert.equal(renderFormatBadge(late.card, '', true), true);
  assert.equal(late.idle.children[0].textContent, '未知格式');
  const partial = makeCard();
  const originalQuery = partial.root.querySelectorAll.bind(partial.root);
  partial.root.querySelectorAll = () => [];
  assert.equal(renderFormatBadge(partial.card, 'pdf', true), false);
  partial.root.querySelectorAll = originalQuery;
  assert.equal(renderFormatBadge(partial.card, 'pdf', true), true);
  assert.equal(partial.idle.children[0].textContent, 'PDF');
});

test('reads cover identity and reevaluates active cards after replacement', () => {
  const first = makeCard({ extension: 'EPUB', coverId: 'cover-7', isbn: 'x, y' }).card;
  assert.deepEqual(readCardData(first), { extension: 'epub', coverId: 'cover-7', isbns: ['x', 'y'] });
  const list = makeBooklist(Array(20).fill(first));
  assert.equal(getActiveCards(list).length, 20);
  list.setCards(Array(40).fill(first));
  assert.equal(getActiveCards(list).length, 40);
  list.setCards([first]);
  assert.equal(getActiveCards(list).length, 1);
});

test('recognizes the booklist structure before activating on user-added mirrors', () => {
  const valid = makeBooklist([makeCard().card]);
  assert.equal(hasBooklistFingerprint(valid), true);
  valid.setCards([]);
  assert.equal(hasBooklistFingerprint(valid), false);
  valid.setTotal('Books (0)');
  assert.equal(hasBooklistFingerprint(valid), true);
  valid.setListPresent(false);
  assert.equal(hasBooklistFingerprint(valid), false);
  assert.equal(hasBooklistFingerprint({ querySelector: () => null, querySelectorAll: () => [] }), false);
});

test('match rules cover the four selected booklist hosts and exclude the retired host', () => {
  const script = readFileSync(require.resolve('../booklist-enhancer.user.js'), 'utf8');
  const matches = [...script.matchAll(/^\/\/ @match\s+(\S+)\s*$/gm)].map(match => match[1]);
  const hosts = matches.map(pattern => {
    const parts = /^https:\/\/([^/*]+)\/booklist\/\*$/.exec(pattern);
    assert.ok(parts, `匹配范围必须限定为 HTTPS 书单路径：${pattern}`);
    return parts[1];
  });
  assert.deepEqual(new Set(hosts), new Set(['z-lib.sk', 'z-library.sk', '1lib.sk', 'libb.la']));
  assert.equal(hosts.length, 4);
  assert.equal(hosts.includes('z-library.biz'), false);
});

test('user-added non-booklist pages stay inert until a booklist appears', () => {
  const script = readFileSync(require.resolve('../booklist-enhancer.user.js'), 'utf8');
  let siteReady = false;
  let settingsReads = 0;
  let observerCallback;
  let disconnects = 0;
  const document = {
    readyState: 'complete',
    documentElement: {},
    body: null,
    querySelector(selector) {
      if (!siteReady) return null;
      if (selector === '.booklist-main.active') {
        return { querySelector: name => name === '.readlist-view' ? {} : null };
      }
      return null;
    },
    querySelectorAll(selector) {
      return siteReady && selector === '.booklist-main.active .readlist-view > z-bookcard' ? [{}] : [];
    },
    addEventListener() {},
  };
  runInNewContext(script, {
    document,
    window: { addEventListener() {} },
    MutationObserver: class {
      constructor(callback) { observerCallback = callback; }
      observe() {}
      disconnect() { disconnects++; }
    },
    setTimeout: () => 1,
    clearTimeout() {},
    GM_getValue: () => { settingsReads++; return {}; },
  });
  assert.equal(settingsReads, 0);
  assert.equal(disconnects, 0);
  siteReady = true;
  observerCallback();
  assert.equal(settingsReads, 1);
  assert.equal(disconnects, 1);
});

test('card filtering is fail-open for an empty format rule and unknown download', () => {
  const info = { extension: 'epub', coverId: '7', isbns: [] };
  const settings = sanitizeSettings({ filterFormat: true, filterDownload: true, formats: [] });
  assert.deepEqual(evaluateCard(info, settings, false, () => false), { visible: true, download: 'unknown' });
  settings.formats = ['pdf'];
  assert.deepEqual(evaluateCard(info, settings, false, () => false), { visible: false, download: 'unknown' });
  settings.formats = ['epub'];
  assert.deepEqual(evaluateCard(info, settings, true, () => false), { visible: true, download: 'not-downloaded' });
});
