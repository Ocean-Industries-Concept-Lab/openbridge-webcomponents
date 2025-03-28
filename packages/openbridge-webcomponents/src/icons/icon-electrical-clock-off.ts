import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-electrical-clock-off')
export class ObiElectricalClockOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13L12 13C12.5523 13 13 12.5523 13 12V5Z" fill="currentColor"/>
<path d="M12 4C12.5523 4 13 4.44772 13 5V12C13 12.5523 12.5523 13 12 13L7 13C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13L12 13C12.5523 13 13 12.5523 13 12V5Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M12 4C12.5523 4 13 4.44772 13 5V12C13 12.5523 12.5523 13 12 13L7 13C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V5C11 4.44772 11.4477 4 12 4Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-electrical-clock-off': ObiElectricalClockOff;
  }
}
