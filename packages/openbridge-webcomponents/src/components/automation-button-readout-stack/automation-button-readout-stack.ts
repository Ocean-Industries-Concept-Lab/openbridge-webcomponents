import {HTMLTemplateResult, LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './automation-button-readout-stack.css?inline';
import {property} from 'lit/decorators.js';

export enum AutomationButtonReadoutStackSize {
  small = 'small',
  regular = 'regular',
  enhanced = 'enhanced',
}

export interface AutomationButtonStateReadoutStack {
  type: 'state';
  text: string;
  bold: boolean;
}

export interface AutomationButtonTagReadoutStack {
  type: 'tag';
  text: string;
  showHash: boolean;
}

export interface AutomationButtonDirectonValueReadoutStack {
  type: 'direction';
  value: number;
  nDigits: number;
  unit: 'percent';
  direction: 'up' | 'down' | 'left' | 'right';
}

export type AutomationButtonReadoutStack =
  | AutomationButtonStateReadoutStack
  | AutomationButtonTagReadoutStack
  | AutomationButtonDirectonValueReadoutStack;

@customElement('obc-automation-button-readout-stack')
export class ObcAutomationButtonReadoutStack extends LitElement {
  @property() readouts: AutomationButtonReadoutStack[] = [];
  @property() size: AutomationButtonReadoutStackSize =
    AutomationButtonReadoutStackSize.regular;

  renderLabel(label: AutomationButtonReadoutStack): HTMLTemplateResult {
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

  override render() {
    const readouts = this.readouts.map(this.renderLabel);
    return html` <div class="readout-stack ${this.size}">${readouts}</div> `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-button-readout-stack': ObcAutomationButtonReadoutStack;
  }
}
