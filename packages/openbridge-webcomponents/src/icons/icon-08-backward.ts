import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-backward')
export class Obi08Backward extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 12.7942L17 4.99992L17 20.5884L3.5 12.7942Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 12.7942L17 20.5884L17 4.99992L3.5 12.7942ZM5.5 12.7942L16 18.8563L16 6.73197L5.5 12.7942Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 12.7942L17 4.99992L17 20.5884L3.5 12.7942Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 12.7942L17 20.5884L17 4.99992L3.5 12.7942ZM5.5 12.7942L16 18.8563L16 6.73197L5.5 12.7942Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-08-backward': Obi08Backward;
  }
}
