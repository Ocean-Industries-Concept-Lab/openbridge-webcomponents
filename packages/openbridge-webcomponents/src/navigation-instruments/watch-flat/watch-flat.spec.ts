import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './watch-flat.js';
import type {ObcWatchFlat} from './watch-flat.js';
import {LabelPosition} from '../compass-flat/compass-flat.js';
import '../../main.css';

const LABELS = [
  {x: -88, y: LabelPosition.top, text: '-45'},
  {x: 0, y: LabelPosition.top, text: '0'},
  {x: 88, y: LabelPosition.top, text: '45'},
];

/** Two frames: one for the ResizeObserver callback, one for the re-render. */
async function settle(el: ObcWatchFlat): Promise<void> {
  for (let i = 0; i < 2; i++) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  await el.updateComplete;
}

function labelGeometry(el: ObcWatchFlat): {offsetY: number; scale: number} {
  const group = el.shadowRoot!.querySelector('text.label')!.parentElement!;
  const transform = group.getAttribute('transform') ?? '';
  const svg = el.shadowRoot!.querySelector('svg')!;
  return {
    offsetY: Number(/translate\([^,]+,\s*([^)]+)\)/.exec(transform)?.[1]),
    scale: Number(svg.style.getPropertyValue('--scale')),
  };
}

function mount(display: string, width: number) {
  const screen = render(
    html`<div style="display: ${display}; width: ${width}px; height: 72px">
      <obc-watch-flat
        style="display: block; width: 100%; height: 100%"
        .labels=${LABELS}
      ></obc-watch-flat>
    </div>`
  );
  const el = screen.container.querySelector('obc-watch-flat') as ObcWatchFlat;
  return {box: el.parentElement as HTMLElement, el};
}

describe('obc-watch-flat — label scale follows the rendered width', () => {
  it('renders finite labels when it first paints at zero width', async () => {
    const {el} = mount('none', 352);
    await el.updateComplete;

    const {offsetY, scale} = labelGeometry(el);
    expect(Number.isFinite(offsetY)).toBe(true);
    expect(scale).toBeGreaterThan(0);
  });

  it('picks up its width once a hidden container is shown', async () => {
    const {box, el} = mount('none', 704);
    await el.updateComplete;

    box.style.display = 'block';
    await settle(el);

    expect(labelGeometry(el)).toEqual({offsetY: -3, scale: 2});
  });

  it('re-scales the labels when the container is resized', async () => {
    const {box, el} = mount('block', 352);
    await settle(el);
    expect(labelGeometry(el).scale).toBe(1);

    box.style.width = '704px';
    await settle(el);

    expect(labelGeometry(el)).toEqual({offsetY: -3, scale: 2});
  });
});
