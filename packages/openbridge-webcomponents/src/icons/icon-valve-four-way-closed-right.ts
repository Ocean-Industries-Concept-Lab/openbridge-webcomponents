import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-valve-four-way-closed-right')
export class ObiValveFourWayClosedRight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.4006 7.1998C22.0597 6.70549 23.0009 7.17585 23.0012 7.9996V15.9996C23.0012 16.8236 22.0599 17.2947 21.4006 16.8004L16.0676 12.7996C15.5344 12.3996 15.5344 11.5997 16.0677 11.1997L21.4006 7.1998Z" fill="currentColor" stroke="currentColor"/>
<path d="M17.0791 2C17.8881 2 18.3623 2.91047 17.8984 3.57324L13.6808 9.5982C13.5631 9.76629 13.5 9.9665 13.5 10.1717V13.8274C13.5 14.0325 13.5631 14.2327 13.6807 14.4008L17.8984 20.4268C18.3623 21.0895 17.8881 22 17.0791 22H6.9209C6.11191 22 5.63772 21.0895 6.10156 20.4268L10.4117 14.2687C10.4692 14.1866 10.5 14.0888 10.5 13.9886C10.5 13.7187 10.2813 13.5 10.0114 13.5C9.91118 13.5 9.81338 13.5308 9.73126 13.5883L3.57324 17.8984C2.91047 18.3623 2 17.8881 2 17.0791V6.9209C2 6.11191 2.91047 5.63772 3.57324 6.10156L9.73126 10.4117C9.81338 10.4692 9.91118 10.5 10.0114 10.5C10.2813 10.5 10.5 10.2807 10.5 10.0109C10.5 9.91047 10.4691 9.81233 10.4115 9.73008L6.10156 3.57324C5.63771 2.91047 6.11191 2 6.9209 2H17.0791Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.4006 7.1998C22.0597 6.70549 23.0009 7.17585 23.0012 7.9996V15.9996C23.0012 16.8236 22.0599 17.2947 21.4006 16.8004L16.0676 12.7996C15.5344 12.3996 15.5344 11.5997 16.0677 11.1997L21.4006 7.1998Z" style="fill: var(--automation-symbol-off-background-color); stroke: var(--automation-symbol-off-border-color)"/>
<path d="M17.0791 2C17.8881 2 18.3623 2.91047 17.8984 3.57324L13.6808 9.5982C13.5631 9.76629 13.5 9.9665 13.5 10.1717V13.8274C13.5 14.0325 13.5631 14.2327 13.6807 14.4008L17.8984 20.4268C18.3623 21.0895 17.8881 22 17.0791 22H6.9209C6.11191 22 5.63772 21.0895 6.10156 20.4268L10.4117 14.2687C10.4692 14.1866 10.5 14.0888 10.5 13.9886C10.5 13.7187 10.2813 13.5 10.0114 13.5C9.91118 13.5 9.81338 13.5308 9.73126 13.5883L3.57324 17.8984C2.91047 18.3623 2 17.8881 2 17.0791V6.9209C2 6.11191 2.91047 5.63772 3.57324 6.10156L9.73126 10.4117C9.81338 10.4692 9.91118 10.5 10.0114 10.5C10.2813 10.5 10.5 10.2807 10.5 10.0109C10.5 9.91047 10.4691 9.81233 10.4115 9.73008L6.10156 3.57324C5.63771 2.91047 6.11191 2 6.9209 2H17.0791Z" style="fill: var(--automation-symbol-on-background-color); stroke: var(--automation-symbol-on-border-color)"/>
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
    'obi-valve-four-way-closed-right': ObiValveFourWayClosedRight;
  }
}
