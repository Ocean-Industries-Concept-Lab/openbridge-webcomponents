import {LitElement, html, unsafeCSS} from 'lit';
import {property, query} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import componentStyle from './slider-double.css?inline';
import '../icon-button/icon-button.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * Enum for slider double variants.
 *
 * - `normal`: Standard slider with default styling and interaction.
 * - `enhanced`: Visually enhanced slider with larger track and thumb, suitable for more prominent or touch-friendly UIs.
 * - `no-input`: Non-interactive display mode; disables all user input and presents the slider as read-only.
 */
export enum ObcSliderDoubleVariant {
  Normal = 'normal',
  Enhanced = 'enhanced',
  NoInput = 'no-input',
}

/**
 * Event type for value changes in obc-slider-double.
 * Contains the current low and high values of the slider.
 */
export type ObcSliderDoubleValueEvent = CustomEvent<{
  low: number;
  high: number;
}>;

/**
 * `<obc-slider-double>` – A dual-thumb range slider for selecting a value interval within a defined range.
 *
 * This component allows users to select a minimum and maximum value by dragging two thumbs along a horizontal track. It is commonly used for filtering or specifying ranges (such as price, speed, or time intervals) in forms and dashboards. The slider supports both interactive and read-only display modes, as well as visual variants for different UI needs.
 *
 * Appears with two draggable handles (thumbs) and labels showing the current low and high values. Optionally, icons can be placed at each end of the slider via slots.
 *
 * ## Features
 * - **Dual-thumb range selection:** Users can adjust both the lower and upper bounds of a numeric interval.
 * - **Variants:**
 *   - **Normal:** Standard slider with compact styling.
 *   - **Enhanced:** Larger track and thumb for increased prominence or touch accessibility.
 *   - **NoInput:** Read-only mode; disables all user interaction and presents the current range as static.
 * - **Configurable range:** Set minimum (`min`), maximum (`max`), and step size (`step`) for precise control.
 * - **Step click adjustment:** Use `stepClick` to define increment/decrement amount for keyboard or button-based changes.
 * - **Seeking mode:** Enable `allowSeeking` to let users jump to a value by clicking on the track, with smooth animated transitions controlled by `seekingSpeed`.
 * - **Custom labels:** Display formatted value labels with unit (`labelUnit`), decimal precision (`labelDecimals`), and adjustable label width (`labelWidth`).
 * - **Hug container option:** Remove spacing between slider and container edges with the `hugcontainer` attribute for seamless layout integration.
 * - **Icon slots:** Add icons to the left and right ends of the slider using `icon-left` and `icon-right` slots.
 *
 * ## Usage Guidelines
 * Use `obc-slider-double` when you need users to specify a numeric range, such as filtering results by minimum and maximum values. Ideal for scenarios like:
 * - Filtering items by price, speed, or other continuous values.
 * - Selecting a time interval or threshold range.
 * - Any UI where a bounded numeric interval is required.
 *
 * For single-value selection, use a standard slider component instead. In read-only or summary views, use the `no-input` variant to display the selected range without allowing changes.
 *
 * **TODO(designer):** Confirm if there are recommended minimum thumb separation or constraints for usability, and if there are best practices for using the enhanced variant.
 *
 * ## Slots
 *
 * | Slot Name    | Renders When... | Purpose                                 |
 * |--------------|-----------------|-----------------------------------------|
 * | icon-left    | Always          | Icon or content at the left end of the slider. Example: `<obi-placeholder slot="icon-left"></obi-placeholder>` |
 * | icon-right   | Always          | Icon or content at the right end of the slider. Example: `<obi-placeholder slot="icon-right"></obi-placeholder>` |
 *
 * ## Properties and Attributes
 * - `low` (number): The current lower bound of the selected range.
 * - `high` (number): The current upper bound of the selected range.
 * - `min` (number): The minimum allowed value (default: 0).
 * - `max` (number): The maximum allowed value (default: 100).
 * - `step` (number): The increment for value changes (default: 1).
 * - `stepClick` (number): Step size for keyboard or button-based changes (default: 10).
 * - `variant` (`normal` | `enhanced` | `no-input`): Visual and interaction style (default: `normal`).
 * - `allowSeeking` (boolean): If true, clicking the track animates the thumb to the clicked position.
 * - `seekingSpeed` (number): Animation speed for seeking (default: 1/3, i.e., full range in 3 seconds).
 * - `labelUnit` (string): Unit label appended to value labels (e.g., `"%"`, `"kn"`).
 * - `labelDecimals` (number): Number of decimal places for value labels.
 * - `labelWidth` (string): CSS width for value labels (e.g., `"5ch"`, `"60px"`).
 * - `hugcontainer` (attribute): If present, removes spacing between slider and container edges.
 *
 * ## Events
 * - `value` – Fired whenever the low or high value changes. Event detail contains `{low, high}`.
 *
 * ## Best Practices and Constraints
 * - Ensure `low` is always less than or equal to `high`; the component enforces this automatically.
 * - For accessibility, provide clear labels and units so users understand the meaning of the range.
 * - Use the `no-input` variant for summary or review screens where editing is not allowed.
 * - When using `allowSeeking`, set an appropriate `seekingSpeed` for smooth but responsive thumb movement.
 * - Avoid setting `step` too small for large ranges, as this may make precise selection difficult.
 *
 * ## Example
 *
 * ```html
 * <obc-slider-double
 *   min="0"
 *   max="100"
 *   low="20"
 *   high="80"
 *   step="5"
 *   label-unit="%"
 *   label-decimals="0"
 *   variant="enhanced"
 *   allowSeeking
 * >
 *   <obi-placeholder slot="icon-left"></obi-placeholder>
 *   <obi-placeholder slot="icon-right"></obi-placeholder>
 * </obc-slider-double>
 * ```
 *
 * In this example, the slider allows selection of a percentage range from 0 to 100, with 5% increments, enhanced styling, and seeking enabled.
 *
 * @slot icon-left - Slot for the left icon
 * @slot icon-right - Slot for the right icon
 * @fires value {ObcSliderDoubleValueEvent} - Fires when the value is changed
 */
@customElement('obc-slider-double')
export class ObcSliderDouble extends LitElement {
  /**
   * The current lower bound of the selected range.
   * Must be greater than or equal to `min` and less than or equal to `high`.
   */
  @property({type: Number}) low = 0;

  /**
   * The current upper bound of the selected range.
   * Must be less than or equal to `max` and greater than or equal to `low`.
   */
  @property({type: Number}) high = 100;

  /**
   * The minimum allowed value for the slider.
   * Default is 0.
   */
  @property({type: Number}) min = 0;

  /**
   * The maximum allowed value for the slider.
   * Default is 100.
   */
  @property({type: Number}) max = 100;

  /**
   * The increment for value changes.
   * If not set, defaults to 1.
   */
  @property({type: Number}) step: number | undefined;

  /**
   * Step size for keyboard or button-based changes.
   * Default is 10.
   */
  @property({type: Number}) stepClick = 10;

  /**
   * Visual and interaction style of the slider.
   * - `normal`: Standard appearance.
   * - `enhanced`: Larger track and thumb.
   * - `no-input`: Read-only, disables user interaction.
   * Default is `normal`.
   */
  @property({type: String}) variant: ObcSliderDoubleVariant =
    ObcSliderDoubleVariant.Normal;

  /**
   * If true, clicking the slider track animates the thumb to the clicked position.
   * Enables seeking mode for rapid value changes.
   */
  @property({type: Boolean}) allowSeeking = false;

  @property({type: Boolean}) disabled = false;

  /**
   * Animation speed for seeking, in inverse seconds.
   * The value will go from min to max in 1 / seekingSpeed seconds.
   * Default is 1/3 (i.e., 3 seconds for full range).
   */
  @property({type: Number}) seekingSpeed = 1 / 3;

  /**
   * Unit label appended to value labels (e.g., "%", "kn").
   */
  @property({type: String}) labelUnit = '';

  /**
   * Number of decimal places to display in value labels.
   */
  @property({type: Number}) labelDecimals = 0;

  /**
   * CSS width for value labels (e.g., "5ch", "60px").
   */
  @property({type: String}) labelWidth = '60px';

  private animationFrame: number | null = null;
  private isMouseDown = false;
  private targetValue = 0;
  private isDragging = false;
  private isTargetingLow = false;
  private animationStartTime: number | null = null;
  private animationStartValue: number = 0;

  @query('input[type="range"].min')
  private minInput!: HTMLInputElement;

  @query('input[type="range"].max')
  private maxInput!: HTMLInputElement;

  /**
   * Handles input changes from the slider thumbs.
   * Updates the low and high values and emits the `value` event.
   *
   * @fires value {ObcSliderDoubleValueEvent}
   */
  onInput() {
    let newLow = parseFloat(this.minInput.value);
    let newHigh = parseFloat(this.maxInput.value);
    if (newLow > this.high) {
      newLow = this.high;
      this.minInput.value = this.high.toString();
    }
    if (newHigh < this.low) {
      newHigh = this.low;
      this.maxInput.value = this.low.toString();
    }
    this.low = newLow;
    this.high = newHigh;
    this.dispatchEvent(
      new CustomEvent('value', {detail: {low: this.low, high: this.high}})
    );
  }

  private THUMB_WIDTH = 48;
  private THUMB_VISIBLE_WIDTH = 12;

  private lowClickValue(e: MouseEvent) {
    const rect = this.minInput.getBoundingClientRect();
    const left = rect.left + this.THUMB_WIDTH - this.THUMB_VISIBLE_WIDTH / 2;
    const width = rect.width - this.THUMB_WIDTH;
    const percent = (e.clientX - left) / width;
    return this.min + (this.max - this.min) * percent;
  }

  private highClickValue(e: MouseEvent) {
    const rect = this.maxInput.getBoundingClientRect();
    const left = rect.left + this.THUMB_VISIBLE_WIDTH / 2;
    const width = rect.width - this.THUMB_WIDTH;
    const percent = (e.clientX - left) / width;
    return this.min + (this.max - this.min) * percent;
  }

  private thumbRange() {
    const rect = this.minInput.getBoundingClientRect();
    const valueRange = this.max - this.min;
    const percentageRange = this.THUMB_WIDTH / rect.width;
    return valueRange * percentageRange;
  }

  private isClickingMinThumb(e: MouseEvent) {
    const value = this.lowClickValue(e);
    if (value > this.low) {
      return false;
    }
    return value >= this.low - this.thumbRange();
  }

  private isClickingMaxThumb(e: MouseEvent) {
    const value = this.highClickValue(e);
    if (value < this.high) {
      return false;
    }
    return value <= this.high + this.thumbRange();
  }

  private isClickingLowTrack(e: MouseEvent) {
    const value = this.lowClickValue(e);
    return value <= this.low - this.thumbRange() / 2;
  }

  private isClickingHighTrack(e: MouseEvent) {
    const value = this.highClickValue(e);
    return value >= this.high + this.thumbRange() / 2;
  }

  private isClosestToLowThumb(e: MouseEvent) {
    const lowValue = this.lowClickValue(e);
    const highValue = this.highClickValue(e);
    return Math.abs(lowValue - this.low) <= Math.abs(highValue - this.high);
  }

  private onMouseDown(e: MouseEvent) {
    if (this.variant === ObcSliderDoubleVariant.NoInput || this.disabled)
      return;
    if (this.isClickingMinThumb(e)) {
      this.isTargetingLow = true;
      this.isDragging = true;
    } else if (this.isClickingMaxThumb(e)) {
      this.isTargetingLow = false;
      this.isDragging = true;
    } else if (this.isClickingLowTrack(e)) {
      this.isTargetingLow = true;
      this.isDragging = false;
    } else if (this.isClickingHighTrack(e)) {
      this.isTargetingLow = false;
      this.isDragging = false;
    } else if (this.isClosestToLowThumb(e)) {
      this.isTargetingLow = true;
      this.isDragging = false;
    } else {
      this.isTargetingLow = false;
      this.isDragging = false;
    }
    this.isMouseDown = true;
    this.updateTargetValue(e);
    e.preventDefault();
    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('mouseup', this.onWindowMouseUp);
    this.startAnimation();
  }

  private onWindowMouseMove = (e: MouseEvent) => {
    this.onMouseMove(e);
  };

  private onWindowMouseUp = () => {
    this.onMouseUp();
  };

  private onMouseMove(e: MouseEvent) {
    if (this.isMouseDown) {
      this.updateTargetValue(e);
    }
  }

  private onMouseUp() {
    this.isMouseDown = false;
    this.isDragging = false;
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
    this.stopAnimation();
  }

  private updateTargetValue(e: MouseEvent) {
    const unroundedValue = this.isTargetingLow
      ? this.lowClickValue(e)
      : this.highClickValue(e);
    if (this.step) {
      this.targetValue = Math.round(unroundedValue / this.step) * this.step;
    } else {
      this.targetValue = unroundedValue;
    }
    if (this.isTargetingLow) {
      this.targetValue = Math.max(
        this.min,
        Math.min(this.targetValue, this.high)
      );
    } else {
      this.targetValue = Math.min(
        this.max,
        Math.max(this.targetValue, this.low)
      );
    }
  }

  private startAnimation() {
    this.isDragging = this.allowSeeking;
    this.animationStartTime = performance.now();
    this.animationStartValue = this.isTargetingLow ? this.low : this.high;
    const min = this.min;
    const max = this.max;
    const step = this.step;
    const duration = (1 / this.seekingSpeed) * 1000; // ms
    const direction = this.targetValue > this.animationStartValue ? 1 : -1;

    const animate = () => {
      let nextValue = this.targetValue;
      if (!this.isDragging) {
        const now = performance.now();
        const elapsed = now - (this.animationStartTime ?? now);
        const range = Math.abs(max - min);
        // How much of the range should be covered by now
        const expectedProgress = Math.min(elapsed / duration, 1);
        const expectedValue =
          this.animationStartValue + direction * range * expectedProgress;
        // Snap to step
        nextValue = this.animationStartValue;
        if (direction > 0) {
          nextValue =
            step === undefined
              ? expectedValue
              : Math.ceil(expectedValue - min / step) * step + min;
          nextValue = Math.min(this.targetValue, nextValue);
        } else {
          nextValue =
            step === undefined
              ? expectedValue
              : Math.floor((expectedValue - min) / step) * step + min;
          nextValue = Math.max(this.targetValue, nextValue);
        }
      }
      // Only update if value actually changes
      const isValueChanged = this.isTargetingLow
        ? this.low !== nextValue
        : this.high !== nextValue;
      if (isValueChanged) {
        if (this.isTargetingLow) {
          this.low = nextValue;
        } else {
          this.high = nextValue;
        }
        this.dispatchEvent(
          new CustomEvent('value', {detail: {low: this.low, high: this.high}})
        );
      }
      // Continue animating if not at target
      if (
        (direction > 0 && nextValue < this.targetValue) ||
        (direction < 0 && nextValue > this.targetValue)
      ) {
        this.animationFrame = requestAnimationFrame(animate);
      } else if (this.isMouseDown) {
        // If mouse is still down, wait for new target
        this.animationStartTime = performance.now();
        this.animationStartValue = this.isTargetingLow ? this.low : this.high;
        this.animationFrame = requestAnimationFrame(animate);
        this.isDragging = true;
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  private stopAnimation() {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  private formatLabel(value: number) {
    return value.toFixed(this.labelDecimals) + this.labelUnit;
  }

  override render() {
    return html`
      <div class="label min" style="width: ${this.labelWidth};">
        ${this.formatLabel(this.low)}
      </div>
      <div
        class=${classMap({
          wrapper: true,
          [this.variant]: true,
          mouseDown: this.isMouseDown,
          dragging: this.isDragging,
          disabled: this.disabled,
        })}
        @mousedown=${this.onMouseDown}
        @mouseup=${this.onMouseUp}
        @mousemove=${this.onMouseMove}
      >
        <div class="track"></div>
        <input
          type="range"
          min=${this.min}
          max=${this.max}
          class="slider min"
          step=${ifDefined(this.step)}
          .value=${this.low.toString()}
          ?disabled=${this.variant === ObcSliderDoubleVariant.NoInput ||
          this.disabled}
          @input=${this.onInput}
        />
        <input
          type="range"
          class="slider max"
          min=${this.min}
          max=${this.max}
          step=${ifDefined(this.step)}
          .value=${this.high.toString()}
          ?disabled=${this.variant === ObcSliderDoubleVariant.NoInput ||
          this.disabled}
          @input=${this.onInput}
        />
        <div class="interactive-track"></div>
        <div class="thumb min"></div>
        <div class="thumb max"></div>
      </div>
      <div class="label max" style="width: ${this.labelWidth};">
        ${this.formatLabel(this.high)}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-slider-double': ObcSliderDouble;
  }
}
