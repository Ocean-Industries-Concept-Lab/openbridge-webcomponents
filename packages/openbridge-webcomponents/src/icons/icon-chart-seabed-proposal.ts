import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-seabed-proposal')
export class ObiChartSeabedProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 14.5H2V12.5H22V14.5Z" fill="currentColor"/>
<path d="M5 17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17C3 16.4477 3.44772 16 4 16C4.55228 16 5 16.4477 5 17Z" fill="currentColor"/>
<path d="M9 17C9 17.5523 8.55228 18 8 18C7.44772 18 7 17.5523 7 17C7 16.4477 7.44772 16 8 16C8.55228 16 9 16.4477 9 17Z" fill="currentColor"/>
<path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="currentColor"/>
<path d="M17 17C17 17.5523 16.5523 18 16 18C15.4477 18 15 17.5523 15 17C15 16.4477 15.4477 16 16 16C16.5523 16 17 16.4477 17 17Z" fill="currentColor"/>
<path d="M21 17C21 17.5523 20.5523 18 20 18C19.4477 18 19 17.5523 19 17C19 16.4477 19.4477 16 20 16C20.5523 16 21 16.4477 21 17Z" fill="currentColor"/>
<path d="M7 20C7 20.5523 6.55228 21 6 21C5.44772 21 5 20.5523 5 20C5 19.4477 5.44772 19 6 19C6.55228 19 7 19.4477 7 20Z" fill="currentColor"/>
<path d="M11 20C11 20.5523 10.5523 21 10 21C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19C10.5523 19 11 19.4477 11 20Z" fill="currentColor"/>
<path d="M15 20C15 20.5523 14.5523 21 14 21C13.4477 21 13 20.5523 13 20C13 19.4477 13.4477 19 14 19C14.5523 19 15 19.4477 15 20Z" fill="currentColor"/>
<path d="M19 20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20C17 19.4477 17.4477 19 18 19C18.5523 19 19 19.4477 19 20Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.58291 2.81348C7.85211 3.09867 8.10922 3.39366 8.40666 3.64972C9.39829 4.50337 10.6731 5.12535 12 5.12535C13.3269 5.12535 14.6017 4.50337 15.5933 3.64972C15.8908 3.39366 16.1479 3.09867 16.4171 2.81348C16.7489 3.07895 17.0696 3.3493 17.4229 3.5848C18.7658 4.4801 20.3708 5.12535 22 5.12535V6.87535C20.0688 6.87535 18.1743 6.15916 16.5672 5.11655C15.2832 6.16303 13.6748 6.87535 12 6.87535C10.3252 6.87535 8.7168 6.16303 7.4328 5.11656C5.82574 6.15916 3.93116 6.87535 2 6.87535V5.12535C3.6292 5.12535 5.23419 4.4801 6.57714 3.5848C6.93011 3.34949 7.25151 3.07859 7.58291 2.81348Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 14.5H2V12.5H22V14.5Z" style="fill: var(--element-active-color)"/>
<path d="M5 17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17C3 16.4477 3.44772 16 4 16C4.55228 16 5 16.4477 5 17Z" style="fill: var(--element-active-color)"/>
<path d="M9 17C9 17.5523 8.55228 18 8 18C7.44772 18 7 17.5523 7 17C7 16.4477 7.44772 16 8 16C8.55228 16 9 16.4477 9 17Z" style="fill: var(--element-active-color)"/>
<path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" style="fill: var(--element-active-color)"/>
<path d="M17 17C17 17.5523 16.5523 18 16 18C15.4477 18 15 17.5523 15 17C15 16.4477 15.4477 16 16 16C16.5523 16 17 16.4477 17 17Z" style="fill: var(--element-active-color)"/>
<path d="M21 17C21 17.5523 20.5523 18 20 18C19.4477 18 19 17.5523 19 17C19 16.4477 19.4477 16 20 16C20.5523 16 21 16.4477 21 17Z" style="fill: var(--element-active-color)"/>
<path d="M7 20C7 20.5523 6.55228 21 6 21C5.44772 21 5 20.5523 5 20C5 19.4477 5.44772 19 6 19C6.55228 19 7 19.4477 7 20Z" style="fill: var(--element-active-color)"/>
<path d="M11 20C11 20.5523 10.5523 21 10 21C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19C10.5523 19 11 19.4477 11 20Z" style="fill: var(--element-active-color)"/>
<path d="M15 20C15 20.5523 14.5523 21 14 21C13.4477 21 13 20.5523 13 20C13 19.4477 13.4477 19 14 19C14.5523 19 15 19.4477 15 20Z" style="fill: var(--element-active-color)"/>
<path d="M19 20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20C17 19.4477 17.4477 19 18 19C18.5523 19 19 19.4477 19 20Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.58291 2.81348C7.85211 3.09867 8.10922 3.39366 8.40666 3.64972C9.39829 4.50337 10.6731 5.12535 12 5.12535C13.3269 5.12535 14.6017 4.50337 15.5933 3.64972C15.8908 3.39366 16.1479 3.09867 16.4171 2.81348C16.7489 3.07895 17.0696 3.3493 17.4229 3.5848C18.7658 4.4801 20.3708 5.12535 22 5.12535V6.87535C20.0688 6.87535 18.1743 6.15916 16.5672 5.11655C15.2832 6.16303 13.6748 6.87535 12 6.87535C10.3252 6.87535 8.7168 6.16303 7.4328 5.11656C5.82574 6.15916 3.93116 6.87535 2 6.87535V5.12535C3.6292 5.12535 5.23419 4.4801 6.57714 3.5848C6.93011 3.34949 7.25151 3.07859 7.58291 2.81348Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-seabed-proposal': ObiChartSeabedProposal;
  }
}
