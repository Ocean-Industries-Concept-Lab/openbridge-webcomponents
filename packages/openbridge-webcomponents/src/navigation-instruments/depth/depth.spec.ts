import {describe, it, expect, afterEach} from 'vitest';
import '../../main.css';
import './depth.js';
import type {ObcDepth} from './depth.js';
import {DepthType} from './depth.js';
import type {ObcGaugeTrend} from '../gauge-trend/gauge-trend.js';
import type {ObcDepthTopBand} from './depth-top-band.js';
import {DepthTopBandType} from './depth-top-band.js';
import {DEPTH_RANGES} from './depth-shared.js';

const mounted: HTMLElement[] = [];
afterEach(() => mounted.splice(0).forEach((el) => el.remove()));

const frames = async (n = 6) => {
  for (let i = 0; i < n; i++) {
    await new Promise((r) => requestAnimationFrame(() => r(null)));
  }
};

const track = (from: number, to: number, depth: (x: number) => number) =>
  Array.from({length: (to - from) / 10 + 1}, (_, i) => {
    const x = from + i * 10;
    return {x, value: depth(x)};
  });

async function mount(configure: (el: ObcDepth) => void) {
  const host = document.createElement('div');
  host.style.cssText = 'width: 384px; height: 384px';
  document.body.appendChild(host);
  mounted.push(host);
  const el = document.createElement('obc-depth');
  configure(el);
  host.appendChild(el);
  await el.updateComplete;
  await frames();
  await el.updateComplete;
  const chart = el.shadowRoot!.querySelector(
    'obc-gauge-trend'
  ) as ObcGaugeTrend;
  return {el, chart};
}

describe('obc-depth composition', () => {
  it('hosts a reversed gauge-trend ranged by the ladder', async () => {
    const {chart} = await mount((el) => {
      el.data = track(-100, 0, () => 40);
    });
    expect(chart).not.toBeNull();
    expect(chart.reverse).toBe(true);
    expect(chart.minValue).toBe(0);
    expect(chart.maxValue).toBe(DEPTH_RANGES[1].maxDepth);
    expect(chart.hasBar).toBe(false);
    expect(chart.hasScale).toBe(true);
    expect(chart.hasLabelPadding).toBe(false);
  });

  it('regular: history line plus echo band, dot in the band, no markers', async () => {
    const {chart} = await mount((el) => {
      el.data = track(-100, 0, () => 40).map((d) => ({...d, echoValue: 45}));
    });
    expect(chart.datasets?.map((d) => d.label)).toEqual(['history', 'echo']);
    expect(chart.datasets?.[1].fill).toBe(0);
    expect(chart.value).toBe(40);
    expect(chart.xMarker).toBeUndefined();
    expect(chart.querySelector('obc-depth-top-band')).toBeNull();
  });

  it('prediction: dashed prediction, now marker, label row on top', async () => {
    const {chart} = await mount((el) => {
      el.type = DepthType.prediction;
      el.data = track(-200, 0, () => 40);
      el.prediction = track(0, 200, () => 50);
    });
    expect(chart.datasets?.map((d) => d.label)).toEqual([
      'history',
      'echo',
      'prediction',
    ]);
    expect(chart.datasets?.[2].borderDash).toEqual([8, 4]);
    expect(chart.xMarker).toEqual({x: 0, datasetIndex: 0});
    expect(chart.value).toBeUndefined();
    expect(chart.xAxis).toEqual({min: -200, max: 200});
    const band = chart.querySelector('obc-depth-top-band') as ObcDepthTopBand;
    expect(band.type).toBe(DepthTopBandType.labels);
  });

  it('scanned: water column clipped to the scan range, dotted predicted depth', async () => {
    const {chart} = await mount((el) => {
      el.type = DepthType.scanned;
      el.data = track(-100, 0, () => 40);
      el.scan = track(0, 200, () => 45);
      el.scanRange = 150;
      el.predictedDepth = 48;
    });
    const labels = chart.datasets?.map((d) => d.label);
    expect(labels).toEqual(['scan', 'history', 'echo', 'predicted']);
    expect(chart.datasets?.[0].fill).toEqual({value: 0});
    expect(chart.datasets?.[0].ellipseClip).toEqual({
      x: 0,
      y: 0,
      rx: 150,
      ry: 150,
    });
    expect(chart.datasets?.[1].borderDash).toEqual([0, 4]);
    expect(chart.datasets?.[2].fill).toBe(1);
    expect(chart.datasets?.[3].data).toEqual([
      {x: 150, y: 48},
      {x: 250, y: 48},
    ]);
  });

  it('scan range defaults to the last scan sample', async () => {
    const {chart} = await mount((el) => {
      el.type = DepthType.scanned;
      el.scan = track(0, 120, () => 45);
    });
    expect(chart.datasets?.[0].ellipseClip?.rx).toBe(120);
  });

  it('value line and vessel band follow their flags', async () => {
    const {chart} = await mount((el) => {
      el.data = track(-100, 0, () => 40);
      el.hasValueLine = true;
      el.value = 33;
      el.showVessel = true;
    });
    expect(chart.yMarker).toEqual({y: 33});
    expect(chart.value).toBe(33);
    const band = chart.querySelector('obc-depth-top-band') as ObcDepthTopBand;
    expect(band.type).toBe(DepthTopBandType.vessel);
    // The chart hands the band its geometry like any slotted scale.
    expect(band.fixedAspectRatio).toBe(true);
    expect(band.paddingRight).toBeGreaterThan(0);
    expect(band.maxValue).toBeGreaterThan(band.minValue);
  });

  it('auto-range climbs the ladder with the data and hands the ticks to the scale', async () => {
    const {el, chart} = await mount((e) => {
      e.autoRange = true;
      e.hasScale = true;
      e.data = track(-100, 0, () => 12);
    });
    expect(chart.maxValue).toBe(25);
    expect(chart.primaryTickmarkInterval).toBe(25);
    el.data = track(-100, 0, () => 300);
    await el.updateComplete;
    expect(el.range.maxDepth).toBe(1000);
    expect(chart.maxValue).toBe(1000);
    expect(chart.secondaryTickmarkInterval).toBe(50);
  });

  it('pins a regular time history to its own extent so now is the right edge', async () => {
    const {chart} = await mount((el) => {
      el.data = [
        {x: 1_000_000, value: 10},
        {x: 1_300_000, value: 12},
        {x: 1_600_000, value: 11},
      ];
    });
    expect(chart.xAxis).toEqual({min: 1_000_000, max: 1_600_000});
  });

  it('re-resolves the range when the type changes', async () => {
    const {el} = await mount((e) => {
      e.autoRange = true;
      e.data = track(-100, 0, () => 12);
      e.scan = track(0, 100, () => 300);
    });
    expect(el.range.maxDepth).toBe(25);
    el.type = DepthType.scanned;
    await el.updateComplete;
    expect(el.range.maxDepth).toBe(1000);
  });

  it('draws no ladder without hasScale', async () => {
    const {chart} = await mount((el) => {
      el.data = track(-100, 0, () => 12);
    });
    expect(chart.primaryTickmarkInterval).toBe(0);
    expect(chart.secondaryTickmarkInterval).toBe(0);
  });
});

describe('obc-depth-top-band', () => {
  it('reports a thickness of 1/7 (vessel) or 1/14 (labels) of its width', async () => {
    const host = document.createElement('div');
    host.style.cssText = 'width: 336px';
    document.body.appendChild(host);
    mounted.push(host);
    const band = document.createElement('obc-depth-top-band');
    const seen: number[] = [];
    band.addEventListener('scale-dimensions-changed', (e) =>
      seen.push((e as CustomEvent<{thickness: number}>).detail.thickness)
    );
    host.appendChild(band);
    await band.updateComplete;
    await frames();
    expect(band.thickness).toBe(48);
    band.type = DepthTopBandType.labels;
    await band.updateComplete;
    expect(band.thickness).toBe(24);
    expect(seen).toContain(48);
    expect(seen).toContain(24);
  });

  it('keeps the silhouette inside the frame at either plot edge', async () => {
    const host = document.createElement('div');
    host.style.cssText = 'width: 336px';
    document.body.appendChild(host);
    mounted.push(host);
    const band = document.createElement('obc-depth-top-band');
    band.minValue = -100;
    band.maxValue = 100;
    host.appendChild(band);
    const translateX = async (now: number) => {
      band.now = now;
      await band.updateComplete;
      const t = band.shadowRoot!.querySelector('g')!.getAttribute('transform')!;
      return Number(/translate\(([-\d.]+)/.exec(t)![1]);
    };
    // The group is translated by the art's left edge; the hull spans 12..147 of 160 at 0.6.
    expect(await translateX(-100)).toBeGreaterThanOrEqual(-12 * 0.6);
    expect((await translateX(100)) + 147 * 0.6).toBeLessThanOrEqual(336);
  });
});
