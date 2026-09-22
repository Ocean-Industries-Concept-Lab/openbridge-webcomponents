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

const theme = (import.meta as unknown as {env: Record<string, string>}).env
  .VITE_A11Y_THEME;

type A11yStoryContext = {
  tags: string[];
  globals: {a11y?: {manual?: boolean}};
};

// The addon reads globals, not tags, so the exemption tag needs a shim. Same
// mechanism storybook-addon-vis uses for `!snapshot`.
const exemptionShim = {
  beforeEach: (context: A11yStoryContext) => {
    if (context.tags?.includes('skip-a11y')) {
      context.globals.a11y = {...context.globals.a11y, manual: true};
    }
  },
};

// axe resolves a colour pair against what is painted behind the text. The
// Storybook UI paints the canvas from `.sb-show-main` in preview-head.html,
// which the Vitest runner never applies, so without this every pair is
// measured against white and the dark themes report violations they do not
// have.
const canvasAndAnimations = {
  afterEach: async () => {
    document.documentElement.setAttribute('data-obc-theme', theme ?? 'day');
    document.body.style.backgroundColor = 'var(--container-background-color)';
    // Web Animations ignore the zeroed CSS durations above; a flashing alert
    // sampled mid-cycle flips contrast results between runs.
    for (const animation of document.getAnimations()) {
      animation.currentTime = 100;
      animation.pause();
    }
    await new Promise((resolve) => requestAnimationFrame(resolve));
  },
};

setProjectAnnotations([
  projectAnnotations,
  exemptionShim as never,
  canvasAndAnimations as never,
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
