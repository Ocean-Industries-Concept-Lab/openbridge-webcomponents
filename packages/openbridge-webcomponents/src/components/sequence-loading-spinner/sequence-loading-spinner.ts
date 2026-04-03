import {LitElement, html, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import type {PropertyValues} from 'lit';
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
 * - Compact spinner for sequence steps, tags, or buttons.
 * - Determinate progress arc or scanning (indeterminate) segment animation.
 *
 * Features and Variants:
 * - `type`: `indicator | indicator-point | tag | tag-point | button | button-point`.
 * - `progression`: `determinate | scanning`.
 * - `progress-percent`: number `0–100` (when `progression="determinate"`), starting arc before any fill animation.
 * - `fill-to-full-duration-ms`: when `> 0` and determinate only, the blue arc **steps** from `progress-percent` to **100%** over this duration (no whole-ring spin).
 * - `fill-to-full-steps`: discrete jumps count for that animation (default 8).
 * - `rotation-duration-ms`: applies to `progression="scanning"` only.
 *
 * Usage Guidelines:
 * - Use `type` to match the surrounding element size.
 * - Use `fill-to-full-duration-ms="0"` for a fixed arc at `progress-percent` only.
 * - With `progression="determinate"`, the arc starts at 12 o'clock on the ring and grows clockwise to match `progress-percent`.
 * - While `fill-to-full-duration-ms` is `> 0`, changing `progress-percent`, `fill-to-full-duration-ms`, or `fill-to-full-steps` restarts the stepped fill from the new start toward 100%.
 *
 * Slots:
 * - None.
 *
 * Events:
 * - None.
 *
 * Best Practices:
 * - Prefer `scanning` for indefinite loading states.
 * - Avoid a long `fill-to-full-duration-ms` if the host updates `progress-percent` frequently (each update restarts the animation).
 *
 * Example:
 * ```html
 * <obc-sequence-loading-spinner
 *   type="button"
 *   progression="determinate"
 *   progress-percent="25"
 *   fill-to-full-duration-ms="3200"
 *   fill-to-full-steps="8"
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
  progressPercent = 25;
  @property({type: Number, attribute: 'fill-to-full-duration-ms'})
  fillToFullDurationMs = 0;
  @property({type: Number, attribute: 'fill-to-full-steps'})
  fillToFullSteps = 8;

  @state() private determinateDisplayPercent = 0;

  private fillAnimGeneration = 0;
  private fillTimeouts: number[] = [];

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
    return styleMap({
      '--spinner-progress-deg': `${this.determinateDisplayPercent * 3.6}deg`,
    });
  }

  override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    if (
      !this.hasUpdated &&
      this.progression === SequenceLoadingSpinnerProgressionType.determinate
    ) {
      this.determinateDisplayPercent = this.clampedProgressPercent;
    }
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
    const rerun = [
      'progressPercent',
      'fillToFullDurationMs',
      'fillToFullSteps',
      'progression',
    ].some((k) => changed.has(k));
    if (!rerun) {
      return;
    }
    const duration = Number.isFinite(this.fillToFullDurationMs)
      ? this.fillToFullDurationMs
      : 0;
    if (duration > 0) {
      this.startDeterminateFillAnimation();
    } else {
      this.clearFillAnimation();
      this.determinateDisplayPercent = this.clampedProgressPercent;
    }
  }

  private clearFillAnimation(): void {
    for (const id of this.fillTimeouts) {
      window.clearTimeout(id);
    }
    this.fillTimeouts = [];
    this.fillAnimGeneration++;
  }

  private startDeterminateFillAnimation(): void {
    this.clearFillAnimation();
    const generation = this.fillAnimGeneration;
    const start = this.clampedProgressPercent;
    const rawSteps = Number.isFinite(this.fillToFullSteps)
      ? this.fillToFullSteps
      : 8;
    const steps = Math.max(1, Math.round(rawSteps));
    const duration = Math.max(0, this.fillToFullDurationMs);

    if (start >= 100) {
      this.determinateDisplayPercent = 100;
      return;
    }

    this.determinateDisplayPercent = start;

    if (!Number.isFinite(duration) || duration <= 0) {
      return;
    }

    const stepMs = duration / steps;
    for (let i = 1; i <= steps; i++) {
      const delay = Math.round(i * stepMs);
      const id = window.setTimeout(() => {
        if (generation !== this.fillAnimGeneration) {
          return;
        }
        const t = i / steps;
        this.determinateDisplayPercent = start + (100 - start) * t;
      }, delay);
      this.fillTimeouts.push(id);
    }
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
