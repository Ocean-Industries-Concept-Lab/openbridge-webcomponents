import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-logic-01-on.js';
import '../../icons/icon-logic-01-off.js';
import '../../icons/icon-logic-02-on.js';
import '../../icons/icon-logic-02-off.js';
import '../../icons/icon-logic-03-on.js';
import '../../icons/icon-logic-03-off.js';
import '../../icons/icon-logic-04-on.js';
import '../../icons/icon-logic-04-off.js';
import '../../icons/icon-logic-05-on.js';
import '../../icons/icon-logic-05-off.js';
import '../../icons/icon-logic-06-on.js';
import '../../icons/icon-logic-06-off.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';

export enum LogicAlternativeIcon {
  logic01 = 'logic01',
  logic02 = 'logic02',
  logic03 = 'logic03',
  logic04 = 'logic04',
  logic05 = 'logic05',
  logic06 = 'logic06',
}

@customElement('obc-logic')
export class ObcLogic extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: LogicAlternativeIcon =
    LogicAlternativeIcon.logic01;

  override get icon() {
    switch (this.alternativeIcon) {
      case LogicAlternativeIcon.logic02:
        if (this.on) {
          return html`<obi-logic-02-on
              usecsscolor
              slot="icon"
            ></obi-logic-02-on>
            <obi-logic-02-on
              usecsscolor
              slot="icon-siluette"
            ></obi-logic-02-on>`;
        } else {
          return html`<obi-logic-02-off
              usecsscolor
              slot="icon"
            ></obi-logic-02-off>
            <obi-logic-02-off
              usecsscolor
              slot="icon-siluette"
            ></obi-logic-02-off>`;
        }
      case LogicAlternativeIcon.logic03:
        if (this.on) {
          return html`<obi-logic-03-on
              usecsscolor
              slot="icon"
            ></obi-logic-03-on>
            <obi-logic-03-on
              usecsscolor
              slot="icon-siluette"
            ></obi-logic-03-on>`;
        } else {
          return html`<obi-logic-03-off
              usecsscolor
              slot="icon"
            ></obi-logic-03-off>
            <obi-logic-03-off
              usecsscolor
              slot="icon-siluette"
            ></obi-logic-03-off>`;
        }
      case LogicAlternativeIcon.logic04:
        if (this.on) {
          return html`<obi-logic-04-on
              usecsscolor
              slot="icon"
            ></obi-logic-04-on>
            <obi-logic-04-on
              usecsscolor
              slot="icon-siluette"
            ></obi-logic-04-on>`;
        } else {
          return html`<obi-logic-04-off
              usecsscolor
              slot="icon"
            ></obi-logic-04-off>
            <obi-logic-04-off
              usecsscolor
              slot="icon-siluette"
            ></obi-logic-04-off>`;
        }
      case LogicAlternativeIcon.logic05:
        if (this.on) {
          return html`<obi-logic-05-on
              usecsscolor
              slot="icon"
            ></obi-logic-05-on>
            <obi-logic-05-on
              usecsscolor
              slot="icon-siluette"
            ></obi-logic-05-on>`;
        } else {
          return html`<obi-logic-05-off
              usecsscolor
              slot="icon"
            ></obi-logic-05-off>
            <obi-logic-05-off
              usecsscolor
              slot="icon-siluette"
            ></obi-logic-05-off>`;
        }
      case LogicAlternativeIcon.logic06:
        if (this.on) {
          return html`<obi-logic-06-on
              usecsscolor
              slot="icon"
            ></obi-logic-06-on>
            <obi-logic-06-on
              usecsscolor
              slot="icon-siluette"
            ></obi-logic-06-on>`;
        } else {
          return html`<obi-logic-06-off
              usecsscolor
              slot="icon"
            ></obi-logic-06-off>
            <obi-logic-06-off
              usecsscolor
              slot="icon-siluette"
            ></obi-logic-06-off>`;
        }
      default:
        if (this.on) {
          return html`<obi-logic-01-on
              usecsscolor
              slot="icon"
            ></obi-logic-01-on>
            <obi-logic-01-on
              usecsscolor
              slot="icon-siluette"
            ></obi-logic-01-on>`;
        } else {
          return html`<obi-logic-01-off
              usecsscolor
              slot="icon"
            ></obi-logic-01-off>
            <obi-logic-01-off
              usecsscolor
              slot="icon-siluette"
            ></obi-logic-01-off>`;
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-logic': ObcLogic;
  }
}
