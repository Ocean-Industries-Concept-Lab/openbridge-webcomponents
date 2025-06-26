import {customElement} from '../../decorator.js';
import {LitElement, html, unsafeCSS} from 'lit';
import compentStyle from './app-menu.css?inline';
import '../input/input.js';
import '../app-button/app-button.js';
import '../../icons/icon-search.js';

@customElement('obc-app-menu')
export class ObcAppMenu extends LitElement {
  onSearchInput(e: Event) {
    this.dispatchEvent(
      new CustomEvent('search', {detail: (e.target as HTMLInputElement).value})
    );
  }

  override render() {
    return html`
      <div class="card">
        <obc-input
          placeholder="Search"
          @input=${this.onSearchInput}
          hasLeadingIcon
        >
          <obi-search slot="leading-icon"></obi-search>
        </obc-input>
        <div class="main-apps">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-app-menu': ObcAppMenu;
  }
}
