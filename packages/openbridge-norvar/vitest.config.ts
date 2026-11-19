import {defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin';
import {storybookVis} from 'storybook-addon-vis/vitest-plugin';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Same snapshot settings as the core package, so a baseline moved from there
// compares under the same threshold.
export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            storybookScript: 'npm run storybook --no-open',
            tags: {exclude: ['skip-test']},
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
          setupFiles: ['./.storybook/vitest.setup.ts'],
          retry: 3,
          browser: {
            enabled: true,
            provider: playwright({}),
            headless: true,
            instances: [{browser: 'chromium'}],
          },
        },
      },
    ],
  },
});
