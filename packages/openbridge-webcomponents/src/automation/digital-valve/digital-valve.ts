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

/**
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 */
@customElement('obc-digital-valve')
export class ObcDigitalValve extends LitElement {
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
    const transform = this.vertical ? 'transform: rotate(90deg);' : '';
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
      ${this.open
        ? html` <obi-09-twoway-digital-open
            usecsscolor
            slot="icon"
            style="display: block; ${transform} line-height: 0;"
          ></obi-09-twoway-digital-open>`
        : html` <obi-09-twoway-digital-closed
            usecsscolor
            slot="icon"
            style="display: block; ${transform} line-height: 0;"
          ></obi-09-twoway-digital-closed>`}
    </obc-automation-button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-digital-valve': ObcDigitalValve;
  }
}
