import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query} from 'lit/decorators.js';
import {localized, msg} from '@lit/localize';
import componentStyle from './diagnostic-menu.css?inline';
import {customElement} from '../../decorator.js';
import '../button/button.js';
import '../../icons/icon-chevron-right-google.js';
import '../alert-frame/diagnostic-badge.js';
import '../../building-blocks/alert-list/alert-list.js';
import type {ObcAlertList} from '../../building-blocks/alert-list/alert-list.js';
import {PopoverController} from '../../internal/popover-controller.js';

export type ObcDiagnosticMenuAckAllVisibleClickEvent = CustomEvent<{
  visibleElements: {element: HTMLElement; index: number}[];
}>;

/**
 * `<obc-diagnostic-menu>` – The panel the diagnostic button opens: a titled
 * list of diagnostics with an acknowledge-all and a list button.
 *
 * The diagnostic counterpart of `obc-alert-menu`, without its tabs and its
 * silence button: a title row, the slotted `obc-message-menu-item` rows in a
 * scrolling list with an empty state, and a footer with "ACK all visible" and
 * "Diagnostics list".
 *
 * ---
 *
 * ### Features
 * - **Title row:** `menuTitle`, "Diagnostics" when left empty.
 * - **Rows:** any number of `obc-message-menu-item` children; the list
 *   scrolls, slides new rows into place and shows an empty state the
 *   `empty-*` slots replace.
 * - **ACK all visible:** enabled by `canAckAll`; fires
 *   `ack-all-visible-click` with the rows in view, as the alert menu does.
 * - **Diagnostics list:** `showDiagnosticListButton` shows the button that
 *   fires `go-to-diagnostic-list-click` for the full list page.
 * - **Soft dismiss:** `softDismiss` and `open` close the menu on a click
 *   outside or `Escape`, as every menu does.
 *
 * ---
 *
 * ### Usage Guidelines
 * - Open it from `obc-diagnostic-button`'s `click` with a flag of your own,
 *   bound to `open` and to the button's `activated`, and reset on `close`.
 * - A row is acknowledged through its own `primary-action-click`; the footer
 *   button reports every row in view at once.
 * - Position it yourself, under the top bar's diagnostic button.
 * - **TODO(designer):** the design draws an open-in-new glyph after
 *   "Diagnostics list" and a 696 px card that hugs its rows; neither the
 *   glyph nor a width token is in the library, so the button draws the
 *   chevron of the alert menu's "Alerts" button and the card keeps the alert
 *   menu's width and height (#1396).
 *
 * ---
 *
 * ### Example
 *
 * ```html
 * <obc-diagnostic-menu canAckAll>
 *   <obc-message-menu-item title="Simulate" description="Value is simulated" day="Yesterday" time="09:12:34" primaryActionLabel="Action" hasPrimaryIcon>
 *     <obi-placeholder slot="primary-icon"></obi-placeholder>
 *   </obc-message-menu-item>
 * </obc-diagnostic-menu>
 * ```
 *
 * @property menuTitle - Title of the menu; "Diagnostics" when left empty.
 * @property canAckAll - Enables the "ACK all visible" button; set it while a row in view can be acknowledged.
 * @availableWhen canAckAll showAckAllButton==true
 * @property showAckAllButton - Shows the "ACK all visible" button in the footer.
 * @property showDiagnosticListButton - Shows the "Diagnostics list" button in the footer.
 * @property softDismiss - Lets the menu close itself on a click outside it, on `Escape`, or when another menu opens. The page is covered while the menu is open, so the closing click reaches nothing there; only the top bar's strip stays clickable, which is how its buttons switch or close menus in one click. Wire it with three bindings: set `softDismiss`, bind `open` to a flag you keep, and reset that flag on `close`. The button that opens the menu needs no wiring of its own: flip the flag from its click. Leave it off to show and hide the menu yourself.
 * @property open - Whether the menu is showing. Bind it to a flag you keep rather than toggling it from the menu's own value: when the menu closes itself, `open` is written back to `false` before the button's click reaches your handler, so `menu.open = !menu.open` gets out of step. Reset the flag on `close`.
 * @availableWhen open softDismiss==true
 * @slot - The diagnostics as `obc-message-menu-item` rows.
 * @slot empty-title - Title of the empty state, "No diagnostics" when left unfilled.
 * @slot empty-description - Description of the empty state.
 * @slot empty-icon - Icon of the empty state, the diagnostic asterisk when left unfilled.
 * @fires {ObcDiagnosticMenuAckAllVisibleClickEvent} ack-all-visible-click - Fired when the "ACK all visible" button is clicked, with the rows in view.
 * @fires {CustomEvent<void>} go-to-diagnostic-list-click - Fired when the "Diagnostics list" button is clicked.
 * @fires {CustomEvent<void>} close - Fired when the menu closed on its own, from a click outside, `Escape`, or another menu opening. `open` is already `false` by the time it arrives; reset the flag you bind to `open` here, or the next click on the button finds it still set and asks a closed menu to close.
 * @experimental
 */
@customElement('obc-diagnostic-menu')
@localized()
export class ObcDiagnosticMenu extends LitElement {
  @property({type: Boolean}) softDismiss = false;

  @property({type: Boolean}) open = false;

  protected readonly softDismissController = new PopoverController(this);

  @property({type: String}) menuTitle = '';

  @property({type: Boolean}) canAckAll = false;

  @property({type: Boolean, attribute: false}) showAckAllButton = true;

  @property({type: Boolean, attribute: false}) showDiagnosticListButton = true;

  @query('.list') private list!: ObcAlertList;

  private handleAckAllVisibleClick() {
    this.dispatchEvent(
      new CustomEvent('ack-all-visible-click', {
        detail: {visibleElements: this.list.getVisibleElements()},
      })
    );
  }

  override render() {
    return html`
      <div class="wrapper" part="wrapper">
        <div class="title-container">
          <h3 class="title">${this.menuTitle || msg('Diagnostics')}</h3>
        </div>
        <obc-alert-list class="list">
          <slot></slot>
          <slot name="empty-title" slot="empty-title"
            >${msg('No diagnostics')}</slot
          >
          <slot name="empty-description" slot="empty-description"
            >${msg("Go to the 'Diagnostics list' for more details.")}</slot
          >
          <slot name="empty-icon" slot="empty-icon"
            ><obi-diagnostic-badge class="empty-badge"></obi-diagnostic-badge
          ></slot>
        </obc-alert-list>
        <div class="action">
          ${
            this.showAckAllButton
              ? html`<obc-button
                  variant="normal"
                  .disabled=${!this.canAckAll}
                  data-testid="ack-all-visible-button"
                  @click=${this.handleAckAllVisibleClick}
                >
                  ${msg('ACK all visible')}
                </obc-button>`
              : nothing
          }
          ${
            this.showDiagnosticListButton
              ? html`<obc-button
                  variant="normal"
                  showTrailingIcon
                  data-testid="diagnostic-list-button"
                  @click=${() =>
                    this.dispatchEvent(
                      new CustomEvent('go-to-diagnostic-list-click')
                    )}
                >
                  ${msg('Diagnostics list')}
                  <obi-chevron-right-google
                    slot="trailing-icon"
                  ></obi-chevron-right-google>
                </obc-button>`
              : nothing
          }
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-diagnostic-menu': ObcDiagnosticMenu;
  }
}
