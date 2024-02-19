import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import compentStyle from './app-menu.css?inline';
import '../input/input';
import '../app-button/app-button';
import '../../icons/icon-01-search';

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
        <obc-input placeholder="Search" @input=${this.onSearchInput}>
          <obi-01-search slot="icon"></obi-01-search>
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
