import {LitElement, unsafeCSS, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import compentStyle from './app-menu.style';
import '../input/input';
import '../app-button/app-button';

@customElement('obc-app-menu')
export class AppMenu extends LitElement {
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
          icon="01-search"
          @input=${this.onSearchInput}
        ></obc-input>
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
    'obc-app-menu': AppMenu;
  }
}
