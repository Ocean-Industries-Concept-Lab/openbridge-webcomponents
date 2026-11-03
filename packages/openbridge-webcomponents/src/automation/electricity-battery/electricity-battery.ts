import {html} from 'lit';
import '../../icons/icon-electricity-battery-on.js';
import '../../icons/icon-electricity-battery-off.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';

/**
 * `<obc-electricity-battery>` – Battery symbol for electrical automation diagrams.
 *
 * Shows the battery as an on/off device with the readout stack, badges and
 * alert frame of the other two-state devices.
 *
 * ## Usage Guidelines
 *
 * Use it to place a battery on an electrical one-line diagram. For a battery's
 * charge level, use `obc-indicator-battery`; for a battery tank with a fill
 * level, use `obc-automation-tank`.
 *
 * @experimental
 */
@customElement('obc-electricity-battery')
export class ObcElectricityBattery extends ObcAbstractAutomationButtonSquared {
  override get icon() {
    if (this.turnedOn) {
      return html`<obi-electricity-battery-on
          usecsscolor
          slot="icon"
        ></obi-electricity-battery-on>
        <obi-electricity-battery-on
          usecsscolor
          slot="icon-silhouette"
        ></obi-electricity-battery-on>`;
    }
    return html`<obi-electricity-battery-off
        usecsscolor
        slot="icon"
      ></obi-electricity-battery-off>
      <obi-electricity-battery-off
        usecsscolor
        slot="icon-silhouette"
      ></obi-electricity-battery-off>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-electricity-battery': ObcElectricityBattery;
  }
}
