import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../valve-analog-three-way-icon/valve-analog-three-way-icon.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButton} from '../automation-button/abstract-automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {
  ThreewayValveFlow,
  ThreewayValveOrientation,
  threewayValveReadouts,
} from '../threeway-valve-shared/threeway-valve-shared.js';

export enum AnalogThreewayValveVariant {
  regular = 'regular',
  flat = 'flat',
}

/**
 * `<obc-analog-threeway-valve>` – three-way control valve for process
 * diagrams, with a continuous opening per port.
 *
 * ## Features
 *
 * - **Three ports:** `open1`, `open2` and `open3` set each port's opening in
 *   percent. Ports are numbered from the side without a port: with
 *   `orientation` `bottom`, port 1 is left, port 2 is the stem at the bottom
 *   and port 3 is right. The numbering turns with the symbol.
 * - **Symbol:** a partly open port shows its shut part as a band at the port
 *   end, a port at 0 % is drawn plugged, and the handle shows how the most
 *   open port splits between the two others (`obc-valve-analog-three-way-icon`).
 * - **Orientation:** `bottom` and `top` lay the valve on a horizontal pipe,
 *   `left` and `right` on a vertical one; the value names the side the stem
 *   points to.
 * - **Flow readout:** `flows` lists one readout row per flow, each with an
 *   optional arrow direction and either a value with a unit (`%` when left out)
 *   or a state, `{open}`, shown as `Open` or `Closed`. Without flows
 *   the readout shows `Open` or `Closed`.
 * - Badges, alert frame, progress and readout placement come from the shared
 *   automation button base.
 *
 * ## Usage Guidelines
 *
 * Use for a mixing or diverting valve that opens its ports continuously.
 * With fewer than two ports open no flow can pass, and the valve shows as
 * closed. For on/off ports use `obc-digital-threeway-valve`; for a two-port
 * control valve use `obc-analog-valve`.
 *
 * @property open1 - Opening of port 1 in percent (0–100).
 * @property open2 - Opening of port 2, the stem, in percent (0–100).
 * @property open3 - Opening of port 3 in percent (0–100).
 * @property orientation - Side the stem points to.
 * @property flows - Readout rows, one per flow: an optional arrow direction with either a value and optional unit (default `%`) or `open` for an `Open`/`Closed` state.
 * @property variant - Visual style of the button surround.
 * @experimental
 */
@customElement('obc-analog-threeway-valve')
export class ObcAnalogThreewayValve extends ObcAbstractAutomationButton {
  @property({type: Number}) open1: number = 0;
  @property({type: Number}) open2: number = 0;
  @property({type: Number}) open3: number = 0;
  @property({type: String}) orientation: ThreewayValveOrientation =
    ThreewayValveOrientation.bottom;
  @property({type: Array, attribute: false}) flows: ThreewayValveFlow[] = [];
  @property({type: String}) variant: AnalogThreewayValveVariant =
    AnalogThreewayValveVariant.regular;

  override get _on(): boolean {
    return (
      [this.open1, this.open2, this.open3].filter((o) => o > 0).length >= 2
    );
  }

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    if (!this.showStatus) {
      return [];
    }
    return threewayValveReadouts(this._on, this.flows);
  }

  private renderIcon(slot: string) {
    return html`<obc-valve-analog-three-way-icon
      .open1=${this.open1}
      .open2=${this.open2}
      .open3=${this.open3}
      .orientation=${this.orientation}
      slot=${slot}
    ></obc-valve-analog-three-way-icon>`;
  }

  override get icon() {
    return html`${this.renderIcon('icon')}${this.renderIcon('icon-silhouette')}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-analog-threeway-valve': ObcAnalogThreewayValve;
  }
}
