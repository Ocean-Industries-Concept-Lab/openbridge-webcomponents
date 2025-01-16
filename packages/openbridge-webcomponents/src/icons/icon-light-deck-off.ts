import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-deck-off')
export class ObiLightDeckOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1933 21.1924L2.8085 2.80762L1.39429 4.22183L4.17246 7H3.99991C2.89534 7 1.99991 7.89543 1.99991 9V15C1.99991 16.1046 2.89534 17 3.99991 17H14.1725L19.7791 22.6066L21.1933 21.1924ZM12.1725 15H3.99991V13H10.1725L12.1725 15ZM8.17246 11H3.99991V9H6.17246L8.17246 11Z" fill="currentColor"/>
<path d="M19.9999 7H9.82901L11.829 9H19.9999V11H13.829L15.829 13H19.9999V15H17.829L19.829 17H19.9999C21.1045 17 21.9999 16.1046 21.9999 15V9C21.9999 7.89543 21.1045 7 19.9999 7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1933 21.1924L2.8085 2.80762L1.39429 4.22183L4.17246 7H3.99991C2.89534 7 1.99991 7.89543 1.99991 9V15C1.99991 16.1046 2.89534 17 3.99991 17H14.1725L19.7791 22.6066L21.1933 21.1924ZM12.1725 15H3.99991V13H10.1725L12.1725 15ZM8.17246 11H3.99991V9H6.17246L8.17246 11Z" style="fill: var(--element-active-color)"/>
<path d="M19.9999 7H9.82901L11.829 9H19.9999V11H13.829L15.829 13H19.9999V15H17.829L19.829 17H19.9999C21.1045 17 21.9999 16.1046 21.9999 15V9C21.9999 7.89543 21.1045 7 19.9999 7Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-deck-off': ObiLightDeckOff;
  }
}
