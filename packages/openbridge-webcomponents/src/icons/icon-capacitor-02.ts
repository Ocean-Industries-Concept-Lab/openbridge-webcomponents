import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-capacitor-02')
export class ObiCapacitor02 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2.75 1V2.75L1 2.75V4.25H2.75V6H4.25V4.25H6V2.75L4.25 2.75V1H2.75Z" fill="currentColor"/>
<path d="M9.5 4C10.3284 4 11 4.67157 11 5.5L11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5V5.5C8 4.67157 8.67157 4 9.5 4Z" fill="currentColor"/>
<path d="M14.5 4C15.3284 4 16 4.67157 16 5.5V18.5C16 19.3284 15.3284 20 14.5 20C13.6716 20 13 19.3284 13 18.5V5.5C13 4.67157 13.6716 4 14.5 4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.75 1V2.75L1 2.75V4.25H2.75V6H4.25V4.25H6V2.75L4.25 2.75V1H2.75Z" style="fill: var(--element-neutral-color)"/>
<path d="M9.5 4C10.3284 4 11 4.67157 11 5.5L11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5V5.5C8 4.67157 8.67157 4 9.5 4Z" style="fill: var(--element-neutral-color)"/>
<path d="M14.5 4C15.3284 4 16 4.67157 16 5.5V18.5C16 19.3284 15.3284 20 14.5 20C13.6716 20 13 19.3284 13 18.5V5.5C13 4.67157 13.6716 4 14.5 4Z" style="fill: var(--element-neutral-color)"/>
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
    'obi-capacitor-02': ObiCapacitor02;
  }
}
