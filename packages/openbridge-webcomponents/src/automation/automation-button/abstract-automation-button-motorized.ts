import {PropertyValues} from 'lit';
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

/**
 * Base class for motor-driven automation buttons.
 *
 * Extends `ObcAbstractAutomationButton` with the running state and the speed
 * readout: while the device is on it adds a value row carrying `speed` in
 * `speedUnit`, and while it is off it adds the `Off` state row instead.
 *
 * ## Usage Guidelines
 *
 * Not registered as a custom element. `obc-fan`, `obc-motor` and `obc-pump`
 * extend it and supply their own `icon` and `variant`.
 *
 * @property turnedOn - Whether the device is running. Selects the running
 * icon and the speed readout instead of the `Off` state. Not named `on`,
 * which Svelte binds as an event listener in markup (#1090).
 * @property on - Alias of `turnedOn` for 1.x markup: setting it sets
 * `turnedOn`.
 * @availableWhen direction variant in [double, forward, flatForward]
 */
export class ObcAbstractAutomationButtonMotorized extends ObcAbstractAutomationButton {
  @property({type: Boolean}) turnedOn: boolean = false;
  /** @deprecated Use `turnedOn`. */
  // eslint-disable-next-line openbridge/no-event-like-property-name -- deprecated alias kept for 1.x markup (#1090)
  @property({type: Boolean}) on?: boolean;
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
  @property({type: String}) direction: AutomationButtonDirection =
    AutomationButtonDirection.forward;

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    const speed = this.speed ?? this.speedInPercent;
    if (!this.showStatus) {
      return [];
    }
    if (speed !== undefined && speed !== null && this.turnedOn) {
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
    } else if (!this.turnedOn) {
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

  override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);
    if (changed.has('on') && this.on !== undefined) {
      this.turnedOn = this.on;
    }
  }

  override get _on(): boolean {
    return this.turnedOn;
  }
}
