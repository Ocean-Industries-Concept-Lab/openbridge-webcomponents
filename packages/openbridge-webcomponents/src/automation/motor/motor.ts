import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import '../automation-button/automation-button.js';

import '../../icons/icon-motor-on-vertical.js';
import '../../icons/icon-motor-off-vertical.js';
import '../../icons/icon-motor-on-horisontal.js';
import '../../icons/icon-motor-off-horisontal.js';
import {ObcAbstractAutomationButton} from '../automation-button/abstract-automation-button.js';

@customElement('obc-motor')
export class ObcMotor extends ObcAbstractAutomationButton {
  override get icon() {
    if (this.vertical) {
      if (this.on) {
        return html`<obi-motor-on-vertical
            usecsscolor
            slot="icon"
          ></obi-motor-on-vertical>
          <obi-motor-on-vertical
            usecsscolor
            slot="icon-siluette"
          ></obi-motor-on-vertical>`;
      } else {
        return html`<obi-motor-off-vertical
            usecsscolor
            slot="icon"
          ></obi-motor-off-vertical>
          <obi-motor-off-vertical
            usecsscolor
            slot="icon-siluette"
          ></obi-motor-off-vertical>`;
      }
    } else {
      if (this.on) {
        return html`<obi-motor-on-horisontal
            usecsscolor
            slot="icon"
          ></obi-motor-on-horisontal>
          <obi-motor-on-horisontal
            usecsscolor
            slot="icon-siluette"
          ></obi-motor-on-horisontal>`;
      } else {
        return html`<obi-motor-off-horisontal
            usecsscolor
            slot="icon"
          ></obi-motor-off-horisontal>
          <obi-motor-off-horisontal
            usecsscolor
            slot="icon-siluette"
          ></obi-motor-off-horisontal>`;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-motor': ObcMotor;
  }
}
