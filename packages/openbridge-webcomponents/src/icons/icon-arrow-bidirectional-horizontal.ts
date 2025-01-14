import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-arrow-bidirectional-horizontal')
export class ObiArrowBidirectionalHorizontal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.34987 12.8751L8.85616 17.3813L7.61872 18.6188L1 12.0001L7.61872 5.38135L8.85616 6.61878L4.34987 11.1251L19.65 11.1251L15.1437 6.61885L16.3811 5.38141L22.9999 12.0001L16.3811 18.6189L15.1437 17.3814L19.65 12.8751L4.34987 12.8751Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.34987 12.8751L8.85616 17.3813L7.61872 18.6188L1 12.0001L7.61872 5.38135L8.85616 6.61878L4.34987 11.1251L19.65 11.1251L15.1437 6.61885L16.3811 5.38141L22.9999 12.0001L16.3811 18.6189L15.1437 17.3814L19.65 12.8751L4.34987 12.8751Z" style="fill: var(--element-active-color)"/>
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
    'obi-arrow-bidirectional-horizontal': ObiArrowBidirectionalHorizontal;
  }
}