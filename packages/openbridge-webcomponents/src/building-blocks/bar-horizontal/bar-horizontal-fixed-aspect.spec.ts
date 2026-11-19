import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import '../../main.css';
import './bar-horizontal.js';
import type {ObcBarHorizontal} from './bar-horizontal.js';

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
async function mount(boxStyle: string): Promise<ObcBarHorizontal> {
  const screen = render(
    html`<div style=${boxStyle}>
      <obc-bar-horizontal
        style="flex: 1"
        .minValue=${0}
        .maxValue=${100}
        .value=${40}
        .primaryTickmarkInterval=${20}
        .hasBar=${true}
        .hasScale=${true}
        .barThickness=${48}
        .scaleBackground=${true}
        .fixedAspectRatio=${true}
      ></obc-bar-horizontal>
    </div>`
  );
  const el = screen.container.querySelector(
    'obc-bar-horizontal'
  ) as ObcBarHorizontal;
  await el.updateComplete;
  return el;
}

describe('obc-bar-horizontal fixed aspect ratio', () => {
  it('scales by the host width when the height has room', async () => {
    const el = await mount('display: block; width: 600px; height: 300px');
    await until(() => Math.abs(scaleOf(el) - 600 / 384) < 1e-3);
    expect(svgOf(el).getScreenCTM()!.a).toBeCloseTo(600 / 384, 3);
  });

  it('follows the painted scale when the host is shorter than the drawing', async () => {
    const el = await mount('display: flex; width: 600px; height: 100px');
    const reports: number[] = [];
    el.addEventListener('scale-dimensions-changed', (e) =>
      reports.push((e as CustomEvent<{thickness: number}>).detail.thickness)
    );
    // meet: the 132-tall drawing fits 100 px before the 384-long one fits 600
    await until(() => Math.abs(scaleOf(el) - 100 / 132) < 1e-3);
    const svg = svgOf(el);
    const text = svg.querySelector('text')!;
    const painted = svg.getScreenCTM()!.a;
    expect(painted).toBeCloseTo(100 / 132, 3);
    expect(parseFloat(getComputedStyle(text).fontSize) * painted).toBeCloseTo(
      12,
      1
    );
    await until(() => reports[reports.length - 1] === 100);
  });

  it('re-measures the scale when the drawing thickness changes under the same box', async () => {
    const el = await mount('display: flex; width: 600px; height: 100px');
    const reports: number[] = [];
    el.addEventListener('scale-dimensions-changed', (e) =>
      reports.push((e as CustomEvent<{thickness: number}>).detail.thickness)
    );
    await until(() => Math.abs(scaleOf(el) - 100 / 132) < 1e-3);
    // 180 + 24 + 60 = 264 tall: the same 100 px now holds less than half
    el.barThickness = 180;
    await until(() => Math.abs(scaleOf(el) - 100 / 264) < 1e-3);
    await until(() => reports[reports.length - 1] === 100);
  });
});
