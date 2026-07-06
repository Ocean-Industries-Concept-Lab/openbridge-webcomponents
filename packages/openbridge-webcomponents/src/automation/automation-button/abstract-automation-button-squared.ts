import {property} from 'lit/decorators.js';
import {ObcAbstractAutomationButton} from './abstract-automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {AutomationButtonOrientation} from './automation-button.js';

export enum SquaredVariant {
  square = 'square',
  flat = 'flat',
}

export class ObcAbstractAutomationButtonSquared extends ObcAbstractAutomationButton {
  @property({type: Boolean}) on: boolean = false;
  @property({type: String}) variant: SquaredVariant = SquaredVariant.square;
  @property({type: String}) orientation: AutomationButtonOrientation =
    AutomationButtonOrientation.horizontal;
  @property({type: Boolean, attribute: false}) showReadoutOnOffState: boolean =
    true;

  override get _orientation(): AutomationButtonOrientation {
    return this.orientation;
  }

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    if (!this.showReadoutOnOffState) {
      return [];
    }
    if (this.on) {
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
    return this.on;
  }
}
