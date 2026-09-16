import {describe, it, expect, afterEach, afterAll, vi} from 'vitest';
import '../../main.css';
import '../../bars-graphs/area-graph/area-graph.js';
import '../bar-vertical/bar-vertical.js';
import '../bar-horizontal/bar-horizontal.js';
import '../../navigation-instruments/gauge-trend/gauge-trend.js';
import type {ObcGaugeTrend} from '../../navigation-instruments/gauge-trend/gauge-trend.js';
import type {ObcAreaGraph} from '../../bars-graphs/area-graph/area-graph.js';
import type {ObcBarVertical} from '../bar-vertical/bar-vertical.js';
import type {ObcBarHorizontal} from '../bar-horizontal/bar-horizontal.js';
import {ExternalScaleSide} from '../external-scale/external-scale.js';
import {
  XAxisType,
  TimeDisplay,
  RangeLabels,
  interpolateDatasetY,
  type ChartLineDataset,
} from './chart-line-base.js';

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

afterAll(() => {
  document.documentElement.classList.remove('obc-component-size-regular');
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

type ChartGeometry = {
  chartArea: {left: number; right: number; top: number; bottom: number};
  options: {
    layout: {
      padding: {top: number; right: number; bottom: number; left: number};
    };
  };
};

const chartPadding = (chart: ObcAreaGraph) =>
  (chart as unknown as {chart: ChartGeometry}).chart.options.layout.padding;

const chartAreaOf = (chart: ObcAreaGraph) => {
  const a = (chart as unknown as {chart: ChartGeometry}).chart.chartArea;
  return {
    left: Math.round(a.left),
    right: Math.round(a.right),
    top: Math.round(a.top),
    bottom: Math.round(a.bottom),
  };
};

const canvasRect = (chart: ObcAreaGraph) =>
  chart.shadowRoot!.querySelector('canvas')!.getBoundingClientRect();

type DrawnRangeLabel = {axis: 'x' | 'y'; text: string; x: number; y: number};
const drawnRangeLabels = (chart: ObcAreaGraph) =>
  (chart as unknown as {lastRangeLabels: DrawnRangeLabel[]}).lastRangeLabels;

/** Mounts an area graph with no slotted scales at the given size. */
async function mountPlain(
  configure: (chart: ObcAreaGraph) => void,
  size: {width: number; height: number}
) {
  document.documentElement.classList.add('obc-component-size-regular');
  const host = document.createElement('div');
  document.body.appendChild(host);
  mounted.push(host);

  const chart = document.createElement('obc-area-graph');
  chart.width = size.width;
  chart.height = size.height;
  chart.showTickMarks = true;
  configure(chart);
  host.appendChild(chart);
  await chart.updateComplete;
  await frames();
  return chart;
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

type ChartTickCallback = {
  options: {scales: {x: {ticks: {callback(value: number): string}}}};
};

const xTickLabel = (chart: ObcAreaGraph, value: number) =>
  (
    chart as unknown as {chart: ChartTickCallback}
  ).chart.options.scales.x.ticks.callback(value);

describe('pinned x range (#1218)', () => {
  it('pins the x scale and the bottom scale beyond the data extent', async () => {
    const {chart, bottom} = await mount((c) => {
      c.xAxisType = XAxisType.number;
      c.xAxis = {min: -12, max: 0};
      c.data = [-5, -4, -3, -2, -1, 0].map((x) => ({x, value: 1}));
    });
    expect(chartRange(chart, 'x')).toEqual({min: -12, max: 0});
    expect(range(bottom)).toEqual({min: -12, max: 0});
  });

  it('is ignored on a category axis', async () => {
    const {chart} = await mount((c) => {
      c.xAxis = {min: -12, max: 0};
      c.data = [
        {label: 'a', value: 1},
        {label: 'b', value: 2},
        {label: 'c', value: 3},
      ];
    });
    expect(chartRange(chart, 'x')).toEqual({min: 0, max: 2});
  });

  it('makes xAxis.max the 0min reference for relative time labels', async () => {
    const minute = 60_000;
    const now = 1_757_430_000_000;
    const {chart} = await mount((c) => {
      c.xAxisType = XAxisType.time;
      c.timeDisplay = TimeDisplay.minutes;
      c.xAxis = {min: now - 10 * minute, max: now};
      // Buffer still filling: newest sample is three minutes short of `max`.
      c.data = [7, 6, 5, 4, 3].map((ago) => ({
        x: now - ago * minute,
        value: 1,
      }));
    });
    expect(xTickLabel(chart, now)).toBe('0min');
    expect(xTickLabel(chart, now - 10 * minute)).toBe('-10min');
  });
});

describe('slotted scales on a time axis (#1219)', () => {
  const minute = 60_000;
  const now = 1_757_430_000_000;
  const twelveMinutes = Array.from({length: 12}, (_, i) => ({
    x: now - (11 - i) * minute,
    value: i,
  }));

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('cascades minutes relative to the reference, not epoch milliseconds', async () => {
    const {bottom} = await mount((c) => {
      c.xAxisType = XAxisType.time;
      c.timeDisplay = TimeDisplay.minutes;
      c.data = twelveMinutes;
    });
    // A plausible interval for the plotted axis must stay plausible here.
    bottom.primaryTickmarkInterval = 2;
    await bottom.updateComplete;
    expect(range(bottom)).toEqual({min: -11, max: 0});
  });

  it('converts a pinned x range to minutes as well', async () => {
    const {bottom} = await mount((c) => {
      c.xAxisType = XAxisType.time;
      c.timeDisplay = TimeDisplay.minutes;
      c.xAxis = {min: now - 10 * minute, max: now};
      c.data = twelveMinutes.slice(7);
    });
    expect(range(bottom)).toEqual({min: -10, max: 0});
  });

  it("leaves the scale alone in 'date' display and says why", async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const {bottom} = await mount((c) => {
      c.xAxisType = XAxisType.time;
      c.timeDisplay = TimeDisplay.date;
      c.data = twelveMinutes;
    });
    expect(range(bottom)).toEqual({min: 0, max: 100});
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('date'));
  });
});

describe('range labels below the threshold (#1191)', () => {
  const small = {width: 120, height: 72};

  it('reserves a measured side gutter and a one-line bottom gutter', async () => {
    const chart = await mountPlain((c) => {
      c.rangeLabels = RangeLabels.xy;
      c.data = [3.5, 7, 4].map((value, i) => ({label: `L${i}`, value}));
    }, small);
    const padding = chartPadding(chart);
    expect(padding.left).toBeGreaterThan(8);
    expect(padding.right).toBe(0);
    expect(padding.bottom).toBeGreaterThan(4);
    expect(padding.top).toBe(0);
    expect(
      drawnRangeLabels(chart)
        .map((l) => l.text)
        .sort()
    ).toEqual(['3.5', '7.0', 'L0', 'L2'].sort());
  });

  it('clamps min and max to the plot edges and adds 0 inside a bipolar range', async () => {
    const chart = await mountPlain((c) => {
      c.rangeLabels = RangeLabels.y;
      c.yAxes = [{id: 'y', position: 'left', min: -100, max: 100}];
      c.data = [-50, 50].map((value, i) => ({label: String(i), value}));
    }, small);
    const labels = drawnRangeLabels(chart);
    const area = chartAreaOf(chart);
    expect(labels.map((l) => l.text)).toEqual(['100', '0', '-100']);
    expect(Math.round(labels[0].y)).toBe(area.top);
    expect(Math.round(labels[2].y)).toBe(area.bottom);
  });

  it('does nothing above the threshold or when hasLabelPadding is false', async () => {
    const big = await mountPlain(
      (c) => {
        c.rangeLabels = RangeLabels.xy;
        c.data = numberData([1, 2]);
      },
      {width: 300, height: 200}
    );
    expect(drawnRangeLabels(big)).toEqual([]);
    const edge = await mountPlain((c) => {
      c.rangeLabels = RangeLabels.xy;
      c.hasLabelPadding = false;
      c.data = numberData([1, 2]);
    }, small);
    expect(chartPadding(edge)).toEqual({top: 0, right: 0, bottom: 0, left: 0});
  });

  it('pads a slotted side by its reported thickness below the threshold', async () => {
    const {chart, left} = await mount((c) => {
      c.width = 160;
      c.height = 120;
      c.data = numberData([1, 2, 3]);
    });
    const reported = (
      chart as unknown as {externalScaleDimensions: Map<string, number>}
    ).externalScaleDimensions.get('left');
    expect(reported).toBeGreaterThan(0);
    expect(chartAreaOf(chart).left).toBeGreaterThanOrEqual(reported!);
    expect(left.getBoundingClientRect().right).toBeLessThanOrEqual(
      canvasRect(chart).left + chartAreaOf(chart).left + 1
    );
  });
});

describe('compact labels cascade to slotted scales (#1191)', () => {
  it('switches slotted scales to main-tickmark labels below the threshold', async () => {
    const {left, bottom} = await mount((c) => {
      c.rangeLabels = RangeLabels.xy;
      c.width = 160;
      c.height = 120;
      c.data = numberData([1, 2, 3]);
    });
    expect(left.showLabels).toBe(true);
    expect(left.showMainTickmarkLabels).toBe(true);
    expect(bottom.showLabels).toBe(true);
    expect(bottom.showMainTickmarkLabels).toBe(true);
  });

  it('covers only the requested axis', async () => {
    const {left, bottom} = await mount((c) => {
      c.rangeLabels = RangeLabels.y;
      c.width = 160;
      c.height = 120;
      c.data = numberData([1, 2, 3]);
    });
    expect(left.showMainTickmarkLabels).toBe(true);
    expect(bottom.showLabels).toBe(false);
    expect(bottom.showMainTickmarkLabels).toBe(false);
  });

  it('leaves slotted scale labels off below the threshold without rangeLabels', async () => {
    const {left} = await mount((c) => {
      c.width = 160;
      c.height = 120;
      c.data = numberData([1, 2, 3]);
    });
    expect(left.showLabels).toBe(false);
    expect(left.showMainTickmarkLabels).toBe(false);
  });

  it('never sets main-tickmark labels above the threshold', async () => {
    const {left} = await mount((c) => {
      c.rangeLabels = RangeLabels.xy;
      c.data = numberData([1, 2, 3]);
    });
    expect(left.showLabels).toBe(true);
    expect(left.showMainTickmarkLabels).toBe(false);
  });

  it('follows a rangeLabels change on a mounted chart', async () => {
    const {chart, left} = await mount((c) => {
      c.width = 160;
      c.height = 120;
      c.data = numberData([1, 2, 3]);
    });
    chart.rangeLabels = RangeLabels.y;
    await chart.updateComplete;
    await frames();
    expect(left.showMainTickmarkLabels).toBe(true);
  });
});

describe('compact label band on slotted scales (#1191)', () => {
  it('narrows the label band to the labels while compact, and restores it after', async () => {
    const {chart, left, bottom} = await mount((c) => {
      c.rangeLabels = RangeLabels.xy;
      c.width = 160;
      c.height = 120;
      c.data = numberData([1, 2, 3]);
    });
    expect(left.labelThickness).toBeGreaterThan(8);
    expect(left.labelThickness).toBeLessThan(60);
    expect(bottom.labelThickness).toBeGreaterThan(8);
    expect(bottom.labelThickness).toBeLessThan(60);

    chart.rangeLabels = RangeLabels.none;
    await chart.updateComplete;
    await frames();
    expect(left.labelThickness).toBe(60);
    expect(bottom.labelThickness).toBe(60);
  });

  it('keeps a consumer band untouched when nothing is compact', async () => {
    const {left} = await mount((c) => {
      c.width = 160;
      c.height = 120;
      c.data = numberData([1, 2, 3]);
    });
    expect(left.labelThickness).toBe(60);
  });
});

describe('slotted scale padding matches the chart padding (#1191)', () => {
  it('gives a slotted scale the padding the chart lays out with, below the threshold', async () => {
    const {chart, left} = await mount((c) => {
      c.rangeLabels = RangeLabels.xy;
      c.width = 160;
      c.height = 120;
      c.data = numberData([1, 2, 3]);
    });
    const padding = chartPadding(chart);
    expect(left.paddingTop).toBe(padding.top);
    expect(left.paddingBottom).toBe(padding.bottom);
  });

  it('keeps a gauge-trend scale level with its chart area in a compact container', async () => {
    const host = document.createElement('div');
    host.style.cssText = 'width: 160px';
    document.body.appendChild(host);
    mounted.push(host);
    const gauge = document.createElement('obc-gauge-trend') as ObcGaugeTrend;
    gauge.width = 160;
    gauge.height = 160;
    gauge.rangeLabels = RangeLabels.xy;
    gauge.hasBar = true;
    gauge.hasScale = true;
    gauge.data = [45, 52, 48, 55].map((value, i) => ({
      label: String(i),
      value,
    }));
    host.appendChild(gauge);
    await gauge.updateComplete;
    await frames(30);

    const bar = gauge.querySelector('obc-bar-vertical') as ObcBarVertical;
    const padding = chartPadding(gauge as unknown as ObcAreaGraph);
    const toViewBox = (px: number) =>
      Math.round((px * gauge.scaleReferenceSize) / gauge.height);
    expect(bar.paddingTop).toBe(toViewBox(padding.top));
    expect(bar.paddingBottom).toBe(toViewBox(padding.bottom));
  });
});

describe('range labels follow the data (#1191)', () => {
  it('redraws the labels from the new extent after a data change', async () => {
    const chart = await mountPlain(
      (c) => {
        c.rangeLabels = RangeLabels.y;
        c.data = numberData([3, 7]);
      },
      {width: 120, height: 72}
    );
    expect(drawnRangeLabels(chart).map((l) => l.text)).toEqual(['7', '3']);

    chart.data = numberData([10, 90]);
    await chart.updateComplete;
    await frames();
    expect(drawnRangeLabels(chart).map((l) => l.text)).toEqual(['90', '10']);
  });
});

describe('scale stays level with the chart area at any container width (#1191)', () => {
  /** The bar's drawing area on screen: its box minus its padding, scaled from viewBox units. */
  const barDrawingArea = (bar: ObcBarVertical) => {
    const rect = bar.getBoundingClientRect();
    const unit = rect.height / bar.scaleReferenceSize;
    return {
      top: rect.top + bar.paddingTop * unit,
      bottom: rect.bottom - bar.paddingBottom * unit,
    };
  };

  for (const containerWidth of [160, 236, 300]) {
    it(`gauge-trend at ${containerWidth}px wide, 160×128 ratio, range labels`, async () => {
      const host = document.createElement('div');
      host.style.cssText = `width: ${containerWidth}px`;
      document.body.appendChild(host);
      mounted.push(host);
      const gauge = document.createElement('obc-gauge-trend') as ObcGaugeTrend;
      gauge.width = 160;
      gauge.height = 128;
      gauge.rangeLabels = RangeLabels.xy;
      gauge.hasBar = true;
      gauge.hasScale = true;
      gauge.data = [45, 52, 48, 55].map((value, i) => ({
        label: String(i),
        value,
      }));
      host.appendChild(gauge);
      await gauge.updateComplete;
      await frames(30);

      const bar = gauge.querySelector('obc-bar-vertical') as ObcBarVertical;
      const canvas = canvasRect(gauge as unknown as ObcAreaGraph);
      const area = chartAreaOf(gauge as unknown as ObcAreaGraph);
      const drawing = barDrawingArea(bar);
      expect(
        Math.abs(drawing.top - (canvas.top + area.top))
      ).toBeLessThanOrEqual(1);
      expect(
        Math.abs(drawing.bottom - (canvas.top + area.bottom))
      ).toBeLessThanOrEqual(1);
    });
  }
});

describe('range labels on a multi-axis chart (#1191)', () => {
  it('labels the y side from its own datasets, not the other axis', async () => {
    const chart = await mountPlain(
      (c) => {
        c.rangeLabels = RangeLabels.y;
        c.yAxes = [
          {id: 'y-temp', position: 'left'},
          {id: 'y-pressure', position: 'right', min: 0, max: 10},
        ];
        c.datasets = [
          {label: 'T', data: [20, 30], yAxisID: 'y-temp'},
          {label: 'P', data: [2, 3], yAxisID: 'y-pressure'},
        ];
      },
      {width: 120, height: 72}
    );
    expect(drawnRangeLabels(chart).map((l) => l.text)).toEqual(['30', '20']);
    expect(chartRange(chart, 'y-temp')).toEqual({min: 20, max: 30});
  });
});

describe('gauge-trend keeps its own scale range (#1214)', () => {
  /**
   * `chartMinValue` / `chartMaxValue` exist so the plotted range can differ from
   * the range the bar and its ladder describe. The base pushes the chart's axis
   * range to every slotted scale after each build, and the gauge's bar sits in
   * `right-scale` while its only axis is left-positioned — so without an opt-out
   * the bar is handed the chart range on the next data tick.
   */
  const mountGauge = async () => {
    const host = document.createElement('div');
    host.style.cssText = 'width: 384px';
    document.body.appendChild(host);
    mounted.push(host);
    const gauge = document.createElement('obc-gauge-trend') as ObcGaugeTrend;
    gauge.width = 384;
    gauge.height = 384;
    gauge.hasBar = true;
    gauge.hasScale = true;
    gauge.minValue = 0;
    gauge.maxValue = 100;
    gauge.chartMinValue = 20;
    gauge.chartMaxValue = 80;
    gauge.value = 50;
    gauge.data = [45, 52, 48, 55].map((value, i) => ({
      label: String(i),
      value,
    }));
    host.appendChild(gauge);
    await gauge.updateComplete;
    await frames(30);
    return gauge;
  };

  it('holds minValue/maxValue on the bar when the chart range differs', async () => {
    const gauge = await mountGauge();
    const bar = gauge.querySelector('obc-bar-vertical') as ObcBarVertical;
    expect([bar.minValue, bar.maxValue]).toEqual([0, 100]);
  });

  it('holds them through a data change', async () => {
    const gauge = await mountGauge();
    const bar = gauge.querySelector('obc-bar-vertical') as ObcBarVertical;

    gauge.data = [10, 70, 30, 65].map((value, i) => ({
      label: String(i),
      value,
    }));
    await gauge.updateComplete;
    await frames(30);

    expect([bar.minValue, bar.maxValue]).toEqual([0, 100]);
  });

  it('still plots on the chart range', async () => {
    const gauge = await mountGauge();
    expect(chartRange(gauge as unknown as ObcAreaGraph, 'y')).toEqual({
      min: 20,
      max: 80,
    });
  });
});

describe('slotted scale keeps its own main-tickmark labels (#1191)', () => {
  /**
   * Compact mode borrows the flag to label a short scale; a scale the chart
   * never compacted must keep the value its consumer set.
   */
  const mountWithLeft = async (
    size: {width: number; height: number},
    configureBar: (bar: ObcBarVertical) => void
  ) => {
    document.documentElement.classList.add('obc-component-size-regular');
    const host = document.createElement('div');
    host.style.cssText = `width: ${size.width}px`;
    document.body.appendChild(host);
    mounted.push(host);

    const chart = document.createElement('obc-area-graph');
    chart.width = size.width;
    chart.height = size.height;
    chart.data = numberData([3, 7]);

    const left = document.createElement('obc-bar-vertical') as ObcBarVertical;
    left.slot = 'left-scale';
    left.side = ExternalScaleSide.left;
    configureBar(left);
    chart.appendChild(left);

    host.appendChild(chart);
    await chart.updateComplete;
    await frames(20);
    return {chart, left};
  };

  it('leaves an opted-in scale alone above the threshold', async () => {
    const {left} = await mountWithLeft({width: 600, height: 300}, (bar) => {
      bar.showMainTickmarkLabels = true;
    });
    expect(left.showMainTickmarkLabels).toBe(true);
  });

  it('restores the consumer value after a compact spell', async () => {
    const {chart, left} = await mountWithLeft(
      {width: 600, height: 300},
      (bar) => {
        bar.showMainTickmarkLabels = true;
      }
    );

    chart.rangeLabels = RangeLabels.y;
    chart.height = 120;
    await chart.updateComplete;
    await frames(20);
    expect(left.showMainTickmarkLabels).toBe(true);

    chart.height = 300;
    await chart.updateComplete;
    await frames(20);
    expect(left.showMainTickmarkLabels).toBe(true);
  });

  it('returns a scale that never opted in to false after compacting', async () => {
    const {chart, left} = await mountWithLeft(
      {width: 600, height: 300},
      () => {}
    );

    chart.rangeLabels = RangeLabels.y;
    chart.height = 120;
    await chart.updateComplete;
    await frames(20);
    expect(left.showMainTickmarkLabels).toBe(true);

    chart.height = 300;
    await chart.updateComplete;
    await frames(20);
    expect(left.showMainTickmarkLabels).toBe(false);
  });

  /**
   * In pixel mode a size change does not go through `updateComputedDimensions()`,
   * so before the threshold-crossing branch the cascade never re-ran and the
   * scale kept its compact band after the chart grew back.
   */
  it('gives the band back when the chart grows past the threshold', async () => {
    const {chart, left} = await mountWithLeft(
      {width: 600, height: 120},
      () => {}
    );
    chart.rangeLabels = RangeLabels.y;
    await chart.updateComplete;
    await frames(20);
    expect(left.labelThickness).toBeLessThan(60);

    chart.height = 300;
    await chart.updateComplete;
    await frames(30);
    expect(left.labelThickness).toBe(60);
  });
});

describe('range labels on a stacked chart (#1191)', () => {
  it('labels the accumulated range, not the widest series', async () => {
    const chart = await mountPlain(
      (c) => {
        c.rangeLabels = RangeLabels.y;
        (c as ObcAreaGraph & {stacked: boolean}).stacked = true;
        c.datasets = [
          {label: 'A', data: [10, 20, 15]},
          {label: 'B', data: [30, 40, 35]},
        ];
      },
      {width: 120, height: 72}
    );

    const {min, max} = chartRange(chart, 'y');
    expect(drawnRangeLabels(chart).map((l) => l.text)).toEqual([
      String(max),
      String(min),
    ]);
  });
});

describe('reversed y axis (#1211)', () => {
  const yReverse = (chart: ObcAreaGraph) =>
    (
      chartScales(chart) as unknown as Record<
        string,
        {options: {reverse?: boolean}}
      >
    )['y'].options.reverse;

  it('passes reverse to the Chart.js scale and cascades it to the slotted scales', async () => {
    const {chart, left, bottom} = await mount((c) => {
      c.xAxisType = XAxisType.number;
      c.yAxes = [{id: 'y', position: 'left', min: 0, max: 75, reverse: true}];
      c.data = numberData([10, 70, 40]);
    });
    expect(yReverse(chart)).toBe(true);
    expect(left.reverse).toBe(true);
    expect(bottom.reverse).toBe(false);
  });

  it('gives each side the reversal of the axis it follows', async () => {
    const {chart, left, right} = await mount(
      (c) => {
        c.xAxisType = XAxisType.number;
        c.yAxes = [
          {id: 'y', position: 'left', min: 0, max: 75, reverse: true},
          {id: 'y-right', position: 'right', min: 0, max: 10},
        ];
        c.datasets = [
          {
            label: 'a',
            data: [
              {x: 0, y: 10},
              {x: 1, y: 70},
            ],
          },
          {
            label: 'b',
            data: [
              {x: 0, y: 1},
              {x: 1, y: 7},
            ],
            yAxisID: 'y-right',
          },
        ];
      },
      {withRight: true}
    );
    expect(yReverse(chart)).toBe(true);
    expect(left.reverse).toBe(true);
    expect(right.reverse).toBe(false);
  });

  it('keeps the slotted scales upright when reverse is unset', async () => {
    const {chart, left} = await mount((c) => {
      c.xAxisType = XAxisType.number;
      c.yAxes = [{id: 'y', position: 'left', min: 0, max: 75}];
      c.data = numberData([10, 70, 40]);
    });
    expect(yReverse(chart)).toBe(false);
    expect(left.reverse).toBe(false);
  });
});

type PixelScales = Record<string, {getPixelForValue(v: number): number}>;
const pixelScales = (chart: ObcAreaGraph) =>
  chartScales(chart) as unknown as PixelScales;
const builtDatasets = (chart: ObcAreaGraph) =>
  (chart as unknown as {chart: {data: {datasets: ChartLineDataset[]}}}).chart
    .data.datasets;

describe('interpolateDatasetY', () => {
  it('interpolates between neighbouring points', () => {
    const data = [
      {x: 0, y: 10},
      {x: 10, y: 30},
    ];
    expect(interpolateDatasetY(data, 5)).toBe(20);
    expect(interpolateDatasetY(data, 0)).toBe(10);
    expect(interpolateDatasetY(data, 10)).toBe(30);
  });

  it('returns undefined outside the data and for empty data', () => {
    const data = [
      {x: 0, y: 10},
      {x: 10, y: 30},
    ];
    expect(interpolateDatasetY(data, -1)).toBeUndefined();
    expect(interpolateDatasetY(data, 11)).toBeUndefined();
    expect(interpolateDatasetY([], 0)).toBeUndefined();
  });

  it('treats plain numbers as category points indexed by position', () => {
    expect(interpolateDatasetY([4, 8, 6], 1.5)).toBe(7);
  });

  it('sorts unordered points and skips non-finite ones', () => {
    const data = [
      {x: 10, y: 30},
      {x: NaN, y: 99},
      {x: 0, y: 10},
    ];
    expect(interpolateDatasetY(data, 5)).toBe(20);
  });
});

describe('dataset styling passthrough', () => {
  it('keeps an explicit fill target, background colour and dash', async () => {
    const chart = await mountPlain(
      (c) => {
        c.xAxisType = XAxisType.number;
        c.datasets = [
          {
            label: 'a',
            data: [
              {x: 0, y: 1},
              {x: 1, y: 2},
            ],
            fill: {value: 0},
            backgroundColor: 'rgb(1, 2, 3)',
            borderDash: [8, 4],
            borderCapStyle: 'round',
            order: 2,
          },
          {label: 'b', data: [1, 2]},
        ];
      },
      {width: 480, height: 320}
    );
    const [a, b] = builtDatasets(chart);
    expect(a.fill).toEqual({value: 0});
    expect(a.backgroundColor).toBe('rgb(1, 2, 3)');
    expect(a.borderDash).toEqual([8, 4]);
    expect(a.borderCapStyle).toBe('round');
    expect(a.order).toBe(2);
    // The derived defaults still apply to an entry that sets nothing.
    expect(b.fill).toBe('start');
    expect(b.borderDash).toBeUndefined();
  });

  it('treats a dataset-index fill target of 0 as a fill', async () => {
    const chart = await mountPlain(
      (c) => {
        c.datasets = [
          {label: 'line', data: [1, 2], fill: false},
          {label: 'band', data: [2, 3], fill: 0},
        ];
      },
      {width: 480, height: 320}
    );
    const [line, band] = builtDatasets(chart);
    expect(line.fill).toBe(false);
    expect(band.fill).toBe(0);
    expect(band.backgroundColor).not.toBe('transparent');
  });
});

describe('markers', () => {
  const twoPoints = () => [
    {x: 0, value: 10},
    {x: 10, value: 30},
  ];

  it('draws the x marker at the interpolated value and the y marker at its value', async () => {
    const chart = await mountPlain(
      (c) => {
        c.xAxisType = XAxisType.number;
        c.data = twoPoints();
        c.xMarker = {x: 5};
        c.yMarker = {y: 25};
      },
      {width: 480, height: 320}
    );
    const scales = pixelScales(chart);
    expect(chart.lastMarkers.x?.x).toBeCloseTo(
      Math.round(scales['x'].getPixelForValue(5)) + 0.5,
      5
    );
    expect(chart.lastMarkers.x?.y).toBeCloseTo(
      scales['y'].getPixelForValue(20),
      5
    );
    expect(chart.lastMarkers.y?.y).toBeCloseTo(
      scales['y'].getPixelForValue(25),
      5
    );
  });

  it('resolves a category marker from its label and skips an unknown one', async () => {
    const chart = await mountPlain(
      (c) => {
        c.data = [
          {label: 'a', value: 10},
          {label: 'b', value: 30},
          {label: 'c', value: 20},
        ];
        c.xMarker = {x: 'b'};
      },
      {width: 480, height: 320}
    );
    const scales = pixelScales(chart);
    expect(chart.lastMarkers.x?.x).toBeCloseTo(
      Math.round(scales['x'].getPixelForValue(1)) + 0.5,
      5
    );
    expect(chart.lastMarkers.x?.y).toBeCloseTo(
      scales['y'].getPixelForValue(30),
      5
    );
    chart.xMarker = {x: 'zzz'};
    await chart.updateComplete;
    await frames();
    expect(chart.lastMarkers.x).toBeUndefined();
  });

  it('accepts a negative x on a number axis and keeps the y marker when x is unknown', async () => {
    const chart = await mountPlain(
      (c) => {
        c.xAxisType = XAxisType.number;
        c.xAxis = {min: -200, max: 200};
        c.data = [
          {x: -100, value: 10},
          {x: 100, value: 30},
        ];
        c.xMarker = {x: -50};
        c.yMarker = {y: 20};
      },
      {width: 480, height: 320}
    );
    const scales = pixelScales(chart);
    expect(chart.lastMarkers.x?.x).toBeCloseTo(
      Math.round(scales['x'].getPixelForValue(-50)) + 0.5,
      5
    );
    chart.xAxisType = XAxisType.category;
    chart.data = [
      {label: 'a', value: 10},
      {label: 'b', value: 30},
    ];
    chart.xMarker = {x: 'zzz'};
    await chart.updateComplete;
    await frames();
    expect(chart.lastMarkers.x).toBeUndefined();
    expect(chart.lastMarkers.y?.y).toBeCloseTo(
      pixelScales(chart)['y'].getPixelForValue(20),
      5
    );
  });

  it('draws the x marker without a value outside the data', async () => {
    const chart = await mountPlain(
      (c) => {
        c.xAxisType = XAxisType.number;
        c.data = twoPoints();
        c.xAxis = {min: 0, max: 20};
        c.xMarker = {x: 15};
      },
      {width: 480, height: 320}
    );
    expect(chart.lastMarkers.x).toBeDefined();
    expect(chart.lastMarkers.x?.y).toBeUndefined();
  });

  it('records nothing while both markers are unset', async () => {
    const chart = await mountPlain(
      (c) => {
        c.xAxisType = XAxisType.number;
        c.data = twoPoints();
      },
      {width: 480, height: 320}
    );
    expect(chart.lastMarkers).toEqual({});
  });
});

describe('ellipseClip', () => {
  it('is round in pixels when ry is omitted', async () => {
    const chart = await mountPlain(
      (c) => {
        c.xAxisType = XAxisType.number;
        c.datasets = [
          {
            label: 'scan',
            data: [
              {x: 0, y: 10},
              {x: 100, y: 20},
            ],
            ellipseClip: {x: 0, y: 0, rx: 50},
          },
        ];
      },
      {width: 480, height: 320}
    );
    const clip = chart.lastClips[0];
    expect(clip.ry).toBeCloseTo(clip.rx, 5);
  });

  it('maps the ellipse through the scales in data units', async () => {
    const chart = await mountPlain(
      (c) => {
        c.xAxisType = XAxisType.number;
        c.yAxes = [
          {id: 'y', position: 'left', min: 0, max: 100, reverse: true},
        ];
        c.datasets = [
          {
            label: 'scan',
            data: [
              {x: 0, y: 10},
              {x: 100, y: 20},
            ],
            ellipseClip: {x: 0, y: 0, rx: 50, ry: 40},
          },
        ];
      },
      {width: 480, height: 320}
    );
    const scales = pixelScales(chart);
    const clip = chart.lastClips[0];
    expect(clip).toBeDefined();
    expect(clip.x).toBeCloseTo(scales['x'].getPixelForValue(0), 5);
    expect(clip.y).toBeCloseTo(scales['y'].getPixelForValue(0), 5);
    expect(clip.rx).toBeCloseTo(
      Math.abs(
        scales['x'].getPixelForValue(50) - scales['x'].getPixelForValue(0)
      ),
      5
    );
    expect(clip.ry).toBeCloseTo(
      Math.abs(
        scales['y'].getPixelForValue(40) - scales['y'].getPixelForValue(0)
      ),
      5
    );
  });
});
