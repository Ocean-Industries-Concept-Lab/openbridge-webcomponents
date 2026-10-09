import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-ai-think')
export class ObiAiThink extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4 18C5.10457 18 6 18.8954 6 20C6 21.1046 5.10457 22 4 22C2.89543 22 2 21.1046 2 20C2 18.8954 2.89543 18 4 18Z" fill="currentColor"/>
<path d="M14 2C18.4183 2 22 5.58172 22 10C22 14.4183 18.4183 18 14 18C12.8249 18 11.7102 17.7441 10.7051 17.2891C10.2225 18.2998 9.19471 19 8 19C6.34315 19 5 17.6569 5 16C5 14.8055 5.69941 13.7766 6.70996 13.2939C6.25524 12.2892 6 11.1746 6 10C6 5.58172 9.58172 2 14 2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 18C5.10457 18 6 18.8954 6 20C6 21.1046 5.10457 22 4 22C2.89543 22 2 21.1046 2 20C2 18.8954 2.89543 18 4 18Z" style="fill: var(--element-active-color)"/>
<path d="M14 2C18.4183 2 22 5.58172 22 10C22 14.4183 18.4183 18 14 18C12.8249 18 11.7102 17.7441 10.7051 17.2891C10.2225 18.2998 9.19471 19 8 19C6.34315 19 5 17.6569 5 16C5 14.8055 5.69941 13.7766 6.70996 13.2939C6.25524 12.2892 6 11.1746 6 10C6 5.58172 9.58172 2 14 2Z" style="fill: var(--element-active-color)"/>
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
    'obi-ai-think': ObiAiThink;
  }
}
