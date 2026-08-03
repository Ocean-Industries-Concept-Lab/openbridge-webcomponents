import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import componentStyle from './progress-bar.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-placeholder.js';
import {CircularProgressMode} from '../../building-blocks/circular-progress/circular-progress.js';

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
 * `<obc-progress-bar>` – A status-only progress indicator (progress meter / spinner /
 * loading indicator) for visualizing how far a task has advanced.
 *
 * Displays the progress of an ongoing operation either as a horizontal bar or as a circular
 * ring. Unlike `<obc-progress-button>`, this is a passive, non-interactive display element:
 * it shows status only and emits no events. Use it to communicate determinate progress
 * (a known percentage) or an open-ended "working" state.
 *
 * ## Features / Variants
 *
 * **Layout types (`type`)**
 * - **Linear** (default): A horizontal bar with an optional value label above and an optional
 *   description below. Best inline within content where horizontal space is available.
 * - **Circular**: A ring with centered content. Best for compact, icon-led, or centered status.
 *
 * **Linear modes (`mode`)**
 * - **Determinate** (default): Fills proportionally to `value` (0–100); the label shows the
 *   rounded percentage.
 * - **Indeterminate**: Animated, looping fill for work of unknown duration; the label shows
 *   "Loading".
 *
 * **Circular states (`circularState`)**
 * - **Determinate**: Ring fills to `value`, with the rounded number (and optional `%` unit) centered.
 * - **Indeterminate**: Animated ring with the `icon` slot centered.
 * - **Icon**: A full ring acting as a frame around the centered `icon` slot (defaults to a placeholder).
 *
 * **Circular progressive indeterminate (`progressiveIndeterminate`)**
 * - A spinning arc that also grows with `value`, blending an indeterminate animation with a
 *   numeric readout. Takes precedence over `circularState` when enabled.
 *
 * ## Usage Guidelines
 *
 * Use a progress bar to report the status of a task the user is waiting on. Choose
 * **determinate** when the completion percentage is known and **indeterminate** when it is not.
 * Pick the **linear** type for inline, full-width contexts and the **circular** type for compact
 * or centered placements. Because this component is display-only, pair it with a separate
 * control (such as `<obc-progress-button>`) when the user also needs to trigger or cancel the action.
 *
 * ## Slots
 *
 * | Slot   | Renders When...                                              | Purpose                                   |
 * | ------ | ----------------------------------------------------------- | ----------------------------------------- |
 * | `icon` | `type="circular"` && `circularState` is `indeterminate` or `icon` | Centered icon inside the circular ring. |
 *
 * @example
 * ```html
 * <obc-progress-bar
 *   type="linear"
 *   mode="determinate"
 *   value="65"
 *   showValue
 *   hasDescription
 *   description="Uploading files..."
 * ></obc-progress-bar>
 * ```
 *
 * @slot icon - Centered icon for the circular `indeterminate` and `icon` states.
 * @stable
 */
@customElement('obc-progress-bar')
export class ObcProgressBar extends LitElement {
  /** Layout type: `linear` (horizontal bar) or `circular` (ring). */
  @property({type: String}) type: ProgressBarType = ProgressBarType.linear;
  /**
   * Progress mode: `determinate` tracks `value`, `indeterminate` loops indefinitely.
   * @availableWhen type==linear
   */
  @property({type: String}) mode: ProgressBarMode = ProgressBarMode.determinate;
  /**
   * Circular display state: `determinate` (numeric ring), `indeterminate` (animated ring with
   * icon), or `icon` (ring framing the icon slot).
   * @availableWhen type==circular
   */
  @property({type: String}) circularState: CircularProgressState =
    CircularProgressState.determinate;
  /** Progress percentage (0–100); clamped when rendered. */
  @property({type: Number}) value = 0;
  /**
   * Shows the value label above the bar (percentage when determinate, "Loading" when indeterminate).
   * @availableWhen type==linear
   */
  @property({type: Boolean}) showValue = false;
  /**
   * Appends a `%` unit next to the centered value.
   * @availableWhen type==circular && (progressiveIndeterminate==true || circularState==determinate)
   */
  @property({type: Boolean}) showUnit = false;
  /**
   * Shows the `description` text below the bar.
   * @availableWhen type==linear
   */
  @property({type: Boolean}) hasDescription = false;
  /**
   * Description text rendered below the bar.
   * @availableWhen type==linear && hasDescription==true
   */
  @property({type: String}) description = 'Description text';
  /**
   * Shows the `stateLabel` next to the value.
   *
   * **TODO(designer):** Confirm the intended purpose of the state indicator — the story labels
   * this a "future feature".
   * @availableWhen type==linear && showValue==true && mode==determinate
   */
  @property({type: Boolean}) showState = false;
  /**
   * Text shown alongside the value when `showState` is enabled.
   * @availableWhen type==linear && showValue==true && mode==determinate && showState==true
   */
  @property({type: String}) stateLabel = 'Open';
  /**
   * Uses a progressive indeterminate ring (spinning arc that grows with `value`); takes
   * precedence over `circularState`.
   * @availableWhen type==circular
   */
  @property({type: Boolean}) progressiveIndeterminate = false;

  override render() {
    if (this.type === ProgressBarType.circular) {
      return this.renderCircularProgress();
    }

    return this.renderLinearProgress();
  }

  private getCircularProgressMode(): CircularProgressMode {
    if (this.progressiveIndeterminate) {
      return CircularProgressMode.progressiveIndeterminate;
    }
    if (this.circularState === CircularProgressState.icon) {
      return CircularProgressMode.determinate;
    }
    if (this.circularState === CircularProgressState.indeterminate) {
      return CircularProgressMode.indeterminate;
    }
    return CircularProgressMode.determinate;
  }

  private renderCircularProgress() {
    const progressValue =
      this.circularState === CircularProgressState.icon ? 100 : this.value;

    return html`
      <div class="circular-wrapper">
        <obc-circular-progress
          .mode=${this.getCircularProgressMode()}
          .value=${progressValue}
          .viewBoxSize=${48}
          .strokeWidth=${4}
        ></obc-circular-progress>

        <div class="circular-content">${this.renderCircularContent()}</div>
      </div>
    `;
  }

  private renderCircularContent() {
    if (this.progressiveIndeterminate) {
      return html`
        <div class="circular-label-container">
          <span class="circular-value">${Math.round(this.value)}</span>
          ${this.showUnit
            ? html`<span class="circular-unit">%</span>`
            : nothing}
        </div>
      `;
    }

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
          <span class="circular-value">
            <slot name="icon">...</slot>
          </span>
        </div>
      `;
    } else {
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
