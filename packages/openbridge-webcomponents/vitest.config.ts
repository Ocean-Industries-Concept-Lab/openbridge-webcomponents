import {defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';

import {storybookTest} from '@storybook/addon-vitest/vitest-plugin';
import {storybookVis} from 'storybook-addon-vis/vitest-plugin';

import path from 'node:path';
import {fileURLToPath} from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            // The location of your Storybook config, main.js|ts
            configDir: path.join(dirname, '.storybook'),
            // This should match your package.json script to run Storybook
            // The --no-open flag will skip the automatic opening of a browser
            storybookScript: 'npm run storybook --no-open',
            tags: {
              exclude: ['skip-test'],
            },
          }),
          storybookVis({
            comparisonMethod: 'pixel',
            failureThreshold: 4,
            failureThresholdType: 'pixel',
            snapshotRootDir: (config) =>
              path.join(dirname, '__vis__', config.platform),
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
