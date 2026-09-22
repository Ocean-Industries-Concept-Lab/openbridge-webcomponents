import {defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// The accessibility run is a separate project, not a second assertion inside
// the snapshot one: axe results are deterministic and must not inherit that
// project's `retry: 3`, and `skip-test` hides 125 stories that are only
// pixel-flaky, not accessibility-exempt (`skip-a11y` is the opt-out here).
// One pass covers every theme: with colour contrast off, the rules that
// remain give the same answer in all four.
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
      provider: playwright({}),
      headless: true,
      instances: [{browser: 'chromium'}],
    },
  },
});
