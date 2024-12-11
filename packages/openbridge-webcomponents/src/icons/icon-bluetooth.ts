import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-bluetooth')
export class ObiBluetooth extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 22V14.4L6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L11 9.6V2H12L17.7 7.7L13.4 12L17.7 16.3L12 22H11ZM13 9.6L14.9 7.7L13 5.85V9.6ZM13 18.15L14.9 16.3L13 14.4V18.15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 22V14.4L6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L11 9.6V2H12L17.7 7.7L13.4 12L17.7 16.3L12 22H11ZM13 9.6L14.9 7.7L13 5.85V9.6ZM13 18.15L14.9 16.3L13 14.4V18.15Z" style="fill: var(--element-active-color)"/>
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
    'obi-bluetooth': ObiBluetooth;
  }
}
