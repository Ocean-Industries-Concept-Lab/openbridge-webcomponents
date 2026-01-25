import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-stopped')
export class ObiStopped extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 6.5C18 6.22386 17.7761 6 17.5 6H6.5C6.22386 6 6 6.22386 6 6.5V17.5C6 17.7761 6.22386 18 6.5 18H17.5C17.7761 18 18 17.7761 18 17.5V6.5ZM17 7.5C17 7.22386 16.7761 7 16.5 7H7.5C7.22386 7 7 7.22386 7 7.5V16.5C7 16.7761 7.22386 17 7.5 17H16.5C16.7761 17 17 16.7761 17 16.5V7.5Z" fill="currentColor"/>
<path d="M7 7H17V17H7V7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 6.5C18 6.22386 17.7761 6 17.5 6H6.5C6.22386 6 6 6.22386 6 6.5V17.5C6 17.7761 6.22386 18 6.5 18H17.5C17.7761 18 18 17.7761 18 17.5V6.5ZM17 7.5C17 7.22386 16.7761 7 16.5 7H7.5C7.22386 7 7 7.22386 7 7.5V16.5C7 16.7761 7.22386 17 7.5 17H16.5C16.7761 17 17 16.7761 17 16.5V7.5Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M7 7H17V17H7V7Z" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-stopped': ObiStopped;
  }
}
