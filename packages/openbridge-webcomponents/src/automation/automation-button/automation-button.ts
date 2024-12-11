import { HTMLTemplateResult, LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import compentStyle from './automation-button.css?inline';
import { classMap } from 'lit/directives/class-map.js';
import '../../icons/icon-forward';
import '../../icons/icon-forward-fast';
import '../../icons/icon-forward-stopped';
import '../../icons/icon-backward';
import '../../icons/icon-backward-fast';
import '../../icons/icon-backward-stopped';
import '../../icons/icon-standby';
import '../../icons/icon-arrow-up-google';
import '../../icons/icon-arrow-down-google';
import '../../icons/icon-arrow-back-google';
import '../../icons/icon-arrow-forward-google';

export enum AutomationButtonSize {
  small = 'small',
  regular = 'regular',
  large = 'large',
  xl = 'xl',
}

export enum AutomationButtonVariant {
  regular = 'regular',
  double = 'double',
  switch = 'switch',
}

export enum AutomationButtonState {
  closed = 'closed',
  open = 'open',
  openEnhanced = 'open-enhanced',
  openMedium = 'open-medium',
  static = 'static',
}

export enum AutomationButtonLabelSize {
  small = 'small',
  regular = 'regular',
  enhanced = 'enhanced',
}

export enum AutomationBottonLabelStyle {
  regular = 'regular',
  enhanced = 'enhanced',
  active = 'active',
}

export interface AutomationButtonStateLabel {
  type: 'state';
  text: string;
  bold: boolean;
}

export interface AutomationButtonTagLabel {
  type: 'tag';
  text: string;
  showHash: boolean;
}

export interface AutomationButtonDirectonValueLabel {
  type: 'direction';
  value: number;
  nDigits: number;
  unit: 'percent';
  direction: 'up' | 'down' | 'left' | 'right';
}

export enum AutomationButtonLabelPosition {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

export enum AutomationButtonDirection {
  forward = 'forward',
  forwardFast = 'forward-fast',
  forwardStopped = 'forward-stopped',
  backward = 'backward',
  backwardFast = 'backward-fast',
  backwardStopped = 'backward-stopped',
  standby = 'standby',
}

export type AutomationButtonLabel =
  | AutomationButtonStateLabel
  | AutomationButtonTagLabel
  | AutomationButtonDirectonValueLabel;

function renderLabel(label: AutomationButtonLabel): HTMLTemplateResult {
  if (label.type === 'state') {
    return html`<div class="state ${label.bold ? 'bold' : ''}">
      ${label.text}
    </div>`;
  } else if (label.type === 'tag') {
    return html`<div class="tag">
      ${label.showHash ? html`<div class="hash">#</div>` : null} ${label.text}
    </div>`;
  } else {
    const v = label.value.toFixed(0);
    const zeroPadding =
      v.length < label.nDigits ? '0'.repeat(label.nDigits - v.length) : '';

    let directionIcon: HTMLTemplateResult;
    if (label.direction === 'up') {
      directionIcon = html`<obi-arrow-up-google
        class="direction-icon"
      ></obi-arrow-up-google>`;
    } else if (label.direction === 'down') {
      directionIcon = html`<obi-arrow-down-google
        class="direction-icon"
      ></obi-arrow-down-google>`;
    } else if (label.direction === 'left') {
      directionIcon = html`<obi-arrow-back-google
        class="direction-icon"
      ></obi-arrow-back-google>`;
    } else if (label.direction === 'right') {
      directionIcon = html`<obi-arrow-forward-google
        class="direction-icon"
      ></obi-arrow-forward-google>`;
    } else {
      throw new Error('Invalid direction');
    }
    return html` <div class="direction">
      ${directionIcon}
      <span class="zeros">${zeroPadding}</span>
      <span class="value">${v}</span>
      <span class="unit">${label.unit === 'percent' ? '%' : label.unit}</span>
    </div>`;
  }
}

@customElement('obc-automation-button')
export class ObcAutomationButton extends LitElement {
  @property({ type: String }) size: AutomationButtonSize =
    AutomationButtonSize.regular;
  @property({ type: String }) variant: AutomationButtonVariant =
    AutomationButtonVariant.regular;
  @property({ type: String }) state: AutomationButtonState =
    AutomationButtonState.open;
  @property({ type: Array, attribute: false }) labels: AutomationButtonLabel[] =
    [];
  @property({ type: String }) labelPosition: AutomationButtonLabelPosition =
    AutomationButtonLabelPosition.bottom;
  @property({ type: String }) labelSize: AutomationButtonLabelSize =
    AutomationButtonLabelSize.regular;
  @property({ type: String }) labelStyle: AutomationBottonLabelStyle =
    AutomationBottonLabelStyle.regular;
  @property({ type: Boolean }) alert: boolean = false;
  @property({ type: Boolean }) progress: boolean = false;
  @property({ type: String }) direction: AutomationButtonDirection =
    AutomationButtonDirection.forward;

  override render() {
    const labels = this.labels.map(renderLabel);
    const progressSpinner = this.getProgressSpinner();
    const direction = this.getDirectionIcon();

    return html`
      <div class="outer-wrapper">
        <button
          class=${classMap({
      wrapper: true,
      ['size-' + this.size]: true,
      ['variant-' + this.variant]: true,
      ['state-' + this.state]: true,
      ['label-' + this.labelPosition]: true,
      ['label-size-' + this.labelSize]: true,
      ['label-style-' + this.labelStyle]: true,
      alert: this.alert,
      progress: this.progress,
    })}
        >
          <div class="icon-holder">
            ${direction}
            ${this.variant !== AutomationButtonVariant.double ||
        this.size !== AutomationButtonSize.small
        ? html`<div class="icon-primary">
                  <slot name="icon"></slot>
                </div>`
        : ''}
            ${progressSpinner}
            ${this.alert
        ? html`<svg
                  class="alert-icon"
                  width="18"
                  height="31"
                  viewBox="0 0 18 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 0 0 L 16 0 C 17.1046 0 18 0.8954 18 2 V 14.7889 C 18 15.5786 17.7662 16.3506 17.3282 17.0077 L 9 30 V 3 L  7 1 H 0  Z"
                    fill="var(--alert-alarm-color)"
                  />
                  <path
                    d="M12 4H14V11.5H12V4Z"
                    fill="var(--on-alarm-active-color)"
                  />
                  <path
                    d="M12 13.5H14V15.5H12V13.5Z"
                    fill="var(--on-alarm-active-color)"
                  />
                </svg> `
        : ''}
            <div class="badge-top-right">
              <slot name="badge-top-right"></slot>
            </div>
            <div class="badge-top-left">
              <slot name="badge-top-left"></slot>
            </div>
            <div class="badge-bottom-left">
              <slot name="badge-bottom-left"></slot>
            </div>
            <div class="badge-bottom-right">
              <slot name="badge-bottom-right"></slot>
            </div>
          </div>
          <div class="label">${labels}</div>
        </button>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);

  private getProgressSpinner(): null | HTMLTemplateResult {
    if (!this.progress) {
      return null;
    }

    let spinnerWidth: number;
    if (this.size === AutomationButtonSize.small) {
      spinnerWidth = 40;
    } else if (this.size === AutomationButtonSize.regular) {
      spinnerWidth = 56;
    } else if (this.size === AutomationButtonSize.large) {
      spinnerWidth = 72;
    } else {
      spinnerWidth = 104;
    }
    const progressSpinner = html`<svg
      width="${spinnerWidth}"
      height="${spinnerWidth}"
      viewBox="0 0 ${spinnerWidth} ${spinnerWidth}"
      fill="none"
      class="progress-spinner"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 ${spinnerWidth / 2} A ${spinnerWidth / 2 - 2} ${spinnerWidth / 2 -
      2} 0 0 1 ${spinnerWidth / 2} 2"
        stroke="var(--instrument-enhanced-secondary-color)"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg> `;
    return progressSpinner;
  }

  private getDirectionIcon(): null | HTMLTemplateResult {
    if (this.variant !== AutomationButtonVariant.double) {
      return null;
    } else if (this.direction === AutomationButtonDirection.forward) {
      return html`<svg
        class="icon-direction"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 5 v 14 L 20 12Z"
          stroke="var(--automation-device-tertiary-color)"
          fill="var(--automation-device-primary-color)"
          vector-effect="non-scaling-stroke"
        />
      </svg> `;
    } else if (this.direction === AutomationButtonDirection.forwardFast) {
      return html`<svg
        class="icon-direction"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 5 v 14 l 8.5 -7 Z M14.5 5 v 14 l 8.5 -7 Z"
          stroke="var(--automation-device-tertiary-color)"
          fill="var(--automation-device-primary-color)"
          vector-effect="non-scaling-stroke"
        />
      </svg> `;
    } else if (this.direction === AutomationButtonDirection.forwardStopped) {
      return html`<svg
        class="icon-direction"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 5 v 14 L 20 12Z"
          fill="var(--automation-device-tertiary-color)"
          stroke="var(--automation-device-tertiary-inverted-color)"
          vector-effect="non-scaling-stroke"
        />
      </svg> `;
    } else if (this.direction === AutomationButtonDirection.backward) {
      return html`<svg
        class="icon-direction"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 5 v 14 L 4 12Z"
          stroke="var(--automation-device-tertiary-color)"
          fill="var(--automation-device-primary-color)"
          vector-effect="non-scaling-stroke"
        />
      </svg>`;
    } else if (this.direction === AutomationButtonDirection.backwardFast) {
      return html`<svg
        class="icon-direction"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.5 5 v 14 l -8.5 -7 Z M9.5 5 v 14 l -8.5 -7 Z"
          stroke="var(--automation-device-tertiary-color)"
          fill="var(--automation-device-primary-color)"
          vector-effect="non-scaling-stroke"
        />
      </svg>`;
    } else if (this.direction === AutomationButtonDirection.backwardStopped) {
      return html`<svg
        class="icon-direction"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 5 v 14 L 4 12Z"
          fill="var(--automation-device-tertiary-color)"
          stroke="var(--automation-device-tertiary-inverted-color)"
          vector-effect="non-scaling-stroke"
        />
      </svg> `;
    } else if (this.direction === AutomationButtonDirection.standby) {
      return html`<obi-standby
        class="icon-direction"
        usecsscolor
      ></obi-standby>`;
    }
    throw new Error('Invalid direction');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-button': ObcAutomationButton;
  }
}
