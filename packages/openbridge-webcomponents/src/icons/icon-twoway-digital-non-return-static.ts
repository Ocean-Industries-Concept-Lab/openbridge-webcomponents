import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-twoway-digital-non-return-static')
export class ObiTwowayDigitalNonReturnStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.375 5.29979C21.0298 4.77598 22 5.24253 22 6.08104V17.9199C21.9997 18.7582 21.0297 19.2239 20.375 18.7002L12 12L20.375 5.29979Z" stroke="currentColor"/>
<path d="M2 6.08128C2 5.24278 2.97024 4.77622 3.625 5.30003L9.92387 10.3388C10.1027 10.4818 10.3251 10.5591 10.5541 10.5578L19.9912 10.5057C20.5435 10.5027 20.9937 10.9479 20.9967 11.5002L21.0023 12.5002C21.0053 13.0525 20.5601 13.5027 20.0078 13.5058L10.3956 13.5589C10.1704 13.5601 9.95218 13.6373 9.77633 13.7781L3.625 18.7004C2.97024 19.2242 2 18.7577 2 17.9192V6.08128Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.375 5.29979C21.0298 4.77598 22 5.24253 22 6.08104V17.9199C21.9997 18.7582 21.0297 19.2239 20.375 18.7002L12 12L20.375 5.29979Z" style="stroke: var(--automation-symbol-static-background-color)"/>
<path d="M2 6.08128C2 5.24278 2.97024 4.77622 3.625 5.30003L9.92387 10.3388C10.1027 10.4818 10.3251 10.5591 10.5541 10.5578L19.9912 10.5057C20.5435 10.5027 20.9937 10.9479 20.9967 11.5002L21.0023 12.5002C21.0053 13.0525 20.5601 13.5027 20.0078 13.5058L10.3956 13.5589C10.1704 13.5601 9.95218 13.6373 9.77633 13.7781L3.625 18.7004C2.97024 19.2242 2 18.7577 2 17.9192V6.08128Z" style="fill: var(--automation-symbol-static-background-color); stroke: var(--automation-symbol-static-border-color)"/>
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
    'obi-twoway-digital-non-return-static': ObiTwowayDigitalNonReturnStatic;
  }
}
