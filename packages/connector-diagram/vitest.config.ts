import {defineConfig} from 'vitest/config'
import {playwright} from '@vitest/browser-playwright'
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin'
import {storybookVis} from 'storybook-addon-vis/vitest-plugin'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    projects: [
      {
        // Pure-logic unit tests: routing + classification. No browser, no
        // canvas — just the geometry functions. Runs via `npm run test:unit`.
        extends: true,
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts'],
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            storybookScript: 'npm run storybook --no-open',
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
})
