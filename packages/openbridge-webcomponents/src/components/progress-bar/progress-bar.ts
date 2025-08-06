import {LitElement, html, nothing, unsafeCSS, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import componentStyle from './progress-bar.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-placeholder.js';

export enum ProgressBarType {
  linear = 'linear',
  circular = 'circular',
}

export enum ProgressBarMode {
  determinate = 'determinate',
  indeterminate = 'indeterminate',
}

export enum CircularProgressState {
  determinate = 'determinate',
  indeterminate = 'indeterminate',
  icon = 'icon',
}

/**
 * `<obc-progress-bar>` – A progress indicator component that shows the completion status of a task or process.
 *
 * Displays a visual representation of progress with support for both determinate (percentage-based)
 * and indeterminate (continuous animation) modes.
 *
 * ### Features
 * - **Types:**
 *   - `linear`: Horizontal progress bar
 *   - `circular`: Circular progress indicator
 * - **Linear Modes:**
 *   - `determinate`: Shows specific progress percentage (0-100)
 *   - `indeterminate`: Shows continuous animation for unknown duration tasks
 * - **Circular States:**
 *   - `determinate`: Shows progress with percentage value
 *   - `indeterminate`: Shows loading animation with dots
 *   - `icon`: Shows completed state with an icon
 * - **Labels:**
 *   - Optional percentage display (determinate mode)
 *   - Optional "Loading" text (indeterminate mode)
 *   - Optional description text below the bar (linear only)
 * - **Customization:**
 *   - Progress value (0-100 for determinate mode)
 *   - Show/hide value label (linear) or unit (circular)
 *   - Show/hide description (linear only)
 *   - Custom description text (linear only)
 *   - Custom icon slot (circular icon state)
 *
 * ### Usage Guidelines
 * Use `obc-progress-bar` to indicate the progress of operations:
 * - Use `mode="determinate"` when you know the completion percentage
 * - Use `mode="indeterminate"` for operations with unknown duration
 * - Add descriptions to provide context about what's being loaded (linear only)
 * - Use `circularState="icon"` to show completion with an icon (circular only)
 *
 * ### Example:
 * ```
 * <!-- Linear determinate progress with value -->
 * <obc-progress-bar
 *   type="linear"
 *   value="40"
 *   showValue
 *   hasDescription
 *   description="Uploading files...">
 * </obc-progress-bar>
 *
 * <!-- Circular determinate with unit -->
 * <obc-progress-bar
 *   type="circular"
 *   circularState="determinate"
 *   value="40"
 *   showUnit>
 * </obc-progress-bar>
 *
 * <!-- Circular with icon -->
 * <obc-progress-bar
 *   type="circular"
 *   circularState="icon">
 *   <svg slot="icon">...</svg>
 * </obc-progress-bar>
 * ```
 */
@customElement('obc-progress-bar')
export class ObcProgressBar extends LitElement {
  /**
   * Type of progress indicator.
   * - `linear`: Horizontal bar (default)
   * - `circular`: Circle indicator
   */
  @property({type: String}) type: ProgressBarType = ProgressBarType.linear;

  /**
   * Progress mode for linear type.
   * - `determinate`: Shows specific progress value
   * - `indeterminate`: Shows continuous animation
   */
  @property({type: String}) mode: ProgressBarMode = ProgressBarMode.determinate;

  /**
   * State for circular type.
   * - `determinate`: Shows specific progress value
   * - `indeterminate`: Shows loading animation
   * - `icon`: Shows icon in center
   */
  @property({type: String}) circularState: CircularProgressState =
    CircularProgressState.determinate;

  /**
   * Progress value (0-100).
   * Used when mode/state is "determinate".
   */
  @property({type: Number}) value = 0;

  /**
   * Whether to show the value label (linear only).
   * Shows percentage in determinate mode, "Loading" text in indeterminate mode.
   */
  @property({type: Boolean}) showValue = false;

  /**
   * Whether to show the unit "%" (circular determinate only).
   */
  @property({type: Boolean}) showUnit = true;

  /**
   * Whether to show the description text below the progress bar (linear only).
   */
  @property({type: Boolean}) hasDescription = false;

  /**
   * Description text to display below the progress bar (linear only).
   */
  @property({type: String}) description = 'Description text';

  /**
   * Whether to show state indicators (linear only, future feature).
   */
  @property({type: Boolean}) showState = false;

  /**
   * State label text (linear only).
   */
  @property({type: String}) stateLabel = 'Open';

  override render() {
    if (this.type === ProgressBarType.circular) {
      return this.renderCircularProgress();
    }

    return this.renderLinearProgress();
  }

  private renderCircularProgress() {
    const clampedValue = Math.max(0, Math.min(100, this.value));
    const size = 48;
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      circumference - (clampedValue / 100) * circumference;

    return html`
      <div class="circular-wrapper">
        <svg
          class="circular-svg"
          width="${size}"
          height="${size}"
          viewBox="0 0 ${size} ${size}"
        >
          <!-- Background circle -->
          <circle
            class="circular-background"
            cx="${size / 2}"
            cy="${size / 2}"
            r="${radius}"
            stroke-width="${strokeWidth}"
            fill="none"
          />

          <!-- Progress circle -->
          ${this.circularState === CircularProgressState.determinate
            ? svg`
                <circle
                  class="circular-progress determinate"
                  cx="${size / 2}"
                  cy="${size / 2}"
                  r="${radius}"
                  stroke-width="${strokeWidth}"
                  fill="none"
                  stroke-dasharray="${circumference}"
                  stroke-dashoffset="${strokeDashoffset}"
                  transform="rotate(-90 ${size / 2} ${size / 2})"
                />
              `
            : this.circularState === CircularProgressState.indeterminate
              ? svg`
                <circle
                  class="circular-progress indeterminate"
                  cx="${size / 2}"
                  cy="${size / 2}"
                  r="${radius}"
                  stroke-width="${strokeWidth}"
                  fill="none"
                  stroke-dasharray="${circumference * 0.25} ${circumference * 0.75}"
                  transform-origin="${size / 2} ${size / 2}"
                />
              `
              : this.circularState === CircularProgressState.icon
                ? svg`
                <circle
                  class="circular-progress complete"
                  cx="${size / 2}"
                  cy="${size / 2}"
                  r="${radius}"
                  stroke-width="${strokeWidth}"
                  fill="none"
                />
              `
                : ''}
        </svg>

        <!-- Center content -->
        <div class="circular-content">${this.renderCircularContent()}</div>
      </div>
    `;
  }

  private renderCircularContent() {
    if (this.circularState === CircularProgressState.determinate) {
      return html`
        <div class="circular-label-container">
          <span class="circular-value">${Math.round(this.value)}</span>
          ${this.showUnit
            ? html`<span class="circular-unit">%</span>`
            : nothing}
        </div>
      `;
    } else if (this.circularState === CircularProgressState.indeterminate) {
      return html`
        <div class="circular-label-container">
          <span class="circular-loading">...</span>
        </div>
      `;
    } else {
      // Icon state
      return html`
        <div class="circular-icon-container">
          <slot name="icon">
            <obi-placeholder></obi-placeholder>
          </slot>
        </div>
      `;
    }
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
