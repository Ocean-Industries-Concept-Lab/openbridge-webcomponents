import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-filter-1-on.js';
import '../../icons/icon-filter-1-off.js';
import '../../icons/icon-filter-2-on.js';
import '../../icons/icon-filter-2-off.js';
import '../../icons/icon-filter-3-on.js';
import '../../icons/icon-filter-3-off.js';
import '../../icons/icon-filter-4-on.js';
import '../../icons/icon-filter-4-off.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButtonSquared} from '../automation-button/abstract-automation-button-squared.js';

export enum FilterAlternativeIcon {
  filter1 = 'filter1',
  filter2 = 'filter2',
  filter3 = 'filter3',
  filter4 = 'filter4',
}

@customElement('obc-filter')
export class ObcFilter extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: FilterAlternativeIcon =
    FilterAlternativeIcon.filter1;

  override get icon() {
    switch (this.alternativeIcon) {
      case FilterAlternativeIcon.filter2:
        if (this.on) {
          return html`<obi-filter-2-on
              usecsscolor
              slot="icon"
            ></obi-filter-2-on>
            <obi-filter-2-on
              usecsscolor
              slot="icon-siluette"
            ></obi-filter-2-on>`;
        } else {
          return html`<obi-filter-2-off
              usecsscolor
              slot="icon"
            ></obi-filter-2-off>
            <obi-filter-2-off
              usecsscolor
              slot="icon-siluette"
            ></obi-filter-2-off>`;
        }
      case FilterAlternativeIcon.filter3:
        if (this.on) {
          return html`<obi-filter-3-on
              usecsscolor
              slot="icon"
            ></obi-filter-3-on>
            <obi-filter-3-on
              usecsscolor
              slot="icon-siluette"
            ></obi-filter-3-on>`;
        } else {
          return html`<obi-filter-3-off
              usecsscolor
              slot="icon"
            ></obi-filter-3-off>
            <obi-filter-3-off
              usecsscolor
              slot="icon-siluette"
            ></obi-filter-3-off>`;
        }
      case FilterAlternativeIcon.filter4:
        if (this.on) {
          return html`<obi-filter-4-on
              usecsscolor
              slot="icon"
            ></obi-filter-4-on>
            <obi-filter-4-on
              usecsscolor
              slot="icon-siluette"
            ></obi-filter-4-on>`;
        } else {
          return html`<obi-filter-4-off
              usecsscolor
              slot="icon"
            ></obi-filter-4-off>
            <obi-filter-4-off
              usecsscolor
              slot="icon-siluette"
            ></obi-filter-4-off>`;
        }
      default:
        if (this.on) {
          return html`<obi-filter-1-on
              usecsscolor
              slot="icon"
            ></obi-filter-1-on>
            <obi-filter-1-on
              usecsscolor
              slot="icon-siluette"
            ></obi-filter-1-on>`;
        } else {
          return html`<obi-filter-1-off
              usecsscolor
              slot="icon"
            ></obi-filter-1-off>
            <obi-filter-1-off
              usecsscolor
              slot="icon-siluette"
            ></obi-filter-1-off>`;
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-filter': ObcFilter;
  }
}
