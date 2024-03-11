export function remarkStripH1() {
  return function (tree, file) {
    // // So we can't modify the value
    // const segments = /#.*\n*([\s\S]*)/.exec(file.value);
    // if (!segments) return;
    // file.value = segments[1];
    if (file.history[0].indexOf("/obsidian-note") === -1) return;
    let first = tree.children[0];
    if (first && first.type === "heading") {
      tree.children.shift();
      // Naively extract the text. This means no formatting in H1 titles allowed
      // DOn't overwrite if `title` already exists in frontmatter
      if (file.data.astro.frontmatter.title) return;
      file.data.astro.frontmatter.title = first.children[0].value;
    }
  };
}
