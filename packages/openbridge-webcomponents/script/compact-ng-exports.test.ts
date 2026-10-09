import {describe, expect, it} from 'vitest';
import {compactNgExports} from './compact-ng-exports.mjs';

const bundle = './fesm2022/oicl-openbridge-webcomponents-ng';

function entry(name: string) {
  return {types: `./${name}/index.d.ts`, default: `${bundle}-${name}.mjs`};
}

const packageJson = {
  name: '@oicl/openbridge-webcomponents-ng',
  exports: {
    './package.json': {default: './package.json'},
    '.': {types: './index.d.ts', default: `${bundle}.mjs`},
    './obc-button': entry('obc-button'),
    './obi-02-illustration': entry('obi-02-illustration'),
  },
};

describe('compactNgExports', () => {
  it('replaces matching entry points with one pattern', () => {
    const {packageJson: result, collapsed} = compactNgExports(packageJson);
    expect(collapsed).toBe(2);
    expect(result.exports).toEqual({
      './package.json': {default: './package.json'},
      '.': {types: './index.d.ts', default: `${bundle}.mjs`},
      './*': {types: './*/index.d.ts', default: `${bundle}-*.mjs`},
    });
  });

  it('keeps entries the pattern would resolve differently', () => {
    const odd = {
      ...packageJson,
      exports: {
        ...packageJson.exports,
        './nested/entry': entry('nested/entry'),
        './with-style': {...entry('with-style'), style: './style.css'},
        './renamed': {
          types: './renamed/index.d.ts',
          default: `${bundle}-other.mjs`,
        },
      },
    };
    const {packageJson: result, collapsed} = compactNgExports(odd);
    expect(collapsed).toBe(2);
    expect(Object.keys(result.exports)).toEqual([
      './package.json',
      '.',
      './nested/entry',
      './with-style',
      './renamed',
      './*',
    ]);
  });

  it('is a no-op on an already compacted manifest', () => {
    const once = compactNgExports(packageJson).packageJson;
    const twice = compactNgExports(once);
    expect(twice.collapsed).toBe(0);
    expect(twice.packageJson).toBe(once);
  });

  it('refuses a manifest without the expected main bundle', () => {
    expect(() => compactNgExports({exports: {}})).toThrow(/main export/);
  });
});
