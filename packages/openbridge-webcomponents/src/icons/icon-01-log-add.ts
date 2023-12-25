import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-01-log-add')
export class Obi01LogAdd extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H9.2C9.41667 2.4 9.77917 1.91667 10.2875 1.55C10.7958 1.18333 11.3667 1 12 1C12.6333 1 13.2042 1.18333 13.7125 1.55C14.2208 1.91667 14.5833 2.4 14.8 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V11.7C20.6833 11.55 20.3583 11.4208 20.025 11.3125C19.6917 11.2042 19.35 11.125 19 11.075V5H5V19H11.05C11.1 19.3667 11.1792 19.7167 11.2875 20.05C11.3958 20.3833 11.525 20.7 11.675 21H5ZM5 19V5V11.075V11V19ZM7 17H11.075C11.125 16.65 11.2042 16.3083 11.3125 15.975C11.4208 15.6417 11.5417 15.3167 11.675 15H7V17ZM7 13H13.1C13.6333 12.5 14.2292 12.0833 14.8875 11.75C15.5458 11.4167 16.25 11.1917 17 11.075V11H7V13ZM7 9H17V7H7V9ZM12 4.25C12.2167 4.25 12.3958 4.17917 12.5375 4.0375C12.6792 3.89583 12.75 3.71667 12.75 3.5C12.75 3.28333 12.6792 3.10417 12.5375 2.9625C12.3958 2.82083 12.2167 2.75 12 2.75C11.7833 2.75 11.6042 2.82083 11.4625 2.9625C11.3208 3.10417 11.25 3.28333 11.25 3.5C11.25 3.71667 11.3208 3.89583 11.4625 4.0375C11.6042 4.17917 11.7833 4.25 12 4.25ZM18 23C16.6167 23 15.4375 22.5125 14.4625 21.5375C13.4875 20.5625 13 19.3833 13 18C13 16.6167 13.4875 15.4375 14.4625 14.4625C15.4375 13.4875 16.6167 13 18 13C19.3833 13 20.5625 13.4875 21.5375 14.4625C22.5125 15.4375 23 16.6167 23 18C23 19.3833 22.5125 20.5625 21.5375 21.5375C20.5625 22.5125 19.3833 23 18 23ZM17.5 21H18.5V18.5H21V17.5H18.5V15H17.5V17.5H15V18.5H17.5V21Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H9.2C9.41667 2.4 9.77917 1.91667 10.2875 1.55C10.7958 1.18333 11.3667 1 12 1C12.6333 1 13.2042 1.18333 13.7125 1.55C14.2208 1.91667 14.5833 2.4 14.8 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V11.7C20.6833 11.55 20.3583 11.4208 20.025 11.3125C19.6917 11.2042 19.35 11.125 19 11.075V5H5V19H11.05C11.1 19.3667 11.1792 19.7167 11.2875 20.05C11.3958 20.3833 11.525 20.7 11.675 21H5ZM5 19V5V11.075V11V19ZM7 17H11.075C11.125 16.65 11.2042 16.3083 11.3125 15.975C11.4208 15.6417 11.5417 15.3167 11.675 15H7V17ZM7 13H13.1C13.6333 12.5 14.2292 12.0833 14.8875 11.75C15.5458 11.4167 16.25 11.1917 17 11.075V11H7V13ZM7 9H17V7H7V9ZM12 4.25C12.2167 4.25 12.3958 4.17917 12.5375 4.0375C12.6792 3.89583 12.75 3.71667 12.75 3.5C12.75 3.28333 12.6792 3.10417 12.5375 2.9625C12.3958 2.82083 12.2167 2.75 12 2.75C11.7833 2.75 11.6042 2.82083 11.4625 2.9625C11.3208 3.10417 11.25 3.28333 11.25 3.5C11.25 3.71667 11.3208 3.89583 11.4625 4.0375C11.6042 4.17917 11.7833 4.25 12 4.25ZM18 23C16.6167 23 15.4375 22.5125 14.4625 21.5375C13.4875 20.5625 13 19.3833 13 18C13 16.6167 13.4875 15.4375 14.4625 14.4625C15.4375 13.4875 16.6167 13 18 13C19.3833 13 20.5625 13.4875 21.5375 14.4625C22.5125 15.4375 23 16.6167 23 18C23 19.3833 22.5125 20.5625 21.5375 21.5375C20.5625 22.5125 19.3833 23 18 23ZM17.5 21H18.5V18.5H21V17.5H18.5V15H17.5V17.5H15V18.5H17.5V21Z" fill="currentColor"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-01-log-add': Obi01LogAdd;
  }
}
