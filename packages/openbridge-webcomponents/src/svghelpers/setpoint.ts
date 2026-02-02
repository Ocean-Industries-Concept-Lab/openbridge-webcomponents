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
 * SVG path for filled (solid) setpoint triangle with all corners rounded (2px radius).
 * Used for notEqual and focus states (full size).
 *
 * Path is designed for a 26×21 bounding box with:
 * - Base at top (y ≈ 0.5)
 * - Tip at bottom (y ≈ 21), rounded
 * - Center at x = 13
 *
 * All three corners have ~2px rounding for a softer appearance.
 */
export const SETPOINT_PATH_FILLED =
  'M22.5918 0.5C25.014 0.50013 26.3186 3.34437 24.917 5.29199L15.0244 19.0371C14.0268 20.423 11.9635 20.423 10.9658 19.0371L1.07326 5.29199C-0.328328 3.34437 0.97623 0.500124 3.39845 0.5L22.5918 0.5Z';

/**
 * SVG path for smaller setpoint triangle used in equal/equalZero states.
 * This is the native Figma path (not a scaled version of SETPOINT_PATH_FILLED).
 *
 * Path is designed for a 20×18 bounding box with:
 * - Base at top (y ≈ 0.5)
 * - Tip at bottom (y ≈ 18), rounded
 * - Center at x = 10
 *
 * All three corners have ~2px rounding for a softer appearance.
 */
export const SETPOINT_PATH_EQUAL =
  'M19.2627 1.90039C19.612 2.67698 19.6028 3.66251 19.0518 4.47949L11.2432 16.0508C10.6485 16.9321 9.35153 16.9321 8.75684 16.0508L0.948253 4.47949C0.39716 3.66251 0.387977 2.67698 0.737316 1.90039C1.0871 1.12287 1.82694 0.5 2.80274 0.5L17.1973 0.5C18.1731 0.5 18.9129 1.12287 19.2627 1.90039Z';

// Legacy sharp-tip path (kept for reference, not currently used):
// 'M23.5119 8C24.6981 6.35191 23.5696 4 21.5926 4L2.39959 4C0.422598 4 -0.705911 6.35191 0.480283 8L11.9961 24L23.5119 8Z'

// ============================================================================
// Constants
// ============================================================================

// Full-size marker (notEqual, focus states)
/** Marker width in pixels (full size) */
export const SETPOINT_WIDTH = 26;

/** Marker height in pixels (full size, tip to base) */
export const SETPOINT_HEIGHT = 21;

/** X-coordinate of the marker tip (full size) */
export const SETPOINT_TIP_X = 13;

/** Y-coordinate of the marker tip (full size) */
export const SETPOINT_TIP_Y = 21;

// Equal-size marker (equal, equalZero states)
/** Marker width in pixels (equal size) */
export const SETPOINT_EQUAL_WIDTH = 20;

/** Marker height in pixels (equal size, tip to base) */
export const SETPOINT_EQUAL_HEIGHT = 18;

/** X-coordinate of the marker tip (equal size) */
export const SETPOINT_EQUAL_TIP_X = 10;

/** Y-coordinate of the marker tip (equal size) */
export const SETPOINT_EQUAL_TIP_Y = 18;

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

  // notEqual uses silhouette color
  return 'var(--border-silhouette-color)';
}

// ============================================================================
// Shape Helpers
// ============================================================================

/**
 * Get the SVG path for setpoint shape based on visual state.
 *
 * - equal/equalZero: Use smaller SETPOINT_PATH_EQUAL (native Figma path)
 * - notEqual/focus: Use full-size SETPOINT_PATH_FILLED
 */
export function getSetpointPath(visualState: SetpointVisualState): string {
  switch (visualState) {
    case SetpointVisualState.equal:
    case SetpointVisualState.equalZero:
      return SETPOINT_PATH_EQUAL;
    default:
      return SETPOINT_PATH_FILLED;
  }
}

/**
 * Get the tip offset (translation to place tip at origin) for a visual state.
 *
 * Returns {x, y} coordinates to translate the path so its tip is at (0, 0).
 * Different paths have different dimensions, so the offset varies.
 */
export function getSetpointTipOffset(visualState: SetpointVisualState): {
  x: number;
  y: number;
} {
  switch (visualState) {
    case SetpointVisualState.equal:
    case SetpointVisualState.equalZero:
      return {x: -SETPOINT_EQUAL_TIP_X, y: -SETPOINT_EQUAL_TIP_Y};
    default:
      return {x: -SETPOINT_TIP_X, y: -SETPOINT_TIP_Y};
  }
}

/**
 * Get the outward offset for setpoint marker based on visual state.
 *
 * The marker is shifted outward (away from the bar/scale) by:
 * - 8px for equalZero (to avoid overlapping with the zero position indicator)
 * - 4px for notEqual and focus (to visually separate from the scale)
 * - -1px for equal (marker starts where the tickmarks start, offsetting the outline)
 *
 * @param visualState - The visual state of the setpoint
 * @returns Offset in pixels
 */
export function getSetpointOutwardOffset(
  visualState: SetpointVisualState
): number {
  switch (visualState) {
    case SetpointVisualState.equal:
      return -1;
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
  const {visualState, colorMode, id} = config;

  const fillColor = getSetpointFillColor(visualState, colorMode);
  const strokeColor = getSetpointStrokeColor(visualState, colorMode);
  const path = getSetpointPath(visualState);

  // Use caller-provided ID for deterministic output (required for SSR/snapshots)
  const markerId = `${id}-marker`;
  const maskId = `${id}-mask`;

  // Get the tip offset for this visual state's path
  // Different paths have different dimensions, so we need state-specific offsets
  const tipOffset = getSetpointTipOffset(visualState);

  // TODO: we are using 2 different triangle paths, not scaling any more
  // Scale transform (currently always 1.0, kept for potential future use)
  const scaleTransform = `scale(1.0)`;

  // Focus state: visible 2px border stroke (no mask)
  // Other states: silhouette stroke (masked to outer edge only)
  const isFocus = visualState === SetpointVisualState.focus;

  return svg`
    <defs>
      <g id="${markerId}">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          transform="translate(${tipOffset.x}, ${tipOffset.y})"
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
