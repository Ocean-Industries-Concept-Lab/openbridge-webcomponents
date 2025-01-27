import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-stabilisation-indicator-ground-iec')
export class ObiStabilisationIndicatorGroundIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16 16H14L12 12L10 16H8L12 8L16 16Z" fill="currentColor"/>
<path d="M14 22L12 18L10 22H8L12 14L16 22H14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 16H14L12 12L10 16H8L12 8L16 16Z" style="fill: var(--element-active-color)"/>
<path d="M14 22L12 18L10 22H8L12 14L16 22H14Z" style="fill: var(--element-active-color)"/>
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
    'obi-stabilisation-indicator-ground-iec': ObiStabilisationIndicatorGroundIec;
  }
}
