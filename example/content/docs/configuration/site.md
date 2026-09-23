+++
title = "Site settings"
description = "Navbar, footer, branding, search and the optional extras under [extra]."
weight = 10
[taxonomies]
tags = ["setup"]
+++

## Navigation

| Key | Default | Purpose |
| --- | --- | --- |
| `menu` | `[]` | Navbar links: `[{ name = "Docs", url = "/docs/" }]`, in display order |
| `version` | `""` | Shown as a pill in the navbar when set |
| `ui.navbar_theme` | `""` | `"dark"` for a dark navbar |
| `ui.breadcrumb_disable` | `false` | Hide the breadcrumb above page titles |
| `ui.sidebar_menu_foldable` | `false` | Collapse sidebar sections that are not on the current path |
| `ui.sidebar_menu_compact` | `false` | Show only the current section's subtree |
| `ui.sidebar_search_disable` | `false` | Hide the search box at the top of the sidebar |
| `ui.scrollspy_disable` | `false` | Stop the table of contents from tracking scroll position |

## Branding

| Key | Default | Purpose |
| --- | --- | --- |
| `favicons` | `[]` | Files under `static/`: `["favicon.svg", "favicon-32x32.png"]` |
| `logo` | `""` | Navbar logo under `static/`, shown when `ui.navbar_logo = true` |
| `ui.navbar_logo` | `false` | Show the logo in the navbar |
| `sidebar_logo` | `""` | A site mark centred at the top of the left column, linking home |
| `ui.show_light_dark_mode_menu` | `false` | The light / dark / auto toggle in the navbar |

## Source links and footer

| Key | Default | Purpose |
| --- | --- | --- |
| `github_repo` | `""` | `https://github.com/org/repo`; enables the page-meta links |
| `github_subdir` | `""` | The site's directory inside that repository, such as `"site"` |
| `github_branch` | `"main"` | Branch the links point at |
| `markdown_alternates` | `false` | Link each page's Markdown source at `<url>index.md`; you publish the file |
| `copyright` | `""` | Footer copyright holder; defaults to `"<title> Authors"` |
| `privacy_policy` | `""` | URL for a privacy policy link in the footer |
| `footer_links` | `[]` | `[{ name, url, icon = "fa-brands fa-github", side = "left" }]` |

## Head and assets

| Key | Default | Purpose |
| --- | --- | --- |
| `preconnect` | `[]` | Origins to `<link rel="preconnect">`, such as Google Fonts hosts |
| `stylesheets` | `[]` | Extra stylesheet URLs linked before the theme's `main.css` |
| `highlight_css` | `""` | Zola's class-based highlight CSS file, such as `"giallo.css"` |
| `mermaid_version` | `""` | Pin a Mermaid release to enable diagrams; unset loads nothing |
| `robots_index` | unset | Unset emits no robots meta; `true` indexes, `false` blocks |
| `offline_search_max_results` | `10` | How many hits the search box lists |

## Class-based syntax highlighting

Zola's `[markdown.highlighting] style = "class"` writes one CSS file of token
classes into `public/`. Name it in `highlight_css` and the head links it before
the theme stylesheet. This demo uses that mode.
