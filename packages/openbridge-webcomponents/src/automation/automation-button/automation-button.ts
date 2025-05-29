import {HTMLTemplateResult, LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './automation-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-forward.js';
import '../../icons/icon-forward-fast.js';
import '../../icons/icon-forward-stopped.js';
import '../../icons/icon-backward.js';
import '../../icons/icon-backward-fast.js';
import '../../icons/icon-backward-stopped.js';
import '../../icons/icon-standby.js';
import '../../icons/icon-arrow-up-google.js';
import '../../icons/icon-arrow-down-google.js';
import '../../icons/icon-arrow-left-google.js';
import '../../icons/icon-arrow-right-google.js';
import '../../components/alert-frame/alert-frame.js';
import {
  ObcAlertFrameStatus,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';

export enum AutomationButtonVariant {
  regular = 'regular',
  double = 'double',
  square = 'square',
  flat = 'flat',
}

export enum AutomationButtonState {
  closed = 'closed',
  open = 'open',
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
      directionIcon = html`<obi-arrow-left-google
        class="direction-icon"
      ></obi-arrow-left-google>`;
    } else if (label.direction === 'right') {
      directionIcon = html`<obi-arrow-right-google
        class="direction-icon"
      ></obi-arrow-right-google>`;
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
  @property({type: String}) variant: AutomationButtonVariant =
    AutomationButtonVariant.regular;
  @property({type: String}) state: AutomationButtonState =
    AutomationButtonState.open;
  @property({type: Boolean}) static: boolean = false;
  @property({type: Array, attribute: false}) labels: AutomationButtonLabel[] =
    [];
  @property({type: String}) labelPosition: AutomationButtonLabelPosition =
    AutomationButtonLabelPosition.bottom;
  @property({type: String}) labelSize: AutomationButtonLabelSize =
    AutomationButtonLabelSize.regular;
  @property({type: String}) labelStyle: AutomationBottonLabelStyle =
    AutomationBottonLabelStyle.regular;
  @property({type: Boolean}) alert: boolean = false;
  @property({type: String}) alertFrameType: ObcAlertFrameType =
    ObcAlertFrameType.SmallSideFlip;
  @property({type: String}) alertFrameThickness: ObcAlertFrameThickness =
    ObcAlertFrameThickness.Small;
  @property({type: String}) alertFrameStatus: ObcAlertFrameStatus =
    ObcAlertFrameStatus.Alarm;
  @property({type: Boolean}) progress: boolean = false;
  @property({type: String}) direction: AutomationButtonDirection =
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
            ['variant-' + this.variant]: true,
            ['state-' + this.state]: true,
            'label-empty': labels.length === 0,
            ['label-' + this.labelPosition]: true,
            ['label-size-' + this.labelSize]: true,
            ['label-style-' + this.labelStyle]: true,
            alert: this.alert,
            progress: this.progress,
            static: this.static,
          })}
        >
          <div class="icon-touch-target">
            <div class="icon-holder">
              ${direction}
              <div class="icon-primary">
                <slot name="icon"></slot>
              </div>
              ${this.variant === AutomationButtonVariant.flat
                ? html` <div class="icon-siluette">
                    <slot name="icon-siluette"></slot>
                  </div>`
                : nothing}
              ${progressSpinner}
            </div>
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
          ${this.alert
            ? html` <obc-alert-frame
                class="alert-frame"
                .type=${this.alertFrameType}
                .thickness=${this.alertFrameThickness}
                .status=${this.alertFrameStatus}
              >
                <span slot="icon"><slot name="alert-icon"></slot></span>
                <span slot="label"><slot name="alert-label"></slot></span>
                <span slot="timer"><slot name="alert-timer"></slot></span>
              </obc-alert-frame>`
            : nothing}
        </button>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);

  private getProgressSpinner(): null | HTMLTemplateResult {
    if (!this.progress) {
      return null;
    }

    const spinnerWidth = parseFloat(
      getComputedStyle(this).getPropertyValue(
        '--automation-components-button-visual-target'
      )
    );
    const strokeWidth = parseFloat(
      getComputedStyle(this).getPropertyValue(
        '--automation-components-button-progress-bar-stroke'
      )
    );
    const progressSpinner = html`<svg
      width="${spinnerWidth}"
      height="${spinnerWidth}"
      viewBox="0 0 ${spinnerWidth} ${spinnerWidth}"
      fill="none"
      class="progress-spinner"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M${strokeWidth / 2} ${spinnerWidth / 2} A ${(spinnerWidth -
          strokeWidth) /
        2} ${(spinnerWidth - strokeWidth) / 2} 0 0 1 ${spinnerWidth /
        2} ${strokeWidth / 2}"
        stroke="var(--instrument-enhanced-secondary-color)"
        stroke-width=${strokeWidth}
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
