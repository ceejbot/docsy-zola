+++
title = "Page front matter"
description = "The extra keys a page or section can set to change how it appears in navigation and indexes."
weight = 20
[taxonomies]
tags = ["content"]
+++

Beyond Zola's own `title`, `description`, `weight` and `sort_by`, the templates
read a few keys under `[extra]` in a page's or section's front matter.

| Key | Applies to | Effect |
| --- | --- | --- |
| `link_title` | pages, sections | Shorter text for the sidebar entry |
| `toc_hide` | pages, sections | Leave it out of the sidebar tree |
| `hide_summary` | pages, sections | Leave it off the parent section's index |
| `no_list` | sections | Do not render the section index under the body |
| `simple_list` | sections | Render the section index as a plain bulleted list |

```toml
+++
title = "A very long title that would crowd the sidebar"
weight = 40
[extra]
link_title = "Long title"
+++
```

## Taxonomies

Pages tagged through a `tags` taxonomy get their terms listed under the title,
and the theme ships `taxonomy_list` and `taxonomy_single` templates for the
term pages. This site's [tags page](/tags/) shows both.

## Linking between pages

Use Zola's `@/` syntax rooted at `content/`, for example
`[Getting started](@/docs/getting-started.md)`, which `zola check` validates.
Plain relative `./foo.md` links render broken and slip past the checker.
