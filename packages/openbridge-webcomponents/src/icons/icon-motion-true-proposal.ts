import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-motion-true-proposal')
export class ObiMotionTrueProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 7.00067C12.9983 6.46612 10.774 6.98403 9.20364 8.55441L2.6958 15.0622L6.93844 19.3049L13.4463 12.797C15.0167 11.2267 15.5346 9.00238 15 7.00067Z" fill="currentColor"/>
<path d="M17.4699 3.12376L16.0557 1.70955L21 1.00244L20.2984 5.95219L18.8842 4.53798L17.4699 5.95219L16.0557 4.53798L17.4699 3.12376Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0423 19.0007C19.0423 20.6575 17.6991 22.0007 16.0423 22.0007C14.3854 22.0007 13.0423 20.6575 13.0423 19.0007C13.0423 17.3438 14.3854 16.0007 16.0423 16.0007C17.6991 16.0007 19.0423 17.3438 19.0423 19.0007ZM17.5423 19.0007C17.5423 19.8291 16.8707 20.5007 16.0423 20.5007C15.2139 20.5007 14.5423 19.8291 14.5423 19.0007C14.5423 18.1722 15.2139 17.5007 16.0423 17.5007C16.8707 17.5007 17.5423 18.1722 17.5423 19.0007Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 7.00067C12.9983 6.46612 10.774 6.98403 9.20364 8.55441L2.6958 15.0622L6.93844 19.3049L13.4463 12.797C15.0167 11.2267 15.5346 9.00238 15 7.00067Z" style="fill: var(--element-active-color)"/>
<path d="M17.4699 3.12376L16.0557 1.70955L21 1.00244L20.2984 5.95219L18.8842 4.53798L17.4699 5.95219L16.0557 4.53798L17.4699 3.12376Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0423 19.0007C19.0423 20.6575 17.6991 22.0007 16.0423 22.0007C14.3854 22.0007 13.0423 20.6575 13.0423 19.0007C13.0423 17.3438 14.3854 16.0007 16.0423 16.0007C17.6991 16.0007 19.0423 17.3438 19.0423 19.0007ZM17.5423 19.0007C17.5423 19.8291 16.8707 20.5007 16.0423 20.5007C15.2139 20.5007 14.5423 19.8291 14.5423 19.0007C14.5423 18.1722 15.2139 17.5007 16.0423 17.5007C16.8707 17.5007 17.5423 18.1722 17.5423 19.0007Z" style="fill: var(--element-active-color)"/>
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
