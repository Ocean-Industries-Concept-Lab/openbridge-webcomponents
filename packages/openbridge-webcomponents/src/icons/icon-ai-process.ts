import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-ai-process')
export class ObiAiProcess extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 16C13.1046 16 14 16.8954 14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16Z" fill="currentColor"/>
<path d="M6 6C7.10457 6 8 6.89543 8 8C8 9.10457 7.10457 10 6 10C4.89543 10 4 9.10457 4 8C4 6.89543 4.89543 6 6 6Z" fill="currentColor"/>
<path d="M18 6C19.1046 6 20 6.89543 20 8C20 9.10457 19.1046 10 18 10C16.8954 10 16 9.10457 16 8C16 6.89543 16.8954 6 18 6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 16C13.1046 16 14 16.8954 14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16Z" style="fill: var(--element-active-color)"/>
<path d="M6 6C7.10457 6 8 6.89543 8 8C8 9.10457 7.10457 10 6 10C4.89543 10 4 9.10457 4 8C4 6.89543 4.89543 6 6 6Z" style="fill: var(--element-active-color)"/>
<path d="M18 6C19.1046 6 20 6.89543 20 8C20 9.10457 19.1046 10 18 10C16.8954 10 16 9.10457 16 8C16 6.89543 16.8954 6 18 6Z" style="fill: var(--element-active-color)"/>
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
    'obi-ai-process': ObiAiProcess;
  }
}
