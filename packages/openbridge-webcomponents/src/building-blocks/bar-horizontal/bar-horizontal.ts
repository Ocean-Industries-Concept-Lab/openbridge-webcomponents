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
} from '../external-scale/external-scale.js';

export enum HorizontalSide {
  top = 'top',
  bottom = 'bottom',
}

// Re-export shared enums for convenience
export {
  ScaleType,
  FillMode,
  AdvicePosition,
  FrameStyle,
  BorderRadiusPosition,
  InstrumentState,
  BarContainerStyle,
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
 */
@customElement('obc-bar-horizontal')
export class ObcBarHorizontal extends LitElement {
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
  @property({type: String}) side: HorizontalSide = HorizontalSide.bottom;

  /**
   * When true, freezes all internal calculations and scales the entire component
   * proportionally (like CSS transform:scale), except label font-size remains constant.
   * When false (default), dimensions react to component properties.
   */
  @property({type: Boolean, attribute: 'fixed-aspect-ratio'})
  fixedAspectRatio = false;

  /**
   * Reference size for proportional scaling when fixedAspectRatio is true.
   * At this width, the scale renders at native 1:1 (matches Figma design).
   * Above this width, the scale grows proportionally; below, it shrinks.
   * @default 384
   */
  @property({type: Number, attribute: 'scale-reference-size'})
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
        orientation: 'horizontal',
        containerMainAxisSize,
        scaleReferenceSize: this.scaleReferenceSize,
      });

      console.debug(`[bar-horizontal] ResizeController:`, {
        fixedAspectRatio: this.fixedAspectRatio,
        containerWidth: containerMainAxisSize,
        scaleReferenceSize: this.scaleReferenceSize,
        computedScale: this._scale,
        width: this.width,
      });

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
  @property({type: Boolean, attribute: 'scale-background'})
  scaleBackground = false;
  /**
   * Bar container background style.
   * When undefined, defaults based on scaleBackground.
   * Set explicitly to override: 'primary' (lighter) or 'secondary' (gray).
   */
  @property({type: String, attribute: 'bar-container-style'})
  barContainerStyle?: BarContainerStyle = undefined;
  /** Bar/fill thickness in pixels */
  @property({type: Number}) barThickness = 24;
  /** Tickmark band thickness in pixels. */
  @property({type: Number}) tickThickness = 28;
  /** Label band thickness in pixels. */
  @property({type: Number}) labelThickness = 60;

  // Tick configuration
  /**
   * Array of values for main tickbars. When undefined, no main tickbars shown.
   * When empty array [], defaults to [minValue, 0, maxValue].
   */
  @property({attribute: false}) mainTickbars?: number[] = [];
  /**
   * Interval for primary (longest) tickmarks with labels (minimum 1).
   * When undefined, no primary tickbars are shown.
   */
  @property({type: Number}) primaryTickbarsInterval?: number = undefined;
  /**
   * Interval for secondary (medium) tickmarks (minimum 1).
   * When undefined, no secondary tickbars are shown.
   */
  @property({type: Number}) secondaryTickbarsInterval?: number = undefined;
  /**
   * Interval for tertiary (shortest) tickmarks (minimum 1).
   * When undefined, no tertiary tickbars are shown.
   */
  @property({type: Number}) tertiaryTickbarsInterval?: number = undefined;
  /** Scale display mode: regular or condensed (shorter ticks) */
  @property({type: String}) scaleType: ScaleType = ScaleType.regular;
  /** Frame style: regular (4px gap for all), flat (main tickmarks touch edge), framed, or instrument */
  @property({type: String}) frameStyle: FrameStyle = FrameStyle.regular;
  /** Border radius position based on component layout */
  @property({type: String, attribute: 'border-radius-position'})
  borderRadiusPosition?: BorderRadiusPosition = undefined;

  @state()
  private _computedBorderRadius?: number;

  private _borderRadiusObserver?: MutationObserver;

  // @ts-expect-error - Controller is used for side effects, not accessed directly
  private _borderRadiusResizeController = new ResizeController(this, {
    callback: () => {
      this._refreshBorderRadiusFromCssVar();
    },
  });

  // Values
  /** Enhanced visual mode: when true, uses enhanced instrument colors for bar fill and setpoint */
  @property({type: Boolean}) enhanced = false;
  /** Fill visualization mode: fill or tint */
  @property({type: String}) fillMode: FillMode = FillMode.fill;
  /** Minimum fill value for tint mode (defaults to 0) */
  @property({type: Number}) fillMin?: number = undefined;
  /** Maximum fill value for tint mode (defaults to value) */
  @property({type: Number}) fillMax?: number = undefined;
  /** Current value (bar fill level) */
  @property({type: Number}) value?: number = undefined;

  // Setpoint
  /**
   * Setpoint/input value to display as indicator.
   * When undefined, no setpoint shown.
   */
  @property({type: Number}) setpoint?: number = undefined;
  /** Whether value is at setpoint (manual override when disableAutoAtSetpoint=true) */
  @property({type: Boolean}) atSetpoint = false;
  /** Disable automatic atSetpoint calculation based on value and deadband */
  @property({type: Boolean}) disableAutoAtSetpoint = false;
  /** Deadband for automatic atSetpoint detection (when disableAutoAtSetpoint=false) */
  @property({type: Number}) autoAtSetpointDeadband = 1;
  /** Deadband around zero for setpoint positioning */
  @property({type: Number}) setpointAtZeroDeadband = 0.5;
  /** Instrument state (affects colors and some marker behavior) */
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;

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

    console.debug(`[bar-horizontal] render:`, {
      fixedAspectRatio: this.fixedAspectRatio,
      width: this.width,
      scaleReferenceSize: this.scaleReferenceSize,
      effectiveLength,
      scale: this._scale,
      paddingLeft: this.paddingLeft,
      paddingRight: this.paddingRight,
    });

    const config: ExternalScaleConfig = {
      orientation: 'horizontal',
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
      mainTickbars: this.mainTickbars,
      primaryTickbarsInterval: this.primaryTickbarsInterval,
      secondaryTickbarsInterval: this.secondaryTickbarsInterval,
      tertiaryTickbarsInterval: this.tertiaryTickbarsInterval,
      scaleType: this.scaleType,
      frameStyle: this.frameStyle,
      borderRadiusPosition: this.borderRadiusPosition,
      borderRadius: this._computedBorderRadius,
      enhanced: this.enhanced,
      fillMode: this.fillMode,
      fillMin: this.fillMin,
      fillMax: this.fillMax,
      value: this.value,
      setpoint: this.setpoint,
      atSetpoint: this.atSetpoint,
      disableAutoAtSetpoint: this.disableAutoAtSetpoint,
      autoAtSetpointDeadband: this.autoAtSetpointDeadband,
      setpointAtZeroDeadband: this.setpointAtZeroDeadband,
      state: this.state,
      advicePosition: this.advicePosition,
      advices: this.advices as ExternalScaleAdvice[],
      fixedAspectRatio: this.fixedAspectRatio,
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
        ${parts.setpoint}
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

    // Report dimensions to parent chart
    // In fixedAspectRatio mode, we report after resize events trigger _scale updates
    // In regular mode, we report on every update to keep parent chart in sync
    if (!this.fixedAspectRatio) {
      this.reportDimensions();
    }
  }

  /**
   * Report scale dimensions to parent chart component.
   * Always reports unscaled/reference dimensions so the parent chart can apply
   * consistent proportional scaling in fixedAspectRatioScaling mode.
   */
  private reportDimensions() {
    const effectiveBarThickness = computeExternalScaleEffectiveBarThickness({
      hasBar: this.hasBar,
      barThickness: this.barThickness,
      borderRadius: this._computedBorderRadius,
      scaleType: this.scaleType,
    });

    // Use scaleReferenceSize for layout calculation when in fixedAspectRatio mode
    // This ensures consistent layout dimensions based on the design reference size
    const effectiveLength = this.fixedAspectRatio
      ? this.scaleReferenceSize
      : this.width;

    const baseDimensions = computeScaleDimensionsForReport({
      orientation: 'horizontal',
      side: this.side,
      hasBar: this.hasBar,
      hasScale: this.hasScale,
      labels: !this.hideLabels,
      barThickness: effectiveBarThickness,
      tickThickness: this.tickThickness,
      labelThickness: this.labelThickness,
      length: effectiveLength,
    });

    // Always report unscaled/reference dimensions.
    // The parent chart component handles proportional scaling consistently
    // for both external scales and chart padding in fixedAspectRatioScaling mode.
    const dimensions = baseDimensions;

    console.debug(`[bar-horizontal] reportDimensions:`, {
      fixedAspectRatio: this.fixedAspectRatio,
      side: dimensions.side,
      thickness: dimensions.thickness,
      scale: this._scale,
      width: this.width,
      scaleReferenceSize: this.scaleReferenceSize,
      effectiveLength,
      hasBar: this.hasBar,
      hasScale: this.hasScale,
      hideLabels: this.hideLabels,
      barThickness: this.barThickness,
      tickThickness: this.tickThickness,
      labelThickness: this.labelThickness,
    });

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
    this._refreshBorderRadiusFromCssVar();
    this._startBorderRadiusObserver();

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
          orientation: 'horizontal',
          containerMainAxisSize: containerWidth,
          scaleReferenceSize: this.scaleReferenceSize,
        });
        this.requestUpdate();
      }
    });
  }

  private _refreshBorderRadiusFromCssVar(): void {
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
          orientation: 'horizontal',
          containerMainAxisSize: rect.width,
          scaleReferenceSize: this.scaleReferenceSize,
        });
        // Report updated dimensions
        this.reportDimensions();
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-bar-horizontal': ObcBarHorizontal;
  }
}
