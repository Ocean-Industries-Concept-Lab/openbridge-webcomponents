import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-type-smallcraft-filled')
export class ObiVesselTypeSmallcraftFilled extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0002 3.47152L11.7555 3.79196C10.304 5.69278 9.54488 8.03219 9.60377 10.4231L9.82737 19.5H14.1731L14.3967 10.4231C14.4556 8.03218 13.6965 5.69278 12.2449 3.79196L12.0002 3.47152ZM10.5634 2.88159C8.90448 5.05396 8.03692 7.72756 8.10423 10.4601L8.36386 21H15.6366L15.8962 10.4601C15.9635 7.72756 15.096 5.05396 13.4371 2.88159L12.0002 1L10.5634 2.88159Z" fill="currentColor"/>
<path d="M11.7555 3.79196L12.0002 3.47152L12.2449 3.79196C13.6965 5.69278 14.4556 8.03218 14.3967 10.4231L14.1731 19.5H9.82737L9.60377 10.4231C9.54488 8.03219 10.304 5.69278 11.7555 3.79196Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0002 3.47152L11.7555 3.79196C10.304 5.69278 9.54488 8.03219 9.60377 10.4231L9.82737 19.5H14.1731L14.3967 10.4231C14.4556 8.03218 13.6965 5.69278 12.2449 3.79196L12.0002 3.47152ZM10.5634 2.88159C8.90448 5.05396 8.03692 7.72756 8.10423 10.4601L8.36386 21H15.6366L15.8962 10.4601C15.9635 7.72756 15.096 5.05396 13.4371 2.88159L12.0002 1L10.5634 2.88159Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0002 3.47152L11.7555 3.79196C10.304 5.69278 9.54488 8.03219 9.60377 10.4231L9.82737 19.5H14.1731L14.3967 10.4231C14.4556 8.03218 13.6965 5.69278 12.2449 3.79196L12.0002 3.47152ZM10.5634 2.88159C8.90448 5.05396 8.03692 7.72756 8.10423 10.4601L8.36386 21H15.6366L15.8962 10.4601C15.9635 7.72756 15.096 5.05396 13.4371 2.88159L12.0002 1L10.5634 2.88159Z" style="fill: var(--element-active-inverted-color)"/>
<path d="M11.7555 3.79196L12.0002 3.47152L12.2449 3.79196C13.6965 5.69278 14.4556 8.03218 14.3967 10.4231L14.1731 19.5H9.82737L9.60377 10.4231C9.54488 8.03219 10.304 5.69278 11.7555 3.79196Z" style="fill: var(--element-active-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0002 3.47152L11.7555 3.79196C10.304 5.69278 9.54488 8.03219 9.60377 10.4231L9.82737 19.5H14.1731L14.3967 10.4231C14.4556 8.03218 13.6965 5.69278 12.2449 3.79196L12.0002 3.47152ZM10.5634 2.88159C8.90448 5.05396 8.03692 7.72756 8.10423 10.4601L8.36386 21H15.6366L15.8962 10.4601C15.9635 7.72756 15.096 5.05396 13.4371 2.88159L12.0002 1L10.5634 2.88159Z" style="fill: var(--element-active-color)"/>
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
    'obi-vessel-type-smallcraft-filled': ObiVesselTypeSmallcraftFilled;
  }
}
