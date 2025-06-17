import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import '../../icons/icon-fan-on.js';
import '../../icons/icon-fan-off.js';
import {ObcAbstractAutomationButton} from '../automation-button/abstract-automation-button.js';

@customElement('obc-fan')
export class ObcFan extends ObcAbstractAutomationButton {
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
