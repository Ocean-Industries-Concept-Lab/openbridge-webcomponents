import {LitElement, html, nothing, unsafeCSS, type TemplateResult} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './gauge-radial.css?inline';
import {customElement} from '../../decorator.js';
import {property} from 'lit/decorators.js';
import {AdviceType} from '../watch/advice.js';
import {InstrumentState, Priority} from '../types.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import '../../building-blocks/instrument-radial/instrument-radial.js';
import {TickmarkStyle} from '../watch/tickmark.js';
import {renderInstrumentReadout} from '../readout/instrument-readout.js';
import {ReadoutAlignment, ReadoutStacking} from '../readout/readout.js';

export enum ObcGaugeRadialType {
  filled = 'filled',
  bar = 'bar',
  needle = 'needle',
}

export enum GaugeRadialSector {
  deg270 = '270',
  deg180 = '180',
  deg90Left = '90-left',
  deg90Right = '90-right',
}

export enum GaugeRadialHorizontalAlignment {
  left = 'left',
  center = 'center',
  right = 'right',
}

export enum GaugeRadialVerticalAlignment {
  top = 'top',
  center = 'center',
  bottom = 'bottom',
}

export interface GaugeRadialAdvice {
  minValue: number;
  maxValue: number;
  type: AdviceType;
  hinted: boolean;
}

/**
 * `<obc-gauge-radial>` — Configurable radial gauge for generic numeric values.
 *
 * `ObcGaugeRadial` is a thin wrapper around `<obc-instrument-radial>` that adds
 * domain-independent value-to-angle mapping with automatic range handling for
 * both positive-only and bipolar (negative-to-positive) scales. It inherits a
 * full setpoint property bundle from {@link SetpointMixin}, including
 * auto at-setpoint detection, dual-marker adjustment preview, and deadband
 * tuning — no manual wiring required.
 *
 * ## Features
 *
 * - **Three display types**: `filled` (solid arc), `bar` (thinner arc), and
 *   `needle` (pointer indicator) via the `type` property.
 * - **Sector sweep**: `sector` selects the arc span (`270`, `180`, `90-left`, or `90-right`).
 *   The configured `minValue..maxValue` always spans the full sector. For the
 *   centered sectors (`270`, `180`) a symmetric range places `0` at 12 o'clock;
 *   for `90-left`/`90-right` the range midpoint sits at the middle of the quadrant.
 * - **Setpoint via mixin**: `setpoint`, `newSetpoint`, `touching`,
 *   `autoAtSetpointDeadband`, `setpointOverride`, and all other setpoint
 *   properties are provided by `SetpointMixin` and forwarded to the inner
 *   `<obc-instrument-radial>`.
 * - **Advice zones**: Pass an array of {@link GaugeRadialAdvice} objects to
 *   render caution/alert arcs on the gauge. Not shown on the `90-left` /
 *   `90-right` sectors.
 * - **Alignment**: The host always fills its container and the dial shrinks to
 *   fit the smaller of the available width/height, so a short, wide (or tall,
 *   narrow) container leaves slack on one axis. `horizontalAlignment`
 *   (`left` | `center` | `right`) and `verticalAlignment`
 *   (`top` | `center` | `bottom`) position the dial within that slack; both
 *   default to `center`.
 *
 * ## Usage Guidelines
 *
 * - Set `minValue` / `maxValue` to define the scale range.
 * - Use `priority` to switch between regular and enhanced color palettes.
 * - Provide `primaryTickmarkInterval` and `secondaryTickmarkInterval` to
 *   control tickmark density.
 * - Enable `showLabels` to show numeric labels at primary tickmarks.
 * - Enable `hasReadout` with optional `label` and `unit`. Layout depends on `sector`
 *   and `type`: **270** filled/bar — value at center + a label-only `meta` row in
 *   the bottom gap (two separate readouts); **180** filled/bar — a single centered
 *   stack (value + label/unit) at the bottom; **270** needle — bottom stack;
 *   **180** needle — no readout; **90-left** / **90-right** filled/bar — corner
 *   readout in a square host; **90** needle — no readout.
 *
 * ## Best Practices
 *
 * - Prefer `SetpointMixin` properties (`setpoint`, `touching`, etc.) over
 *   any legacy aliases — the mixin is the single source of truth.
 * - Keep domain-specific logic (units, formatting) in the parent view; this
 *   component is intentionally unit-agnostic.
 *
 * ## Example
 *
 * ```html
 * <obc-gauge-radial
 *   value="42"
 *   minValue="0"
 *   maxValue="100"
 *   type="filled"
 *   priority="enhanced"
 *   showLabels
 *   primaryTickmarkInterval="25"
 *   secondaryTickmarkInterval="5"
 *   setpoint="60"
 * ></obc-gauge-radial>
 * ```
 *
 * @element obc-gauge-radial
 * @typedef {import('./gauge-radial.js').GaugeRadialAdvice} GaugeRadialAdvice
 * @stable
 */
@customElement('obc-gauge-radial')
export class ObcGaugeRadial extends SetpointMixin(LitElement) {
  @property({type: Number}) value = 0;
  @property({type: Number}) maxValue = 100;
  @property({type: Number}) minValue = 0;
  @property({type: Boolean}) showLabels: boolean = false;
  @property({type: Number}) primaryTickmarkInterval = 50;
  @property({type: Number}) secondaryTickmarkInterval = 10;
  /**
   * Interval for tertiary tickmarks in value units.
   * When undefined or <= 0, no tertiary tickmarks are shown.
   */
  @property({type: Number}) tertiaryTickmarkInterval: number | undefined =
    undefined;
  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: String}) type: ObcGaugeRadialType =
    ObcGaugeRadialType.filled;
  @property({type: Boolean}) tickmarksInside: boolean = false;
  @property({type: String}) tickmarkStyle: TickmarkStyle =
    TickmarkStyle.regular;
  /** Caution/alert arcs. Ignored on `sector: 90-left` / `90-right`. */
  @property({type: Array, attribute: false}) advices: GaugeRadialAdvice[] = [];
  @property({type: String, reflect: true}) sector: GaugeRadialSector =
    GaugeRadialSector.deg270;
  /**
   * Horizontal placement of the dial when the host is wider than the dial
   * (e.g. a short, wide container shrinks the dial to fit the height, leaving
   * horizontal slack). Default `center`.
   */
  @property({type: String})
  horizontalAlignment: GaugeRadialHorizontalAlignment =
    GaugeRadialHorizontalAlignment.center;
  /**
   * Vertical placement of the dial when the host is taller than the dial
   * (e.g. a tall, narrow container shrinks the dial to fit the width, leaving
   * vertical slack). Default `center`.
   */
  @property({type: String}) verticalAlignment: GaugeRadialVerticalAlignment =
    GaugeRadialVerticalAlignment.center;
  /**
   * When `true`, shows the centre `<obc-readout>`(s) with the current value
   * (and optional `label`/`unit`). Layout depends on `sector` and `type`.
   * Default `false`.
   */
  @property({type: Boolean}) hasReadout = false;
  @property({type: String}) label = '';
  @property({type: String}) unit = '';
  @property({type: Number}) fractionDigits = 0;

  private get sectorAngles(): {sweep: number; start: number} {
    switch (this.sector) {
      case GaugeRadialSector.deg180:
        return {sweep: 180, start: -90};
      case GaugeRadialSector.deg90Left:
        return {sweep: 90, start: -90};
      case GaugeRadialSector.deg90Right:
        return {sweep: 90, start: 0};
      case GaugeRadialSector.deg270:
      default:
        return {sweep: 270, start: -135};
    }
  }

  /**
   * Per-edge crop (%) of the shared, origin-centered 448 SVG box each sector
   * shows. All sectors render at the same natural scale, so the dial stays the
   * same size; the sector only windows a different part (270 whole, 180 wide,
   * 90 a quadrant).
   */
  private get sectorClips(): {
    top: number;
    bottom: number;
    left: number;
    right: number;
  } {
    switch (this.sector) {
      case GaugeRadialSector.deg180:
        return {top: 0, bottom: 44, left: 0, right: 0};
      case GaugeRadialSector.deg90Left:
        return {top: 0, bottom: 45, left: 0, right: 45};
      case GaugeRadialSector.deg90Right:
        return {top: 0, bottom: 45, left: 45, right: 0};
      case GaugeRadialSector.deg270:
      default:
        return {top: 0, bottom: 0, left: 0, right: 0};
    }
  }

  private get isSector90(): boolean {
    return (
      this.sector === GaugeRadialSector.deg90Left ||
      this.sector === GaugeRadialSector.deg90Right
    );
  }

  // Arrow form so `this` binds when passed as `.getAngle=${this.getAngle}`
  // to <obc-instrument-radial>. Do not convert to a method.
  getAngle = (v: number): number => {
    const {sweep, start} = this.sectorAngles;
    const span = this.maxValue - this.minValue;
    if (!Number.isFinite(span) || span <= 0) {
      return start;
    }

    return ((v - this.minValue) / span) * sweep + start;
  };

  /** Renders one gauge readout; `withMeta`/`withValue` pick parts. */
  private renderReadout({
    className,
    stacking,
    alignment = ReadoutAlignment.vertical,
    withMeta = true,
    withValue = true,
  }: {
    className: string;
    stacking?: ReadoutStacking;
    alignment?: ReadoutAlignment;
    withMeta?: boolean;
    withValue?: boolean;
  }): TemplateResult {
    return renderInstrumentReadout({
      className,
      stacking,
      alignment,
      hasValue: withValue,
      value: withValue ? this.value : undefined,
      priority: withValue ? this.priority : undefined,
      fractionDigits: this.fractionDigits,
      label: withMeta ? this.label : '',
      unit: withMeta ? this.unit : '',
    });
  }

  private renderReadouts() {
    if (!this.hasReadout) {
      return nothing;
    }

    const isNeedle = this.type === ObcGaugeRadialType.needle;
    const is90 = this.isSector90;
    const is180 = this.sector === GaugeRadialSector.deg180;

    if (isNeedle && (is180 || is90)) {
      return nothing;
    }

    // 90 filled/bar: enhanced corner readout (bold value + label/unit).
    if (is90) {
      return this.renderReadout({
        className: 'gauge-readout-meta',
      });
    }

    // 270 needle and 180 filled/bar: centered stack (value weight follows `priority`).
    if (isNeedle || is180) {
      return this.renderReadout({
        className: 'gauge-readout-meta',
        stacking: ReadoutStacking.stacked,
        alignment: ReadoutAlignment.center,
      });
    }

    // 270 filled/bar: the value sits at the circle center and the label/unit row
    // lower in the bottom gap, so they are two separately-positioned readouts.
    return html`
      ${this.renderReadout({
        className: 'gauge-readout-value',
        withMeta: false,
      })}
      ${this.label || this.unit
        ? this.renderReadout({
            className: 'gauge-readout-meta',
            stacking: ReadoutStacking.stacked,
            alignment: ReadoutAlignment.center,
            withValue: false,
          })
        : nothing}
    `;
  }

  override render() {
    const clips = this.sectorClips;
    return html`
      <div
        class=${classMap({
          'gauge-radial-root': true,
          'type-needle': this.type === ObcGaugeRadialType.needle,
          'sector-180': this.sector === GaugeRadialSector.deg180,
          'sector-90-left': this.sector === GaugeRadialSector.deg90Left,
          'sector-90-right': this.sector === GaugeRadialSector.deg90Right,
          [`halign-${this.horizontalAlignment}`]: true,
          [`valign-${this.verticalAlignment}`]: true,
        })}
      >
        <obc-instrument-radial
          .value=${this.value}
          .state=${this.state}
          .priority=${this.priority}
          .setpoint=${this.setpoint}
          .newSetpoint=${this.newSetpoint}
          .setpointAtZeroDeadband=${this.setpointAtZeroDeadband}
          .setpointOverride=${this.setpointOverride}
          .touching=${this.touching}
          .autoAtSetpoint=${this.autoAtSetpoint}
          .autoAtSetpointDeadband=${this.autoAtSetpointDeadband}
          .animateSetpoint=${this.animateSetpoint}
          .maxValue=${this.maxValue}
          .minValue=${this.minValue}
          .getAngle=${this.getAngle}
          .showLabels=${this.showLabels}
          .primaryTickmarkInterval=${this.primaryTickmarkInterval}
          .secondaryTickmarkInterval=${this.secondaryTickmarkInterval}
          .tertiaryTickmarkInterval=${this.tertiaryTickmarkInterval}
          .type=${this.type}
          .needleType=${this.type}
          .tickmarksInside=${this.tickmarksInside}
          .tickmarkStyle=${this.tickmarkStyle}
          .advices=${this.isSector90 ? [] : this.advices}
          .clipTop=${clips.top}
          .clipBottom=${clips.bottom}
          .clipLeft=${clips.left}
          .clipRight=${clips.right}
          .endLabelsMaxMin=${this.sector === GaugeRadialSector.deg180}
        >
        </obc-instrument-radial>
        ${this.renderReadouts()}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-radial': ObcGaugeRadial;
  }
}
