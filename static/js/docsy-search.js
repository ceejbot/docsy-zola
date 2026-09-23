/*
 * docsy-search.js — offline search over Zola's `fuse_json` search index.
 *
 * Replaces docsy v0.16.0 assets/js/offline-search.js (jQuery + Lunr over a
 * Hugo-generated index). Zola writes search_index.<lang>.json itself; each entry
 * is { url, title, description, body } with body truncated to the configured
 * length. The index is fetched lazily the first time an input is focused, so
 * readers who never search pay nothing. Results render as a list under the
 * input (sass/_zola.scss), keyboard navigable, closed on Escape or outside click.
 *
 * Scoring is a simple term match: every query term must appear in the title or
 * body; title hits weigh more. Good enough for a few hundred pages, and far
 * lighter than shipping Lunr.
 */
(function () {
  'use strict';

  var index = null;
  var loading = null;

  function normalize(data) {
    if (!Array.isArray(data)) return [];
    return data.map(function (d) {
      if (Array.isArray(d)) return { url: d[0], title: (d[1] || {}).title || '', body: (d[1] || {}).body || '' };
      return { url: d.url || d.id || d.ref || d.permalink, title: d.title || '', description: d.description || '', body: d.body || '' };
    });
  }

  function load(src) {
    if (index) return Promise.resolve();
    if (loading) return loading;
    loading = fetch(src)
      .then(function (r) { return r.json(); })
      .then(function (data) { index = normalize(data); })
      .catch(function () { index = []; });
    return loading;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function pathOf(url) {
    try { return new URL(url, window.location.href).pathname; } catch (e) { return url; }
  }

  function search(q, max) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length || !index) return [];
    var scored = [];
    for (var i = 0; i < index.length; i++) {
      var it = index[i];
      var title = it.title.toLowerCase();
      var desc = (it.description || '').toLowerCase();
      var body = it.body.toLowerCase();
      var score = 0, ok = true;
      for (var t = 0; t < terms.length; t++) {
        var inTitle = title.indexOf(terms[t]) !== -1;
        var inDesc = desc.indexOf(terms[t]) !== -1;
        var inBody = body.indexOf(terms[t]) !== -1;
        if (!inTitle && !inDesc && !inBody) { ok = false; break; }
        score += inTitle ? 10 : inDesc ? 3 : 1;
      }
      if (ok) scored.push({ it: it, score: score });
    }
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, max).map(function (s) { return s.it; });
  }

  function excerpt(it, terms) {
    var body = it.description || it.body || '';
    var lower = body.toLowerCase(), pos = -1;
    for (var i = 0; i < terms.length; i++) {
      var idx = lower.indexOf(terms[i]);
      if (idx !== -1 && (pos === -1 || idx < pos)) pos = idx;
    }
    if (pos === -1) pos = 0;
    var start = Math.max(0, pos - 30);
    return (start > 0 ? '…' : '') + body.slice(start, start + 140).trim() + (body.length > start + 140 ? '…' : '');
  }

  function wire(input) {
    var box = input.closest('.td-search');
    var results = box && box.querySelector('.td-search__results');
    if (!results) return;
    var src = input.getAttribute('data-offline-search-index-json-src');
    var max = parseInt(input.getAttribute('data-offline-search-max-results') || '10', 10);
    var active = -1;

    function render(items, terms) {
      active = -1;
      if (!items.length) {
        results.innerHTML = input.value.trim() ? '<li class="td-search__empty">No results found for “' + esc(input.value.trim()) + '”</li>' : '';
        return;
      }
      results.innerHTML = items.map(function (it) {
        return '<li class="td-search__result" role="option"><a href="' + esc(it.url) + '">' +
          '<span class="td-search__result-path">' + esc(pathOf(it.url)) + '</span>' +
          '<span class="td-search__result-title">' + esc(it.title || it.url) + '</span>' +
          '<span class="td-search__result-excerpt">' + esc(excerpt(it, terms)) + '</span>' +
          '</a></li>';
      }).join('');
    }

    function run() {
      var q = input.value.trim();
      if (!q) { render([], []); return; }
      load(src).then(function () { render(search(q, max), q.toLowerCase().split(/\s+/).filter(Boolean)); });
    }

    function move(delta) {
      var items = results.querySelectorAll('.td-search__result');
      if (!items.length) return;
      items.forEach(function (li) { li.classList.remove('is-active'); });
      active = (active + delta + items.length) % items.length;
      items[active].classList.add('is-active');
      items[active].scrollIntoView({ block: 'nearest' });
    }

    input.addEventListener('focus', function () { load(src); }, { once: true });
    input.addEventListener('input', run);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        var links = results.querySelectorAll('a');
        if (active >= 0 && links[active]) window.location.assign(links[active].href);
        else run();
      } else if (e.key === 'Escape') { input.value = ''; render([], []); input.blur(); }
    });
    var form = input.closest('form');
    if (form) form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    document.addEventListener('click', function (e) {
      if (!box.contains(e.target)) render([], []);
    });
  }

  function init() {
    document.querySelectorAll('.td-search--offline input[type="search"]').forEach(wire);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
