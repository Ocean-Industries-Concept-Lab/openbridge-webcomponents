import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {
  AutomationBottonLabelStyle,
  AutomationButtonLabelPosition,
  AutomationButtonLabelSize,
  AutomationButtonSize,
  AutomationButtonState,
  AutomationButtonTagLabel,
} from '../automation-button/automation-button';
import '../../icons/icon-09-twoway-digital-open';
import '../../icons/icon-09-twoway-digital-closed';
import '../valve-analoge-two-way-icon/valve-analog-two-way-icon';

/**
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 */
@customElement('obc-analog-valve')
export class ObcAnalogValve extends LitElement {
  @property({type: String}) size: AutomationButtonSize =
    AutomationButtonSize.regular;
  @property({type: String}) labelPosition: AutomationButtonLabelPosition =
    AutomationButtonLabelPosition.bottom;
  @property({type: String}) labelSize: AutomationButtonLabelSize =
    AutomationButtonLabelSize.regular;
  @property({type: String}) labelStyle: AutomationBottonLabelStyle =
    AutomationBottonLabelStyle.regular;
  @property({type: Boolean}) alert: boolean = false;
  @property({type: Boolean}) progress: boolean = false;
  @property({type: Boolean}) open: boolean = false;
  @property({type: Number}) value: number = 0;
  @property({type: String}) tag: string = '';
  @property({type: Boolean}) vertical: boolean = false;

  override render() {
    const labels = [
      {
        type: 'tag',
        text: this.tag,
        showHash: false,
      } as AutomationButtonTagLabel,
    ];
    return html`<obc-automation-button
      .state=${this.open
        ? AutomationButtonState.open
        : AutomationButtonState.closed}
      .size=${this.size}
      .labels=${labels}
      .labelPosition=${this.labelPosition}
      .labelSize=${this.labelSize}
      .labelStyle=${this.labelStyle}
      ?alert=${this.alert}
      ?progress=${this.progress}
    >
      <obc-valve-analog-two-way-icon
        .value=${this.value}
        .closed=${!this.open}
        .vertical=${this.vertical}
        slot="icon"
      ></obc-valve-analog-two-way-icon
      >}
    </obc-automation-button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-analog-valve': ObcAnalogValve;
  }
}
