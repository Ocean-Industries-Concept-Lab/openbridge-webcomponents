import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-system')
export class Obi08System extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.87398 5C9.42994 3.27477 7.86384 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10C7.86384 10 9.42994 8.72523 9.87398 7H11L11 14.126C9.59439 14.4878 8.4878 15.5944 8.12602 17H2V19H8.12602C8.57006 20.7252 10.1362 22 12 22C13.8638 22 15.4299 20.7252 15.874 19H22V17H15.874C15.5122 15.5944 14.4056 14.4878 13 14.126L13 7H14.1261C14.5701 8.72523 16.1362 10 18.0001 10C20.2092 10 22.0001 8.20914 22.0001 6C22.0001 3.79086 20.2092 2 18.0001 2C16.1362 2 14.5701 3.27477 14.1261 5H9.87398ZM6 4C7.10457 4 8 4.89543 8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4ZM12 16C13.1046 16 14 16.8954 14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16ZM18.0001 4C19.1046 4 20.0001 4.89543 20.0001 6C20.0001 7.10457 19.1046 8 18.0001 8C16.8955 8 16.0001 7.10457 16.0001 6C16.0001 4.89543 16.8955 4 18.0001 4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.87398 5C9.42994 3.27477 7.86384 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10C7.86384 10 9.42994 8.72523 9.87398 7H11L11 14.126C9.59439 14.4878 8.4878 15.5944 8.12602 17H2V19H8.12602C8.57006 20.7252 10.1362 22 12 22C13.8638 22 15.4299 20.7252 15.874 19H22V17H15.874C15.5122 15.5944 14.4056 14.4878 13 14.126L13 7H14.1261C14.5701 8.72523 16.1362 10 18.0001 10C20.2092 10 22.0001 8.20914 22.0001 6C22.0001 3.79086 20.2092 2 18.0001 2C16.1362 2 14.5701 3.27477 14.1261 5H9.87398ZM6 4C7.10457 4 8 4.89543 8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4ZM12 16C13.1046 16 14 16.8954 14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16ZM18.0001 4C19.1046 4 20.0001 4.89543 20.0001 6C20.0001 7.10457 19.1046 8 18.0001 8C16.8955 8 16.0001 7.10457 16.0001 6C16.0001 4.89543 16.8955 4 18.0001 4Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-08-system': Obi08System;
  }
}