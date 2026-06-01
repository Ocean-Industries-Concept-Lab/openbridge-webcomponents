/**
 * Rate-of-turn SVG renderer — pure functions for ROT dot and bar overlays.
 *
 * This module provides side-effect-free rendering functions that return
 * `SVGTemplateResult` fragments for compositing into radial instrument SVGs.
 * All geometry is derived from a small set of constants (`BAR_HALF_THICKNESS`,
 * `DOT_COUNT`, and per-position track radii) so dimensions can be tuned from
 * a single place.
 *
 * ## Exported Functions
 *
 * - `renderRotDots(color, position)` — Five evenly-spaced filled dots on the
 *   track circle. Intended to be wrapped in a spinning `<g>` by the caller.
 * - `renderRotBarStatic(config)` — The static "banana" arc bar and
 *   `<clipPath>` definition.
 * - `renderRotBarDots(color, position)` — Smaller dots sized to fit inside
 *   the bar, rendered inside the caller's clip-path group.
 * - `shortestAngularDeltaDeg(startAngle, endAngle)` — Wraparound-safe
 *   minimal angular distance (0–180°) used for zero-span thresholds.
 *
 * ## Coordinate System
 *
 * All functions assume a centered SVG coordinate system (0, 0 at center)
 * with 0° at 12 o'clock and angles increasing clockwise. The caller
 * (typically `<obc-watch>`) is responsible for viewBox, rotation, and
 * animation via `RateOfTurnController`.
 *
 * ## Future Extensions
 *
 * The internal path builder (`rotBarPath`) accepts an arbitrary track radius,
 * enabling future use on compass sectors with different radii and on flat
 * (linear) compass layouts where the arc would be "straightened" into a
 * horizontal bar.
 */
import {svg, SVGTemplateResult} from 'lit';

export enum RotType {
  dots = 'dots',
  bar = 'bar',
}

export enum RotPosition {
  scale = 'scale',
  innerCircle = 'innerCircle',
}

// TODO: RotStyle.port / RotStyle.starboard for port/starboard coloring

const DOT_COUNT = 5;
const DOT_ANGLES = Array.from(
  {length: DOT_COUNT},
  (_, i) => (360 / DOT_COUNT) * i
);

// Midpoints of watch ring pairs — cannot import from watch.ts (circular dep)
// SCALE_RADIUS = (OUTER_RING_RADIUS + RING2_RADIUS) / 2 = (184 + 160) / 2
// INNER_CIRCLE_RADIUS = (RING3_RADIUS + RING4_RADIUS) / 2 = (112 + 88) / 2
const SCALE_RADIUS = 172;
const INNER_CIRCLE_RADIUS = 100;

export const BAR_HALF_THICKNESS = 8;
const DOT_RADIUS = BAR_HALF_THICKNESS;
const BAR_DOT_INNER_RADIUS =
  BAR_HALF_THICKNESS * 0.75 - BAR_HALF_THICKNESS * 0.25;

export const ROT_ZERO_DEADBAND_DEG = 0.05;
export const ROT_ZERO_DEADBAND_PX = 0.5;

function getTrackRadius(position: RotPosition, radiusOffset = 0): number {
  const base =
    position === RotPosition.scale ? SCALE_RADIUS : INNER_CIRCLE_RADIUS;
  return base + radiusOffset;
}

function dotOnTrack(angle: number, radius: number): {cx: number; cy: number} {
  const rad = (angle * Math.PI) / 180;
  return {
    cx: Math.sin(rad) * radius,
    cy: -Math.cos(rad) * radius,
  };
}

export function renderRotDots(
  color: string,
  position: RotPosition,
  radiusOffset = 0
): SVGTemplateResult {
  const radius = getTrackRadius(position, radiusOffset);
  return svg`${DOT_ANGLES.map((angle) => {
    const {cx, cy} = dotOnTrack(angle, radius);
    return svg`<circle cx="${cx}" cy="${cy}" r="${DOT_RADIUS}" fill="${color}" />`;
  })}`;
}

function rotBarPath(
  startAngle: number,
  endAngle: number,
  trackRadius: number
): string {
  const R = trackRadius + BAR_HALF_THICKNESS;
  const r = trackRadius - BAR_HALF_THICKNESS;

  const a1 = (startAngle * Math.PI) / 180;
  const a2 = (endAngle * Math.PI) / 180;

  const outerStartX = Math.sin(a1) * R;
  const outerStartY = -Math.cos(a1) * R;
  const innerStartX = Math.sin(a1) * r;
  const innerStartY = -Math.cos(a1) * r;

  const outerEndX = Math.sin(a2) * R;
  const outerEndY = -Math.cos(a2) * R;
  const innerEndX = Math.sin(a2) * r;
  const innerEndY = -Math.cos(a2) * r;

  // Clockwise angular distance from start to end (0..2π)
  const cwSpan = (((a2 - a1) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

  // Always draw the shortest arc (< 180°)
  let outerSweep: number;
  let innerSweep: number;
  if (cwSpan <= Math.PI) {
    outerSweep = 1;
    innerSweep = 0;
  } else {
    outerSweep = 0;
    innerSweep = 1;
  }

  return [
    `M ${outerStartX} ${outerStartY}`,
    `A ${R} ${R} 0 0 ${outerSweep} ${outerEndX} ${outerEndY}`,
    `A ${BAR_HALF_THICKNESS} ${BAR_HALF_THICKNESS} 0 0 ${outerSweep} ${innerEndX} ${innerEndY}`,
    `A ${r} ${r} 0 0 ${innerSweep} ${innerStartX} ${innerStartY}`,
    `Z`,
  ].join(' ');
}

export function shortestAngularDeltaDeg(
  startAngle: number,
  endAngle: number
): number {
  const cw = (((endAngle - startAngle) % 360) + 360) % 360;
  return cw <= 180 ? cw : 360 - cw;
}

export function rotBarThresholdAngle(
  position: RotPosition,
  radiusOffset = 0
): number {
  const trackRadius = getTrackRadius(position, radiusOffset);
  return (BAR_HALF_THICKNESS / trackRadius) * (180 / Math.PI);
}

export function renderRotZeroPill(
  color: string,
  angle: number,
  position: RotPosition,
  radiusOffset = 0
): SVGTemplateResult {
  const trackRadius = getTrackRadius(position, radiusOffset);
  const w = BAR_HALF_THICKNESS;
  const h = BAR_HALF_THICKNESS * 2;
  const rx = BAR_HALF_THICKNESS / 2;
  return svg`
    <g transform="rotate(${angle})">
      <rect
        x="${-w / 2}"
        y="${-trackRadius - h / 2}"
        width="${w}"
        height="${h}"
        rx="${rx}"
        fill="${color}"
      />
    </g>
  `;
}

export function renderLinearRotZeroPill(
  color: string,
  x: number,
  trackY: number
): SVGTemplateResult {
  const w = BAR_HALF_THICKNESS;
  const h = BAR_HALF_THICKNESS * 2;
  const rx = BAR_HALF_THICKNESS / 2;
  return svg`
    <rect
      x="${x - w / 2}"
      y="${trackY - h / 2}"
      width="${w}"
      height="${h}"
      rx="${rx}"
      fill="${color}"
    />
  `;
}

export interface RotBarConfig {
  startAngle: number;
  endAngle: number;
  barColor: string;
  position: RotPosition;
  maskId?: string;
  radiusOffset?: number;
}

export function renderRotBarStatic(config: RotBarConfig): SVGTemplateResult {
  const {
    startAngle,
    endAngle,
    barColor,
    position,
    maskId = 'rot-bar-mask',
    radiusOffset = 0,
  } = config;

  if (
    shortestAngularDeltaDeg(startAngle, endAngle) <
    rotBarThresholdAngle(position, radiusOffset)
  ) {
    return svg``;
  }

  const trackRadius = getTrackRadius(position, radiusOffset);
  const arcPath = rotBarPath(startAngle, endAngle, trackRadius);

  return svg`
    <defs>
      <clipPath id="${maskId}">
        <path d="${arcPath}" />
      </clipPath>
    </defs>
    <path d="${arcPath}" fill="${barColor}" />
  `;
}

export function renderRotBarDots(
  color: string,
  position: RotPosition,
  radiusOffset = 0
): SVGTemplateResult {
  const radius = getTrackRadius(position, radiusOffset);

  return svg`
    ${DOT_ANGLES.map((angle) => {
      const {cx, cy} = dotOnTrack(angle, radius);
      return svg`<circle cx="${cx}" cy="${cy}" r="${BAR_DOT_INNER_RADIUS}" fill="${color}" />`;
    })}
  `;
}

// ============================================================================
// Linear (flat compass) ROT rendering
// ============================================================================

/**
 * Angular spacing between dots in degrees — same as radial (360 / 5 = 72).
 * In linear mode this is converted to pixels via `dotSpacing = 72 * translationScale`.
 */
export const LINEAR_DOT_ANGLE_SPACING = 360 / DOT_COUNT;

const LINEAR_DOT_RADIUS = BAR_HALF_THICKNESS / 2;

export enum LinearRotPosition {
  track = 'track',
  scale = 'scale',
}

/**
 * Render evenly-spaced filled dots along a horizontal track.
 *
 * Dots are placed at multiples of `dotSpacing` centered on x = 0.
 * The caller wraps the result in a translating `<g id="rot-spinner">`
 * animated by `RateOfTurnController` in translate mode.
 *
 * Enough dots are generated to cover `visibleWidth` plus one full
 * animation cycle (`5 * dotSpacing`) on each side for seamless looping.
 */
function linearDotStrip(
  color: string,
  trackY: number,
  dotSpacing: number,
  visibleWidth: number,
  r: number
): SVGTemplateResult {
  if (dotSpacing <= 0) return svg``;
  const cyclePx = DOT_COUNT * dotSpacing;
  const halfRange = visibleWidth / 2 + cyclePx;
  const firstIdx = Math.floor(-halfRange / dotSpacing);
  const lastIdx = Math.ceil(halfRange / dotSpacing);

  const dots: SVGTemplateResult[] = [];
  for (let i = firstIdx; i <= lastIdx; i++) {
    dots.push(
      svg`<circle cx="${i * dotSpacing}" cy="${trackY}" r="${r}" fill="${color}" />`
    );
  }
  return svg`${dots}`;
}

export function renderLinearRotDots(
  color: string,
  trackY: number,
  dotSpacing: number,
  visibleWidth: number
): SVGTemplateResult {
  return linearDotStrip(
    color,
    trackY,
    dotSpacing,
    visibleWidth,
    LINEAR_DOT_RADIUS
  );
}

export interface LinearRotBarConfig {
  startX: number;
  endX: number;
  barColor: string;
  trackY: number;
  maskId?: string;
}

/**
 * Render the static horizontal bar and `<clipPath>` for a linear
 * ROT indicator. Analogous to `renderRotBarStatic` for radial instruments.
 *
 * The bar is a rounded capsule from `startX` to `endX` at vertical
 * position `trackY`. The clip region matches the bar shape so spinning
 * bar-dots clip cleanly at the edges.
 *
 * Returns empty SVG when the bar span is less than 1 px.
 */
export function renderLinearRotBarStatic(
  config: LinearRotBarConfig
): SVGTemplateResult {
  const {
    startX,
    endX,
    barColor,
    trackY,
    maskId = 'rot-bar-mask-linear',
  } = config;

  if (Math.abs(endX - startX) < BAR_HALF_THICKNESS) return svg``;

  const h = BAR_HALF_THICKNESS;
  const top = trackY - h;
  const bot = trackY + h;
  const isEndRight = endX >= startX;

  // Bar path: flat on HDG/start side, semicircle capsule on COG/end side
  const flatX = startX;
  const roundX = endX;
  const barPath = isEndRight
    ? `M ${flatX} ${top} L ${roundX} ${top} A ${h} ${h} 0 0 1 ${roundX} ${bot} L ${flatX} ${bot} Z`
    : `M ${flatX} ${top} L ${roundX} ${top} A ${h} ${h} 0 0 0 ${roundX} ${bot} L ${flatX} ${bot} Z`;

  // Clip path: exact same shape as the bar
  return svg`
    <defs>
      <clipPath id="${maskId}">
        <path d="${barPath}" />
      </clipPath>
    </defs>
    <path d="${barPath}" fill="${barColor}" />
  `;
}

/**
 * Render filled dots along a horizontal track, intended to be placed
 * inside a `<g clip-path="…">` that clips to the bar shape.
 * Analogous to `renderRotBarDots` for radial instruments.
 */
export function renderLinearRotBarDots(
  color: string,
  trackY: number,
  dotSpacing: number,
  visibleWidth: number
): SVGTemplateResult {
  return linearDotStrip(
    color,
    trackY,
    dotSpacing,
    visibleWidth,
    LINEAR_DOT_RADIUS
  );
}
