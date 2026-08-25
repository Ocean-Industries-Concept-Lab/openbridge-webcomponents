import fs from 'node:fs';
import path from 'node:path';
import {globSync} from 'glob';

type Member = {kind?: string; name: string; description?: string; privacy?: string};
type Manifest = {modules: Array<{declarations?: Array<{kind: string; name?: string; members?: Member[]}>}>};

export function docsFromManifest(manifest: Manifest): Map<string, Map<string, string>> {
  const out = new Map<string, Map<string, string>>();
  for (const mod of manifest.modules) {
    for (const d of mod.declarations ?? []) {
      if (d.kind !== 'class' || !d.name) continue;
      const fields = (d.members ?? []).filter((m) => m.kind === 'field' && m.description && m.privacy !== 'private' && m.privacy !== 'protected');
      out.set(d.name, new Map(fields.map((m) => [m.name, m.description as string])));
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
  return [`${indent}/**`, ...lines.map((l) => `${indent} * ${l}`.replace(/\s+$/, '')), `${indent} */`];
}

const FIELD_RE = /^(\s*)(?:readonly |static |override |accessor )*([A-Za-z_$][\w$]*)\??:/;

function injectMembers(lines: string[], from: number, to: number, docs: Map<string, string>): string[] {
  const out: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i > from && i < to) {
      const m = FIELD_RE.exec(line);
      const prev = out.length ? out[out.length - 1].trim() : '';
      if (m && docs.has(m[2]) && !prev.endsWith('*/') && !/\(/.test(line.slice(0, line.indexOf(':')))) {
        out.push(...jsDocBlock(m[1], docs.get(m[2]) as string));
      }
    }
    out.push(line);
  }
  return out;
}

export function injectDts(source: string, docsByClass: Map<string, Map<string, string>>): string {
  let lines = source.split('\n');
  let i = 0;
  while (i < lines.length) {
    const m = /^export declare (?:abstract )?class (Obc\w+)/.exec(lines[i]);
    if (!m || !docsByClass.has(m[1])) { i++; continue; }
    let end = i + 1;
    while (end < lines.length && !/^}/.test(lines[end])) end++;
    const before = lines.length;
    lines = injectMembers(lines, i, end, docsByClass.get(m[1]) as Map<string, string>);
    i = end + (lines.length - before) + 1;
  }
  return lines.join('\n');
}

export function injectSvelte(source: string, className: string, docsByClass: Map<string, Map<string, string>>): string {
  const docs = docsByClass.get(className);
  if (!docs) return source;
  const lines = source.split('\n');
  const start = lines.findIndex((l) => /export interface Props \{/.test(l));
  if (start < 0) return source;
  let end = start + 1;
  while (end < lines.length && !/^\s*\}/.test(lines[end])) end++;
  return injectMembers(lines, start, end, docs).join('\n');
}

function main() {
  const manifest = JSON.parse(fs.readFileSync('custom-elements.json', 'utf8')) as Manifest;
  const docs = docsFromManifest(manifest);
  if (process.argv.includes('--dts')) {
    let n = 0;
    for (const f of globSync('dist/**/*.d.ts')) {
      const src = fs.readFileSync(f, 'utf8');
      const out = injectDts(src, docs);
      if (out !== src) { fs.writeFileSync(f, out); n++; }
    }
    console.log(`inject-docs: updated ${n} .d.ts file(s)`);
  } else if (process.argv.includes('--svelte')) {
    let n = 0;
    for (const f of globSync('../openbridge-webcomponents-svelte/src/lib/**/*.svelte')) {
      const src = fs.readFileSync(f, 'utf8');
      const out = injectSvelte(src, path.basename(f, '.svelte'), docs);
      if (out !== src) { fs.writeFileSync(f, out); n++; }
    }
    console.log(`inject-docs: updated ${n} .svelte file(s)`);
  } else {
    console.error('usage: tsx script/inject-docs.ts --dts | --svelte');
    process.exitCode = 2;
  }
}

if (process.argv[1] && /inject-docs\.ts$/.test(process.argv[1])) main();
