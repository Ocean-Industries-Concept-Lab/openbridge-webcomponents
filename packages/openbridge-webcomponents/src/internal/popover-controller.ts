import type {LitElement, ReactiveController} from 'lit';

/**
 * The two properties {@link PopoverController} reads off its host.
 *
 * `softDismiss` is opt-in because a `popover` element is `display: none` until
 * it is shown: turning it on unconditionally would hide every panel that a
 * consumer renders and positions itself today.
 */
export interface SoftDismissHost extends LitElement {
  /** Opt in to the top layer and light dismiss. */
  softDismiss: boolean;
  /** Whether the panel is showing. Read only while `softDismiss` is true. */
  open: boolean;
}

/**
 * Makes the host itself a light-dismissible popover (#1293).
 *
 * While `softDismiss` is true the host carries `popover="auto"`, so the
 * browser owns dismissal: a pointer down outside closes it, `Escape` closes
 * it, opening a second `auto` popover closes this one, and focus returns to
 * the invoker. None of that is re-implemented here, and the host renders in
 * the top layer, so an ancestor's `overflow: hidden`, `transform` or
 * `z-index` no longer clips it.
 *
 * The host keeps `open` as its public API, and the controller mirrors the DOM
 * back into it in both directions: a dismissal the browser performs sets it
 * to `false` and fires `close`, and an open the browser performs sets it to
 * `true`. Without that second half the next `sync()` would read a stale
 * `false` and close a popover something else had just opened.
 *
 * The trigger lives outside the host in every current consumer, so binding it
 * is {@link bindPopoverTrigger}'s job, not this controller's.
 */
export class PopoverController implements ReactiveController {
  private installed = false;

  constructor(private readonly host: SoftDismissHost) {
    host.addController(this);
  }

  hostConnected(): void {
    this.host.addEventListener('toggle', this.onToggle);
    if (this.host.hasUpdated) {
      this.sync();
    }
  }

  hostUpdated(): void {
    this.sync();
  }

  hostDisconnected(): void {
    this.host.removeEventListener('toggle', this.onToggle);
  }

  /**
   * A close the browser performed. `open` is already `false` whenever this
   * controller did the closing, so a still-true `open` is what distinguishes
   * light dismiss and `Escape` from a programmatic one.
   *
   * The `softDismiss` check matters for a host another component opens as a
   * popover of its own: `obc-menu-button` sets `popover="auto"` on
   * `obc-context-menu-input` in its template, and that panel's dismissals are
   * the menu button's business, not this controller's.
   */
  private readonly onToggle = (event: Event): void => {
    if (!this.host.softDismiss) return;

    if ((event as ToggleEvent).newState === 'open') {
      // Opened by something other than `open` — a `popovertarget` invoker, or
      // a direct `showPopover()`. Mirror it, or the next `sync()` reads a
      // stale `false` and closes what was just opened.
      this.host.open = true;
      return;
    }

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
        // Removing the attribute closes an open popover and restores the
        // host's normal display, which is the pre-opt-in behaviour.
        host.removeAttribute('popover');
        this.installed = false;
      }
      return;
    }

    if (!this.installed) {
      host.setAttribute('popover', 'auto');
      this.installed = true;
    }

    // showPopover() throws InvalidStateError off-document.
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
 * Wires an external trigger to a popover panel and returns a disposer.
 *
 * A naive `open ? hide() : show()` in a click handler leaves the panel stuck
 * open, because light dismiss already closed it on `pointerdown` and the
 * click then reopens it (#1293, and the suspected cause of #1235). The state
 * a pointer click has to act on is therefore the one captured before light
 * dismiss ran; a keyboard activation, which light dismiss never sees, reads
 * the live state instead. `MouseEvent.detail` is 0 only for the synthesised
 * click that `Enter` and `Space` produce, which is what tells the two apart.
 *
 * Use this wherever `popovertarget` cannot: it does not cross shadow roots,
 * so a trigger inside one component's shadow DOM cannot declare a panel that
 * lives in another tree.
 */
export function bindPopoverTrigger(
  trigger: HTMLElement,
  panel: SoftDismissHost
): () => void {
  let openBeforeLightDismiss = false;

  const onPointerDown = (): void => {
    openBeforeLightDismiss = panel.matches(':popover-open');
  };

  const onClick = (event: MouseEvent): void => {
    const wasOpen =
      event.detail > 0
        ? openBeforeLightDismiss
        : panel.matches(':popover-open');
    // Written before the native call, not left to the queued `toggle` event:
    // a Lit update is a microtask and would run first, with `sync()` reading
    // the stale value.
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
