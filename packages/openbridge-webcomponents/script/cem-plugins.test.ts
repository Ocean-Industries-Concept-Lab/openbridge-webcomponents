// script/cem-plugins.test.ts
import {describe, expect, it} from 'vitest';
import {create, ts} from '@custom-elements-manifest/analyzer';
// @ts-expect-error - untyped JavaScript modules
import {
  availableWhenPlugin,
  parseCondition,
} from './cem-plugins/available-when.mjs';
// @ts-expect-error - untyped JavaScript modules
import {moduleDocsPlugin} from './cem-plugins/module-docs.mjs';
// `create()` alone never registers a tagName or builds `attributes[]` for a
// `@customElement()`-decorated class — that wiring lives entirely in the lit
// framework plugin, which the real `analyze` script loads via `litelement:
// true` (see custom-elements-manifest.config.mjs). Load the same plugin here
// so this test exercises ours the way production does.
// @ts-expect-error - untyped JavaScript modules
import {litPlugin} from '@custom-elements-manifest/analyzer/src/features/framework-plugins/lit/lit.js';

const sf = (name: string, code: string) =>
  ts.createSourceFile(name, code, ts.ScriptTarget.ES2020, true);
const analyze = (files: Record<string, string>) =>
  create({
    modules: Object.entries(files).map(([n, c]) => sf(n, c)),
    plugins: [...litPlugin(), availableWhenPlugin(), moduleDocsPlugin()],
    context: {dev: false},
  }) as any;
const decl = (m: any, tag: string) =>
  m.modules
    .flatMap((x: any) => x.declarations ?? [])
    .find((d: any) => d.tagName === tag);

describe('parseCondition', () => {
  it('maps the single-test forms', () => {
    const no = () => undefined;
    expect(parseCondition('flag==true', no)).toEqual({
      arg: 'flag',
      truthy: true,
    });
    expect(parseCondition('flag!=true', no)).toEqual({
      arg: 'flag',
      truthy: false,
    });
    expect(parseCondition('x!=undefined', no)).toEqual({
      arg: 'x',
      exists: true,
    });
    expect(parseCondition("label!=''", no)).toEqual({
      arg: 'label',
      truthy: true,
    });
    expect(parseCondition('items==[]', no)).toEqual({arg: 'items', eq: []});
    expect(parseCondition('n==3', no)).toEqual({arg: 'n', eq: 3});
    expect(
      parseCondition('type==linear', (id) =>
        id === 'linear' ? 'linear' : undefined
      )
    ).toEqual({arg: 'type', eq: 'linear'});
  });
  it('leaves compound, membership and unresolved enum conditions unmapped', () => {
    const no = () => undefined;
    expect(parseCondition('a==true && b==true', no)).toBeUndefined();
    expect(parseCondition('type in [A, B]', no)).toBeUndefined();
    expect(parseCondition('type==linear', no)).toBeUndefined();
  });
});

describe('availableWhenPlugin', () => {
  const src = `
import {LitElement} from 'lit';
import {property} from 'lit/decorators.js';
export enum Kind { linear = 'linear', circular = 'circular' }
/**
 * Thing.
 *
 * @property mode - The mode.
 * @availableWhen mode kind==linear
 * @availableWhen size hasSize==true
 * @stable
 */
@customElement('obc-thing')
export class ObcThing extends LitElement {
  @property({type: String}) kind: Kind = Kind.linear;
  @property({type: String}) mode = 'a';
  @property({type: Boolean}) hasSize = false;
  @property({type: Number}) size = 0;
}
`;
  it('attaches availableWhen, availableWhenIf and the description sentence', () => {
    const d = decl(analyze({'src/thing.ts': src}), 'obc-thing');
    const mode = d.members.find((m: any) => m.name === 'mode');
    expect(mode.availableWhen).toBe('kind==linear');
    expect(mode.availableWhenIf).toEqual({arg: 'kind', eq: 'linear'});
    expect(mode.description).toBe(
      'The mode.\n\nAvailable when `kind==linear`.'
    );
    expect(
      d.attributes.find((a: any) => a.fieldName === 'mode').description
    ).toContain('Available when');
    expect(
      d.members.find((m: any) => m.name === 'size').availableWhenIf
    ).toEqual({arg: 'hasSize', truthy: true});
  });
  it('propagates to subclasses through inheritance', () => {
    const base = src
      .replace(
        "@customElement('obc-thing')\nexport class ObcThing",
        'export class ObcBase'
      )
      .replace(/export enum[^\n]*\n/, '');
    const sub = `import {ObcBase} from './base.js';\n/** Sub. @stable */\n@customElement('obc-sub')\nexport class ObcSub extends ObcBase {}\n`;
    const d = decl(
      analyze({
        'src/base.ts': base + "\nexport enum Kind { linear = 'linear' }\n",
        'src/sub.ts': sub,
      }),
      'obc-sub'
    );
    expect(
      d.members.find((m: any) => m.name === 'size').availableWhenIf
    ).toEqual({arg: 'hasSize', truthy: true});
  });
  it('applies availableWhen to mixin members and propagates through a mixin consumer', () => {
    const mixinSrc = `
import {LitElement} from 'lit';
import {property} from 'lit/decorators.js';
export function ThingMixin(superClass) {
  class ThingMixinClass extends superClass {
    /** @availableWhen hasSize==true */
    @property({type: Number}) size = 0;
    @property({type: Boolean}) hasSize = false;
  }
  return ThingMixinClass;
}
`;
    const userSrc = `import {LitElement} from 'lit';\nimport {ThingMixin} from './thing-mixin.js';\n/** User. @stable */\n@customElement('obc-user')\nexport class ObcUser extends ThingMixin(LitElement) {}\n`;
    const d = decl(
      analyze({'src/thing-mixin.ts': mixinSrc, 'src/user.ts': userSrc}),
      'obc-user'
    );
    expect(
      d.members.find((m: any) => m.name === 'size').availableWhenIf
    ).toEqual({arg: 'hasSize', truthy: true});
  });
  it('applies the sentence exactly once when a property carries both a class-level and a field-level tag', () => {
    const both = src.replace(
      "@property({type: String}) mode = 'a';",
      "/** @availableWhen kind==linear */\n  @property({type: String}) mode = 'a';"
    );
    const d = decl(analyze({'src/thing-both.ts': both}), 'obc-thing');
    const mode = d.members.find((m: any) => m.name === 'mode');
    expect((mode.description.match(/Available when/g) ?? []).length).toBe(1);
    expect(mode.description).toBe(
      'The mode.\n\nAvailable when `kind==linear`.'
    );
  });
});

describe('moduleDocsPlugin', () => {
  it('captures the leading @module block into module.description', () => {
    const m = analyze({
      'src/scale.ts':
        '/**\n * @module External Scale\n *\n * Renders scales.\n *\n * ## Usage\n * Call `render()`.\n */\nexport function render() { return 1; }\n',
    });
    expect(m.modules[0].summary).toBe('External Scale');
    expect(m.modules[0].description).toBe(
      'Renders scales.\n\n## Usage\nCall `render()`.'
    );
  });
});
