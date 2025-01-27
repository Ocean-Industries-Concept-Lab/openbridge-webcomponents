import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-heading-line-off-iec')
export class ObiHeadingLineOffIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.4448 13.1984 10.96 12.75 10.7007V8.96679L11.9998 8.38747L11.25 8.96647V10.7007C10.8016 10.96 10.5 11.4448 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" fill="currentColor"/>
<path d="M14.9999 4.80736L14.2638 4L11.9998 5.74818L9.73621 4.00019L9.00007 4.80755L11.109 6.43613L9 8.06475L9.73614 8.87212L11.9998 7.12405L14.2638 8.87231L15 8.06494L12.8907 6.43613L14.9999 4.80736Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 7.00572 6.35389 2.91155 11.25 2.52917V3.90573L11.9998 4.48474L12.75 3.90542V2.52917C17.6461 2.91155 21.5 7.00572 21.5 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.4448 13.1984 10.96 12.75 10.7007V8.96679L11.9998 8.38747L11.25 8.96647V10.7007C10.8016 10.96 10.5 11.4448 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" style="fill: var(--element-active-color)"/>
<path d="M14.9999 4.80736L14.2638 4L11.9998 5.74818L9.73621 4.00019L9.00007 4.80755L11.109 6.43613L9 8.06475L9.73614 8.87212L11.9998 7.12405L14.2638 8.87231L15 8.06494L12.8907 6.43613L14.9999 4.80736Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 7.00572 6.35389 2.91155 11.25 2.52917V3.90573L11.9998 4.48474L12.75 3.90542V2.52917C17.6461 2.91155 21.5 7.00572 21.5 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-heading-line-off-iec': ObiHeadingLineOffIec;
  }
}
