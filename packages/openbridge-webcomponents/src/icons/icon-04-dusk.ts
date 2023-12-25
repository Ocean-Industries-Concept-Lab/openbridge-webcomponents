import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-04-dusk')
export class Obi04Dusk extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.76 7.29001L4.96 5.50001L3.55 6.91001L5.34 8.70001L6.76 7.29001Z" fill="currentColor"/>
<path d="M13 3H11V5.95H13V3Z" fill="currentColor"/>
<path d="M20.45 6.91001L19.04 5.50001L17.25 7.29001L18.66 8.70001L20.45 6.91001Z" fill="currentColor"/>
<path d="M1 16V14H23V16H1Z" fill="currentColor"/>
<path d="M12 7.99999C9.39103 7.99999 7.16725 9.67122 6.34232 12H17.6577C16.8327 9.67122 14.609 7.99999 12 7.99999Z" fill="currentColor"/>
<path d="M8 18H16V20H8V18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.76 7.29001L4.96 5.50001L3.55 6.91001L5.34 8.70001L6.76 7.29001Z" style="fill: var(--element-active-color)"/>
<path d="M13 3H11V5.95H13V3Z" style="fill: var(--element-active-color)"/>
<path d="M20.45 6.91001L19.04 5.50001L17.25 7.29001L18.66 8.70001L20.45 6.91001Z" style="fill: var(--element-active-color)"/>
<path d="M1 16V14H23V16H1Z" style="fill: var(--element-active-color)"/>
<path d="M12 7.99999C9.39103 7.99999 7.16725 9.67122 6.34232 12H17.6577C16.8327 9.67122 14.609 7.99999 12 7.99999Z" style="fill: var(--element-active-color)"/>
<path d="M8 18H16V20H8V18Z" style="fill: var(--element-active-color)"/>
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
    'obi-04-dusk': Obi04Dusk;
  }
}
