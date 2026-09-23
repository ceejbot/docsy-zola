+++
title = "Extending templates"
description = "The blocks a site template can override without copying the whole theme."
weight = 30
[taxonomies]
tags = ["setup"]
+++

A site template extends a theme template by its theme-qualified path and
overrides one or more blocks:

```
{% raw %}{% extends "docsy-zola/templates/page.html" %}
{% block content_after_header %}
<p class="text-muted">Last reviewed {{ page.updated | default(value=page.date) }}</p>
{% endblock content_after_header %}{% endraw %}
```

| Block | Where it lands |
| --- | --- |
| `main` | The whole content column |
| `content_after_header` | Between the title block and the page body |
| `content_end` | After the page body |
| `head_end` | The end of `<head>` |
| `body_end` | Before `</body>`, after the theme's scripts |
| `kind` | The `td-kind-*` class on `<body>`: `home`, `section`, `page` |

## What differs from docsy

- No jQuery. The navbar overflow indicators, copy button and offline search are
  vanilla rewrites; the sidebar's active state is rendered at build time.
- The left nav is rooted at the site root on every page and lists a section's
  pages before its subsections, because Zola does not expose a section's weight
  to templates.
- Search uses Zola's `fuse_json` index with a plain term match instead of Lunr.
- Not ported: blog layouts, the `blocks/*`, `card`, `tabpane`, `swagger` and
  `imgproc` shortcodes, print layouts, i18n strings, Algolia and Google search.
