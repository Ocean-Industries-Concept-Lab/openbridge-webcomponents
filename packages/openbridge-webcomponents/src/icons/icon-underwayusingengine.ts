import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-underwayusingengine')
export class ObiUnderwayusingengine extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.3599 9C21.9121 9 22.3599 9.44772 22.3599 10V18C22.3599 18.5523 21.9121 19 21.3599 19H20.3599V16.5H17.3598L17.3599 19H7.85982L4.85982 13.5H3.85986L3.85982 16.5H2.35986V8.5H3.85982L3.85977 11.5H4.85977L7.85982 7H10.3598V5.5H7.35982V4H15.3598V5.5H12.3598V7H15.8596L17.3598 11.5H20.3599V9H21.3599Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.3599 9C21.9121 9 22.3599 9.44772 22.3599 10V18C22.3599 18.5523 21.9121 19 21.3599 19H20.3599V16.5H17.3598L17.3599 19H7.85982L4.85982 13.5H3.85986L3.85982 16.5H2.35986V8.5H3.85982L3.85977 11.5H4.85977L7.85982 7H10.3598V5.5H7.35982V4H15.3598V5.5H12.3598V7H15.8596L17.3598 11.5H20.3599V9H21.3599Z" style="fill: var(--element-active-color)"/>
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
    'obi-underwayusingengine': ObiUnderwayusingengine;
  }
}
