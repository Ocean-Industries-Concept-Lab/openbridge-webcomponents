import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-bipolar-transistor-on.js';
import '../../icons/icon-bipolar-transistor-off.js';
import '../../icons/icon-bipolar-transistor-02-on.js';
import '../../icons/icon-bipolar-transistor-02-off.js';
import '../../icons/icon-bipolar-transistor-03-on.js';
import '../../icons/icon-bipolar-transistor-03-off.js';
import '../../icons/icon-bipolar-transistor-04-on.js';
import '../../icons/icon-bipolar-transistor-04-off.js';
import '../../icons/icon-bipolar-transistor-03-flat.js';
import '../../icons/icon-bipolar-transistor-04-flat.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';

export enum BipolarTransistorAlternativeIcon {
  bipolarTransistor01 = 'bipolarTransistor01',
  bipolarTransistor02 = 'bipolarTransistor02',
  bipolarTransistor03 = 'bipolarTransistor03',
  bipolarTransistor04 = 'bipolarTransistor04',
  bipolarTransistor03Flat = 'bipolarTransistor03Flat',
  bipolarTransistor04Flat = 'bipolarTransistor04Flat',
}

/**
 * @stable
 */
@customElement('obc-bipolar-transistor')
export class ObcBipolarTransistor extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: BipolarTransistorAlternativeIcon =
    BipolarTransistorAlternativeIcon.bipolarTransistor01;

  override get icon() {
    switch (this.alternativeIcon) {
      case BipolarTransistorAlternativeIcon.bipolarTransistor02:
        if (this.on) {
          return html`<obi-bipolar-transistor-02-on
              usecsscolor
              slot="icon"
            ></obi-bipolar-transistor-02-on>
            <obi-bipolar-transistor-02-on
              usecsscolor
              slot="icon-silhouette"
            ></obi-bipolar-transistor-02-on>`;
        } else {
          return html`<obi-bipolar-transistor-02-off
              usecsscolor
              slot="icon"
            ></obi-bipolar-transistor-02-off>
            <obi-bipolar-transistor-02-off
              usecsscolor
              slot="icon-silhouette"
            ></obi-bipolar-transistor-02-off>`;
        }
      case BipolarTransistorAlternativeIcon.bipolarTransistor03:
        if (this.on) {
          return html`<obi-bipolar-transistor-03-on
              usecsscolor
              slot="icon"
            ></obi-bipolar-transistor-03-on>
            <obi-bipolar-transistor-03-on
              usecsscolor
              slot="icon-silhouette"
            ></obi-bipolar-transistor-03-on>`;
        } else {
          return html`<obi-bipolar-transistor-03-off
              usecsscolor
              slot="icon"
            ></obi-bipolar-transistor-03-off>
            <obi-bipolar-transistor-03-off
              usecsscolor
              slot="icon-silhouette"
            ></obi-bipolar-transistor-03-off>`;
        }
      case BipolarTransistorAlternativeIcon.bipolarTransistor04:
        if (this.on) {
          return html`<obi-bipolar-transistor-04-on
              usecsscolor
              slot="icon"
            ></obi-bipolar-transistor-04-on>
            <obi-bipolar-transistor-04-on
              usecsscolor
              slot="icon-silhouette"
            ></obi-bipolar-transistor-04-on>`;
        } else {
          return html`<obi-bipolar-transistor-04-off
              usecsscolor
              slot="icon"
            ></obi-bipolar-transistor-04-off>
            <obi-bipolar-transistor-04-off
              usecsscolor
              slot="icon-silhouette"
            ></obi-bipolar-transistor-04-off>`;
        }
      case BipolarTransistorAlternativeIcon.bipolarTransistor03Flat:
        return html`<obi-bipolar-transistor-03-flat
            usecsscolor
            slot="icon"
          ></obi-bipolar-transistor-03-flat>
          <obi-bipolar-transistor-03-flat
            usecsscolor
            slot="icon-silhouette"
          ></obi-bipolar-transistor-03-flat>`;
      case BipolarTransistorAlternativeIcon.bipolarTransistor04Flat:
        return html`<obi-bipolar-transistor-04-flat
            usecsscolor
            slot="icon"
          ></obi-bipolar-transistor-04-flat>
          <obi-bipolar-transistor-04-flat
            usecsscolor
            slot="icon-silhouette"
          ></obi-bipolar-transistor-04-flat>`;
      default:
        if (this.on) {
          return html`<obi-bipolar-transistor-on
              usecsscolor
              slot="icon"
            ></obi-bipolar-transistor-on>
            <obi-bipolar-transistor-on
              usecsscolor
              slot="icon-silhouette"
            ></obi-bipolar-transistor-on>`;
        } else {
          return html`<obi-bipolar-transistor-off
              usecsscolor
              slot="icon"
            ></obi-bipolar-transistor-off>
            <obi-bipolar-transistor-off
              usecsscolor
              slot="icon-silhouette"
            ></obi-bipolar-transistor-off>`;
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-bipolar-transistor': ObcBipolarTransistor;
  }
}
