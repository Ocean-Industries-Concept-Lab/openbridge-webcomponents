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

export enum VerticalSide {
  left = 'left',
  right = 'right',
}

// Re-export shared enums for convenience
export {ScaleType, FillMode, AdvicePosition, FrameStyle, BorderRadiusPosition};

@customElement('obc-bar-vertical')
/**
 * Vertical SVG bar + external scale.
 *
 * Thin wrapper around `renderExternalScale()` that sets up a vertical viewBox
 * and exposes a web-component API for Storybook and consumers.
 */
export class ObcBarVertical extends LitElement {
  @property({type: Number}) minValue = 0;
  @property({type: Number}) maxValue = 100;

  /** Total height of the scale (including padding bands) */
  @property({type: Number}) height = 320;

  /** Padding above the drawing area */
  @property({type: Number}) paddingTop = CHART_DIMENSIONS.CANVAS_PADDING;

  /** Padding below the drawing area */
  @property({type: Number}) paddingBottom = CHART_DIMENSIONS.CANVAS_PADDING;

  /** Which side of the chart area this scale lives on */
  @property({type: String}) side: VerticalSide = VerticalSide.right;

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
        orientation: 'vertical',
        side: this.side,
        hasBar: this.hasBar,
        hasScale: this.hasScale,
        hasLabels: this.hasLabels,
        barThickness: effectiveBarThickness,
        tickThickness: this.tickThickness,
        labelThickness: this.labelThickness,
        length: this.height,
      });

      const viewBox = computeExternalScaleViewBox(
        {orientation: 'vertical', length: this.height},
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
  /** Show scale tickmarks band. */
  @property({type: Boolean}) hasScale = true;
  /** Show labels band. */
  @property({type: Boolean}) hasLabels = true;
  /** Show the bar container band. */
  @property({type: Boolean}) hasBar = false;
  /** Show background behind the scale tickmarks. */
  @property({type: Boolean, attribute: 'scale-background'})
  scaleBackground = false;
  /** Bar container thickness in pixels. */
  @property({type: Number}) barThickness = 24;
  /** Tickmark band thickness in pixels. */
  @property({type: Number}) tickThickness = 28;
  /** Label band thickness in pixels. */
  @property({type: Number}) labelThickness = 60;

  // Tick configuration
  /** Show/hide main tickbars. */
  @property({type: Boolean}) hasMainTickbars = true;
  /** Array of values for main tickbars. Defaults to [minValue, 0, maxValue] if empty. */
  @property({attribute: false}) mainTickbarsArray: number[] = [];
  @property({type: Boolean}) hasPrimaryTickbars = true;
  @property({type: Boolean}) hasSecondaryTickbars = true;
  @property({type: Boolean}) hasTertiaryTickbars = true;
  /** Primary tick interval (and label interval when hasLabels=true). */
  @property({type: Number}) primaryTickbarsInterval?: number = undefined;
  @property({type: Number}) secondaryTickbarsInterval?: number = undefined;
  @property({type: Number}) tertiaryTickbarsInterval?: number = undefined;
  /** Tick density preset. */
  @property({type: String}) scaleType: ScaleType = ScaleType.regular;
  /** Frame style preset. */
  @property({type: String}) frameStyle: FrameStyle = FrameStyle.regular;
  /** Border radius position in layout. */
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
  /** Use enhanced instrument colors. */
  @property({type: Boolean}) enhanced = false;
  /** Fill visualization mode (0→value or fillMin→fillMax). */
  @property({type: String}) fillMode: FillMode = FillMode.fill;
  @property({type: Number}) fillMin?: number = undefined;
  @property({type: Number}) fillMax?: number = undefined;
  /** Current value (drives bar fill and/or tint marker). */
  @property({type: Number}) value?: number = undefined;

  // Setpoint
  /** Show setpoint indicator when setpoint is provided. */
  @property({type: Boolean}) hasSetpoint = true;
  @property({type: Number}) setpoint?: number = undefined;
  /** Manual at-setpoint override (used when disableAutoAtSetpoint=true). */
  @property({type: Boolean}) atSetpoint = false;
  /** Disable automatic at-setpoint detection. */
  @property({type: Boolean}) disableAutoAtSetpoint = false;
  /** Deadband for automatic at-setpoint detection. */
  @property({type: Number}) autoAtSetpointDeadband = 1;
  /** Deadband around 0 where the setpoint snaps to exactly 0. */
  @property({type: Number}) setpointAtZeroDeadband = 0.5;
  /** Instrument state (affects colors and some marker behavior). */
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;

  // Advice
  /** Enable advice overlay rendering. */
  @property({type: Boolean}) hasAdvice = true;
  /** Where advice overlays are drawn relative to the bar/tick bands. */
  @property({type: String}) advicePosition: AdvicePosition =
    AdvicePosition.inner;
  @property({attribute: false}) advice: Array<{
    min: number;
    max: number;
    type: AdviceType;
    hinted: boolean;
  }> = [];

  override render() {
    const config: ExternalScaleConfig = {
      orientation: 'vertical',
      side: this.side,
      length: this.height,
      paddingStart: this.paddingTop,
      paddingEnd: this.paddingBottom,
      minValue: this.minValue,
      maxValue: this.maxValue,
      hasScale: this.hasScale,
      hasLabels: this.hasLabels,
      hasBar: this.hasBar,
      scaleBackground: this.scaleBackground,
      barThickness: this.barThickness,
      tickThickness: this.tickThickness,
      labelThickness: this.labelThickness,
      hasMainTickbars: this.hasMainTickbars,
      mainTickbarsArray: this.mainTickbarsArray,
      hasPrimaryTickbars: this.hasPrimaryTickbars,
      hasSecondaryTickbars: this.hasSecondaryTickbars,
      hasTertiaryTickbars: this.hasTertiaryTickbars,
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
      hasSetpoint: this.hasSetpoint,
      setpoint: this.setpoint,
      atSetpoint: this.atSetpoint,
      disableAutoAtSetpoint: this.disableAutoAtSetpoint,
      autoAtSetpointDeadband: this.autoAtSetpointDeadband,
      setpointAtZeroDeadband: this.setpointAtZeroDeadband,
      state: this.state,
      hasAdvice: this.hasAdvice,
      advicePosition: this.advicePosition,
      advice: this.advice as ExternalScaleAdvice[],
      fixedAspectRatio: this.fixedAspectRatio,
    };

    const layout = computeExternalScaleLayout(
      toExternalScaleLayoutConfig(config)
    );

    const parts = renderExternalScale(config);

    const viewBox = computeExternalScaleViewBox(
      {orientation: config.orientation, length: this.height},
      layout
    );
    const preserveAspectRatio = this.fixedAspectRatio
      ? 'xMidYMid meet'
      : 'none';

    return html`
      <svg
        width=${this.fixedAspectRatio ? '100%' : `${viewBox.width}px`}
        height=${this.fixedAspectRatio ? '100%' : `${this.height}px`}
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
      orientation: 'vertical',
      side: this.side,
      hasBar: this.hasBar,
      hasScale: this.hasScale,
      hasLabels: this.hasLabels,
      barThickness: effectiveBarThickness,
      tickThickness: this.tickThickness,
      labelThickness: this.labelThickness,
      length: this.height,
    });

    // console.debug(`[obc-bar-vertical] Reporting dimensions:`, {
    //   side: this.side,
    //   thickness: dimensions.thickness,
    //   height: this.height,
    //   hasBar: this.hasBar,
    //   hasScale: this.hasScale,
    //   hasLabels: this.hasLabels,
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
          orientation: 'vertical',
          side: this.side,
          hasBar: this.hasBar,
          hasScale: this.hasScale,
          hasLabels: this.hasLabels,
          barThickness: effectiveBarThickness,
          tickThickness: this.tickThickness,
          labelThickness: this.labelThickness,
          length: this.height,
        });

        const viewBox = computeExternalScaleViewBox(
          {orientation: 'vertical', length: this.height},
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
    'obc-bar-vertical': ObcBarVertical;
  }
}
