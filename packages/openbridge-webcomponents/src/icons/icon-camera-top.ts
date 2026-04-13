import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-camera-top')
export class ObiCameraTop extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3504 5.5L7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5L5.5 18.5C5.5 19.6046 6.39543 20.5 7.5 20.5H16.5C17.6046 20.5 18.5 19.6046 18.5 18.5L18.5 7.5C18.5 6.39543 17.6046 5.5 16.5 5.5L13.6496 5.5L16.5 2.5L7.5 2.5L10.3504 5.5ZM7.5 18.5L7.5 7.5L16.5 7.5L16.5 18.5H7.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3504 5.5L7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5L5.5 18.5C5.5 19.6046 6.39543 20.5 7.5 20.5H16.5C17.6046 20.5 18.5 19.6046 18.5 18.5L18.5 7.5C18.5 6.39543 17.6046 5.5 16.5 5.5L13.6496 5.5L16.5 2.5L7.5 2.5L10.3504 5.5ZM7.5 18.5L7.5 7.5L16.5 7.5L16.5 18.5H7.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-camera-top': ObiCameraTop;
  }
}
