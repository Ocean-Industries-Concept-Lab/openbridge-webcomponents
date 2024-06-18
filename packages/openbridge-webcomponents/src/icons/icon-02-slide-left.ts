import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-02-slide-left')
export class Obi02SlideLeft extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.4099 16.59L11.5 17.5L6 12L11.5 6.5L12.4099 7.41L7.82991 12L12.4099 16.59Z" fill="currentColor"/>
<path d="M17.9099 17.5L18.8198 16.59L14.2398 12L18.8198 7.41L17.9099 6.5L12.4099 12L17.9099 17.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.4099 16.59L11.5 17.5L6 12L11.5 6.5L12.4099 7.41L7.82991 12L12.4099 16.59Z" style="fill: var(--element-active-color)"/>
<path d="M17.9099 17.5L18.8198 16.59L14.2398 12L18.8198 7.41L17.9099 6.5L12.4099 12L17.9099 17.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-02-slide-left': Obi02SlideLeft;
  }
}
