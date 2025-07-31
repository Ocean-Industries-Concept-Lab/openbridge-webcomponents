import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './tooltip.css?inline';
import '../icon-button/icon-button.js';
import '../../icons/icon-application-open-google.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-tooltip>` – A contextual tooltip component for displaying brief, supplementary information or status notes.
 *
 * Appears as a floating panel with an icon, title, and description, optionally including an action button. Designed to provide non-intrusive, inline help, explanations, or status feedback associated with an element or area of the UI.
 *
 * ### Features
 * - **Variants:**
 *   - `neutral` (default): Standard informational tooltip.
 *   - `notification`: Used for positive or informational notifications.
 *   - `caution`: Indicates caution or minor issues.
 *   - `warning`: Highlights warnings or potential problems.
 *   - `alarm`: Signals critical or urgent conditions.
 * - **Directional Arrow:**
 *   - Supports a right-pointing arrow (`rightArrow` property) to visually anchor the tooltip to the right side of a target.
 * - **Icon Slot:**
 *   - Customizable icon via the `icon` slot, visually reinforcing the message type.
 * - **Action Button:**
 *   - Includes an optional action button (with a "more" icon) for additional interactions.
 * - **Content Structure:**
 *   - Title (label), description (text), and divider for clear separation.
 * - **Responsive Styling:**
 *   - Adapts background and icon colors to match the selected variant.
 *
 * ### Usage Guidelines
 * Use `obc-tooltip` to provide contextual help, explanations, or status updates related to a specific UI element or region. Ideal for supplementing controls with additional information, clarifying statuses, or drawing attention to important details without interrupting the user's workflow.
 *
 * - Use the `neutral` variant for general information.
 * - Use `notification`, `caution`, `warning`, or `alarm` to visually distinguish different levels of importance or urgency.
 * - The right-pointing arrow can be enabled to anchor the tooltip visually to the right of the target element.
 * - For persistent or critical alerts that require user acknowledgment, consider using a dialog or alert banner instead.
 *
 * **TODO(designer):** Confirm if the action button is always shown or should be conditionally rendered. Clarify recommended usage for the action button and any best practices for tooltip content length.
 *
 * ### Slots
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | `icon`    | Always          | Main icon representing the tooltip's type or context. |
 *
 * ### Events
 * - `click:more` – Fired when the action button (with the "more" icon) is clicked.
 *
 * ### Example:
 * ```
 * <obc-tooltip variant="warning" label="Low Battery" text="Charge soon.">
 *   <obi-placeholder slot="icon"></obi-placeholder>
 * </obc-tooltip>
 * ```
 *
 * @slot icon - Main icon representing the tooltip's type or context.
 * @fires click:more {CustomEvent<void>} When the action button is clicked.
 */
export enum TooltipVariant {
  neutral = 'neutral',
  notification = 'notification',
  caution = 'caution',
  warning = 'warning',
  alarm = 'alarm',
}

/**
 * See class-level documentation for usage and features.
 */
@customElement('obc-tooltip')
export class ObcTooltip extends LitElement {
  /**
   * Visual style and semantic meaning of the tooltip.
   *
   * - `neutral` (default): Standard informational tooltip.
   * - `notification`: Used for positive or informational notifications.
   * - `caution`: Indicates caution or minor issues.
   * - `warning`: Highlights warnings or potential problems.
   * - `alarm`: Signals critical or urgent conditions.
   */
  @property({type: String}) variant = 'neutral' as TooltipVariant;

  /**
   * Title or heading text displayed at the top of the tooltip.
   */
  @property({type: String}) label = 'Title';

  /**
   * Main descriptive text or supplementary information shown in the tooltip.
   */
  @property({type: String}) text = 'Tooltip text';

  /**
   * If true, displays the tooltip with a right-pointing arrow, visually anchoring it to the right of the target element.
   */
  @property({type: Boolean}) rightArrow = false;

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          [this.variant]: true,
          'right-arrow': this.rightArrow,
        })}
      >
        <div class="icon">
          <slot name="icon"></slot>
        </div>
        <div class="content">
          <div class="header">
            <div class="title">${this.label}</div>
            <div class="btn">
              <obc-icon-button
                activecolor
                variant="flat"
                @click="${() =>
                  this.dispatchEvent(new CustomEvent('click:more'))}"
              >
                <obi-application-open-google></obi-application-open-google>
              </obc-icon-button>
            </div>
          </div>

          <div class="divider"></div>
          <div class="text">${this.text}</div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-tooltip': ObcTooltip;
  }
}
