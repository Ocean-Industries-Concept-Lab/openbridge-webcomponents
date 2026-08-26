import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './integration-app-bar.css?inline';

/**
 * @slot apps - Application buttons; every button is laid out at the width of the widest one
 * @cssprop [--obc-integration-app-bar-app-width=max-content] - Width of each app button. Defaults to the width of the widest button; set a length to pin them all to that width instead.
 * @experimental
 */
@customElement('obc-integration-app-bar')
export class ObcIntegrationAppBar extends LitElement {
  override render() {
    return html`
      <div class="wrapper">
        <div class="left-side"></div>
        <div class="center">
          <slot name="apps"></slot>
        </div>
        <div class="right-side"></div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-app-bar': ObcIntegrationAppBar;
  }
}
