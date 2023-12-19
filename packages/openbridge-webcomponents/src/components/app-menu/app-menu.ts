import {LitElement, unsafeCSS, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import compentStyle from './app-menu.css?inline';
import '../input/input';
import '../app-button/app-button';

@customElement('obc-app-menu')
export class AppMenu extends LitElement {
  onSearchInput(e: Event) {
    this.dispatchEvent(
      new CustomEvent('search', {detail: (e.target as HTMLInputElement).value})
    );
  }

  render() {
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

  static styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-app-menu': AppMenu;
  }
}
