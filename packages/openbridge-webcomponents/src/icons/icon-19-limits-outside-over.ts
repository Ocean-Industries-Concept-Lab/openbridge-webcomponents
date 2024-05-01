import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-19-limits-outside-over')
export class Obi19LimitsOutsideOver extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.10667 10.2733L7.16667 9.33333L12.5 4L17.8333 9.33333L16.8933 10.2733L13.1667 6.55333V20H11.8333L11.8333 6.55333L8.10667 10.2733Z" fill="currentColor"/>
<path d="M5.5 14.4998H3.5V16.4998H5.5V14.4998Z" fill="currentColor"/>
<path d="M19.5 14.4998H21.5V16.4998H19.5V14.4998Z" fill="currentColor"/>
<path d="M17.5 14.4998H15.5V16.4998H17.5V14.4998Z" fill="currentColor"/>
<path d="M9.5 14.4998H7.5V16.4998H9.5V14.4998Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.10667 10.2733L7.16667 9.33333L12.5 4L17.8333 9.33333L16.8933 10.2733L13.1667 6.55333V20H11.8333L11.8333 6.55333L8.10667 10.2733Z" style="fill: var(--element-active-color)"/>
<path d="M5.5 14.4998H3.5V16.4998H5.5V14.4998Z" style="fill: var(--element-active-color)"/>
<path d="M19.5 14.4998H21.5V16.4998H19.5V14.4998Z" style="fill: var(--element-active-color)"/>
<path d="M17.5 14.4998H15.5V16.4998H17.5V14.4998Z" style="fill: var(--element-active-color)"/>
<path d="M9.5 14.4998H7.5V16.4998H9.5V14.4998Z" style="fill: var(--element-active-color)"/>
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
    'obi-19-limits-outside-over': Obi19LimitsOutsideOver;
  }
}
