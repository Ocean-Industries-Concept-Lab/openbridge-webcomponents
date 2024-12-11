import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-resistor-4-on')
export class ObiResistor4On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5 9L19 9V15L5 15L5 9Z" fill="currentColor"/>
<path d="M16.2427 2.10074L17.6569 0.686523L23.3137 6.34338L21.8995 7.75759L16.2427 2.10074Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5866 8L18.364 4.22266L19.7782 5.63687L17.4151 8H20V11H23L23 13H20V16L9.41505 16L4.22183 21.1932L2.80762 19.779L6.58662 16L4 16L4 13H1L1 11H4V8L14.5866 8ZM13.5866 9L5 9L5 15L7.58662 15L13.5866 9ZM10.415 15L19 15L19 9L16.415 9L10.415 15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 9L19 9V15L5 15L5 9Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M16.2427 2.10074L17.6569 0.686523L23.3137 6.34338L21.8995 7.75759L16.2427 2.10074Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5866 8L18.364 4.22266L19.7782 5.63687L17.4151 8H20V11H23L23 13H20V16L9.41505 16L4.22183 21.1932L2.80762 19.779L6.58662 16L4 16L4 13H1L1 11H4V8L14.5866 8ZM13.5866 9L5 9L5 15L7.58662 15L13.5866 9ZM10.415 15L19 15L19 9L16.415 9L10.415 15Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-resistor-4-on': ObiResistor4On;
  }
}