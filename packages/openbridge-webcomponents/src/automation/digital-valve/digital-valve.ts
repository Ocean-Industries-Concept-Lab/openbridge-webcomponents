import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-twoway-digital-open.js';
import '../../icons/icon-twoway-digital-closed.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButton} from '../automation-button/abstract-automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';

export enum DigitalValveVariant {
  regular = 'regular',
  flat = 'flat',
}

@customElement('obc-digital-valve')
export class ObcDigitalValve extends ObcAbstractAutomationButton {
  @property({type: Boolean}) open: boolean = false;
  @property({type: Boolean}) vertical: boolean = false;

  @property({type: String}) variant: DigitalValveVariant =
    DigitalValveVariant.regular;

  override get _on(): boolean {
    return this.open;
  }

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    if (this.open) {
      return [
        {
          type: 'state-on',
          value: 'On',
          hasIcon: true,
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

  override get icon() {
    const transform = this.vertical ? 'transform: rotate(90deg);' : '';
    if (this.open) {
      return html` <obi-twoway-digital-open
          usecsscolor
          slot="icon"
          style="display: block; ${transform} line-height: 0;"
        ></obi-twoway-digital-open>
        <obi-twoway-digital-open
          usecsscolor
          slot="icon-siluette"
          style="display: block; ${transform} line-height: 0;"
        ></obi-twoway-digital-open>`;
    } else {
      return html` <obi-twoway-digital-closed
          usecsscolor
          slot="icon"
          style="display: block; ${transform} line-height: 0;"
        ></obi-twoway-digital-closed>
        <obi-twoway-digital-closed
          usecsscolor
          slot="icon-siluette"
          style="display: block; ${transform} line-height: 0;"
        ></obi-twoway-digital-closed>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-digital-valve': ObcDigitalValve;
  }
}
