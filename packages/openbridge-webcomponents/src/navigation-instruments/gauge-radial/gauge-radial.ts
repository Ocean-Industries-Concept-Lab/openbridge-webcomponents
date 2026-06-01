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
import '../readout/readout.js';
import {
  ReadoutStackVerticalAlignment,
  ReadoutVariant,
} from '../readout/readout.js';

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
 *   The configured `minValue..maxValue` always spans the full sector. Symmetric
 *   ranges still place `0` at 12 o'clock.
 * - **Setpoint via mixin**: `setpoint`, `newSetpoint`, `touching`,
 *   `autoAtSetpointDeadband`, `setpointOverride`, and all other setpoint
 *   properties are provided by `SetpointMixin` and forwarded to the inner
 *   `<obc-instrument-radial>`.
 * - **Advice zones**: Pass an array of {@link GaugeRadialAdvice} objects to
 *   render caution/alert arcs on the gauge.
 *
 * ## Usage Guidelines
 *
 * - Set `minValue` / `maxValue` to define the scale range.
 * - Use `priority` to switch between regular and enhanced color palettes.
 * - Provide `primaryTickmarkInterval` and `secondaryTickmarkInterval` to
 *   control tickmark density.
 * - Enable `showLabels` to show numeric labels at primary tickmarks.
 * - Enable `showReadout` with optional `label` and `unit`. Layout depends on `sector`
 *   and `type`: **270** filled/bar — centered value plus bottom label/unit row;
 *   **270** needle — bottom stack; **180** filled/bar — bottom stack; **180** needle —
 *   no readout; **90-left** / **90-right** filled/bar — corner regular readout in a
 *   fixed 200×200 host; **90** needle — no readout.
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
  @property({type: Array, attribute: false}) advices: GaugeRadialAdvice[] = [];
  @property({type: String, reflect: true}) sector: GaugeRadialSector =
    GaugeRadialSector.deg270;
  @property({type: Boolean}) showReadout = false;
  @property({type: String}) label = '';
  @property({type: String}) unit = '';
  @property({type: Number}) maxDigits = 1;
  @property({type: Number}) fractionDigits = 0;
  @property({type: Boolean}) showZeroPadding = false;

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

  getAngle = (v: number): number => {
    const {sweep, start} = this.sectorAngles;
    const span = this.maxValue - this.minValue;
    if (!Number.isFinite(span) || span <= 0) {
      return start;
    }

    return ((v - this.minValue) / span) * sweep + start;
  };

  private renderCornerReadout(): TemplateResult {
    return html`
      <obc-readout
        class="gauge-readout-meta"
        direction="vertical"
        .variant=${ReadoutVariant.enhanced}
        .valuePriority=${this.priority}
        .value=${this.value}
        .minValueLength=${this.maxDigits}
        .fractionDigits=${this.fractionDigits}
        .showZeroPadding=${this.showZeroPadding}
        .label=${this.label}
        .unit=${this.unit}
      ></obc-readout>
    `;
  }

  private renderBottomStackReadout(
    alignment: ReadoutStackVerticalAlignment = ReadoutStackVerticalAlignment.center
  ): TemplateResult {
    return html`
      <obc-readout
        class="gauge-readout-meta"
        direction="vertical"
        .variant=${ReadoutVariant.stack}
        .alignment=${alignment}
        .valuePriority=${this.priority}
        .value=${this.value}
        .minValueLength=${this.maxDigits}
        .fractionDigits=${this.fractionDigits}
        .showZeroPadding=${this.showZeroPadding}
        .label=${this.label}
        .unit=${this.unit}
      ></obc-readout>
    `;
  }

  private renderCenterValueReadout(): TemplateResult {
    return html`
      <obc-readout
        class="gauge-readout-value"
        direction="vertical"
        .variant=${ReadoutVariant.enhanced}
        .valuePriority=${this.priority}
        .value=${this.value}
        .minValueLength=${this.maxDigits}
        .fractionDigits=${this.fractionDigits}
        .showZeroPadding=${this.showZeroPadding}
      ></obc-readout>
    `;
  }

  private renderLabelOnlyMetaReadout(): TemplateResult | typeof nothing {
    if (!this.label && !this.unit) {
      return nothing;
    }

    return html`
      <obc-readout
        class="gauge-readout-meta"
        direction="vertical"
        labelOnly
        .variant=${ReadoutVariant.stack}
        .alignment=${ReadoutStackVerticalAlignment.center}
        .label=${this.label}
        .unit=${this.unit}
      ></obc-readout>
    `;
  }

  private renderReadouts() {
    if (!this.showReadout) {
      return nothing;
    }

    const isNeedle = this.type === ObcGaugeRadialType.needle;
    const is90 =
      this.sector === GaugeRadialSector.deg90Left ||
      this.sector === GaugeRadialSector.deg90Right;
    const is180 = this.sector === GaugeRadialSector.deg180;

    if (isNeedle && (is180 || is90)) {
      return nothing;
    }

    if (is90) {
      return this.renderCornerReadout();
    }

    if (isNeedle || is180) {
      return this.renderBottomStackReadout();
    }

    return html`
      ${this.renderCenterValueReadout()} ${this.renderLabelOnlyMetaReadout()}
    `;
  }

  override render() {
    const is90Sector =
      this.sector === GaugeRadialSector.deg90Left ||
      this.sector === GaugeRadialSector.deg90Right;
    return html`
      <div
        class=${classMap({
          'gauge-radial-root': true,
          'type-needle': this.type === ObcGaugeRadialType.needle,
          'sector-180': this.sector === GaugeRadialSector.deg180,
          'sector-90-left': this.sector === GaugeRadialSector.deg90Left,
          'sector-90-right': this.sector === GaugeRadialSector.deg90Right,
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
          .advices=${this.advices}
          .zoomToFitArc=${this.sector !== GaugeRadialSector.deg270}
          .preserveBandProportion=${is90Sector}
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
