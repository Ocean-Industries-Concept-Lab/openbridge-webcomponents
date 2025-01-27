import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-bipolar_transistor-02')
export class ObiBipolar_transistor02 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM17.9112 21.2783C16.204 22.3683 14.1757 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C14.5183 1 16.8389 1.84624 18.6931 3.26987L14.2228 5.85075L13.0981 3.90269L9.40198 9.50077L16.0981 9.09884L14.9728 7.14979L19.8748 4.31965C21.8085 6.30205 23 9.01189 23 12C23 15.3131 21.5353 18.2841 19.2181 20.3008L8 13.824V6C8 5.44772 7.55228 5 7 5C6.44772 5 6 5.44772 6 6V18C6 18.5523 6.44772 19 7 19C7.55228 19 8 18.5523 8 18V15.5561L17.9112 21.2783Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM17.9112 21.2783C16.204 22.3683 14.1757 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C14.5183 1 16.8389 1.84624 18.6931 3.26987L14.2228 5.85075L13.0981 3.90269L9.40198 9.50077L16.0981 9.09884L14.9728 7.14979L19.8748 4.31965C21.8085 6.30205 23 9.01189 23 12C23 15.3131 21.5353 18.2841 19.2181 20.3008L8 13.824V6C8 5.44772 7.55228 5 7 5C6.44772 5 6 5.44772 6 6V18C6 18.5523 6.44772 19 7 19C7.55228 19 8 18.5523 8 18V15.5561L17.9112 21.2783Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-bipolar_transistor-02': ObiBipolar_transistor02;
  }
}
