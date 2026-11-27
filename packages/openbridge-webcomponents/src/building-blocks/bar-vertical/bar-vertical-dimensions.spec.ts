import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import '../../main.css';
import './bar-vertical.js';
import '../../bars-graphs/line-graph/line-graph.js';
import '../../automation/automation-tank/automation-tank.js';
import type {ObcBarVertical} from './bar-vertical.js';
import type {ObcAutomationTank} from '../../automation/automation-tank/automation-tank.js';

const frame = () => new Promise((resolve) => requestAnimationFrame(resolve));

/** The tank draws its bar once it has measured its cell. */
async function tankBar(tank: ObcAutomationTank): Promise<ObcBarVertical> {
  for (let i = 0; i < 20; i++) {
    const bar = tank.shadowRoot!.querySelector('obc-bar-vertical');
    if (bar) return bar as ObcBarVertical;
    await frame();
  }
  throw new Error('the tank never rendered its bar');
}

/**
 * A scale reports its thickness so the chart it is slotted into can reserve
 * room for it. The chart listens on its slot, which receives the report
 * without `composed`; the report has no business outside the component that
 * renders the scale.
 */
describe('scale-dimensions-changed', () => {
  it('reaches the chart slot a scale is slotted into', async () => {
    const screen = render(
      html`<obc-line-graph style="width: 400px; height: 200px">
        <obc-bar-vertical slot="left-scale"></obc-bar-vertical>
      </obc-line-graph>`
    );
    const chart = screen.container.querySelector('obc-line-graph')!;
    const bar = screen.container.querySelector(
      'obc-bar-vertical'
    ) as ObcBarVertical;
    await chart.updateComplete;
    const slot = chart.shadowRoot!.querySelector('slot[name="left-scale"]')!;
    let reports = 0;
    slot.addEventListener('scale-dimensions-changed', () => reports++);

    bar.value = 40;
    await bar.updateComplete;
    await frame();
    expect(reports).toBeGreaterThan(0);
  });

  it('stays inside a component that renders a scale in its own shadow root', async () => {
    const screen = render(
      html`<obc-automation-tank
        style="display: block; width: 200px; height: 300px"
      ></obc-automation-tank>`
    );
    const tank = screen.container.querySelector(
      'obc-automation-tank'
    ) as ObcAutomationTank;
    await tank.updateComplete;
    await tankBar(tank);
    let leaked = 0;
    const count = () => leaked++;
    document.addEventListener('scale-dimensions-changed', count);
    try {
      tank.value = 40;
      await tank.updateComplete;
      const bar = await tankBar(tank);
      await bar.updateComplete;
      await frame();
    } finally {
      document.removeEventListener('scale-dimensions-changed', count);
    }
    expect(leaked).toBe(0);
  });
});

/** The bar fills its cell exactly; the advice column beside it is 16 px at every cell size. */
describe('automation-tank bar mode advice column', () => {
  it('keeps the pill at 8 px and no gutter at two cell sizes', async () => {
    for (const [w, h] of [
      [140, 320],
      [280, 640],
    ]) {
      const screen = render(
        html`<obc-automation-tank
          style="display: block; width: ${w}px; height: ${h}px"
          .chartMode=${'bar'}
          .value=${40}
          .max=${100}
          .hasAdvice=${true}
          .advices=${[{min: 20, max: 40, category: 'optimal'}]}
        ></obc-automation-tank>`
      );
      const tank = screen.container.querySelector(
        'obc-automation-tank'
      ) as ObcAutomationTank;
      await tank.updateComplete;
      const bar = await tankBar(tank);
      await bar.updateComplete;
      for (let i = 0; i < 20; i++) await frame();
      const svg = bar.querySelector('svg')!;
      const scale = svg.getScreenCTM()!.a;
      const band = svg.querySelector('path.advice-band') as SVGPathElement;
      expect(+(band.getBBox().width * scale).toFixed(1)).toBeCloseTo(8, 1);
      // the viewBox is sized to the cell: the painted width is the cell's
      expect(
        Math.abs(svg.viewBox.baseVal.width * scale - bar.clientWidth)
      ).toBeLessThan(1.5);
    }
  });
});
