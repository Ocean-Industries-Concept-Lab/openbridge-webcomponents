import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-aton-mobile-virtual-iec')
export class ObiAisAtonMobileVirtualIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M1.39339 11.2931L2.10049 12.0002L1.39339 12.7073L0.686279 12.0002L1.39339 11.2931Z" fill="currentColor"/>
<path d="M14.1213 2.80784L15.5355 4.22206L14.8284 4.92916L13.4142 3.51495L14.1213 2.80784Z" fill="currentColor"/>
<path d="M3.51471 13.4144L4.92892 14.8287L4.22181 15.5358L2.8076 14.1216L3.51471 13.4144Z" fill="currentColor"/>
<path d="M16.9497 5.63627L18.3639 7.05048L17.6568 7.75759L16.2426 6.34338L16.9497 5.63627Z" fill="currentColor"/>
<path d="M6.34313 16.2429L7.75735 17.6571L7.05024 18.3642L5.63603 16.95L6.34313 16.2429Z" fill="currentColor"/>
<path d="M19.7782 8.4647L21.1924 9.87891L20.4853 10.586L19.0711 9.1718L19.7782 8.4647Z" fill="currentColor"/>
<path d="M9.17156 19.0713L10.5858 20.4855L9.87867 21.1926L8.46445 19.7784L9.17156 19.0713Z" fill="currentColor"/>
<path d="M12.7071 1.39363L12 2.10074L11.2929 1.39363L12 0.686523L12.7071 1.39363Z" fill="currentColor"/>
<path d="M23.3137 12.0002L22.6066 12.7073L21.8995 12.0002L22.6066 11.2931L23.3137 12.0002Z" fill="currentColor"/>
<path d="M12.7071 22.6068L12 23.3139L11.2929 22.6068L12 21.8997L12.7071 22.6068Z" fill="currentColor"/>
<path d="M10.5858 3.51495L9.17156 4.92916L8.46445 4.22206L9.87867 2.80784L10.5858 3.51495Z" fill="currentColor"/>
<path d="M21.1924 14.1216L19.7782 15.5358L19.0711 14.8287L20.4853 13.4144L21.1924 14.1216Z" fill="currentColor"/>
<path d="M7.75735 6.34338L6.34313 7.75759L5.63603 7.05048L7.05024 5.63627L7.75735 6.34338Z" fill="currentColor"/>
<path d="M18.3639 16.95L16.9497 18.3642L16.2426 17.6571L17.6568 16.2429L18.3639 16.95Z" fill="currentColor"/>
<path d="M4.92892 9.1718L3.51471 10.586L2.8076 9.87891L4.22181 8.4647L4.92892 9.1718Z" fill="currentColor"/>
<path d="M15.5355 19.7784L14.1213 21.1926L13.4142 20.4855L14.8284 19.0713L15.5355 19.7784Z" fill="currentColor"/>
<path d="M17 12.5002V11.5002L6.99999 11.5002V12.5002H17Z" fill="currentColor"/>
<path d="M15.8891 8.81818L15.182 8.11107L8.1109 15.1821L8.81801 15.8892L15.8891 8.81818Z" fill="currentColor"/>
<path d="M15.182 15.8892L15.8891 15.1821L8.81801 8.11107L8.1109 8.81818L15.182 15.8892Z" fill="currentColor"/>
<path d="M11.4999 17.0002H12.4999V7.00023H11.4999V17.0002Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.39339 11.2931L2.10049 12.0002L1.39339 12.7073L0.686279 12.0002L1.39339 11.2931Z" style="fill: var(--element-active-color)"/>
<path d="M14.1213 2.80784L15.5355 4.22206L14.8284 4.92916L13.4142 3.51495L14.1213 2.80784Z" style="fill: var(--element-active-color)"/>
<path d="M3.51471 13.4144L4.92892 14.8287L4.22181 15.5358L2.8076 14.1216L3.51471 13.4144Z" style="fill: var(--element-active-color)"/>
<path d="M16.9497 5.63627L18.3639 7.05048L17.6568 7.75759L16.2426 6.34338L16.9497 5.63627Z" style="fill: var(--element-active-color)"/>
<path d="M6.34313 16.2429L7.75735 17.6571L7.05024 18.3642L5.63603 16.95L6.34313 16.2429Z" style="fill: var(--element-active-color)"/>
<path d="M19.7782 8.4647L21.1924 9.87891L20.4853 10.586L19.0711 9.1718L19.7782 8.4647Z" style="fill: var(--element-active-color)"/>
<path d="M9.17156 19.0713L10.5858 20.4855L9.87867 21.1926L8.46445 19.7784L9.17156 19.0713Z" style="fill: var(--element-active-color)"/>
<path d="M12.7071 1.39363L12 2.10074L11.2929 1.39363L12 0.686523L12.7071 1.39363Z" style="fill: var(--element-active-color)"/>
<path d="M23.3137 12.0002L22.6066 12.7073L21.8995 12.0002L22.6066 11.2931L23.3137 12.0002Z" style="fill: var(--element-active-color)"/>
<path d="M12.7071 22.6068L12 23.3139L11.2929 22.6068L12 21.8997L12.7071 22.6068Z" style="fill: var(--element-active-color)"/>
<path d="M10.5858 3.51495L9.17156 4.92916L8.46445 4.22206L9.87867 2.80784L10.5858 3.51495Z" style="fill: var(--element-active-color)"/>
<path d="M21.1924 14.1216L19.7782 15.5358L19.0711 14.8287L20.4853 13.4144L21.1924 14.1216Z" style="fill: var(--element-active-color)"/>
<path d="M7.75735 6.34338L6.34313 7.75759L5.63603 7.05048L7.05024 5.63627L7.75735 6.34338Z" style="fill: var(--element-active-color)"/>
<path d="M18.3639 16.95L16.9497 18.3642L16.2426 17.6571L17.6568 16.2429L18.3639 16.95Z" style="fill: var(--element-active-color)"/>
<path d="M4.92892 9.1718L3.51471 10.586L2.8076 9.87891L4.22181 8.4647L4.92892 9.1718Z" style="fill: var(--element-active-color)"/>
<path d="M15.5355 19.7784L14.1213 21.1926L13.4142 20.4855L14.8284 19.0713L15.5355 19.7784Z" style="fill: var(--element-active-color)"/>
<path d="M17 12.5002V11.5002L6.99999 11.5002V12.5002H17Z" style="fill: var(--element-active-color)"/>
<path d="M15.8891 8.81818L15.182 8.11107L8.1109 15.1821L8.81801 15.8892L15.8891 8.81818Z" style="fill: var(--element-active-color)"/>
<path d="M15.182 15.8892L15.8891 15.1821L8.81801 8.11107L8.1109 8.81818L15.182 15.8892Z" style="fill: var(--element-active-color)"/>
<path d="M11.4999 17.0002H12.4999V7.00023H11.4999V17.0002Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-aton-mobile-virtual-iec': ObiAisAtonMobileVirtualIec;
  }
}