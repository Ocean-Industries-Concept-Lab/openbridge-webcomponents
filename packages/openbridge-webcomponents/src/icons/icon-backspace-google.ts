import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-backspace-google')
export class ObiBackspaceGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4 16L14 13.4L16.6 16L18 14.6L15.4 12L18 9.4L16.6 8L14 10.6L11.4 8L10 9.4L12.6 12L10 14.6L11.4 16ZM9 20C8.68333 20 8.38333 19.9292 8.1 19.7875C7.81667 19.6458 7.58333 19.45 7.4 19.2L2 12L7.4 4.8C7.58333 4.55 7.81667 4.35417 8.1 4.2125C8.38333 4.07083 8.68333 4 9 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H9ZM4.5 12L9 18H20V6H9L4.5 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4 16L14 13.4L16.6 16L18 14.6L15.4 12L18 9.4L16.6 8L14 10.6L11.4 8L10 9.4L12.6 12L10 14.6L11.4 16ZM9 20C8.68333 20 8.38333 19.9292 8.1 19.7875C7.81667 19.6458 7.58333 19.45 7.4 19.2L2 12L7.4 4.8C7.58333 4.55 7.81667 4.35417 8.1 4.2125C8.38333 4.07083 8.68333 4 9 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H9ZM4.5 12L9 18H20V6H9L4.5 12Z" style="fill: var(undefined)"/>
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
    'obi-backspace-google': ObiBackspaceGoogle;
  }
}
