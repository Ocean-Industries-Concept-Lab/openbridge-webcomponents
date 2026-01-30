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
 *    - `SetpointVisualState`: What the marker looks like
 *    - `SetpointColorMode`: Which color palette to use
 *    - `drawSetpointMarker()`: Returns SVG at origin, caller applies transforms
 *
 * 2. **API layer** (in parent instruments): Maps instrument state to visual state.
 *    - Deadband logic, touching detection, value comparison
 *    - Each instrument implements its own mapping
 *
 * ## Coordinate System
 *
 * The `drawSetpointMarker()` function renders the marker with:
 * - **Tip at origin (0, 0)**
 * - **Triangle pointing "down" (positive Y direction)**
 * - **Size: 24px wide × 24px tall** (tip to base)
 *
 * Callers must apply transforms to:
 * - Position the marker at the correct location
 * - Rotate for radial instruments or flip for different sides
 *
 * ```
 *        ┌─────────────┐   ← base (y = -24)
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
 * const config = {visualState, colorMode, id: 'watch-setpoint'};
 * svg`
 *   <g transform="rotate(${angle}) translate(0, -${radius})">
 *     <g transform="rotate(180)">${drawSetpointMarker(config)}</g>
 *   </g>
 * `;
 *
 * // Linear instrument (external-scale.ts)
 * const config = {visualState, colorMode, id: 'scale-setpoint'};
 * svg`
 *   <g transform="translate(${x}, ${y}) rotate(${rotation})">
 *     ${drawSetpointMarker(config)}
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
   * - Filled shape with 2px border
   * - Regular: fill tertiary, border secondary
   * - Enhanced: fill base-blue-100, border neutral-enhanced
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
 */
export enum SetpointColorMode {
  /** Use enhanced colors (typically for inCommand state) */
  enhanced = 'enhanced',

  /** Use regular colors (typically for active state) */
  regular = 'regular',

  /** Use disabled colors (tertiary color palette) */
  disabled = 'disabled',
}

// ============================================================================
// SVG Paths
// ============================================================================

/**
 * SVG path for filled (solid) setpoint triangle.
 *
 * Path is designed for a 24×24 bounding box with:
 * - Base at top (y ≈ 4-8)
 * - Tip at bottom (y = 24)
 * - Center at x = 12
 */
export const SETPOINT_PATH_FILLED =
  'M23.5119 8C24.6981 6.35191 23.5696 4 21.5926 4L2.39959 4C0.422598 4 -0.705911 6.35191 0.480283 8L11.9961 24L23.5119 8Z';

/**
 * SVG path for outlined (hollow) setpoint triangle.
 *
 * Same dimensions as filled, but with inner cutout for outline effect.
 */
export const SETPOINT_PATH_OUTLINED =
  'M18.5836 8L5.4086 8L11.9961 17.1526L18.5836 8ZM23.5119 8C24.6981 6.35191 23.5696 4 21.5926 4L2.39959 4C0.422598 4 -0.705911 6.35191 0.480283 8L11.9961 24L23.5119 8Z';

// ============================================================================
// Constants
// ============================================================================

/** Marker width in pixels */
export const SETPOINT_WIDTH = 24;

/** Marker height in pixels (tip to base) */
export const SETPOINT_HEIGHT = 24;

/** X-coordinate of the marker tip (center of the triangle base) */
export const SETPOINT_TIP_X = 12;

/** Y-coordinate of the marker tip */
export const SETPOINT_TIP_Y = 24;

/** Scale factor when marker is in "at setpoint" state (equal, equalZero) */
export const SETPOINT_AT_SCALE = 0.8;

/** Outward offset (px) for notEqual and focus states */
export const SETPOINT_NOT_EQUAL_OFFSET = 4;

/** Outward offset (px) for equalZero state */
export const SETPOINT_ZERO_OFFSET = 8;

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
 * Get the fill color for a setpoint marker based on visual state and color mode.
 *
 * Per design spec:
 * - `disabled` color mode: tertiary color
 * - `focus` state: tertiary (regular) or base-blue-100 (enhanced)
 * - All other states: primary color (no color change for equal/equalZero)
 *
 * @param visualState - The visual state of the setpoint
 * @param colorMode - The color palette to use
 * @returns CSS variable string for the fill color
 */
export function getSetpointFillColor(
  visualState: SetpointVisualState,
  colorMode: SetpointColorMode
): string {
  // Disabled color mode uses tertiary color
  if (colorMode === SetpointColorMode.disabled) {
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

  // --- LEGACY: Secondary color for equal states (commented out for potential future use) ---
  // const isAtSetpoint =
  //   visualState === SetpointVisualState.equal ||
  //   visualState === SetpointVisualState.equalZero;
  //
  // if (colorMode === SetpointColorMode.enhanced) {
  //   return isAtSetpoint
  //     ? 'var(--instrument-enhanced-secondary-color)'
  //     : 'var(--instrument-enhanced-primary-color)';
  // } else {
  //   return isAtSetpoint
  //     ? 'var(--instrument-regular-secondary-color)'
  //     : 'var(--instrument-regular-primary-color)';
  // }
  // --- END LEGACY ---
}

/**
 * Get the stroke color for setpoint marker outline.
 *
 * - Focus state: secondary (regular) or neutral-enhanced (enhanced) - visible border
 * - Equal/EqualZero states: frame-primary color (subtle silhouette)
 * - NotEqual state: silhouette color
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

  if (
    visualState === SetpointVisualState.equal ||
    visualState === SetpointVisualState.equalZero
  ) {
    return 'var(--instrument-frame-primary-color)';
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
 * All states now use the filled (solid) shape.
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
 *
 * TODO: Current external-scale.ts scales to 80% for equal/equalZero.
 *       Current watch.ts does NOT scale at all.
 *       Future: all implementations should scale to 80% for equal states.
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

/**
 * @deprecated Use `getSetpointOutwardOffset` instead.
 * This alias is kept for backward compatibility with watch.ts.
 */
export const getSetpointZeroOffset = getSetpointOutwardOffset;

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
  const {visualState, colorMode, id} = config;

  const fillColor = getSetpointFillColor(visualState, colorMode);
  const strokeColor = getSetpointStrokeColor(visualState, colorMode);
  const path = getSetpointPath(visualState);
  const scale = getSetpointScale(visualState);

  // Use caller-provided ID for deterministic output (required for SSR/snapshots)
  const markerId = `${id}-marker`;
  const maskId = `${id}-mask`;

  // The path is designed with tip at (12, 24) in a 24×24 box.
  // We translate so the tip is at origin (0, 0).
  // Path local coords: tip at (SETPOINT_TIP_X, SETPOINT_TIP_Y) = (12, 24)
  // After translate(-12, -24): tip at (0, 0)
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
