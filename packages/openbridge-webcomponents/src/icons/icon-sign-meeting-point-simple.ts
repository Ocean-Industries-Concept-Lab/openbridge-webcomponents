import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-sign-meeting-point-simple')
export class ObiSignMeetingPointSimple extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.10236 2L5.4252 4.30315V2.55118H7V7H2.55118V5.4252H4.32283L2 3.10236L3.10236 2Z" fill="currentColor"/>
<path d="M18.5748 4.30315L20.8976 2L22 3.10236L19.6772 5.4252H21.4488V7H17V2.55118H18.5748V4.30315Z" fill="currentColor"/>
<path d="M3.10236 22L5.4252 19.6968V21.4488H7V17H2.55118V18.5748H4.32283L2 20.8976L3.10236 22Z" fill="currentColor"/>
<path d="M18.5748 19.6968L20.8976 22L22 20.8976L19.6772 18.5748H21.4488V17H17V21.4488H18.5748V19.6968Z" fill="currentColor"/>
<path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.10236 2L5.4252 4.30315V2.55118H7V7H2.55118V5.4252H4.32283L2 3.10236L3.10236 2Z" style="fill: var(--element-active-color)"/>
<path d="M18.5748 4.30315L20.8976 2L22 3.10236L19.6772 5.4252H21.4488V7H17V2.55118H18.5748V4.30315Z" style="fill: var(--element-active-color)"/>
<path d="M3.10236 22L5.4252 19.6968V21.4488H7V17H2.55118V18.5748H4.32283L2 20.8976L3.10236 22Z" style="fill: var(--element-active-color)"/>
<path d="M18.5748 19.6968L20.8976 22L22 20.8976L19.6772 18.5748H21.4488V17H17V21.4488H18.5748V19.6968Z" style="fill: var(--element-active-color)"/>
<path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-sign-meeting-point-simple': ObiSignMeetingPointSimple;
  }
}
