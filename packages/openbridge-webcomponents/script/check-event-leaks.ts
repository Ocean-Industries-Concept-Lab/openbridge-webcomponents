/**
 * @module EventLeakAudit
 * @description
 * Fails when a component lets a child's event out without saying so.
 *
 * A component that dispatches an event with `bubbles: true, composed: true`
 * sends it across every shadow root above it. When another component renders
 * that one inside its own shadow DOM, the event leaves the outer component
 * too — and reaches its consumers as an event the outer component never
 * documented (#1313: `obc-tab-row` re-reported a click as `tab-selected` and
 * let the item's `tab-click` out as well). The outer component has two honest
 * options, and this audit requires one of them for every such event:
 *
 * - **stop it** — a listener bound on the child in the template that calls
 *   `stopPropagation()`, directly or through the shared
 *   `stopPropagation` listener in `src/internal/events.ts`;
 * - **declare it** — a `@fires` tag on the outer class, which makes passing it
 *   on part of the component's API and gives the framework wrappers a binding.
 *
 * The event chain is followed through every level: an event one component
 * lets out undeclared is also checked on each component that renders it.
 *
 * Regex-based like `check-slot-event-docs.ts`, and conservative in the same
 * way: an event is counted only when the host itself dispatches it
 * (`this.dispatchEvent(new CustomEvent('name', …))`, inline or through a
 * variable) with a literal name and both flags written out.
 *
 * Usage:
 * ```bash
 * npm run lint:events
 * ```
 */
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {globby} from 'globby';

export interface ComponentEvents {
  tag: string;
  file: string;
  /** Events the class documents with `@fires` / `@event`. */
  fires: Set<string>;
  /** Events the host dispatches with `bubbles: true` and `composed: true`. */
  composed: Set<string>;
  /** `obc-*` elements its templates render. */
  children: Set<string>;
  /** Event names bound in its templates, and whether the listener stops them. */
  listeners: Map<string, boolean>;
}

export interface Leak {
  parent: string;
  file: string;
  event: string;
  /** The component that dispatched it, then every component it passed through. */
  from: string;
  /** Whether the parent listens for the event (and still lets it out). */
  handled: boolean;
}

function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

/** The text from the `(` at or after `from` to its matching `)`. */
function balanced(code: string, from: number, open = '(', close = ')'): string {
  const start = code.indexOf(open, from);
  if (start < 0) return '';
  let depth = 0;
  for (let i = start; i < code.length; i++) {
    if (code[i] === open) depth++;
    else if (code[i] === close && --depth === 0)
      return code.slice(start, i + 1);
  }
  return code.slice(start);
}

/** Body of a method `name(…) {…}` or an arrow field `name = (…) => {…}`. */
function memberBody(code: string, name: string): string {
  const method = new RegExp(
    `(?:^|[\\s;}])(?:private |protected |public |override |async |static )*${name}\\s*(?:<[^>]*>)?\\s*\\(`,
    'gm'
  );
  let m: RegExpExecArray | null;
  while ((m = method.exec(code)) !== null) {
    const params = balanced(code, m.index + m[0].length - 1);
    const after = m.index + m[0].length - 1 + params.length;
    const rest = code.slice(after, after + 200);
    const brace = rest.search(/\S/);
    if (brace >= 0 && rest[brace] === '{')
      return balanced(code, after, '{', '}');
    if (brace >= 0 && rest[brace] === ':') {
      const open = code.indexOf('{', after);
      if (open >= 0 && !/[;=]/.test(code.slice(after, open)))
        return balanced(code, open, '{', '}');
    }
  }
  const arrow = new RegExp(`\\b${name}\\s*=\\s*(?:async\\s*)?\\(`, 'g');
  while ((m = arrow.exec(code)) !== null) {
    const params = balanced(code, m.index + m[0].length - 1);
    const after = m.index + m[0].length - 1 + params.length;
    const rest = code.slice(after);
    const arrowAt = rest.indexOf('=>');
    if (arrowAt < 0) continue;
    const body = rest.slice(arrowAt + 2).trimStart();
    return body.startsWith('{')
      ? balanced(rest, arrowAt + 2, '{', '}')
      : body.split(/[;\n]/)[0];
  }
  return '';
}

function isStopping(handler: string, code: string): boolean {
  if (/stopPropagation/.test(handler)) return true;
  for (const ref of handler.matchAll(/this\.(\w+)/g)) {
    if (/stopPropagation/.test(memberBody(code, ref[1]))) return true;
  }
  return false;
}

/** Events dispatched on the host itself, inline or through a variable. */
function composedHostEvents(code: string): Set<string> {
  const events = new Set<string>();
  const ctor =
    /new\s+(?:Custom)?Event\s*(?:<(?:[^<>]|<[^<>]*>)*>)?\s*\(\s*['"]([^'"]+)['"]/g;
  let m: RegExpExecArray | null;
  while ((m = ctor.exec(code)) !== null) {
    const args = balanced(code, m.index + m[0].lastIndexOf('('));
    if (
      !/\bbubbles\s*:\s*true/.test(args) ||
      !/\bcomposed\s*:\s*true/.test(args)
    )
      continue;
    const before = code.slice(Math.max(0, m.index - 80), m.index);
    const inline = /this\.dispatchEvent\(\s*$/.test(before);
    const variable = /(?:const|let)\s+(\w+)\s*=\s*$/.exec(before);
    const viaVariable =
      variable !== null &&
      new RegExp(`this\\.dispatchEvent\\(\\s*${variable[1]}\\s*\\)`).test(code);
    if (inline || viaVariable) events.add(m[1]);
  }
  return events;
}

export function parseComponent(
  source: string,
  file: string
): ComponentEvents | null {
  const tag = /@customElement\(\s*['"]([^'"]+)['"]\s*\)/.exec(source)?.[1];
  if (!tag) return null;
  const code = stripComments(source);
  const fires = new Set(
    Array.from(
      source.matchAll(
        /@(?:fires|event)\s+(?:\{(?:[^{}]|\{[^{}]*\})*\}\s+)?([\w-]+)/g
      ),
      (m) => m[1]
    )
  );
  const children = new Set(
    Array.from(code.matchAll(/<(obc-[a-z0-9-]+)/g), (m) => m[1])
  );
  children.delete(tag);
  const listeners = new Map<string, boolean>();
  for (const m of code.matchAll(/@([a-z][\w-]*)=\$\{/g)) {
    const handler = balanced(code, m.index + m[0].length - 1, '{', '}');
    const stops = isStopping(handler, code);
    listeners.set(m[1], (listeners.get(m[1]) ?? true) && stops);
  }
  return {
    tag,
    file,
    fires,
    composed: composedHostEvents(code),
    children,
    listeners,
  };
}

export function findLeaks(components: ComponentEvents[]): Leak[] {
  const byTag = new Map(components.map((c) => [c.tag, c]));
  const escaping = new Map<string, Map<string, string>>();

  /** Event name → where it came from, for everything that leaves `tag`. */
  function leaving(tag: string, visiting: Set<string>): Map<string, string> {
    const known = escaping.get(tag);
    if (known) return known;
    const component = byTag.get(tag);
    const out = new Map<string, string>();
    if (!component || visiting.has(tag)) return out;
    visiting.add(tag);
    for (const event of component.composed) out.set(event, tag);
    for (const child of component.children) {
      for (const [event, from] of leaving(child, visiting)) {
        if (component.listeners.get(event)) continue;
        if (!out.has(event)) out.set(event, `${from} > ${tag}`);
      }
    }
    visiting.delete(tag);
    escaping.set(tag, out);
    return out;
  }

  const leaks: Leak[] = [];
  for (const parent of components) {
    const seen = new Set<string>();
    for (const child of parent.children) {
      for (const [event, from] of leaving(child, new Set())) {
        const stops = parent.listeners.get(event);
        if (stops || parent.fires.has(event) || seen.has(event)) continue;
        seen.add(event);
        leaks.push({
          parent: parent.tag,
          file: parent.file,
          event,
          from,
          handled: stops === false,
        });
      }
    }
  }
  return leaks;
}

async function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const files = await globby(['src/**/*.ts'], {
    cwd: root,
    ignore: [
      'src/**/*.stories.ts',
      'src/**/*.spec.ts',
      'src/**/*.test.ts',
      'src/icons/**',
      'src/generated/**',
    ],
  });
  const components = files
    .map((file) =>
      parseComponent(fs.readFileSync(path.join(root, file), 'utf8'), file)
    )
    .filter((c): c is ComponentEvents => c !== null);
  const leaks = findLeaks(components);
  for (const leak of leaks) {
    console.error(
      `${leak.file}: <${leak.parent}> lets "${leak.event}" (from ${leak.from}) out ` +
        `${leak.handled ? 'after handling it ' : ''}— stop it in the listener, or declare it with @fires`
    );
  }
  if (leaks.length > 0) {
    console.error(`\n${leaks.length} undeclared event(s) leave a component.`);
    process.exit(1);
  }
  console.log(
    `lint:events: ${components.length} components, no undeclared event leaves one.`
  );
}

if (
  process.argv[1] &&
  import.meta.url === new URL(`file://${process.argv[1]}`).href
) {
  await main();
}
