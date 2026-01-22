import {html} from 'lit';
import '../../icons/icon-switch-horizontal-on.js';
import '../../icons/icon-switch-horizontal-off.js';
import '../../icons/icon-switch-01-on.js';
import '../../icons/icon-switch-01-off.js';
import '../../icons/icon-switch-02-on.js';
import '../../icons/icon-switch-02-off.js';
import '../../icons/icon-switch-03-on.js';
import '../../icons/icon-switch-03-off.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';
import {property} from 'lit/decorators.js';

export enum SwitchAlternativeIcon {
  regular = 'regular',
  s1 = 's1',
  s2 = 's2',
  s3 = 's3',
}

@customElement('obc-switch')
export class ObcSwitch extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: SwitchAlternativeIcon =
    SwitchAlternativeIcon.regular;

  override get icon() {
    switch (this.alternativeIcon) {
      case SwitchAlternativeIcon.s1:
        if (this.on) {
          return html`<obi-switch-01-on
              usecsscolor
              slot="icon"
            ></obi-switch-01-on>
            <obi-switch-01-on
              usecsscolor
              slot="icon-siluette"
            ></obi-switch-01-on>`;
        } else {
          return html`<obi-switch-01-off
              usecsscolor
              slot="icon"
            ></obi-switch-01-off>
            <obi-switch-01-off
              usecsscolor
              slot="icon-siluette"
            ></obi-switch-01-off>`;
        }
      case SwitchAlternativeIcon.s2:
        if (this.on) {
          return html`<obi-switch-02-on
              usecsscolor
              slot="icon"
            ></obi-switch-02-on>
            <obi-switch-02-on
              usecsscolor
              slot="icon-siluette"
            ></obi-switch-02-on>`;
        } else {
          return html`<obi-switch-02-off
              usecsscolor
              slot="icon"
            ></obi-switch-02-off>
            <obi-switch-02-off
              usecsscolor
              slot="icon-siluette"
            ></obi-switch-02-off>`;
        }
      case SwitchAlternativeIcon.s3:
        if (this.on) {
          return html`<obi-switch-03-on
              usecsscolor
              slot="icon"
            ></obi-switch-03-on>
            <obi-switch-03-on
              usecsscolor
              slot="icon-siluette"
            ></obi-switch-03-on>`;
        } else {
          return html`<obi-switch-03-off
              usecsscolor
              slot="icon"
            ></obi-switch-03-off>
            <obi-switch-03-off
              usecsscolor
              slot="icon-siluette"
            ></obi-switch-03-off>`;
        }
      default:
        if (this.on) {
          return html`<obi-switch-horizontal-on
              usecsscolor
              slot="icon"
            ></obi-switch-horizontal-on>
            <obi-switch-horizontal-on
              usecsscolor
              slot="icon-siluette"
            ></obi-switch-horizontal-on>`;
        } else {
          return html`<obi-switch-horizontal-off
              usecsscolor
              slot="icon"
            ></obi-switch-horizontal-off>
            <obi-switch-horizontal-off
              usecsscolor
              slot="icon-siluette"
            ></obi-switch-horizontal-off>`;
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-switch': ObcSwitch;
  }
}
