import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './transmitter-button.css?inline';
import {customElement} from '../../decorator.js';

export enum TransmitterButtonVariant {
  value = 'value',
  tag = 'tag',
}

export enum TransmitterButtonSize {
  small = 'small',
  regular = 'regular',
  medium = 'medium',
  large = 'large',
}

/**
 * `<obc-transmitter-button>` – The pressable readout chip used as the core of a
 * transmitter on a process diagram.
 *
 * The value content (leading icon, value, unit, optional advice) is laid out
 * inline, mirroring the structure of `<obc-automation-readout>`. The leading
 * icon and the advice segment are slotted so the consumer provides the
 * type-specific content rather than it being hard-coded here.
 *
 * ### Features / Variants
 * - **`value`** – white, bordered box showing an icon, value and unit. Opt into
 *   an advice segment with `hasAdvice`.
 * - **`tag`** – a static rounded pill showing a short identifier (e.g. `TT`)
 *   from the `label` property, with no live value.
 * - **`size`** – `small`, `regular`, `medium` or `large`, scaling the value text
 *   and the icon/advice glyphs. The unit stays at a fixed size across all sizes.
 *
 * ### Usage Guidelines
 * Use as a building block for `<obc-transmitter>`; it is the part that carries
 * the measured value or the tag identifier. Slot in the type-specific icon and,
 * when needed, the advice content rather than hard-coding them.
 *
 * ### Slots
 * | Slot Name | Conditions                      | Purpose                                |
 * |-----------|---------------------------------|----------------------------------------|
 * | icon      | `value` variant and `hasIcon`   | Leading icon beside the value.         |
 * | advice    | `value` variant and `hasAdvice` | Advice segment shown before the value. |
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
  @property({type: Boolean}) hasIcon = false;
  @property({type: Boolean}) hasAdvice = false;

  /** Short tag identifier shown in the `tag` variant (e.g. `TT`). */
  @property({type: String}) label = '';

  private get isTag() {
    return this.variant === TransmitterButtonVariant.tag;
  }

  private get formattedValue() {
    if (this.value === undefined || Number.isNaN(this.value)) {
      return '--';
    }
    return this.value.toFixed(this.fractionDigits);
  }

  private renderContent() {
    if (this.isTag) {
      return html`<span class="label">${this.label}</span>`;
    }

    return html`
      ${this.hasAdvice
        ? html`<div class="advice"><slot name="advice"></slot></div>`
        : nothing}
      <div class="value-container">
        ${this.hasIcon
          ? html`<div class="icon"><slot name="icon"></slot></div>`
          : nothing}
        <span class="value">${this.formattedValue}</span>
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
