import {LitElement, html, css, svg} from 'lit';
import {customElement} from '../../decorator.js';

@customElement('obi-critical-badge')
export class ObiCriticalBadge extends LitElement {
  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M 22,12 
           L 17,20.66 
           L 7,20.66 
           L 2,12 
           L 7,3.34 
           L 17,3.34 
           Z" 
        fill="currentColor"/>
</svg>
`;

  override render() {
    return html` <div class="wrapper">${this.icon}</div> `;
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
    'obi-critical-badge': ObiCriticalBadge;
  }
}
