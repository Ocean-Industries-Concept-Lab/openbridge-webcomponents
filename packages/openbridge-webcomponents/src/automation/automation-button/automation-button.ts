import {HTMLTemplateResult, LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './automation-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';

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
  @property({type: Boolean, attribute: 'has-badge-top-right'})
  hasBadgeTopRight: boolean = false;
  @property({type: Boolean, attribute: 'has-badge-top-left'})
  hasBadgeTopLeft: boolean = false;
  @property({type: Boolean, attribute: 'has-badge-bottom-left'})
  hasBadgeBottomLeft: boolean = false;
  @property({type: Boolean, attribute: 'has-badge-bottom-right'})
  hasBadgeBottomRight: boolean = false;

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
        stroke="#325B9A"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg> `;

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
          <div class="icon-primary">
            <slot name="icon"></slot>
            ${this.progress ? progressSpinner : ''}
          </div>
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
          ${this.hasBadgeTopRight
            ? html`<div class="badge-top-right">
                <slot name="badge-top-right"></slot>
              </div>`
            : ''}
          ${this.hasBadgeTopLeft
            ? html`<div class="badge-top-left">
                <slot name="badge-top-left"></slot>
              </div>`
            : ''}
          ${this.hasBadgeBottomLeft
            ? html`<div class="badge-bottom-left">
                <slot name="badge-bottom-left"></slot>
              </div>`
            : ''}
          ${this.hasBadgeBottomRight
            ? html`<div class="badge-bottom-right">
                <slot name="badge-bottom-right"></slot>
              </div>`
            : ''}
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
