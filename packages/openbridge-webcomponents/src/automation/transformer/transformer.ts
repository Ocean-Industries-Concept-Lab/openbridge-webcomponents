import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-transformer-01-on.js';
import '../../icons/icon-transformer-01-off.js';
import '../../icons/icon-transformer-02-on.js';
import '../../icons/icon-transformer-02-off.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';

export enum TransformerAlternativeIcon {
  transformer01 = 'transformer01',
  transformer02 = 'transformer02',
}

@customElement('obc-transformer')
export class ObcTransformer extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: TransformerAlternativeIcon =
    TransformerAlternativeIcon.transformer01;

  override get icon() {
    switch (this.alternativeIcon) {
      case TransformerAlternativeIcon.transformer02:
        if (this.on) {
          return html`<obi-transformer-02-on
              usecsscolor
              slot="icon"
            ></obi-transformer-02-on>
            <obi-transformer-02-on
              usecsscolor
              slot="icon-silhouette"
            ></obi-transformer-02-on>`;
        } else {
          return html`<obi-transformer-02-off
              usecsscolor
              slot="icon"
            ></obi-transformer-02-off>
            <obi-transformer-02-off
              usecsscolor
              slot="icon-silhouette"
            ></obi-transformer-02-off>`;
        }
      default:
        if (this.on) {
          return html`<obi-transformer-01-on
              usecsscolor
              slot="icon"
            ></obi-transformer-01-on>
            <obi-transformer-01-on
              usecsscolor
              slot="icon-silhouette"
            ></obi-transformer-01-on>`;
        } else {
          return html`<obi-transformer-01-off
              usecsscolor
              slot="icon"
            ></obi-transformer-01-off>
            <obi-transformer-01-off
              usecsscolor
              slot="icon-silhouette"
            ></obi-transformer-01-off>`;
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-transformer': ObcTransformer;
  }
}
