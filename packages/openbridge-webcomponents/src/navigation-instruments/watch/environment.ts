import {svg, SVGTemplateResult} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';
import '../../icons/icon-wind-true-0.js';
import '../../icons/icon-wind-true-1.js';
import '../../icons/icon-wind-true-5.js';
import '../../icons/icon-wind-true-10.js';
import '../../icons/icon-wind-true-15.js';
import '../../icons/icon-wind-true-20.js';
import '../../icons/icon-wind-true-25.js';
import '../../icons/icon-wind-true-30.js';
import '../../icons/icon-wind-true-35.js';
import '../../icons/icon-wind-true-45.js';
import '../../icons/icon-wind-true-50.js';
import '../../icons/icon-wind-true-55.js';
import '../../icons/icon-wind-true-60.js';
import '../../icons/icon-wind-true-65.js';
import '../../icons/icon-wind-true-70.js';
import '../../icons/icon-wind-true-100.js';
import '../../icons/icon-wind-shaft-0.js';
import '../../icons/icon-wind-shaft-1.js';
import '../../icons/icon-wind-shaft-5.js';
import '../../icons/icon-wind-shaft-10.js';
import '../../icons/icon-wind-shaft-15.js';
import '../../icons/icon-wind-shaft-20.js';
import '../../icons/icon-wind-shaft-25.js';
import '../../icons/icon-wind-shaft-30.js';
import '../../icons/icon-wind-shaft-35.js';
import '../../icons/icon-wind-shaft-40.js';
import '../../icons/icon-wind-shaft-45.js';
import '../../icons/icon-wind-shaft-50.js';
import '../../icons/icon-wind-shaft-55.js';
import '../../icons/icon-wind-shaft-60.js';
import '../../icons/icon-wind-shaft-65.js';
import '../../icons/icon-wind-shaft-70.js';
import '../../icons/icon-wind-shaft-75.js';
import '../../icons/icon-wind-shaft-80.js';
import '../../icons/icon-wind-shaft-85.js';
import '../../icons/icon-wind-shaft-90.js';
import '../../icons/icon-wind-shaft-95.js';
import '../../icons/icon-wind-shaft-100.js';

/**
 * Knots buckets available as `<obi-wind-true-N>` icons. The Figma source
 * uses speed-valued names; 40 / 75 / 80 / 85 / 90 / 95 are not authored
 * for the true variant and snap to the nearest available bucket.
 */
export const WIND_TRUE_BUCKETS = [
  0, 1, 5, 10, 15, 20, 25, 30, 35, 45, 50, 55, 60, 65, 70, 100,
] as const;

/**
 * Knots buckets available as `<obi-wind-shaft-N>` icons. The shaft
 * family is authored at full 5-knot granularity from 0 to 100 kn (plus
 * a sub-1 calm icon).
 */
export const WIND_SHAFT_BUCKETS = [
  0, 1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
  95, 100,
] as const;

/** Render scale applied to the 24×24 icon so it matches the historic 48×48 visual footprint on the watch dial. */
const WIND_ICON_SCALE = 2;

/**
 * Tip coordinates of the `obi-wind-true-*` icons in their native 24×24 child
 * space. The arrowhead tip is at approximately (12, 22.4453) — this is the
 * anchor point that lands on the watch's periphery radius so the barb tail
 * extends outward only (matching the legacy inline-glyph behavior).
 */
const WIND_ICON_TIP_X = 12;
const WIND_ICON_TIP_Y = 22.4453;

const windIconCache = new Map<string, SVGTemplateResult>();

function getWindIconSvg(bucket: number): SVGTemplateResult | null {
  const tagName = `obi-wind-true-${bucket}`;
  const cached = windIconCache.get(tagName);
  if (cached) {
    return cached;
  }
  const ctor = customElements.get(tagName) as
    | (new () => {icon?: SVGTemplateResult; iconCss?: SVGTemplateResult})
    | undefined;
  if (!ctor) {
    return null;
  }
  const instance = new ctor();
  const tpl: SVGTemplateResult | undefined = instance.icon ?? instance.iconCss;
  if (!tpl) {
    return null;
  }
  windIconCache.set(tagName, tpl);
  return tpl;
}

/**
 * Snap a wind speed in **knots** to the nearest available icon bucket.
 *
 * Non-finite / null / undefined / sub-zero inputs snap to bucket `0`
 * (calm). Otherwise the input is matched to the closest authored bucket
 * by absolute distance, with ties broken toward the lower bucket.
 */
export function windKnotsToBucket(
  knots: number | null | undefined,
  buckets: readonly number[]
): number {
  if (knots == null || !Number.isFinite(knots) || knots <= 0) {
    return buckets[0];
  }
  let best = buckets[0];
  let bestDist = Math.abs(knots - best);
  for (let i = 1; i < buckets.length; i++) {
    const d = Math.abs(knots - buckets[i]);
    if (d < bestDist) {
      best = buckets[i];
      bestDist = d;
    }
  }
  return best;
}

/**
 * Snap a wind speed in knots to the nearest `<obi-wind-true-N>` bucket.
 * Shorthand for `windKnotsToBucket(knots, WIND_TRUE_BUCKETS)`.
 */
export function windKnotsToWindTrueBucket(
  knots: number | null | undefined
): number {
  return windKnotsToBucket(knots, WIND_TRUE_BUCKETS);
}

/**
 * Snap a wind speed in knots to the nearest `<obi-wind-shaft-N>` bucket.
 * Shorthand for `windKnotsToBucket(knots, WIND_SHAFT_BUCKETS)`.
 */
export function windKnotsToWindShaftBucket(
  knots: number | null | undefined
): number {
  return windKnotsToBucket(knots, WIND_SHAFT_BUCKETS);
}

/**
 * Legacy positional level `1..14` for the hardcoded
 * `SHAFT_TRUE_WIND_BARB_D_BY_LEVEL` inline barb glyphs used by the
 * shaft+true `obc-wind-indicator` variant. Implements the
 * designer-confirmed "Option C" mapping (one half-barb per 5 kn with
 * sub-pennant calm and shaft-only buckets).
 *
 * | Knots range  | Level | Glyph                  |
 * | ------------ | ----- | ---------------------- |
 * | `[0, 0.5)`   | 1     | calm                   |
 * | `[0.5, 2.5)` | 2     | shaft only             |
 * | `[2.5, 7.5)` | 3     | shaft + ½ barb         |
 * | `[7.5, 47.5)`| 4..11 | 5-kn nearest neighbour |
 * | `[47.5, 55)` | 12    | pennant (50 kn)        |
 * | `[55, 65)`   | 13    | pennant + 1 full barb  |
 * | `[65, ∞)`    | 14    | pennant + 2 full barbs |
 */
export function windKnotsToShaftTrueLevel(
  knots: number | null | undefined
): number {
  if (knots == null || !Number.isFinite(knots) || knots < 0.5) {
    return 1;
  }
  if (knots < 2.5) {
    return 2;
  }
  if (knots < 47.5) {
    return Math.round(knots / 5) + 2;
  }
  if (knots < 55) {
    return 12;
  }
  if (knots < 65) {
    return 13;
  }
  return 14;
}

export function renderWind(options: {
  windKnots: number;
  fromDirectionDeg: number;
  radius: number;
  color?: string;
}): SVGTemplateResult {
  const {windKnots, fromDirectionDeg, radius, color} = options;
  const bucket = windKnotsToWindTrueBucket(windKnots);
  const icon = getWindIconSvg(bucket);
  if (!icon) {
    return svg``;
  }
  const dirRad = (fromDirectionDeg * Math.PI) / 180;
  const x = Math.sin(dirRad) * radius;
  const y = -Math.cos(dirRad) * radius;
  const tipX = WIND_ICON_TIP_X * WIND_ICON_SCALE;
  const tipY = WIND_ICON_TIP_Y * WIND_ICON_SCALE;
  const styles = {
    color: color ?? 'var(--instrument-regular-secondary-color)',
  };
  return svg`<g style=${styleMap(styles)} transform="translate(${x} ${y}) rotate(${fromDirectionDeg}) translate(${-tipX} ${-tipY}) scale(${WIND_ICON_SCALE})">
    ${icon}
  </g>`;
}

export function renderCurrent(options: {
  current: number;
  fromDirectionDeg: number;
  radius: number;
  color?: string;
}): SVGTemplateResult {
  return renderEnvironment({
    filename: `current-${options.current}.svg`,
    fromDirectionDeg: options.fromDirectionDeg,
    radius: options.radius,
    color: options.color,
  });
}

function renderEnvironment(options: {
  filename: string;
  fromDirectionDeg: number;
  radius: number;
  color?: string;
}): SVGTemplateResult {
  const {filename, fromDirectionDeg, radius, color} = options;
  const directionRad = ((fromDirectionDeg - 180) * Math.PI) / 180;
  const symbol = environmentSvgs[filename];
  const styles = color ? {'--instrument-regular-secondary-color': color} : {};
  return svg`<g style=${styleMap(styles)} transform="translate(${-Math.sin(directionRad) * radius} ${Math.cos(directionRad) * radius}) rotate(${180 + fromDirectionDeg}) translate(-24, 0) scale(2)">
    ${symbol}
  </g>`;
}

export const environmentSvgs: Record<string, SVGTemplateResult> = {
  'current-0.svg': svg`<path d="M11 2V22H13V2Z" stroke="var(--border-silhouette-color)" stroke-width="2"/>
<path d="M11 2V22H13V2Z" fill="var(--instrument-regular-secondary-color)"/>`,
  'current-1.svg': svg`<path d="M11 7.00002L11 24L13 24L13 7.00005L11 7.00002Z" stroke="var(--border-silhouette-color)" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.79309 5.20723L12.0002 0.00012207L17.2073 5.20723L15.7931 6.62144L12.0002 2.82855L8.2073 6.62144L6.79309 5.20723Z" stroke="var(--border-silhouette-color)" stroke-width="2"/>
<path d="M11 7.00002L11 24L13 24L13 7.00005L11 7.00002Z" fill="var(--instrument-regular-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.79309 5.20723L12.0002 0.00012207L17.2073 5.20723L15.7931 6.62144L12.0002 2.82855L8.2073 6.62144L6.79309 5.20723Z" fill="var(--instrument-regular-secondary-color)"/>`,
  'current-2.svg': svg`<path d="M10.9742 12.0003L10.9742 24.0049L12.9999 24.005L12.9999 12.0004L10.9742 12.0003Z" stroke="var(--border-silhouette-color)" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.79285 5.20747L12 0.000366211L17.2071 5.20747L15.7928 6.62169L12 2.82879L8.20706 6.62169L6.79285 5.20747Z" stroke="var(--border-silhouette-color)" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.99988 10.5861L12.207 5.37903L17.4141 10.5861L15.9999 12.0003L12.207 8.20745L8.41409 12.0003L6.99988 10.5861Z" stroke="var(--border-silhouette-color)" stroke-width="2"/>
<path d="M10.9742 12.0003L10.9742 24.0049L12.9999 24.005L12.9999 12.0004L10.9742 12.0003Z" fill="var(--instrument-regular-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.79285 5.20747L12 0.000366211L17.2071 5.20747L15.7928 6.62169L12 2.82879L8.20706 6.62169L6.79285 5.20747Z" fill="var(--instrument-regular-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.99988 10.5861L12.207 5.37903L17.4141 10.5861L15.9999 12.0003L12.207 8.20745L8.41409 12.0003L6.99988 10.5861Z" fill="var(--instrument-regular-secondary-color)"/>`,
  'current-3.svg': svg`<path d="M11 18L11 24L13 24L13 18L11 18Z" stroke="var(--border-silhouette-color)" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.79297 5.20711L12.0001 0L17.2072 5.20711L15.793 6.62132L12.0001 2.82843L8.20718 6.62132L6.79297 5.20711Z" stroke="var(--border-silhouette-color)" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 10.5858L12.2071 5.37866L17.4142 10.5858L16 12L12.2071 8.20709L8.41421 12L7 10.5858Z" stroke="var(--border-silhouette-color)" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 16.5858L12.2071 11.3787L17.4142 16.5858L16 18L12.2071 14.2071L8.41421 18L7 16.5858Z" stroke="var(--border-silhouette-color)" stroke-width="2"/>
<path d="M11 18L11 24L13 24L13 18L11 18Z" fill="var(--instrument-regular-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.79297 5.20711L12.0001 0L17.2072 5.20711L15.793 6.62132L12.0001 2.82843L8.20718 6.62132L6.79297 5.20711Z" fill="var(--instrument-regular-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 10.5858L12.2071 5.37866L17.4142 10.5858L16 12L12.2071 8.20709L8.41421 12L7 10.5858Z" fill="var(--instrument-regular-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 16.5858L12.2071 11.3787L17.4142 16.5858L16 18L12.2071 14.2071L8.41421 18L7 16.5858Z" fill="var(--instrument-regular-secondary-color)"/>`,
  'current-4.svg': svg`<path fill-rule="evenodd" clip-rule="evenodd" d="M6.79297 5.20711L12.0001 0L17.2072 5.20711L15.793 6.62132L12.0001 2.82843L8.20718 6.62132L6.79297 5.20711Z" stroke="var(--border-silhouette-color)" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 10.5858L12.2071 5.37866L17.4142 10.5858L16 12L12.2071 8.20709L8.41421 12L7 10.5858Z" stroke="var(--border-silhouette-color)" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 16.5858L12.2071 11.3787L17.4142 16.5858L16 18L12.2071 14.2071L8.41421 18L7 16.5858Z" stroke="var(--border-silhouette-color)" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 22.5858L12.2071 17.3787L17.4142 22.5858L16 24L12.2071 20.2071L8.41421 24L7 22.5858Z" stroke="var(--border-silhouette-color)" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.79297 5.20711L12.0001 0L17.2072 5.20711L15.793 6.62132L12.0001 2.82843L8.20718 6.62132L6.79297 5.20711Z" fill="var(--instrument-regular-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 10.5858L12.2071 5.37866L17.4142 10.5858L16 12L12.2071 8.20709L8.41421 12L7 10.5858Z" fill="var(--instrument-regular-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 16.5858L12.2071 11.3787L17.4142 16.5858L16 18L12.2071 14.2071L8.41421 18L7 16.5858Z" fill="var(--instrument-regular-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 22.5858L12.2071 17.3787L17.4142 22.5858L16 24L12.2071 20.2071L8.41421 24L7 22.5858Z" fill="var(--instrument-regular-secondary-color)"/>`,
};
