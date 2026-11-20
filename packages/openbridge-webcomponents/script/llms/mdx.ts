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
import {fenceState} from './markdown.js';

export interface MdxContext {
  readRaw: (importPath: string) => string;
  storyLink: (
    storiesImportPath: string,
    exportName: string
  ) => string | undefined;
  /** The generated page for a Storybook docs route id, when there is one. */
  docsRoute?: (id: string) => string | undefined;
  site: string;
  vars: Record<string, string | boolean>;
  warn: (msg: string) => void;
}

const IMPORT_START = /^import\b/;
const IMPORT_END =
  /\bfrom\s+['"][^'"]+['"]\s*;?\s*(\/\/.*)?$|^import\s+['"][^'"]+['"]\s*;?\s*(\/\/.*)?$/;
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
  const fence = fenceState();
  // Prose keeps at most one blank line between blocks; code keeps its own.
  const push = (line: string) => {
    if (!fence.inFence && line === '' && out[out.length - 1] === '') return;
    out.push(line);
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (fence.update(line) || fence.inFence) {
      out.push(line);
      continue;
    }
    if (IMPORT_START.test(line)) {
      let stmt = line;
      // An import may wrap its bindings over blank lines; markdown that follows
      // an unfinished one (a heading, a tag) is where the statement ends.
      while (!IMPORT_END.test(stmt) && i + 1 < lines.length) {
        const next = lines[i + 1].trim();
        if (/^(#|<)/.test(next)) {
          ctx.warn(`llms.txt: unterminated import dropped: ${line}`);
          break;
        }
        i++;
        if (next) stmt += ` ${next}`;
      }
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
      if (path) {
        const partial = fenceState();
        for (const raw of ctx.readRaw(path).replace(/\n$/, '').split('\n')) {
          const delimiter = partial.update(raw);
          push(
            delimiter || partial.inFence
              ? raw
              : outsideCodeSpans(raw, (text) => storybookLinks(text, ctx))
          );
        }
      } else
        ctx.warn(
          `llms.txt: <Markdown>{${partial[1]}}</Markdown> has no import`
        );
      continue;
    }
    const canvas = CANVAS.exec(line);
    if (canvas) {
      const path = idents.get(canvas[1]);
      const link = path && ctx.storyLink(path, canvas[2]);
      if (link) push(link);
      continue;
    }
    push(
      outsideCodeSpans(line, (text) =>
        storybookLinks(inlineExpressions(text, ctx), ctx)
      )
    );
  }

  return out.join('\n').replace(/^\n+|\n+$/g, '');
}

/** A docs route gets its generated page when there is one; every other `?path=` link becomes absolute. */
function storybookLinks(text: string, ctx: MdxContext): string {
  return text
    .replace(/\]\(\?path=\/docs\/([\w-]+)--docs\)/g, (whole, id) => {
      const page = ctx.docsRoute?.(id);
      return page ? `](${page})` : whole;
    })
    .replace(/\]\(\?path=/g, `](${ctx.site}/?path=`);
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
