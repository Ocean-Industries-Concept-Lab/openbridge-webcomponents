import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-sources-01-on.js';
import '../../icons/icon-sources-01-off.js';
import '../../icons/icon-sources-02-on.js';
import '../../icons/icon-sources-02-off.js';
import '../../icons/icon-sources-03-on.js';
import '../../icons/icon-sources-03-off.js';
import '../../icons/icon-sources-04-on.js';
import '../../icons/icon-sources-04-off.js';
import '../../icons/icon-sources-05-on.js';
import '../../icons/icon-sources-05-off.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';

export enum SourceAlternativeIcon {
  sources01 = 'sources01',
  sources02 = 'sources02',
  sources03 = 'sources03',
  sources04 = 'sources04',
  sources05 = 'sources05',
}

@customElement('obc-source')
export class ObcSource extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: SourceAlternativeIcon =
    SourceAlternativeIcon.sources01;

  override get icon() {
    switch (this.alternativeIcon) {
      case SourceAlternativeIcon.sources02:
        if (this.on) {
          return html`<obi-sources-02-on
              usecsscolor
              slot="icon"
            ></obi-sources-02-on>
            <obi-sources-02-on
              usecsscolor
              slot="icon-siluette"
            ></obi-sources-02-on>`;
        } else {
          return html`<obi-sources-02-off
              usecsscolor
              slot="icon"
            ></obi-sources-02-off>
            <obi-sources-02-off
              usecsscolor
              slot="icon-siluette"
            ></obi-sources-02-off>`;
        }
      case SourceAlternativeIcon.sources03:
        if (this.on) {
          return html`<obi-sources-03-on
              usecsscolor
              slot="icon"
            ></obi-sources-03-on>
            <obi-sources-03-on
              usecsscolor
              slot="icon-siluette"
            ></obi-sources-03-on>`;
        } else {
          return html`<obi-sources-03-off
              usecsscolor
              slot="icon"
            ></obi-sources-03-off>
            <obi-sources-03-off
              usecsscolor
              slot="icon-siluette"
            ></obi-sources-03-off>`;
        }
      case SourceAlternativeIcon.sources04:
        if (this.on) {
          return html`<obi-sources-04-on
              usecsscolor
              slot="icon"
            ></obi-sources-04-on>
            <obi-sources-04-on
              usecsscolor
              slot="icon-siluette"
            ></obi-sources-04-on>`;
        } else {
          return html`<obi-sources-04-off
              usecsscolor
              slot="icon"
            ></obi-sources-04-off>
            <obi-sources-04-off
              usecsscolor
              slot="icon-siluette"
            ></obi-sources-04-off>`;
        }
      case SourceAlternativeIcon.sources05:
        if (this.on) {
          return html`<obi-sources-05-on
              usecsscolor
              slot="icon"
            ></obi-sources-05-on>
            <obi-sources-05-on
              usecsscolor
              slot="icon-siluette"
            ></obi-sources-05-on>`;
        } else {
          return html`<obi-sources-05-off
              usecsscolor
              slot="icon"
            ></obi-sources-05-off>
            <obi-sources-05-off
              usecsscolor
              slot="icon-siluette"
            ></obi-sources-05-off>`;
        }
      default:
        if (this.on) {
          return html`<obi-sources-01-on
              usecsscolor
              slot="icon"
            ></obi-sources-01-on>
            <obi-sources-01-on
              usecsscolor
              slot="icon-siluette"
            ></obi-sources-01-on>`;
        } else {
          return html`<obi-sources-01-off
              usecsscolor
              slot="icon"
            ></obi-sources-01-off>
            <obi-sources-01-off
              usecsscolor
              slot="icon-siluette"
            ></obi-sources-01-off>`;
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-source': ObcSource;
  }
}
