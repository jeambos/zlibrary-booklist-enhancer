const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');

function eventTarget() {
  const listeners = new Map();
  return {
    addEventListener(name, listener) {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name).add(listener);
    },
    removeEventListener(name, listener) { listeners.get(name)?.delete(listener); },
    dispatch(name, extra = {}) {
      for (const listener of [...(listeners.get(name) || [])]) listener({ type: name, ...extra });
    },
    listenerCount(name) { return listeners.get(name)?.size || 0; },
  };
}

function makeRuntime({ hostname = 'mirror.example', pathname = '/booklist/1', topFrame = true,
  readyState = 'complete', fingerprint = false, noticeDom = false, storageBlocked = false,
  sessionData = new Map(), sitePrefs = {} } = {}) {
  let hasCards = fingerprint;
  let settingsReads = 0;
  let disconnects = 0;
  let now = 1000;
  const observers = [];
  const intervals = new Map();
  const hosts = [];
  const storedSitePrefs = { ...sitePrefs };
  function makeNode() {
    return Object.assign(eventTarget(), {
      textContent: '', hidden: false, attributes: new Map(),
      setAttribute(name, value) { this.attributes.set(name, value); },
      getAttribute(name) { return this.attributes.get(name); },
    });
  }
  function makeNoticeHost() {
    const host = {
      removed: false,
      remove() { this.removed = true; },
      attachShadow() {
        const nodes = new Map(['#zble-notice-close', '#zble-notice-optout', '.try', '.title', '.message', '.optout span']
          .map(selector => [selector, makeNode()]));
        this.shadowRoot = { innerHTML: '', querySelector: selector => nodes.get(selector) || null };
        return this.shadowRoot;
      },
    };
    hosts.push(host);
    return host;
  }
  const document = Object.assign(eventTarget(), {
    readyState,
    documentElement: {},
    body: noticeDom ? { append() {} } : null,
    createElement(name) { if (noticeDom && name === 'div') return makeNoticeHost(); throw Error('unexpected element'); },
    querySelector(selector) {
      if (!hasCards) return null;
      if (selector === '.booklist-main.active') {
        return { querySelector: name => name === '.readlist-view' ? {} : null };
      }
      return null;
    },
    querySelectorAll(selector) {
      return hasCards && selector === '.booklist-main.active .readlist-view > z-bookcard' ? [{}] : [];
    },
  });
  const window = Object.assign(eventTarget(), { location: { hostname, pathname } });
  Object.defineProperty(window, 'sessionStorage', { get() {
    if (storageBlocked) throw new Error('SecurityError');
    return {
      getItem(key) { return sessionData.get(key) || null; },
      setItem(key, value) { sessionData.set(key, value); },
    };
  } });
  window.self = window;
  window.top = topFrame ? window : {};
  class Observer {
    constructor(callback) { this.callback = callback; this.active = false; observers.push(this); }
    observe() { this.active = true; }
    disconnect() { this.active = false; disconnects++; }
  }
  const script = readFileSync(require.resolve('../booklist-enhancer.user.js'), 'utf8');
  const context = {
    document, window, MutationObserver: Observer, AbortController,
    setTimeout: () => 1, clearTimeout() {}, requestAnimationFrame() {},
    setInterval(callback) { const id = intervals.size + 1; intervals.set(id, callback); return id; },
    clearInterval(id) { intervals.delete(id); },
    Date: { now: () => now }, navigator: { languages: ['en-US'] },
    GM_getValue(key) { settingsReads++; return key === 'zble-site-prefs-v3' ? storedSitePrefs : {}; },
    GM_setValue(key, value) { if (key === 'zble-site-prefs-v3') Object.assign(storedSitePrefs, value); },
  };
  return {
    document, window,
    start() { runInNewContext(script, context); },
    setFingerprint(value) { hasCards = value; for (const observer of observers) if (observer.active) observer.callback(); },
    advance(ms) { now += ms; for (const callback of [...intervals.values()]) callback(); },
    get notice() { return hosts.at(-1); },
    get notices() { return hosts; },
    get intervals() { return intervals.size; },
    get sitePrefs() { return storedSitePrefs; },
    get settingsReads() { return settingsReads; },
    get disconnects() { return disconnects; },
    get activeObservers() { return observers.filter(observer => observer.active).length; },
  };
}

module.exports = { eventTarget, makeRuntime };
