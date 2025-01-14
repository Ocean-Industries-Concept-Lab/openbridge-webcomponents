import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-move')
export class ObiMove extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9.35986 13V11H5.85986V8.5L2.35986 12L5.85986 15.5V13H9.35986Z" fill="currentColor"/>
<path d="M11.3599 9H13.3599V5.5L15.8599 5.5L12.3599 2L8.85986 5.5L11.3599 5.5V9Z" fill="currentColor"/>
<path d="M15.3599 13V11H18.8599V8.5L22.3599 12L18.8599 15.5V13H15.3599Z" fill="currentColor"/>
<path d="M11.3599 15H13.3599V18.5H15.8599L12.3599 22L8.85986 18.5H11.3599V15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.35986 13V11H5.85986V8.5L2.35986 12L5.85986 15.5V13H9.35986Z" style="fill: var(--element-active-color)"/>
<path d="M11.3599 9H13.3599V5.5L15.8599 5.5L12.3599 2L8.85986 5.5L11.3599 5.5V9Z" style="fill: var(--element-active-color)"/>
<path d="M15.3599 13V11H18.8599V8.5L22.3599 12L18.8599 15.5V13H15.3599Z" style="fill: var(--element-active-color)"/>
<path d="M11.3599 15H13.3599V18.5H15.8599L12.3599 22L8.85986 18.5H11.3599V15Z" style="fill: var(--element-active-color)"/>
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
    'obi-move': ObiMove;
  }
}