import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import '../../main.css';
import './bar-vertical.js';
import type {ObcBarVertical} from './bar-vertical.js';

const frame = () => new Promise((resolve) => requestAnimationFrame(resolve));

/** The scale factor settles a few frames after a size change. */
async function until(check: () => boolean, frames = 40): Promise<void> {
  for (let i = 0; i < frames; i++) {
    if (check()) return;
    await frame();
  }
  throw new Error('the condition never held');
}

const svgOf = (el: Element) => el.querySelector('svg')!;
const scaleOf = (el: Element) =>
  parseFloat(svgOf(el).style.getPropertyValue('--scale'));

/** Bar, ticks and labels with no setpoint: 48 + 24 + 60 = 132 thick. */
async function mount(boxStyle: string): Promise<ObcBarVertical> {
  const screen = render(
    html`<div style=${boxStyle}>
      <obc-bar-vertical
        .minValue=${0}
        .maxValue=${100}
        .value=${40}
        .primaryTickmarkInterval=${20}
        .hasBar=${true}
        .hasScale=${true}
        .barThickness=${48}
        .scaleBackground=${true}
        .fixedAspectRatio=${true}
      ></obc-bar-vertical>
    </div>`
  );
  const el = screen.container.querySelector(
    'obc-bar-vertical'
  ) as ObcBarVertical;
  await el.updateComplete;
  return el;
}

describe('obc-bar-vertical fixed aspect ratio', () => {
  it('scales by the host height when the width has room', async () => {
    const el = await mount('display: block; width: 400px; height: 600px');
    await until(() => Math.abs(scaleOf(el) - 600 / 384) < 1e-3);
    expect(svgOf(el).getScreenCTM()!.a).toBeCloseTo(600 / 384, 3);
  });

  it('follows the painted scale when the host is narrower than the drawing', async () => {
    const el = await mount('display: block; width: 120px; height: 600px');
    const reports: number[] = [];
    el.addEventListener('scale-dimensions-changed', (e) =>
      reports.push((e as CustomEvent<{thickness: number}>).detail.thickness)
    );
    // meet: the 132-wide drawing fits 120 px before the 384-long one fits 600
    await until(() => Math.abs(scaleOf(el) - 120 / 132) < 1e-3);
    const svg = svgOf(el);
    const text = svg.querySelector('text')!;
    const painted = svg.getScreenCTM()!.a;
    expect(painted).toBeCloseTo(120 / 132, 3);
    expect(parseFloat(getComputedStyle(text).fontSize) * painted).toBeCloseTo(
      12,
      1
    );
    await until(() => reports[reports.length - 1] === 120);
  });

  it('re-measures the scale when the drawing thickness changes under the same box', async () => {
    const el = await mount('display: block; width: 120px; height: 600px');
    const reports: number[] = [];
    el.addEventListener('scale-dimensions-changed', (e) =>
      reports.push((e as CustomEvent<{thickness: number}>).detail.thickness)
    );
    await until(() => Math.abs(scaleOf(el) - 120 / 132) < 1e-3);
    // 180 + 24 + 60 = 264 wide: the same 120 px now holds less than half
    reports.length = 0;
    el.barThickness = 180;
    await until(() => Math.abs(scaleOf(el) - 120 / 264) < 1e-3);
    await until(() => reports[reports.length - 1] === 120);
  });

  it('measures the content box of a padded host', async () => {
    const el = await mount('display: block; width: 120px; height: 600px');
    el.style.padding = '20px';
    const reports: number[] = [];
    el.addEventListener('scale-dimensions-changed', (e) =>
      reports.push((e as CustomEvent<{thickness: number}>).detail.thickness)
    );
    // 80 px of content width for the 132-wide drawing
    await until(() => Math.abs(scaleOf(el) - 80 / 132) < 1e-3);
    reports.length = 0;
    el.barThickness = 180;
    await until(() => Math.abs(scaleOf(el) - 80 / 264) < 1e-3);
    await until(() => reports[reports.length - 1] === 80);
  });
});
