import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-03-illustration')
export class Obi03Illustration extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M29.82 26.205C30.48 25.155 30.87 23.94 30.87 22.62C30.87 18.885 27.855 15.87 24.12 15.87C20.385 15.87 17.37 18.885 17.37 22.62C17.37 26.355 20.385 29.37 24.105 29.37C25.425 29.37 26.655 28.98 27.69 28.32L32.37 33L34.5 30.87L29.82 26.205ZM24.12 26.37C22.05 26.37 20.37 24.69 20.37 22.62C20.37 20.55 22.05 18.87 24.12 18.87C26.19 18.87 27.87 20.55 27.87 22.62C27.87 24.69 26.19 26.37 24.12 26.37ZM23.58 13.62C22.47 13.65 21.405 13.89 20.43 14.295L19.605 13.05L13.905 22.32L9.39 17.04L3.945 25.755L1.5 24L9 12L13.5 17.25L19.5 7.5L23.58 13.62ZM27.465 14.37C26.505 13.95 25.47 13.695 24.39 13.635L32.07 1.5L34.5 3.27L27.465 14.37Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.82 26.205C30.48 25.155 30.87 23.94 30.87 22.62C30.87 18.885 27.855 15.87 24.12 15.87C20.385 15.87 17.37 18.885 17.37 22.62C17.37 26.355 20.385 29.37 24.105 29.37C25.425 29.37 26.655 28.98 27.69 28.32L32.37 33L34.5 30.87L29.82 26.205ZM24.12 26.37C22.05 26.37 20.37 24.69 20.37 22.62C20.37 20.55 22.05 18.87 24.12 18.87C26.19 18.87 27.87 20.55 27.87 22.62C27.87 24.69 26.19 26.37 24.12 26.37ZM23.58 13.62C22.47 13.65 21.405 13.89 20.43 14.295L19.605 13.05L13.905 22.32L9.39 17.04L3.945 25.755L1.5 24L9 12L13.5 17.25L19.5 7.5L23.58 13.62ZM27.465 14.37C26.505 13.95 25.47 13.695 24.39 13.635L32.07 1.5L34.5 3.27L27.465 14.37Z" style="fill: var(--element-active-color)"/>
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
    'obi-03-illustration': Obi03Illustration;
  }
}
