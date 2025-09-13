import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-input-mouse-1')
export class ObiInputMouse1 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 10.93V8.93L19.9995 8.88764C19.9371 4.51725 16.3858 1 12 1C7.6 1 4.04 4.54 4 8.93V14.93C4 19.35 7.58 22.93 12 22.93V20.93C8.69 20.93 6 18.24 6 14.93V10.93H20ZM13 8.93H18C17.96 5.99 15.81 3.56 13 3.09V8.93ZM6 8.93H11V3.09C8.19 3.56 6.04 5.99 6 8.93Z" fill="currentColor"/>
<path d="M19.4384 22H17.7224V16.924C17.7224 16.78 17.7224 16.612 17.7224 16.42C17.7304 16.22 17.7384 16.016 17.7464 15.808C17.7544 15.6 17.7624 15.412 17.7704 15.244C17.7224 15.308 17.6304 15.4 17.4944 15.52C17.3664 15.64 17.2464 15.748 17.1344 15.844L16.1504 16.636L15.3104 15.58L18.0224 13.432H19.4384V22Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 10.93V8.93L19.9995 8.88764C19.9371 4.51725 16.3858 1 12 1C7.6 1 4.04 4.54 4 8.93V14.93C4 19.35 7.58 22.93 12 22.93V20.93C8.69 20.93 6 18.24 6 14.93V10.93H20ZM13 8.93H18C17.96 5.99 15.81 3.56 13 3.09V8.93ZM6 8.93H11V3.09C8.19 3.56 6.04 5.99 6 8.93Z" style="fill: var(--element-active-color)"/>
<path d="M19.4384 22H17.7224V16.924C17.7224 16.78 17.7224 16.612 17.7224 16.42C17.7304 16.22 17.7384 16.016 17.7464 15.808C17.7544 15.6 17.7624 15.412 17.7704 15.244C17.7224 15.308 17.6304 15.4 17.4944 15.52C17.3664 15.64 17.2464 15.748 17.1344 15.844L16.1504 16.636L15.3104 15.58L18.0224 13.432H19.4384V22Z" style="fill: var(--element-active-color)"/>
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
    'obi-input-mouse-1': ObiInputMouse1;
  }
}
