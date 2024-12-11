import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-stabilisation-indicator-water-iec')
export class ObiStabilisationIndicatorWaterIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9999 17.9999L13.9999 21.9999H15.9999L11.9999 13.9999L7.99996 21.9999H9.99995L11.9999 17.9999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9999 17.9999L13.9999 21.9999H15.9999L11.9999 13.9999L7.99996 21.9999H9.99995L11.9999 17.9999Z" fill="currentColor"/>
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
    'obi-stabilisation-indicator-water-iec': ObiStabilisationIndicatorWaterIec;
  }
}