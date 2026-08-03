import {nothing, svg, SVGTemplateResult} from 'lit';

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

/** Wave tuning for the current band pattern, on top of the shared options. */
export interface CurrentForcePatternOptions extends ForcePatternOptions {
  /**
   * Wavelength as a multiplier on the design band spacing (1 = design,
   * 0.5 = twice as dense). Non-finite or non-positive values fall back to 1.
   */
  waveLength?: number;
  /** Wave intensity: peak opacity the band gradient fades up to (0–1). */
  waveHeight?: number;
  /**
   * Drift speed in wavelengths per second, moving with the flow (negative
   * drifts against it). 0 / undefined keeps the pattern static.
   */
  waveSpeed?: number;
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
 * rotated by the from-direction. `waveLength` stretches the band spacing,
 * `waveHeight` scales the gradient's peak opacity, and a non-zero `waveSpeed`
 * drifts the field with the flow (one wavelength per `1/waveSpeed` seconds)
 * via a declarative SMIL loop.
 */
export function renderCurrentForcePattern(
  options: CurrentForcePatternOptions
): SVGTemplateResult {
  const {fromDirectionDeg, radius, patternScale} = options;
  const color = options.color ?? DEFAULT_COLOR;
  const lengthScale =
    Number.isFinite(options.waveLength) && options.waveLength! > 0
      ? options.waveLength!
      : 1;
  const intensity = Math.max(0, Math.min(1, options.waveHeight ?? 1));
  const speed = Number.isFinite(options.waveSpeed) ? options.waveSpeed! : 0;
  const tile = CURRENT_TILE * patternScale * lengthScale;
  const side = DESIGN_PATTERN_SQUARE * patternScale;
  const phase = CURRENT_TILE_PHASE_OFFSET * patternScale * lengthScale;
  // The pattern is anchored in the rect's user space, so translating the
  // wrapper group drifts the whole band field; the rect is one tile taller on
  // each end to stay covering the clip disc across the loop.
  const drift =
    speed !== 0
      ? svg`<animateTransform attributeName="transform" attributeType="XML" type="translate" from="0 0" to="0 ${tile * Math.sign(speed)}" dur="${1 / Math.abs(speed)}s" repeatCount="indefinite"/>`
      : nothing;
  return svg`
    <defs>
      <linearGradient id="current-force-band-gradient" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
        <stop stop-color=${color} stop-opacity="0"/>
        <stop offset="1" stop-color=${color} stop-opacity=${intensity}/>
      </linearGradient>
      <pattern id="current-force-pattern" patternUnits="userSpaceOnUse" x=${-side / 2 + phase} y=${-side / 2 + phase} width=${tile} height=${tile} viewBox="0 0 48 48" preserveAspectRatio="none">
        <rect width="48" height="48" fill="url(#current-force-band-gradient)"/>
      </pattern>
      <clipPath id="current-force-clip"><circle cx="0" cy="0" r=${radius}/></clipPath>
    </defs>
    <g clip-path="url(#current-force-clip)" transform="rotate(${fromDirectionDeg})">
      <g>
        ${drift}
        <rect x=${-side / 2} y=${-side / 2 - tile} width=${side} height=${side + 2 * tile} fill="url(#current-force-pattern)"/>
      </g>
    </g>
  `;
}
