import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-blower-on-horizontal')
export class ObiBlowerOnHorizontal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 9.50012C14.7761 9.50012 15 9.72398 15 10.0001C15 10.2763 14.7761 10.5001 14.5 10.5001L9.5 10.5001C9.22386 10.5001 9 10.2763 9 10.0001C9 9.72398 9.22386 9.50012 9.5 9.50012L14.5 9.50012Z" fill="currentColor"/>
<path d="M14.5 11.5001C14.7761 11.5001 15 11.724 15 12.0001C15 12.2763 14.7761 12.5001 14.5 12.5001H9.5C9.22386 12.5001 9 12.2763 9 12.0001C9 11.724 9.22386 11.5001 9.5 11.5001L14.5 11.5001Z" fill="currentColor"/>
<path d="M15 14.0001C15 13.724 14.7761 13.5001 14.5 13.5001H9.5C9.22386 13.5001 9 13.724 9 14.0001C9 14.2763 9.22386 14.5001 9.5 14.5001H14.5C14.7761 14.5001 15 14.2763 15 14.0001Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 8.33346V5.00012C23 4.44784 22.5523 4.00012 22 4.00012L12.1 4.00012C7.6265 4.00012 4 7.58184 4 12.0001C4 16.4184 7.6265 20.0001 12.1 20.0001C16.5735 20.0001 20.2 16.4184 20.2 12.0001C20.2 11.0651 20.0376 10.1675 19.7391 9.33346H22C22.5523 9.33346 23 8.88574 23 8.33346ZM18.3191 8.33346H22V5.00012L12.1 5.00012C8.16703 5.00012 5 8.1458 5 12.0001C5 15.8544 8.16703 19.0001 12.1 19.0001C16.033 19.0001 19.2 15.8544 19.2 12.0001C19.2 11.1817 19.058 10.398 18.7976 9.6704L18.3191 8.33346Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8.33333H18.3191L18.7976 9.67028C19.058 10.3979 19.2 11.1816 19.2 12C19.2 15.8543 16.033 19 12.1 19C8.16703 19 5 15.8543 5 12C5 8.14568 8.16703 5 12.1 5L22 5V8.33333ZM14.5 9.5C14.7761 9.5 15 9.72386 15 10C15 10.2761 14.7761 10.5 14.5 10.5L9.5 10.5C9.22386 10.5 9 10.2761 9 10C9 9.72386 9.22386 9.5 9.5 9.5L14.5 9.5ZM14.5 11.5C14.7761 11.5 15 11.7239 15 12C15 12.2761 14.7761 12.5 14.5 12.5H9.5C9.22386 12.5 9 12.2761 9 12C9 11.7239 9.22386 11.5 9.5 11.5L14.5 11.5ZM15 14C15 13.7239 14.7761 13.5 14.5 13.5H9.5C9.22386 13.5 9 13.7239 9 14C9 14.2761 9.22386 14.5 9.5 14.5H14.5C14.7761 14.5 15 14.2761 15 14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 9.50012C14.7761 9.50012 15 9.72398 15 10.0001C15 10.2763 14.7761 10.5001 14.5 10.5001L9.5 10.5001C9.22386 10.5001 9 10.2763 9 10.0001C9 9.72398 9.22386 9.50012 9.5 9.50012L14.5 9.50012Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M14.5 11.5001C14.7761 11.5001 15 11.724 15 12.0001C15 12.2763 14.7761 12.5001 14.5 12.5001H9.5C9.22386 12.5001 9 12.2763 9 12.0001C9 11.724 9.22386 11.5001 9.5 11.5001L14.5 11.5001Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M15 14.0001C15 13.724 14.7761 13.5001 14.5 13.5001H9.5C9.22386 13.5001 9 13.724 9 14.0001C9 14.2763 9.22386 14.5001 9.5 14.5001H14.5C14.7761 14.5001 15 14.2763 15 14.0001Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 8.33346V5.00012C23 4.44784 22.5523 4.00012 22 4.00012L12.1 4.00012C7.6265 4.00012 4 7.58184 4 12.0001C4 16.4184 7.6265 20.0001 12.1 20.0001C16.5735 20.0001 20.2 16.4184 20.2 12.0001C20.2 11.0651 20.0376 10.1675 19.7391 9.33346H22C22.5523 9.33346 23 8.88574 23 8.33346ZM18.3191 8.33346H22V5.00012L12.1 5.00012C8.16703 5.00012 5 8.1458 5 12.0001C5 15.8544 8.16703 19.0001 12.1 19.0001C16.033 19.0001 19.2 15.8544 19.2 12.0001C19.2 11.1817 19.058 10.398 18.7976 9.6704L18.3191 8.33346Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8.33333H18.3191L18.7976 9.67028C19.058 10.3979 19.2 11.1816 19.2 12C19.2 15.8543 16.033 19 12.1 19C8.16703 19 5 15.8543 5 12C5 8.14568 8.16703 5 12.1 5L22 5V8.33333ZM14.5 9.5C14.7761 9.5 15 9.72386 15 10C15 10.2761 14.7761 10.5 14.5 10.5L9.5 10.5C9.22386 10.5 9 10.2761 9 10C9 9.72386 9.22386 9.5 9.5 9.5L14.5 9.5ZM14.5 11.5C14.7761 11.5 15 11.7239 15 12C15 12.2761 14.7761 12.5 14.5 12.5H9.5C9.22386 12.5 9 12.2761 9 12C9 11.7239 9.22386 11.5 9.5 11.5L14.5 11.5ZM15 14C15 13.7239 14.7761 13.5 14.5 13.5H9.5C9.22386 13.5 9 13.7239 9 14C9 14.2761 9.22386 14.5 9.5 14.5H14.5C14.7761 14.5 15 14.2761 15 14Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-blower-on-horizontal': ObiBlowerOnHorizontal;
  }
}