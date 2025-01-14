import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-capacitor-01-off')
export class ObiCapacitor01Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 4C10.1046 4 11 4.89543 11 6L11 18C11 19.1046 10.1046 20 9 20C7.89543 20 7 19.1046 7 18V6C7 4.89543 7.89543 4 9 4ZM10 6L10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18L8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 4C16.1046 4 17 4.89543 17 6L17 18C17 19.1046 16.1046 20 15 20C13.8954 20 13 19.1046 13 18L13 6C13 4.89543 13.8954 4 15 4ZM16 6L16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18L14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z" fill="currentColor"/>
<path d="M10 6L10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18V6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z" fill="currentColor"/>
<path d="M16 6L16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18L14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 4C10.1046 4 11 4.89543 11 6L11 18C11 19.1046 10.1046 20 9 20C7.89543 20 7 19.1046 7 18V6C7 4.89543 7.89543 4 9 4ZM10 6L10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18L8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z" style="fill: var(--undefined)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 4C16.1046 4 17 4.89543 17 6L17 18C17 19.1046 16.1046 20 15 20C13.8954 20 13 19.1046 13 18L13 6C13 4.89543 13.8954 4 15 4ZM16 6L16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18L14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z" style="fill: var(--undefined)"/>
<path d="M10 6L10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18V6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M16 6L16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18L14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-capacitor-01-off': ObiCapacitor01Off;
  }
}