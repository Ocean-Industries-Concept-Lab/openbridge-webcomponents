import {html, type TemplateResult} from 'lit';
import {customElement} from '../../decorator.js';
import '../../icons/icon-pump-on-horizontal.js';
import {ObcGaugeProportional} from '../../navigation-instruments/gauge-proportional/gauge-proportional.js';

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
 * - Defaults to the `270` sector; set `sector` to `270-pos-neg` with a
 *   negative `minValue` for the design's Negative variant.
 * - Ships the pump symbol as slot fallback; slot `icon` to swap it for a
 *   motor, fan, or vertical-pump symbol.
 * - `secondaryValue` renders the design's Double frame; `large` toggles the
 *   full frame vs the compact face with the readout stack below.
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
 * | Slot   | Purpose                                         |
 * | ------ | ----------------------------------------------- |
 * | `icon` | Replaces the default pump symbol (`obi-*` icon) |
 *
 * @slot icon - Replaces the default pump symbol (`obi-*` icon)
 *
 * @element obc-gauge-motors-and-pumps
 * @experimental
 */
@customElement('obc-gauge-motors-and-pumps')
export class ObcGaugeMotorsAndPumps extends ObcGaugeProportional {
  protected override get icon(): TemplateResult {
    return html`<slot name="icon">
      <obi-pump-on-horizontal usecsscolor></obi-pump-on-horizontal>
    </slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-motors-and-pumps': ObcGaugeMotorsAndPumps;
  }
}
