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
 * **TODO(designer):** the icons file has no static battery symbol, so a
 * `static` battery keeps its on or off icon.
 *
 * Without a visible tag the button is named `Battery`, followed by the state
 * (`Battery On`) when the state row is shown.
 *
 * @slot badge-top-right - Content projected into the top-right badge position; overrides `badgeAlert`.
 * @slot badge-top-left - Content projected into the top-left badge position; overrides `badgeControl`.
 * @slot badge-bottom-left - Content projected into the bottom-left badge position; overrides `badgeInterlock`.
 * @slot badge-bottom-right - Content projected into the bottom-right badge position; overrides `badgeCommandLocked`.
 * @fires click - Fired when the battery is clicked.
 * @experimental
 */
@customElement('obc-electricity-battery')
export class ObcElectricityBattery extends ObcAbstractAutomationButtonSquared {
  override get _accessibleName(): string | null {
    if (!this.showReadoutStack) return 'Battery';
    if (this.tag) return null;
    return this.showStatus
      ? `Battery ${this.turnedOn ? 'On' : 'Off'}`
      : 'Battery';
  }

  override get icon() {
    return this.renderDeviceIcon({
      on: 'electricity-battery-on',
      off: 'electricity-battery-off',
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-electricity-battery': ObcElectricityBattery;
  }
}
