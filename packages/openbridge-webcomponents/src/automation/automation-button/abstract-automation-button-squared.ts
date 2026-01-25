import {property} from 'lit/decorators.js';
import {ObcAbstractAutomationButton} from './abstract-automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';

export enum SquaredVariant {
  square = 'square',
  flat = 'flat',
}

export class ObcAbstractAutomationButtonSquared extends ObcAbstractAutomationButton {
  @property({type: Boolean}) on: boolean = false;
  // @ts-expect-error - can be any of the MotorizedVariant, not square
  override variant: SquaredVariant = SquaredVariant.square;

  override get extraReadouts(): AutomationButtonReadoutStack[] {
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
