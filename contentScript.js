function redactCyrillic() {
    const cyrillicRegex = /[\u0400-\u04FF]/g;
  
    function applyRedaction(node) {
      if (node.nodeType === Node.TEXT_NODE && cyrillicRegex.test(node.textContent)) {
        const redactedText = node.textContent.replace(cyrillicRegex, '█');
        node.textContent = redactedText;
      }
    }
  
    function redactNodes(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        applyRedaction(node);
  
        if (node.childNodes.length) {
          redactNodes(node.childNodes);
        }
      }
    }
  
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          redactNodes(mutation.addedNodes);
        }
      }
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  
    redactNodes(document.body.childNodes);
  }
  
  redactCyrillic();
  