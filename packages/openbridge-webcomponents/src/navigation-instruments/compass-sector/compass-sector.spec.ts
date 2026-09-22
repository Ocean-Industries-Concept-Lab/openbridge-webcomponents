import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './compass-sector.js';
import type {ObcCompassSector} from './compass-sector.js';
import '../../main.css';

const HEADINGS = [0, 37, 90, 180, 311, 359];

async function frameOf(
  heading: number,
  zoomToFitArc: boolean
): Promise<{viewBox: string; aspect: string}> {
  const screen = render(
    html`<div style="width: 512px; height: 512px">
      <obc-compass-sector
        .heading=${heading}
        .courseOverGround=${heading + 12}
        .zoomToFitArc=${zoomToFitArc}
      ></obc-compass-sector>
    </div>`
  );
  const el = screen.container.querySelector(
    'obc-compass-sector'
  ) as ObcCompassSector;
  await el.updateComplete;
  const root = el.shadowRoot!;
  const overlay = root.querySelector('svg') as SVGSVGElement;
  const container = root.querySelector('.container') as HTMLElement;
  return {
    viewBox: overlay.getAttribute('viewBox') ?? '',
    aspect: getComputedStyle(container).aspectRatio,
  };
}

describe('obc-compass-sector — the canvas holds still', () => {
  for (const zoomToFitArc of [false, true]) {
    it(`keeps one frame at every heading (zoomToFitArc: ${zoomToFitArc})`, async () => {
      const frames = [];
      for (const heading of HEADINGS) {
        frames.push(await frameOf(heading, zoomToFitArc));
      }
      for (const frame of frames) {
        expect(frame).toEqual(frames[0]);
      }
    });
  }

  it('crops the square box to a wide canvas', async () => {
    const {viewBox, aspect} = await frameOf(0, false);
    const [x, , width, height] = viewBox.split(' ').map(Number);
    // 448 less 8.1% per side, and the arc's 40-unit bottom margin.
    expect(width).toBeCloseTo(375.42, 1);
    expect(height).toBeCloseTo(217.28, 1);
    expect(x).toBeCloseTo(-187.71, 1);
    expect(aspect).toBe(`${width} / ${height}`);
  });
});
