import {LitElement, html, nothing, unsafeCSS, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import componentStyle from './progress-bar.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-placeholder.js';

export enum ProgressBarType {
  linear = 'linear',
  circular = 'circular',
}

export enum ProgressBarMode {
  determinate = 'determinate',
  indeterminate = 'indeterminate',
}

export enum CircularProgressState {
  determinate = 'determinate',
  indeterminate = 'indeterminate',
  icon = 'icon',
}

@customElement('obc-progress-bar')
export class ObcProgressBar extends LitElement {
  @property({type: String}) type: ProgressBarType = ProgressBarType.linear;
  @property({type: String}) mode: ProgressBarMode = ProgressBarMode.determinate;
  @property({type: String}) circularState: CircularProgressState =
    CircularProgressState.determinate;
  @property({type: Number}) value = 0;
  @property({type: Boolean}) showValue = false;
  @property({type: Boolean}) showUnit = true;
  @property({type: Boolean}) hasDescription = false;
  @property({type: String}) description = 'Description text';
  @property({type: Boolean}) showState = false;
  @property({type: String}) stateLabel = 'Open';
  @property({type: Boolean}) progressiveIndeterminate = false;

  override render() {
    if (this.type === ProgressBarType.circular) {
      return this.renderCircularProgress();
    }

    return this.renderLinearProgress();
  }

  private renderCircularProgress() {
    const clampedValue = Math.max(0, Math.min(100, this.value));
    const size = 48;
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const strokeDashoffset =
      circumference - (clampedValue / 100) * circumference;

    const minArc = circumference * 0.02;
    const progressiveArcLength = Math.max(
      minArc,
      (clampedValue / 100) * circumference
    );
    const progressiveGapLength = circumference - progressiveArcLength;

    return html`
      <div class="circular-wrapper">
        <svg
          class="circular-svg"
          width="${size}"
          height="${size}"
          viewBox="0 0 ${size} ${size}"
        >
          <circle
            class="circular-background"
            cx="${size / 2}"
            cy="${size / 2}"
            r="${radius}"
            stroke-width="${strokeWidth}"
            fill="none"
          />

          ${this.progressiveIndeterminate
            ? svg`
                <circle
                  class="circular-progress progressive-indeterminate"
                  cx="${size / 2}"
                  cy="${size / 2}"
                  r="${radius}"
                  stroke-width="${strokeWidth}"
                  fill="none"
                  stroke-dasharray="${progressiveArcLength} ${progressiveGapLength}"
                  transform-origin="${size / 2} ${size / 2}"
                />
              `
            : this.circularState === CircularProgressState.determinate
              ? svg`
                <circle
                  class="circular-progress determinate"
                  cx="${size / 2}"
                  cy="${size / 2}"
                  r="${radius}"
                  stroke-width="${strokeWidth}"
                  fill="none"
                  stroke-dasharray="${circumference}"
                  stroke-dashoffset="${strokeDashoffset}"
                  transform="rotate(-90 ${size / 2} ${size / 2})"
                />
              `
              : this.circularState === CircularProgressState.indeterminate
                ? svg`
                <circle
                  class="circular-progress indeterminate"
                  cx="${size / 2}"
                  cy="${size / 2}"
                  r="${radius}"
                  stroke-width="${strokeWidth}"
                  fill="none"
                  stroke-dasharray="${circumference * 0.25} ${circumference * 0.75}"
                  transform-origin="${size / 2} ${size / 2}"
                />
              `
                : this.circularState === CircularProgressState.icon
                  ? svg`
                <circle
                  class="circular-progress complete"
                  cx="${size / 2}"
                  cy="${size / 2}"
                  r="${radius}"
                  stroke-width="${strokeWidth}"
                  fill="none"
                />
              `
                  : ''}
        </svg>

        <div class="circular-content">${this.renderCircularContent()}</div>
      </div>
    `;
  }

  private renderCircularContent() {
    if (this.progressiveIndeterminate) {
      return html`
        <div class="circular-label-container">
          <span class="circular-value">${Math.round(this.value)}</span>
          ${this.showUnit
            ? html`<span class="circular-unit">%</span>`
            : nothing}
        </div>
      `;
    }

    if (this.circularState === CircularProgressState.determinate) {
      return html`
        <div class="circular-label-container">
          <span class="circular-value">${Math.round(this.value)}</span>
          ${this.showUnit
            ? html`<span class="circular-unit">%</span>`
            : nothing}
        </div>
      `;
    } else if (this.circularState === CircularProgressState.indeterminate) {
      return html`
        <div class="circular-label-container">
          <span class="circular-value">
            <slot name="icon">...</slot>
          </span>
        </div>
      `;
    } else {
      return html`
        <div class="circular-icon-container">
          <slot name="icon">
            <obi-placeholder></obi-placeholder>
          </slot>
        </div>
      `;
    }
  }

  private renderLinearProgress() {
    const clampedValue = Math.max(0, Math.min(100, this.value));
    const progressWidth = `${clampedValue}%`;

    return html`
      <div class="wrapper">
        ${this.showValue ? this.renderLabel() : ''}

        <div class="bar">
          ${this.mode === ProgressBarMode.determinate
            ? html`
                <div
                  class="loaded"
                  style=${styleMap({width: progressWidth})}
                ></div>
              `
            : html` <div class="indeterminate-track"></div> `}
        </div>

        ${this.hasDescription
          ? html`
              <div class="description-container">
                <span class="description-text">${this.description}</span>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private renderLabel() {
    if (this.mode === ProgressBarMode.determinate) {
      return html`
        <div class="label-container">
          <div class="value-frame">
            <span class="value-number">${Math.round(this.value)}</span>
            <span class="value-unit">%</span>
          </div>
          ${this.showState
            ? html` <span class="state">${this.stateLabel}</span> `
            : nothing}
        </div>
      `;
    } else {
      return html`
        <div class="label-container">
          <span class="loading-text">Loading</span>
        </div>
      `;
    }
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-progress-bar': ObcProgressBar;
  }
}
