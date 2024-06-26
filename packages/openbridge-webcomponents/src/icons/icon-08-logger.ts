import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-logger')
export class Obi08Logger extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 11.5C5.5 12.8807 6.61929 14 8 14H16C17.3807 14 18.5 12.8807 18.5 11.5C18.5 10.1193 17.3807 9 16 9H8C6.61929 9 5.5 10.1193 5.5 11.5ZM10.5 11.5C10.5 12.0628 10.314 12.5822 10.0002 13H13.9998C13.686 12.5822 13.5 12.0628 13.5 11.5C13.5 10.9372 13.686 10.4178 13.9998 10H10.0002C10.314 10.4178 10.5 10.9372 10.5 11.5ZM9 11.5C9 12.0523 8.55228 12.5 8 12.5C7.44772 12.5 7 12.0523 7 11.5C7 10.9477 7.44772 10.5 8 10.5C8.55228 10.5 9 10.9477 9 11.5ZM17 11.5C17 12.0523 16.5523 12.5 16 12.5C15.4477 12.5 15 12.0523 15 11.5C15 10.9477 15.4477 10.5 16 10.5C16.5523 10.5 17 10.9477 17 11.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H3ZM4 20V4H20V20H4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 11.5C5.5 12.8807 6.61929 14 8 14H16C17.3807 14 18.5 12.8807 18.5 11.5C18.5 10.1193 17.3807 9 16 9H8C6.61929 9 5.5 10.1193 5.5 11.5ZM10.5 11.5C10.5 12.0628 10.314 12.5822 10.0002 13H13.9998C13.686 12.5822 13.5 12.0628 13.5 11.5C13.5 10.9372 13.686 10.4178 13.9998 10H10.0002C10.314 10.4178 10.5 10.9372 10.5 11.5ZM9 11.5C9 12.0523 8.55228 12.5 8 12.5C7.44772 12.5 7 12.0523 7 11.5C7 10.9477 7.44772 10.5 8 10.5C8.55228 10.5 9 10.9477 9 11.5ZM17 11.5C17 12.0523 16.5523 12.5 16 12.5C15.4477 12.5 15 12.0523 15 11.5C15 10.9477 15.4477 10.5 16 10.5C16.5523 10.5 17 10.9477 17 11.5Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H3ZM4 20V4H20V20H4Z" style="fill: var(--element-active-color)"/>
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
    'obi-08-logger': Obi08Logger;
  }
}
