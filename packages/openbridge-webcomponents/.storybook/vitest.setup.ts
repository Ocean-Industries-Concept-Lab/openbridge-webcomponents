import {setProjectAnnotations} from '@storybook/web-components-vite';
import * as projectAnnotations from './preview.js';
import {vis, visAnnotations} from 'storybook-addon-vis/vitest-setup';
import {makeScreenshot} from './screenshot';

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

const viteEnv = (
  import.meta as ImportMeta & {env?: Record<string, string | undefined>}
).env;
const takeScreenshot = viteEnv?.VITE_STORYBOOK_TAKE_SCREENSHOT === 'true';
if (takeScreenshot) {
  setProjectAnnotations([projectAnnotations]);
  makeScreenshot();
} else {
  // This is an important step to apply the right configuration when testing your stories.
  // More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
  setProjectAnnotations([projectAnnotations, visAnnotations]);
  vis.setup();
}
