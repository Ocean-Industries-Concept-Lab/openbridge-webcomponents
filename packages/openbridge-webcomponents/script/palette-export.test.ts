import {describe, expect, it} from 'vitest';
import {
  diffPaletteExports,
  parseTopLevelBlocks,
  stripPaletteExport,
} from './palette/export.js';

const EXPORT = `:root,
.obc-component-size-regular {
  --global-size-spacing-touch-target-min: 48px;
}
.obc-component-size-desktop {
  --global-size-spacing-touch-target-min: 40px;
}
.obc-component-size-40px visual target beta {
  --global-size-spacing-touch-target-min: 48px;
}
.obc-component-size-medium {
  --global-size-spacing-touch-target-min: 56px;
}
* {
  --typography-font-weight-regular: 370;
}
:root,
:root[data-obc-theme="day"] {
  --element-active-color: rgb(0, 0, 0);
}

@property --alarm-blink-on {
  syntax: "<number>";
  inherits: true;
  initial-value: 1;
}

@keyframes warning-blink {
  0% {
    --alarm-blink-on: 1;
  }
  50% {
    --alarm-blink-on: 0;
  }
}

:root {
  animation: warning-blink 4s infinite;
  animation-timing-function: steps(1);
}
`;

describe('parseTopLevelBlocks', () => {
  it('keeps nested braces inside the block body', () => {
    const blocks = parseTopLevelBlocks(EXPORT);
    expect(blocks.map((b) => b.selector)).toEqual([
      ':root,\n.obc-component-size-regular',
      '.obc-component-size-desktop',
      '.obc-component-size-40px visual target beta',
      '.obc-component-size-medium',
      '*',
      ':root,\n:root[data-obc-theme="day"]',
      '@property --alarm-blink-on',
      '@keyframes warning-blink',
      ':root',
    ]);
  });
});

describe('stripPaletteExport', () => {
  const {css, removed} = stripPaletteExport(EXPORT);

  it('drops the blink keyframes and the root animation, keeps @property', () => {
    expect(css).not.toContain('@keyframes');
    expect(css).not.toContain('animation:');
    expect(css).toContain('@property --alarm-blink-on');
  });

  it('drops size modes outside the four documented classes', () => {
    expect(css).not.toContain('desktop');
    expect(css).not.toContain('visual target beta');
    expect(css).toContain('.obc-component-size-regular');
    expect(css).toContain('.obc-component-size-medium');
  });

  it('keeps the theme and primitive blocks untouched', () => {
    expect(css).toContain(':root,\n:root[data-obc-theme="day"] {');
    expect(css).toContain('* {\n  --typography-font-weight-regular: 370;\n}');
  });

  it('names every removed block and is idempotent', () => {
    expect(removed).toHaveLength(4);
    expect(stripPaletteExport(css)).toEqual({css, removed: []});
  });
});

describe('diffPaletteExports', () => {
  it('reports renames, removals, additions and value changes per block', () => {
    const before = `:root { --a: 1px; --b: var(--x); --c: 2px; }`;
    const after = `:root { --a: 1px; --b2: var(\n  --x\n); --d: 3px; }\n* { --e: 1; }`;
    const diff = diffPaletteExports(before, after);
    expect(diff.renamed).toEqual([{block: ':root', from: '--b', to: '--b2'}]);
    expect(diff.removed.map((c) => c.name)).toEqual(['--b', '--c']);
    expect(diff.added.map((c) => `${c.block} ${c.name}`)).toEqual([
      ':root --b2',
      ':root --d',
      '* --e',
    ]);
    expect(diff.changed).toEqual([]);
    expect(
      diffPaletteExports(':root { --a: 1px; }', ':root { --a: 2px; }').changed
    ).toEqual([{block: ':root', name: '--a', before: '1px', after: '2px'}]);
  });
});
