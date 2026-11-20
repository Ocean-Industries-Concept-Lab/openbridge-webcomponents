import fs from 'node:fs';
import path from 'node:path';
import {sanitize, storyNameFromExport, toId} from 'storybook/internal/csf';
import ts from 'typescript';
import {siteUrl, type Channel} from './channel.js';

/**
 * Stories as the docs generator sees them
 *
 * Read from the TypeScript AST rather than by regex: a story file's `title`
 * and `component` are literals (`storybook-title-case` keeps them so), and
 * the docs an agent can use are the JSDoc above an exported story or its
 * `parameters.docs.description`. Nothing here is Storybook's own index; it
 * runs before any build.
 */
export interface StoryInfo {
  exportName: string;
  name: string;
  doc: string | undefined;
}

export type DocsRef = {kind: 'moduleDocs' | 'classDocs'; arg: string};

export interface StoriesInfo {
  file: string;
  title: string | undefined;
  componentTag: string | undefined;
  componentDocs: string | DocsRef | undefined;
  stories: StoryInfo[];
}

export function docsPageUrl(ch: Channel, title: string): string {
  return siteUrl(ch, `/?path=/docs/${sanitize(title)}--docs`);
}

/** Storybook derives a story's id from its export name, whatever `name:` says. */
export function storyPageUrl(
  ch: Channel,
  title: string,
  exportName: string
): string {
  return siteUrl(
    ch,
    `/?path=/story/${toId(title, storyNameFromExport(exportName))}`
  );
}

export function storiesIndex(
  srcDir: string,
  warn: (msg: string) => void
): StoriesInfo[] {
  return fs
    .readdirSync(srcDir, {recursive: true, encoding: 'utf8'})
    .filter((f) => f.endsWith('.stories.ts'))
    .sort()
    .map((f) => readStoriesFile(path.join(srcDir, f), warn));
}

export function readStoriesFile(
  file: string,
  warn: (msg: string) => void
): StoriesInfo {
  const text = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.ES2022, true);
  const meta = metaObject(sf);

  let title: string | undefined;
  const titleNode = meta && property(meta, 'title');
  if (titleNode) {
    title = stringValue(titleNode);
    if (title === undefined) {
      warn(`llms.txt: ${file} has a non-literal title; no story links`);
    }
  }
  const componentNode = meta && property(meta, 'component');
  const docsNode =
    meta &&
    propertyPath(meta, ['parameters', 'docs', 'description', 'component']);

  return {
    file,
    title,
    componentTag: componentNode ? stringValue(componentNode) : undefined,
    componentDocs: docsNode ? docsValue(docsNode) : undefined,
    stories: exportedStories(sf, text),
  };
}

function unwrap(node: ts.Expression): ts.Expression {
  let n = node;
  for (;;) {
    if (ts.isSatisfiesExpression(n) || ts.isAsExpression(n)) n = n.expression;
    else if (ts.isParenthesizedExpression(n)) n = n.expression;
    else return n;
  }
}

function asObject(
  node: ts.Expression | undefined
): ts.ObjectLiteralExpression | undefined {
  if (!node) return undefined;
  const n = unwrap(node);
  return ts.isObjectLiteralExpression(n) ? n : undefined;
}

/** The default export's object literal, or the `const meta = {…}` it refers to. */
function metaObject(sf: ts.SourceFile): ts.ObjectLiteralExpression | undefined {
  for (const stmt of sf.statements) {
    if (!ts.isExportAssignment(stmt) || stmt.isExportEquals) continue;
    const direct = asObject(stmt.expression);
    if (direct) return direct;
    const expr = unwrap(stmt.expression);
    if (ts.isIdentifier(expr)) return variableObject(sf, expr.text);
  }
  return undefined;
}

function variableObject(
  sf: ts.SourceFile,
  name: string
): ts.ObjectLiteralExpression | undefined {
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (ts.isIdentifier(decl.name) && decl.name.text === name) {
        return asObject(decl.initializer);
      }
    }
  }
  return undefined;
}

function property(
  obj: ts.ObjectLiteralExpression,
  name: string
): ts.Expression | undefined {
  for (const p of obj.properties) {
    if (!ts.isPropertyAssignment(p)) continue;
    const key =
      ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)
        ? p.name.text
        : undefined;
    if (key === name) return p.initializer;
  }
  return undefined;
}

function propertyPath(
  obj: ts.ObjectLiteralExpression,
  names: string[]
): ts.Expression | undefined {
  let current: ts.ObjectLiteralExpression | undefined = obj;
  let value: ts.Expression | undefined;
  for (const name of names) {
    if (!current) return undefined;
    value = property(current, name);
    current = asObject(value);
  }
  return value;
}

function stringValue(node: ts.Expression): string | undefined {
  const n = unwrap(node);
  return ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)
    ? n.text
    : undefined;
}

function docsValue(node: ts.Expression): string | DocsRef | undefined {
  const text = stringValue(node);
  if (text !== undefined) return text;
  const n = unwrap(node);
  if (ts.isCallExpression(n) && ts.isIdentifier(n.expression)) {
    const kind = n.expression.text;
    const arg = n.arguments[0] && stringValue(n.arguments[0]);
    if ((kind === 'moduleDocs' || kind === 'classDocs') && arg !== undefined) {
      return {kind, arg};
    }
  }
  return undefined;
}

function exportedStories(sf: ts.SourceFile, text: string): StoryInfo[] {
  const stories: StoryInfo[] = [];
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    if (!stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword))
      continue;
    for (const decl of stmt.declarationList.declarations) {
      const obj = asObject(decl.initializer);
      if (!obj || !ts.isIdentifier(decl.name)) continue;
      const exportName = decl.name.text;
      const nameNode = property(obj, 'name');
      const name =
        (nameNode && stringValue(nameNode)) ?? storyNameFromExport(exportName);
      const storyDocs = propertyPath(obj, [
        'parameters',
        'docs',
        'description',
        'story',
      ]);
      const doc =
        firstParagraph(leadingJsDoc(text, stmt)) ??
        firstParagraph(storyDocs && stringValue(storyDocs));
      stories.push({exportName, name, doc});
    }
  }
  return stories;
}

function leadingJsDoc(text: string, node: ts.Node): string | undefined {
  const ranges = ts.getLeadingCommentRanges(text, node.getFullStart()) ?? [];
  const block = ranges
    .map((r) => text.slice(r.pos, r.end))
    .filter((raw) => raw.startsWith('/**'))
    .pop();
  return block
    ?.replace(/^\/\*\*/, '')
    .replace(/\*\/$/, '')
    .split('\n')
    .map((l) => l.replace(/^\s*\*\s?/, '').trimEnd())
    .join('\n');
}

function firstParagraph(text: string | undefined): string | undefined {
  if (!text) return undefined;
  const paragraph = text
    .trim()
    .split(/\n\s*\n/)[0]
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join(' ');
  return paragraph || undefined;
}
