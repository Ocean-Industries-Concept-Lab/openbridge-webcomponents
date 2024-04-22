import { HTMLTemplateResult, LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./automation-button.css?inline";
import { classMap } from 'lit/directives/class-map.js';


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
  type: 'state',
  text: string,
  bold: boolean,
}

export interface AutomationButtonTagLabel {
  type: 'tag',
  text: string,
  showHash: boolean,
}

export interface AutomationButtonDirectonValueLabel {
  type: 'direction',
  value: number,
  nDigits: number,
  unit: 'percent',
}

export enum AutomationButtonLabelPosition {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

export type AutomationButtonLabel = AutomationButtonStateLabel | AutomationButtonTagLabel | AutomationButtonDirectonValueLabel;

function renderLabel(label: AutomationButtonLabel): HTMLTemplateResult {
  if (label.type === 'state') {
      return html`<div class='state ${label.bold ? 'bold' : ''}'>${label.text}</div>`;
  } else if (label.type === 'tag') {
      return html`<div class="tag">${label.text}</div>`;
  } else {  
      const v = label.value.toFixed(0);
      const zeroPadding = v.length < label.nDigits ? '0'.repeat(label.nDigits - v.length) : '';
      return html`
        <div class="direction">
          <span class="zeros">${zeroPadding}</span>
          <span class="value">${v}</span>
          <span class="unit">${label.unit}</span>
        </div>`;
  }
}

@customElement('obc-automation-button')
export class ObcAutomationButton extends LitElement {
  @property({ type: String }) size: AutomationButtonSize = AutomationButtonSize.regular;
  @property({ type: String }) variant: AutomationButtonVariant = AutomationButtonVariant.regular;
  @property({ type: String }) state: AutomationButtonState = AutomationButtonState.open;
  @property({ type: Array, attribute: false }) labels: AutomationButtonLabel[] = [];
  @property({ type: String }) labelPosition: AutomationButtonLabelPosition = AutomationButtonLabelPosition.bottom;
  @property({ type: String }) labelSize: AutomationButtonLabelSize = AutomationButtonLabelSize.regular;
  @property({ type: Boolean}) alert: boolean = false;

  override render() {
    const labels = this.labels.map(renderLabel);

    return html`
      <button class=${classMap({
      wrapper: true,
      ["size-" + this.size]: true,
      ["variant" + this.variant]: true,
      ["state-" + this.state]: true,
      ["label-" + this.labelPosition]: true,
      ["label-size-" + this.labelSize]: true,
      alert: this.alert,
    })}>
        <div class="icon-holder">
          <div class="icon-primary">
            <slot name="icon"></slot>
          </div>
          ${this.alert ? html`<svg class="alert-icon" width="18" height="31" viewBox="0 0 18 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0L16 0C17.1046 0 18 0.895431 18 2V14.7889C18 15.5786 17.7662 16.3506 17.3282 17.0077L8 31V4C8 2.89543 7.10457 2 6 2H0V0Z" fill="var(--alert-alarm-color)"/>
              <path d="M12 4H14V11.5H12V4Z" fill="var(--on-alarm-active-color)"/>
              <path d="M12 13.5H14V15.5H12V13.5Z" fill="var(--on-alarm-active-color)"/>
            </svg>
        ` : ''}
        </div>
        <div class="label">
          ${labels}
        </div>
      </button>
      `
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-button': ObcAutomationButton
  }
}
