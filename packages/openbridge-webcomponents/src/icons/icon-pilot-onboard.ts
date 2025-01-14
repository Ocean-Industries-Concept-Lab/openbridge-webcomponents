import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-pilot-onboard')
export class ObiPilotOnboard extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3599 4H4.35986V20H12.3599V4ZM2.85986 2C2.58372 2 2.35986 2.22386 2.35986 2.5V21.5C2.35986 21.7761 2.58372 22 2.85986 22H21.8599C22.136 22 22.3599 21.7761 22.3599 21.5V2.5C22.3599 2.22386 22.136 2 21.8599 2H2.85986Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3599 4H4.35986V20H12.3599V4ZM2.85986 2C2.58372 2 2.35986 2.22386 2.35986 2.5V21.5C2.35986 21.7761 2.58372 22 2.85986 22H21.8599C22.136 22 22.3599 21.7761 22.3599 21.5V2.5C22.3599 2.22386 22.136 2 21.8599 2H2.85986Z" style="fill: var(--element-active-color)"/>
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
    'obi-pilot-onboard': ObiPilotOnboard;
  }
}