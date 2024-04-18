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
      return html`<div class=${label.bold ? 'bold' : ''}>${label.text}</div>`;
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
    })}>
        <div class="icon-holder">
          <div class="icon-primary">
            <slot name="icon"></slot>
          </div>
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
