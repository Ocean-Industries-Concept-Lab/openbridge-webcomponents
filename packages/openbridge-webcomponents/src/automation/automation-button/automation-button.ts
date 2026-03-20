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
import '../../building-blocks/circular-progress/circular-progress.js';
import {CircularProgressMode} from '../../building-blocks/circular-progress/circular-progress.js';

export {CircularProgressMode};

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

/**
 * The positioning of the automation button.
 * - `point`: The button is wrapped in a 0x0 px div, where the center of the symbol is the center of the div.
 * - `symbol`: The button is wrapped in a div containing the symbol but not the readout stack
 * - `button`: The button not wrapped, in is positioned based on the full size of the button.
 */
export enum AutomationButtonPositioning {
  point = 'point',
  symbol = 'symbol',
  button = 'button',
}

@customElement('obc-automation-button')
export class ObcAutomationButton extends LitElement {
  @property({type: String}) variant: AutomationButtonVariant =
    AutomationButtonVariant.regular;
  @property({type: String}) state: AutomationButtonState =
    AutomationButtonState.open;
  @property({type: Boolean}) static: boolean = false;
  @property({type: Boolean, attribute: false}) showReadoutStack: boolean = true;
  @property({type: Array, attribute: false})
  readouts: AutomationButtonReadoutStack[] = [];
  @property({attribute: false})
  tag: AutomationButtonReadoutStackTag | null = null;
  @property({type: Boolean}) hasIdTag: boolean = false;
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
  @property({type: Boolean, attribute: false}) showAlertCategoryIcon: boolean =
    true;
  @property({type: Boolean}) showAlertIcon: boolean = false;
  @property({type: Boolean}) progress: boolean = false;
  @property({type: String}) progressMode: CircularProgressMode =
    CircularProgressMode.indeterminate;
  @property({type: Number}) progressValue: number = 0;
  @property({type: String}) direction: AutomationButtonDirection =
    AutomationButtonDirection.forward;
  @property({type: String}) positioning: AutomationButtonPositioning =
    AutomationButtonPositioning.point;
  /** Badge spacer should be set to true if there is a badge on the same side as the label */
  @property({type: Boolean}) hasBadgeSpacer: boolean = false;

  override render() {
    const effectiveVariant = this.progress
      ? AutomationButtonVariant.regular
      : this.variant;
    const progressRing = this.getProgressRing();
    const direction = this.getDirectionIcon(effectiveVariant);
    const resolvedTag: AutomationButtonReadoutStackTag | null = this.hasIdTag
      ? (this.tag ?? {value: 0})
      : null;
    const hasLabelContent =
      this.showReadoutStack && (this.readouts.length > 0 || this.hasIdTag);

    return this.wrapContent(html`
      <button
        class=${classMap({
          wrapper: true,
          ['positioning-' + this.positioning]: true,
          ['variant-' + effectiveVariant]: true,
          ['state-' + this.state]: true,
          'label-empty': !hasLabelContent,
          ['label-' + this.readoutPosition]: true,
          'has-badge-spacer': this.hasBadgeSpacer,
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
            ${effectiveVariant === AutomationButtonVariant.flat
              ? html` <div class="icon-silhouette">
                  <slot name="icon-silhouette"></slot>
                </div>`
              : nothing}
            ${progressRing}
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
        ${this.showReadoutStack
          ? html`
              <div class="badge-spacer"></div>
              <obc-automation-button-readout-stack
                .readouts=${this.readouts}
                .tag=${resolvedTag}
                .hasIdTag=${this.hasIdTag}
                .size=${this.readoutSize}
                .idTagOrientation=${this.getIdTagOrientation()}
              ></obc-automation-button-readout-stack>
            `
          : nothing}
        ${this.alert
          ? html` <obc-alert-frame
              class="alert-frame"
              .type=${this.alertFrameType}
              .thickness=${this.alertFrameThickness}
              .status=${this.alertFrameStatus}
              .showAlertCategoryIcon=${this.showAlertCategoryIcon}
              .showIcon=${this.showAlertIcon}
            >
              <span slot="icon"><slot name="alert-icon"></slot></span>
              <span slot="label"><slot name="alert-label"></slot></span>
              <span slot="timer"><slot name="alert-timer"></slot></span>
            </obc-alert-frame>`
          : nothing}
      </button>
    `);
  }

  private wrapContent(content: HTMLTemplateResult): HTMLTemplateResult {
    if (this.positioning === AutomationButtonPositioning.point) {
      return html`<div class="point-wrapper">${content}</div>`;
    } else if (this.positioning === AutomationButtonPositioning.symbol) {
      return html`<div
        class=${classMap({
          'symbol-wrapper': true,
          ['label-' + this.readoutPosition]: true,
        })}
      >
        ${content}
      </div> `;
    }
    return content;
  }

  static override styles = unsafeCSS(compentStyle);

  private getProgressRing(): null | HTMLTemplateResult {
    if (!this.progress) {
      return null;
    }

    return html`<obc-circular-progress
      class="progress-ring"
      .mode=${this.progressMode}
      .value=${this.progressValue}
    ></obc-circular-progress>`;
  }

  private getDirectionIcon(
    variant: AutomationButtonVariant
  ): null | HTMLTemplateResult {
    if (variant !== AutomationButtonVariant.double) {
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
