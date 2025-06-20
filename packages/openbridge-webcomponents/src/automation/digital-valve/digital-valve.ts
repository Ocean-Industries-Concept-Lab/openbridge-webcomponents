import {LitElement, html} from 'lit';
import {property} from 'lit/decorators.js';
import {
  AutomationBottonLabelStyle,
  AutomationButtonLabelPosition,
  AutomationButtonLabelSize,
  AutomationButtonState,
  AutomationButtonTagLabel,
} from '../automation-button/automation-button.js';
import '../../icons/icon-twoway-digital-open.js';
import '../../icons/icon-twoway-digital-closed.js';
import {customElement} from '../../decorator.js';

/**
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 */
@customElement('obc-digital-valve')
export class ObcDigitalValve extends LitElement {
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
      .labels=${labels}
      .labelPosition=${this.labelPosition}
      .labelSize=${this.labelSize}
      .labelStyle=${this.labelStyle}
      ?alert=${this.alert}
      ?progress=${this.progress}
    >
      ${this.open
        ? html` <obi-twoway-digital-open
            usecsscolor
            slot="icon"
            style="display: block; ${transform} line-height: 0;"
          ></obi-twoway-digital-open>`
        : html` <obi-twoway-digital-closed
            usecsscolor
            slot="icon"
            style="display: block; ${transform} line-height: 0;"
          ></obi-twoway-digital-closed>`}
    </obc-automation-button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-digital-valve': ObcDigitalValve;
  }
}
