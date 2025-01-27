import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-sar-aircraft-fixedwing-iec')
export class ObiAisSarAircraftFixedwingIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 9V5L12 2L10 5V9L2 15H10V19L7 22H17L14 19V15H22L14 9ZM19 14L13 9.5V5.30278L12 3.80278L11 5.30278V9.5L5 14H11V19.4142L9.41421 21H14.5858L13 19.4142V14H19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 9V5L12 2L10 5V9L2 15H10V19L7 22H17L14 19V15H22L14 9ZM19 14L13 9.5V5.30278L12 3.80278L11 5.30278V9.5L5 14H11V19.4142L9.41421 21H14.5858L13 19.4142V14H19Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-sar-aircraft-fixedwing-iec': ObiAisSarAircraftFixedwingIec;
  }
}
