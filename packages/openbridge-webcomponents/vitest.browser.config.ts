import {defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    // ignore files in dist folder
    exclude: ['dist/**', 'node_modules/**'],
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{browser: 'chromium'}],
    },
  },
});
