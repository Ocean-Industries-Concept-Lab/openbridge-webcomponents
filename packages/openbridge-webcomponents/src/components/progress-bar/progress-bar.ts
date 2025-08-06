import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import componentStyle from './progress-bar.css?inline';
import {customElement} from '../../decorator.js';

export enum ProgressBarType {
  linear = 'linear',
  circular = 'circular', // For future implementation
}

export enum ProgressBarMode {
  determinate = 'determinate',
  indeterminate = 'indeterminate',
}

/**
 * `<obc-progress-bar>` – A progress indicator component that shows the completion status of a task or process.
 *
 * Displays a visual representation of progress with support for both determinate (percentage-based)
 * and indeterminate (continuous animation) modes.
 *
 * ### Features
 * - **Types:**
 *   - `linear`: Horizontal progress bar (currently implemented)
 *   - `circular`: Circular progress indicator (future implementation)
 * - **Modes:**
 *   - `determinate`: Shows specific progress percentage (0-100)
 *   - `indeterminate`: Shows continuous animation for unknown duration tasks
 * - **Labels:**
 *   - Optional percentage display (determinate mode)
 *   - Optional "Loading" text (indeterminate mode)
 *   - Optional description text below the bar
 * - **Customization:**
 *   - Progress value (0-100 for determinate mode)
 *   - Show/hide value label
 *   - Show/hide description
 *   - Custom description text
 *
 * ### Usage Guidelines
 * Use `obc-progress-bar` to indicate the progress of operations:
 * - Use `mode="determinate"` when you know the completion percentage
 * - Use `mode="indeterminate"` for operations with unknown duration
 * - Add descriptions to provide context about what's being loaded
 *
 * ### Example:
 * ```
 * <!-- Determinate progress with value -->
 * <obc-progress-bar
 *   value="40"
 *   showValue
 *   hasDescription
 *   description="Uploading files...">
 * </obc-progress-bar>
 *
 * <!-- Indeterminate loading state -->
 * <obc-progress-bar
 *   mode="indeterminate"
 *   showValue>
 * </obc-progress-bar>
 *
 * <!-- Simple progress without labels -->
 * <obc-progress-bar value="75"></obc-progress-bar>
 * ```
 */
@customElement('obc-progress-bar')
export class ObcProgressBar extends LitElement {
  /**
   * Type of progress indicator.
   * - `linear`: Horizontal bar (default)
   * - `circular`: Circle indicator (future implementation)
   */
  @property({type: String}) type: ProgressBarType = ProgressBarType.linear;

  /**
   * Progress mode.
   * - `determinate`: Shows specific progress value
   * - `indeterminate`: Shows continuous animation
   */
  @property({type: String}) mode: ProgressBarMode = ProgressBarMode.determinate;

  /**
   * Progress value (0-100).
   * Only used when mode="determinate".
   */
  @property({type: Number}) value = 0;

  /**
   * Whether to show the value label.
   * Shows percentage in determinate mode, "Loading" text in indeterminate mode.
   */
  @property({type: Boolean}) showValue = false;

  /**
   * Whether to show the description text below the progress bar.
   */
  @property({type: Boolean}) hasDescription = false;

  /**
   * Description text to display below the progress bar.
   */
  @property({type: String}) description = 'Description text';

  /**
   * Whether to show state indicators (future feature).
   */
  @property({type: Boolean}) showState = false;

  @property({type: String}) stateLabel = 'Open';

  override render() {
    if (this.type === ProgressBarType.circular) {
      // Placeholder for future circular implementation
      return html`<div>Circular progress bar not yet implemented</div>`;
    }

    return this.renderLinearProgress();
  }

  private renderLinearProgress() {
    const clampedValue = Math.max(0, Math.min(100, this.value));
    const progressWidth = `${clampedValue}%`;

    return html`
      <div class="wrapper">
        ${this.showValue ? this.renderLabel() : ''}

        <div class="bar">
          ${this.mode === ProgressBarMode.determinate
            ? html`
                <div
                  class="loaded"
                  style=${styleMap({width: progressWidth})}
                ></div>
              `
            : html` <div class="indeterminate-track"></div> `}
        </div>

        ${this.hasDescription
          ? html`
              <div class="description-container">
                <span class="description-text">${this.description}</span>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private renderLabel() {
    if (this.mode === ProgressBarMode.determinate) {
      return html`
        <div class="label-container">
          <div class="value-frame">
            <span class="value-number">${Math.round(this.value)}</span>
            <span class="value-unit">%</span>
          </div>
          ${this.showState
            ? html` <span class="state">${this.stateLabel}</span> `
            : nothing}
        </div>
      `;
    } else {
      return html`
        <div class="label-container">
          <span class="loading-text">Loading</span>
        </div>
      `;
    }
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-progress-bar': ObcProgressBar;
  }
}
