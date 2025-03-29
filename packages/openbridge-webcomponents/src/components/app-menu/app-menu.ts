import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './app-menu.css?inline';
import '../input/input';
import '../app-button/app-button';
import '../../icons/icon-search';

@customElement('obc-app-menu')
export class ObcAppMenu extends LitElement {
  @property({type: Boolean}) showSearch = true;

  onSearchInput(e: Event) {
    this.dispatchEvent(
      new CustomEvent('search', {detail: (e.target as HTMLInputElement).value})
    );
  }

  override render() {
    return html`
      <div class="card">
        ${this.showSearch
         ? html`<obc-input placeholder="Search" @input=${this.onSearchInput}>
            <obi-search slot="icon"></obi-search>
          </obc-input>`
         : null}
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
