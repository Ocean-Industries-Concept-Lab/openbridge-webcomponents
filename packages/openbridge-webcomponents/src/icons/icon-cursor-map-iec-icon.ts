import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cursor-map-iec-icon')
export class ObiCursorMapIecIcon extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3 11H9V13H2.99991L3 11Z" fill="currentColor"/>
<path d="M14.9999 11H20.9999V13H14.9999V11Z" fill="currentColor"/>
<path d="M10.9999 21V15H12.9999V21H10.9999Z" fill="currentColor"/>
<path d="M10.9999 9V3H12.9999V9H10.9999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 11H9V13H2.99991L3 11Z" fill="currentColor"/>
<path d="M14.9999 11H20.9999V13H14.9999V11Z" fill="currentColor"/>
<path d="M10.9999 21V15H12.9999V21H10.9999Z" fill="currentColor"/>
<path d="M10.9999 9V3H12.9999V9H10.9999Z" fill="currentColor"/>
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
    'obi-cursor-map-iec-icon': ObiCursorMapIecIcon;
  }
}