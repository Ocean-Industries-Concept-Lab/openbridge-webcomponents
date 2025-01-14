import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-aton-virtual-iec')
export class ObiAisAtonVirtualIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0002 2.10049L12.7073 1.39339L12.0002 0.686279L11.2931 1.39339L12.0002 2.10049Z" fill="currentColor"/>
<path d="M14.8287 4.92892L15.5358 4.22181L14.1216 2.8076L13.4144 3.51471L14.8287 4.92892Z" fill="currentColor"/>
<path d="M2.10074 12L1.39363 11.2929L0.686523 12L1.39363 12.7071L2.10074 12Z" fill="currentColor"/>
<path d="M4.92916 14.8284L4.22206 15.5355L2.80784 14.1213L3.51495 13.4142L4.92916 14.8284Z" fill="currentColor"/>
<path d="M18.3642 7.05024L16.95 5.63603L16.2429 6.34313L17.6571 7.75735L18.3642 7.05024Z" fill="currentColor"/>
<path d="M7.75759 17.6568L7.05048 18.3639L5.63627 16.9497L6.34338 16.2426L7.75759 17.6568Z" fill="currentColor"/>
<path d="M21.1926 9.87867L19.7784 8.46445L19.0713 9.17156L20.4855 10.5858L21.1926 9.87867Z" fill="currentColor"/>
<path d="M10.586 20.4853L9.87891 21.1924L8.4647 19.7782L9.1718 19.0711L10.586 20.4853Z" fill="currentColor"/>
<path d="M23.3139 12L22.6068 12.7071L21.8997 12L22.6068 11.2929L23.3139 12Z" fill="currentColor"/>
<path d="M12.0002 23.3137L12.7073 22.6066L12.0002 21.8995L11.2931 22.6066L12.0002 23.3137Z" fill="currentColor"/>
<path d="M10.586 3.51471L9.1718 4.92892L8.4647 4.22181L9.87891 2.8076L10.586 3.51471Z" fill="currentColor"/>
<path d="M19.0713 14.8284L19.7784 15.5355L21.1926 14.1213L20.4855 13.4142L19.0713 14.8284Z" fill="currentColor"/>
<path d="M7.75759 6.34313L6.34338 7.75735L5.63627 7.05024L7.05048 5.63603L7.75759 6.34313Z" fill="currentColor"/>
<path d="M16.2429 17.6568L16.95 18.3639L18.3642 16.9497L17.6571 16.2426L16.2429 17.6568Z" fill="currentColor"/>
<path d="M4.92916 9.17156L3.51495 10.5858L2.80784 9.87867L4.22206 8.46445L4.92916 9.17156Z" fill="currentColor"/>
<path d="M13.4144 20.4853L14.1216 21.1924L15.5358 19.7782L14.8287 19.0711L13.4144 20.4853Z" fill="currentColor"/>
<path d="M11.5002 16V12.5H8.00023V11.5H11.5002V8H12.5002V11.5H16.0002V12.5H12.5002V16H11.5002Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0002 2.10049L12.7073 1.39339L12.0002 0.686279L11.2931 1.39339L12.0002 2.10049Z" style="fill: var(--element-active-color)"/>
<path d="M14.8287 4.92892L15.5358 4.22181L14.1216 2.8076L13.4144 3.51471L14.8287 4.92892Z" style="fill: var(--element-active-color)"/>
<path d="M2.10074 12L1.39363 11.2929L0.686523 12L1.39363 12.7071L2.10074 12Z" style="fill: var(--element-active-color)"/>
<path d="M4.92916 14.8284L4.22206 15.5355L2.80784 14.1213L3.51495 13.4142L4.92916 14.8284Z" style="fill: var(--element-active-color)"/>
<path d="M18.3642 7.05024L16.95 5.63603L16.2429 6.34313L17.6571 7.75735L18.3642 7.05024Z" style="fill: var(--element-active-color)"/>
<path d="M7.75759 17.6568L7.05048 18.3639L5.63627 16.9497L6.34338 16.2426L7.75759 17.6568Z" style="fill: var(--element-active-color)"/>
<path d="M21.1926 9.87867L19.7784 8.46445L19.0713 9.17156L20.4855 10.5858L21.1926 9.87867Z" style="fill: var(--element-active-color)"/>
<path d="M10.586 20.4853L9.87891 21.1924L8.4647 19.7782L9.1718 19.0711L10.586 20.4853Z" style="fill: var(--element-active-color)"/>
<path d="M23.3139 12L22.6068 12.7071L21.8997 12L22.6068 11.2929L23.3139 12Z" style="fill: var(--element-active-color)"/>
<path d="M12.0002 23.3137L12.7073 22.6066L12.0002 21.8995L11.2931 22.6066L12.0002 23.3137Z" style="fill: var(--element-active-color)"/>
<path d="M10.586 3.51471L9.1718 4.92892L8.4647 4.22181L9.87891 2.8076L10.586 3.51471Z" style="fill: var(--element-active-color)"/>
<path d="M19.0713 14.8284L19.7784 15.5355L21.1926 14.1213L20.4855 13.4142L19.0713 14.8284Z" style="fill: var(--element-active-color)"/>
<path d="M7.75759 6.34313L6.34338 7.75735L5.63627 7.05024L7.05048 5.63603L7.75759 6.34313Z" style="fill: var(--element-active-color)"/>
<path d="M16.2429 17.6568L16.95 18.3639L18.3642 16.9497L17.6571 16.2426L16.2429 17.6568Z" style="fill: var(--element-active-color)"/>
<path d="M4.92916 9.17156L3.51495 10.5858L2.80784 9.87867L4.22206 8.46445L4.92916 9.17156Z" style="fill: var(--element-active-color)"/>
<path d="M13.4144 20.4853L14.1216 21.1924L15.5358 19.7782L14.8287 19.0711L13.4144 20.4853Z" style="fill: var(--element-active-color)"/>
<path d="M11.5002 16V12.5H8.00023V11.5H11.5002V8H12.5002V11.5H16.0002V12.5H12.5002V16H11.5002Z" style="fill: var(--element-active-color)"/>
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