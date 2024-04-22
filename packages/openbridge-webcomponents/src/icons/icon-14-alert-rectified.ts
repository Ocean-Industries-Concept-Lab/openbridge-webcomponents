import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alert-rectified')
export class Obi14AlertRectified extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.19851 19.0799C1.58095 20.1918 2.47909 21.5 3.86001 21.5H20.14C21.5209 21.5 22.4191 20.1918 21.8015 19.0799L13.6615 4.4244C12.9769 3.19187 11.0231 3.19187 10.3385 4.4244L2.19851 19.0799Z" fill="currentColor" />
<path d="M3.86001 21C3.33109 21 2.91693 20.7515 2.69204 20.4239C2.4702 20.1008 2.42657 19.699 2.63561 19.3227L10.7756 4.66718C11.0139 4.23815 11.4869 4 12 4C12.5131 4 12.9861 4.23814 13.2244 4.66717L21.3644 19.3227C21.5734 19.699 21.5298 20.1008 21.308 20.4239C21.0831 20.7515 20.6689 21 20.14 21H3.86001Z" stroke="black" stroke-opacity="0.05"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.19851 19.0799C1.58095 20.1918 2.47909 21.5 3.86001 21.5H20.14C21.5209 21.5 22.4191 20.1918 21.8015 19.0799L13.6615 4.4244C12.9769 3.19187 11.0231 3.19187 10.3385 4.4244L2.19851 19.0799Z" style="fill: var(--indent-enabled-border-color)" />
<path d="M3.86001 21C3.33109 21 2.91693 20.7515 2.69204 20.4239C2.4702 20.1008 2.42657 19.699 2.63561 19.3227L10.7756 4.66718C11.0139 4.23815 11.4869 4 12 4C12.5131 4 12.9861 4.23814 13.2244 4.66717L21.3644 19.3227C21.5734 19.699 21.5298 20.1008 21.308 20.4239C21.0831 20.7515 20.6689 21 20.14 21H3.86001Z" style="stroke: var(--indent-enabled-border-color)" />
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-14-alert-rectified': Obi14AlertRectified;
  }
}