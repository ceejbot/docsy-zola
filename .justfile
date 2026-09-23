# Recipes for working on the theme through its demo site in example/.

set shell := ["bash", "-euo", "pipefail", "-c"]

@_default:
    just --list --unsorted

# Install the tools this repo needs
@setup:
    command -v zola >/dev/null || brew install zola

# Serve the demo site with live reload at http://127.0.0.1:1111
@watch:
    cd example && zola serve

# Validate templates and internal links
@check:
    cd example && zola check --skip-external-links

# Build the demo site into example/public
@build:
    cd example && zola build

# Remove build output
@clean:
    rm -rf example/public

# What CI runs: check, then build
@ci: check build
