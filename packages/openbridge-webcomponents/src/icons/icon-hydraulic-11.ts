import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-11')
export class ObiHydraulic11 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5211 5.68066L4.66388 21.2908C4.55577 21.5411 4.5 21.8109 4.5 22.0836V22.959H6.5V22.0836L14.3728 6.44258L16.6439 7.37705L15.5 0.958984L10.1705 4.71344L12.5211 5.68066Z" fill="currentColor"/>
<path d="M16.3083 17V23H14.3083V17H12.3083V15H18.3083V17H16.3083Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5211 5.68066L4.66388 21.2908C4.55577 21.5411 4.5 21.8109 4.5 22.0836V22.959H6.5V22.0836L14.3728 6.44258L16.6439 7.37705L15.5 0.958984L10.1705 4.71344L12.5211 5.68066Z" style="fill: var(--element-active-color)"/>
<path d="M16.3083 17V23H14.3083V17H12.3083V15H18.3083V17H16.3083Z" style="fill: var(--element-active-color)"/>
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
    'obi-hydraulic-11': ObiHydraulic11;
  }
}
