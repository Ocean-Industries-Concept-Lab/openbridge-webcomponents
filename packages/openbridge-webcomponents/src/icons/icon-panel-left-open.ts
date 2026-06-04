import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-panel-left-open')
export class ObiPanelLeftOpen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20 20C20.55 20 21.0208 19.8042 21.4125 19.4125C21.8042 19.0208 22 18.55 22 18V6C22 5.45 21.8042 4.97917 21.4125 4.5875C21.0208 4.19583 20.55 4 20 4H4C3.45 4 2.97917 4.19583 2.5875 4.5875C2.19583 4.97917 2 5.45 2 6V18C2 18.55 2.19583 19.0208 2.5875 19.4125C2.97917 19.8042 3.45 20 4 20H20ZM7 18H4V6H7V18ZM9 18V6H20V18H9Z" fill="currentColor"/>
<path d="M12 14.7037V9.29629C12 8.72722 12 8.44269 12.1147 8.304C12.2144 8.18352 12.3646 8.11659 12.5209 8.12312C12.7007 8.13063 12.9122 8.32097 13.3352 8.70166L16.3393 11.4054C16.5681 11.6113 16.6825 11.7143 16.7248 11.8355C16.7619 11.942 16.7619 12.058 16.7248 12.1645C16.6825 12.2857 16.5681 12.3887 16.3393 12.5946L13.3352 15.2983C12.9122 15.679 12.7007 15.8694 12.5209 15.8769C12.3646 15.8834 12.2144 15.8165 12.1147 15.696C12 15.5573 12 15.2728 12 14.7037Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 20C20.55 20 21.0208 19.8042 21.4125 19.4125C21.8042 19.0208 22 18.55 22 18V6C22 5.45 21.8042 4.97917 21.4125 4.5875C21.0208 4.19583 20.55 4 20 4H4C3.45 4 2.97917 4.19583 2.5875 4.5875C2.19583 4.97917 2 5.45 2 6V18C2 18.55 2.19583 19.0208 2.5875 19.4125C2.97917 19.8042 3.45 20 4 20H20ZM7 18H4V6H7V18ZM9 18V6H20V18H9Z" style="fill: var(--element-active-color)"/>
<path d="M12 14.7037V9.29629C12 8.72722 12 8.44269 12.1147 8.304C12.2144 8.18352 12.3646 8.11659 12.5209 8.12312C12.7007 8.13063 12.9122 8.32097 13.3352 8.70166L16.3393 11.4054C16.5681 11.6113 16.6825 11.7143 16.7248 11.8355C16.7619 11.942 16.7619 12.058 16.7248 12.1645C16.6825 12.2857 16.5681 12.3887 16.3393 12.5946L13.3352 15.2983C12.9122 15.679 12.7007 15.8694 12.5209 15.8769C12.3646 15.8834 12.2144 15.8165 12.1147 15.696C12 15.5573 12 15.2728 12 14.7037Z" style="fill: var(--element-active-color)"/>
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
    'obi-panel-left-open': ObiPanelLeftOpen;
  }
}
