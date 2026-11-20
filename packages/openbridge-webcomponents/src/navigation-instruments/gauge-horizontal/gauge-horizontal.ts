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
} from '../types.js';
import type {ExternalScaleConfig} from '../../building-blocks/external-scale/external-scale.js';
import {
  computeExternalScaleViewBox,
  computeFixedAspectRatioScale,
  computeExternalScaleLayout,
  renderExternalScale,
  toExternalScaleLayoutConfig,
  computeScaleDimensionsForReport,
  computeExternalScaleEffectiveBarThickness,
  readContentBox,
  ScaleType,
  FillMode,
  AdvicePosition,
  ExternalScaleOrientation,
  ExternalScaleSide,
} from '../../building-blocks/external-scale/external-scale.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import {AdviceMixin} from '../../svghelpers/advice-mixin.js';
import {nextAdviceMaskId} from '../../svghelpers/advice.js';

// Re-export shared enums for convenience
export {
  ScaleType,
  FillMode,
  AdvicePosition,
  FrameStyle,
  BorderRadiusPosition,
  InstrumentState,
  ExternalScaleSide,
};

/**
 * `<obc-gauge-horizontal>` – A horizontal gauge component with bar and scale background.
 *
 * Use `obc-gauge-horizontal` when you need a standalone horizontal gauge with a visible scale
 * and bar. This is ideal for displaying single values like speed, power, or progress where
 * the scale context is always needed.
 *
 * This is the same as `obc-bar-horizontal` (both use `external-scale.ts`)
 * but with several properties fixed for consistent gauge appearance.
 * Unlike `obc-bar-horizontal`, this component always shows the bar and scale background.
 *
 * ---
 *
 * ### Features
 * - **Fixed Layout:** Width (384px), padding (32px), bar/tick/label thicknesses, and border radius are fixed for consistent gauge appearance. 384 px is the length the design is drawn at, not a layout limit: see `fixedAspectRatio`.
 * - **Scale Configuration:**
 *   - Configurable `minValue` and `maxValue` for the value range.
 *   - Optional main, primary, secondary, and tertiary tickmarks at specified intervals.
 *   - Labels shown at primary tickmark intervals (controlled via `showLabels`).
 * - **Side Positioning:** Can be placed on the `top` or `bottom` side via the `side` property.
 * - **Value Display:**
 *   - `value` property drives the bar fill.
 *   - `fillMode` controls visualization: `fill` shows bar from `fillMin` to `fillMax`; `tint` adds a marker at the `value` position.
 *   - Set `priority` to `Priority.enhanced` to use the blue/enhanced color palette for bar fill and setpoint (default: `Priority.regular`).
 * - **Setpoint Marker:**
 *   - Optional `setpoint` value displays a marker.
 *   - Automatic at-setpoint detection with configurable deadband.
 * - **Advice Overlays:** Render advice ranges with different types and hinted states.
 * - **Fixed Aspect Ratio:** `fixedAspectRatio` scales the whole gauge to its container like a vector image while the label font size stays put; `scaleReferenceSize` is the container width at which it draws 1:1.
 * - **Dimension Reporting:** Dispatches `scale-dimensions-changed` events for parent chart integration.
 *
 * ---
 *
 * ### Fixed Properties (not configurable)
 * - `width`: 384px
 * - `paddingLeft`/`paddingRight`: 32px (`CHART_DIMENSIONS.CANVAS_PADDING`)
 * - `barThickness`: 48px
 * - `tickThickness`: 24px
 * - `labelThickness`: 60px
 * - `borderRadius`: 8px (matches obc-component-size-medium)
 * - `scaleType`: regular
 * - `frameStyle`: regular
 * - `hasBar`: true
 * - `hasScale`: true
 * - `scaleBackground`: true
 *
 * ---
 *
 * ### Implementation
 * This is a higher fidelity implementation of the concept shown in `instrument-linear.ts`,
 * providing a complete gauge with container, scale background, tickmarks, labels, advice overlays, and setpoint marker.
 *
 * This is a thin web-component wrapper around the pure SVG building-block renderer in `external-scale.ts`.
 * It sets up the outer `<svg>`/`viewBox` for a horizontal scale and delegates rendering/layout to:
 * - `computeExternalScaleLayout(...)`
 * - `renderExternalScale(config)`
 *
 * For renderer documentation see: **Building Blocks/External Scale**.
 *
 * For a version where these properties are user-configurable, see **Bars and Graphs/Bar Horizontal**.
 *
 * ---
 *
 * ### Events
 * - `scale-dimensions-changed` – Fired when layout-affecting properties (`side`, `showLabels`) change, reporting dimensions to parent chart components.
 *
 * ---
 *
 * ### Example
 *
 * ```html
 * <obc-gauge-horizontal
 *   min-value="0"
 *   max-value="100"
 *   value="75"
 *   primary-tickmark-interval="20"
 *   secondary-tickmark-interval="10"
 *   setpoint="80"
 *   side="bottom"
 * ></obc-gauge-horizontal>
 * ```
 *
 * @property minValue - Minimum scale value
 * @property maxValue - Maximum scale value
 * @property reverse - Plot `minValue` at the right so values grow leftward.
 * @property side - Which side of the chart area this scale lives on (top or bottom)
 * @property fixedAspectRatio - Scale the whole gauge to its container like a vector image, keeping the label font size: the SVG fills the host, so size the host. Off, the gauge draws at its 384 px reference width.
 * @property scaleReferenceSize - Container width at which a `fixedAspectRatio` gauge draws 1:1 with the design. A wider container enlarges the drawing proportionally, a narrower one shrinks it.
 * @availableWhen scaleReferenceSize fixedAspectRatio==true
 * @property showLabels - Show numerical value labels at primary tickmarks
 * @property mainTickmarks - Array of values for main tickmarks. When undefined, no main tickmarks shown. When empty array [], defaults to [minValue, 0, maxValue].
 * @property primaryTickmarkInterval - Interval for primary (longest) tickmarks with labels
 * @property secondaryTickmarkInterval - Interval for secondary (medium) tickmarks
 * @property tertiaryTickmarkInterval - Interval for tertiary (shortest) tickmarks
 * @property borderRadiusPosition - Border radius position based on component layout
 * @property priority - Color priority: enhanced uses blue instrument colors for bar fill and setpoint
 * @property fillMode - Fill visualization mode: 'fill' shows bar from fillMin to fillMax; 'tint' adds a marker at the value position
 * @property fillMin - Minimum fill value (defaults to 0)
 * @property fillMax - Maximum fill value (defaults to value)
 * @property value - Current value (bar fill level)
 * @property state - Instrument state: active, loading, or off
 * @property advices - Advice/alert overlays with min, max, type, and hinted state. When undefined or empty, no advice shown.
 * @property highlightCurrentValue - When true, displays a dot indicator at the current value position.
 *   The dot is rendered in the scale band, touching its inner edge (towards the chart).
 *   This provides an alternative to bar fill for highlighting the current value.
 * @property focused - Earlier name for `touching`: a change to it sets `touching`, unless `touching` changes in the same update, which then wins. It is not updated from `touching`, so it does not read back the current value.
 * @fires {CustomEvent} scale-dimensions-changed - Fired when layout-affecting properties change, providing dimension info for parent chart integration. It bubbles to the chart slot the gauge sits in and does not leave the shadow root around it.
 * @stable
 */
@customElement('obc-gauge-horizontal')
export class ObcGaugeHorizontal extends AdviceMixin(
  SetpointMixin(LitElement, {
    defaultDeadband: 1,
  })
) {
  @property({type: Number}) minValue = 0;
  @property({type: Number}) maxValue = 100;
  @property({type: Boolean}) reverse = false;

  private readonly width = 384;
  private readonly paddingLeft = CHART_DIMENSIONS.CANVAS_PADDING;
  private readonly paddingRight = CHART_DIMENSIONS.CANVAS_PADDING;

  @property({type: String}) side: ExternalScaleSide = ExternalScaleSide.bottom;

  @property({type: Boolean}) fixedAspectRatio = false;
  @property({type: Number}) scaleReferenceSize = 384;

  @state()
  private _scale = 1;

  /** The drawing's height in viewBox units, kept from the last render for the scale measurement. */
  private _viewBoxThickness = 0;

  // ResizeController automatically subscribes/unsubscribes based on component lifecycle
  // @ts-expect-error - Controller is used for side effects, not accessed directly
  private _resizeController = new ResizeController(this, {
    callback: (entries) => {
      if (!this.fixedAspectRatio) return;

      const entry = entries[0];
      if (!entry) return;

      const scale = computeFixedAspectRatioScale({
        orientation: ExternalScaleOrientation.horizontal,
        containerMainAxisSize: entry.contentRect.width,
        containerCrossAxisSize: entry.contentRect.height,
        scaleReferenceSize: this.scaleReferenceSize,
        viewBoxThickness: this._viewBoxThickness,
      });
      // Guard against zero-sized containers, but allow fractional scales < 1
      this._scale = scale > 0 ? scale : 1;

      // Report scaled dimensions to parent chart
      this.reportDimensions();
    },
  });

  @property({type: Boolean, attribute: false}) showLabels = true;
  private readonly barThickness = 48;
  private readonly tickThickness = 24;
  private readonly labelThickness = 60;

  @property({type: Array, attribute: false}) mainTickmarks?: number[] = [];
  @property({type: Number}) primaryTickmarkInterval?: number = undefined;
  @property({type: Number}) secondaryTickmarkInterval?: number = undefined;
  @property({type: Number}) tertiaryTickmarkInterval?: number = undefined;
  private readonly scaleType: ScaleType = ScaleType.regular;
  private readonly frameStyle: FrameStyle = FrameStyle.regular;
  @property({type: String, attribute: false})
  borderRadiusPosition?: BorderRadiusPosition =
    BorderRadiusPosition.innerFirstChild;

  private readonly borderRadius = 8;

  private get hasBar(): boolean {
    return true;
  }

  private get scaleBackground(): boolean {
    return true;
  }

  private get hasScale(): boolean {
    return true;
  }

  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: String}) fillMode: FillMode = FillMode.fill;
  @property({type: Number}) fillMin?: number = undefined;
  @property({type: Number}) fillMax?: number = undefined;
  @property({type: Number}) value?: number = undefined;

  @property({type: String}) state: InstrumentState = InstrumentState.active;

  /**
   * @deprecated Use `touching` (from SetpointMixin) instead.
   * Kept for backward compatibility. Synced to `touching` in `willUpdate()`.
   */
  @property({type: Boolean}) focused = false;

  private readonly advicePosition: AdvicePosition = AdvicePosition.inner;
  // Mask ids are document-scoped, so each gauge names its own.
  private readonly _adviceMaskPrefix = nextAdviceMaskId('gauge');

  @property({type: Boolean}) highlightCurrentValue = false;

  override render() {
    // A chart pushes its own width to a slotted scale; in fixedAspectRatio
    // mode the drawing keeps its reference length and the SVG scales it.
    const effectiveLength = this.fixedAspectRatio
      ? this.scaleReferenceSize
      : this.width;

    const config: ExternalScaleConfig = {
      orientation: ExternalScaleOrientation.horizontal,
      side: this.side,
      length: effectiveLength,
      paddingStart: this.paddingLeft,
      paddingEnd: this.paddingRight,
      minValue: this.minValue,
      maxValue: this.maxValue,
      reverse: this.reverse,
      hasScale: this.hasScale,
      labels: this.showLabels,
      hasBar: this.hasBar,
      scaleBackground: this.scaleBackground,
      barThickness: this.barThickness,
      tickThickness: this.tickThickness,
      labelThickness: this.labelThickness,
      mainTickmarks: this.mainTickmarks,
      primaryTickmarkInterval: this.primaryTickmarkInterval,
      secondaryTickmarkInterval: this.secondaryTickmarkInterval,
      tertiaryTickmarkInterval: this.tertiaryTickmarkInterval,
      scaleType: this.scaleType,
      frameStyle: this.frameStyle,
      borderRadiusPosition: this.borderRadiusPosition,
      borderRadius: this.borderRadius,
      priority: this.priority,
      fillMode: this.fillMode,
      fillMin: this.fillMin,
      fillMax: this.fillMax,
      value: this.value,
      setpoint: this.setpoint,
      newSetpoint: this.newSetpoint,
      atSetpoint: this.atSetpoint,
      autoAtSetpoint: this.autoAtSetpoint,
      autoAtSetpointDeadband: this.autoAtSetpointDeadband,
      setpointAtZeroDeadband: this.setpointAtZeroDeadband,
      animateSetpoint: this.animateSetpoint,
      departingNewSetpoint: this.departingNewSetpoint,
      state: this.state,
      touching: this.touching,
      setpointOverride: this.setpointOverride,
      advicePosition: this.advicePosition,
      advices: this.advices,
      adviceTrigger: this.adviceTrigger,
      adviceEmphasis: this.adviceEmphasis,
      adviceMaskPrefix: this._adviceMaskPrefix,
      fixedAspectRatio: this.fixedAspectRatio,
      // Gauges are always in instrument mode - they use fixed borderRadius (8px)
      // and don't respond to .obc-component-size-* CSS classes for border radius
      instrumentMode: true,
      highlightCurrentValue: this.highlightCurrentValue,
    };

    const layout = computeExternalScaleLayout(
      toExternalScaleLayoutConfig(config)
    );
    this._viewBoxThickness = layout.thickness;

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
        style="--scale: ${
          this.fixedAspectRatio ? this._scale : 1
        }; display: block;"
        part="svg"
      >
        ${parts.barContainer} ${parts.barFill} ${parts.scaleBackground}
        ${parts.tickmarks} ${parts.labels} ${parts.adviceOverlays}
        ${parts.currentValueDot} ${parts.setpoint}
      </svg>
    `;
  }

  override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);

    // Sync deprecated alias to mixin property
    // Only sync if the alias was set and the mixin property was NOT also set.
    if (changed.has('focused') && !changed.has('touching')) {
      this.touching = this.focused;
    }
  }

  override updated(changed: PropertyValues) {
    super.updated(changed);

    // Only the styles this element applied are removed: the first update
    // lists every property, and a consumer's inline style is theirs.
    if (changed.has('fixedAspectRatio')) {
      if (this.fixedAspectRatio) {
        this._applyFixedAspectRatioStyles();
        this._updateScaleFromCurrentSize();
      } else if (changed.get('fixedAspectRatio') === true) {
        this._removeFixedAspectRatioStyles();
        this._scale = 1;
      }
    }

    if (changed.has('scaleReferenceSize') && this.fixedAspectRatio) {
      this._updateScaleFromCurrentSize();
    }

    // The reported thickness follows the bands, the advice icons, the
    // setpoint marker band and the mode, whichever mode is on; a resize
    // re-reports through the ResizeController.
    if (
      changed.has('fixedAspectRatio') ||
      changed.has('side') ||
      changed.has('showLabels') ||
      changed.has('advices') ||
      this.setpointPresenceChanged(changed)
    ) {
      // A thinner or thicker drawing under the same box changes the painted
      // scale without a resize event.
      if (this.fixedAspectRatio) this._measureScale();
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
      borderRadius: this.borderRadius,
      scaleType: this.scaleType,
    });

    const baseDimensions = computeScaleDimensionsForReport({
      orientation: ExternalScaleOrientation.horizontal,
      side: this.side,
      hasBar: this.hasBar,
      hasScale: this.hasScale,
      labels: this.showLabels,
      barThickness: effectiveBarThickness,
      tickThickness: this.tickThickness,
      labelThickness: this.labelThickness,
      length: this.fixedAspectRatio ? this.scaleReferenceSize : this.width,
      scaleType: this.scaleType,
      hasAdviceIcon: !!this.advices?.some((a) => a.showIcon),
      hasSetpoint:
        this.setpoint !== undefined ||
        this.newSetpoint !== undefined ||
        this.departingNewSetpoint !== undefined,
    });

    // The chart lays out in visual pixels, so a scaled drawing reports its
    // scaled thickness.
    const dimensions = this.fixedAspectRatio
      ? {
          ...baseDimensions,
          thickness: Math.round(baseDimensions.thickness * this._scale),
        }
      : baseDimensions;

    this.dispatchEvent(
      new CustomEvent('scale-dimensions-changed', {
        detail: dimensions,
        bubbles: true,
      })
    );
  }

  protected override createRenderRoot() {
    return this;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.fixedAspectRatio) {
      this._applyFixedAspectRatioStyles();
    }
  }

  /** The inline sizing, value and priority, the consumer had before fixedAspectRatio took the host. */
  private _consumerSizing?: Record<
    'display' | 'width' | 'height',
    [value: string, priority: string]
  >;

  /**
   * A custom element is inline by default, which gives the percentage-sized
   * SVG nothing to fill; in fixedAspectRatio mode the host is a block that
   * takes its container's width.
   */
  private _applyFixedAspectRatioStyles(): void {
    if (!this._consumerSizing) {
      const snapshot = (name: string): [string, string] => [
        this.style.getPropertyValue(name),
        this.style.getPropertyPriority(name),
      ];
      this._consumerSizing = {
        display: snapshot('display'),
        width: snapshot('width'),
        height: snapshot('height'),
      };
    }
    this.style.display = 'block';
    this.style.width = '100%';
    this.style.height = 'auto';
  }

  private _removeFixedAspectRatioStyles(): void {
    const saved = this._consumerSizing;
    this._consumerSizing = undefined;
    for (const name of ['display', 'width', 'height'] as const) {
      const [value, priority] = saved?.[name] ?? ['', ''];
      this.style.setProperty(name, value, priority);
    }
  }

  /** Reads the host's content box into the scale; false while the host has no size yet. */
  private _measureScale(): boolean {
    const {width, height} = readContentBox(this);
    if (width <= 0) return false;
    this._scale = computeFixedAspectRatioScale({
      orientation: ExternalScaleOrientation.horizontal,
      containerMainAxisSize: width,
      containerCrossAxisSize: height,
      scaleReferenceSize: this.scaleReferenceSize,
      viewBoxThickness: this._viewBoxThickness,
    });
    return true;
  }

  /** Measures once layout has settled, then reports. */
  private _updateScaleFromCurrentSize(): void {
    requestAnimationFrame(() => {
      if (this._measureScale()) {
        this.requestUpdate();
        this.reportDimensions();
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-horizontal': ObcGaugeHorizontal;
  }
}
