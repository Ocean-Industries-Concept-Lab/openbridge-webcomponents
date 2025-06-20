import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-alarm-acknowledged-outlined')
export class ObiAlarmAcknowledgedOutlined extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.9986 20.9996L12.0006 2.00026L2.00141 20.9996L21.9986 20.9996ZM11.1158 1.53427L1.11648 20.5339C0.765943 21.1999 1.24879 22 2.00128 22L21.9987 22C22.7512 22 23.234 21.1999 22.8835 20.5339L12.8854 1.53432C12.5105 0.821913 11.4907 0.821889 11.1158 1.53427Z" fill="currentColor"/>
<path d="M7.5 15.7V13.3C7.5 13.02 7.5 12.88 7.5545 12.7731C7.60243 12.679 7.67892 12.6025 7.773 12.5545C7.87996 12.5 8.01997 12.5 8.3 12.5H11L13.6343 9.86574C14.0627 9.43736 14.2769 9.22317 14.4608 9.2087C14.6203 9.19614 14.7763 9.26073 14.8802 9.38243C15 9.5227 15 9.8256 15 10.4314V18.5687C15 19.1745 15 19.4774 14.8802 19.6177C14.7763 19.7394 14.6203 19.804 14.4608 19.7914C14.2769 19.7769 14.0627 19.5627 13.6343 19.1344L11 16.5H8.3C8.01997 16.5 7.87996 16.5 7.773 16.4456C7.67892 16.3976 7.60243 16.3211 7.5545 16.227C7.5 16.1201 7.5 15.9801 7.5 15.7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.9986 20.9996L12.0006 2.00026L2.00141 20.9996L21.9986 20.9996ZM11.1158 1.53427L1.11648 20.5339C0.765943 21.1999 1.24879 22 2.00128 22L21.9987 22C22.7512 22 23.234 21.1999 22.8835 20.5339L12.8854 1.53432C12.5105 0.821913 11.4907 0.821889 11.1158 1.53427Z" style="fill: var(--element-active-color)"/>
<path d="M7.5 15.7V13.3C7.5 13.02 7.5 12.88 7.5545 12.7731C7.60243 12.679 7.67892 12.6025 7.773 12.5545C7.87996 12.5 8.01997 12.5 8.3 12.5H11L13.6343 9.86574C14.0627 9.43736 14.2769 9.22317 14.4608 9.2087C14.6203 9.19614 14.7763 9.26073 14.8802 9.38243C15 9.5227 15 9.8256 15 10.4314V18.5687C15 19.1745 15 19.4774 14.8802 19.6177C14.7763 19.7394 14.6203 19.804 14.4608 19.7914C14.2769 19.7769 14.0627 19.5627 13.6343 19.1344L11 16.5H8.3C8.01997 16.5 7.87996 16.5 7.773 16.4456C7.67892 16.3976 7.60243 16.3211 7.5545 16.227C7.5 16.1201 7.5 15.9801 7.5 15.7Z" style="fill: var(--element-active-color)"/>
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
    'obi-alarm-acknowledged-outlined': ObiAlarmAcknowledgedOutlined;
  }
}
