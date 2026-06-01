import {LitElement, html, unsafeCSS, svg, type SVGTemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './circular-progress.css?inline';
import {customElement} from '../../decorator.js';

export enum CircularProgressMode {
  determinate = 'determinate',
  indeterminate = 'indeterminate',
  progressiveIndeterminate = 'progressive-indeterminate',
}

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
    const clampedValue = Math.max(0, Math.min(100, rawValue));

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
