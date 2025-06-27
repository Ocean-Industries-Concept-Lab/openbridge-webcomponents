import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';
import fileExtension from 'eslint-plugin-file-extension-in-import-ts';

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
                    const sourceFile = context.getFilename();
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
      'file-extension-in-import-ts': fileExtension,
      'custom-element': customElementPlugin,
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
      'file-extension-in-import-ts/file-extension-in-import-ts': 'error',
      'custom-element/prefer-local-decorator': 'error',
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
];
