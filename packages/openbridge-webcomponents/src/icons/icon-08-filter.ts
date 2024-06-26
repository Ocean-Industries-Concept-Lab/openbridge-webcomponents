import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-filter')
export class Obi08Filter extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V4ZM5.25261 4L4 5.25261V8.08104L8.08104 4H5.25261ZM4 10.5838V13.4122L13.4122 4H10.5838L4 10.5838ZM4 18.7461V15.9176L15.9176 4H18.7461L4 18.7461ZM5.2515 20H8.07992L20 8.07992V5.2515L5.2515 20ZM13.4122 20H10.5838L20 10.5838V13.4122L13.4122 20ZM15.9176 20H18.7461L20 18.7461V15.9176L15.9176 20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V4ZM5.25261 4L4 5.25261V8.08104L8.08104 4H5.25261ZM4 10.5838V13.4122L13.4122 4H10.5838L4 10.5838ZM4 18.7461V15.9176L15.9176 4H18.7461L4 18.7461ZM5.2515 20H8.07992L20 8.07992V5.2515L5.2515 20ZM13.4122 20H10.5838L20 10.5838V13.4122L13.4122 20ZM15.9176 20H18.7461L20 18.7461V15.9176L15.9176 20Z" style="fill: var(--element-active-color)"/>
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
    'obi-08-filter': Obi08Filter;
  }
}
