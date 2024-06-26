import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-01-visibility-off')
export class Obi01VisibilityOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6C14.76 6 17 8.24 17 11C17 11.65 16.87 12.26 16.64 12.83L19.56 15.75C21.07 14.49 22.26 12.86 22.99 11C21.26 6.61 16.99 3.5 11.99 3.5C10.59 3.5 9.25 3.75 8.01 4.2L10.17 6.36C10.74 6.13 11.35 6 12 6ZM2 3.27L4.28 5.55L4.74 6.01C3.08 7.3 1.78 9.02 1 11C2.73 15.39 7 18.5 12 18.5C13.55 18.5 15.03 18.2 16.38 17.66L16.8 18.08L19.73 21L21 19.73L3.27 2L2 3.27ZM7.53 8.8L9.08 10.35C9.03 10.56 9 10.78 9 11C9 12.66 10.34 14 12 14C12.22 14 12.44 13.97 12.65 13.92L14.2 15.47C13.53 15.8 12.79 16 12 16C9.24 16 7 13.76 7 11C7 10.21 7.2 9.47 7.53 8.8ZM11.84 8.02L14.99 11.17L15.01 11.01C15.01 9.35 13.67 8.01 12.01 8.01L11.84 8.02Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6C14.76 6 17 8.24 17 11C17 11.65 16.87 12.26 16.64 12.83L19.56 15.75C21.07 14.49 22.26 12.86 22.99 11C21.26 6.61 16.99 3.5 11.99 3.5C10.59 3.5 9.25 3.75 8.01 4.2L10.17 6.36C10.74 6.13 11.35 6 12 6ZM2 3.27L4.28 5.55L4.74 6.01C3.08 7.3 1.78 9.02 1 11C2.73 15.39 7 18.5 12 18.5C13.55 18.5 15.03 18.2 16.38 17.66L16.8 18.08L19.73 21L21 19.73L3.27 2L2 3.27ZM7.53 8.8L9.08 10.35C9.03 10.56 9 10.78 9 11C9 12.66 10.34 14 12 14C12.22 14 12.44 13.97 12.65 13.92L14.2 15.47C13.53 15.8 12.79 16 12 16C9.24 16 7 13.76 7 11C7 10.21 7.2 9.47 7.53 8.8ZM11.84 8.02L14.99 11.17L15.01 11.01C15.01 9.35 13.67 8.01 12.01 8.01L11.84 8.02Z" style="fill: var(--element-active-color)"/>
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
    'obi-01-visibility-off': Obi01VisibilityOff;
  }
}
