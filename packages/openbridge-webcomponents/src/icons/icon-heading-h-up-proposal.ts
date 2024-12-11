import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-heading-h-up-proposal')
export class ObiHeadingHUpProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.64 20.98H14.336V16.004H9.66405V20.98H7.36005V9.556H9.66405V14.068H14.336V9.556H16.64V20.98Z" fill="currentColor"/>
<path d="M12 1L17 7H7L12 1Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.64 20.98H14.336V16.004H9.66405V20.98H7.36005V9.556H9.66405V14.068H14.336V9.556H16.64V20.98Z" style="fill: var(--element-active-color)"/>
<path d="M12 1L17 7H7L12 1Z" style="fill: var(--element-active-color)"/>
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
    'obi-heading-h-up-proposal': ObiHeadingHUpProposal;
  }
}