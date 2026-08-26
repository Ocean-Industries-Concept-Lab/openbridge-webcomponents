import {svg, SVGTemplateResult} from 'lit';
import {WatchCircleType, innerRingRadiusFor} from './watch.js';

/**
 * Shared dual-lane subdivision of the 112..160 track annulus (the design's
 * "pitch-rpm" split, Figma: divider outer edge at 264 diameter): a thin
 * secondary value line at the band's inner edge, a face-colored divider, and
 * a narrowed primary sub-band. Used by `obc-top-view-propulsion` (pitch-rpm)
 * and `obc-gauge-radial-proportional` (primary-secondary frame) so the lane
 * geometry stays identical across instruments.
 */
export const BAND_INNER_RADIUS = innerRingRadiusFor(WatchCircleType.double);
export const BAND_OUTER_RADIUS = innerRingRadiusFor(WatchCircleType.single);
export const SECONDARY_LINE_WIDTH = 8;
export const LANE_DIVIDER_WIDTH = 8;
export const SECONDARY_LANE_RADIUS =
  BAND_INNER_RADIUS + SECONDARY_LINE_WIDTH / 2;
export const LANE_DIVIDER_RADIUS =
  BAND_INNER_RADIUS + SECONDARY_LINE_WIDTH + LANE_DIVIDER_WIDTH / 2;
export const PRIMARY_SUBBAND_INNER_RADIUS =
  BAND_INNER_RADIUS + SECONDARY_LINE_WIDTH + LANE_DIVIDER_WIDTH;
export const PRIMARY_SUBBAND_NEEDLE_LENGTH =
  BAND_OUTER_RADIUS - PRIMARY_SUBBAND_INNER_RADIUS;

/** A circular arc path (center origin, 0° = 12 o'clock, clockwise positive). */
export function arcPath(
  radius: number,
  startDeg: number,
  endDeg: number
): string {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const x1 = radius * Math.cos(toRad(startDeg));
  const y1 = radius * Math.sin(toRad(startDeg));
  const x2 = radius * Math.cos(toRad(endDeg));
  const y2 = radius * Math.sin(toRad(endDeg));
  const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  const sweep = endDeg > startDeg ? 1 : 0;
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${x2} ${y2}`;
}

/**
 * The secondary value line: a butt-capped arc from `originAngle` to
 * `endAngle` on the secondary lane, ending in a flush round tip (a plain cap
 * circle in the arc's own color). Collapses to just the tip nub when the arc
 * is shorter than `minArcDeg`.
 */
export function renderSecondaryLine(options: {
  originAngle: number;
  endAngle: number;
  color: string;
  minArcDeg?: number;
}): SVGTemplateResult {
  const {originAngle, endAngle, color, minArcDeg = 0.5} = options;
  const r = SECONDARY_LANE_RADIUS;
  const tip = svg`<circle
    transform="rotate(${endAngle})"
    cy=${-r}
    r=${SECONDARY_LINE_WIDTH / 2}
    fill=${color}
  ></circle>`;
  if (Math.abs(endAngle - originAngle) < minArcDeg) {
    return tip;
  }
  return svg`
    <path
      d=${arcPath(r, originAngle, endAngle)}
      fill="none"
      stroke=${color}
      stroke-width=${SECONDARY_LINE_WIDTH}
      stroke-linecap="butt"
    ></path>
    ${tip}
  `;
}
