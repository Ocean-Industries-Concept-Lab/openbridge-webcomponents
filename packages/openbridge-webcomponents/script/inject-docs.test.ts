import {describe, expect, it} from 'vitest';
import {docsFromManifest, injectDts, injectSvelte} from './inject-docs.js';

const docs = docsFromManifest({
  modules: [
    {
      path: 'src/a.ts',
      declarations: [
        {
          kind: 'class',
          name: 'ObcA',
          members: [
            {
              kind: 'field',
              name: 'minValue',
              description: 'Minimum scale value (manual mode)',
            },
            {
              kind: 'field',
              name: 'mainTickmarks',
              description:
                'Values for main tickmarks.\nEmpty array means defaults.',
            },
            {
              kind: 'field',
              name: 'hidden',
              description: 'x',
              privacy: 'private',
            },
            {kind: 'method', name: 'render', description: 'no'},
          ],
        },
      ],
    },
  ],
});

describe('docsFromManifest', () => {
  it('excludes private and protected members', () => {
    const d = docsFromManifest({
      modules: [
        {
          path: 'src/b.ts',
          declarations: [
            {
              kind: 'class',
              name: 'ObcB',
              members: [
                {kind: 'field', name: 'visible', description: 'Visible field.'},
                {
                  kind: 'field',
                  name: 'secret',
                  description: 'x',
                  privacy: 'private',
                },
                {
                  kind: 'field',
                  name: 'guarded',
                  description: 'y',
                  privacy: 'protected',
                },
              ],
            },
          ],
        },
      ],
    });
    expect(d.get('ObcB')).toEqual(new Map([['visible', 'Visible field.']]));
  });
});

describe('injectDts', () => {
  it('adds JSDoc above undocumented fields of the declared class, once', () => {
    const src =
      'export declare class ObcA extends LitElement {\n    minValue: number;\n    /** kept */\n    maxValue: number;\n    mainTickmarks?: number[] | undefined;\n    render(): unknown;\n}\n';
    const once = injectDts(src, docs);
    expect(once).toBe(
      'export declare class ObcA extends LitElement {\n    /** Minimum scale value (manual mode) */\n    minValue: number;\n    /** kept */\n    maxValue: number;\n    /**\n     * Values for main tickmarks.\n     * Empty array means defaults.\n     */\n    mainTickmarks?: number[] | undefined;\n    render(): unknown;\n}\n'
    );
    expect(injectDts(once, docs)).toBe(once);
  });

  it('escapes a `*/` inside a description so the injected comment cannot close early', () => {
    const closeDocs = docsFromManifest({
      modules: [
        {
          path: 'src/c.ts',
          declarations: [
            {
              kind: 'class',
              name: 'ObcC',
              members: [
                {
                  kind: 'field',
                  name: 'note',
                  description: 'See the end marker `*/` here.',
                },
              ],
            },
          ],
        },
      ],
    });
    const src =
      'export declare class ObcC extends LitElement {\n    note: string;\n}\n';
    expect(injectDts(src, closeDocs)).toBe(
      'export declare class ObcC extends LitElement {\n    /** See the end marker `*\\/` here. */\n    note: string;\n}\n'
    );
  });

  it("does not inject into a nested type literal, e.g. a getter's inline return type", () => {
    const nestedDocs = docsFromManifest({
      modules: [
        {
          path: 'src/d.ts',
          declarations: [
            {
              kind: 'class',
              name: 'ObcD',
              members: [
                {kind: 'field', name: 'a', description: 'The real field.'},
              ],
            },
          ],
        },
      ],
    });
    const src =
      'export declare class ObcD extends LitElement {\n    a: number;\n    get icon(): {\n        a: string;\n        b: string;\n    } | null;\n}\n';
    expect(injectDts(src, nestedDocs)).toBe(
      'export declare class ObcD extends LitElement {\n    /** The real field. */\n    a: number;\n    get icon(): {\n        a: string;\n        b: string;\n    } | null;\n}\n'
    );
  });

  it('ignores a stray `{` inside an existing comment when tracking brace depth', () => {
    const secondDocs = docsFromManifest({
      modules: [
        {
          path: 'src/e.ts',
          declarations: [
            {
              kind: 'class',
              name: 'ObcE',
              members: [
                {
                  kind: 'field',
                  name: 'second',
                  description: 'The second field.',
                },
              ],
            },
          ],
        },
      ],
    });
    const src =
      'export declare class ObcE extends LitElement {\n    /**\n     * Example: press the { key to expand.\n     */\n    first: string;\n    second: number;\n}\n';
    const out = injectDts(src, secondDocs);
    expect(out).toBe(
      'export declare class ObcE extends LitElement {\n    /**\n     * Example: press the { key to expand.\n     */\n    first: string;\n    /** The second field. */\n    second: number;\n}\n'
    );
    expect(out.endsWith('}\n')).toBe(true);
  });
});

describe('injectSvelte', () => {
  it('adds JSDoc above undocumented Props members', () => {
    const src =
      'export interface Props {\n     class?: string;\n     minValue?: number;\n      /** kept */\nmaxValue?: number\n}';
    expect(injectSvelte(src, 'ObcA', docs)).toBe(
      'export interface Props {\n     class?: string;\n     /** Minimum scale value (manual mode) */\n     minValue?: number;\n      /** kept */\nmaxValue?: number\n}'
    );
  });
});
