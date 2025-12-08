import {LitElement, html, svg, SVGTemplateResult, nothing} from 'lit';
import {property, state} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {InstrumentState} from '../../navigation-instruments/types.js';
import {CHART_DIMENSIONS} from '../../charthelpers/constants.js';
import {
  renderAdvice,
  convertVerticalBarAdvices,
  VerticalBarAdvice,
} from './advice.js';
import {
  valueToY,
  adjustRectForStroke,
  adjustRectHeightForStroke,
} from '../../svghelpers/stroke-aware.js';
import type {ScaleInfo} from '../chart-line/chart-line-base.js';

/**
 * Vertical bar building block - a ruler-like scale/axis component with configurable tickmarks and optional value visualization.
 *
 * This component renders a vertical bar with tickmarks, labels, optional fill, setpoint indicators, and advice overlays.
 * It can be used standalone, as a chart overlay axis, or composed within other components.
 * It supports two configuration modes:
 * 1. **Standalone mode**: Manual scale configuration via properties
 * 2. **Chart-synced mode**: Automatically syncs with chart via `scales-updated` events
 *
 * ## Features
 * - **Manual or auto-sync scales**: Configure min/max manually or sync with chart ScaleInfo
 * - **Configurable tickmarks**: Primary, secondary, and tertiary tick intervals with show/hide control
 * - **Scale types**: Regular (all tickmarks shown) or condensed (secondary hidden, reduced spacing)
 * - **Value labels**: Optional numerical labels at primary tickmarks
 * - **Setpoint indicator**: Visual marker for input/target value (like thruster setpoint)
 * - **Advice overlays**: Alert/advice regions with visual indicators
 * - **Bar styles**: Regular or enhanced color schemes
 * - **Positioning**: Left or right
 * - **Responsive sizing**: Adapts to parent .obc-component-size-* classes
 * - **Theme-aware**: Uses CSS variables for consistent styling
 *
 * ## Responsive Sizing
 * The component automatically responds to parent container size classes:
 * - `.obc-component-size-regular` - Default sizing (base scale)
 * - `.obc-component-size-medium` - Medium sizing
 * - `.obc-component-size-large` - Large sizing
 * - `.obc-component-size-xl` - Extra-large sizing
 *
 * These classes affect:
 * - Label font size (via `--global-typography-ui-label-font-size`)
 *
 * Wrap the component in a div with the appropriate size class:
 * ```html
 * <div class="obc-component-size-large">
 *   <obc-bar-vertical ...></obc-bar-vertical>
 * </div>
 * ```
 *
 * ## Usage Examples
 *
 * ### Standalone mode (manual configuration)
 * ```html
 * <obc-bar-vertical
 *   minValue="0"
 *   maxValue="100"
 *   fixedHeight="320"
 *   barWidth="24"
 *   primaryTickbarsInterval="20"
 *   secondaryTickbarsInterval="10"
 *   hasLabels="true"
 *   hasScale="true"
 *   position="right">
 * </obc-bar-vertical>
 * ```
 *
 * ### With setpoint indicator
 * ```html
 * <obc-bar-vertical
 *   minValue="-100"
 *   maxValue="100"
 *   setpoint="50"
 *   hasSetpoint="true"
 *   enhanced="true"
 *   hasBar="true">
 * </obc-bar-vertical>
 * ```
 *
 * ### Condensed scale type
 * ```html
 * <obc-bar-vertical
 *   scaleType="condensed"
 *   primaryTickbarsInterval="25"
 *   tertiaryTickbarsInterval="5"
 *   hasScale="true">
 * </obc-bar-vertical>
 * ```
 *
 * ### Chart-synced mode
 * ```html
 * <div style="position: relative;">
 *   <obc-area-graph id="chart" showTickMarks="false" fixedHeight="320"></obc-area-graph>
 *   <obc-bar-vertical id="axis" position="right" hasLabels="true"></obc-bar-vertical>
 * </div>
 * <script>
 *   chart.addEventListener('scales-updated', (e) => { axis.scaleInfo = e.detail; });
 * </script>
 * ```
 *
 * @property {number} minValue - Minimum scale value (manual mode). Overridden by scaleInfo. Default: 0.
 * @property {number} maxValue - Maximum scale value (manual mode). Overridden by scaleInfo. Default: 100.
 * @property {number} fixedHeight - Bar height in pixels (manual mode). Calculated from scaleInfo when provided. Default: 320px.
 * @property {number} barWidth - Width of the bar/fill area in pixels. Default: 24px.
 * @property {boolean} hasScale - Show scale tickmarks. When false, hides all tickmarks. Default: true.
 * @property {boolean} hasMainTickbars - Show first/last tickmarks at min/max values (e.g., 0 and 100). Default: true.
 * @property {boolean} hasPrimaryTickbars - Show primary tickmarks. Default: true.
 * @property {boolean} hasSecondaryTickbars - Show secondary tickmarks. Default: true.
 * @property {boolean} hasTertiaryTickbars - Show tertiary tickmarks. Default: true.
 * @property {number} primaryTickbarsInterval - Interval for primary (longest) tickmarks. Shows labels at these positions. Optional.
 * @property {number} secondaryTickbarsInterval - Interval for secondary (medium) tickmarks. Hidden in condensed mode. Optional.
 * @property {number} tertiaryTickbarsInterval - Interval for tertiary (shortest) tickmarks. Optional.
 * @property {'regular'|'condensed'} scaleType - Scale display mode. 'regular': all tickmarks shown as configured. 'condensed': secondary tickmarks hidden, remaining tickmarks shortened. Default: 'regular'.
 * @property {'regular'|'flat'} scaleStyle - Scale style mode. 'regular': 4px gap before all tickmarks. 'flat': main tickmarks touch edge, other tickmarks have 4px gap. Default: 'regular'.
 * @property {boolean} hasLabels - Show numerical value labels at primary tickmarks. Default: true.
 * @property {boolean} hasBar - Show the bar background/container. When false, only shows tickmarks/labels (pure axis mode). Default: false.
 * @property {boolean} enhanced - Enhanced visual mode. When true, uses enhanced instrument colors for bar fill and setpoint. When false, uses regular frame colors. Default: false.
 * @property {'fill'|'tint'} fillMode - Bar fill visualization mode. 'fill': fills from zero to value. 'tint': fills from fillMin to fillMax with marker line at value. Default: 'fill'.
 * @property {number} fillMin - Minimum fill value for 'tint' mode. Defaults to 0 if undefined. Optional.
 * @property {number} fillMax - Maximum fill value for 'tint' mode. Defaults to value if undefined. Optional.
 * @property {number} value - Current value determining bar fill level or marker position. In 'fill' mode: fill extends from zero to this value. In 'tint' mode: marker line position. Optional.
 * @property {number} setpoint - Setpoint/input value to display as visual indicator. Optional.
 * @property {boolean} hasSetpoint - Show setpoint indicator when setpoint value is provided. Default: true.
 * @property {boolean} atSetpoint - Whether value is at setpoint. Used when disableAutoAtSetpoint=true for manual control. Default: false.
 * @property {boolean} disableAutoAtSetpoint - Disable automatic atSetpoint calculation based on value and deadband. When false, atSetpoint is calculated automatically. Default: false.
 * @property {number} autoAtSetpointDeadband - Deadband for automatic atSetpoint detection (when disableAutoAtSetpoint=false). Value is considered at setpoint when |value - setpoint| < deadband. Default: 1.
 * @property {number} setpointAtZeroDeadband - Deadband around zero for setpoint visual positioning. When |setpoint| < deadband, setpoint snaps to zero line visually (data unchanged). Default: 0.5.
 * @property {'inCommand'|'active'|'loading'|'off'} state - Instrument state affecting colors and setpoint appearance. Default: 'inCommand'.
 * @property {'left'|'right'} position - Side positioning. Affects layout order: right=[bar][scale][labels], left=[labels][scale][bar]. Default: 'right'.
 * @property {'center'|'inner'|'outer'} advicePosition - Advice overlay positioning. 'center': in bar area, 'inner': in scale area (covers minor ticks), 'outer': in scale area (no overlap). Default: 'inner'.
 * @property {boolean} hasAdvice - Show advice/alert overlays when advice array is provided. Default: true.
 * @property {ScaleInfo} scaleInfo - Scale information from chart's scales-updated event. When set, overrides manual min/max/height.
 * @property {VerticalBarAdvice[]} advice - Advice/alert overlays. Each advice has min/max range, type (advice/caution), and hinted flag. State is calculated dynamically based on setpoint position: triggered when setpoint is inside range, otherwise uses hinted/regular state. Default: empty array.
 */

// disabled for now @property {Array<{min: number, max: number, fill?: string}>} fillRanges - Value ranges to highlight with colored fills.
@customElement('obc-bar-vertical')
export class ObcBarVertical extends LitElement {
  // Manual scale configuration (used when scaleInfo not provided)
  @property({type: Number})
  minValue = 0;

  @property({type: Number})
  maxValue = 100;

  @property({type: Number})
  fixedHeight = 320;

  // Bar dimensions
  @property({type: Number})
  barWidth = 24; // Configurable width of the bar/fill area

  // Sizing - values can be adjusted via properties or will use defaults
  // Component responds to parent .obc-component-size-* classes through CSS variables
  // used in font-size, spacing, etc. Future enhancement: make scaleWidth/labelWidth
  // responsive to these classes as well
  @state()
  private scaleWidth = 28; // Tickmark area width (4px gap + 24px tickmark)

  @state()
  private labelWidth = 60; // Label area width (fits ~3 digits)

  // Tickmark configuration
  @property({type: Boolean})
  hasScale = true; // Show scale tickmarks

  @property({type: Boolean})
  hasMainTickbars = true; // Show first/last tickmark at min/max

  @property({type: Boolean})
  hasPrimaryTickbars = true; // Show primary tickmarks

  @property({type: Boolean})
  hasSecondaryTickbars = true; // Show secondary tickmarks

  @property({type: Boolean})
  hasTertiaryTickbars = true; // Show tertiary tickmarks

  @property({type: Number})
  primaryTickbarsInterval?: number = undefined; // Primary (longest) tickmarks with labels

  @property({type: Number})
  secondaryTickbarsInterval?: number = undefined; // Secondary (medium) tickmarks

  @property({type: Number})
  tertiaryTickbarsInterval?: number = undefined; // Tertiary (shortest) tickmarks

  @property({type: String})
  scaleType: 'regular' | 'condensed' = 'regular'; // Scale display mode

  @property({type: String})
  scaleStyle: 'regular' | 'flat' = 'regular'; // Scale style: regular (4px gap) or flat (no gap for main tickmarks)

  // Display options
  @property({type: Boolean})
  hasLabels = true;

  @property({type: Boolean})
  hasBar = false;

  @property({type: Boolean})
  enhanced = false; // Enhanced visual mode affects bar fill and setpoint colors

  @property({type: String})
  position: 'left' | 'right' = 'right';

  @property({type: String})
  advicePosition: 'center' | 'inner' | 'outer' = 'inner';

  // Value configuration (current bar fill)
  @property({type: String})
  fillMode: 'fill' | 'tint' = 'fill'; // Bar fill visualization mode

  @property({type: Number})
  fillMin?: number = undefined; // Minimum fill value for 'tint' mode

  @property({type: Number})
  fillMax?: number = undefined; // Maximum fill value for 'tint' mode

  @property({type: Number})
  value?: number = undefined; // Current value (bar fill level or marker position)

  // Setpoint configuration
  @property({type: Number})
  setpoint?: number = undefined; // Setpoint/input value

  @property({type: Boolean})
  hasSetpoint = true; // Show setpoint indicator

  @property({type: Boolean})
  atSetpoint: boolean = false; // Whether value is at setpoint

  @property({type: Boolean}) disableAutoAtSetpoint: boolean = false;
  @property({type: Number}) autoAtSetpointDeadband: number = 1;
  @property({type: Number}) setpointAtZeroDeadband: number = 0.5; // Deadband for setpoint at zero
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;

  // Advice configuration
  @property({type: Boolean})
  hasAdvice = true; // Show advice overlays

  // Chart synchronization
  @property({attribute: false})
  scaleInfo?: ScaleInfo = undefined;

  // Fill and advice
  // @property({attribute: false})
  // fillRanges: {min: number; max: number; fill?: string}[] = [];

  @property({attribute: false})
  advice: VerticalBarAdvice[] = [];

  // Computed values from scaleInfo
  @state()
  private computedMinValue = 0;

  @state()
  private computedMaxValue = 100;

  @state()
  computedHeight = 320;

  @state()
  private computedPrimaryInterval?: number;

  @state()
  private computedSecondaryInterval?: number;

  @state()
  private computedTertiaryInterval?: number;

  @state()
  private computedPaddingTop: number = CHART_DIMENSIONS.CANVAS_PADDING;

  @state()
  private computedPaddingBottom: number = CHART_DIMENSIONS.CANVAS_PADDING;

  /**
   * Update computed values when scaleInfo or manual properties change
   */
  override willUpdate(_changedProperties: Map<PropertyKey, unknown>) {
    // If scaleInfo is provided, use it to override manual configuration
    if (this.scaleInfo) {
      this.computedMinValue = this.scaleInfo.y.min;
      this.computedMaxValue = this.scaleInfo.y.max;

      // Use padding from scaleInfo for accurate sync with chart
      this.computedPaddingTop = this.scaleInfo.padding.top;
      this.computedPaddingBottom = this.scaleInfo.padding.bottom;

      // Height should match chart's total canvas height
      this.computedHeight = this.scaleInfo.canvas.height;

      // Calculate tick intervals from scaleInfo config if available
      if (this.scaleInfo.config.yStepSize) {
        this.computedPrimaryInterval = this.scaleInfo.config.yStepSize;
        // Secondary interval is half of primary
        this.computedSecondaryInterval = this.scaleInfo.config.yStepSize / 2;
      } else if (this.scaleInfo.config.yTicksLimit) {
        // Calculate interval from tick limit
        const range = this.computedMaxValue - this.computedMinValue;
        const approximateInterval =
          range / (this.scaleInfo.config.yTicksLimit - 1);
        // Round to nice number
        this.computedPrimaryInterval = this.niceNumber(approximateInterval);
        this.computedSecondaryInterval = this.computedPrimaryInterval / 2;
      }
      // Tertiary interval always comes from manual property (not auto-calculated)
      this.computedTertiaryInterval = this.tertiaryTickbarsInterval;
    } else {
      // Use manual configuration
      this.computedMinValue = this.minValue;
      this.computedMaxValue = this.maxValue;
      this.computedHeight = this.fixedHeight;
      this.computedPrimaryInterval = this.primaryTickbarsInterval;
      this.computedSecondaryInterval = this.secondaryTickbarsInterval;
      this.computedTertiaryInterval = this.tertiaryTickbarsInterval;
      // Use default padding in standalone mode
      this.computedPaddingTop = CHART_DIMENSIONS.CANVAS_PADDING;
      this.computedPaddingBottom = CHART_DIMENSIONS.CANVAS_PADDING;
    }
  }

  /**
   * Calculate whether value is at setpoint (adapted from thruster atSetpoint())
   */
  private calculateAtSetpoint(): boolean {
    // If no value or setpoint, can't be at setpoint
    if (this.value === undefined || this.setpoint === undefined) {
      return false;
    }

    // If auto-calculation is enabled, check if value is within deadband
    if (!this.disableAutoAtSetpoint) {
      return Math.abs(this.value - this.setpoint) < this.autoAtSetpointDeadband;
    }

    // Otherwise use manual atSetpoint property
    return this.atSetpoint;
  }

  /**
   * Round a number to a "nice" interval (1, 2, 5, 10, 20, 50, etc.)
   */
  private niceNumber(value: number): number {
    const exponent = Math.floor(Math.log10(value));
    const fraction = value / Math.pow(10, exponent);
    let niceFraction;

    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;

    return niceFraction * Math.pow(10, exponent);
  }

  /**
   * Calculate colors based on state, enhanced mode, and atSetpoint status (adapted from thrusterColors)
   */
  private barVerticalColors(): {
    barFillColor: string;
    markerFillColor: string;
    markerStrokeColor: string;
    setpointColor: string;
  } {
    // Bar fill color depends on fillMode:
    // - 'fill' mode: secondary (lighter) for fill from 0 to value
    // - 'tint' mode: tertiary (darker) for range fill
    let barFillColor =
      this.fillMode === 'fill'
        ? this.enhanced
          ? 'var(--instrument-enhanced-secondary-color)'
          : 'var(--instrument-regular-secondary-color)'
        : this.enhanced
          ? 'var(--instrument-enhanced-tertiary-color)'
          : 'var(--instrument-regular-tertiary-color)';

    // Marker line fill color: secondary (lighter)
    let markerFillColor = this.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';

    // Marker line stroke color: tertiary (darker)
    let markerStrokeColor = this.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';

    // Setpoint color is always the darker primary color (no color change based on atSetpoint)
    let setpointColor = this.enhanced
      ? 'var(--instrument-enhanced-primary-color)'
      : 'var(--instrument-regular-primary-color)';

    // State overrides: loading and off make fill transparent
    if (this.state === InstrumentState.loading) {
      barFillColor = 'transparent';
      markerFillColor = 'var(--instrument-frame-tertiary-color)';
      markerStrokeColor = 'var(--instrument-frame-tertiary-color)';
      setpointColor = 'var(--instrument-frame-tertiary-color)';
    } else if (this.state === InstrumentState.off) {
      barFillColor = 'transparent';
      markerFillColor = 'var(--instrument-frame-tertiary-color)';
      markerStrokeColor = 'var(--instrument-frame-tertiary-color)';
      setpointColor = 'var(--instrument-frame-tertiary-color)';
    }

    return {
      barFillColor,
      markerFillColor,
      markerStrokeColor,
      setpointColor,
    };
  }

  /**
   * Generate tickmark SVG elements based on configuration
   */
  private generateTickmarks(): SVGTemplateResult[] {
    if (!this.hasScale) {
      return [];
    }

    const tickmarksSvg: SVGTemplateResult[] = [];
    const skipYValues: number[] = [];

    // Drawing height for positioning (excluding padding in both modes)
    const drawingHeight =
      this.computedHeight -
      this.computedPaddingTop -
      this.computedPaddingBottom;

    // Check if bar area should be shown
    const hasBarArea = this.hasBar; // fillRanges disabled

    // 3-stripe model: [bar][tickmarks][labels] on right, [labels][tickmarks][bar] on left
    // Right side: tickmarks start after bar area
    // Left side: tickmarks end before bar area (going leftward)
    const tickmarksBaseX =
      this.position === 'right'
        ? hasBarArea
          ? this.barWidth
          : 0
        : hasBarArea
          ? -this.barWidth
          : 0;

    // 4px gap from edge for all tickmarks (except main tickmarks in flat mode)
    const tickmarkGap = 4;
    const tickmarksX =
      this.position === 'right'
        ? tickmarksBaseX + tickmarkGap
        : tickmarksBaseX - tickmarkGap;

    // Tickmark widths - condensed mode reduces all widths
    const isCondensed = this.scaleType === 'condensed';
    const primaryWidth = isCondensed ? 12 : 24;
    const secondaryWidth = isCondensed ? 4 : 8;
    const tertiaryWidth = isCondensed ? 2 : 4;
    const mainWidth = isCondensed ? 12 : 24; // Main tickmarks are always 24px (or 28px in flat mode)

    // Zero line tickmark (if range includes zero)
    if (this.computedMinValue <= 0 && this.computedMaxValue >= 0) {
      const y = valueToY(
        0,
        this.computedMinValue,
        this.computedMaxValue,
        drawingHeight
      );
      const x1 = tickmarksX;
      const x2 =
        this.position === 'right'
          ? tickmarksX + primaryWidth
          : tickmarksX - primaryWidth;
      tickmarksSvg.push(
        svg`<line x1=${x1} x2=${x2} y1=${y} y2=${y} stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
      );
      skipYValues.push(0);
    }

    // Main tickmarks (first/last at min/max) - bumpers at visual edges
    if (this.hasMainTickbars) {
      const mainTickX =
        this.scaleStyle === 'flat'
          ? tickmarksBaseX // Flat mode: no gap, touch the edge
          : tickmarksX; // Regular mode: use standard gap
      // Flat mode adds 4px gap to mainWidth: 24+4=28 regular, 12+4=16 condensed
      const mainTickWidth =
        this.scaleStyle === 'flat' ? mainWidth + 4 : mainWidth;

      // Top tickmark (at max value)
      const yMax = valueToY(
        this.computedMaxValue,
        this.computedMinValue,
        this.computedMaxValue,
        drawingHeight
      );
      const x1Max = mainTickX;
      const x2Max =
        this.position === 'right'
          ? mainTickX + mainTickWidth
          : mainTickX - mainTickWidth;
      tickmarksSvg.push(
        svg`<line x1=${x1Max} x2=${x2Max} y1=${yMax} y2=${yMax} stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
      );
      skipYValues.push(this.computedMaxValue);

      // Bottom tickmark (at min value)
      const yMin = valueToY(
        this.computedMinValue,
        this.computedMinValue,
        this.computedMaxValue,
        drawingHeight
      );
      const x1Min = mainTickX;
      const x2Min =
        this.position === 'right'
          ? mainTickX + mainTickWidth
          : mainTickX - mainTickWidth;
      tickmarksSvg.push(
        svg`<line x1=${x1Min} x2=${x2Min} y1=${yMin} y2=${yMin} stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
      );
      skipYValues.push(this.computedMinValue);
    }

    // Primary tickmarks (longer)
    if (this.hasPrimaryTickbars && this.computedPrimaryInterval !== undefined) {
      const {svgs, yValues} = this.generateTickmarksAtInterval({
        interval: this.computedPrimaryInterval,
        tickmarksX,
        tickmarksWidth: primaryWidth,
        skipYValues,
        drawingHeight,
      });
      tickmarksSvg.push(...svgs);
      skipYValues.push(...yValues);
    }

    // Secondary tickmarks (shorter)
    if (
      this.hasSecondaryTickbars &&
      this.computedSecondaryInterval !== undefined
    ) {
      const {svgs} = this.generateTickmarksAtInterval({
        interval: this.computedSecondaryInterval,
        tickmarksX,
        tickmarksWidth: secondaryWidth,
        skipYValues,
        drawingHeight,
      });
      tickmarksSvg.push(...svgs);
    }

    // Tertiary tickmarks (shortest)
    if (
      this.hasTertiaryTickbars &&
      this.computedTertiaryInterval !== undefined
    ) {
      const {svgs} = this.generateTickmarksAtInterval({
        interval: this.computedTertiaryInterval,
        tickmarksX,
        tickmarksWidth: tertiaryWidth,
        skipYValues,
        drawingHeight,
      });
      tickmarksSvg.push(...svgs);
    }

    return tickmarksSvg;
  }

  /**
   * Generate tickmarks at a specific interval
   */
  private generateTickmarksAtInterval({
    interval,
    tickmarksX,
    tickmarksWidth,
    skipYValues,
    drawingHeight: _drawingHeight,
  }: {
    interval: number;
    tickmarksX: number;
    tickmarksWidth: number;
    skipYValues: number[];
    drawingHeight: number;
  }): {svgs: SVGTemplateResult[]; yValues: number[]} {
    const tickmarksSvg: SVGTemplateResult[] = [];
    const yValues: number[] = [];

    // Guard against invalid intervals that would cause infinite loops
    if (interval <= 0 || !isFinite(interval)) {
      console.warn(
        `Invalid tickmark interval: ${interval}. Must be a positive number.`
      );
      return {svgs: tickmarksSvg, yValues};
    }

    // Determine if range includes zero
    const includesZero =
      this.computedMinValue <= 0 && this.computedMaxValue >= 0;

    if (includesZero) {
      // Original logic: tickmarks above and below zero
      // Tickmarks above zero
      for (
        let yValue = interval;
        yValue <= this.computedMaxValue;
        yValue += interval
      ) {
        if (skipYValues.includes(yValue)) {
          continue;
        }
        const y = valueToY(
          yValue,
          this.computedMinValue,
          this.computedMaxValue,
          _drawingHeight
        );
        yValues.push(yValue);

        const x1 = tickmarksX;
        const x2 =
          this.position === 'right'
            ? tickmarksX + tickmarksWidth
            : tickmarksX - tickmarksWidth;

        tickmarksSvg.push(
          svg`<line x1=${x1} x2=${x2} y1=${y} y2=${y} stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
        );
      }

      // Tickmarks below zero
      for (
        let yValue = -interval;
        yValue >= this.computedMinValue;
        yValue -= interval
      ) {
        if (skipYValues.includes(yValue)) {
          continue;
        }
        const y = valueToY(
          yValue,
          this.computedMinValue,
          this.computedMaxValue,
          _drawingHeight
        );
        yValues.push(yValue);

        const x1 = tickmarksX;
        const x2 =
          this.position === 'right'
            ? tickmarksX + tickmarksWidth
            : tickmarksX - tickmarksWidth;

        tickmarksSvg.push(
          svg`<line x1=${x1} x2=${x2} y1=${y} y2=${y} stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
        );
      }
    } else {
      // Range doesn't include zero - find first multiple of interval >= minValue
      const startValue = Math.ceil(this.computedMinValue / interval) * interval;

      for (
        let yValue = startValue;
        yValue <= this.computedMaxValue;
        yValue += interval
      ) {
        if (skipYValues.includes(yValue)) {
          continue;
        }
        const y = valueToY(
          yValue,
          this.computedMinValue,
          this.computedMaxValue,
          _drawingHeight
        );
        yValues.push(yValue);

        const x1 = tickmarksX;
        const x2 =
          this.position === 'right'
            ? tickmarksX + tickmarksWidth
            : tickmarksX - tickmarksWidth;

        tickmarksSvg.push(
          svg`<line x1=${x1} x2=${x2} y1=${y} y2=${y} stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
        );
      }
    }

    return {svgs: tickmarksSvg, yValues};
  }

  /**
   * Generate label SVG elements for primary tickmarks
   */
  private generateLabels(): SVGTemplateResult[] {
    if (!this.hasLabels || this.computedPrimaryInterval === undefined) {
      return [];
    }

    // Guard against invalid intervals that would cause infinite loops
    if (
      this.computedPrimaryInterval <= 0 ||
      !isFinite(this.computedPrimaryInterval)
    ) {
      console.warn(
        `Invalid primary interval: ${this.computedPrimaryInterval}. Must be a positive number.`
      );
      return [];
    }

    // Drawing height for positioning (excluding padding in both modes)
    const drawingHeight =
      this.computedHeight -
      this.computedPaddingTop -
      this.computedPaddingBottom;

    const labels: SVGTemplateResult[] = [];
    const fontFamily = 'var(--font-family-main)';
    const fontSize = 'var(--global-typography-ui-label-font-size)';
    const fontColor = 'var(--instrument-tick-mark-label-secondary-color)';

    // Check if bar area should be shown
    const hasBarArea = this.hasBar; // fillRanges disabled

    // 3-stripe model: [bar][tickmarks][labels] on right, [labels][tickmarks][bar] on left
    // Right side: labels start after bar + tickmarks
    // Left side: labels end before tickmarks + bar (going leftward)
    const barSpace = hasBarArea ? this.barWidth : 0;
    const labelX =
      this.position === 'right'
        ? barSpace + this.scaleWidth + 8 // 8px gap after tickmarks
        : -(barSpace + this.scaleWidth + 8); // 8px gap before tickmarks
    const textAnchor = this.position === 'right' ? 'start' : 'end';

    // Labels at primary interval
    const interval = this.computedPrimaryInterval;

    // Determine if range includes zero
    const includesZero =
      this.computedMinValue <= 0 && this.computedMaxValue >= 0;

    if (includesZero) {
      // Range includes zero - generate labels above and below zero
      // Labels above zero
      for (
        let yValue = 0;
        yValue <= this.computedMaxValue;
        yValue += interval
      ) {
        const y = valueToY(
          yValue,
          this.computedMinValue,
          this.computedMaxValue,
          drawingHeight
        );
        labels.push(
          svg`<text 
            x=${labelX} 
            y=${y} 
            text-anchor=${textAnchor} 
            dominant-baseline="middle"
            font-family=${fontFamily}
            font-size=${fontSize}
            fill=${fontColor}>${yValue}</text>`
        );
      }

      // Labels below zero
      for (
        let yValue = -interval;
        yValue >= this.computedMinValue;
        yValue -= interval
      ) {
        const y = valueToY(
          yValue,
          this.computedMinValue,
          this.computedMaxValue,
          drawingHeight
        );
        labels.push(
          svg`<text 
            x=${labelX} 
            y=${y} 
            text-anchor=${textAnchor} 
            dominant-baseline="middle"
            font-family=${fontFamily}
            font-size=${fontSize}
            fill=${fontColor}>${yValue}</text>`
        );
      }
    } else {
      // Range doesn't include zero - find first multiple of interval >= minValue
      // This matches the logic in generateTickmarksAtInterval()
      const startValue = Math.ceil(this.computedMinValue / interval) * interval;

      for (
        let yValue = startValue;
        yValue <= this.computedMaxValue;
        yValue += interval
      ) {
        const y = valueToY(
          yValue,
          this.computedMinValue,
          this.computedMaxValue,
          drawingHeight
        );
        labels.push(
          svg`<text 
            x=${labelX} 
            y=${y} 
            text-anchor=${textAnchor} 
            dominant-baseline="middle"
            font-family=${fontFamily}
            font-size=${fontSize}
            fill=${fontColor}>${yValue}</text>`
        );
      }
    }

    return labels;
  }

  /**
   * COMMENTED OUT: Generate fill range rectangles for multiple value ranges
   * This functionality is disabled for now - using single fill from zero to value instead.
   * May be re-enabled in the future for multiple range highlighting.
   *
   * Fill ranges occupy the same area as the bar container (white rounded background)
   * Uses masking technique similar to thruster to clip fill ranges to rounded container shape
   */
  // private generateFillRanges(): SVGTemplateResult[] {
  //   if (!this.fillRanges.length) {
  //     return [];
  //   }

  //   // Drawing height for positioning (excluding padding in both modes)
  //   const drawingHeight =
  //     this.computedHeight -
  //     this.computedPaddingTop -
  //     this.computedPaddingBottom;

  //   // Use same dimensions as bar container for perfect overlap
  //   // Bar is positioned from x=0 to x=barWidth (right side) or x=-barWidth to x=0 (left side)
  //   const boxX = this.position === 'right' ? 0 : -this.barWidth;
  //   const boxWidth = this.barWidth;
  //   const r = 8; // Border radius to match bar container

  //   // Create mask for rounded container shape (same as bar container)
  //   const maskId = `barVerticalFillRangeMask-${Math.random().toString(36).substr(2, 9)}`;
  //   const mask = svg`
  //     <defs>
  //       <mask id=${maskId}>
  //         <rect
  //           x=${boxX}
  //           y=${-drawingHeight / 2}
  //           width=${boxWidth}
  //           height=${drawingHeight}
  //           rx=${r}
  //           ry=${r}
  //           fill="white"
  //           />
  //           <!-- NOTE: vector-effect="non-scaling-stroke" is not necessary for this -->
  //       </mask>
  //     </defs>`;

  //   const fillRects = this.fillRanges.map((range) => {
  //     // Clamp values to visible scale to prevent coordinate overflow
  //     const clampedMin = Math.max(
  //       Math.min(range.min, this.computedMaxValue),
  //       this.computedMinValue
  //     );
  //     const clampedMax = Math.max(
  //       Math.min(range.max, this.computedMaxValue),
  //       this.computedMinValue
  //     );

  //     const minY = valueToY(
  //       clampedMin,
  //       this.computedMinValue,
  //       this.computedMaxValue,
  //       drawingHeight
  //     );
  //     const maxY = valueToY(
  //       clampedMax,
  //       this.computedMinValue,
  //       this.computedMaxValue,
  //       drawingHeight
  //     );
  //     const boxY = Math.min(minY, maxY);
  //     const boxHeight = Math.abs(maxY - minY);

  //     const fill = range.fill ?? 'var(--instrument-regular-tertiary-color)';

  //     // Use rect masked by rounded container shape
  //     return svg`<rect
  //       mask="url(#${maskId})"
  //       width=${boxWidth}
  //       height=${boxHeight}
  //       x=${boxX}
  //       y=${boxY}
  //       fill=${fill}
  //       stroke="none"/>`;
  //   });

  //   return [mask, ...fillRects];
  // }

  /**
   * Generate bar fill representing current value (adapted from thruster bar)
   * Supports two modes:
   * - 'fill': Fills from zero to current value position
   * - 'tint': Fills from fillMin to fillMax with horizontal marker line at value
   * Uses masking to match bar container dimensions precisely.
   */
  private generateBarFill(): SVGTemplateResult | typeof nothing {
    // Only show bar fill if value is defined and hasBar is enabled
    if (this.value === undefined || !this.hasBar) {
      return nothing;
    }

    // Drawing height for positioning (excluding padding)
    const drawingHeight =
      this.computedHeight -
      this.computedPaddingTop -
      this.computedPaddingBottom;

    // Use same dimensions as bar container for perfect overlap
    // Bar is positioned from x=0 to x=barWidth (right side) or x=-barWidth to x=0 (left side)
    const boxX = this.position === 'right' ? 0 : -this.barWidth;
    const boxWidth = this.barWidth;
    const r = 8; // Border radius to match bar container

    // Get colors
    const colors = this.barVerticalColors();

    // Create mask for rounded container shape (same as bar container)
    const maskId = `barVerticalFillMask-${Math.random().toString(36).substr(2, 9)}`;
    const mask = svg`
      <defs>
        <mask id=${maskId}>
          <rect 
            x=${boxX} 
            y=${-drawingHeight / 2} 
            width=${boxWidth} 
            height=${drawingHeight}
            rx=${r}
            ry=${r}
            fill="white" 
            />
            <!-- NOTE: vector-effect="non-scaling-stroke" is not necessary for mask -->
        </mask>
      </defs>`;

    if (this.fillMode === 'tint') {
      // Tint mode: Fill from fillMin to fillMax, add marker line at value
      // Defaults: fillMin=0, fillMax=value
      const effectiveFillMin = this.fillMin ?? 0;
      const effectiveFillMax = this.fillMax ?? this.value;

      const minY = valueToY(
        effectiveFillMin,
        this.computedMinValue,
        this.computedMaxValue,
        drawingHeight
      );
      const maxY = valueToY(
        effectiveFillMax,
        this.computedMinValue,
        this.computedMaxValue,
        drawingHeight
      );

      // Fill from fillMin to fillMax
      const fillY = Math.min(minY, maxY);
      const fillHeight = Math.abs(maxY - minY);

      // Marker line at value position (8px height, centered on value)
      const valueY = valueToY(
        this.value,
        this.computedMinValue,
        this.computedMaxValue,
        drawingHeight
      );
      const markerHeight = 8;
      const markerY = valueY - markerHeight / 2;

      return svg`
        ${mask}
        <rect
          mask="url(#${maskId})"
          x=${boxX}
          y=${fillY}
          width=${boxWidth}
          height=${fillHeight}
          fill=${colors.barFillColor}
          stroke="none"
        />
        <rect
          x=${boxX}
          y=${markerY}
          width=${boxWidth}
          height=${markerHeight}
          rx="4"
          fill=${colors.markerFillColor}
          stroke=${colors.markerStrokeColor}
          vector-effect="non-scaling-stroke"
        />
      `;
    } else {
      // Fill mode: Fill from zero to value (default behavior)
      const valueY = valueToY(
        this.value,
        this.computedMinValue,
        this.computedMaxValue,
        drawingHeight
      );
      const zeroY = valueToY(
        0,
        this.computedMinValue,
        this.computedMaxValue,
        drawingHeight
      );

      // Fill from zero line to value
      const fillY = Math.min(valueY, zeroY);
      const fillHeight = Math.abs(valueY - zeroY);

      return svg`
        ${mask}
        <rect
          mask="url(#${maskId})"
          x=${boxX}
          y=${fillY}
          width=${boxWidth}
          height=${fillHeight}
          fill=${colors.barFillColor}
          stroke="none"
        />
      `;
    }
  }

  /**
   * Generate bar container/background (optional)
   */
  private generateBarContainer(): SVGTemplateResult | typeof nothing {
    if (!this.hasBar) {
      return nothing;
    }

    // Drawing height for positioning (excluding padding in both modes)
    const drawingHeight =
      this.computedHeight -
      this.computedPaddingTop -
      this.computedPaddingBottom;

    const r = 8;
    const strokeWidth = 1;

    // Rectangle dimensions
    let rectX = this.position === 'right' ? 0 : -this.barWidth;
    let rectY = -drawingHeight / 2;
    let rectWidth = this.barWidth;
    let rectHeight = drawingHeight;

    // Stroke-aware adjustments for pixel-perfect rendering at boundaries
    const viewBoxMinX = this.position === 'right' ? 0 : -this.barWidth;
    const viewBoxMaxX = this.position === 'right' ? this.barWidth : 0;
    const adjustedX = adjustRectForStroke(
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
      -drawingHeight / 2,
      drawingHeight / 2,
      strokeWidth
    );
    rectY = adjustedY.y;
    rectHeight = adjustedY.height;

    // Bar container is always white background
    const fillColor = 'var(--instrument-frame-primary-color)';
    const strokeColor = 'var(--instrument-frame-tertiary-color)';

    return svg`
      <rect
        x=${rectX}
        y=${rectY}
        width=${rectWidth}
        height=${rectHeight}
        rx=${r}
        ry=${r}
        fill=${fillColor}
        stroke=${strokeColor} 
        vector-effect="non-scaling-stroke"/>
    `;
  }

  /**
   * Generate setpoint indicator (adapted from thruster setpointSvg)
   */
  private generateSetpoint(): SVGTemplateResult | typeof nothing {
    if (!this.hasSetpoint || this.setpoint === undefined) {
      return nothing;
    }

    // Drawing height for positioning (excluding padding in both modes)
    const drawingHeight =
      this.computedHeight -
      this.computedPaddingTop -
      this.computedPaddingBottom;

    // Check if setpoint is at zero (within deadband)
    const setpointAtZero =
      Math.abs(this.setpoint) < this.setpointAtZeroDeadband;

    // Calculate Y position for setpoint
    const yPos = setpointAtZero
      ? 0
      : valueToY(
          this.setpoint,
          this.computedMinValue,
          this.computedMaxValue,
          drawingHeight
        );

    // Get colors based on state and atSetpoint status
    const colors = this.barVerticalColors();
    const strokeColor = 'var(--border-silhouette-color)';

    // Determine if setpoint should be filled based on state (matching thruster logic)
    const filled =
      this.state === InstrumentState.inCommand ||
      this.state === InstrumentState.off;

    // Check if value is at setpoint to determine size
    const isAtSetpoint = this.calculateAtSetpoint();
    // Smaller size (80%) when: at setpoint, at zero, or off state
    const scale =
      isAtSetpoint || setpointAtZero || this.state === InstrumentState.off
        ? 0.8
        : 1.0;

    // Setpoint marker path (triangle pointing horizontally)
    // Filled and hollow versions
    const filledPath =
      'M23.5119 8C24.6981 6.35191 23.5696 4 21.5926 4L2.39959 4C0.422598 4 -0.705911 6.35191 0.480283 8L11.9961 24L23.5119 8Z';
    const hollowPath =
      'M18.5836 8L5.4086 8L11.9961 17.1526L18.5836 8ZM23.5119 8C24.6981 6.35191 23.5696 4 21.5926 4L2.39959 4C0.422598 4 -0.705911 6.35191 0.480283 8L11.9961 24L23.5119 8Z';
    const path = filled ? filledPath : hollowPath;

    // Position setpoint marker based on position property
    // Right side: marker on right, pointing right (rotate 90°)
    // Left side: marker on left, pointing left (rotate 90° + scale(-1, 1) for horizontal flip)
    // Position at tickmarksBaseX+8 to align with tertiary tickmarks outer edge (gap:4px + width:4px)
    const hasBarArea = this.hasBar; // fillRanges disabled
    const tickmarksBaseX =
      this.position === 'right'
        ? hasBarArea
          ? this.barWidth
          : 0
        : hasBarArea
          ? -this.barWidth
          : 0;
    const xOffset =
      this.position === 'right' ? tickmarksBaseX + 8 : tickmarksBaseX - 8;
    const rotation = 90; // Always rotate 90° from vertical
    const flipScale = this.position === 'left' ? 'scale(-1, 1)' : ''; // Flip horizontally for left

    // Generate unique IDs to avoid conflicts when multiple instances are on the same page
    const setpointId = `barVerticalSetpoint-${Math.random().toString(36).substr(2, 9)}`;
    const maskId = `barVerticalSetpointMask-${Math.random().toString(36).substr(2, 9)}`;

    return svg`
      <defs>
        <g id=${setpointId}>
          <path fill-rule="evenodd" clip-rule="evenodd" transform="translate(24 -12) rotate(${rotation})" d=${path} vector-effect="non-scaling-stroke"/>
        </g>
        <mask id=${maskId}>
          <rect x="-20" y="-20" width="50" height="50" fill="white" />
          <use href="#${setpointId}" fill="black" />
        </mask>
      </defs>
      <g transform="translate(${xOffset} ${yPos}) ${flipScale} scale(${scale})" style="transition: transform 200ms ease-in-out;">
        <use href="#${setpointId}" fill=${colors.setpointColor} stroke="none"/>
        <use href="#${setpointId}" mask="url(#${maskId})" fill="none" stroke=${strokeColor} stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      </g>
    `;
  }

  /**
   * Generate advice overlay elements
   */
  private generateAdviceOverlays(): SVGTemplateResult[] {
    if (!this.hasAdvice || !this.advice.length) {
      return [];
    }

    // Convert advice with hinted boolean to advice with dynamic state based on setpoint
    const rawAdvices = convertVerticalBarAdvices(this.advice, this.setpoint);

    // Drawing height for positioning (excluding padding in both modes)
    const drawingHeight =
      this.computedHeight -
      this.computedPaddingTop -
      this.computedPaddingBottom;

    const hasBarArea = this.hasBar; // fillRanges disabled
    // When hasBar=false, fallback to 'inner' position
    const effectiveAdvicePosition = hasBarArea ? this.advicePosition : 'inner';

    // Calculate tickmarksBaseX matching generateTickmarks() logic
    const tickmarksBaseX =
      this.position === 'right'
        ? hasBarArea
          ? this.barWidth
          : 0
        : hasBarArea
          ? -this.barWidth
          : 0;

    return rawAdvices.map((a) =>
      renderAdvice(
        drawingHeight,
        this.computedMinValue,
        this.computedMaxValue,
        this.barWidth,
        this.scaleWidth,
        this.position,
        effectiveAdvicePosition,
        a,
        tickmarksBaseX
      )
    );
  }

  override render() {
    const barContainer = this.generateBarContainer();
    // const fillRanges = this.generateFillRanges(); // Disabled - using single fill instead
    const barFill = this.generateBarFill();
    const tickmarks = this.generateTickmarks();
    const labels = this.generateLabels();
    const setpoint = this.generateSetpoint();
    const adviceOverlays = this.generateAdviceOverlays();

    // Check if bar area should be shown
    const hasBarArea = this.hasBar; // fillRanges disabled

    // Calculate total width dynamically based on what's actually shown
    // 3-stripe model: [bar][scale][labels] on right, [labels][scale][bar] on left
    const barSpace = hasBarArea ? this.barWidth : 0;
    const scaleSpace = this.hasScale ? this.scaleWidth : 0;
    const labelSpace = this.hasLabels ? this.labelWidth : 0;
    const viewBoxWidth = barSpace + scaleSpace + labelSpace;
    const viewBoxHeight = this.computedHeight; // Full height including padding

    // ViewBox positioning: right side starts at 0, left side ends at 0
    const viewBoxX =
      this.position === 'right' ? 0 : -(barSpace + scaleSpace + labelSpace);

    // Center viewBox vertically
    const viewBoxY = -this.computedHeight / 2;

    return html`
      <svg
        width="${viewBoxWidth}px"
        height="${this.computedHeight}px"
        viewBox="${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}"
        preserveAspectRatio="none"
        style="display: block;"
      >
        ${barContainer} ${barFill} ${tickmarks} ${labels} ${adviceOverlays}
        ${setpoint}
      </svg>
    `;
  }

  // No shadow DOM - render directly to light DOM for easier positioning
  protected override createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-bar-vertical': ObcBarVertical;
  }
}
