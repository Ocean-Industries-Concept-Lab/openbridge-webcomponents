/**
 * Hidden-mount pass: each story renders in a `display: none` canvas, is shown,
 * then must match its snapshot baseline with finite attributes throughout.
 * Why and how to read a failure: docs/agents/testing-visual.md (#1351).
 */
import './vitest.setup.js';
import {setProjectAnnotations} from '@storybook/web-components-vite';
import {afterEach, expect} from 'vitest';
import {visAnnotations} from 'storybook-addon-vis/vitest-setup';
import * as projectAnnotations from './preview.js';

let canvas: HTMLElement | undefined;
let hidden = false;

const renderHidden = {
  beforeEach: (context: {
    canvasElement: HTMLElement;
    playFunction?: unknown;
  }) => {
    canvas = context.canvasElement;
    // A play function drives the story like a user, which needs it on screen.
    hidden = !context.playFunction;
    if (hidden) {
      canvas.style.display = 'none';
    }
  },
};

setProjectAnnotations([
  projectAnnotations,
  visAnnotations,
  renderHidden as never,
]);

function nonFiniteAttributes(root: ParentNode, found: string[] = []): string[] {
  for (const element of root.querySelectorAll('*')) {
    for (const attribute of element.attributes) {
      if (/NaN|Infinity/.test(attribute.value)) {
        found.push(
          `<${element.localName} ${attribute.name}="${attribute.value}">`
        );
      }
    }
    if (element.shadowRoot) {
      nonFiniteAttributes(element.shadowRoot, found);
    }
  }
  return found;
}

function updatingElements(root: ParentNode, found: Element[] = []): Element[] {
  for (const element of root.querySelectorAll('*')) {
    if ('updateComplete' in element) {
      found.push(element);
    }
    if (element.shadowRoot) {
      updatingElements(element.shadowRoot, found);
    }
  }
  return found;
}

const nextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(resolve));

/**
 * Lets resize observers fire and the renders they request finish: an
 * observer reports one frame after layout, and a chart draws one after that.
 */
async function settle(root: ParentNode): Promise<void> {
  for (let round = 0; round < 3; round++) {
    await nextFrame();
    await nextFrame();
    await Promise.all(
      updatingElements(root).map(
        (element) =>
          (element as Element & {updateComplete: Promise<unknown>})
            .updateComplete
      )
    );
  }
}

// Registered after vis.setup() in vitest.setup.ts, so it runs before the
// screenshot is taken: Vitest runs afterEach hooks last-registered first.
afterEach(async () => {
  if (!canvas) return;
  const found = nonFiniteAttributes(canvas);
  if (hidden) {
    canvas.style.removeProperty('display');
    await settle(canvas);
    found.push(...nonFiniteAttributes(canvas));
  }
  canvas = undefined;
  expect([...new Set(found)], 'non-finite SVG attributes').toEqual([]);
});
