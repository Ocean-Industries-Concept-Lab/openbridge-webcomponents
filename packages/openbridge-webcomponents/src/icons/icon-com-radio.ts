import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-com-radio')
export class ObiComRadio extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 12.5H15V11H9V12.5Z" fill="currentColor"/>
<path d="M9 15.5H15V14H9V15.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 8V2H10V8H14V7H16V8C17.1046 8 18 8.89543 18 10V20C18 21.1046 17.1046 22 16 22H8C6.89543 22 6 21.1046 6 20V10C6 8.89543 6.89543 8 8 8ZM16 9.5H8C7.72386 9.5 7.5 9.72386 7.5 10V20C7.5 20.2761 7.72386 20.5 8 20.5H16C16.2761 20.5 16.5 20.2761 16.5 20V10C16.5 9.72386 16.2761 9.5 16 9.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 12.5H15V11H9V12.5Z" style="fill: var(--element-active-color)"/>
<path d="M9 15.5H15V14H9V15.5Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 8V2H10V8H14V7H16V8C17.1046 8 18 8.89543 18 10V20C18 21.1046 17.1046 22 16 22H8C6.89543 22 6 21.1046 6 20V10C6 8.89543 6.89543 8 8 8ZM16 9.5H8C7.72386 9.5 7.5 9.72386 7.5 10V20C7.5 20.2761 7.72386 20.5 8 20.5H16C16.2761 20.5 16.5 20.2761 16.5 20V10C16.5 9.72386 16.2761 9.5 16 9.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-com-radio': ObiComRadio;
  }
}