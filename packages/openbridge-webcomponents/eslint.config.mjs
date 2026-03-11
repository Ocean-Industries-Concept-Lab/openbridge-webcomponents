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

// Custom plugin for local OpenBridge lint rules
const openbridgePlugin = {
  rules: {
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
];
