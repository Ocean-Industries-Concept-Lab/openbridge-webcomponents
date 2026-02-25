import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './sequence-loading-spinner.css?inline';

export enum SequenceLoadingSpinnerType {
  indicator = 'indicator',
  indicatorPoint = 'indicator-point',
  tag = 'tag',
  tagPoint = 'tag-point',
  button = 'button',
  buttonPoint = 'button-point',
}

export enum SequenceLoadingSpinnerProgressionType {
  determinate = 'determinate',
  scanning = 'scanning',
}

/**
 * `<obc-sequence-loading-spinner>` — circular loading indicator for sequence UI.
 *
 * Overview:
 * A compact spinner used alongside sequence steps, tags, or buttons.
 *
 * Features / Variants:
 * - `type`: `indicator | indicator-point | tag | tag-point | button | button-point`.
 * - `progression`: `determinate | scanning`.
 * - `progress-percent`: number `0–100` (used when `progression="determinate"`).
 * - `rotation-duration-ms`: number in ms (controls spin speed).
 *
 * Usage Guidelines:
 * - Use `type` to match the surrounding element size.
 * - Use `progression="determinate"` when you have progress data.
 *
 * Slots / Content:
 * - None.
 *
 * Events:
 * - None.
 *
 * Best Practices:
 * - Keep `progress-percent` within `0–100` for predictable rendering.
 * - Prefer `scanning` for indefinite loading states.
 *
 * Example:
 * ```html
 * <obc-sequence-loading-spinner
 *   type="button"
 *   progression="determinate"
 *   progress-percent="62.5"
 *   rotation-duration-ms="1200"
 * ></obc-sequence-loading-spinner>
 * ```
 *
 * Keywords: sequence, loading, spinner, progress, determinate, scanning.
 */
@customElement('obc-sequence-loading-spinner')
export class ObcSequenceLoadingSpinner extends LitElement {
  @property({type: String}) type: SequenceLoadingSpinnerType =
    SequenceLoadingSpinnerType.indicator;
  @property({type: String}) progression: SequenceLoadingSpinnerProgressionType =
    SequenceLoadingSpinnerProgressionType.determinate;
  @property({type: Number, attribute: 'rotation-duration-ms'})
  rotationDurationMs = 1000;
  @property({type: Number, attribute: 'progress-percent'})
  progressPercent = 62.5;

  private get wrapperClasses() {
    return {
      wrapper: true,
      'sequence-loading-spinner': true,
      [`type-${this.type}`]: true,
      [`progression-${this.progression}`]: true,
    };
  }

  private get isButtonType(): boolean {
    return (
      this.type === SequenceLoadingSpinnerType.button ||
      this.type === SequenceLoadingSpinnerType.buttonPoint
    );
  }

  private get clampedRotationDurationMs(): number {
    const duration = Number.isFinite(this.rotationDurationMs)
      ? this.rotationDurationMs
      : 1000;
    return Math.max(100, duration);
  }

  private get clampedProgressPercent(): number {
    const percent = Number.isFinite(this.progressPercent)
      ? this.progressPercent
      : 62.5;
    return Math.min(100, Math.max(0, percent));
  }

  override render() {
    const style = styleMap({
      '--spinner-rotation-duration': `${this.clampedRotationDurationMs}ms`,
      '--spinner-progress-deg': `${this.clampedProgressPercent * 3.6}deg`,
    });
    const content = html`
      <span class="spinner" part="spinner" aria-hidden="true" style=${style}>
        <span class="caps" aria-hidden="true">
          <span class="cap cap-start" aria-hidden="true"></span>
          <span class="cap cap-end" aria-hidden="true"></span>
        </span>
      </span>
    `;

    return this.isButtonType
      ? html`
          <button
            type="button"
            class=${classMap(this.wrapperClasses)}
            part="wrapper"
            aria-label="Loading"
            disabled
          >
            ${content}
          </button>
        `
      : html`
          <span class=${classMap(this.wrapperClasses)} part="wrapper">
            ${content}
          </span>
        `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-sequence-loading-spinner': ObcSequenceLoadingSpinner;
  }
}
