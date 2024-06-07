import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import "../automation-button/automation-button";
import { AutomationBottonLabelStyle, AutomationButtonDirectonValueLabel, AutomationButtonLabelPosition, AutomationButtonLabelSize, AutomationButtonSize, AutomationButtonState, AutomationButtonTagLabel } from '../automation-button/automation-button';
import { Direction } from '../../types';
import "../valve-analoge-two-way-icon/valve-analog-two-way-icon";


@customElement('obc-valve')
export class ObcValve extends LitElement {
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
@property({type: String}) tag: string = '';
@property({type: String}) direction: Direction = 'right';
@property({type: Number}) value: number = 0;
@property({type: Boolean}) closed: boolean = false;
  @property({ type: Boolean }) showDirectionLabel: boolean = false;
  @property({ type: Boolean }) flat: boolean = false;
  

  get rotation(): number {
    if (this.direction === 'up') {
      return -90;
    }
    if (this.direction === 'down') {
      return 90;
    }
    return 0;
  }

  override render() {
    const labels = [
      {
        type: 'tag',
        text: this.tag,
        showHash: this.showDirectionLabel,
      } as AutomationButtonTagLabel,
      {
        type: 'direction',
        nDigits: 3,
        value: this.value,
        direction: this.direction,
        unit: 'percent',
      } as AutomationButtonDirectonValueLabel
    ];

    return html`
      <obc-automation-button
      .state=${this.closed ? AutomationButtonState.closed : AutomationButtonState.open}
      .size=${this.size}
      .labels=${labels}
      .labelPosition=${this.labelPosition}
      .labelSize=${this.labelSize}
      .labelStyle=${this.labelStyle}
      ?alert=${this.alert}
      ?progress=${this.progress}
      ?flat=${this.flat}
     
    >
      <obc-valve-analog-two-way-icon slot="icon" .rotation=${this.rotation}></obc-valve-analog-two-way-icon>
      <slot name="badge-top-right"></slot>
      <slot name="badge-top-left"></slot>
      <slot name="badge-bottom-left"></slot>
      <slot name="badge-bottom-right"></slot>
    </obc-automation-button>
      `
  }


}

declare global {
  interface HTMLElementTagNameMap {
    'obc-valve': ObcValve
  }
}
