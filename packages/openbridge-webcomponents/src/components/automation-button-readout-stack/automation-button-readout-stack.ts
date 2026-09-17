import {HTMLTemplateResult, LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './automation-button-readout-stack.css?inline';
import {property} from 'lit/decorators.js';
import '../../icons/icon-arrow-up-google.js';
import '../../icons/icon-arrow-down-google.js';
import '../../icons/icon-arrow-left-google.js';
import '../../icons/icon-arrow-right-google.js';
import '../../icons/icon-chevron-double-up-google.js';
import '../../icons/icon-chevron-double-down-google.js';
import '../../icons/icon-chevron-double-left-google.js';
import '../../icons/icon-chevron-double-right-google.js';
import '../../icons/icon-off.js';
import '../../icons/icon-on.js';
import '../../icons/icon-temperature-air.js';
import '../button/button.js';
import '../../building-blocks/readout-block/readout-block.js';
import {ReadoutBlockSize} from '../../building-blocks/readout-block/readout-block.js';
import {ObcTextboxSize} from '../../components/textbox/textbox.js';
import {SETPOINT_PATH_FILLED} from '../../svghelpers/setpoint.js';

export enum AutomationButtonReadoutStackSize {
  small = 'small',
  regular = 'regular',
  enhanced = 'enhanced',
}

export enum IdTagOrientation {
  top = 'top',
  bottom = 'bottom',
}

// The stack's three tiers map onto the readout block's: `small` is the block's
// small tier at xs number typography, `regular` the small tier at its default
// s, `enhanced` the large tier. The block's cap-height boxes (16 / 20 / 32)
// match the tiers' former line-heights.
const blockSizeBySize: Record<
  AutomationButtonReadoutStackSize,
  ReadoutBlockSize
> = {
  [AutomationButtonReadoutStackSize.small]: ReadoutBlockSize.small,
  [AutomationButtonReadoutStackSize.regular]: ReadoutBlockSize.small,
  [AutomationButtonReadoutStackSize.enhanced]: ReadoutBlockSize.large,
};

const valueSizeBySize: Record<
  AutomationButtonReadoutStackSize,
  ObcTextboxSize
> = {
  [AutomationButtonReadoutStackSize.small]: ObcTextboxSize.xs,
  [AutomationButtonReadoutStackSize.regular]: ObcTextboxSize.s,
  [AutomationButtonReadoutStackSize.enhanced]: ObcTextboxSize.l,
};

export interface AutomationButtonReadoutStackValue {
  type: 'value';
  value: number;
  nDigits: number;
  unit: string;
  direction: 'up' | 'down' | 'left' | 'right' | 'none';
  icon: 'none' | 'arrow' | 'chevron' | 'slot';
  /**
   * Host slot the row's icon is projected from when `icon` is `'slot'` —
   * consumers place any icon element with this slot name in the stack's
   * light DOM (e.g. a device-specific `<obi-*>` icon).
   */
  slotName?: string;
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

export interface AutomationButtonReadoutStackSetpoint {
  type: 'setpoint';
  value: number;
  nDigits: number;
  unit?: string;
}

export type AutomationButtonReadoutStack =
  | AutomationButtonReadoutStackValue
  | AutomationButtonReadoutStackStateOn
  | AutomationButtonReadoutStackStateOff
  | AutomationButtonReadoutStackButton
  | AutomationButtonReadoutStackSetpoint;

/**
 * A value row with `icon: 'slot'` projects its icon from the host slot named
 * by its `slotName` — a dynamic slot name, so it carries no `@slot` tag (the
 * wrapper generator needs literal names).
 *
 * @property readouts - Rows rendered top-to-bottom: `value` (padded digits, unit,
 *   optional direction icon), `state-on`/`state-off`, `button`, and `setpoint`
 *   (shared setpoint glyph + padded digits).
 * @property tag - Identifier line (e.g. '#0001'); `null` hides it.
 * @property size - Typography tier of the rows (small / regular / enhanced).
 * @property idTagOrientation - Whether the tag renders above or below the rows.
 * @experimental
 */
@customElement('obc-automation-button-readout-stack')
export class ObcAutomationButtonReadoutStack extends LitElement {
  @property({type: Array, attribute: false})
  readouts: AutomationButtonReadoutStack[] = [];
  @property({type: String}) tag: string | null = null;
  @property() size: AutomationButtonReadoutStackSize =
    AutomationButtonReadoutStackSize.regular;
  @property() idTagOrientation: IdTagOrientation = IdTagOrientation.top;

  renderTag(): typeof nothing | HTMLTemplateResult {
    if (this.tag === null) return nothing;

    return html`<div class="tag">${this.tag}</div>`;
  }

  private renderValueContainer(
    type: string,
    icon: HTMLTemplateResult | typeof nothing,
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

  /**
   * A numeric segment on `obc-readout-block` — the block owns the formatting:
   * hinted zeros fill the integer part to `maxDigits`, the sign is prepended
   * without consuming a zero (`-005`), and an unavailable value renders the
   * family's dash placeholder.
   */
  private renderNumber(
    value: number,
    format: {maxDigits?: number; fractionDigits?: number; hintedZeros?: boolean}
  ): HTMLTemplateResult {
    return html`<obc-readout-block
      class="number"
      .value=${value}
      .size=${blockSizeBySize[this.size]}
      .valueSize=${valueSizeBySize[this.size]}
      .maxDigits=${format.maxDigits ?? 0}
      .fractionDigits=${format.fractionDigits ?? 0}
      .hintedZeros=${format.hintedZeros ?? false}
    ></obc-readout-block>`;
  }

  renderValue(readout: AutomationButtonReadoutStackValue): HTMLTemplateResult {
    let directionIcon: HTMLTemplateResult | typeof nothing = nothing;
    if (readout.icon == 'arrow') {
      if (readout.direction == 'up') {
        directionIcon = html`<obi-arrow-up-google
          class="icon"
          useCssColor
        ></obi-arrow-up-google>`;
      } else if (readout.direction == 'down') {
        directionIcon = html`<obi-arrow-down-google
          class="icon"
          useCssColor
        ></obi-arrow-down-google>`;
      } else if (readout.direction == 'left') {
        directionIcon = html`<obi-arrow-left-google
          class="icon"
          useCssColor
        ></obi-arrow-left-google>`;
      } else if (readout.direction == 'right') {
        directionIcon = html`<obi-arrow-right-google
          class="icon"
          useCssColor
        ></obi-arrow-right-google>`;
      }
    } else if (readout.icon == 'chevron') {
      if (readout.direction == 'up') {
        directionIcon = html`<obi-chevron-double-up-google
          class="icon"
          useCssColor
        ></obi-chevron-double-up-google>`;
      } else if (readout.direction == 'down') {
        directionIcon = html`<obi-chevron-double-down-google
          class="icon"
          useCssColor
        ></obi-chevron-double-down-google>`;
      } else if (readout.direction == 'left') {
        directionIcon = html`<obi-chevron-double-left-google
          class="icon"
          useCssColor
        ></obi-chevron-double-left-google>`;
      } else if (readout.direction == 'right') {
        directionIcon = html`<obi-chevron-double-right-google
          class="icon"
          useCssColor
        ></obi-chevron-double-right-google>`;
      }
    } else if (readout.icon == 'slot' && readout.slotName) {
      directionIcon = html`<slot class="icon" name=${readout.slotName}></slot>`;
    }
    const content = html`
      ${this.renderNumber(readout.value, {
        maxDigits: readout.nDigits,
        hintedZeros: true,
      })}
      <span class="unit">${readout.unit}</span>
    `;

    return this.renderValueContainer('value', directionIcon, content);
  }

  renderSetpoint(
    readout: AutomationButtonReadoutStackSetpoint
  ): HTMLTemplateResult {
    const glyph = html`<svg
      class="setpoint-glyph"
      viewBox="2.5 -2.5 21 26"
      aria-hidden="true"
    >
      <path d=${SETPOINT_PATH_FILLED} transform="rotate(-90 13 10.5)" />
    </svg>`;
    const content = html`
      ${this.renderNumber(readout.value, {
        maxDigits: readout.nDigits,
        hintedZeros: true,
      })}
      ${readout.unit
        ? html`<span class="unit">${readout.unit}</span>`
        : nothing}
    `;
    return this.renderValueContainer('setpoint', glyph, content);
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
    let temperatureIcon: HTMLTemplateResult = html``;
    if (readout.hasIcon) {
      temperatureIcon = html`<obi-temperature-air
        class="icon"
        useCssColor
      ></obi-temperature-air>`;
    }

    const content = html`
      ${this.renderNumber(readout.value, {fractionDigits: 1})}
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
    } else if (readout.type === 'setpoint') {
      return this.renderSetpoint(readout);
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
        readout.type === 'button' ||
        readout.type === 'setpoint'
    );

    const renderedReadouts = displayableReadouts.map((r) =>
      this.renderReadout(r)
    );
    const tag = this.renderTag();
    const elements: unknown[] = [];

    if (this.idTagOrientation === IdTagOrientation.top) {
      elements.push(tag);
      elements.push(...renderedReadouts);
    } else {
      elements.push(...renderedReadouts);
      elements.push(tag);
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
