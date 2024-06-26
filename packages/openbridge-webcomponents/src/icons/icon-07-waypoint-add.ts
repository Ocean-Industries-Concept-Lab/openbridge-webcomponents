import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-waypoint-add')
export class Obi07WaypointAdd extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M21.2862 4.16291L22.1925 3.94416L21.7232 2L20.8169 2.21875L21.2862 4.16291Z" fill="currentColor"/>
<path d="M17.6612 5.03791L19.4737 4.60041L19.0044 2.65625L17.1919 3.09375L17.6612 5.03791Z" fill="currentColor"/>
<path d="M14.0362 5.91291L15.8487 5.47541L15.3794 3.53125L13.5669 3.96875L14.0362 5.91291Z" fill="currentColor"/>
<path d="M10.4112 6.78791L12.2237 6.35041L11.7544 4.40625L9.94194 4.84375L10.4112 6.78791Z" fill="currentColor"/>
<path d="M7.0094 11.4469L7.5719 9.57193L5.65625 8.99723L5.09375 10.8722L7.0094 11.4469Z" fill="currentColor"/>
<path d="M5.8844 15.1969L6.4469 13.3219L4.53125 12.7472L3.96875 14.6222L5.8844 15.1969Z" fill="currentColor"/>
<path d="M4.7594 18.9469L5.3219 17.0719L3.40625 16.4972L2.84375 18.3722L4.7594 18.9469Z" fill="currentColor"/>
<path d="M3.91565 21.7594L4.1969 20.8219L2.28125 20.2472L2 21.1847L3.91565 21.7594Z" fill="currentColor"/>
<path d="M9.5 6.5C9.5 7.60457 8.60457 8.5 7.5 8.5C6.39543 8.5 5.5 7.60457 5.5 6.5C5.5 5.39543 6.39543 4.5 7.5 4.5C8.60457 4.5 9.5 5.39543 9.5 6.5Z" fill="currentColor"/>
<path d="M14.5 16V20.5H16.5V16H21V14H16.5V9.5H14.5V14H10V16H14.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.2862 4.16291L22.1925 3.94416L21.7232 2L20.8169 2.21875L21.2862 4.16291Z" style="fill: var(--element-active-color)"/>
<path d="M17.6612 5.03791L19.4737 4.60041L19.0044 2.65625L17.1919 3.09375L17.6612 5.03791Z" style="fill: var(--element-active-color)"/>
<path d="M14.0362 5.91291L15.8487 5.47541L15.3794 3.53125L13.5669 3.96875L14.0362 5.91291Z" style="fill: var(--element-active-color)"/>
<path d="M10.4112 6.78791L12.2237 6.35041L11.7544 4.40625L9.94194 4.84375L10.4112 6.78791Z" style="fill: var(--element-active-color)"/>
<path d="M7.0094 11.4469L7.5719 9.57193L5.65625 8.99723L5.09375 10.8722L7.0094 11.4469Z" style="fill: var(--element-active-color)"/>
<path d="M5.8844 15.1969L6.4469 13.3219L4.53125 12.7472L3.96875 14.6222L5.8844 15.1969Z" style="fill: var(--element-active-color)"/>
<path d="M4.7594 18.9469L5.3219 17.0719L3.40625 16.4972L2.84375 18.3722L4.7594 18.9469Z" style="fill: var(--element-active-color)"/>
<path d="M3.91565 21.7594L4.1969 20.8219L2.28125 20.2472L2 21.1847L3.91565 21.7594Z" style="fill: var(--element-active-color)"/>
<path d="M9.5 6.5C9.5 7.60457 8.60457 8.5 7.5 8.5C6.39543 8.5 5.5 7.60457 5.5 6.5C5.5 5.39543 6.39543 4.5 7.5 4.5C8.60457 4.5 9.5 5.39543 9.5 6.5Z" style="fill: var(--element-active-color)"/>
<path d="M14.5 16V20.5H16.5V16H21V14H16.5V9.5H14.5V14H10V16H14.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-waypoint-add': Obi07WaypointAdd;
  }
}
