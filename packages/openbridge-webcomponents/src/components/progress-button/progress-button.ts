import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import componentStyle from './progress-button.css?inline';
import {customElement} from '../../decorator.js';
import {CircularProgressMode} from '../../building-blocks/circular-progress/circular-progress.js';

export enum ProgressButtonType {
  Linear = 'linear',
  Circular = 'circular',
}

export enum ButtonStyle {
  Regular = 'regular',
  Flat = 'flat',
  Raised = 'raised',
}

export enum ProgressMode {
  Determinate = 'determinate',
  Indeterminate = 'indeterminate',
}

export interface ProgressButtonClickEvent {
  value: number;
}

/**
 * `<obc-progress-button>` – A button with a built-in progress indicator for actions
 * that take time to complete, such as uploads, downloads, or background processing.
 *
 * Combines a clickable button with an embedded progress visualization so a single
 * control can both trigger a long-running action and communicate its ongoing status.
 * The progress indicator is shown on demand (via `showProgress`) and can report either
 * a known percentage or an open-ended "working" state.
 *
 * ## Features / Variants
 *
 * **Layout types (`type`)**
 * - **Linear** (default): A text button (optionally with leading/trailing icons) with a
 *   thin horizontal progress bar rendered above the label. Best for primary actions where
 *   a descriptive label is helpful (e.g. "Upload File", "Download").
 * - **Circular**: A compact icon-only button wrapped by a circular progress ring, with an
 *   optional label rendered below it. Best for space-constrained or icon-driven actions.
 *
 * **Button styles (`buttonStyle`, Linear only)**
 * - `regular` (default), `flat`, and `raised` elevation variants. The circular type always
 *   uses a flat visual treatment.
 *
 * **Progress modes (`mode`)**
 * - **Determinate** (default): Fills the bar/ring proportionally to `value` (0–100).
 * - **Indeterminate**: Animated, looping indicator for work of unknown duration.
 * - **Progressive indeterminate** (Circular only, via `progressiveIndeterminate`): A hybrid
 *   ring that animates while still advancing toward `value`.
 *
 * **Other**
 * - **Alert state** (`hasAlert`): Draws a red ring/border to flag an error or failed action.
 * - **Disabled** (`disabled`): Blocks interaction; the `obc-click` event is suppressed.
 *
 * ## Usage Guidelines
 *
 * Use a progress button when a single action both starts and tracks a time-consuming task,
 * keeping the trigger and its feedback in one place. Toggle `showProgress` on when the task
 * begins and update `value` as it advances; switch to `mode="indeterminate"` (or
 * `progressiveIndeterminate` for circular) when the duration or completion percentage is
 * unknown. Choose the **linear** type when a text label aids comprehension, and the
 * **circular** type for compact, icon-led actions. For a plain action with no progress
 * tracking, prefer a standard button instead.
 *
 * ## Slots
 *
 * | Slot            | Renders When...                    | Purpose                                              |
 * | --------------- | ---------------------------------- | ---------------------------------------------------- |
 * | `leading-icon`  | `type="linear"` && `hasLeadingIcon`| Icon shown before the label.                         |
 * | `trailing-icon` | `type="linear"` && `hasTrailingIcon`| Icon shown after the label.                          |
 * | `icon`          | `type="circular"`                  | Central icon inside the circular progress ring.      |
 *
 * ## Events
 *
 * - `obc-click` – Fired when the button is activated (suppressed while `disabled`); the detail
 *   carries the current progress `value`.
 *
 * @example
 * ```html
 * <obc-progress-button
 *   type="linear"
 *   buttonStyle="raised"
 *   label="Upload File"
 *   showProgress
 *   mode="determinate"
 *   value="45"
 * >
 *   <obi-placeholder slot="leading-icon"></obi-placeholder>
 * </obc-progress-button>
 * ```
 *
 * @slot leading-icon - Icon before the label (`type="linear"` && `hasLeadingIcon`).
 * @slot trailing-icon - Icon after the label (`type="linear"` && `hasTrailingIcon`).
 * @slot icon - Central icon for the circular variant (`type="circular"`).
 * @fires obc-click {CustomEvent<ProgressButtonClickEvent>} When the button is activated; detail holds the current `value`.
 */
@customElement('obc-progress-button')
export class ObcProgressButton extends LitElement {
  /** Layout type of the button: `linear` (label + bar) or `circular` (icon + ring). */
  @property({type: String}) type: ProgressButtonType =
    ProgressButtonType.Linear;
  /**
   * Elevation style of the button surface.
   * @availableWhen type==linear
   */
  @property({type: String}) buttonStyle: ButtonStyle = ButtonStyle.Regular;
  /**
   * Progress mode: `determinate` tracks `value`, `indeterminate` loops indefinitely.
   * @availableWhen showProgress==true
   */
  @property({type: String}) mode: ProgressMode = ProgressMode.Determinate;
  /** Progress percentage (0–100); clamped when rendered. */
  @property({type: Number}) value = 0;
  /** Text shown in the button (linear) or below it (circular, when `showLabel`). */
  @property({type: String}) label = '';
  /** Blocks interaction and suppresses the `obc-click` event. */
  @property({type: Boolean}) disabled = false;
  /** Reveals the progress bar/ring. */
  @property({type: Boolean}) showProgress = false;
  /**
   * Renders the `leading-icon` slot.
   * @availableWhen type==linear
   */
  @property({type: Boolean}) hasLeadingIcon = false;
  /**
   * Renders the `trailing-icon` slot.
   * @availableWhen type==linear
   */
  @property({type: Boolean}) hasTrailingIcon = false;
  /** Shows an alert (error) ring/border around the button. */
  @property({type: Boolean}) hasAlert = false;
  /**
   * Uses a progressive indeterminate ring that animates while advancing toward `value`.
   * @availableWhen type==circular && showProgress==true
   */
  @property({type: Boolean}) progressiveIndeterminate = false;
  /**
   * Shows the `label` below the circular button.
   * @availableWhen type==circular
   */
  @property({type: Boolean}) showLabel = false;

  override render() {
    if (this.type === ProgressButtonType.Circular) {
      return this.renderCircularButton();
    }
    return this.renderLinearButton();
  }

  private renderLinearButton() {
    const wrapperClasses = {
      wrapper: true,
      'linear-wrapper': true,
      [this.buttonStyle]: true,
      disabled: this.disabled,
    };

    const visibleWrapperClasses = {
      'visible-wrapper': true,
      alert: this.hasAlert,
    };

    return html`
      <button
        class="${classMap(wrapperClasses)}"
        ?disabled="${this.disabled}"
        @click="${this.handleClick}"
        aria-label="${this.label}"
        aria-busy="${this.showProgress &&
        this.mode === ProgressMode.Indeterminate}"
        aria-valuenow="${this.showProgress &&
        this.mode === ProgressMode.Determinate
          ? this.value
          : nothing}"
        aria-valuemin="${this.showProgress &&
        this.mode === ProgressMode.Determinate
          ? 0
          : nothing}"
        aria-valuemax="${this.showProgress &&
        this.mode === ProgressMode.Determinate
          ? 100
          : nothing}"
        role="button"
      >
        ${this.showProgress ? this.renderLinearProgress() : nothing}

        <div class="${classMap(visibleWrapperClasses)}">
          <div class="linear-label-icon-container">
            ${this.hasLeadingIcon
              ? html`<slot name="leading-icon"></slot>`
              : nothing}
            <span class="button-text">${this.label}</span>
          </div>
          ${this.hasTrailingIcon
            ? html`<slot name="trailing-icon"></slot>`
            : nothing}
        </div>
      </button>
    `;
  }

  private renderLinearProgress() {
    const clampedValue = Math.max(0, Math.min(100, this.value));
    const progressWidth = `${clampedValue}%`;

    return html`
      <div class="linear-progress-container">
        <div class="linear-progress-bar">
          ${this.mode === ProgressMode.Determinate
            ? html`
                <div
                  class="linear-progress-fill"
                  style=${styleMap({width: progressWidth})}
                ></div>
              `
            : html` <div class="linear-progress-indeterminate"></div> `}
        </div>
      </div>
    `;
  }

  private renderCircularButton() {
    const wrapperClasses = {
      wrapper: true,
      'circular-wrapper': true,
      disabled: this.disabled,
      'with-label': this.showLabel,
    };

    return html`
      <button
        class="${classMap(wrapperClasses)}"
        ?disabled="${this.disabled}"
        @click="${this.handleClick}"
        aria-label="${this.label}"
        aria-busy="${this.showProgress &&
        this.getCircularProgressMode() !== CircularProgressMode.determinate}"
        aria-valuenow="${this.showProgress &&
        this.getCircularProgressMode() === CircularProgressMode.determinate
          ? this.value
          : nothing}"
        aria-valuemin="${this.showProgress &&
        this.getCircularProgressMode() === CircularProgressMode.determinate
          ? 0
          : nothing}"
        aria-valuemax="${this.showProgress &&
        this.getCircularProgressMode() === CircularProgressMode.determinate
          ? 100
          : nothing}"
        role="button"
      >
        <div class="circular-icon-container">
          ${this.showProgress ? this.renderCircularProgress() : nothing}

          <div class="circular-visible-wrapper">
            <slot name="icon"></slot>
          </div>
        </div>

        ${this.showLabel
          ? html`<div class="circular-label">${this.label}</div>`
          : nothing}
      </button>
    `;
  }

  private getCircularProgressMode(): CircularProgressMode {
    if (this.progressiveIndeterminate) {
      return CircularProgressMode.progressiveIndeterminate;
    }
    if (this.mode === ProgressMode.Determinate) {
      return CircularProgressMode.determinate;
    }
    return CircularProgressMode.indeterminate;
  }

  private renderCircularProgress() {
    return html`
      <div class="circular-progress-svg-container">
        ${this.hasAlert
          ? html`<svg
              class="circular-alert-svg"
              viewBox="0 0 42 42"
              preserveAspectRatio="xMidYMid meet"
            >
              <circle
                class="circular-alert-ring"
                cx="21"
                cy="21"
                r="20"
                stroke-width="2"
                fill="none"
              />
            </svg>`
          : nothing}
        <obc-circular-progress
          .mode=${this.getCircularProgressMode()}
          .value=${this.value}
          .viewBoxSize=${42}
          .strokeWidth=${4}
          .padding=${1}
        ></obc-circular-progress>
      </div>
    `;
  }

  private handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const event = new CustomEvent<ProgressButtonClickEvent>('obc-click', {
      detail: {
        value: this.value,
      },
      composed: true,
    });

    this.dispatchEvent(event);
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-progress-button': ObcProgressButton;
  }
}
