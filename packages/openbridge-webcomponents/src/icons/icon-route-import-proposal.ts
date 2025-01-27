import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-route-import-proposal')
export class ObiRouteImportProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.60703 8.60716C7.7116 8.60716 8.60703 7.71173 8.60703 6.60716C8.60703 5.50259 7.7116 4.60716 6.60703 4.60716C5.50246 4.60716 4.60703 5.50259 4.60703 6.60716C4.60703 7.71173 5.50246 8.60716 6.60703 8.60716ZM6.60703 10.6072C8.81617 10.6072 10.607 8.8163 10.607 6.60716C10.607 4.39802 8.81617 2.60716 6.60703 2.60716C4.39789 2.60716 2.60703 4.39802 2.60703 6.60716C2.60703 8.8163 4.39789 10.6072 6.60703 10.6072Z" fill="currentColor"/>
<path d="M4.08819 12.1439L6.02004 12.6615L5.5024 14.5934L3.57055 14.0757L4.08819 12.1439Z" fill="currentColor"/>
<path d="M3.05291 16.0076L4.98477 16.5252L4.46713 18.4571L2.53528 17.9394L3.05291 16.0076Z" fill="currentColor"/>
<path d="M2.01764 19.8713L3.94949 20.3889L3.43185 22.3208L1.5 21.8032L2.01764 19.8713Z" fill="currentColor"/>
<path d="M12.6619 6.02004L12.1442 4.08819L14.0761 3.57055L14.5937 5.5024L12.6619 6.02004Z" fill="currentColor"/>
<path d="M16.5256 4.98477L16.0079 3.05291L17.9398 2.53528L18.4574 4.46713L16.5256 4.98477Z" fill="currentColor"/>
<path d="M20.3893 3.94949L19.8716 2.01764L21.8035 1.5L22.3211 3.43185L20.3893 3.94949Z" fill="currentColor"/>
<path d="M22.9996 15.5005L16.3246 15.5005L18.8996 12.9005L17.4996 11.5005L12.4996 16.5005L17.4996 21.5005L18.8996 20.1005L16.3246 17.5005H22.9996V15.5005Z" fill="currentColor"/>
<path d="M11.4996 21.0005V12.0005H9.49962V21.0005H11.4996Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.60703 8.60716C7.7116 8.60716 8.60703 7.71173 8.60703 6.60716C8.60703 5.50259 7.7116 4.60716 6.60703 4.60716C5.50246 4.60716 4.60703 5.50259 4.60703 6.60716C4.60703 7.71173 5.50246 8.60716 6.60703 8.60716ZM6.60703 10.6072C8.81617 10.6072 10.607 8.8163 10.607 6.60716C10.607 4.39802 8.81617 2.60716 6.60703 2.60716C4.39789 2.60716 2.60703 4.39802 2.60703 6.60716C2.60703 8.8163 4.39789 10.6072 6.60703 10.6072Z" style="fill: var(--element-active-color)"/>
<path d="M4.08819 12.1439L6.02004 12.6615L5.5024 14.5934L3.57055 14.0757L4.08819 12.1439Z" style="fill: var(--element-active-color)"/>
<path d="M3.05291 16.0076L4.98477 16.5252L4.46713 18.4571L2.53528 17.9394L3.05291 16.0076Z" style="fill: var(--element-active-color)"/>
<path d="M2.01764 19.8713L3.94949 20.3889L3.43185 22.3208L1.5 21.8032L2.01764 19.8713Z" style="fill: var(--element-active-color)"/>
<path d="M12.6619 6.02004L12.1442 4.08819L14.0761 3.57055L14.5937 5.5024L12.6619 6.02004Z" style="fill: var(--element-active-color)"/>
<path d="M16.5256 4.98477L16.0079 3.05291L17.9398 2.53528L18.4574 4.46713L16.5256 4.98477Z" style="fill: var(--element-active-color)"/>
<path d="M20.3893 3.94949L19.8716 2.01764L21.8035 1.5L22.3211 3.43185L20.3893 3.94949Z" style="fill: var(--element-active-color)"/>
<path d="M22.9996 15.5005L16.3246 15.5005L18.8996 12.9005L17.4996 11.5005L12.4996 16.5005L17.4996 21.5005L18.8996 20.1005L16.3246 17.5005H22.9996V15.5005Z" style="fill: var(--element-active-color)"/>
<path d="M11.4996 21.0005V12.0005H9.49962V21.0005H11.4996Z" style="fill: var(--element-active-color)"/>
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
    'obi-route-import-proposal': ObiRouteImportProposal;
  }
}
