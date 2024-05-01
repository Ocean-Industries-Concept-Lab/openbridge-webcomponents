import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-motor-off-horisontal')
export class Obi08MotorOffHorisontal extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 7.5H3C1.61929 7.5 0.5 8.61929 0.5 10C0.5 11.3807 1.61929 12.5 3 12.5H3.5V13C3.5 13.8284 4.17157 14.5 5 14.5H6H6.5V15C6.5 15.8284 7.17157 16.5 8 16.5H8.5V17V19.5H5.5C4.94772 19.5 4.5 19.9477 4.5 20.5C4.5 21.0523 4.94771 21.5 5.5 21.5H18.5C19.0523 21.5 19.5 21.0523 19.5 20.5C19.5 19.9477 19.0523 19.5 18.5 19.5H15.5V17V16.5H16C16.8284 16.5 17.5 15.8284 17.5 15V14.5H18H21C21.8284 14.5 22.5 13.8284 22.5 13V7C22.5 6.17157 21.8284 5.5 21 5.5H18H17.5V5C17.5 4.17157 16.8284 3.5 16 3.5H8C7.17157 3.5 6.5 4.17157 6.5 5V5.5H6H5C4.17157 5.5 3.5 6.17157 3.5 7V7.5Z" fill="currentColor" stroke="#808080"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 7.5H3C1.61929 7.5 0.5 8.61929 0.5 10C0.5 11.3807 1.61929 12.5 3 12.5H3.5V13C3.5 13.8284 4.17157 14.5 5 14.5H6H6.5V15C6.5 15.8284 7.17157 16.5 8 16.5H8.5V17V19.5H5.5C4.94772 19.5 4.5 19.9477 4.5 20.5C4.5 21.0523 4.94771 21.5 5.5 21.5H18.5C19.0523 21.5 19.5 21.0523 19.5 20.5C19.5 19.9477 19.0523 19.5 18.5 19.5H15.5V17V16.5H16C16.8284 16.5 17.5 15.8284 17.5 15V14.5H18H21C21.8284 14.5 22.5 13.8284 22.5 13V7C22.5 6.17157 21.8284 5.5 21 5.5H18H17.5V5C17.5 4.17157 16.8284 3.5 16 3.5H8C7.17157 3.5 6.5 4.17157 6.5 5V5.5H6H5C4.17157 5.5 3.5 6.17157 3.5 7V7.5Z" style="fill: var(--automation-device-primary-inverted-color)" style="stroke: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-08-motor-off-horisontal': Obi08MotorOffHorisontal;
  }
}
