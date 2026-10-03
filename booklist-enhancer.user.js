// ==UserScript==
// @name         Z-Library 书单增强
// @namespace    local.booklist-enhancer
// @version      1.0.2-dev
// @description  常显文件格式并筛选当前已加载的书单条目
// @match        https://z-lib.sk/booklist/*
// @match        https://z-library.sk/booklist/*
// @match        https://1lib.sk/booklist/*
// @match        https://libb.la/booklist/*
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
    };
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
    };
  }

  function evaluateCard(info, settings, downloadReady, lookup) {
    const selected = new Set(settings.formats);
    const custom = parseCustomFormats(settings.custom);
    const formatOk = !settings.filterFormat || !hasEffectiveFormatRule(selected, custom) ||
      matchesFormat(info.extension, selected, custom);
    const download = classifyDownload({
      ready: downloadReady,
      coverId: info.coverId,
      isbns: info.isbns,
      lookup,
    });
    const downloadOk = !settings.filterDownload || download === 'unknown' ||
      (settings.downloadRule === 'downloaded' ? download === 'downloaded' : download === 'not-downloaded');
    return { visible: formatOk && downloadOk, download };
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

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      normalizeExtension, parseCustomFormats, invalidCustomFormats, matchesFormat, hasEffectiveFormatRule,
      sanitizeSettings, parseBookTotal, computeStats, classifyDownload, createDownloadGate,
      getActiveCards, hasBooklistFingerprint, readCardData, evaluateCard, renderFormatBadge,
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
    let refreshQueued = false;
    let timeoutId = null;
    let retryId = null;
    let shadowRetries = 0;
    let observedMain = null;
    let mainObserver = null;
    let parentObserver = null;
    let startupObserver = null;
    let classObservers = [];

    function saveSettings() {
      try { GM_setValue(STORAGE_KEY, { ...settings, formats: [...settings.formats] }); } catch { /* Session still works. */ }
    }

    function siteLibrary() {
      return (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window).ZLibrary;
    }

    function scheduleRefresh() {
      if (refreshQueued) return;
      refreshQueued = true;
      requestAnimationFrame(() => {
        refreshQueued = false;
        refresh();
      });
    }

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

    function renderStats(stats) {
      setText('#zble-loaded', `当前已加载 ${stats.loaded} 本；本工具筛选后 ${stats.matched} 本`);
      setText('#zble-total', stats.total === null
        ? '书单总数与剩余页数未知'
        : `书单共 ${stats.total} 本，约 ${stats.pages} 页；尚未加载约 ${stats.remaining} 页`);
      setText('#zble-progress', `当前约第 ${stats.current} 页（约展开 ${stats.approxExpansions} 次）`);
    }

    function statusLines({ pageReady, stats, unknownCards, badgeUnavailable }) {
      if (!pageReady) return ['等待页面加载'];
      const lines = [];
      if (badgeUnavailable) lines.push('格式标签位置未找到；页面结构可能已变');
      if (gate.state === 'failed') lines.push('下载状态不可判定；请刷新页面或检查是否已登录');
      else if (gate.state === 'timed-out') lines.push('下载状态 30 秒内未确认；请刷新页面或检查是否已登录');
      else if (gate.state === 'waiting') lines.push('等待下载状态加载中');
      else lines.push('正常启用中');
      if (gate.ambiguous) lines.push('站点空记录与请求失败无法区分');
      if (settings.filterDownload && gate.state !== 'ready') lines.push('按下载状态筛选已暂停');
      if (unknownCards) lines.push('部分条目的下载状态未知，已保留显示');
      if (settings.filterFormat && !hasEffectiveFormatRule(new Set(settings.formats), parseCustomFormats(settings.custom))) {
        lines.push('请选择筛选格式；当前未隐藏条目');
      }
      if (settings.filterFormat && settings.formats.includes('custom') && invalidCustomFormats(settings.custom).length) {
        lines.push('部分自定义格式无效，已忽略');
      }
      if (stats.total === null) lines.push('书单总数或剩余页数无法确认');
      if (stats.loaded > 0 && stats.matched === 0) lines.push('当前已加载条目无匹配；可继续 Show more');
      return lines;
    }

    function syncDownloadControl() {
      const input = panelRoot?.querySelector('#zble-download-switch');
      if (!input) return;
      input.checked = settings.filterDownload;
      input.disabled = gate.state !== 'ready';
      panelRoot.querySelector('#zble-wait-icon').hidden = gate.state !== 'waiting';
      panelRoot.querySelector('#zble-warn-icon').hidden = !['timed-out', 'failed'].includes(gate.state);
    }

    function refresh() {
      if (!panelRoot) return;
      attachObservers();
      const main = document.querySelector('.booklist-main.active');
      const cards = getActiveCards(document);
      const totalText = document.querySelector('.booklist-header__tabs tab')?.textContent || '';
      const parsedTotal = parseBookTotal(totalText);
      const pageReady = !!main && (cards.length > 0 || parsedTotal === 0);
      if (pageReady) startDownloadTimer();
      const library = siteLibrary();
      const lookup = typeof library?.checkIsDownloaded === 'function'
        ? library.checkIsDownloaded.bind(library) : null;
      let matched = 0;
      let unknownCards = 0;
      let pendingShadow = 0;
      for (const card of cards) {
        const info = readCardData(card);
        if (!renderFormatBadge(card, info.extension, settings.showFormat)) pendingShadow++;
        const result = evaluateCard(info, settings, gate.state === 'ready', lookup);
        if (result.visible) matched++;
        if (settings.filterDownload && gate.state === 'ready' && result.download === 'unknown') unknownCards++;
        if (card.classList.contains('zble-hidden') === result.visible) {
          card.classList.toggle('zble-hidden', !result.visible);
        }
      }
      const stats = computeStats({ loaded: cards.length, matched, total: parsedTotal });
      renderStats(stats);
      syncDownloadControl();
      const badgeUnavailable = pendingShadow > 0 && shadowRetries >= 20;
      const lines = statusLines({ pageReady, stats, unknownCards, badgeUnavailable });
      setText('#zble-status', lines.join(' · '));
      panelRoot.querySelector('#zble-status').dataset.level =
        ['timed-out', 'failed'].includes(gate.state) || unknownCards || badgeUnavailable ? 'error' : 'normal';
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
      if (!main) return;
      startupObserver?.disconnect();
      startupObserver = null;
      mainObserver = new MutationObserver(scheduleRefresh);
      mainObserver.observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ['extension'] });
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
      pageStyle.textContent = '.booklist-main.active .readlist-view > z-bookcard.zble-hidden{display:none!important}';
      (document.head || document.documentElement).append(pageStyle);

      const host = document.createElement('div');
      host.id = 'zble-panel-host';
      const main = document.querySelector('.booklist-main.active');
      if (main?.parentElement) main.parentElement.insertBefore(host, main);
      else document.body.append(host);
      panelRoot = host.attachShadow({ mode: 'open' });
      panelRoot.innerHTML = `
        <style>
          :host{all:initial;position:fixed;z-index:2147483000;right:10px;top:10px;width:min(285px,calc(100vw - 20px));max-height:calc(100vh - 20px);overflow:auto;box-sizing:border-box;border:1px solid #aab8c7;border-radius:10px;background:#fff;color:#172534;box-shadow:0 5px 20px #0003;font:13px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif}
          @media(max-width:600px){:host{display:block;position:relative;right:auto;top:auto;width:calc(100% - 20px);max-height:none;margin:10px auto 14px}}
          *{box-sizing:border-box} .body{padding:10px 12px} .head{display:flex;align-items:center;justify-content:space-between}.title{font-weight:700;font-size:14px}
          button{background:transparent;border:0;border-radius:6px;color:inherit;cursor:pointer;font-size:20px;padding:2px 6px}button[aria-expanded="true"]{background:#dcecff;color:#075da5}button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid #075da5;outline-offset:2px}
          .row{display:flex;align-items:center;gap:7px;margin:7px 0;cursor:pointer}.row:has(input:disabled){opacity:.62;cursor:not-allowed}input[type=checkbox]{accent-color:#075da5}
          .spin{display:inline-block;width:13px;height:13px;border:2px solid #aebdca;border-top-color:#075da5;border-radius:50%;animation:rotate .8s linear infinite}.spin[hidden],.warn[hidden],.settings[hidden]{display:none}@keyframes rotate{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){.spin{animation:none;border:0;width:auto;height:auto}.spin:after{content:'⏳'}}
          .settings{border-top:1px solid #e0e7ee;margin-top:8px;padding-top:8px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin:6px 0}.grid label{white-space:nowrap}
          input[type=text],select{width:100%;padding:5px;border:1px solid #aab8c7;border-radius:5px;font:inherit;color:inherit;background:#fff}.hint{font-size:11px;color:#4c5d6c;margin:4px 0 7px}.hint a{color:#075da5}.stats{border-top:1px solid #e0e7ee;margin-top:8px;padding-top:7px;font-size:11px;line-height:1.5}.footer{border-top:1px solid #e0e7ee;margin-top:7px;padding-top:7px;font-size:11px;color:#41566b}.footer[data-level=error]{color:#9d311f}
        </style>
        <div class="body">
          <div class="head"><span class="title">书单增强</span><button id="zble-gear" type="button" title="设置" aria-label="设置" aria-controls="zble-settings" aria-expanded="false">⚙</button></div>
          <label class="row"><input id="zble-show-switch" type="checkbox">一直显示文件格式</label>
          <label class="row"><input id="zble-format-switch" type="checkbox">按文件格式筛选</label>
          <label class="row"><input id="zble-download-switch" type="checkbox">按下载状态筛选 <span id="zble-wait-icon" class="spin" aria-label="等待下载状态"></span><span id="zble-warn-icon" class="warn" hidden aria-label="下载状态未确认">⚠️</span></label>
          <div id="zble-settings" class="settings" hidden>
            <div>筛选文件格式（可多选）</div>
            <div class="grid">
              <label><input type="checkbox" data-format="pdf"> PDF</label>
              <label><input type="checkbox" data-format="epub"> EPUB</label>
              <label><input type="checkbox" data-format="azw3"> AZW3</label>
              <label><input type="checkbox" data-format="mobi"> MOBI</label>
              <label><input type="checkbox" data-format="other"> 其他全部</label>
              <label><input type="checkbox" data-format="custom"> 自定义</label>
            </div>
            <input id="zble-custom" type="text" aria-label="自定义文件格式" placeholder="如 djvu, txt; fb2">
            <div class="hint">自定义格式用逗号或分号分隔；“其他全部”包含未知格式，与自定义并选不会缩小范围。</div>
            <label for="zble-download-rule">下载状态规则</label>
            <select id="zble-download-rule"><option value="not-downloaded">仅未下载</option><option value="downloaded">仅已下载</option></select>
            <div class="hint">其他镜像：在 Tampermonkey 的本脚本设置中手动添加 User matches，例如 <code>https://your-mirror.example/booklist/*</code>（替换为实际域名）。脚本无法自行修改匹配规则。<a href="https://www.tampermonkey.net/faq.php?q=Q103" target="_blank" rel="noopener noreferrer">操作说明</a></div>
          </div>
          <div class="stats"><div id="zble-loaded"></div><div id="zble-total"></div><div id="zble-progress"></div><div class="hint">每页按约 20 本估算；仅统计已加载条目。</div></div>
          <div id="zble-status" class="footer" role="status" aria-live="polite">等待页面加载</div>
        </div>`;

      const showSwitch = panelRoot.querySelector('#zble-show-switch');
      const formatSwitch = panelRoot.querySelector('#zble-format-switch');
      const downloadSwitch = panelRoot.querySelector('#zble-download-switch');
      showSwitch.checked = settings.showFormat;
      formatSwitch.checked = settings.filterFormat;
      downloadSwitch.checked = settings.filterDownload;
      showSwitch.addEventListener('change', () => { settings.showFormat = showSwitch.checked; saveSettings(); scheduleRefresh(); });
      formatSwitch.addEventListener('change', () => { settings.filterFormat = formatSwitch.checked; saveSettings(); scheduleRefresh(); });
      downloadSwitch.addEventListener('change', () => { settings.filterDownload = downloadSwitch.checked; saveSettings(); scheduleRefresh(); });

      const gear = panelRoot.querySelector('#zble-gear');
      const settingsPanel = panelRoot.querySelector('#zble-settings');
      function fillDraft() {
        for (const input of panelRoot.querySelectorAll('[data-format]')) input.checked = settings.formats.includes(input.dataset.format);
        panelRoot.querySelector('#zble-custom').value = settings.custom;
        panelRoot.querySelector('#zble-download-rule').value = settings.downloadRule;
      }
      gear.addEventListener('click', () => {
        const opening = gear.getAttribute('aria-expanded') !== 'true';
        if (opening) fillDraft();
        else {
          settings.formats = [...panelRoot.querySelectorAll('[data-format]:checked')].map(input => input.dataset.format);
          settings.custom = panelRoot.querySelector('#zble-custom').value.slice(0, 1000);
          settings.downloadRule = panelRoot.querySelector('#zble-download-rule').value;
          saveSettings();
          scheduleRefresh();
        }
        gear.setAttribute('aria-expanded', String(opening));
        settingsPanel.hidden = !opening;
      });
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
