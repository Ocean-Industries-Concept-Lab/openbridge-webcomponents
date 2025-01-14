import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-prohibited-restricted-areas')
export class ObiChartProhibitedRestrictedAreas extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5548 7.5V5H18.5548V7.5H21.0548V9.5H18.5548V11.7269L16.5548 9.72688V9.5H16.3279L14.3279 7.5H16.5548Z" fill="currentColor"/>
<path d="M16.5548 16.5V15.3837L10.3416 9.17056L11.7559 7.75635L23.0684 19.0688L21.6541 20.4831L19.6711 18.5H14.6405L11.3477 15.2071L12.7619 13.7929L15.469 16.5H16.5548Z" fill="currentColor"/>
<path d="M22.8984 16.0705L21.4842 14.6563L22.3477 13.7929L23.7619 15.2071L22.8984 16.0705Z" fill="currentColor"/>
<path d="M1 13H4V16H6V13H9V11H1V13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5548 7.5V5H18.5548V7.5H21.0548V9.5H18.5548V11.7269L16.5548 9.72688V9.5H16.3279L14.3279 7.5H16.5548Z" style="fill: var(--element-active-color)"/>
<path d="M16.5548 16.5V15.3837L10.3416 9.17056L11.7559 7.75635L23.0684 19.0688L21.6541 20.4831L19.6711 18.5H14.6405L11.3477 15.2071L12.7619 13.7929L15.469 16.5H16.5548Z" style="fill: var(--element-active-color)"/>
<path d="M22.8984 16.0705L21.4842 14.6563L22.3477 13.7929L23.7619 15.2071L22.8984 16.0705Z" style="fill: var(--element-active-color)"/>
<path d="M1 13H4V16H6V13H9V11H1V13Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-prohibited-restricted-areas': ObiChartProhibitedRestrictedAreas;
  }
}