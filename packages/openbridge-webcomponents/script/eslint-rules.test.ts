import {describe, expect, it} from 'vitest';
import {ESLint, RuleTester} from 'eslint';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import tsParser from '@typescript-eslint/parser';

// @ts-expect-error - eslint.config.mjs is untyped JavaScript.
import {__testables} from '../eslint.config.mjs';

const {openbridgePlugin, extractComponents, pinComponentIndex} = __testables;

// The story rule resolves meta.component through a cross-file index. Pin it so
// the tests describe the rule's behaviour rather than the current state of src/.
pinComponentIndex({
  'obc-stable-thing': ['stable'],
  'obc-beta-thing': ['beta'],
  'obc-experimental-thing': ['experimental'],
  'obc-deprecated-thing': ['deprecated'],
  'obc-untagged-thing': [],
  'obc-ambiguous-thing': ['beta', 'deprecated'],
});

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
});

function story(body: string) {
  return `const meta = {\n${body}\n} satisfies Meta;\nexport default meta;\n`;
}

describe('extractComponents', () => {
  it('reads the lifecycle tag from a class JSDoc block', () => {
    expect(
      extractComponents(
        `/**\n * Does a thing.\n * @stable\n */\n@customElement('obc-thing')\nexport class Thing {}`
      )
    ).toMatchObject([{tag: 'obc-thing', tags: ['stable']}]);
  });

  it('tolerates a blank line between the JSDoc and the decorator', () => {
    expect(
      extractComponents(
        `/**\n * @beta\n */\n\n@customElement('obc-thing')\nexport class Thing {}`
      )
    ).toMatchObject([{tag: 'obc-thing', tags: ['beta']}]);
  });

  it('ignores a tag in a plain block comment, which is not JSDoc', () => {
    expect(
      extractComponents(
        `/* Thing\n * @deprecated\n */\n@customElement('obc-thing')\nexport class Thing {}`
      )
    ).toMatchObject([{tag: 'obc-thing', tags: []}]);
  });

  it('does not stretch an earlier JSDoc block across intervening code', () => {
    expect(
      extractComponents(
        `/**\n * @stable\n */\nexport enum Size {}\n\n/* Thing */\n@customElement('obc-thing')\nexport class Thing {}`
      )
    ).toMatchObject([{tag: 'obc-thing', tags: []}]);
  });

  it('ignores a decorator written inside a JSDoc code fence', () => {
    expect(
      extractComponents(
        `/**\n * \`\`\`js\n * @customElement('my-element')\n * \`\`\`\n */\nexport const customElement = () => {};`
      )
    ).toEqual([]);
  });

  it('reports every lifecycle tag when a class declares more than one', () => {
    expect(
      extractComponents(
        `/**\n * @beta\n * @deprecated\n */\n@customElement('obc-thing')\nexport class Thing {}`
      )
    ).toMatchObject([{tag: 'obc-thing', tags: ['beta', 'deprecated']}]);
  });

  it('finds several components in one file', () => {
    expect(
      extractComponents(
        `/**\n * @stable\n */\n@customElement('obc-a')\nexport class A {}\n\n/**\n * @beta\n */\n@customElement('obc-b')\nexport class B {}`
      ).map((component: {tag: string; tags: string[]}) => [
        component.tag,
        component.tags,
      ])
    ).toEqual([
      ['obc-a', ['stable']],
      ['obc-b', ['beta']],
    ]);
  });
});

describe('openbridge/component-lifecycle-tag', () => {
  it('accepts and rejects the right shapes', () => {
    ruleTester.run(
      'component-lifecycle-tag',
      openbridgePlugin.rules['component-lifecycle-tag'],
      {
        valid: [
          `/**\n * @stable\n */\n@customElement('obc-thing')\nexport class Thing {}`,
          `/**\n * @deprecated\n */\n@customElement('obc-thing')\nexport class Thing {}`,
          `export class NotAComponent {}`,
        ],
        invalid: [
          {
            code: `/**\n * Does a thing.\n */\n@customElement('obc-thing')\nexport class Thing {}`,
            errors: [{message: /has no lifecycle tag/ as unknown as string}],
          },
          {
            code: `@customElement('obc-thing')\nexport class Thing {}`,
            errors: [{message: /has no lifecycle tag/ as unknown as string}],
          },
          {
            code: `/**\n * @beta\n * @deprecated\n */\n@customElement('obc-thing')\nexport class Thing {}`,
            errors: [
              {
                message:
                  /declares more than one lifecycle tag/ as unknown as string,
              },
            ],
          },
        ],
      }
    );
  });
});

describe('openbridge/story-lifecycle-tags', () => {
  it('accepts and fixes the right shapes', () => {
    ruleTester.run(
      'story-lifecycle-tags',
      openbridgePlugin.rules['story-lifecycle-tags'],
      {
        valid: [
          // @stable emits no tag.
          story(`  title: 'A/B',\n  component: 'obc-stable-thing',`),
          story(
            `  title: 'A/B',\n  tags: ['autodocs', '6.0'],\n  component: 'obc-stable-thing',`
          ),
          // Already correct.
          story(
            `  title: 'A/B',\n  tags: ['autodocs', 'experimental'],\n  component: 'obc-experimental-thing',`
          ),
          // No meta.component: the pure-function-module pattern.
          story(`  title: 'A/B',\n  tags: ['autodocs'],`),
          // Unresolvable, or ambiguous, components are the source rule's job.
          story(`  title: 'A/B',\n  component: 'obc-untagged-thing',`),
          story(`  title: 'A/B',\n  component: 'obc-ambiguous-thing',`),
          story(`  title: 'A/B',\n  component: 'obc-unknown-thing',`),
          // A story-level tags array is not meta.tags.
          `const meta = {title: 'A/B', component: 'obc-stable-thing'} satisfies Meta;\nexport const Story = {tags: ['skip-test']};\n`,
        ],
        invalid: [
          {
            code: story(
              `  title: 'A/B',\n  tags: ['autodocs', '6.0'],\n  component: 'obc-experimental-thing',`
            ),
            output: story(
              `  title: 'A/B',\n  tags: ['autodocs', '6.0', 'experimental'],\n  component: 'obc-experimental-thing',`
            ),
            errors: 1,
          },
          {
            // The retired `wip` / `alpha` names are replaced, order preserved.
            code: story(
              `  title: 'A/B',\n  tags: ['autodocs', 'wip', '6.1'],\n  component: 'obc-experimental-thing',`
            ),
            output: story(
              `  title: 'A/B',\n  tags: ['autodocs', '6.1', 'experimental'],\n  component: 'obc-experimental-thing',`
            ),
            errors: 1,
          },
          {
            code: story(
              `  title: 'A/B',\n  tags: ['alpha'],\n  component: 'obc-beta-thing',`
            ),
            output: story(
              `  title: 'A/B',\n  tags: ['beta'],\n  component: 'obc-beta-thing',`
            ),
            errors: 1,
          },
          {
            // A @stable component must shed a stale lifecycle tag; the whole
            // property goes when nothing else is left in it.
            code: story(
              `  title: 'A/B',\n  tags: ['wip'],\n  component: 'obc-stable-thing',`
            ),
            output: story(`  title: 'A/B',\n  component: 'obc-stable-thing',`),
            errors: 1,
          },
          {
            code: story(
              `  title: 'A/B',\n  tags: ['autodocs', 'wip'],\n  component: 'obc-stable-thing',`
            ),
            output: story(
              `  title: 'A/B',\n  tags: ['autodocs'],\n  component: 'obc-stable-thing',`
            ),
            errors: 1,
          },
          {
            // No tags property at all: one is inserted after title.
            code: story(`  title: 'A/B',\n  component: 'obc-beta-thing',`),
            output: story(
              `  title: 'A/B',\n  tags: ['beta'],\n  component: 'obc-beta-thing',`
            ),
            errors: 1,
          },
          {
            // No title either: inserted as the first property.
            code: story(`  component: 'obc-deprecated-thing',`),
            output: story(
              `  tags: ['deprecated'],\n  component: 'obc-deprecated-thing',`
            ),
            errors: 1,
          },
          {
            // A plain `const meta = {…}` with no `satisfies` clause.
            code: `const meta = {\n  title: 'A/B',\n  component: 'obc-deprecated-thing',\n};\nexport default meta;\n`,
            output: `const meta = {\n  title: 'A/B',\n  tags: ['deprecated'],\n  component: 'obc-deprecated-thing',\n};\nexport default meta;\n`,
            errors: 1,
          },
        ],
      }
    );
  });
});

// Directives aimed at rules this tester does not load would otherwise be
// reported as unused.
const quietTester = new RuleTester({
  languageOptions: {parser: tsParser, ecmaVersion: 2020, sourceType: 'module'},
  linterOptions: {reportUnusedDisableDirectives: 'off'},
});

describe('openbridge/suppression-reason', () => {
  it('requires a reason on a directive that names its rules', () => {
    quietTester.run(
      'suppression-reason',
      openbridgePlugin.rules['suppression-reason'],
      {
        valid: [
          '// eslint-disable-next-line no-console -- logs only in the demo\nconsole.log(1);',
          '/* eslint-disable no-console, no-debugger -- a debugging script */\nconsole.log(1);',
          'console.log(1); // eslint-disable-line no-console -- demo output',
          '// eslint-enable no-console\nconsole.log(1);',
          '// a comment that mentions eslint-disable in passing\nconst a = 1;',
          "const s = '// eslint-disable-next-line no-console';",
        ],
        invalid: [
          {
            code: '// eslint-disable-next-line no-console\nconsole.log(1);',
            errors: [{message: /reason after ` -- `/}],
          },
          {
            code: '/* eslint no-console: "off" */\nconsole.log(1);',
            errors: [{message: /not in an inline comment/}],
          },
        ],
      }
    );
  });

  // A directive without rule names switches every rule off, this one
  // included, so these cases run the real lint:suppressions config the way
  // the script does: with inline directives ignored.
  describe('through lint:suppressions', () => {
    const packageDir = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      '..'
    );
    const eslint = new ESLint({
      cwd: packageDir,
      overrideConfigFile: path.join(
        packageDir,
        'eslint.suppressions.config.mjs'
      ),
      allowInlineConfig: false,
    });
    const lint = async (code: string, file = 'src/probe.ts') => {
      const [result] = await eslint.lintText(code, {
        filePath: path.join(packageDir, file),
      });
      return result.messages.map((m) => `${m.ruleId}: ${m.message}`);
    };

    it('reports a directive that names no rules', async () => {
      expect(await lint('/* eslint-disable */\nexport const a = 1;\n')).toEqual(
        [
          expect.stringMatching(
            /^openbridge\/suppression-reason: Name the rules/
          ),
        ]
      );
      expect(
        await lint('export const a = 1; // eslint-disable-line -- all\n')
      ).toEqual([
        expect.stringMatching(
          /^openbridge\/suppression-reason: Name the rules/
        ),
      ]);
    });

    it('bans @ts-ignore and a @ts-expect-error without a reason', async () => {
      expect(
        await lint('// @ts-ignore\nexport const a: number = "x";\n')
      ).toEqual([expect.stringMatching(/^@typescript-eslint\/ban-ts-comment/)]);
      expect(
        await lint('// @ts-expect-error\nexport const a: number = "x";\n')
      ).toEqual([expect.stringMatching(/^@typescript-eslint\/ban-ts-comment/)]);
      expect(
        await lint(
          '// @ts-expect-error - the fixture is deliberately mistyped\nexport const a: number = "x";\n'
        )
      ).toEqual([]);
    });

    it('leaves the generated locales alone', async () => {
      const messages = await lint(
        '/* eslint-disable no-irregular-whitespace */\nexport const a = 1;\n',
        'src/generated/locales/fi-FI.ts'
      );
      expect(messages.filter((m) => !m.startsWith('null:'))).toEqual([]);
    });
  });
});

describe('openbridge/no-skipped-tests', () => {
  it('rejects skip, only and todo on it, test and describe', () => {
    ruleTester.run(
      'no-skipped-tests',
      openbridgePlugin.rules['no-skipped-tests'],
      {
        valid: [
          "it('runs', () => {});",
          "it.each([1])('runs %s', () => {});",
          "describe('group', () => {});",
          'toolbar.skip();',
        ],
        invalid: [
          {code: "it.skip('x', () => {});", errors: 1},
          {code: "describe.only('x', () => {});", errors: 1},
          {code: "test.todo('x');", errors: 1},
          {code: "describe.skip.each([1])('x', () => {});", errors: 1},
        ],
      }
    );
  });
});

describe('openbridge/use-math-helpers', () => {
  it('points hand-written clamps, wraps and angle conversions at svghelpers/math.ts', () => {
    ruleTester.run(
      'use-math-helpers',
      openbridgePlugin.rules['use-math-helpers'],
      {
        valid: [
          'Math.min(a, b);',
          'Math.max(a, Math.round(b));',
          'a % 360;',
          'x / 180;',
          {
            code: 'Math.min(Math.max(v, 0), 1);',
            filename: '/repo/src/svghelpers/math.ts',
          },
        ],
        invalid: [
          {code: 'Math.min(Math.max(v, 0), 1);', errors: 1},
          {code: 'Math.max(0, Math.min(1, v));', errors: 1},
          {code: '((a % 360) + 360) % 360;', errors: 1},
          {code: '(end - start + 360) % 360;', errors: 1},
          {code: '(deg * Math.PI) / 180;', errors: 1},
          {code: 'deg * (Math.PI / 180);', errors: 1},
          {code: '(rad * 180) / Math.PI;', errors: 1},
          {code: '180 / Math.PI;', errors: 1},
        ],
      }
    );
  });
});

describe('openbridge/no-positive-tabindex', () => {
  it('rejects a tabindex above 0 in templates, properties and setAttribute', () => {
    ruleTester.run(
      'no-positive-tabindex',
      openbridgePlugin.rules['no-positive-tabindex'],
      {
        valid: [
          'html`<div tabindex="0"></div>`;',
          'html`<div tabindex="-1"></div>`;',
          'el.tabIndex = -1;',
          "el.setAttribute('tabindex', '0');",
        ],
        invalid: [
          {code: 'html`<div tabindex="1"></div>`;', errors: 1},
          {
            code: 'html`<div tabindex=${x} data-a tabindex=2></div>`;',
            errors: 1,
          },
          {code: 'el.tabIndex = 3;', errors: 1},
          {code: "el.setAttribute('tabindex', '4');", errors: 1},
        ],
      }
    );
  });
});

describe('openbridge/positive-boolean-name', () => {
  it('rejects boolean properties named for what they turn off', () => {
    ruleTester.run(
      'positive-boolean-name',
      openbridgePlugin.rules['positive-boolean-name'],
      {
        valid: [
          'class A { @property({type: Boolean}) showLabels = true; }',
          'class A { @property({type: Boolean}) disabled = false; }',
          'class A { @property({type: Number}) noOfItems = 1; }',
          'class A { hideTimer = 0; }',
        ],
        invalid: [
          {
            code: 'class A { @property({type: Boolean}) hideLabels = false; }',
            errors: 1,
          },
          {
            code: 'class A { @property({type: Boolean, reflect: true}) noTooltip = false; }',
            errors: 1,
          },
          {
            code: 'class A { @property({type: Boolean}) disableAutoAtSetpoint = false; }',
            errors: 1,
          },
        ],
      }
    );
  });
});
