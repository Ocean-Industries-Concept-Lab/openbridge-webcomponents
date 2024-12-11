import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-aton-virtual-iec')
export class ObiAisAtonVirtualIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2.10074L12.7071 1.39363L12 0.686523L11.2929 1.39363L12 2.10074Z" fill="currentColor"/>
<path d="M14.8284 4.92916L15.5355 4.22206L14.1213 2.80784L13.4142 3.51495L14.8284 4.92916Z" fill="currentColor"/>
<path d="M2.10049 12.0002L1.39339 11.2931L0.686279 12.0002L1.39339 12.7073L2.10049 12.0002Z" fill="currentColor"/>
<path d="M4.92892 14.8287L4.22181 15.5358L2.8076 14.1216L3.51471 13.4144L4.92892 14.8287Z" fill="currentColor"/>
<path d="M18.3639 7.05048L16.9497 5.63627L16.2426 6.34338L17.6568 7.75759L18.3639 7.05048Z" fill="currentColor"/>
<path d="M7.75735 17.6571L7.05024 18.3642L5.63603 16.95L6.34313 16.2429L7.75735 17.6571Z" fill="currentColor"/>
<path d="M21.1924 9.87891L19.7782 8.4647L19.0711 9.1718L20.4853 10.586L21.1924 9.87891Z" fill="currentColor"/>
<path d="M10.5858 20.4855L9.87867 21.1926L8.46445 19.7784L9.17156 19.0713L10.5858 20.4855Z" fill="currentColor"/>
<path d="M23.3137 12.0002L22.6066 12.7073L21.8995 12.0002L22.6066 11.2931L23.3137 12.0002Z" fill="currentColor"/>
<path d="M12 23.3139L12.7071 22.6068L12 21.8997L11.2929 22.6068L12 23.3139Z" fill="currentColor"/>
<path d="M10.5858 3.51495L9.17156 4.92916L8.46445 4.22206L9.87867 2.80784L10.5858 3.51495Z" fill="currentColor"/>
<path d="M19.0711 14.8287L19.7782 15.5358L21.1924 14.1216L20.4853 13.4144L19.0711 14.8287Z" fill="currentColor"/>
<path d="M7.75735 6.34338L6.34313 7.75759L5.63603 7.05048L7.05024 5.63627L7.75735 6.34338Z" fill="currentColor"/>
<path d="M16.2426 17.6571L16.9497 18.3642L18.3639 16.95L17.6568 16.2429L16.2426 17.6571Z" fill="currentColor"/>
<path d="M4.92892 9.1718L3.51471 10.586L2.8076 9.87891L4.22181 8.4647L4.92892 9.1718Z" fill="currentColor"/>
<path d="M13.4142 20.4855L14.1213 21.1926L15.5355 19.7784L14.8284 19.0713L13.4142 20.4855Z" fill="currentColor"/>
<path d="M11.5 16.0002V12.5002H7.99999V11.5002H11.5V8.00024H12.5V11.5002H16V12.5002H12.5V16.0002H11.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2.10074L12.7071 1.39363L12 0.686523L11.2929 1.39363L12 2.10074Z" style="fill: var(--element-active-color)"/>
<path d="M14.8284 4.92916L15.5355 4.22206L14.1213 2.80784L13.4142 3.51495L14.8284 4.92916Z" style="fill: var(--element-active-color)"/>
<path d="M2.10049 12.0002L1.39339 11.2931L0.686279 12.0002L1.39339 12.7073L2.10049 12.0002Z" style="fill: var(--element-active-color)"/>
<path d="M4.92892 14.8287L4.22181 15.5358L2.8076 14.1216L3.51471 13.4144L4.92892 14.8287Z" style="fill: var(--element-active-color)"/>
<path d="M18.3639 7.05048L16.9497 5.63627L16.2426 6.34338L17.6568 7.75759L18.3639 7.05048Z" style="fill: var(--element-active-color)"/>
<path d="M7.75735 17.6571L7.05024 18.3642L5.63603 16.95L6.34313 16.2429L7.75735 17.6571Z" style="fill: var(--element-active-color)"/>
<path d="M21.1924 9.87891L19.7782 8.4647L19.0711 9.1718L20.4853 10.586L21.1924 9.87891Z" style="fill: var(--element-active-color)"/>
<path d="M10.5858 20.4855L9.87867 21.1926L8.46445 19.7784L9.17156 19.0713L10.5858 20.4855Z" style="fill: var(--element-active-color)"/>
<path d="M23.3137 12.0002L22.6066 12.7073L21.8995 12.0002L22.6066 11.2931L23.3137 12.0002Z" style="fill: var(--element-active-color)"/>
<path d="M12 23.3139L12.7071 22.6068L12 21.8997L11.2929 22.6068L12 23.3139Z" style="fill: var(--element-active-color)"/>
<path d="M10.5858 3.51495L9.17156 4.92916L8.46445 4.22206L9.87867 2.80784L10.5858 3.51495Z" style="fill: var(--element-active-color)"/>
<path d="M19.0711 14.8287L19.7782 15.5358L21.1924 14.1216L20.4853 13.4144L19.0711 14.8287Z" style="fill: var(--element-active-color)"/>
<path d="M7.75735 6.34338L6.34313 7.75759L5.63603 7.05048L7.05024 5.63627L7.75735 6.34338Z" style="fill: var(--element-active-color)"/>
<path d="M16.2426 17.6571L16.9497 18.3642L18.3639 16.95L17.6568 16.2429L16.2426 17.6571Z" style="fill: var(--element-active-color)"/>
<path d="M4.92892 9.1718L3.51471 10.586L2.8076 9.87891L4.22181 8.4647L4.92892 9.1718Z" style="fill: var(--element-active-color)"/>
<path d="M13.4142 20.4855L14.1213 21.1926L15.5355 19.7784L14.8284 19.0713L13.4142 20.4855Z" style="fill: var(--element-active-color)"/>
<path d="M11.5 16.0002V12.5002H7.99999V11.5002H11.5V8.00024H12.5V11.5002H16V12.5002H12.5V16.0002H11.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-aton-virtual-iec': ObiAisAtonVirtualIec;
  }
}