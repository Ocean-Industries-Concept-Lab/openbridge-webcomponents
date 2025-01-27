import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-command-request')
export class ObiCommandRequest extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 22V4C2 3.45 2.19583 2.97917 2.5875 2.5875C2.97917 2.19583 3.45 2 4 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H6L2 22ZM5.15 16H20V4H4V17.125L5.15 16Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 13C8.16667 13 7.45833 12.7083 6.875 12.125C6.29167 11.5417 6 10.8333 6 10C6 9.16667 6.29167 8.45833 6.875 7.875C7.45833 7.29167 8.16667 7 9 7C9.63333 7 10.2083 7.1875 10.725 7.5625C11.2417 7.9375 11.6167 8.41667 11.85 9H18V11H17V13H15V11H11.85C11.6167 11.5833 11.2417 12.0625 10.725 12.4375C10.2083 12.8125 9.63333 13 9 13ZM9.7125 10.7125C9.52083 10.9042 9.28333 11 9 11C8.71667 11 8.47917 10.9042 8.2875 10.7125C8.09583 10.5208 8 10.2833 8 10C8 9.71667 8.09583 9.47917 8.2875 9.2875C8.47917 9.09583 8.71667 9 9 9C9.28333 9 9.52083 9.09583 9.7125 9.2875C9.90417 9.47917 10 9.71667 10 10C10 10.2833 9.90417 10.5208 9.7125 10.7125Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 22V4C2 3.45 2.19583 2.97917 2.5875 2.5875C2.97917 2.19583 3.45 2 4 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H6L2 22ZM5.15 16H20V4H4V17.125L5.15 16Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 13C8.16667 13 7.45833 12.7083 6.875 12.125C6.29167 11.5417 6 10.8333 6 10C6 9.16667 6.29167 8.45833 6.875 7.875C7.45833 7.29167 8.16667 7 9 7C9.63333 7 10.2083 7.1875 10.725 7.5625C11.2417 7.9375 11.6167 8.41667 11.85 9H18V11H17V13H15V11H11.85C11.6167 11.5833 11.2417 12.0625 10.725 12.4375C10.2083 12.8125 9.63333 13 9 13ZM9.7125 10.7125C9.52083 10.9042 9.28333 11 9 11C8.71667 11 8.47917 10.9042 8.2875 10.7125C8.09583 10.5208 8 10.2833 8 10C8 9.71667 8.09583 9.47917 8.2875 9.2875C8.47917 9.09583 8.71667 9 9 9C9.28333 9 9.52083 9.09583 9.7125 9.2875C9.90417 9.47917 10 9.71667 10 10C10 10.2833 9.90417 10.5208 9.7125 10.7125Z" style="fill: var(--element-active-color)"/>
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
    'obi-command-request': ObiCommandRequest;
  }
}
