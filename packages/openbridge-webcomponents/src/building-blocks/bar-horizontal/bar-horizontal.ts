import {LitElement, html} from 'lit';
import {property, state} from 'lit/decorators.js';
import type {PropertyValues} from 'lit';
import {customElement} from '../../decorator.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {CHART_DIMENSIONS} from '../../charthelpers/constants.js';
import {
  InstrumentState,
  FrameStyle,
  BorderRadiusPosition,
  Priority,
} from '../../navigation-instruments/types.js';
import type {AdviceType} from '../../navigation-instruments/watch/advice.js';
import type {
  ExternalScaleAdvice,
  ExternalScaleConfig,
} from '../external-scale/external-scale.js';
import {
  computeExternalScaleViewBox,
  computeFixedAspectRatioScale,
  computeExternalScaleLayout,
  renderExternalScale,
  toExternalScaleLayoutConfig,
  computeScaleDimensionsForReport,
  computeExternalScaleEffectiveBarThickness,
  readExternalScaleBorderRadiusPx,
  startExternalScaleBorderRadiusObserver,
  ScaleType,
  FillMode,
  AdvicePosition,
  BarContainerStyle,
  ExternalScaleOrientation,
  ExternalScaleSide,
} from '../external-scale/external-scale.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';

// Re-export shared enums for convenience
export {
  ScaleType,
  FillMode,
  AdvicePosition,
  FrameStyle,
  BorderRadiusPosition,
  InstrumentState,
  Priority,
  BarContainerStyle,
  ExternalScaleSide,
};

/**
 * Horizontal SVG bar + external scale.
 *
 * This is a thin web-component wrapper around the pure SVG building-block renderer in `external-scale.ts`.
 *
 * It sets up the outer `<svg>`/`viewBox` for a horizontal scale and delegates rendering/layout to:
 * - `computeExternalScaleLayout(...)`
 * - `renderExternalScale(config)`
 *
 * For renderer documentation see: **Building Blocks/External Scale**.
 *
 * For more test cases (Auto at-setpoint detection, Manual at-setpoint control, Deadband tuning and Zero snap behavior) see: **Building Blocks/Bar Vertical**.
 *
 * Set `priority` to `Priority.enhanced` to use the blue/enhanced color palette
 * for bar fill and setpoint instead of the default gray/regular palette
 * (default: `Priority.regular`).
 */
@customElement('obc-bar-horizontal')
export class ObcBarHorizontal extends SetpointMixin(LitElement, {
  defaultDeadband: 1,
}) {
  /** Minimum scale value (manual mode) */
  @property({type: Number}) minValue = 0;
  /** Maximum scale value (manual mode) */
  @property({type: Number}) maxValue = 100;

  /** Total width in pixels (including padding bands) */
  @property({type: Number}) width = 320;

  /** Padding left of the drawing area */
  @property({type: Number}) paddingLeft = CHART_DIMENSIONS.CANVAS_PADDING;

  /** Padding right of the drawing area */
  @property({type: Number}) paddingRight = CHART_DIMENSIONS.CANVAS_PADDING;

  /** Which side this scale lives on */
  @property({type: String}) side: ExternalScaleSide = ExternalScaleSide.bottom;

  /**
   * When true, freezes all internal calculations and scales the entire component
   * proportionally (like CSS transform:scale), except label font-size remains constant.
   * When false (default), dimensions react to component properties.
   */
  @property({type: Boolean})
  fixedAspectRatio = false;

  /**
   * Reference size for proportional scaling when fixedAspectRatio is true.
   * At this width, the scale renders at native 1:1 (matches Figma design).
   * Above this width, the scale grows proportionally; below, it shrinks.
   * @default 384
   */
  @property({type: Number})
  scaleReferenceSize = 384;

  @state()
  private _scale = 1;

  // ResizeController automatically subscribes/unsubscribes based on component lifecycle
  // @ts-expect-error - Controller is used for side effects, not accessed directly
  private _resizeController = new ResizeController(this, {
    callback: (entries) => {
      if (!this.fixedAspectRatio) return;

      const entry = entries[0];
      if (!entry) return;

      // Use the centralized function that computes scale based on reference size
      // For horizontal scales, compare container width to reference size
      const containerMainAxisSize = entry.contentRect.width;

      this._scale = computeFixedAspectRatioScale({
        orientation: ExternalScaleOrientation.horizontal,
        containerMainAxisSize,
        scaleReferenceSize: this.scaleReferenceSize,
      });

      // console.debug(`[bar-horizontal] ResizeController:`, {
      //   fixedAspectRatio: this.fixedAspectRatio,
      //   containerWidth: containerMainAxisSize,
      //   scaleReferenceSize: this.scaleReferenceSize,
      //   computedScale: this._scale,
      //   width: this.width,
      // });

      // Report scaled dimensions to parent chart
      this.reportDimensions();
    },
  });

  // Bands (thickness)
  /** Show scale tickmarks */
  @property({type: Boolean, attribute: false}) hasScale = true;
  /** Hide numerical value labels at primary tickmarks */
  @property({type: Boolean}) hideLabels = false;
  /** Show bar */
  @property({type: Boolean}) hasBar = false;
  /** Show background behind the scale tickmarks. */
  @property({type: Boolean})
  scaleBackground = false;
  /**
   * Bar container background style.
   * When undefined, defaults based on scaleBackground.
   * Set explicitly to override: 'primary' (lighter) or 'secondary' (gray).
   */
  @property({type: String})
  barContainerStyle?: BarContainerStyle = undefined;
  /** Bar/fill thickness in pixels */
  @property({type: Number}) barThickness = 24;
  /** Tickmark band thickness in pixels. */
  @property({type: Number}) tickThickness = 24;
  /** Label band thickness in pixels. */
  @property({type: Number}) labelThickness = 60;

  // Tick configuration
  /**
   * Array of values for main tickmarks. When undefined, no main tickmarks shown.
   * When empty array [], defaults to [minValue, 0, maxValue].
   */
  @property({attribute: false}) mainTickmarks?: number[] = [];
  /**
   * Interval for primary (longest) tickmarks with labels (minimum 1).
   * When undefined, no primary tickmarks are shown.
   */
  @property({type: Number}) primaryTickmarkInterval?: number = undefined;
  /**
   * Interval for secondary (medium) tickmarks (minimum 1).
   * When undefined, no secondary tickmarks are shown.
   */
  @property({type: Number}) secondaryTickmarkInterval?: number = undefined;
  /**
   * Interval for tertiary (shortest) tickmarks (minimum 1).
   * When undefined, no tertiary tickmarks are shown.
   */
  @property({type: Number}) tertiaryTickmarkInterval?: number = undefined;
  /** Scale display mode: regular or condensed (shorter ticks) */
  @property({type: String}) scaleType: ScaleType = ScaleType.regular;
  /** Frame style: regular (4px gap for all), flat (main tickmarks touch edge), framed, or instrument */
  @property({type: String}) frameStyle: FrameStyle = FrameStyle.regular;
  /** Border radius position based on component layout */
  @property({type: String})
  borderRadiusPosition?: BorderRadiusPosition = undefined;

  /**
   * When true, the component is used inside an instrument (e.g., gauge-trend).
   * In this mode, only label font size responds to .obc-component-size-* CSS classes.
   * Border radius and bar thickness use explicit values or defaults, not CSS variables.
   * @default false
   */
  @property({type: Boolean})
  instrumentMode = false;

  /**
   * Explicit border radius value in pixels.
   * When instrumentMode=true, this value is used directly (defaults to 8px for regular, 4px for condensed).
   * When instrumentMode=false, this is ignored and border radius is read from CSS variable.
   */
  @property({type: Number})
  borderRadius?: number = undefined;

  @state()
  private _computedBorderRadius?: number;

  private _borderRadiusObserver?: MutationObserver;

  // @ts-expect-error - Controller is used for side effects, not accessed directly
  private _borderRadiusResizeController = new ResizeController(this, {
    callback: () => {
      // Skip CSS variable reading in instrument mode
      if (!this.instrumentMode) {
        this._refreshBorderRadiusFromCssVar();
      }
    },
  });

  // Values
  /** Color priority: enhanced uses blue instrument colors for bar fill and setpoint */
  @property({type: String}) priority: Priority = Priority.regular;
  /** Fill visualization mode: fill or tint */
  @property({type: String}) fillMode: FillMode = FillMode.fill;
  /** Minimum fill value for tint mode (defaults to 0) */
  @property({type: Number}) fillMin?: number = undefined;
  /** Maximum fill value for tint mode (defaults to value) */
  @property({type: Number}) fillMax?: number = undefined;
  /** Current value (bar fill level) */
  @property({type: Number}) value?: number = undefined;

  /** Instrument state (affects colors and some marker behavior) */
  @property({type: String}) state: InstrumentState = InstrumentState.active;

  // Advice
  /** Advice overlay positioning: center (in bar), inner (covers minor ticks), outer (no overlap) */
  @property({type: String}) advicePosition: AdvicePosition =
    AdvicePosition.inner;
  /**
   * Advice/alert overlays with state and positioning.
   * When undefined or empty, no advice shown.
   */
  @property({attribute: false}) advices?: Array<{
    min: number;
    max: number;
    type: AdviceType;
    hinted: boolean;
  }> = [];

  /**
   * When true, displays a dot indicator at the current value position.
   * The dot is rendered in the scale band, touching its inner edge (towards the chart).
   * This provides an alternative to bar fill for highlighting the current value.
   * @default false
   */
  @property({type: Boolean}) highlightCurrentValue = false;

  override render() {
    // When fixedAspectRatio is true, use scaleReferenceSize for the viewBox length.
    // This makes the SVG render at the "design reference size" and then scale
    // proportionally to fit the actual container via preserveAspectRatio="xMidYMid meet".
    // The _scale CSS variable counter-scales text labels to maintain constant visual size.
    const effectiveLength = this.fixedAspectRatio
      ? this.scaleReferenceSize
      : this.width;

    // The parent chart component (chart-line-base) calculates and passes the correct
    // viewBox padding values when fixedAspectRatioScaling is enabled. The padding is
    // pre-scaled to: basePadding * scaleReferenceSize / referenceWidth
    // This ensures the visual padding matches the chart's Canvas padding at any aspect ratio.

    // console.debug(`[bar-horizontal] render:`, {
    //   fixedAspectRatio: this.fixedAspectRatio,
    //   width: this.width,
    //   scaleReferenceSize: this.scaleReferenceSize,
    //   effectiveLength,
    //   scale: this._scale,
    //   paddingLeft: this.paddingLeft,
    //   paddingRight: this.paddingRight,
    // });

    const config: ExternalScaleConfig = {
      orientation: ExternalScaleOrientation.horizontal,
      side: this.side,
      length: effectiveLength,
      paddingStart: this.paddingLeft,
      paddingEnd: this.paddingRight,
      minValue: this.minValue,
      maxValue: this.maxValue,
      hasScale: this.hasScale,
      labels: !this.hideLabels,
      hasBar: this.hasBar,
      scaleBackground: this.scaleBackground,
      barContainerStyle: this.barContainerStyle,
      barThickness: this.barThickness,
      tickThickness: this.tickThickness,
      labelThickness: this.labelThickness,
      borderRadius: this._getEffectiveBorderRadius(),
      mainTickmarks: this.mainTickmarks,
      primaryTickmarkInterval: this.primaryTickmarkInterval,
      secondaryTickmarkInterval: this.secondaryTickmarkInterval,
      tertiaryTickmarkInterval: this.tertiaryTickmarkInterval,
      scaleType: this.scaleType,
      frameStyle: this.frameStyle,
      borderRadiusPosition: this.borderRadiusPosition,
      priority: this.priority,
      setpointOverride: this.setpointOverride,
      fillMode: this.fillMode,
      fillMin: this.fillMin,
      fillMax: this.fillMax,
      value: this.value,
      setpoint: this.setpoint,
      newSetpoint: this.newSetpoint,
      atSetpoint: this.atSetpoint,
      disableAutoAtSetpoint: this.disableAutoAtSetpoint,
      autoAtSetpointDeadband: this.autoAtSetpointDeadband,
      setpointAtZeroDeadband: this.setpointAtZeroDeadband,
      animateSetpoint: this.animateSetpoint,
      departingNewSetpoint: this.departingNewSetpoint,
      state: this.state,
      touching: this.touching,
      advicePosition: this.advicePosition,
      advices: this.advices as ExternalScaleAdvice[],
      fixedAspectRatio: this.fixedAspectRatio,
      instrumentMode: this.instrumentMode,
      highlightCurrentValue: this.highlightCurrentValue,
    };

    const layout = computeExternalScaleLayout(
      toExternalScaleLayoutConfig(config)
    );

    const parts = renderExternalScale(config);

    const viewBox = computeExternalScaleViewBox(
      {orientation: config.orientation, length: effectiveLength},
      layout
    );
    const preserveAspectRatio = this.fixedAspectRatio
      ? 'xMidYMid meet'
      : 'none';

    return html`
      <svg
        width=${this.fixedAspectRatio ? '100%' : `${this.width}px`}
        height=${this.fixedAspectRatio ? '100%' : `${viewBox.height}px`}
        viewBox="${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}"
        preserveAspectRatio="${preserveAspectRatio}"
        style="--scale: ${this.fixedAspectRatio ? this._scale : 1};"
        part="svg"
      >
        ${parts.barContainer} ${parts.barFill} ${parts.scaleBackground}
        ${parts.tickmarks} ${parts.labels} ${parts.adviceOverlays}
        ${parts.currentValueDot} ${parts.setpoint}
      </svg>
    `;
  }

  override updated(changed: PropertyValues) {
    super.updated(changed);

    if (changed.has('scaleType')) {
      this._refreshBorderRadiusFromCssVar();
    }

    // Update host styles when fixedAspectRatio changes
    if (changed.has('fixedAspectRatio')) {
      if (this.fixedAspectRatio) {
        this._applyFixedAspectRatioStyles();
        // Force initial scale calculation based on current size
        this._updateScaleFromCurrentSize();
      } else {
        this._removeFixedAspectRatioStyles();
        this._scale = 1;
      }
    }

    // Also recalculate scale when scaleReferenceSize changes
    if (changed.has('scaleReferenceSize') && this.fixedAspectRatio) {
      this._updateScaleFromCurrentSize();
    }

    // Report dimensions to parent chart when layout-affecting properties change.
    // In fixedAspectRatio mode, resize events also trigger reportDimensions() via ResizeController.
    // In regular mode, we report on every update to keep parent chart in sync.
    // Layout-affecting properties change the computed thickness and must notify the parent
    // even in fixedAspectRatio mode to keep chart padding accurate.
    const layoutChanged =
      changed.has('side') ||
      changed.has('hideLabels') ||
      changed.has('hasScale') ||
      changed.has('hasBar') ||
      changed.has('barThickness') ||
      changed.has('tickThickness') ||
      changed.has('labelThickness') ||
      changed.has('scaleType') ||
      changed.has('borderRadiusPosition') ||
      changed.has('borderRadius');

    if (!this.fixedAspectRatio || layoutChanged) {
      this.reportDimensions();
    }
  }

  /**
   * Report scale dimensions to parent chart component.
   * When fixedAspectRatio=true, reports the actual visual (scaled) thickness
   * so the chart can correctly reserve space for the scale.
   * When fixedAspectRatio=false, reports the base/unscaled thickness.
   */
  private reportDimensions() {
    const effectiveBarThickness = computeExternalScaleEffectiveBarThickness({
      hasBar: this.hasBar,
      barThickness: this.barThickness,
      borderRadius: this._getEffectiveBorderRadius(),
      scaleType: this.scaleType,
    });

    // Use scaleReferenceSize for layout calculation when in fixedAspectRatio mode
    // This ensures consistent layout dimensions based on the design reference size
    const effectiveLength = this.fixedAspectRatio
      ? this.scaleReferenceSize
      : this.width;

    const baseDimensions = computeScaleDimensionsForReport({
      orientation: ExternalScaleOrientation.horizontal,
      side: this.side,
      hasBar: this.hasBar,
      hasScale: this.hasScale,
      labels: !this.hideLabels,
      barThickness: effectiveBarThickness,
      tickThickness: this.tickThickness,
      labelThickness: this.labelThickness,
      length: effectiveLength,
      scaleType: this.scaleType,
    });

    // When fixedAspectRatio=true, the SVG scales proportionally via preserveAspectRatio="meet".
    // The visual thickness = baseThickness × scale, where scale = containerSize / scaleReferenceSize.
    // Report the actual visual thickness so the chart can reserve the correct space.
    const dimensions = this.fixedAspectRatio
      ? {
          ...baseDimensions,
          thickness: Math.round(baseDimensions.thickness * this._scale),
        }
      : baseDimensions;

    // console.debug(`[bar-horizontal] reportDimensions:`, {
    //   fixedAspectRatio: this.fixedAspectRatio,
    //   side: dimensions.side,
    //   thickness: dimensions.thickness,
    //   scale: this._scale,
    //   width: this.width,
    //   scaleReferenceSize: this.scaleReferenceSize,
    //   effectiveLength,
    //   hasBar: this.hasBar,
    //   hasScale: this.hasScale,
    //   hideLabels: this.hideLabels,
    //   barThickness: this.barThickness,
    //   tickThickness: this.tickThickness,
    //   labelThickness: this.labelThickness,
    // });

    this.dispatchEvent(
      new CustomEvent('scale-dimensions-changed', {
        detail: dimensions,
        bubbles: true,
        composed: true,
      })
    );
  }

  protected override createRenderRoot() {
    return this;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    // Only read from CSS variable and observe changes when not in instrument mode
    if (!this.instrumentMode) {
      this._refreshBorderRadiusFromCssVar();
      this._startBorderRadiusObserver();
    }

    // Ensure the element fills its container when in fixedAspectRatio mode
    // Custom elements are display:inline by default, which doesn't work for percentage-based sizing
    if (this.fixedAspectRatio) {
      this._applyFixedAspectRatioStyles();
    }
  }

  override disconnectedCallback(): void {
    this._borderRadiusObserver?.disconnect();
    this._borderRadiusObserver = undefined;
    super.disconnectedCallback();
  }

  private _startBorderRadiusObserver(): void {
    this._borderRadiusObserver?.disconnect();

    this._borderRadiusObserver = startExternalScaleBorderRadiusObserver(
      this,
      () => this._refreshBorderRadiusFromCssVar()
    );
  }

  /**
   * Apply CSS styles needed for fixedAspectRatio mode.
   * Custom elements are display:inline by default, which doesn't work with percentage-based sizing.
   * We need display:block and width:100% to fill the slot container.
   */
  private _applyFixedAspectRatioStyles(): void {
    this.style.display = 'block';
    this.style.width = '100%';
    this.style.height = 'auto';
  }

  /**
   * Remove fixed aspect ratio styles when switching back to pixel mode.
   */
  private _removeFixedAspectRatioStyles(): void {
    this.style.display = '';
    this.style.width = '';
    this.style.height = '';
  }

  /**
   * Calculate scale based on current element size.
   * Called when fixedAspectRatio is enabled or scaleReferenceSize changes.
   */
  private _updateScaleFromCurrentSize(): void {
    // Use requestAnimationFrame to ensure layout is complete
    requestAnimationFrame(() => {
      const containerWidth = this.clientWidth;
      if (containerWidth > 0) {
        this._scale = computeFixedAspectRatioScale({
          orientation: ExternalScaleOrientation.horizontal,
          containerMainAxisSize: containerWidth,
          scaleReferenceSize: this.scaleReferenceSize,
        });
        this.requestUpdate();
        // Report updated dimensions to parent (matches pattern in ResizeController and _refreshBorderRadiusFromCssVar)
        this.reportDimensions();
      }
    });
  }

  private _refreshBorderRadiusFromCssVar(): void {
    // Skip CSS variable reading in instrument mode
    if (this.instrumentMode) return;

    const next = readExternalScaleBorderRadiusPx(this, this.scaleType);

    if (this._computedBorderRadius !== next) {
      this._computedBorderRadius = next;
    }

    // In fixed-aspect-ratio mode, recompute scale when border radius changes
    // (border radius affects effective bar thickness and therefore viewBox)
    if (this.fixedAspectRatio) {
      const rect = this.getBoundingClientRect();
      if (rect.width > 0) {
        this._scale = computeFixedAspectRatioScale({
          orientation: ExternalScaleOrientation.horizontal,
          containerMainAxisSize: rect.width,
          scaleReferenceSize: this.scaleReferenceSize,
        });
        // Report updated dimensions
        this.reportDimensions();
      }
    }
  }

  /**
   * Get the effective border radius to use.
   * In instrument mode: use explicit borderRadius prop or default based on scaleType.
   * In normal mode: use CSS variable computed value.
   */
  private _getEffectiveBorderRadius(): number {
    if (this.instrumentMode) {
      // In instrument mode, use explicit value or default
      if (this.borderRadius !== undefined) {
        return this.borderRadius;
      }
      // Default: 8px for regular, 4px for condensed
      return this.scaleType === ScaleType.condensed ? 4 : 8;
    }
    // Normal mode: use CSS variable computed value
    return (
      this._computedBorderRadius ??
      (this.scaleType === ScaleType.condensed ? 4 : 8)
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-bar-horizontal': ObcBarHorizontal;
  }
}
