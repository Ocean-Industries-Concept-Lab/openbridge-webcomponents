import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-lantern-on')
export class ObiLightLanternOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2C7.44772 2 7 2.44772 7 3V4H17V3C17 2.44772 16.5523 2 16 2H8Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 8C7 6.89543 7.89543 6 9 6H15C16.1046 6 17 6.89543 17 8V16C17 17.1046 16.1046 18 15 18H9C7.89543 18 7 17.1046 7 16V8ZM9 8H15V16H9V8Z" fill="currentColor"/>
<path d="M7 20H17V21C17 21.5523 16.5523 22 16 22H8C7.44772 22 7 21.5523 7 21V20Z" fill="currentColor"/>
<path d="M23 13H20V11H23V13Z" fill="currentColor"/>
<path d="M1 13H4V11H1V13Z" fill="currentColor"/>
<path d="M21.0258 18.3658L18.4277 16.8658L19.4277 15.1338L22.0258 16.6338L21.0258 18.3658Z" fill="currentColor"/>
<path d="M1.97363 7.36584L4.57171 8.86584L5.57171 7.13379L2.97363 5.63379L1.97363 7.36584Z" fill="currentColor"/>
<path d="M22.0268 7.36584L19.4287 8.86584L18.4287 7.13379L21.0268 5.63379L22.0268 7.36584Z" fill="currentColor"/>
<path d="M2.97461 18.3658L5.57269 16.8658L4.57269 15.1338L1.97461 16.6338L2.97461 18.3658Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2C7.44772 2 7 2.44772 7 3V4H17V3C17 2.44772 16.5523 2 16 2H8Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 8C7 6.89543 7.89543 6 9 6H15C16.1046 6 17 6.89543 17 8V16C17 17.1046 16.1046 18 15 18H9C7.89543 18 7 17.1046 7 16V8ZM9 8H15V16H9V8Z" style="fill: var(--element-active-color)"/>
<path d="M7 20H17V21C17 21.5523 16.5523 22 16 22H8C7.44772 22 7 21.5523 7 21V20Z" style="fill: var(--element-active-color)"/>
<path d="M23 13H20V11H23V13Z" style="fill: var(--element-active-color)"/>
<path d="M1 13H4V11H1V13Z" style="fill: var(--element-active-color)"/>
<path d="M21.0258 18.3658L18.4277 16.8658L19.4277 15.1338L22.0258 16.6338L21.0258 18.3658Z" style="fill: var(--element-active-color)"/>
<path d="M1.97363 7.36584L4.57171 8.86584L5.57171 7.13379L2.97363 5.63379L1.97363 7.36584Z" style="fill: var(--element-active-color)"/>
<path d="M22.0268 7.36584L19.4287 8.86584L18.4287 7.13379L21.0268 5.63379L22.0268 7.36584Z" style="fill: var(--element-active-color)"/>
<path d="M2.97461 18.3658L5.57269 16.8658L4.57269 15.1338L1.97461 16.6338L2.97461 18.3658Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-lantern-on': ObiLightLanternOn;
  }
}