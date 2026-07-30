import {html, type TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import '../../icons/icon-diesel-generator-dc.js';
import {
  ObcGaugeProportional,
  GaugeProportionalSector,
} from '../../navigation-instruments/gauge-proportional/gauge-proportional.js';

/** The design's Type axis: single value or the primary-secondary frame. */
export enum GaugeGeneratorType {
  regular = 'regular',
  double = 'double',
}

/**
 * `<obc-gauge-generator>` — Proportional radial gauge preset for generators
 * (the "Gauge-generator" design).
 *
 * A device-named preset of {@link ObcGaugeProportional}: the full-circle
 * sector and a baked-in generator symbol, with every gauge property
 * (`value`, `secondaryValue`, `large`, `tag`, setpoint bundle, …) inherited
 * unchanged.
 *
 * ## Features / Variants
 *
 * - `type`: `regular` (single value) or `double` (primary-secondary frame;
 *   feed the second lane and readout row via `secondaryValue`).
 * - Always the `360` sector (generator load wraps the full dial).
 * - `large` shows the detailed face (readout and name row); the compact
 *   default shows the icon-only face with the readout stack below. Unlike
 *   the base gauge, `hasReadout` defaults to `true` so the large face is
 *   detailed out of the box.
 * - Ships the generator symbol as slot fallback; slot `icon` to swap it
 *   (e.g. an AC variant).
 *
 * ## Usage Guidelines
 *
 * Use for generator load/output on overview displays. For a generic gauge
 * with a custom device symbol, use `obc-gauge-proportional` directly.
 *
 * ## Slots
 *
 * | Slot   | Purpose                                              |
 * | ------ | ---------------------------------------------------- |
 * | `icon` | Replaces the default generator symbol (`obi-*` icon) |
 *
 * @slot icon - Replaces the default generator symbol (`obi-*` icon)
 *
 * @element obc-gauge-generator
 * @experimental
 */
@customElement('obc-gauge-generator')
export class ObcGaugeGenerator extends ObcGaugeProportional {
  /** The design's Type axis; `double` renders the primary-secondary frame. */
  @property({type: String}) type: GaugeGeneratorType =
    GaugeGeneratorType.regular;

  constructor() {
    super();
    this.sector = GaugeProportionalSector.deg360;
    this.hasReadout = true;
  }

  protected override get isSplit(): boolean {
    return this.type === GaugeGeneratorType.double || super.isSplit;
  }

  protected override get icon(): TemplateResult {
    return html`<slot name="icon">
      <obi-diesel-generator-dc usecsscolor></obi-diesel-generator-dc>
    </slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-generator': ObcGaugeGenerator;
  }
}
