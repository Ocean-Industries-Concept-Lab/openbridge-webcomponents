import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-panel-left-close')
export class ObiPanelLeftClose extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6648 8.70166C16.0878 8.32097 16.2993 8.13063 16.4791 8.12312C16.6354 8.11659 16.7856 8.18352 16.8853 8.304C17 8.44269 17 8.72722 17 9.29629V14.7037C17 15.2728 17 15.5573 16.8853 15.696C16.7856 15.8165 16.6354 15.8834 16.4791 15.8769C16.2993 15.8694 16.0878 15.679 15.6648 15.2983L12.6607 12.5946C12.4319 12.3887 12.3175 12.2857 12.2753 12.1645C12.2381 12.058 12.2381 11.942 12.2753 11.8355C12.3175 11.7143 12.4319 11.6113 12.6607 11.4054L15.6648 8.70166ZM20 20C20.55 20 21.0208 19.8042 21.4125 19.4125C21.8042 19.0208 22 18.55 22 18V6C22 5.45 21.8042 4.97917 21.4125 4.5875C21.0208 4.19583 20.55 4 20 4H4C3.45 4 2.97917 4.19583 2.5875 4.5875C2.19583 4.97917 2 5.45 2 6V18C2 18.55 2.19583 19.0208 2.5875 19.4125C2.97917 19.8042 3.45 20 4 20H20ZM7 18H4V6H7V18ZM9 18V6H20V18H9Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6648 8.70166C16.0878 8.32097 16.2993 8.13063 16.4791 8.12312C16.6354 8.11659 16.7856 8.18352 16.8853 8.304C17 8.44269 17 8.72722 17 9.29629V14.7037C17 15.2728 17 15.5573 16.8853 15.696C16.7856 15.8165 16.6354 15.8834 16.4791 15.8769C16.2993 15.8694 16.0878 15.679 15.6648 15.2983L12.6607 12.5946C12.4319 12.3887 12.3175 12.2857 12.2753 12.1645C12.2381 12.058 12.2381 11.942 12.2753 11.8355C12.3175 11.7143 12.4319 11.6113 12.6607 11.4054L15.6648 8.70166ZM20 20C20.55 20 21.0208 19.8042 21.4125 19.4125C21.8042 19.0208 22 18.55 22 18V6C22 5.45 21.8042 4.97917 21.4125 4.5875C21.0208 4.19583 20.55 4 20 4H4C3.45 4 2.97917 4.19583 2.5875 4.5875C2.19583 4.97917 2 5.45 2 6V18C2 18.55 2.19583 19.0208 2.5875 19.4125C2.97917 19.8042 3.45 20 4 20H20ZM7 18H4V6H7V18ZM9 18V6H20V18H9Z" style="fill: var(--element-active-color)"/>
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
    'obi-panel-left-close': ObiPanelLeftClose;
  }
}
