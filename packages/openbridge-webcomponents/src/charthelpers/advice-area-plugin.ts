/**
 * The advice area layer on a Chart.js canvas: the category's tint or pattern
 * between an advice's limits across the plot, and the limit lines in the
 * category's dash. It draws the way the chart's markers and range labels do,
 * from the y scale's pixels at draw time, so fixed-aspect scaling and page
 * zoom need no second alignment. The tint goes under the datasets, the lines
 * over them; the plugin is registered ahead of the markers so the value dot
 * stays on top.
 *
 * A canvas cannot read CSS variables, so the host resolves each token the
 * way it resolves every chart colour, and its theme observer rebuilds the
 * chart on a palette change.
 *
 * @module
 */

import type {Chart, Plugin} from 'chart.js';
import {
  ADVICE_AREA_DASH,
  ADVICE_DOT,
  ADVICE_HAIRLINE_WIDTH,
  ADVICE_STRIPE,
  adviceStyle,
  type ResolvedAdvice,
} from '../svghelpers/advice.js';

/** What the plugin needs from the chart element. */
export interface AdviceAreaHost {
  /** The advice list, resolved against the chart's readings. */
  resolvedAdvices(): ResolvedAdvice[];
  /** A `var(--token)` reference resolved to a colour, or the string itself when it is not one. */
  resolveColor(reference: string): string;
  /** The id of the y scale the advices are placed on. */
  adviceAxisId(): string;
  /** Receives the pixel rows of the areas drawn, for specs. */
  recordAreas(areas: {top: number; bottom: number}[]): void;
}

const DASH: Record<keyof typeof ADVICE_AREA_DASH, number[]> = {
  dotted: ADVICE_AREA_DASH.dotted.split(' ').map(Number),
  dashed: ADVICE_AREA_DASH.dashed.split(' ').map(Number),
};

/** An offscreen tile for `createPattern`: the alarm dots or the exclusion hairline. */
function patternTile(
  kind: 'dots' | 'hairline',
  color: string
): HTMLCanvasElement {
  const tile = document.createElement('canvas');
  const ctx = tile.getContext('2d')!;
  if (kind === 'dots') {
    const {size, pitch, rowOffset} = ADVICE_DOT;
    tile.width = tile.height = pitch;
    const inset = (pitch / 2 - size) / 2;
    ctx.fillStyle = color;
    ctx.fillRect(inset, inset, size, size);
    ctx.fillRect(inset + rowOffset, inset + pitch / 2, size, size);
  } else {
    const t = ADVICE_STRIPE.pitch * Math.SQRT2;
    tile.width = tile.height = Math.round(t);
    ctx.strokeStyle = color;
    ctx.lineWidth = ADVICE_HAIRLINE_WIDTH;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(t, t);
    ctx.moveTo(t / 2, -t / 2);
    ctx.lineTo((3 * t) / 2, t / 2);
    ctx.moveTo(-t / 2, t / 2);
    ctx.lineTo(t / 2, (3 * t) / 2);
    ctx.stroke();
  }
  return tile;
}

/** The plugin for one chart element. */
export function createAdviceAreaPlugin(host: AdviceAreaHost): Plugin<'line'> {
  const areas = () => host.resolvedAdvices().filter((a) => a.showArea);

  const clipToPlot = (chart: Chart) => {
    const area = chart.chartArea;
    chart.ctx.save();
    chart.ctx.beginPath();
    chart.ctx.rect(
      area.left,
      area.top,
      area.right - area.left,
      area.bottom - area.top
    );
    chart.ctx.clip();
  };

  return {
    id: 'adviceArea',
    beforeDatasetsDraw: (chart: Chart) => {
      const rows: {top: number; bottom: number}[] = [];
      host.recordAreas(rows);
      const list = areas();
      const scale = chart.scales[host.adviceAxisId()];
      if (!list.length || !scale) return;
      const area = chart.chartArea;
      const ctx = chart.ctx;
      clipToPlot(chart);
      for (const advice of list) {
        if (advice.point) continue;
        const style = adviceStyle(advice.category, advice.state);
        const y0 = scale.getPixelForValue(advice.min);
        const y1 = scale.getPixelForValue(advice.max);
        const top = Math.min(y0, y1);
        const bottom = Math.max(y0, y1);
        rows.push({top, bottom});
        if (style.areaFill !== 'none') {
          ctx.fillStyle = host.resolveColor(style.areaFill);
          ctx.fillRect(area.left, top, area.right - area.left, bottom - top);
        }
        if (style.areaPattern !== 'none') {
          const pattern = ctx.createPattern(
            patternTile(style.areaPattern, host.resolveColor(style.stroke)),
            'repeat'
          );
          if (pattern) {
            ctx.fillStyle = pattern;
            ctx.fillRect(area.left, top, area.right - area.left, bottom - top);
          }
        }
      }
      ctx.restore();
    },
    afterDatasetsDraw: (chart: Chart) => {
      const list = areas();
      const scale = chart.scales[host.adviceAxisId()];
      if (!list.length || !scale) return;
      const area = chart.chartArea;
      const ctx = chart.ctx;
      clipToPlot(chart);
      ctx.lineWidth = 1;
      const line = (value: number, style: ReturnType<typeof adviceStyle>) => {
        // Half-pixel alignment keeps a 1 px line on one device row.
        const y = Math.round(scale.getPixelForValue(value)) + 0.5;
        const dash =
          style.areaOutline === 'solid' ? [] : DASH[style.areaOutline];
        if (dash.length) {
          ctx.setLineDash([]);
          ctx.strokeStyle = host.resolveColor(
            'var(--instrument-frame-primary-color)'
          );
          ctx.beginPath();
          ctx.moveTo(area.left, y);
          ctx.lineTo(area.right, y);
          ctx.stroke();
        }
        ctx.setLineDash(dash);
        ctx.strokeStyle = host.resolveColor(style.stroke);
        ctx.beginPath();
        ctx.moveTo(area.left, y);
        ctx.lineTo(area.right, y);
        ctx.stroke();
      };
      for (const advice of list) {
        const style = adviceStyle(advice.category, advice.state);
        line(advice.min, style);
        if (!advice.point) line(advice.max, style);
      }
      ctx.setLineDash([]);
      ctx.restore();
    },
  };
}
