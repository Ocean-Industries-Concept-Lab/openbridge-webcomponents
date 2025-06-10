import {LitElement, html} from 'lit';
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
import '../../icons/icon-motor-on-vertical.js';
import '../../icons/icon-motor-off-vertical.js';
import '../../icons/icon-motor-on-horisontal.js';
import '../../icons/icon-motor-off-horisontal.js';

@customElement('obc-motor')
export class ObcMotor extends LitElement {
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
  @property({type: Boolean}) vertical: boolean = false;
  @property({type: String}) variant: AutomationButtonVariant =
    AutomationButtonVariant.regular;
  @property({type: String}) direction: AutomationButtonDirection =
    AutomationButtonDirection.forward;
  @property({type: String}) labelDirection: 'up' | 'down' | 'left' | 'right' =
    'right';

  get icon() {
    if (this.vertical) {
      if (this.on) {
        return html`<obi-motor-on-vertical
            usecsscolor
            slot="icon"
          ></obi-motor-on-vertical>
          <obi-motor-on-vertical
            usecsscolor
            slot="icon-siluette"
          ></obi-motor-on-vertical>`;
      } else {
        return html`<obi-motor-off-vertical
            usecsscolor
            slot="icon"
          ></obi-motor-off-vertical>
          <obi-motor-off-vertical
            usecsscolor
            slot="icon-siluette"
          ></obi-motor-off-vertical>`;
      }
    } else {
      if (this.on) {
        return html`<obi-motor-on-horisontal
            usecsscolor
            slot="icon"
          ></obi-motor-on-horisontal>
          <obi-motor-on-horisontal
            usecsscolor
            slot="icon-siluette"
          ></obi-motor-on-horisontal>`;
      } else {
        return html`<obi-motor-off-horisontal
            usecsscolor
            slot="icon"
          ></obi-motor-off-horisontal>
          <obi-motor-off-horisontal
            usecsscolor
            slot="icon-siluette"
          ></obi-motor-off-horisontal>`;
      }
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
    'obc-motor': ObcMotor;
  }
}
