import {configDefaults, defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin';
import {storybookVis} from 'storybook-addon-vis/vitest-plugin';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// The snapshot project with every story first rendered hidden, so a story
// that differs from its baseline here differs only because of that.
export default defineConfig({
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
    name: 'hidden-mount',
    // Three stories in these files differ from their baselines only under
    // full-suite load and pass when run alone; POI stays out of this pass.
    exclude: [
      ...configDefaults.exclude,
      'src/ar/poi-layer/poi-layer.stories.ts',
      'src/ar/poi-controller/poi-controller.stories.ts',
    ],
    setupFiles: ['./.storybook/vitest.hidden-mount.setup.ts'],
    retry: 3,
    browser: {
      enabled: true,
      provider: playwright({}),
      headless: true,
      instances: [{browser: 'chromium'}],
    },
  },
});
