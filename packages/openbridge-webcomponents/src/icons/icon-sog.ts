import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-sog')
export class ObiSog extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9.35986 2H6.35986L10.3599 6L6.35986 10H9.35986L13.3599 6L9.35986 2Z" fill="currentColor"/>
<path d="M18.3599 6L14.3599 2H11.3599L15.3599 6L11.3599 10H14.3599L18.3599 6Z" fill="currentColor"/>
<path d="M11.3599 14V12H13.3599V14H11.3599Z" fill="currentColor"/>
<path d="M11.3599 18V16H13.3599V18H11.3599Z" fill="currentColor"/>
<path d="M2.35986 22H22.3599V20H2.35986V22Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.35986 2H6.35986L10.3599 6L6.35986 10H9.35986L13.3599 6L9.35986 2Z" style="fill: var(--element-active-color)"/>
<path d="M18.3599 6L14.3599 2H11.3599L15.3599 6L11.3599 10H14.3599L18.3599 6Z" style="fill: var(--element-active-color)"/>
<path d="M11.3599 14V12H13.3599V14H11.3599Z" style="fill: var(--element-active-color)"/>
<path d="M11.3599 18V16H13.3599V18H11.3599Z" style="fill: var(--element-active-color)"/>
<path d="M2.35986 22H22.3599V20H2.35986V22Z" style="fill: var(--element-active-color)"/>
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
    'obi-sog': ObiSog;
  }
}