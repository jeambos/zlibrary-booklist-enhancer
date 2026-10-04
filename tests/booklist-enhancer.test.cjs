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
  renderCardMeta,
  renderFullTitle,
  formatRuleSummary,
  bindDeferredTextInput,
  renderFilterSummary,
  renderShowMore,
  formatProgressText,
  snapPanelPosition,
  clampPanelPosition,
  resetPanelDock,
  canStartPanelDrag,
  resolveLocale,
  translate,
  sanitizeSitePrefs,
  TRANSLATION_KEYS,
  TRANSLATIONS,
} = require('../booklist-enhancer.user.js');
const { makeCard, makeBooklist } = require('./dom-fixture.cjs');

test('v3 settings preserve v2 choices while adding safe defaults', () => {
  const result = sanitizeSettings({ formats: [], filterYear: true, yearMin: '2000', panelDock: { edge: 'left', offset: 20 } });
  assert.deepEqual(result.formats, []);
  assert.equal(result.filterYear, true);
  assert.equal(result.yearMin, '2000');
  assert.deepEqual(result.panelDock, { edge: 'left', offset: 20 });
  assert.equal(result.showFullAuthor, false);
  assert.equal(result.uiLanguage, 'auto');
  assert.equal(sanitizeSettings({ showFullAuthor: 'yes', uiLanguage: 'xx' }).uiLanguage, 'auto');
});

test('language resolution follows browser preference and falls back to English', () => {
  assert.equal(typeof resolveLocale, 'function');
  assert.equal(resolveLocale('auto', ['zh-HK']), 'zh-TW');
  assert.equal(resolveLocale('auto', ['zh-TW']), 'zh-TW');
  assert.equal(resolveLocale('auto', ['fr-CA']), 'fr');
  assert.equal(resolveLocale('auto', ['xx']), 'en');
  assert.equal(resolveLocale('auto', ['zh-MO']), 'zh-TW');
  assert.equal(resolveLocale('auto', ['zh-SG']), 'zh-CN');
  assert.equal(resolveLocale('auto', ['pt']), 'pt-BR');
  assert.equal(resolveLocale('ja', ['fr']), 'ja');
});

test('all supported languages provide each tool-generated translation key', () => {
  assert.equal(Array.isArray(TRANSLATION_KEYS), true);
  assert.ok(TRANSLATION_KEYS.length > 40);
  for (const locale of ['en', 'zh-CN', 'zh-TW', 'fr', 'de', 'ru', 'ja', 'ko', 'es', 'pt-BR']) {
    for (const key of TRANSLATION_KEYS) {
      assert.equal(typeof TRANSLATIONS[locale]?.[key], 'string', `${locale}:${key}`);
      assert.ok(TRANSLATIONS[locale][key].length > 0, `${locale}:${key}`);
    }
  }
  assert.equal(translate('en', 'notice.close', { seconds: 10 }), 'Close · 10s');
  assert.equal(translate('en', 'notice.close', { seconds: '<b>' }), 'Close · <b>s');
  assert.equal(translate('ko', 'not.a.key'), '');
});

test('per-host preferences reject paths, prototypes and malformed records', () => {
  assert.equal(typeof sanitizeSitePrefs, 'function');
  const result = sanitizeSitePrefs({
    '1lib.sk': { welcomeEnabled: false, bulkOpenEnabled: true },
    'mirror.example': { welcomeEnabled: true, bulkOpenEnabled: false },
    'https://bad.example/path': { welcomeEnabled: false, bulkOpenEnabled: true },
    '__proto__': { welcomeEnabled: false, bulkOpenEnabled: true },
    'odd..host': { welcomeEnabled: false, bulkOpenEnabled: true },
    'z-lib.sk': { welcomeEnabled: 'no', bulkOpenEnabled: 'yes' },
  });
  assert.deepEqual(result['1lib.sk'], { welcomeEnabled: false, bulkOpenEnabled: true });
  assert.deepEqual(result['mirror.example'], { welcomeEnabled: true, bulkOpenEnabled: false });
  assert.deepEqual(result['z-lib.sk'], { welcomeEnabled: true, bulkOpenEnabled: false });
  assert.equal(Object.hasOwn(result, 'https://bad.example/path'), false);
  assert.equal(Object.hasOwn(result, '__proto__'), false);
  assert.equal(Object.hasOwn(result, 'odd..host'), false);
});

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
    showFullAuthor: false,
    filterYear: false,
    yearMin: '',
    yearMax: '',
    includeMissingYear: false,
    panelDock: null,
    uiLanguage: 'auto',
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
  assert.equal(settings.panelDock, null);
  assert.equal(Object.hasOwn(settings, 'panelCollapsed'), false);
});

test('panel dock preference accepts only known edges and finite offsets', () => {
  assert.deepEqual(sanitizeSettings({ panelDock: { edge: 'left', offset: 85 } }).panelDock,
    { edge: 'left', offset: 85 });
  assert.equal(sanitizeSettings({ panelDock: { edge: 'diagonal', offset: 85 } }).panelDock, null);
  assert.equal(sanitizeSettings({ panelDock: { edge: 'left', offset: Infinity } }).panelDock, null);
});

test('panel snaps to each nearest edge and stays inside a resized viewport', () => {
  const viewport = { width: 1000, height: 700 };
  assert.deepEqual(snapPanelPosition({ left: 10, top: 250, width: 300, height: 200 }, viewport),
    { edge: 'left', offset: 250, left: 8, top: 250 });
  assert.deepEqual(snapPanelPosition({ left: 400, top: 5, width: 300, height: 200 }, viewport),
    { edge: 'top', offset: 400, left: 400, top: 8 });
  assert.deepEqual(snapPanelPosition({ left: 690, top: 200, width: 300, height: 200 }, viewport),
    { edge: 'right', offset: 200, left: 692, top: 200 });
  assert.deepEqual(snapPanelPosition({ left: 400, top: 490, width: 300, height: 200 }, viewport),
    { edge: 'bottom', offset: 400, left: 400, top: 492 });
  assert.deepEqual(clampPanelPosition({ edge: 'right', offset: 900 },
    { width: 375, height: 667 }, { width: 315, height: 500 }), { left: 52, top: 159 });
  assert.deepEqual(clampPanelPosition({ edge: 'bottom', offset: 900 },
    { width: 280, height: 240 }, { width: 315, height: 500 }), { left: 0, top: 0 });
});

test('resetting dock also returns panel scroll to its accessible header', () => {
  const removed = [];
  const host = { scrollTop: 400, style: { removeProperty(name) { removed.push(name); } } };
  const settings = { panelDock: { edge: 'bottom', offset: 100 } };
  let saved = 0;
  resetPanelDock(host, settings, () => { saved++; });
  assert.equal(settings.panelDock, null);
  assert.equal(host.scrollTop, 0);
  assert.equal(saved, 1);
  assert.deepEqual(removed, ['position', 'margin', 'right', 'left', 'top']);
});

test('header buttons and nonprimary mouse clicks cannot start a panel drag', () => {
  const title = { closest() { return null; } };
  const button = { closest(selector) { return selector === 'button' ? this : null; } };
  assert.equal(canStartPanelDrag({ target: title, pointerType: 'mouse', button: 0 }), true);
  assert.equal(canStartPanelDrag({ target: button, pointerType: 'mouse', button: 0 }), false);
  assert.equal(canStartPanelDrag({ target: title, pointerType: 'mouse', button: 2 }), false);
  assert.equal(canStartPanelDrag({ target: title, pointerType: 'touch', button: 0 }), true);
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

test('language and year metadata toggles restore exact desktop and mobile originals', () => {
  const { card, idle, mobileIdle } = makeCard();
  renderFormatBadge(card, 'pdf', true);
  assert.equal(renderCardMeta(card, { showLanguage: false, showYear: true }), true);
  assert.equal(idle.textNode.nodeValue, '2024');
  assert.equal(mobileIdle.textNode.nodeValue, '2024');
  assert.equal(renderCardMeta(card, { showLanguage: true, showYear: false }), true);
  assert.equal(idle.textNode.nodeValue, 'Chinese');
  assert.equal(mobileIdle.textNode.nodeValue, 'ch');
  assert.equal(renderCardMeta(card, { showLanguage: false, showYear: false }), true);
  assert.equal(idle.textNode.nodeValue, '');
  assert.equal(mobileIdle.textNode.nodeValue, '');
  assert.equal(renderCardMeta(card, { showLanguage: true, showYear: true }), true);
  assert.equal(idle.textNode.nodeValue, 'Chinese, 2024');
  assert.equal(mobileIdle.textNode.nodeValue, 'ch, 2024');
  assert.equal(idle.children.length, 1);
});

test('missing year, late shadow and unsupported metadata remain safe', () => {
  const missing = makeCard({ year: '0' });
  assert.equal(renderCardMeta(missing.card, { showLanguage: false, showYear: true }), true);
  assert.equal(missing.idle.textNode.nodeValue, '');
  const late = makeCard({ shadowReady: false });
  assert.equal(renderCardMeta(late.card, { showLanguage: false, showYear: true }), false);
  late.card.shadowRoot = late.root;
  assert.equal(renderCardMeta(late.card, { showLanguage: false, showYear: true }), true);
  const unsupported = makeCard();
  unsupported.idle.textNode.nodeValue = 'unrecognized layout';
  assert.equal(renderCardMeta(unsupported.card, { showLanguage: false, showYear: true }), false);
  assert.equal(unsupported.idle.textNode.nodeValue, 'unrecognized layout');
  const replacement = makeCard();
  assert.equal(renderCardMeta(replacement.card, { showLanguage: false, showYear: true }), true);
  assert.equal(replacement.idle.textNode.nodeValue, '2024');
});

test('full-title style is scoped and reversible without altering text or link', () => {
  const { card, root, title } = makeCard();
  const original = { text: title.textContent, href: title.href };
  assert.equal(renderFullTitle(card, true), true);
  assert.equal(card.hasAttribute('data-zble-full-title'), true);
  assert.equal(root.querySelector('#zble-title-style') !== null, true);
  assert.equal(renderFullTitle(card, false), true);
  assert.equal(card.hasAttribute('data-zble-full-title'), false);
  assert.equal(title.textContent, original.text);
  assert.equal(title.href, original.href);
  const late = makeCard({ shadowReady: false });
  assert.equal(renderFullTitle(late.card, true), false);
});

test('full-title mode releases the native fixed book-info height', () => {
  const { card, root } = makeCard();
  renderFullTitle(card, true);
  const css = root.querySelector('#zble-title-style').textContent;
  assert.match(css, /\.book-info\s*\{[^}]*height:\s*auto\s*!important/);
  assert.match(css, /\.book-info\s*\{[^}]*min-height:\s*88px/);
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

test('rule summaries show effective format, download wait and year conflicts', () => {
  const settings = sanitizeSettings({ formats: ['epub'], downloadRule: 'not-downloaded',
    yearMin: '2010', yearMax: '2020' });
  assert.deepEqual(formatRuleSummary(settings, 'ready', parseYearRule(settings)), {
    format: '（epub）', download: '（仅未下载）', year: '（2010–2020）',
  });
  assert.equal(formatRuleSummary(settings, 'waiting', parseYearRule(settings)).download, '（仅未下载；等待下载状态）');
  settings.formats = [];
  settings.yearMin = '';
  settings.yearMax = '';
  assert.equal(formatRuleSummary(settings, 'ready', parseYearRule(settings)).format, '（请手动设置）');
  assert.equal(formatRuleSummary(settings, 'ready', parseYearRule(settings)).year, '（请手动设置）');
  settings.yearMin = '2021';
  settings.yearMax = '2020';
  assert.equal(formatRuleSummary(settings, 'ready', parseYearRule(settings)).year, '（设置冲突）');
  settings.yearMin = '';
  assert.equal(formatRuleSummary(settings, 'ready', parseYearRule(settings)).year, '（≤2020）');
  settings.yearMin = '2020';
  settings.includeMissingYear = true;
  assert.equal(formatRuleSummary(settings, 'ready', parseYearRule(settings)).year, '（2020；含年份缺失）');
});

test('text inputs debounce and flush on Enter, blur and settings close', () => {
  const handlers = new Map();
  const element = { value: '', addEventListener(name, listener) { handlers.set(name, listener); } };
  const timers = new Map();
  let nextTimer = 0;
  const saved = [];
  const flush = bindDeferredTextInput(element, value => saved.push(value),
    callback => { const id = ++nextTimer; timers.set(id, callback); return id; },
    id => timers.delete(id));
  element.value = '20'; handlers.get('input')();
  element.value = '2020'; handlers.get('input')();
  assert.deepEqual(saved, []);
  assert.equal(timers.size, 1);
  [...timers.values()][0]();
  assert.deepEqual(saved, ['2020']);
  element.value = '2021'; handlers.get('input')();
  handlers.get('keydown')({ key: 'Enter', preventDefault() {} });
  assert.deepEqual(saved, ['2020', '2021']);
  element.value = '2022'; handlers.get('input')(); handlers.get('blur')();
  assert.deepEqual(saved, ['2020', '2021', '2022']);
  element.value = '2023'; handlers.get('input')(); flush();
  assert.deepEqual(saved, ['2020', '2021', '2022', '2023']);
});

test('summary card is not a bookcard and follows active filters even at zero matches', () => {
  const list = { children: [], ownerDocument: {
    createElement(tagName) { return { tagName: tagName.toUpperCase(), className: '', textContent: '',
      remove() { list.children = list.children.filter(child => child !== this); } }; },
  }, querySelector(selector) { return selector === '.zble-summary-card'
    ? this.children.find(child => child.className === 'zble-summary-card') || null : null; },
  append(child) { this.children = this.children.filter(item => item !== child); this.children.push(child); } };
  const stats = computeStats({ loaded: 20, matched: 0, total: 774 });
  renderFilterSummary(list, stats, true, ['年份规则待设置']);
  assert.equal(list.children.length, 1);
  assert.equal(list.children[0].tagName, 'DIV');
  assert.match(list.children[0].textContent, /当前已加载 20 本/);
  assert.match(list.children[0].textContent, /本工具筛选后 0 本/);
  assert.match(list.children[0].textContent, /书单共 774 本/);
  assert.match(list.children[0].textContent, /年份规则待设置/);
  renderFilterSummary(list, stats, true, []);
  assert.equal(list.children.length, 1);
  const appendedBook = { tagName: 'Z-BOOKCARD' };
  list.append(appendedBook);
  renderFilterSummary(list, computeStats({ loaded: 21, matched: 1, total: 774 }), true, []);
  assert.equal(list.children.at(-1).className, 'zble-summary-card');
  assert.equal(list.children.length, 2);
  renderFilterSummary(list, stats, false, []);
  assert.equal(list.children.length, 1);
});

test('summary card adopts the current bookcard flex width and minimum height', () => {
  const list = { children: [], ownerDocument: { createElement() { return { className: '', textContent: '', style: {} }; } },
    querySelector() { return this.children.find(child => child.className === 'zble-summary-card') || null; },
    append(child) { this.children = this.children.filter(item => item !== child); this.children.push(child); } };
  renderFilterSummary(list, computeStats({ loaded: 20, matched: 0, total: 774 }), true, [],
    { flex: '0 0 25%', height: 320 });
  assert.equal(list.children[0].style.flex, '0 0 25%');
  assert.equal(list.children[0].style.minHeight, '320px');
  assert.match(list.children[0].textContent, /当前已加载 20 本\n本工具筛选后 0 本\n书单共 774 本/);
});

test('Show more progress uses loaded count and preserves native content and handler', () => {
  const native = { textContent: 'Show more' };
  const onclick = () => 'native';
  function makeMore() { return {
    onclick, children: [native], ownerDocument: { createElement(tagName) {
      return { tagName: tagName.toUpperCase(), className: '', textContent: '' }; } },
    querySelector(selector) { return selector === '.zble-progress'
      ? this.children.find(child => child.className === 'zble-progress') || null
      : selector === '.content' ? native : null; },
    append(child) { this.children.push(child); },
  }; }
  const main = { more: makeMore(), querySelector(selector) { return selector === '.page-load-more' ? this.more : null; } };
  renderShowMore(main, computeStats({ loaded: 20, matched: 8, total: 774 }));
  assert.equal(main.more.children.length, 2);
  assert.match(main.more.children[1].textContent, /约展开 0 次，当前约第 1 页，尚未加载约 38 页，书单总长度约 39 页/);
  renderShowMore(main, computeStats({ loaded: 40, matched: 10, total: 774 }));
  assert.equal(main.more.children.length, 2);
  assert.match(main.more.children[1].textContent, /约展开 1 次，当前约第 2 页，尚未加载约 37 页/);
  native.textContent = 'Loading...';
  renderShowMore(main, computeStats({ loaded: 47, matched: 10, total: 774 }));
  assert.equal(native.textContent, 'Loading...');
  assert.equal(main.more.onclick, onclick);
  assert.match(main.more.children[1].textContent, /尚未加载约 37 页/);
  main.more = makeMore();
  renderShowMore(main, computeStats({ loaded: 0, matched: 0, total: 774 }));
  assert.equal(main.more.children.length, 2);
  assert.doesNotMatch(main.more.children[1].textContent, /第 0 页/);
  main.more = null;
  assert.doesNotThrow(() => renderShowMore(main, computeStats({ loaded: 0, matched: 0, total: null })));
  assert.match(formatProgressText(computeStats({ loaded: 47, matched: 5, total: 12 })), /尚未加载约 未知 页，书单总长度约 未知 页/);
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

test('v2 userscript metadata identifies the updated implementation as a development build', () => {
  const script = readFileSync(require.resolve('../booklist-enhancer.user.js'), 'utf8');
  assert.match(script, /^\/\/ @version\s+2\.0\.1-dev\s*$/m);
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
