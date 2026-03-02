import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-capacitor-01-on.js';
import '../../icons/icon-capacitor-01-off.js';
import '../../icons/icon-capacitor-02-on.js';
import '../../icons/icon-capacitor-02-off.js';
import '../../icons/icon-capacitor-03-on.js';
import '../../icons/icon-capacitor-03-off.js';
import '../../icons/icon-capacitor-04-on.js';
import '../../icons/icon-capacitor-04-off.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';

export enum CapacitorAlternativeIcon {
  capacitor01 = 'capacitor01',
  capacitor02 = 'capacitor02',
  capacitor03 = 'capacitor03',
  capacitor04 = 'capacitor04',
}

@customElement('obc-capacitor')
export class ObcCapacitor extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: CapacitorAlternativeIcon =
    CapacitorAlternativeIcon.capacitor01;

  override get icon() {
    switch (this.alternativeIcon) {
      case CapacitorAlternativeIcon.capacitor02:
        if (this.on) {
          return html`<obi-capacitor-02-on
              usecsscolor
              slot="icon"
            ></obi-capacitor-02-on>
            <obi-capacitor-02-on
              usecsscolor
              slot="icon-siluette"
            ></obi-capacitor-02-on>`;
        } else {
          return html`<obi-capacitor-02-off
              usecsscolor
              slot="icon"
            ></obi-capacitor-02-off>
            <obi-capacitor-02-off
              usecsscolor
              slot="icon-siluette"
            ></obi-capacitor-02-off>`;
        }
      case CapacitorAlternativeIcon.capacitor03:
        if (this.on) {
          return html`<obi-capacitor-03-on
              usecsscolor
              slot="icon"
            ></obi-capacitor-03-on>
            <obi-capacitor-03-on
              usecsscolor
              slot="icon-siluette"
            ></obi-capacitor-03-on>`;
        } else {
          return html`<obi-capacitor-03-off
              usecsscolor
              slot="icon"
            ></obi-capacitor-03-off>
            <obi-capacitor-03-off
              usecsscolor
              slot="icon-siluette"
            ></obi-capacitor-03-off>`;
        }
      case CapacitorAlternativeIcon.capacitor04:
        if (this.on) {
          return html`<obi-capacitor-04-on
              usecsscolor
              slot="icon"
            ></obi-capacitor-04-on>
            <obi-capacitor-04-on
              usecsscolor
              slot="icon-siluette"
            ></obi-capacitor-04-on>`;
        } else {
          return html`<obi-capacitor-04-off
              usecsscolor
              slot="icon"
            ></obi-capacitor-04-off>
            <obi-capacitor-04-off
              usecsscolor
              slot="icon-siluette"
            ></obi-capacitor-04-off>`;
        }
      default:
        if (this.on) {
          return html`<obi-capacitor-01-on
              usecsscolor
              slot="icon"
            ></obi-capacitor-01-on>
            <obi-capacitor-01-on
              usecsscolor
              slot="icon-siluette"
            ></obi-capacitor-01-on>`;
        } else {
          return html`<obi-capacitor-01-off
              usecsscolor
              slot="icon"
            ></obi-capacitor-01-off>
            <obi-capacitor-01-off
              usecsscolor
              slot="icon-siluette"
            ></obi-capacitor-01-off>`;
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-capacitor': ObcCapacitor;
  }
}
