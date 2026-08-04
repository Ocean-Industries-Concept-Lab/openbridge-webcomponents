export const CENTER = 256;
export const SCALE_RADIUS = 188;
export const TRACK_INNER_RADIUS = 116;
export const TRACK_OUTER_RADIUS = 164;
export const TRACK_CORNER_RADIUS = 5;

/**
 * Endpoints of the cap pill's stroked centerline. The strokes use round
 * linecaps, so the 8px-wide back stroke extends 4px past each endpoint,
 * making the finished pill cover radii 116-164 — flush with the track.
 */
export const CAP_INNER_RADIUS = 120;
export const CAP_OUTER_RADIUS = 160;

/**
 * Half-span (deg) of each track sector. The light track, the fill bar and the
 * cap pills all share this span so the pill stays flush with the bar end at
 * every value.
 */
export const TRACK_HALF_SPANS: Record<'twoWay' | 'threeWay', number> = {
  twoWay: 45,
  threeWay: 30,
};

export function clampPercent(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

export function inletPercent(value: number, bottomValue: number): number {
  return clampPercent(clampPercent(value) + clampPercent(bottomValue));
}

export function polarToCartesian(
  radius: number,
  angleDeg: number
): {x: number; y: number} {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.round((CENTER + radius * Math.sin(rad)) * 1000) / 1000,
    y: Math.round((CENTER - radius * Math.cos(rad)) * 1000) / 1000,
  };
}

export function arcPath(
  radius: number,
  startAngleDeg: number,
  endAngleDeg: number
): string {
  const start = polarToCartesian(radius, startAngleDeg);
  const end = polarToCartesian(radius, endAngleDeg);
  const largeArc = endAngleDeg - startAngleDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export function radialLinePath(
  innerRadius: number,
  outerRadius: number,
  angleDeg: number
): string {
  const inner = polarToCartesian(innerRadius, angleDeg);
  const outer = polarToCartesian(outerRadius, angleDeg);
  return `M ${inner.x} ${inner.y} L ${outer.x} ${outer.y}`;
}

export function annularSectorPath(
  innerRadius: number,
  outerRadius: number,
  startAngleDeg: number,
  endAngleDeg: number,
  cornerRadius: number
): string {
  const spanDeg = endAngleDeg - startAngleDeg;
  if (spanDeg <= 0) return '';
  const spanRad = (spanDeg * Math.PI) / 180;
  const cr = Math.max(
    0,
    Math.min(
      cornerRadius,
      (outerRadius - innerRadius) / 2,
      (spanRad * innerRadius) / 2
    )
  );
  const outerOffset = (cr / outerRadius) * (180 / Math.PI);
  const innerOffset = (cr / innerRadius) * (180 / Math.PI);
  const outerStart = polarToCartesian(outerRadius, startAngleDeg + outerOffset);
  const outerEnd = polarToCartesian(outerRadius, endAngleDeg - outerOffset);
  const endCutOuter = polarToCartesian(outerRadius - cr, endAngleDeg);
  const endCutInner = polarToCartesian(innerRadius + cr, endAngleDeg);
  const innerEnd = polarToCartesian(innerRadius, endAngleDeg - innerOffset);
  const innerStart = polarToCartesian(innerRadius, startAngleDeg + innerOffset);
  const startCutInner = polarToCartesian(innerRadius + cr, startAngleDeg);
  const startCutOuter = polarToCartesian(outerRadius - cr, startAngleDeg);
  const largeOuter = spanDeg - 2 * outerOffset > 180 ? 1 : 0;
  const largeInner = spanDeg - 2 * innerOffset > 180 ? 1 : 0;
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeOuter} 1 ${outerEnd.x} ${outerEnd.y}`,
    `A ${cr} ${cr} 0 0 1 ${endCutOuter.x} ${endCutOuter.y}`,
    `L ${endCutInner.x} ${endCutInner.y}`,
    `A ${cr} ${cr} 0 0 1 ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeInner} 0 ${innerStart.x} ${innerStart.y}`,
    `A ${cr} ${cr} 0 0 1 ${startCutInner.x} ${startCutInner.y}`,
    `L ${startCutOuter.x} ${startCutOuter.y}`,
    `A ${cr} ${cr} 0 0 1 ${outerStart.x} ${outerStart.y}`,
    'Z',
  ].join(' ');
}

export function scaleAngle(percent: number): number {
  return -30 + 0.6 * clampPercent(percent);
}
