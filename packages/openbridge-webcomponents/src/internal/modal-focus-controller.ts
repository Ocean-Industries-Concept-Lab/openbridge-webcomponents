import type {ReactiveController, ReactiveControllerHost} from 'lit';
import {composedTabbables, deepActiveElement} from './focus.js';

/**
 * The focus half of the APG modal dialog pattern
 * (https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/): focus moves into
 * the dialog when it connects, Tab and Shift+Tab cycle inside it, and focus
 * returns to the element that had it when the dialog disconnects.
 *
 * Escape is the host's own business, because which event it fires differs
 * per dialog. The host names the landing element through `initialFocus`; a
 * container with `tabindex="-1"` is the usual choice, so a dialog that opens
 * from a keyboard does not activate its first button by accident.
 */
export class ModalFocusController implements ReactiveController {
  private opener: Element | null = null;
  private landed = false;

  constructor(
    private readonly host: ReactiveControllerHost & HTMLElement,
    private readonly initialFocus: () => HTMLElement | null
  ) {
    host.addController(this);
  }

  hostConnected() {
    this.opener = deepActiveElement();
    this.landed = false;
    this.host.addEventListener('keydown', this.cycle);
    // A reconnected element does not update on its own; the landing does.
    this.host.requestUpdate();
  }

  hostUpdated() {
    if (this.landed) return;
    this.landed = true;
    this.initialFocus()?.focus();
  }

  hostDisconnected() {
    this.host.removeEventListener('keydown', this.cycle);
    const opener = this.opener;
    this.opener = null;
    if (opener instanceof HTMLElement && opener.isConnected) {
      opener.focus();
    }
  }

  private cycle = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    const tabbables = composedTabbables(this.host);
    if (tabbables.length === 0) {
      event.preventDefault();
      return;
    }
    const active = deepActiveElement();
    const first = tabbables[0];
    const last = tabbables[tabbables.length - 1];
    if (
      event.shiftKey &&
      (active === first || !tabbables.includes(active as HTMLElement))
    ) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };
}
