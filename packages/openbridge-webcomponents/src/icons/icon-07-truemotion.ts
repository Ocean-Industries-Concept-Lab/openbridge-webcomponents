import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-truemotion')
export class Obi07Truemotion extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.74805 17H5.93164V9.94531H3.60547V8.43359H10.0742V9.94531H7.74805V17Z" fill="currentColor"/>
<path d="M15.0195 17L12.957 10.2793H12.9043C12.9785 11.6465 13.0156 12.5586 13.0156 13.0156V17H11.3926V8.43359H13.8652L15.8926 14.9844H15.9277L18.0781 8.43359H20.5508V17H18.8574V12.9453C18.8574 12.7539 18.8594 12.5332 18.8633 12.2832C18.8711 12.0332 18.8984 11.3691 18.9453 10.291H18.8926L16.6836 17H15.0195Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.74805 17H5.93164V9.94531H3.60547V8.43359H10.0742V9.94531H7.74805V17Z" style="fill: var(--element-active-color)"/>
<path d="M15.0195 17L12.957 10.2793H12.9043C12.9785 11.6465 13.0156 12.5586 13.0156 13.0156V17H11.3926V8.43359H13.8652L15.8926 14.9844H15.9277L18.0781 8.43359H20.5508V17H18.8574V12.9453C18.8574 12.7539 18.8594 12.5332 18.8633 12.2832C18.8711 12.0332 18.8984 11.3691 18.9453 10.291H18.8926L16.6836 17H15.0195Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-truemotion': Obi07Truemotion;
  }
}
