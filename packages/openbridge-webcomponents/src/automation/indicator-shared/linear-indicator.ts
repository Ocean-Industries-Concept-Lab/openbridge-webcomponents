import {svg, SVGTemplateResult} from 'lit';

/**
 * Shared rendering core for linear automation indicators.
 *
 * Provides the internals used by `obc-indicator-battery` and
 * `obc-indicator-tank-atmospheric`: a bottom-up percentage bar fill and a
 * trend graph (history polyline with filled area plus a 4 px current-value
 * micro-bar). The consuming component draws its own outer frame and places
 * these templates inside its inner content rectangle.
 *
 * Coordinates are expressed in the component's 48×48 viewBox grid. Colors are
 * resolved through CSS custom properties so the templates follow the active
 * theme; the value scheme selects between the neutral, enhanced and
 * categorical token sets.
 */

export enum IndicatorDirection {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

export enum LinearIndicatorScheme {
  regular = 'regular',
  enhanced = 'enhanced',
  categorical = 'categorical',
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TREND_BAR_WIDTH = 4;
const TREND_BAR_GAP = 1;

export function clampPercent(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

export function fillHeight(rect: Rect, level: number): number {
  return (rect.height * clampPercent(level)) / 100;
}

export function expandRect(rect: Rect, amount: number): Rect {
  return {
    x: rect.x - amount,
    y: rect.y - amount,
    width: rect.width + 2 * amount,
    height: rect.height + 2 * amount,
  };
}

function round3(value: number): number {
  return Math.round(value * 1000) / 1000;
}

export function trendPolylinePoints(
  rect: Rect,
  data: number[],
  graphWidth: number
): string {
  if (data.length < 2) return '';
  return data
    .map((value, index) => {
      const x = rect.x + (index / (data.length - 1)) * graphWidth;
      const y = rect.y + rect.height * (1 - clampPercent(value) / 100);
      return `${round3(x)},${round3(y)}`;
    })
    .join(' ');
}

export function schemeFillToken(scheme: LinearIndicatorScheme): string {
  switch (scheme) {
    case LinearIndicatorScheme.enhanced:
      return 'var(--element-neutral-enhanced-color)';
    case LinearIndicatorScheme.categorical:
      return 'var(--base-teal-400)';
    default:
      return 'var(--element-neutral-color)';
  }
}

export function schemeAccentToken(scheme: LinearIndicatorScheme): string {
  switch (scheme) {
    case LinearIndicatorScheme.enhanced:
      return 'var(--element-neutral-enhanced-color)';
    case LinearIndicatorScheme.categorical:
      return 'var(--base-teal-500)';
    default:
      return 'var(--element-neutral-color)';
  }
}

export function schemeAreaToken(scheme: LinearIndicatorScheme): string {
  switch (scheme) {
    case LinearIndicatorScheme.enhanced:
      return 'var(--instrument-enhanced-tertiary-color)';
    case LinearIndicatorScheme.categorical:
      return 'var(--base-teal-100)';
    default:
      return 'var(--instrument-regular-tertiary-color)';
  }
}

/**
 * Rectangle path with rounded left corners and square right corners, used
 * to clip the trend graph so it follows the fill-container's rounded left
 * edge while butting flat against the micro-bar gap on the right.
 */
export function roundedLeftRectPath(
  rect: Rect,
  width: number,
  radius: number
): string {
  const x = round3(rect.x);
  const y = round3(rect.y);
  const right = round3(rect.x + width);
  const bottom = round3(rect.y + rect.height);
  const r = round3(radius);
  return (
    `M ${round3(rect.x + radius)} ${y} H ${right} V ${bottom} ` +
    `H ${round3(rect.x + radius)} A ${r} ${r} 0 0 1 ${x} ${round3(bottom - radius)} ` +
    `V ${round3(rect.y + radius)} A ${r} ${r} 0 0 1 ${round3(rect.x + radius)} ${y} Z`
  );
}

export function renderLinearBar(
  rect: Rect,
  level: number,
  scheme: LinearIndicatorScheme,
  idPrefix: string
): SVGTemplateResult {
  const fillRect = expandRect(rect, 0.5);
  const height = fillHeight(fillRect, level);
  const clipId = `${idPrefix}-bar-clip`;
  return svg`
    <clipPath id=${clipId}>
      <rect x=${fillRect.x} y=${fillRect.y} width=${fillRect.width} height=${fillRect.height} rx="2.5"></rect>
    </clipPath>
    <rect
      class="bar-background"
      x=${rect.x}
      y=${rect.y}
      width=${rect.width}
      height=${rect.height}
      rx="2"
      style="fill: var(--instrument-frame-secondary-color); stroke: var(--border-outline-color)"
    ></rect>
    <rect
      class="bar-fill"
      clip-path="url(#${clipId})"
      x=${fillRect.x}
      y=${round3(fillRect.y + fillRect.height - height)}
      width=${fillRect.width}
      height=${round3(height)}
      style="fill: ${schemeFillToken(scheme)}"
    ></rect>
  `;
}

export function renderTrendGraph(
  rect: Rect,
  data: number[],
  level: number,
  scheme: LinearIndicatorScheme,
  idPrefix: string
): SVGTemplateResult {
  const graphWidth = rect.width - TREND_BAR_WIDTH - TREND_BAR_GAP;
  const points = trendPolylinePoints(rect, data, graphWidth);
  const bottom = round3(rect.y + rect.height);
  const areaPath = points
    ? `M ${round3(rect.x)},${bottom} L ${points.split(' ').join(' L ')} L ${round3(rect.x + graphWidth)},${bottom} Z`
    : '';
  const barX = rect.x + rect.width - TREND_BAR_WIDTH;
  const height = fillHeight(rect, level);
  const accent = schemeAccentToken(scheme);
  const clipId = `${idPrefix}-trend-clip`;
  const barClipId = `${idPrefix}-trend-bar-clip`;
  return svg`
    <clipPath id=${clipId}>
      <path d=${roundedLeftRectPath(rect, graphWidth, 2)}></path>
    </clipPath>
    <clipPath id=${barClipId}>
      <rect x=${barX} y=${rect.y} width=${TREND_BAR_WIDTH} height=${rect.height} rx="2"></rect>
    </clipPath>
    ${
      areaPath
        ? svg`
          <path
            class="trend-area"
            clip-path="url(#${clipId})"
            d=${areaPath}
            style="fill: ${schemeAreaToken(scheme)}"
          ></path>
          <polyline
            class="trend-line"
            clip-path="url(#${clipId})"
            points=${points}
            fill="none"
            style="stroke: ${accent}"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          ></polyline>
        `
        : ''
    }
    <rect
      class="trend-track"
      x=${barX}
      y=${rect.y}
      width=${TREND_BAR_WIDTH}
      height=${rect.height}
      rx="2"
      style="fill: var(--border-divider-color)"
    ></rect>
    <rect
      class="trend-bar-fill"
      clip-path="url(#${barClipId})"
      x=${barX}
      y=${round3(rect.y + rect.height - height)}
      width=${TREND_BAR_WIDTH}
      height=${round3(height)}
      style="fill: ${accent}"
    ></rect>
  `;
}
