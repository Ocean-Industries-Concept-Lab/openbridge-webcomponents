import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-panel-right-open')
export class ObiPanelRightOpen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM17 18H20V6H17V18ZM15 18V6H4V18H15Z" fill="currentColor"/>
<path d="M12 14.7037V9.29629C12 8.72722 12 8.44269 11.8853 8.304C11.7856 8.18352 11.6354 8.11659 11.4791 8.12312C11.2993 8.13063 11.0878 8.32097 10.6648 8.70166L7.6607 11.4054C7.4319 11.6113 7.31749 11.7143 7.27525 11.8355C7.23815 11.942 7.23815 12.058 7.27525 12.1645C7.31749 12.2857 7.4319 12.3887 7.66071 12.5946L10.6648 15.2983C11.0878 15.679 11.2993 15.8694 11.4791 15.8769C11.6354 15.8834 11.7856 15.8165 11.8853 15.696C12 15.5573 12 15.2728 12 14.7037Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM17 18H20V6H17V18ZM15 18V6H4V18H15Z" style="fill: var(--element-active-color)"/>
<path d="M12 14.7037V9.29629C12 8.72722 12 8.44269 11.8853 8.304C11.7856 8.18352 11.6354 8.11659 11.4791 8.12312C11.2993 8.13063 11.0878 8.32097 10.6648 8.70166L7.6607 11.4054C7.4319 11.6113 7.31749 11.7143 7.27525 11.8355C7.23815 11.942 7.23815 12.058 7.27525 12.1645C7.31749 12.2857 7.4319 12.3887 7.66071 12.5946L10.6648 15.2983C11.0878 15.679 11.2993 15.8694 11.4791 15.8769C11.6354 15.8834 11.7856 15.8165 11.8853 15.696C12 15.5573 12 15.2728 12 14.7037Z" style="fill: var(--element-active-color)"/>
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
    'obi-panel-right-open': ObiPanelRightOpen;
  }
}
