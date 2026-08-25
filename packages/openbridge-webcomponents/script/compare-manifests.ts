import fs from 'node:fs';

type Json = Record<string, unknown>;
export type Difference = {
  path: string;
  kind: 'missing' | 'extra' | 'changed';
  before?: unknown;
  after?: unknown;
};

const collapse = (s: unknown) =>
  typeof s === 'string' ? s.replace(/\s+/g, ' ').trim() : s;

function keyOf(item: Json): string {
  return String(item.name ?? item.tagName ?? item.path ?? JSON.stringify(item));
}

function diffValue(
  path: string,
  a: unknown,
  b: unknown,
  out: Difference[]
): void {
  if (Array.isArray(a) && Array.isArray(b)) {
    const byKey = (arr: unknown[]) =>
      new Map(arr.map((x) => [keyOf(x as Json), x as Json]));
    const ma = byKey(a);
    const mb = byKey(b);
    for (const [k, va] of ma) {
      const vb = mb.get(k);
      if (!vb) out.push({path: `${path}[${k}]`, kind: 'missing'});
      else diffValue(`${path}[${k}]`, va, vb, out);
    }
    for (const k of mb.keys()) {
      if (!ma.has(k)) out.push({path: `${path}[${k}]`, kind: 'extra'});
    }
    return;
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const keys = new Set([
      ...Object.keys(a as Json),
      ...Object.keys(b as Json),
    ]);
    for (const k of keys) {
      const va = (a as Json)[k];
      const vb = (b as Json)[k];
      const sub = path ? `${path}.${k}` : k;
      if (va === undefined) out.push({path: sub, kind: 'extra', after: vb});
      else if (vb === undefined)
        out.push({path: sub, kind: 'missing', before: va});
      else diffValue(sub, va, vb, out);
    }
    return;
  }
  const na = path.endsWith('description') ? collapse(a) : a;
  const nb = path.endsWith('description') ? collapse(b) : b;
  if (na !== nb) out.push({path, kind: 'changed', before: a, after: b});
}

export function compareManifests(a: Json, b: Json): Difference[] {
  const out: Difference[] = [];
  const mods = (m: Json) =>
    new Map(((m.modules as Json[]) ?? []).map((x) => [x.path as string, x]));
  const ma = mods(a);
  const mb = mods(b);
  for (const [p, modA] of ma) {
    const modB = mb.get(p);
    if (!modB) {
      out.push({path: p, kind: 'missing'});
      continue;
    }
    const da = (modA.declarations as Json[]) ?? [];
    const db = (modB.declarations as Json[]) ?? [];
    for (const declA of da) {
      const declB = db.find((d) => d.name === declA.name);
      const base = `${p} > ${declA.name}`;
      if (!declB) {
        out.push({path: base, kind: 'missing'});
        continue;
      }
      for (const key of [
        'members',
        'attributes',
        'events',
        'slots',
        'description',
      ]) {
        const va = declA[key] ?? (key === 'description' ? '' : []);
        const vb = declB[key] ?? (key === 'description' ? '' : []);
        diffValue(`${base} > ${key}`, va, vb, out);
      }
    }
  }
  for (const p of mb.keys()) if (!ma.has(p)) out.push({path: p, kind: 'extra'});
  return out;
}

if (process.argv[1] && process.argv[1].endsWith('compare-manifests.ts')) {
  const [, , fileA, fileB] = process.argv;
  const load = (f: string) => JSON.parse(fs.readFileSync(f, 'utf8')) as Json;
  const diffs = compareManifests(load(fileA), load(fileB));
  for (const d of diffs)
    console.log(
      `${d.kind.padEnd(8)} ${d.path}${d.kind === 'changed' ? `\n  - ${JSON.stringify(d.before)}\n  + ${JSON.stringify(d.after)}` : ''}`
    );
  console.log(`${diffs.length} difference(s)`);
  process.exitCode = diffs.length ? 1 : 0;
}
