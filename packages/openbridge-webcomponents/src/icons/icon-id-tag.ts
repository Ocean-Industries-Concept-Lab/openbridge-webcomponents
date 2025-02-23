import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-id-tag')
export class ObiIdTag extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.25 3L9.125 7.99979L5.5 8V10L8.675 9.99979L7.775 13.9998H4.5V15.9998H7.325L6.19995 21H8.24995L9.375 15.9998H12.825L11.7 21H13.75L14.875 15.9998L18.5 16V14L15.325 13.9998L16.225 9.99979H19.5V7.99979H16.675L17.8 3H15.75L14.625 7.99979H11.175L12.3 3H10.25ZM10.725 9.99979L9.825 13.9998H13.275L14.175 9.99979H10.725Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.25 3L9.125 7.99979L5.5 8V10L8.675 9.99979L7.775 13.9998H4.5V15.9998H7.325L6.19995 21H8.24995L9.375 15.9998H12.825L11.7 21H13.75L14.875 15.9998L18.5 16V14L15.325 13.9998L16.225 9.99979H19.5V7.99979H16.675L17.8 3H15.75L14.625 7.99979H11.175L12.3 3H10.25ZM10.725 9.99979L9.825 13.9998H13.275L14.175 9.99979H10.725Z" style="fill: var(--element-active-color)"/>
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
    'obi-id-tag': ObiIdTag;
  }
}
