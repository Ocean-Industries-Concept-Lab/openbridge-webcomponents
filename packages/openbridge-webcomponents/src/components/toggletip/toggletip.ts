import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import toggletipStyle from './toggletip.css?inline';
import '../button/button.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * Enum representing the available visual variants for the Toggletip component.
 *
 * @remarks
 * Use these variants to adjust both the appearance and semantic meaning of a toggletip:
 * - `normal`: Standard appearance for general information.
 * - `raised`: Elevated style with a subtle shadow for emphasis.
 * - `enhanced`: More pronounced styling for critical highlights.
 * - `eco-feedback`: Soft, eco-themed styling ideal for sustainability messages.
 * - `caution`: Warning-style appearance to signal potential issues.
 * - `warning`: Strong alert styling for higher-severity notifications.
 * - `alarm`: High-impact styling for urgent or critical alerts.
 */
export enum ToggletipVariant {
  normal = 'normal',
  raised = 'raised',
  enhanced = 'enhanced',
  ecoFeedback = 'eco-feedback',
  caution = 'caution',
  warning = 'warning',
  alarm = 'alarm',
}

/**
 * `<obc-toggletip>` – A contextual message component for displaying inline notes, feedback, or alerts anchored to a UI element.
 *
 * The toggletip provides brief, focused information or actions related to a specific UI context, often appearing as a floating panel with an arrow pointing to its trigger. It supports a range of visual variants for different semantic meanings, from neutral information to critical alerts.
 *
 * Appears above the interface to deliver context-sensitive guidance, warnings, or actions without disrupting the main workflow. Commonly used for tooltips with rich content, inline help, or actionable notifications.
 *
 * ## Features
 *
 * - **Variants for semantic meaning:**
 *   - `normal` (default): Standard informational note.
 *   - `raised`: Elevated importance with a dark header for emphasis.
 *   - `enhanced`: For primary or enhanced information requiring user attention.
 *   - `eco-feedback`: Positive or environmental feedback.
 *   - `caution`: Indicates caution or minor issues.
 *   - `warning`: Highlights warnings or potential problems.
 *   - `alarm`: Signals critical or urgent conditions.
 * - **Customizable layout:**
 *   - Optional header (title container) and description.
 *   - Optional content area for custom elements or rich content.
 *   - Optional action buttons (primary and secondary).
 *   - Leading and trailing icon slots for visual context.
 *   - Adjustable width via `customWidth` property.
 * - **Icon logic:**
 *   - Leading icon is shown by default and adapts to the variant (e.g., warning, alarm, eco-feedback).
 *   - Trailing icon slot for additional context or actions.
 * - **Responsive and accessible:**
 *   - Content adapts to available space.
 *   - All sections (header, description, content, actions) can be toggled independently.
 * - **Events:**
 *   - `primary-action`: Fired when the primary action button is clicked.
 *   - `secondary-action`: Fired when the secondary action button is clicked.
 *
 * ## Usage Guidelines
 *
 * Use `obc-toggletip` to provide contextual information, warnings, or actions related to a specific UI element or state. Ideal for:
 * - Explaining the purpose or status of a control.
 * - Delivering inline feedback or guidance.
 * - Presenting warnings, cautions, or critical alerts in context.
 * - Offering quick actions related to the message.
 *
 * Avoid using for persistent or global alerts—use a banner or dialog for those cases. For simple tooltips with only text, a lightweight tooltip component may be more appropriate.
 *
 * **TODO(designer):** Confirm if there are recommended maximum lengths for title/description, and if both action buttons should always be shown together or if one is preferred as primary.
 *
 * ## Slots
 *
 * | Slot Name      | Renders When...              | Purpose                                               |
 * | -------------- | --------------------------- | ----------------------------------------------------- |
 * | leading-icon   | `hasLeadingIcon` is true    | Main icon representing the message type or context.   |
 * | trailing-icon  | `hasTrailingIcon` is true   | Additional icon for secondary context or actions.     |
 * | content        | `hasContent` is true        | Custom content area for rich or interactive elements. |
 *
 * ## Properties and Configuration
 *
 * - `variant`: Controls the visual style and semantic meaning (see Features above for all options).
 * - `title`: Sets the header text (shown if `hasTitleContainer` is true).
 * - `description`: Sets the main message text (shown if `hasDescription` is true).
 * - `hasTitleContainer`, `hasDescription`, `hasContent`, `hasActions`: Toggle visibility of each section.
 * - `hasLeadingIcon`, `hasTrailingIcon`: Toggle visibility of icon slots.
 * - `primaryButtonLabel`, `secondaryButtonLabel`: Set labels for action buttons (shown if `hasActions` is true).
 * - `customWidth`: Sets a custom width for the toggletip (in pixels).
 *
 * ## Events
 *
 * - `primary-action`: Fired when the primary action button is clicked. Event detail contains `{ label: string }`.
 * - `secondary-action`: Fired when the secondary action button is clicked. Event detail contains `{ label: string }`.
 *
 * ## Best Practices and Constraints
 *
 * - Use the variant that best matches the message's intent (e.g., `alarm` for critical, `eco-feedback` for positive).
 * - Keep messages concise and focused on the immediate context.
 * - Only show both action buttons if both are necessary; otherwise, prefer a single primary action.
 * - The toggletip should point to its related UI element and not obscure important content.
 * - For accessibility, ensure the toggletip is reachable via keyboard and screen reader.
 *
 * ## Example
 *
 * ```html
 * <obc-toggletip
 *   variant="warning"
 *   title="Unsaved Changes"
 *   description="You have unsaved edits. Save before leaving."
 *   hasActions
 *   primaryButtonLabel="Save"
 *   secondaryButtonLabel="Discard"
 *   @primary-action="${(e) => console.log('Primary clicked:', e.detail)}"
 *   @secondary-action="${(e) => console.log('Secondary clicked:', e.detail)}"
 * >
 *   <obi-warning slot="leading-icon"></obi-warning>
 *   <obi-close slot="trailing-icon"></obi-close>
 *   <div slot="content">Additional details or controls can go here.</div>
 * </obc-toggletip>
 * ```
 *
 * @slot leading-icon - Main icon representing the message type or context (shown when `hasLeadingIcon` is true)
 * @slot trailing-icon - Additional icon for secondary context or actions (shown when `hasTrailingIcon` is true)
 * @slot content - Custom content area for rich or interactive elements (shown when `hasContent` is true)
 *
 * @fires {CustomEvent} primary-action - Fired when the primary action button is clicked
 * @fires {CustomEvent} secondary-action - Fired when the secondary action button is clicked
 */
@customElement('obc-toggletip')
export class ObcToggletip extends LitElement {
  /**
   * Visual style and semantic meaning of the toggletip.
   *
   * - `normal` (default): Standard informational toggletip.
   * - `raised`: Elevated importance with dark header.
   * - `enhanced`: Used for enhanced or primary information.
   * - `eco-feedback`: Environmental or positive feedback messaging.
   * - `caution`: Indicates caution or minor issues.
   * - `warning`: Highlights warnings or potential problems.
   * - `alarm`: Signals critical or urgent conditions.
   */
  @property({type: String}) variant = 'normal' as ToggletipVariant;

  /**
   * Title text displayed in the header.
   */
  @property({type: String}) override title: string = '';

  /**
   * Description text shown in the content area.
   */
  @property({type: String}) description: string | undefined;

  /**
   * If true, shows the content slot area.
   * Use the `content` slot to provide custom content.
   */
  @property({type: Boolean}) hasContent = false;

  /**
   * If true, shows the action buttons container.
   * Both primary and secondary buttons are shown if labels are provided.
   * TODO(designer): Should both buttons always be shown, or is one preferred as primary?
   */
  @property({type: Boolean}) hasActions = false;

  /**
   * If true, shows the leading icon in the header.
   * The icon adapts to the current `variant` by default, or can be overridden via the `leading-icon` slot.
   */
  @property({type: Boolean}) hasLeadingIcon = false;

  /**
   * If true, shows the trailing icon in the header.
   * Use the `trailing-icon` slot to provide a custom icon.
   */
  @property({type: Boolean}) hasTrailingIcon = false;

  /**
   * Sets a custom width for the toggletip in pixels.
   * If not set, defaults to 400px.
   */
  @property({type: Number}) customWidth?: number;

  /**
   * Label for the primary action button.
   * Only shown if `hasActions` is true.
   */
  @property({type: String}) primaryButtonLabel = 'Label';

  /**
   * Label for the secondary action button.
   * Only shown if `hasActions` is true.
   */
  @property({type: String}) secondaryButtonLabel = 'Label';

  /**
   * Handles primary button click and dispatches custom event
   */
  private handlePrimaryAction() {
    this.dispatchEvent(
      new CustomEvent('primary-action', {
        detail: {label: this.primaryButtonLabel},
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Handles secondary button click and dispatches custom event
   */
  private handleSecondaryAction() {
    this.dispatchEvent(
      new CustomEvent('secondary-action', {
        detail: {label: this.secondaryButtonLabel},
        bubbles: true,
        composed: true,
      })
    );
  }

  private renderLeadingIcon() {
    switch (this.variant) {
      case ToggletipVariant.alarm:
        return html`
          <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none">
            <path
              d="M5.29694 1.72622L1.05702 9.32693C0.838739 9.71823 0.729598 9.91388 0.748108 10.0741C0.764257 10.2138 0.83853 10.3403 0.952704 10.4225C1.08357 10.5167 1.3076 10.5167 1.75567 10.5167H10.233C10.6809 10.5167 10.9049 10.5167 11.0357 10.4225C11.1499 10.3403 11.2242 10.2139 11.2404 10.0741C11.2589 9.914 11.1498 9.71837 10.9317 9.3271L6.69433 1.7264C6.46616 1.31712 6.35207 1.11247 6.20181 1.04447C6.07082 0.985194 5.92064 0.985175 5.78964 1.04442C5.63936 1.11238 5.52522 1.317 5.29694 1.72622Z"
              fill="currentColor"
            />
          </svg>
        `;
      case ToggletipVariant.warning:
        return html`
          <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none">
            <circle
              cx="6"
              cy="6"
              r="4.5"
              fill="currentColor"
              stroke="currentColor"
            />
          </svg>
        `;
      case ToggletipVariant.caution:
        return html`
          <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.2998 2H9.7002C9.848 2 9.92907 2.00015 9.9873 2.00488C9.98955 2.00507 9.99213 2.0047 9.99414 2.00488C9.99436 2.0072 9.9949 2.01006 9.99512 2.0127C9.99985 2.07093 10 2.152 10 2.2998V9.7002C10 9.848 9.99985 9.92907 9.99512 9.9873C9.99493 9.98958 9.99433 9.9921 9.99414 9.99414C9.9921 9.99433 9.98958 9.99493 9.9873 9.99512C9.92907 9.99985 9.848 10 9.7002 10H2.2998C2.152 10 2.07093 9.99985 2.0127 9.99512C2.01006 9.9949 2.0072 9.99436 2.00488 9.99414C2.0047 9.99213 2.00507 9.98955 2.00488 9.9873C2.00015 9.92907 2 9.848 2 9.7002V2.2998L2.00488 2.0127C2.0051 2.01009 2.00467 2.00718 2.00488 2.00488C2.00718 2.00467 2.01009 2.0051 2.0127 2.00488L2.2998 2Z"
              fill="currentColor"
              stroke="currentColor"
            />
          </svg>
        `;
      case ToggletipVariant.ecoFeedback:
        return html`
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 20C11.0667 20 10.1875 19.8542 9.3625 19.5625C8.5375 19.2708 7.78333 18.8583 7.1 18.325L5.7 19.7C5.51667 19.8833 5.28333 19.975 5 19.975C4.71667 19.975 4.48333 19.8833 4.3 19.7C4.11667 19.5167 4.025 19.2833 4.025 19C4.025 18.7167 4.11667 18.4833 4.3 18.3L5.675 16.925C5.14167 16.2417 4.72917 15.4833 4.4375 14.65C4.14583 13.8167 4 12.9333 4 12C4 9.76667 4.775 7.875 6.325 6.325C7.875 4.775 9.76667 4 12 4H20V12C20 14.2333 19.225 16.125 17.675 17.675C16.125 19.225 14.2333 20 12 20ZM16.25 16.25C15.0833 17.4167 13.6667 18 12 18C11.35 18 10.7292 17.9042 10.1375 17.7125C9.54583 17.5208 9.00833 17.25 8.525 16.9L13.7 11.725C13.9 11.525 14 11.2875 14 11.0125C14 10.7375 13.9 10.5 13.7 10.3C13.5167 10.1167 13.2833 10.025 13 10.025C12.7167 10.025 12.4833 10.1167 12.3 10.3L7.125 15.475C6.775 14.9917 6.5 14.4542 6.3 13.8625C6.1 13.2708 6 12.65 6 12C6 10.3333 6.58333 8.91667 7.75 7.75C8.91667 6.58333 10.3333 6 12 6H18V12C18 13.6667 17.4167 15.0833 16.25 16.25Z"
              fill="currentColor"
            />
          </svg>
        `;
      default:
        return html`<slot name="leading-icon"></slot>`;
    }
  }

  override render() {
    const style = this.customWidth ? `width: ${this.customWidth}px` : '';

    return html`
      <div
        class=${classMap({
          wrapper: true,
          [this.variant]: true,
        })}
        style=${style}
      >
        <div class="container">
          ${this.title.length > 0
            ? html`
                <div class="container-header">
                  <div class="title-container">
                    ${this.hasLeadingIcon
                      ? html`
                          <div class="leading-icon">
                            ${this.renderLeadingIcon()}
                          </div>
                        `
                      : ''}
                    <div class="container-title">
                      <div class="title">${this.title}</div>
                    </div>
                  </div>
                  ${this.hasTrailingIcon
                    ? html`
                        <div class="trailing-icon">
                          <slot name="trailing-icon"></slot>
                        </div>
                      `
                    : ''}
                </div>
              `
            : nothing}

          <div class="content-container">
            ${this.description !== undefined
              ? html` <div class="description">${this.description}</div> `
              : nothing}
            ${this.hasContent
              ? html`
                  <div class="content">
                    <slot name="content"> </slot>
                  </div>
                `
              : nothing}
            ${this.hasActions
              ? html`
                  <div class="action-container">
                    <div class="action-button">
                      <obc-button
                        ?fullWidth=${true}
                        @click=${this.handlePrimaryAction}
                        >${this.primaryButtonLabel}</obc-button
                      >
                    </div>
                    <div class="action-button">
                      <obc-button
                        ?fullWidth=${true}
                        @click=${this.handleSecondaryAction}
                        >${this.secondaryButtonLabel}</obc-button
                      >
                    </div>
                  </div>
                `
              : nothing}
          </div>
        </div>

        <div class="bottom-arrow"></div>
      </div>
    `;
  }

  static override styles = unsafeCSS(toggletipStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggletip': ObcToggletip;
  }
}
