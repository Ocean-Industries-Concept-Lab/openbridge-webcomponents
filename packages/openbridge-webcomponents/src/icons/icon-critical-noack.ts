import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-critical-noack')
export class ObiCriticalNoack extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.28516 4L16.7139 4L21.4199 12L16.7139 20L7.28516 20L2.5791 12L7.28516 4Z" fill="currentColor" stroke="currentColor"/>
<path d="M5.17992 6.5941L10.5859 12.0001L5.17999 17.406L6.22756 19.1868L12.0001 13.4143L17.7725 19.1867L18.8201 17.4058L13.4143 12.0001L18.8202 6.59422L17.7726 4.81336L12.0001 10.5858L6.22749 4.81323L5.17992 6.5941Z" fill="currentColor"/>
<path d="M12.0001 10.5858L17.7726 4.81336L18.8202 6.59422L13.4143 12.0001L18.8201 17.4058L17.7725 19.1867L12.0001 13.4143L6.22756 19.1868L5.17999 17.406L10.5859 12.0001L5.17992 6.5941L6.22749 4.81323L12.0001 10.5858Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.28516 4L16.7139 4L21.4199 12L16.7139 20L7.28516 20L2.5791 12L7.28516 4Z" style="fill: var(--alert-critical-color); stroke: var(--alert-critical-outline-color)"/>
<path d="M5.17992 6.5941L10.5859 12.0001L5.17999 17.406L6.22756 19.1868L12.0001 13.4143L17.7725 19.1867L18.8201 17.4058L13.4143 12.0001L18.8202 6.59422L17.7726 4.81336L12.0001 10.5858L6.22749 4.81323L5.17992 6.5941Z" style="fill: var(--on-critical-active-color)"/>
<path d="M12.0001 10.5858L17.7726 4.81336L18.8202 6.59422L13.4143 12.0001L18.8201 17.4058L17.7725 19.1867L12.0001 13.4143L6.22756 19.1868L5.17999 17.406L10.5859 12.0001L5.17992 6.5941L6.22749 4.81323L12.0001 10.5858Z" style="fill: var(--on-critical-active-color)"/>
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
    'obi-critical-noack': ObiCriticalNoack;
  }
}
