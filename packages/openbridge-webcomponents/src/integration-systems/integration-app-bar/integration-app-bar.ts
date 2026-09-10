import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './integration-app-bar.css?inline';

/**
 * @slot apps - Application buttons; every button is laid out at the width of the widest one
 * @cssprop [--obc-integration-app-bar-app-width=max-content] - Minimum width of each app-button grid track. Tracks may grow equally to fit wider content.
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
