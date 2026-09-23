+++
title = "Getting started"
description = "Add the theme to a Zola site and write the one stylesheet it needs."
weight = 10
[taxonomies]
tags = ["setup"]
+++

## Install the theme

Clone or submodule the repository into your site's `themes/` directory:

```sh
git submodule add https://github.com/ceejbot/docsy-zola themes/docsy-zola
```

Then name it in `config.toml`. The search and anchor settings are what the
theme's JavaScript and templates expect:

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

[extra.ui]
sidebar_menu_foldable = true
show_light_dark_mode_menu = true
```

## Write the stylesheet

Zola compiles the theme's `sass/` and the site's `sass/` separately and cannot
import a theme partial by bare name. The site therefore owns `main.css`, and its
`sass/main.scss` reaches the theme by relative path. Variable overrides go before
the import, project styles after it:

```scss
$primary: #3a5a78;                                 // Bootstrap / docsy variables
@import '../themes/docsy-zola/sass/docsy';
.td-content p a { text-decoration: underline; }    // project styles
```

That is the whole contract. This demo site's `main.scss` is only the import
line, which is why it looks like stock docsy.

{% <alert color="info" title="Why every theme file is a partial"> %}
Every `.scss` under the theme has a leading underscore on purpose. Zola would
otherwise compile each vendored Bootstrap and Font Awesome entry file into its
own CSS file in `public/`.
{% </alert> %}

## Add content

Pages use TOML front matter and no Markdown `H1`, because the template renders
the title and description for you:

```toml
+++
title = "My page"
description = "One line, shown on section indexes and in search results."
weight = 10
+++
```

Navigation is generated from the content tree. Section order comes from
`weight` in each `_index.md`, and there is no menu file to maintain.
