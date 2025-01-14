import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wire-cross')
export class ObiWireCross extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0H14V7.41604C15.1534 7.92 16.08 8.84656 16.584 10H24V14H16.584C16.08 15.1534 15.1534 16.08 14 16.584V24H10V16.584C8.84656 16.08 7.92 15.1534 7.41604 14H0V10H7.41604C7.92 8.84656 8.84656 7.92 10 7.41604V0Z" fill="currentColor"/>
<path d="M10 7.41604C8.84656 7.92 7.92 8.84656 7.41604 10H0V11H8.07041L8.3324 10.4004C8.7355 9.47778 9.47778 8.7355 10.4004 8.3324L11 8.07041V0H10V7.41604Z" fill="currentColor"/>
<path d="M7.41604 14C7.92 15.1534 8.84656 16.08 10 16.584V24H11V15.9296L10.4004 15.6676C9.47778 15.2645 8.7355 14.5222 8.3324 13.5996L8.07041 13H0V14H7.41604Z" fill="currentColor"/>
<path d="M14 16.584C15.1534 16.08 16.08 15.1534 16.584 14H24V13H15.9296L15.6676 13.5996C15.2645 14.5222 14.5222 15.2645 13.5996 15.6676L13 15.9296V24H14V16.584Z" fill="currentColor"/>
<path d="M16.584 10C16.08 8.84656 15.1534 7.92 14 7.41604V0H13V8.07041L13.5996 8.3324C14.5222 8.7355 15.2645 9.47778 15.6676 10.4004L15.9296 11H24V10H16.584Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0H14V7.41604C15.1534 7.92 16.08 8.84656 16.584 10H24V14H16.584C16.08 15.1534 15.1534 16.08 14 16.584V24H10V16.584C8.84656 16.08 7.92 15.1534 7.41604 14H0V10H7.41604C7.92 8.84656 8.84656 7.92 10 7.41604V0Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M10 7.41604C8.84656 7.92 7.92 8.84656 7.41604 10H0V11H8.07041L8.3324 10.4004C8.7355 9.47778 9.47778 8.7355 10.4004 8.3324L11 8.07041V0H10V7.41604Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M7.41604 14C7.92 15.1534 8.84656 16.08 10 16.584V24H11V15.9296L10.4004 15.6676C9.47778 15.2645 8.7355 14.5222 8.3324 13.5996L8.07041 13H0V14H7.41604Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M14 16.584C15.1534 16.08 16.08 15.1534 16.584 14H24V13H15.9296L15.6676 13.5996C15.2645 14.5222 14.5222 15.2645 13.5996 15.6676L13 15.9296V24H14V16.584Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M16.584 10C16.08 8.84656 15.1534 7.92 14 7.41604V0H13V8.07041L13.5996 8.3324C14.5222 8.7355 15.2645 9.47778 15.6676 10.4004L15.9296 11H24V10H16.584Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-wire-cross': ObiWireCross;
  }
}