import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wifistrengt-2-google')
export class ObiWifistrengt2Google extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.48C3.07 5.4 7.31 3.5 12 3.5C16.69 3.5 20.93 5.4 24 8.48L12 20.5L0 8.48ZM12 5.5C8.67 5.5 5.51 6.58 2.92 8.57L5.98706 11.6438C7.65322 10.6119 9.73679 10 12 10C14.2632 10 16.3468 10.6119 18.0129 11.6438L21.08 8.57C18.49 6.58 15.33 5.5 12 5.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.48C3.07 5.4 7.31 3.5 12 3.5C16.69 3.5 20.93 5.4 24 8.48L12 20.5L0 8.48ZM12 5.5C8.67 5.5 5.51 6.58 2.92 8.57L5.98706 11.6438C7.65322 10.6119 9.73679 10 12 10C14.2632 10 16.3468 10.6119 18.0129 11.6438L21.08 8.57C18.49 6.58 15.33 5.5 12 5.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-wifistrengt-2-google': ObiWifistrengt2Google;
  }
}
