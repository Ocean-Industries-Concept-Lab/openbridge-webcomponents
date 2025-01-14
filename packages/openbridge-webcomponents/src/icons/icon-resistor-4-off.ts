import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-resistor-4-off')
export class ObiResistor4Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5 9H19V15H5V9Z" fill="currentColor"/>
<path d="M16.2427 2.10074L17.6569 0.686523L23.3137 6.34338L21.8995 7.75759L16.2427 2.10074Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5866 8L18.364 4.22266L19.7782 5.63687L17.4151 8H20V11H23V13H20V16H9.41505L4.22183 21.1932L2.80762 19.779L6.58662 16H4V13H1V11H4V8H14.5866ZM13.5866 9H5V15H7.58662L13.5866 9ZM10.415 15H19V9H16.415L10.415 15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 9H19V15H5V9Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M16.2427 2.10074L17.6569 0.686523L23.3137 6.34338L21.8995 7.75759L16.2427 2.10074Z" style="fill: var(--undefined)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5866 8L18.364 4.22266L19.7782 5.63687L17.4151 8H20V11H23V13H20V16H9.41505L4.22183 21.1932L2.80762 19.779L6.58662 16H4V13H1V11H4V8H14.5866ZM13.5866 9H5V15H7.58662L13.5866 9ZM10.415 15H19V9H16.415L10.415 15Z" style="fill: var(--undefined)"/>
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
    'obi-resistor-4-off': ObiResistor4Off;
  }
}