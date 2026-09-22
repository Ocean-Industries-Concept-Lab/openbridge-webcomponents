import type {LitElement, ReactiveController} from 'lit';

/**
 * What {@link PopoverController} needs a component to have.
 *
 * `softDismiss` has to be something a component opts into. The browser hides
 * a popover until it is opened, so switching this on for everyone would make
 * every menu that a consumer already shows and positions disappear.
 */
export interface SoftDismissHost extends LitElement {
  /** Let the browser take over showing, hiding and closing this panel. */
  softDismiss: boolean;
  /** Whether the panel is showing. Only used when `softDismiss` is on. */
  open: boolean;
}

/**
 * Lets a menu close itself the way people expect (#1293).
 *
 * Click outside an open menu and it should go away. So should pressing
 * `Escape`, and opening a different menu. The browser can do all of this on
 * its own for an element marked as a popover, which is what this controller
 * switches on, so none of it is written by hand here. It comes with two
 * things that are hard to get right otherwise: focus returns to the button
 * that opened the menu, and the menu is drawn above the rest of the page
 * whatever its container does with `overflow`, `transform` or `z-index`.
 *
 * A component keeps `open` as the property people set. Since the browser can
 * also open and close the menu on its own, the controller writes what the
 * browser did back into `open`, and fires `close` when the menu went away by
 * itself. Skip that and the property drifts out of step with what is on
 * screen, and the next render closes a menu that was just opened.
 *
 * The button that opens the menu usually belongs to whoever is using the
 * component, not to the component itself, so wiring it up is
 * {@link bindPopoverTrigger}'s job.
 */
export class PopoverController implements ReactiveController {
  private installed = false;

  constructor(private readonly host: SoftDismissHost) {
    host.addController(this);
  }

  hostConnected(): void {
    this.host.addEventListener('beforetoggle', this.onBeforeToggle);
    this.host.addEventListener('toggle', this.onToggle);
    if (this.host.hasUpdated) {
      this.sync();
    }
  }

  hostUpdated(): void {
    this.sync();
  }

  hostDisconnected(): void {
    this.host.removeEventListener('beforetoggle', this.onBeforeToggle);
    this.host.removeEventListener('toggle', this.onToggle);
  }

  /**
   * Someone opened the menu without setting `open` — a button wired straight
   * to it, or a `showPopover()` call.
   *
   * The browser offers two events for this, and only `beforetoggle` arrives
   * in time. It fires during the call that opens the menu, while `toggle`
   * waits its turn in the queue. A re-render can get in before that turn,
   * see `open` still saying `false`, and close the menu again.
   */
  private readonly onBeforeToggle = (event: Event): void => {
    if (!this.host.softDismiss) return;
    if ((event as ToggleEvent).newState !== 'open') return;
    this.host.open = true;
  };

  /**
   * The menu closed. Report it only when the browser did the closing.
   *
   * `open` tells the two apart: it is already `false` when the closing came
   * from this controller, and still `true` when the browser closed the menu
   * on a click outside or on `Escape`.
   *
   * The `softDismiss` check keeps this out of the way of components that run
   * a popover themselves. `obc-menu-button` does that with
   * `obc-context-menu-input`, and those closes are its business.
   */
  private readonly onToggle = (event: Event): void => {
    if (!this.host.softDismiss) return;
    if ((event as ToggleEvent).newState !== 'closed') return;
    if (!this.host.open) return;
    this.host.open = false;
    /**
     * Fired when the popover closed on its own — a click outside, `Escape`,
     * or another popover opening.
     * @event close
     * @type {CustomEvent<void>}
     */
    this.host.dispatchEvent(new CustomEvent('close'));
  };

  private sync(): void {
    const host = this.host;

    if (!host.softDismiss) {
      if (this.installed) {
        // Dropping the attribute puts the component back to an ordinary
        // element, which is what it was before opting in.
        host.removeAttribute('popover');
        this.installed = false;
      }
      return;
    }

    if (!this.installed) {
      host.setAttribute('popover', 'auto');
      this.installed = true;
    }

    // Showing a popover that is not on the page throws.
    if (!host.isConnected) return;

    const isOpen = host.matches(':popover-open');
    if (host.open && !isOpen) {
      host.showPopover();
    } else if (!host.open && isOpen) {
      host.hidePopover();
    }
  }
}

/**
 * Makes a button open and close a menu. Returns a function that unhooks it.
 *
 * Writing this by hand is where people get caught out. Clicking the button a
 * second time looks like it should close the menu, but the browser has
 * already closed it by then — that happens as the mouse goes down, before
 * the click arrives — so a handler that just flips the state opens it right
 * back up, and the menu appears stuck. Checking the state as the mouse goes
 * down instead is what makes the second click work (#1293, and the likely
 * cause of #1235).
 *
 * Keyboard presses never trigger that early close, so they read the current
 * state instead. `MouseEvent.detail` is how the two are told apart: it is `0`
 * only for the click that `Enter` and `Space` produce.
 *
 * HTML can pair a button with a popover on its own, but only inside the same
 * component. Reach for this when the button and the menu live apart.
 */
export function bindPopoverTrigger(
  trigger: HTMLElement,
  panel: SoftDismissHost
): () => void {
  let openBeforeAutoClose = false;

  const onPointerDown = (): void => {
    openBeforeAutoClose = panel.matches(':popover-open');
  };

  const onClick = (event: MouseEvent): void => {
    const wasOpen =
      event.detail > 0 ? openBeforeAutoClose : panel.matches(':popover-open');
    // Set before opening or closing, so a re-render in the same moment sees
    // the state the user just asked for.
    panel.open = !wasOpen;
    if (wasOpen) {
      panel.hidePopover();
    } else {
      panel.showPopover();
    }
  };

  trigger.addEventListener('pointerdown', onPointerDown);
  trigger.addEventListener('click', onClick);

  return () => {
    trigger.removeEventListener('pointerdown', onPointerDown);
    trigger.removeEventListener('click', onClick);
  };
}
