import {svg, SVGTemplateResult} from 'lit';

/**
 * Options for the force-graphics pattern underlays (wind streaks / current
 * bands). All units are watch SVG units (outer ring = 184).
 */
export interface ForcePatternOptions {
  /** Direction the wind/current comes from, in degrees (0° = north). */
  fromDirectionDeg: number;
  /** Radius of the clipping circle (the visualization disc). */
  radius: number;
  /**
   * Multiplier on the design-native tile. At scale 1 the pattern square is
   * 256 units (the Figma component size); the wind tile is 24 units and the
   * current tile 48 units.
   */
  patternScale: number;
  /** Pattern fill color; defaults to the regular tertiary instrument color. */
  color?: string;
}

const DESIGN_PATTERN_SQUARE = 256;
const WIND_TILE = 24;
/**
 * The Figma wind tile bakes in a −45° dash, i.e. wind from 315°; rotating by
 * `fromDirectionDeg − 315` reproduces the design exactly at 315°.
 */
const WIND_TILE_NATIVE_FROM_DIRECTION_DEG = 315;
const CURRENT_TILE = 48;
/** Band phase offset of the Figma current tile, in 256-square units. */
const CURRENT_TILE_PHASE_OFFSET = 104;
const DEFAULT_COLOR = 'var(--instrument-regular-tertiary-color)';

/**
 * Wind force-graphics: a repeating field of fading diagonal streaks
 * (4×24-unit dashes, transparent tail → opaque head), clipped to a circle
 * and rotated so the streaks flow with the wind.
 */
export function renderWindForcePattern(
  options: ForcePatternOptions
): SVGTemplateResult {
  const {fromDirectionDeg, radius, patternScale} = options;
  const color = options.color ?? DEFAULT_COLOR;
  const tile = WIND_TILE * patternScale;
  const side = DESIGN_PATTERN_SQUARE * patternScale;
  const rotation = fromDirectionDeg - WIND_TILE_NATIVE_FROM_DIRECTION_DEG;
  return svg`
    <defs>
      <linearGradient id="wind-force-dash-gradient" x1="4.09961" y1="4.92896" x2="4.09961" y2="28.929" gradientUnits="userSpaceOnUse">
        <stop stop-color=${color} stop-opacity="0"/>
        <stop offset="1" stop-color=${color}/>
      </linearGradient>
      <pattern id="wind-force-pattern" patternUnits="userSpaceOnUse" x=${-side / 2} y=${-side / 2} width=${tile} height=${tile} viewBox="0 0 24 24" preserveAspectRatio="none">
        <rect x="2.09961" y="4.92896" width="4" height="24" transform="rotate(-45 2.09961 4.92896)" fill="url(#wind-force-dash-gradient)"/>
      </pattern>
      <clipPath id="wind-force-clip"><circle cx="0" cy="0" r=${radius}/></clipPath>
    </defs>
    <g clip-path="url(#wind-force-clip)" transform="rotate(${rotation})">
      <rect x=${-side / 2} y=${-side / 2} width=${side} height=${side} fill="url(#wind-force-pattern)"/>
    </g>
  `;
}

/**
 * Current force-graphics: soft-edged gradient bands (48-unit sawtooth,
 * transparent → opaque), perpendicular to the flow, clipped to a circle and
 * rotated by the from-direction.
 */
export function renderCurrentForcePattern(
  options: ForcePatternOptions
): SVGTemplateResult {
  const {fromDirectionDeg, radius, patternScale} = options;
  const color = options.color ?? DEFAULT_COLOR;
  const tile = CURRENT_TILE * patternScale;
  const side = DESIGN_PATTERN_SQUARE * patternScale;
  const phase = CURRENT_TILE_PHASE_OFFSET * patternScale;
  return svg`
    <defs>
      <linearGradient id="current-force-band-gradient" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
        <stop stop-color=${color} stop-opacity="0"/>
        <stop offset="1" stop-color=${color}/>
      </linearGradient>
      <pattern id="current-force-pattern" patternUnits="userSpaceOnUse" x=${-side / 2 + phase} y=${-side / 2 + phase} width=${tile} height=${tile} viewBox="0 0 48 48" preserveAspectRatio="none">
        <rect width="48" height="48" fill="url(#current-force-band-gradient)"/>
      </pattern>
      <clipPath id="current-force-clip"><circle cx="0" cy="0" r=${radius}/></clipPath>
    </defs>
    <g clip-path="url(#current-force-clip)" transform="rotate(${fromDirectionDeg})">
      <rect x=${-side / 2} y=${-side / 2} width=${side} height=${side} fill="url(#current-force-pattern)"/>
    </g>
  `;
}
