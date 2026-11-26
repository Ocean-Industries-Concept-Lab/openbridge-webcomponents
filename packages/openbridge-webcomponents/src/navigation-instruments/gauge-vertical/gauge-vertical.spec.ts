import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import '../../main.css';
import './gauge-vertical.js';
import '../../bars-graphs/line-graph/line-graph.js';
import {ExternalScaleSide} from './gauge-vertical.js';
import type {ObcGaugeVertical} from './gauge-vertical.js';
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

/** The painted thickness of the first advice band, in CSS px. */
const pillPx = (el: Element) => {
  const svg = svgOf(el);
  const band = svg.querySelector('path.advice-band') as SVGPathElement;
  return +(band.getBBox().width * svg.getScreenCTM()!.a).toFixed(2);
};

/** Default bands and no setpoint: 48 bar + 24 ticks + 60 labels = 132 thick. */
async function mount(fixedAspectRatio = false): Promise<ObcGaugeVertical> {
  const screen = render(
    html`<div style="display: block; width: 480px; height: 600px">
      <obc-gauge-vertical
        .minValue=${0}
        .maxValue=${100}
        .value=${40}
        .primaryTickmarkInterval=${20}
        .fixedAspectRatio=${fixedAspectRatio}
      ></obc-gauge-vertical>
    </div>`
  );
  const el = screen.container.querySelector(
    'obc-gauge-vertical'
  ) as ObcGaugeVertical;
  await el.updateComplete;
  return el;
}

describe('obc-gauge-vertical sizing', () => {
  it('draws at its 384 px reference length by default', async () => {
    const el = await mount();
    const svg = svgOf(el);
    expect(svg.getAttribute('height')).toBe('384px');
    expect(svg.getAttribute('preserveAspectRatio')).toBe('none');
    expect(Math.round(svg.getBoundingClientRect().height)).toBe(384);
    expect(el.style.display).toBe('');
  });

  it('fills the box and keeps the label scale when fixedAspectRatio is turned on after connect', async () => {
    const el = await mount();
    el.fixedAspectRatio = true;
    await until(() => scaleOf(el) !== 1);
    const svg = svgOf(el);
    expect(el.style.display).toBe('block');
    expect(el.style.height).toBe('100%');
    expect(svg.getAttribute('width')).toBe('100%');
    expect(svg.getAttribute('height')).toBe('100%');
    expect(svg.getAttribute('preserveAspectRatio')).toBe('xMidYMid meet');
    expect(Math.round(svg.getBoundingClientRect().height)).toBe(600);
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
    el.side = ExternalScaleSide.left;
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
    expect(svgOf(el).getAttribute('height')).toBe('384px');
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
        <obc-gauge-vertical
          slot="right-scale"
          .minValue=${0}
          .maxValue=${100}
          .value=${40}
          .primaryTickmarkInterval=${20}
        ></obc-gauge-vertical>
      </obc-line-graph>`
    );
    const chart = screen.container.querySelector(
      'obc-line-graph'
    ) as ObcLineGraph;
    const el = screen.container.querySelector(
      'obc-gauge-vertical'
    ) as ObcGaugeVertical;
    await chart.updateComplete;
    const reports: number[] = [];
    chart
      .shadowRoot!.querySelector('slot[name="right-scale"]')!
      .addEventListener('scale-dimensions-changed', (e) =>
        reports.push((e as CustomEvent<{thickness: number}>).detail.thickness)
      );
    // The slot is 400 px tall: 132 × 400 / 384 = 137.5
    await until(() => Math.abs(scaleOf(el) - 400 / 384) < 1e-3, 90);
    await until(() => reports[reports.length - 1] === 138, 90);
    // The chart widens the slot once its debounced layout runs.
    await until(
      () => Math.round(svgOf(el).getBoundingClientRect().width) === 138,
      90
    );
  });

  it('leaves a consumer inline style alone in pixel mode', async () => {
    const screen = render(
      html`<obc-gauge-vertical
        style="display: none; height: 300px"
        .minValue=${0}
        .maxValue=${100}
      ></obc-gauge-vertical>`
    );
    const el = screen.container.querySelector(
      'obc-gauge-vertical'
    ) as ObcGaugeVertical;
    await el.updateComplete;
    await frame();
    expect(el.style.display).toBe('none');
    expect(el.style.height).toBe('300px');
  });

  it('gives a consumer inline style back after a toggle cycle', async () => {
    const screen = render(
      html`<div style="display: block; width: 300px; height: 600px">
        <obc-gauge-vertical
          style="display: inline-block; height: 300px !important; width: 120px"
          .minValue=${0}
          .maxValue=${100}
        ></obc-gauge-vertical>
      </div>`
    );
    const el = screen.container.querySelector(
      'obc-gauge-vertical'
    ) as ObcGaugeVertical;
    await el.updateComplete;
    el.fixedAspectRatio = true;
    await until(() => scaleOf(el) !== 1);
    expect(el.style.height).toBe('100%');
    el.fixedAspectRatio = false;
    await el.updateComplete;
    expect(el.style.display).toBe('inline-block');
    expect(el.style.height).toBe('300px');
    expect(el.style.getPropertyPriority('height')).toBe('important');
    expect(el.style.width).toBe('120px');
  });

  it('follows the painted scale when the host is narrower than the drawing', async () => {
    const screen = render(
      html`<div style="display: block; width: 120px; height: 600px">
        <obc-gauge-vertical
          .minValue=${0}
          .maxValue=${100}
          .value=${40}
          .primaryTickmarkInterval=${20}
          .fixedAspectRatio=${true}
        ></obc-gauge-vertical>
      </div>`
    );
    const el = screen.container.querySelector(
      'obc-gauge-vertical'
    ) as ObcGaugeVertical;
    await el.updateComplete;
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
    const screen = render(
      html`<div style="display: block; width: 120px; height: 600px">
        <obc-gauge-vertical
          .minValue=${0}
          .maxValue=${100}
          .value=${40}
          .primaryTickmarkInterval=${20}
          .fixedAspectRatio=${true}
        ></obc-gauge-vertical>
      </div>`
    );
    const el = screen.container.querySelector(
      'obc-gauge-vertical'
    ) as ObcGaugeVertical;
    await el.updateComplete;
    const reports: number[] = [];
    el.addEventListener('scale-dimensions-changed', (e) =>
      reports.push((e as CustomEvent<{thickness: number}>).detail.thickness)
    );
    await until(() => Math.abs(scaleOf(el) - 120 / 132) < 1e-3);
    // 48 + 24 = 72 wide without labels: 120 px has room, the height decides
    el.showLabels = false;
    await until(() => Math.abs(scaleOf(el) - 600 / 384) < 1e-3);
    await until(() => reports[reports.length - 1] === 113);
  });

  it('measures the content box of a padded host', async () => {
    const screen = render(
      html`<div style="display: block; width: 120px; height: 600px">
        <obc-gauge-vertical
          style="padding: 20px"
          .minValue=${0}
          .maxValue=${100}
          .value=${40}
          .primaryTickmarkInterval=${20}
          .fixedAspectRatio=${true}
        ></obc-gauge-vertical>
      </div>`
    );
    const el = screen.container.querySelector(
      'obc-gauge-vertical'
    ) as ObcGaugeVertical;
    await el.updateComplete;
    const reports: number[] = [];
    el.addEventListener('scale-dimensions-changed', (e) =>
      reports.push((e as CustomEvent<{thickness: number}>).detail.thickness)
    );
    // 80 px of content width for the 132-wide drawing
    await until(() => Math.abs(scaleOf(el) - 80 / 132) < 1e-3);
    reports.length = 0;
    // 72 wide without labels: 80 / 72 is still under the height's 1.5625
    el.showLabels = false;
    await until(() => Math.abs(scaleOf(el) - 80 / 72) < 1e-3);
    await until(() => reports[reports.length - 1] === 80);
  });

  it('keeps the advice pill at 8 px at every scale', async () => {
    const screen = render(
      html`<div style="display: block; width: 480px; height: 600px">
        <obc-gauge-vertical
          .minValue=${0}
          .maxValue=${100}
          .value=${40}
          .primaryTickmarkInterval=${20}
          .advices=${[{min: 20, max: 40, category: 'optimal'}]}
          .fixedAspectRatio=${true}
        ></obc-gauge-vertical>
      </div>`
    );
    const el = screen.container.querySelector(
      'obc-gauge-vertical'
    ) as ObcGaugeVertical;
    await el.updateComplete;
    await until(() => Math.abs(scaleOf(el) - 600 / 384) < 1e-3);
    expect(pillPx(el)).toBeCloseTo(8, 1);
  });
});
