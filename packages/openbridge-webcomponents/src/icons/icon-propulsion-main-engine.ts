import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-propulsion-main-engine')
export class ObiPropulsionMainEngine extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.3599 3C15.3599 2.44772 14.9121 2 14.3599 2H10.3599C9.80758 2 9.35986 2.44772 9.35986 3V11H7.85986C7.58372 11 7.35986 11.2239 7.35986 11.5V12.5C7.35986 12.7761 7.58372 13 7.85986 13H9.35986V21C9.35986 21.5523 9.80758 22 10.3599 22H14.3599C14.9121 22 15.3599 21.5523 15.3599 21V13H16.8599C17.136 13 17.3599 12.7761 17.3599 12.5V11.5C17.3599 11.2239 17.136 11 16.8599 11H15.3599V3ZM11.3599 4H13.3599V7H11.3599V4ZM13.3599 13H11.3599V20H13.3599V13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.3599 3C15.3599 2.44772 14.9121 2 14.3599 2H10.3599C9.80758 2 9.35986 2.44772 9.35986 3V11H7.85986C7.58372 11 7.35986 11.2239 7.35986 11.5V12.5C7.35986 12.7761 7.58372 13 7.85986 13H9.35986V21C9.35986 21.5523 9.80758 22 10.3599 22H14.3599C14.9121 22 15.3599 21.5523 15.3599 21V13H16.8599C17.136 13 17.3599 12.7761 17.3599 12.5V11.5C17.3599 11.2239 17.136 11 16.8599 11H15.3599V3ZM11.3599 4H13.3599V7H11.3599V4ZM13.3599 13H11.3599V20H13.3599V13Z" fill="currentColor"/>
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
    'obi-propulsion-main-engine': ObiPropulsionMainEngine;
  }
}