import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-screen-shot')
export class ObiScreenShot extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 17V20C2 21.1046 2.89543 22 4 22H6V20H4L4 17H2ZM7 2H4C2.89543 2 2 2.89543 2 4V7H4V4L7 4V2ZM2 14H4V10H2V14ZM10 2V4H14V2H10ZM17 2V4H20V7H22V4C22 2.89543 21.1046 2 20 2H17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.8284 13H10V20H20V13H18.1716L16.1716 11H13.8284L11.8284 13ZM13 9L11 11H10C8.89543 11 8 11.8954 8 13V20C8 21.1046 8.89543 22 10 22H20C21.1046 22 22 21.1046 22 20V13C22 11.8954 21.1046 11 20 11H19L17 9H13Z" fill="currentColor"/>
<path d="M17 16C17 17.1046 16.1046 18 15 18C13.8954 18 13 17.1046 13 16C13 14.8954 13.8954 14 15 14C16.1046 14 17 14.8954 17 16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 17V20C2 21.1046 2.89543 22 4 22H6V20H4L4 17H2ZM7 2H4C2.89543 2 2 2.89543 2 4V7H4V4L7 4V2ZM2 14H4V10H2V14ZM10 2V4H14V2H10ZM17 2V4H20V7H22V4C22 2.89543 21.1046 2 20 2H17Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.8284 13H10V20H20V13H18.1716L16.1716 11H13.8284L11.8284 13ZM13 9L11 11H10C8.89543 11 8 11.8954 8 13V20C8 21.1046 8.89543 22 10 22H20C21.1046 22 22 21.1046 22 20V13C22 11.8954 21.1046 11 20 11H19L17 9H13Z" style="fill: var(--element-active-color)"/>
<path d="M17 16C17 17.1046 16.1046 18 15 18C13.8954 18 13 17.1046 13 16C13 14.8954 13.8954 14 15 14C16.1046 14 17 14.8954 17 16Z" style="fill: var(--element-active-color)"/>
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
    'obi-screen-shot': ObiScreenShot;
  }
}