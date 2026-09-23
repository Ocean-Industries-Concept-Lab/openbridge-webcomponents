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
 * Click outside an open menu and it should go away — and that click should
 * do nothing else. So should pressing `Escape`. The browser does most of
 * this on its own for an element marked as a popover, which is what this
 * controller switches on, and it brings two things that are hard to get
 * right by hand: focus returns to the button that opened the menu, and the
 * menu is drawn above the rest of the page whatever its container does with
 * `overflow`, `transform` or `z-index`.
 *
 * The one thing the browser will not do is swallow that outside click: left
 * alone it closes the menu *and* presses whatever was underneath. So the
 * controller gives the menu a see-through cover the size of the page, kept
 * behind the menu's own content. The menu is drawn above everything else on
 * the page, so its cover is too: clicks and hovers land on the cover instead
 * of the page, and the cover closes the menu. Consumers can tint it through
 * `::part(backdrop)`.
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
  private backdrop?: HTMLElement;
  /** Noted at a close that `open` did not ask for, so it can be reported. */
  private dismissed = false;
  /**
   * True from `beforetoggle` to `toggle`, while the browser is mid-way through
   * opening or closing. `sync()` stands down for that stretch: it would see
   * `open` already updated but the menu not yet moved, and try to move it
   * itself — nested inside the move the browser is making.
   */
  private toggling = false;

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
    this.toggling = false;
  }

  /**
   * The menu is about to open or close for a reason other than `open` being
   * set — a button wired straight to it, `Escape`, a click on the cover, a
   * direct `showPopover()`. `open` is brought into line here, at once.
   *
   * The browser offers two events for this and only `beforetoggle` arrives
   * in time. It fires during the call that opens or closes the menu, while
   * `toggle` waits its turn in the queue. A re-render can get in before that
   * turn, read an `open` that still says the old thing, and undo what just
   * happened — close a menu that was just opened, or reopen one that was
   * just closed.
   */
  private readonly onBeforeToggle = (event: Event): void => {
    if (!this.host.softDismiss) return;
    this.toggling = true;
    // `toggle` clears this. Should it never come — someone cancelled the
    // opening — the flag must not stay up, or `open` could never drive the
    // menu again. A timer runs after the browser has finished either way.
    setTimeout(() => {
      this.toggling = false;
    }, 0);
    if ((event as ToggleEvent).newState === 'open') {
      this.ensureCover();
      this.host.open = true;
      return;
    }
    // `open` is already false when this controller asked for the close;
    // still true means somebody else did, and the consumer should hear.
    this.dismissed = this.host.open;
    this.host.open = false;
  };

  /**
   * The menu has closed. Report it only when `open` did not ask for it.
   *
   * By now `open` is `false` either way — `beforetoggle` saw to that — so
   * the note it left in `dismissed` is what tells the two apart.
   *
   * The `softDismiss` check keeps this out of the way of components that run
   * a popover themselves. `obc-menu-button` does that with
   * `obc-context-menu-input`, and those closes are its business.
   */
  private readonly onToggle = (event: Event): void => {
    if (!this.host.softDismiss) return;
    this.toggling = false;
    if ((event as ToggleEvent).newState !== 'closed') return;
    if (!this.dismissed) return;
    this.dismissed = false;
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
        this.backdrop?.remove();
        this.backdrop = undefined;
      }
      return;
    }

    if (!this.installed) {
      host.setAttribute('popover', 'auto');
      this.installed = true;
      this.ensureCover();
    }

    // Showing a popover that is not on the page throws.
    if (!host.isConnected) return;
    if (this.toggling) return;

    const isOpen = host.matches(':popover-open');
    if (host.open && !isOpen) {
      host.showPopover();
    } else if (!host.open && isOpen) {
      host.hidePopover();
    }
  }

  /**
   * The see-through cover that swallows clicks while the menu is open.
   *
   * It is an ordinary child of the menu, not a popover of its own: the
   * browser refuses to show one popover while another is on its way up, so
   * the cover cannot be a popover shown as the menu opens. It does not need
   * to be. The menu is drawn above the whole page, so a child of the menu
   * that reaches over the page is drawn above the page as well, and a
   * negative `z-index` keeps it behind the menu's own content. It shows and
   * hides with the menu and never has to be told.
   *
   * Being inside the menu also means the browser treats a click on it as a
   * click *inside* the menu and leaves the menu open — so the cover closes
   * the menu itself.
   */
  private ensureCover(): void {
    const root = this.host.shadowRoot;
    if (!root || this.backdrop) return;
    const cover = document.createElement('div');
    cover.setAttribute('part', 'backdrop');
    cover.style.cssText =
      'position:fixed;inset:0;z-index:-1;margin:0;padding:0;border:0;' +
      'background:transparent';
    cover.addEventListener('click', () => this.host.hidePopover());
    root.append(cover);
    this.backdrop = cover;
  }
}

/**
 * Makes a button open and close a menu. Returns a function that unhooks it.
 *
 * There is less here than it looks like there should be. While the menu is
 * open its cover sits over the button as well, so a second mouse click never
 * reaches this handler: it lands on the cover, which closes the menu. What
 * does reach here is a keyboard press on the still-focused button. `open` is
 * not touched at all: the controller mirrors what the browser does, in both
 * directions, the moment it happens.
 *
 * HTML can pair a button with a popover on its own, but only inside the same
 * component. Reach for this when the button and the menu live apart.
 */
export function bindPopoverTrigger(
  trigger: HTMLElement,
  panel: SoftDismissHost
): () => void {
  const onClick = (): void => {
    if (panel.matches(':popover-open')) {
      panel.hidePopover();
    } else {
      panel.showPopover();
    }
  };

  trigger.addEventListener('click', onClick);
  return () => trigger.removeEventListener('click', onClick);
}
