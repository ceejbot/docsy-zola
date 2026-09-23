+++
title = "Components"
description = "The Tera components that stand in for docsy's shortcodes: alert, badge and mermaid."
weight = 20
[taxonomies]
tags = ["content"]
+++

Zola 0.23 runs page content through Tera before Markdown, so Markdown can call
block components directly. The theme ships three, ported from the docsy
shortcodes this theme's first site used.

## Alert

Any Bootstrap colour name works: `primary`, `secondary`, `success`, `danger`,
`warning`, `info`, `light`, `dark`. The body is Markdown.

```
{% raw %}{% <alert color="warning" title="Heads up"> %}
The body is **Markdown**, and can hold `code` and [links](/).
{% </alert> %}{% endraw %}
```

{% <alert color="warning" title="Heads up"> %}
The body is **Markdown**, and can hold `code` and [links](/).
{% </alert> %}

{% <alert color="success"> %}
An alert with no title.
{% </alert> %}

{% <alert color="danger" title="Something went wrong"> %}
Alerts take the colour's full Bootstrap treatment in both light and dark modes.
{% </alert> %}

## Badge

An inline pill, for status markers like an ADR's state. The style is a
Bootstrap text-background colour.

```
{% raw %}Status: {% <badge style="success"> %}accepted{% </badge> %}{% endraw %}
```

Status: {% <badge style="success"> %}accepted{% </badge> %}
{% <badge style="secondary"> %}proposed{% </badge> %}
{% <badge style="warning"> %}superseded{% </badge> %}
{% <badge style="info"> %}draft{% </badge> %}

## Mermaid

Diagrams are opt-in: set `extra.mermaid_version` in `config.toml` to a pinned
release and the loader script fetches Mermaid from the CDN, only on pages that
contain a diagram. This demo pins one so the block below renders.

```
{% raw %}{% <mermaid> %}
flowchart LR
    md[Markdown] --> tera[Tera] --> html[HTML]
{% </mermaid> %}{% endraw %}
```

{% <mermaid> %}
flowchart LR
    md[Markdown] -->|components| tera[Tera] -->|render| html[HTML]
    html --> pub[public/]
{% </mermaid> %}

## Quoting template syntax

A page that shows literal `{% raw %}{{ … }}{% endraw %}` or
`{% raw %}{% … %}{% endraw %}`, as this one does, wraps it in Tera's `raw`
block. A page that cannot do that, say one quoting a prompt template wholesale,
can be listed in `skip_content_templating` in `config.toml` instead, at the cost
of not being able to use components.
