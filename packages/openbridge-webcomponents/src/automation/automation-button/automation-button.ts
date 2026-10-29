import {HTMLTemplateResult, LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './automation-button.css?inline';
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
  ObcAlertFrameThickness,
  ObcAlertFrameType,
  ObcAlertFrameMode,
  wrapWithAlertFrame,
} from '../../components/alert-frame/alert-frame.js';
import {AlertType} from '../../types.js';
import {customElement} from '../../decorator.js';
import {
  AutomationButtonReadoutStack,
  AutomationButtonReadoutStackSize,
  IdTagOrientation,
} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import '../../building-blocks/circular-progress/circular-progress.js';
import {CircularProgressMode} from '../../building-blocks/circular-progress/circular-progress.js';

export {CircularProgressMode};

export enum AutomationButtonVariant {
  regular = 'regular',
  double = 'double',
  forward = 'forward',
  square = 'square',
  flat = 'flat',
  flatForward = 'flat-forward',
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
  none = 'none',
}

/**
 * The orientation of the inner icon/symbol.
 * - `horizontal`: The icon is shown in its default horizontal orientation.
 * - `verticalRight`: The icon is rotated 90° clockwise.
 * - `verticalLeft`: The icon is rotated 90° counter-clockwise.
 */
export enum AutomationButtonOrientation {
  horizontal = 'horizontal',
  verticalRight = 'verticalRight',
  verticalLeft = 'verticalLeft',
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

export enum AutomationButtonHandlePosition {
  none = 'none',
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

export enum AutomationButtonSelfActuationLine {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
  none = 'none',
}

/**
 * @property activated - Enables the activated background color, used to indicate that the button is activated/selected.
 * @availableWhen readouts showReadoutStack==true
 * @availableWhen tag showReadoutStack==true
 * @availableWhen readoutPosition showReadoutStack==true
 * @availableWhen readoutSize showReadoutStack==true
 * @availableWhen alertFrameType alert==true
 * @availableWhen alertFrameThickness alert==true
 * @availableWhen alertFrameStatus alert==true
 * @availableWhen alertFrameMode alert==true
 * @availableWhen showAlertCategoryIcon alert==true && alertFrameType in [SmallSideFlip, LargeSideFlip, BottomFlip, TopFlip]
 * @availableWhen showAlertIcon alert==true && alertFrameType in [LargeSideFlip, BottomFlip, TopFlip]
 * @availableWhen progressMode progress==true
 * @availableWhen progressValue progress==true && progressMode in [determinate, progressive-indeterminate]
 * @availableWhen direction variant in [double, forward, flatForward]
 * @property hasBadgeSpacer - Badge spacer should be set to true if there is a badge on the same side as the label
 * @property handlePosition - Side of the symbol the handle sits on; `none` hides the handle and the self-actuation line.
 * @property selfActuationLine - Side of the symbol the self-actuation line runs to from the handle. Drawn only on a side next to the handle.
 * @availableWhen selfActuationLine handlePosition!=none
 * @slot badge-top-right - Content projected into the top-right badge position of the button.
 * @slot badge-top-left - Content projected into the top-left badge position of the button.
 * @slot badge-bottom-left - Content projected into the bottom-left badge position of the button.
 * @slot badge-bottom-right - Content projected into the bottom-right badge position of the button.
 * @slot icon - Primary icon shown inside the button (regular, double, flat and square variants).
 * @slot icon-silhouette - Silhouette/outline icon shown behind the primary icon (flat variant only).
 * @slot handle - Handle or actuator drawn for the `top` side, 24 × 24 units; it turns with `handlePosition`.
 * @slot alert-icon - Custom icon for the alert frame, shown when alert==true and positioning=="point".
 * @slot alert-label - Label for the alert frame, shown when alert==true and positioning=="point".
 * @slot alert-timer - Timer for the alert frame, shown when alert==true and positioning=="point".
 * @fires click - Fired when the button is clicked.
 * @stable
 */
@customElement('obc-automation-button')
export class ObcAutomationButton extends LitElement {
  @property({type: String}) variant: AutomationButtonVariant =
    AutomationButtonVariant.regular;
  @property({type: String}) state: AutomationButtonState =
    AutomationButtonState.open;
  @property({type: Boolean}) static: boolean = false;
  @property({type: Boolean}) activated: boolean = false;
  @property({type: Boolean, attribute: false}) showReadoutStack: boolean = true;
  @property({type: Array, attribute: false})
  readouts: AutomationButtonReadoutStack[] = [];
  @property({type: String})
  tag: string | null = null;
  @property({type: String}) readoutPosition: AutomationButtonReadoutPosition =
    AutomationButtonReadoutPosition.bottom;
  @property({type: String}) readoutSize: AutomationButtonReadoutStackSize =
    AutomationButtonReadoutStackSize.regular;
  @property({type: Boolean}) alert: boolean = false;
  @property({type: String}) alertFrameType: ObcAlertFrameType =
    ObcAlertFrameType.SmallSideFlip;
  @property({type: String}) alertFrameThickness: ObcAlertFrameThickness =
    ObcAlertFrameThickness.Small;
  @property({type: String}) alertFrameStatus: AlertType = AlertType.Alarm;
  @property({type: String}) alertFrameMode: ObcAlertFrameMode =
    ObcAlertFrameMode.ackedActive;
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
  @property({type: String}) orientation: AutomationButtonOrientation =
    AutomationButtonOrientation.horizontal;
  @property({type: Boolean}) hasBadgeSpacer: boolean = false;
  @property({type: String}) handlePosition: AutomationButtonHandlePosition =
    AutomationButtonHandlePosition.none;
  @property({type: String})
  selfActuationLine: AutomationButtonSelfActuationLine =
    AutomationButtonSelfActuationLine.none;

  override render() {
    const effectiveVariant = this.effectiveVariant;

    const hasLabelContent =
      this.showReadoutStack && (this.readouts.length > 0 || this.tag !== null);

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
          activated: this.activated,
          ['orientation-' + this.orientation]: true,
        })}
      >
        <div class="icon-touch-target">
          ${this.renderHandleFrame()} ${this.renderIconHolder()}
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
        ${
          this.showReadoutStack
            ? html`
                <div class="badge-spacer"></div>
                <obc-automation-button-readout-stack
                  .readouts=${this.readouts}
                  .tag=${this.tag}
                  .size=${this.readoutSize}
                  .idTagOrientation=${this.getIdTagOrientation()}
                ></obc-automation-button-readout-stack>
              `
            : nothing
        }
        ${
          this.alert && this.positioning === AutomationButtonPositioning.point
            ? html` <obc-alert-frame
                class="alert-frame"
                .type=${this.alertFrameType}
                .thickness=${this.alertFrameThickness}
                .status=${this.alertFrameStatus}
                .mode=${this.alertFrameMode}
                .showAlertCategoryIcon=${this.showAlertCategoryIcon}
                .showIcon=${this.showAlertIcon}
              >
                <span slot="icon"><slot name="alert-icon"></slot></span>
                <span slot="label"><slot name="alert-label"></slot></span>
                <span slot="timer"><slot name="alert-timer"></slot></span>
              </obc-alert-frame>`
            : nothing
        }
      </button>
    `);
  }

  private wrapContent(content: HTMLTemplateResult): HTMLTemplateResult {
    if (this.positioning === AutomationButtonPositioning.point) {
      return html`<div class="point-wrapper">${content}</div>`;
    }
    const innerContent = wrapWithAlertFrame(
      this.alert
        ? {
            type: this.alertFrameType,
            thickness: this.alertFrameThickness,
            status: this.alertFrameStatus,
            mode: this.alertFrameMode,
            showIcon: this.showAlertIcon,
            showAlertCategoryIcon: this.showAlertCategoryIcon,
          }
        : false,
      content
    );
    if (this.positioning === AutomationButtonPositioning.symbol) {
      return html`<div
        class=${classMap({
          'symbol-wrapper': true,
          ['label-' + this.readoutPosition]: true,
        })}
      >
        ${innerContent}
      </div> `;
    }
    return innerContent;
  }

  static override styles = unsafeCSS(componentStyle);

  private get effectiveVariant(): AutomationButtonVariant {
    if (this.progress) {
      return AutomationButtonVariant.regular;
    }
    return this.variant;
  }

  private renderIconHolder(): HTMLTemplateResult {
    const effectiveVariant = this.effectiveVariant;
    const progressRing = this.getProgressRing();
    const iconHolderClasses = classMap({
      'icon-holder': true,
      ['orientation-' + this.orientation]: true,
    });
    if (this.variant === AutomationButtonVariant.flatForward) {
      return html`<div class=${iconHolderClasses}>
        ${this.getDirectionIcon(effectiveVariant, 'icon-primary')}
        ${this.getDirectionIcon(effectiveVariant, 'icon-silhouette')}
        ${progressRing}
      </div>`;
    } else if (this.variant === AutomationButtonVariant.forward) {
      return html`<div class=${iconHolderClasses}>
        ${this.getDirectionIcon(effectiveVariant, 'icon-primary')}
        ${progressRing}
      </div>`;
    }

    const direction = this.getDirectionIcon(effectiveVariant);
    const showIcon = [
      AutomationButtonVariant.regular,
      AutomationButtonVariant.double,
      AutomationButtonVariant.flat,
      AutomationButtonVariant.square,
    ].includes(effectiveVariant);
    return html`<div class=${iconHolderClasses}>
      ${direction}
      ${
        showIcon
          ? html`<div class="icon-primary">
                <slot name="icon"></slot>
              </div>
              ${
                effectiveVariant === AutomationButtonVariant.flat
                  ? html` <div class="icon-silhouette">
                      <slot name="icon-silhouette"></slot>
                    </div>`
                  : nothing
              } `
          : nothing
      }
      ${progressRing}
    </div>`;
  }

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
    variant: AutomationButtonVariant,
    className: string = 'icon-direction'
  ): typeof nothing | HTMLTemplateResult {
    if (
      ![
        AutomationButtonVariant.double,
        AutomationButtonVariant.forward,
        AutomationButtonVariant.flatForward,
      ].includes(variant)
    ) {
      return nothing;
    } else if (this.direction === AutomationButtonDirection.forward) {
      return html`<svg
        class="${className}"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 5 v 14 L 20 12Z"
          stroke="var(--automation-symbol-on-border-color)"
          fill="var(--automation-symbol-on-background-color)"
          vector-effect="non-scaling-stroke"
        />
      </svg> `;
    } else if (this.direction === AutomationButtonDirection.forwardFast) {
      return html`<svg
        class="${className}"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 5 v 14 l 8.5 -7 Z M14.5 5 v 14 l 8.5 -7 Z"
          stroke="var(--automation-symbol-on-border-color)"
          fill="var(--automation-symbol-on-background-color)"
          vector-effect="non-scaling-stroke"
        />
      </svg> `;
    } else if (this.direction === AutomationButtonDirection.forwardStopped) {
      return html`<svg
        class="${className}"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 5 v 14 L 20 12Z"
          fill="var(--automation-symbol-on-border-color)"
          stroke="var(--automation-symbol-off-border-color)"
          vector-effect="non-scaling-stroke"
        />
      </svg> `;
    } else if (this.direction === AutomationButtonDirection.backward) {
      return html`<svg
        class="${className}"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 5 v 14 L 4 12Z"
          stroke="var(--automation-symbol-on-border-color)"
          fill="var(--automation-symbol-on-background-color)"
          vector-effect="non-scaling-stroke"
        />
      </svg>`;
    } else if (this.direction === AutomationButtonDirection.backwardFast) {
      return html`<svg
        class="${className}"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.5 5 v 14 l -8.5 -7 Z M9.5 5 v 14 l -8.5 -7 Z"
          stroke="var(--automation-symbol-on-border-color)"
          fill="var(--automation-symbol-on-background-color)"
          vector-effect="non-scaling-stroke"
        />
      </svg>`;
    } else if (this.direction === AutomationButtonDirection.backwardStopped) {
      return html`<svg
        class="${className}"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 5 v 14 L 4 12Z"
          fill="var(--automation-symbol-on-border-color)"
          stroke="var(--automation-symbol-off-border-color)"
          vector-effect="non-scaling-stroke"
        />
      </svg> `;
    } else if (this.direction === AutomationButtonDirection.standby) {
      return html`<obi-standby class="${className}" usecsscolor></obi-standby>`;
    }
    throw new Error('Invalid direction');
  }

  private getIdTagOrientation(): IdTagOrientation {
    if (this.readoutPosition === AutomationButtonReadoutPosition.top) {
      return IdTagOrientation.top;
    }
    return IdTagOrientation.bottom;
  }

  private renderHandleFrame(): typeof nothing | HTMLTemplateResult {
    if (this.handlePosition === AutomationButtonHandlePosition.none) {
      return nothing;
    }
    return html`<div class="handle-frame handle-frame-${this.handlePosition}">
      ${this.renderSelfActuationLine()}
      <div class="handle"><slot name="handle"></slot></div>
    </div>`;
  }

  /**
   * The line is drawn for a handle on top running to the right, and the
   * frame turns it with the handle; a line ending on the side counter-clockwise
   * of the handle is the mirror image.
   */
  private renderSelfActuationLine(): typeof nothing | HTMLTemplateResult {
    const sides = ['top', 'right', 'bottom', 'left'];
    const handle = sides.indexOf(this.handlePosition);
    const line = sides.indexOf(this.selfActuationLine);
    if (line === -1) {
      return nothing;
    }
    const step = (line - handle + 4) % 4;
    if (step !== 1 && step !== 3) {
      return nothing;
    }
    const className = classMap({
      'self-actuation-line': true,
      mirrored: step === 3,
    });
    if (this.variant === AutomationButtonVariant.flat) {
      return html`<svg
        class=${className}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 16.5C19 17.8807 17.8807 19 16.5 19C15.1193 19 14 17.8807 14 16.5C14 15.1193 15.1193 14 16.5 14C17.8807 14 19 15.1193 19 16.5Z"
          fill="var(--element-active-color)"
          stroke="var(--border-silhouette-color)"
        />
        <path
          d="M4.5 0.5H6.5M7.5 0.5H9.5M10.5 0.5H12.5M13.5 0.5H14.5C14.8644 0.5 15.206 0.59743 15.5002 0.767657M16.2323 1.49984C16.4026 1.79405 16.5 2.13565 16.5 2.5V3.43333M16.5 4.36667V6.23333M16.5 7.16667V9.03333M16.5 9.96667V11.8333M16.5 12.7667V14.6333"
          stroke="var(--element-active-color)"
        />
      </svg>`;
    }
    return html`<svg
      class=${className}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35 32.5C35 33.8807 33.8807 35 32.5 35C31.1193 35 30 33.8807 30 32.5C30 31.1193 31.1193 30 32.5 30C33.8807 30 35 31.1193 35 32.5Z"
        fill="var(--element-active-color)"
        stroke="var(--border-silhouette-color)"
      />
      <path
        d="M1.49984 0.767657C1.79405 0.59743 2.13565 0.5 2.5 0.5H3.53704M4.57407 0.5H6.64815M7.68519 0.5H9.75926M10.7963 0.5H12.8704M13.9074 0.5H15.9815M17.0185 0.5H19.0926M20.1296 0.5H22.2037M23.2407 0.5H25.3148M26.3519 0.5H28.4259M29.463 0.5H30.5C30.8644 0.5 31.206 0.597429 31.5002 0.767657M32.2323 1.49984C32.4026 1.79405 32.5 2.13565 32.5 2.5V3.5M32.5 4.5V6.5M32.5 7.5V9.5M32.5 10.5V12.5M32.5 13.5V15.5M32.5 16.5V18.5M32.5 19.5V21.5M32.5 22.5V24.5M32.5 25.5V27.5M32.5 28.5V30.5"
        stroke="var(--element-active-color)"
      />
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-button': ObcAutomationButton;
  }
}
