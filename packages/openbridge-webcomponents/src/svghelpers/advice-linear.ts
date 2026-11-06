/**
 * The linear advice renderer, shared by the external scale, the thruster
 * column and the linear instrument scales: a band along a main axis at a
 * fixed perpendicular offset, a point marker on the band centreline, and the
 * area between the limit lines across a bar. What a band looks like comes
 * from `advice.ts`; the caller maps its values to main-axis coordinates and
 * says where the band sits.
 *
 * @module
 */

import {nothing, svg, type SVGTemplateResult} from 'lit';
import {
  ADVICE_ALERT_CORNER_RADIUS,
  ADVICE_AREA_DASH,
  ADVICE_BAND_THICKNESS,
  ADVICE_CAP_INSET,
  ADVICE_POINT_DOT_DIAMETER,
  ADVICE_POINT_TICK,
  AdviceCap,
  ADVICE_STRIPE,
  AdviceCategory,
  AdviceState,
  adviceCaps,
  adviceStyle,
  asResolvedAdvice,
  isGoToCategory,
  type AdviceInput,
  type ResolvedAdvice,
  ADVICE_ICON_SIZE_LINEAR,
} from './advice.js';
import {dotPattern, hairlinePattern, stripePattern} from './advice-patterns.js';
import {renderAdviceIcon} from './advice-icons.js';

/** Where a band sits: its range along the main axis and its near edge across it. */
export interface LinearAdviceBandOptions {
  /** The main axis is y (a vertical scale) rather than x. */
  vertical: boolean;
  /** Main-axis coordinate of the advice's `min`. */
  mainStart: number;
  /** Main-axis coordinate of the advice's `max`. */
  mainEnd: number;
  /** The band's edge with the lower perpendicular coordinate; it extends `thickness` from there. */
  perpStart: number;
  thickness?: number;
  advice: AdviceInput | ResolvedAdvice;
  /** Unique in the document; only a hatched band uses it. */
  maskId: string;
  /** The band is drawn under a reflection, so the hatch is mirrored back. */
  mirrorPattern?: boolean;
}

const point = (vertical: boolean, main: number, perp: number) =>
  vertical ? `${perp} ${main}` : `${main} ${perp}`;

/**
 * The band outline, one cap per end. The cap at the lower main-axis
 * coordinate is the advice's start cap when `mainStart <= mainEnd`, as on a
 * horizontal scale, and its end cap otherwise, as on a vertical scale whose
 * values grow upward.
 */
function bandPath(o: LinearAdviceBandOptions, advice: ResolvedAdvice) {
  const t = o.thickness ?? ADVICE_BAND_THICKNESS;
  const caps = adviceCaps(advice);
  const ascending = o.mainStart <= o.mainEnd;
  const lo = Math.min(o.mainStart, o.mainEnd);
  const hi = Math.max(o.mainStart, o.mainEnd);
  const capLo = ascending ? caps.start : caps.end;
  const capHi = ascending ? caps.end : caps.start;
  const edgeLo = capLo === AdviceCap.pill ? lo + ADVICE_CAP_INSET : lo;
  const edgeHi = capHi === AdviceCap.pill ? hi - ADVICE_CAP_INSET : hi;
  const radius = (cap: AdviceCap) =>
    cap === AdviceCap.pill
      ? t / 2
      : cap === AdviceCap.square
        ? ADVICE_ALERT_CORNER_RADIUS
        : 0;
  const rLo = radius(capLo);
  const rHi = radius(capHi);
  if (edgeHi - edgeLo < rLo + rHi) return null;
  const p0 = o.perpStart;
  const p1 = o.perpStart + t;
  const v = o.vertical;
  const sw = v ? 0 : 1;
  const P = (main: number, perp: number) => point(v, main, perp);
  const cap = (
    main: number,
    r: number,
    c: AdviceCap,
    from: number,
    to: number,
    dir: 1 | -1
  ) => {
    // `dir` is +1 at the high end, -1 at the low end; the cap bulges that way.
    if (c === AdviceCap.pill) {
      return `A ${r} ${r} 0 0 ${sw} ${P(main - dir * r, to)}`;
    }
    if (c === AdviceCap.square) {
      const inward = from < to ? 1 : -1;
      return `A ${r} ${r} 0 0 ${sw} ${P(main, from + inward * r)} L ${P(main, to - inward * r)} A ${r} ${r} 0 0 ${sw} ${P(main - dir * r, to)}`;
    }
    return `L ${P(main, from)} L ${P(main, to)}`;
  };
  return [
    `M ${P(edgeLo + rLo, p0)}`,
    `L ${P(edgeHi - rHi, p0)}`,
    cap(edgeHi, rHi, capHi, p0, p1, 1),
    `L ${P(edgeLo + rLo, p1)}`,
    cap(edgeLo, rLo, capLo, p1, p0, -1),
    'Z',
  ].join(' ');
}

/** One advice band. `nothing` when the range is too short for its caps. */
export function renderLinearAdviceBand(
  o: LinearAdviceBandOptions
): SVGTemplateResult | typeof nothing {
  const advice = asResolvedAdvice(o.advice);
  const style = adviceStyle(advice.category, advice.state);
  const d = bandPath(o, advice);
  if (d === null) return nothing;
  if (style.pattern === 'none') {
    return svg`<path d=${d} fill=${style.fill} stroke=${style.stroke} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
  }
  const t = o.thickness ?? ADVICE_BAND_THICKNESS;
  const lo = Math.min(o.mainStart, o.mainEnd);
  const hi = Math.max(o.mainStart, o.mainEnd);
  const patternId = `${o.maskId}-pattern`;
  const mirrored = o.mirrorPattern ?? false;
  const pattern =
    style.pattern === 'hairline'
      ? hairlinePattern(patternId, style.patternColor, mirrored)
      : stripePattern(
          patternId,
          style.patternColor,
          ADVICE_STRIPE.width,
          mirrored
        );
  const cover = o.vertical
    ? svg`<rect x=${o.perpStart} y=${lo} width=${t} height=${hi - lo} fill=${style.fill}/><rect x=${o.perpStart} y=${lo} width=${t} height=${hi - lo} fill="url(#${patternId})"/>`
    : svg`<rect x=${lo} y=${o.perpStart} width=${hi - lo} height=${t} fill=${style.fill}/><rect x=${lo} y=${o.perpStart} width=${hi - lo} height=${t} fill="url(#${patternId})"/>`;
  return svg`
    <defs>
      ${pattern}
      <mask id=${o.maskId} maskUnits="userSpaceOnUse" x="-4096" y="-4096" width="8192" height="8192">
        <path d=${d} fill="white"/>
      </mask>
    </defs>
    <g mask="url(#${o.maskId})">${cover}</g>
    <path d=${d} fill="none" stroke=${style.stroke} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
}

/** Where a point marker sits: on the band centreline at its value. */
export interface LinearAdvicePointOptions {
  vertical: boolean;
  /** Main-axis coordinate of the advice's `value`. */
  main: number;
  /** Perpendicular coordinate of the band centreline. */
  perpCenter: number;
  advice: AdviceInput | ResolvedAdvice;
}

/**
 * A point advice: a dot for a go-to category, a thick tick across the band
 * for a no-go one. The caution point takes the tick-mark primary colour while
 * triggered, never the caution yellow.
 */
export function renderLinearAdvicePoint(
  o: LinearAdvicePointOptions
): SVGTemplateResult {
  const advice = asResolvedAdvice(o.advice);
  const style = adviceStyle(advice.category, advice.state);
  const cx = o.vertical ? o.perpCenter : o.main;
  const cy = o.vertical ? o.main : o.perpCenter;
  if (isGoToCategory(advice.category)) {
    return svg`<circle cx=${cx} cy=${cy} r=${ADVICE_POINT_DOT_DIAMETER / 2} fill=${style.fill} stroke=${style.stroke} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
  }
  const grey =
    advice.category === AdviceCategory.caution
      ? advice.state === AdviceState.triggered
        ? 'var(--instrument-tick-mark-primary-color)'
        : style.stroke
      : undefined;
  const {length, thickness, radius} = ADVICE_POINT_TICK;
  const w = o.vertical ? length : thickness;
  const h = o.vertical ? thickness : length;
  return svg`<rect x=${cx - w / 2} y=${cy - h / 2} width=${w} height=${h} rx=${radius} fill=${grey ?? style.fill} stroke=${grey ?? style.stroke} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
}

/** Where an area sits: the advice's range along the main axis, the bar across it. */
export interface LinearAdviceAreaOptions {
  vertical: boolean;
  mainStart: number;
  mainEnd: number;
  perpStart: number;
  perpEnd: number;
  advice: AdviceInput | ResolvedAdvice;
  /** Unique in the document; the pattern tile's id. */
  patternId: string;
}

/**
 * The area layer across a bar: the category's tint or pattern between the
 * limits and the limit lines in the category's dash; for a point one line.
 */
export function renderLinearAdviceArea(
  o: LinearAdviceAreaOptions
): SVGTemplateResult {
  const advice = asResolvedAdvice(o.advice);
  const style = adviceStyle(advice.category, advice.state);
  const v = o.vertical;
  const dash =
    style.areaOutline === 'dotted'
      ? ADVICE_AREA_DASH.dotted
      : style.areaOutline === 'dashed'
        ? ADVICE_AREA_DASH.dashed
        : undefined;
  const line = (main: number) => {
    const d = `M ${point(v, main, o.perpStart)} L ${point(v, main, o.perpEnd)}`;
    return svg`
      ${
        dash
          ? svg`<path d=${d} fill="none" stroke="var(--instrument-frame-primary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
          : nothing
      }
      <path d=${d} fill="none" stroke=${style.stroke} stroke-width="1" stroke-dasharray=${dash ?? nothing} vector-effect="non-scaling-stroke"/>`;
  };
  if (advice.point) return line(o.mainStart);
  const lo = Math.min(o.mainStart, o.mainEnd);
  const hi = Math.max(o.mainStart, o.mainEnd);
  const pLo = Math.min(o.perpStart, o.perpEnd);
  const pHi = Math.max(o.perpStart, o.perpEnd);
  const rect = (fill: string) =>
    v
      ? svg`<rect x=${pLo} y=${lo} width=${pHi - pLo} height=${hi - lo} fill=${fill}/>`
      : svg`<rect x=${lo} y=${pLo} width=${hi - lo} height=${pHi - pLo} fill=${fill}/>`;
  const pattern =
    style.areaPattern === 'dots'
      ? dotPattern(o.patternId, style.stroke)
      : style.areaPattern === 'hairline'
        ? hairlinePattern(o.patternId, style.stroke)
        : nothing;
  return svg`
    ${pattern}
    ${style.areaFill === 'none' ? nothing : rect(style.areaFill)}
    ${pattern === nothing ? nothing : rect(`url(#${o.patternId})`)}
    ${line(o.mainStart)} ${line(o.mainEnd)}`;
}

/** Where an icon sits: the advice's midpoint along the main axis, the label column across it. */
export interface LinearAdviceIconOptions {
  vertical: boolean;
  /** Main-axis coordinates of the advice's `min` and `max`; a point gives the same value twice. */
  mainStart: number;
  mainEnd: number;
  /** Perpendicular coordinate of the icon box's centre. */
  perpCenter: number;
  advice: AdviceInput | ResolvedAdvice;
  size?: number;
  /** Unique in the document; the glyph's own ids are prefixed with it. */
  id?: string;
}

/** The category's icon beside the band, centred on the range, in the responsive size. */
export function renderLinearAdviceIcon(
  o: LinearAdviceIconOptions
): SVGTemplateResult {
  const advice = asResolvedAdvice(o.advice);
  const main = (o.mainStart + o.mainEnd) / 2;
  return renderAdviceIcon({
    category: advice.category,
    state: advice.state,
    x: o.vertical ? o.perpCenter : main,
    y: o.vertical ? main : o.perpCenter,
    size: o.size ?? ADVICE_ICON_SIZE_LINEAR,
    id: o.id,
  });
}
