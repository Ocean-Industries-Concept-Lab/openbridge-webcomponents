import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-panel-right-close')
export class ObiPanelRightClose extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 21C19.55 21 20.0208 20.8042 20.4125 20.4125C20.8042 20.0208 21 19.55 21 19V5C21 4.45 20.8042 3.97917 20.4125 3.5875C20.0208 3.19583 19.55 3 19 3H5C4.45 3 3.97917 3.19583 3.5875 3.5875C3.19583 3.97917 3 4.45 3 5H14V19H3C3 19.55 3.19583 20.0208 3.5875 20.4125C3.97917 20.8042 4.45 21 5 21H19ZM16 5V19H19V5H16Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.70703 17.207L11.9141 12L6.70703 6.79297L5.29297 8.20703L9 12L5.29297 15.793L6.70703 17.207Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 21C19.55 21 20.0208 20.8042 20.4125 20.4125C20.8042 20.0208 21 19.55 21 19V5C21 4.45 20.8042 3.97917 20.4125 3.5875C20.0208 3.19583 19.55 3 19 3H5C4.45 3 3.97917 3.19583 3.5875 3.5875C3.19583 3.97917 3 4.45 3 5H14V19H3C3 19.55 3.19583 20.0208 3.5875 20.4125C3.97917 20.8042 4.45 21 5 21H19ZM16 5V19H19V5H16Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.70703 17.207L11.9141 12L6.70703 6.79297L5.29297 8.20703L9 12L5.29297 15.793L6.70703 17.207Z" style="fill: var(--element-active-color)"/>
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
