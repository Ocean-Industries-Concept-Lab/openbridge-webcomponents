import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-limits-outside-over')
export class ObiLimitsOutsideOver extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5 15.0002V17.0002H3V15.0002H5Z" fill="currentColor"/>
<path d="M21 17.0002H19V15.0002H21V17.0002Z" fill="currentColor"/>
<path d="M17 17.0002H15V15.0002H17V17.0002Z" fill="currentColor"/>
<path d="M9 15.0002H7V17.0002H9V15.0002Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4L17.7071 9.70711L16.2929 11.1213L13 7.82843L13.0001 21.0003H11.0001L11 7.82843L7.70711 11.1213L6.29289 9.70711L12 4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 15.0002V17.0002H3V15.0002H5Z" style="fill: var(--element-active-color)"/>
<path d="M21 17.0002H19V15.0002H21V17.0002Z" style="fill: var(--element-active-color)"/>
<path d="M17 17.0002H15V15.0002H17V17.0002Z" style="fill: var(--element-active-color)"/>
<path d="M9 15.0002H7V17.0002H9V15.0002Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4L17.7071 9.70711L16.2929 11.1213L13 7.82843L13.0001 21.0003H11.0001L11 7.82843L7.70711 11.1213L6.29289 9.70711L12 4Z" style="fill: var(--element-active-color)"/>
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
    'obi-limits-outside-over': ObiLimitsOutsideOver;
  }
}