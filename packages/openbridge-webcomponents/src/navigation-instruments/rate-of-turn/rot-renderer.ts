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

const DOT_ANGLES = [0, 72, 144, 216, 288];

const SCALE_RADIUS = 172;
const INNER_CIRCLE_RADIUS = 100;

const DOT_RADIUS = 8;
const BAR_DOT_RADIUS = 6;
const BAR_DOT_STROKE = 4;
const BAR_DOT_INNER_RADIUS = BAR_DOT_RADIUS - BAR_DOT_STROKE / 2;
const BAR_HALF_THICKNESS = 8;

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
  position: RotPosition
): string {
  const trackR = getTrackRadius(position);
  const R = trackR + BAR_HALF_THICKNESS;
  const r = trackR - BAR_HALF_THICKNESS;

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

  if (Math.abs(endAngle - startAngle) < 0.1) {
    return svg``;
  }

  const arcPath = rotBarPath(startAngle, endAngle, position);
  const radius = getTrackRadius(position);
  const {cx: endCx, cy: endCy} = dotOnTrack(endAngle, radius);

  // Expand the clip region angularly at the COG (end) side only so dots
  // snap fully in/out near the end dot. The HDG (start) side is flat —
  // dots should clip exactly at the bar edge with no extra padding.
  const dotAngularPad =
    (Math.asin(BAR_DOT_INNER_RADIUS / radius) * 180) / Math.PI;
  const cwSpan = (((endAngle - startAngle) % 360) + 360) % 360;
  const isCW = cwSpan <= 180;
  const clipPath = rotBarPath(
    startAngle,
    endAngle + (isCW ? dotAngularPad : -dotAngularPad),
    position
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
