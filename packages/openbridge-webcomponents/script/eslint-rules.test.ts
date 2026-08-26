import {describe, expect, it} from 'vitest';
import {RuleTester} from 'eslint';
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
