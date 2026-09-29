import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-critical-rectified')
export class ObiCriticalRectified extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.28516 4L16.7139 4L21.4199 12L16.7139 20L7.28516 20L2.5791 12L7.28516 4Z" fill="currentColor" stroke="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.7071 9.70718L10.5 16.9143L5.79291 12.2072L7.20712 10.793L10.5 14.0859L16.2929 8.29297L17.7071 9.70718Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.28516 4L16.7139 4L21.4199 12L16.7139 20L7.28516 20L2.5791 12L7.28516 4Z" style="fill: var(--alert-critical-color); stroke: var(--alert-critical-outline-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.7071 9.70718L10.5 16.9143L5.79291 12.2072L7.20712 10.793L10.5 14.0859L16.2929 8.29297L17.7071 9.70718Z" style="fill: var(--on-critical-active-color)"/>
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
    'obi-critical-rectified': ObiCriticalRectified;
  }
}
