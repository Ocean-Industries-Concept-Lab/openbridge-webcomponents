import {describe, it, expect, afterEach} from 'vitest';
import '../../main.css';
import '../../bars-graphs/area-graph/area-graph.js';
import '../bar-vertical/bar-vertical.js';
import '../bar-horizontal/bar-horizontal.js';
import type {ObcAreaGraph} from '../../bars-graphs/area-graph/area-graph.js';
import type {ObcBarVertical} from '../bar-vertical/bar-vertical.js';
import type {ObcBarHorizontal} from '../bar-horizontal/bar-horizontal.js';
import {ExternalScaleSide} from '../external-scale/external-scale.js';
import {XAxisType} from './chart-line-base.js';

type ChartScales = {
  scales: Record<string, {min: number; max: number}>;
};

const frames = async (n = 12) => {
  for (let i = 0; i < n; i++) {
    await new Promise((r) => requestAnimationFrame(() => r(null)));
  }
};

const mounted: HTMLElement[] = [];

afterEach(() => {
  mounted.splice(0).forEach((el) => el.remove());
});

/**
 * Mounts an area graph with a left and a bottom scale slotted, then waits for
 * the slot → dimension → sync round trip to settle.
 */
async function mount(
  configure: (chart: ObcAreaGraph) => void,
  {withRight = false} = {}
) {
  document.documentElement.classList.add('obc-component-size-regular');
  const host = document.createElement('div');
  host.style.cssText = 'width: 600px; height: 300px';
  document.body.appendChild(host);
  mounted.push(host);

  const chart = document.createElement('obc-area-graph');
  chart.width = 600;
  chart.height = 300;
  configure(chart);

  const left = document.createElement('obc-bar-vertical');
  left.slot = 'left-scale';
  left.side = ExternalScaleSide.left;
  chart.appendChild(left);

  const bottom = document.createElement('obc-bar-horizontal');
  bottom.slot = 'bottom-scale';
  bottom.side = ExternalScaleSide.bottom;
  chart.appendChild(bottom);

  const right = document.createElement('obc-bar-vertical');
  if (withRight) {
    right.slot = 'right-scale';
    right.side = ExternalScaleSide.right;
    chart.appendChild(right);
  }

  host.appendChild(chart);
  await chart.updateComplete;
  await frames();
  return {chart, left, right, bottom};
}

const datasetAxisId = (chart: ObcAreaGraph, index = 0) =>
  (
    chart as unknown as {
      chart: {getDatasetMeta(i: number): {yAxisID: string}};
    }
  ).chart.getDatasetMeta(index).yAxisID;

const chartScales = (chart: ObcAreaGraph) =>
  (chart as unknown as {chart: ChartScales}).chart.scales;

const chartRange = (chart: ObcAreaGraph, id: string) => ({
  min: chartScales(chart)[id].min,
  max: chartScales(chart)[id].max,
});

const range = (scale: ObcBarVertical | ObcBarHorizontal) => ({
  min: scale.minValue,
  max: scale.maxValue,
});

const numberData = (values: number[]) => values.map((value, x) => ({x, value}));

describe('slotted scale range resolution (#1217)', () => {
  it('cascades a pinned y range whose yAxes entry has a custom id', async () => {
    const {left} = await mount((chart) => {
      chart.xAxisType = XAxisType.number;
      chart.yAxes = [{id: 'y-depth', position: 'left', min: 0, max: 75}];
      chart.data = numberData([10, 20, 30]);
    });
    expect(range(left)).toEqual({min: 0, max: 75});
  });

  it('cascades a pinned y range whose yAxes entry has no id', async () => {
    const {left} = await mount((chart) => {
      chart.xAxisType = XAxisType.number;
      chart.yAxes = [{position: 'left', min: 0, max: 75}];
      chart.data = numberData([10, 20, 30]);
    });
    expect(range(left)).toEqual({min: 0, max: 75});
  });

  it('plots single-series data on the configured axis, not a default one', async () => {
    const {chart} = await mount((c) => {
      c.xAxisType = XAxisType.number;
      c.yAxes = [{id: 'y-depth', position: 'left', min: 0, max: 75}];
      c.data = numberData([10, 20, 30]);
    });
    expect(datasetAxisId(chart)).toBe('y-depth');
    expect(Object.keys(chartScales(chart)).sort()).toEqual(['x', 'y-depth']);
  });

  it('feeds a right scale from the right-positioned axis', async () => {
    const {left, right} = await mount(
      (c) => {
        c.yAxes = [
          {id: 'y-temp', position: 'left', min: 0, max: 100},
          {id: 'y-pressure', position: 'right', min: 0, max: 10},
        ];
        c.datasets = [
          {label: 'T', data: [20, 25], yAxisID: 'y-temp'},
          {label: 'P', data: [2, 3], yAxisID: 'y-pressure'},
        ];
      },
      {withRight: true}
    );
    expect(range(left)).toEqual({min: 0, max: 100});
    expect(range(right)).toEqual({min: 0, max: 10});
  });

  it('follows an auto-ranged axis when the data changes', async () => {
    const {chart, left} = await mount((c) => {
      c.xAxisType = XAxisType.number;
      c.data = numberData([0, 5, 10]);
    });
    expect(range(left)).toEqual(chartRange(chart, 'y'));

    chart.data = numberData([0, 500, 1000]);
    await chart.updateComplete;
    await frames();
    expect(chartRange(chart, 'y').max).toBeGreaterThanOrEqual(1000);
    expect(range(left)).toEqual(chartRange(chart, 'y'));
  });
});
