const root = document.documentElement;

// ---------- theme ----------

document.getElementById('theme-toggle').addEventListener('click', () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try {
    localStorage.setItem('theme', root.dataset.theme);
  } catch {}
});

// ---------- search ----------

const MAX_RESULTS = 8;
const SNIPPET_RADIUS = 70;

const input = document.getElementById('search-input');
const results = document.getElementById('search-results');
let index = null;

// The index is fetched on first use so pages that never search don't pay for it
async function loadIndex() {
  if (index) return;
  const response = await fetch(`${root.dataset.base}/search.json`);
  const docs = await response.json();
  index = docs.map((doc) => ({
    ...doc,
    lowerTitle: doc.title.toLowerCase(),
    lowerTags: doc.tags.join(' '),
    lowerText: doc.text.toLowerCase(),
  }));
}

function count(haystack, term) {
  return haystack.split(term).length - 1;
}

function score(doc, terms) {
  let total = 0;
  for (const term of terms) {
    const title = count(doc.lowerTitle, term);
    const tags = count(doc.lowerTags, term);
    const text = count(doc.lowerText, term);
    if (!title && !tags && !text) return 0; // every term has to match
    total += title * 10 + tags * 5 + text;
  }
  return total;
}

function snippet(doc, terms) {
  const hits = terms.map((term) => doc.lowerText.indexOf(term)).filter((i) => i >= 0);
  const start = Math.max(0, (hits.length ? Math.min(...hits) : 0) - SNIPPET_RADIUS);
  const end = start + SNIPPET_RADIUS * 2;
  return `${start ? '…' : ''}${doc.text.slice(start, end)}${end < doc.text.length ? '…' : ''}`;
}

function appendHighlighted(parent, text, terms) {
  const pattern = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  text.split(new RegExp(`(${pattern})`, 'gi')).forEach((part, i) => {
    // split() with a capture group puts the matches at odd positions
    if (i % 2) parent.appendChild(document.createElement('mark')).textContent = part;
    else parent.append(part);
  });
}

function render(terms) {
  const matches = index
    .map((doc) => ({ doc, score: score(doc, terms) }))
    .filter((match) => match.score)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS);

  results.replaceChildren(...matches.map(({ doc }) => {
    const item = document.createElement('li');
    const link = item.appendChild(document.createElement('a'));
    link.href = doc.url;
    appendHighlighted(link.appendChild(document.createElement('strong')), doc.title, terms);
    appendHighlighted(link.appendChild(document.createElement('span')), snippet(doc, terms), terms);
    return item;
  }));

  if (!matches.length) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'No results';
    results.append(empty);
  }
  results.hidden = false;
}

async function search() {
  const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) {
    results.hidden = true;
    return;
  }
  await loadIndex();
  render(terms);
}

input.addEventListener('input', search);
input.addEventListener('focus', search);

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') results.querySelector('a')?.click();
  if (event.key === 'Escape') {
    input.value = '';
    results.hidden = true;
    input.blur();
  }
});

document.addEventListener('keydown', (event) => {
  const typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
  if (event.key === '/' && !typing) {
    event.preventDefault();
    input.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.search')) results.hidden = true;
});
