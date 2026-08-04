import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './transmitter-button.css?inline';
import {customElement} from '../../decorator.js';
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

function normalizeNumericValue(
  value: number | null | undefined
): number | undefined {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return undefined;
  }
  return value;
}

/**
 * `<obc-transmitter-button>` – The pressable readout chip used as the core of a
 * transmitter on a process diagram.
 *
 * The value content (leading icon, optional advice and setpoint segments,
 * value, unit) is laid out inline. The value, advice and setpoint segments are
 * all `<obc-readout-block>` instances sharing one numeric format, so they
 * support fixed-width values and muted leading zeros identically. The leading
 * icon is slotted so the consumer provides the type-specific content.
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
 * - **Formatting** – `fractionDigits` sets the decimal precision, `maxDigits`
 *   reserves a number of integer digits, and `hintedZeros` renders the reserved
 *   leading positions as muted zeros (e.g. `0012.3`). A negative value's minus
 *   sign takes one of the reserved positions, so it stays the same width as a
 *   positive one (`-012.3`). All three segments share this formatting.
 * - **Missing values** – `value`, `adviceValue` and `setpointValue` each render
 *   dashes when they are `NaN`, `null` or `undefined`; with `hintedZeros` the
 *   dashes fill the whole reserved width (e.g. `---.-`).
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
 *
 * @slot icon - Leading icon beside the value.
 */
@customElement('obc-transmitter-button')
export class ObcTransmitterButton extends LitElement {
  @property({type: String}) variant: TransmitterButtonVariant =
    TransmitterButtonVariant.value;
  @property({type: String}) size: TransmitterButtonSize =
    TransmitterButtonSize.regular;
  @property({type: Number}) value?: number | null;
  @property({type: String}) unit = '';
  @property({type: Number}) fractionDigits = 1;

  /** Integer digits to reserve / hint (independent of `fractionDigits`). */
  @property({type: Number}) maxDigits = 0;

  @property({type: Boolean}) hintedZeros = false;
  @property({type: Boolean}) hasIcon = false;
  @property({type: Boolean}) hasAdvice = false;

  /** Advisory value shown in the leading advice segment when `hasAdvice`. */
  @property({type: Number}) adviceValue?: number | null;

  @property({type: Boolean}) hasSetPoint = false;

  /** Target value shown in the setpoint segment when `hasSetPoint`. */
  @property({type: Number}) setpointValue?: number | null;

  /** Short tag identifier shown in the `tag` variant (e.g. `TT`). */
  @property({type: String}) label = '';

  private get isTag() {
    return this.variant === TransmitterButtonVariant.tag;
  }

  private renderBlock(
    blockClass: string,
    variant: ReadoutBlockVariant,
    value: number | null | undefined
  ) {
    return html`
      <obc-readout-block
        class=${blockClass}
        .variant=${variant}
        .size=${readoutSizeBySize[this.size]}
        .value=${normalizeNumericValue(value) ?? null}
        .fractionDigits=${this.fractionDigits}
        .maxDigits=${this.maxDigits}
        .hintedZeros=${this.hintedZeros}
      ></obc-readout-block>
    `;
  }

  private renderAdvice() {
    if (!this.hasAdvice) {
      return nothing;
    }
    return this.renderBlock(
      'advice',
      ReadoutBlockVariant.advice,
      this.adviceValue
    );
  }

  private renderSetpoint() {
    if (!this.hasSetPoint) {
      return nothing;
    }
    return this.renderBlock(
      'setpoint',
      ReadoutBlockVariant.setpoint,
      this.setpointValue
    );
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
        ${this.renderBlock('value', ReadoutBlockVariant.value, this.value)}
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
