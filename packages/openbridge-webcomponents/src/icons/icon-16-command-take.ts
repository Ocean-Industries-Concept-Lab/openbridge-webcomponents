import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-16-command-take')
export class Obi16CommandTake extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.38462 13.9231C8.23428 13.9231 8.92308 13.2343 8.92308 12.3846C8.92308 11.5349 8.23428 10.8462 7.38462 10.8462C6.53495 10.8462 5.84615 11.5349 5.84615 12.3846C5.84615 13.2343 6.53495 13.9231 7.38462 13.9231Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 14.6923V10.0769H12.2511C11.3869 8.25773 9.53261 7 7.38462 7C4.41077 7 2 9.41077 2 12.3846C2 15.3585 4.41077 17.7692 7.38462 17.7692C9.53261 17.7692 11.3869 16.5115 12.2511 14.6923H13.5V15.5H15V14.6923H15.8462V16.7692H20.4615V14.6923H22ZM17.3846 13.1538H11.2787L10.8614 14.0322C10.2424 15.3352 8.91659 16.2308 7.38462 16.2308C5.26044 16.2308 3.53846 14.5088 3.53846 12.3846C3.53846 10.2604 5.26044 8.53846 7.38462 8.53846C8.91659 8.53846 10.2424 9.43407 10.8614 10.7371L11.2787 11.6154H20.4615V13.1538H18.9231V15.2308H17.3846V13.1538Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.38462 13.9231C8.23428 13.9231 8.92308 13.2343 8.92308 12.3846C8.92308 11.5349 8.23428 10.8462 7.38462 10.8462C6.53495 10.8462 5.84615 11.5349 5.84615 12.3846C5.84615 13.2343 6.53495 13.9231 7.38462 13.9231Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 14.6923V10.0769H12.2511C11.3869 8.25773 9.53261 7 7.38462 7C4.41077 7 2 9.41077 2 12.3846C2 15.3585 4.41077 17.7692 7.38462 17.7692C9.53261 17.7692 11.3869 16.5115 12.2511 14.6923H13.5V15.5H15V14.6923H15.8462V16.7692H20.4615V14.6923H22ZM17.3846 13.1538H11.2787L10.8614 14.0322C10.2424 15.3352 8.91659 16.2308 7.38462 16.2308C5.26044 16.2308 3.53846 14.5088 3.53846 12.3846C3.53846 10.2604 5.26044 8.53846 7.38462 8.53846C8.91659 8.53846 10.2424 9.43407 10.8614 10.7371L11.2787 11.6154H20.4615V13.1538H18.9231V15.2308H17.3846V13.1538Z" style="fill: var(--element-active-color)"/>
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
    'obi-16-command-take': Obi16CommandTake;
  }
}
