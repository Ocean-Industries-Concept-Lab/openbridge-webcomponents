import {setProjectAnnotations} from '@storybook/web-components-vite';
import {beforeEach} from 'vitest';
import * as projectAnnotations from './preview.js';
import * as a11yAnnotations from '@storybook/addon-a11y/preview';

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

// Contrast is a design decision, owned in Figma and checked there. A story
// composes tokens in combinations the design file never draws, so the rule
// reports those compositions rather than the palette, and the noise buries the
// name and role findings this run exists for. The addon panel still runs it
// per story in the browser for anyone who wants to look (#1208).
const axeConfig = {
  parameters: {
    a11y: {config: {rules: [{id: 'color-contrast', enabled: false}]}},
  },
};

const settleAnimations = {
  afterEach: async () => {
    // Web Animations ignore the zeroed CSS durations above, and a story
    // sampled mid-cycle can hide the element axe is about to read.
    for (const animation of document.getAnimations()) {
      animation.currentTime = 100;
      animation.pause();
    }
    await new Promise((resolve) => requestAnimationFrame(resolve));
  },
};

setProjectAnnotations([
  projectAnnotations,
  axeConfig,
  settleAnimations as never,
  a11yAnnotations,
]);

// Chart components measure label widths once, at creation, so a story that
// renders before Noto Sans loads lays out differently.
beforeEach(async () => {
  await Promise.all(
    Array.from(document.fonts, (fontFace) =>
      fontFace.load().catch(() => undefined)
    )
  );
  await document.fonts.ready;
});
