import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import componentStyle from './slider-double.css?inline';
import '../icon-button/icon-button.js';
import { classMap } from 'lit/directives/class-map.js';

export enum ObcSliderDoubleVariant {
  Normal = 'normal',
  Enhanced = 'enhanced',
  NoInput = 'no-input',
}

export type ObcSliderDoubleValueEvent = CustomEvent<{ low: number, high: number }>;

/**
 * @element obc-slider-double
 *
 * @prop {number} low - The low value of the slider-double
 * @prop {number} high - The high value of the slider-double
 * @prop {number} min - The minimum value of the slider-double
 * @prop {number} max - The maximum value of the slider-double
 * @prop {number} step - The step value of the slider-double
 * @prop {number} stepClick - The step value when clicking the increase or decrease buttons
 * @prop {boolean} allowSeeking - If set, the slider-double will allow seeking, i.e. clicking on the slider will set the value to the clicked position
 * @prop {number} seekingSpeed - The speed of the seeking, i.e. the value will go from min to max in 1 / seekingSpeed seconds
 * @attr hugcontainer - If set, the slider-double will not have any spacing between the slider icons and the container
 *
 * @slot icon-left - Slot for the left icon
 * @slot icon-right - Slot for the right icon
 *
 * @fires value {ObcSliderDoubleValueEvent} - Fires when the value is changed
 */
@customElement('obc-slider-double')
export class ObcSliderDouble extends LitElement {
  @property({ type: Number }) low = 0;
  @property({ type: Number }) high = 100;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step: number | undefined;
  @property({ type: Number }) stepClick = 10;
  @property({ type: String }) variant: ObcSliderDoubleVariant = ObcSliderDoubleVariant.Normal;
  @property({ type: Boolean }) allowSeeking = false;
  @property({ type: Number }) seekingSpeed = 1 / 3;

  @state() private animationFrame: number | null = null;
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

  onInput() {
    this.low = parseFloat(this.minInput.value);
    this.high = parseFloat(this.maxInput.value);
    this.dispatchEvent(new CustomEvent('value', { detail: { low: this.low, high: this.high } }));
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
    return Math.abs(value - this.low) <= this.thumbRange() / 2;
  }

  private isClickingMaxThumb(e: MouseEvent) {
    const value = this.highClickValue(e);
    return Math.abs(value - this.high) <= this.thumbRange() / 2;
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
    if (this.variant === ObcSliderDoubleVariant.NoInput) return;
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
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
    this.stopAnimation();
  }

  private updateTargetValue(e: MouseEvent) {
    const unroundedValue = this.isTargetingLow ? this.lowClickValue(e) : this.highClickValue(e);
    if (this.step) {
      this.targetValue = Math.round(unroundedValue / this.step) * this.step;
    } else {
      this.targetValue = unroundedValue;
    }
    if (this.isTargetingLow) {
      this.targetValue = Math.min(this.targetValue, this.high);
    } else {
      this.targetValue = Math.max(this.targetValue, this.low);
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
      const isValueChanged = this.isTargetingLow ? this.low !== nextValue : this.high !== nextValue;
      if (isValueChanged) {
        if (this.isTargetingLow) {
          this.low = nextValue;
        } else {
          this.high = nextValue;
        }
        this.dispatchEvent(new CustomEvent('value', { detail: { low: this.low, high: this.high } }));
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

  override render() {
    return html`
      <div class=${classMap({ wrapper: true, [this.variant]: true })}>
        <div class="track"></div>
        <input
          type="range"
          min=${this.min}
          max=${this.max}
          class="slider min"
          step=${ifDefined(this.step)}
          .value=${this.low.toString()}
          ?disabled=${this.variant === ObcSliderDoubleVariant.NoInput}
          @mousedown=${this.onMouseDown}
          @mouseup=${this.onMouseUp}
          @mousemove=${this.onMouseMove}
        />
        <input
          type="range"
          class="slider max"
          min=${this.min}
          max=${this.max}
          step=${ifDefined(this.step)}
          .value=${this.high.toString()}
          ?disabled=${this.variant === ObcSliderDoubleVariant.NoInput}
          @mousedown=${this.onMouseDown}
          @mouseup=${this.onMouseUp}
          @mousemove=${this.onMouseMove}
        />
        <div class="interactive-track"></div>
        <div class="thumb min"></div> 
        <div class="thumb max"></div> 
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
