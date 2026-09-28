import {customElement} from '../../decorator.js';
import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import compentStyle from './automation-input-modal.css?inline';
import {ModalFocusController} from '../../internal/modal-focus-controller.js';

/**
 * `<obc-automation-input-modal>` – Modal layout for an automation input: a
 * header, a preview and two action slots. Every control is slotted.
 *
 * ## Keyboard
 * APG modal dialog (https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/):
 * the modal has no open state, so rendering it opens it and removing it
 * closes it. Focus lands on the dialog on connect, `Tab` and `Shift+Tab`
 * cycle over the slotted controls, `Escape` fires `close-click`, and focus
 * returns to the opener on disconnect. The dialog is named by `aria-label`
 * when set, else by its header, which then has to carry text.
 *
 * Left out: a description (`aria-describedby`); the dialog is announced by
 * its name only.
 *
 * @property ariaLabel - Accessible name of the dialog, mapped to the `aria-label` attribute. Without it the header slot names the dialog, so an icon-only header needs it.
 * @slot header - Header content shown at the top of the modal.
 * @slot preview - Preview content shown in the body of the modal.
 * @slot action-primary - Primary action control shown in the actions row.
 * @slot action-secondary - Secondary action control shown in the actions row.
 * @fires {CustomEvent<void>} close-click - Fired when `Escape` is pressed; the host removes the modal.
 * @experimental
 */
@customElement('obc-automation-input-modal')
export class ObcAutomationInputModal extends LitElement {
  // Reactive so a consumer changing the name re-renders the dialog.
  @property({type: String, attribute: 'aria-label'})
  override ariaLabel: string | null = null;

  protected readonly focusController = new ModalFocusController(
    this,
    () => this.shadowRoot?.querySelector('.wrapper') ?? null
  );

  private onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || event.defaultPrevented) return;
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('close-click'));
  }

  override render() {
    return html`
      <div
        class="wrapper"
        role="dialog"
        aria-modal="true"
        aria-label=${ifDefined(this.ariaLabel ?? undefined)}
        aria-labelledby=${ifDefined(this.ariaLabel ? undefined : 'header')}
        tabindex="-1"
        @keydown=${this.onKeydown}
      >
        <div class="header" id="header">
          <slot name="header"></slot>
        </div>
        <div class="preview">
          <slot name="preview"></slot>
        </div>
        <div class="actions">
          <slot name="action-primary"></slot>
          <slot name="action-secondary"></slot>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-input-modal': ObcAutomationInputModal;
  }
}
