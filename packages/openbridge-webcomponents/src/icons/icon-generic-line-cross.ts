import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-generic-line-cross')
export class ObiGenericLineCross extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M0 13V11H9.17071C9.47199 10.1476 10.1476 9.47199 11 9.17071V0H13V9.1707C13.8524 9.47199 14.528 10.1476 14.8293 11H24V13H14.8293C14.528 13.8524 13.8524 14.528 13 14.8293V24H11V14.8293C10.1476 14.528 9.47199 13.8524 9.17071 13H0Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 13V11H9.17071C9.47199 10.1476 10.1476 9.47199 11 9.17071V0H13V9.1707C13.8524 9.47199 14.528 10.1476 14.8293 11H24V13H14.8293C14.528 13.8524 13.8524 14.528 13 14.8293V24H11V14.8293C10.1476 14.528 9.47199 13.8524 9.17071 13H0Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-generic-line-cross': ObiGenericLineCross;
  }
}