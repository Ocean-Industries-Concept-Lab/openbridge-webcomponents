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
 *   plain text decided by the caller and truncates with an ellipsis.
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
 *   `<obc-badge size="large">` with a severity `type` and a `number`. The
 *   badge `type` values are the same severity vocabulary as `AlertType`
 *   (`alarm`, `warning`, `caution` and the `level-*` family); order them
 *   highest severity first, as `ALERT_SEVERITY_PRIORITY` does.
 * - Set `hasAlert` to `false` to present the resolved/clear state; the badges
 *   are then not rendered and `emptyText` is shown. The component does not
 *   derive the state from the slotted badges — the consumer owns it.
 * - Choose `vertical` orientation in narrow containers where the badges do not
 *   fit beside the label.
 * - The counter is display-only: it renders no button and fires no events. For
 *   a clickable subsystem entry with badges, see `obc-tree-navigation-item`
 *   (`alertBadges`) or `obc-integration-fleet-button` (`alerts`).
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
 * @property label - The subsystem label. Pass a full title or an abbreviation as plain text.
 * @property orientation - Layout direction: `horizontal` (default) keeps icon, label and badges in one row; `vertical` moves the badges (or empty text) to a line below the label.
 * @property hasAlert - Whether the subsystem has active alerts. `true` shows the label bold and renders the `badges` slot; `false` mutes the label and shows `emptyText` instead of the badges.
 * @property emptyText - Text shown in the trailing area when `hasAlert` is `false`.
 * @availableWhen emptyText hasAlert==false
 * @slot icon - Optional leading 24px icon.
 * @slot badges - Count badges shown when `hasAlert` is true.
 * @beta
 */
@customElement('obc-alert-subsystem-counter')
export class ObcAlertSubsystemCounter extends LitElement {
  @property({type: String}) label = '';
  @property({type: String}) orientation: ObcAlertSubsystemCounterOrientation =
    ObcAlertSubsystemCounterOrientation.Horizontal;
  @property({type: Boolean}) hasAlert = false;
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
