import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-ground-1-on.js';
import '../../icons/icon-ground-1-off.js';
import '../../icons/icon-ground-2-on.js';
import '../../icons/icon-ground-2-off.js';
import '../../icons/icon-ground-3-on.js';
import '../../icons/icon-ground-3-off.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';

export enum GroundAlternativeIcon {
  ground1 = 'ground1',
  ground2 = 'ground2',
  ground3 = 'ground3',
}

@customElement('obc-ground')
export class ObcGround extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: GroundAlternativeIcon =
    GroundAlternativeIcon.ground1;

  override get icon() {
    switch (this.alternativeIcon) {
      case GroundAlternativeIcon.ground2:
        if (this.on) {
          return html`<obi-ground-2-on
              usecsscolor
              slot="icon"
            ></obi-ground-2-on>
            <obi-ground-2-on
              usecsscolor
              slot="icon-siluette"
            ></obi-ground-2-on>`;
        } else {
          return html`<obi-ground-2-off
              usecsscolor
              slot="icon"
            ></obi-ground-2-off>
            <obi-ground-2-off
              usecsscolor
              slot="icon-siluette"
            ></obi-ground-2-off>`;
        }
      case GroundAlternativeIcon.ground3:
        if (this.on) {
          return html`<obi-ground-3-on
              usecsscolor
              slot="icon"
            ></obi-ground-3-on>
            <obi-ground-3-on
              usecsscolor
              slot="icon-siluette"
            ></obi-ground-3-on>`;
        } else {
          return html`<obi-ground-3-off
              usecsscolor
              slot="icon"
            ></obi-ground-3-off>
            <obi-ground-3-off
              usecsscolor
              slot="icon-siluette"
            ></obi-ground-3-off>`;
        }
      default:
        if (this.on) {
          return html`<obi-ground-1-on
              usecsscolor
              slot="icon"
            ></obi-ground-1-on>
            <obi-ground-1-on
              usecsscolor
              slot="icon-siluette"
            ></obi-ground-1-on>`;
        } else {
          return html`<obi-ground-1-off
              usecsscolor
              slot="icon"
            ></obi-ground-1-off>
            <obi-ground-1-off
              usecsscolor
              slot="icon-siluette"
            ></obi-ground-1-off>`;
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-ground': ObcGround;
  }
}
