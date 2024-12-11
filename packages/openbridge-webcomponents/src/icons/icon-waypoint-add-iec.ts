import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-waypoint-add-iec')
export class ObiWaypointAddIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.99997 9.00022C8.10454 9.00022 8.99997 8.10479 8.99997 7.00022C8.99997 5.89565 8.10454 5.00022 6.99997 5.00022C5.8954 5.00022 4.99997 5.89565 4.99997 7.00022C4.99997 8.10479 5.8954 9.00022 6.99997 9.00022ZM6.99997 11.0002C9.20911 11.0002 11 9.20936 11 7.00022C11 4.79108 9.20911 3.00022 6.99997 3.00022C4.79084 3.00022 2.99997 4.79108 2.99997 7.00022C2.99997 9.20936 4.79084 11.0002 6.99997 11.0002Z" fill="currentColor"/>
<path d="M4.48113 12.537L6.41299 13.0546L5.89535 14.9864L3.9635 14.4688L4.48113 12.537Z" fill="currentColor"/>
<path d="M3.44586 16.4007L5.37771 16.9183L4.86007 18.8502L2.92822 18.3325L3.44586 16.4007Z" fill="currentColor"/>
<path d="M2.41058 20.2644L4.34243 20.782L3.8248 22.7139L1.89294 22.1962L2.41058 20.2644Z" fill="currentColor"/>
<path d="M13.0548 6.41311L12.5372 4.48126L14.469 3.96362L14.9867 5.89547L13.0548 6.41311Z" fill="currentColor"/>
<path d="M16.9185 5.37783L16.4009 3.44598L18.3327 2.92834L18.8504 4.86019L16.9185 5.37783Z" fill="currentColor"/>
<path d="M20.7822 4.34256L20.2646 2.4107L22.1964 1.89307L22.7141 3.82492L20.7822 4.34256Z" fill="currentColor"/>
<path d="M17 10.0002H15V15.0002H9.99997V17.0002H15V22.0002H17V17.0002H22V15.0002H17V10.0002Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.99997 9.00022C8.10454 9.00022 8.99997 8.10479 8.99997 7.00022C8.99997 5.89565 8.10454 5.00022 6.99997 5.00022C5.8954 5.00022 4.99997 5.89565 4.99997 7.00022C4.99997 8.10479 5.8954 9.00022 6.99997 9.00022ZM6.99997 11.0002C9.20911 11.0002 11 9.20936 11 7.00022C11 4.79108 9.20911 3.00022 6.99997 3.00022C4.79084 3.00022 2.99997 4.79108 2.99997 7.00022C2.99997 9.20936 4.79084 11.0002 6.99997 11.0002Z" style="fill: var(--element-active-color)"/>
<path d="M4.48113 12.537L6.41299 13.0546L5.89535 14.9864L3.9635 14.4688L4.48113 12.537Z" style="fill: var(--element-active-color)"/>
<path d="M3.44586 16.4007L5.37771 16.9183L4.86007 18.8502L2.92822 18.3325L3.44586 16.4007Z" style="fill: var(--element-active-color)"/>
<path d="M2.41058 20.2644L4.34243 20.782L3.8248 22.7139L1.89294 22.1962L2.41058 20.2644Z" style="fill: var(--element-active-color)"/>
<path d="M13.0548 6.41311L12.5372 4.48126L14.469 3.96362L14.9867 5.89547L13.0548 6.41311Z" style="fill: var(--element-active-color)"/>
<path d="M16.9185 5.37783L16.4009 3.44598L18.3327 2.92834L18.8504 4.86019L16.9185 5.37783Z" style="fill: var(--element-active-color)"/>
<path d="M20.7822 4.34256L20.2646 2.4107L22.1964 1.89307L22.7141 3.82492L20.7822 4.34256Z" style="fill: var(--element-active-color)"/>
<path d="M17 10.0002H15V15.0002H9.99997V17.0002H15V22.0002H17V17.0002H22V15.0002H17V10.0002Z" style="fill: var(--element-active-color)"/>
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
    'obi-waypoint-add-iec': ObiWaypointAddIec;
  }
}