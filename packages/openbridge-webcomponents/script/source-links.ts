/**
 * The other source files a component's template reaches: the base class it
 * extends, and the modules whose functions render `obc-*` elements for it.
 *
 * A checker that reads one file at a time misses both — `obc-hydraulic-valve-4-3`
 * renders its `role="radiogroup"` in `ObcShuffleButtonBase`, and fifteen
 * instruments render their `<obc-readout>` through `renderInstrumentReadout()`
 * — so `check-apg-records.ts` and `check-event-leaks.ts` read these as part of
 * the component.
 */
import path from 'path';

/** Reads a source file by path, or null when it does not exist. */
export type Reader = (file: string) => string | null;

export interface LinkedSource {
  /** `base`: a class in the `extends` chain; `helper`: a module rendering `obc-*` elements. */
  kind: 'base' | 'helper';
  file: string;
  source: string;
}

export function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

/** Identifier → file for every value import from a relative module (`.js` resolved to `.ts`). */
export function relativeImports(
  source: string,
  file: string
): Map<string, string> {
  const out = new Map<string, string>();
  const re = /import\s+(?!type\s)([^;'"]*?)\s+from\s+['"](\.[^'"]+)['"]/g;
  for (const m of stripComments(source).matchAll(re)) {
    const target = path.join(path.dirname(file), m[2]).replace(/\.js$/, '.ts');
    for (const name of importedNames(m[1])) out.set(name, target);
  }
  return out;
}

function importedNames(clause: string): string[] {
  const names: string[] = [];
  const braces = /\{([^}]*)\}/.exec(clause);
  if (braces) {
    for (const part of braces[1].split(',')) {
      const name = part.trim().replace(/^type\s+/, '');
      if (!name) continue;
      names.push(
        name
          .split(/\s+as\s+/)
          .pop()!
          .trim()
      );
    }
  }
  const rest = clause
    .replace(/\{[^}]*\}/, '')
    .replace(/,/g, ' ')
    .trim();
  const star = /\*\s+as\s+(\w+)/.exec(rest);
  if (star) names.push(star[1]);
  else if (/^\w+$/.test(rest)) names.push(rest);
  return names;
}

/** The identifier after `extends`, when the class extends one directly rather than a mixin call. */
export function baseClassName(source: string): string | null {
  return (
    /\bclass\s+\w+\s+extends\s+([A-Za-z_$][\w$]*)\s*(?:<[^{]*>)?\s*\{/.exec(
      stripComments(source)
    )?.[1] ?? null
  );
}

/**
 * Every base class up the `extends` chain and every helper module a file
 * imports, transitively: a module counts as a helper when it registers no
 * element and renders `obc-*` elements. Modules that register an element are
 * components of their own and are not followed; every other relative import
 * is, since a helper may render through a helper of its own.
 */
export function linkedSources(
  source: string,
  file: string,
  read: Reader,
  visited = new Set<string>([file])
): LinkedSource[] {
  const out: LinkedSource[] = [];
  const imports = relativeImports(source, file);
  const base = baseClassName(source);
  const baseFile = base ? imports.get(base) : undefined;
  for (const target of new Set(imports.values())) {
    if (visited.has(target)) continue;
    const text = read(target);
    if (text === null) continue;
    const isBase = target === baseFile;
    if (!isBase && /@customElement\(/.test(text)) continue;
    visited.add(target);
    if (isBase || /<obc-/.test(stripComments(text))) {
      out.push({kind: isBase ? 'base' : 'helper', file: target, source: text});
    }
    out.push(...linkedSources(text, target, read, visited));
  }
  return out;
}
