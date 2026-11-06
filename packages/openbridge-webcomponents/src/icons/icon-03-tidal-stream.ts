import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-03-tidal-stream')
export class Obi03TidalStream extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6 22L12 15L18 22M6 15L12 8L18 15M6 8L12 1L18 8" stroke="currentColor"/>
<path d="M12 24V23.0417M12 1V1.95833M12 5.79167V7.70833M12 11.5417V13.4583M12 17.2917V19.2083" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 22L12 15L18 22M6 15L12 8L18 15M6 8L12 1L18 8" style="stroke: var(--element-active-color)"/>
<path d="M12 24V23.0417M12 1V1.95833M12 5.79167V7.70833M12 11.5417V13.4583M12 17.2917V19.2083" style="stroke: var(--element-active-color)"/>
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
    'obi-03-tidal-stream': Obi03TidalStream;
  }
}
