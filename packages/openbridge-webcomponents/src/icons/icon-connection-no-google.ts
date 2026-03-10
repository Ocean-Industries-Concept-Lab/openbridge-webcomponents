import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-connection-no-google')
export class ObiConnectionNoGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 20H3.5V18H5.5V20ZM10.5 20H8.5V18H10.5V20ZM15.5 20H13.5V18H15.5V20ZM20.5 20H18.5V18H20.5V20ZM10.2109 5.20801L7.66797 7.75098L10.2109 10.2939L8.79688 11.708L6.25391 9.16504L3.71094 11.708L2.2959 10.2939L4.83984 7.75098L2.2959 5.20801L3.71094 3.79395L6.25391 6.33691L8.79688 3.79395L10.2109 5.20801Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 20H3.5V18H5.5V20ZM10.5 20H8.5V18H10.5V20ZM15.5 20H13.5V18H15.5V20ZM20.5 20H18.5V18H20.5V20ZM10.2109 5.20801L7.66797 7.75098L10.2109 10.2939L8.79688 11.708L6.25391 9.16504L3.71094 11.708L2.2959 10.2939L4.83984 7.75098L2.2959 5.20801L3.71094 3.79395L6.25391 6.33691L8.79688 3.79395L10.2109 5.20801Z" style="fill: var(--element-active-color)"/>
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
    'obi-connection-no-google': ObiConnectionNoGoogle;
  }
}
