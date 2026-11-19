import {defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      // Vitest only defaults to headless under CI.
      headless: true,
      instances: [{browser: 'chromium'}],
    },
  },
});
