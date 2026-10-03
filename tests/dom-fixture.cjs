function makeCard({ extension = 'pdf', coverId = '123', isbn = 'a,b', shadowReady = true } = {}) {
  const idle = {
    nativeText: 'Chinese, 2024',
    children: [],
    querySelector(selector) {
      return selector === '.zble-format' ? this.children.find(child => child.className === 'zble-format') || null : null;
    },
    append(child) { this.children.push(child); },
  };
  const cover = {
    getAttribute(name) { return ({ id: coverId, isbn })[name] ?? null; },
  };
  const root = {
    children: [],
    querySelector(selector) {
      if (selector === 'z-cover') return cover;
      if (selector === '#zble-format-style') return this.children.find(child => child.id === 'zble-format-style') || null;
      return null;
    },
    querySelectorAll(selector) { return selector === '.meta .idle' ? [idle] : []; },
    append(child) { this.children.push(child); },
  };
  const attributes = new Set();
  const card = {
    shadowRoot: shadowReady ? root : null,
    ownerDocument: { createElement(tagName) { return { tagName, textContent: '', className: '', id: '' }; } },
    getAttribute(name) { return name === 'extension' ? extension : null; },
    toggleAttribute(name, value) { value ? attributes.add(name) : attributes.delete(name); },
    hasAttribute(name) { return attributes.has(name); },
  };
  return { card, root, idle, cover };
}

function makeBooklist(cards = []) {
  let current = cards;
  let totalText = '';
  let listPresent = true;
  const list = {};
  const main = { querySelector(selector) { return selector === '.readlist-view' && listPresent ? list : null; } };
  return {
    setCards(next) { current = next; },
    setTotal(next) { totalText = next; },
    setListPresent(next) { listPresent = next; },
    querySelector(selector) {
      if (selector === '.booklist-main.active') return main;
      if (selector === '.booklist-header__tabs tab') return { textContent: totalText };
      return null;
    },
    querySelectorAll(selector) {
      return selector === '.booklist-main.active .readlist-view > z-bookcard' && listPresent ? current : [];
    },
  };
}

module.exports = { makeCard, makeBooklist };
