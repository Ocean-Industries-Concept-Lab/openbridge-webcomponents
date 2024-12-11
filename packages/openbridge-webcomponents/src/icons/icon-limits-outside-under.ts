import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-limits-outside-under')
export class ObiLimitsOutsideUnder extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5 9.0002V7.0002H3V9.0002H5Z" fill="currentColor"/>
<path d="M21 7.0002H19V9.0002H21V7.0002Z" fill="currentColor"/>
<path d="M17 7.0002H15V9.0002H17V7.0002Z" fill="currentColor"/>
<path d="M9 9.0002H7V7.0002H9V9.0002Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 20.0004L17.7071 14.2933L16.2929 12.879L13 16.1719L13.0001 3.00005H11.0001L11 16.1719L7.70711 12.879L6.29289 14.2933L12 20.0004Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 9.0002V7.0002H3V9.0002H5Z" style="fill: var(--element-active-color)"/>
<path d="M21 7.0002H19V9.0002H21V7.0002Z" style="fill: var(--element-active-color)"/>
<path d="M17 7.0002H15V9.0002H17V7.0002Z" style="fill: var(--element-active-color)"/>
<path d="M9 9.0002H7V7.0002H9V9.0002Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 20.0004L17.7071 14.2933L16.2929 12.879L13 16.1719L13.0001 3.00005H11.0001L11 16.1719L7.70711 12.879L6.29289 14.2933L12 20.0004Z" style="fill: var(--element-active-color)"/>
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
    'obi-limits-outside-under': ObiLimitsOutsideUnder;
  }
}
