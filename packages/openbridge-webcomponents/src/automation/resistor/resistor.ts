import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-resistor-1-on.js';
import '../../icons/icon-resistor-1-off.js';
import '../../icons/icon-resistor-2-on.js';
import '../../icons/icon-resistor-2-off.js';
import '../../icons/icon-resistor-3-on.js';
import '../../icons/icon-resistor-3-off.js';
import '../../icons/icon-resistor-4-on.js';
import '../../icons/icon-resistor-4-off.js';
import '../../icons/icon-resistor-5-on.js';
import '../../icons/icon-resistor-5-off.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';

export enum ResistorAlternativeIcon {
  resistor1 = 'resistor1',
  resistor2 = 'resistor2',
  resistor3 = 'resistor3',
  resistor4 = 'resistor4',
  resistor5 = 'resistor5',
}

@customElement('obc-resistor')
export class ObcResistor extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: ResistorAlternativeIcon =
    ResistorAlternativeIcon.resistor1;

  override get icon() {
    switch (this.alternativeIcon) {
      case ResistorAlternativeIcon.resistor2:
        if (this.on) {
          return html`<obi-resistor-2-on
              usecsscolor
              slot="icon"
            ></obi-resistor-2-on>
            <obi-resistor-2-on
              usecsscolor
              slot="icon-siluette"
            ></obi-resistor-2-on>`;
        } else {
          return html`<obi-resistor-2-off
              usecsscolor
              slot="icon"
            ></obi-resistor-2-off>
            <obi-resistor-2-off
              usecsscolor
              slot="icon-siluette"
            ></obi-resistor-2-off>`;
        }
      case ResistorAlternativeIcon.resistor3:
        if (this.on) {
          return html`<obi-resistor-3-on
              usecsscolor
              slot="icon"
            ></obi-resistor-3-on>
            <obi-resistor-3-on
              usecsscolor
              slot="icon-siluette"
            ></obi-resistor-3-on>`;
        } else {
          return html`<obi-resistor-3-off
              usecsscolor
              slot="icon"
            ></obi-resistor-3-off>
            <obi-resistor-3-off
              usecsscolor
              slot="icon-siluette"
            ></obi-resistor-3-off>`;
        }
      case ResistorAlternativeIcon.resistor4:
        if (this.on) {
          return html`<obi-resistor-4-on
              usecsscolor
              slot="icon"
            ></obi-resistor-4-on>
            <obi-resistor-4-on
              usecsscolor
              slot="icon-siluette"
            ></obi-resistor-4-on>`;
        } else {
          return html`<obi-resistor-4-off
              usecsscolor
              slot="icon"
            ></obi-resistor-4-off>
            <obi-resistor-4-off
              usecsscolor
              slot="icon-siluette"
            ></obi-resistor-4-off>`;
        }
      case ResistorAlternativeIcon.resistor5:
        if (this.on) {
          return html`<obi-resistor-5-on
              usecsscolor
              slot="icon"
            ></obi-resistor-5-on>
            <obi-resistor-5-on
              usecsscolor
              slot="icon-siluette"
            ></obi-resistor-5-on>`;
        } else {
          return html`<obi-resistor-5-off
              usecsscolor
              slot="icon"
            ></obi-resistor-5-off>
            <obi-resistor-5-off
              usecsscolor
              slot="icon-siluette"
            ></obi-resistor-5-off>`;
        }
      default:
        if (this.on) {
          return html`<obi-resistor-1-on
              usecsscolor
              slot="icon"
            ></obi-resistor-1-on>
            <obi-resistor-1-on
              usecsscolor
              slot="icon-siluette"
            ></obi-resistor-1-on>`;
        } else {
          return html`<obi-resistor-1-off
              usecsscolor
              slot="icon"
            ></obi-resistor-1-off>
            <obi-resistor-1-off
              usecsscolor
              slot="icon-siluette"
            ></obi-resistor-1-off>`;
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-resistor': ObcResistor;
  }
}
