import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-yaw')
export class ObiYaw extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M22.1213 3.12951L20.6988 4.55205C17.3052 1.99222 10.1275 -0.350422 3.88338 4.3053L2.70711 3.12902L2 8.07877L6.94975 7.37166L5.31502 5.73693C10.4218 2.11536 16.2988 3.86334 19.2687 5.98213L17.8787 7.37215L22.8285 8.07926L22.1213 3.12951Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.00005 22L17.0001 22L17.0001 15C17.0001 9.8 13.6667 6.16667 12.0001 5C10.3334 6.16667 7.00005 9.8 7.00005 15L7.00005 22ZM9.00005 18L9.00005 20L15.0001 20L15.0001 18L9.00005 18ZM15.0001 16L15.0001 15C15.0001 11.6898 13.3621 9.1114 12.0001 7.66151C10.638 9.1114 9.00005 11.6898 9.00005 15L9.00005 16L15.0001 16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.1213 3.12951L20.6988 4.55205C17.3052 1.99222 10.1275 -0.350422 3.88338 4.3053L2.70711 3.12902L2 8.07877L6.94975 7.37166L5.31502 5.73693C10.4218 2.11536 16.2988 3.86334 19.2687 5.98213L17.8787 7.37215L22.8285 8.07926L22.1213 3.12951Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.00005 22L17.0001 22L17.0001 15C17.0001 9.8 13.6667 6.16667 12.0001 5C10.3334 6.16667 7.00005 9.8 7.00005 15L7.00005 22ZM9.00005 18L9.00005 20L15.0001 20L15.0001 18L9.00005 18ZM15.0001 16L15.0001 15C15.0001 11.6898 13.3621 9.1114 12.0001 7.66151C10.638 9.1114 9.00005 11.6898 9.00005 15L9.00005 16L15.0001 16Z" style="fill: var(--element-active-color)"/>
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
    'obi-yaw': ObiYaw;
  }
}