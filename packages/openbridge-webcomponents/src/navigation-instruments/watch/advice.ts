/**
 * The radial advice renderer: bands on the ring between r 164 and 172, point
 * markers on the band centreline, and the area wedge inside the face. What a
 * band looks like comes from `svghelpers/advice.ts`; this module only places
 * it on the watch, with the zoom offset every band radius takes.
 *
 * @module
 */

import {SVGTemplateResult, nothing, svg} from 'lit';
import {TickmarkStyle, TickmarkType, tickmark} from './tickmark.js';
import {degToRad, normalizeAngle} from '../../svghelpers/math.js';
import {
  ADVICE_ALERT_CORNER_RADIUS,
  ADVICE_AREA_DASH,
  ADVICE_BAND_THICKNESS,
  ADVICE_POINT_DOT_DIAMETER,
  ADVICE_POINT_TICK,
  AdviceCap,
  AdviceCategory,
  AdviceState,
  adviceCaps,
  adviceStyle,
  asResolvedAdvice,
  isGoToCategory,
  nextAdviceMaskId,
  type AdviceInput,
  type AdviceStyle,
  type ResolvedAdvice,
} from '../../svghelpers/advice.js';
import {dotPattern, hairlinePattern} from '../../svghelpers/advice-patterns.js';

export {AdviceState} from '../../svghelpers/advice.js';
export type {AdviceInput, ResolvedAdvice} from '../../svghelpers/advice.js';

/**
 * The advice kinds of earlier releases. `advice` is read as
 * {@link AdviceCategory.optimal}; the alert names match the categories.
 * @deprecated Use {@link AdviceCategory}.
 */
export enum AdviceType {
  advice = 'advice',
  caution = 'caution',
  warning = 'warning',
  alarm = 'alarm',
}

/** @deprecated Use {@link AdviceInput}; `minAngle` / `maxAngle` and `type` / `hinted` are still read. */
export type AngleAdvice = AdviceInput & {minAngle: number; maxAngle: number};

/** @deprecated Use {@link AdviceInput}; `obc-watch` takes resolved and raw entries alike. */
export type AngleAdviceRaw = AdviceInput;

const BAND_INNER = 328 / 2;
const BAND_OUTER = 344 / 2;
const BAND_CENTER = (BAND_INNER + BAND_OUTER) / 2;
const CAP_RADIUS = ADVICE_BAND_THICKNESS / 2;
const CORNER = ADVICE_ALERT_CORNER_RADIUS;
/** The face the area wedge fills, 4 units inside the band. */
const AREA_RADIUS = 320 / 2;

// The rounded cap's tip sits 4 units inside the limit and its centre 8, so
// the arc ends are trimmed by 8 units at the band's mean radius.
const margin = (344 - 328) / 2 + 8;
const deltaAngle = Math.atan2(margin, (344 + 328) / 2);

const pt = (rad: number, r: number) =>
  `${Math.sin(rad) * r} ${-Math.cos(rad) * r}`;

/**
 * The band outline between two angles, one cap per end. A pill end is the
 * trimmed semicircle, a square end a flush cut with 2-unit corners, a flat
 * end a flush cut; `null` when the span is too short for its caps.
 */
function bandPath(
  minAngle: number,
  maxAngle: number,
  caps: {start: AdviceCap; end: AdviceCap},
  radiusOffset: number
): string | null {
  const spanRad = degToRad(normalizeAngle(maxAngle - minAngle));
  const trimStart = caps.start === AdviceCap.pill ? deltaAngle : 0;
  const trimEnd = caps.end === AdviceCap.pill ? deltaAngle : 0;
  if (spanRad <= trimStart + trimEnd) return null;
  const r1 = BAND_INNER + radiusOffset;
  const r2 = BAND_OUTER + radiusOffset;
  const a0 = degToRad(minAngle) + trimStart;
  const a1 = a0 + spanRad - trimStart - trimEnd;
  const squareStart = caps.start === AdviceCap.square;
  const squareEnd = caps.end === AdviceCap.square;
  const a0i = a0 + (squareStart ? CORNER / r1 : 0);
  const a1i = a1 - (squareEnd ? CORNER / r1 : 0);
  const a0o = a0 + (squareStart ? CORNER / r2 : 0);
  const a1o = a1 - (squareEnd ? CORNER / r2 : 0);
  const largeInner = a1i - a0i > Math.PI ? 1 : 0;
  const largeOuter = a1o - a0o > Math.PI ? 1 : 0;

  let endCap: string;
  if (caps.end === AdviceCap.pill) {
    endCap = `A ${CAP_RADIUS} ${CAP_RADIUS} 0 0 0 ${pt(a1, r2)}`;
  } else if (squareEnd) {
    endCap = `A ${CORNER} ${CORNER} 0 0 0 ${pt(a1, r1 + CORNER)} L ${pt(a1, r2 - CORNER)} A ${CORNER} ${CORNER} 0 0 0 ${pt(a1o, r2)}`;
  } else {
    endCap = `L ${pt(a1, r2)}`;
  }
  let startCap: string;
  if (caps.start === AdviceCap.pill) {
    startCap = `A ${CAP_RADIUS} ${CAP_RADIUS} 0 0 0 ${pt(a0, r1)}`;
  } else if (squareStart) {
    startCap = `A ${CORNER} ${CORNER} 0 0 0 ${pt(a0, r2 - CORNER)} L ${pt(a0, r1 + CORNER)} A ${CORNER} ${CORNER} 0 0 0 ${pt(a0i, r1)}`;
  } else {
    startCap = `L ${pt(a0, r1)}`;
  }
  return `M ${pt(a0i, r1)} A ${r1} ${r1} 0 ${largeInner} 1 ${pt(a1i, r1)} ${endCap} A ${r2} ${r2} 0 ${largeOuter} 0 ${pt(a0o, r2)} ${startCap} Z`;
}

/**
 * A rounded band between two angles, as the port and starboard half rings
 * draw it. Advice bands go through {@link renderAdvice}.
 */
export function adviceMask(
  minAngle: number,
  maxAngle: number,
  fill: string,
  stroke: string,
  radiusOffset = 0
): SVGTemplateResult | typeof nothing {
  const d = bandPath(
    minAngle,
    maxAngle,
    {start: AdviceCap.pill, end: AdviceCap.pill},
    radiusOffset
  );
  if (d === null) return nothing;
  return svg`<path d=${d} fill=${fill} stroke=${stroke} stroke-width="1" vector-effect="non-scaling-stroke" />`;
}

/**
 * The caution stripes across the band. At the design radius the pre-baked
 * tile rotated every 4° is the file's own mark; under zoom the same count of
 * crossings is laid out as lines, since a rotated tile's centre orbits the
 * origin and would cross the enlarged band at drifting angles.
 */
function radialStripes(
  radiusOffset: number,
  color: string,
  crossings: number,
  width: number
): SVGTemplateResult[] {
  if (radiusOffset === 0 && crossings === 90) {
    const tiles: SVGTemplateResult[] = [];
    for (let i = 0; i < 180; i += 4) {
      tiles.push(svg`<g transform="rotate(${i}) translate(-256 -256) ">
            <path d="M369.167 64.7317L144 194.732L142 191.268L367.167 61.2676L369.167 64.7317ZM369.167 320.732L144 450.732L142 447.267L367.167 317.267L369.167 320.732Z" fill=${color}/>
            </g>
            `);
    }
    return tiles;
  }
  const r1z = BAND_INNER + radiusOffset;
  const r2z = BAND_OUTER + radiusOffset;
  const rAvg = (r1z + r2z) / 2;
  const baseSpacing = (2 * Math.PI * BAND_CENTER) / crossings;
  const nLines = Math.round((2 * Math.PI * rAvg) / baseSpacing);
  const slant = 0.705;
  const rInner = r1z - 12;
  const rOuter = r2z + 12;
  const halfDelta = (Math.tan(slant) * (rOuter - rInner)) / (2 * rAvg);
  const lines: SVGTemplateResult[] = [];
  for (let j = 0; j < nLines; j++) {
    const theta = (j * 2 * Math.PI) / nLines;
    lines.push(
      svg`<line x1=${rInner * Math.sin(theta - halfDelta)} y1=${-rInner * Math.cos(theta - halfDelta)} x2=${rOuter * Math.sin(theta + halfDelta)} y2=${-rOuter * Math.cos(theta + halfDelta)} stroke=${color} stroke-width=${width}/>`
    );
  }
  return lines;
}

function boundaryTicks(
  advice: ResolvedAdvice,
  style: AdviceStyle,
  radiusOffset: number
): SVGTemplateResult[] {
  const tick = (angle: number) =>
    tickmark(angle, {
      size: TickmarkType.primary,
      style: style.tickStyle as TickmarkStyle,
      scale: 1,
      inside: false,
      textRadius: 0,
      maxDigits: 0,
      radiusOffset,
    }) as SVGTemplateResult;
  const ticks: SVGTemplateResult[] = [];
  if (!advice.hideMinTickmark) ticks.push(tick(advice.min));
  if (!advice.point && !advice.hideMaxTickmark) ticks.push(tick(advice.max));
  return ticks;
}

function renderBand(
  advice: ResolvedAdvice,
  style: AdviceStyle,
  radiusOffset: number,
  maskId: string
): SVGTemplateResult | typeof nothing {
  const d = bandPath(advice.min, advice.max, adviceCaps(advice), radiusOffset);
  if (d === null) return nothing;
  const outline = svg`<path d=${d} fill="none" stroke=${style.stroke} stroke-width="1" vector-effect="non-scaling-stroke" />`;
  if (style.pattern === 'none') {
    return svg`<path d=${d} fill=${style.fill} stroke=${style.stroke} stroke-width="1" vector-effect="non-scaling-stroke" />`;
  }
  const hairline = style.pattern === 'hairline';
  const stripes = radialStripes(
    radiusOffset,
    style.patternColor,
    hairline ? 40 : 90,
    hairline ? 1 : 4
  );
  const maskStroke = radiusOffset > 0 ? 'none' : 'black';
  const shape = svg`<path d=${d} fill="white" stroke=${maskStroke} stroke-width="1" vector-effect="non-scaling-stroke" />`;
  const extent = BAND_OUTER + radiusOffset + 32;
  const mask =
    radiusOffset > 0
      ? svg`<mask id=${maskId} maskUnits="userSpaceOnUse" x="${-extent}" y="${-extent}" width="${extent * 2}" height="${extent * 2}">${shape}</mask>`
      : svg`<mask id=${maskId}>${shape}</mask>`;
  const fillRect =
    style.fill === 'none'
      ? nothing
      : radiusOffset > 0
        ? svg`<rect x="${-extent}" y="${-extent}" width="${extent * 2}" height="${extent * 2}" fill="${style.fill}"/>`
        : svg`<rect x="-256" y="-256" width="512" height="512" fill="${style.fill}"/>`;
  return svg`
            ${mask}
            <g mask="url(#${maskId})">
                ${fillRect}
                ${stripes}
            </g>
            ${outline}
        `;
}

/**
 * A point advice on the band centreline: a dot for a go-to category, a thick
 * tick across the band for a no-go one. The caution point takes the tick-mark
 * primary colour while triggered, never the caution yellow.
 */
export function renderAdvicePoint(
  input: AdviceInput | ResolvedAdvice,
  radiusOffset = 0
): SVGTemplateResult {
  const advice = asResolvedAdvice(input);
  const style = adviceStyle(advice.category, advice.state);
  const r = BAND_CENTER + radiusOffset;
  const transform = `rotate(${advice.min}) translate(0 ${-r})`;
  if (isGoToCategory(advice.category)) {
    return svg`<circle r=${ADVICE_POINT_DOT_DIAMETER / 2} transform=${transform} fill=${style.fill} stroke=${style.stroke} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
  }
  const grey =
    advice.category === AdviceCategory.caution
      ? advice.state === AdviceState.triggered
        ? 'var(--instrument-tick-mark-primary-color)'
        : style.stroke
      : undefined;
  const {length, thickness, radius} = ADVICE_POINT_TICK;
  return svg`<rect x=${-thickness / 2} y=${-length / 2} width=${thickness} height=${length} rx=${radius} transform=${transform} fill=${grey ?? style.fill} stroke=${grey ?? style.stroke} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
}

/**
 * One advice on the ring: the band or the point marker, with its boundary
 * ticks. `maskId` must be unique in the document; a renderer that draws
 * several passes its own prefix.
 */
export function renderAdvice(
  input: AdviceInput | ResolvedAdvice,
  radiusOffset = 0,
  maskId: string = nextAdviceMaskId('advice')
): SVGTemplateResult | typeof nothing {
  const advice = asResolvedAdvice(input);
  const style = adviceStyle(advice.category, advice.state);
  const ticks = boundaryTicks(advice, style, radiusOffset);
  if (advice.point) {
    return svg`${renderAdvicePoint(advice, radiusOffset)} ${ticks}`;
  }
  const band = renderBand(advice, style, radiusOffset, maskId);
  if (band === nothing) return nothing;
  return svg`${band} ${ticks}`;
}

/**
 * The area layer of one advice inside the face: the sector wedge with the
 * category's tint or pattern and its outline in the category's dash, or for
 * a point one radial line. Drawn under the bars and ticks.
 */
export function renderAdviceArea(
  input: AdviceInput | ResolvedAdvice,
  radiusOffset = 0,
  patternId: string = nextAdviceMaskId('advice-area')
): SVGTemplateResult | typeof nothing {
  const advice = asResolvedAdvice(input);
  const style = adviceStyle(advice.category, advice.state);
  const r = AREA_RADIUS + radiusOffset;
  const a0 = degToRad(advice.min);
  const dash =
    style.areaOutline === 'dotted'
      ? ADVICE_AREA_DASH.dotted
      : style.areaOutline === 'dashed'
        ? ADVICE_AREA_DASH.dashed
        : undefined;
  const outline = (d: string) => svg`
    ${
      dash
        ? svg`<path d=${d} fill="none" stroke="var(--instrument-frame-primary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
        : nothing
    }
    <path d=${d} fill="none" stroke=${style.stroke} stroke-width="1" stroke-dasharray=${dash ?? nothing} vector-effect="non-scaling-stroke"/>`;
  if (advice.point) {
    return outline(`M 0 0 L ${pt(a0, r)}`);
  }
  const spanRad = degToRad(normalizeAngle(advice.max - advice.min));
  if (spanRad === 0) return nothing;
  const a1 = a0 + spanRad;
  const d = `M 0 0 L ${pt(a0, r)} A ${r} ${r} 0 ${spanRad > Math.PI ? 1 : 0} 1 ${pt(a1, r)} Z`;
  const pattern =
    style.areaPattern === 'dots'
      ? dotPattern(patternId, style.stroke)
      : style.areaPattern === 'hairline'
        ? hairlinePattern(patternId, style.stroke)
        : nothing;
  return svg`
    ${pattern}
    <path d=${d} fill=${style.areaFill}/>
    ${pattern === nothing ? nothing : svg`<path d=${d} fill="url(#${patternId})"/>`}
    ${outline(d)}`;
}
