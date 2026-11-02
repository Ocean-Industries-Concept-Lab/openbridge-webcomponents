import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {AutomationButtonHandlePosition} from '../automation-button/automation-button.js';
import {flowHandlePosition} from '../digital-valve/digital-valve.js';
import {
  DirectionValveVariant,
  ObcDirectionValveBase,
} from '../direction-valve-shared/direction-valve-shared.js';
import {
  NorvarValveActuator,
  NorvarValvePosition,
  norvarActuatorIcon,
  norvarValveIcon,
} from './norvar-valve-art.js';

export {NorvarValveActuator};

/**
 * `<norvar-valve>` – on/off valve drawn with the symbols of NORVAR report
 * 153/2007, for process diagrams.
 *
 * **Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.** That is why the tag has no `obc-` prefix.
 *
 * ## Features
 *
 * - **Position:** `open` draws a filled middle field, closed an empty one. While
 *   `progress` is set the symbol shows the middle position.
 * - **Alarm:** `alert` colours the triangles and leaves the middle field showing
 *   the position.
 * - **Actuator:** `actuator` draws the operating device of the valve type.
 * - **Flow direction:** `flowDirection` lays the valve on the pipe, and the
 *   symbol and actuator turn with it.
 * - Badges, alert frame, progress and readout placement come from the shared
 *   automation button base.
 *
 * ## Usage Guidelines
 *
 * Use where a diagram has to follow the symbols of the report. Everywhere else
 * use `obc-digital-valve`.
 *
 * @property variant - `flat` draws only the symbol, `regular` adds the round button.
 * @property open - Whether the valve is open.
 * @property actuator - The operating device: `manual` (HV), `motor` (MV), `pneumatic` (PV), `hydraulic` (VH), `solenoid` (SV) or `control` (RV).
 * @property invertHandlePosition - Puts the actuator on the opposite side of the pipe.
 * @availableWhen invertHandlePosition actuator!=none
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 * @experimental
 */
@customElement('norvar-valve')
export class ObcNorvarValve extends ObcDirectionValveBase {
  @property({type: String}) override variant: DirectionValveVariant =
    DirectionValveVariant.flat;
  @property({type: Boolean}) open: boolean = false;
  @property({type: String}) actuator: NorvarValveActuator =
    NorvarValveActuator.none;
  @property({type: Boolean}) invertHandlePosition: boolean = false;

  override get _on(): boolean {
    return this.open;
  }

  protected override get equipmentName(): string {
    return 'NORVAR valve';
  }

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    if (!this.showStatus) {
      return [];
    }
    return this.open
      ? [{type: 'state-on', value: 'Open', hasIcon: this.showStatusIcon}]
      : [{type: 'state-off', value: 'Closed', hasIcon: this.showStatusIcon}];
  }

  override get _handlePosition(): AutomationButtonHandlePosition {
    if (this.actuator === NorvarValveActuator.none) {
      return AutomationButtonHandlePosition.none;
    }
    return flowHandlePosition(this.flowDirection, this.invertHandlePosition);
  }

  override get _handle() {
    return norvarActuatorIcon(this.actuator, this._handlePosition, this.static);
  }

  private get position(): NorvarValvePosition {
    if (this.progress) {
      return NorvarValvePosition.middle;
    }
    return this.open ? NorvarValvePosition.open : NorvarValvePosition.closed;
  }

  override get icon() {
    return norvarValveIcon({
      position: this.position,
      alarm: this.alert,
      isStatic: this.static,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'norvar-valve': ObcNorvarValve;
  }
}
