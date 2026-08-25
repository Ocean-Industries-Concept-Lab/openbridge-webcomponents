// script/compare-manifests.test.ts
import {describe, expect, it} from 'vitest';
import {compareManifests} from './compare-manifests.js';

const decl = (members: unknown[]) => ({
  modules: [
    {
      path: 'src/a.ts',
      declarations: [{kind: 'class', name: 'ObcA', tagName: 'obc-a', members}],
    },
  ],
});

describe('compareManifests', () => {
  it('reports no difference when only whitespace inside a description differs', () => {
    const a = decl([
      {kind: 'field', name: 'x', description: 'Line one\nline two'},
    ]);
    const b = decl([
      {kind: 'field', name: 'x', description: 'Line one line two'},
    ]);
    expect(compareManifests(a, b)).toEqual([]);
  });

  it('reports a missing member', () => {
    const a = decl([{kind: 'field', name: 'x', description: 'X'}]);
    const b = decl([]);
    expect(compareManifests(a, b)).toEqual([
      {path: 'src/a.ts > ObcA > members[x]', kind: 'missing'},
    ]);
  });

  it('reports a changed type', () => {
    const a = decl([{kind: 'field', name: 'x', type: {text: 'number'}}]);
    const b = decl([{kind: 'field', name: 'x', type: {text: 'string'}}]);
    expect(compareManifests(a, b)).toEqual([
      {
        path: 'src/a.ts > ObcA > members[x].type.text',
        kind: 'changed',
        before: 'number',
        after: 'string',
      },
    ]);
  });
});
