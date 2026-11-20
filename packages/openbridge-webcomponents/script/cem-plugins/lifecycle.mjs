const LIFECYCLE_TAG = /^\s*\*?\s*@(stable|beta|experimental|deprecated)\b/m;

/**
 * Lifecycle in the manifest
 *
 * CEM keeps only the standard `deprecated` field, so a manifest reader
 * cannot tell a stable element from a beta one. This writes the class
 * JSDoc's lifecycle tag (the one `component-lifecycle-tag` enforces) as
 * `lifecycle` on the declaration; llms.txt and the component pages read it.
 */
export function lifecyclePlugin() {
  return {
    name: 'obc-lifecycle',
    analyzePhase({ts, node, moduleDoc}) {
      if (!ts.isClassDeclaration(node) || !node.name) return;
      const tags = new Set();
      for (const raw of jsDocBlocks(ts, node)) {
        const m = LIFECYCLE_TAG.exec(raw);
        if (m) tags.add(m[1]);
      }
      if (tags.size !== 1) return;
      const name = node.name.text;
      const declaration = moduleDoc.declarations?.find((d) => d.name === name);
      if (declaration) declaration.lifecycle = [...tags][0];
    },
  };
}

// The class JSDoc may sit between two decorators (`@localized()` above it,
// `@customElement()` below), where it is a leading comment of the second
// decorator rather than of the class, so every decorator's lead is read too.
function jsDocBlocks(ts, node) {
  const text = node.getSourceFile().text;
  const starts = [node.getFullStart()];
  for (const mod of node.modifiers ?? []) {
    if (ts.isDecorator(mod)) starts.push(mod.getFullStart());
  }
  const blocks = [];
  for (const pos of starts) {
    for (const r of ts.getLeadingCommentRanges(text, pos) ?? []) {
      const raw = text.slice(r.pos, r.end);
      if (raw.startsWith('/**')) blocks.push(raw);
    }
  }
  return blocks;
}
