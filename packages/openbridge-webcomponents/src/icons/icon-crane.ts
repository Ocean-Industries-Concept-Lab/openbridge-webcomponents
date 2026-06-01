import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-crane')
export class ObiCrane extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17 7V11H14V15H22V11H19V7H17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 7.23611C7.37154 6.90357 7.65971 6.47979 7.82929 6L21 6V4L7.82929 4C7.41746 2.83481 6.30622 2 5 2C3.34315 2 2 3.34315 2 5C2 6.2562 2.82457 7.41384 4 7.82929L6 19H3V22H14V19H11L7 7.23611ZM5 6C5.55228 6 6 5.55228 6 5C6 4.44772 5.55228 4 5 4C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 7V11H14V15H22V11H19V7H17Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 7.23611C7.37154 6.90357 7.65971 6.47979 7.82929 6L21 6V4L7.82929 4C7.41746 2.83481 6.30622 2 5 2C3.34315 2 2 3.34315 2 5C2 6.2562 2.82457 7.41384 4 7.82929L6 19H3V22H14V19H11L7 7.23611ZM5 6C5.55228 6 6 5.55228 6 5C6 4.44772 5.55228 4 5 4C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6Z" style="fill: var(--element-active-color)"/>
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
    'obi-crane': ObiCrane;
  }
}
