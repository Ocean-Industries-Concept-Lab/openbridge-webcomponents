import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-time-more')
export class ObiTimeMore extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 12C2 6.48 6.47 2 11.99 2C17.52 2 22 6.48 22 12C22 12.8631 21.8905 13.7009 21.6845 14.5H20V12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C12.9819 20 13.9224 19.8233 14.7913 19.5H15V21.5399C14.05 21.8388 13.0389 22 11.99 22C6.47 22 2 17.52 2 12Z" fill="currentColor"/>
<path d="M15 13.7333V14.5H13.5L11 13V7H12.5V12.25L15 13.7333Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 16V13H18.5V16H21.5V18H18.5V21H16.5V18H13.5V16H16.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 12C2 6.48 6.47 2 11.99 2C17.52 2 22 6.48 22 12C22 12.8631 21.8905 13.7009 21.6845 14.5H20V12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C12.9819 20 13.9224 19.8233 14.7913 19.5H15V21.5399C14.05 21.8388 13.0389 22 11.99 22C6.47 22 2 17.52 2 12Z" style="fill: var(--element-active-color)"/>
<path d="M15 13.7333V14.5H13.5L11 13V7H12.5V12.25L15 13.7333Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 16V13H18.5V16H21.5V18H18.5V21H16.5V18H13.5V16H16.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-time-more': ObiTimeMore;
  }
}