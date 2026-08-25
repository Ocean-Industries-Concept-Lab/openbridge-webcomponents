// script/manifest-docs.test.ts
import {describe, expect, it} from 'vitest';
import {createManifestDocs} from '../.storybook/manifest-docs-core.js';

const manifest = {
  modules: [
    {
      path: 'src/building-blocks/external-scale/external-scale.ts',
      description: '# Scale\n\nDocs.',
      declarations: [{kind: 'function', name: 'render'}],
    },
    {
      path: 'src/x/x.ts',
      declarations: [
        {kind: 'class', name: 'ObcBase', description: 'Base docs.'},
        {
          kind: 'class',
          name: 'ObcX',
          tagName: 'obc-x',
          members: [
            {name: 'mode', availableWhenIf: {arg: 'kind', eq: 'linear'}},
            {name: 'plain'},
          ],
        },
      ],
    },
  ],
};
const {moduleDocs, classDocs, availableWhenEnhancer} = createManifestDocs(
  manifest as never
);

describe('manifest docs helpers', () => {
  it('reads module and class descriptions', () => {
    expect(moduleDocs('building-blocks/external-scale/external-scale.ts')).toBe(
      '# Scale\n\nDocs.'
    );
    expect(classDocs('ObcBase')).toBe('Base docs.');
    expect(classDocs('Nope')).toBe('');
  });
  it('adds if: from availableWhenIf without overriding a story-level if', () => {
    const ctx = {
      component: 'obc-x',
      argTypes: {mode: {name: 'mode'}, plain: {name: 'plain', if: {arg: 'z'}}},
    } as never;
    const out = availableWhenEnhancer(ctx);
    expect(out.mode.if).toEqual({arg: 'kind', eq: 'linear'});
    expect(out.plain.if).toEqual({arg: 'z'});
  });
});
