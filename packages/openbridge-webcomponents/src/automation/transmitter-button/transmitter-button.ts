import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './transmitter-button.css?inline';
import {customElement} from '../../decorator.js';
import {
  formatNumericValue,
  getHintZeros,
  type ReadoutNumericFormatOptions,
} from '../../navigation-instruments/readout/readout-formatters.js';
import {
  ReadoutBlockVariant,
  ReadoutBlockSize,
} from '../../building-blocks/readout-block/readout-block.js';
import '../../building-blocks/readout-block/readout-block.js';

export enum TransmitterButtonVariant {
  value = 'value',
  tag = 'tag',
}

export enum TransmitterButtonSize {
  regular = 'regular',
  medium = 'medium',
  large = 'large',
}

// ReadoutBlockSize.small is the block's 16px tier — it reads the `regular`
// design token, so it is the counterpart of this component's `regular`.
const readoutSizeBySize: Record<TransmitterButtonSize, ReadoutBlockSize> = {
  [TransmitterButtonSize.regular]: ReadoutBlockSize.small,
  [TransmitterButtonSize.medium]: ReadoutBlockSize.medium,
  [TransmitterButtonSize.large]: ReadoutBlockSize.large,
};

/**
 * `<obc-transmitter-button>` – The pressable readout chip used as the core of a
 * transmitter on a process diagram.
 *
 * The value content (leading icon, optional advice and setpoint segments,
 * value, unit) is laid out inline. Numeric formatting follows the readout
 * convention via the shared `readout-formatters` helpers, so it supports
 * fixed-width values and muted leading zeros. The leading icon is slotted so the
 * consumer provides the type-specific content; the advice and setpoint segments
 * are `<obc-readout-block>` instances and share the value's numeric formatting.
 *
 * ### Features / Variants
 * - **`value`** – white, bordered box showing an icon, value and unit. Opt into a
 *   leading advice segment with `hasAdvice`/`adviceValue` and a setpoint segment
 *   with `hasSetPoint`/`setpointValue`.
 * - **`tag`** – a static rounded pill showing a short identifier (e.g. `TT`)
 *   from the `label` property, with no live value.
 * - **`size`** – `regular`, `medium` or `large`, scaling the value text, the icon
 *   glyph and the advice/setpoint segments. The unit stays at a fixed size across
 *   all sizes.
 * - **Formatting** – `fractionDigits` sets the decimal precision, `minValueLength`
 *   reserves a minimum total digit count, and `hasHintedZeros` renders the
 *   reserved leading positions as muted zeros (e.g. `0012.3`). `showZeroPadding`
 *   pads the dashed fallback shown when no value is set. The advice and setpoint
 *   segments reuse `fractionDigits`, `minValueLength` and `hasHintedZeros`.
 *
 * ### Usage Guidelines
 * Use as a building block for `<obc-transmitter>`; it is the part that carries
 * the measured value or the tag identifier. Slot in the type-specific icon; the
 * advice and setpoint segments are value-driven and read-only.
 *
 * ### Slots
 * | Slot Name | Conditions                    | Purpose                        |
 * |-----------|-------------------------------|--------------------------------|
 * | icon      | `value` variant and `hasIcon` | Leading icon beside the value. |
 */
@customElement('obc-transmitter-button')
export class ObcTransmitterButton extends LitElement {
  @property({type: String}) variant: TransmitterButtonVariant =
    TransmitterButtonVariant.value;
  @property({type: String}) size: TransmitterButtonSize =
    TransmitterButtonSize.regular;
  @property({type: Number}) value?: number;
  @property({type: String}) unit = '';
  @property({type: Number}) fractionDigits = 1;
  @property({type: Number}) minValueLength = 0;
  @property({type: Boolean}) hasHintedZeros = false;
  @property({type: Boolean}) showZeroPadding = false;
  @property({type: Boolean}) hasIcon = false;
  @property({type: Boolean}) hasAdvice = false;

  /** Advisory value shown in the leading advice segment when `hasAdvice`. */
  @property({type: Number}) adviceValue?: number;

  @property({type: Boolean}) hasSetPoint = false;

  /** Target value shown in the setpoint segment when `hasSetPoint`. */
  @property({type: Number}) setpointValue?: number;

  /** Short tag identifier shown in the `tag` variant (e.g. `TT`). */
  @property({type: String}) label = '';

  private get isTag() {
    return this.variant === TransmitterButtonVariant.tag;
  }

  private get numericFormatOptions(): ReadoutNumericFormatOptions {
    return {
      showZeroPadding: this.showZeroPadding,
      minValueLength: this.minValueLength,
      fractionDigits: this.fractionDigits,
    };
  }

  private get normalizedValue(): number | undefined {
    if (this.value === undefined || Number.isNaN(this.value)) {
      return undefined;
    }
    return this.value;
  }

  private renderValue() {
    const hintedText = getHintZeros(
      this.normalizedValue,
      this.numericFormatOptions
    );
    const valueText = formatNumericValue(
      this.normalizedValue,
      this.numericFormatOptions
    );

    return html`<span class="value"
      >${hintedText
        ? html`<span
            class=${classMap({
              'hinted-zero': true,
              'is-hidden': !this.hasHintedZeros,
            })}
            aria-hidden="true"
            >${hintedText}</span
          >`
        : nothing}<span class="value-text">${valueText}</span></span
    >`;
  }

  private renderAdvice() {
    if (!this.hasAdvice) {
      return nothing;
    }
    return html`
      <obc-readout-block
        class="advice"
        .variant=${ReadoutBlockVariant.advice}
        .size=${readoutSizeBySize[this.size]}
        .value=${this.adviceValue ?? null}
        .fractionDigits=${this.fractionDigits}
        .maxDigits=${this.minValueLength}
        .hintedZeros=${this.hasHintedZeros}
      ></obc-readout-block>
    `;
  }

  private renderSetpoint() {
    if (!this.hasSetPoint) {
      return nothing;
    }
    return html`
      <obc-readout-block
        class="setpoint"
        .variant=${ReadoutBlockVariant.setpoint}
        .size=${readoutSizeBySize[this.size]}
        .value=${this.setpointValue ?? null}
        .fractionDigits=${this.fractionDigits}
        .maxDigits=${this.minValueLength}
        .hintedZeros=${this.hasHintedZeros}
      ></obc-readout-block>
    `;
  }

  private renderContent() {
    if (this.isTag) {
      return html`<span class="label">${this.label}</span>`;
    }

    return html`
      ${this.renderAdvice()} ${this.renderSetpoint()}
      <div class="value-container">
        ${this.hasIcon
          ? html`<div class="icon"><slot name="icon"></slot></div>`
          : nothing}
        ${this.renderValue()}
        ${this.unit ? html`<span class="unit">${this.unit}</span>` : nothing}
      </div>
    `;
  }

  override render() {
    return html`
      <button class="button ${this.variant} size-${this.size}">
        <div
          part="button"
          class=${classMap({
            'visible-wrapper': true,
            tag: this.isTag,
          })}
        >
          ${this.renderContent()}
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-transmitter-button': ObcTransmitterButton;
  }
}
