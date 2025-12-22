import {SVGTemplateResult, nothing, svg} from 'lit';
import {InstrumentState} from '../../navigation-instruments/types.js';
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
 * geometry attributes like `rx`/`ry`. The bar container and fill masks therefore
 * provide numeric fallbacks and also set `rx/ry` via CSS geometry properties to
 * allow theme overrides where supported.
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
 *   hasLabels: true,
 *   barThickness: 24,
 *   tickThickness: 28,
 *   labelThickness: 60,
 *   hasMainTickbars: true,
 *   hasPrimaryTickbars: true,
 *   hasSecondaryTickbars: true,
 *   hasTertiaryTickbars: true,
 *   primaryTickbarsInterval: 20,
 *   secondaryTickbarsInterval: 10,
 *   tertiaryTickbarsInterval: 2,
 *   scaleType: 'regular',
 *   scaleStyle: 'regular',
 *   enhanced: true,
 *   fillMode: 'fill',
 *   value: 40,
 *   hasSetpoint: true,
 *   setpoint: 50,
 *   atSetpoint: false,
 *   disableAutoAtSetpoint: false,
 *   autoAtSetpointDeadband: 1,
 *   setpointAtZeroDeadband: 0.5,
 *   state: 'inCommand',
 *   hasAdvice: true,
 *   advicePosition: 'inner',
 *   advice: [{min: 60, max: 80, type: 'caution', hinted: true}],
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

/** Tick style preset */
export enum ScaleStyle {
  regular = 'regular',
  flat = 'flat',
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

// Type aliases for backwards compatibility
export type ExternalScaleType = ScaleType;
export type ExternalScaleStyle = ScaleStyle;
export type ExternalFillMode = FillMode;
export type ExternalAdvicePosition = AdvicePosition;

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
  /** Orientation of the main axis used for value-to-coordinate mapping. */
  orientation: ExternalScaleOrientation;
  /**
   * Which side of the chart area this scale lives on.
   * - vertical: 'left' | 'right'
   * - horizontal: 'top' | 'bottom'
   */
  side: ExternalScaleSide;

  /** Total length of the scale (vertical: height, horizontal: width), including padding. */
  length: number;

  /**
   * Padding at the start/end of the main axis.
   * - vertical: start=top, end=bottom
   * - horizontal: start=left, end=right
   */
  paddingStart: number;
  paddingEnd: number;

  minValue: number;
  maxValue: number;

  // Layout bands (thickness, in px)
  hasScale: boolean;
  hasLabels: boolean;
  hasBar: boolean;

  /** Thickness of the bar band (the white container / fill area). */
  barThickness: number;
  /** Thickness of the tickmark band (space reserved for tick lines). */
  tickThickness: number;
  /** Thickness of the label band (space reserved for numbers). */
  labelThickness: number;

  // Tick configuration
  hasMainTickbars: boolean;
  mainTickbarsArray: number[];
  hasPrimaryTickbars: boolean;
  hasSecondaryTickbars: boolean;
  hasTertiaryTickbars: boolean;
  primaryTickbarsInterval?: number;
  secondaryTickbarsInterval?: number;
  tertiaryTickbarsInterval?: number;
  /**
   * Tick density preset.
   * - 'regular': longer ticks
   * - 'condensed': shorter ticks
   */
  scaleType: ExternalScaleType;
  /**
   * Tick style preset.
   * - 'regular': all ticks offset from bar edge by a gap
   * - 'flat': main ticks touch the bar edge
   */
  scaleStyle: ExternalScaleStyle;

  // Visual state
  enhanced: boolean;
  /**
   * Fill visualization mode.
   * - 'fill': bar fill from fillMin to fillMax
   * - 'tint': bar fill from fillMin to fillMax with marker at value position
   */
  fillMode: ExternalFillMode;
  fillMin?: number;
  fillMax?: number;
  /** Current value used for fill and/or marker rendering. */
  value?: number;

  // Setpoint
  hasSetpoint: boolean;
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
  hasAdvice: boolean;
  /** Where advice overlays are drawn relative to the bar/tick bands. */
  advicePosition: ExternalAdvicePosition;
  /** Advice ranges to render; states are derived from `hinted` and setpoint position. */
  advice: ExternalScaleAdvice[];

  /**
   * When true, freezes all internal calculations and scales the entire component
   * proportionally (like CSS transform:scale), except label font-size remains constant.
   * When false (default), dimensions react to component properties.
   * @default false
   */
  fixedAspectRatio?: boolean;
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
  | 'hasLabels'
  | 'barThickness'
  | 'tickThickness'
  | 'labelThickness'
  | 'length'
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
    hasLabels: config.hasLabels,
    barThickness: config.barThickness,
    tickThickness: config.tickThickness,
    labelThickness: config.labelThickness,
    length: config.length,
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
 * Compute a minimal viewBox layout for an external scale.
 *
 * The chart edge is always at perpendicular coordinate 0, and the scale expands
 * outward from that edge based on which bands are enabled (bar/ticks/labels).
 */
export function computeExternalScaleLayout(
  config: ExternalScaleLayoutConfig
): ExternalScaleLayout {
  const barSpace = config.hasBar ? config.barThickness : 0;
  const scaleSpace = config.hasScale ? config.tickThickness : 0;
  const labelSpace = config.hasLabels ? config.labelThickness : 0;
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

function getTickThicknesses(scaleType: ExternalScaleType) {
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

  // Zero tick
  if (rangeIncludesZero(config.minValue, config.maxValue)) {
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
    skipValues.push(0);
  }

  // Main tickbars
  if (config.hasMainTickbars) {
    const start = config.scaleStyle === 'flat' ? base : tickmarksStart;
    const mainLen = config.scaleStyle === 'flat' ? main + 4 : main;
    const dirLen = isOutwardPositive(config) ? mainLen : -mainLen;

    // Use provided array or default to [minValue, 0, maxValue]
    const mainTickValues =
      config.mainTickbarsArray.length > 0
        ? config.mainTickbarsArray
        : [config.minValue, 0, config.maxValue];

    for (const value of mainTickValues) {
      // Skip if outside range
      if (value < config.minValue || value > config.maxValue) continue;

      svgs.push(
        buildTickLine(config, valueToMainAxis(config, value), start, dirLen)
      );
      skipValues.push(value);
    }
  }

  // Primary
  if (
    config.hasPrimaryTickbars &&
    config.primaryTickbarsInterval !== undefined
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

  // Secondary
  if (
    config.hasSecondaryTickbars &&
    config.secondaryTickbarsInterval !== undefined
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

  // Tertiary
  if (
    config.hasTertiaryTickbars &&
    config.tertiaryTickbarsInterval !== undefined
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
  if (!config.hasLabels || config.primaryTickbarsInterval === undefined)
    return [];

  const interval = config.primaryTickbarsInterval;
  if (interval <= 0 || !Number.isFinite(interval)) return [];

  const fontFamily = 'var(--font-family-main)';
  const fontColor = 'var(--instrument-tick-mark-label-secondary-color)';
  const fontSize =
    'calc(var(--global-typography-ui-label-font-size) / var(--scale, 1))';

  const base = tickBasePerp(config);
  const labelPos = isOutwardPositive(config)
    ? base + (config.hasScale ? config.tickThickness : 0) + labelGap()
    : base - (config.hasScale ? config.tickThickness : 0) - labelGap();

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

  // NOTE: Chrome does not consistently resolve CSS variables in SVG geometry
  // attributes like rx/ry. Provide numeric fallbacks and also set rx/ry via CSS
  // geometry properties so theme classes (e.g. obc-component-size-*) can
  // override.
  const borderRadiusVar =
    config.scaleType === 'condensed'
      ? 'var(--instrument-components-watchface-frame-regular-border-radius, 4px)'
      : 'var(--instrument-components-watchface-frame-regular-border-radius, 8px)';
  const borderRadiusFallback = config.scaleType === 'condensed' ? 4 : 8;
  const strokeWidth = 1;
  const fillColor = 'var(--instrument-frame-primary-color)';
  const strokeColor = 'var(--instrument-frame-tertiary-color)';
  const radiusStyle = `rx: ${borderRadiusVar}; ry: ${borderRadiusVar};`;

  const dLen = drawingLength(config);
  const axisShift = mainAxisOffset(config);

  if (isVertical(config)) {
    let rectX = isOutwardPositive(config) ? 0 : -config.barThickness;
    let rectY = -dLen / 2 + axisShift;
    let rectWidth = config.barThickness;
    let rectHeight = dLen;

    const viewBoxMinX = isOutwardPositive(config) ? 0 : -config.barThickness;
    const viewBoxMaxX = isOutwardPositive(config) ? config.barThickness : 0;

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

    return svg`<rect x=${rectX} y=${rectY} width=${rectWidth} height=${rectHeight} rx=${borderRadiusFallback} ry=${borderRadiusFallback} style=${radiusStyle} fill=${fillColor} stroke=${strokeColor} vector-effect="non-scaling-stroke"/>`;
  }

  // Horizontal: bar spans full drawing length (x), thickness is y
  let rectX = mainAxisOffset(config);
  let rectY = isOutwardPositive(config) ? 0 : -config.barThickness;
  let rectWidth = dLen;
  let rectHeight = config.barThickness;

  const viewBoxMinY = isOutwardPositive(config) ? 0 : -config.barThickness;
  const viewBoxMaxY = isOutwardPositive(config) ? config.barThickness : 0;

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

  return svg`<rect x=${rectX} y=${rectY} width=${rectWidth} height=${rectHeight} rx=${borderRadiusFallback} ry=${borderRadiusFallback} style=${radiusStyle} fill=${fillColor} stroke=${strokeColor} vector-effect="non-scaling-stroke"/>`;
}

function generateBarFill(
  config: ExternalScaleConfig
): SVGTemplateResult | typeof nothing {
  if (!config.hasBar || config.value === undefined) return nothing;

  const borderRadiusVar =
    config.scaleType === 'condensed'
      ? 'var(--instrument-components-watchface-frame-regular-border-radius, 4px)'
      : 'var(--instrument-components-watchface-frame-regular-border-radius, 8px)';
  const borderRadiusFallback = config.scaleType === 'condensed' ? 4 : 8;
  const radiusStyle = `rx: ${borderRadiusVar}; ry: ${borderRadiusVar};`;

  const c = colors(config);
  const dLen = drawingLength(config);
  const axisShift = mainAxisOffset(config);

  // Always use fillMin → fillMax range (defaults to 0 → value if not specified)
  const fillMin = config.fillMin ?? 0;
  const fillMax = config.fillMax ?? config.value;

  const v0 = Math.max(Math.min(fillMin, config.maxValue), config.minValue);
  const v1 = Math.max(Math.min(fillMax, config.maxValue), config.minValue);

  const a0 = valueToMainAxis(config, v0);
  const a1 = valueToMainAxis(config, v1);

  const markerSize = 8;
  const markerR = 4;

  if (isVertical(config)) {
    const boxX = isOutwardPositive(config) ? 0 : -config.barThickness;
    const boxWidth = config.barThickness;
    const y = Math.min(a0, a1);
    const h = Math.abs(a1 - a0);

    const maskId = `externalScaleFillMask-${Math.random().toString(36).slice(2)}`;
    const rectY = -dLen / 2 + axisShift;
    const rectHeight = dLen;
    const mask = svg`<defs><mask id=${maskId}><rect x=${boxX} y=${rectY} width=${boxWidth} height=${rectHeight} rx=${borderRadiusFallback} ry=${borderRadiusFallback} style=${radiusStyle} fill="white"/></mask></defs>`;

    // For tint mode, render marker at value position
    if (config.fillMode === 'tint') {
      const markerY = valueToMainAxis(config, config.value) - markerSize / 2;
      const marker = svg`<rect x=${boxX} y=${markerY} width=${boxWidth} height=${markerSize} rx=${markerR} fill=${c.markerFillColor} stroke=${c.markerStrokeColor} vector-effect="non-scaling-stroke"/>`;
      return svg`${mask}<rect mask="url(#${maskId})" x=${boxX} y=${y} width=${boxWidth} height=${h} fill=${c.barFillColor} stroke="none"/>${marker}`;
    }

    return svg`${mask}<rect mask="url(#${maskId})" x=${boxX} y=${y} width=${boxWidth} height=${h} fill=${c.barFillColor} stroke="none"/>`;
  }

  const boxY = isOutwardPositive(config) ? 0 : -config.barThickness;
  const boxHeight = config.barThickness;
  const x = Math.min(a0, a1);
  const w = Math.abs(a1 - a0);

  const maskId = `externalScaleFillMask-${Math.random().toString(36).slice(2)}`;
  const rectX = axisShift;
  const rectWidth = dLen;
  const mask = svg`<defs><mask id=${maskId}><rect x=${rectX} y=${boxY} width=${rectWidth} height=${boxHeight} rx=${borderRadiusFallback} ry=${borderRadiusFallback} style=${radiusStyle} fill="white"/></mask></defs>`;

  // For tint mode, render marker at value position
  if (config.fillMode === 'tint') {
    const markerX = valueToMainAxis(config, config.value) - markerSize / 2;
    const marker = svg`<rect x=${markerX} y=${boxY} width=${markerSize} height=${boxHeight} rx=${markerR} fill=${c.markerFillColor} stroke=${c.markerStrokeColor} vector-effect="non-scaling-stroke"/>`;
    return svg`${mask}<rect mask="url(#${maskId})" x=${x} y=${boxY} width=${w} height=${boxHeight} fill=${c.barFillColor} stroke="none"/>${marker}`;
  }

  return svg`${mask}<rect mask="url(#${maskId})" x=${x} y=${boxY} width=${w} height=${boxHeight} fill=${c.barFillColor} stroke="none"/>`;
}

function setpointMarker(
  config: ExternalScaleConfig
): SVGTemplateResult | typeof nothing {
  if (!config.hasSetpoint || config.setpoint === undefined) return nothing;

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

    // Vertical: keep the existing legacy tiling (works visually already).
    // Horizontal: tile across the advice's main-axis span so hatch actually reaches the advice region.
    if (isVertical(config)) {
      // Mask lives at x1+4..x1+12 => center at x1+8.
      const patternOffset = x1 + 8 - 25;

      for (let i = -16 * 8; i < 16 * 14; i += 16) {
        const transform = `translate(${patternOffset} ${-i})`;
        const path = `M 50 0 L 0 ${ypattern}`;
        pattern.push(
          svg`<g transform=${transform}><path d=${path} stroke=${mainColor} stroke-width="6"/></g>`
        );
      }
    } else {
      const aMin = valueToMainAxis(config, advice.min);
      const aMax = valueToMainAxis(config, advice.max);
      const mainMin = Math.min(aMin, aMax);
      const mainMax = Math.max(aMin, aMax);

      // Center the 50px tile on the 8px pill thickness.
      const yOffset = x1 + 8 - 25;
      // Start a bit before the advice, then tile across its full width.
      const xStart = mainMin - 25;
      const span = mainMax - mainMin;

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
  if (!config.hasAdvice || !config.advice.length) return [];
  const raw = convertAdvices(config.advice, config.setpoint);
  return raw.map((a) => renderAdvice(config, a));
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
  tickmarks: SVGTemplateResult[];
  labels: SVGTemplateResult[];
  adviceOverlays: SVGTemplateResult[];
  setpoint: SVGTemplateResult | typeof nothing;
} {
  const parts: {
    barContainer: SVGTemplateResult | typeof nothing;
    barFill: SVGTemplateResult | typeof nothing;
    tickmarks: SVGTemplateResult[];
    labels: SVGTemplateResult[];
    adviceOverlays: SVGTemplateResult[];
    setpoint: SVGTemplateResult | typeof nothing;
  } = {
    barContainer: generateBarContainer(config),
    barFill: generateBarFill(config),
    tickmarks: generateTickmarks(config),
    labels: generateLabels(config),
    adviceOverlays: generateAdviceOverlays(config),
    setpoint: setpointMarker(config),
  };

  return parts;
}
