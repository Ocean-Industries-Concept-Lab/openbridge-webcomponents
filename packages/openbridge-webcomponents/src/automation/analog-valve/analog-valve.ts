import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../valve-analoge-two-way-icon/valve-analog-two-way-icon.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButton} from '../automation-button/abstract-automation-button.js';
import {
  AutomationButtonHandlePosition,
  AutomationButtonHandleSize,
  AutomationButtonLabelDirection,
} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {ObcValveHandle} from '../automation-button/valve-handle.js';

export enum AnalogValveVariant {
  regular = 'regular',
  flat = 'flat',
}

export {ObcValveHandle};

/**
 * @property handle - The handle or actuator drawn on the valve. It sits on top of a horizontal pipe
 *   and to the right of a vertical one.
 * @property invertHandlePosition - Put the handle on the other side of the valve.
 * @availableWhen invertHandlePosition handle!=none
 * @property handleSize - Size of the handle: `small` draws it from the symbol's centre, for symbols without a button around them.
 * @availableWhen handleSize handle!=none
 * @availableWhen labelDirection open==true
 * @stable
 */
@customElement('obc-analog-valve')
export class ObcAnalogValve extends ObcAbstractAutomationButton {
  @property({type: Boolean}) open: boolean = false;
  @property({type: Number}) value: number = 0;
  @property({type: Boolean}) vertical: boolean = false;
  @property({type: String}) labelDirection: AutomationButtonLabelDirection =
    AutomationButtonLabelDirection.right;
  @property({type: String}) variant: AnalogValveVariant =
    AnalogValveVariant.regular;
  @property({type: String}) handle: ObcValveHandle = ObcValveHandle.none;
  @property({type: Boolean}) invertHandlePosition: boolean = false;
  @property({type: String}) handleSize: AutomationButtonHandleSize =
    AutomationButtonHandleSize.regular;

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    if (!this.showStatus) {
      return [];
    }
    if (this.open) {
      return [
        {
          type: 'value',
          icon:
            this.labelDirection === AutomationButtonLabelDirection.none
              ? 'none'
              : 'arrow',
          value: this.value,
          nDigits: 3,
          unit: '%',
          direction: this.labelDirection,
        },
      ];
    } else {
      return [
        {
          type: 'state-off',
          value: 'Off',
          hasIcon: this.showStatusIcon,
        },
      ];
    }
  }

  override get _on(): boolean {
    return this.open;
  }

  override get _handlePosition(): AutomationButtonHandlePosition {
    if (this.handle === ObcValveHandle.none) {
      return AutomationButtonHandlePosition.none;
    }
    if (this.vertical) {
      return this.invertHandlePosition
        ? AutomationButtonHandlePosition.left
        : AutomationButtonHandlePosition.right;
    }
    return this.invertHandlePosition
      ? AutomationButtonHandlePosition.bottom
      : AutomationButtonHandlePosition.top;
  }

  override get _handleSize(): AutomationButtonHandleSize {
    return this.handleSize;
  }

  /**
   * TODO(designer): the open symbol draws its own handle bar, turning with
   * `value`, so an open valve with `handle` set shows both (#1416).
   */
  override get _handle() {
    return this.renderValveHandle(this.handle);
  }

  override get icon() {
    return html`<obc-valve-analog-two-way-icon
        .value=${this.value}
        .closed=${!this.open}
        .vertical=${this.vertical}
        slot="icon"
      ></obc-valve-analog-two-way-icon>
      <obc-valve-analog-two-way-icon
        .value=${this.value}
        .closed=${!this.open}
        .vertical=${this.vertical}
        slot="icon-silhouette"
      ></obc-valve-analog-two-way-icon> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-analog-valve': ObcAnalogValve;
  }
}
