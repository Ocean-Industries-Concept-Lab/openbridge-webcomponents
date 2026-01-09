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
  @property({attribute: false}) readouts: AutomationButtonReadoutStack[] = [];
  @property({attribute: false}) tag: AutomationButtonReadoutStackTag | null =
    null;
  @property() size: AutomationButtonReadoutStackSize =
    AutomationButtonReadoutStackSize.regular;
  @property() idTagOrientation: IdTagOrientation = IdTagOrientation.top;
  @property({type: Boolean}) hasIdTag: boolean = false;

  renderTag(): HTMLTemplateResult {
    if (!this.hasIdTag || !this.tag) return html``;

    const paddedValue = this.tag.value.toString().padStart(4, '0');
    return html`<div class="tag">#${paddedValue}</div>`;
  }

  private renderValueContainer(
    type: string,
    icon: HTMLTemplateResult,
    content: HTMLTemplateResult
  ): HTMLTemplateResult {
    return html`<div class="readout-item ${type}">
      ${icon}
      <div class="value-container">
        <div class="label-container">${content}</div>
      </div>
    </div>`;
  }

  private renderValueText(text: string): HTMLTemplateResult {
    return html`<span class="value-text">${text}</span>`;
  }

  renderValue(readout: AutomationButtonReadoutStackValue): HTMLTemplateResult {
    const v = readout.value.toFixed(0);
    const zeroPadding =
      v.length < readout.nDigits ? '0'.repeat(readout.nDigits - v.length) : '';
    const paddedValue = zeroPadding + v;

    let directionIcon: HTMLTemplateResult = html``;
    if (readout.hasIcon) {
      const directionIcons = {
        up: () =>
          html`<obi-arrow-up-google
            class="icon"
            useCssColor
          ></obi-arrow-up-google>`,
        down: () =>
          html`<obi-arrow-down-google
            class="icon"
            useCssColor
          ></obi-arrow-down-google>`,
        left: () =>
          html`<obi-arrow-left-google
            class="icon"
            useCssColor
          ></obi-arrow-left-google>`,
        right: () =>
          html`<obi-arrow-right-google
            class="icon"
            useCssColor
          ></obi-arrow-right-google>`,
      };

      directionIcon = directionIcons[readout.direction]?.() || html``;
    }

    const content = html`
      ${this.renderValueText(paddedValue)}
      <span class="unit">${readout.unit}</span>
    `;

    return this.renderValueContainer('value', directionIcon, content);
  }

  renderStateOff(
    readout: AutomationButtonReadoutStackStateOff
  ): HTMLTemplateResult {
    let offIcon: HTMLTemplateResult = html``;
    if (readout.hasIcon) {
      offIcon = html`<obi-off class="icon" useCssColor></obi-off>`;
    }

    const content = this.renderValueText(readout.value);
    return this.renderValueContainer('state-off', offIcon, content);
  }

  renderStateOn(
    readout: AutomationButtonReadoutStackStateOn
  ): HTMLTemplateResult {
    let onIcon: HTMLTemplateResult = html``;
    if (readout.hasIcon) {
      onIcon = html`<obi-on class="icon" useCssColor></obi-on>`;
    }

    const content = this.renderValueText(readout.value);
    return this.renderValueContainer('state-on', onIcon, content);
  }

  renderButton(
    readout: AutomationButtonReadoutStackButton
  ): HTMLTemplateResult {
    const v = readout.value.toFixed(1); // Format as 000.0

    let temperatureIcon: HTMLTemplateResult = html``;
    if (readout.hasIcon) {
      temperatureIcon = html`<obi-temperature-air
        class="icon"
        useCssColor
      ></obi-temperature-air>`;
    }

    const content = html`
      ${this.renderValueText(v)}
      <span class="unit">${readout.unit}</span>
    `;

    return html`<obc-button class="readout-button" part="readout-button">
      ${this.renderValueContainer('button', temperatureIcon, content)}
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
    const displayableReadouts = this.readouts.filter(
      (readout) =>
        readout.type === 'value' ||
        readout.type === 'state-off' ||
        readout.type === 'state-on' ||
        readout.type === 'button'
    );

    const renderedReadouts = displayableReadouts.map((r) =>
      this.renderReadout(r)
    );
    const tag = this.renderTag();
    const elements: unknown[] = [];

    if (this.idTagOrientation === IdTagOrientation.top) {
      if (this.hasIdTag) elements.push(tag);
      elements.push(...renderedReadouts);
    } else {
      elements.push(...renderedReadouts);
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
