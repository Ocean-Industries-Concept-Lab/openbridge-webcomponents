import {LitElement, html} from 'lit';
import {property} from 'lit/decorators.js';
import {
  AutomationButtonReadoutPosition,
  AutomationButtonState,
} from '../automation-button/automation-button.js';
import {
  AutomationButtonReadoutStack,
  AutomationButtonReadoutStackSize,
  AutomationButtonReadoutStackTag,
} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
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
  @property({type: String}) readoutPosition: AutomationButtonReadoutPosition =
    AutomationButtonReadoutPosition.bottom;
  @property({type: String}) readoutSize: AutomationButtonReadoutStackSize =
    AutomationButtonReadoutStackSize.regular;
  @property({type: Boolean}) alert: boolean = false;
  @property({type: Boolean}) progress: boolean = false;
  @property({type: Boolean}) open: boolean = false;
  @property({type: String}) tag: string = '';
  @property({type: Boolean}) vertical: boolean = false;
  @property({type: Boolean}) hideReadoutStack: boolean = false;
  @property({type: Boolean}) hasIdTag: boolean = false;

  override render() {
    const readouts: AutomationButtonReadoutStack[] = [];
    const tagValue: AutomationButtonReadoutStackTag | null = this.tag
      ? {value: this.parseTagToNumber(this.tag)}
      : null;
    const transform = this.vertical ? 'transform: rotate(90deg);' : '';
    return html`<obc-automation-button
      .state=${this.open
        ? AutomationButtonState.open
        : AutomationButtonState.closed}
      .readouts=${readouts}
      .tag=${tagValue}
      .readoutPosition=${this.readoutPosition}
      .readoutSize=${this.readoutSize}
      ?alert=${this.alert}
      ?progress=${this.progress}
      .hideReadoutStack=${this.hideReadoutStack}
      .hasIdTag=${this.hasIdTag}
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

  private parseTagToNumber(tag: string): number {
    const num = parseInt(tag.replace(/#/g, ''), 10);
    return isNaN(num) ? 0 : num;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-digital-valve': ObcDigitalValve;
  }
}
