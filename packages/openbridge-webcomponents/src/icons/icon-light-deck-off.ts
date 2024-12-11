import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-deck-off')
export class ObiLightDeckOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.8066 21.1924L21.1914 2.80762L22.6056 4.22183L19.8274 7H20C21.1045 7 22 7.89543 22 9V15C22 16.1046 21.1045 17 20 17H9.82742L4.22082 22.6066L2.8066 21.1924ZM11.8274 15H20V13H13.8274L11.8274 15ZM15.8274 11H20V9H17.8274L15.8274 11Z" fill="currentColor"/>
<path d="M3.99997 7H14.1709L12.1709 9H3.99997V11H10.1709L8.17087 13H3.99997V15H6.17087L4.17087 17H3.99997C2.8954 17 1.99997 16.1046 1.99997 15V9C1.99997 7.89543 2.8954 7 3.99997 7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.8066 21.1924L21.1914 2.80762L22.6056 4.22183L19.8274 7H20C21.1045 7 22 7.89543 22 9V15C22 16.1046 21.1045 17 20 17H9.82742L4.22082 22.6066L2.8066 21.1924ZM11.8274 15H20V13H13.8274L11.8274 15ZM15.8274 11H20V9H17.8274L15.8274 11Z" style="fill: var(--element-active-color)"/>
<path d="M3.99997 7H14.1709L12.1709 9H3.99997V11H10.1709L8.17087 13H3.99997V15H6.17087L4.17087 17H3.99997C2.8954 17 1.99997 16.1046 1.99997 15V9C1.99997 7.89543 2.8954 7 3.99997 7Z" style="fill: var(--element-active-color)"/>
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
