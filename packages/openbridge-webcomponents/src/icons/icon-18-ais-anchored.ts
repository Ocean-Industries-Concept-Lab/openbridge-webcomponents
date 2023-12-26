import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-18-ais-anchored')
export class Obi18AisAnchored extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<rect x="6.5" y="6.5" width="11" height="11" rx="5.5" fill="currentColor"/>
<rect x="6.5" y="6.5" width="11" height="11" rx="5.5" stroke="black"/>
<path d="M14.5 12C14.5 12.3283 14.4353 12.6534 14.3097 12.9567C14.1841 13.26 13.9999 13.5356 13.7678 13.7678C13.5356 13.9999 13.26 14.1841 12.9567 14.3097C12.6534 14.4353 12.3283 14.5 12 14.5C11.6717 14.5 11.3466 14.4353 11.0433 14.3097C10.74 14.1841 10.4644 13.9999 10.2322 13.7678C10.0001 13.5356 9.81594 13.26 9.6903 12.9567C9.56466 12.6534 9.5 12.3283 9.5 12" stroke="black"/>
<path d="M12 14L12 8" stroke="black"/>
<path d="M10 10L14 10" stroke="black"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="6.5" y="6.5" width="11" height="11" rx="5.5" fill="none"/>
<rect x="6.5" y="6.5" width="11" height="11" rx="5.5" stroke="black"/>
<path d="M14.5 12C14.5 12.3283 14.4353 12.6534 14.3097 12.9567C14.1841 13.26 13.9999 13.5356 13.7678 13.7678C13.5356 13.9999 13.26 14.1841 12.9567 14.3097C12.6534 14.4353 12.3283 14.5 12 14.5C11.6717 14.5 11.3466 14.4353 11.0433 14.3097C10.74 14.1841 10.4644 13.9999 10.2322 13.7678C10.0001 13.5356 9.81594 13.26 9.6903 12.9567C9.56466 12.6534 9.5 12.3283 9.5 12" stroke="black"/>
<path d="M12 14L12 8" stroke="black"/>
<path d="M10 10L14 10" stroke="black"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-18-ais-anchored': Obi18AisAnchored;
  }
}
