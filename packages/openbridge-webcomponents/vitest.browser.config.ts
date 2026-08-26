import {defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    // Browser tests live in src/. `script/` holds node-only tests for the
    // repo's own tooling (the custom ESLint rules) — they import node
    // packages and cannot run in Chromium; `npm run test:rules` runs those.
    exclude: ['dist/**', 'node_modules/**', 'script/**'],
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{browser: 'chromium'}],
    },
  },
});
