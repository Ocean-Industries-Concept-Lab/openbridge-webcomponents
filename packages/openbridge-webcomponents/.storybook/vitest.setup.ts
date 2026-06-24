import {setProjectAnnotations} from '@storybook/web-components-vite';
import {beforeEach} from 'vitest';
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

// storybook-addon-vis captures and compares the screenshot in an afterEach hook.
vis.setup();

// Flaky visual snapshots are retried via Vitest's `test.retry` (configured in
// vitest.config.ts). A retry re-runs the whole test, which re-renders the story
// and captures a brand new screenshot — that re-render is what actually shakes
// off render-time flakiness (e.g. sub-pixel anti-aliasing of <canvas> charts).
// Simply re-capturing an already-rendered DOM is not enough: the pixels are
// identical every time, so the only way to give a flaky frame another chance is
// to render it again.
//
// One catch: the vis matcher skips the comparison when the test already has
// recorded errors (`if (test.result.errors?.length) return`). On a Vitest retry
// the previous attempt's failure is still attached to the task, so without
// intervention the comparison would be silently skipped and the test would
// "pass" — masking real regressions. Clearing those errors at the start of each
// attempt keeps every retry honest: the snapshot is genuinely re-evaluated, so a
// transient diff gets another chance while a real mismatch still fails once the
// retries are exhausted.
beforeEach((context) => {
  if (context.task.result) {
    context.task.result.errors = [];
  }
});
