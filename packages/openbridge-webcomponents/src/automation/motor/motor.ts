import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../automation-button/automation-button.js';

import '../../icons/icon-motor-on-vertical.js';
import '../../icons/icon-motor-off-vertical.js';
import '../../icons/icon-motor-on-horizontal.js';
import '../../icons/icon-motor-off-horizontal.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonMotorized} from '../automation-button/abstract-automation-button-motorized.js';

@customElement('obc-motor')
export class ObcMotor extends ObcAbstractAutomationButtonMotorized {
  @property({type: Boolean}) vertical: boolean = false;

  override get icon() {
    if (this.vertical) {
      if (this.on) {
        return html`<obi-motor-on-vertical
            usecsscolor
            slot="icon"
          ></obi-motor-on-vertical>
          <obi-motor-on-vertical
            usecsscolor
            slot="icon-silhouette"
          ></obi-motor-on-vertical>`;
      } else {
        return html`<obi-motor-off-vertical
            usecsscolor
            slot="icon"
          ></obi-motor-off-vertical>
          <obi-motor-off-vertical
            usecsscolor
            slot="icon-silhouette"
          ></obi-motor-off-vertical>`;
      }
    } else {
      if (this.on) {
        return html`<obi-motor-on-horizontal
            usecsscolor
            slot="icon"
          ></obi-motor-on-horizontal>
          <obi-motor-on-horizontal
            usecsscolor
            slot="icon-silhouette"
          ></obi-motor-on-horizontal>`;
      } else {
        return html`<obi-motor-off-horizontal
            usecsscolor
            slot="icon"
          ></obi-motor-off-horizontal>
          <obi-motor-off-horizontal
            usecsscolor
            slot="icon-silhouette"
          ></obi-motor-off-horizontal>`;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-motor': ObcMotor;
  }
}
