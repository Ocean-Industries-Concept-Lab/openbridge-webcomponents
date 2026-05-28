import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// Custom plugin for handling customElement imports
const customElementPlugin = {
  rules: {
    'prefer-local-decorator': {
      meta: {
        type: 'suggestion',
        docs: {
          description:
            'Ensure customElement is imported from local decorator.js',
          category: 'Best Practices',
          recommended: true,
        },
        fixable: 'code',
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            if (node.source.value === 'lit/decorators.js') {
              const specifiers = node.specifiers;
              const customElementSpec = specifiers.find(
                (spec) =>
                  spec.type === 'ImportSpecifier' &&
                  spec.imported.name === 'customElement'
              );

              if (customElementSpec) {
                const otherSpecs = specifiers.filter(
                  (spec) =>
                    spec.type === 'ImportSpecifier' &&
                    spec.imported.name !== 'customElement'
                );

                context.report({
                  node,
                  message:
                    'customElement should be imported from local src/decorator.js',
                  fix(fixer) {
                    const fixes = [];
                    const sourceFile = context.filename;
                    const relativePathToDecorator = path
                      .relative(
                        path.dirname(sourceFile),
                        path.join(path.dirname(sourceFile), 'decorator.js')
                      )
                      .replace(/\\/g, '/');

                    // Remove the old import
                    fixes.push(fixer.remove(node));

                    // Add the new customElement import
                    fixes.push(
                      fixer.insertTextBefore(
                        node,
                        `import { customElement } from '${relativePathToDecorator}';\n`
                      )
                    );

                    // Add back other imports if any
                    if (otherSpecs.length > 0) {
                      const names = otherSpecs
                        .map((spec) => spec.imported.name)
                        .join(', ');
                      fixes.push(
                        fixer.insertTextBefore(
                          node,
                          `import { ${names} } from 'lit/decorators.js';\n`
                        )
                      );
                    }

                    return fixes;
                  },
                });
              }
            }
          },
        };
      },
    },
  },
};

// Words that should stay lowercase in Title Case (unless they are the first word of a segment)
const TITLE_CASE_LOWERCASE_WORDS = new Set([
  'and',
  'of',
  'or',
  'in',
  'on',
  'at',
  'to',
  'for',
]);

function capitalizeWord(word) {
  if (word.length === 0) return word;
  // All-uppercase words (acronyms like POI, AR, ROT) are kept as-is
  if (word === word.toUpperCase() && word.length > 1) return word;
  // Capitalize each part of a hyphenated compound (e.g. Action-change → Action-Change)
  if (word.includes('-')) {
    return word
      .split('-')
      .map((part) => capitalizeWord(part))
      .join('-');
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function titleCaseWords(text) {
  const words = text.split(/\s+/);
  const lastIndex = words.length - 1;
  return words
    .map((word, i) => {
      if (word.length === 0) return word;
      // First and last words are always capitalized
      if (i === 0 || i === lastIndex) return capitalizeWord(word);
      // Short conjunctions / prepositions stay lowercase (only unhyphenated)
      if (TITLE_CASE_LOWERCASE_WORDS.has(word.toLowerCase())) {
        return word.toLowerCase();
      }
      // Everything else is capitalized
      return capitalizeWord(word);
    })
    .join(' ');
}

// Separator pattern: em dash, en dash, or spaced hyphen used as phrase dividers
const PHRASE_SEPARATOR = /(\s*[\u2013\u2014]\s*|\s+-\s+)/;

function toTitleCase(segment) {
  // Split into parts outside and inside parentheses; only title-case outside
  return segment.replace(/[^()]+/g, (part, offset) => {
    // Check if this part is inside parentheses by looking at the character before it
    if (offset > 0 && segment[offset - 1] === '(') return part;
    // Split on phrase separators (em/en dash, spaced hyphen) so each phrase
    // gets independent title-casing (first word always capitalized)
    return part
      .split(PHRASE_SEPARATOR)
      .map((chunk) =>
        PHRASE_SEPARATOR.test(chunk) ? chunk : titleCaseWords(chunk)
      )
      .join('');
  });
}

// Custom plugin for local OpenBridge lint rules
const openbridgePlugin = {
  rules: {
    'storybook-title-case': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Enforce Title Case on Storybook meta `title` (with `/`-separated segments) and story `name` fields',
        },
        fixable: 'code',
      },
      create(context) {
        function checkTitleCase(node, value, isSegmented) {
          if (isSegmented) {
            const segments = value.split('/');
            const problems = [];

            for (const [i, segment] of segments.entries()) {
              const trimmed = segment.trim();
              if (trimmed.length === 0) {
                problems.push({index: i, segment, issue: 'empty segment'});
                continue;
              }
              if (/(?<=[a-zA-Z])-(?=[a-zA-Z])/.test(trimmed)) {
                problems.push({
                  index: i,
                  segment: trimmed,
                  issue: 'use spaces instead of dashes',
                });
                continue;
              }
              const expected = toTitleCase(trimmed);
              if (trimmed !== expected) {
                problems.push({
                  index: i,
                  segment: trimmed,
                  expected,
                  issue: `should be "${expected}"`,
                });
              }
            }

            if (problems.length === 0) return;

            const fixedTitle = segments
              .map((s) => {
                const trimmed = s.trim();
                const spacedOut = trimmed.replace(
                  /(?<=[a-zA-Z])-(?=[a-zA-Z])/g,
                  ' '
                );
                return toTitleCase(spacedOut);
              })
              .join('/');

            context.report({
              node,
              message: `Storybook title segments must use Title Case with spaces (not dashes). ${problems.map((p) => `Segment "${p.segment}": ${p.issue}`).join('; ')}.`,
              fix(fixer) {
                return fixer.replaceText(node, `'${fixedTitle}'`);
              },
            });
          } else {
            const expected = toTitleCase(value);
            if (value === expected) return;

            context.report({
              node,
              message: `Storybook story name must use Title Case. Expected "${expected}".`,
              fix(fixer) {
                return fixer.replaceText(node, `'${expected}'`);
              },
            });
          }
        }

        return {
          Property(node) {
            if (node.key.type !== 'Identifier') return;
            if (
              node.value.type !== 'Literal' ||
              typeof node.value.value !== 'string'
            )
              return;

            const propName = node.key.name;

            if (propName === 'title') {
              const value = node.value.value;
              if (!value.includes('/')) return;
              checkTitleCase(node.value, value, true);
            } else if (propName === 'name') {
              // Only match story-level `name` (Property → ObjectExpression → VariableDeclarator)
              // to avoid false positives on argTypes/args/controls nested `name` fields
              const parent = node.parent;
              if (
                !parent ||
                parent.type !== 'ObjectExpression' ||
                !parent.parent ||
                parent.parent.type !== 'VariableDeclarator'
              )
                return;
              checkTitleCase(node.value, node.value.value, false);
            }
          },
        };
      },
    },
    'prefer-boolean-property-default-false': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Prefer boolean property default values of false or set Attribute: false on the property decorator',
        },
      },
      create(context) {
        return {
          PropertyDefinition(node) {
            if (node.type !== 'PropertyDefinition') return;
            if (node.value === undefined || node.value === null) return;
            if (node.value.type !== 'Literal') return;
            if (node.value.value !== true) return;
            // Only apply to @property()-decorated fields (plain class fields are exempt)
            const propertyDecorator = node.decorators?.find(
              (d) =>
                d.expression?.type === 'CallExpression' &&
                d.expression.callee?.type === 'Identifier' &&
                d.expression.callee.name === 'property'
            );
            if (!propertyDecorator) return;
            // Check if the property decorator has attribute: false — that's the
            // accepted escape hatch for true-default booleans (see AGENTS.md § 2).
            const property =
              propertyDecorator.expression?.arguments[0]?.properties?.find(
                (p) =>
                  p.type === 'Property' &&
                  !p.computed &&
                  p.key.type === 'Identifier' &&
                  p.key.name === 'attribute'
              );
            const isBuildingBlock =
              typeof context.filename === 'string' &&
              context.filename.includes('building-blocks');
            if (property?.value?.value === false) {
              return;
            }
            let message = 'Prefer boolean property default values of false';
            if (isBuildingBlock) {
              message += ' or set Attribute: false on the property decorator';
            }
            context.report({
              node,
              message,
            });
          },
        };
      },
    },
    'prefer-enum-over-string-literal-union': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Disallow string-literal unions on class fields (prefer enums instead)',
        },
        schema: [],
      },
      create(context) {
        function isStringLiteralUnion(typeNode) {
          if (!typeNode || typeNode.type !== 'TSUnionType') return false;
          if (typeNode.types.length < 2) return false;

          return typeNode.types.every(
            (t) =>
              t.type === 'TSLiteralType' &&
              t.literal &&
              t.literal.type === 'Literal' &&
              typeof t.literal.value === 'string'
          );
        }

        function isStringLiteralInitializer(valueNode) {
          return (
            valueNode &&
            valueNode.type === 'Literal' &&
            typeof valueNode.value === 'string'
          );
        }

        return {
          // Type aliases: `export type Foo = 'a' | 'b'`
          TSTypeAliasDeclaration(node) {
            if (!isStringLiteralUnion(node.typeAnnotation)) return;

            context.report({
              node,
              message: 'Avoid string-literal union types; use an enum instead.',
            });
          },

          // Class fields: `foo: 'a' | 'b' = 'a'`
          PropertyDefinition(node) {
            // Limit scope to Lit properties declared as `@property({type: String})`
            const hasLitStringPropertyDecorator = (node.decorators ?? []).some(
              (decorator) => {
                const expr = decorator.expression;
                if (!expr || expr.type !== 'CallExpression') return false;
                if (!expr.callee || expr.callee.type !== 'Identifier')
                  return false;
                if (expr.callee.name !== 'property') return false;

                const arg0 = expr.arguments?.[0];
                if (!arg0 || arg0.type !== 'ObjectExpression') return false;

                const typeProp = arg0.properties.find((p) => {
                  if (!p || p.type !== 'Property') return false;
                  if (p.key.type !== 'Identifier') return false;
                  if (p.key.name !== 'type') return false;
                  return (
                    p.value &&
                    p.value.type === 'Identifier' &&
                    p.value.name === 'String'
                  );
                });

                return Boolean(typeProp);
              }
            );
            if (!hasLitStringPropertyDecorator) return;

            const typeAnn = node.typeAnnotation?.typeAnnotation;
            if (!isStringLiteralUnion(typeAnn)) return;
            if (!isStringLiteralInitializer(node.value)) return;

            context.report({
              node,
              message:
                'Avoid string-literal unions in `@property({type: String})` fields; use an enum type instead.',
            });
          },
        };
      },
    },
    'prefer-array-property-type-and-item-interface': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Require @property array fields to declare {type: Array} and avoid inline item object types',
        },
        schema: [],
      },
      create(context) {
        function getPropertyDecorator(node) {
          return (node.decorators ?? []).find((decorator) => {
            const expr = decorator.expression;
            return (
              expr &&
              expr.type === 'CallExpression' &&
              expr.callee &&
              expr.callee.type === 'Identifier' &&
              expr.callee.name === 'property'
            );
          });
        }

        function getArrayElementType(typeNode) {
          if (!typeNode) return null;
          if (typeNode.type === 'TSArrayType') {
            return typeNode.elementType;
          }
          if (
            typeNode.type === 'TSTypeReference' &&
            typeNode.typeName &&
            typeNode.typeName.type === 'Identifier' &&
            typeNode.typeName.name === 'Array'
          ) {
            return typeNode.typeArguments?.params?.[0] ?? null;
          }
          return null;
        }

        function hasTypeArrayOption(propertyDecorator) {
          const options = propertyDecorator.expression.arguments?.[0];
          if (!options || options.type !== 'ObjectExpression') return false;
          return options.properties.some((prop) => {
            if (!prop || prop.type !== 'Property') return false;
            if (prop.key.type !== 'Identifier' || prop.key.name !== 'type')
              return false;
            return (
              prop.value &&
              prop.value.type === 'Identifier' &&
              prop.value.name === 'Array'
            );
          });
        }

        function containsInlineObjectType(typeNode) {
          if (!typeNode) return false;
          if (typeNode.type === 'TSTypeLiteral') return true;
          if (typeNode.type === 'TSUnionType') {
            return typeNode.types.some((t) => containsInlineObjectType(t));
          }
          if (typeNode.type === 'TSIntersectionType') {
            return typeNode.types.some((t) => containsInlineObjectType(t));
          }
          return false;
        }

        return {
          PropertyDefinition(node) {
            const propertyDecorator = getPropertyDecorator(node);
            if (!propertyDecorator) return;

            const typeAnnotation = node.typeAnnotation?.typeAnnotation;
            const arrayElementType = getArrayElementType(typeAnnotation);
            if (!arrayElementType) return;

            if (!hasTypeArrayOption(propertyDecorator)) {
              context.report({
                node: propertyDecorator,
                message:
                  'Array properties decorated with @property must include {type: Array}.',
              });
            }

            if (containsInlineObjectType(arrayElementType)) {
              context.report({
                node: arrayElementType,
                message:
                  'Array item type must be a named interface/type (avoid inline object types like Array<{...}>).',
              });
            }
          },
        };
      },
    },
  },
};

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'custom-element': customElementPlugin,
      openbridge: openbridgePlugin,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },

    rules: {
      'no-prototype-builtins': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'custom-element/prefer-local-decorator': 'error',
      'openbridge/prefer-enum-over-string-literal-union': 'error',
      'openbridge/prefer-boolean-property-default-false': 'error',
      'openbridge/prefer-array-property-type-and-item-interface': 'error',
      'openbridge/storybook-title-case': 'off',
      // Disabled because eslint-plugin-file-extension-in-import-ts is not yet
      // compatible with ESLint v10 (it still uses deprecated context methods).
      'file-extension-in-import-ts/file-extension-in-import-ts': 'off',
    },
  },
  {
    files: ['**/rollup.config.js', '**/web-test-runner.config.js'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: [
      '**/*_test.ts',
      '**/custom_typings/*.ts',
      'packages/labs/ssr/src/test/integration/tests/**',
      'packages/labs/ssr/src/lib/util/parse5-utils.ts',
    ],

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // Generated locale files use string-literal unions from lit-localize
    files: ['**/generated/locales/*.ts'],

    rules: {
      'openbridge/prefer-enum-over-string-literal-union': 'off',
    },
  },
  {
    files: ['**/*.stories.ts'],

    rules: {
      'openbridge/storybook-title-case': 'error',
    },
  },
];
