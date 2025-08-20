import {customElement} from '../../decorator.js';
import {LitElement, html, unsafeCSS} from 'lit';
import compentStyle from './app-menu.css?inline';
import '../input/input.js';
import '../app-button/app-button.js';
import '../../icons/icon-search.js';

/**
 * `<obc-app-menu>` – A vertical application menu component with integrated search and customizable app buttons.
 *
 * Provides a structured container for displaying a grid of application buttons, typically used for quick navigation or launching key features. Includes a built-in search input at the top to filter or locate specific applications within the menu.
 *
 * ### Features
 * - **Integrated Search:** Includes a search field with a leading icon, allowing users to filter or search for menu items.
 * - **Customizable Content:** Uses a default slot to accept any number of `<obc-app-button>` elements or other custom content.
 * - **Grid Layout:** Arranges child buttons in a responsive grid (4 columns by default) for efficient use of space.
 * - **Icon Support:** Each app button can display an icon via its own slot, supporting a wide range of visual representations.
 * - **Event Emission:** Dispatches a `search` event whenever the search input changes, enabling live filtering or external handling.
 *
 * ### Usage Guidelines
 * Use `<obc-app-menu>` to present a collection of application shortcuts, tools, or frequently accessed features in a compact, visually organized menu. Ideal for dashboards, launchers, or side panels where users need to quickly access multiple apps or modules.
 *
 * The search input is intended for filtering the visible buttons or triggering search-related logic externally. Place `<obc-app-button>` elements as children to represent each app or function.
 *
 * **TODO(designer):** Clarify if the menu is intended only for application launchers, or if it can be used for other grouped actions. Also, specify any recommended maximum number of buttons or best practices for grouping.
 *
 * ### Slots
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | (default) | Always          | Place one or more `<obc-app-button>` elements or custom content to populate the menu grid. |
 *
 * ### Events
 * - `search` – Fired whenever the user types in the search input. The event's `detail` contains the current input value.
 *
 * ### Example
 * ```
 * <obc-app-menu>
 *   <obc-app-button label="Radar" checked>
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *   </obc-app-button>
 *   <obc-app-button label="Maps">
 *     <obi-placeholder slot="icon"></obi-placeholder>
 *   </obc-app-button>
 *   <!-- More app buttons... -->
 * </obc-app-menu>
 * ```
 * In this example, the menu displays a search bar and a grid of app buttons, each with an icon.
 *
 * @slot - Default slot for app buttons or custom menu items
 * @fires search {CustomEvent<string>} Fired when the search input value changes, with the current value in `detail`.
 */
@customElement('obc-app-menu')
export class ObcAppMenu extends LitElement {
  /**
   * Handles input events from the search field and emits a `search` event with the current value.
   *
   * @param e - The input event from the search field.
   * @fires search {CustomEvent<string>} Fired when the search input value changes.
   */
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
