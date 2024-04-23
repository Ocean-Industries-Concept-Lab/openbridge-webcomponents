import {HTMLTemplateResult, LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './automation-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-08-forward';
import '../../icons/icon-08-forward-fast';
import '../../icons/icon-08-forward-stopped';
import '../../icons/icon-08-backward';
import '../../icons/icon-08-backward-fast';
import '../../icons/icon-08-backward-stopped';
import '../../icons/icon-08-standby';

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
    return html`<div class="tag">${label.text}</div>`;
  } else {
    const v = label.value.toFixed(0);
    const zeroPadding =
      v.length < label.nDigits ? '0'.repeat(label.nDigits - v.length) : '';
    return html` <div class="direction">
      <span class="zeros">${zeroPadding}</span>
      <span class="value">${v}</span>
      <span class="unit">${label.unit}</span>
    </div>`;
  }
}

@customElement('obc-automation-button')
export class ObcAutomationButton extends LitElement {
  @property({type: String}) size: AutomationButtonSize =
    AutomationButtonSize.regular;
  @property({type: String}) variant: AutomationButtonVariant =
    AutomationButtonVariant.regular;
  @property({type: String}) state: AutomationButtonState =
    AutomationButtonState.open;
  @property({type: Array, attribute: false}) labels: AutomationButtonLabel[] =
    [];
  @property({type: String}) labelPosition: AutomationButtonLabelPosition =
    AutomationButtonLabelPosition.bottom;
  @property({type: String}) labelSize: AutomationButtonLabelSize =
    AutomationButtonLabelSize.regular;
  @property({type: Boolean}) alert: boolean = false;
  @property({type: Boolean}) progress: boolean = false;
  @property({type: String}) direction: AutomationButtonDirection =
    AutomationButtonDirection.forward;

  override render() {
    const labels = this.labels.map(renderLabel);

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

    let direction;
    if (this.variant !== AutomationButtonVariant.double) {
      direction = null;
    } else if (this.direction === AutomationButtonDirection.forward) {
      direction = html`<obi-08-forward
        class="icon-direction"
        use-css-color
      ></obi-08-forward>`;
    } else if (this.direction === AutomationButtonDirection.forwardFast) {
      direction = html`<obi-08-forward-fast
        class="icon-direction"
        use-css-color
      ></obi-08-forward-fast>`;
    } else if (this.direction === AutomationButtonDirection.forwardStopped) {
      direction = html`<obi-08-forward-stopped
        class="icon-direction"
        use-css-color
      ></obi-08-forward-stopped>`;
    } else if (this.direction === AutomationButtonDirection.backward) {
      direction = html`<obi-08-backward
        class="icon-direction"
        use-css-color
      ></obi-08-backward>`;
    } else if (this.direction === AutomationButtonDirection.backwardFast) {
      direction = html`<obi-08-backward-fast
        class="icon-direction"
        use-css-color
      ></obi-08-backward-fast>`;
    } else if (this.direction === AutomationButtonDirection.backwardStopped) {
      direction = html`<obi-08-backward-stopped
        class="icon-direction"
        use-css-color
      ></obi-08-backward-stopped>`;
    } else if (this.direction === AutomationButtonDirection.standby) {
      direction = html`<obi-08-standby
        class="icon-direction"
        use-css-color
      ></obi-08-standby>`;
    }

    return html`
      <button
        class=${classMap({
          wrapper: true,
          ['size-' + this.size]: true,
          ['variant-' + this.variant]: true,
          ['state-' + this.state]: true,
          ['label-' + this.labelPosition]: true,
          ['label-size-' + this.labelSize]: true,
          alert: this.alert,
          progress: this.progress,
        })}
      >
        <div class="icon-holder">
        ${direction}
        ${
          this.variant !== AutomationButtonVariant.double ||
          this.size !== AutomationButtonSize.small
            ? html`<div class="icon-primary">
                <slot name="icon"></slot>
              </div>`
            : ''
        }
            ${this.progress ? progressSpinner : ''}
          ${
            this.alert
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
              : ''
          }
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
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-button': ObcAutomationButton;
  }
}
