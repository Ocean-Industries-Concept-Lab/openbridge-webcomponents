import fs from 'node:fs';
import path from 'node:path';
import {globSync} from 'glob';

type Member = {
  kind?: string;
  name: string;
  description?: string;
  privacy?: string;
};
type Manifest = {
  modules: Array<{
    declarations?: Array<{kind: string; name?: string; members?: Member[]}>;
  }>;
};

export function docsFromManifest(
  manifest: Manifest
): Map<string, Map<string, string>> {
  const out = new Map<string, Map<string, string>>();
  for (const mod of manifest.modules) {
    for (const d of mod.declarations ?? []) {
      if (d.kind !== 'class' || !d.name) continue;
      const fields = (d.members ?? []).filter(
        (m) =>
          m.kind === 'field' &&
          m.description &&
          m.privacy !== 'private' &&
          m.privacy !== 'protected'
      );
      out.set(
        d.name,
        new Map(fields.map((m) => [m.name, m.description as string]))
      );
    }
  }
  return out;
}

// A description may itself contain `*/` (e.g. quoting a code comment); escape
// it so the injected block comment can't be closed early by the payload.
const escapeComment = (s: string) => s.replace(/\*\//g, '*\\/');

function jsDocBlock(indent: string, description: string): string[] {
  const lines = escapeComment(description).split('\n');
  if (lines.length === 1) return [`${indent}/** ${lines[0]} */`];
  return [
    `${indent}/**`,
    ...lines.map((l) => `${indent} * ${l}`.replace(/\s+$/, '')),
    `${indent} */`,
  ];
}

// An identifier immediately followed by `(` (a method signature, e.g.
// `render(): unknown;`) can't also be immediately followed by `:`/`?:`, so
// FIELD_RE already excludes methods without a separate check.
const FIELD_RE =
  /^(\s*)(?:readonly |static |override |accessor )*([A-Za-z_$][\w$]*)\??:/;

// Net brace change on a line, used to track nesting depth. A comment line
// (a JSDoc/TSDoc continuation `* ...`, or a `/**`/`/*`/`//` opener) can
// never be a field line — FIELD_RE requires an identifier first — but its
// prose might contain a stray, unbalanced brace (e.g. "press the { key").
// Such lines are excluded so they can't desync the depth count for every
// line that follows; so are quoted literals (`mode: "{"`), which are types,
// not nesting.
const QUOTED_RE = /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g;
function braceDelta(line: string): number {
  const t = line.trim();
  if (t.startsWith('*') || t.startsWith('/*') || t.startsWith('//')) return 0;
  let delta = 0;
  for (const ch of line.replace(QUOTED_RE, '')) {
    if (ch === '{') delta++;
    else if (ch === '}') delta--;
  }
  return delta;
}

// The line index of the closing brace that matches the `{` opened on the
// class/interface header at `start`, tracked by depth so a nested type
// literal's own closing brace (e.g. a getter's inline object return type)
// is never mistaken for the body's end.
function findBodyEnd(lines: string[], start: number): number {
  let depth = braceDelta(lines[start]);
  let end = start + 1;
  while (end < lines.length) {
    depth += braceDelta(lines[end]);
    if (depth <= 0 && /^\s*\}/.test(lines[end])) return end;
    end++;
  }
  return end;
}

// The nearest preceding output line that isn't blank, trimmed — used to
// tell whether a member is already documented immediately above it.
function lastNonBlank(out: string[]): string {
  for (let j = out.length - 1; j >= 0; j--) {
    if (out[j].trim() !== '') return out[j].trim();
  }
  return '';
}

function injectMembers(
  lines: string[],
  from: number,
  to: number,
  docs: Map<string, string>
): string[] {
  const out: string[] = [];
  let depth = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i >= from && i < to) {
      // `depth` reflects nesting *before* this line's own braces are
      // applied, i.e. the body the line's content lives in. Only depth 1
      // (the class/interface's own direct members) is eligible — a nested
      // type literal (e.g. a getter's inline return type) sits at depth 2+
      // and must never be mistaken for a top-level field.
      if (i > from && depth === 1) {
        const m = FIELD_RE.exec(line);
        if (m && docs.has(m[2]) && !lastNonBlank(out).endsWith('*/')) {
          out.push(...jsDocBlock(m[1], docs.get(m[2]) as string));
        }
      }
      depth += braceDelta(line);
    }
    out.push(line);
  }
  return out;
}

export function injectDts(
  source: string,
  docsByClass: Map<string, Map<string, string>>
): string {
  let lines = source.split('\n');
  let i = 0;
  while (i < lines.length) {
    const m = /^export declare (?:abstract )?class (Obc\w+)/.exec(lines[i]);
    if (!m || !docsByClass.has(m[1])) {
      i++;
      continue;
    }
    const end = findBodyEnd(lines, i);
    const before = lines.length;
    lines = injectMembers(
      lines,
      i,
      end,
      docsByClass.get(m[1]) as Map<string, string>
    );
    i = end + (lines.length - before) + 1;
  }
  return lines.join('\n');
}

export function injectSvelte(
  source: string,
  className: string,
  docsByClass: Map<string, Map<string, string>>
): string {
  const docs = docsByClass.get(className);
  if (!docs) return source;
  const lines = source.split('\n');
  const start = lines.findIndex((l) => /export interface Props \{/.test(l));
  if (start < 0) return source;
  const end = findBodyEnd(lines, start);
  return injectMembers(lines, start, end, docs).join('\n');
}

function main() {
  const manifest = JSON.parse(
    fs.readFileSync('custom-elements.json', 'utf8')
  ) as Manifest;
  const docs = docsFromManifest(manifest);
  if (process.argv.includes('--dts')) {
    let n = 0;
    for (const f of globSync('dist/**/*.d.ts')) {
      const src = fs.readFileSync(f, 'utf8');
      const out = injectDts(src, docs);
      if (out !== src) {
        fs.writeFileSync(f, out);
        n++;
      }
    }
    console.log(`inject-docs: updated ${n} .d.ts file(s)`);
  } else if (process.argv.includes('--svelte')) {
    let n = 0;
    for (const f of globSync(
      '../openbridge-webcomponents-svelte/src/lib/**/*.svelte'
    )) {
      const src = fs.readFileSync(f, 'utf8');
      const out = injectSvelte(src, path.basename(f, '.svelte'), docs);
      if (out !== src) {
        fs.writeFileSync(f, out);
        n++;
      }
    }
    console.log(`inject-docs: updated ${n} .svelte file(s)`);
  } else {
    console.error('usage: tsx script/inject-docs.ts --dts | --svelte');
    process.exitCode = 2;
  }
}

if (process.argv[1] && /inject-docs\.ts$/.test(process.argv[1])) main();
