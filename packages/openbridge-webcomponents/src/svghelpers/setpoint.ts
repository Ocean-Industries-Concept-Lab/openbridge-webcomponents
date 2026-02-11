/**
 * Unified Setpoint Marker Interface
 *
 * This module provides a design-driven abstraction for setpoint markers used
 * across both radial (watch-based) and linear (external-scale) instruments.
 *
 * ## Architecture
 *
 * The setpoint system is split into two layers:
 *
 * 1. **Design layer** (this file): Pure visual states and drawing functions.
 *    - `SetpointVisualState`: What the marker looks like (notEqual/equal/equalZero/focus)
 *    - `SetpointColorMode`: Which color palette to use (enhanced/regular)
 *    - `disabled`: Boolean flag for disabled state (separate from color mode)
 *    - `drawSetpointMarker()`: Returns SVG at origin, caller applies transforms
 *
 * 2. **API layer** (in parent instruments): Maps instrument state to visual state.
 *    - Deadband logic, touching detection, value comparison
 *    - Each instrument implements its own mapping
 *
 * ## Instrument Types
 *
 * ### Linear Instruments (external-scale, bar-vertical, bar-horizontal, gauge-trend)
 * - Use `external-scale.ts` derivation functions (deriveSetpointVisualState, etc.)
 * - Position marker using translate() and rotate() for side (left/right/top/bottom)
 *
 * ### Radial Instruments (watch, compass, heading, rudder, azimuth-thruster)
 * - Use `deriveRadialSetpointConfig()` from this file
 * - Position marker using rotate() for angle and translate() for radius
 * - Marker tip points inward toward center
 *
 * ## Coordinate System
 *
 * The `drawSetpointMarker()` function renders the marker with:
 * - **Tip at origin (0, 0)**
 * - **Triangle pointing "down" (positive Y direction)**
 * - **Size: 26px wide × 21px tall** (tip to base)
 *
 * Callers must apply transforms to:
 * - Position the marker at the correct location
 * - Rotate for radial instruments or flip for different sides
 *
 * ```
 *        ┌─────────────┐   ← base (y = -21)
 *        │             │
 *        └──────┬──────┘
 *               │
 *               ▼
 *              tip (0, 0)
 * ```
 *
 * ## Usage
 *
 * ```ts
 * // Radial instrument (watch.ts)
 * const {visualState, colorMode, disabled} = deriveRadialSetpointConfig({
 *   state: this.state,
 *   atSetpoint: this.atAngleSetpoint,
 * });
 * svg`
 *   <g transform="rotate(${angle + 90}) translate(${-RADIAL_SETPOINT_RADIUS}, 0) rotate(270)">
 *     ${drawSetpointMarker({visualState, colorMode, disabled, id: 'watch-setpoint'})}
 *   </g>
 * `;
 *
 * // Linear instrument (external-scale.ts)
 * const visualState = deriveSetpointVisualState(config);
 * const colorMode = deriveSetpointColorMode(config);
 * const disabled = deriveSetpointDisabled(config);
 * svg`
 *   <g transform="translate(${x}, ${y}) rotate(${rotation})">
 *     ${drawSetpointMarker({visualState, colorMode, disabled, id: 'scale-setpoint'})}
 *   </g>
 * `;
 * ```
 */

import {SVGTemplateResult, svg} from 'lit';

// ============================================================================
// Visual State Enums (Design Layer)
// ============================================================================

/**
 * Pure visual states for setpoint rendering.
 *
 * These represent DESIGN variations only — no instrument logic here.
 * Parent instruments are responsible for mapping their state to these values.
 */
export enum SetpointVisualState {
  /**
   * Input ≠ Output (value has not reached setpoint)
   * - Full size (100%)
   * - Primary color
   */
  notEqual = 'notEqual',

  /**
   * Input = Output (value equals setpoint, within deadband)
   * - Reduced size (80%)
   * - Primary color (no color change)
   */
  equal = 'equal',

  /**
   * Input = Output = 0 (both value and setpoint are at zero)
   * - Reduced size (80%)
   * - Primary color
   * - Additional 8px outward offset from the scale
   */
  equalZero = 'equalZero',

  /**
   * Focus state (user is actively adjusting/touching)
   * - Full size (100%)
   * - Filled shape with 2px colored border + 1px silhouette outside
   * - Regular: fill tertiary, border secondary
   * - Enhanced: fill base-blue-100, border neutral-enhanced
   * - Silhouette: --border-silhouette-color (both modes)
   */
  focus = 'focus',

  // TODO: minMax for radial only (triangle plus deadband arc range)
  // minMax = 'minMax',
}

/**
 * Color priority mode — determines which color palette to use.
 *
 * This is separate from InstrumentState to allow independent control.
 * Parent instruments map their state to this.
 *
 * Note: Disabled state is handled via a separate `disabled` boolean flag,
 * not as part of this enum. This allows combining any color mode with
 * the disabled state.
 */
export enum SetpointColorMode {
  /** Use enhanced colors (typically for inCommand state) */
  enhanced = 'enhanced',

  /** Use regular colors (typically for active state) */
  regular = 'regular',
}

// ============================================================================
// SVG Paths
// ============================================================================

/**
 * SVG path for filled (solid) setpoint triangle with all corners rounded (2px radius).
 *
 * Path is designed for a 26×21 bounding box with:
 * - Base at top (y ≈ 0.5)
 * - Tip at bottom (y ≈ 21), rounded
 * - Center at x = 13
 *
 * All three corners have ~2px rounding for a softer appearance.
 * Equal states use 80% scaling of this path.
 */
export const SETPOINT_PATH_FILLED =
  'M22.5918 0.5C25.014 0.50013 26.3186 3.34437 24.917 5.29199L15.0244 19.0371C14.0268 20.423 11.9635 20.423 10.9658 19.0371L1.07326 5.29199C-0.328328 3.34437 0.97623 0.500124 3.39845 0.5L22.5918 0.5Z';

// Legacy sharp-tip path (kept for reference, not currently used):
// 'M23.5119 8C24.6981 6.35191 23.5696 4 21.5926 4L2.39959 4C0.422598 4 -0.705911 6.35191 0.480283 8L11.9961 24L23.5119 8Z'

// ============================================================================
// Constants
// ============================================================================

/** Marker width in pixels */
export const SETPOINT_WIDTH = 26;

/** Marker height in pixels (tip to base) */
export const SETPOINT_HEIGHT = 21;

/** X-coordinate of the marker tip (center of the triangle base) */
export const SETPOINT_TIP_X = 13;

/** Y-coordinate of the marker tip */
export const SETPOINT_TIP_Y = 21;

/** Scale factor when marker is in "at setpoint" state (equal, equalZero) */
export const SETPOINT_AT_SCALE = 0.8;

/** Outward offset (px) for notEqual and focus states */
export const SETPOINT_NOT_EQUAL_OFFSET = 4;

/** Outward offset (px) for equalZero state */
export const SETPOINT_ZERO_OFFSET = 8;

// ============================================================================
// Animation Constants
// ============================================================================

/**
 * Default duration (ms) for the setpoint confirm animation.
 *
 * When `animateSetpoint=true` and a confirm transition occurs
 * (newSetpoint → undefined, setpoint → newValue):
 * - The original setpoint marker slides to the new position over this duration
 * - The original setpoint marker regains full opacity (0.75 → 1.0)
 * - The departing new-setpoint marker fades out (1 → 0 opacity)
 *
 * Consumers can override the duration via the CSS custom property
 * `--setpoint-animation-duration`.
 */
export const SETPOINT_ANIMATION_DURATION_MS = 300;

/**
 * CSS custom property name for the setpoint animation duration.
 * Set on any ancestor to override the default 300ms:
 *
 * ```css
 * obc-gauge-horizontal {
 *   --setpoint-animation-duration: 500ms;
 * }
 * ```
 */
export const SETPOINT_ANIMATION_CSS_VAR = '--setpoint-animation-duration';

/** Default CSS value for the animation duration. */
export const SETPOINT_ANIMATION_DURATION_DEFAULT = '300ms';

/**
 * Read the effective setpoint animation duration from the element's computed CSS.
 * Returns `SETPOINT_ANIMATION_DURATION_MS` if the CSS variable is missing or unparsable.
 */
export function getSetpointAnimationDurationMs(el: Element): number {
  const raw = getComputedStyle(el)
    .getPropertyValue(SETPOINT_ANIMATION_CSS_VAR)
    .trim();
  if (!raw) return SETPOINT_ANIMATION_DURATION_MS;
  const parsed = parseFloat(raw);
  if (Number.isNaN(parsed)) return SETPOINT_ANIMATION_DURATION_MS;
  if (raw.endsWith('s') && !raw.endsWith('ms')) return parsed * 1000;
  return parsed;
}

/**
 * Compute the shortest angular distance between two angles.
 * Returns a value in [0, 180].
 *
 * Used to decide whether a radial setpoint animation should play
 * (only when the angular delta is < 180°, to avoid the CSS transition
 * taking the "long way around").
 */
export function shortestAngularDistance(from: number, to: number): number {
  const rawDiff = Math.abs(((to - from) % 360) + 360) % 360;
  return rawDiff > 180 ? 360 - rawDiff : rawDiff;
}

// ============================================================================
// Configuration Interface
// ============================================================================

/**
 * Configuration for drawing a setpoint marker.
 *
 * This interface contains ONLY design-related properties.
 * Instrument-specific logic (deadbands, state mapping) belongs in the caller.
 */
export interface DrawSetpointMarkerConfig {
  /** Which visual state to render */
  visualState: SetpointVisualState;

  /** Color palette to use (enhanced = inCommand colors, regular = active colors) */
  colorMode: SetpointColorMode;

  /**
   * Whether the setpoint is in disabled state.
   * When true, overrides fill color to tertiary (disabled) color regardless of colorMode.
   * Typically auto-derived from InstrumentState.loading or InstrumentState.off.
   * @default false
   */
  disabled?: boolean;

  /**
   * Unique ID prefix for SVG defs (mask, etc.)
   * Required for deterministic output and to avoid conflicts when multiple
   * setpoint markers exist in the same SVG.
   *
   * Callers should generate stable IDs (e.g., based on component instance)
   * rather than random IDs to ensure SSR compatibility and snapshot stability.
   */
  id: string;
}

// ============================================================================
// Color Helpers
// ============================================================================

/**
 * Get the fill color for a setpoint marker based on visual state, color mode, and disabled state.
 *
 * Per design spec:
 * - `disabled: true`: tertiary color (overrides all other logic)
 * - `focus` state: tertiary (regular) or base-blue-100 (enhanced)
 * - All other states: primary color (no color change for equal/equalZero)
 *
 * @param visualState - The visual state of the setpoint
 * @param colorMode - The color palette to use
 * @param disabled - Whether the setpoint is in disabled state
 * @returns CSS variable string for the fill color
 */
export function getSetpointFillColor(
  visualState: SetpointVisualState,
  colorMode: SetpointColorMode,
  disabled: boolean = false
): string {
  // Disabled state uses tertiary color (overrides everything)
  if (disabled) {
    return 'var(--instrument-frame-tertiary-color)';
  }

  // Focus state has special fill colors
  if (visualState === SetpointVisualState.focus) {
    if (colorMode === SetpointColorMode.enhanced) {
      return 'var(--base-blue-100)';
    } else {
      return 'var(--instrument-regular-tertiary-color)';
    }
  }

  // All non-disabled states use primary color
  // (no color change for equal/equalZero — only size change)
  if (colorMode === SetpointColorMode.enhanced) {
    return 'var(--instrument-enhanced-primary-color)';
  } else {
    return 'var(--instrument-regular-primary-color)';
  }
}

/**
 * Get the stroke color for setpoint marker outline.
 *
 * - Focus state: secondary (regular) or neutral-enhanced (enhanced) - visible border
 * - All other states: silhouette color (subtle outline)
 *
 * @param visualState - The visual state of the setpoint
 * @param colorMode - The color palette to use
 * @returns CSS variable string for the stroke color
 */
export function getSetpointStrokeColor(
  visualState: SetpointVisualState,
  colorMode: SetpointColorMode
): string {
  if (visualState === SetpointVisualState.focus) {
    if (colorMode === SetpointColorMode.enhanced) {
      return 'var(--element-neutral-enhanced-color)';
    } else {
      return 'var(--instrument-regular-secondary-color)';
    }
  }

  // notEqual uses silhouette color
  return 'var(--border-silhouette-color)';
}

// ============================================================================
// Shape Helpers
// ============================================================================

/**
 * Get the SVG path for setpoint shape based on visual state.
 *
 * All states use the filled (solid) shape.
 * Focus state is differentiated by fill color and border, not shape.
 */
export function getSetpointPath(_visualState: SetpointVisualState): string {
  // All states use filled path
  // Focus is differentiated by fill color and visible border, not by shape
  return SETPOINT_PATH_FILLED;
}

/**
 * Get the scale factor for setpoint based on visual state.
 *
 * - `equal`, `equalZero`: 80% size
 * - `notEqual`, `focus`: 100% size
 */
export function getSetpointScale(visualState: SetpointVisualState): number {
  switch (visualState) {
    case SetpointVisualState.equal:
    case SetpointVisualState.equalZero:
      return SETPOINT_AT_SCALE;
    default:
      return 1.0;
  }
}

/**
 * Get the outward offset for setpoint marker based on visual state.
 *
 * The marker is shifted outward (away from the bar/scale) by:
 * - 8px for equalZero (to avoid overlapping with the zero position indicator)
 * - 4px for notEqual and focus (to visually separate from the scale)
 * - 0px for equal (marker sits closer to the scale)
 *
 * @param visualState - The visual state of the setpoint
 * @returns Offset in pixels
 */
export function getSetpointOutwardOffset(
  visualState: SetpointVisualState
): number {
  switch (visualState) {
    case SetpointVisualState.equalZero:
      return SETPOINT_ZERO_OFFSET;
    case SetpointVisualState.notEqual:
    case SetpointVisualState.focus:
      return SETPOINT_NOT_EQUAL_OFFSET;
    default:
      return 0;
  }
}
// ============================================================================
// Unique ID Generator
// ============================================================================

/**
 * Generate a unique ID for SVG defs (masks, etc.)
 *
 * @deprecated This function produces non-deterministic output which breaks
 * SSR hydration and snapshot tests. Callers should generate their own stable
 * IDs based on component instance or context.
 *
 * This function is kept for backward compatibility but will be removed in
 * a future version. Move ID generation to web component wrappers where
 * non-determinism is acceptable (runtime-only code).
 */
export function generateSetpointId(prefix: string = 'setpoint'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

// ============================================================================
// Core Drawing Function
// ============================================================================

/**
 * Draw a setpoint marker at origin.
 *
 * Returns an SVG fragment with the marker positioned so that:
 * - The **tip is at origin (0, 0)**
 * - The **triangle points down** (positive Y direction)
 *
 * Callers must apply transforms to position and orient the marker.
 *
 * ## Transform Examples
 *
 * **Radial instrument** (marker on outer ring, pointing toward center):
 * ```ts
 * // Position at angle, then rotate 180° so tip points inward
 * svg`<g transform="rotate(${angle}) translate(0, -${radius}) rotate(180)">
 *   ${drawSetpointMarker(config)}
 * </g>`;
 * ```
 *
 * **Linear vertical, right side** (marker points left toward bar):
 * ```ts
 * // Position at (x, y), rotate -90° so tip points left
 * svg`<g transform="translate(${x}, ${y}) rotate(-90)">
 *   ${drawSetpointMarker(config)}
 * </g>`;
 * ```
 *
 * **Linear vertical, left side** (marker points right toward bar):
 * ```ts
 * // Position at (x, y), rotate 90° so tip points right
 * svg`<g transform="translate(${x}, ${y}) rotate(90)">
 *   ${drawSetpointMarker(config)}
 * </g>`;
 * ```
 *
 * **Linear horizontal, bottom** (marker points up toward bar):
 * ```ts
 * // Position at (x, y), rotate 180° so tip points up
 * svg`<g transform="translate(${x}, ${y}) rotate(180)">
 *   ${drawSetpointMarker(config)}
 * </g>`;
 * ```
 *
 * **Linear horizontal, top** (marker points down toward bar):
 * ```ts
 * // Position at (x, y), no rotation needed (default points down)
 * svg`<g transform="translate(${x}, ${y})">
 *   ${drawSetpointMarker(config)}
 * </g>`;
 * ```
 *
 * @param config - Drawing configuration
 * @returns SVG template result with marker at origin
 */
export function drawSetpointMarker(
  config: DrawSetpointMarkerConfig
): SVGTemplateResult {
  const {visualState, colorMode, disabled = false, id} = config;

  const fillColor = getSetpointFillColor(visualState, colorMode, disabled);
  const strokeColor = getSetpointStrokeColor(visualState, colorMode);
  const path = getSetpointPath(visualState);
  const scale = getSetpointScale(visualState);

  // Use caller-provided ID for deterministic output (required for SSR/snapshots)
  const markerId = `${id}-marker`;
  const maskId = `${id}-mask`;

  // The path is designed with tip at (13, 21) in a 26×21 box.
  // We translate so the tip is at origin (0, 0).
  const tipOffsetX = -SETPOINT_TIP_X;
  const tipOffsetY = -SETPOINT_TIP_Y;

  // Scale transform with animation
  // Transform origin is at the tip (0, 0) after our translation
  const scaleTransform = `scale(${scale})`;

  // Focus state: visible 2px border stroke (no mask)
  // Other states: silhouette stroke (masked to outer edge only)
  const isFocus = visualState === SetpointVisualState.focus;

  return svg`
    <defs>
      <g id="${markerId}">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          transform="translate(${tipOffsetX}, ${tipOffsetY})"
          d="${path}"
          vector-effect="non-scaling-stroke"
        />
      </g>
      <mask id="${maskId}">
        <rect x="-20" y="-30" width="50" height="50" fill="white" />
        <use href="#${markerId}" fill="black" />
      </mask>
    </defs>
    <g transform="${scaleTransform}" style="transition: transform 200ms ease-in-out;">
      <use href="#${markerId}" fill="${fillColor}" stroke="none" />
      ${
        isFocus
          ? svg`
          <!-- Focus state: 1px silhouette (outer) + 2px colored border (inner) -->
          <!-- First: masked silhouette stroke for outer 1px edge -->
          <use
            href="#${markerId}"
            mask="url(#${maskId})"
            fill="none"
            stroke="var(--border-silhouette-color)"
            stroke-width="4"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
          <!-- Second: 2px colored border on top -->
          <use
            href="#${markerId}"
            fill="none"
            stroke="${strokeColor}"
            stroke-width="2"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
        `
          : svg`
          <use
            href="#${markerId}"
            mask="url(#${maskId})"
            fill="none"
            stroke="${strokeColor}"
            stroke-width="2"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
        `
      }
    </g>
  `;
}

// ============================================================================
// Re-exports for convenience
// ============================================================================

export type {SVGTemplateResult};

// ============================================================================
// Radial Instrument State Derivation
// ============================================================================

/**
 * Import InstrumentState for radial derivation functions.
 * This creates a dependency on the types module, but keeps all setpoint
 * logic centralized in this file.
 */
import {InstrumentState} from '../navigation-instruments/types.js';

// Re-export for convenience (callers may need it for their state properties)
export {InstrumentState};

/**
 * Configuration for deriving setpoint visual parameters for radial instruments.
 *
 * Radial instruments (watch, compass, etc.) use a simpler API than linear instruments:
 * - No deadband/value comparison (caller provides pre-computed `atSetpoint`)
 * - No fill modes or value tracking
 * - Angle-based positioning instead of linear coordinates
 *
 * ## newAngleSetpoint Pattern
 *
 * When `newAngleSetpoint` is defined, the component renders TWO setpoint markers:
 * 1. Original `angleSetpoint` marker - dimmed (0.75 opacity), uses derived visual state
 * 2. New `newAngleSetpoint` marker - focus visual state, full opacity
 *
 * This enables the "adjustment preview" UX where users can see both the current
 * and proposed setpoint positions simultaneously.
 */
export interface RadialSetpointConfig {
  /** Current instrument state (inCommand, active, loading, off) */
  state: InstrumentState;

  /**
   * Whether the current value equals the setpoint (within deadband).
   * Caller is responsible for deadband calculation.
   */
  atSetpoint: boolean;

  /**
   * The current setpoint angle in degrees.
   * Used to auto-derive atZero when within setpointAtZeroDeadband.
   */
  angleSetpoint?: number;

  /**
   * Deadband around zero for setpoint positioning (in degrees).
   * When |angleSetpoint| < setpointAtZeroDeadband, the setpoint is considered "at zero"
   * and triggers the equalZero visual state (80% size + outward offset).
   * @default 0.5
   */
  setpointAtZeroDeadband?: number;

  /**
   * New setpoint angle being adjusted (focus/adjustment mode).
   * When defined, indicates user is actively adjusting and triggers focus visual state.
   * The original setpoint marker will be dimmed while this is active.
   */
  newAngleSetpoint?: number;

  /**
   * Whether the user is physically interacting with the control (e.g. touching a lever).
   * When true (and `newAngleSetpoint` is undefined), the single setpoint marker
   * renders in focus visual state.
   *
   * This mirrors the linear path behavior in `deriveSetpointVisualState()` in
   * external-scale.ts, ensuring consistent focus rendering across both radial
   * and linear instruments.
   * @default false
   */
  touching?: boolean;
}

/**
 * Result of deriving setpoint visual parameters for radial instruments.
 */
export interface RadialSetpointDerivedConfig {
  /** Visual state for rendering (notEqual, equal, equalZero, focus) */
  visualState: SetpointVisualState;

  /** Color mode for rendering (enhanced, regular) */
  colorMode: SetpointColorMode;

  /** Whether setpoint should render in disabled state */
  disabled: boolean;

  /** Whether a newAngleSetpoint is being adjusted */
  hasNewSetpoint: boolean;
}

/**
 * Derive the visual parameters for a radial setpoint marker.
 *
 * This maps radial instrument state (from watch.ts, compass.ts, etc.)
 * to the unified setpoint visual parameters.
 *
 * ## State Mapping
 *
 * | InstrumentState | atSetpoint | atZero | newAngleSetpoint | → visualState | → colorMode | → disabled |
 * |-----------------|------------|--------|------------------|---------------|-------------|------------|
 * | inCommand       | false      | *      | undefined        | false    | notEqual      | enhanced    | false      |
 * | inCommand       | false      | *      | undefined        | true     | focus         | enhanced    | false      |
 * | inCommand       | true       | false  | undefined        | false    | equal         | enhanced    | false      |
 * | inCommand       | true       | true   | undefined        | false    | equalZero     | enhanced    | false      |
 * | inCommand       | *          | *      | defined          | *        | (original dimmed) | enhanced | false     |
 * | active          | false      | *      | undefined        | false    | notEqual      | regular     | false      |
 * | active          | false      | *      | undefined        | true     | focus         | regular     | false      |
 * | active          | true       | false  | undefined        | false    | equal         | regular     | false      |
 * | active          | true       | true   | undefined        | false    | equalZero     | regular     | false      |
 * | loading         | *          | *      | *                | *        | notEqual      | regular     | true       |
 * | off             | *          | *      | *                | *        | notEqual      | regular     | true       |
 *
 * Note: When `newAngleSetpoint` is defined, the original setpoint marker is dimmed
 * and a second marker is rendered in focus state at the new position.
 *
 * @param config - Radial instrument state configuration
 * @returns Derived visual parameters for drawSetpointMarker()
 */
export function deriveRadialSetpointConfig(
  config: RadialSetpointConfig
): RadialSetpointDerivedConfig {
  const {
    state,
    atSetpoint,
    angleSetpoint,
    setpointAtZeroDeadband = 0.5,
    newAngleSetpoint,
    touching = false,
  } = config;

  const hasNewSetpoint = newAngleSetpoint !== undefined;

  // Disabled states (loading, off) override all other logic
  if (state === InstrumentState.loading || state === InstrumentState.off) {
    return {
      visualState: SetpointVisualState.notEqual, // Full size, filled
      colorMode: SetpointColorMode.regular,
      disabled: true, // Tertiary color
      hasNewSetpoint,
    };
  }

  // Determine color mode based on instrument state:
  // - inCommand → enhanced colors
  // - active → regular colors
  const colorMode =
    state === InstrumentState.inCommand
      ? SetpointColorMode.enhanced
      : SetpointColorMode.regular;

  // Priority 1: Focus state
  // When touching=true and no newAngleSetpoint is defined, the single marker
  // shows in focus visual state (matching linear path behavior)
  if (touching && !hasNewSetpoint) {
    return {
      visualState: SetpointVisualState.focus,
      colorMode,
      disabled: false,
      hasNewSetpoint,
    };
  }

  // Auto-derive atZero from angleSetpoint and deadband
  const atZero =
    angleSetpoint !== undefined &&
    Math.abs(angleSetpoint) < setpointAtZeroDeadband;

  // For inCommand and active states:
  // - atSetpoint + atZero triggers equalZero visual state (80% size)
  // - atSetpoint triggers equal visual state (80% size)
  // - otherwise notEqual (full size)

  // Priority 2: At setpoint AND at zero (equalZero state - 80% size)
  if (atSetpoint && atZero) {
    return {
      visualState: SetpointVisualState.equalZero,
      colorMode,
      disabled: false,
      hasNewSetpoint,
    };
  }

  // Priority 3: At setpoint (equal state - 80% size)
  if (atSetpoint) {
    return {
      visualState: SetpointVisualState.equal,
      colorMode,
      disabled: false,
      hasNewSetpoint,
    };
  }

  // Default: Not at setpoint (notEqual state - full size)
  return {
    visualState: SetpointVisualState.notEqual,
    colorMode,
    disabled: false,
    hasNewSetpoint,
  };
}

// ============================================================================
// Radial Setpoint Positioning Constants
// ============================================================================

/**
 * Default radius for radial setpoint marker positioning.
 * This is the distance from the center of the watch to the setpoint tip.
 *
 * Based on watch.ts existing behavior: `translate(-168 0)`
 * The marker is positioned at 168px from center on the outer ring.
 */
export const RADIAL_SETPOINT_RADIUS = 168;

// ============================================================================
// Unified At-Setpoint Computation (API Layer)
// ============================================================================

/**
 * Configuration for the unified at-setpoint calculation.
 *
 * This replaces the 6+ divergent `atSetpointCalc()` implementations
 * scattered across instruments (instrument-radial, compass, heading,
 * rudder, speed-gauge, azimuth-thruster, external-scale, thruster).
 */
export interface ComputeAtSetpointConfig {
  /** Current instrument value (e.g. speed, angle, thrust) */
  value: number | undefined;

  /** Target setpoint value */
  setpoint: number | undefined;

  /**
   * User is physically interacting with the control (e.g. touching a lever).
   * When true, at-setpoint always returns false — prevents flickering
   * during real-time value changes.
   */
  touching: boolean;

  /**
   * When true, skips auto-calculation and uses the manual `atSetpointManual` boolean.
   * When false (default), auto-detects at-setpoint via deadband comparison.
   */
  disableAuto: boolean;

  /** Tolerance for auto at-setpoint detection */
  deadband: number;

  /**
   * Manual at-setpoint override.
   * Only used when `disableAuto` is true.
   */
  atSetpointManual: boolean;

  /**
   * Enable 360° angular wraparound for compass-like instruments.
   * When true, distance is calculated as the shortest arc: `min(|a-b|, 360-|a-b|)`.
   * Use this for heading/compass setpoints where 359° and 1° are 2° apart.
   * @default false
   */
  angularWraparound?: boolean;
}

/**
 * Unified at-setpoint calculation.
 *
 * Replaces the divergent implementations across:
 * - `instrument-radial.ts` `atSetpointCalc()` — no wraparound, `<` comparison
 * - `compass.ts` / `heading.ts` `atHeadingSetpointCalc()` — 360° wraparound, `<`
 * - `azimuth-thruster.ts` `atAngleSetpointCalc` — no wraparound (bug), `<`
 * - `external-scale.ts` `calculateAtSetpoint()` — `<=`, no touching guard
 * - `instrument-linear.ts` / `thruster.ts` `atSetpoint()` — `<`, standalone fn
 *
 * Standardized behavior:
 * - Uses `<=` (inclusive) for deadband comparison
 * - Always checks `touching` before calculating
 * - Validates deadband with `Number.isFinite()`
 * - Supports optional 360° angular wraparound
 *
 * @param config - At-setpoint calculation parameters
 * @returns Whether the current value is at the setpoint
 *
 * @example
 * ```ts
 * // Simple linear instrument
 * computeAtSetpoint({
 *   value: 42, setpoint: 40, touching: false,
 *   disableAuto: false, deadband: 2, atSetpointManual: false,
 * }); // → true (|42-40| = 2 <= 2)
 *
 * // Compass with wraparound
 * computeAtSetpoint({
 *   value: 359, setpoint: 1, touching: false,
 *   disableAuto: false, deadband: 3, atSetpointManual: false,
 *   angularWraparound: true,
 * }); // → true (angular distance = 2 <= 3)
 * ```
 */
export function computeAtSetpoint(config: ComputeAtSetpointConfig): boolean {
  const {
    value,
    setpoint,
    touching,
    disableAuto,
    deadband,
    atSetpointManual,
    angularWraparound = false,
  } = config;

  if (value === undefined || setpoint === undefined) return false;
  if (touching) return false;

  if (!disableAuto) {
    let distance = Math.abs(value - setpoint);
    if (angularWraparound && distance > 180) {
      distance = 360 - distance;
    }
    const safeDeadband = Number.isFinite(deadband) ? deadband : 0;
    return distance <= safeDeadband;
  }

  return atSetpointManual;
}
