import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-19-limits-outside-under')
export class Obi19LimitsOutsideUnder extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.8933 13.7267L17.8333 14.6667L12.5 20L7.16667 14.6667L8.10667 13.7267L11.8333 17.4467V4H13.1667L13.1667 17.4467L16.8933 13.7267Z" fill="currentColor"/>
<path d="M19.5 9.50016H21.5V7.50016H19.5V9.50016Z" fill="currentColor"/>
<path d="M5.5 9.50016H3.5V7.50016H5.5V9.50016Z" fill="currentColor"/>
<path d="M7.5 9.50016H9.5V7.50016H7.5V9.50016Z" fill="currentColor"/>
<path d="M15.5 9.50016H17.5V7.50016H15.5V9.50016Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.8933 13.7267L17.8333 14.6667L12.5 20L7.16667 14.6667L8.10667 13.7267L11.8333 17.4467V4H13.1667L13.1667 17.4467L16.8933 13.7267Z" style="fill: var(--element-active-color)"/>
<path d="M19.5 9.50016H21.5V7.50016H19.5V9.50016Z" style="fill: var(--element-active-color)"/>
<path d="M5.5 9.50016H3.5V7.50016H5.5V9.50016Z" style="fill: var(--element-active-color)"/>
<path d="M7.5 9.50016H9.5V7.50016H7.5V9.50016Z" style="fill: var(--element-active-color)"/>
<path d="M15.5 9.50016H17.5V7.50016H15.5V9.50016Z" style="fill: var(--element-active-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-19-limits-outside-under': Obi19LimitsOutsideUnder;
  }
}
