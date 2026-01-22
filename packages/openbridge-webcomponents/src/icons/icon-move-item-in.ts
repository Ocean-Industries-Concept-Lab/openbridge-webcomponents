import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-move-item-in')
export class ObiMoveItemIn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.15 13H2V11H12.15L10.6 9.45L12 8L16 12L12 16L10.6 14.55L12.15 13Z" fill="currentColor"/>
<path d="M8 19L8 15H6L6 19C6 19.55 6.19583 20.0208 6.5875 20.4125C6.97917 20.8042 7.45 21 8 21H18C18.55 21 19.0208 20.8042 19.4125 20.4125C19.8042 20.0208 20 19.55 20 19L20 5C20 4.45 19.8042 3.97917 19.4125 3.5875C19.0208 3.19583 18.55 3 18 3L8 3C7.45 3 6.97917 3.19583 6.5875 3.5875C6.19583 3.97917 6 4.45 6 5L6 9H8L8 5L18 5L18 19H8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.15 13H2V11H12.15L10.6 9.45L12 8L16 12L12 16L10.6 14.55L12.15 13Z" style="fill: var(--element-active-color)"/>
<path d="M8 19L8 15H6L6 19C6 19.55 6.19583 20.0208 6.5875 20.4125C6.97917 20.8042 7.45 21 8 21H18C18.55 21 19.0208 20.8042 19.4125 20.4125C19.8042 20.0208 20 19.55 20 19L20 5C20 4.45 19.8042 3.97917 19.4125 3.5875C19.0208 3.19583 18.55 3 18 3L8 3C7.45 3 6.97917 3.19583 6.5875 3.5875C6.19583 3.97917 6 4.45 6 5L6 9H8L8 5L18 5L18 19H8Z" style="fill: var(--element-active-color)"/>
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
    'obi-move-item-in': ObiMoveItemIn;
  }
}
