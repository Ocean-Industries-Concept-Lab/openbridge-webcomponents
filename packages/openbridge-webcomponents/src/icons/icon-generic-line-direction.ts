import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-generic-line-direction')
export class ObiGenericLineDirection extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00053 6L13.9914 12L8 18H10.8214L16.8214 12L10.8214 6H8.00053Z" fill="currentColor"/>
<path d="M11.5798 11L12.5783 12L11.5797 13H0V11H11.5798Z" fill="currentColor"/>
<path d="M17.2357 11L18.2357 12L17.2356 13H24V11H17.2357Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00053 6L13.9914 12L8 18H10.8214L16.8214 12L10.8214 6H8.00053Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M11.5798 11L12.5783 12L11.5797 13H0V11H11.5798Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M17.2357 11L18.2357 12L17.2356 13H24V11H17.2357Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-generic-line-direction': ObiGenericLineDirection;
  }
}
