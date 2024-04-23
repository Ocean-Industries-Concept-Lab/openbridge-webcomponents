import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-20-usb')
export class Obi20USB extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18.1868 4.85592L17.4796 4.14882L16.7725 4.85592L17.4796 5.56303L18.1868 4.85592Z" fill="currentColor"/>
<path d="M18.8939 5.56303L19.601 6.27014L18.8939 6.97724L18.1868 6.27014L18.8939 5.56303Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.2977 3.79526L17.4796 0.613281L23.1365 6.27014L19.9545 9.45212L21.0152 10.5128L11.1157 20.4123C9.16307 22.3649 5.99724 22.3649 4.04462 20.4123L3.33751 19.7052C1.38489 17.7525 1.38489 14.5867 3.33751 12.6341L13.237 2.7346L14.2977 3.79526ZM17.4796 2.7346L21.0152 6.27014L18.8939 8.39146L15.3583 4.85592L17.4796 2.7346ZM18.1868 10.5128L13.237 5.56303L4.75173 14.0483C3.58015 15.2199 3.58015 17.1194 4.75173 18.291L5.45883 18.9981C6.63041 20.1696 8.5299 20.1696 9.70147 18.9981L18.1868 10.5128Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.1868 4.85592L17.4796 4.14882L16.7725 4.85592L17.4796 5.56303L18.1868 4.85592Z" style="fill: var(--element-active-color)"/>
<path d="M18.8939 5.56303L19.601 6.27014L18.8939 6.97724L18.1868 6.27014L18.8939 5.56303Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.2977 3.79526L17.4796 0.613281L23.1365 6.27014L19.9545 9.45212L21.0152 10.5128L11.1157 20.4123C9.16307 22.3649 5.99724 22.3649 4.04462 20.4123L3.33751 19.7052C1.38489 17.7525 1.38489 14.5867 3.33751 12.6341L13.237 2.7346L14.2977 3.79526ZM17.4796 2.7346L21.0152 6.27014L18.8939 8.39146L15.3583 4.85592L17.4796 2.7346ZM18.1868 10.5128L13.237 5.56303L4.75173 14.0483C3.58015 15.2199 3.58015 17.1194 4.75173 18.291L5.45883 18.9981C6.63041 20.1696 8.5299 20.1696 9.70147 18.9981L18.1868 10.5128Z" style="fill: var(--element-active-color)"/>
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
    'obi-20-usb': Obi20USB;
  }
}
