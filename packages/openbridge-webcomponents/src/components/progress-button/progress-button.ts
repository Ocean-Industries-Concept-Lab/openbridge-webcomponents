import {LitElement, html, nothing, unsafeCSS, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import componentStyle from './progress-button.css?inline';
import {customElement} from '../../decorator.js';

export enum ProgressButtonType {
  Linear = 'linear',
  Circular = 'circular',
}

export enum ButtonStyle {
  Regular = 'regular',
  Flat = 'flat',
  Raised = 'raised',
}

export enum ProgressMode {
  Determinate = 'determinate',
  Indeterminate = 'indeterminate',
}

export interface ProgressButtonClickEvent {
  value: number;
}

@customElement('obc-progress-button')
export class ObcProgressButton extends LitElement {
  @property({type: String}) type: ProgressButtonType =
    ProgressButtonType.Linear;
  @property({type: String}) buttonStyle: ButtonStyle = ButtonStyle.Regular;
  @property({type: String}) mode: ProgressMode = ProgressMode.Determinate;
  @property({type: Number}) value = 0;
  @property({type: String}) label = '';
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) showProgress = false;
  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: Boolean}) hasTrailingIcon = false;
  @property({type: Boolean}) hasAlert = false;
  @property({type: Boolean}) progressiveIndeterminate = false;
  @property({type: Boolean}) showLabel = false;

  override render() {
    if (this.type === ProgressButtonType.Circular) {
      return this.renderCircularButton();
    }
    return this.renderLinearButton();
  }

  private renderLinearButton() {
    const wrapperClasses = {
      wrapper: true,
      'linear-wrapper': true,
      [this.buttonStyle]: true,
      disabled: this.disabled,
    };

    const visibleWrapperClasses = {
      'visible-wrapper': true,
      alert: this.hasAlert,
    };

    return html`
      <button
        class="${classMap(wrapperClasses)}"
        ?disabled="${this.disabled}"
        @click="${this.handleClick}"
        aria-label="${this.label}"
        aria-busy="${this.showProgress &&
        this.mode === ProgressMode.Indeterminate}"
        aria-valuenow="${this.showProgress &&
        this.mode === ProgressMode.Determinate
          ? this.value
          : nothing}"
        aria-valuemin="${this.showProgress &&
        this.mode === ProgressMode.Determinate
          ? 0
          : nothing}"
        aria-valuemax="${this.showProgress &&
        this.mode === ProgressMode.Determinate
          ? 100
          : nothing}"
        role="button"
      >
        ${this.showProgress ? this.renderLinearProgress() : nothing}

        <div class="${classMap(visibleWrapperClasses)}">
          <div class="linear-label-icon-container">
            ${this.hasLeadingIcon
              ? html`<slot name="leading-icon"></slot>`
              : nothing}
            <span class="button-text">${this.label}</span>
          </div>
          ${this.hasTrailingIcon
            ? html`<slot name="trailing-icon"></slot>`
            : nothing}
        </div>
      </button>
    `;
  }

  private renderLinearProgress() {
    const clampedValue = Math.max(0, Math.min(100, this.value));
    const progressWidth = `${clampedValue}%`;

    return html`
      <div class="linear-progress-container">
        <div class="linear-progress-bar">
          ${this.mode === ProgressMode.Determinate
            ? html`
                <div
                  class="linear-progress-fill"
                  style=${styleMap({width: progressWidth})}
                ></div>
              `
            : html` <div class="linear-progress-indeterminate"></div> `}
        </div>
      </div>
    `;
  }

  private renderCircularButton() {
    const wrapperClasses = {
      wrapper: true,
      'circular-wrapper': true,
      disabled: this.disabled,
      'with-label': this.showLabel,
    };

    return html`
      <button
        class="${classMap(wrapperClasses)}"
        ?disabled="${this.disabled}"
        @click="${this.handleClick}"
        aria-label="${this.label}"
        aria-busy="${this.showProgress &&
        (this.mode === ProgressMode.Indeterminate ||
          this.progressiveIndeterminate)}"
        aria-valuenow="${this.showProgress &&
        this.mode === ProgressMode.Determinate
          ? this.value
          : nothing}"
        aria-valuemin="${this.showProgress &&
        this.mode === ProgressMode.Determinate
          ? 0
          : nothing}"
        aria-valuemax="${this.showProgress &&
        this.mode === ProgressMode.Determinate
          ? 100
          : nothing}"
        role="button"
      >
        <div class="circular-icon-container">
          ${this.showProgress ? this.renderCircularProgress() : nothing}

          <div class="circular-visible-wrapper">
            <slot name="icon"></slot>
          </div>
        </div>

        ${this.showLabel
          ? html`<div class="circular-label">${this.label}</div>`
          : nothing}
      </button>
    `;
  }

  private renderCircularProgress() {
    const viewBoxSize = 42;
    const strokeWidth = 4;
    const alertStrokeWidth = 2;
    const center = viewBoxSize / 2;
    const radius = (viewBoxSize - strokeWidth - alertStrokeWidth) / 2;
    const alertRadius = (viewBoxSize - alertStrokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const clampedValue = Math.max(0, Math.min(100, this.value));

    let progressElement;

    if (this.progressiveIndeterminate) {
      const minArc = circumference * 0.02;

      let progressiveArcLength;
      if (clampedValue >= 100) {
        progressiveArcLength = circumference;
      } else {
        progressiveArcLength = Math.max(
          minArc,
          (clampedValue / 100) * circumference * 0.97
        );
      }

      const progressiveGapLength = circumference - progressiveArcLength;

      progressElement = svg`
        <circle
          class="circular-progress progressive-indeterminate"
          cx="${center}"
          cy="${center}"
          r="${radius}"
          stroke-width="${strokeWidth}"
          fill="none"
          stroke-dasharray="${progressiveArcLength} ${progressiveGapLength}"
          transform-origin="${center} ${center}"
        />
      `;
    } else if (this.mode === ProgressMode.Determinate) {
      const adjustedValue = clampedValue >= 100 ? 100 : clampedValue * 0.97;

      const strokeDashoffset =
        circumference - (adjustedValue / 100) * circumference;

      progressElement = svg`
        <circle
          class="circular-progress determinate"
          cx="${center}"
          cy="${center}"
          r="${radius}"
          stroke-width="${strokeWidth}"
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
          stroke-width="${strokeWidth}"
          fill="none"
          stroke-dasharray="${circumference * 0.25} ${circumference * 0.75}"
          transform-origin="${center} ${center}"
        />
      `;
    }

    const alertRing = this.hasAlert
      ? svg`
      <circle
        class="circular-alert-ring"
        cx="${center}"
        cy="${center}"
        r="${alertRadius}"
        stroke-width="${alertStrokeWidth}"
        fill="none"
      />
    `
      : nothing;

    return html`
      <div class="circular-progress-svg-container">
        <svg
          class="circular-progress-svg"
          viewBox="0 0 ${viewBoxSize} ${viewBoxSize}"
          preserveAspectRatio="xMidYMid meet"
        >
          ${alertRing}
          <circle
            class="circular-background"
            cx="${center}"
            cy="${center}"
            r="${radius}"
            stroke-width="${strokeWidth}"
            fill="none"
          />
          ${progressElement}
        </svg>
      </div>
    `;
  }

  private handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const event = new CustomEvent<ProgressButtonClickEvent>('obc-click', {
      detail: {
        value: this.value,
      },
      composed: true,
    });

    this.dispatchEvent(event);
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-progress-button': ObcProgressButton;
  }
}
