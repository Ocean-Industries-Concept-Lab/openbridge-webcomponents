import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-panel-right-close')
export class ObiPanelRightClose extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.33517 8.70166C7.91219 8.32097 7.7007 8.13063 7.52086 8.12312C7.36465 8.11659 7.21438 8.18352 7.11472 8.304C7 8.44269 7 8.72722 7 9.29629V14.7037C7 15.2728 7 15.5573 7.11472 15.696C7.21438 15.8165 7.36465 15.8834 7.52086 15.8769C7.7007 15.8694 7.91219 15.679 8.33517 15.2983L11.3393 12.5946C11.5681 12.3887 11.6825 12.2857 11.7247 12.1645C11.7619 12.058 11.7619 11.942 11.7247 11.8355C11.6825 11.7143 11.5681 11.6113 11.3393 11.4054L8.33517 8.70166ZM4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM17 18H20V6H17V18ZM15 18V6H4V18H15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.33517 8.70166C7.91219 8.32097 7.7007 8.13063 7.52086 8.12312C7.36465 8.11659 7.21438 8.18352 7.11472 8.304C7 8.44269 7 8.72722 7 9.29629V14.7037C7 15.2728 7 15.5573 7.11472 15.696C7.21438 15.8165 7.36465 15.8834 7.52086 15.8769C7.7007 15.8694 7.91219 15.679 8.33517 15.2983L11.3393 12.5946C11.5681 12.3887 11.6825 12.2857 11.7247 12.1645C11.7619 12.058 11.7619 11.942 11.7247 11.8355C11.6825 11.7143 11.5681 11.6113 11.3393 11.4054L8.33517 8.70166ZM4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM17 18H20V6H17V18ZM15 18V6H4V18H15Z" style="fill: var(--element-active-color)"/>
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
    'obi-panel-right-close': ObiPanelRightClose;
  }
}
