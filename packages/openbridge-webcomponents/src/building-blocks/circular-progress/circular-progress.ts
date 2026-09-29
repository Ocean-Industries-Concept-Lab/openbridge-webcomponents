import {LitElement, html, unsafeCSS, svg, type SVGTemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './circular-progress.css?inline';
import {customElement} from '../../decorator.js';
import {clamp} from '../../svghelpers/math.js';

export enum CircularProgressMode {
  determinate = 'determinate',
  indeterminate = 'indeterminate',
  progressiveIndeterminate = 'progressive-indeterminate',
}

/**
 * `<obc-circular-progress>` — Ring-shaped progress indicator.
 *
 * Draws a single SVG circle whose stroke shows progress. Three modes:
 * `determinate` sweeps the arc to `value`, `indeterminate` spins a fixed arc
 * for work of unknown length, and `progressiveIndeterminate` spins an arc
 * whose length grows with `value` — for work that reports rough progress.
 *
 * ## Usage Guidelines
 *
 * A building block rather than a page-level control: `obc-progress-bar`,
 * `obc-progress-button` and the automation buttons compose it. `viewBoxSize`,
 * `strokeWidth` and `padding` let a host match the ring to its own geometry.
 *
 * @property mode - Progress mode: `determinate`, `indeterminate` or `progressive-indeterminate`.
 * @property value - Progress in percent, clamped to 0–100.
 * @availableWhen value mode!=indeterminate
 * @property strokeWidth - Ring stroke width in viewBox units.
 * @property viewBoxSize - Side of the square viewBox the ring is drawn in.
 * @property padding - Extra inset in viewBox units, shrinking the ring inside its box.
 * @stable
 */
@customElement('obc-circular-progress')
export class ObcCircularProgress extends LitElement {
  @property({type: String}) mode: CircularProgressMode =
    CircularProgressMode.indeterminate;
  @property({type: Number}) value = 0;
  @property({type: Number}) strokeWidth = 4;
  @property({type: Number}) viewBoxSize = 42;
  @property({type: Number}) padding = 0;

  override render() {
    const size = this.viewBoxSize;
    const sw = this.strokeWidth;
    const center = size / 2;
    const radius = Math.max(0, (size - sw) / 2 - this.padding);
    const circumference = 2 * Math.PI * radius;
    const rawValue = Number.isFinite(this.value) ? this.value : 0;
    const clampedValue = clamp(rawValue, 0, 100);

    let progressElement: SVGTemplateResult;

    if (this.mode === CircularProgressMode.progressiveIndeterminate) {
      const minArc = circumference * 0.02;
      const progressiveArcLength =
        clampedValue >= 100
          ? circumference
          : Math.max(minArc, (clampedValue / 100) * circumference * 0.97);
      const progressiveGapLength = circumference - progressiveArcLength;

      progressElement = svg`
        <circle
          class="circular-progress progressive-indeterminate"
          cx="${center}"
          cy="${center}"
          r="${radius}"
          stroke-width="${sw}"
          fill="none"
          stroke-dasharray="${progressiveArcLength} ${progressiveGapLength}"
          transform-origin="${center} ${center}"
        />
      `;
    } else if (this.mode === CircularProgressMode.determinate) {
      const adjustedValue = clampedValue >= 100 ? 100 : clampedValue * 0.97;
      const strokeDashoffset =
        circumference - (adjustedValue / 100) * circumference;

      progressElement = svg`
        <circle
          class="circular-progress determinate"
          cx="${center}"
          cy="${center}"
          r="${radius}"
          stroke-width="${sw}"
          fill="none"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${strokeDashoffset}"
          transform="rotate(-90 ${center} ${center})"
        />
      `;
    } else {
      progressElement = svg`
        <circle
          class="circular-progress indeterminate"
          cx="${center}"
          cy="${center}"
          r="${radius}"
          stroke-width="${sw}"
          fill="none"
          stroke-dasharray="${circumference * 0.25} ${circumference * 0.75}"
          transform-origin="${center} ${center}"
        />
      `;
    }

    return html`
      <div class="circular-progress-container">
        <svg
          class="circular-progress-svg"
          viewBox="0 0 ${size} ${size}"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            class="circular-background"
            cx="${center}"
            cy="${center}"
            r="${radius}"
            stroke-width="${sw}"
            fill="none"
          />
          ${progressElement}
        </svg>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-circular-progress': ObcCircularProgress;
  }
}
