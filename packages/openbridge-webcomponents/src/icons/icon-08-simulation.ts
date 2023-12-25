import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-simulation')
export class Obi08Simulation extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.9638 2.53028C12.3637 2.20019 11.6363 2.20019 11.0362 2.53028L7.03616 4.73028C6.39707 5.08179 6 5.75333 6 6.48271V10.8002C6 11.5296 6.39707 12.2011 7.03616 12.5526L11.0362 14.7526C11.6363 15.0827 12.3637 15.0827 12.9638 14.7526L16.9638 12.5526C17.6029 12.2011 18 11.5296 18 10.8002V6.48272C18 5.75333 17.6029 5.08179 16.9638 4.73028L12.9638 2.53028ZM11 9.23271L8 7.58271V10.8002L11 12.4502V9.23271ZM16 10.8002L13 12.4502V9.23271L16 7.58271V10.8002ZM14.925 5.89144L12 7.50017L9.07504 5.89144L12 4.28271L14.925 5.89144Z" fill="currentColor"/>
<path d="M2 8.00017C2 6.90017 2.9 6.00017 4 6.00017V16.0002H20V6.00017C21.1 6.00017 22 6.90017 22 8.00017V16.0002C22 17.1002 21.1 18.0002 20 18.0002H14V20.0002H16V22.0002H8V20.0002H10V18.0002H4C2.9 18.0002 2 17.1002 2 16.0002V8.00017Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.9638 2.53028C12.3637 2.20019 11.6363 2.20019 11.0362 2.53028L7.03616 4.73028C6.39707 5.08179 6 5.75333 6 6.48271V10.8002C6 11.5296 6.39707 12.2011 7.03616 12.5526L11.0362 14.7526C11.6363 15.0827 12.3637 15.0827 12.9638 14.7526L16.9638 12.5526C17.6029 12.2011 18 11.5296 18 10.8002V6.48272C18 5.75333 17.6029 5.08179 16.9638 4.73028L12.9638 2.53028ZM11 9.23271L8 7.58271V10.8002L11 12.4502V9.23271ZM16 10.8002L13 12.4502V9.23271L16 7.58271V10.8002ZM14.925 5.89144L12 7.50017L9.07504 5.89144L12 4.28271L14.925 5.89144Z" style="fill: var(--element-active-color)"/>
<path d="M2 8.00017C2 6.90017 2.9 6.00017 4 6.00017V16.0002H20V6.00017C21.1 6.00017 22 6.90017 22 8.00017V16.0002C22 17.1002 21.1 18.0002 20 18.0002H14V20.0002H16V22.0002H8V20.0002H10V18.0002H4C2.9 18.0002 2 17.1002 2 16.0002V8.00017Z" style="fill: var(--element-active-color)"/>
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
    'obi-08-simulation': Obi08Simulation;
  }
}
