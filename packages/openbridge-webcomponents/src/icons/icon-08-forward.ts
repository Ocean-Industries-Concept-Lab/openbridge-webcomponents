import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-forward')
export class Obi08Forward extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M21 11.9998L7.5 19.794L7.5 4.20557L21 11.9998Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 11.9998L7.5 4.20557L7.5 19.794L21 11.9998ZM19 11.9998L8.5 5.93762L8.5 18.062L19 11.9998Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 11.9998L7.5 19.794L7.5 4.20557L21 11.9998Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 11.9998L7.5 4.20557L7.5 19.794L21 11.9998ZM19 11.9998L8.5 5.93762L8.5 18.062L19 11.9998Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-08-forward': Obi08Forward;
  }
}
