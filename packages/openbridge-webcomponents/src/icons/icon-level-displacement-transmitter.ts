import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-level-displacement-transmitter')
export class ObiLevelDisplacementTransmitter extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17.707 7.70703L16.293 9.12109L13 5.82812V18.1719L16.293 14.8789L17.707 16.293L12 22L6.29297 16.293L7.70703 14.8789L11 18.1719V5.82812L7.70703 9.12109L6.29297 7.70703L12 2L17.707 7.70703Z" fill="currentColor"/>
<path d="M5 13H3V11H5V13Z" fill="currentColor"/>
<path d="M9 13H7V11H9V13Z" fill="currentColor"/>
<path d="M17 13H15V11H17V13Z" fill="currentColor"/>
<path d="M21 13H19V11H21V13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.707 7.70703L16.293 9.12109L13 5.82812V18.1719L16.293 14.8789L17.707 16.293L12 22L6.29297 16.293L7.70703 14.8789L11 18.1719V5.82812L7.70703 9.12109L6.29297 7.70703L12 2L17.707 7.70703Z" style="fill: var(--element-active-color)"/>
<path d="M5 13H3V11H5V13Z" style="fill: var(--element-active-color)"/>
<path d="M9 13H7V11H9V13Z" style="fill: var(--element-active-color)"/>
<path d="M17 13H15V11H17V13Z" style="fill: var(--element-active-color)"/>
<path d="M21 13H19V11H21V13Z" style="fill: var(--element-active-color)"/>
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
    'obi-level-displacement-transmitter': ObiLevelDisplacementTransmitter;
  }
}
