import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-diodes-01-on.js';
import '../../icons/icon-diodes-01-off.js';
import '../../icons/icon-diodes-02-on.js';
import '../../icons/icon-diodes-02-off.js';
import '../../icons/icon-diodes-03-on.js';
import '../../icons/icon-diodes-03-off.js';
import '../../icons/icon-diodes-04-on.js';
import '../../icons/icon-diodes-04-off.js';
import '../../icons/icon-diodes-05-on.js';
import '../../icons/icon-diodes-05-off.js';
import '../../icons/icon-diodes-06-on.js';
import '../../icons/icon-diodes-06-off.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';

export enum DiodesAlternativeIcon {
  diodes01 = 'diodes01',
  diodes02 = 'diodes02',
  diodes03 = 'diodes03',
  diodes04 = 'diodes04',
  diodes05 = 'diodes05',
  diodes06 = 'diodes06',
}

@customElement('obc-diodes')
export class ObcDiodes extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: DiodesAlternativeIcon =
    DiodesAlternativeIcon.diodes01;

  override get icon() {
    switch (this.alternativeIcon) {
      case DiodesAlternativeIcon.diodes02:
        if (this.on) {
          return html`<obi-diodes-02-on
              usecsscolor
              slot="icon"
            ></obi-diodes-02-on>
            <obi-diodes-02-on
              usecsscolor
              slot="icon-siluette"
            ></obi-diodes-02-on>`;
        } else {
          return html`<obi-diodes-02-off
              usecsscolor
              slot="icon"
            ></obi-diodes-02-off>
            <obi-diodes-02-off
              usecsscolor
              slot="icon-siluette"
            ></obi-diodes-02-off>`;
        }
      case DiodesAlternativeIcon.diodes03:
        if (this.on) {
          return html`<obi-diodes-03-on
              usecsscolor
              slot="icon"
            ></obi-diodes-03-on>
            <obi-diodes-03-on
              usecsscolor
              slot="icon-siluette"
            ></obi-diodes-03-on>`;
        } else {
          return html`<obi-diodes-03-off
              usecsscolor
              slot="icon"
            ></obi-diodes-03-off>
            <obi-diodes-03-off
              usecsscolor
              slot="icon-siluette"
            ></obi-diodes-03-off>`;
        }
      case DiodesAlternativeIcon.diodes04:
        if (this.on) {
          return html`<obi-diodes-04-on
              usecsscolor
              slot="icon"
            ></obi-diodes-04-on>
            <obi-diodes-04-on
              usecsscolor
              slot="icon-siluette"
            ></obi-diodes-04-on>`;
        } else {
          return html`<obi-diodes-04-off
              usecsscolor
              slot="icon"
            ></obi-diodes-04-off>
            <obi-diodes-04-off
              usecsscolor
              slot="icon-siluette"
            ></obi-diodes-04-off>`;
        }
      case DiodesAlternativeIcon.diodes05:
        if (this.on) {
          return html`<obi-diodes-05-on
              usecsscolor
              slot="icon"
            ></obi-diodes-05-on>
            <obi-diodes-05-on
              usecsscolor
              slot="icon-siluette"
            ></obi-diodes-05-on>`;
        } else {
          return html`<obi-diodes-05-off
              usecsscolor
              slot="icon"
            ></obi-diodes-05-off>
            <obi-diodes-05-off
              usecsscolor
              slot="icon-siluette"
            ></obi-diodes-05-off>`;
        }
      case DiodesAlternativeIcon.diodes06:
        if (this.on) {
          return html`<obi-diodes-06-on
              usecsscolor
              slot="icon"
            ></obi-diodes-06-on>
            <obi-diodes-06-on
              usecsscolor
              slot="icon-siluette"
            ></obi-diodes-06-on>`;
        } else {
          return html`<obi-diodes-06-off
              usecsscolor
              slot="icon"
            ></obi-diodes-06-off>
            <obi-diodes-06-off
              usecsscolor
              slot="icon-siluette"
            ></obi-diodes-06-off>`;
        }
      default:
        if (this.on) {
          return html`<obi-diodes-01-on
              usecsscolor
              slot="icon"
            ></obi-diodes-01-on>
            <obi-diodes-01-on
              usecsscolor
              slot="icon-siluette"
            ></obi-diodes-01-on>`;
        } else {
          return html`<obi-diodes-01-off
              usecsscolor
              slot="icon"
            ></obi-diodes-01-off>
            <obi-diodes-01-off
              usecsscolor
              slot="icon-siluette"
            ></obi-diodes-01-off>`;
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-diodes': ObcDiodes;
  }
}
