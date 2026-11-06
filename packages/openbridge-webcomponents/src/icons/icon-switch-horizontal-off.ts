import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-switch-horizontal-off')
export class ObiSwitchHorizontalOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.48205 13.567L17.3385 5.56698C18.5342 4.87663 20.0632 5.28632 20.7535 6.48205C21.4439 7.67778 21.0342 9.20675 19.8385 9.89711L5.98205 17.8971C4.78632 18.5875 3.25734 18.1778 2.56699 16.9821C1.87663 15.7863 2.28632 14.2573 3.48205 13.567Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.48205 13.567L17.3385 5.56698C18.5342 4.87663 20.0632 5.28632 20.7535 6.48205C21.4439 7.67778 21.0342 9.20675 19.8385 9.89711L5.98205 17.8971C4.78632 18.5875 3.25734 18.1778 2.56699 16.9821C1.87663 15.7863 2.28632 14.2573 3.48205 13.567Z" style="fill: var(--automation-symbol-off-background-color); stroke: var(--automation-symbol-off-border-color)"/>
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
    'obi-switch-horizontal-off': ObiSwitchHorizontalOff;
  }
}
