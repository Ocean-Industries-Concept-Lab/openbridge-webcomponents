import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {
  AutomationBottonLabelStyle,
  AutomationButtonDirection,
  AutomationButtonDirectonValueLabel,
  AutomationButtonLabelPosition,
  AutomationButtonLabelSize,
  AutomationButtonState,
  AutomationButtonTagLabel,
  AutomationButtonVariant,
} from '../automation-button/automation-button';
import '../../icons/icon-pump-off-horizontal.js';
import '../../icons/icon-pump-on-horizontal.js';
import '../../icons/icon-pump-off-vertical.js';
import '../../icons/icon-pump-on-vertical.js';
import '../automation-button/automation-button.js';

@customElement('obc-pump')
export class ObcPump extends LitElement {
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
        return html`<obi-pump-on-vertical
            usecsscolor
            slot="icon"
          ></obi-pump-on-vertical>
          <obi-pump-on-vertical
            usecsscolor
            slot="icon-siluette"
          ></obi-pump-on-vertical>`;
      } else {
        return html`<obi-pump-off-vertical
            usecsscolor
            slot="icon"
          ></obi-pump-off-vertical>
          <obi-pump-off-vertical
            usecsscolor
            slot="icon-siluette"
          ></obi-pump-off-vertical>`;
      }
    } else {
      if (this.on) {
        return html`<obi-pump-on-horizontal
            usecsscolor
            slot="icon"
          ></obi-pump-on-horizontal>
          <obi-pump-on-horizontal
            usecsscolor
            slot="icon-siluette"
          ></obi-pump-on-horizontal>`;
      } else {
        return html`<obi-pump-off-horizontal
            usecsscolor
            slot="icon"
          ></obi-pump-off-horizontal>
          <obi-pump-off-horizontal
            usecsscolor
            slot="icon-siluette"
          ></obi-pump-off-horizontal>`;
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
    'obc-pump': ObcPump;
  }
}
