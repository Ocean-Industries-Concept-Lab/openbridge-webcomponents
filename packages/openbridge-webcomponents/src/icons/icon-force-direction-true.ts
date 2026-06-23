import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-force-direction-true')
export class ObiForceDirectionTrue extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4326 1.55605C11.6068 1.02397 12.3931 1.02396 12.5673 1.55605L12.5947 1.67812L14.4218 15.3783L17.6054 14.5834C18.1533 14.4464 18.5701 15.0739 18.2314 15.5258L12.4804 23.1937C12.2404 23.5133 11.7595 23.5134 11.5195 23.1937L5.76849 15.5258C5.45107 15.1023 5.79718 14.5249 6.29291 14.5668L6.39447 14.5834L9.57709 15.3783L11.4052 1.67812L11.4326 1.55605Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4326 1.55605C11.6068 1.02397 12.3931 1.02396 12.5673 1.55605L12.5947 1.67812L14.4218 15.3783L17.6054 14.5834C18.1533 14.4464 18.5701 15.0739 18.2314 15.5258L12.4804 23.1937C12.2404 23.5133 11.7595 23.5134 11.5195 23.1937L5.76849 15.5258C5.45107 15.1023 5.79718 14.5249 6.29291 14.5668L6.39447 14.5834L9.57709 15.3783L11.4052 1.67812L11.4326 1.55605Z" style="fill: var(--element-active-color)"/>
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
    'obi-force-direction-true': ObiForceDirectionTrue;
  }
}
