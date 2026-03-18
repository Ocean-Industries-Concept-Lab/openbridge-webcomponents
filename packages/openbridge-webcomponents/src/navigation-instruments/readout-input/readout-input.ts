import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './readout-input.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-input-right.js';

export enum ReadoutInputSize {
  small = 'small',
  regular = 'regular',
  medium = 'medium',
  large = 'large',
}

export enum ReadoutInputState {
  enabled = 'enabled',
  enhanced = 'enhanced',
  input = 'input',
  inputTemporary = 'input-temporary',
}

export enum ReadoutInputWeight {
  regular = 'regular',
  active = 'active',
  bold = 'bold',
}

/**
 * `<obc-readout-input>` - A compact readout input segment for displaying editable or temporary values.
 *
 * Renders a leading marker icon and a single value string with optional fixed-width rendering, hinted zero padding, and an optional degree suffix. Use it as a low-level building block inside a larger readout when the input or commanded value must be shown separately from the main value.
 *
 * ## Features
 * - Sizes: Supports `small`, `regular`, `medium`, and `large`.
 * - Visual states: `enabled` uses the neutral color, while `enhanced`, `input`, and `inputTemporary` use the enhanced secondary color.
 * - Width control: When `stringWidth` is enabled, `valueLength` defines the visible string width. Longer values are clipped from the left, and empty or whitespace-only `valueLength` hides the rendered value.
 * - Hinted zeros: `hasHintedZeros` adds muted leading zeroes when `stringWidth` is enabled and the visible value is shorter than `valueLength`.
 * - Weight options: Supports `regular`, `active`, and `bold`. `bold` is intended for `regular` size only.
 * - Degree suffix: `hasDegree` renders a degree symbol only when `size` is `medium`, `weight` is `active`, and `stringWidth` is disabled.
 * - Icon override: A named slot can replace the default leading marker icon.
 *
 * ## Usage Guidelines
 * Use this component when a single input-like value needs to be rendered as one segment inside a larger readout composition. Prefer a higher-level readout container when label, unit, advice, or source content must be arranged together.
 *
 * For fixed-width layouts, pass a `valueLength` string that represents the desired visible width. Enable `hasHintedZeros` only when the UI should preserve leading positions visually; empty values intentionally render without hinted zeroes.
 *
 * ## Slots
 *
 * - `icon`: Replaces the default leading marker icon.
 *
 * @slot icon - Replaces the default leading marker icon.
 */
@customElement('obc-readout-input')
export class ObcReadoutInput extends LitElement {
  @property({type: String}) size: ReadoutInputSize = ReadoutInputSize.small;

  @property({type: String}) state: ReadoutInputState =
    ReadoutInputState.enabled;

  @property({type: Boolean}) hugContent = false;

  @property({type: String}) weight: ReadoutInputWeight =
    ReadoutInputWeight.regular;

  @property({type: Boolean}) stringWidth = false;

  @property({type: String}) value = '';

  @property({type: String}) valueLength = '';

  @property({type: Boolean}) hasHintedZeros = false;

  @property({type: Boolean}) hasDegree = false;

  private get visibleValue(): string {
    const trimmedValueLength = this.valueLength.trim();

    if (!this.stringWidth) {
      return this.value;
    }

    if (!trimmedValueLength) {
      return '';
    }

    return this.value.slice(-trimmedValueLength.length);
  }

  private get widthTemplate(): string {
    const trimmedValueLength = this.valueLength.trim();

    if (
      !this.stringWidth ||
      !trimmedValueLength ||
      this.visibleValue.length === 0
    ) {
      return this.visibleValue;
    }

    return trimmedValueLength;
  }

  private get hintedZeroCount(): number {
    if (
      this.visibleValue.length === 0 ||
      !this.stringWidth ||
      !this.hasHintedZeros ||
      this.widthTemplate.length <= this.visibleValue.length
    ) {
      return 0;
    }

    return this.widthTemplate.length - this.visibleValue.length;
  }

  private get supportsDegree(): boolean {
    return (
      this.size === ReadoutInputSize.medium &&
      this.weight === ReadoutInputWeight.active &&
      !this.stringWidth
    );
  }

  private renderInputIcon() {
    return html`
      <slot name="icon">
        <obi-input-right class="icon"></obi-input-right>
      </slot>
    `;
  }

  private renderValueComponent() {
    return html`
      <div
        class=${classMap({
          'input-value': true,
          [this.size]: true,
          [`weight-${this.weight}`]: true,
          'string-width': this.stringWidth,
          'with-degree': this.hasDegree && this.supportsDegree,
        })}
      >
        ${this.stringWidth && this.widthTemplate
          ? html`<span class="value-length" aria-hidden="true"
              >${this.widthTemplate}</span
            >`
          : nothing}
        <span class="value-content-container">
          <span class="value-content">
            ${this.hintedZeroCount > 0
              ? html`<span class="hinted-zero" aria-hidden="true"
                  >${'0'.repeat(this.hintedZeroCount)}</span
                >`
              : nothing}
            <span class="value">${this.visibleValue}</span>
          </span>
          ${this.hasDegree && this.supportsDegree
            ? html`<span class="degree" aria-hidden="true">°</span>`
            : nothing}
        </span>
        ${this.hasDegree && this.supportsDegree
          ? html`<span class="degree-template" aria-hidden="true">°</span>`
          : nothing}
      </div>
    `;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          'content-container': true,
          [this.size]: true,
          [`state-${this.state}`]: true,
          'no-hug-content': !this.hugContent,
        })}
      >
        <div class="icon-container" aria-hidden="true">
          <div
            class=${classMap({
              'input-linear': true,
              [this.size]: true,
            })}
          >
            ${this.renderInputIcon()}
          </div>
        </div>
        <div class="value-container">${this.renderValueComponent()}</div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-readout-input': ObcReadoutInput;
  }
}
