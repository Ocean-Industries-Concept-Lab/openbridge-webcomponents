import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-17-surfing')
export class Obi17Surfing extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M21 22.75C19.97 22.75 18.94 22.5 18 22C16.11 23 13.89 23 12 22C10.11 23 7.89 23 6 22C5.05 22.5 4.03 22.75 3 22.75H2V20.75H3C4.04 20.75 5.08 20.4 6 19.75C7.83 21.05 10.17 21.05 12 19.75C13.83 21.05 16.17 21.05 18 19.75C18.91 20.4 19.96 20.75 21 20.75H22V22.75H21ZM17 1.25C15.9 1.25 15 2.15 15 3.25C15 4.35 15.9 5.25 17 5.25C18.1 5.25 19 4.35 19 3.25C19 2.15 18.1 1.25 17 1.25ZM14.43 8.23L12.18 9.75L16 12.75V16.59C16.53 16.97 17.03 17.37 17.49 17.76C16.81 18.34 15.94 18.75 15 18.75C13.8 18.75 12.73 18.09 12 17.25C11.27 18.09 10.2 18.75 9 18.75C8.67 18.75 8.35 18.7 8.04 18.61C5.19 16.65 3 14.47 3 13.03C3 12 4.01 11.75 4.85 11.75C5.83 11.75 7.13 12.06 8.55 12.58L8.02 9.48C7.91 8.81 8.2 8.1 8.8 7.69L10.95 6.24L8.95 5.87L6.13 7.8L5 6.15L8.5 3.75L14.05 4.78C14.5 4.87 14.98 5.15 15.27 5.67L16.15 7.22C17.01 8.73 18.64 9.75 20.5 9.75V11.75C17.91 11.75 15.64 10.33 14.43 8.23ZM10.3 10.85L10.74 13.5C11.66 13.92 13.22 14.77 14 15.25V13.75L10.3 10.85Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 22.75C19.97 22.75 18.94 22.5 18 22C16.11 23 13.89 23 12 22C10.11 23 7.89 23 6 22C5.05 22.5 4.03 22.75 3 22.75H2V20.75H3C4.04 20.75 5.08 20.4 6 19.75C7.83 21.05 10.17 21.05 12 19.75C13.83 21.05 16.17 21.05 18 19.75C18.91 20.4 19.96 20.75 21 20.75H22V22.75H21ZM17 1.25C15.9 1.25 15 2.15 15 3.25C15 4.35 15.9 5.25 17 5.25C18.1 5.25 19 4.35 19 3.25C19 2.15 18.1 1.25 17 1.25ZM14.43 8.23L12.18 9.75L16 12.75V16.59C16.53 16.97 17.03 17.37 17.49 17.76C16.81 18.34 15.94 18.75 15 18.75C13.8 18.75 12.73 18.09 12 17.25C11.27 18.09 10.2 18.75 9 18.75C8.67 18.75 8.35 18.7 8.04 18.61C5.19 16.65 3 14.47 3 13.03C3 12 4.01 11.75 4.85 11.75C5.83 11.75 7.13 12.06 8.55 12.58L8.02 9.48C7.91 8.81 8.2 8.1 8.8 7.69L10.95 6.24L8.95 5.87L6.13 7.8L5 6.15L8.5 3.75L14.05 4.78C14.5 4.87 14.98 5.15 15.27 5.67L16.15 7.22C17.01 8.73 18.64 9.75 20.5 9.75V11.75C17.91 11.75 15.64 10.33 14.43 8.23ZM10.3 10.85L10.74 13.5C11.66 13.92 13.22 14.77 14 15.25V13.75L10.3 10.85Z" fill="currentColor"/>
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
    'obi-17-surfing': Obi17Surfing;
  }
}
