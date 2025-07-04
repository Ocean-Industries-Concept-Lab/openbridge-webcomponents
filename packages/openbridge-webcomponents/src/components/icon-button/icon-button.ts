import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import iconStyle from './icon-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

export enum IconButtonVariant {
  normal = 'normal',
  raised = 'raised',
  flat = 'flat',
}

/**
 * `<obc-icon-button>` – An icon-only or icon-with-label button for quick actions.
 *
 * Provides a compact, visually prominent button that displays an icon (and optionally a label) for triggering actions. Commonly used for toolbars, navigation, or contextual actions where space is limited and a recognizable icon can represent the function.
 *
 * Appears as a circular or rounded button with configurable visual styles, supporting progress indication and various layout adaptations.
 *
 * ## Features
 * - **Variants:**  
 *   - `normal` (default): Standard appearance for most use cases.
 *   - `raised`: Adds elevation/shadow for prominence.
 *   - `flat`: Minimal, backgroundless style for subtle actions.
 * - **Progress Indicator:**  
 *   - Shows a circular progress spinner overlay when the `progress` property is set (0–100). Useful for indicating loading or ongoing actions.
 * - **Label Support:**  
 *   - Optionally displays a text label below the icon when `hasLabel` is true and content is provided in the `label` slot.
 * - **Corner Alignment:**  
 *   - `cornerLeft` and `cornerRight` adjust the button's border radius and alignment for seamless placement at the start or end of a container.
 * - **Active State:**  
 *   - `activated` visually highlights the button as selected or toggled.
 *   - `activeColor` applies an accent color for emphasis.
 * - **Wide Mode:**  
 *   - `wide` increases the button's width for easier touch targets or visual balance.
 * - **Disabled State:**  
 *   - `disabled` prevents interaction and visually dims the button.
 *
 * ## Usage Guidelines
 * - Use `obc-icon-button` for actions represented by icons, such as toolbars, navigation, or quick-access commands.
 * - Add a label (with `hasLabel` and the `label` slot) when clarity is needed or when icons alone may not be universally understood.
 * - Use the progress indicator for actions that take time, such as uploads or background processes.
 * - Prefer the `normal` variant for most cases; use `raised` to draw attention, and `flat` for less prominent or inline actions.
 * - For grouped or edge-aligned layouts, use `cornerLeft` or `cornerRight` to visually merge with container edges.
 * - Avoid using icon buttons for destructive or critical actions unless paired with clear feedback.
 * - TODO(designer): Clarify recommended icon sizes and when to use label vs. icon-only.
 *
 * ## Slots
 * | Slot Name | Renders When...      | Purpose                                      |
 * |-----------|---------------------|----------------------------------------------|
 * | (default) | Always              | The icon to display (e.g., `<obi-search>`)   |
 * | label     | If `hasLabel` is set | Optional label text below the icon           |
 *
 * ## Best Practices
 * - Ensure icons are clear and universally recognizable.
 * - For accessibility, provide an `aria-label` or descriptive label for the button's action.
 * - When using the progress indicator, avoid showing it for very short actions to prevent visual flicker.
 *
 * ## Example:
 * ```
 * <obc-icon-button variant="normal">
 *   <obi-search></obi-search>
 * </obc-icon-button>
 *
 * <obc-icon-button variant="normal" hasLabel>
 *   <obi-arrow></obi-arrow>
 *   <span slot="label">Next</span>
 * </obc-icon-button>
 * ```
 *
 * @slot - Icon slot (default): Place an icon such as <obi-search> here.
 * @slot label - Optional label shown below the icon when `hasLabel` is true.
 */
@customElement('obc-icon-button')
export class ObcIconButton extends LitElement {
  /**
   * Visual style of the button.  
   * - `normal`: Standard appearance (default).
   * - `raised`: Elevated with shadow.
   * - `flat`: Minimal, backgroundless style.
   */
  @property({type: String}) variant: IconButtonVariant =
    IconButtonVariant.normal;

  /**
   * Whether the button is in an activated (selected/toggled) state.
   * Visually highlights the button to indicate selection.
   */
  @property({type: Boolean}) activated = false;

  /**
   * If true, aligns the button to the left edge and removes left border radius.
   * Useful for grouping or edge-aligned layouts.
   */
  @property({type: Boolean}) cornerLeft = false;

  /**
   * If true, aligns the button to the right edge and removes right border radius.
   * Useful for grouping or edge-aligned layouts.
   */
  @property({type: Boolean}) cornerRight = false;

  /**
   * Applies an accent color to the button for emphasis.
   * Used to visually distinguish active or important actions.
   */
  @property({type: Boolean}) activeColor = false;

  /**
   * Increases the button's width for larger touch targets or visual balance.
   */
  @property({type: Boolean}) wide = false;

  /**
   * Disables the button, preventing user interaction and dimming its appearance.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * Shows a circular progress indicator overlay when set (0–100).
   * Use to indicate ongoing actions or loading states.
   * If undefined, no progress indicator is shown.
   */
  @property({type: Number}) progress: undefined | number = undefined;

  /**
   * If true, displays a label below the icon using the `label` slot.
   */
  @property({type: Boolean}) hasLabel: boolean = false;

  get progressSpinner() {
    if (this.progress === undefined) {
      return nothing;
    }
    if (this.progress === 100) {
      return html`<div class="progress-spinner">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="#325B9A"
            stroke-width="4"
            fill="none"
          />
        </svg>
      </div>`;
    }
    const angleRad = (this.progress * 0.95 * 3.6 * Math.PI) / 180;
    const x = 20 + 18 * Math.sin(angleRad);
    const y = 20 - 18 * Math.cos(angleRad);
    const largeArcFlag = angleRad > Math.PI ? 1 : 0;
    return html`<div class="progress-spinner">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="var(--container-backdrop-color)"
          stroke-width="4"
          fill="none"
        />
        <path
          d="M18 2 A18 18 0 ${largeArcFlag} 1 ${x} ${y}"
          stroke="var(--instrument-enhanced-secondary-color)"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>
    </div>`;
  }

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          ['variant-' + this.variant]: true,
          activated: this.activated,
          'corner-left': this.cornerLeft,
          'corner-right': this.cornerRight,
          'active-color': this.activeColor,
          'has-label': this.hasLabel,
          wide: this.wide,
          progress: this.progress !== undefined,
        })}
        ?disabled=${this.disabled}
        part="wrapper"
      >
        ${this.progress !== undefined ? this.progressSpinner : nothing}
        <div class="visible-wrapper" part="visible-wrapper">
          <div class="icon" part="icon">
            <slot></slot>
          </div>
        </div>
        ${this.hasLabel
          ? html`<div class="label" part="label">
              <slot name="label"></slot>
            </div>`
          : nothing}
      </button>
    `;
  }

  static override styles = unsafeCSS(iconStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-icon-button': ObcIconButton;
  }
}