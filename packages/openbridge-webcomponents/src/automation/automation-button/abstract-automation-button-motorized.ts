import {property} from 'lit/decorators.js';
import {ObcAbstractAutomationButton} from '../automation-button/abstract-automation-button.js';
import {AutomationButtonLabelDirection} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';

export enum MotorizedVariant {
  regular = 'regular',
  double = 'double',
  flat = 'flat',
}

export class ObcAbstractAutomationButtonMotorized extends ObcAbstractAutomationButton {
  @property({type: Boolean}) on: boolean = false;
  @property({type: Number}) speedInPercent: number = 0;
  @property({type: String}) labelDirection: AutomationButtonLabelDirection =
    AutomationButtonLabelDirection.right;

  // @ts-expect-error - can be any of the MotorizedVariant, not square
  override variant: MotorizedVariant;

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    if (
      this.speedInPercent !== undefined &&
      this.speedInPercent !== null &&
      this.on
    ) {
      return [
        {
          type: 'value',
          value: this.speedInPercent,
          nDigits: 3,
          unit: '%',
          direction: this.labelDirection,
          icon: 'chevron',
        },
      ];
    } else if (!this.on) {
      return [
        {
          type: 'state-off',
          value: 'Off',
          hasIcon: true,
        },
      ];
    }
    return [];
  }

  override get _on(): boolean {
    return this.on;
  }
}
