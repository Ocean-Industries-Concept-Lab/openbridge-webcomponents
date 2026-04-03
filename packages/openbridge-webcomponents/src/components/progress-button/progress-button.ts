import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import componentStyle from './progress-button.css?inline';
import {customElement} from '../../decorator.js';
import {CircularProgressMode} from '../../building-blocks/circular-progress/circular-progress.js';

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
        this.getCircularProgressMode() !== CircularProgressMode.determinate}"
        aria-valuenow="${this.showProgress &&
        this.getCircularProgressMode() === CircularProgressMode.determinate
          ? this.value
          : nothing}"
        aria-valuemin="${this.showProgress &&
        this.getCircularProgressMode() === CircularProgressMode.determinate
          ? 0
          : nothing}"
        aria-valuemax="${this.showProgress &&
        this.getCircularProgressMode() === CircularProgressMode.determinate
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

  private getCircularProgressMode(): CircularProgressMode {
    if (this.progressiveIndeterminate) {
      return CircularProgressMode.progressiveIndeterminate;
    }
    if (this.mode === ProgressMode.Determinate) {
      return CircularProgressMode.determinate;
    }
    return CircularProgressMode.indeterminate;
  }

  private renderCircularProgress() {
    return html`
      <div class="circular-progress-svg-container">
        ${this.hasAlert
          ? html`<svg
              class="circular-alert-svg"
              viewBox="0 0 42 42"
              preserveAspectRatio="xMidYMid meet"
            >
              <circle
                class="circular-alert-ring"
                cx="21"
                cy="21"
                r="20"
                stroke-width="2"
                fill="none"
              />
            </svg>`
          : nothing}
        <obc-circular-progress
          .mode=${this.getCircularProgressMode()}
          .value=${this.value}
          .viewBoxSize=${42}
          .strokeWidth=${4}
          .padding=${1}
        ></obc-circular-progress>
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
