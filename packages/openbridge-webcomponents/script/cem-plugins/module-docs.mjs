export function moduleDocsPlugin() {
  return {
    name: 'obc-module-docs',
    analyzePhase({ts, node, moduleDoc}) {
      if (!ts.isSourceFile(node)) return;
      // jsdoc.md allows the block above the first export, which may be below
      // the imports.
      const positions = new Set([0]);
      for (const stmt of node.statements) {
        positions.add(stmt.getFullStart());
        if (!ts.isImportDeclaration(stmt)) break;
      }
      const ranges = [...positions].flatMap(
        (pos) => ts.getLeadingCommentRanges(node.text, pos) ?? []
      );
      for (const r of ranges) {
        const raw = node.text.slice(r.pos, r.end);
        if (!raw.startsWith('/**') || !/@module\b/.test(raw)) continue;
        const lines = raw
          .replace(/^\/\*\*/, '')
          .replace(/\*\/$/, '')
          .split('\n')
          .map((l) => l.replace(/^\s*\*\s?/, '').replace(/\s+$/, ''));
        const moduleLine = lines.find((l) => /^@module\b/.test(l));
        const summary = moduleLine
          ? moduleLine.replace(/^@module\s*/, '').trim()
          : '';
        if (summary) moduleDoc.summary = summary;
        moduleDoc.description = lines
          .filter(
            (l) => !/^@(module|experimental|stable|beta|deprecated)\b/.test(l)
          )
          .join('\n')
          .trim();
        return;
      }
    },
  };
}
