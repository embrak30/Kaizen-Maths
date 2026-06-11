(() => {
  const containers = [
    '.equation',
    '.step-equation',
    '.math',
    '.formula',
    '.expression',
    '.problem-numbers',
    '.problem-type',
    '.step-calculation',
    '.calculation',
    '.problem-answer',
    '.final-answer',
    '.problem-set-header',
    '.solution-steps',
    '.system-line',
    '.step'
  ].join(',');

  const skipTags = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'SELECT', 'OPTION', 'SUP', 'SUB']);
  const symbolPattern = /\+\/-|sqrt\(([^()]+)\)|\^\{([^{}]+)\}|\^\(([^()]+)\)|\^(-?[A-Za-z0-9]+)|([A-Za-z])([2-9])(?=\b)/g;

  function superscript(text) {
    const sup = document.createElement('sup');
    sup.textContent = text;
    return sup;
  }

  function transformTextNode(node) {
    const text = node.nodeValue;
    if (!text || !/(\^|[A-Za-z][2-9]\b|\+\/-|sqrt\()/i.test(text)) return;

    let match;
    let lastIndex = 0;
    let changed = false;
    const fragment = document.createDocumentFragment();
    symbolPattern.lastIndex = 0;

    while ((match = symbolPattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }

      if (match[0] === '+/-') {
        fragment.appendChild(document.createTextNode('±'));
      } else if (match[1]) {
        fragment.appendChild(document.createTextNode('√(' + match[1] + ')'));
      } else {
        if (match[5] && match[6]) fragment.appendChild(document.createTextNode(match[5]));
        fragment.appendChild(superscript(match[2] || match[3] || match[4] || match[6] || ''));
      }

      lastIndex = symbolPattern.lastIndex;
      changed = true;
    }

    if (!changed) return;
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    node.replaceWith(fragment);
  }

  function shouldSkipText(node) {
    const parent = node.parentElement;
    if (!parent) return true;
    if (skipTags.has(parent.tagName)) return true;
    if (parent.closest('.katex, .katex-display')) return true;
    return false;
  }

  function processContainer(container) {
    if (!container || container.nodeType !== Node.ELEMENT_NODE) return;
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return shouldSkipText(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(transformTextNode);
  }

  function process(root = document) {
    if (root.nodeType === Node.TEXT_NODE) {
      const parentContainer = root.parentElement && root.parentElement.closest(containers);
      if (parentContainer) transformTextNode(root);
      return;
    }

    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE && root.matches(containers)) processContainer(root);
    root.querySelectorAll?.(containers).forEach(processContainer);
  }

  function start() {
    process();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(process);
        if (mutation.type === 'characterData') process(mutation.target);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
