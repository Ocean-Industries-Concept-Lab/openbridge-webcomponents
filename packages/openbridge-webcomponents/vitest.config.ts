import {defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';

import {storybookTest} from '@storybook/addon-vitest/vitest-plugin';

import path from 'node:path';
import {fileURLToPath} from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    // Use `workspace` field in Vitest < 3.2
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            // The location of your Storybook config, main.js|ts
            configDir: path.join(dirname, '.storybook'),
            // This should match your package.json script to run Storybook
            // The --no-open flag will skip the automatic opening of a browser
            storybookScript: 'yarn storybook --no-open',
          }),
        ],
        test: {
          name: 'storybook',
          // Enable browser mode
          browser: {
            enabled: true,
            // Make sure to install Playwright
            provider: playwright({}),
            headless: true,
            instances: [{browser: 'chromium'}],
          },
          setupFiles: ['./.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
