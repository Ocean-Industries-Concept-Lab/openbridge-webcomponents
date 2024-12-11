import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-engine-fill')
export class ObiEngineFill extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 9C21.5523 9 22 9.44772 22 10V18C22 18.5523 21.5523 19 21 19H20V16.5H17L17 19H7.49995L4.49995 13.5H3.5L3.49995 16.5H2V8.5H3.49995L3.49991 11.5H4.49991L7.49995 7H9.99995V5.5H6.99995V4H15V5.5H12V7H15.4997L17 11.5H20V9H21Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 9C21.5523 9 22 9.44772 22 10V18C22 18.5523 21.5523 19 21 19H20V16.5H17L17 19H7.49995L4.49995 13.5H3.5L3.49995 16.5H2V8.5H3.49995L3.49991 11.5H4.49991L7.49995 7H9.99995V5.5H6.99995V4H15V5.5H12V7H15.4997L17 11.5H20V9H21Z" style="fill: var(--element-active-color)"/>
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
    'obi-engine-fill': ObiEngineFill;
  }
}