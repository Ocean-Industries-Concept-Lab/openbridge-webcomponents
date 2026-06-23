import {property} from 'lit/decorators.js';
import {ObcAbstractAutomationButton} from '../automation-button/abstract-automation-button.js';
import {
  AutomationButtonDirection,
  AutomationButtonLabelDirection,
} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';

export enum MotorizedVariant {
  regular = 'regular',
  double = 'double',
  forward = 'forward',
  flat = 'flat',
  flatForward = 'flat-forward',
}

export class ObcAbstractAutomationButtonMotorized extends ObcAbstractAutomationButton {
  @property({type: Boolean}) on: boolean = false;
  /**
   * @deprecated Use `speed` together with `speedUnit` instead. When `speed`
   * is set it takes precedence over `speedInPercent`.
   */
  @property({type: Number}) speedInPercent: number = 0;
  @property({type: Number}) speed?: number;
  @property({type: String}) speedUnit: string = '%';
  @property({type: Number}) speedMaxDigits: number = 3;
  @property({type: String}) labelDirection: AutomationButtonLabelDirection =
    AutomationButtonLabelDirection.right;
  @property({type: String}) variant: MotorizedVariant =
    MotorizedVariant.regular;
  /** @availableWhen variant in [double, forward, flatForward] */
  @property({type: String}) direction: AutomationButtonDirection =
    AutomationButtonDirection.forward;

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    const speed = this.speed ?? this.speedInPercent;
    if (speed !== undefined && speed !== null && this.on) {
      return [
        {
          type: 'value',
          value: speed,
          nDigits: this.speedMaxDigits,
          unit: this.speedUnit,
          direction: this.labelDirection,
          icon:
            this.labelDirection === AutomationButtonLabelDirection.none
              ? 'none'
              : 'chevron',
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
