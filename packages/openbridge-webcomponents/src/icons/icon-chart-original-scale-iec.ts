import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-original-scale-iec')
export class ObiChartOriginalScaleIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.43855 15.9999H5.72255V10.9239C5.72255 10.7799 5.72255 10.6119 5.72255 10.4199C5.73055 10.2199 5.73855 10.0159 5.74655 9.80788C5.75455 9.59988 5.76255 9.41188 5.77055 9.24388C5.72255 9.30788 5.63055 9.39988 5.49455 9.51988C5.36655 9.63988 5.24655 9.74788 5.13455 9.84389L4.15055 10.6359L3.31055 9.57989L6.02255 7.43188H7.43855V15.9999Z" fill="currentColor"/>
<path d="M19.4385 15.9999H17.7225V10.9239C17.7225 10.7799 17.7225 10.6119 17.7225 10.4199C17.7305 10.2199 17.7385 10.0159 17.7465 9.80788C17.7545 9.59988 17.7625 9.41188 17.7705 9.24388C17.7225 9.30788 17.6305 9.39988 17.4945 9.51988C17.3665 9.63988 17.2465 9.74788 17.1345 9.84389L16.1505 10.6359L15.3105 9.57989L18.0225 7.43188H19.4385V15.9999Z" fill="currentColor"/>
<path d="M11.0001 8.99989H13.0001V10.9999H11.0001V8.99989Z" fill="currentColor"/>
<path d="M11.0001 12.9999H13.0001V14.9999H11.0001V12.9999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.43855 15.9999H5.72255V10.9239C5.72255 10.7799 5.72255 10.6119 5.72255 10.4199C5.73055 10.2199 5.73855 10.0159 5.74655 9.80788C5.75455 9.59988 5.76255 9.41188 5.77055 9.24388C5.72255 9.30788 5.63055 9.39988 5.49455 9.51988C5.36655 9.63988 5.24655 9.74788 5.13455 9.84389L4.15055 10.6359L3.31055 9.57989L6.02255 7.43188H7.43855V15.9999Z" style="fill: var(--element-active-color)"/>
<path d="M19.4385 15.9999H17.7225V10.9239C17.7225 10.7799 17.7225 10.6119 17.7225 10.4199C17.7305 10.2199 17.7385 10.0159 17.7465 9.80788C17.7545 9.59988 17.7625 9.41188 17.7705 9.24388C17.7225 9.30788 17.6305 9.39988 17.4945 9.51988C17.3665 9.63988 17.2465 9.74788 17.1345 9.84389L16.1505 10.6359L15.3105 9.57989L18.0225 7.43188H19.4385V15.9999Z" style="fill: var(--element-active-color)"/>
<path d="M11.0001 8.99989H13.0001V10.9999H11.0001V8.99989Z" style="fill: var(--element-active-color)"/>
<path d="M11.0001 12.9999H13.0001V14.9999H11.0001V12.9999Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-original-scale-iec': ObiChartOriginalScaleIec;
  }
}
