import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-actuator-small-manual-alternative-static')
export class ObiActuatorSmallManualAlternativeStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4V12" stroke-linecap="round" stroke="currentColor"/>
<path d="M8.25 4.75L14.25 4.75V6.5C14.25 6.91421 14.5858 7.25 15 7.25C15.4142 7.25 15.75 6.91421 15.75 6.5V3.25L9.75 3.25L9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.75C8.58579 0.75 8.25 1.08579 8.25 1.5L8.25 4.75Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4V12" stroke-linecap="round" style="stroke: var(--automation-symbol-static-background-color)"/>
<path d="M8.25 4.75L14.25 4.75V6.5C14.25 6.91421 14.5858 7.25 15 7.25C15.4142 7.25 15.75 6.91421 15.75 6.5V3.25L9.75 3.25L9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.75C8.58579 0.75 8.25 1.08579 8.25 1.5L8.25 4.75Z" style="fill: var(--automation-symbol-static-background-color)"/>
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
    'obi-actuator-small-manual-alternative-static': ObiActuatorSmallManualAlternativeStatic;
  }
}
