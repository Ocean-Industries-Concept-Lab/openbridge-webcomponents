import {describe, expect, it} from 'vitest';
import {stripComments} from './source-links.js';
import {
  mixinTokens,
  rampGaps,
  readPalette,
  readTokens,
  resolveLength,
} from './typography/ramp.js';

const VARIABLES = `:root,
.obc-component-size-regular {
  --global-typography-value-font-size: var(--font-size-100);
  --global-typography-value-line-height: 20px;
  --global-typography-value-font-weight: 570;
  --global-typography-label-font-size: 12px;
  --global-typography-title-font-size: 24px;
  --automation-components-typography-unit-font-size: var(--font-size-100);
}
.obc-component-size-medium {
  --global-typography-value-font-size: 22px;
  --global-typography-value-line-height: 24px;
  --global-typography-value-font-weight: 0;
  --global-typography-title-font-size: 32px;
  --automation-components-typography-unit-font-size: 24px;
}
.obc-component-size-large {
  --global-typography-value-font-size: 34px;
  --global-typography-value-line-height: 32px;
  --global-typography-label-font-size: 22px;
  --global-typography-title-font-size: 44px;
  --automation-components-typography-unit-font-size: 32px;
}
.obc-component-size-xl {
  --global-typography-value-font-size: 40px;
  --global-typography-value-line-height: 48px;
  --global-typography-label-font-size: 32px;
  --global-typography-title-font-size: 0.0px;
  --automation-components-typography-unit-font-size: var(--font-size-100);
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
@define-mixin empty-state {
  .icon {
    height: 96px;
  }
  .title {
    @mixin font-label;
  }
}
@define-mixin style $style, $wrapper: .x {
  outline: 1px solid var(--global-typography-title-font-size);
}
`;

const mixins = mixinTokens([MIXINS]);
const palette = readPalette(VARIABLES);

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

  it('reads the whole body, past a nested rule', () => {
    expect(mixins.get('empty-state')).toEqual(
      new Set(['--global-typography-label-font-size'])
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

  it('does not count a name in a TypeScript comment once comments are stripped', () => {
    const source =
      "// was --global-typography-title-font-size\nconst a = '--global-typography-value-font-size';";
    expect(readTokens(stripComments(source), mixins)).toEqual(
      new Set(['--global-typography-value-font-size'])
    );
  });
});

describe('readPalette', () => {
  it('finds the four blocks, the regular one shared with :root, and the primitives', () => {
    expect(
      palette.classes.regular.get('--global-typography-value-font-size')
    ).toBe('var(--font-size-100)');
    expect(palette.classes.xl.get('--global-typography-title-font-size')).toBe(
      '0.0px'
    );
    expect(palette.primitives.get('--font-size-100')).toBe('16px');
  });

  it('throws when a size class block is missing', () => {
    expect(() => readPalette(':root { --a: 1px; }')).toThrow(
      '.obc-component-size-regular'
    );
  });
});

describe('resolveLength', () => {
  it('follows var() to the primitive and reads its number and unit', () => {
    expect(
      resolveLength(
        'var(--font-size-100)',
        palette.classes.xl,
        palette.primitives
      )
    ).toEqual({n: 16, unit: 'px'});
    expect(
      resolveLength('0.0px', palette.classes.xl, palette.primitives)
    ).toEqual({n: 0, unit: 'px'});
    expect(
      resolveLength('normal', palette.classes.xl, palette.primitives)
    ).toBeUndefined();
  });
});

describe('rampGaps', () => {
  const readers = new Map([
    ['--global-typography-value-font-size', new Set(['a.css'])],
    ['--global-typography-value-line-height', new Set(['a.css'])],
    ['--global-typography-value-font-weight', new Set(['a.css'])],
    ['--global-typography-label-font-size', new Set(['b.css', 'c.ts'])],
    ['--global-typography-title-font-size', new Set(['d.css'])],
    ['--automation-components-typography-unit-font-size', new Set(['e.css'])],
    ['--component-local-font-size', new Set(['f.css'])],
  ]);

  it('reports a size token a class leaves undeclared, at 0 or smaller than the class before', () => {
    expect(rampGaps(readers, palette).gaps).toEqual([
      {
        token: '--global-typography-label-font-size',
        sizeClass: 'medium',
        kind: 'missing',
        value: undefined,
        sizes: undefined,
        readers: ['b.css', 'c.ts'],
      },
      {
        token: '--global-typography-title-font-size',
        sizeClass: 'xl',
        kind: 'zero',
        value: '0.0px',
        sizes: undefined,
        readers: ['d.css'],
      },
      {
        token: '--automation-components-typography-unit-font-size',
        sizeClass: 'xl',
        kind: 'shrinks',
        value: 'var(--font-size-100)',
        sizes: ['16px', '32px'],
        readers: ['e.css'],
      },
    ]);
  });

  it('ignores tokens that do not size text, and tokens no size class declares', () => {
    const {gaps} = rampGaps(
      new Map([
        ['--global-typography-value-font-weight', new Set(['a.css'])],
        ['--component-local-font-size', new Set(['f.css'])],
      ]),
      palette
    );
    expect(gaps).toEqual([]);
  });

  it('accepts a known gap only in the classes it names', () => {
    const {gaps, stale} = rampGaps(readers, palette, {
      '--global-typography-title-font-size': {
        classes: ['medium', 'xl'],
        reason: 'no XL value yet (#1422)',
      },
    });
    expect(gaps.map((g) => `${g.token} ${g.sizeClass}`)).not.toContain(
      '--global-typography-title-font-size xl'
    );
    expect(stale).toEqual([
      {
        token: '--global-typography-title-font-size',
        detail: 'it has a value in medium',
      },
    ]);
  });

  it('reports a reader a known gap does not list', () => {
    const {gaps, stale} = rampGaps(readers, palette, {
      '--global-typography-label-font-size': {
        classes: ['medium'],
        readers: ['b.css', 'gone.css'],
        reason: 'b.css reads it by design',
      },
    });
    expect(
      gaps.find((g) => g.token === '--global-typography-label-font-size')
        ?.readers
    ).toEqual(['c.ts']);
    expect(stale).toEqual([
      {
        token: '--global-typography-label-font-size',
        detail: 'gone.css no longer reads it',
      },
    ]);
  });

  it('flags an entry for a token nothing reads', () => {
    const {stale} = rampGaps(readers, palette, {
      '--global-typography-unread-font-size': {
        classes: ['xl'],
        reason: 'left over',
      },
    });
    expect(stale).toEqual([
      {
        token: '--global-typography-unread-font-size',
        detail: 'nothing reads it',
      },
    ]);
  });
});
