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
            {name: 'size', availableWhenIf: {arg: 'stacked', truthy: true}},
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

  it('leaves the argType alone when the story does not set the gate arg', () => {
    const out = availableWhenEnhancer({
      component: 'obc-x',
      initialArgs: {mode: 'linear'},
      argTypes: {mode: {name: 'mode'}},
    } as never);
    expect(out.mode.if).toBeUndefined();
  });

  it('adds if: when the story sets the gate arg', () => {
    const out = availableWhenEnhancer({
      component: 'obc-x',
      initialArgs: {kind: 'linear', stacked: false},
      argTypes: {mode: {name: 'mode'}, size: {name: 'size'}},
    } as never);
    expect(out.mode.if).toEqual({arg: 'kind', eq: 'linear'});
    expect(out.size.if).toEqual({arg: 'stacked', truthy: true});
  });

  it('keeps a story-level if over the manifest condition', () => {
    const out = availableWhenEnhancer({
      component: 'obc-x',
      initialArgs: {kind: 'linear'},
      argTypes: {mode: {name: 'mode', if: {arg: 'other'}}},
    } as never);
    expect(out.mode.if).toEqual({arg: 'other'});
  });
});
