import {LitElement, html, nothing, unsafeCSS, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import componentStyle from './progress-button.css?inline';
import {customElement} from '../../decorator.js';

export type ProgressButtonType = 'linear' | 'circular';
export type ButtonStyle = 'regular' | 'flat' | 'raised';
export type ProgressMode = 'determinate' | 'indeterminate';

export interface ProgressButtonClickEvent {
  value: number;
}

@customElement('obc-progress-button')
export class ObcProgressButton extends LitElement {
  @property({type: String}) type: ProgressButtonType = 'linear';
  @property({type: String}) buttonStyle: ButtonStyle = 'regular';
  @property({type: String}) mode: ProgressMode = 'determinate';
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
    if (this.type === 'circular') {
      return this.renderCircularButton();
    }
    return this.renderLinearButton();
  }

  private renderLinearButton() {
    const wrapperClasses = {
      'wrapper': true,
      'linear-wrapper': true,
      [this.buttonStyle]: true,
      'disabled': this.disabled,
    };

    const visibleWrapperClasses = {
      'visible-wrapper': true,
      'alert': this.hasAlert,
    };

    return html`
      <button
        class="${classMap(wrapperClasses)}"
        ?disabled="${this.disabled}"
        @click="${this.handleClick}"
        aria-label="${this.label}"
        aria-busy="${this.showProgress && this.mode === 'indeterminate'}"
        role="button"
      >
        ${this.showProgress ? this.renderLinearProgress() : nothing}
        
        <div class="${classMap(visibleWrapperClasses)}">
          ${this.hasLeadingIcon
            ? html`<slot name="leading-icon"></slot>`
            : nothing}
          <span class="button-text">${this.label}</span>
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
          ${this.mode === 'determinate'
            ? html`
                <div
                  class="linear-progress-fill"
                  style=${styleMap({width: progressWidth})}
                ></div>
              `
            : html`
                <div class="linear-progress-indeterminate"></div>
              `}
        </div>
      </div>
    `;
  }

  private renderCircularButton() {
    const wrapperClasses = {
      'wrapper': true,
      'circular-wrapper': true,
      'disabled': this.disabled,
      'with-label': this.showLabel,
    };

    return html`
      <button
        class="${classMap(wrapperClasses)}"
        ?disabled="${this.disabled}"
        @click="${this.handleClick}"
        aria-label="${this.label}"
        aria-busy="${this.showProgress && (this.mode === 'indeterminate' || this.progressiveIndeterminate)}"
        role="button"
      >
        ${this.showProgress ? this.renderCircularProgress() : nothing}
        
        <div class="circular-visible-wrapper">
          <slot name="icon"></slot>
        </div>
        
        ${this.showLabel
          ? html`<div class="circular-label">${this.label}</div>`
          : nothing}
      </button>
    `;
  }

  private renderCircularProgress() {
    const size = 48;
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const clampedValue = Math.max(0, Math.min(100, this.value));

    let progressElement;

    if (this.progressiveIndeterminate) {
      // Progressive indeterminate: spinning arc that grows with value
      const minArc = circumference * 0.02;
      const progressiveArcLength = Math.max(
        minArc,
        (clampedValue / 100) * circumference
      );
      const progressiveGapLength = circumference - progressiveArcLength;

      progressElement = svg`
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
      `;
    } else if (this.mode === 'determinate') {
      const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

      progressElement = svg`
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
      `;
    } else {
      // Indeterminate mode
      progressElement = svg`
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
      `;
    }

    return html`
      <svg
        class="circular-progress-svg ${this.hasAlert ? 'alert' : ''}"
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
        ${progressElement}
      </svg>
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