import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import {commentRules} from './script/eslint-comment-rules.mjs';
import {propertyDocsRule} from './script/eslint-property-docs-rule.mjs';
// Reuses the main config's rule objects (not its rule selection): source files
// carry `eslint-disable` comments for @typescript-eslint/openbridge rules, and
// those directives fail to resolve here without this registration.
import {__testables} from './eslint.config.mjs';

export default [
  {
    files: ['src/**/*.ts'],
    ignores: ['src/icons/**', 'src/generated/**', 'src/manual-icon/**'],
    languageOptions: {parser: tsParser, ecmaVersion: 2022, sourceType: 'module'},
    plugins: {
      '@typescript-eslint': typescriptEslint,
      openbridge: __testables.openbridgePlugin,
      'openbridge-comments': {rules: {...commentRules, 'property-docs-in-class-jsdoc': propertyDocsRule}},
    },
    rules: {
      'openbridge-comments/comment-max-lines': ['warn', {max: 5}],
      'openbridge-comments/no-commented-out-code': 'warn',
      'openbridge-comments/todo-format': 'warn',
      'openbridge-comments/comment-style': 'warn',
      'openbridge-comments/property-docs-in-class-jsdoc': ['warn', {allowFiles: ['src/svghelpers/setpoint-mixin.ts', 'src/svghelpers/setpoint-bundle.ts']}],
    },
  },
];
