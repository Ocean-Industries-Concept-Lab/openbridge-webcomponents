import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-generic-slow-outlined')
export class ObiVesselGenericSlowOutlined extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 21.9999C11.5857 21.9999 11.2499 21.6641 11.2499 21.2499V16.7499C11.2499 16.3356 11.5857 15.9999 11.9999 15.9999C12.4142 15.9999 12.7499 16.3356 12.7499 16.7499V21.2499C12.7499 21.6641 12.4142 21.9999 11.9999 21.9999Z" fill="currentColor"/>
<path d="M10.8339 1.95591C11.3049 1.01469 12.695 1.0147 13.166 1.95591L13.2099 2.05356L17.6562 13.0047C17.8915 13.5844 17.6594 14.1448 17.2763 14.4549C16.8976 14.7615 16.3264 14.8686 15.8095 14.5858L11.9999 12.4999L8.19037 14.5858C7.6735 14.8686 7.10229 14.7615 6.72357 14.4549C6.34046 14.1448 6.10841 13.5844 6.34369 13.0047L10.79 2.05356L10.8339 1.95591ZM7.96478 12.9979L11.3632 11.1385L11.5156 11.0672C11.8262 10.9456 12.1736 10.9456 12.4843 11.0672L12.6367 11.1385L16.0341 12.9979L11.9999 3.05942L7.96478 12.9979Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 21.9999C11.5857 21.9999 11.2499 21.6641 11.2499 21.2499V16.7499C11.2499 16.3356 11.5857 15.9999 11.9999 15.9999C12.4142 15.9999 12.7499 16.3356 12.7499 16.7499V21.2499C12.7499 21.6641 12.4142 21.9999 11.9999 21.9999Z" style="fill: var(--element-active-color)"/>
<path d="M10.8339 1.95591C11.3049 1.01469 12.695 1.0147 13.166 1.95591L13.2099 2.05356L17.6562 13.0047C17.8915 13.5844 17.6594 14.1448 17.2763 14.4549C16.8976 14.7615 16.3264 14.8686 15.8095 14.5858L11.9999 12.4999L8.19037 14.5858C7.6735 14.8686 7.10229 14.7615 6.72357 14.4549C6.34046 14.1448 6.10841 13.5844 6.34369 13.0047L10.79 2.05356L10.8339 1.95591ZM7.96478 12.9979L11.3632 11.1385L11.5156 11.0672C11.8262 10.9456 12.1736 10.9456 12.4843 11.0672L12.6367 11.1385L16.0341 12.9979L11.9999 3.05942L7.96478 12.9979Z" style="fill: var(--element-active-color)"/>
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
    'obi-vessel-generic-slow-outlined': ObiVesselGenericSlowOutlined;
  }
}
