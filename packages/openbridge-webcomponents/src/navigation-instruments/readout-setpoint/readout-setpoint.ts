import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './readout-setpoint.css?inline';
import {customElement} from '../../decorator.js';
import '../../components/button/button.js';
import '../../icons/icon-notification-advice.js';
import type {
  ReadoutDirection as ReadoutSetpointDirection,
  ReadoutVariant as ReadoutSetpointReadoutStyle,
} from '../readout/readout.js';
import {Priority} from '../types.js';
import {
  getHintZeros,
  formatNumericValue,
  type ReadoutNumericFormatOptions,
} from '../readout/readout-formatters.js';

export enum ReadoutSetpointVariant {
  setpoint = 'setpoint',
  advice = 'advice',
  value = 'value',
}

export enum ReadoutSetpointSize {
  small = 'small',
  regular = 'regular',
  medium = 'medium',
  large = 'large',
}

export enum ReadoutSetpointFormat {
  regular = 'regular',
  description = 'description',
  range = 'range',
  verticalStack = 'vertical-stack',
  baseline = 'baseline',
  button = 'button',
}

export enum ReadoutSetpointMode {
  display = 'display',
  setpoint = 'setpoint',
  setpointTemporary = 'setpoint-temporary',
}

export enum ReadoutSetpointValueTypography {
  regular = 'regular',
  medium = 'medium',
  large = 'large',
}

type ReadoutValueRenderModel = {
  valueText: string; // formatted value
  hintedText: string; // hinted zeros (used to reserve space or for zero-padding)
};

/**
 * `<obc-readout-setpoint>` - A readout segment for displaying a value, setpoint, or temporary entry.
 *
 * Renders a leading marker icon and a single value string with optional fixed-width rendering, hinted zero padding, and an optional degree suffix. Use it as a low-level building block when one value segment must be shown separately inside a larger readout.
 *
 * ## Features
 * - Variants: Supports `setpoint`, `advice`, and `value`.
 * - Sizes: Supports `small`, `regular`, `medium`, and `large`.
 * - Formats: Supports `regular`, `description`, `range`, `vertical-stack`, `baseline`, and `button`. Format selects the structural subtype; size is controlled independently via the `size` property.
 * - Mode axis: `mode` controls behavior/typography (`display`, `setpoint`, `setpointTemporary`).
 * - Priority axis: `priority` controls color emphasis (`regular`/`enhanced`).
 * - Width control: `minValueLength` defines the minimum digit count reserved for the formatted numeric value. Longer values expand the segment width naturally.
 * - Hinted zeros: `hasHintedZeros` renders muted leading zeroes that fill the remaining `minValueLength` slots when the formatted value is shorter than the minimum.
 * - Degree suffix: `hasDegree` renders a trailing degree symbol (`°`).
 * - Description line: `type="description"` can render a secondary label below the value by using the `description` property.
 * - Range line: `type="range"` can render a second numeric line below the value by using the `secondaryValue` property.
 * - Vertical stack marker: `type="vertical-stack"` renders a trailing label to the right of the value.
 * - Icon override: A named slot can replace the default leading marker icon.
 *
 * ## Usage Guidelines
 * Use this component when one value segment needs to be rendered inside a larger readout composition. Prefer a higher-level readout container when label, unit, advice, or source content must be arranged together.
 *
 * For fixed-width layouts, set `minValueLength` to the minimum digit count the segment should reserve. Enable `hasHintedZeros` when the reserved leading positions should remain visible as muted zeroes; otherwise the space is preserved without a visible glyph.
 *
 * ## Slots
 *
 * - `icon`: Replaces the default leading marker icon.
 * - `value`: Replaces the formatted value content for `variant="value"`.
 *
 * @slot icon - Replaces the default leading marker icon.
 * @slot value - Replaces the formatted value content for `variant="value"`.
 */
@customElement('obc-readout-setpoint')
export class ObcReadoutSetpoint extends LitElement {
  @property({type: String}) variant: ReadoutSetpointVariant =
    ReadoutSetpointVariant.setpoint;
  @property({type: String}) readoutStyle?: ReadoutSetpointReadoutStyle;
  @property({type: String}) direction?: ReadoutSetpointDirection;
  @property({type: String}) size: ReadoutSetpointSize =
    ReadoutSetpointSize.small;
  @property({
    type: String,
    reflect: true,
  })
  valueTypography?: ReadoutSetpointValueTypography;

  @property({type: String}) format?: ReadoutSetpointFormat;
  @property({type: String}) mode?: ReadoutSetpointMode;
  @property({type: String}) priority?: Priority;
  @property({type: Boolean, reflect: true}) hugContent = false;
  @property({type: Number}) minValueLength = 0;
  @property({type: Number}) value?: number;
  @property({type: Number}) secondaryValue?: number;
  @property({type: Boolean}) off = false;
  @property({type: String}) description = '';
  @property({type: Boolean}) hasHintedZeros = false;
  @property({type: Boolean}) hasDegree = false;
  @property({type: Boolean}) showZeroPadding = false;
  @property({type: Number}) fractionDigits = 0;

  @state() private hasAssignedValueIcon = false;

  @query('slot[name="icon"]') private iconSlot?: HTMLSlotElement;

  private get resolvedFormat(): ReadoutSetpointFormat {
    return this.format ?? ReadoutSetpointFormat.regular;
  }

  private get resolvedMode(): ReadoutSetpointMode {
    return this.mode ?? ReadoutSetpointMode.display;
  }

  private get resolvedStateClass(): string {
    if (this.resolvedMode === ReadoutSetpointMode.setpointTemporary) {
      return 'setpoint-temporary';
    }
    if (this.resolvedMode === ReadoutSetpointMode.setpoint) {
      return 'setpoint';
    }
    return (this.priority ?? Priority.regular) === Priority.enhanced
      ? 'enhanced'
      : 'enabled';
  }

  private get resolvedHasDegree(): boolean {
    return this.hasDegree && !this.off;
  }

  private get resolvedSize(): ReadoutSetpointSize {
    return this.size;
  }

  private get resolvedInlineSize(): ReadoutSetpointSize {
    const format = this.resolvedFormat;
    const canPromoteToLarge =
      format !== ReadoutSetpointFormat.description &&
      format !== ReadoutSetpointFormat.range;

    if (
      this.direction === 'horizontal' &&
      canPromoteToLarge &&
      (this.readoutStyle === 'enhanced' || this.readoutStyle === 'stack') &&
      (this.resolvedSize === ReadoutSetpointSize.regular ||
        this.resolvedSize === ReadoutSetpointSize.medium)
    ) {
      return ReadoutSetpointSize.large;
    }

    return this.resolvedSize;
  }

  private get resolvedValueVariantSize(): ReadoutSetpointSize {
    if (this.readoutStyle === 'enhanced' || this.readoutStyle === 'stack') {
      return ReadoutSetpointSize.large;
    }

    if (this.readoutStyle === 'regular') {
      return this.resolvedInlineSize;
    }

    if (this.readoutStyle) {
      return ReadoutSetpointSize.medium;
    }

    return this.resolvedInlineSize;
  }

  private get resolvedVariantSize(): ReadoutSetpointSize {
    if (this.variant === ReadoutSetpointVariant.value) {
      return this.resolvedValueVariantSize;
    }

    return this.resolvedInlineSize;
  }

  private getValueVariantRenderModel(
    value: number | undefined
  ): ReadoutValueRenderModel {
    const numericFormatOptions: ReadoutNumericFormatOptions = {
      showZeroPadding: this.showZeroPadding,
      minValueLength: this.minValueLength,
      fractionDigits: this.fractionDigits,
    };
    const formattedText = formatNumericValue(value, numericFormatOptions);
    const hintedText = getHintZeros(value, numericFormatOptions);

    return {
      hintedText,
      valueText: formattedText,
    };
  }

  private get valueVariantRenderModel(): ReadoutValueRenderModel {
    return this.getValueVariantRenderModel(this.value);
  }

  private get secondaryValueVariantRenderModel(): string {
    return this.getValueVariantRenderModel(this.secondaryValue).valueText;
  }

  private renderSetpointIcon() {
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
      ${this.variant === ReadoutSetpointVariant.advice &&
      !this.hasAssignedValueIcon
        ? html`<obi-notification-advice></obi-notification-advice>`
        : nothing}
    `;
  }

  override firstUpdated() {
    this.hasAssignedValueIcon =
      (this.iconSlot?.assignedElements({flatten: true}).length ?? 0) > 0;
  }

  private get toneAccent() {
    if (this.priority === Priority.enhanced) {
      return true;
    }

    if (this.priority === Priority.regular) {
      return false;
    }

    if (this.variant === ReadoutSetpointVariant.value) {
      if (this.readoutStyle) {
        return (
          this.hasAttribute('data-obc-priority-scoped') &&
          this.priority === Priority.enhanced
        );
      }

      return true;
    }

    return this.priority === Priority.enhanced;
  }

  private get wrapperBaseClasses() {
    return {
      'readout-setpoint-wrapper': true,
      [`variant-${this.variant}`]: true,
      'tone-accent': this.toneAccent,
      [`direction-${this.direction}`]: Boolean(this.direction),
      [`readout-style-${this.readoutStyle}`]: Boolean(this.readoutStyle),
      [this.resolvedSize]: true,
      [`type-${this.resolvedFormat}`]: true,
      [`state-${this.resolvedStateClass}`]: true,
      'no-hug-content': !this.hugContent,
    };
  }

  private get setpointValueClasses() {
    return {
      'setpoint-value': true,
      [this.resolvedVariantSize]: true,
      'has-fixed-length': this.minValueLength > 1,
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
            'setpoint-linear': true,
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
    valueText,
  }: ReadoutValueRenderModel) {
    if (this.off) {
      return html`
        <span class="value-layer">
          <span class="value">OFF</span>
        </span>
      `;
    }

    let hasZeroPadding = true;
    if (hintedText === '') {
      hasZeroPadding = false;
    } else if (
      this.hugContent &&
      !this.hasHintedZeros &&
      this.variant !== ReadoutSetpointVariant.value
    ) {
      // TODO: Make a shadow element that reserve space the minimum value length.
      hasZeroPadding = false;
    }

    return html`
      <span class="value-layer">
        ${hasZeroPadding
          ? html`<span
              class=${classMap({
                'hinted-zero': true,
                'is-hidden': !this.hasHintedZeros,
              })}
              aria-hidden="true"
              >${hintedText}</span
            >`
          : nothing}
        <span class="value">${valueText}</span>
      </span>
    `;
  }

  private renderValueVariantComponent() {
    const size = this.resolvedVariantSize;
    const valueModel = this.valueVariantRenderModel;

    return html`
      <div
        class=${classMap({
          'readout-setpoint-wrapper': true,
          'variant-value': true,
          'tone-accent': this.toneAccent,
          [`direction-${this.direction}`]: Boolean(this.direction),
          [`readout-style-${this.readoutStyle}`]: Boolean(this.readoutStyle),
          [`state-${this.resolvedStateClass}`]: true,
          [size]: true,
        })}
      >
        ${this.renderValueVariantIcon()}
        <span
          class=${classMap({
            'variant-value-content': true,
            [size]: true,
            'with-degree': this.resolvedHasDegree,
          })}
          part="variant-value-content"
        >
          <span class="value-content-container" part="value-content-container">
            <slot name="value">
              ${this.renderValueTextContent(valueModel)}
            </slot>
            ${this.resolvedHasDegree
              ? html`<span class="degree">°</span>`
              : nothing}
          </span>
        </span>
      </div>
    `;
  }

  private renderRegularValueInlineIcon(size: ReadoutSetpointSize) {
    const hideStyle = this.hasAssignedValueIcon
      ? ''
      : this.direction === 'vertical'
        ? 'visibility:hidden;'
        : 'display:none;';

    return html`
      <div class="icon-container" aria-hidden="true" style=${hideStyle}>
        <div
          class=${classMap({
            'setpoint-linear': true,
            [size]: true,
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

  private renderRegularVerticalReadoutValueLikeInline() {
    const size = this.resolvedInlineSize;
    const valueModel = this.valueVariantRenderModel;

    return html`
      <div
        class=${classMap({
          'readout-setpoint-wrapper': true,
          'tone-accent': this.toneAccent,
          [`direction-${this.direction}`]: Boolean(this.direction),
          [`readout-style-${this.readoutStyle}`]: Boolean(this.readoutStyle),
          [`state-${this.resolvedStateClass}`]: true,
          [size]: true,
          [`type-${this.resolvedFormat}`]: true,
          'no-hug-content': !this.hugContent,
        })}
      >
        ${this.renderRegularValueInlineIcon(size)}
        <div
          class=${classMap({
            'setpoint-value': true,
            [size]: true,
            'with-degree': this.resolvedHasDegree,
          })}
        >
          <span class="value-content-container">
            ${this.renderValueTextContent(valueModel)}
            ${this.resolvedHasDegree
              ? html`<span class="degree">°</span>`
              : nothing}
          </span>
        </div>
      </div>
    `;
  }

  private renderValueComponent() {
    const format = this.resolvedFormat;
    const valueModel = this.valueVariantRenderModel;
    const showsDescription =
      format === ReadoutSetpointFormat.description &&
      this.description.trim().length > 0;
    const showsVerticalStackLabel =
      format === ReadoutSetpointFormat.verticalStack &&
      this.description.trim().length > 0;
    const resolvedSecondaryValue = this.secondaryValueVariantRenderModel;
    const showsSecondaryValue =
      format === ReadoutSetpointFormat.range &&
      resolvedSecondaryValue.length > 0;
    return html`
      <span class="value-content-container">
        ${this.renderValueTextContent(valueModel)}
        ${this.resolvedHasDegree
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

  private renderButtonComponent() {
    return html`
      <obc-button
        class="readout-setpoint-button"
        variant="flat"
        .fullWidth=${false}
        ?showLeadingIcon=${this.hasAssignedValueIcon}
      >
        <span slot="leading-icon" class="readout-setpoint-button-icon">
          ${this.renderSetpointIcon()}
        </span>
        <span
          class=${classMap({
            ...this.setpointValueClasses,
            'with-degree': this.resolvedHasDegree,
          })}
        >
          ${this.renderValueComponent()}
        </span>
      </obc-button>
    `;
  }

  override render() {
    if (this.variant === ReadoutSetpointVariant.value) {
      if (this.readoutStyle === 'regular') {
        return this.renderRegularVerticalReadoutValueLikeInline();
      }
      return this.renderValueVariantComponent();
    }

    if (this.resolvedFormat === ReadoutSetpointFormat.button) {
      return html`
        <div class=${classMap(this.wrapperBaseClasses)}>
          ${this.renderButtonComponent()}
        </div>
      `;
    }

    return html`
      <div class=${classMap(this.wrapperBaseClasses)}>
        <div class="icon-container" aria-hidden="true">
          <div
            class=${classMap({
              'setpoint-linear': true,
              [this.resolvedVariantSize]: true,
            })}
          >
            ${this.renderSetpointIcon()}
          </div>
        </div>
        <div
          class=${classMap({
            ...this.setpointValueClasses,
            'with-degree': this.resolvedHasDegree,
          })}
        >
          ${this.renderValueComponent()}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-readout-setpoint': ObcReadoutSetpoint;
  }
}
