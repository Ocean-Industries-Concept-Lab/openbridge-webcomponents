import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {localized, msg} from '@lit/localize';
import componentStyle from './alert-subsystem-button.css?inline';
import {customElement} from '../../decorator.js';
import '../alert-subsystem-counter/alert-subsystem-counter.js';
import '../alert-counter-item/alert-counter-item.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-alert-list.js';
import type {AlertCounts} from '../../types.js';
import {alertCountsLabel, rankAlertCounts} from '../../alert-severity.js';

/**
 * `<obc-alert-subsystem-button>` – A subsystem's alert counts as a split
 * control: the counts open the alert menu, the list icon goes to the alert
 * list page.
 *
 * The left half is `obc-alert-subsystem-counter` with the per-severity
 * `counts` drawn by `obc-alert-counter-item`, inside a button of the normal
 * style; the right half is an icon button with the alert list icon. The two
 * share one edge, as the halves of `obc-split-button` do.
 *
 * ---
 *
 * ### Features
 * - **Counts:** `counts` per severity, drawn as badges; `hasAlert` off, or
 *   on with nothing counted, shows `emptyText` instead.
 * - **Label and icon:** `label` and the `icon` slot, as on the counter.
 * - **Two halves:** `counter-click` from the counts, `alert-list-click` from
 *   the list icon; `counterDisabled` and `listDisabled` disable one half,
 *   `disabled` both.
 * - **List icon:** the `list-icon` slot, the alert list icon when empty.
 *
 * ---
 *
 * ### Usage Guidelines
 * - Show `obc-alert-menu` on `counter-click` and navigate on
 *   `alert-list-click`; the button reports the clicks and nothing more.
 * - Two native buttons, each a tab stop, activated by Enter and Space
 *   ([APG button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)).
 *   Left out: nothing.
 * - **TODO(designer):** the design draws an empty placeholder badge for each
 *   zero count; no counter in the library does, so only non-zero counts are
 *   drawn (#1396).
 * - **TODO(designer):** a disabled counter half dims its frame, while the
 *   severity badges keep their colour and the label its active colour; the
 *   design has no disabled variant.
 *
 * ---
 *
 * ### Example
 *
 * ```html
 * <obc-alert-subsystem-button label="HVAC" hasAlert .counts=${{countCaution: 2}}>
 *   <obi-placeholder slot="icon"></obi-placeholder>
 * </obc-alert-subsystem-button>
 * ```
 *
 * @property counts - Alert count per severity, drawn as badges in the counter half.
 * @availableWhen counts hasAlert==true
 * @property hasAlert - Whether the subsystem has active alerts: `true` draws the badges, `false` the `emptyText`; `true` with nothing counted shows the `emptyText` as well.
 * @property label - The subsystem label, before the badges.
 * @property emptyText - Text shown instead of the badges when `hasAlert` is `false` or nothing is counted.
 * @property disabled - Disables both halves.
 * @property counterDisabled - Disables the counter half alone.
 * @property listDisabled - Disables the list half alone.
 * @property listButtonLabel - Accessible name of the list half; "Alert list" when left empty.
 * @property ariaLabel - Accessible name of the counter half, mapped to the `aria-label` attribute; replaces the generated "HVAC, 2 Caution", or "Alerts" when the half has neither a label nor text. `aria-labelledby` is not supported: ID references cannot cross the shadow boundary.
 * @slot icon - Leading icon of the counter half.
 * @slot list-icon - Icon of the list half; the alert list icon when empty.
 * @fires {CustomEvent<void>} counter-click - Fired when the counter half is clicked.
 * @fires {CustomEvent<void>} alert-list-click - Fired when the list half is clicked.
 * @experimental
 */
@customElement('obc-alert-subsystem-button')
@localized()
export class ObcAlertSubsystemButton extends LitElement {
  @property({type: Object, attribute: false}) counts: AlertCounts = {};
  @property({type: Boolean}) hasAlert = false;
  @property({type: String}) label = '';
  @property({type: String}) emptyText = 'No alerts';
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) counterDisabled = false;
  @property({type: Boolean}) listDisabled = false;
  @property({type: String}) listButtonLabel = '';

  // Reactive so a consumer changing the name re-renders the inner button.
  @property({type: String, attribute: 'aria-label'})
  override ariaLabel: string | null = null;

  /** The flag the counter gets: `hasAlert` with nothing to draw reads as none. */
  private get showsCounts(): boolean {
    return this.hasAlert && rankAlertCounts(this.counts).length > 0;
  }

  private get counterName(): string {
    if (this.ariaLabel) {
      return this.ariaLabel;
    }
    const state = this.showsCounts
      ? alertCountsLabel(this.counts)
      : this.emptyText;
    return (
      [this.label, state].filter((part) => part !== '').join(', ') ||
      msg('Alerts')
    );
  }

  private handleCounterClick = (e: Event) => {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('counter-click'));
  };

  private handleListClick = (e: Event) => {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('alert-list-click'));
  };

  override render() {
    return html`
      <div class="wrapper">
        <button
          class="counter-button"
          data-testid="counter-button"
          ?disabled=${this.disabled || this.counterDisabled}
          aria-label=${this.counterName}
          @click=${this.handleCounterClick}
        >
          <div class="visible-wrapper">
            <obc-alert-subsystem-counter
              class="counter"
              .label=${this.label}
              .hasAlert=${this.showsCounts}
              .emptyText=${this.emptyText}
            >
              <slot name="icon" slot="icon"></slot>
              <obc-alert-counter-item
                slot="badges"
                .counts=${this.counts}
              ></obc-alert-counter-item>
            </obc-alert-subsystem-counter>
          </div>
        </button>
        <obc-icon-button
          class="list-button"
          data-testid="list-button"
          variant="normal"
          cornerRight
          ?disabled=${this.disabled || this.listDisabled}
          aria-label=${this.listButtonLabel || msg('Alert list')}
          @click=${this.handleListClick}
        >
          <slot name="list-icon"
            ><obi-alert-list aria-hidden="true"></obi-alert-list
          ></slot>
        </obc-icon-button>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-subsystem-button': ObcAlertSubsystemButton;
  }
}
