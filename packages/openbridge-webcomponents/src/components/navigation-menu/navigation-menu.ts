import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './navigation-menu.css?inline';

export enum ObcNavigationMenuVariant {
  Full = 'full',
  IconOnly = 'icon-only',
  Compact = 'compact',
}

@customElement('obc-navigation-menu')
export class ObcNavigationMenu extends LitElement {
  @property ({type: String}) variant: ObcNavigationMenuVariant = ObcNavigationMenuVariant.Full;

  override render() {
    return html`
      <div class="wrapper ${this.variant}">
        <nav class="main">
          <ol>
            <slot name="main"></slot>
          </ol>
        </nav>
        <div class="footer">
          <nav>
            <ol>
              <slot name="footer"></slot>
            </ol>
          </nav>
          ${this.variant===ObcNavigationMenuVariant.Full ?  html`<div class="logo">
            <slot name="logo"></slot>
          </div>`: nothing}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-navigation-menu': ObcNavigationMenu;
  }
}
