import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './transmitter-button.css?inline';
import {customElement} from '../../decorator.js';
import '../../navigation-instruments/readout-list-item/readout-list-item.js';
import {ReadoutListItemSize} from '../../navigation-instruments/readout-list-item/readout-list-item.js';

export enum TransmitterButtonVariant {
  value = 'value',
  tag = 'tag',
}

export enum TransmitterButtonSize {
  regular = 'regular',
  medium = 'medium',
  large = 'large',
}

const readoutSizeBySize: Record<TransmitterButtonSize, ReadoutListItemSize> = {
  [TransmitterButtonSize.regular]: ReadoutListItemSize.small,
  [TransmitterButtonSize.medium]: ReadoutListItemSize.medium,
  [TransmitterButtonSize.large]: ReadoutListItemSize.large,
};

/**
 * `<obc-transmitter-button>` – The pressable readout chip at the core of a
 * transmitter: a bordered button around one reading.
 *
 * The reading is a label-less `<obc-readout-list-item>` (the Figma "automation
 * value"): leading icon, optional advice and setpoint, value, optional degree
 * and unit, all rendered by the readout family. The leading icon is slotted so
 * the consumer provides the type-specific content.
 *
 * ### Features / Variants
 * - **`value`** – bordered chip showing an icon, value and unit. Opt into a
 *   leading advice segment with `hasAdvice`/`adviceValue`, a setpoint segment
 *   with `hasSetPoint`/`setpointValue`, and a degree column before the unit
 *   with `hasDegree`.
 * - **`tag`** – a static rounded pill showing a short identifier (e.g. `TT`)
 *   from the `label` property, with no live value.
 * - **`size`** – `regular`, `medium` or `large`, the list item's `small`,
 *   `medium` and `large` tiers: the value text, the icon and the advice/setpoint
 *   segments scale, the unit stays extra small.
 * - **Formatting** – `fractionDigits` sets the decimal precision, `maxDigits`
 *   reserves a number of integer digits, and `hintedZeros` renders the reserved
 *   leading positions as muted zeros (e.g. `0012.3`). The sign never consumes
 *   a reserved position (`-0012.3`), so a negative value is one character
 *   wider than a positive one; `hasSignSpacer` reserves the sign column so
 *   the width does not change across zero. All three segments share this
 *   formatting — it is `obc-readout-block`'s.
 * - **Missing values** – `value`, `adviceValue` and `setpointValue` each render
 *   dashes when they are `NaN`, `null` or `undefined`; with `hintedZeros` the
 *   dashes fill the whole reserved width (e.g. `---.-`).
 *
 * ### Usage Guidelines
 * Use as a building block for `<obc-transmitter>` and `<obc-transmitter-stack>`;
 * it is the part that carries the measured value or the tag identifier. Slot in
 * the type-specific icon; the advice and setpoint segments are value-driven and
 * read-only.
 *
 * **TODO(designer):** the hit area is the visible chip, 24 px high at `regular`:
 * at the WCAG 2.5.8 floor of 24 px, below the 48 px touch-target token. A
 * 48 px target would overlap the id tag, the leader line and neighbouring
 * `<obc-transmitter-stack>` segments, so the size needs a design decision.
 *
 * ### Slots
 * | Slot Name | Conditions                    | Purpose                        |
 * |-----------|-------------------------------|--------------------------------|
 * | icon      | `value` variant and `hasIcon` | Leading icon beside the value. |
 *
 * @property maxDigits - Integer digits to reserve / hint (independent of `fractionDigits`).
 * @property hasSignSpacer - Reserve a minus-sign column on every segment, filled by the real sign
 *   only while a value is negative, so the width does not change across zero.
 * @property hasDegree - Show a degree column between the value and the unit (e.g. `12.3°` then `C`).
 * @property adviceValue - Advisory value shown in the leading advice segment when `hasAdvice`.
 * @property setpointValue - Target value shown in the setpoint segment when `hasSetPoint`.
 * @property label - Short tag identifier shown in the `tag` variant (e.g. `TT`).
 * @property idTag - Identifier appended to the button's accessible name only (e.g. `#0001`); the
 *   parent transmitter draws the visible tag outside the button, where it cannot join the name.
 * @slot icon - Leading icon beside the value.
 *
 * @experimental
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

  @property({type: Number}) maxDigits = 0;

  @property({type: Boolean}) hintedZeros = false;
  @property({type: Boolean}) hasSignSpacer = false;
  @property({type: Boolean}) hasDegree = false;
  @property({type: Boolean}) hasIcon = false;
  @property({type: Boolean}) hasAdvice = false;

  @property({type: Number}) adviceValue?: number | null;

  @property({type: Boolean}) hasSetPoint = false;

  @property({type: Number}) setpointValue?: number | null;

  @property({type: String}) label = '';

  @property({type: String}) idTag = '';

  private get isTag() {
    return this.variant === TransmitterButtonVariant.tag;
  }

  private renderReading() {
    const format = {
      hintedZeros: this.hintedZeros,
      hasSignSpacer: this.hasSignSpacer,
    };
    return html`
      <obc-readout-list-item
        .size=${readoutSizeBySize[this.size]}
        .value=${this.value ?? null}
        .unit=${this.unit}
        .hasDegree=${this.hasDegree}
        .fractionDigits=${this.fractionDigits}
        .maxDigits=${this.maxDigits}
        .valueOptions=${{...format, hasIcon: this.hasIcon}}
        .hasSetpoint=${this.hasSetPoint}
        .setpoint=${this.setpointValue ?? undefined}
        .setpointOptions=${format}
        .hasAdvice=${this.hasAdvice}
        .advice=${this.adviceValue ?? undefined}
        .adviceOptions=${format}
      >
        ${this.hasIcon
          ? html`<slot name="icon" slot="value-icon"></slot>`
          : nothing}
      </obc-readout-list-item>
    `;
  }

  override render() {
    return html`
      <button type="button" class="button ${this.variant} size-${this.size}">
        <div
          part="button"
          class=${classMap({
            'visible-wrapper': true,
            tag: this.isTag,
          })}
        >
          ${this.isTag
            ? html`<span class="label">${this.label}</span>`
            : this.renderReading()}
        </div>
        ${this.idTag
          ? html`<span class="visually-hidden">${this.idTag}</span>`
          : nothing}
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
