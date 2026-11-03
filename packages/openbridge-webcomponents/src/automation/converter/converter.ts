import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-converter-dcdc-on.js';
import '../../icons/icon-converter-dcdc-off.js';
import '../../icons/icon-converter-dcac-on.js';
import '../../icons/icon-converter-dcac-off.js';
import '../../icons/icon-converter-acdc-on.js';
import '../../icons/icon-converter-acdc-off.js';
import '../../icons/icon-converter-acac-on.js';
import '../../icons/icon-converter-acac-off.js';
import '../../icons/icon-converter-acvac-on.js';
import '../../icons/icon-converter-acvac-off.js';
import '../../icons/icon-converter-vacac-on.js';
import '../../icons/icon-converter-vacac-off.js';
import '../../icons/icon-converter-vacvac-on.js';
import '../../icons/icon-converter-vacvac-off.js';
import '../../icons/icon-converter-filter-1-on.js';
import '../../icons/icon-converter-filter-1-off.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';

export enum ConverterAlternativeIcon {
  converterDcdc = 'converterDcdc',
  converterDcac = 'converterDcac',
  converterAcdc = 'converterAcdc',
  converterAcac = 'converterAcac',
  converterAcvac = 'converterAcvac',
  converterVacac = 'converterVacac',
  converterVacvac = 'converterVacvac',
  converterFilter1 = 'converterFilter1',
}

/**
 * @stable
 */
@customElement('obc-converter')
export class ObcConverter extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: ConverterAlternativeIcon =
    ConverterAlternativeIcon.converterDcdc;

  override get icon() {
    switch (this.alternativeIcon) {
      case ConverterAlternativeIcon.converterDcac:
        if (this.turnedOn) {
          return html`<obi-converter-dcac-on
              usecsscolor
              slot="icon"
            ></obi-converter-dcac-on>
            <obi-converter-dcac-on
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-dcac-on>`;
        } else {
          return html`<obi-converter-dcac-off
              usecsscolor
              slot="icon"
            ></obi-converter-dcac-off>
            <obi-converter-dcac-off
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-dcac-off>`;
        }
      case ConverterAlternativeIcon.converterAcdc:
        if (this.turnedOn) {
          return html`<obi-converter-acdc-on
              usecsscolor
              slot="icon"
            ></obi-converter-acdc-on>
            <obi-converter-acdc-on
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-acdc-on>`;
        } else {
          return html`<obi-converter-acdc-off
              usecsscolor
              slot="icon"
            ></obi-converter-acdc-off>
            <obi-converter-acdc-off
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-acdc-off>`;
        }
      case ConverterAlternativeIcon.converterAcac:
        if (this.turnedOn) {
          return html`<obi-converter-acac-on
              usecsscolor
              slot="icon"
            ></obi-converter-acac-on>
            <obi-converter-acac-on
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-acac-on>`;
        } else {
          return html`<obi-converter-acac-off
              usecsscolor
              slot="icon"
            ></obi-converter-acac-off>
            <obi-converter-acac-off
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-acac-off>`;
        }
      case ConverterAlternativeIcon.converterAcvac:
        if (this.turnedOn) {
          return html`<obi-converter-acvac-on
              usecsscolor
              slot="icon"
            ></obi-converter-acvac-on>
            <obi-converter-acvac-on
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-acvac-on>`;
        } else {
          return html`<obi-converter-acvac-off
              usecsscolor
              slot="icon"
            ></obi-converter-acvac-off>
            <obi-converter-acvac-off
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-acvac-off>`;
        }
      case ConverterAlternativeIcon.converterVacac:
        if (this.turnedOn) {
          return html`<obi-converter-vacac-on
              usecsscolor
              slot="icon"
            ></obi-converter-vacac-on>
            <obi-converter-vacac-on
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-vacac-on>`;
        } else {
          return html`<obi-converter-vacac-off
              usecsscolor
              slot="icon"
            ></obi-converter-vacac-off>
            <obi-converter-vacac-off
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-vacac-off>`;
        }
      case ConverterAlternativeIcon.converterVacvac:
        if (this.turnedOn) {
          return html`<obi-converter-vacvac-on
              usecsscolor
              slot="icon"
            ></obi-converter-vacvac-on>
            <obi-converter-vacvac-on
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-vacvac-on>`;
        } else {
          return html`<obi-converter-vacvac-off
              usecsscolor
              slot="icon"
            ></obi-converter-vacvac-off>
            <obi-converter-vacvac-off
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-vacvac-off>`;
        }
      case ConverterAlternativeIcon.converterFilter1:
        if (this.turnedOn) {
          return html`<obi-converter-filter-1-on
              usecsscolor
              slot="icon"
            ></obi-converter-filter-1-on>
            <obi-converter-filter-1-on
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-filter-1-on>`;
        } else {
          return html`<obi-converter-filter-1-off
              usecsscolor
              slot="icon"
            ></obi-converter-filter-1-off>
            <obi-converter-filter-1-off
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-filter-1-off>`;
        }
      default:
        if (this.turnedOn) {
          return html`<obi-converter-dcdc-on
              usecsscolor
              slot="icon"
            ></obi-converter-dcdc-on>
            <obi-converter-dcdc-on
              usecsscolor
              slot="icon-silhouette"
            ></obi-converter-dcdc-on>`;
        } else {
          return html`<obi-converter-dcdc-off
              usecsscolor
              slot="icon"
            ></obi-converter-dcdc-off>
            <obi-converter-dcdc-off
              usecsscolor
              slot="icon-silhouette"
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
