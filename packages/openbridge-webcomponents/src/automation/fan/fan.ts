import {LitElement, html, render} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../automation-button/automation-button.js';
import {
  AutomationBottonLabelStyle,
  AutomationButtonDirection,
  AutomationButtonDirectonValueLabel,
  AutomationButtonLabelPosition,
  AutomationButtonLabelSize,
  AutomationButtonState,
  AutomationButtonTagLabel,
  AutomationButtonVariant,
} from '../automation-button/automation-button.js';
import '../../icons/icon-fan-on.js';
import '../../icons/icon-fan-off.js';

@customElement('obc-fan')
export class ObcFan extends LitElement {
  @property({type: String}) labelPosition: AutomationButtonLabelPosition =
    AutomationButtonLabelPosition.bottom;
  @property({type: String}) labelSize: AutomationButtonLabelSize =
    AutomationButtonLabelSize.regular;
  @property({type: String}) labelStyle: AutomationBottonLabelStyle =
    AutomationBottonLabelStyle.regular;
  @property({type: Boolean}) alert: boolean = false;
  @property({type: Boolean}) progress: boolean = false;
  @property({type: Boolean}) on: boolean = false;
  @property({type: Number}) speedInPercent: number = 0;
  @property({type: String}) tag: string = '';
  @property({type: String}) variant: AutomationButtonVariant =
    AutomationButtonVariant.regular;
  @property({type: String}) direction: AutomationButtonDirection =
    AutomationButtonDirection.forward;
  @property({type: String}) labelDirection: 'up' | 'down' | 'left' | 'right' =
    'right';

  get icon() {
    if (this.on) {
      return html`<obi-fan-on
            usecsscolor
            slot="icon"
          ></obi-fan-on>
          <obi-fan-on-
            usecsscolor
            slot="icon-siluette"
          ></obi-fan-on>`;
    } else {
      return html`<obi-fan-off usecsscolor slot="icon"></obi-fan-off>
        <obi-fan-off usecsscolor slot="icon-siluette"></obi-fan-off>`;
    }
  }

  override render() {
    const labels = [
      {
        type: 'direction',
        value: this.speedInPercent,
        nDigits: 3,
        unit: 'percent',
        direction: this.labelDirection,
      } as AutomationButtonDirectonValueLabel,
      {
        type: 'tag',
        text: this.tag,
        showHash: true,
      } as AutomationButtonTagLabel,
    ];
    return html`<obc-automation-button
      .state=${this.on
        ? AutomationButtonState.open
        : AutomationButtonState.closed}
      .labels=${labels}
      .labelPosition=${this.labelPosition}
      .labelSize=${this.labelSize}
      .labelStyle=${this.labelStyle}
      ?alert=${this.alert}
      ?progress=${this.progress}
      .variant=${this.variant}
      .direction=${this.direction}
    >
      ${this.icon}
    </obc-automation-button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-fan': ObcFan;
  }
}
