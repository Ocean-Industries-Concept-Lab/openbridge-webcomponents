import {property} from 'lit/decorators.js';
import {ObcAbstractAutomationButton} from './abstract-automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {AutomationButtonOrientation} from './automation-button.js';

export enum SquaredVariant {
  square = 'square',
  flat = 'flat',
}

/**
 * Base class for two-state automation buttons.
 *
 * Extends `ObcAbstractAutomationButton` with the on/off state: the subclass
 * picks its icon from `turnedOn`, and the readout adds the `On` or `Off`
 * state row.
 *
 * ## Usage Guidelines
 *
 * Not registered as a custom element. `obc-switch`, `obc-converter`,
 * `obc-diodes` and the other two-state devices extend it and supply their own
 * `icon`.
 *
 * @property turnedOn - Whether the device is on. Selects the on icon and the
 * `On` state row instead of `Off`. Not named `on`, which Svelte binds as an
 * event listener in markup (#1090).
 */
export class ObcAbstractAutomationButtonSquared extends ObcAbstractAutomationButton {
  @property({type: Boolean}) turnedOn: boolean = false;
  @property({type: String}) variant: SquaredVariant = SquaredVariant.square;
  @property({type: String}) orientation: AutomationButtonOrientation =
    AutomationButtonOrientation.horizontal;

  override get _orientation(): AutomationButtonOrientation {
    return this.orientation;
  }

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    if (!this.showStatus) {
      return [];
    }
    if (this.turnedOn) {
      return [
        {
          type: 'state-on',
          value: 'On',
          hasIcon: true,
        },
      ];
    } else {
      return [
        {
          type: 'state-off',
          value: 'Off',
          hasIcon: true,
        },
      ];
    }
  }

  override get _on(): boolean {
    return this.turnedOn;
  }
}
