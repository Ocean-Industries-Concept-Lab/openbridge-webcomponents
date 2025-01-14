import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cursor-delete')
export class ObiCursorDelete extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="33" height="32" viewBox="0 0 33 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2144_1044)">
<path d="M15.5811 10.0001V9.00008H23.5811V10.0001H28.5811V14.0001H27.5811V26.0001C27.5811 26.8174 27.2785 27.542 26.7007 28.1197C26.123 28.6974 25.3985 29.0001 24.5811 29.0001H14.5811C13.7638 29.0001 13.0392 28.6974 12.4615 28.1197C11.8838 27.542 11.5811 26.8174 11.5811 26.0001V14.0001H10.5811V10.0001H15.5811Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58114 17.1624L1 0.418945L17.7434 6.00008L9.37171 8.79065L6.58114 17.1624Z" fill="currentColor"/>
</g>
<path d="M6.58105 14L2.58105 2L14.5811 6L8.58105 8L6.58105 14Z" fill="currentColor"/>
<path d="M16.9811 23.5L19.5811 20.9L22.1811 23.5L23.5811 22.1L20.9811 19.5L23.5811 16.9L22.1811 15.5L19.5811 18.1L16.9811 15.5L15.5811 16.9L18.1811 19.5L15.5811 22.1L16.9811 23.5ZM14.5811 28C14.0311 28 13.5602 27.8042 13.1686 27.4125C12.7769 27.0208 12.5811 26.55 12.5811 26V13H11.5811V11H16.5811V10H22.5811V11H27.5811V13H26.5811V26C26.5811 26.55 26.3852 27.0208 25.9936 27.4125C25.6019 27.8042 25.1311 28 24.5811 28H14.5811ZM24.5811 13H14.5811V26H24.5811V13Z" fill="currentColor"/>
<defs>
<filter id="filter0_d_2144_1044" x="0" y="0.418945" width="29.5811" height="30.5812" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2144_1044"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2144_1044" result="shape"/>
</filter>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2144_1044)">
<path d="M15.5811 10.0001V9.00008H23.5811V10.0001H28.5811V14.0001H27.5811V26.0001C27.5811 26.8174 27.2785 27.542 26.7007 28.1197C26.123 28.6974 25.3985 29.0001 24.5811 29.0001H14.5811C13.7638 29.0001 13.0392 28.6974 12.4615 28.1197C11.8838 27.542 11.5811 26.8174 11.5811 26.0001V14.0001H10.5811V10.0001H15.5811Z" style="fill: var(--element-active-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58114 17.1624L1 0.418945L17.7434 6.00008L9.37171 8.79065L6.58114 17.1624Z" style="fill: var(--element-active-inverted-color)"/>
</g>
<path d="M6.58105 14L2.58105 2L14.5811 6L8.58105 8L6.58105 14Z" style="fill: var(--element-active-color)"/>
<path d="M16.9811 23.5L19.5811 20.9L22.1811 23.5L23.5811 22.1L20.9811 19.5L23.5811 16.9L22.1811 15.5L19.5811 18.1L16.9811 15.5L15.5811 16.9L18.1811 19.5L15.5811 22.1L16.9811 23.5ZM14.5811 28C14.0311 28 13.5602 27.8042 13.1686 27.4125C12.7769 27.0208 12.5811 26.55 12.5811 26V13H11.5811V11H16.5811V10H22.5811V11H27.5811V13H26.5811V26C26.5811 26.55 26.3852 27.0208 25.9936 27.4125C25.6019 27.8042 25.1311 28 24.5811 28H14.5811ZM24.5811 13H14.5811V26H24.5811V13Z" style="fill: var(--element-active-color)"/>
<defs>
<filter id="filter0_d_2144_1044" x="0" y="0.418945" width="29.5811" height="30.5812" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2144_1044"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2144_1044" result="shape"/>
</filter>
</defs>
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
    'obi-cursor-delete': ObiCursorDelete;
  }
}