import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-pump-off-horizontal.js';
import '../../icons/icon-pump-on-horizontal.js';
import '../../icons/icon-pump-off-vertical.js';
import '../../icons/icon-pump-on-vertical.js';
import {ObcAbstractAutomationButtonMotorized} from '../automation-button/abstract-automation-button-motorized.js';
import {customElement} from '../../decorator.js';

@customElement('obc-pump')
export class ObcPump extends ObcAbstractAutomationButtonMotorized {
  @property({type: Boolean}) vertical: boolean = false;

  override get icon() {
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
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pump': ObcPump;
  }
}
