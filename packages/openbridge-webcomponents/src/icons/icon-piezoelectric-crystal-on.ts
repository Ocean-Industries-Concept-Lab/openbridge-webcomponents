import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-piezoelectric-crystal-on')
export class ObiPiezoelectricCrystalOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 3H16V21H8V3Z" fill="currentColor"/>
<path d="M4 5C4.55228 5 5 5.44772 5 6L5 18C5 18.5523 4.55228 19 4 19C3.44771 19 3 18.5523 3 18L3 6C3 5.44772 3.44772 5 4 5Z" fill="currentColor"/>
<path d="M20 5C20.5523 5 21 5.44772 21 6V18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18V6C19 5.44772 19.4477 5 20 5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 3H8V21H16V3ZM8 2C7.44772 2 7 2.44772 7 3V21C7 21.5523 7.44772 22 8 22H16C16.5523 22 17 21.5523 17 21V3C17 2.44772 16.5523 2 16 2H8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 3H16V21H8V3Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M4 5C4.55228 5 5 5.44772 5 6L5 18C5 18.5523 4.55228 19 4 19C3.44771 19 3 18.5523 3 18L3 6C3 5.44772 3.44772 5 4 5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M20 5C20.5523 5 21 5.44772 21 6V18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18V6C19 5.44772 19.4477 5 20 5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 3H8V21H16V3ZM8 2C7.44772 2 7 2.44772 7 3V21C7 21.5523 7.44772 22 8 22H16C16.5523 22 17 21.5523 17 21V3C17 2.44772 16.5523 2 16 2H8Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-piezoelectric-crystal-on': ObiPiezoelectricCrystalOn;
  }
}