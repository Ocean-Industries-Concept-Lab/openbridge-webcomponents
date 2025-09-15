import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-type-barge-outlined')
export class ObiVesselTypeBargeOutlined extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13 17.0001V7.00011H15V17.0001H13Z" fill="currentColor"/>
<path d="M9 7.00011V17.0001H11V7.00011H9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1307 4.00011L12 0.347656L8.86933 4.00011H8C6.89543 4.00011 6 4.89554 6 6.00011V18.0001C6 19.1047 6.89543 20.0001 8 20.0001H16C17.1046 20.0001 18 19.1047 18 18.0001V6.00011C18 4.89554 17.1046 4.00011 16 4.00011H15.1307ZM13.1551 4.00011L12 2.65254L10.8449 4.00011H13.1551ZM7.5 6.00011C7.5 5.72396 7.72386 5.50011 8 5.50011H16C16.2761 5.50011 16.5 5.72396 16.5 6.00011V18.0001C16.5 18.2762 16.2761 18.5001 16 18.5001H8C7.72386 18.5001 7.5 18.2762 7.5 18.0001V6.00011Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 17.0001V7.00011H15V17.0001H13Z" style="fill: var(--element-active-color)"/>
<path d="M9 7.00011V17.0001H11V7.00011H9Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1307 4.00011L12 0.347656L8.86933 4.00011H8C6.89543 4.00011 6 4.89554 6 6.00011V18.0001C6 19.1047 6.89543 20.0001 8 20.0001H16C17.1046 20.0001 18 19.1047 18 18.0001V6.00011C18 4.89554 17.1046 4.00011 16 4.00011H15.1307ZM13.1551 4.00011L12 2.65254L10.8449 4.00011H13.1551ZM7.5 6.00011C7.5 5.72396 7.72386 5.50011 8 5.50011H16C16.2761 5.50011 16.5 5.72396 16.5 6.00011V18.0001C16.5 18.2762 16.2761 18.5001 16 18.5001H8C7.72386 18.5001 7.5 18.2762 7.5 18.0001V6.00011Z" style="fill: var(--element-active-color)"/>
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
    'obi-vessel-type-barge-outlined': ObiVesselTypeBargeOutlined;
  }
}
