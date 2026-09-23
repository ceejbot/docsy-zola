/*
 * docsy-mermaid.js — port of docsy v0.16.0 _partials/scripts/mermaid.html.
 *
 * Hugo knew at build time whether a page used the mermaid shortcode and only
 * then emitted the loader. Zola has no per-page store, so scripts.html includes
 * this module on every page once `extra.mermaid_version` pins a release, and it
 * imports Mermaid from the CDN only when the page contains a .mermaid element.
 * An unpinned version is a no-op rather than `latest`: the docs site should not
 * execute whatever the CDN resolves today. Theme follows the Bootstrap color mode; Mermaid cannot be
 * re-initialised, so a mode change reloads the page, as docsy does.
 */
(async function () {
  if (!document.querySelector('.mermaid')) return;
  const version = document.documentElement.getAttribute('data-mermaid-version');
  if (!version) return;
  const { default: mermaid } = await import(`https://cdn.jsdelivr.net/npm/mermaid@${version}/dist/mermaid.esm.min.mjs`);
  const settings = { startOnLoad: true };
  if (document.documentElement.getAttribute('data-bs-theme') === 'dark') settings.theme = 'dark';
  mermaid.initialize(settings);
  new MutationObserver(function (mutations) {
    for (const m of mutations) {
      if (m.type === 'attributes' && m.attributeName === 'data-bs-theme') location.reload();
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-bs-theme'] });
})();
