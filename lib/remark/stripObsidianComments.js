/**
 * Rehype plugin to strip out % comments
 */

// smaller implementation that works
export function remarkSimpleStripPercentComments() {
  return (tree) => {
    let inComment = false; // Tracks whether we are inside a comment block

    const removeComments = (nodes) => {
      const result = [];
      for (const node of nodes) {
        const text = node.value?.trim() || "";

        if (text.startsWith("%%")) inComment = true; // Start of a comment block
        if (!inComment) result.push(node); // Keep node if not in a comment block
        if (text.endsWith("%%")) inComment = false; // End of a comment block
      }
      return result;
    };

    const traverse = (node) => {
      if (node.children)
        node.children = removeComments(node.children).map(traverse);
      return node;
    };

    traverse(tree);
  };
}
