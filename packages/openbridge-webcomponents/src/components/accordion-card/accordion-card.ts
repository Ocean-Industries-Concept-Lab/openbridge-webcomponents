import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './accordion-card.css?inline';
import {property} from 'lit/decorators.js';
import '../../icons/icon-chevron-up-google.js';
import '../../icons/icon-chevron-down-google.js';
import '../alert-frame/alert-frame.js';
import {
  ObcAlertFrameStatus,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from '../alert-frame/alert-frame.js';

export enum AccordionSize {
  SingleLine = 'single-line',
  Large = 'large',
}

export enum Position {
  top = 'top',
  bottom = 'bottom',
  center = 'center',
  regular = 'regular',
}

/**
 * `<obc-accordion-card>` – Expandable/collapsible card component for grouping content in a compact, interactive section (accordion, expandable panel, disclosure).
 *
 * Provides a summary row with optional icon, title, description, and status label. Expands to reveal additional content on click/tap, supporting both single-line and large layouts. Can display an alert overlay for contextual warnings or notifications.
 *
 * ### Features
 * - **Expandable/collapsible:** Click/tap toggles between collapsed and expanded states, revealing or hiding additional content.
 * - **Variants:**
 *   - **Single-line:** Compact header with only title (and optional icon/status).
 *   - **Large:** Header includes a description beneath the title for more detail.
 * - **Positioning:** Supports `top`, `bottom`, `center`, or `regular` (default) border radius/edge styling for stacking multiple accordions.
 * - **Status label:** Optional status text displayed in the header (e.g., "Active", "Warning").
 * - **Leading icon:** Optional icon slot at the start of the header for visual context.
 * - **Alert overlay:** Can display an alert frame (with icon, label, timer) above the card for warnings or notifications.
 * - **Disabled state:** Prevents interaction and visually indicates non-interactive status.
 * - **Accessibility:** Uses button semantics and ARIA attributes for expand/collapse.
 *
 * ### Usage Guidelines
 * Use `obc-accordion-card` to organize related content in a collapsible section, especially when space is limited or when users may want to focus on one section at a time. Ideal for settings panels, grouped controls, or dashboards where expandable details are needed. Avoid using for persistent, always-visible content.
 *
 * - Use the **single-line** variant for brief titles or when space is tight.
 * - Use the **large** variant when you need to provide a short description or supporting text under the title.
 * - The **status label** is useful for showing quick state info (e.g., "Active", "Error").
 * - The **alert overlay** is intended for contextual warnings or notifications related to the card's content.
 * - For stacking multiple accordions, adjust the `position` property to control border radii and visual grouping.
 *
 * **TODO(designer):** Confirm if there are recommended limits on title/description length, and if only one accordion should be expanded at a time in a group.
 *
 * ### Slots
 * | Slot Name         | Renders When...         | Purpose                                               |
 * |-------------------|------------------------|-------------------------------------------------------|
 * | leading-icon      | `hasLeadingIcon` true  | Icon at the start of the header (e.g., `<obi-placeholder></obi-placeholder>`). |
 * | expanded-content  | Always                 | Content revealed when the accordion is expanded.      |
 * | alert-icon        | `hasAlert` true        | Icon for the alert overlay (slot="icon" in alert frame). |
 * | alert-label       | `hasAlert` true        | Label text for the alert overlay (slot="label" in alert frame). |
 * | alert-timer       | `hasAlert` true        | Timer or duration text for the alert overlay (slot="timer" in alert frame). |
 *
 * ### Properties
 * - `expanded` (boolean): Whether the card is expanded (shows additional content). Toggled by user interaction.
 * - `disabled` (boolean): Disables interaction and visually dims the card.
 * - `cardTitle` (string): Main title text shown in the header.
 * - `description` (string): Supporting description (shown only in large size and if `hasDescription` is true).
 * - `statusLabel` (string): Optional status text in the header (shown if `hasStatusLabel` is true).
 * - `hasAlert` (boolean): Shows an alert overlay above the card when true.
 * - `hasDescription` (boolean): Enables description text in large variant.
 * - `hasStatusLabel` (boolean): Enables status label in header.
 * - `hasLeadingIcon` (boolean): Enables leading icon slot in header.
 * - `size` (`AccordionSize` enum): Layout variant, either `'single-line'` (default) or `'large'`.
 * - `position` (`Position` enum): Controls border radius for stacking (`'top'`, `'bottom'`, `'center'`, `'regular'`).
 * - `alertFrameType`, `alertFrameThickness`, `alertFrameStatus`: Configure the alert overlay's appearance (see `obc-alert-frame` for details).
 *
 * ### Events
 * - `accordion-toggle` – Fired when the accordion is expanded or collapsed. Event detail includes `{ expanded, cardTitle }`.
 *
 * ### Best Practices
 * - Only use the alert overlay for important, contextual notifications related to the card's content.
 * - For accessibility, ensure the card title is descriptive and unique within a group.
 * - Avoid nesting interactive elements (like buttons) directly in the header; place them in the expanded content if needed.
 *
 * ### Example:
 * ```
 * <obc-accordion-card
 *   cardTitle="Settings"
 *   description="Configure your preferences"
 *   size="large"
 *   hasDescription
 *   expanded
 *   hasLeadingIcon
 * >
 *   <span slot="leading-icon"><obi-placeholder></obi-placeholder></span>
 *   <div slot="expanded-content">
 *     <!-- Additional settings controls here -->
 *   </div>
 * </obc-accordion-card>
 * ```
 *
 * @slot leading-icon - Icon at the start of the header (shown when `hasLeadingIcon` is true)
 * @slot expanded-content - Content revealed when the accordion is expanded
 * @slot alert-icon - Icon for the alert overlay (used when `hasAlert` is true)
 * @slot alert-label - Label text for the alert overlay (used when `hasAlert` is true)
 * @slot alert-timer - Timer/duration text for the alert overlay (used when `hasAlert` is true)
 * @fires accordion-toggle {CustomEvent<{expanded: boolean, cardTitle: string}>} Fired when the accordion is expanded or collapsed
 */
@customElement('obc-accordion-card')
export class ObcAccordionCard extends LitElement {
  /**
   * Main title text displayed in the accordion header.
   */
  @property({type: String}) cardTitle = '';

  /**
   * Supporting description text shown under the title (only in large size and if `hasDescription` is true).
   */
  @property({type: String}) description = '';

  /**
   * Optional status label displayed in the header (shown if `hasStatusLabel` is true).
   */
  @property({type: String}) statusLabel = '';

  /**
   * Whether the accordion card is expanded (shows additional content).
   */
  @property({type: Boolean}) expanded = false;

  /**
   * Disables the accordion card, preventing user interaction and dimming its appearance.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * Shows an alert overlay above the card when true. Configure appearance with `alertFrameType`, `alertFrameThickness`, and `alertFrameStatus`.
   */
  @property({type: Boolean}) hasAlert = false;

  /**
   * Enables the description text in the header (only in large size).
   */
  @property({type: Boolean}) hasDescription = false;

  /**
   * Enables the status label in the header.
   */
  @property({type: Boolean}) hasStatusLabel = false;

  /**
   * Enables the leading icon slot in the header.
   */
  @property({type: Boolean}) hasLeadingIcon = false;

  /**
   * Controls border radius/edge styling for stacking multiple accordions.
   * - `regular` (default): Standard border radius.
   * - `top`: Flat bottom edge (for top of a stack).
   * - `bottom`: Flat top edge (for bottom of a stack).
   * - `center`: Flat top and bottom edges (for middle of a stack).
   */
  @property({type: String}) position: Position = Position.regular;

  /**
   * Layout variant of the accordion card.
   * - `single-line` (default): Compact header with only title.
   * - `large`: Header includes a description beneath the title.
   */
  @property({type: String}) size: AccordionSize = AccordionSize.SingleLine;

  /**
   * Type of the alert frame overlay (used when `hasAlert` is true).
   * See `obc-alert-frame` for available types.
   */
  @property({type: String}) alertFrameType: ObcAlertFrameType =
    ObcAlertFrameType.Regular;

  /**
   * Thickness of the alert frame overlay (used when `hasAlert` is true).
   * See `obc-alert-frame` for available thickness values.
   */
  @property({type: String}) alertFrameThickness: ObcAlertFrameThickness =
    ObcAlertFrameThickness.Small;

  /**
   * Status of the alert frame overlay (used when `hasAlert` is true).
   * See `obc-alert-frame` for available statuses.
   */
  @property({type: String}) alertFrameStatus: ObcAlertFrameStatus =
    ObcAlertFrameStatus.Alarm;

  private get shouldShowDescription() {
    return (
      this.size === AccordionSize.Large &&
      this.hasDescription &&
      this.description.trim() !== ''
    );
  }

  private handleToggle() {
    if (this.disabled) return;

    this.expanded = !this.expanded;

    /**
     * Fired when the accordion is expanded or collapsed.
     * @fires accordion-toggle {CustomEvent<{expanded: boolean, cardTitle: string}>}
     */
    this.dispatchEvent(
      new CustomEvent('accordion-toggle', {
        detail: {
          expanded: this.expanded,
          cardTitle: this.cardTitle,
        },
      })
    );
  }

  private renderContentMain() {
    return html`
      <div class="header-container">
        <div class="content-container">
          ${this.hasLeadingIcon
            ? html`
                <div class="container-icon">
                  <slot name="leading-icon"></slot>
                </div>
              `
            : ''}
          <div class="container-labels">
            <div class="label-title">${this.cardTitle}</div>
            ${this.shouldShowDescription
              ? html` <div class="label-description">${this.description}</div> `
              : ''}
          </div>
          ${this.hasStatusLabel
            ? html`
                <div class="container-status">
                  <div class="status">${this.statusLabel}</div>
                </div>
              `
            : ''}
          <div class="trailing-icon">
            ${this.expanded
              ? html`<obi-chevron-up-google></obi-chevron-up-google>`
              : html`<obi-chevron-down-google></obi-chevron-down-google>`}
          </div>
        </div>
      </div>
    `;
  }

  private renderContentAdditional() {
    if (!this.expanded) return '';

    return html`
      <div class="container-content-additional">
        <slot name="expanded-content"></slot>
      </div>
    `;
  }

  private isShartEdgeBottom() {
    return this.position === Position.top || this.position === Position.center;
  }
  private isShartEdgeTop() {
    return (
      this.position === Position.bottom || this.position === Position.center
    );
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          'state-expanded': this.expanded,
          'state-collapsed': !this.expanded,
          'state-disabled': this.disabled,
          'style-single-line': this.size === AccordionSize.SingleLine,
          'style-large': this.size === AccordionSize.Large,
          'position-top': this.position === Position.top,
          'position-bottom': this.position === Position.bottom,
          'position-center': this.position === Position.center,
        })}
        style="position: relative;"
      >
        <div class="card-container">
          <button
            class="content-button"
            @click=${this.handleToggle}
            ?disabled=${this.disabled}
            aria-expanded=${this.expanded}
            aria-controls="accordion-content"
          >
            ${this.renderContentMain()}
          </button>

          ${this.renderContentAdditional()}
        </div>

        ${this.hasAlert
          ? html`
              <obc-alert-frame
                class="alert"
                .sharpEdgeTopLeft=${this.isShartEdgeTop()}
                .sharpEdgeTopRight=${this.isShartEdgeTop()}
                .sharpEdgeBottomLeft=${this.isShartEdgeBottom()}
                .sharpEdgeBottomRight=${this.isShartEdgeBottom()}
                .type=${this.alertFrameType}
                .thickness=${this.alertFrameThickness}
                .status=${this.alertFrameStatus}
              >
                <slot name="alert-icon" slot="icon"></slot>
                <slot name="alert-label" slot="label"></slot>
                <slot name="alert-timer" slot="timer"></slot>
              </obc-alert-frame>
            `
          : ''}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-accordion-card': ObcAccordionCard;
  }
}
