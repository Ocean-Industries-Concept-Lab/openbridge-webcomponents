import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-15-call-end')
export class Obi15CallEnd extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 9.06982C10.4 9.06982 8.85 9.31982 7.4 9.78982V12.8898C7.4 13.2798 7.17 13.6298 6.84 13.7898C5.86 14.2798 4.97 14.9098 4.18 15.6398C4 15.8198 3.75 15.9198 3.48 15.9198C3.2 15.9198 2.95 15.8098 2.77 15.6298L0.29 13.1498C0.11 12.9798 0 12.7298 0 12.4498C0 12.1698 0.11 11.9198 0.29 11.7398C3.34 8.84982 7.46 7.06982 12 7.06982C16.54 7.06982 20.66 8.84982 23.71 11.7398C23.89 11.9198 24 12.1698 24 12.4498C24 12.7298 23.89 12.9798 23.71 13.1598L21.23 15.6398C21.05 15.8198 20.8 15.9298 20.52 15.9298C20.25 15.9298 20 15.8198 19.82 15.6498C19.03 14.9098 18.13 14.2898 17.15 13.7998C16.82 13.6398 16.59 13.2998 16.59 12.8998V9.79982C15.15 9.31982 13.6 9.06982 12 9.06982Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 9.06982C10.4 9.06982 8.85 9.31982 7.4 9.78982V12.8898C7.4 13.2798 7.17 13.6298 6.84 13.7898C5.86 14.2798 4.97 14.9098 4.18 15.6398C4 15.8198 3.75 15.9198 3.48 15.9198C3.2 15.9198 2.95 15.8098 2.77 15.6298L0.29 13.1498C0.11 12.9798 0 12.7298 0 12.4498C0 12.1698 0.11 11.9198 0.29 11.7398C3.34 8.84982 7.46 7.06982 12 7.06982C16.54 7.06982 20.66 8.84982 23.71 11.7398C23.89 11.9198 24 12.1698 24 12.4498C24 12.7298 23.89 12.9798 23.71 13.1598L21.23 15.6398C21.05 15.8198 20.8 15.9298 20.52 15.9298C20.25 15.9298 20 15.8198 19.82 15.6498C19.03 14.9098 18.13 14.2898 17.15 13.7998C16.82 13.6398 16.59 13.2998 16.59 12.8998V9.79982C15.15 9.31982 13.6 9.06982 12 9.06982Z" style="fill: var(--element-active-color)"/>
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
    'obi-15-call-end': Obi15CallEnd;
  }
}
