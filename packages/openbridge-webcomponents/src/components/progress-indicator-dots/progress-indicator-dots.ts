import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './progress-indicator-dots.css?inline';
import {property} from 'lit/decorators.js';

/**
 * `<obc-progress-indicator-dots>` – A visual step indicator component that displays a horizontal row of dots to represent progress through a sequence of steps (also known as a stepper, pagination indicator, or progress dots).
 *
 * This component visually communicates the user's current position within a multi-step process, such as onboarding flows, carousels, or paginated content. The active step is highlighted, while inactive steps are shown as neutral dots. The number of steps and the current step are configurable.
 *
 * ### Features
 * - **Step Count:** Displays a configurable number of steps as dots (minimum 1).
 * - **Active Step Highlight:** Clearly indicates the current/active step.
 * - **Fullwidth Option:** Can stretch to fill the container width or remain compact.
 * - **Responsive Layout:** Dots are spaced evenly and adapt to available space.
 * - **Accessible State:** The active step is visually distinct for clarity.
 *
 * ### Usage Guidelines
 * Use `obc-progress-indicator-dots` to show progress through a linear, discrete process where each step is equally weighted (such as onboarding, multi-page forms, or image carousels). It is best suited for scenarios where users need a quick visual reference of their progress and the total number of steps.
 *
 * - Ideal for wizard-style flows, paginated content, or navigation between sequential screens.
 * - Not intended for displaying progress percentages or indeterminate progress—use a linear or circular progress bar for those cases.
 * - Avoid using for processes with more steps than can be comfortably displayed as dots (e.g., more than 7–10).
 * - **TODO(designer):** Confirm if there are recommended maximum/minimum step counts or accessibility guidelines for color contrast.
 *
 * ### Properties
 * - `totalSteps` (number): Sets the total number of steps/dots to display (minimum 1; default: 5).
 * - `currentStep` (number): Indicates the currently active step (1-based index; default: 1). Values outside the valid range are clamped.
 * - `fullwidth` (boolean): If true, the indicator stretches to fill the container width; otherwise, it uses a compact layout (default: false).
 *
 * ### Best Practices
 * - Ensure `currentStep` is always within the range of 1 to `totalSteps` for accurate highlighting.
 * - For accessibility, pair with descriptive labels or ARIA attributes as needed (not included by default).
 * - Use in conjunction with navigation controls (e.g., Next/Previous buttons) to allow users to move between steps.
 *
 * ### Example:
 * ```html
 * <obc-progress-indicator-dots totalSteps="4" currentStep="2" fullwidth></obc-progress-indicator-dots>
 * ```
 *
 * /**
 * @slot - (none) This component does not use content slots.
 */
@customElement('obc-progress-indicator-dots')
export class ObcProgressIndicatorDots extends LitElement {
  /**
   * Sets the total number of steps/dots to display.
   * Must be at least 1. Defaults to 5.
   */
  @property({type: Number}) totalSteps = 5;

  /**
   * Indicates the currently active step (1-based index).
   * Values outside the valid range are clamped to [1, totalSteps].
   * Defaults to 1.
   */
  @property({type: Number}) currentStep = 1;

  /**
   * If true, the indicator stretches to fill the container width.
   * If false, uses a compact layout sized to its content.
   * Defaults to false.
   */
  @property({type: Boolean}) fullwidth = false;

  private get validCurrentStep() {
    return Math.max(1, Math.min(this.currentStep, this.totalSteps));
  }

  private get validTotalSteps() {
    return Math.max(1, this.totalSteps);
  }

  private renderDots() {
    const dots = [];
    for (let i = 0; i < this.validTotalSteps; i++) {
      dots.push(html`
        <div
          class=${classMap({
            dot: true,
            'state-active': i === this.validCurrentStep - 1,
            'state-inactive': i !== this.validCurrentStep - 1,
          })}
        ></div>
      `);
    }
    return dots;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          'style-fullwidth': this.fullwidth,
          'style-compact': !this.fullwidth,
        })}
      >
        <div class="content-container">${this.renderDots()}</div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-progress-indicator-dots': ObcProgressIndicatorDots;
  }
}
