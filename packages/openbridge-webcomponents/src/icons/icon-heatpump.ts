import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-heatpump')
export class ObiHeatpump extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.3043 18.8299C20.9764 17.0425 22 14.6408 22 12C22 9.35954 20.9766 6.9581 19.3049 5.17068L19.1866 5.04642C17.3686 3.16786 14.8207 2 12 2C7.52927 2 3.74376 4.93382 2.46372 8.98123L2.35067 9.36548C2.12204 10.2049 2 11.0882 2 12C2 12.9387 2.12933 13.8471 2.37114 14.7085L2.46069 15.0092C3.73779 19.0616 7.52574 22 12 22C14.8207 22 17.3687 20.8321 19.1867 18.9535L19.3043 18.8299ZM19.5024 16.9731C20.4487 15.5484 21 13.8386 21 12C21 10.1614 20.4487 8.45154 19.5023 7.02677L3.0673 10.8938C3.02287 11.2563 3 11.6255 3 12C3 12.3714 3.0225 12.7375 3.0662 13.0971L19.5024 16.9731ZM18.0305 18.6809L3.61713 15.2819C4.9287 18.6294 8.18751 21 12 21C14.3198 21 16.4346 20.1223 18.0305 18.6809ZM18.0299 5.31859L3.6207 8.709C4.9346 5.36626 8.19096 3 12 3C14.3195 3 16.4341 3.87748 18.0299 5.31859Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.3043 18.8299C20.9764 17.0425 22 14.6408 22 12C22 9.35954 20.9766 6.9581 19.3049 5.17068L19.1866 5.04642C17.3686 3.16786 14.8207 2 12 2C7.52927 2 3.74376 4.93382 2.46372 8.98123L2.35067 9.36548C2.12204 10.2049 2 11.0882 2 12C2 12.9387 2.12933 13.8471 2.37114 14.7085L2.46069 15.0092C3.73779 19.0616 7.52574 22 12 22C14.8207 22 17.3687 20.8321 19.1867 18.9535L19.3043 18.8299ZM19.5024 16.9731C20.4487 15.5484 21 13.8386 21 12C21 10.1614 20.4487 8.45154 19.5023 7.02677L3.0673 10.8938C3.02287 11.2563 3 11.6255 3 12C3 12.3714 3.0225 12.7375 3.0662 13.0971L19.5024 16.9731ZM18.0305 18.6809L3.61713 15.2819C4.9287 18.6294 8.18751 21 12 21C14.3198 21 16.4346 20.1223 18.0305 18.6809ZM18.0299 5.31859L3.6207 8.709C4.9346 5.36626 8.19096 3 12 3C14.3195 3 16.4341 3.87748 18.0299 5.31859Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper">${this.useCssColor ? this.iconCss : this.icon}</div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: 100%;
      width: 100%;
      line-height: 0;
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-heatpump': ObiHeatpump;
  }
}
