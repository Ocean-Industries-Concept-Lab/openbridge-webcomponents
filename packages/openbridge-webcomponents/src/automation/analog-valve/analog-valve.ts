import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../valve-analoge-two-way-icon/valve-analog-two-way-icon.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButton} from '../automation-button/abstract-automation-button.js';
import {AutomationButtonLabelDirection} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';

export enum AnalogValveVariant {
  regular = 'regular',
  flat = 'flat',
}

@customElement('obc-analog-valve')
export class ObcAnalogValve extends ObcAbstractAutomationButton {
  @property({type: Boolean}) open: boolean = false;
  @property({type: Number}) value: number = 0;
  @property({type: Boolean}) vertical: boolean = false;
  @property({type: String}) labelDirection: AutomationButtonLabelDirection =
    AutomationButtonLabelDirection.right;
  @property({type: String}) variant: AnalogValveVariant =
    AnalogValveVariant.regular;

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    if (this.open) {
      return [
        {
          type: 'value',
          icon: 'arrow',
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
          hasIcon: true,
        },
      ];
    }
  }

  override get _on(): boolean {
    return this.open;
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
