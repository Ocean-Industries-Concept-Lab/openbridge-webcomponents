import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './readout-input.css?inline';
import {customElement} from '../../decorator.js';
import '../../components/button/button.js';
import '../../icons/icon-notification-advice.js';
import type {
  ReadoutDirection as ReadoutInputDirection,
  ReadoutType as ReadoutInputReadoutStyle,
} from '../readout/readout.js';
import {
  formatReadoutValue,
  formatTextSegment,
  getHintZeros,
  type ReadoutNumericFormatOptions,
} from '../readout/readout-formatters.js';

export enum ReadoutInputVariant {
  input = 'input',
  advice = 'advice',
  value = 'value',
}

export enum ReadoutInputSize {
  small = 'small',
  regular = 'regular',
  medium = 'medium',
  large = 'large',
}

export enum ReadoutInputType {
  regular = 'regular',
  enhanced = 'enhanced',
  description = 'description',
  range = 'range',
  verticalStack = 'vertical-stack',
  baseline = 'baseline',
  button = 'button',
}

export enum ReadoutInputState {
  enabled = 'enabled',
  enhanced = 'enhanced',
  active = 'active',
  input = 'input',
  inputTemporary = 'input-temporary',
}

const READOUT_INPUT_TYPE_PRESET_SIZE: Partial<
  Record<ReadoutInputType, ReadoutInputSize>
> = {
  [ReadoutInputType.regular]: ReadoutInputSize.medium,
  [ReadoutInputType.enhanced]: ReadoutInputSize.large,
  [ReadoutInputType.description]: ReadoutInputSize.regular,
  [ReadoutInputType.range]: ReadoutInputSize.regular,
  [ReadoutInputType.verticalStack]: ReadoutInputSize.medium,
  [ReadoutInputType.baseline]: ReadoutInputSize.medium,
  [ReadoutInputType.button]: ReadoutInputSize.medium,
};

type ReadoutValueRenderModel = {
  hintedText: string;
  hintedVisible: boolean;
  templateText: string;
  valueText: string;
};

/**
 * `<obc-readout-input>` - A readout segment for displaying a value, input, or temporary entry.
 *
 * Renders a leading marker icon and a single value string with optional fixed-width rendering, hinted zero padding, and an optional degree suffix. Use it as a low-level building block when one value segment must be shown separately inside a larger readout.
 *
 * ## Features
 * - Variants: Supports `input`, `advice`, and `value`.
 * - Sizes: Supports `small`, `regular`, `medium`, and `large`.
 * - Types: Supports `regular`, `enhanced`, `description`, `range`, `vertical-stack`, `baseline`, and `button`. The selected type defines the internal size and layout preset.
 * - Visual states: `enabled` uses the neutral color, `enhanced`, `input`, and `inputTemporary` use the enhanced secondary color, and `active` is reserved for the `advice` variant.
 * - Width control: When `hasFixedLength` is enabled, `valueLength` defines the minimum visible string width. Longer values expand the segment width beyond the template, and empty or whitespace-only `valueLength` hides the rendered value.
 * - Hinted zeros: `hasHintedZeros` adds muted leading zeroes when `hasFixedLength` is enabled and the visible value is shorter than `valueLength`.
 * - Degree suffix: `hasDegree` renders a degree symbol only when `size` is `medium`, the segment is in an active input/advice state, and `hasFixedLength` is disabled.
 * - Description line: `type="description"` can render a secondary label below the value by using the `description` property.
 * - Range line: `type="range"` can render a second numeric line below the value by using the `secondaryValue` property.
 * - Vertical stack marker: `type="vertical-stack"` renders a trailing label to the right of the value.
 * - Icon override: A named slot can replace the default leading marker icon.
 *
 * ## Usage Guidelines
 * Use this component when one value segment needs to be rendered inside a larger readout composition. Prefer a higher-level readout container when label, unit, advice, or source content must be arranged together.
 *
 * For fixed-width layouts, pass a `valueLength` string that represents the minimum reserved width. Enable `hasHintedZeros` when leading positions should remain visible; empty values keep the reserved width and show hinted zeroes only when that option is enabled.
 *
 * ## Slots
 *
 * - `icon`: Replaces the default leading marker icon.
 * - `value`: Replaces the formatted value content for `variant="value"`.
 *
 * @slot icon - Replaces the default leading marker icon.
 * @slot value - Replaces the formatted value content for `variant="value"`.
 */
@customElement('obc-readout-input')
export class ObcReadoutInput extends LitElement {
  @property({type: String, reflect: true}) variant: ReadoutInputVariant =
    ReadoutInputVariant.input;

  @property({
    type: String,
    attribute: 'readout-style',
    reflect: true,
  })
  readoutStyle?: ReadoutInputReadoutStyle;

  @property({
    type: String,
    attribute: 'direction',
    reflect: true,
  })
  direction?: ReadoutInputDirection;

  @property({type: String}) size: ReadoutInputSize = ReadoutInputSize.small;

  @property({type: String}) type?: ReadoutInputType;

  @property({type: String}) state: ReadoutInputState =
    ReadoutInputState.enabled;

  @property({type: Boolean}) hugContent = false;

  @property({type: Boolean}) hasFixedLength = false;

  @property() value: number | string | undefined = '';

  @property({type: String}) secondaryValue = '';

  @property({type: String}) description = '';

  @property({type: String}) valueLength = '';

  @property({type: Boolean}) hasHintedZeros = false;

  @property({type: Boolean}) hasDegree = false;

  @property({type: Boolean}) showZeroPadding = false;

  @property({type: Number}) maxDigits = 1;

  @property({type: Number}) fractionDigits = 0;

  @state() private hasAssignedValueIcon = false;

  @query('slot[name="icon"]') private iconSlot?: HTMLSlotElement;

  private get resolvedSize(): ReadoutInputSize {
    if (this.type) {
      return READOUT_INPUT_TYPE_PRESET_SIZE[this.type] ?? this.size;
    }

    return this.size;
  }

  private get resolvedInlineSize(): ReadoutInputSize {
    if (
      this.direction === 'horizontal' &&
      (this.readoutStyle === 'enhanced' || this.readoutStyle === 'stack') &&
      (this.resolvedSize === ReadoutInputSize.regular ||
        this.resolvedSize === ReadoutInputSize.medium)
    ) {
      return ReadoutInputSize.large;
    }

    return this.resolvedSize;
  }

  private get resolvedValueVariantSize(): ReadoutInputSize {
    if (
      this.readoutStyle === 'enhanced' ||
      (this.readoutStyle === 'stack' && this.direction === 'horizontal')
    ) {
      return ReadoutInputSize.large;
    }

    if (this.readoutStyle) {
      return ReadoutInputSize.medium;
    }

    return this.resolvedInlineSize;
  }

  private get resolvedVariantSize(): ReadoutInputSize {
    if (this.variant === ReadoutInputVariant.value) {
      return this.resolvedValueVariantSize;
    }

    return this.resolvedInlineSize;
  }

  private get resolvedSemanticSizeClass(): ReadoutInputSize | undefined {
    if (
      this.type === ReadoutInputType.regular ||
      this.type === ReadoutInputType.enhanced
    ) {
      return undefined;
    }

    return this.resolvedVariantSize;
  }

  private get valueText(): string {
    if (typeof this.value === 'string') {
      return this.value;
    }

    if (this.value === undefined) {
      return '';
    }

    return String(this.value);
  }

  private get inlineRenderedValueText(): string {
    if (!this.hasFixedLength) {
      return this.valueText;
    }

    return formatTextSegment(this.valueText, true, this.valueLength)
      .visibleValue;
  }

  private get inlineValueRenderModel(): ReadoutValueRenderModel {
    const valueText = this.inlineRenderedValueText;
    const templateText = this.hasFixedLength ? this.valueLength.trim() : '';
    const hintedText =
      !this.hasFixedLength ||
      !this.hasHintedZeros ||
      templateText.length === 0 ||
      templateText.length <= valueText.length
        ? ''
        : '0'.repeat(templateText.length - valueText.length);

    return {
      hintedText,
      hintedVisible: hintedText.length > 0,
      templateText,
      valueText,
    };
  }

  private get valueVariantRenderModel(): ReadoutValueRenderModel {
    const numericFormatOptions: ReadoutNumericFormatOptions = {
      showZeroPadding: this.showZeroPadding,
      maxDigits: this.maxDigits,
      fractionDigits: this.fractionDigits,
    };
    const valueText = formatReadoutValue(this.value, numericFormatOptions);

    return {
      hintedText: getHintZeros(this.value, valueText, numericFormatOptions),
      hintedVisible: this.showZeroPadding,
      templateText: '',
      valueText,
    };
  }

  private renderInputIcon() {
    return html`
      <slot
        name="icon"
        @slotchange=${(event: Event) => {
          this.hasAssignedValueIcon =
            ((event.target as HTMLSlotElement).assignedElements({
              flatten: true,
            }).length ?? 0) > 0;
        }}
      ></slot>
      ${this.variant === ReadoutInputVariant.advice &&
      !this.hasAssignedValueIcon
        ? html`<obi-notification-advice></obi-notification-advice>`
        : nothing}
    `;
  }

  override firstUpdated() {
    this.hasAssignedValueIcon =
      (this.iconSlot?.assignedElements({flatten: true}).length ?? 0) > 0;
  }

  override updated() {
    const hugs =
      this.hugContent ||
      this.type === ReadoutInputType.button ||
      (this.readoutStyle === 'stack' &&
        this.direction === 'horizontal' &&
        (this.type === ReadoutInputType.description ||
          this.type === ReadoutInputType.range));
    this.style.width = hugs ? 'fit-content' : '100%';
  }

  private get toneAccent() {
    if (this.variant === ReadoutInputVariant.value) {
      return true;
    }

    if (this.variant === ReadoutInputVariant.input) {
      return true;
    }

    return (
      this.variant === ReadoutInputVariant.advice &&
      this.state !== ReadoutInputState.enabled
    );
  }

  private get wrapperBaseClasses() {
    return {
      'readout-input-wrapper': true,
      [`variant-${this.variant}`]: true,
      'tone-accent': this.toneAccent,
      [`direction-${this.direction}`]: Boolean(this.direction),
      [`readout-style-${this.readoutStyle}`]: Boolean(this.readoutStyle),
      [this.resolvedSemanticSizeClass ?? '']: Boolean(
        this.resolvedSemanticSizeClass
      ),
      [`type-${this.type}`]: Boolean(this.type),
      [`state-${this.state}`]: true,
      'no-hug-content': !this.hugContent,
    };
  }

  private get inputValueClasses() {
    return {
      'input-value': true,
      [this.resolvedVariantSize]: true,
      'has-fixed-length': this.hasFixedLength,
    };
  }

  private renderValueVariantIcon() {
    return html`
      <div
        class=${classMap({
          'icon-container': true,
          hidden: !this.hasAssignedValueIcon,
        })}
        aria-hidden="true"
      >
        <div
          class=${classMap({
            'input-linear': true,
            [this.resolvedVariantSize]: true,
          })}
        >
          <slot
            name="icon"
            @slotchange=${(event: Event) => {
              this.hasAssignedValueIcon =
                ((event.target as HTMLSlotElement).assignedElements({
                  flatten: true,
                }).length ?? 0) > 0;
            }}
          ></slot>
        </div>
      </div>
    `;
  }

  private renderValueTextContent({
    hintedText,
    hintedVisible,
    valueText,
  }: ReadoutValueRenderModel) {
    return html`
      ${hintedText
        ? html`<span
            class=${classMap({
              'hinted-zero': true,
              'is-visible': hintedVisible,
            })}
            aria-hidden="true"
            >${hintedText}</span
          >`
        : nothing}
      <span class="value">${valueText}</span>
    `;
  }

  private renderValueVariantComponent() {
    const size = this.resolvedVariantSize;
    const valueModel = this.valueVariantRenderModel;

    return html`
      <div
        class=${classMap({
          'readout-input-wrapper': true,
          'variant-value': true,
          'tone-accent': this.toneAccent,
          [`direction-${this.direction}`]: Boolean(this.direction),
          [`readout-style-${this.readoutStyle}`]: Boolean(this.readoutStyle),
          [`state-${this.state}`]: true,
          [size]: true,
        })}
      >
        ${this.renderValueVariantIcon()}
        <span
          class=${classMap({
            'variant-value-content': true,
            [size]: true,
          })}
        >
          <slot name="value"> ${this.renderValueTextContent(valueModel)} </slot>
        </span>
      </div>
    `;
  }

  private renderValueComponent(supportsDegree: boolean) {
    const valueModel = this.inlineValueRenderModel;
    const showsDescription =
      this.type === ReadoutInputType.description &&
      this.description.trim().length > 0;
    const showsVerticalStackLabel =
      this.type === ReadoutInputType.verticalStack &&
      this.description.trim().length > 0;
    const resolvedSecondaryValue =
      this.secondaryValue !== '' ? this.secondaryValue : this.valueText;
    const showsSecondaryValue =
      this.type === ReadoutInputType.range &&
      resolvedSecondaryValue.trim().length > 0;
    const showsValueLengthTemplate =
      this.type !== ReadoutInputType.description &&
      this.type !== ReadoutInputType.range &&
      this.hasFixedLength &&
      valueModel.templateText.length > 0;

    return html`
      <span
        class="value-content-container"
        style=${showsValueLengthTemplate
          ? `--obc-readout-input-fixed-ch:${valueModel.templateText.length};`
          : ''}
      >
        ${this.renderValueTextContent(valueModel)}
        ${this.hasDegree && supportsDegree
          ? html`<span class="degree">°</span>`
          : nothing}
      </span>
      ${showsDescription
        ? html`
            <span class="description-box">
              <span class="description">${this.description}</span>
            </span>
          `
        : nothing}
      ${showsSecondaryValue
        ? html`
            <span class="secondary-value-box">
              <span class="secondary-value">${resolvedSecondaryValue}</span>
            </span>
          `
        : nothing}
      ${showsVerticalStackLabel
        ? html`
            <span class="vertical-stack-label-box">
              <span class="vertical-stack-label">${this.description}</span>
            </span>
          `
        : nothing}
    `;
  }

  private renderButtonComponent(supportsDegree: boolean) {
    return html`
      <obc-button
        class="readout-input-button"
        variant="flat"
        .fullWidth=${false}
        ?showLeadingIcon=${this.hasAssignedValueIcon}
      >
        <span slot="leading-icon" class="readout-input-button-icon">
          ${this.renderInputIcon()}
        </span>
        <span
          class=${classMap({
            ...this.inputValueClasses,
            'with-degree': this.hasDegree && supportsDegree,
          })}
        >
          ${this.renderValueComponent(supportsDegree)}
        </span>
      </obc-button>
    `;
  }

  override render() {
    if (this.variant === ReadoutInputVariant.value) {
      return this.renderValueVariantComponent();
    }

    const supportsDegree =
      this.resolvedVariantSize === ReadoutInputSize.medium &&
      (this.state === ReadoutInputState.input ||
        this.state === ReadoutInputState.inputTemporary ||
        (this.variant === ReadoutInputVariant.advice &&
          this.state === ReadoutInputState.active)) &&
      !this.hasFixedLength;

    if (this.type === ReadoutInputType.button) {
      return html`
        <div class=${classMap(this.wrapperBaseClasses)}>
          ${this.renderButtonComponent(supportsDegree)}
        </div>
      `;
    }

    return html`
      <div class=${classMap(this.wrapperBaseClasses)}>
        <div class="icon-container" aria-hidden="true">
          <div
            class=${classMap({
              'input-linear': true,
              [this.resolvedVariantSize]: true,
            })}
          >
            ${this.renderInputIcon()}
          </div>
        </div>
        <div
          class=${classMap({
            ...this.inputValueClasses,
            'with-degree': this.hasDegree && supportsDegree,
          })}
        >
          ${this.renderValueComponent(supportsDegree)}
        </div>
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
