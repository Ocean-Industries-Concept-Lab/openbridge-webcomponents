import {describe, expect, it} from 'vitest';
import {
  baseClassName,
  linkedSources,
  relativeImports,
  type Reader,
} from './source-links.js';

const files: Record<string, string> = {
  'src/a/a.ts': `
import {Base} from '../base/base.js';
import {renderThing, type Options} from '../helpers/thing.js';
import type {Only} from '../helpers/types.js';
import {Other} from '../other/other.js';
import './side-effect.js';
@customElement('obc-a')
export class ObcA extends Base<string> {}
`,
  'src/base/base.ts': `
import {Root} from './root.js';
export class Base extends Root {
  render() { return html\`<obc-child @child-click=\${stopPropagation}></obc-child>\`; }
}
`,
  'src/base/root.ts': `export class Root extends LitElement {}`,
  'src/helpers/thing.ts': `
import {renderInner} from './inner.js';
export function renderThing() { return html\`<obc-thing></obc-thing>\${renderInner()}\`; }
`,
  'src/helpers/inner.ts': `export function renderInner() { return html\`<obc-inner></obc-inner>\`; }`,
  'src/helpers/types.ts': `export type Only = string;`,
  'src/other/other.ts': `
@customElement('obc-other')
export class ObcOther extends LitElement { render() { return html\`<obc-deep></obc-deep>\`; } }
`,
};
const read: Reader = (file) => files[file] ?? null;

describe('relativeImports', () => {
  it('maps every value import to its .ts file and skips type and side-effect imports', () => {
    expect(
      Object.fromEntries(relativeImports(files['src/a/a.ts'], 'src/a/a.ts'))
    ).toEqual({
      Base: 'src/base/base.ts',
      renderThing: 'src/helpers/thing.ts',
      Options: 'src/helpers/thing.ts',
      Other: 'src/other/other.ts',
    });
  });

  it('reads renamed, default and namespace imports', () => {
    expect(
      Object.fromEntries(
        relativeImports(
          "import Def, {a as b} from './x.js';\nimport * as ns from './y.js';",
          'src/f.ts'
        )
      )
    ).toEqual({Def: 'src/x.ts', b: 'src/x.ts', ns: 'src/y.ts'});
  });
});

describe('baseClassName', () => {
  it('reads a direct base, generic or not, and not a mixin call', () => {
    expect(baseClassName('class A extends Base<string> {}')).toBe('Base');
    expect(baseClassName('class A extends Base {}')).toBe('Base');
    expect(baseClassName('class A extends Mixin(LitElement) {}')).toBeNull();
  });
});

describe('linkedSources', () => {
  it('follows the base chain and the helpers that render elements, not other components', () => {
    const linked = linkedSources(files['src/a/a.ts'], 'src/a/a.ts', read);
    expect(linked.map((l) => `${l.kind}:${l.file}`)).toEqual([
      'base:src/base/base.ts',
      'base:src/base/root.ts',
      'helper:src/helpers/thing.ts',
      'helper:src/helpers/inner.ts',
    ]);
  });
});
