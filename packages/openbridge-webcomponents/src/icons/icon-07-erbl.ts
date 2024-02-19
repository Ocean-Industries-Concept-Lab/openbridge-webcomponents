import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-erbl')
export class Obi07Erbl extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.4737 20.4801L19.4767 20.3697C19.4922 20.0907 19.5 19.8096 19.5 19.5264C19.5 19.2432 19.4922 18.962 19.4767 18.6831L21.4737 18.5726C21.4912 18.8883 21.5 19.2063 21.5 19.5264C21.5 19.8464 21.4912 20.1644 21.4737 20.4801ZM21.2623 16.6774C21.1556 16.0451 21.0141 15.4247 20.8396 14.8183L18.9175 15.3711C19.0713 15.9056 19.1961 16.4525 19.2902 17.0101L21.2623 16.6774ZM20.21 13.019L18.3626 13.7851C18.1469 13.265 17.9028 12.7596 17.632 12.2708L19.3816 11.3018C19.6885 11.856 19.9654 12.4291 20.21 13.019ZM12.7246 4.64476L11.7556 6.39434C11.2667 6.12359 10.7613 5.87944 10.2413 5.66379L11.0074 3.81634C11.5973 4.06095 12.1704 4.33783 12.7246 4.64476ZM9.20811 3.18675L8.65528 5.10883C8.12076 4.95509 7.57383 4.83026 7.01625 4.73618L7.34901 2.76405C7.98125 2.87073 8.60163 3.01232 9.20811 3.18675ZM5.45372 2.55267L5.34329 4.54962C5.06436 4.53419 4.7832 4.52637 4.5 4.52637C4.2168 4.52637 3.93564 4.53419 3.65671 4.54962L3.54628 2.55267C3.86197 2.53521 4.17995 2.52637 4.5 2.52637C4.82005 2.52637 5.13803 2.53521 5.45372 2.55267Z" fill="currentColor"/>
<path d="M7 19.5001C7 20.8808 5.88074 22.0001 4.5 22.0001C3.11926 22.0001 2 20.8808 2 19.5001C2 18.1193 3.11926 17.0001 4.5 17.0001C5.88074 17.0001 7 18.1193 7 19.5001Z" fill="currentColor"/>
<path d="M7 15.3138L9.82843 12.4853L11.2426 13.8996L8.41421 16.728L7 15.3138Z" fill="currentColor"/>
<path d="M11.2426 11.0711L14.0711 8.2427L15.4853 9.65692L12.6569 12.4853L11.2426 11.0711Z" fill="currentColor"/>
<path d="M18.3137 4.00006L15.4853 6.82849L16.8995 8.2427L19.7279 5.41428L18.3137 4.00006Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.4737 20.4801L19.4767 20.3697C19.4922 20.0907 19.5 19.8096 19.5 19.5264C19.5 19.2432 19.4922 18.962 19.4767 18.6831L21.4737 18.5726C21.4912 18.8883 21.5 19.2063 21.5 19.5264C21.5 19.8464 21.4912 20.1644 21.4737 20.4801ZM21.2623 16.6774C21.1556 16.0451 21.0141 15.4247 20.8396 14.8183L18.9175 15.3711C19.0713 15.9056 19.1961 16.4525 19.2902 17.0101L21.2623 16.6774ZM20.21 13.019L18.3626 13.7851C18.1469 13.265 17.9028 12.7596 17.632 12.2708L19.3816 11.3018C19.6885 11.856 19.9654 12.4291 20.21 13.019ZM12.7246 4.64476L11.7556 6.39434C11.2667 6.12359 10.7613 5.87944 10.2413 5.66379L11.0074 3.81634C11.5973 4.06095 12.1704 4.33783 12.7246 4.64476ZM9.20811 3.18675L8.65528 5.10883C8.12076 4.95509 7.57383 4.83026 7.01625 4.73618L7.34901 2.76405C7.98125 2.87073 8.60163 3.01232 9.20811 3.18675ZM5.45372 2.55267L5.34329 4.54962C5.06436 4.53419 4.7832 4.52637 4.5 4.52637C4.2168 4.52637 3.93564 4.53419 3.65671 4.54962L3.54628 2.55267C3.86197 2.53521 4.17995 2.52637 4.5 2.52637C4.82005 2.52637 5.13803 2.53521 5.45372 2.55267Z" style="fill: var(--element-active-color)"/>
<path d="M7 19.5001C7 20.8808 5.88074 22.0001 4.5 22.0001C3.11926 22.0001 2 20.8808 2 19.5001C2 18.1193 3.11926 17.0001 4.5 17.0001C5.88074 17.0001 7 18.1193 7 19.5001Z" style="fill: var(--element-active-color)"/>
<path d="M7 15.3138L9.82843 12.4853L11.2426 13.8996L8.41421 16.728L7 15.3138Z" style="fill: var(--element-active-color)"/>
<path d="M11.2426 11.0711L14.0711 8.2427L15.4853 9.65692L12.6569 12.4853L11.2426 11.0711Z" style="fill: var(--element-active-color)"/>
<path d="M18.3137 4.00006L15.4853 6.82849L16.8995 8.2427L19.7279 5.41428L18.3137 4.00006Z" style="fill: var(--element-active-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-07-erbl': Obi07Erbl;
  }
}
