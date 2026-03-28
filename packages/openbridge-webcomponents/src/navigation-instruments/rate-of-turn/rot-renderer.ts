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
 * - `renderRotBarStatic(config)` — The static "banana" arc bar, end-dot, and
 *   `<clipPath>` definition. The clip region is angularly padded at the end
 *   side so spinning dots snap cleanly in/out.
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

const SCALE_RADIUS = 172;
const INNER_CIRCLE_RADIUS = 100;

const BAR_HALF_THICKNESS = 8;
const DOT_RADIUS = BAR_HALF_THICKNESS;
const BAR_DOT_RADIUS = BAR_HALF_THICKNESS * 0.75;
const BAR_DOT_STROKE = BAR_HALF_THICKNESS * 0.5;
const BAR_DOT_INNER_RADIUS = BAR_DOT_RADIUS - BAR_DOT_STROKE / 2;

function getTrackRadius(position: RotPosition): number {
  return position === RotPosition.scale ? SCALE_RADIUS : INNER_CIRCLE_RADIUS;
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
  position: RotPosition
): SVGTemplateResult {
  const radius = getTrackRadius(position);
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
    `L ${innerEndX} ${innerEndY}`,
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

export interface RotBarConfig {
  startAngle: number;
  endAngle: number;
  color: string;
  barColor: string;
  position: RotPosition;
  maskId?: string;
}

export function renderRotBarStatic(config: RotBarConfig): SVGTemplateResult {
  const {
    startAngle,
    endAngle,
    color,
    barColor,
    position,
    maskId = 'rot-bar-mask',
  } = config;

  if (shortestAngularDeltaDeg(startAngle, endAngle) < 0.1) {
    return svg``;
  }

  const trackRadius = getTrackRadius(position);
  const arcPath = rotBarPath(startAngle, endAngle, trackRadius);
  const {cx: endCx, cy: endCy} = dotOnTrack(endAngle, trackRadius);

  // Expand the clip region angularly at the COG (end) side only so dots
  // snap fully in/out near the end dot. The HDG (start) side is flat —
  // dots should clip exactly at the bar edge with no extra padding.
  const dotAngularPad =
    (Math.asin(BAR_DOT_INNER_RADIUS / trackRadius) * 180) / Math.PI;
  const cwSpan = (((endAngle - startAngle) % 360) + 360) % 360;
  const isCW = cwSpan <= 180;
  const clipPath = rotBarPath(
    startAngle,
    endAngle + (isCW ? dotAngularPad : -dotAngularPad),
    trackRadius
  );

  return svg`
    <defs>
      <clipPath id="${maskId}">
        <path d="${clipPath}" />
      </clipPath>
    </defs>
    <path d="${arcPath}" fill="${barColor}" />
    <circle
      cx="${endCx}" cy="${endCy}" r="${BAR_DOT_RADIUS}"
      fill="var(--instrument-frame-primary-color)"
      stroke="${color}"
      stroke-width="${BAR_DOT_STROKE}"
    />
  `;
}

export function renderRotBarDots(
  color: string,
  position: RotPosition
): SVGTemplateResult {
  const radius = getTrackRadius(position);

  return svg`
    ${DOT_ANGLES.map((angle) => {
      const {cx, cy} = dotOnTrack(angle, radius);
      return svg`<circle cx="${cx}" cy="${cy}" r="${BAR_DOT_INNER_RADIUS}" fill="${color}" />`;
    })}
  `;
}
