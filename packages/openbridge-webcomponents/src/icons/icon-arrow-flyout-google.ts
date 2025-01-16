import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-arrow-flyout-google')
export class ObiArrowFlyoutGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 15.0686C9.5 15.6744 9.5 15.9773 9.6198 16.1176C9.72374 16.2393 9.87967 16.3039 10.0392 16.2913C10.2231 16.2769 10.4373 16.0627 10.8657 15.6343L13.9343 12.5657C14.1323 12.3677 14.2313 12.2687 14.2684 12.1545C14.3011 12.0541 14.3011 11.9459 14.2684 11.8455C14.2313 11.7313 14.1323 11.6323 13.9343 11.4343L10.8657 8.36567C10.4373 7.9373 10.2231 7.72311 10.0392 7.70864C9.87967 7.69608 9.72374 7.76067 9.6198 7.88237C9.5 8.02264 9.5 8.32554 9.5 8.93136L9.5 15.0686Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 15.0686C9.5 15.6744 9.5 15.9773 9.6198 16.1176C9.72374 16.2393 9.87967 16.3039 10.0392 16.2913C10.2231 16.2769 10.4373 16.0627 10.8657 15.6343L13.9343 12.5657C14.1323 12.3677 14.2313 12.2687 14.2684 12.1545C14.3011 12.0541 14.3011 11.9459 14.2684 11.8455C14.2313 11.7313 14.1323 11.6323 13.9343 11.4343L10.8657 8.36567C10.4373 7.9373 10.2231 7.72311 10.0392 7.70864C9.87967 7.69608 9.72374 7.76067 9.6198 7.88237C9.5 8.02264 9.5 8.32554 9.5 8.93136L9.5 15.0686Z" style="fill: var(--element-active-color)"/>
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
    'obi-arrow-flyout-google': ObiArrowFlyoutGoogle;
  }
}
