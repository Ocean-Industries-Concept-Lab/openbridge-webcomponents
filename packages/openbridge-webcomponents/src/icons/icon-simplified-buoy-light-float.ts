import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-buoy-light-float')
export class ObiSimplifiedBuoyLightFloat extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5352 7H8.46484L6.16797 10.4453L6.25002 10.5H2.13379L6.00046 16.5H18.0005L21.8671 10.5H17.75L17.8321 10.4453L15.5352 7ZM15.4648 10.5L14.4648 9H9.5352L8.5352 10.5H15.4648Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5352 7H8.46484L6.16797 10.4453L6.25002 10.5H2.13379L6.00046 16.5H18.0005L21.8671 10.5H17.75L17.8321 10.4453L15.5352 7ZM15.4648 10.5L14.4648 9H9.5352L8.5352 10.5H15.4648Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-buoy-light-float': ObiSimplifiedBuoyLightFloat;
  }
}