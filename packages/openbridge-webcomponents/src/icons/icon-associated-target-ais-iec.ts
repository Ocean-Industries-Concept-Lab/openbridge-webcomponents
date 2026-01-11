import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-associated-target-ais-iec')
export class ObiAssociatedTargetAisIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17.4457 18.336C17.5536 18.6598 17.3126 18.9941 16.9713 18.9941H7.02869C6.6874 18.9941 6.44642 18.6598 6.55435 18.336L11.5257 3.42293C11.6776 2.9671 12.3224 2.9671 12.4743 3.42294L17.4457 18.336ZM8.41602 17.4941H15.584L12 6.74316L8.41602 17.4941Z" fill="currentColor"/>
<path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12ZM23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.4457 18.336C17.5536 18.6598 17.3126 18.9941 16.9713 18.9941H7.02869C6.6874 18.9941 6.44642 18.6598 6.55435 18.336L11.5257 3.42293C11.6776 2.9671 12.3224 2.9671 12.4743 3.42294L17.4457 18.336ZM8.41602 17.4941H15.584L12 6.74316L8.41602 17.4941Z" style="fill: var(--element-active-color)"/>
<path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12ZM23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-associated-target-ais-iec': ObiAssociatedTargetAisIec;
  }
}
