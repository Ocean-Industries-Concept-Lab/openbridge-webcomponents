import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './advice-button.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-notification-advice.js';
import '../../icons/icon-notification-advice-active.js';

/**
 * Enum for the visual style variants of `<obc-advice-button>`.
 *
 * - `Flat`: Minimal appearance, typically used for inactive or low-emphasis states.
 * - `Normal`: Standard appearance, visually highlighted when active.
 * - `Enhanced`: Most prominent style, used for high emphasis or active states.
 *
 * The selected style affects the button's background, border, and icon color. Note that `Normal` and `Enhanced` styles are only visually distinct when `isActive` is true.
 */
export enum AdviceButtonStyle {
  Flat = 'flat',
  Normal = 'normal',
  Enhanced = 'enhanced',
}

/**
 * Payload for the `obc-click` event dispatched by `<obc-advice-button>`.
 *
 * - `count`: The current advice count displayed on the button.
 * - `isActive`: The toggled active state after the click.
 */
export type AdviceButtonClickEvent = CustomEvent<{
  count: number;
  isActive: boolean;
}>;

/**
 * `<obc-advice-button>` – An icon button for surfacing advice, notifications, or contextual alerts, optionally with a counter badge.
 *
 * This component displays an advice or notification icon, with optional count badge and active state. It supports three visual styles (flat, normal, enhanced) and can be customized with a slot for a custom icon. The button toggles its active state on click and emits an event with the updated state and count.
 *
 * Appears as a compact icon button, suitable for toolbars, notification areas, or anywhere a summary of advice/messages should be surfaced without interrupting the main workflow.
 *
 * ## Features
 * - **Visual Styles:**
 *   - `Flat` (default): Minimal, low-emphasis appearance.
 *   - `Normal`: Standard, highlighted when active.
 *   - `Enhanced`: Most prominent, with accent background and border when active.
 * - **Active State:**
 *   - Indicates selection or focus; changes icon and style when `isActive` is true.
 * - **Advice Counter:**
 *   - Optional badge showing the number of advice items (`count`), visible when `showCount` is true and style is `Normal` or `Enhanced`.
 * - **Custom Icon Support:**
 *   - Replace the default icon by providing content in the `icon` slot.
 * - **Accessibility:**
 *   - Configurable `aria-label` and `aria-pressed` for screen readers.
 * - **Event Emission:**
 *   - Emits a custom `obc-click` event with the new state and count when clicked.
 *
 * ## Usage Guidelines
 * Use `<obc-advice-button>` to provide a compact, visually distinct entry point for advice, notifications, or contextual alerts. It is ideal for toolbars, notification panels, or as a summary indicator for advice/messages.
 * - Use the `count` and `showCount` properties to display the number of advice items or notifications.
 * - Choose the style (`buttonStyle`) based on the desired emphasis:
 *   - Use `Flat` for low-priority or inactive states.
 *   - Use `Normal` or `Enhanced` for active or high-priority states (set `isActive` to true for these styles to take effect).
 * - Replace the icon via the `icon` slot if a different symbol is needed.
 * - The button toggles its active state on click and notifies listeners via the `obc-click` event.
 *
 * **TODO(designer):** Clarify recommended scenarios for using each style (Flat, Normal, Enhanced) and any specific guidance for when to show the counter.
 *
 * ## Slots
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|----------------|---------|
 * | `icon`    | Always         | Custom icon to replace the default advice/notification icon. |
 *
 * ## Events
 * - `obc-click` – Fired when the button is clicked. Event detail includes `{ count, isActive }` reflecting the new state.
 *
 * ## Example
 * ```
 * <obc-advice-button
 *   buttonStyle="normal"
 *   count="3"
 *   showCount
 *   isActive
 *   ariaLabel="Advice"
 *   @obc-click="${(e) => { ... }}"
 * >
 *   <obi-placeholder slot="icon"></obi-placeholder>
 * </obc-advice-button>
 * ```
 *
 * @slot icon - Custom icon slot (replaces the default advice icon)
 * @fires obc-click {AdviceButtonClickEvent} Fired when the button is clicked.
 */
@customElement('obc-advice-button')
export class ObcAdviceButton extends LitElement {
  /**
   * Visual style of the button.
   *
   * - `flat`: Minimal, low-emphasis appearance (default).
   * - `normal`: Standard, highlighted when active (`isActive` must be true for effect).
   * - `enhanced`: Most prominent, accent background/border when active (`isActive` must be true for effect).
   *
   * @default AdviceButtonStyle.Flat
   */
  @property({type: String}) buttonStyle: AdviceButtonStyle =
    AdviceButtonStyle.Flat;

  /**
   * Number of advice items or notifications to display in the badge.
   * Only shown when `showCount` is true and style is `normal` or `enhanced`.
   *
   * @default 0
   */
  @property({type: Number}) count = 0;

  /**
   * Whether to display the advice count badge.
   * If false, the count is hidden even if `count` is set.
   *
   * @default false
   */
  @property({type: Boolean}) showCount = false;

  /**
   * Whether the button is in the active/selected state.
   * Changes the icon and style when true.
   *
   * @default false
   */
  @property({type: Boolean}) isActive = false;

  /**
   * Accessibility label for the button.
   * Used for screen readers via `aria-label`.
   *
   * @default "Advice"
   */
  @property({type: String}) override ariaLabel = 'Advice';

  override render() {
    const useNormal =
      this.isActive && this.buttonStyle === AdviceButtonStyle.Normal;
    const useEnhanced =
      this.isActive && this.buttonStyle === AdviceButtonStyle.Enhanced;
    const useFlat =
      this.buttonStyle === AdviceButtonStyle.Flat ||
      (!useNormal && !useEnhanced);

    const hasCounter = (useNormal || useEnhanced) && this.showCount;

    const wrapperClasses = {
      wrapper: true,
      'is-active': this.isActive,
      'has-counter': hasCounter,
      flat: useFlat,
      normal: useNormal,
      enhanced: useEnhanced,
    };

    const visibleWrapperClasses = {
      'visible-wrapper': true,
    };

    return html`
      <button
        class="${classMap(wrapperClasses)}"
        @click="${this.handleClick}"
        aria-label="${this.ariaLabel}${hasCounter ? `, ${this.count} new` : ''}"
        aria-pressed="${this.isActive}"
        role="button"
        type="button"
      >
        <div class="${classMap(visibleWrapperClasses)}">
          <div class="icon-container">
            <slot name="icon"> ${this.renderDefaultIcon()} </slot>
          </div>
          ${hasCounter
            ? html` <span class="count-label">${this.count}</span> `
            : nothing}
        </div>
      </button>
    `;
  }

  private renderDefaultIcon() {
    if (this.isActive) {
      return html`<obi-notification-advice-active></obi-notification-advice-active>`;
    }
    return html`<obi-notification-advice></obi-notification-advice>`;
  }

  private handleClick() {
    const event: AdviceButtonClickEvent = new CustomEvent('obc-click', {
      detail: {
        count: this.count,
        isActive: !this.isActive,
      },
      composed: true,
      bubbles: true,
    });

    this.dispatchEvent(event);
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-advice-button': ObcAdviceButton;
  }
}
