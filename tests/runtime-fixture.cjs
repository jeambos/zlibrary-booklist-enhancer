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
  readyState = 'complete', fingerprint = false } = {}) {
  let hasCards = fingerprint;
  let settingsReads = 0;
  let disconnects = 0;
  const observers = [];
  const document = Object.assign(eventTarget(), {
    readyState,
    documentElement: {},
    body: null,
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
  window.self = window;
  window.top = topFrame ? window : {};
  class Observer {
    constructor(callback) { this.callback = callback; this.active = false; observers.push(this); }
    observe() { this.active = true; }
    disconnect() { this.active = false; disconnects++; }
  }
  const script = readFileSync(require.resolve('../booklist-enhancer.user.js'), 'utf8');
  const context = {
    document, window, MutationObserver: Observer,
    setTimeout: () => 1, clearTimeout() {}, requestAnimationFrame() {},
    GM_getValue: () => { settingsReads++; return {}; },
  };
  return {
    document, window,
    start() { runInNewContext(script, context); },
    setFingerprint(value) { hasCards = value; for (const observer of observers) if (observer.active) observer.callback(); },
    get settingsReads() { return settingsReads; },
    get disconnects() { return disconnects; },
    get activeObservers() { return observers.filter(observer => observer.active).length; },
  };
}

module.exports = { eventTarget, makeRuntime };
