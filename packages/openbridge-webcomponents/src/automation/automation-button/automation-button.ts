import {HTMLTemplateResult, LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
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
import {customElement} from '../../decorator.js';
import {
  AutomationButtonReadoutStack,
  AutomationButtonReadoutStackSize,
  AutomationButtonReadoutStackTag,
  IdTagOrientation,
} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import '../../components/automation-button-readout-stack/automation-button-readout-stack.js';

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

export enum AutomationButtonReadoutPosition {
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

export enum AutomationButtonLabelDirection {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right',
}

@customElement('obc-automation-button')
export class ObcAutomationButton extends LitElement {
  @property({type: String}) variant: AutomationButtonVariant =
    AutomationButtonVariant.regular;
  @property({type: String}) state: AutomationButtonState =
    AutomationButtonState.open;
  @property({type: Boolean}) static: boolean = false;
  @property({type: Array, attribute: false})
  readouts: AutomationButtonReadoutStack[] = [];
  @property({attribute: false})
  tag: AutomationButtonReadoutStackTag | null = null;
  @property({type: String}) readoutPosition: AutomationButtonReadoutPosition =
    AutomationButtonReadoutPosition.bottom;
  @property({type: String}) readoutSize: AutomationButtonReadoutStackSize =
    AutomationButtonReadoutStackSize.regular;
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
    const progressSpinner = this.getProgressSpinner();
    const direction = this.getDirectionIcon();

    return html`
      <div class="outer-wrapper">
        <button
          class=${classMap({
            wrapper: true,
            ['variant-' + this.variant]: true,
            ['state-' + this.state]: true,
            'label-empty': this.readouts.length === 0,
            ['label-' + this.readoutPosition]: true,
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
          <obc-automation-button-readout-stack
            .readouts=${this.readouts}
            .tag=${this.tag}
            .size=${this.readoutSize}
            .idTagOrientation=${this.getIdTagOrientation()}
          ></obc-automation-button-readout-stack>
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
        '--automation-components-button-device-visual-target'
      )
    );
    const strokeWidth = parseFloat(
      getComputedStyle(this).getPropertyValue(
        '--automation-components-button-device-progress-bar-stroke'
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

  private getIdTagOrientation(): IdTagOrientation {
    if (this.readoutPosition === AutomationButtonReadoutPosition.top) {
      return IdTagOrientation.top;
    }
    return IdTagOrientation.bottom;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-button': ObcAutomationButton;
  }
}
