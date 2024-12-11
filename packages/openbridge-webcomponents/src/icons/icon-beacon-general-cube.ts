import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-beacon-general-cube')
export class ObiBeaconGeneralCube extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.17071 21.0003H6V19.5003H9.04148C9.15648 18.8148 9.50394 18.2082 10 17.7642L10 10.0003H14V17.7642C14.4961 18.2082 14.8435 18.8148 14.9585 19.5003H18V21.0003H14.8293C14.4175 22.1655 13.3062 23.0003 12 23.0003C10.6938 23.0003 9.58254 22.1655 9.17071 21.0003ZM13.5 20.0003C13.5 20.8287 12.8284 21.5003 12 21.5003C11.1716 21.5003 10.5 20.8287 10.5 20.0003C10.5 19.1719 11.1716 18.5003 12 18.5003C12.8284 18.5003 13.5 19.1719 13.5 20.0003Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.87898L9.87868 5.0003L12 7.12162L14.1213 5.0003L12 2.87898ZM11.2929 1.46477C11.6834 1.07424 12.3166 1.07424 12.7071 1.46477L15.5355 4.2932C15.9261 4.68372 15.9261 5.31688 15.5355 5.70741L12.7071 8.53584C12.3166 8.92636 11.6834 8.92636 11.2929 8.53584L8.46447 5.70741C8.07394 5.31688 8.07394 4.68372 8.46447 4.2932L11.2929 1.46477Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.17071 21.0003H6V19.5003H9.04148C9.15648 18.8148 9.50394 18.2082 10 17.7642L10 10.0003H14V17.7642C14.4961 18.2082 14.8435 18.8148 14.9585 19.5003H18V21.0003H14.8293C14.4175 22.1655 13.3062 23.0003 12 23.0003C10.6938 23.0003 9.58254 22.1655 9.17071 21.0003ZM13.5 20.0003C13.5 20.8287 12.8284 21.5003 12 21.5003C11.1716 21.5003 10.5 20.8287 10.5 20.0003C10.5 19.1719 11.1716 18.5003 12 18.5003C12.8284 18.5003 13.5 19.1719 13.5 20.0003Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.87898L9.87868 5.0003L12 7.12162L14.1213 5.0003L12 2.87898ZM11.2929 1.46477C11.6834 1.07424 12.3166 1.07424 12.7071 1.46477L15.5355 4.2932C15.9261 4.68372 15.9261 5.31688 15.5355 5.70741L12.7071 8.53584C12.3166 8.92636 11.6834 8.92636 11.2929 8.53584L8.46447 5.70741C8.07394 5.31688 8.07394 4.68372 8.46447 4.2932L11.2929 1.46477Z" style="fill: var(--element-active-color)"/>
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
    'obi-beacon-general-cube': ObiBeaconGeneralCube;
  }
}
