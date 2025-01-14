import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-trend-up')
export class ObiTrendUp extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6077 2.31523L21.5078 8.03613L19.9849 6.67639L13.5 13.97L9.5 9.96999L3.5 15.98L2 14.48L9.5 6.96999L13.5 10.97L18.4994 5.35007L17.0475 4.05375L22.6077 2.31523Z" fill="currentColor"/>
<path d="M2 19H22V21H2V19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6077 2.31523L21.5078 8.03613L19.9849 6.67639L13.5 13.97L9.5 9.96999L3.5 15.98L2 14.48L9.5 6.96999L13.5 10.97L18.4994 5.35007L17.0475 4.05375L22.6077 2.31523Z" style="fill: var(--element-active-color)"/>
<path d="M2 19H22V21H2V19Z" style="fill: var(--element-active-color)"/>
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
    'obi-trend-up': ObiTrendUp;
  }
}