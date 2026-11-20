/**
 * MDX page to markdown
 *
 * The `docs/*.mdx` pages are markdown with a few MDX constructs: imports, a
 * `<Meta>`, `<Markdown>{partial}</Markdown>` for the `?raw` tables, a
 * `<Canvas>` or `<Controls>` per embedded story, and on the Introduction
 * page the channel banner and "you are here" markers. Each construct has
 * one rule here; fenced code is passed through untouched because the
 * migration guides quote framework markup there.
 */
export interface MdxContext {
  readRaw: (importPath: string) => string;
  storyLink: (
    storiesImportPath: string,
    exportName: string
  ) => string | undefined;
  site: string;
  vars: Record<string, string | boolean>;
  warn: (msg: string) => void;
}

const FENCE = /^\s*```/;
const IMPORT_START = /^import\b/;
const IMPORT_END =
  /\bfrom\s+['"][^'"]+['"]\s*;?\s*$|^import\s+['"][^'"]+['"]\s*;?\s*$/;
const DEFAULT_IMPORT = /^import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/;
const NAMESPACE_IMPORT = /^import\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"]/;
const MARKDOWN_PARTIAL = /^\s*<Markdown>\{(\w+)\}<\/Markdown>\s*$/;
const CANVAS = /^\s*<Canvas\s+of=\{(\w+)\.(\w+)\}[^>]*\/>\s*$/;
const CONTROLS = /^\s*<Controls\b[^>]*\/>\s*$/;
const META = /^\s*<Meta\b[^>]*\/>\s*$/;
// Layout wrappers around a table or a banner; the markdown inside stands alone.
const DIV = /^\s*<\/?div\b[^>]*>\s*$/;

export function mdxToMarkdown(source: string, ctx: MdxContext): string {
  const lines = source.split('\n');
  const idents = new Map<string, string>();
  const out: string[] = [];
  let inFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (FENCE.test(line)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }
    if (IMPORT_START.test(line)) {
      let stmt = line;
      while (!IMPORT_END.test(stmt) && i + 1 < lines.length)
        stmt += ` ${lines[++i].trim()}`;
      const m = NAMESPACE_IMPORT.exec(stmt) ?? DEFAULT_IMPORT.exec(stmt);
      if (m) idents.set(m[1], m[2]);
      continue;
    }
    if (META.test(line) || CONTROLS.test(line) || DIV.test(line)) continue;
    if (/^\{/.test(line)) {
      i = skipExpressionBlock(lines, i);
      continue;
    }
    const partial = MARKDOWN_PARTIAL.exec(line);
    if (partial) {
      const path = idents.get(partial[1]);
      if (path) out.push(ctx.readRaw(path).replace(/\n$/, ''));
      else
        ctx.warn(
          `llms.txt: <Markdown>{${partial[1]}}</Markdown> has no import`
        );
      continue;
    }
    const canvas = CANVAS.exec(line);
    if (canvas) {
      const path = idents.get(canvas[1]);
      const link = path && ctx.storyLink(path, canvas[2]);
      if (link) out.push(link);
      continue;
    }
    out.push(outsideCodeSpans(line, (text) => inlineExpressions(text, ctx)));
  }

  return out
    .join('\n')
    .replace(/\]\(\?path=/g, `](${ctx.site}/?path=`)
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+|\n+$/g, '');
}

/** Index of the last line of a `{ … }` block that starts at `start`; the block is JSX chrome and is dropped. */
function skipExpressionBlock(lines: string[], start: number): number {
  let depth = 0;
  for (let i = start; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
    }
    if (depth <= 0) return i;
  }
  return lines.length - 1;
}

function outsideCodeSpans(line: string, fn: (text: string) => string): string {
  return line
    .split(/(`[^`]*`)/)
    .map((part) => (part.startsWith('`') ? part : fn(part)))
    .join('');
}

const str = (v: string | boolean | undefined): string =>
  typeof v === 'string' ? v : v === undefined ? '' : String(v);

function inlineExpressions(text: string, ctx: MdxContext): string {
  const truthy = (not: string, name: string): boolean =>
    not === '!' ? !ctx.vars[name] : Boolean(ctx.vars[name]);
  return text
    .replace(
      /<a href=\{(\w+)\}>([^<]*)<\/a>/g,
      (_, name, label) => `[${label}](${str(ctx.vars[name])})`
    )
    .replace(
      /\s?\{\s*(!?)(\w+)\s*&&\s*([^{}]*?)\s*\}/g,
      (_, not, name, inner) => (truthy(not, name) ? ` ${inner}` : '')
    )
    .replace(
      /\{\s*(!?)(\w+)\s*\?\s*'([^']*)'\s*:\s*'([^']*)'\s*\}/g,
      (_, not, name, a, b) => (truthy(not, name) ? a : b)
    )
    .replace(/\{\s*(\w+)\s*\}/g, (whole, name) =>
      name in ctx.vars
        ? str(ctx.vars[name])
        : (ctx.warn(`llms.txt: dropped expression ${whole}`), '')
    )
    .replace(
      /\{[^{}]*\}/g,
      (whole) => (ctx.warn(`llms.txt: dropped expression ${whole}`), '')
    );
}
