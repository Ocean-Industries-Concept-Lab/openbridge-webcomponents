import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './gauge-bar-indicator.css?inline';

const FRAME_LENGTH = 36;
const TRACK_LENGTH = FRAME_LENGTH;
const MIN_VISIBLE_FILL_SIZE = 2;

export const gaugeBarIndicatorDirections = ['vertical', 'horizontal'] as const;
export type GaugeBarIndicatorDirection =
  (typeof gaugeBarIndicatorDirections)[number];

export const gaugeBarIndicatorTypes = ['fill', 'tinted'] as const;
export type GaugeBarIndicatorType = (typeof gaugeBarIndicatorTypes)[number];

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * `<obc-gauge-bar-indicator>` – Compact bar gauge indicator for quick value cues.
 *
 * Renders a simplified bar indicator in a fixed **48×48** footprint, with a centered
 * bar frame and a fill that maps directly from a single numeric `value`.
 *
 * ## Features
 *
 * - **Direction variants:** `vertical` and `horizontal` layouts share the same fixed footprint.
 * - **Type variants:** `fill` renders a solid fill; `tinted` renders a lighter fill with an end marker.
 * - **Value mapping:** `value` is clamped to **0…100** and mapped directly to the inner bar length.
 *
 * ## Usage Guidelines
 *
 * Use when the UI needs a compact “level/progress” cue next to other indicators without labels,
 * tickmarks, or scale context. Use `obc-gauge-vertical` / `obc-gauge-horizontal` when the full
 * gauge scale and additional overlays are required.
 */
@customElement('obc-gauge-bar-indicator')
export class ObcGaugeBarIndicator extends LitElement {
  @property({type: Number}) value = 50;

  @property({type: String}) direction: GaugeBarIndicatorDirection = 'vertical';

  @property({type: String}) type: GaugeBarIndicatorType = 'fill';

  static override styles = unsafeCSS(componentStyle);

  private get clampedValue(): number {
    return clamp(Number.isFinite(this.value) ? this.value : 0, 0, 100);
  }

  private get normalizedDirection(): GaugeBarIndicatorDirection {
    return this.direction === 'horizontal' ? 'horizontal' : 'vertical';
  }

  private get normalizedType(): GaugeBarIndicatorType {
    return this.type === 'tinted' ? 'tinted' : 'fill';
  }

  private get actualFillSize(): number {
    return (TRACK_LENGTH * this.clampedValue) / 100;
  }

  private get fillSize(): number {
    if (this.clampedValue <= 0) {
      return 0;
    }
    return clamp(this.actualFillSize, MIN_VISIBLE_FILL_SIZE, TRACK_LENGTH);
  }

  private get unfilledSize(): number {
    return TRACK_LENGTH - this.fillSize;
  }

  override render() {
    const direction = this.normalizedDirection;
    const type = this.normalizedType;
    const isVertical = direction === 'vertical';
    const fillStyle = isVertical
      ? styleMap({height: `${this.fillSize}px`})
      : styleMap({width: `${this.fillSize}px`});
    const unfilledStyle = isVertical
      ? styleMap({height: `${this.unfilledSize}px`})
      : styleMap({width: `${this.unfilledSize}px`});
    const frameClasses = [
      'gauge-bar__frame',
      `gauge-bar__frame--${direction}`,
    ].join(' ');
    const unfilledClasses = [
      'gauge-bar__unfilled',
      `gauge-bar__unfilled--${direction}`,
    ].join(' ');
    const fillClasses = [
      'gauge-bar__fill',
      `gauge-bar__fill--${type}`,
      `gauge-bar__fill--${direction}`,
      type === 'tinted' ? `gauge-bar__fill--tinted-${direction}` : '',
      this.clampedValue >= 100 ? 'gauge-bar__fill--full' : '',
    ]
      .filter(Boolean)
      .join(' ');
    const pointerClasses = [
      'gauge-bar__pointer',
      `gauge-bar__pointer--${direction}`,
    ].join(' ');
    const classes = [
      'gauge-bar',
      `is-${direction}`,
      `is-${type}`,
      this.clampedValue <= 0 ? 'is-empty' : '',
      this.clampedValue >= 100 ? 'is-full' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="${classes}" part="base">
        <div class=${frameClasses} part="frame">
          <div class="gauge-bar__track" part="track">
            <div
              class=${unfilledClasses}
              part="unfilled"
              style=${unfilledStyle}
            ></div>
            <div class=${fillClasses} part="fill" style=${fillStyle}>
              ${type === 'tinted'
                ? html`<div class=${pointerClasses} part="pointer"></div>`
                : null}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-bar-indicator': ObcGaugeBarIndicator;
  }
}
