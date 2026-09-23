+++
title = "Markdown"
description = "Headings, lists, tables, code blocks, quotes and images as docsy renders them."
weight = 10
[taxonomies]
tags = ["content"]
+++

This page exists so the right-hand table of contents has something to index
and so you can see the default rendering of each Markdown construct. The prose
is filler, but the markup is real.

## Headings and anchors

Every heading gets a self-link on the right, docsy style, because the demo sets
`insert_anchor_links = "right"`. Hover a heading to see it. The table of
contents on the right tracks the heading in view as you scroll.

### A third-level heading

Third-level headings appear in the table of contents nested under their parent.

#### A fourth-level heading

Fourth-level headings do too, by default, since Zola's `toc` carries the whole tree.

## Inline text

Text can be **bold**, *italic*, ~~struck through~~, or `inline code`. Links
look [like this](https://www.getzola.org/). Footnotes work as well.[^1]

[^1]: This is the footnote.

## Lists

- An unordered list
- with a second item
  - and a nested item
  - and another
- and a third item

1. An ordered list
2. with a second item
3. and a third

- [x] A task that is done
- [ ] A task that is not

## Block quotes

> Documentation is a love letter that you write to your future self.
>
> Damian Conway

## Tables

| Key | Type | Default | Purpose |
| --- | --- | --- | --- |
| `menu` | array | `[]` | Navbar links, in display order |
| `github_repo` | string | `""` | Enables the page-source and edit links |
| `copyright` | string | `""` | Footer copyright holder |
| `version` | string | `""` | Shown as a pill in the navbar when set |

## Code

Fenced code blocks get a copy button and syntax highlighting. The demo uses
Zola's class-based highlighting, so the token colours come from one generated
CSS file rather than inline styles:

```rust
/// Render a page's table of contents as nested lists.
fn render_toc(headers: &[Header], depth: usize) -> String {
    let mut out = String::new();
    for h in headers {
        out.push_str(&format!("<li><a href=\"#{}\">{}</a>", h.id, h.title));
        if !h.children.is_empty() && depth > 1 {
            out.push_str("<ul>");
            out.push_str(&render_toc(&h.children, depth - 1));
            out.push_str("</ul>");
        }
        out.push_str("</li>");
    }
    out
}
```

```toml
[extra.ui]
sidebar_menu_foldable = true
show_light_dark_mode_menu = true
```

## Horizontal rule

Text above the rule.

---

Text below the rule.
