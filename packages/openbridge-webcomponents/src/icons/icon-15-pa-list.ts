import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-15-pa-list')
export class Obi15PaList extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 12.9917V10.9933V11V12.9983V12.9917Z" fill="currentColor"/>
<path d="M2.0198 8.99833V7H18.5L15 9L2.0198 8.99833Z" fill="currentColor"/>
<path d="M2 12.9983V11H9V13L2 12.9983Z" fill="currentColor"/>
<path d="M2 4.99833V3H19.8218V4.99833H2Z" fill="currentColor"/>
<path d="M15.4901 16.75H16.2401L19.9901 19V8.5L16.2401 10.75H12.4901C11.6617 10.75 10.9901 11.4216 10.9901 12.25V15.25C10.9901 16.0784 11.6617 16.75 12.4901 16.75H13.2401V19.75H15.4901V16.75Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 12.9917V10.9933V11V12.9983V12.9917Z" style="fill: var(--element-active-color)"/>
<path d="M2.0198 8.99833V7H18.5L15 9L2.0198 8.99833Z" style="fill: var(--element-active-color)"/>
<path d="M2 12.9983V11H9V13L2 12.9983Z" style="fill: var(--element-active-color)"/>
<path d="M2 4.99833V3H19.8218V4.99833H2Z" style="fill: var(--element-active-color)"/>
<path d="M15.4901 16.75H16.2401L19.9901 19V8.5L16.2401 10.75H12.4901C11.6617 10.75 10.9901 11.4216 10.9901 12.25V15.25C10.9901 16.0784 11.6617 16.75 12.4901 16.75H13.2401V19.75H15.4901V16.75Z" style="fill: var(--element-active-color)"/>
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
    'obi-15-pa-list': Obi15PaList;
  }
}
