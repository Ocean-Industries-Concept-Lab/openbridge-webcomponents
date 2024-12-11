import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-hdg')
export class ObiHdg extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8932 2.31064C12.0617 1.89645 12.658 1.89645 12.8266 2.31064L20.2842 20.6401C20.6433 21.5228 19.6517 22.3463 18.8266 21.8505L12.3599 18L5.89313 21.8505C5.068 22.3463 4.07638 21.5228 4.43551 20.6401L11.8932 2.31064Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8932 2.31064C12.0617 1.89645 12.658 1.89645 12.8266 2.31064L20.2842 20.6401C20.6433 21.5228 19.6517 22.3463 18.8266 21.8505L12.3599 18L5.89313 21.8505C5.068 22.3463 4.07638 21.5228 4.43551 20.6401L11.8932 2.31064Z" style="fill: var(--element-active-color)"/>
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
    'obi-hdg': ObiHdg;
  }
}