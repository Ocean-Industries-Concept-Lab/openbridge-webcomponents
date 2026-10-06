/**
 * Hidden-mount pass: every story renders inside a `display: none` canvas, is
 * shown, and must then match the baseline the snapshot project took of a
 * normal render. A story always mounts into a laid-out canvas, but a consumer
 * mounts components in closed tabs and dialogs too; a component that measures
 * itself while it has no size and never measures again passes every other
 * check (#1351). Every story is also held to finite SVG attributes: a `NaN` or
 * `Infinity` is an error in the console even when nothing visible moves.
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
