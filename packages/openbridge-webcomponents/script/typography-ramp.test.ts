import {describe, expect, it} from 'vitest';
import {
  mixinTokens,
  rampGaps,
  readTokens,
  sizeClassBlocks,
} from './typography/ramp.js';

const VARIABLES = `:root,
.obc-component-size-regular {
  --global-typography-value-font-size: var(--font-size-100);
  --global-typography-value-line-height: 20px;
  --global-typography-value-font-weight: 570;
  --global-typography-label-font-size: 12px;
  --global-typography-title-font-size: 24px;
}
.obc-component-size-medium {
  --global-typography-value-font-size: 22px;
  --global-typography-value-line-height: 24px;
  --global-typography-value-font-weight: 0;
  --global-typography-title-font-size: 32px;
}
.obc-component-size-large {
  --global-typography-value-font-size: 34px;
  --global-typography-value-line-height: 32px;
  --global-typography-label-font-size: 22px;
  --global-typography-title-font-size: 44px;
}
.obc-component-size-xl {
  --global-typography-value-font-size: 40px;
  --global-typography-value-line-height: 48px;
  --global-typography-label-font-size: 32px;
  --global-typography-title-font-size: 0px;
}
* {
  --font-size-100: 16px;
}
`;

const MIXINS = `@define-mixin font-value {
  font-size: var(--global-typography-value-font-size);
  line-height: var(--global-typography-value-line-height);
  font-weight: var(--global-typography-value-font-weight);
}
@define-mixin font-label {
  font-size: var(--global-typography-label-font-size);
}
@define-mixin value-tag {
  @mixin font-label;
  color: red;
}
@define-mixin style $style, $wrapper: .x {
  outline: 1px solid var(--global-typography-title-font-size);
}
`;

const mixins = mixinTokens([MIXINS]);
const blocks = sizeClassBlocks(VARIABLES);

describe('mixinTokens', () => {
  it('collects the tokens of a mixin and of the mixins it applies', () => {
    expect(mixins.get('font-value')).toEqual(
      new Set([
        '--global-typography-value-font-size',
        '--global-typography-value-line-height',
        '--global-typography-value-font-weight',
      ])
    );
    expect(mixins.get('value-tag')).toEqual(
      new Set(['--global-typography-label-font-size'])
    );
    expect(mixins.get('style')).toEqual(
      new Set(['--global-typography-title-font-size'])
    );
  });
});

describe('readTokens', () => {
  it('reads var() uses, bare names in TypeScript and applied mixins', () => {
    expect(
      readTokens(
        '.a {\n  @mixin value-tag;\n  height: var(--global-typography-value-line-height);\n}\n',
        mixins
      )
    ).toEqual(
      new Set([
        '--global-typography-label-font-size',
        '--global-typography-value-line-height',
      ])
    );
    expect(
      readTokens(
        "const VALUE = {fontSizeVar: '--global-typography-value-font-size'};",
        mixins
      )
    ).toEqual(new Set(['--global-typography-value-font-size']));
  });
});

describe('sizeClassBlocks', () => {
  it('finds the four blocks, the regular one shared with :root', () => {
    expect(blocks.regular.get('--global-typography-value-font-size')).toBe(
      'var(--font-size-100)'
    );
    expect(blocks.xl.get('--global-typography-title-font-size')).toBe('0px');
  });

  it('throws when a size class block is missing', () => {
    expect(() => sizeClassBlocks(':root { --a: 1px; }')).toThrow(
      '.obc-component-size-regular'
    );
  });
});

describe('rampGaps', () => {
  const readers = new Map([
    ['--global-typography-value-font-size', new Set(['a.css'])],
    ['--global-typography-value-line-height', new Set(['a.css'])],
    ['--global-typography-value-font-weight', new Set(['a.css'])],
    ['--global-typography-label-font-size', new Set(['b.css', 'c.ts'])],
    ['--global-typography-title-font-size', new Set(['d.css'])],
  ]);

  it('reports a size token a block leaves undeclared or at 0, with its readers', () => {
    expect(rampGaps(readers, blocks).gaps).toEqual([
      {
        token: '--global-typography-label-font-size',
        sizeClass: 'medium',
        value: undefined,
        readers: ['b.css', 'c.ts'],
      },
      {
        token: '--global-typography-title-font-size',
        sizeClass: 'xl',
        value: '0px',
        readers: ['d.css'],
      },
    ]);
  });

  it('ignores tokens that do not size text, and tokens nothing reads', () => {
    const {gaps} = rampGaps(
      new Map([['--global-typography-value-font-weight', new Set(['a.css'])]]),
      blocks
    );
    expect(gaps).toEqual([]);
  });

  it('keeps a known gap out of the report and flags a stale entry', () => {
    const {gaps, stale} = rampGaps(readers, blocks, {
      '--global-typography-title-font-size': 'no XL value yet (#1422)',
      '--global-typography-value-font-size': 'filled since',
    });
    expect(gaps.map((g) => g.token)).toEqual([
      '--global-typography-label-font-size',
    ]);
    expect(stale).toEqual(['--global-typography-value-font-size']);
  });
});
