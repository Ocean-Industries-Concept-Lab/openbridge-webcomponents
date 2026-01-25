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
  computeMeetScale,
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

  @state()
  private _scale = 1;

  // ResizeController automatically subscribes/unsubscribes based on component lifecycle
  // @ts-expect-error - Controller is used for side effects, not accessed directly
  private _resizeController = new ResizeController(this, {
    callback: (entries) => {
      if (!this.fixedAspectRatio) return;

      const entry = entries[0];
      if (!entry) return;

      const effectiveBarThickness = computeExternalScaleEffectiveBarThickness({
        hasBar: this.hasBar,
        barThickness: this.barThickness,
        borderRadius: this._computedBorderRadius,
        scaleType: this.scaleType,
      });

      // Calculate reference thickness from current configuration
      const layout = computeExternalScaleLayout({
        orientation: 'horizontal',
        side: this.side,
        hasBar: this.hasBar,
        hasScale: this.hasScale,
        labels: !this.hideLabels,
        barThickness: effectiveBarThickness,
        tickThickness: this.tickThickness,
        labelThickness: this.labelThickness,
        length: this.width,
      });

      const viewBox = computeExternalScaleViewBox(
        {orientation: 'horizontal', length: this.width},
        layout
      );

      this._scale = computeMeetScale(
        viewBox.width,
        viewBox.height,
        entry.contentRect.width,
        entry.contentRect.height
      );
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
    const config: ExternalScaleConfig = {
      orientation: 'horizontal',
      side: this.side,
      length: this.width,
      paddingStart: this.paddingLeft,
      paddingEnd: this.paddingRight,
      minValue: this.minValue,
      maxValue: this.maxValue,
      hasScale: this.hasScale,
      labels: !this.hideLabels,
      hasBar: this.hasBar,
      scaleBackground: this.scaleBackground,
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
      {orientation: config.orientation, length: this.width},
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

    // Report dimensions to parent chart (if in integration mode)
    if (!this.fixedAspectRatio) {
      this.reportDimensions();
    }
  }

  /**
   * Report scale dimensions to parent chart component
   */
  private reportDimensions() {
    const effectiveBarThickness = computeExternalScaleEffectiveBarThickness({
      hasBar: this.hasBar,
      barThickness: this.barThickness,
      borderRadius: this._computedBorderRadius,
      scaleType: this.scaleType,
    });

    const dimensions = computeScaleDimensionsForReport({
      orientation: 'horizontal',
      side: this.side,
      hasBar: this.hasBar,
      hasScale: this.hasScale,
      labels: !this.hideLabels,
      barThickness: effectiveBarThickness,
      tickThickness: this.tickThickness,
      labelThickness: this.labelThickness,
      length: this.width,
    });

    // console.debug(`[obc-bar-horizontal] Reporting dimensions:`, {
    //   side: this.side,
    //   thickness: dimensions.thickness,
    //   width: this.width,
    //   hasBar: this.hasBar,
    //   hasScale: this.hasScale,
    //   labels: this.labels,
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
    this._refreshBorderRadiusFromCssVar();
    this._startBorderRadiusObserver();
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

  private _refreshBorderRadiusFromCssVar(): void {
    const next = readExternalScaleBorderRadiusPx(this, this.scaleType);

    if (this._computedBorderRadius !== next) {
      this._computedBorderRadius = next;
    }

    // In fixed-aspect-ratio mode, font-size compensation depends on the
    // viewBox-to-container meet scale. Border radius changes can affect the
    // effective bar thickness (and therefore viewBox), so recompute here.
    if (this.fixedAspectRatio) {
      const rect = this.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const effectiveBarThickness = computeExternalScaleEffectiveBarThickness(
          {
            hasBar: this.hasBar,
            barThickness: this.barThickness,
            borderRadius: next,
            scaleType: this.scaleType,
          }
        );

        const layout = computeExternalScaleLayout({
          orientation: 'horizontal',
          side: this.side,
          hasBar: this.hasBar,
          hasScale: this.hasScale,
          labels: !this.hideLabels,
          barThickness: effectiveBarThickness,
          tickThickness: this.tickThickness,
          labelThickness: this.labelThickness,
          length: this.width,
        });

        const viewBox = computeExternalScaleViewBox(
          {orientation: 'horizontal', length: this.width},
          layout
        );

        this._scale = computeMeetScale(
          viewBox.width,
          viewBox.height,
          rect.width,
          rect.height
        );
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-bar-horizontal': ObcBarHorizontal;
  }
}
