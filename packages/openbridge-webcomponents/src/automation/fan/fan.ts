import {customElement} from '../../decorator.js';
import {html} from 'lit';
import '../../icons/icon-fan-on.js';
import '../../icons/icon-fan-off.js';
import {ObcAbstractAutomationButtonMotorized} from '../automation-button/abstract-automation-button-motorized.js';

@customElement('obc-fan')
export class ObcFan extends ObcAbstractAutomationButtonMotorized {
  override get icon() {
    if (this.on) {
      return html`<obi-fan-on usecsscolor slot="icon"></obi-fan-on>
        <obi-fan-on usecsscolor slot="icon-siluette"></obi-fan-on>`;
    } else {
      return html`<obi-fan-off usecsscolor slot="icon"></obi-fan-off>
        <obi-fan-off usecsscolor slot="icon-siluette"></obi-fan-off>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-fan': ObcFan;
  }
}
