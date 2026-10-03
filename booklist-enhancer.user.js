// ==UserScript==
// @name         Z-Library 书单增强
// @namespace    local.booklist-enhancer
// @version      2.0.1-dev
// @description  增强书单信息显示、筛选与当前加载进度
// @match        https://z-lib.sk/booklist/*
// @match        https://z-library.sk/booklist/*
// @match        https://1lib.sk/booklist/*
// @match        https://libb.la/booklist/*
// @match        https://z-library.im/booklist/*
// @match        https://z-lib.fm/booklist/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// ==/UserScript==

(() => {
  'use strict';

  const KNOWN_FORMATS = new Set(['pdf', 'epub', 'azw3', 'mobi']);
  const PAGE_SIZE = 20;
  const SETTING_FORMATS = new Set([...KNOWN_FORMATS, 'other', 'custom']);
  const DEFAULT_SETTINGS = Object.freeze({
    showFormat: true,
    filterFormat: false,
    filterDownload: false,
    formats: [],
    custom: '',
    downloadRule: 'not-downloaded',
    showLanguage: true,
    showYear: true,
    showFullTitle: false,
    filterYear: false,
    yearMin: '',
    yearMax: '',
    includeMissingYear: false,
    panelDock: null,
  });

  function normalizeExtension(raw) {
    const value = String(raw ?? '').trim().replace(/^\.+/, '').toLowerCase();
    return /^[a-z0-9]+$/.test(value) ? value : '';
  }

  function parseCustomFormats(raw) {
    return new Set(String(raw ?? '').split(/[,;，；]/)
      .map(normalizeExtension)
      .filter(Boolean));
  }

  function invalidCustomFormats(raw) {
    return String(raw ?? '').split(/[,;，；]/).map(value => value.trim())
      .filter(value => value && !normalizeExtension(value));
  }

  function matchesFormat(extension, selected, custom) {
    if (!selected || selected.size === 0) return true;
    const value = normalizeExtension(extension);
    if (selected.has(value)) return true;
    if (selected.has('other') && !KNOWN_FORMATS.has(value)) return true;
    return selected.has('custom') && custom.has(value);
  }

  function hasEffectiveFormatRule(selected, custom) {
    return [...selected].some(value => value !== 'custom') ||
      (selected.has('custom') && custom.size > 0);
  }

  function sanitizeSettings(saved) {
    const input = saved && typeof saved === 'object' ? saved : {};
    return {
      showFormat: typeof input.showFormat === 'boolean' ? input.showFormat : DEFAULT_SETTINGS.showFormat,
      filterFormat: typeof input.filterFormat === 'boolean' ? input.filterFormat : DEFAULT_SETTINGS.filterFormat,
      filterDownload: typeof input.filterDownload === 'boolean' ? input.filterDownload : DEFAULT_SETTINGS.filterDownload,
      formats: Array.isArray(input.formats)
        ? [...new Set(input.formats.filter(value => SETTING_FORMATS.has(value)))] : [],
      custom: typeof input.custom === 'string' ? input.custom.slice(0, 1000) : '',
      downloadRule: ['downloaded', 'not-downloaded'].includes(input.downloadRule)
        ? input.downloadRule : DEFAULT_SETTINGS.downloadRule,
      showLanguage: typeof input.showLanguage === 'boolean' ? input.showLanguage : DEFAULT_SETTINGS.showLanguage,
      showYear: typeof input.showYear === 'boolean' ? input.showYear : DEFAULT_SETTINGS.showYear,
      showFullTitle: typeof input.showFullTitle === 'boolean' ? input.showFullTitle : DEFAULT_SETTINGS.showFullTitle,
      filterYear: typeof input.filterYear === 'boolean' ? input.filterYear : DEFAULT_SETTINGS.filterYear,
      yearMin: typeof input.yearMin === 'string' ? input.yearMin.slice(0, 20) : '',
      yearMax: typeof input.yearMax === 'string' ? input.yearMax.slice(0, 20) : '',
      includeMissingYear: typeof input.includeMissingYear === 'boolean'
        ? input.includeMissingYear : DEFAULT_SETTINGS.includeMissingYear,
      panelDock: input.panelDock && ['top', 'right', 'bottom', 'left'].includes(input.panelDock.edge) &&
        Number.isFinite(input.panelDock.offset) && input.panelDock.offset >= 0
        ? { edge: input.panelDock.edge, offset: input.panelDock.offset } : null,
    };
  }

  function parseYearValue(raw) {
    const text = String(raw ?? '').trim();
    if (!/^\d+$/.test(text)) return null;
    const value = Number(text);
    return Number.isInteger(value) && value >= 1 && value <= 9999 ? value : null;
  }

  function parseYearRule(settings) {
    const minText = String(settings.yearMin ?? '').trim();
    const maxText = String(settings.yearMax ?? '').trim();
    if (!minText && !maxText) return { active: false, min: null, max: null, error: '' };
    const min = minText ? parseYearValue(minText) : null;
    const max = maxText ? parseYearValue(maxText) : null;
    if ((minText && min === null) || (maxText && max === null)) {
      return { active: false, min, max, error: '年份须为 1–9999 的整数' };
    }
    if (min !== null && max !== null && min > max) {
      return { active: false, min, max, error: '最小年份不能大于最大年份' };
    }
    return { active: true, min, max, error: '' };
  }

  function matchesYear(rawYear, rule, includeMissingYear) {
    if (!rule.active) return true;
    const year = parseYearValue(rawYear);
    if (year === null) return !!includeMissingYear;
    return (rule.min === null || year >= rule.min) && (rule.max === null || year <= rule.max);
  }

  function parseBookTotal(text) {
    const match = String(text ?? '').match(/\bbooks\s*\(\s*([\d,]+)\s*\)/i);
    if (!match) return null;
    const value = Number(match[1].replaceAll(',', ''));
    return Number.isSafeInteger(value) && value >= 0 ? value : null;
  }

  function computeStats({ loaded, matched, total }) {
    const count = Number.isSafeInteger(loaded) && loaded >= 0 ? loaded : 0;
    const visible = Number.isSafeInteger(matched) ? Math.min(count, Math.max(0, matched)) : 0;
    const validTotal = Number.isSafeInteger(total) && total >= count ? total : null;
    const current = Math.ceil(count / PAGE_SIZE);
    return {
      loaded: count,
      matched: visible,
      total: validTotal,
      pages: validTotal === null ? null : Math.ceil(validTotal / PAGE_SIZE),
      remaining: validTotal === null ? null : Math.ceil((validTotal - count) / PAGE_SIZE),
      current,
      approxExpansions: Math.max(0, current - 1),
    };
  }

  function classifyDownload({ ready, coverId, isbns, lookup }) {
    if (!ready || (!coverId && (!isbns || isbns.length === 0)) || typeof lookup !== 'function') {
      return 'unknown';
    }
    try {
      return lookup(coverId, ...(isbns || [])) ? 'downloaded' : 'not-downloaded';
    } catch {
      return 'unknown';
    }
  }

  function createDownloadGate() {
    let state = 'waiting';
    let ambiguous = false;
    return {
      get state() { return state; },
      get ambiguous() { return ambiguous; },
      onMarksLoaded(map) {
        const valid = map && typeof map === 'object' &&
          map.byId && typeof map.byId === 'object' && !Array.isArray(map.byId) &&
          map.byIsbn && typeof map.byIsbn === 'object' && !Array.isArray(map.byIsbn);
        const hasPositiveEvidence = valid &&
          (Object.keys(map.byId).length > 0 || Object.keys(map.byIsbn).length > 0);
        ambiguous = !hasPositiveEvidence;
        state = hasPositiveEvidence ? 'ready' : 'waiting';
      },
      onTimeout() { if (state === 'waiting') state = 'timed-out'; },
      onFailure() { state = 'failed'; ambiguous = false; },
    };
  }

  function getActiveCards(root) {
    return [...root.querySelectorAll('.booklist-main.active .readlist-view > z-bookcard')];
  }

  function hasBooklistFingerprint(root) {
    const main = root.querySelector('.booklist-main.active');
    if (!main?.querySelector('.readlist-view')) return false;
    if (getActiveCards(root).length > 0) return true;
    return parseBookTotal(root.querySelector('.booklist-header__tabs tab')?.textContent) === 0;
  }

  function readCardData(card) {
    const cover = card.shadowRoot?.querySelector('z-cover');
    return {
      extension: normalizeExtension(card.getAttribute('extension')),
      coverId: cover?.getAttribute('id') || '',
      isbns: (cover?.getAttribute('isbn') || '').split(',').map(value => value.trim()).filter(Boolean),
      year: card.getAttribute('year'),
      language: card.getAttribute('language'),
    };
  }

  function compileFilters(settings, downloadReady, lookup) {
    const selected = new Set(settings.formats);
    const custom = parseCustomFormats(settings.custom);
    const yearRule = parseYearRule(settings);
    return {
      selected,
      custom,
      formatActive: settings.filterFormat && hasEffectiveFormatRule(selected, custom),
      downloadActive: settings.filterDownload,
      downloadReady,
      downloadRule: settings.downloadRule,
      lookup,
      yearActive: settings.filterYear && yearRule.active,
      yearRule,
      includeMissingYear: settings.includeMissingYear,
    };
  }

  function evaluateCard(info, context) {
    const formatOk = !context.formatActive || matchesFormat(info.extension, context.selected, context.custom);
    const download = context.downloadActive ? classifyDownload({
      ready: context.downloadReady,
      coverId: info.coverId,
      isbns: info.isbns,
      lookup: context.lookup,
    }) : 'unknown';
    const downloadOk = !context.downloadActive || download === 'unknown' ||
      (context.downloadRule === 'downloaded' ? download === 'downloaded' : download === 'not-downloaded');
    const yearOk = !context.yearActive || matchesYear(info.year, context.yearRule, context.includeMissingYear);
    return { visible: formatOk && downloadOk && yearOk, download };
  }

  function filterActiveCards(root, context) {
    const cards = getActiveCards(root);
    const infos = [];
    const results = [];
    let matched = 0;
    for (const card of cards) {
      const info = readCardData(card);
      const result = evaluateCard(info, context);
      infos.push(info);
      results.push(result);
      if (result.visible) matched++;
    }
    return { cards, infos, results, matched };
  }

  function createRefreshScheduler(refresh, enqueue) {
    let queued = false;
    return () => {
      if (queued) return;
      queued = true;
      enqueue(() => {
        queued = false;
        refresh();
      });
    };
  }

  function formatRuleSummary(settings, gateState, yearRule) {
    const custom = parseCustomFormats(settings.custom);
    const selected = settings.formats.filter(value => value !== 'custom');
    const formatValues = [...selected, ...(settings.formats.includes('custom') ? [...custom] : [])];
    const format = formatValues.length ? `（${formatValues.join('、')}）` : '（请手动设置）';
    const downloadName = settings.downloadRule === 'downloaded' ? '仅已下载' : '仅未下载';
    const waitName = gateState === 'ready' ? '' : gateState === 'waiting' ? '；等待下载状态' : '；下载状态未确认';
    const download = `（${downloadName}${waitName}）`;
    let year = '（请手动设置）';
    if (yearRule.error) year = '（设置冲突）';
    else if (yearRule.active) {
      const range = yearRule.min !== null && yearRule.max !== null
        ? (yearRule.min === yearRule.max ? String(yearRule.min) : `${yearRule.min}–${yearRule.max}`)
        : (yearRule.min !== null ? `≥${yearRule.min}` : `≤${yearRule.max}`);
      year = `（${range}${settings.includeMissingYear ? '；含年份缺失' : ''}）`;
    }
    return { format, download, year };
  }

  function renderFilterSummary(list, stats, active, notices = [], cardMetrics = null) {
    if (!list) return;
    let summary = list.querySelector('.zble-summary-card');
    if (!active) { summary?.remove(); return; }
    if (!summary) {
      summary = list.ownerDocument.createElement('div');
      summary.className = 'zble-summary-card';
      summary.setAttribute?.('role', 'status');
      list.append(summary);
    }
    const total = stats.total === null ? '未知' : String(stats.total);
    const message = `当前已加载 ${stats.loaded} 本\n本工具筛选后 ${stats.matched} 本\n书单共 ${total} 本`;
    const next = notices.length ? `${message}\n${notices.join('；')}` : message;
    if (summary.textContent !== next) summary.textContent = next;
    if (cardMetrics && summary.style) {
      if (summary.style.flex !== cardMetrics.flex) summary.style.flex = cardMetrics.flex;
      const minHeight = `${cardMetrics.height}px`;
      if (summary.style.minHeight !== minHeight) summary.style.minHeight = minHeight;
    }
    if (list.children[list.children.length - 1] !== summary) list.append(summary);
  }

  function formatProgressText(stats) {
    const current = stats.loaded === 0 ? '尚无已加载书籍' : `当前约第 ${stats.current} 页`;
    const remaining = stats.remaining === null ? '未知' : stats.remaining;
    const pages = stats.pages === null ? '未知' : stats.pages;
    return `约展开 ${stats.approxExpansions} 次，${current}，尚未加载约 ${remaining} 页，书单总长度约 ${pages} 页`;
  }

  function renderShowMore(main, stats) {
    const more = main?.querySelector('.page-load-more');
    if (!more) return;
    let progress = more.querySelector('.zble-progress');
    if (!progress) {
      progress = more.ownerDocument.createElement('span');
      progress.className = 'zble-progress';
      more.append(progress);
    }
    const next = formatProgressText(stats);
    if (progress.textContent !== next) progress.textContent = next;
  }

  function bindDeferredTextInput(element, commit, delay = setTimeout, cancel = clearTimeout) {
    let timer = null;
    let pending = false;
    function flush() {
      if (!pending) return;
      if (timer !== null) cancel(timer);
      timer = null;
      pending = false;
      commit(element.value);
    }
    element.addEventListener('input', () => {
      pending = true;
      if (timer !== null) cancel(timer);
      timer = delay(flush, 250);
    });
    element.addEventListener('keydown', event => {
      if (event.key === 'Enter') { event.preventDefault(); flush(); }
    });
    element.addEventListener('blur', flush);
    return flush;
  }

  function clampPanelPosition(saved, viewport, panelSize) {
    const maxLeft = Math.max(0, viewport.width - panelSize.width - 8);
    const maxTop = Math.max(0, viewport.height - panelSize.height - 8);
    const clamp = (value, max) => Math.min(max, Math.max(0, value));
    if (saved.edge === 'left') return { left: clamp(8, maxLeft), top: clamp(saved.offset, maxTop) };
    if (saved.edge === 'right') return { left: maxLeft, top: clamp(saved.offset, maxTop) };
    if (saved.edge === 'bottom') return { left: clamp(saved.offset, maxLeft), top: maxTop };
    return { left: clamp(saved.offset, maxLeft), top: clamp(8, maxTop) };
  }

  function snapPanelPosition(rect, viewport) {
    const distances = [
      ['top', Math.abs(rect.top)],
      ['right', Math.abs(viewport.width - rect.left - rect.width)],
      ['bottom', Math.abs(viewport.height - rect.top - rect.height)],
      ['left', Math.abs(rect.left)],
    ];
    const edge = distances.reduce((best, item) => item[1] < best[1] ? item : best)[0];
    const offset = edge === 'left' || edge === 'right' ? rect.top : rect.left;
    const position = clampPanelPosition({ edge, offset }, viewport, rect);
    return { edge, offset: edge === 'left' || edge === 'right' ? position.top : position.left, ...position };
  }

  function resetPanelDock(host, settings, save) {
    settings.panelDock = null;
    save();
    for (const property of ['position', 'margin', 'right', 'left', 'top']) host.style.removeProperty(property);
    host.scrollTop = 0;
  }

  function canStartPanelDrag(event) {
    return !event.target.closest('button') && (event.pointerType !== 'mouse' || event.button === 0);
  }

  function renderFormatBadge(card, extension, show) {
    const root = card.shadowRoot;
    if (!root) return false;
    const targets = [...root.querySelectorAll('.meta .idle')];
    if (!targets.length) return false;
    let style = root.querySelector('#zble-format-style');
    if (!style) {
      style = card.ownerDocument.createElement('style');
      style.id = 'zble-format-style';
      style.textContent = '.zble-format{display:inline-block;margin-left:5px;padding:1px 5px;border-radius:4px;background:#245e9b;color:#fff;font-size:11px;font-weight:700;line-height:1.5;vertical-align:middle}:host(:not([data-zble-show-format])) .zble-format{display:none}';
      root.append(style);
    }
    const label = extension ? extension.toUpperCase() : '未知格式';
    for (const idle of targets) {
      let badge = idle.querySelector('.zble-format');
      if (!badge) {
        badge = card.ownerDocument.createElement('span');
        badge.className = 'zble-format';
        idle.append(badge);
      }
      if (badge.textContent !== label) badge.textContent = label;
    }
    if (card.hasAttribute('data-zble-show-format') !== !!show) {
      card.toggleAttribute('data-zble-show-format', !!show);
    }
    return true;
  }

  const originalMeta = new WeakMap();

  function renderCardMeta(card, { showLanguage, showYear }) {
    const root = card.shadowRoot;
    if (!root) return false;
    const idles = ['.meta.desktop .idle', '.meta.mobile .idle']
      .map(selector => root.querySelector(selector)).filter(Boolean);
    if (!idles.length) return false;
    const year = parseYearValue(card.getAttribute('year'));
    const updates = [];
    for (const idle of idles) {
      const node = [...idle.childNodes].find(child => child.nodeType === 3 && child.nodeValue.trim());
      if (!node) {
        const previous = originalMeta.get(idle);
        if (previous?.node && [...idle.childNodes].includes(previous.node)) {
          updates.push(previous);
          continue;
        }
        return false;
      }
      let saved = originalMeta.get(idle);
      if (!saved || saved.node !== node || node.nodeValue !== saved.lastRendered) {
        const original = node.nodeValue;
        const trimmed = original.trim();
        let languageText = trimmed;
        let yearText = '';
        if (year !== null) {
          const suffix = `, ${year}`;
          if (trimmed === String(year)) {
            languageText = '';
            yearText = String(year);
          } else if (trimmed.endsWith(suffix)) {
            languageText = trimmed.slice(0, -suffix.length);
            yearText = String(year);
          } else return false;
        }
        saved = { node, original, languageText, yearText, lastRendered: original };
        originalMeta.set(idle, saved);
      }
      updates.push(saved);
    }
    for (const saved of updates) {
      const next = showLanguage && showYear ? saved.original
        : [showLanguage ? saved.languageText : '', showYear ? saved.yearText : ''].filter(Boolean).join(', ');
      if (saved.node.nodeValue !== next) saved.node.nodeValue = next;
      saved.lastRendered = next;
    }
    return true;
  }

  function renderFullTitle(card, enabled) {
    const root = card.shadowRoot;
    if (!root?.querySelector('.book-info .title')) return false;
    let style = root.querySelector('#zble-title-style');
    if (!style) {
      style = card.ownerDocument.createElement('style');
      style.id = 'zble-title-style';
      style.textContent = ':host([data-zble-full-title]) .book-info{height:auto!important;min-height:88px;overflow:visible!important}:host([data-zble-full-title]) .book-info .title{max-height:none!important;overflow:visible!important;-webkit-line-clamp:unset!important;display:block!important}';
      root.append(style);
    }
    card.toggleAttribute('data-zble-full-title', !!enabled);
    return true;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      normalizeExtension, parseCustomFormats, invalidCustomFormats, matchesFormat, hasEffectiveFormatRule,
      sanitizeSettings, parseBookTotal, computeStats, classifyDownload, createDownloadGate,
      getActiveCards, hasBooklistFingerprint, readCardData, compileFilters, evaluateCard, filterActiveCards,
      createRefreshScheduler, renderFormatBadge, renderCardMeta, renderFullTitle,
      formatRuleSummary, bindDeferredTextInput,
      renderFilterSummary, renderShowMore, formatProgressText,
      snapPanelPosition, clampPanelPosition, resetPanelDock, canStartPanelDrag,
      parseYearRule, matchesYear,
    };
  }

  if (typeof document !== 'undefined') {
    let preflightObserver = null;
    let preflightTimeout = null;
    let started = false;

    function tryStart() {
      if (started || !hasBooklistFingerprint(document)) return;
      started = true;
      preflightObserver?.disconnect();
      clearTimeout(preflightTimeout);
      activate();
    }

    function preflight() {
      tryStart();
      if (started || !document.documentElement) return;
      preflightObserver = new MutationObserver(tryStart);
      preflightObserver.observe(document.documentElement, { childList: true, subtree: true });
      preflightTimeout = setTimeout(() => preflightObserver.disconnect(), 30000);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', preflight, { once: true });
    else preflight();
    window.addEventListener('pagehide', () => {
      preflightObserver?.disconnect();
      clearTimeout(preflightTimeout);
    }, { once: true });

    function activate() {
    const STORAGE_KEY = 'zble-settings-v2';
    let stored;
    try { stored = GM_getValue(STORAGE_KEY, {}); } catch { stored = {}; }
    const settings = sanitizeSettings(stored);
    const gate = createDownloadGate();
    let panelRoot = null;
    let timeoutId = null;
    let retryId = null;
    let shadowRetries = 0;
    let observedMain = null;
    let mainObserver = null;
    let parentObserver = null;
    let startupObserver = null;
    let classObservers = [];
    let lastCardMetrics = null;

    function saveSettings() {
      try { GM_setValue(STORAGE_KEY, { ...settings, formats: [...settings.formats] }); } catch { /* Session still works. */ }
    }

    function siteLibrary() {
      return (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window).ZLibrary;
    }

    const scheduleRefresh = createRefreshScheduler(refresh, requestAnimationFrame);

    function startDownloadTimer() {
      if (timeoutId || gate.state !== 'waiting') return;
      timeoutId = setTimeout(() => {
        timeoutId = null;
        gate.onTimeout();
        scheduleRefresh();
      }, 30000);
    }

    function onMarksLoaded() {
      const library = siteLibrary();
      gate.onMarksLoaded(library?._?.downloaded);
      if (gate.state === 'ready' && typeof library?.checkIsDownloaded !== 'function') {
        gate.onFailure();
      }
      if (gate.state === 'ready') {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      scheduleRefresh();
    }

    // The event is registered before DOMContentLoaded, but an already-populated
    // positive map is also usable if the userscript manager starts late.
    document.addEventListener('marksLoaded', onMarksLoaded);

    function setText(selector, value) {
      const element = panelRoot?.querySelector(selector);
      if (element && element.textContent !== value) element.textContent = value;
    }

    function syncDownloadControl() {
      const input = panelRoot?.querySelector('#zble-download-switch');
      if (!input) return;
      input.checked = settings.filterDownload;
      input.disabled = gate.state !== 'ready';
      panelRoot.querySelector('#zble-wait-icon').hidden = gate.state !== 'waiting';
      panelRoot.querySelector('#zble-warn-icon').hidden = !['timed-out', 'failed'].includes(gate.state);
    }

    function renderPanelState(context, unknownCards, unavailable) {
      const summaries = formatRuleSummary(settings, gate.state, context.yearRule);
      for (const name of ['format', 'download', 'year']) {
        setText(`#zble-${name}-summary`, summaries[name]);
      }
      setText('#zble-format-hint', settings.filterFormat && !context.formatActive
        ? '请选择筛选格式；当前不隐藏条目'
        : invalidCustomFormats(settings.custom).length ? '部分自定义格式无效，已忽略' : '');
      setText('#zble-year-hint', settings.filterYear
        ? (context.yearRule.error || (!context.yearRule.active ? '请设置最小或最大年份；当前不按年份隐藏条目' : '')) : '');
      const downloadMessage = gate.state === 'waiting'
        ? (gate.ambiguous ? '站点空记录与请求失败无法区分；下载筛选暂停' : '等待下载状态加载中；下载筛选暂停')
        : gate.state === 'timed-out' ? '下载状态 30 秒内未确认；请刷新页面或检查是否已登录'
          : gate.state === 'failed' ? '下载状态不可判定；请刷新页面或检查是否已登录'
            : unknownCards ? '部分条目的下载状态未知，已保留显示' : '';
      setText('#zble-download-hint', downloadMessage);
      setText('#zble-info-hint', unavailable.format || unavailable.meta || unavailable.title
        ? '部分卡片信息位置未找到；页面结构可能已变' : '');
      syncDownloadControl();
    }

    function refresh() {
      if (!panelRoot) return;
      attachObservers();
      const main = document.querySelector('.booklist-main.active');
      const library = siteLibrary();
      const lookup = typeof library?.checkIsDownloaded === 'function'
        ? library.checkIsDownloaded.bind(library) : null;
      const context = compileFilters(settings, gate.state === 'ready', lookup);
      const pass = filterActiveCards(document, context);
      const { cards } = pass;
      const totalText = document.querySelector('.booklist-header__tabs tab')?.textContent || '';
      const parsedTotal = parseBookTotal(totalText);
      const pageReady = !!main && (cards.length > 0 || parsedTotal === 0);
      if (pageReady) startDownloadTimer();
      const list = main?.querySelector('.readlist-view');
      const previousSummary = list?.querySelector('.zble-summary-card');
      if (previousSummary) previousSummary.style.minHeight = '0px';
      let unknownCards = 0;
      const unavailable = { format: 0, meta: 0, title: 0 };
      let lastVisibleCard = null;
      let fallbackMetrics = null;
      for (let index = 0; index < cards.length; index++) {
        const card = cards[index];
        const info = pass.infos[index];
        if (!renderFormatBadge(card, info.extension, settings.showFormat)) unavailable.format++;
        if (!renderCardMeta(card, settings)) unavailable.meta++;
        if (!renderFullTitle(card, settings.showFullTitle)) unavailable.title++;
        const result = pass.results[index];
        if (result.visible) lastVisibleCard = card;
        if (!fallbackMetrics && !card.classList.contains('zble-hidden')) {
          const rect = card.getBoundingClientRect();
          if (rect.width && rect.height) fallbackMetrics = { flex: getComputedStyle(card).flex, height: rect.height };
        }
        if (settings.filterDownload && gate.state === 'ready' && result.download === 'unknown') unknownCards++;
        if (card.classList.contains('zble-hidden') === result.visible) {
          card.classList.toggle('zble-hidden', !result.visible);
        }
      }
      const stats = computeStats({ loaded: cards.length, matched: pass.matched, total: parsedTotal });
      const activeFilter = settings.filterFormat || settings.filterDownload || settings.filterYear;
      const notices = [];
      if (settings.filterFormat && !context.formatActive) notices.push('文件格式规则待设置');
      if (settings.filterDownload && gate.state !== 'ready') notices.push('下载状态筛选暂停');
      if (settings.filterYear && !context.yearActive) notices.push(context.yearRule.error || '年份规则待设置');
      if (lastVisibleCard) {
        const rect = lastVisibleCard.getBoundingClientRect();
        if (rect.width && rect.height) lastCardMetrics = { flex: getComputedStyle(lastVisibleCard).flex, height: rect.height };
      } else if (fallbackMetrics) lastCardMetrics = fallbackMetrics;
      renderFilterSummary(list, stats, activeFilter, notices, lastCardMetrics);
      renderShowMore(main, stats);
      const pendingShadow = unavailable.format + unavailable.meta + unavailable.title;
      renderPanelState(context, unknownCards, shadowRetries >= 20 ? unavailable : { format: 0, meta: 0, title: 0 });
      if (pendingShadow && shadowRetries < 20 && !retryId) {
        shadowRetries++;
        retryId = setTimeout(() => { retryId = null; scheduleRefresh(); }, 250);
      } else if (!pendingShadow) shadowRetries = 0;
    }

    function attachObservers() {
      const main = document.querySelector('.booklist-main.active');
      if (main === observedMain) return;
      mainObserver?.disconnect();
      parentObserver?.disconnect();
      for (const observer of classObservers) observer.disconnect();
      classObservers = [];
      observedMain = main;
      lastCardMetrics = null;
      if (!main) return;
      startupObserver?.disconnect();
      startupObserver = null;
      mainObserver = new MutationObserver(scheduleRefresh);
      mainObserver.observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ['extension', 'year', 'language'] });
      if (main.parentElement) {
        parentObserver = new MutationObserver(scheduleRefresh);
        parentObserver.observe(main.parentElement, { childList: true });
        for (const sibling of main.parentElement.querySelectorAll('.booklist-main')) {
          const observer = new MutationObserver(scheduleRefresh);
          observer.observe(sibling, { attributes: true, attributeFilter: ['class'] });
          classObservers.push(observer);
        }
      }
    }

    function createPanel() {
      if (document.getElementById('zble-panel-host')) return;
      const pageStyle = document.createElement('style');
      pageStyle.id = 'zble-page-style';
      pageStyle.textContent = '.booklist-main.active .readlist-view > z-bookcard.zble-hidden{display:none!important}.booklist-main.active .readlist-view > .zble-summary-card{display:flex;align-items:center;box-sizing:border-box;flex:0 0 23%;min-height:320px;max-width:100%;padding:24px;border:0;border-radius:8px;background:var(--card-bg-color,#fff);box-shadow:var(--box-shadow,0 2px 6px #0001);color:var(--gray-9,#243747);font:16px/1.6 system-ui,sans-serif;white-space:pre-line;overflow-wrap:anywhere}.booklist-main.active .page-load-more .zble-progress{display:block;font-size:12px;line-height:1.4;opacity:.82;white-space:normal}@media(prefers-color-scheme:dark){.booklist-main.active .readlist-view > .zble-summary-card{background:#222e3c;color:#edf3f8;box-shadow:0 2px 10px #0006}}';
      (document.head || document.documentElement).append(pageStyle);

      const host = document.createElement('div');
      host.id = 'zble-panel-host';
      const main = document.querySelector('.booklist-main.active');
      if (main?.parentElement) main.parentElement.insertBefore(host, main);
      else document.body.append(host);
      panelRoot = host.attachShadow({ mode: 'open' });
      panelRoot.innerHTML = `
        <style>
          :host{all:initial;--zble-bg:#fff;--zble-text:#172534;--zble-border:#9baebf;--zble-accent-bg:#dcecff;--zble-accent:#075da5;--zble-line:#e0e7ee;--zble-group:#36546c;--zble-muted:#526777;--zble-spinner:#aebdca;--zble-settings-bg:#f0f6fb;--zble-settings-border:#b5cede;--zble-settings-title:#174f78;--zble-field-border:#90aaba;--zble-field-bg:#fff;--zble-hint:#4c5d6c;--zble-error:#9d311f;position:fixed;z-index:2147483000;right:10px;top:10px;width:min(315px,calc(100vw - 20px));max-height:calc(100vh - 20px);overflow:auto;box-sizing:border-box;border:1px solid var(--zble-border);border-radius:10px;background:var(--zble-bg);color:var(--zble-text);color-scheme:light;box-shadow:0 5px 20px #0003;font:13px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif}
          @media(prefers-color-scheme:dark){:host{--zble-bg:#1b2430;--zble-text:#eef3f8;--zble-border:#586e80;--zble-accent-bg:#25445d;--zble-accent:#9bd3ff;--zble-line:#3e5262;--zble-group:#c2def0;--zble-muted:#bbcbd7;--zble-spinner:#7f96a8;--zble-settings-bg:#253545;--zble-settings-border:#577083;--zble-settings-title:#b7ddff;--zble-field-border:#7595aa;--zble-field-bg:#172330;--zble-hint:#cfdae2;--zble-error:#ffb0a3;color-scheme:dark;box-shadow:0 5px 20px #0008}}
          @media(max-width:600px){:host{display:block;position:relative;right:auto;top:auto;width:calc(100% - 20px);max-height:70vh;margin:10px auto 14px}}
          *{box-sizing:border-box}[hidden]{display:none!important}.body{padding:10px 12px}.head{display:flex;align-items:center;justify-content:space-between;touch-action:none;cursor:grab;user-select:none}.title{font-weight:700;font-size:14px}.head-actions{display:flex;align-items:center;gap:2px}
          button{background:transparent;border:0;border-radius:6px;color:inherit;cursor:pointer;font-size:20px;padding:2px 6px}button[aria-expanded="true"]{background:var(--zble-accent-bg);color:var(--zble-accent)}button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid var(--zble-accent);outline-offset:2px}.chevron{display:block;width:18px;height:18px;transition:transform .15s ease}#zble-collapse[aria-expanded="false"] .chevron{transform:rotate(180deg)}@media(prefers-reduced-motion:reduce){.chevron{transition:none}}
          .group{border-top:1px solid var(--zble-line);padding-top:7px;margin-top:7px}.group-title{font-weight:700;color:var(--zble-group);font-size:12px;letter-spacing:.02em}.row{display:flex;align-items:flex-start;gap:7px;margin:6px 0;cursor:pointer}.row input{margin-top:3px;flex:none}.row:has(input:disabled){opacity:.62;cursor:not-allowed}input[type=checkbox]{accent-color:var(--zble-accent)}.summary{color:var(--zble-muted);font-size:11px;margin-left:2px;overflow-wrap:anywhere}
          .spin{display:inline-block;width:13px;height:13px;border:2px solid var(--zble-spinner);border-top-color:var(--zble-accent);border-radius:50%;animation:rotate .8s linear infinite;flex:none;margin-top:3px}@keyframes rotate{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){.spin{animation:none;border:0;width:auto;height:auto}.spin:after{content:'⏳'}}
          .settings{background:var(--zble-settings-bg);border:1px solid var(--zble-settings-border);border-radius:8px;margin-top:10px;padding:10px}.settings-title{font-weight:700;color:var(--zble-settings-title);margin-bottom:8px}.setting-label{display:block;font-weight:600;margin-top:10px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin:6px 0}.grid label{white-space:nowrap}
          input[type=text],select{width:100%;padding:5px;border:1px solid var(--zble-field-border);border-radius:5px;font:inherit;color:inherit;background:var(--zble-field-bg)}.year-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.hint{font-size:11px;color:var(--zble-hint);margin:4px 0 7px;overflow-wrap:anywhere}.hint:empty{display:none}.hint a{color:var(--zble-accent)}.error{color:var(--zble-error)}.reset-position{font-size:12px;border:1px solid var(--zble-field-border);background:var(--zble-field-bg);margin:6px 0;padding:4px 8px}
        </style>
        <div class="body">
          <div class="head"><span class="title">书单增强</span><div class="head-actions"><button id="zble-gear" type="button" title="设置" aria-label="设置" aria-controls="zble-settings" aria-expanded="false">⚙</button><button id="zble-collapse" type="button" title="折叠面板" aria-label="折叠面板" aria-controls="zble-content" aria-expanded="true"><svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 14 L12 9 L20 14"/></svg></button></div></div>
          <div id="zble-content">
          <div class="group"><div class="group-title">信息显示</div>
            <label class="row"><input id="zble-show-switch" type="checkbox"><span>固定显示文件格式标签</span></label>
            <label class="row"><input id="zble-language-switch" type="checkbox"><span>语言</span></label>
            <label class="row"><input id="zble-year-show-switch" type="checkbox"><span>年份</span></label>
            <label class="row"><input id="zble-title-switch" type="checkbox"><span>完整显示超长书名</span></label>
            <div id="zble-info-hint" class="hint error" role="status"></div>
          </div>
          <div class="group"><div class="group-title">筛选器</div>
            <label class="row"><input id="zble-format-switch" type="checkbox"><span>只显示指定文件格式 <span id="zble-format-summary" class="summary"></span></span></label>
            <div id="zble-format-hint" class="hint error" role="status"></div>
            <label class="row"><input id="zble-download-switch" type="checkbox"><span>只显示指定下载状态 <span id="zble-download-summary" class="summary"></span></span><span id="zble-wait-icon" class="spin" aria-label="等待下载状态"></span><span id="zble-warn-icon" hidden aria-label="下载状态未确认">⚠️</span></label>
            <div id="zble-download-hint" class="hint error" role="status"></div>
            <label class="row"><input id="zble-year-filter-switch" type="checkbox"><span>只显示指定年份的书籍 <span id="zble-year-summary" class="summary"></span></span></label>
            <div id="zble-year-hint" class="hint error" role="status"></div>
          </div>
          <div id="zble-settings" class="settings" hidden>
            <div class="settings-title">筛选规则设置</div>
            <div class="setting-label">筛选文件格式（可多选）</div>
            <div class="grid">
              <label><input type="checkbox" data-format="pdf"> PDF</label>
              <label><input type="checkbox" data-format="epub"> EPUB</label>
              <label><input type="checkbox" data-format="azw3"> AZW3</label>
              <label><input type="checkbox" data-format="mobi"> MOBI</label>
              <label><input type="checkbox" data-format="other"> 其他全部</label>
              <label><input type="checkbox" data-format="custom"> 自定义</label>
            </div>
            <input id="zble-custom" type="text" aria-label="自定义文件格式" placeholder="如 djvu, txt; fb2">
            <div class="hint">自定义格式用逗号或分号分隔；停顿后自动生效，也可按回车。其他全部包含未知格式。</div>
            <label class="setting-label" for="zble-download-rule">下载状态规则</label>
            <select id="zble-download-rule"><option value="not-downloaded">仅未下载</option><option value="downloaded">仅已下载</option></select>
            <div class="setting-label">出版年份范围（含端点）</div>
            <div class="year-grid"><label>最小年份<input id="zble-year-min" type="text" inputmode="numeric" aria-label="最小年份" placeholder="留空不限"></label><label>最大年份<input id="zble-year-max" type="text" inputmode="numeric" aria-label="最大年份" placeholder="留空不限"></label></div>
            <div class="hint">输入后停顿约 250 毫秒自动生效，也可按回车；允许只填写一端。</div>
            <label class="row"><input id="zble-missing-year" type="checkbox"><span>显示年份缺失的书籍</span></label>
            <button id="zble-reset-position" class="reset-position" type="button">重置浮窗位置</button>
            <div class="hint">其他镜像：在 Tampermonkey 的本脚本设置中手动添加 User matches，例如 <code>https://your-mirror.example/booklist/*</code>（替换为实际域名）。脚本无法自行修改匹配规则。<a href="https://www.tampermonkey.net/faq.php?q=Q103" target="_blank" rel="noopener noreferrer">操作说明</a></div>
          </div>
          </div>
        </div>`;

      const immediate = [
        ['#zble-show-switch', 'showFormat'], ['#zble-language-switch', 'showLanguage'],
        ['#zble-year-show-switch', 'showYear'], ['#zble-title-switch', 'showFullTitle'],
        ['#zble-format-switch', 'filterFormat'], ['#zble-download-switch', 'filterDownload'],
        ['#zble-year-filter-switch', 'filterYear'], ['#zble-missing-year', 'includeMissingYear'],
      ];
      for (const [selector, key] of immediate) {
        const input = panelRoot.querySelector(selector);
        input.checked = settings[key];
        input.addEventListener('change', () => { settings[key] = input.checked; saveSettings(); scheduleRefresh(); });
      }
      for (const input of panelRoot.querySelectorAll('[data-format]')) {
        input.checked = settings.formats.includes(input.dataset.format);
        input.addEventListener('change', () => {
          settings.formats = [...panelRoot.querySelectorAll('[data-format]:checked')].map(item => item.dataset.format);
          saveSettings(); scheduleRefresh();
        });
      }
      const downloadRule = panelRoot.querySelector('#zble-download-rule');
      downloadRule.value = settings.downloadRule;
      downloadRule.addEventListener('change', () => {
        settings.downloadRule = downloadRule.value;
        saveSettings(); scheduleRefresh();
      });
      const flushInputs = [];
      for (const [selector, key, limit] of [
        ['#zble-custom', 'custom', 1000], ['#zble-year-min', 'yearMin', 20], ['#zble-year-max', 'yearMax', 20],
      ]) {
        const input = panelRoot.querySelector(selector);
        input.value = settings[key];
        flushInputs.push(bindDeferredTextInput(input, value => {
          settings[key] = value.slice(0, limit);
          saveSettings(); scheduleRefresh();
        }));
      }
      const gear = panelRoot.querySelector('#zble-gear');
      const settingsPanel = panelRoot.querySelector('#zble-settings');
      const content = panelRoot.querySelector('#zble-content');
      const collapse = panelRoot.querySelector('#zble-collapse');
      const head = panelRoot.querySelector('.head');
      function viewport() { return { width: window.innerWidth, height: window.innerHeight }; }
      function place(left, top) {
        host.style.position = 'fixed';
        host.style.margin = '0';
        host.style.right = 'auto';
        host.style.left = `${left}px`;
        host.style.top = `${top}px`;
      }
      function applySavedDock() {
        if (!settings.panelDock) return;
        const rect = host.getBoundingClientRect();
        const position = clampPanelPosition(settings.panelDock, viewport(), rect);
        place(position.left, position.top);
      }
      function setCollapsed(collapsed) {
        content.hidden = collapsed;
        collapse.setAttribute('aria-label', collapsed ? '展开面板' : '折叠面板');
        collapse.setAttribute('title', collapsed ? '展开面板' : '折叠面板');
        collapse.setAttribute('aria-expanded', String(!collapsed));
        requestAnimationFrame(applySavedDock);
      }
      collapse.addEventListener('click', () => setCollapsed(!content.hidden));
      gear.addEventListener('click', () => {
        if (content.hidden) setCollapsed(false);
        const opening = gear.getAttribute('aria-expanded') !== 'true';
        if (!opening) for (const flush of flushInputs) flush();
        gear.setAttribute('aria-expanded', String(opening));
        settingsPanel.hidden = !opening;
        requestAnimationFrame(applySavedDock);
      });
      panelRoot.querySelector('#zble-reset-position').addEventListener('click', () => {
        resetPanelDock(host, settings, saveSettings);
      });
      let drag = null;
      head.addEventListener('pointerdown', event => {
        if (!canStartPanelDrag(event)) return;
        const rect = host.getBoundingClientRect();
        drag = { x: event.clientX, y: event.clientY, left: rect.left, top: rect.top,
          width: rect.width, height: rect.height, moved: false };
        head.setPointerCapture?.(event.pointerId);
      });
      head.addEventListener('pointermove', event => {
        if (!drag) return;
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        if (!drag.moved && Math.hypot(dx, dy) < 5) return;
        drag.moved = true;
        event.preventDefault();
        const size = viewport();
        place(Math.min(Math.max(0, drag.left + dx), Math.max(0, size.width - drag.width)),
          Math.min(Math.max(0, drag.top + dy), Math.max(0, size.height - drag.height)));
      });
      function finishDrag(event) {
        if (!drag) return;
        if (drag.moved) {
          const rect = host.getBoundingClientRect();
          const dock = snapPanelPosition(rect, viewport());
          settings.panelDock = { edge: dock.edge, offset: dock.offset };
          saveSettings();
          place(dock.left, dock.top);
        }
        drag = null;
        if (head.hasPointerCapture?.(event.pointerId)) head.releasePointerCapture(event.pointerId);
      }
      head.addEventListener('pointerup', finishDrag);
      head.addEventListener('pointercancel', finishDrag);
      window.addEventListener('resize', applySavedDock);
      requestAnimationFrame(applySavedDock);
      scheduleRefresh();
    }

    function init() {
      if (!document.body) return;
      createPanel();
      startupObserver = new MutationObserver(scheduleRefresh);
      startupObserver.observe(document.documentElement, { childList: true, subtree: true });
      attachObservers();
      scheduleRefresh();
      const library = siteLibrary();
      if (library?._?.downloaded &&
          (Object.keys(library._.downloaded.byId || {}).length || Object.keys(library._.downloaded.byIsbn || {}).length)) {
        onMarksLoaded();
      }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();

    window.addEventListener('pagehide', () => {
      document.removeEventListener('marksLoaded', onMarksLoaded);
      clearTimeout(timeoutId);
      clearTimeout(retryId);
      startupObserver?.disconnect();
      mainObserver?.disconnect();
      parentObserver?.disconnect();
      for (const observer of classObservers) observer.disconnect();
    }, { once: true });
    }
  }
})();
