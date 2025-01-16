import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-tidal-iec')
export class ObiTidalIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0002 0.231689L5.62061 7.67459L6.37986 8.32538L11.5002 2.35161V7.81502L5.62061 14.6746L6.37986 15.3254L11.5002 9.35161V14.815L5.62061 21.6746L6.37986 22.3254L11.5002 16.3516V24H12.5002V16.3516L17.6206 22.3254L18.3799 21.6746L12.5002 14.815V9.35161L17.6206 15.3254L18.3799 14.6746L12.5002 7.81502V2.35161L17.6206 8.32538L18.3799 7.67459L12.0002 0.231689Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0002 0.231689L5.62061 7.67459L6.37986 8.32538L11.5002 2.35161V7.81502L5.62061 14.6746L6.37986 15.3254L11.5002 9.35161V14.815L5.62061 21.6746L6.37986 22.3254L11.5002 16.3516V24H12.5002V16.3516L17.6206 22.3254L18.3799 21.6746L12.5002 14.815V9.35161L17.6206 15.3254L18.3799 14.6746L12.5002 7.81502V2.35161L17.6206 8.32538L18.3799 7.67459L12.0002 0.231689Z" style="fill: var(--element-active-color)"/>
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
    'obi-tidal-iec': ObiTidalIec;
  }
}