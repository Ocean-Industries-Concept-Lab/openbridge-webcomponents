import {describe, it, expect, afterEach, vi} from 'vitest';
import '../main.css';
import '../bars-graphs/donut-chart/donut-chart.js';
import '../bars-graphs/pie-chart/pie-chart.js';
import '../bars-graphs/polar-chart/polar-chart.js';
import '../bars-graphs/radial-bar-chart/radial-bar-chart.js';
import '../bars-graphs/line-graph/line-graph.js';
import '../bars-graphs/area-graph/area-graph.js';
import type {ChartLineDataset} from '../building-blocks/chart-line/chart-line-base.js';
import {generateLegendHTML} from './legend.js';

const PROBE = '__obcLegendProbe';
const probe = () => (window as unknown as Record<string, unknown>)[PROBE];

/** Markup that sets the probe when the browser parses it as HTML. */
const markup = (tag: string) =>
  `<img src="x" onerror="window.${PROBE} = '${tag}'">`;

/** A colour that closes a quoted `style` attribute and adds a handler. */
const HOSTILE_COLOR = `red" onmouseover="window.${PROBE} = 'color'`;

/** A colour that carries further declarations after the colour itself. */
const OVERLAY_COLOR = 'red; position: fixed; inset: 0';

const series = (overrides: Partial<ChartLineDataset>): ChartLineDataset[] => [
  {label: 'Series', data: [1, 2], ...overrides},
];

const mounted: HTMLElement[] = [];

afterEach(() => {
  mounted.splice(0).forEach((el) => el.remove());
  delete (window as unknown as Record<string, unknown>)[PROBE];
});

/** Mounts a chart with its legend on and waits for the legend rows. */
async function legendOf<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  configure: (chart: HTMLElementTagNameMap[K]) => void
): Promise<HTMLElement> {
  const host = document.createElement('div');
  host.style.cssText = 'width: 600px; height: 400px';
  document.body.appendChild(host);
  mounted.push(host);

  const chart = document.createElement(tag);
  configure(chart);
  (chart as unknown as {legend: boolean}).legend = true;
  host.appendChild(chart);

  let legend: HTMLElement | null = null;
  await vi.waitFor(() => {
    legend = chart.shadowRoot!.querySelector<HTMLElement>('.legend');
    expect(legend?.querySelector('.legend-item')).toBeTruthy();
  });

  // An injected image reports its failed load asynchronously; wait for it so
  // the probe is read after any handler had its chance to run.
  await Promise.all(
    [...legend!.querySelectorAll('img')].map(
      (img) =>
        img.complete ||
        new Promise((resolve) => {
          img.addEventListener('error', resolve, {once: true});
          img.addEventListener('load', resolve, {once: true});
        })
    )
  );
  return legend!;
}

/** Every element in the legend is one the legend itself builds. */
function expectOnlyLegendMarkup(legend: HTMLElement) {
  for (const el of legend.querySelectorAll('*')) {
    expect(['DIV', 'SPAN']).toContain(el.tagName);
    for (const attr of el.getAttributeNames()) {
      expect(['class', 'style']).toContain(attr);
    }
  }
  expect(probe()).toBeUndefined();
}

describe('chart legend treats consumer strings as text', () => {
  it('donut: label and unit', async () => {
    const legend = await legendOf('obc-donut-chart', (chart) => {
      chart.data = [
        {label: markup('label'), value: 60},
        {label: 'B', value: 40},
      ];
      chart.showUnit = true;
      chart.outerLabelUnit = markup('unit');
    });

    expectOnlyLegendMarkup(legend);
    expect(legend.querySelector('.legend-label')!.textContent).toBe(
      markup('label')
    );
    expect(legend.querySelector('.legend-unit')!.textContent).toBe(
      markup('unit')
    );
  });

  it('pie: label and unit', async () => {
    const legend = await legendOf('obc-pie-chart', (chart) => {
      chart.data = [
        {label: markup('label'), value: 60},
        {label: 'B', value: 40},
      ];
      chart.showUnit = true;
      chart.outerLabelUnit = markup('unit');
    });

    expectOnlyLegendMarkup(legend);
    expect(legend.querySelector('.legend-label')!.textContent).toBe(
      markup('label')
    );
    expect(legend.querySelector('.legend-unit')!.textContent).toBe(
      markup('unit')
    );
  });

  it('polar: sector label', async () => {
    const legend = await legendOf('obc-polar-chart', (chart) => {
      chart.data = [
        {label: markup('label'), value: 60},
        {label: 'B', value: 40},
      ];
      chart.showSectorLabels = true;
    });

    expectOnlyLegendMarkup(legend);
    expect(legend.querySelector('.legend-label')!.textContent).toBe(
      markup('label')
    );
  });

  it('polar: unit appended to the angle label', async () => {
    const legend = await legendOf('obc-polar-chart', (chart) => {
      chart.data = [
        {label: 'A', value: 60},
        {label: 'B', value: 40},
      ];
      chart.outerLabelUnit = markup('unit');
    });

    expectOnlyLegendMarkup(legend);
    expect(legend.querySelector('.legend-label')!.textContent).toBe(
      `0${markup('unit')}`
    );
  });

  it('radial bar: a value that arrives as a string', async () => {
    const legend = await legendOf('obc-radial-bar-chart', (chart) => {
      chart.data = [markup('value') as unknown as number, 40];
    });

    expectOnlyLegendMarkup(legend);
    expect(legend.querySelector('.legend-value')!.textContent).toBe(
      markup('value')
    );
  });

  it('line graph: dataset label', async () => {
    const legend = await legendOf('obc-line-graph', (chart) => {
      chart.datasets = series({label: markup('label')});
    });

    expectOnlyLegendMarkup(legend);
    expect(legend.querySelector('.legend-label')!.textContent).toBe(
      markup('label')
    );
  });

  it('area graph: dataset label', async () => {
    const legend = await legendOf('obc-area-graph', (chart) => {
      chart.datasets = series({label: markup('label')});
    });

    expectOnlyLegendMarkup(legend);
    expect(legend.querySelector('.legend-label')!.textContent).toBe(
      markup('label')
    );
  });
});

describe('chart legend swatch takes a colour and nothing else', () => {
  it('line graph: a colour cannot add an attribute', async () => {
    const legend = await legendOf('obc-line-graph', (chart) => {
      chart.datasets = series({borderColor: HOSTILE_COLOR});
    });

    expectOnlyLegendMarkup(legend);
  });

  it('line graph: a colour cannot add a declaration', async () => {
    const legend = await legendOf('obc-line-graph', (chart) => {
      chart.datasets = series({borderColor: OVERLAY_COLOR});
    });

    const swatch = legend.querySelector<HTMLElement>('.legend-color')!;
    expect(swatch.style.position).toBe('');
    expect(getComputedStyle(swatch).position).toBe('static');
  });

  it('donut: a colour cannot add an attribute', async () => {
    const legend = await legendOf('obc-donut-chart', (chart) => {
      chart.data = [
        {label: 'A', value: 60},
        {label: 'B', value: 40},
      ];
      chart.colors = [HOSTILE_COLOR, 'blue'];
    });

    expectOnlyLegendMarkup(legend);
  });

  it('a valid colour still paints the swatch', async () => {
    const legend = await legendOf('obc-line-graph', (chart) => {
      chart.datasets = series({borderColor: 'rgb(1, 2, 3)'});
    });

    const swatch = legend.querySelector<HTMLElement>('.legend-color')!;
    expect(getComputedStyle(swatch).backgroundColor).toBe('rgb(1, 2, 3)');
  });
});

describe('generateLegendHTML', () => {
  it('returns markup that parses back to the values as text', () => {
    const holder = document.createElement('div');
    holder.innerHTML = generateLegendHTML([
      {
        fillStyle: HOSTILE_COLOR,
        label: markup('label'),
        value: markup('value'),
        unit: markup('unit'),
      },
    ]);

    expectOnlyLegendMarkup(holder);
    expect(holder.querySelector('.legend-label')!.textContent).toBe(
      markup('label')
    );
    expect(holder.querySelector('.legend-value')!.textContent).toBe(
      markup('value')
    );
    expect(holder.querySelector('.legend-unit')!.textContent).toBe(
      markup('unit')
    );
  });

  it('keeps a valid colour on the swatch', () => {
    const holder = document.createElement('div');
    holder.innerHTML = generateLegendHTML([
      {fillStyle: 'rgb(1, 2, 3)', label: 'A', value: '1', unit: ''},
    ]);

    expect(
      holder.querySelector<HTMLElement>('.legend-color')!.style.backgroundColor
    ).toBe('rgb(1, 2, 3)');
  });
});
