/**
 * `npm run lint:suppressions`: every eslint-disable names its rules and says
 * why, no file configures rules inline, and every `@ts-expect-error` says why.
 *
 * It runs with `--no-inline-config`, so no directive can silence it; the main
 * config (`eslint.config.mjs`) would let `/* eslint-disable *\/` switch off the
 * very rule that reports it.
 */
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import {openbridgePlugin} from './eslint.config.mjs';

export default [
  {
    files: ['**/*.{ts,tsx,mts,mjs}'],
    // lit-localize writes its directives into every locale file.
    ignores: ['**/src/generated/locales/**'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      openbridge: openbridgePlugin,
    },
    rules: {
      'openbridge/suppression-reason': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
          minimumDescriptionLength: 3,
        },
      ],
    },
  },
];
