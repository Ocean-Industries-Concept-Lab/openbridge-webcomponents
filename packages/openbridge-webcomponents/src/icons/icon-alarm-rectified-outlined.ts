import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alarm-rectified-outlined')
export class ObiAlarmRectifiedOutlined extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0006 2.00026L2.00141 20.9996L21.9987 21L12.0006 2.00026ZM11.1158 1.53427L1.11648 20.5338C0.765943 21.1999 1.24879 22 2.00128 22L21.9987 22C22.7512 22 23.234 21.1999 22.8835 20.5339L12.8854 1.53432C12.5105 0.821913 11.4907 0.821889 11.1158 1.53427Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.2071 12.7071L10 19.9142L5.79291 15.7071L7.20712 14.2928L10 17.0857L15.7929 11.2928L17.2071 12.7071Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0006 2.00026L2.00141 20.9996L21.9987 21L12.0006 2.00026ZM11.1158 1.53427L1.11648 20.5338C0.765943 21.1999 1.24879 22 2.00128 22L21.9987 22C22.7512 22 23.234 21.1999 22.8835 20.5339L12.8854 1.53432C12.5105 0.821913 11.4907 0.821889 11.1158 1.53427Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.2071 12.7071L10 19.9142L5.79291 15.7071L7.20712 14.2928L10 17.0857L15.7929 11.2928L17.2071 12.7071Z" style="fill: var(--element-active-color)"/>
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
    'obi-alarm-rectified-outlined': ObiAlarmRectifiedOutlined;
  }
}
