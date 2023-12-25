import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-pls')
export class Obi08PLS extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.2 12C15.2 11.0059 16.0059 10.2 17 10.2C17.9941 10.2 18.8 11.0059 18.8 12C18.8 12.9941 17.9941 13.8 17 13.8C16.0059 13.8 15.2 12.9941 15.2 12Z" fill="currentColor"/>
<path d="M7.5 10.2C6.83726 10.2 6.3 10.7373 6.3 11.4V12.6C6.3 13.2627 6.83726 13.8 7.5 13.8H13.2C13.8627 13.8 14.4 13.2627 14.4 12.6V11.4C14.4 10.7373 13.8627 10.2 13.2 10.2H7.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.8 3.3C13.8 4.08373 13.2991 4.75047 12.6 4.99758V7H17.7V4.99758C17.0009 4.75047 16.5 4.08373 16.5 3.3C16.5 2.30589 17.3059 1.5 18.3 1.5C19.2941 1.5 20.1 2.30589 20.1 3.3C20.1 4.08373 19.5991 4.75047 18.9 4.99758V7H21.3C21.9627 7 22.5 7.5373 22.5 8.2V15.8C22.5 16.4627 21.9627 17 21.3 17H18.9V19.0024C19.5991 19.2495 20.1 19.9163 20.1 20.7C20.1 21.6941 19.2941 22.5 18.3 22.5C17.3059 22.5 16.5 21.6941 16.5 20.7C16.5 19.9163 17.0009 19.2495 17.7 19.0024V17H12.6V19.0024C13.2991 19.2495 13.8 19.9163 13.8 20.7C13.8 21.6941 12.9941 22.5 12 22.5C11.0059 22.5 10.2 21.6941 10.2 20.7C10.2 19.9163 10.7009 19.2495 11.4 19.0024V17H6.3V19.0024C6.99912 19.2495 7.5 19.9163 7.5 20.7C7.5 21.6941 6.69411 22.5 5.7 22.5C4.70589 22.5 3.9 21.6941 3.9 20.7C3.9 19.9163 4.40088 19.2495 5.1 19.0024V17H2.7C2.0373 17 1.5 16.4627 1.5 15.8V8.2C1.5 7.5373 2.0373 7 2.7 7H5.1V4.99758C4.40088 4.75047 3.9 4.08373 3.9 3.3C3.9 2.30589 4.70589 1.5 5.7 1.5C6.69411 1.5 7.5 2.30589 7.5 3.3C7.5 4.08373 6.99911 4.75047 6.3 4.99758V7H11.4V4.99758C10.7009 4.75047 10.2 4.08373 10.2 3.3C10.2 2.30589 11.0059 1.5 12 1.5C12.9941 1.5 13.8 2.30589 13.8 3.3ZM3.4 15.1H20.6V8.9H3.4V15.1Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.2 12C15.2 11.0059 16.0059 10.2 17 10.2C17.9941 10.2 18.8 11.0059 18.8 12C18.8 12.9941 17.9941 13.8 17 13.8C16.0059 13.8 15.2 12.9941 15.2 12Z" style="fill: var(--element-active-color)"/>
<path d="M7.5 10.2C6.83726 10.2 6.3 10.7373 6.3 11.4V12.6C6.3 13.2627 6.83726 13.8 7.5 13.8H13.2C13.8627 13.8 14.4 13.2627 14.4 12.6V11.4C14.4 10.7373 13.8627 10.2 13.2 10.2H7.5Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.8 3.3C13.8 4.08373 13.2991 4.75047 12.6 4.99758V7H17.7V4.99758C17.0009 4.75047 16.5 4.08373 16.5 3.3C16.5 2.30589 17.3059 1.5 18.3 1.5C19.2941 1.5 20.1 2.30589 20.1 3.3C20.1 4.08373 19.5991 4.75047 18.9 4.99758V7H21.3C21.9627 7 22.5 7.5373 22.5 8.2V15.8C22.5 16.4627 21.9627 17 21.3 17H18.9V19.0024C19.5991 19.2495 20.1 19.9163 20.1 20.7C20.1 21.6941 19.2941 22.5 18.3 22.5C17.3059 22.5 16.5 21.6941 16.5 20.7C16.5 19.9163 17.0009 19.2495 17.7 19.0024V17H12.6V19.0024C13.2991 19.2495 13.8 19.9163 13.8 20.7C13.8 21.6941 12.9941 22.5 12 22.5C11.0059 22.5 10.2 21.6941 10.2 20.7C10.2 19.9163 10.7009 19.2495 11.4 19.0024V17H6.3V19.0024C6.99912 19.2495 7.5 19.9163 7.5 20.7C7.5 21.6941 6.69411 22.5 5.7 22.5C4.70589 22.5 3.9 21.6941 3.9 20.7C3.9 19.9163 4.40088 19.2495 5.1 19.0024V17H2.7C2.0373 17 1.5 16.4627 1.5 15.8V8.2C1.5 7.5373 2.0373 7 2.7 7H5.1V4.99758C4.40088 4.75047 3.9 4.08373 3.9 3.3C3.9 2.30589 4.70589 1.5 5.7 1.5C6.69411 1.5 7.5 2.30589 7.5 3.3C7.5 4.08373 6.99911 4.75047 6.3 4.99758V7H11.4V4.99758C10.7009 4.75047 10.2 4.08373 10.2 3.3C10.2 2.30589 11.0059 1.5 12 1.5C12.9941 1.5 13.8 2.30589 13.8 3.3ZM3.4 15.1H20.6V8.9H3.4V15.1Z" style="fill: var(--element-active-color)"/>
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
    'obi-08-pls': Obi08PLS;
  }
}
