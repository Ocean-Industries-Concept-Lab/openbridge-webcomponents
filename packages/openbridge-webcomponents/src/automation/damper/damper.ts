import { html } from 'lit';
import '../../icons/icon-damper-horizontal-on.js';
import '../../icons/icon-damper-horizontal-off.js';
import { customElement } from '../../decorator.js';
import { ObcAbstractAutomationButtonSquared } from '../automation-button/abstract-automation-button-squared.js';


@customElement('obc-damper')
export class ObcDamper extends ObcAbstractAutomationButtonSquared {

  override get icon() {
    if (this.on) {
      return html`<obi-damper-horizontal-on usecsscolor slot="icon"></obi-damper-horizontal-on>
        <obi-damper-horizontal-on usecsscolor slot="icon-siluette"></obi-damper-horizontal-on>`;
    } else {
      return html`<obi-damper-horizontal-off usecsscolor slot="icon"></obi-damper-horizontal-off>
        <obi-damper-horizontal-off usecsscolor slot="icon-siluette"></obi-damper-horizontal-off>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-damper': ObcDamper;
  }
}
