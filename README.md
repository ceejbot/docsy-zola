# docsy-zola

A [Zola](https://www.getzola.org/) port of Google's [docsy](https://www.docsy.dev/)
documentation theme, synced against docsy v0.16.0: Bootstrap 5 layout, a
foldable left-nav tree, right-hand table of contents, breadcrumbs, page-source and
edit links, light/dark/auto color modes, and offline search over Zola's own
index. Templates are Tera 2 components, so Zola 0.23 or newer is required.

Demo, in docsy's default colours: <https://ceejbot.github.io/docsy-zola/>. It is
built from [`example/`](example/), which is also the theme's documentation.

## What is in the box

| Path | Contents |
| --- | --- |
| `templates/` | `base.html` (the docs frame), `page`, `section`, `index`, `404`, `taxonomy_list`, `taxonomy_single`, `anchor-link` |
| `templates/partials/` | head, navbar, sidebar, toc, breadcrumb, page-meta-links, footer, scripts, search input, theme toggler, section index, pagination |
| `templates/components/` | `sidebar.*` and `toc.*` (recursive nav trees); `brand.mark` (inlined logo); `alert`, `badge`, `mermaid` content components |
| `sass/_docsy.scss` | the docsy stylesheet, importing vendored Bootstrap 5.3.8 and Font Awesome Free 6.7.2 (`sass/vendor/`) |
| `sass/td/` | docsy's own Sass, unmodified except that the two non-partial files are renamed to partials |
| `sass/_zola.scss` | styles for markup that differs under Zola (code blocks, search results, version pill) |
| `static/js/` | Bootstrap bundle, docsy's `dark-mode.js` and `scrollspy-patch.js`, and jQuery-free rewrites of its navbar (`docsy-nav.js`), copy button (`click-to-copy.js`), search (`docsy-search.js`) and Mermaid loader (`docsy-mermaid.js`) |
| `static/webfonts/` | Font Awesome solid and brands faces |

docsy-zola is Apache-2.0 (`LICENSE`), as is the docsy theme it ports
(`LICENSE-docsy`). The vendored Bootstrap is MIT (`LICENSE-bootstrap`) and Font
Awesome Free is under its mixed license (`LICENSE-fontawesome`); `NOTICE` lists
them.

## Using it

`config.toml`:

```toml
theme = "docsy-zola"
compile_sass = true
build_search_index = true

[markdown]
insert_anchor_links = "right"   # heading self-links, docsy style

[search]
index_format = "fuse_json"      # what docsy-search.js reads

[extra]
menu = [{ name = "Docs", url = "/docs/" }]
github_repo = "https://github.com/org/repo"
github_subdir = "site"          # if the Zola site is not at the repo root
favicons = ["favicon.svg"]
sidebar_logo = "img/mark.svg"   # or logo + ui.navbar_logo = true for the navbar

[extra.ui]
sidebar_menu_foldable = true
show_light_dark_mode_menu = true
```

Every key the templates read, with its default, is listed in `theme.toml`.

### The stylesheet

Zola compiles the theme's `sass/` and the site's `sass/` separately and cannot
import a theme partial by bare name, so the site's `sass/main.scss` reaches the
theme by relative path, with project variables before the import and project
styles after it:

```scss
$primary: #3a5a78;                          // Bootstrap / docsy variables
@import '../themes/docsy-zola/sass/docsy';
.td-content p a { text-decoration: underline; }   // project styles
```

Every `.scss` under the theme is a partial (leading underscore) on purpose:
Zola would otherwise compile each vendored entry file into `public/`.

### Class-based syntax highlighting

Zola's `[markdown.highlighting] style = "class"` writes one CSS file of token
classes into `public/`. Name it in `extra.highlight_css` (`"giallo.css"`) and
the head links it before the theme stylesheet.

### Extending a theme template

```
{% extends "docsy-zola/templates/page.html" %}
{% block content_after_header %}...{% endblock content_after_header %}
```

Blocks: `main`, `content_after_header`, `content_end`, `head_end`, `body_end`,
`kind`.

## Working on the theme

The demo site under `example/` reaches the theme through a symlink at
`example/themes/docsy-zola`, so editing a template or Sass file and reloading
shows the change. `just watch` serves it with live reload, `just check`
validates templates and internal links, and `just ci` is what the Pages
workflow runs before publishing from `latest`.

## Vendored dependencies

Bootstrap, Font Awesome and `bootstrap.bundle.min.js` are copied in, not
installed, so Dependabot and the repository's security scan do not see them.
Bumping one is a deliberate copy from the npm package (`node_modules/bootstrap/scss`,
`@fortawesome/fontawesome-free/{scss,webfonts}`, `bootstrap/dist/js`), renaming
any new non-partial `.scss` with a leading underscore, then rebuilding a site and
diffing its CSS. Record the versions in this README's table when you do.

## What differs from docsy

- No jQuery. The navbar overflow indicators, copy button and offline search are
  vanilla rewrites; the sidebar's active state is rendered at build time, so
  docsy's client-side hydration (`chrome-nav.js`) has no counterpart.
- The left nav is rooted at the site root on every page and lists a section's
  pages before its subsections, because Zola does not expose a section's weight
  to templates.
- Search uses Zola's `fuse_json` index with a plain term match instead of Lunr.
- Mermaid is opt-in: set `extra.mermaid_version` to a pinned release; it then loads
  from the CDN only on pages that contain a diagram.
- Not ported: blog layouts, the `blocks/*`, `card`, `tabpane`, `swagger` and
  `imgproc` shortcodes, print layouts, i18n strings, Algolia and Google search.
