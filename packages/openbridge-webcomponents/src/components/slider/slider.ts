import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import componentStyle from './slider.css?inline';
import '../icon-button/icon-button.js';
import {classMap} from 'lit/directives/class-map.js';

export enum ObcSliderVariant {
  NoValue = 'no-value',
  NoInput = 'no-input',
}

export type ObcSliderValueEvent = CustomEvent<number>;

/**
 * @element obc-slider
 *
 * @prop {number} value - The value of the slider
 * @prop {number} min - The minimum value of the slider
 * @prop {number} max - The maximum value of the slider
 * @prop {number} step - The step value of the slider
 * @prop {number} stepClick - The step value when clicking the increase or decrease buttons
 * @prop {boolean} allowSeeking - If set, the slider will allow seeking, i.e. clicking on the slider will set the value to the clicked position
 * @prop {number} seekingSpeed - The speed of the seeking, i.e. the value will go from min to max in 1 / seekingSpeed seconds
 * @attr hugcontainer - If set, the slider will not have any spacing between the slider icons and the container
 *
 * @slot icon-left - Slot for the left icon
 * @slot icon-right - Slot for the right icon
 *
 * @fires value {ObcSliderValueEvent} - Fires when the value is changed
 */
@customElement('obc-slider')
export class ObcSlider extends LitElement {
  @property({type: Number}) value = 50;
  @property({type: Number}) min = 0;
  @property({type: Number}) max = 100;
  @property({type: Number}) step: number | undefined;
  @property({type: Number}) stepClick = 10;
  @property({type: String}) variant: ObcSliderVariant =
    ObcSliderVariant.NoValue;
  @property({type: Boolean}) hasLeftIcon = false;
  @property({type: Boolean}) hasRightIcon = false;
  @property({type: Boolean}) allowSeeking = false;
  @property({type: Number}) seekingSpeed = 1 / 3;

  @state() private animationFrame: number | null = null;
  private isMouseDown = false;
  private targetValue = 0;
  private animationStartTime: number | null = null;
  private animationStartValue: number = 0;

  onInput(value: number) {
    this.value = value;
    this.dispatchEvent(new CustomEvent('value', {detail: this.value}));
  }

  onReduceClick() {
    this.onInput(Math.max(this.value - this.stepClick, this.min));
  }

  onIncreaseClick() {
    this.onInput(Math.min(this.value + this.stepClick, this.max));
  }

  private get slider(): HTMLInputElement {
    return this.renderRoot.querySelector('input[type="range"]')!;
  }

  private isClickingThumb(e: MouseEvent) {
    const rect = this.slider.getBoundingClientRect();
    const left = rect.left + 24;
    const width = rect.width - 48;
    const thumbWidth = 48;
    const ratioValue =
      parseFloat(this.slider.value) /
      (parseFloat(this.slider.max) - parseFloat(this.slider.min));
    const thumbCenter = left + width * ratioValue;
    const isNearThumb = Math.abs(e.clientX - thumbCenter) <= thumbWidth / 2;
    return isNearThumb;
  }

  private onMouseDown(e: MouseEvent) {
    if (this.allowSeeking) return;
    if (this.isClickingThumb(e)) return;
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

  private onWindowMouseUp = (e: MouseEvent) => {
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
    const rect = this.slider.getBoundingClientRect();
    const left = rect.left + 24;
    const width = rect.width - 48;
    const percent = (e.clientX - left) / width;
    const min = parseFloat(this.slider.min);
    const max = parseFloat(this.slider.max);
    const unroundedValue = min + (max - min) * percent;
    if (this.step) {
      this.targetValue = Math.round(unroundedValue / this.step) * this.step;
    } else {
      this.targetValue = unroundedValue;
    }
  }

  private startAnimation() {
    this.animationStartTime = performance.now();
    this.animationStartValue = parseFloat(this.slider.value);
    const min = parseFloat(this.slider.min);
    const max = parseFloat(this.slider.max);
    const step = this.step;
    const duration = (1 / this.seekingSpeed) * 1000; // ms
    const direction = this.targetValue > this.animationStartValue ? 1 : -1;

    const animate = () => {
      const now = performance.now();
      const elapsed = now - (this.animationStartTime ?? now);
      const range = Math.abs(max - min);
      // How much of the range should be covered by now
      const expectedProgress = Math.min(elapsed / duration, 1);
      const expectedValue =
        this.animationStartValue + direction * range * expectedProgress;
      // Snap to step
      let nextValue = this.animationStartValue;
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
      // Only update if value actually changes
      if (parseFloat(this.slider.value) !== nextValue) {
        this.slider.value = String(nextValue);
        this.slider.dispatchEvent(new Event('input'));
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
        this.animationStartValue = parseFloat(this.slider.value);
        this.animationFrame = requestAnimationFrame(animate);
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
      ${this.hasLeftIcon
        ? html` <obc-icon-button @click=${this.onReduceClick} variant="normal">
            <slot name="icon-left"></slot>
          </obc-icon-button>`
        : null}
      <div class=${classMap({wrapper: true, [this.variant]: true})}>
        <div class="track"></div>

        ${this.variant === ObcSliderVariant.NoInput
          ? html`<div class="passive-thumb"></div>
              <div class="interactive-track"></div>`
          : html`
              <input
                type="range"
                min=${this.min}
                max=${this.max}
                step=${ifDefined(this.step)}
                .value=${this.value.toString()}
                class="slider"
                @input=${(event: Event) => {
                  this.value = Number((event.target as HTMLInputElement).value);
                  this.dispatchEvent(
                    new CustomEvent('value', {detail: this.value})
                  );
                }}
                @mousedown=${this.onMouseDown}
                @mousemove=${this.onMouseMove}
                @mouseup=${this.onMouseUp}
              />
              <div class="interactive-track"></div>
              <div class="thumb"></div>
            `}
      </div>
      ${this.hasRightIcon
        ? html`<obc-icon-button @click=${this.onIncreaseClick} variant="normal">
            <slot name="icon-right"></slot>
          </obc-icon-button>`
        : null}
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-slider': ObcSlider;
  }
}
