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
  parseYearRule,
  matchesYear,
  compileFilters,
  filterActiveCards,
  createRefreshScheduler,
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
    showLanguage: true,
    showYear: true,
    showFullTitle: false,
    filterYear: false,
    yearMin: '',
    yearMax: '',
    includeMissingYear: false,
  });
  assert.equal(hasEffectiveFormatRule(new Set(['custom']), new Set()), false);
  assert.equal(hasEffectiveFormatRule(new Set(['custom']), new Set(['djvu'])), true);
  assert.equal(hasEffectiveFormatRule(new Set(['other']), new Set()), true);
});

test('migrates old preferences and rejects malformed new settings', () => {
  const settings = sanitizeSettings({
    showFormat: false, filterFormat: true, filterDownload: true,
    formats: ['epub'], custom: 'fb2', downloadRule: 'downloaded',
    showLanguage: false, showYear: false, showFullTitle: true,
    filterYear: true, yearMin: 2000, yearMax: [], includeMissingYear: true,
  });
  assert.equal(settings.showFormat, false);
  assert.equal(settings.filterFormat, true);
  assert.equal(settings.filterDownload, true);
  assert.deepEqual(settings.formats, ['epub']);
  assert.equal(settings.downloadRule, 'downloaded');
  assert.equal(settings.showLanguage, false);
  assert.equal(settings.showYear, false);
  assert.equal(settings.showFullTitle, true);
  assert.equal(settings.filterYear, true);
  assert.equal(settings.yearMin, '');
  assert.equal(settings.yearMax, '');
  assert.equal(settings.includeMissingYear, true);
});

test('year rule validates inclusive closed and one-sided bounds', () => {
  assert.deepEqual(parseYearRule({ yearMin: '', yearMax: '' }), { active: false, min: null, max: null, error: '' });
  assert.deepEqual(parseYearRule({ yearMin: '2000', yearMax: '' }), { active: true, min: 2000, max: null, error: '' });
  assert.deepEqual(parseYearRule({ yearMin: '', yearMax: '2020' }), { active: true, min: null, max: 2020, error: '' });
  assert.deepEqual(parseYearRule({ yearMin: '2020', yearMax: '2020' }), { active: true, min: 2020, max: 2020, error: '' });
  for (const value of ['0', '-1', '1.5', 'abc', '10000']) {
    const rule = parseYearRule({ yearMin: value, yearMax: '' });
    assert.equal(rule.active, false);
    assert.ok(rule.error, value);
  }
  const conflict = parseYearRule({ yearMin: '2021', yearMax: '2020' });
  assert.equal(conflict.active, false);
  assert.ok(conflict.error);
});

test('year matching includes endpoints and optionally includes missing years', () => {
  const rule = { active: true, min: 2000, max: 2020, error: '' };
  assert.equal(matchesYear('2000', rule, false), true);
  assert.equal(matchesYear('2020', rule, false), true);
  assert.equal(matchesYear('1999', rule, false), false);
  for (const year of [null, '', '0', 'unknown']) {
    assert.equal(matchesYear(year, rule, false), false);
    assert.equal(matchesYear(year, rule, true), true);
  }
  assert.equal(matchesYear('1999', rule, true), false);
  assert.equal(matchesYear('0', { active: false, min: null, max: null, error: '' }, false), true);
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
  const first = makeCard({ extension: 'EPUB', coverId: 'cover-7', isbn: 'x, y', year: '2020', language: 'english' }).card;
  assert.deepEqual(readCardData(first), { extension: 'epub', coverId: 'cover-7', isbns: ['x', 'y'], year: '2020', language: 'english' });
  const list = makeBooklist(Array(20).fill(first));
  assert.equal(getActiveCards(list).length, 20);
  list.setCards(Array(40).fill(first));
  assert.equal(getActiveCards(list).length, 40);
  list.setCards([first]);
  assert.equal(getActiveCards(list).length, 1);
});

test('compiled filters intersect format, download and inclusive year once per card', () => {
  const settings = sanitizeSettings({ filterFormat: true, formats: ['epub'], filterDownload: true,
    downloadRule: 'downloaded', filterYear: true, yearMin: '2000', yearMax: '2020' });
  const context = compileFilters(settings, true, id => id === 'yes');
  assert.equal(evaluateCard({ extension: 'epub', coverId: 'yes', isbns: [], year: '2020' }, context).visible, true);
  assert.equal(evaluateCard({ extension: 'pdf', coverId: 'yes', isbns: [], year: '2020' }, context).visible, false);
  assert.equal(evaluateCard({ extension: 'epub', coverId: 'no', isbns: [], year: '2020' }, context).visible, false);
  assert.equal(evaluateCard({ extension: 'epub', coverId: 'yes', isbns: [], year: '2021' }, context).visible, false);
  assert.equal(evaluateCard({ extension: 'epub', coverId: 'yes', isbns: [], year: '0' }, context).visible, false);
  assert.equal(evaluateCard({ extension: 'epub', coverId: 'yes', isbns: [], year: 'garbled' }, context).visible, false);
});

test('paused year and unknown download leave other active filters working', () => {
  const settings = sanitizeSettings({ filterFormat: true, formats: ['epub'], filterDownload: true,
    filterYear: true, yearMin: '2021', yearMax: '2020' });
  const context = compileFilters(settings, false, null);
  assert.equal(evaluateCard({ extension: 'epub', coverId: 'a', isbns: [], year: '0' }, context).visible, true);
  assert.equal(evaluateCard({ extension: 'pdf', coverId: 'a', isbns: [], year: '0' }, context).visible, false);
  settings.yearMin = '2000';
  settings.yearMax = '2020';
  const valid = compileFilters(settings, false, null);
  assert.equal(evaluateCard({ extension: 'epub', coverId: 'a', isbns: [], year: '2020' }, valid).visible, true);
  assert.equal(evaluateCard({ extension: 'epub', coverId: 'a', isbns: [], year: '0' }, valid).visible, false);
});

test('filter pass enumerates real cards once and omits the summary element', () => {
  const cards = [makeCard({ extension: 'epub' }).card, makeCard({ extension: 'pdf' }).card];
  let enumerations = 0;
  const root = { querySelectorAll(selector) {
    assert.equal(selector, '.booklist-main.active .readlist-view > z-bookcard');
    enumerations++;
    return cards;
  } };
  const context = compileFilters(sanitizeSettings({ filterFormat: true, formats: ['epub'] }), false, null);
  const pass = filterActiveCards(root, context);
  assert.equal(enumerations, 1);
  assert.equal(pass.cards.length, 2);
  assert.equal(pass.matched, 1);
  assert.deepEqual(pass.results.map(item => item.visible), [true, false]);
});

test('same-frame setting changes and appended cards schedule one refresh', () => {
  const queued = [];
  let refreshes = 0;
  const schedule = createRefreshScheduler(() => { refreshes++; }, callback => queued.push(callback));
  schedule();
  schedule();
  schedule();
  assert.equal(queued.length, 1);
  queued.shift()();
  assert.equal(refreshes, 1);
  schedule();
  assert.equal(queued.length, 1);
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

test('match rules cover six selected booklist hosts and exclude the retired host', () => {
  const script = readFileSync(require.resolve('../booklist-enhancer.user.js'), 'utf8');
  const matches = [...script.matchAll(/^\/\/ @match\s+(\S+)\s*$/gm)].map(match => match[1]);
  const hosts = matches.map(pattern => {
    const parts = /^https:\/\/([^/*]+)\/booklist\/\*$/.exec(pattern);
    assert.ok(parts, `匹配范围必须限定为 HTTPS 书单路径：${pattern}`);
    return parts[1];
  });
  assert.deepEqual(new Set(hosts), new Set(['z-lib.sk', 'z-library.sk', '1lib.sk', 'libb.la', 'z-library.im', 'z-lib.fm']));
  assert.equal(hosts.length, 6);
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
    requestAnimationFrame() {},
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
  assert.deepEqual(evaluateCard(info, compileFilters(settings, false, () => false)), { visible: true, download: 'unknown' });
  settings.formats = ['pdf'];
  assert.deepEqual(evaluateCard(info, compileFilters(settings, false, () => false)), { visible: false, download: 'unknown' });
  settings.formats = ['epub'];
  assert.deepEqual(evaluateCard(info, compileFilters(settings, true, () => false)), { visible: true, download: 'not-downloaded' });
});
