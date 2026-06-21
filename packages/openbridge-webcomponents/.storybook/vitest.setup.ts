import {setProjectAnnotations} from '@storybook/web-components-vite';
import {afterEach, beforeAll} from 'vitest';
import * as projectAnnotations from './preview.js';
import {vis, visAnnotations} from 'storybook-addon-vis/vitest-setup';

// Disable all animations and transitions to prevent flaky visual tests
const style = document.createElement('style');
style.textContent = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
`;
document.head.appendChild(style);

// This is an important step to apply the right configuration when testing your
// stories.
// More info at:
// https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([projectAnnotations, visAnnotations]);

// Number of extra attempts (after the first) for a snapshot that fails to match,
// and the pause between attempts to let any unsettled rendering stabilise.
const SNAPSHOT_RETRIES = 2;
const SNAPSHOT_RETRY_DELAY_MS = 50;

// This mirrors what `vis.setup()` does, but with a retry wrapper around the
// snapshot comparison so flaky visual diffs get another chance.
//
// Why not Vitest's built-in `test.retry`? The vis matcher runs the comparison in
// an `afterEach` hook that bails out early when the test already has recorded
// errors (`if (test.result.errors?.length) return`). On a Vitest-level retry the
// previous attempt's failure is still attached to the test, so the comparison is
// silently skipped and a genuine regression "passes". Retrying within a single
// `afterEach` instead keeps every attempt clean: each call re-captures the
// screenshot and re-compares, so transient jitter is absorbed while a real
// mismatch still fails after the retries are exhausted.
beforeAll(vis.beforeAll.setup);

afterEach(async () => {
  for (let attempt = 0; attempt <= SNAPSHOT_RETRIES; attempt++) {
    try {
      await vis.afterEach.matchImageSnapshot();
      return;
    } catch (error) {
      if (attempt === SNAPSHOT_RETRIES) {
        throw error;
      }
      await new Promise((resolve) =>
        setTimeout(resolve, SNAPSHOT_RETRY_DELAY_MS)
      );
    }
  }
});
