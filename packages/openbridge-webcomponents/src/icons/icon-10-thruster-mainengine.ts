import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-10-thruster-mainengine')
export class Obi10ThrusterMainengine extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15 2H9L11 4H13L15 2Z" fill="currentColor"/>
<path d="M9 2L9 11L15 11L15 2L13 4L13 7L11 7L11 4L9 2Z" fill="currentColor"/>
<path d="M7 13H9H11L13 13H15H17V11H15L9 11H7V13Z" fill="currentColor"/>
<path d="M9 22H15L15 13H13L13 20H11L11 13H9L9 22Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 2H9L11 4H13L15 2Z" style="fill: var(--element-active-color)"/>
<path d="M9 2L9 11L15 11L15 2L13 4L13 7L11 7L11 4L9 2Z" style="fill: var(--element-active-color)"/>
<path d="M7 13H9H11L13 13H15H17V11H15L9 11H7V13Z" style="fill: var(--element-active-color)"/>
<path d="M9 22H15L15 13H13L13 20H11L11 13H9L9 22Z" style="fill: var(--element-active-color)"/>
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
    'obi-10-thruster-mainengine': Obi10ThrusterMainengine;
  }
}
