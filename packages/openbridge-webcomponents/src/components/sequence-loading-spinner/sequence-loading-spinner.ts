import {LitElement, html, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import type {PropertyValues} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './sequence-loading-spinner.css?inline';

const DEFAULT_DETERMINATE_FILL_DURATION_MS = 3200;
const DEFAULT_DETERMINATE_FILL_STEPS = 8;

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
 * - Determinate progression uses a built-in stepped fill animation from the current arc toward full completion.
 * - `rotation-duration-ms`: number in ms (controls spin speed).
 *
 * Usage Guidelines:
 * - Use `type` to match the surrounding element size.
 * - With `progression="determinate"`, the arc starts at 12 o'clock on the ring and grows clockwise to match `progress-percent`.
 * - Changing `progress-percent` during determinate progression restarts the built-in stepped fill from the new start toward full completion.
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
  progressPercent = 25;

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
    const rerun = ['progressPercent', 'progression'].some((k) =>
      changed.has(k)
    );
    if (!rerun) {
      return;
    }
    const duration = DEFAULT_DETERMINATE_FILL_DURATION_MS;
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
    const steps = DEFAULT_DETERMINATE_FILL_STEPS;
    const duration = DEFAULT_DETERMINATE_FILL_DURATION_MS;

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
