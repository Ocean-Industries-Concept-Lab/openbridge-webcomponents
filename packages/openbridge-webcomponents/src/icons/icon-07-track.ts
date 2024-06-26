import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-track')
export class Obi07Track extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.1321 13.0927L10.5607 14.6642L9.5 13.6035L11.0714 12.0321L12.1321 13.0927ZM9.38209 15.8427L7.81066 17.4142L6.75 16.3535L8.32143 14.7821L9.38209 15.8427ZM6.63209 18.5927L5.06066 20.1642L4 19.1035L5.57143 17.5321L6.63209 18.5927Z" fill="currentColor"/>
<path d="M19.7804 7.36169L14.3285 12.8136L11.5001 9.98513L16.9519 4.53327C17.7574 3.72776 18.8226 3.28448 19.9397 3.07034C20.4609 2.97044 20.9612 2.92695 21.3996 2.91406C21.3867 3.35247 21.3432 3.85275 21.2433 4.37389C21.0291 5.49104 20.5859 6.55618 19.7804 7.36169Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.1321 13.0927L10.5607 14.6642L9.5 13.6035L11.0714 12.0321L12.1321 13.0927ZM9.38209 15.8427L7.81066 17.4142L6.75 16.3535L8.32143 14.7821L9.38209 15.8427ZM6.63209 18.5927L5.06066 20.1642L4 19.1035L5.57143 17.5321L6.63209 18.5927Z" style="fill: var(--element-active-color)"/>
<path d="M19.7804 7.36169L14.3285 12.8136L11.5001 9.98513L16.9519 4.53327C17.7574 3.72776 18.8226 3.28448 19.9397 3.07034C20.4609 2.97044 20.9612 2.92695 21.3996 2.91406C21.3867 3.35247 21.3432 3.85275 21.2433 4.37389C21.0291 5.49104 20.5859 6.55618 19.7804 7.36169Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-track': Obi07Track;
  }
}
