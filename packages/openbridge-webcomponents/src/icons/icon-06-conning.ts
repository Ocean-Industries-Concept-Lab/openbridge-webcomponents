import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-06-conning')
export class Obi06Conning extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 3H4V6H6V4H8V6H11V3H13V6H16V4H18V6H20V3H22V8H2V3Z" fill="currentColor"/>
<path d="M9 12C9 12.4631 9.10498 12.9017 9.29224 13.2933L4.27173 18.3138L5.68604 19.7281L10.7065 14.7076C11.0981 14.895 11.5369 15 12 15C13.6567 15 15 13.6569 15 12C15 10.3431 13.6567 9 12 9C10.3433 9 9 10.3431 9 12Z" fill="currentColor"/>
<path d="M22 12C22 17.5228 17.5229 22 12 22C10.1699 22 8.45459 21.5084 6.979 20.65L8.08325 19.5457C9.25562 20.1555 10.5879 20.5001 12.0005 20.5001C16.6951 20.5001 20.5005 16.6946 20.5005 12H22Z" fill="currentColor"/>
<path d="M3.38208 17.0758C2.50391 15.588 2 13.8528 2 12H3.50049C3.50049 13.4355 3.85645 14.7877 4.48462 15.9734L3.38208 17.0758Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 3H4V6H6V4H8V6H11V3H13V6H16V4H18V6H20V3H22V8H2V3Z" style="fill: var(--element-active-color)"/>
<path d="M9 12C9 12.4631 9.10498 12.9017 9.29224 13.2933L4.27173 18.3138L5.68604 19.7281L10.7065 14.7076C11.0981 14.895 11.5369 15 12 15C13.6567 15 15 13.6569 15 12C15 10.3431 13.6567 9 12 9C10.3433 9 9 10.3431 9 12Z" style="fill: var(--element-active-color)"/>
<path d="M22 12C22 17.5228 17.5229 22 12 22C10.1699 22 8.45459 21.5084 6.979 20.65L8.08325 19.5457C9.25562 20.1555 10.5879 20.5001 12.0005 20.5001C16.6951 20.5001 20.5005 16.6946 20.5005 12H22Z" style="fill: var(--element-active-color)"/>
<path d="M3.38208 17.0758C2.50391 15.588 2 13.8528 2 12H3.50049C3.50049 13.4355 3.85645 14.7877 4.48462 15.9734L3.38208 17.0758Z" style="fill: var(--element-active-color)"/>
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
    'obi-06-conning': Obi06Conning;
  }
}
