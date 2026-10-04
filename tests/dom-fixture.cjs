function makeCard({ extension = 'pdf', coverId = '123', isbn = 'a,b', year = '2024', language = 'chinese', shadowReady = true } = {}) {
  function makeIdle(nativeText) {
    const textNode = { nodeType: 3, nodeValue: nativeText };
    return {
      nativeText, textNode, childNodes: [textNode], children: [],
      querySelector(selector) {
        return selector === '.zble-format' ? this.children.find(child => child.className === 'zble-format') || null : null;
      },
      append(child) { this.children.push(child); this.childNodes.push(child); },
    };
  }
  const idle = makeIdle(year === '0' ? 'Chinese' : `Chinese, ${year}`);
  const mobileIdle = makeIdle(year === '0' ? 'ch' : `ch, ${year}`);
  const title = { textContent: 'A very long original book title', href: '/book/123' };
  const author = { textContent: 'A very long original author name', href: '/author/123' };
  const cover = {
    getAttribute(name) { return ({ id: coverId, isbn })[name] ?? null; },
  };
  const root = {
    children: [],
    querySelector(selector) {
      if (selector === 'z-cover') return cover;
      if (selector === '#zble-format-style') return this.children.find(child => child.id === 'zble-format-style') || null;
      if (selector === '#zble-title-style') return this.children.find(child => child.id === 'zble-title-style') || null;
      if (selector === '#zble-author-style') return this.children.find(child => child.id === 'zble-author-style') || null;
      if (selector === '.meta.desktop .idle') return idle;
      if (selector === '.meta.mobile .idle') return mobileIdle;
      if (selector === '.book-info .title') return title;
      if (selector === '.book-info .author' || selector === '.book-info .author, .book-info .authors, .book-info .book-author') return author;
      return null;
    },
    querySelectorAll(selector) { return selector === '.meta .idle' ? [idle, mobileIdle] : []; },
    append(child) { this.children.push(child); },
  };
  const attributes = new Set();
  const card = {
    shadowRoot: shadowReady ? root : null,
    ownerDocument: { createElement(tagName) { return { tagName, textContent: '', className: '', id: '' }; } },
    getAttribute(name) { return ({ extension, year, language })[name] ?? null; },
    toggleAttribute(name, value) { value ? attributes.add(name) : attributes.delete(name); },
    hasAttribute(name) { return attributes.has(name); },
  };
  return { card, root, idle, mobileIdle, title, author, cover };
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
