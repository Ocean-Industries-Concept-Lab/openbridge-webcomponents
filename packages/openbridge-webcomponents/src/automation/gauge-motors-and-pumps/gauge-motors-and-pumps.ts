import {html, type PropertyValues, type TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import '../../icons/icon-pump-on-horizontal.js';
import '../../icons/icon-energy-battery.js';
import {
  ObcGaugeProportional,
  GaugeProportionalSector,
} from '../../navigation-instruments/gauge-proportional/gauge-proportional.js';

/**
 * The design's Type axis: single value, bipolar (pos/neg) scale, or the
 * primary-secondary frame.
 */
export enum GaugeMotorsAndPumpsType {
  regular = 'regular',
  negative = 'negative',
  double = 'double',
}

/**
 * `<obc-gauge-motors-and-pumps>` — Proportional radial gauge preset for
 * motorized devices (the "Gauge-motors-and-pumps" design).
 *
 * A device-named preset of {@link ObcGaugeProportional}: the open `270`
 * sector and a baked-in pump symbol, with every gauge property (`value`,
 * `secondaryValue`, `large`, `tag`, `advices`, setpoint bundle, …) inherited
 * unchanged.
 *
 * ## Features / Variants
 *
 * - `type`: `regular` (single value), `negative` (bipolar scale on the
 *   pos/neg sector — `minValue` defaults to `-maxValue`; set `minValue`
 *   yourself for an asymmetric scale), or `double` (primary-secondary
 *   frame; feed the second lane and readout row via `secondaryValue`).
 *   The sector follows the type; do not set `sector` directly on this
 *   component.
 * - `large` shows the detailed face (readout and name row); the compact
 *   default shows the icon-only face with the readout stack below. Unlike
 *   the base gauge, `hasReadout` defaults to `true` so the large face is
 *   detailed out of the box.
 * - Ships the pump symbol as slot fallback; slot `icon` to swap it for a
 *   motor, fan, or vertical-pump symbol. The compact stack's secondary row
 *   ships the design's battery icon the same way (slot `secondary-icon`).
 * - Overload zones render via `advices` (hatched caution arc).
 *
 * ## Usage Guidelines
 *
 * Use for motor/pump speed or load on overview displays. For the schematic
 * (button) representation of the same devices, use `obc-pump` or
 * `obc-motor`; for a generic gauge with a custom device symbol, use
 * `obc-gauge-proportional` directly.
 *
 * ## Slots
 *
 * | Slot             | Purpose                                                        |
 * | ---------------- | -------------------------------------------------------------- |
 * | `icon`           | Replaces the default pump symbol (`obi-*` icon)                |
 * | `secondary-icon` | Replaces the battery icon on the compact stack's secondary row |
 *
 * @element obc-gauge-motors-and-pumps
 *
 * @property type - The design's Type axis; drives the sector and the split frame.
 * @slot icon - Replaces the default pump symbol (`obi-*` icon)
 * @slot secondary-icon - Replaces the battery icon on the compact stack's secondary row
 * @experimental
 */
@customElement('obc-gauge-motors-and-pumps')
export class ObcGaugeMotorsAndPumps extends ObcGaugeProportional {
  @property({type: String}) type: GaugeMotorsAndPumpsType =
    GaugeMotorsAndPumpsType.regular;

  constructor() {
    super();
    this.hasReadout = true;
  }

  /* The minValue this component last derived itself — distinguishes the
     mirrored default from a consumer's explicit (asymmetric) minValue. */
  private autoMinValue: number | undefined;

  protected override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    if (changed.has('type')) {
      this.sector =
        this.type === GaugeMotorsAndPumpsType.negative
          ? GaugeProportionalSector.deg270PosNeg
          : GaugeProportionalSector.deg270;
      if (
        this.type !== GaugeMotorsAndPumpsType.negative &&
        this.autoMinValue !== undefined
      ) {
        if (this.minValue === this.autoMinValue) {
          this.minValue = 0;
        }
        this.autoMinValue = undefined;
      }
    }
    // The design's negative type mirrors the scale: minValue defaults to
    // -maxValue unless the consumer set an asymmetric minValue themselves.
    if (this.type === GaugeMotorsAndPumpsType.negative) {
      const minValueIsDerived =
        this.minValue === 0 || this.minValue === this.autoMinValue;
      if (minValueIsDerived && this.minValue !== -this.maxValue) {
        this.autoMinValue = -this.maxValue;
        this.minValue = this.autoMinValue;
      }
    }
  }

  protected override get isSplit(): boolean {
    return this.type === GaugeMotorsAndPumpsType.double || super.isSplit;
  }

  protected override get icon(): TemplateResult {
    return html`<slot name="icon">
      <obi-pump-on-horizontal usecsscolor></obi-pump-on-horizontal>
    </slot>`;
  }

  protected override get secondaryIconFallback(): TemplateResult {
    return html`<obi-energy-battery usecsscolor></obi-energy-battery>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-motors-and-pumps': ObcGaugeMotorsAndPumps;
  }
}
