import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-motion-true-proposal')
export class ObiMotionTrueProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 7.00043C12.9983 6.46588 10.774 6.98379 9.20364 8.55416L2.6958 15.062L6.93844 19.3046L13.4463 12.7968C15.0167 11.2264 15.5346 9.00213 15 7.00043Z" fill="currentColor"/>
<path d="M17.4699 3.12352L16.0557 1.7093L21 1.0022L20.2984 5.95195L18.8842 4.53773L17.4699 5.95194L16.0557 4.53773L17.4699 3.12352Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0423 19.0004C19.0423 20.6573 17.6991 22.0004 16.0423 22.0004C14.3854 22.0004 13.0423 20.6573 13.0423 19.0004C13.0423 17.3436 14.3854 16.0004 16.0423 16.0004C17.6991 16.0004 19.0423 17.3436 19.0423 19.0004ZM17.5423 19.0004C17.5423 19.8288 16.8707 20.5004 16.0423 20.5004C15.2139 20.5004 14.5423 19.8288 14.5423 19.0004C14.5423 18.172 15.2139 17.5004 16.0423 17.5004C16.8707 17.5004 17.5423 18.172 17.5423 19.0004Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 7.00043C12.9983 6.46588 10.774 6.98379 9.20364 8.55416L2.6958 15.062L6.93844 19.3046L13.4463 12.7968C15.0167 11.2264 15.5346 9.00213 15 7.00043Z" style="fill: var(--element-active-color)"/>
<path d="M17.4699 3.12352L16.0557 1.7093L21 1.0022L20.2984 5.95195L18.8842 4.53773L17.4699 5.95194L16.0557 4.53773L17.4699 3.12352Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0423 19.0004C19.0423 20.6573 17.6991 22.0004 16.0423 22.0004C14.3854 22.0004 13.0423 20.6573 13.0423 19.0004C13.0423 17.3436 14.3854 16.0004 16.0423 16.0004C17.6991 16.0004 19.0423 17.3436 19.0423 19.0004ZM17.5423 19.0004C17.5423 19.8288 16.8707 20.5004 16.0423 20.5004C15.2139 20.5004 14.5423 19.8288 14.5423 19.0004C14.5423 18.172 15.2139 17.5004 16.0423 17.5004C16.8707 17.5004 17.5423 18.172 17.5423 19.0004Z" style="fill: var(--element-active-color)"/>
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
    'obi-motion-true-proposal': ObiMotionTrueProposal;
  }
}
