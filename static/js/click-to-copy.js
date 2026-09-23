/*
 * click-to-copy.js — docsy v0.16.0's copy button, retargeted at Zola's code
 * blocks. Hugo wraps highlighted code in <div class="highlight"><pre>; Zola
 * emits a bare <pre><code>, so the selector is every non-Mermaid <pre> in the
 * content column. Wrapped in an IIFE like the other theme scripts so nothing
 * leaks into the page's global scope, and initialised on DOMContentLoaded.
 */
(function () {
  'use strict';

  function init() {
    const codeListings = document.querySelectorAll('.td-content pre:not(.mermaid)');

    for (let index = 0; index < codeListings.length; index++) {
      const codeSample = codeListings[index].querySelector('code');
      if (!codeSample) continue;
      const copyButton = document.createElement('button');
      const buttonAttributes = {
        type: 'button',
        title: 'Copy to clipboard',
        'data-bs-toggle': 'tooltip',
        'data-bs-placement': 'top',
        'data-bs-container': 'body',
      };

      Object.keys(buttonAttributes).forEach((key) => {
        copyButton.setAttribute(key, buttonAttributes[key]);
      });

      copyButton.classList.add('fas', 'fa-copy', 'btn', 'btn-sm', 'td-click-to-copy');
      const tooltip = window.bootstrap ? new bootstrap.Tooltip(copyButton) : null;

      copyButton.onclick = () => {
        copyCode(codeSample);
        copyButton.setAttribute('data-bs-original-title', 'Copied!');
        if (tooltip) tooltip.show();
      };

      copyButton.onmouseout = () => {
        copyButton.setAttribute('data-bs-original-title', 'Copy to clipboard');
        if (tooltip) tooltip.hide();
      };

      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('click-to-copy');
      buttonDiv.append(copyButton);
      codeListings[index].insertBefore(buttonDiv, codeSample);
    }
  }

  function copyCode(codeSample) {
    const isConsoleBlock = codeSample.matches("code[data-lang='console'], code.language-console");
    let text;

    if (isConsoleBlock) {
      const clone = codeSample.cloneNode(true);
      pruneUnselectableElements(codeSample, clone);
      text = clone.textContent;
      text = text.replace(/^ /gm, '');
    } else {
      text = codeSample.textContent;
    }
    text = text ? text.trim() : '';
    navigator.clipboard.writeText(text + '\n');
  }

  function pruneUnselectableElements(sourceNode, cloneNode) {
    const sourceChildren = sourceNode.children;
    const cloneChildren = cloneNode.children;

    for (let i = sourceChildren.length - 1; i >= 0; i--) {
      const sourceChild = sourceChildren[i];
      const cloneChild = cloneChildren[i];
      const style = window.getComputedStyle(sourceChild);
      const unselectable = style.userSelect === 'none' || style.webkitUserSelect === 'none';

      if (unselectable) {
        cloneChild.remove();
        continue;
      }

      pruneUnselectableElements(sourceChild, cloneChild);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
