import {LitElement, unsafeCSS, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import compentStyle from './app-menu.css?inline';
import '../input/input';
import '../app-button/app-button';

export interface MenuItem {
  id: string;
  name: string;
  icon: string;
}

@customElement('obc-app-menu')
export class AppMenu extends LitElement {
  @property({attribute: false}) items: Array<MenuItem> = [];

  onSearchInput(e: Event) {
    this.dispatchEvent(
      new CustomEvent('search', {detail: (e.target as HTMLInputElement).value})
    );
  }

  onAppButtonClick(item: MenuItem) {
    this.dispatchEvent(new CustomEvent('app-selected', {detail: item}));
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
