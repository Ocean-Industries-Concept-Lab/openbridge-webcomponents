import {SVGTemplateResult, nothing, svg} from 'lit';
import {
  InstrumentState,
  FrameStyle,
  BorderRadiusPosition,
} from '../../navigation-instruments/types.js';
import {
  AdviceState,
  AdviceType,
} from '../../navigation-instruments/watch/advice.js';
import {
  tickmarkColor,
  TickmarkStyle,
} from '../../navigation-instruments/watch/tickmark.js';
import {
  adjustRectWidthForStroke,
  adjustRectHeightForStroke,
  valueToX,
  valueToY,
} from '../../svghelpers/stroke-aware.js';

/**
 * External Scale renderer (pure SVG building block).
 *
 * This module provides a side-aware, orientation-aware SVG “ruler/axis” renderer
 * that can be used standalone, as an overlay axis for charts, or composed inside
 * other components.
 *
 * Unlike Lit components, this file exports **pure functions** that return
 * `SVGTemplateResult` fragments. Consumers are responsible for creating the
 * outer `<svg>` element (including `viewBox`, sizing, and `preserveAspectRatio`).
 *
 * Note: this module also exports a few small DOM-oriented helpers used by the
 * web-component wrappers to read CSS variables (e.g. border radius) and observe
 * theme/size changes.
 *
 * ## What it renders
 * - **Bar container**: a rounded rectangle band (optional)
 * - **Bar fill**: value fill (0→value) or tinted range fill (fillMin→fillMax)
 * - **Tickmarks**: main + primary + secondary + tertiary tick lines (optional)
 * - **Labels**: numeric labels at primary tick interval (optional)
 * - **Advice overlays**: alert/advice/caution ranges with canonical dashed bounds
 * - **Setpoint marker**: a triangular marker that flips by side and scales when
 *   “at setpoint”
 *
 * ## Layout model
 * - `orientation`: `'vertical' | 'horizontal'` controls value→coordinate mapping
 * - `side`: where the scale attaches to the chart edge
 *   - vertical: `'left' | 'right'`
 *   - horizontal: `'top' | 'bottom'`
 * - The **chart edge is always at perpendicular coordinate `0`**.
 *   The scale expands outward into positive or negative perpendicular space
 *   depending on `side`.
 *
 * Use `computeExternalScaleLayout()` to compute the minimal viewBox thickness for
 * the selected bands (bar/ticks/labels).
 *
 * ## Theming & responsive sizing
 * This renderer uses CSS variables directly in SVG attributes.
 * It is designed to inherit theme and sizing variables from parent containers
 * (e.g. `.obc-component-size-*` wrappers) the same way web components do.
 *
 * Common variables involved:
 * - `--global-typography-ui-label-font-size`
 * - `--instrument-frame-*-color`, `--instrument-*-*-color`
 * - `--instrument-components-watchface-frame-regular-border-radius`
 *
 * **Browser note (SVG geometry + CSS variables):**
 * Some browsers (notably Chrome) do not reliably resolve `var(--...)` inside SVG
 * geometry/path calculations. When you need **selective corner rounding** (which
 * requires numeric path geometry), pass a numeric pixel value via
 * `ExternalScaleConfig.borderRadius`.
 *
 * The web-component wrappers (`obc-bar-vertical` / `obc-bar-horizontal`) compute
 * this numeric value from the CSS variable
 * `--instrument-components-watchface-frame-regular-border-radius` so component-size
 * wrappers (e.g. `.obc-component-size-*`) remain the source of truth.
 *
 * ## Usage examples
 *
 * ### Standalone usage
 * ```ts
 * import {html} from 'lit';
 * import {computeExternalScaleLayout, renderExternalScale} from './external-scale.js';
 *
 * const config = {
 *   orientation: 'vertical',
 *   side: 'right',
 *   length: 320,
 *   paddingStart: 32,
 *   paddingEnd: 32,
 *   minValue: 0,
 *   maxValue: 100,
 *   hasBar: true,
 *   hasScale: true,
 *   labels: true,
 *   scaleBackground: false,
 *   barThickness: 24,
 *   tickThickness: 28,
 *   labelThickness: 60,
 *   mainTickbars: [],
 *   primaryTickbarsInterval: 20,
 *   secondaryTickbarsInterval: 10,
 *   tertiaryTickbarsInterval: 2,
 *   scaleType: ScaleType.regular,
 *   frameStyle: FrameStyle.regular,
 *   enhanced: true,
 *   fillMode: FillMode.fill,
 *   fillMin: 0,
 *   fillMax: 40,
 *   value: 40,
 *   setpoint: 50,
 *   atSetpoint: false,
 *   disableAutoAtSetpoint: false,
 *   autoAtSetpointDeadband: 1,
 *   setpointAtZeroDeadband: 0.5,
 *   state: InstrumentState.inCommand,
 *   advicePosition: AdvicePosition.inner,
 *   advices: [{min: 60, max: 80, type: AdviceType.caution, hinted: true}],
 * };
 *
 * const layout = computeExternalScaleLayout(config);
 * const parts = renderExternalScale(config);
 *
 * // Wrap returned fragments in an SVG.
 * const tpl = html`<svg
 *   width="${layout.viewBoxThickness}px"
 *   height="${config.length}px"
 *   viewBox="${layout.viewBoxPerpStart} ${-config.length / 2} ${layout.viewBoxThickness} ${config.length}"
 *   preserveAspectRatio="none"
 * >
 *   ${parts.barContainer}
 *   ${parts.barFill}
 *   ${parts.scaleBackground}
 *   ${parts.tickmarks}
 *   ${parts.labels}
 *   ${parts.adviceOverlays}
 *   ${parts.setpoint}
 * </svg>`;
 * ```
 *
 * ### Web component wrappers
 * For common usage, prefer the thin wrappers:
 * - `obc-bar-vertical` (sets up vertical viewBox)
 * - `obc-bar-horizontal` (sets up horizontal viewBox)
 */

/** Main axis orientation for the external scale renderer. */
export type ExternalScaleOrientation = 'vertical' | 'horizontal';

/** Which side of the chart area the scale is attached to. */
export type ExternalScaleSide = 'left' | 'right' | 'top' | 'bottom';

/** Tick density preset */
export enum ScaleType {
  regular = 'regular',
  condensed = 'condensed',
}

/** Fill visualization mode */
export enum FillMode {
  fill = 'fill',
  tint = 'tint',
}

/** Advice overlay position */
export enum AdvicePosition {
  center = 'center',
  inner = 'inner',
  outer = 'outer',
}

/**
 * Bar container background style.
 * Controls the background color of the bar container independently of scaleBackground.
 */
export enum BarContainerStyle {
  /** Use lighter primary color (--instrument-frame-primary-color) */
  primary = 'primary',
  /** Use darker secondary color (--instrument-frame-secondary-color) */
  secondary = 'secondary',
}

/** CSS variable used by component-size wrappers to define frame corner rounding. */
export const EXTERNAL_SCALE_BORDER_RADIUS_CSS_VAR =
  '--instrument-components-watchface-frame-regular-border-radius';

/**
 * Parse a CSS length into pixels.
 *
 * Supports: `px`, `rem`, `em`, and unitless values (treated as px).
 * Returns `undefined` when parsing fails.
 */
export function parseCssLengthToPx(
  value: string,
  context?: {element?: Element; documentElement?: Element}
): number | undefined {
  if (!value) return undefined;

  const v = value.trim();
  const n = Number.parseFloat(v);
  if (!Number.isFinite(n)) return undefined;

  if (v.endsWith('px')) return n;

  // Avoid throwing in non-DOM contexts (SSR/tests)
  const canComputeStyles = typeof getComputedStyle === 'function';

  if (v.endsWith('rem')) {
    if (!canComputeStyles) return undefined;
    const docEl =
      context?.documentElement ??
      (typeof document !== 'undefined' ? document.documentElement : undefined);
    if (!docEl) return undefined;
    const rootFontSize = Number.parseFloat(getComputedStyle(docEl).fontSize);
    return Number.isFinite(rootFontSize) ? n * rootFontSize : undefined;
  }

  if (v.endsWith('em')) {
    if (!canComputeStyles) return undefined;
    const el = context?.element;
    if (!el) return undefined;
    const fontSize = Number.parseFloat(getComputedStyle(el).fontSize);
    return Number.isFinite(fontSize) ? n * fontSize : undefined;
  }

  // If unitless or an unsupported unit, assume px.
  return n;
}

/**
 * Read the external scale border radius CSS variable from an element and return
 * a numeric pixel value suitable for path-based selective corner rounding.
 *
 * Falls back to 4px for condensed and 8px for regular when CSS/DOM is unavailable.
 */
export function readExternalScaleBorderRadiusPx(
  host: Element,
  scaleType: ScaleType,
  cssVarName: string = EXTERNAL_SCALE_BORDER_RADIUS_CSS_VAR
): number {
  const fallback = scaleType === ScaleType.condensed ? 4 : 8;

  if (typeof getComputedStyle !== 'function') return fallback;

  const raw = getComputedStyle(host).getPropertyValue(cssVarName).trim();
  const parsed = parseCssLengthToPx(raw, {
    element: host,
    documentElement:
      // Prefer the element's owning document to support iframes/shadow contexts.
      (host as HTMLElement).ownerDocument?.documentElement ??
      (typeof document !== 'undefined' ? document.documentElement : undefined),
  });

  return parsed ?? fallback;
}

/**
 * Start observing likely style-change sources (host + ancestors + documentElement)
 * and call `onChange` when class/style attributes change.
 *
 * Returns the MutationObserver instance, or `undefined` when MutationObserver/DOM
 * is unavailable.
 */
export function startExternalScaleBorderRadiusObserver(
  host: HTMLElement,
  onChange: () => void
): MutationObserver | undefined {
  if (typeof MutationObserver === 'undefined') return undefined;

  const observer = new MutationObserver(() => onChange());

  const targets: Element[] = [host];
  let current: Element | null = host.parentElement;
  while (current) {
    targets.push(current);
    current = current.parentElement;
  }

  const docEl = host.ownerDocument?.documentElement;
  if (docEl) targets.push(docEl);

  for (const t of targets) {
    observer.observe(t, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });
  }

  return observer;
}

/** Default border radius (px) used when `ExternalScaleConfig.borderRadius` is not provided. */
export function defaultExternalScaleBorderRadiusPx(
  scaleType: ScaleType
): number {
  return scaleType === ScaleType.condensed ? 4 : 8;
}

/**
 * Compute a safe, numeric border radius (px) for geometry calculations.
 *
 * When `borderRadius` is undefined/invalid, falls back to a scaleType-based default.
 */
export function computeExternalScaleEffectiveBorderRadiusPx(
  config: Pick<ExternalScaleConfig, 'borderRadius' | 'scaleType'>
): number {
  const fallback = defaultExternalScaleBorderRadiusPx(config.scaleType);
  const r = config.borderRadius;
  return typeof r === 'number' && Number.isFinite(r) && r >= 0 ? r : fallback;
}

/**
 * Compute the effective bar thickness.
 *
 * To keep rounded corners visually correct, the bar band must be at least
 * `2 * borderRadius` thick (otherwise the rounding geometry self-intersects).
 */
export function computeExternalScaleEffectiveBarThickness(
  config: Pick<
    ExternalScaleConfig,
    'hasBar' | 'barThickness' | 'borderRadius' | 'scaleType'
  >
): number {
  const bt = Number.isFinite(config.barThickness) ? config.barThickness : 0;
  if (!config.hasBar) return bt;

  const r = computeExternalScaleEffectiveBorderRadiusPx(config);
  return Math.max(bt, r * 2);
}

/**
 * Compute the effective tick band thickness based on scale type.
 *
 * In condensed mode, ticks are shorter (max 12px for primary/main + 4px gap = 16px),
 * so the tick band doesn't need to be as thick as in regular mode (24px + 4px = 28px).
 *
 * This function ensures that:
 * - In regular mode: tickThickness is used as-is (minimum 28px for full-length ticks)
 * - In condensed mode: tickThickness is capped at 16px (12px tick + 4px gap)
 *
 * This allows wrappers to use a single default tickThickness (28px) while the layout
 * automatically adjusts for condensed mode.
 *
 * @param config - Configuration with tickThickness and scaleType
 * @returns Effective tick band thickness in pixels
 */
export function computeExternalScaleEffectiveTickThickness(
  config: Pick<ExternalScaleConfig, 'tickThickness' | 'scaleType'>
): number {
  const tt = Number.isFinite(config.tickThickness) ? config.tickThickness : 0;

  // In condensed mode, the longest tick is 12px, plus 4px gap = 16px max needed
  // Cap the tick thickness to avoid wasted space between ticks and labels
  if (config.scaleType === ScaleType.condensed) {
    const condensedMaxThickness = 16; // 12px tick + 4px gap
    return Math.min(tt, condensedMaxThickness);
  }

  return tt;
}

export interface ExternalScaleAdvice {
  /** Range start value (in scale units). */
  min: number;
  /** Range end value (in scale units). */
  max: number;
  type: AdviceType;
  /** When true, renders in a "hinted" state unless the setpoint is inside the range. */
  hinted: boolean;
}

export interface ExternalScaleAdviceRaw {
  min: number;
  max: number;
  type: AdviceType;
  state: AdviceState;
}

export interface ExternalScaleConfig {
  /** Main axis orientation used for value-to-coordinate mapping. */
  orientation: ExternalScaleOrientation;
  /**
   * Which side of the chart area this scale lives on.
   * - vertical: 'left' | 'right'
   * - horizontal: 'top' | 'bottom'
   */
  side: ExternalScaleSide;

  /** Total length in pixels (vertical: height, horizontal: width), including padding. */
  length: number;

  /** Padding at start of main axis (top for vertical, left for horizontal). */
  paddingStart: number;
  /** Padding at end of main axis (bottom for vertical, right for horizontal). */
  paddingEnd: number;

  /** Minimum scale value. */
  minValue: number;
  /** Maximum scale value. */
  maxValue: number;

  // Layout bands (thickness, in px)
  /** Show scale tickmarks. */
  hasScale: boolean;
  /** Show labels at primary tickbar intervals. */
  labels?: boolean;
  /** Show bar. */
  hasBar: boolean;
  /** Show background behind the scale tickmarks. */
  scaleBackground: boolean;

  /** Bar band thickness in pixels (the container / fill area). */
  barThickness: number;
  /**
   * Bar container background style.
   * When undefined, defaults based on scaleBackground:
   * - scaleBackground=true: secondary (gray)
   * - scaleBackground=false: primary (lighter)
   * Set explicitly to override this default behavior.
   */
  barContainerStyle?: BarContainerStyle;
  /** Tickmark band thickness in pixels (space reserved for tick lines). */
  tickThickness: number;
  /** Label band thickness in pixels (space reserved for numbers). */
  labelThickness: number;

  // Tick configuration
  /** Array of values for main tickbars. Defaults to [minValue, 0, maxValue] if empty. */
  mainTickbars?: number[];
  /**
   * Interval for primary tickbars. When undefined, no primary tickbars are shown.
   * When a positive number, primary tickbars are shown at that interval.
   */
  primaryTickbarsInterval?: number;
  /**
   * Interval for secondary tickbars. When undefined, no secondary tickbars are shown.
   * When a positive number, secondary tickbars are shown at that interval.
   */
  secondaryTickbarsInterval?: number;
  /**
   * Interval for tertiary tickbars. When undefined, no tertiary tickbars are shown.
   * When a positive number, tertiary tickbars are shown at that interval.
   */
  tertiaryTickbarsInterval?: number;
  /**
   * Tick density preset.
   * - ScaleType.regular: longer ticks
   * - ScaleType.condensed: shorter ticks
   */
  scaleType: ScaleType;
  /**
   * Frame style preset.
   * - FrameStyle.regular: all ticks offset from bar edge by a gap
   * - FrameStyle.flat: main ticks touch the bar edge
   * - FrameStyle.framed: framed appearance
   * - FrameStyle.instrument: instrument-style appearance
   */
  frameStyle: FrameStyle;
  /**
   * Border radius position based on component layout.
   * Determines which corners receive rounded borders.
   */
  borderRadiusPosition?: BorderRadiusPosition;
  /**
   * Override border radius value (in pixels).
   * When undefined, uses default based on scaleType (4px for condensed, 8px for regular).
   * Set this to the computed CSS variable value to make path-based selective corner
   * rounding respond to theme changes.
   */
  borderRadius?: number;

  // Visual state
  enhanced: boolean;
  /**
   * Fill visualization mode.
   * - FillMode.fill: bar fill from fillMin to fillMax
   * - FillMode.tint: bar fill from fillMin to fillMax with marker at value position
   */
  fillMode: FillMode;
  fillMin?: number;
  fillMax?: number;
  /** Current value used for fill and/or marker rendering. */
  value?: number;

  // Setpoint
  /**
   * Setpoint value. When undefined, no setpoint marker is shown.
   * When a number, the setpoint marker is shown at that value.
   */
  setpoint?: number;
  /** Manual override used when disableAutoAtSetpoint=true. */
  atSetpoint: boolean;
  /** When false, at-setpoint is derived from value/setpoint and deadband. */
  disableAutoAtSetpoint: boolean;
  /** Deadband used for automatic at-setpoint detection. */
  autoAtSetpointDeadband: number;
  /** Deadband around 0 where the setpoint indicator snaps to exactly 0. */
  setpointAtZeroDeadband: number;
  state: InstrumentState;

  // Advice
  /** Where advice overlays are drawn relative to the bar/tick bands. */
  advicePosition: AdvicePosition;
  /** Array of advice ranges (min/max/type/hinted). */
  advices?: ExternalScaleAdvice[];

  /**
   * When true, freezes all internal calculations and scales the entire component
   * proportionally (like CSS transform:scale), except label font-size remains constant.
   * When false (default), dimensions react to component properties.
   * @default false
   */
  fixedAspectRatio?: boolean;

  /**
   * Reference size for proportional scaling when fixedAspectRatio is true.
   * At this size, the scale renders at native 1:1 (matches Figma design).
   * Above this size, the scale grows proportionally; below, it shrinks.
   * Applied to the main axis dimension (height for vertical, width for horizontal).
   * @default 384
   */
  scaleReferenceSize?: number;

  /**
   * When true, the component is used inside an instrument (e.g., gauge-trend).
   * In this mode, only label font size responds to .obc-component-size-* CSS classes.
   * Border radius uses the explicit `borderRadius` property value (or defaults to 8px regular / 4px condensed),
   * rather than reading from CSS variables.
   *
   * Wrappers should:
   * - Skip CSS variable observers when instrumentMode=true
   * - Use explicit borderRadius value or scaleType-based defaults
   *
   * @default false
   */
  instrumentMode?: boolean;

  /**
   * When true, displays a dot indicator at the current value position.
   * The dot is rendered in the scale band, touching its inner edge (towards the chart).
   * This provides an alternative to bar fill for highlighting the current value.
   *
   * The dot is:
   * - 12x12px filled circle with 2px stroke (16px total visual size)
   * - Fill: --instrument-regular-secondary-color (or enhanced variant when enhanced=true)
   * - Stroke: --instrument-frame-primary-color
   *
   * @default false
   */
  highlightCurrentValue?: boolean;
}

export interface ExternalScaleLayout {
  /** Total thickness (vertical: width, horizontal: height) */
  thickness: number;
  /** Where the viewBox begins on the perpendicular axis (chart-edge is always 0) */
  viewBoxPerpStart: number;
  /** viewBox length (main axis) */
  viewBoxLength: number;
  /** viewBox thickness (perpendicular axis) */
  viewBoxThickness: number;
}

export type ExternalScaleLayoutConfig = Pick<
  ExternalScaleConfig,
  | 'orientation'
  | 'side'
  | 'hasBar'
  | 'hasScale'
  | 'labels'
  | 'barThickness'
  | 'tickThickness'
  | 'labelThickness'
  | 'length'
  | 'scaleType'
>;

export interface ExternalScaleViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Convenience helper for producing the `computeExternalScaleLayout()` input from a full config. */
export function toExternalScaleLayoutConfig(
  config: ExternalScaleConfig
): ExternalScaleLayoutConfig {
  return {
    orientation: config.orientation,
    side: config.side,
    hasBar: config.hasBar,
    hasScale: config.hasScale,
    labels: config.labels,
    barThickness: computeExternalScaleEffectiveBarThickness(config),
    tickThickness: computeExternalScaleEffectiveTickThickness(config),
    labelThickness: config.labelThickness,
    length: config.length,
    scaleType: config.scaleType,
  };
}

/**
 * Compute the outer SVG viewBox for a scale given layout.
 * Wrappers can use this to avoid duplicating orientation-specific math.
 */
export function computeExternalScaleViewBox(
  config: Pick<ExternalScaleConfig, 'orientation' | 'length'>,
  layout: ExternalScaleLayout
): ExternalScaleViewBox {
  if (config.orientation === 'vertical') {
    return {
      x: layout.viewBoxPerpStart,
      y: -config.length / 2,
      width: layout.viewBoxThickness,
      height: config.length,
    };
  }

  return {
    x: 0,
    y: layout.viewBoxPerpStart,
    width: config.length,
    height: layout.viewBoxThickness,
  };
}

/**
 * Compute the effective `preserveAspectRatio="xMidYMid meet"` uniform scale factor.
 *
 * Returns 1 when inputs are invalid (e.g. 0-sized viewBox).
 */
export function computeMeetScale(
  viewBoxWidth: number,
  viewBoxHeight: number,
  containerWidth: number,
  containerHeight: number
): number {
  const widthScale = viewBoxWidth > 0 ? containerWidth / viewBoxWidth : 1;
  const heightScale = viewBoxHeight > 0 ? containerHeight / viewBoxHeight : 1;
  return Math.min(widthScale, heightScale);
}

/**
 * Configuration for computing fixed aspect ratio scale factor.
 */
export interface FixedAspectRatioScaleConfig {
  /** Main axis orientation: 'vertical' or 'horizontal' */
  orientation: ExternalScaleOrientation;
  /** Actual main axis size of the container (height for vertical, width for horizontal) */
  containerMainAxisSize: number;
  /** Reference size at which the scale renders at 1:1 (default: 384) */
  scaleReferenceSize: number;
}

/**
 * Compute the scale factor for fixed aspect ratio mode.
 *
 * In fixed aspect ratio mode, the scale component determines its zoom level based on
 * comparing the container's main axis size against a reference size (typically 384px).
 * - If container is larger than reference: scale > 1 (zoom in)
 * - If container is smaller than reference: scale < 1 (zoom out)
 * - If container equals reference: scale = 1 (native size)
 *
 * This scale factor is applied to SVG rendering while keeping text labels at constant size
 * by using the CSS variable `--scale` to counter-scale font sizes.
 *
 * Works for all orientations and sides:
 * - Vertical scales (left/right): compare container height vs reference
 * - Horizontal scales (top/bottom): compare container width vs reference
 *
 * @param config Configuration with orientation, container size, and reference size
 * @returns Scale factor (> 0), defaults to 1 if container size is invalid
 */
export function computeFixedAspectRatioScale(
  config: FixedAspectRatioScaleConfig
): number {
  const {containerMainAxisSize, scaleReferenceSize} = config;

  // Guard against zero or negative sizes
  if (containerMainAxisSize <= 0 || scaleReferenceSize <= 0) {
    return 1;
  }

  // Scale = container size / reference size
  // e.g., container=480px, reference=384px => scale=1.25 (zoom in)
  // e.g., container=288px, reference=384px => scale=0.75 (zoom out)
  return containerMainAxisSize / scaleReferenceSize;
}

/**
 * Compute scaled dimensions for reporting when in fixed aspect ratio mode.
 *
 * When fixedAspectRatio is true, the reported thickness should be scaled
 * proportionally to match the visual output.
 *
 * @param baseThickness The unscaled thickness from layout computation
 * @param scale The current scale factor from computeFixedAspectRatioScale
 * @returns Scaled thickness value
 */
export function computeScaledThickness(
  baseThickness: number,
  scale: number
): number {
  return baseThickness * scale;
}

/**
 * Compute a minimal viewBox layout for an external scale.
 *
 * The chart edge is always at perpendicular coordinate 0, and the scale expands
 * outward from that edge based on which bands are enabled (bar/ticks/labels).
 *
 * When scaleType is 'condensed', tick thickness is automatically reduced to match
 * the shorter tick lengths (16px max instead of 28px for regular).
 */
export function computeExternalScaleLayout(
  config: ExternalScaleLayoutConfig
): ExternalScaleLayout {
  const barSpace = config.hasBar ? config.barThickness : 0;
  // Use effective tick thickness based on scaleType
  const effectiveTickThickness =
    computeExternalScaleEffectiveTickThickness(config);
  const scaleSpace = config.hasScale ? effectiveTickThickness : 0;
  const labelSpace = config.labels ? config.labelThickness : 0;
  const thickness = barSpace + scaleSpace + labelSpace;

  const isOutwardPositive =
    (config.orientation === 'vertical' && config.side === 'right') ||
    (config.orientation === 'horizontal' && config.side === 'bottom');

  const viewBoxPerpStart = isOutwardPositive ? 0 : -thickness;

  return {
    thickness,
    viewBoxPerpStart,
    viewBoxLength: config.length,
    viewBoxThickness: thickness,
  };
}

function isVertical(config: ExternalScaleConfig): boolean {
  return config.orientation === 'vertical';
}

function isOutwardPositive(config: ExternalScaleConfig): boolean {
  return (
    (config.orientation === 'vertical' && config.side === 'right') ||
    (config.orientation === 'horizontal' && config.side === 'bottom')
  );
}

function rangeIncludesZero(minValue: number, maxValue: number): boolean {
  return minValue <= 0 && maxValue >= 0;
}

function calculateAtSetpoint(config: ExternalScaleConfig): boolean {
  if (config.value === undefined || config.setpoint === undefined) return false;
  if (!config.disableAutoAtSetpoint) {
    const deadband = Number.isFinite(config.autoAtSetpointDeadband)
      ? config.autoAtSetpointDeadband
      : 0;
    return Math.abs(config.value - config.setpoint) <= deadband;
  }
  return config.atSetpoint;
}

function colors(config: ExternalScaleConfig): {
  barFillColor: string;
  markerFillColor: string;
  markerStrokeColor: string;
  setpointColor: string;
} {
  // Fill mode uses secondary color, tint mode uses tertiary color
  let barFillColor =
    config.fillMode === 'tint'
      ? config.enhanced
        ? 'var(--instrument-enhanced-tertiary-color)'
        : 'var(--instrument-regular-tertiary-color)'
      : config.enhanced
        ? 'var(--instrument-enhanced-secondary-color)'
        : 'var(--instrument-regular-secondary-color)';

  let markerFillColor = config.enhanced
    ? 'var(--instrument-enhanced-secondary-color)'
    : 'var(--instrument-regular-secondary-color)';

  let markerStrokeColor = config.enhanced
    ? 'var(--instrument-enhanced-tertiary-color)'
    : 'var(--instrument-regular-tertiary-color)';

  let setpointColor = config.enhanced
    ? 'var(--instrument-enhanced-primary-color)'
    : 'var(--instrument-regular-primary-color)';

  if (
    config.state === InstrumentState.loading ||
    config.state === InstrumentState.off
  ) {
    barFillColor = 'transparent';
    markerFillColor = 'var(--instrument-frame-tertiary-color)';
    markerStrokeColor = 'var(--instrument-frame-tertiary-color)';
    setpointColor = 'var(--instrument-frame-tertiary-color)';
  }

  return {barFillColor, markerFillColor, markerStrokeColor, setpointColor};
}

function convertAdvices(
  advices: ExternalScaleAdvice[],
  setpoint: number | undefined
): ExternalScaleAdviceRaw[] {
  return advices.map((a) => {
    const triggered =
      setpoint !== undefined && setpoint >= a.min && setpoint <= a.max;

    const state = triggered
      ? AdviceState.triggered
      : a.hinted
        ? AdviceState.hinted
        : AdviceState.regular;

    return {min: a.min, max: a.max, type: a.type, state};
  });
}

function mainAxisOffset(config: ExternalScaleConfig): number {
  if (isVertical(config)) {
    // viewBox y is centered at 0: [-length/2 .. length/2]
    // paddingStart=top, paddingEnd=bottom
    return (config.paddingStart - config.paddingEnd) / 2;
  }
  // horizontal viewBox x starts at 0
  return config.paddingStart;
}

function drawingLength(config: ExternalScaleConfig): number {
  return Math.max(0, config.length - config.paddingStart - config.paddingEnd);
}

function valueToMainAxis(config: ExternalScaleConfig, value: number): number {
  const dLen = drawingLength(config);
  if (isVertical(config)) {
    return (
      valueToY(value, config.minValue, config.maxValue, dLen) +
      mainAxisOffset(config)
    );
  }
  return (
    valueToX(value, config.minValue, config.maxValue, dLen) +
    mainAxisOffset(config)
  );
}

function getTickThicknesses(scaleType: ScaleType) {
  const isCondensed = scaleType === 'condensed';
  return {
    primary: isCondensed ? 12 : 24,
    secondary: isCondensed ? 4 : 8,
    tertiary: isCondensed ? 2 : 4,
    main: isCondensed ? 12 : 24,
  };
}

function tickBasePerp(config: ExternalScaleConfig): number {
  // Chart edge is always at perp=0.
  // Bar band touches chart edge.
  return config.hasBar
    ? isOutwardPositive(config)
      ? config.barThickness
      : -config.barThickness
    : 0;
}

function tickGap(): number {
  return 4;
}

function labelGap(): number {
  return 8;
}

function buildTickLine(
  config: ExternalScaleConfig,
  mainPos: number,
  perpStart: number,
  perpLen: number
): SVGTemplateResult {
  const stroke = 'var(--instrument-frame-tertiary-color)';
  const strokeWidth = 1;

  if (isVertical(config)) {
    const x1 = perpStart;
    const x2 = perpStart + perpLen;
    const y = mainPos;
    return svg`<line x1=${x1} x2=${x2} y1=${y} y2=${y} stroke=${stroke} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>`;
  }

  const y1 = perpStart;
  const y2 = perpStart + perpLen;
  const x = mainPos;
  return svg`<line x1=${x} x2=${x} y1=${y1} y2=${y2} stroke=${stroke} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>`;
}

function generateTickmarksAtInterval(
  config: ExternalScaleConfig,
  interval: number,
  perpStart: number,
  perpLen: number,
  skipValues: number[]
): {svgs: SVGTemplateResult[]; values: number[]} {
  const svgs: SVGTemplateResult[] = [];
  const values: number[] = [];

  if (interval <= 0 || !Number.isFinite(interval)) return {svgs, values};

  const includesZero = rangeIncludesZero(config.minValue, config.maxValue);

  const pushTick = (v: number) => {
    if (skipValues.includes(v)) return;
    values.push(v);
    svgs.push(
      buildTickLine(config, valueToMainAxis(config, v), perpStart, perpLen)
    );
  };

  if (includesZero) {
    for (let v = interval; v <= config.maxValue; v += interval) pushTick(v);
    for (let v = -interval; v >= config.minValue; v -= interval) pushTick(v);
  } else {
    const startValue = Math.ceil(config.minValue / interval) * interval;
    for (let v = startValue; v <= config.maxValue; v += interval) pushTick(v);
  }

  return {svgs, values};
}

function generateTickmarks(config: ExternalScaleConfig): SVGTemplateResult[] {
  if (!config.hasScale) return [];

  const svgs: SVGTemplateResult[] = [];
  const skipValues: number[] = [];

  const base = tickBasePerp(config);
  const gap = tickGap();

  const tickmarksStart = isOutwardPositive(config) ? base + gap : base - gap;

  const {primary, secondary, tertiary, main} = getTickThicknesses(
    config.scaleType
  );

  // Zero tick (skip if at min/max with scaleBackground enabled)
  if (rangeIncludesZero(config.minValue, config.maxValue)) {
    const isAtBoundary = 0 === config.minValue || 0 === config.maxValue;
    const shouldSkip = config.scaleBackground && isAtBoundary;

    if (!shouldSkip) {
      const perpLen = primary;
      const perpStart = tickmarksStart;
      svgs.push(
        buildTickLine(
          config,
          valueToMainAxis(config, 0),
          perpStart,
          isOutwardPositive(config) ? perpLen : -perpLen
        )
      );
    }
    skipValues.push(0);
  }

  // Main tickbars - show when mainTickbars is defined (array presence means enabled)
  // Use defensive guard to handle null/undefined/empty the same way as advices
  if (config.mainTickbars) {
    const start = config.frameStyle === 'flat' ? base : tickmarksStart;
    const mainLen = config.frameStyle === 'flat' ? main + 4 : main;
    const dirLen = isOutwardPositive(config) ? mainLen : -mainLen;

    // Use provided array or default to [minValue, 0, maxValue]
    const mainTickValues =
      config.mainTickbars.length > 0
        ? config.mainTickbars
        : [config.minValue, 0, config.maxValue];

    for (const value of mainTickValues) {
      // Skip if outside range
      if (value < config.minValue || value > config.maxValue) continue;

      // Skip min/max tickbars when scaleBackground is enabled (they align with the background edges)
      if (
        config.scaleBackground &&
        (value === config.minValue || value === config.maxValue)
      ) {
        skipValues.push(value);
        continue;
      }

      svgs.push(
        buildTickLine(config, valueToMainAxis(config, value), start, dirLen)
      );
      skipValues.push(value);
    }
  }

  // Primary - show when interval is defined and > 0
  if (
    config.primaryTickbarsInterval !== undefined &&
    config.primaryTickbarsInterval > 0
  ) {
    const {svgs: s, values} = generateTickmarksAtInterval(
      config,
      config.primaryTickbarsInterval,
      tickmarksStart,
      isOutwardPositive(config) ? primary : -primary,
      skipValues
    );
    svgs.push(...s);
    skipValues.push(...values);
  }

  // Secondary - show when interval is defined and > 0
  if (
    config.secondaryTickbarsInterval !== undefined &&
    config.secondaryTickbarsInterval > 0
  ) {
    const {svgs: s} = generateTickmarksAtInterval(
      config,
      config.secondaryTickbarsInterval,
      tickmarksStart,
      isOutwardPositive(config) ? secondary : -secondary,
      skipValues
    );
    svgs.push(...s);
  }

  // Tertiary - show when interval is defined and > 0
  if (
    config.tertiaryTickbarsInterval !== undefined &&
    config.tertiaryTickbarsInterval > 0
  ) {
    const {svgs: s} = generateTickmarksAtInterval(
      config,
      config.tertiaryTickbarsInterval,
      tickmarksStart,
      isOutwardPositive(config) ? tertiary : -tertiary,
      skipValues
    );
    svgs.push(...s);
  }

  return svgs;
}

function generateLabels(config: ExternalScaleConfig): SVGTemplateResult[] {
  if (!config.labels || config.primaryTickbarsInterval === undefined) return [];

  const interval = config.primaryTickbarsInterval;
  if (interval <= 0 || !Number.isFinite(interval)) return [];

  const fontFamily = 'var(--font-family-main)';
  const fontColor = 'var(--instrument-tick-mark-label-secondary-color)';
  const fontSize =
    'calc(var(--global-typography-ui-label-font-size) / var(--scale, 1))';

  const base = tickBasePerp(config);
  // Use effective tick thickness to position labels closer to ticks in condensed mode
  const effectiveTickThickness =
    computeExternalScaleEffectiveTickThickness(config);
  const labelPos = isOutwardPositive(config)
    ? base + (config.hasScale ? effectiveTickThickness : 0) + labelGap()
    : base - (config.hasScale ? effectiveTickThickness : 0) - labelGap();

  const includesZero = rangeIncludesZero(config.minValue, config.maxValue);

  const labels: SVGTemplateResult[] = [];

  const push = (v: number) => {
    const main = valueToMainAxis(config, v);
    if (isVertical(config)) {
      const x = labelPos;
      const y = main;
      const anchor = isOutwardPositive(config) ? 'start' : 'end';
      labels.push(
        svg`<text x=${x} y=${y} text-anchor=${anchor} dominant-baseline="middle" font-family=${fontFamily} style="font-size: ${fontSize}" fill=${fontColor}>${v}</text>`
      );
      return;
    }

    const y = labelPos;
    const x = main;
    const baseline = isOutwardPositive(config) ? 'hanging' : 'auto';
    labels.push(
      svg`<text x=${x} y=${y} text-anchor="middle" dominant-baseline=${baseline} font-family=${fontFamily} style="font-size: ${fontSize}" fill=${fontColor}>${v}</text>`
    );
  };

  if (includesZero) {
    for (let v = 0; v <= config.maxValue; v += interval) push(v);
    for (let v = -interval; v >= config.minValue; v -= interval) push(v);
  } else {
    const startValue = Math.ceil(config.minValue / interval) * interval;
    for (let v = startValue; v <= config.maxValue; v += interval) push(v);
  }

  return labels;
}

function generateBarContainer(
  config: ExternalScaleConfig
): SVGTemplateResult | typeof nothing {
  if (!config.hasBar) return nothing;

  const borderRadiusFallback = config.scaleType === 'condensed' ? 4 : 8;
  const borderRadiusValue = config.borderRadius ?? borderRadiusFallback;
  const strokeWidth = 1;
  // Determine bar container fill color:
  // 1. If barContainerStyle is explicitly set, use it
  // 2. Otherwise, fall back to scaleBackground-based default
  let fillColor: string;
  if (config.barContainerStyle !== undefined) {
    fillColor =
      config.barContainerStyle === BarContainerStyle.secondary
        ? 'var(--instrument-frame-secondary-color)'
        : 'var(--instrument-frame-primary-color)';
  } else {
    fillColor = config.scaleBackground
      ? 'var(--instrument-frame-secondary-color)'
      : 'var(--instrument-frame-primary-color)';
  }
  const strokeColor = 'var(--instrument-frame-tertiary-color)';

  const dLen = drawingLength(config);
  const axisShift = mainAxisOffset(config);

  // Determine which corners should be rounded based on borderRadiusPosition
  // innerFirstChild: corners on the inner/chart edge
  // middleChild: no corners
  // outerLastChild: corners on the outer edge (away from chart)
  let shouldRoundTopLeft = true;
  let shouldRoundTopRight = true;
  let shouldRoundBottomLeft = true;
  let shouldRoundBottomRight = true;

  if (config.borderRadiusPosition) {
    if (config.borderRadiusPosition === BorderRadiusPosition.middleChild) {
      // No rounded corners for middle child
      shouldRoundTopLeft = false;
      shouldRoundTopRight = false;
      shouldRoundBottomLeft = false;
      shouldRoundBottomRight = false;
    } else if (isVertical(config)) {
      // Vertical orientation
      const isRight = config.side === 'right';
      const isInner =
        config.borderRadiusPosition === BorderRadiusPosition.innerFirstChild;

      if (isRight) {
        // Right side: inner = left, outer = right
        shouldRoundTopLeft = isInner;
        shouldRoundBottomLeft = isInner;
        shouldRoundTopRight = !isInner;
        shouldRoundBottomRight = !isInner;
      } else {
        // Left side: inner = right, outer = left
        shouldRoundTopLeft = !isInner;
        shouldRoundBottomLeft = !isInner;
        shouldRoundTopRight = isInner;
        shouldRoundBottomRight = isInner;
      }
    } else {
      // Horizontal orientation
      const isBottom = config.side === 'bottom';
      const isInner =
        config.borderRadiusPosition === BorderRadiusPosition.innerFirstChild;

      if (isBottom) {
        // Bottom side: inner = top, outer = bottom
        shouldRoundTopLeft = isInner;
        shouldRoundTopRight = isInner;
        shouldRoundBottomLeft = !isInner;
        shouldRoundBottomRight = !isInner;
      } else {
        // Top side: inner = bottom, outer = top
        shouldRoundTopLeft = !isInner;
        shouldRoundTopRight = !isInner;
        shouldRoundBottomLeft = isInner;
        shouldRoundBottomRight = isInner;
      }
    }
  }

  const r = borderRadiusValue;
  const allCornersRounded =
    shouldRoundTopLeft &&
    shouldRoundTopRight &&
    shouldRoundBottomLeft &&
    shouldRoundBottomRight;
  const noCornersRounded =
    !shouldRoundTopLeft &&
    !shouldRoundTopRight &&
    !shouldRoundBottomLeft &&
    !shouldRoundBottomRight;

  if (isVertical(config)) {
    let rectX = isOutwardPositive(config) ? 0 : -config.barThickness;
    let rectY = -dLen / 2 + axisShift;
    let rectWidth = config.barThickness;
    let rectHeight = dLen;

    // When scaleBackground=true, the bar's edge that touches the scale should NOT be
    // adjusted inward (because it's not a true viewBox boundary - the scale will cover it).
    // We achieve this by passing adjusted min/max that exclude the touching edge.
    const isRight = config.side === 'right';
    let viewBoxMinX: number;
    let viewBoxMaxX: number;
    if (config.scaleBackground) {
      // Exclude the edge that touches the scale from stroke adjustment
      if (isRight) {
        // Right side: bar is at x=0..barThickness, scale touches right edge
        // Only adjust left edge (viewBoxMinX=0), don't adjust right edge
        viewBoxMinX = 0;
        viewBoxMaxX = config.barThickness + 1; // +1 so rectX+rectWidth won't match
      } else {
        // Left side: bar is at x=-barThickness..0, scale touches left edge
        // Only adjust right edge (viewBoxMaxX=0), don't adjust left edge
        viewBoxMinX = -config.barThickness - 1; // -1 so rectX won't match
        viewBoxMaxX = 0;
      }
    } else {
      viewBoxMinX = isRight ? 0 : -config.barThickness;
      viewBoxMaxX = isRight ? config.barThickness : 0;
    }

    const adjustedX = adjustRectWidthForStroke(
      rectX,
      rectWidth,
      viewBoxMinX,
      viewBoxMaxX,
      strokeWidth
    );
    rectX = adjustedX.x;
    rectWidth = adjustedX.width;

    const adjustedY = adjustRectHeightForStroke(
      rectY,
      rectHeight,
      -dLen / 2 + axisShift,
      dLen / 2 + axisShift,
      strokeWidth
    );
    rectY = adjustedY.y;
    rectHeight = adjustedY.height;

    // Use simple rect when all corners or no corners are rounded
    if (allCornersRounded || noCornersRounded) {
      const rx = allCornersRounded ? r : 0;
      const ry = allCornersRounded ? r : 0;

      if (config.scaleBackground) {
        // When scaleBackground=true, draw fill and stroke separately to exclude edge touching scale
        const isRight = config.side === 'right';

        // Stroke path excludes the edge touching the scale
        let strokePath = '';
        if (isRight) {
          // Exclude right edge (touching scale on right side)
          strokePath = `M ${rectX} ${rectY + (noCornersRounded ? 0 : r)} L ${rectX} ${rectY + rectHeight - (noCornersRounded ? 0 : r)}`; // Left edge
          if (!noCornersRounded)
            strokePath += ` Q ${rectX} ${rectY + rectHeight} ${rectX + r} ${rectY + rectHeight}`; // Bottom-left corner
          strokePath += ` L ${rectX + rectWidth - (noCornersRounded ? 0 : r)} ${rectY + rectHeight}`; // Bottom edge
          if (!noCornersRounded)
            strokePath += ` Q ${rectX + rectWidth} ${rectY + rectHeight} ${rectX + rectWidth} ${rectY + rectHeight - r}`; // Bottom-right corner (no stroke)
          strokePath += ` M ${rectX + rectWidth} ${rectY + (noCornersRounded ? 0 : r)}`; // Move to top-right (no stroke on right edge)
          if (!noCornersRounded)
            strokePath += ` Q ${rectX + rectWidth} ${rectY} ${rectX + rectWidth - r} ${rectY}`; // Top-right corner (no stroke)
          strokePath += ` L ${rectX + (noCornersRounded ? 0 : r)} ${rectY}`; // Top edge
          if (!noCornersRounded)
            strokePath += ` Q ${rectX} ${rectY} ${rectX} ${rectY + r}`; // Top-left corner
        } else {
          // Exclude left edge (touching scale on left side)
          strokePath = `M ${rectX + (noCornersRounded ? 0 : r)} ${rectY}`; // Top edge start
          strokePath += ` L ${rectX + rectWidth - (noCornersRounded ? 0 : r)} ${rectY}`; // Top edge
          if (!noCornersRounded)
            strokePath += ` Q ${rectX + rectWidth} ${rectY} ${rectX + rectWidth} ${rectY + r}`; // Top-right corner
          strokePath += ` L ${rectX + rectWidth} ${rectY + rectHeight - (noCornersRounded ? 0 : r)}`; // Right edge
          if (!noCornersRounded)
            strokePath += ` Q ${rectX + rectWidth} ${rectY + rectHeight} ${rectX + rectWidth - r} ${rectY + rectHeight}`; // Bottom-right corner
          strokePath += ` L ${rectX + (noCornersRounded ? 0 : r)} ${rectY + rectHeight}`; // Bottom edge
          if (!noCornersRounded)
            strokePath += ` Q ${rectX} ${rectY + rectHeight} ${rectX} ${rectY + rectHeight - r}`; // Bottom-left corner (no stroke)
          strokePath += ` M ${rectX} ${rectY + (noCornersRounded ? 0 : r)}`; // Move to left edge start (no stroke on left edge)
          if (!noCornersRounded)
            strokePath += ` Q ${rectX} ${rectY} ${rectX + r} ${rectY}`; // Top-left corner (no stroke)
        }

        return svg`
          <rect x=${rectX} y=${rectY} width=${rectWidth} height=${rectHeight} rx=${rx} ry=${ry} fill=${fillColor} stroke="none"/>
          <path d="${strokePath}" fill="none" stroke=${strokeColor} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>
        `;
      }

      return svg`<rect x=${rectX} y=${rectY} width=${rectWidth} height=${rectHeight} rx=${rx} ry=${ry} fill=${fillColor} stroke=${strokeColor} vector-effect="non-scaling-stroke"/>`;
    }

    // Use path for selective corner rounding
    const x = rectX;
    const y = rectY;
    const w = rectWidth;
    const h = rectHeight;

    let path = `M ${x + (shouldRoundTopLeft ? r : 0)} ${y}`;
    // Top edge
    path += ` L ${x + w - (shouldRoundTopRight ? r : 0)} ${y}`;
    // Top-right corner
    if (shouldRoundTopRight) {
      path += ` Q ${x + w} ${y} ${x + w} ${y + r}`;
    }
    // Right edge
    path += ` L ${x + w} ${y + h - (shouldRoundBottomRight ? r : 0)}`;
    // Bottom-right corner
    if (shouldRoundBottomRight) {
      path += ` Q ${x + w} ${y + h} ${x + w - r} ${y + h}`;
    }
    // Bottom edge
    path += ` L ${x + (shouldRoundBottomLeft ? r : 0)} ${y + h}`;
    // Bottom-left corner
    if (shouldRoundBottomLeft) {
      path += ` Q ${x} ${y + h} ${x} ${y + h - r}`;
    }
    // Left edge
    path += ` L ${x} ${y + (shouldRoundTopLeft ? r : 0)}`;
    // Top-left corner
    if (shouldRoundTopLeft) {
      path += ` Q ${x} ${y} ${x + r} ${y}`;
    }
    path += ` Z`;

    // When scaleBackground=true, draw fill and stroke separately to exclude edge touching scale
    if (config.scaleBackground) {
      const isRight = config.side === 'right';

      // Stroke path excludes the edge touching the scale
      let strokePath = '';
      if (isRight) {
        // Exclude right edge
        strokePath = `M ${x} ${y + (shouldRoundTopLeft ? r : 0)}`;
        if (shouldRoundTopLeft) strokePath += ` Q ${x} ${y} ${x + r} ${y}`;
        strokePath += ` L ${x + w - (shouldRoundTopRight ? r : 0)} ${y}`;
        if (shouldRoundTopRight)
          strokePath += ` Q ${x + w} ${y} ${x + w} ${y + r}`;
        strokePath += ` M ${x + w} ${y + h - (shouldRoundBottomRight ? r : 0)}`;
        if (shouldRoundBottomRight)
          strokePath += ` Q ${x + w} ${y + h} ${x + w - r} ${y + h}`;
        strokePath += ` L ${x + (shouldRoundBottomLeft ? r : 0)} ${y + h}`;
        if (shouldRoundBottomLeft)
          strokePath += ` Q ${x} ${y + h} ${x} ${y + h - r}`;
        strokePath += ` L ${x} ${y + (shouldRoundTopLeft ? r : 0)}`;
      } else {
        // Exclude left edge
        strokePath = `M ${x + (shouldRoundTopLeft ? r : 0)} ${y}`;
        strokePath += ` L ${x + w - (shouldRoundTopRight ? r : 0)} ${y}`;
        if (shouldRoundTopRight)
          strokePath += ` Q ${x + w} ${y} ${x + w} ${y + r}`;
        strokePath += ` L ${x + w} ${y + h - (shouldRoundBottomRight ? r : 0)}`;
        if (shouldRoundBottomRight)
          strokePath += ` Q ${x + w} ${y + h} ${x + w - r} ${y + h}`;
        strokePath += ` L ${x + (shouldRoundBottomLeft ? r : 0)} ${y + h}`;
        if (shouldRoundBottomLeft)
          strokePath += ` Q ${x} ${y + h} ${x} ${y + h - r}`;
        strokePath += ` M ${x} ${y + (shouldRoundTopLeft ? r : 0)}`;
        if (shouldRoundTopLeft) strokePath += ` Q ${x} ${y} ${x + r} ${y}`;
      }

      return svg`
        <path d=${path} fill=${fillColor} stroke="none"/>
        <path d="${strokePath}" fill="none" stroke=${strokeColor} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>
      `;
    }

    return svg`<path d=${path} fill=${fillColor} stroke=${strokeColor} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>`;
  }

  // Horizontal: bar spans full drawing length (x), thickness is y
  let rectX = mainAxisOffset(config);
  let rectY = isOutwardPositive(config) ? 0 : -config.barThickness;
  let rectWidth = dLen;
  let rectHeight = config.barThickness;

  // When scaleBackground=true, the bar's edge that touches the scale should NOT be
  // adjusted inward (because it's not a true viewBox boundary - the scale will cover it).
  const isBottom = config.side === 'bottom';
  let viewBoxMinY: number;
  let viewBoxMaxY: number;
  if (config.scaleBackground) {
    // Exclude the edge that touches the scale from stroke adjustment
    if (isBottom) {
      // Bottom side: bar is at y=0..barThickness, scale touches bottom edge
      // Only adjust top edge (viewBoxMinY=0), don't adjust bottom edge
      viewBoxMinY = 0;
      viewBoxMaxY = config.barThickness + 1; // +1 so rectY+rectHeight won't match
    } else {
      // Top side: bar is at y=-barThickness..0, scale touches top edge
      // Only adjust bottom edge (viewBoxMaxY=0), don't adjust top edge
      viewBoxMinY = -config.barThickness - 1; // -1 so rectY won't match
      viewBoxMaxY = 0;
    }
  } else {
    viewBoxMinY = isBottom ? 0 : -config.barThickness;
    viewBoxMaxY = isBottom ? config.barThickness : 0;
  }

  // Adjust along x boundaries using adjustRectWidthForStroke (x=0..dLen in local band)
  const adjustedX = adjustRectWidthForStroke(
    rectX,
    rectWidth,
    rectX,
    rectX + rectWidth,
    strokeWidth
  );
  rectX = adjustedX.x;
  rectWidth = adjustedX.width;

  const adjustedY = adjustRectHeightForStroke(
    rectY,
    rectHeight,
    viewBoxMinY,
    viewBoxMaxY,
    strokeWidth
  );
  rectY = adjustedY.y;
  rectHeight = adjustedY.height;

  // Use simple rect when all corners or no corners are rounded
  if (allCornersRounded || noCornersRounded) {
    const rx = allCornersRounded ? r : 0;
    const ry = allCornersRounded ? r : 0;

    if (config.scaleBackground) {
      // When scaleBackground=true, draw fill and stroke separately to exclude edge touching scale
      const isBottom = config.side === 'bottom';

      // Stroke path excludes the edge touching the scale
      let strokePath = '';
      if (isBottom) {
        // Exclude bottom edge (touching scale on bottom side)
        strokePath = `M ${rectX + (noCornersRounded ? 0 : r)} ${rectY}`; // Top edge start
        strokePath += ` L ${rectX + rectWidth - (noCornersRounded ? 0 : r)} ${rectY}`; // Top edge
        if (!noCornersRounded)
          strokePath += ` Q ${rectX + rectWidth} ${rectY} ${rectX + rectWidth} ${rectY + r}`; // Top-right corner
        strokePath += ` L ${rectX + rectWidth} ${rectY + rectHeight - (noCornersRounded ? 0 : r)}`; // Right edge
        if (!noCornersRounded)
          strokePath += ` Q ${rectX + rectWidth} ${rectY + rectHeight} ${rectX + rectWidth - r} ${rectY + rectHeight}`; // Bottom-right corner (no stroke)
        strokePath += ` M ${rectX + (noCornersRounded ? 0 : r)} ${rectY + rectHeight}`; // Move to bottom-left (no stroke on bottom edge)
        if (!noCornersRounded)
          strokePath += ` Q ${rectX} ${rectY + rectHeight} ${rectX} ${rectY + rectHeight - r}`; // Bottom-left corner (no stroke)
        strokePath += ` L ${rectX} ${rectY + (noCornersRounded ? 0 : r)}`; // Left edge
        if (!noCornersRounded)
          strokePath += ` Q ${rectX} ${rectY} ${rectX + r} ${rectY}`; // Top-left corner
      } else {
        // Exclude top edge (touching scale on top side)
        strokePath = `M ${rectX} ${rectY + (noCornersRounded ? 0 : r)}`; // Left edge start
        strokePath += ` L ${rectX} ${rectY + rectHeight - (noCornersRounded ? 0 : r)}`; // Left edge
        if (!noCornersRounded)
          strokePath += ` Q ${rectX} ${rectY + rectHeight} ${rectX + r} ${rectY + rectHeight}`; // Bottom-left corner
        strokePath += ` L ${rectX + rectWidth - (noCornersRounded ? 0 : r)} ${rectY + rectHeight}`; // Bottom edge
        if (!noCornersRounded)
          strokePath += ` Q ${rectX + rectWidth} ${rectY + rectHeight} ${rectX + rectWidth} ${rectY + rectHeight - r}`; // Bottom-right corner
        strokePath += ` L ${rectX + rectWidth} ${rectY + (noCornersRounded ? 0 : r)}`; // Right edge
        if (!noCornersRounded)
          strokePath += ` Q ${rectX + rectWidth} ${rectY} ${rectX + rectWidth - r} ${rectY}`; // Top-right corner (no stroke)
        strokePath += ` M ${rectX + (noCornersRounded ? 0 : r)} ${rectY}`; // Move to top edge start (no stroke on top edge)
        if (!noCornersRounded)
          strokePath += ` Q ${rectX} ${rectY} ${rectX} ${rectY + r}`; // Top-left corner (no stroke)
      }

      return svg`
        <rect x=${rectX} y=${rectY} width=${rectWidth} height=${rectHeight} rx=${rx} ry=${ry} fill=${fillColor} stroke="none"/>
        <path d="${strokePath}" fill="none" stroke=${strokeColor} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>
      `;
    }

    return svg`<rect x=${rectX} y=${rectY} width=${rectWidth} height=${rectHeight} rx=${rx} ry=${ry} fill=${fillColor} stroke=${strokeColor} vector-effect="non-scaling-stroke"/>`;
  }

  // Use path for selective corner rounding
  const x = rectX;
  const y = rectY;
  const w = rectWidth;
  const h = rectHeight;

  let path = `M ${x + (shouldRoundTopLeft ? r : 0)} ${y}`;
  // Top edge
  path += ` L ${x + w - (shouldRoundTopRight ? r : 0)} ${y}`;
  // Top-right corner
  if (shouldRoundTopRight) {
    path += ` Q ${x + w} ${y} ${x + w} ${y + r}`;
  }
  // Right edge
  path += ` L ${x + w} ${y + h - (shouldRoundBottomRight ? r : 0)}`;
  // Bottom-right corner
  if (shouldRoundBottomRight) {
    path += ` Q ${x + w} ${y + h} ${x + w - r} ${y + h}`;
  }
  // Bottom edge
  path += ` L ${x + (shouldRoundBottomLeft ? r : 0)} ${y + h}`;
  // Bottom-left corner
  if (shouldRoundBottomLeft) {
    path += ` Q ${x} ${y + h} ${x} ${y + h - r}`;
  }
  // Left edge
  path += ` L ${x} ${y + (shouldRoundTopLeft ? r : 0)}`;
  // Top-left corner
  if (shouldRoundTopLeft) {
    path += ` Q ${x} ${y} ${x + r} ${y}`;
  }
  path += ` Z`;

  // When scaleBackground=true, draw fill and stroke separately to exclude edge touching scale
  if (config.scaleBackground) {
    const isBottom = config.side === 'bottom';

    // Stroke path excludes the edge touching the scale
    let strokePath = '';
    if (isBottom) {
      // Exclude bottom edge
      strokePath = `M ${x + (shouldRoundTopLeft ? r : 0)} ${y}`;
      strokePath += ` L ${x + w - (shouldRoundTopRight ? r : 0)} ${y}`;
      if (shouldRoundTopRight)
        strokePath += ` Q ${x + w} ${y} ${x + w} ${y + r}`;
      strokePath += ` L ${x + w} ${y + h - (shouldRoundBottomRight ? r : 0)}`;
      if (shouldRoundBottomRight)
        strokePath += ` Q ${x + w} ${y + h} ${x + w - r} ${y + h}`;
      strokePath += ` M ${x + (shouldRoundBottomLeft ? r : 0)} ${y + h}`;
      if (shouldRoundBottomLeft)
        strokePath += ` Q ${x} ${y + h} ${x} ${y + h - r}`;
      strokePath += ` L ${x} ${y + (shouldRoundTopLeft ? r : 0)}`;
      if (shouldRoundTopLeft) strokePath += ` Q ${x} ${y} ${x + r} ${y}`;
    } else {
      // Exclude top edge
      strokePath = `M ${x} ${y + (shouldRoundTopLeft ? r : 0)}`;
      if (shouldRoundTopLeft) strokePath += ` Q ${x} ${y} ${x + r} ${y}`;
      strokePath += ` M ${x + w - (shouldRoundTopRight ? r : 0)} ${y}`;
      if (shouldRoundTopRight)
        strokePath += ` Q ${x + w} ${y} ${x + w} ${y + r}`;
      strokePath += ` L ${x + w} ${y + h - (shouldRoundBottomRight ? r : 0)}`;
      if (shouldRoundBottomRight)
        strokePath += ` Q ${x + w} ${y + h} ${x + w - r} ${y + h}`;
      strokePath += ` L ${x + (shouldRoundBottomLeft ? r : 0)} ${y + h}`;
      if (shouldRoundBottomLeft)
        strokePath += ` Q ${x} ${y + h} ${x} ${y + h - r}`;
      strokePath += ` L ${x} ${y + (shouldRoundTopLeft ? r : 0)}`;
    }

    return svg`
      <path d=${path} fill=${fillColor} stroke="none"/>
      <path d="${strokePath}" fill="none" stroke=${strokeColor} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>
    `;
  }

  return svg`<path d=${path} fill=${fillColor} stroke=${strokeColor} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>`;
}

function generateBarFill(
  config: ExternalScaleConfig
): SVGTemplateResult | typeof nothing {
  if (!config.hasBar || config.value === undefined) return nothing;

  // NOTE:
  // The bar container can have a larger radius (driven by component size CSS vars).
  // When the fill segment is short, rounding the fill geometry directly must clamp the
  // radius to avoid self-intersection, which makes the fill appear to ignore the larger
  // radius. Instead, render the fill as a plain rect and clip it with the exact same
  // shape as the bar container so the visible corners always match.

  // Clip-path id: only needs to be unique within the current <svg>.
  const clipId = `obc-bar-fill-clip-${Math.random().toString(36).slice(2)}`;

  const borderRadiusFallback = config.scaleType === 'condensed' ? 4 : 8;
  const borderRadiusValue = config.borderRadius ?? borderRadiusFallback;
  const r = borderRadiusValue;

  const c = colors(config);

  // Always use fillMin → fillMax range (defaults to 0 → value if not specified)
  const fillMin = config.fillMin ?? 0;
  const fillMax = config.fillMax ?? config.value;

  const v0 = Math.max(Math.min(fillMin, config.maxValue), config.minValue);
  const v1 = Math.max(Math.min(fillMax, config.maxValue), config.minValue);

  const a0 = valueToMainAxis(config, v0);
  const a1 = valueToMainAxis(config, v1);

  const markerSize = 8;
  const markerR = 4;

  // Build the same bar container shape (radius-position aware) for clipping.
  // Keep this logic aligned with generateBarContainer(), but do not modify the container.
  // Note: No stroke adjustment needed - fill should span the entire bar including borders.
  const dLen = drawingLength(config);
  const axisShift = mainAxisOffset(config);

  let barRoundTopLeft = true;
  let barRoundTopRight = true;
  let barRoundBottomLeft = true;
  let barRoundBottomRight = true;

  if (config.borderRadiusPosition) {
    if (config.borderRadiusPosition === BorderRadiusPosition.middleChild) {
      barRoundTopLeft = false;
      barRoundTopRight = false;
      barRoundBottomLeft = false;
      barRoundBottomRight = false;
    } else if (isVertical(config)) {
      const isRight = config.side === 'right';
      const isInner =
        config.borderRadiusPosition === BorderRadiusPosition.innerFirstChild;

      if (isRight) {
        barRoundTopLeft = isInner;
        barRoundBottomLeft = isInner;
        barRoundTopRight = !isInner;
        barRoundBottomRight = !isInner;
      } else {
        barRoundTopLeft = !isInner;
        barRoundBottomLeft = !isInner;
        barRoundTopRight = isInner;
        barRoundBottomRight = isInner;
      }
    } else {
      const isBottom = config.side === 'bottom';
      const isInner =
        config.borderRadiusPosition === BorderRadiusPosition.innerFirstChild;

      if (isBottom) {
        barRoundTopLeft = isInner;
        barRoundTopRight = isInner;
        barRoundBottomLeft = !isInner;
        barRoundBottomRight = !isInner;
      } else {
        barRoundTopLeft = !isInner;
        barRoundTopRight = !isInner;
        barRoundBottomLeft = isInner;
        barRoundBottomRight = isInner;
      }
    }
  }

  const barAllCornersRounded =
    barRoundTopLeft &&
    barRoundTopRight &&
    barRoundBottomLeft &&
    barRoundBottomRight;
  const barNoCornersRounded =
    !barRoundTopLeft &&
    !barRoundTopRight &&
    !barRoundBottomLeft &&
    !barRoundBottomRight;

  if (isVertical(config)) {
    const boxX = isOutwardPositive(config) ? 0 : -config.barThickness;
    const boxWidth = config.barThickness;
    const y = Math.min(a0, a1);
    const h = Math.abs(a1 - a0);

    // Clip shape for the full bar container (no stroke adjustment - fill should
    // span the entire bar including borders, the clip constrains it visually)
    const rectX = isOutwardPositive(config) ? 0 : -config.barThickness;
    const rectY = -dLen / 2 + axisShift;
    const rectWidth = config.barThickness;
    const rectHeight = dLen;

    const barClipShape = barNoCornersRounded
      ? svg`<rect x=${rectX} y=${rectY} width=${rectWidth} height=${rectHeight} rx=${0} ry=${0}/>`
      : barAllCornersRounded
        ? svg`<rect x=${rectX} y=${rectY} width=${rectWidth} height=${rectHeight} rx=${r} ry=${r}/>`
        : svg`<path d=${(() => {
            const x = rectX;
            const y = rectY;
            const w = rectWidth;
            const h = rectHeight;

            let path = `M ${x + (barRoundTopLeft ? r : 0)} ${y}`;
            path += ` L ${x + w - (barRoundTopRight ? r : 0)} ${y}`;
            if (barRoundTopRight) {
              path += ` Q ${x + w} ${y} ${x + w} ${y + r}`;
            }
            path += ` L ${x + w} ${y + h - (barRoundBottomRight ? r : 0)}`;
            if (barRoundBottomRight) {
              path += ` Q ${x + w} ${y + h} ${x + w - r} ${y + h}`;
            }
            path += ` L ${x + (barRoundBottomLeft ? r : 0)} ${y + h}`;
            if (barRoundBottomLeft) {
              path += ` Q ${x} ${y + h} ${x} ${y + h - r}`;
            }
            path += ` L ${x} ${y + (barRoundTopLeft ? r : 0)}`;
            if (barRoundTopLeft) {
              path += ` Q ${x} ${y} ${x + r} ${y}`;
            }
            path += ` Z`;
            return path;
          })()}/>`;

    const fillRect = svg`<rect x=${boxX} y=${y} width=${boxWidth} height=${h} fill=${c.barFillColor} stroke="none"/>`;

    // For tint mode, render marker at value position
    if (config.fillMode === 'tint') {
      const markerY = valueToMainAxis(config, config.value) - markerSize / 2;
      const marker = svg`<rect x=${boxX} y=${markerY} width=${boxWidth} height=${markerSize} rx=${markerR} fill=${c.markerFillColor} stroke=${c.markerStrokeColor} vector-effect="non-scaling-stroke"/>`;

      return svg`<defs>
        <clipPath id=${clipId} clipPathUnits="userSpaceOnUse">${barClipShape}</clipPath>
      </defs>
      <g clip-path=${`url(#${clipId})`}>
        ${fillRect}
        ${marker}
      </g>`;
    }

    return svg`<defs>
      <clipPath id=${clipId} clipPathUnits="userSpaceOnUse">${barClipShape}</clipPath>
    </defs>
    <g clip-path=${`url(#${clipId})`}>
      ${fillRect}
    </g>`;
  }

  // Horizontal orientation
  const boxY = isOutwardPositive(config) ? 0 : -config.barThickness;
  const boxHeight = config.barThickness;
  const x = Math.min(a0, a1);
  const w = Math.abs(a1 - a0);

  // Clip shape for the full bar container (no stroke adjustment - fill should
  // span the entire bar including borders, the clip constrains it visually)
  const rectX = mainAxisOffset(config);
  const rectY = isOutwardPositive(config) ? 0 : -config.barThickness;
  const rectWidth = dLen;
  const rectHeight = config.barThickness;

  const barClipShape = barNoCornersRounded
    ? svg`<rect x=${rectX} y=${rectY} width=${rectWidth} height=${rectHeight} rx=${0} ry=${0}/>`
    : barAllCornersRounded
      ? svg`<rect x=${rectX} y=${rectY} width=${rectWidth} height=${rectHeight} rx=${r} ry=${r}/>`
      : svg`<path d=${(() => {
          const x = rectX;
          const y = rectY;
          const w = rectWidth;
          const h = rectHeight;

          let path = `M ${x + (barRoundTopLeft ? r : 0)} ${y}`;
          path += ` L ${x + w - (barRoundTopRight ? r : 0)} ${y}`;
          if (barRoundTopRight) {
            path += ` Q ${x + w} ${y} ${x + w} ${y + r}`;
          }
          path += ` L ${x + w} ${y + h - (barRoundBottomRight ? r : 0)}`;
          if (barRoundBottomRight) {
            path += ` Q ${x + w} ${y + h} ${x + w - r} ${y + h}`;
          }
          path += ` L ${x + (barRoundBottomLeft ? r : 0)} ${y + h}`;
          if (barRoundBottomLeft) {
            path += ` Q ${x} ${y + h} ${x} ${y + h - r}`;
          }
          path += ` L ${x} ${y + (barRoundTopLeft ? r : 0)}`;
          if (barRoundTopLeft) {
            path += ` Q ${x} ${y} ${x + r} ${y}`;
          }
          path += ` Z`;
          return path;
        })()}/>`;

  const fillRect = svg`<rect x=${x} y=${boxY} width=${w} height=${boxHeight} fill=${c.barFillColor} stroke="none"/>`;

  // For tint mode, render marker at value position
  if (config.fillMode === 'tint') {
    const markerX = valueToMainAxis(config, config.value) - markerSize / 2;
    const marker = svg`<rect x=${markerX} y=${boxY} width=${markerSize} height=${boxHeight} rx=${markerR} fill=${c.markerFillColor} stroke=${c.markerStrokeColor} vector-effect="non-scaling-stroke"/>`;
    return svg`<defs>
      <clipPath id=${clipId} clipPathUnits="userSpaceOnUse">${barClipShape}</clipPath>
    </defs>
    <g clip-path=${`url(#${clipId})`}>
      ${fillRect}
      ${marker}
    </g>`;
  }

  return svg`<defs>
    <clipPath id=${clipId} clipPathUnits="userSpaceOnUse">${barClipShape}</clipPath>
  </defs>
  <g clip-path=${`url(#${clipId})`}>
    ${fillRect}
  </g>`;
}

function generateScaleBackground(
  config: ExternalScaleConfig
): SVGTemplateResult | typeof nothing {
  if (!config.scaleBackground) return nothing;

  const borderRadiusFallback = config.scaleType === 'condensed' ? 4 : 8;
  const borderRadiusValue = config.borderRadius ?? borderRadiusFallback;
  const strokeWidth = 1;
  const fillColor = 'var(--instrument-frame-primary-color)';
  const strokeColor = 'var(--instrument-frame-tertiary-color)';

  // Calculate thickness: main tick length + 4px gap
  const {main} = getTickThicknesses(config.scaleType);
  const backgroundThickness = main + tickGap();

  const dLen = drawingLength(config);
  const axisShift = mainAxisOffset(config);

  // Determine which corners should be rounded (outer corners only)
  const shouldRoundTopLeft =
    (config.orientation === 'vertical' && config.side === 'left') ||
    (config.orientation === 'horizontal' && config.side === 'top');
  const shouldRoundTopRight =
    (config.orientation === 'vertical' && config.side === 'right') ||
    (config.orientation === 'horizontal' && config.side === 'top');
  const shouldRoundBottomLeft =
    (config.orientation === 'vertical' && config.side === 'left') ||
    (config.orientation === 'horizontal' && config.side === 'bottom');
  const shouldRoundBottomRight =
    (config.orientation === 'vertical' && config.side === 'right') ||
    (config.orientation === 'horizontal' && config.side === 'bottom');

  const r = borderRadiusValue;

  if (isVertical(config)) {
    // Start at bar's outer edge if bar exists, otherwise at chart edge (0)
    const startPerp = config.hasBar
      ? isOutwardPositive(config)
        ? config.barThickness
        : -config.barThickness
      : 0;

    let rectX = isOutwardPositive(config)
      ? startPerp
      : startPerp - backgroundThickness;
    let rectY = -dLen / 2 + axisShift;
    let rectWidth = backgroundThickness;
    let rectHeight = dLen;

    // When hasBar=true, the scale's inner edge (touching the bar) should NOT be
    // adjusted inward (because it's not a true viewBox boundary - the bar covers it).
    const isRight = config.side === 'right';
    let viewBoxMinX: number;
    let viewBoxMaxX: number;
    if (config.hasBar) {
      // Exclude the inner edge (touching bar) from stroke adjustment
      if (isRight) {
        // Right side: scale is at x=barThickness..(barThickness+backgroundThickness)
        // Inner edge is left (at barThickness), don't adjust it
        viewBoxMinX = rectX - 1; // -1 so rectX won't match
        viewBoxMaxX = rectX + rectWidth;
      } else {
        // Left side: scale is at x=(-barThickness-backgroundThickness)..(-barThickness)
        // Inner edge is right (at -barThickness), don't adjust it
        viewBoxMinX = rectX;
        viewBoxMaxX = rectX + rectWidth + 1; // +1 so rectX+rectWidth won't match
      }
    } else {
      viewBoxMinX = rectX;
      viewBoxMaxX = rectX + rectWidth;
    }

    const adjustedX = adjustRectWidthForStroke(
      rectX,
      rectWidth,
      viewBoxMinX,
      viewBoxMaxX,
      strokeWidth
    );
    rectX = adjustedX.x;
    rectWidth = adjustedX.width;

    const adjustedY = adjustRectHeightForStroke(
      rectY,
      rectHeight,
      -dLen / 2 + axisShift,
      dLen / 2 + axisShift,
      strokeWidth
    );
    rectY = adjustedY.y;
    rectHeight = adjustedY.height;

    // Build path with selective rounded corners
    const x = rectX;
    const y = rectY;
    const w = rectWidth;
    const h = rectHeight;

    // Path construction: start top-left, go clockwise
    let path = `M ${x + (shouldRoundTopLeft ? r : 0)} ${y}`;
    // Top edge
    path += ` L ${x + w - (shouldRoundTopRight ? r : 0)} ${y}`;
    // Top-right corner
    if (shouldRoundTopRight) {
      path += ` Q ${x + w} ${y} ${x + w} ${y + r}`;
    }
    // Right edge
    path += ` L ${x + w} ${y + h - (shouldRoundBottomRight ? r : 0)}`;
    // Bottom-right corner
    if (shouldRoundBottomRight) {
      path += ` Q ${x + w} ${y + h} ${x + w - r} ${y + h}`;
    }
    // Bottom edge
    path += ` L ${x + (shouldRoundBottomLeft ? r : 0)} ${y + h}`;
    // Bottom-left corner
    if (shouldRoundBottomLeft) {
      path += ` Q ${x} ${y + h} ${x} ${y + h - r}`;
    }
    // Left edge
    path += ` L ${x} ${y + (shouldRoundTopLeft ? r : 0)}`;
    // Top-left corner
    if (shouldRoundTopLeft) {
      path += ` Q ${x} ${y} ${x + r} ${y}`;
    }
    path += ` Z`;

    // Stroke the entire path, then cover the inner edge with a line
    // Line is shortened by half-stroke on each end to avoid overlapping with top/bottom strokes
    const innerX = isRight ? x : x + w;
    const halfStroke = strokeWidth / 2;

    return svg`<path d=${path} fill=${fillColor} stroke=${strokeColor} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>
      <line x1=${innerX} x2=${innerX} y1=${y + halfStroke} y2=${y + h - halfStroke} stroke=${fillColor} stroke-width=${strokeWidth + 0.5} vector-effect="non-scaling-stroke"/>`;
  }

  // Horizontal: background spans full drawing length (x), thickness is y
  const startPerp = config.hasBar
    ? isOutwardPositive(config)
      ? config.barThickness
      : -config.barThickness
    : 0;

  let rectX = mainAxisOffset(config);
  let rectY = isOutwardPositive(config)
    ? startPerp
    : startPerp - backgroundThickness;
  let rectWidth = dLen;
  let rectHeight = backgroundThickness;

  // When hasBar=true, the scale's inner edge (touching the bar) should NOT be
  // adjusted inward (because it's not a true viewBox boundary - the bar covers it).
  const isBottom = config.side === 'bottom';
  let viewBoxMinY: number;
  let viewBoxMaxY: number;
  if (config.hasBar) {
    // Exclude the inner edge (touching bar) from stroke adjustment
    if (isBottom) {
      // Bottom side: scale is at y=barThickness..(barThickness+backgroundThickness)
      // Inner edge is top (at barThickness), don't adjust it
      viewBoxMinY = rectY - 1; // -1 so rectY won't match
      viewBoxMaxY = rectY + rectHeight;
    } else {
      // Top side: scale is at y=(-barThickness-backgroundThickness)..(-barThickness)
      // Inner edge is bottom (at -barThickness), don't adjust it
      viewBoxMinY = rectY;
      viewBoxMaxY = rectY + rectHeight + 1; // +1 so rectY+rectHeight won't match
    }
  } else {
    viewBoxMinY = rectY;
    viewBoxMaxY = rectY + rectHeight;
  }

  // Adjust along x boundaries
  const adjustedX = adjustRectWidthForStroke(
    rectX,
    rectWidth,
    rectX,
    rectX + rectWidth,
    strokeWidth
  );
  rectX = adjustedX.x;
  rectWidth = adjustedX.width;

  const adjustedY = adjustRectHeightForStroke(
    rectY,
    rectHeight,
    viewBoxMinY,
    viewBoxMaxY,
    strokeWidth
  );
  rectY = adjustedY.y;
  rectHeight = adjustedY.height;

  // Build path with selective rounded corners
  const x = rectX;
  const y = rectY;
  const w = rectWidth;
  const h = rectHeight;

  // Path construction: start top-left, go clockwise
  let path = `M ${x + (shouldRoundTopLeft ? r : 0)} ${y}`;
  // Top edge
  path += ` L ${x + w - (shouldRoundTopRight ? r : 0)} ${y}`;
  // Top-right corner
  if (shouldRoundTopRight) {
    path += ` Q ${x + w} ${y} ${x + w} ${y + r}`;
  }
  // Right edge
  path += ` L ${x + w} ${y + h - (shouldRoundBottomRight ? r : 0)}`;
  // Bottom-right corner
  if (shouldRoundBottomRight) {
    path += ` Q ${x + w} ${y + h} ${x + w - r} ${y + h}`;
  }
  // Bottom edge
  path += ` L ${x + (shouldRoundBottomLeft ? r : 0)} ${y + h}`;
  // Bottom-left corner
  if (shouldRoundBottomLeft) {
    path += ` Q ${x} ${y + h} ${x} ${y + h - r}`;
  }
  // Left edge
  path += ` L ${x} ${y + (shouldRoundTopLeft ? r : 0)}`;
  // Top-left corner
  if (shouldRoundTopLeft) {
    path += ` Q ${x} ${y} ${x + r} ${y}`;
  }
  path += ` Z`;

  // Stroke the entire path, then cover the inner edge with a line
  // Line is shortened by half-stroke on each end to avoid overlapping with left/right strokes
  const innerY = isBottom ? y : y + h;
  const halfStroke = strokeWidth / 2;

  return svg`<path d=${path} fill=${fillColor} stroke=${strokeColor} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>
    <line x1=${x + halfStroke} x2=${x + w - halfStroke} y1=${innerY} y2=${innerY} stroke=${fillColor} stroke-width=${strokeWidth + 0.5} vector-effect="non-scaling-stroke"/>`;
}

function setpointMarker(
  config: ExternalScaleConfig
): SVGTemplateResult | typeof nothing {
  if (config.setpoint === undefined) return nothing;

  const setpointMarkerSize = 24;
  const setpointMarkerHalf = setpointMarkerSize / 2;

  const setpointAtZero =
    Math.abs(config.setpoint) < config.setpointAtZeroDeadband;
  const pos = setpointAtZero ? 0 : valueToMainAxis(config, config.setpoint);

  const c = colors(config);
  const strokeColor = 'var(--border-silhouette-color)';
  const filled =
    config.state === InstrumentState.inCommand ||
    config.state === InstrumentState.off;

  const isAt = calculateAtSetpoint(config);
  // Smaller size (80%) when: at setpoint, at zero, or off state (legacy behavior).
  const scale =
    isAt || setpointAtZero || config.state === InstrumentState.off ? 0.8 : 1.0;

  const filledPath =
    'M23.5119 8C24.6981 6.35191 23.5696 4 21.5926 4L2.39959 4C0.422598 4 -0.705911 6.35191 0.480283 8L11.9961 24L23.5119 8Z';
  const hollowPath =
    'M18.5836 8L5.4086 8L11.9961 17.1526L18.5836 8ZM23.5119 8C24.6981 6.35191 23.5696 4 21.5926 4L2.39959 4C0.422598 4 -0.705911 6.35191 0.480283 8L11.9961 24L23.5119 8Z';

  const path = filled ? filledPath : hollowPath;

  const base = tickBasePerp(config);

  // Place marker at outer edge of tertiary tickmarks (gap + 4) relative to tick base.
  const outwardOffset = tickGap() + 4;
  const perp = isOutwardPositive(config)
    ? base + outwardOffset
    : base - outwardOffset;

  const rotation = isVertical(config) ? 90 : 0;

  // For horizontal, triangle should point toward the bar:
  // - bottom scale: marker is below the bar, so it should point up
  // - top scale: marker is above the bar, so it should point down
  const flip =
    (isVertical(config) && config.side === 'left') ||
    (!isVertical(config) && config.side === 'bottom');

  // Note: the horizontal marker path's local bbox is ~24px tall (y: 0..24).
  // Since we apply `scale(${scale})` first, we must translate by (setpointMarkerSize * scale)
  // before `scale(1,-1)` to keep the marker anchored (no position shift).
  const flipScale = flip
    ? isVertical(config)
      ? 'scale(-1, 1)'
      : `translate(0 ${setpointMarkerSize * scale}) scale(1, -1)`
    : '';

  // For horizontal + top (not flipped), the path's origin is its top edge.
  // Shift it up so the marker tip (at y=setpointMarkerSize) stays anchored at `perp`.
  const tipShift =
    !isVertical(config) && !flip
      ? `translate(0 ${-setpointMarkerSize * scale})`
      : '';

  const setpointId = `externalScaleSetpoint-${Math.random().toString(36).slice(2)}`;
  const maskId = `externalScaleSetpointMask-${Math.random().toString(36).slice(2)}`;

  const markerDef = isVertical(config)
    ? svg`<path fill-rule="evenodd" clip-rule="evenodd" transform="translate(24 -12) rotate(${rotation})" d=${path} vector-effect="non-scaling-stroke"/>`
    : svg`<g transform="translate(${-setpointMarkerHalf} 0)"><path fill-rule="evenodd" clip-rule="evenodd" d=${path} vector-effect="non-scaling-stroke"/></g>`;

  // Split transforms: position/flip (no animation) vs scale (animated)
  const positionTransform = isVertical(config)
    ? `translate(${perp} ${pos}) ${flipScale}`
    : `translate(${pos} ${perp}) ${tipShift} ${flipScale}`;

  const scaleTransform = `scale(${scale})`;

  return svg`
    <defs>
      <g id=${setpointId}>
        ${markerDef}
      </g>
      <mask id=${maskId}>
        <rect x="-20" y="-20" width="50" height="50" fill="white" />
        <use href="#${setpointId}" fill="black" />
      </mask>
    </defs>
    <g transform=${positionTransform}>
      <g transform=${scaleTransform} style="transition: transform 200ms ease-in-out;">
        <use href="#${setpointId}" fill=${c.setpointColor} stroke="none"/>
        <use href="#${setpointId}" mask="url(#${maskId})" fill="none" stroke=${strokeColor} stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      </g>
    </g>
  `;
}

/**
 * Generate a dot indicator at the current value position.
 *
 * The dot is:
 * - 12x12px filled circle with 2px stroke (16px total visual size)
 * - Positioned in the scale band, touching its inner edge (towards the chart)
 * - Fill uses secondary color (enhanced or regular based on config.enhanced)
 * - Stroke uses --instrument-frame-primary-color
 *
 * @param config - Scale configuration
 * @returns SVG template for the current value dot, or nothing if disabled/no value
 */
function generateCurrentValueDot(
  config: ExternalScaleConfig
): SVGTemplateResult | typeof nothing {
  if (!config.highlightCurrentValue || config.value === undefined) {
    return nothing;
  }

  // Dot dimensions
  const dotDiameter = 12; // Inner fill diameter
  const strokeWidth = 2;
  // Total visual size: stroke is centered on path, so adds strokeWidth/2 to each side
  // Visual radius = fillRadius + strokeWidth/2 = 6 + 1 = 7
  const visualRadius = dotDiameter / 2 + strokeWidth / 2;
  const dotRadius = dotDiameter / 2;

  // Position on main axis (value to coordinate)
  const pos = valueToMainAxis(config, config.value);

  // Position on perpendicular axis:
  // The dot should be in the scale band, touching its inner edge (towards the chart/bar)
  //
  // The scale background (when shown) spans from barEdge to barEdge+backgroundThickness
  // where backgroundThickness = mainTickLength + gap (e.g., 12+4=16 for condensed)
  //
  // For the dot to touch the INNER edge (toward chart) and stay INSIDE the scale band:
  // - Inner edge of scale background = barEdge (or 0 if no bar)
  // - Dot's inner edge should be at the inner edge of the scale band
  // - So dot center = innerEdge + visualRadius
  const base = tickBasePerp(config);

  // Dot center should be positioned so the dot's inner edge touches the scale band's inner edge
  const perpCenter = isOutwardPositive(config)
    ? base + visualRadius
    : base - visualRadius;

  // Colors
  const c = colors(config);
  // Use secondary color for fill (same as markerFillColor from colors function)
  const fillColor = c.markerFillColor;
  const strokeColor = 'var(--instrument-frame-primary-color)';

  // Render the dot
  if (isVertical(config)) {
    return svg`
      <circle
        cx=${perpCenter}
        cy=${pos}
        r=${dotRadius}
        fill=${fillColor}
        stroke=${strokeColor}
        stroke-width=${strokeWidth}
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  // Horizontal orientation
  return svg`
    <circle
      cx=${pos}
      cy=${perpCenter}
      r=${dotRadius}
      fill=${fillColor}
      stroke=${strokeColor}
      stroke-width=${strokeWidth}
      vector-effect="non-scaling-stroke"
    />
  `;
}

function singleSidedTickmark(
  config: ExternalScaleConfig,
  value: number,
  style: TickmarkStyle,
  tickBase: number
): SVGTemplateResult | null {
  if (value >= config.maxValue || value <= config.minValue) return null;

  const color = tickmarkColor(style);
  const pos = valueToMainAxis(config, value);

  const gap = tickGap();
  const start = isOutwardPositive(config) ? tickBase + gap : tickBase - gap;
  const len = config.tickThickness;
  const end = isOutwardPositive(config) ? start + len : start - len;

  if (isVertical(config)) {
    return svg`<line x1=${start} x2=${end} y1=${pos} y2=${pos} stroke=${color} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
  }

  return svg`<line x1=${pos} x2=${pos} y1=${start} y2=${end} stroke=${color} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
}

function advicePill(
  config: ExternalScaleConfig,
  advice: ExternalScaleAdviceRaw,
  x1: number,
  fill: string,
  stroke: string
): SVGTemplateResult {
  const width = 8;
  const offset = 4;
  const r = width / 2;
  const inset = 4;

  if (isVertical(config)) {
    const yMin = valueToMainAxis(config, advice.min);
    const yMax = valueToMainAxis(config, advice.max);
    const yL = Math.min(yMin, yMax);
    const yH = Math.max(yMin, yMax);

    const x = x1 + offset;
    const y = yL + inset;
    const h = Math.max(0, yH - yL - inset * 2);

    return svg`<rect x=${x} y=${y} width=${width} height=${h} rx=${r} ry=${r} fill=${fill} stroke=${stroke} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
  }

  const xMin = valueToMainAxis(config, advice.min);
  const xMax = valueToMainAxis(config, advice.max);
  const xL = Math.min(xMin, xMax);
  const xH = Math.max(xMin, xMax);

  const x = xL + inset;
  const y = x1 + offset;
  const w = Math.max(0, xH - xL - inset * 2);

  return svg`<rect x=${x} y=${y} width=${w} height=${width} rx=${r} ry=${r} fill=${fill} stroke=${stroke} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
}

function renderAdvice(
  config: ExternalScaleConfig,
  advice: ExternalScaleAdviceRaw
): SVGTemplateResult {
  const tickBase = tickBasePerp(config);
  const hasBarArea = config.hasBar;
  const effectiveAdvicePosition = hasBarArea ? config.advicePosition : 'inner';

  // Determine x1 (perpendicular) position for the 8px mask
  let x1: number;

  if (effectiveAdvicePosition === 'center') {
    const adviceWidth = 8;
    const centerOffset = config.barThickness / 2 - adviceWidth / 2;

    if (isVertical(config)) {
      x1 = isOutwardPositive(config)
        ? centerOffset - 4
        : -config.barThickness + centerOffset - 4;
    } else {
      x1 = isOutwardPositive(config)
        ? centerOffset - 4
        : -config.barThickness + centerOffset - 4;
    }
  } else if (effectiveAdvicePosition === 'inner') {
    x1 = isOutwardPositive(config) ? tickBase : tickBase - 16;
  } else {
    x1 = isOutwardPositive(config)
      ? config.barThickness + 10
      : -config.barThickness - config.tickThickness + 14;
  }

  // Dashed boundary tickmarks across the bar band
  const ticks: SVGTemplateResult[] = [];

  const dashStroke = 'var(--instrument-frame-tertiary-color)';

  const minBound = advice.min > config.minValue;
  const maxBound = advice.max < config.maxValue;

  const barStart = isOutwardPositive(config) ? 0 : -config.barThickness;
  const barEnd = isOutwardPositive(config) ? config.barThickness : 0;

  const dash = (v: number) => {
    const p = valueToMainAxis(config, v);
    if (isVertical(config)) {
      ticks.push(
        svg`<line x1=${barStart} x2=${barEnd} y1=${p} y2=${p} stroke=${dashStroke} stroke-width="1" vector-effect="non-scaling-stroke" stroke-dasharray="4 4"/>`
      );
    } else {
      ticks.push(
        svg`<line x1=${p} x2=${p} y1=${barStart} y2=${barEnd} stroke=${dashStroke} stroke-width="1" vector-effect="non-scaling-stroke" stroke-dasharray="4 4"/>`
      );
    }
  };

  if (minBound) dash(advice.min);
  if (maxBound) dash(advice.max);

  if (advice.type === AdviceType.caution) {
    let mainColor: string;
    let fillColor: string = 'var(--instrument-frame-primary-color)';

    if (advice.state === AdviceState.hinted) {
      mainColor = 'var(--instrument-frame-tertiary-color)';
    } else if (advice.state === AdviceState.regular) {
      mainColor = 'var(--instrument-tick-mark-tertiary-color)';
    } else {
      mainColor = 'var(--on-caution-active-color)';
      fillColor = 'var(--alert-caution-color)';
    }

    const pattern: SVGTemplateResult[] = [];
    const ypattern = 50;

    const aMin = valueToMainAxis(config, advice.min);
    const aMax = valueToMainAxis(config, advice.max);
    const mainMin = Math.min(aMin, aMax);
    const mainMax = Math.max(aMin, aMax);
    const span = mainMax - mainMin;

    // Tile across the advice's main-axis span so hatch reaches the full advice region.
    if (isVertical(config)) {
      // Center the 50px tile on the 8px pill thickness.
      const xOffset = x1 + 8 - 25;
      // Start a bit before the advice, then tile across its full height.
      const yStart = mainMin - 25;

      for (let i = -64; i < span + 64; i += 16) {
        const transform = `translate(${xOffset} ${yStart + i})`;
        const path = `M 50 0 L 0 ${ypattern}`;
        pattern.push(
          svg`<g transform=${transform}><path d=${path} stroke=${mainColor} stroke-width="6"/></g>`
        );
      }
    } else {
      // Center the 50px tile on the 8px pill thickness.
      const yOffset = x1 + 8 - 25;
      // Start a bit before the advice, then tile across its full width.
      const xStart = mainMin - 25;

      for (let i = -64; i < span + 64; i += 16) {
        const transform = `translate(${xStart + i} ${yOffset})`;
        const path = `M 0 50 L ${ypattern} 0`;
        pattern.push(
          svg`<g transform=${transform}><path d=${path} stroke=${mainColor} stroke-width="6"/></g>`
        );
      }
    }

    const maskId = `externalScaleAdviceMask-${advice.min}-${advice.max}-${Math.random().toString(36).slice(2)}`;

    let tickmarkStyle = TickmarkStyle.hinted;
    if (advice.state === AdviceState.regular)
      tickmarkStyle = TickmarkStyle.regular;
    else if (advice.state === AdviceState.triggered)
      tickmarkStyle = TickmarkStyle.enhanced;

    return svg`
      <defs>
        <mask id=${maskId} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="-4096" y="-4096" width="8192" height="8192">
          ${advicePill(config, advice, x1, 'white', 'none')}
        </mask>
      </defs>
      <g mask="url(#${maskId})">
        ${
          fillColor
            ? svg`<rect x="-2048" y="-2048" width="4096" height="4096" fill=${fillColor}/>`
            : nothing
        }
        ${pattern}
      </g>
      ${advicePill(config, advice, x1, 'none', mainColor)}
      ${singleSidedTickmark(config, advice.min, tickmarkStyle, tickBase) ?? nothing}
      ${singleSidedTickmark(config, advice.max, tickmarkStyle, tickBase) ?? nothing}
      ${ticks}
    `;
  }

  // Advice type
  let strokeColor: string;
  let tickmarkStyle: TickmarkStyle;
  let fillColor: string;

  if (advice.state === AdviceState.hinted) {
    strokeColor = 'var(--instrument-frame-tertiary-color)';
    fillColor = 'var(--instrument-frame-primary-color)';
    tickmarkStyle = TickmarkStyle.hinted;
  } else if (advice.state === AdviceState.regular) {
    strokeColor = 'var(--instrument-regular-secondary-color)';
    fillColor = 'var(--instrument-frame-primary-color)';
    tickmarkStyle = TickmarkStyle.regular;
  } else {
    strokeColor = 'var(--instrument-enhanced-secondary-color)';
    fillColor = strokeColor;
    tickmarkStyle = TickmarkStyle.regular;
  }

  return svg`
    ${advicePill(config, advice, x1, fillColor, strokeColor)}
    ${singleSidedTickmark(config, advice.min, tickmarkStyle, tickBase) ?? nothing}
    ${singleSidedTickmark(config, advice.max, tickmarkStyle, tickBase) ?? nothing}
    ${ticks}
  `;
}

function generateAdviceOverlays(
  config: ExternalScaleConfig
): SVGTemplateResult[] {
  if (!config.advices || !config.advices.length) return [];
  const raw = convertAdvices(config.advices, config.setpoint);
  return raw.map((a) => renderAdvice(config, a));
}

/**
 * Helper for web components to compute dimensions for reporting to parent charts.
 *
 * This calculates the minimal configuration needed to determine the scale's thickness,
 * avoiding the need to pass full configs with many irrelevant properties.
 *
 * @param config - Minimal layout configuration
 * @returns Object with side and thickness for event dispatching
 */
export function computeScaleDimensionsForReport(
  config: ExternalScaleLayoutConfig
): {side: ExternalScaleSide; thickness: number} {
  const layout = computeExternalScaleLayout(config);
  const viewBox = computeExternalScaleViewBox(
    {orientation: config.orientation, length: config.length},
    layout
  );

  // For vertical scales, thickness is width; for horizontal, it's height
  const thickness =
    config.orientation === 'vertical' ? viewBox.width : viewBox.height;

  return {
    side: config.side,
    thickness,
  };
}

/**
 * Render the external scale as SVG fragments.
 *
 * This is a pure renderer: it does not touch DOM state and expects the caller
 * to place the returned fragments inside an `<svg>` with an appropriate viewBox.
 *
 * @param config - Scale configuration
 */
export function renderExternalScale(config: ExternalScaleConfig): {
  barContainer: SVGTemplateResult | typeof nothing;
  barFill: SVGTemplateResult | typeof nothing;
  scaleBackground: SVGTemplateResult | typeof nothing;
  tickmarks: SVGTemplateResult[];
  labels: SVGTemplateResult[];
  adviceOverlays: SVGTemplateResult[];
  currentValueDot: SVGTemplateResult | typeof nothing;
  setpoint: SVGTemplateResult | typeof nothing;
} {
  const effectiveBarThickness =
    computeExternalScaleEffectiveBarThickness(config);
  const effectiveConfig: ExternalScaleConfig =
    effectiveBarThickness === config.barThickness
      ? config
      : {...config, barThickness: effectiveBarThickness};

  const parts: {
    barContainer: SVGTemplateResult | typeof nothing;
    barFill: SVGTemplateResult | typeof nothing;
    scaleBackground: SVGTemplateResult | typeof nothing;
    tickmarks: SVGTemplateResult[];
    labels: SVGTemplateResult[];
    adviceOverlays: SVGTemplateResult[];
    currentValueDot: SVGTemplateResult | typeof nothing;
    setpoint: SVGTemplateResult | typeof nothing;
  } = {
    barContainer: generateBarContainer(effectiveConfig),
    barFill: generateBarFill(effectiveConfig),
    scaleBackground: generateScaleBackground(effectiveConfig),
    tickmarks: generateTickmarks(effectiveConfig),
    labels: generateLabels(effectiveConfig),
    adviceOverlays: generateAdviceOverlays(effectiveConfig),
    currentValueDot: generateCurrentValueDot(effectiveConfig),
    setpoint: setpointMarker(effectiveConfig),
  };

  return parts;
}
