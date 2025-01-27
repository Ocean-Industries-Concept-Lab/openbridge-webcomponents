import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-stacked-closed')
export class ObiTwowayStackedClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 9.51479L3 5.94336V18.057L8 14.4856V9.51479Z" fill="currentColor"/>
<path d="M16 14.4856V9.51479L21 5.94336L21 18.057L16 14.4856Z" fill="currentColor"/>
<path d="M13 0H11L11 15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15L13 0Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 5.94319C2 5.12982 2.91937 4.65669 3.58124 5.12946L9 9V15L3.58124 18.8705C2.91937 19.3433 2 18.8702 2 18.0568V5.94319ZM3 5.94319L8 9.51462V14.4854L3 18.0568V5.94319Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 18.0568V5.94319C22 5.12982 21.0806 4.65669 20.4188 5.12946L15 9V15L20.4188 18.8705C21.0806 19.3433 22 18.8702 22 18.0568ZM16 14.4854V9.51462L21 5.94319L21 18.0568L16 14.4854Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 9.51479L3 5.94336V18.057L8 14.4856V9.51479Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M16 14.4856V9.51479L21 5.94336L21 18.057L16 14.4856Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M13 0H11L11 15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15L13 0Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 5.94319C2 5.12982 2.91937 4.65669 3.58124 5.12946L9 9V15L3.58124 18.8705C2.91937 19.3433 2 18.8702 2 18.0568V5.94319ZM3 5.94319L8 9.51462V14.4854L3 18.0568V5.94319Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 18.0568V5.94319C22 5.12982 21.0806 4.65669 20.4188 5.12946L15 9V15L20.4188 18.8705C21.0806 19.3433 22 18.8702 22 18.0568ZM16 14.4854V9.51462L21 5.94319L21 18.0568L16 14.4854Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-twoway-stacked-closed': ObiTwowayStackedClosed;
  }
}
