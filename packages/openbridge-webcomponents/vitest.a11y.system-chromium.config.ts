import {defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    storybookTest({
      configDir: path.join(dirname, '.storybook'),
      storybookScript: 'npm run storybook --no-open',
      tags: {exclude: ['skip-a11y']},
    }),
  ],
  test: {
    name: 'a11y',
    setupFiles: ['./.storybook/vitest.a11y.setup.ts'],
    retry: 0,
    reporters: ['default', './script/a11y-reporter.ts'],
    browser: {
      enabled: true,
      provider: playwright({
        launchOptions: {executablePath: '/usr/bin/chromium'},
      }),
      headless: true,
      instances: [{browser: 'chromium'}],
    },
  },
});
