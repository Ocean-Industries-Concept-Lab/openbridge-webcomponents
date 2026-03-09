import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-mosfet-ntype-1-on.js';
import '../../icons/icon-mosfet-ntype-1-off.js';
import '../../icons/icon-mosfet-ntype-2-on.js';
import '../../icons/icon-mosfet-ntype-2-off.js';
import '../../icons/icon-mosfet-ntype-3-on.js';
import '../../icons/icon-mosfet-ntype-3-off.js';
import '../../icons/icon-mosfet-ntype-4-on.js';
import '../../icons/icon-mosfet-ntype-4-off.js';
import '../../icons/icon-mosfet-ptype-1-on.js';
import '../../icons/icon-mosfet-ptype-1-off.js';
import '../../icons/icon-mosfet-ptype-2-on.js';
import '../../icons/icon-mosfet-ptype-2-off.js';
import '../../icons/icon-mosfet-ptype-3-on.js';
import '../../icons/icon-mosfet-ptype-3-off.js';
import '../../icons/icon-mosfet-ptype-4-on.js';
import '../../icons/icon-mosfet-ptype-4-off.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';

export enum MosfetAlternativeIcon {
  mosfetNtype1 = 'mosfetNtype1',
  mosfetNtype2 = 'mosfetNtype2',
  mosfetNtype3 = 'mosfetNtype3', // Figma label: 01-mosfet-ntype-3
  mosfetNtype4 = 'mosfetNtype4',
  mosfetPtype1 = 'mosfetPtype1',
  mosfetPtype2 = 'mosfetPtype2',
  mosfetPtype3 = 'mosfetPtype3',
  mosfetPtype4 = 'mosfetPtype4',
}

@customElement('obc-mosfet')
export class ObcMosfet extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: MosfetAlternativeIcon =
    MosfetAlternativeIcon.mosfetNtype1;

  override get icon() {
    switch (this.alternativeIcon) {
      case MosfetAlternativeIcon.mosfetNtype2:
        if (this.on) {
          return html`<obi-mosfet-ntype-2-on
              usecsscolor
              slot="icon"
            ></obi-mosfet-ntype-2-on>
            <obi-mosfet-ntype-2-on
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ntype-2-on>`;
        } else {
          return html`<obi-mosfet-ntype-2-off
              usecsscolor
              slot="icon"
            ></obi-mosfet-ntype-2-off>
            <obi-mosfet-ntype-2-off
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ntype-2-off>`;
        }
      case MosfetAlternativeIcon.mosfetNtype3:
        if (this.on) {
          return html`<obi-mosfet-ntype-3-on
              usecsscolor
              slot="icon"
            ></obi-mosfet-ntype-3-on>
            <obi-mosfet-ntype-3-on
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ntype-3-on>`;
        } else {
          return html`<obi-mosfet-ntype-3-off
              usecsscolor
              slot="icon"
            ></obi-mosfet-ntype-3-off>
            <obi-mosfet-ntype-3-off
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ntype-3-off>`;
        }
      case MosfetAlternativeIcon.mosfetNtype4:
        if (this.on) {
          return html`<obi-mosfet-ntype-4-on
              usecsscolor
              slot="icon"
            ></obi-mosfet-ntype-4-on>
            <obi-mosfet-ntype-4-on
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ntype-4-on>`;
        } else {
          return html`<obi-mosfet-ntype-4-off
              usecsscolor
              slot="icon"
            ></obi-mosfet-ntype-4-off>
            <obi-mosfet-ntype-4-off
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ntype-4-off>`;
        }
      case MosfetAlternativeIcon.mosfetPtype1:
        if (this.on) {
          return html`<obi-mosfet-ptype-1-on
              usecsscolor
              slot="icon"
            ></obi-mosfet-ptype-1-on>
            <obi-mosfet-ptype-1-on
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ptype-1-on>`;
        } else {
          return html`<obi-mosfet-ptype-1-off
              usecsscolor
              slot="icon"
            ></obi-mosfet-ptype-1-off>
            <obi-mosfet-ptype-1-off
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ptype-1-off>`;
        }
      case MosfetAlternativeIcon.mosfetPtype2:
        if (this.on) {
          return html`<obi-mosfet-ptype-2-on
              usecsscolor
              slot="icon"
            ></obi-mosfet-ptype-2-on>
            <obi-mosfet-ptype-2-on
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ptype-2-on>`;
        } else {
          return html`<obi-mosfet-ptype-2-off
              usecsscolor
              slot="icon"
            ></obi-mosfet-ptype-2-off>
            <obi-mosfet-ptype-2-off
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ptype-2-off>`;
        }
      case MosfetAlternativeIcon.mosfetPtype3:
        if (this.on) {
          return html`<obi-mosfet-ptype-3-on
              usecsscolor
              slot="icon"
            ></obi-mosfet-ptype-3-on>
            <obi-mosfet-ptype-3-on
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ptype-3-on>`;
        } else {
          return html`<obi-mosfet-ptype-3-off
              usecsscolor
              slot="icon"
            ></obi-mosfet-ptype-3-off>
            <obi-mosfet-ptype-3-off
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ptype-3-off>`;
        }
      case MosfetAlternativeIcon.mosfetPtype4:
        if (this.on) {
          return html`<obi-mosfet-ptype-4-on
              usecsscolor
              slot="icon"
            ></obi-mosfet-ptype-4-on>
            <obi-mosfet-ptype-4-on
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ptype-4-on>`;
        } else {
          return html`<obi-mosfet-ptype-4-off
              usecsscolor
              slot="icon"
            ></obi-mosfet-ptype-4-off>
            <obi-mosfet-ptype-4-off
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ptype-4-off>`;
        }
      default:
        if (this.on) {
          return html`<obi-mosfet-ntype-1-on
              usecsscolor
              slot="icon"
            ></obi-mosfet-ntype-1-on>
            <obi-mosfet-ntype-1-on
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ntype-1-on>`;
        } else {
          return html`<obi-mosfet-ntype-1-off
              usecsscolor
              slot="icon"
            ></obi-mosfet-ntype-1-off>
            <obi-mosfet-ntype-1-off
              usecsscolor
              slot="icon-siluette"
            ></obi-mosfet-ntype-1-off>`;
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-mosfet': ObcMosfet;
  }
}
