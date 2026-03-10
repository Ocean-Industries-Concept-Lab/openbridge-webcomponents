import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-router-on.js';
import '../../icons/icon-router-off.js';
import '../../icons/icon-router-2-on.js';
import '../../icons/icon-router-2-off.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';

export enum RouterAlternativeIcon {
  router = 'router',
  router2 = 'router2',
}

@customElement('obc-router')
export class ObcRouter extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: RouterAlternativeIcon =
    RouterAlternativeIcon.router;

  override get icon() {
    switch (this.alternativeIcon) {
      case RouterAlternativeIcon.router2:
        if (this.on) {
          return html`<obi-router-2-on
              usecsscolor
              slot="icon"
            ></obi-router-2-on>
            <obi-router-2-on
              usecsscolor
              slot="icon-siluette"
            ></obi-router-2-on>`;
        } else {
          return html`<obi-router-2-off
              usecsscolor
              slot="icon"
            ></obi-router-2-off>
            <obi-router-2-off
              usecsscolor
              slot="icon-siluette"
            ></obi-router-2-off>`;
        }
      default:
        if (this.on) {
          return html`<obi-router-on usecsscolor slot="icon"></obi-router-on>
            <obi-router-on usecsscolor slot="icon-siluette"></obi-router-on>`;
        } else {
          return html`<obi-router-off usecsscolor slot="icon"></obi-router-off>
            <obi-router-off usecsscolor slot="icon-siluette"></obi-router-off>`;
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-router': ObcRouter;
  }
}
