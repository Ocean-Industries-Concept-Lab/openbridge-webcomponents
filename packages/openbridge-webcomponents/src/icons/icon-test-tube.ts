import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-test-tube')
export class ObiTestTube extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.75 19C12.75 19.4142 12.4142 19.75 12 19.75C11.5858 19.75 11.25 19.4142 11.25 19V6H12.75V19Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 2C16.3023 2 16.75 2.44772 16.75 3C16.75 3.55228 16.3023 4 15.75 4H15.251L15.25 19.25L15.2451 19.4346C15.1495 21.1436 13.733 22.5 12 22.5L11.8154 22.4951L11.6338 22.4795C10.0113 22.2975 8.75 20.9211 8.75 19.25L8.74902 4H8.25C7.69772 4 7.25 3.55228 7.25 3C7.25 2.44772 7.69772 2 8.25 2H15.75ZM10.25 4V19.25L10.2559 19.3936C10.3289 20.2929 11.0818 21 12 21C12.9665 21 13.75 20.2165 13.75 19.25L13.751 4H10.25Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.75 19C12.75 19.4142 12.4142 19.75 12 19.75C11.5858 19.75 11.25 19.4142 11.25 19V6H12.75V19Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 2C16.3023 2 16.75 2.44772 16.75 3C16.75 3.55228 16.3023 4 15.75 4H15.251L15.25 19.25L15.2451 19.4346C15.1495 21.1436 13.733 22.5 12 22.5L11.8154 22.4951L11.6338 22.4795C10.0113 22.2975 8.75 20.9211 8.75 19.25L8.74902 4H8.25C7.69772 4 7.25 3.55228 7.25 3C7.25 2.44772 7.69772 2 8.25 2H15.75ZM10.25 4V19.25L10.2559 19.3936C10.3289 20.2929 11.0818 21 12 21C12.9665 21 13.75 20.2165 13.75 19.25L13.751 4H10.25Z" style="fill: var(--element-active-color)"/>
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
    'obi-test-tube': ObiTestTube;
  }
}
