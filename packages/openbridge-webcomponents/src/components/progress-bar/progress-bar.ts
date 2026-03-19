import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import componentStyle from './progress-bar.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-placeholder.js';
import {CircularProgressMode} from '../../building-blocks/circular-progress/circular-progress.js';

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
  @property({type: Boolean}) showUnit = false;
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

  private getCircularProgressMode(): CircularProgressMode {
    if (this.progressiveIndeterminate) {
      return CircularProgressMode.progressiveIndeterminate;
    }
    if (this.circularState === CircularProgressState.icon) {
      return CircularProgressMode.determinate;
    }
    if (this.circularState === CircularProgressState.indeterminate) {
      return CircularProgressMode.indeterminate;
    }
    return CircularProgressMode.determinate;
  }

  private renderCircularProgress() {
    const progressValue =
      this.circularState === CircularProgressState.icon ? 100 : this.value;

    return html`
      <div class="circular-wrapper">
        <obc-circular-progress
          .mode=${this.getCircularProgressMode()}
          .value=${progressValue}
          .viewBoxSize=${48}
          .strokeWidth=${4}
        ></obc-circular-progress>

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
