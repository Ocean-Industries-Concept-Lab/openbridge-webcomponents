import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-converter-dcdc-on.js';
import '../../icons/icon-converter-dcdc-off.js';
import '../../icons/icon-converter-dcac-on.js';
import '../../icons/icon-converter-dcac-off.js';
import '../../icons/icon-converter-acdc-on.js';
import '../../icons/icon-converter-acdc-off.js';
import '../../icons/icon-converter-filter-1-on.js';
import '../../icons/icon-converter-filter-1-off.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';

export enum ConverterAlternativeIcon {
  converterDcdc = 'converterDcdc',
  converterDcac = 'converterDcac',
  converterAcdc = 'converterAcdc',
  converterFilter1 = 'converterFilter1',
}

@customElement('obc-converter')
export class ObcConverter extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: ConverterAlternativeIcon =
    ConverterAlternativeIcon.converterDcdc;

  override get icon() {
    switch (this.alternativeIcon) {
      case ConverterAlternativeIcon.converterDcac:
        if (this.on) {
          return html`<obi-converter-dcac-on
              usecsscolor
              slot="icon"
            ></obi-converter-dcac-on>
            <obi-converter-dcac-on
              usecsscolor
              slot="icon-siluette"
            ></obi-converter-dcac-on>`;
        } else {
          return html`<obi-converter-dcac-off
              usecsscolor
              slot="icon"
            ></obi-converter-dcac-off>
            <obi-converter-dcac-off
              usecsscolor
              slot="icon-siluette"
            ></obi-converter-dcac-off>`;
        }
      case ConverterAlternativeIcon.converterAcdc:
        if (this.on) {
          return html`<obi-converter-acdc-on
              usecsscolor
              slot="icon"
            ></obi-converter-acdc-on>
            <obi-converter-acdc-on
              usecsscolor
              slot="icon-siluette"
            ></obi-converter-acdc-on>`;
        } else {
          return html`<obi-converter-acdc-off
              usecsscolor
              slot="icon"
            ></obi-converter-acdc-off>
            <obi-converter-acdc-off
              usecsscolor
              slot="icon-siluette"
            ></obi-converter-acdc-off>`;
        }
      case ConverterAlternativeIcon.converterFilter1:
        if (this.on) {
          return html`<obi-converter-filter-1-on
              usecsscolor
              slot="icon"
            ></obi-converter-filter-1-on>
            <obi-converter-filter-1-on
              usecsscolor
              slot="icon-siluette"
            ></obi-converter-filter-1-on>`;
        } else {
          return html`<obi-converter-filter-1-off
              usecsscolor
              slot="icon"
            ></obi-converter-filter-1-off>
            <obi-converter-filter-1-off
              usecsscolor
              slot="icon-siluette"
            ></obi-converter-filter-1-off>`;
        }
      default:
        if (this.on) {
          return html`<obi-converter-dcdc-on
              usecsscolor
              slot="icon"
            ></obi-converter-dcdc-on>
            <obi-converter-dcdc-on
              usecsscolor
              slot="icon-siluette"
            ></obi-converter-dcdc-on>`;
        } else {
          return html`<obi-converter-dcdc-off
              usecsscolor
              slot="icon"
            ></obi-converter-dcdc-off>
            <obi-converter-dcdc-off
              usecsscolor
              slot="icon-siluette"
            ></obi-converter-dcdc-off>`;
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-converter': ObcConverter;
  }
}
