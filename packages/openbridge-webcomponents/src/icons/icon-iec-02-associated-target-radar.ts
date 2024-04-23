import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-iec-02-associated-target-radar')
export class ObiIEC02AssociatedTargetRadar extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12ZM13.5138 15.7036C13.0468 15.8947 12.5357 16 12 16C11.4643 16 10.9532 15.8947 10.4862 15.7036L12 11.1623L13.5138 15.7036ZM14.4001 15.2002L12 8C14.2091 8 16 9.79086 16 12C16 13.3086 15.3716 14.4705 14.4001 15.2002ZM9.59992 15.2002C8.62841 14.4705 8 13.3086 8 12C8 9.79086 9.79086 8 12 8L9.59992 15.2002Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12ZM13.5138 15.7036C13.0468 15.8947 12.5357 16 12 16C11.4643 16 10.9532 15.8947 10.4862 15.7036L12 11.1623L13.5138 15.7036ZM14.4001 15.2002L12 8C14.2091 8 16 9.79086 16 12C16 13.3086 15.3716 14.4705 14.4001 15.2002ZM9.59992 15.2002C8.62841 14.4705 8 13.3086 8 12C8 9.79086 9.79086 8 12 8L9.59992 15.2002Z" style="fill: var(--element-active-color)"/>
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
    'obi-iec-02-associated-target-radar': ObiIEC02AssociatedTargetRadar;
  }
}
