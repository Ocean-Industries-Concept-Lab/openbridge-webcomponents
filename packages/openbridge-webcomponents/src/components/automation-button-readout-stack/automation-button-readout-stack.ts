import {HTMLTemplateResult, LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './automation-button-readout-stack.css?inline';
import {property} from 'lit/decorators.js';
import '../../icons/icon-arrow-up-google.js';
import '../../icons/icon-arrow-down-google.js';
import '../../icons/icon-arrow-left-google.js';
import '../../icons/icon-arrow-right-google.js';
import '../../icons/icon-off.js';
import '../../icons/icon-on.js';
import '../../icons/icon-temperature-air.js';
import '../button/button.js';

export enum AutomationButtonReadoutStackSize {
  small = 'small',
  regular = 'regular',
  enhanced = 'enhanced',
}

export enum IdTagOrientation {
  top = 'top',
  bottom = 'bottom',
}

export interface AutomationButtonReadoutStackValue {
  type: 'value';
  value: number;
  nDigits: number;
  unit: string;
  direction: 'up' | 'down' | 'left' | 'right';
  hasIcon: boolean;
}

export interface AutomationButtonReadoutStackStateOn {
  type: 'state-on';
  value: string;
  hasIcon: boolean;
}

export interface AutomationButtonReadoutStackStateOff {
  type: 'state-off';
  value: string;
  hasIcon: boolean;
}

export interface AutomationButtonReadoutStackButton {
  type: 'button';
  value: number;
  hasIcon: boolean;
  unit: string;
}

export type AutomationButtonReadoutStack =
  | AutomationButtonReadoutStackValue
  | AutomationButtonReadoutStackStateOn
  | AutomationButtonReadoutStackStateOff
  | AutomationButtonReadoutStackButton;

export interface AutomationButtonReadoutStackTag {
  value: number;
}

@customElement('obc-automation-button-readout-stack')
export class ObcAutomationButtonReadoutStack extends LitElement {
  @property() readouts: AutomationButtonReadoutStack[] = [];
  @property() tag: AutomationButtonReadoutStackTag | null = null;
  @property() size: AutomationButtonReadoutStackSize =
    AutomationButtonReadoutStackSize.regular;
  @property() idTagOrientation: IdTagOrientation = IdTagOrientation.top;
  @property({type: Boolean}) hasIdTag: boolean = true;
  @property({type: Boolean}) hasValue1: boolean = true;
  @property({type: Boolean}) hasValue2: boolean = true;

  renderTag(): HTMLTemplateResult {
    if (!this.hasIdTag || !this.tag) return html``;
    
    const paddedValue = this.tag.value.toString().padStart(4, '0');
    return html`<div class="tag">
      #${paddedValue}
    </div>`;
  }

  renderValue(readout: AutomationButtonReadoutStackValue): HTMLTemplateResult {
    const v = readout.value.toFixed(0);
    const zeroPadding =
      v.length < readout.nDigits ? '0'.repeat(readout.nDigits - v.length) : '';

    let directionIcon: HTMLTemplateResult = html``;
    if (readout.hasIcon) {
      if (readout.direction === 'up') {
        directionIcon = html`<obi-arrow-up-google
          class="direction-icon"
          useCssColor
        ></obi-arrow-up-google>`;
      } else if (readout.direction === 'down') {
        directionIcon = html`<obi-arrow-down-google
          class="direction-icon"
          useCssColor
        ></obi-arrow-down-google>`;
      } else if (readout.direction === 'left') {
        directionIcon = html`<obi-arrow-left-google
          class="direction-icon"
          useCssColor
        ></obi-arrow-left-google>`;
      } else if (readout.direction === 'right') {
        directionIcon = html`<obi-arrow-right-google
          class="direction-icon"
          useCssColor
        ></obi-arrow-right-google>`;
      } else {
        throw new Error('Invalid direction');
      }
    }
    
    return html`<div class="direction">
      ${directionIcon}
      <span class="zeros">${zeroPadding}</span>
      <span class="value">${v}</span>
      <span class="unit">${readout.unit}</span>
    </div>`;
  }

  renderStateOff(readout: AutomationButtonReadoutStackStateOff): HTMLTemplateResult {
    let offIcon: HTMLTemplateResult = html``;
    if (readout.hasIcon) {
      offIcon = html`<obi-off
        class="direction-icon"
        useCssColor
      ></obi-off>`;
    }
    
    return html`<div class="direction">
      ${offIcon}
      <span class="value">${readout.value}</span>
    </div>`;
  }

  renderStateOn(readout: AutomationButtonReadoutStackStateOn): HTMLTemplateResult {
    let onIcon: HTMLTemplateResult = html``;
    if (readout.hasIcon) {
      onIcon = html`<obi-on
        class="direction-icon"
        useCssColor
      ></obi-on>`;
    }
    
    return html`<div class="direction">
      ${onIcon}
      <span class="value">${readout.value}</span>
    </div>`;
  }

  renderButton(readout: AutomationButtonReadoutStackButton): HTMLTemplateResult {
    const v = readout.value.toFixed(1); // Format as 000.0
    
    let temperatureIcon: HTMLTemplateResult = html``;
    if (readout.hasIcon) {
      temperatureIcon = html`<obi-temperature-air
        class="direction-icon"
        useCssColor
      ></obi-temperature-air>`;
    }
    
    return html`<obc-button>
      <div class="direction">
        ${temperatureIcon}
        <span class="value">${v}</span>
        <span class="unit">${readout.unit}</span>
      </div>
    </obc-button>`;
  }

  renderReadout(readout: AutomationButtonReadoutStack): HTMLTemplateResult {
    if (readout.type === 'value') {
      return this.renderValue(readout);
    } else if (readout.type === 'state-on') {
      return this.renderStateOn(readout);
    } else if (readout.type === 'state-off') {
      return this.renderStateOff(readout);
    } else if (readout.type === 'button') {
      return this.renderButton(readout);
    } else {
      throw new Error('Invalid readout type');
    }
  }

  override render() {
    const displayableReadouts = this.readouts.filter(readout => 
      readout.type === 'value' || readout.type === 'state-off' || readout.type === 'state-on' || readout.type === 'button'
    );
    
    const value1 = this.hasValue1 && displayableReadouts[0] ? this.renderReadout(displayableReadouts[0]) : html``;
    const value2 = this.hasValue2 && displayableReadouts[1] ? this.renderReadout(displayableReadouts[1]) : html``;
    const tag = this.renderTag();
    
    const elements = [];
    
    if (this.idTagOrientation === IdTagOrientation.top) {
      if (this.hasIdTag) elements.push(tag);
      if (this.hasValue1) elements.push(value1);
      if (this.hasValue2) elements.push(value2);
    } else {
      if (this.hasValue1) elements.push(value1);
      if (this.hasValue2) elements.push(value2);
      if (this.hasIdTag) elements.push(tag);
    }
    
    return html`<div class="readout-stack ${this.size}">${elements}</div>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-button-readout-stack': ObcAutomationButtonReadoutStack;
  }
}
