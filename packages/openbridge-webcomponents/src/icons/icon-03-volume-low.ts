import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-03-volume-low')
export class Obi03VolumeLow extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5 15V9H9L14 4V20L9 15H5ZM16 16V7.95C16.75 8.3 17.354 8.84167 17.812 9.575C18.2707 10.3083 18.5 11.1167 18.5 12C18.5 12.8833 18.2707 13.6833 17.812 14.4C17.354 15.1167 16.75 15.65 16 16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 15V9H9L14 4V20L9 15H5ZM16 16V7.95C16.75 8.3 17.354 8.84167 17.812 9.575C18.2707 10.3083 18.5 11.1167 18.5 12C18.5 12.8833 18.2707 13.6833 17.812 14.4C17.354 15.1167 16.75 15.65 16 16Z" style="fill: var(--element-active-color)"/>
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
    'obi-03-volume-low': Obi03VolumeLow;
  }
}
