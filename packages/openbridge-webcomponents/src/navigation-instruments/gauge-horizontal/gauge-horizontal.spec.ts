import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import '../../main.css';
import './gauge-horizontal.js';
import '../../bars-graphs/line-graph/line-graph.js';
import {ExternalScaleSide} from './gauge-horizontal.js';
import type {ObcGaugeHorizontal} from './gauge-horizontal.js';
import type {ObcLineGraph} from '../../bars-graphs/line-graph/line-graph.js';

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

/** Default bands and no setpoint: 48 bar + 24 ticks + 60 labels = 132 thick. */
async function mount(fixedAspectRatio = false): Promise<ObcGaugeHorizontal> {
  const screen = render(
    html`<div style="display: block; width: 600px; height: 260px">
      <obc-gauge-horizontal
        .minValue=${0}
        .maxValue=${100}
        .value=${40}
        .primaryTickmarkInterval=${20}
        .fixedAspectRatio=${fixedAspectRatio}
      ></obc-gauge-horizontal>
    </div>`
  );
  const el = screen.container.querySelector(
    'obc-gauge-horizontal'
  ) as ObcGaugeHorizontal;
  await el.updateComplete;
  return el;
}

describe('obc-gauge-horizontal sizing', () => {
  it('draws at its 384 px reference length by default', async () => {
    const el = await mount();
    const svg = svgOf(el);
    expect(svg.getAttribute('width')).toBe('384px');
    expect(svg.getAttribute('preserveAspectRatio')).toBe('none');
    expect(Math.round(svg.getBoundingClientRect().width)).toBe(384);
    expect(el.style.display).toBe('');
  });

  it('fills the box and keeps the label scale when fixedAspectRatio is turned on after connect', async () => {
    const el = await mount();
    el.fixedAspectRatio = true;
    await until(() => scaleOf(el) !== 1);
    const svg = svgOf(el);
    expect(el.style.display).toBe('block');
    expect(el.style.width).toBe('100%');
    expect(svg.getAttribute('width')).toBe('100%');
    expect(svg.getAttribute('height')).toBe('100%');
    expect(svg.getAttribute('preserveAspectRatio')).toBe('xMidYMid meet');
    expect(Math.round(svg.getBoundingClientRect().width)).toBe(600);
    expect(scaleOf(el)).toBeCloseTo(600 / 384, 3);
  });

  it('follows scaleReferenceSize', async () => {
    const el = await mount(true);
    await until(() => Math.abs(scaleOf(el) - 600 / 384) < 1e-3);
    el.scaleReferenceSize = 192;
    await until(() => Math.abs(scaleOf(el) - 600 / 192) < 1e-3);
    expect(scaleOf(el)).toBeCloseTo(3.125, 3);
  });

  it('reports the scaled thickness, and re-reports on side and showLabels', async () => {
    const el = await mount();
    const reports: number[] = [];
    el.addEventListener('scale-dimensions-changed', (e) =>
      reports.push((e as CustomEvent<{thickness: number}>).detail.thickness)
    );
    el.fixedAspectRatio = true;
    // 132 × 600 / 384 = 206.25
    await until(() => reports[reports.length - 1] === 206);
    const before = reports.length;
    el.side = ExternalScaleSide.top;
    await el.updateComplete;
    await frame();
    expect(reports.length).toBeGreaterThan(before);
    el.showLabels = false;
    // (48 + 24) × 600 / 384 = 112.5
    await until(() => reports[reports.length - 1] === 113);
  });

  it('returns to the pixel drawing when fixedAspectRatio is turned off', async () => {
    const el = await mount(true);
    await until(() => scaleOf(el) > 1);
    el.fixedAspectRatio = false;
    await el.updateComplete;
    await frame();
    expect(svgOf(el).getAttribute('width')).toBe('384px');
    expect(el.style.display).toBe('');
    expect(scaleOf(el)).toBe(1);
  });

  it('gives a fixed-aspect chart its rendered thickness', async () => {
    const screen = render(
      html`<obc-line-graph
        style="display: block; width: 800px"
        .width=${800}
        .height=${400}
        .fixedAspectRatioScaling=${true}
        .data=${[
          {label: 'a', value: 10},
          {label: 'b', value: 40},
          {label: 'c', value: 25},
        ]}
      >
        <obc-gauge-horizontal
          slot="bottom-scale"
          .minValue=${0}
          .maxValue=${100}
          .value=${40}
          .primaryTickmarkInterval=${20}
        ></obc-gauge-horizontal>
      </obc-line-graph>`
    );
    const chart = screen.container.querySelector(
      'obc-line-graph'
    ) as ObcLineGraph;
    const el = screen.container.querySelector(
      'obc-gauge-horizontal'
    ) as ObcGaugeHorizontal;
    await chart.updateComplete;
    const reports: number[] = [];
    chart
      .shadowRoot!.querySelector('slot[name="bottom-scale"]')!
      .addEventListener('scale-dimensions-changed', (e) =>
        reports.push((e as CustomEvent<{thickness: number}>).detail.thickness)
      );
    // The slot is 800 px wide: 132 × 800 / 384 = 275
    await until(() => Math.abs(scaleOf(el) - 800 / 384) < 1e-3, 90);
    await until(() => reports[reports.length - 1] === 275, 90);
    // The chart grows the slot once its debounced layout runs.
    await until(
      () => Math.round(svgOf(el).getBoundingClientRect().height) === 275,
      90
    );
  });

  it('leaves a consumer inline style alone in pixel mode', async () => {
    const screen = render(
      html`<obc-gauge-horizontal
        style="display: none; width: 300px"
        .minValue=${0}
        .maxValue=${100}
      ></obc-gauge-horizontal>`
    );
    const el = screen.container.querySelector(
      'obc-gauge-horizontal'
    ) as ObcGaugeHorizontal;
    await el.updateComplete;
    await frame();
    expect(el.style.display).toBe('none');
    expect(el.style.width).toBe('300px');
  });

  it('gives a consumer inline style back after a toggle cycle', async () => {
    const screen = render(
      html`<div style="display: block; width: 600px; height: 260px">
        <obc-gauge-horizontal
          style="display: inline-block; height: 120px; width: 300px"
          .minValue=${0}
          .maxValue=${100}
        ></obc-gauge-horizontal>
      </div>`
    );
    const el = screen.container.querySelector(
      'obc-gauge-horizontal'
    ) as ObcGaugeHorizontal;
    await el.updateComplete;
    el.fixedAspectRatio = true;
    await until(() => scaleOf(el) !== 1);
    expect(el.style.width).toBe('100%');
    el.fixedAspectRatio = false;
    await el.updateComplete;
    expect(el.style.display).toBe('inline-block');
    expect(el.style.height).toBe('120px');
    expect(el.style.width).toBe('300px');
  });
});
