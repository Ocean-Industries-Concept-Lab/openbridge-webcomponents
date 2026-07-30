import {html, type TemplateResult} from 'lit';
import {customElement} from '../../decorator.js';
import '../../icons/icon-diesel-generator-dc.js';
import {
  ObcGaugeProportional,
  GaugeProportionalSector,
} from '../../navigation-instruments/gauge-proportional/gauge-proportional.js';

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
 * - Defaults to the `360` sector (generator load wraps the full dial).
 * - Ships the generator symbol as slot fallback; slot `icon` to swap it
 *   (e.g. an AC variant).
 * - `secondaryValue` renders the design's Double frame; `large` toggles the
 *   full frame vs the compact face with the readout stack below.
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
  constructor() {
    super();
    this.sector = GaugeProportionalSector.deg360;
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
