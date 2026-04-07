import {LitElement, html, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import type {PropertyValues} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './sequence-loading-spinner.css?inline';

const DETERMINATE_MS_PER_PERCENT = 50;
const DETERMINATE_MIN_DURATION_MS = 1200;
const DETERMINATE_MAX_DURATION_MS = 9000;
const DETERMINATE_START_DELAY_MS = 1000;

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
 * - Determinate progression uses a built-in fill animation from the current arc toward full completion.
 * - `rotation-duration-ms`: number in ms (controls spin speed).
 *
 * Usage Guidelines:
 * - Use `type` to match the surrounding element size.
 * - With `progression="determinate"`, the arc starts at 12 o'clock on the ring and grows clockwise to match `progress-percent`.
 * - Changing `progress-percent` during determinate progression restarts the built-in fill from the new start toward full completion.
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
 *   progress-percent="25"
 * ></obc-sequence-loading-spinner>
 * ```
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
  progressPercent = 0;

  @state() private determinateDisplayPercent = 0;

  private fillAnimGeneration = 0;
  private determinateFillFrame?: number;
  private determinateStartDelayTimeout?: number;

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
      : 25;
    return Math.min(100, Math.max(0, percent));
  }

  private get rootClasses() {
    const isDeterminate =
      this.progression === SequenceLoadingSpinnerProgressionType.determinate;
    const p = this.determinateDisplayPercent;
    return {
      'sequence-loading-spinner': true,
      [`type-${this.type}`]: true,
      [`progression-${this.progression}`]: true,
      'progress-empty': isDeterminate && p <= 0,
      'progress-full': isDeterminate && p >= 100,
    };
  }

  private get spinnerStyle() {
    if (this.progression === SequenceLoadingSpinnerProgressionType.scanning) {
      return styleMap({
        '--spinner-rotation-duration': `${this.clampedRotationDurationMs}ms`,
      });
    }
    const percent = this.hasUpdated
      ? this.determinateDisplayPercent
      : this.clampedProgressPercent;
    return styleMap({
      '--spinner-progress-deg': `${percent * 3.6}deg`,
    });
  }

  override disconnectedCallback(): void {
    this.clearFillAnimation();
    super.disconnectedCallback();
  }

  override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (this.progression === SequenceLoadingSpinnerProgressionType.scanning) {
      this.clearFillAnimation();
      return;
    }
    if (
      this.progression !== SequenceLoadingSpinnerProgressionType.determinate
    ) {
      return;
    }
    const rerun = ['progressPercent', 'progression'].some((k) =>
      changed.has(k)
    );
    if (!rerun) {
      return;
    }
    this.startDeterminateFillAnimation();
  }

  private clearFillAnimation(): void {
    if (this.determinateFillFrame !== undefined) {
      window.cancelAnimationFrame(this.determinateFillFrame);
    }
    this.determinateFillFrame = undefined;
    window.clearTimeout(this.determinateStartDelayTimeout);
    this.determinateStartDelayTimeout = undefined;
    this.fillAnimGeneration++;
  }

  private startDeterminateFillAnimation(): void {
    this.clearFillAnimation();
    const generation = this.fillAnimGeneration;
    const start = this.clampedProgressPercent;
    const remaining = Math.max(0, 100 - start);
    const duration = Math.min(
      DETERMINATE_MAX_DURATION_MS,
      Math.max(
        DETERMINATE_MIN_DURATION_MS,
        remaining * DETERMINATE_MS_PER_PERCENT
      )
    );

    if (start >= 100) {
      this.determinateDisplayPercent = 100;
      return;
    }

    this.determinateDisplayPercent = start;

    let startTime: number | undefined = undefined;
    const tick = () => {
      if (generation !== this.fillAnimGeneration) return;
      const now = performance.now();
      if (startTime === undefined) {
        startTime = now;
      }
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / Math.max(duration, 1));
      this.determinateDisplayPercent = start + (100 - start) * t;
      if (t < 1) {
        this.determinateFillFrame = window.requestAnimationFrame(tick);
      } else {
        this.determinateFillFrame = undefined;
        this.determinateDisplayPercent = 100;
      }
    };
    this.determinateStartDelayTimeout = window.setTimeout(() => {
      if (generation !== this.fillAnimGeneration) return;
      this.determinateFillFrame = window.requestAnimationFrame(tick);
    }, DETERMINATE_START_DELAY_MS);
  }

  override render() {
    const style = this.spinnerStyle;
    const content = html`
      <span class="spinner" part="spinner" aria-hidden="true" style=${style}>
        <span class="cap cap-start" aria-hidden="true"></span>
        <span class="cap cap-end" aria-hidden="true"></span>
      </span>
    `;

    return this.isButtonType
      ? html`
          <button
            type="button"
            class=${classMap(this.rootClasses)}
            part="wrapper"
            aria-label="Loading"
            disabled
          >
            ${content}
          </button>
        `
      : html`
          <span class=${classMap(this.rootClasses)} part="wrapper">
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
