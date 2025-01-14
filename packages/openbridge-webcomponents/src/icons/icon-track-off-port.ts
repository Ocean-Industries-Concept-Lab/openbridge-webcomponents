import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-track-off-port')
export class ObiTrackOffPort extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.9207 4.00749C9.98025 4.06595 9.05893 4.45502 8.34237 5.17159L4.18829 9.32566L5.6025 10.7399L9.75658 6.5858C10.4731 5.86924 10.8622 4.94792 10.9207 4.00749ZM12.7245 2.20364C10.7228 1.66909 8.49853 2.187 6.92816 3.75737L1.35986 9.32566L5.6025 13.5683L11.1708 8.00001C12.7412 6.42964 13.2591 4.20534 12.7245 2.20364Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4571 8.95719L14.9571 10.4572L13.5429 9.04298L15.0429 7.54298L16.4571 8.95719ZM19.4572 5.95719L17.9572 7.45719L16.5429 6.04298L18.0429 4.54297L19.4572 5.95719ZM22.4572 2.95718L20.9572 4.45718L19.5429 3.04297L21.0429 1.54297L22.4572 2.95718Z" fill="currentColor"/>
<path d="M1.54291 21.043L2.95712 22.4572L13.4571 11.9572L12.0429 10.543L1.54291 21.043Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.9207 4.00749C9.98025 4.06595 9.05893 4.45502 8.34237 5.17159L4.18829 9.32566L5.6025 10.7399L9.75658 6.5858C10.4731 5.86924 10.8622 4.94792 10.9207 4.00749ZM12.7245 2.20364C10.7228 1.66909 8.49853 2.187 6.92816 3.75737L1.35986 9.32566L5.6025 13.5683L11.1708 8.00001C12.7412 6.42964 13.2591 4.20534 12.7245 2.20364Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4571 8.95719L14.9571 10.4572L13.5429 9.04298L15.0429 7.54298L16.4571 8.95719ZM19.4572 5.95719L17.9572 7.45719L16.5429 6.04298L18.0429 4.54297L19.4572 5.95719ZM22.4572 2.95718L20.9572 4.45718L19.5429 3.04297L21.0429 1.54297L22.4572 2.95718Z" style="fill: var(--element-active-color)"/>
<path d="M1.54291 21.043L2.95712 22.4572L13.4571 11.9572L12.0429 10.543L1.54291 21.043Z" style="fill: var(--element-active-color)"/>
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
    'obi-track-off-port': ObiTrackOffPort;
  }
}