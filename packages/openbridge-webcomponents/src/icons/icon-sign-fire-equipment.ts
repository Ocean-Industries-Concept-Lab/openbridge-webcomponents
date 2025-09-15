import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-sign-fire-equipment')
export class ObiSignFireEquipment extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M22 9.5C20.2857 9.5 20 7 20 7L19.6833 7.69296C18.8381 9.54163 19.9917 11.6862 22 12V9.5Z" fill="currentColor"/>
<path d="M22 13.5C20.2857 13.5 18 11 18 11V11.3265C18 13.657 19.6974 15.6402 22 16V13.5Z" fill="currentColor"/>
<path d="M18 17C18 17 18.6083 17.4907 19.39 18.0705C20.3954 18.8162 21.7545 18.2275 22 17L20.0311 16.2684C19.2662 15.9842 18.408 16.2934 18 17Z" fill="currentColor"/>
<path d="M22 18.8C19.5 20.5 18 19 18 19C18 20.6568 19.3431 22 21 22H22V18.8Z" fill="currentColor"/>
<path d="M2 4C2 2.89543 2.89543 2 4 2V18C2.89543 18 2 17.1046 2 16V4Z" fill="currentColor"/>
<path d="M14.5 2C15.6046 2 16.5 2.89543 16.5 4V16C16.5 17.1046 15.6046 18 14.5 18V2Z" fill="currentColor"/>
<path d="M5.5 4.75C5.5 4.33579 5.83579 4 6.25 4C6.66421 4 7 4.33579 7 4.75V19H5.5V4.75Z" fill="currentColor"/>
<path d="M5.5 20H7V21.25C7 21.6642 6.66421 22 6.25 22C5.83579 22 5.5 21.6642 5.5 21.25V20Z" fill="currentColor"/>
<path d="M8.5 4.75C8.5 4.33579 8.83579 4 9.25 4C9.66421 4 10 4.33579 10 4.75V15.25C10 15.6642 9.66421 16 9.25 16C8.83579 16 8.5 15.6642 8.5 15.25V4.75Z" fill="currentColor"/>
<path d="M11.5 4.75C11.5 4.33579 11.8358 4 12.25 4C12.6642 4 13 4.33579 13 4.75V15.25C13 15.6642 12.6642 16 12.25 16C11.8358 16 11.5 15.6642 11.5 15.25V4.75Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 9.5C20.2857 9.5 20 7 20 7L19.6833 7.69296C18.8381 9.54163 19.9917 11.6862 22 12V9.5Z" style="fill: var(--element-active-color)"/>
<path d="M22 13.5C20.2857 13.5 18 11 18 11V11.3265C18 13.657 19.6974 15.6402 22 16V13.5Z" style="fill: var(--element-active-color)"/>
<path d="M18 17C18 17 18.6083 17.4907 19.39 18.0705C20.3954 18.8162 21.7545 18.2275 22 17L20.0311 16.2684C19.2662 15.9842 18.408 16.2934 18 17Z" style="fill: var(--element-active-color)"/>
<path d="M22 18.8C19.5 20.5 18 19 18 19C18 20.6568 19.3431 22 21 22H22V18.8Z" style="fill: var(--element-active-color)"/>
<path d="M2 4C2 2.89543 2.89543 2 4 2V18C2.89543 18 2 17.1046 2 16V4Z" style="fill: var(--element-active-color)"/>
<path d="M14.5 2C15.6046 2 16.5 2.89543 16.5 4V16C16.5 17.1046 15.6046 18 14.5 18V2Z" style="fill: var(--element-active-color)"/>
<path d="M5.5 4.75C5.5 4.33579 5.83579 4 6.25 4C6.66421 4 7 4.33579 7 4.75V19H5.5V4.75Z" style="fill: var(--element-active-color)"/>
<path d="M5.5 20H7V21.25C7 21.6642 6.66421 22 6.25 22C5.83579 22 5.5 21.6642 5.5 21.25V20Z" style="fill: var(--element-active-color)"/>
<path d="M8.5 4.75C8.5 4.33579 8.83579 4 9.25 4C9.66421 4 10 4.33579 10 4.75V15.25C10 15.6642 9.66421 16 9.25 16C8.83579 16 8.5 15.6642 8.5 15.25V4.75Z" style="fill: var(--element-active-color)"/>
<path d="M11.5 4.75C11.5 4.33579 11.8358 4 12.25 4C12.6642 4 13 4.33579 13 4.75V15.25C13 15.6642 12.6642 16 12.25 16C11.8358 16 11.5 15.6642 11.5 15.25V4.75Z" style="fill: var(--element-active-color)"/>
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
    'obi-sign-fire-equipment': ObiSignFireEquipment;
  }
}
