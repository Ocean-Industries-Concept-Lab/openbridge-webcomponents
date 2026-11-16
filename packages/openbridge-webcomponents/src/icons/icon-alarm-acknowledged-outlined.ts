import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-alarm-acknowledged-outlined')
export class ObiAlarmAcknowledgedOutlined extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0006 2.00026L2.00141 20.9996L21.9987 21L12.0006 2.00026ZM11.1158 1.53427L1.11648 20.5338C0.765943 21.1999 1.24879 22 2.00128 22L21.9987 22C22.7512 22 23.234 21.1999 22.8835 20.5339L12.8854 1.53432C12.5105 0.821913 11.4907 0.821889 11.1158 1.53427Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M11 15V7H13V15H11Z" fill="currentColor"/>
<path d="M13 17H11V19H13V17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0006 2.00026L2.00141 20.9996L21.9987 21L12.0006 2.00026ZM11.1158 1.53427L1.11648 20.5338C0.765943 21.1999 1.24879 22 2.00128 22L21.9987 22C22.7512 22 23.234 21.1999 22.8835 20.5339L12.8854 1.53432C12.5105 0.821913 11.4907 0.821889 11.1158 1.53427Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-color)"/>
<path d="M11 15V7H13V15H11Z" style="fill: var(--element-active-color)"/>
<path d="M13 17H11V19H13V17Z" style="fill: var(--element-active-color)"/>
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
