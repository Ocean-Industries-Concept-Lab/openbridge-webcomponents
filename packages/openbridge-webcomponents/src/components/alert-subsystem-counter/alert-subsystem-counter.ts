import {LitElement, html, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './alert-subsystem-counter.css?inline';
import {customElement} from '../../decorator.js';

/**
 * `ObcAlertSubsystemCounterOrientation` – Layout direction for the counter.
 *
 * - `horizontal`: Icon, label, and badges sit in a single row.
 * - `vertical`: Badges (or empty text) sit on their own line below the label.
 */
export enum ObcAlertSubsystemCounterOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

/**
 * `<obc-alert-subsystem-counter>` – A framed summary of a subsystem's alert
 * counts: a leading icon, a label, and a trailing set of slotted count badges.
 *
 * When there are no active alerts it shows a muted label and an empty-state
 * message instead of the badges. The count badges themselves are supplied by
 * the consumer as slotted `obc-badge` elements; this component provides only
 * the frame, layout, label, and empty state.
 *
 * ---
 *
 * ### Features
 * - **Orientation:** `horizontal` (single row) or `vertical` (badges on a line
 *   below the label).
 * - **Alert state:** `hasAlert` toggles between an active (bold label, badges)
 *   and an inactive (muted label, empty text) presentation.
 * - **Freeform label:** Pass a full title or an abbreviation — the label is
 *   plain text decided by the caller.
 * - **Configurable empty text:** Customize the message shown when there are no
 *   alerts via `emptyText`.
 * - **Optional leading icon:** Provide an icon through the `icon` slot; omit it
 *   and the leading box collapses with no empty gap.
 *
 * ---
 *
 * ### Usage Guidelines
 * - Use this component to give an at-a-glance count of outstanding alerts for a
 *   single subsystem, grouped by severity.
 * - Provide one slotted badge per severity in the `badges` slot, typically
 *   `<obc-badge size="large">` with a severity `type` and a `number`.
 * - Set `hasAlert` to `false` to present the resolved/clear state; the badges
 *   are then hidden and `emptyText` is shown.
 * - Choose `vertical` orientation in narrow containers where the badges do not
 *   fit beside the label.
 *
 * ---
 *
 * ### Slots
 *
 * | Slot Name | Renders When...        | Purpose                                            |
 * |-----------|------------------------|----------------------------------------------------|
 * | `icon`    | The slot has content   | Leading 24px icon (e.g. `<obi-placeholder>`).      |
 * | `badges`  | `hasAlert` is true     | Count badges, one per severity (`<obc-badge>`).    |
 *
 * ---
 *
 * ### Example
 *
 * ```html
 * <obc-alert-subsystem-counter label="Label" hasAlert>
 *   <obi-placeholder slot="icon"></obi-placeholder>
 *   <obc-badge slot="badges" size="large" type="alarm" .number=${9}></obc-badge>
 *   <obc-badge slot="badges" size="large" type="warning" .number=${4}></obc-badge>
 *   <obc-badge slot="badges" size="large" type="caution" .number=${2}></obc-badge>
 * </obc-alert-subsystem-counter>
 * ```
 *
 * @slot icon - Optional leading 24px icon.
 * @slot badges - Count badges shown when `hasAlert` is true.
 */
@customElement('obc-alert-subsystem-counter')
export class ObcAlertSubsystemCounter extends LitElement {
  /**
   * The subsystem label. Pass a full title or an abbreviation as plain text.
   */
  @property({type: String}) label = '';

  /**
   * Layout direction.
   *
   * - `horizontal` (default): icon, label, and badges in one row.
   * - `vertical`: badges (or empty text) on a line below the label.
   */
  @property({type: String}) orientation: ObcAlertSubsystemCounterOrientation =
    ObcAlertSubsystemCounterOrientation.Horizontal;

  /**
   * Whether the subsystem has active alerts.
   *
   * When `true`, the label is shown active (bold) and the `badges` slot is
   * rendered. When `false`, the label is muted and `emptyText` is shown
   * instead of the badges.
   */
  @property({type: Boolean}) hasAlert = false;

  /**
   * Text shown in the trailing area when `hasAlert` is `false`.
   */
  @property({type: String}) emptyText = 'No alerts';

  @state() private hasIcon = false;

  private handleIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this.hasIcon = slot.assignedNodes({flatten: true}).length > 0;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          frame: true,
          ['orientation-' + this.orientation]: true,
          'has-alert': this.hasAlert,
        })}
      >
        <div class="leading-container">
          <div class=${classMap({icon: true, 'no-icon': !this.hasIcon})}>
            <slot name="icon" @slotchange=${this.handleIconSlotChange}></slot>
          </div>
          <div class="label">${this.label}</div>
        </div>
        <div class="trailing-container">
          ${this.hasAlert
            ? html`<slot name="badges" class="badges"></slot>`
            : html`<span class="empty">${this.emptyText}</span>`}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-subsystem-counter': ObcAlertSubsystemCounter;
  }
}
