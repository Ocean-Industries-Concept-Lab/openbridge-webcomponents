import {LitElement, html, css, svg} from 'lit';
import {customElement} from '../../decorator.js';

@customElement('obi-diagnostic-badge')
export class ObiDiagnosticBadge extends LitElement {
  private icon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
  <path d="M 10.5,2 
           L 13.5,2 
           L 13.5,9.4 
           L 19.91,5.7 
           L 21.41,8.3 
           L 15,12 
           L 21.41,15.7 
           L 19.91,18.3 
           L 13.5,14.6 
           L 13.5,22 
           L 10.5,22 
           L 10.5,14.6 
           L 4.09,18.3 
           L 2.59,15.7 
           L 9,12 
           L 2.59,8.3 
           L 4.09,5.7 
           L 10.5,9.4 
           Z" 
        fill="currentColor" />
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
    'obi-diagnostic-badge': ObiDiagnosticBadge;
  }
}
