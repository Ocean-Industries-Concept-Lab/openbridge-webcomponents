import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-speed-low')
export class ObiSpeedLow extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8604 6C16.2787 6 19.8604 9.58172 19.8604 14C19.8604 15.4597 19.471 16.8247 18.79 18.001H4.93079C4.59966 17.4291 4.33748 16.8125 4.15548 16.1621C3.43798 15.9999 2.72138 15.8378 2 15.6747L2.00078 15.6793C2.27171 17.2816 2.92375 18.7543 3.86039 20.001H19.8604C21.1162 18.3295 21.8604 16.2516 21.8604 14C21.8604 8.47715 17.3832 4 11.8604 4C6.90981 4 2.79946 7.59738 2.00078 12.3207L2 12.3253C2.72156 12.1621 3.43834 12 4.15602 11.8377C5.09926 8.46991 8.19138 6 11.8604 6Z" fill="currentColor"/>
<path d="M13.8604 14C13.8604 15.1046 12.965 16 11.8604 16C10.9953 16 5.35155 14.7733 2.94485 14.2413C2.68443 14.1837 2.68443 13.8163 2.94485 13.7587C5.35155 13.2267 10.9953 12 11.8604 12C12.965 12 13.8604 12.8954 13.8604 14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8604 6C16.2787 6 19.8604 9.58172 19.8604 14C19.8604 15.4597 19.471 16.8247 18.79 18.001H4.93079C4.59966 17.4291 4.33748 16.8125 4.15548 16.1621C3.43798 15.9999 2.72138 15.8378 2 15.6747L2.00078 15.6793C2.27171 17.2816 2.92375 18.7543 3.86039 20.001H19.8604C21.1162 18.3295 21.8604 16.2516 21.8604 14C21.8604 8.47715 17.3832 4 11.8604 4C6.90981 4 2.79946 7.59738 2.00078 12.3207L2 12.3253C2.72156 12.1621 3.43834 12 4.15602 11.8377C5.09926 8.46991 8.19138 6 11.8604 6Z" style="fill: var(--element-active-color)"/>
<path d="M13.8604 14C13.8604 15.1046 12.965 16 11.8604 16C10.9953 16 5.35155 14.7733 2.94485 14.2413C2.68443 14.1837 2.68443 13.8163 2.94485 13.7587C5.35155 13.2267 10.9953 12 11.8604 12C12.965 12 13.8604 12.8954 13.8604 14Z" style="fill: var(--element-active-color)"/>
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
    'obi-speed-low': ObiSpeedLow;
  }
}
