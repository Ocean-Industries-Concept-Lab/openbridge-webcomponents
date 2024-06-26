import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-02-slide-right')
export class Obi02SlideRight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.4099 7.41L13.3198 6.5L18.8198 12L13.3198 17.5L12.4099 16.59L16.9899 12L12.4099 7.41Z" fill="currentColor"/>
<path d="M6.90991 6.5L6 7.41L10.58 12L6 16.59L6.90991 17.5L12.4099 12L6.90991 6.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.4099 7.41L13.3198 6.5L18.8198 12L13.3198 17.5L12.4099 16.59L16.9899 12L12.4099 7.41Z" style="fill: var(--element-active-color)"/>
<path d="M6.90991 6.5L6 7.41L10.58 12L6 16.59L6.90991 17.5L12.4099 12L6.90991 6.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-02-slide-right': Obi02SlideRight;
  }
}
