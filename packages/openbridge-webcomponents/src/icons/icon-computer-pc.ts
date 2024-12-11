import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-computer-pc')
export class ObiComputerPc extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 3H4C2.9 3 2 3.9 2 5V15C2 16.1 2.9 17 4 17H9.5V19H7.5V21H11.5V15H4V5H20V3Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 21V7.5C13 7.21667 13.0958 6.97917 13.2875 6.7875C13.4792 6.59583 13.7167 6.5 14 6.5H21C21.2833 6.5 21.5208 6.59583 21.7125 6.7875C21.9042 6.97917 22 7.21667 22 7.5V21C22 21.2833 21.9042 21.5208 21.7125 21.7125C21.5208 21.9042 21.2833 22 21 22H14C13.7167 22 13.4792 21.9042 13.2875 21.7125C13.0958 21.5208 13 21.2833 13 21ZM20 20H15V8.5H20V20ZM16 17.5C16 17.9167 16.1458 18.2708 16.4375 18.5625C16.7292 18.8542 17.0833 19 17.5 19C17.9167 19 18.2708 18.8542 18.5625 18.5625C18.8542 18.2708 19 17.9167 19 17.5C19 17.0833 18.8542 16.7292 18.5625 16.4375C18.2708 16.1458 17.9167 16 17.5 16C17.0833 16 16.7292 16.1458 16.4375 16.4375C16.1458 16.7292 16 17.0833 16 17.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 3H4C2.9 3 2 3.9 2 5V15C2 16.1 2.9 17 4 17H9.5V19H7.5V21H11.5V15H4V5H20V3Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 21V7.5C13 7.21667 13.0958 6.97917 13.2875 6.7875C13.4792 6.59583 13.7167 6.5 14 6.5H21C21.2833 6.5 21.5208 6.59583 21.7125 6.7875C21.9042 6.97917 22 7.21667 22 7.5V21C22 21.2833 21.9042 21.5208 21.7125 21.7125C21.5208 21.9042 21.2833 22 21 22H14C13.7167 22 13.4792 21.9042 13.2875 21.7125C13.0958 21.5208 13 21.2833 13 21ZM20 20H15V8.5H20V20ZM16 17.5C16 17.9167 16.1458 18.2708 16.4375 18.5625C16.7292 18.8542 17.0833 19 17.5 19C17.9167 19 18.2708 18.8542 18.5625 18.5625C18.8542 18.2708 19 17.9167 19 17.5C19 17.0833 18.8542 16.7292 18.5625 16.4375C18.2708 16.1458 17.9167 16 17.5 16C17.0833 16 16.7292 16.1458 16.4375 16.4375C16.1458 16.7292 16 17.0833 16 17.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-computer-pc': ObiComputerPc;
  }
}