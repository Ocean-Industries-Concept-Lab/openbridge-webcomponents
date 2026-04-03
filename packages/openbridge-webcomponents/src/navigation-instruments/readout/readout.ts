import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './readout.css?inline';
import {customElement} from '../../decorator.js';
import '../../components/context-menu/context-menu.js';
import '../../icons/icon-input-right.js';
import '../../icons/icon-placeholder.js';
import {
  ReadoutAdviceState,
  ReadoutAdviceType,
} from '../readout-advice/readout-advice.js';
import '../readout-advice/readout-advice.js';
import {
  renderReadoutLabelZone,
  renderReadoutMetaZone,
  renderReadoutUnitZone,
} from './readout-meta.js';
import {
  ReadoutSourceType,
  renderReadoutSource,
  supportsReadoutSourcePicker,
} from './readout-source.js';
import {
  ReadoutInputState,
  ReadoutInputType,
  ReadoutInputVariant,
} from '../readout-input/readout-input.js';
import '../readout-input/readout-input.js';

export enum ReadoutType {
  regular = 'regular',
  enhanced = 'enhanced',
  stack = 'stack',
}

export enum ReadoutDirection {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

export {ReadoutSourceType};
export {ReadoutAdviceType, ReadoutInputType};

/**
 * `<obc-readout>` – A component for displaying navigation instrument data.
 *
 * This component is used to show a primary value, optional advice and input segments, units, a label, and a source (e.g., GPS, Gyro).
 * It supports different readout styles, horizontal/vertical layouts, and configurable numeric formatting.
 *
 * ### Features
 * - **Readout Styles:** Supports `regular`, `enhanced`, and `stack` presentations.
 * - **Segments:** Optional advice, input, and leading icon display in addition to the main value.
 * - **Source:** Optional source display with `small`, `regular`, `delta`, and `flyout` variants.
 * - **Source Picker:** Optional source selection with a dropdown and context menu.
 * - **Formatting:** Customizable integer and fraction digits, dashed fallback values, and optional zero padding.
 * - **Layouts:** Can be oriented horizontally or vertically, with optional dividers and segment spacing controls.
 *
 * ### Slots
 * | Slot Name           | Purpose                                                                    |
 * |---------------------|----------------------------------------------------------------------------|
 * | advice              | Replaces the fallback advice segment when `hasAdvice` is true.             |
 * | advice-icon         | Replaces the fallback advice icon when `hasAdvice` is true.                |
 * | input               | Replaces the fallback input segment when `hasInput` is true.               |
 * | input-icon          | Replaces the fallback input icon when `hasInput` is true.                  |
 * | leading-icon        | Replaces the fallback leading icon beside the main value.                  |
 * | value               | Replaces the formatted main value content.                                 |
 * | label               | Replaces the label content.                                                |
 * | unit                | Replaces the unit content.                                                 |
 * | source              | Replaces the source row content.                                           |
 * | src-picker-content  | Content for the source picker context menu (e.g., a list of sources).      |
 *
 * @slot advice - Replaces the fallback advice segment.
 * @slot advice-icon - Replaces the fallback advice icon.
 * @slot input - Replaces the fallback input segment.
 * @slot input-icon - Replaces the fallback input icon.
 * @slot leading-icon - Replaces the fallback leading icon beside the value.
 * @slot value - Replaces the formatted main value content.
 * @slot label - Replaces the label content.
 * @slot unit - Replaces the unit content.
 * @slot source - Replaces the source row content.
 * @slot src-picker-content - Provides the source picker context menu content.
 */
@customElement('obc-readout')
export class ObcReadout extends LitElement {
  @property({type: String}) type: ReadoutType = ReadoutType.regular;

  @property({type: String}) direction: ReadoutDirection =
    ReadoutDirection.vertical;

  @property({type: Boolean}) hug = false;

  @property({type: Boolean}) hasAdvice = false;

  @property({type: Boolean}) hasInput = false;

  @property({type: Boolean}) hasInputDivider = false;

  @property({type: Boolean}) hasSourceDivider = false;

  @property({type: Boolean}) hasSrc = false;

  @property() value: number | string | undefined;

  @property({type: Number}) maxDigits = 1;

  @property({type: Boolean}) showZeroPadding = false;

  @property({type: Number}) fractionDigits = 0;

  @property({type: String}) unit = '';

  @property({type: String}) src = '';

  @property({type: String}) sourceDeltaValue = '';

  @property({type: Boolean}) labelOnly = false;

  @property({type: Boolean}) hasSrcPicker = false;

  @property({type: Boolean}) hasLeadingIcon = false;

  @property({type: String}) adviceValue = '';

  @property({type: String}) inputValue = '';

  @property({type: String}) label = '';

  @property({type: String}) sourceType?: ReadoutSourceType;

  @property({type: Boolean, attribute: false}) sourceHug = true;

  @property({type: Boolean}) hasSourceLeadingIcon = false;

  @property({type: Boolean, attribute: false}) hasSourceTrailingIcon = true;

  @property({type: Boolean}) hasLabelFixedLength = false;

  @property({type: String}) labelLength = '';

  @property({type: Boolean}) hasUnitFixedLength = false;

  @property({type: String}) unitLength = '';

  @property({type: String}) adviceType: ReadoutAdviceType =
    ReadoutAdviceType.regular;

  @property({type: String}) adviceState: ReadoutAdviceState =
    ReadoutAdviceState.enabled;

  @property({type: Boolean}) adviceHasFixedLength = false;

  @property({type: String}) adviceSecondaryValue = '';

  @property({type: String}) adviceDescription = '';

  @property({type: String}) adviceValueLength = '';

  @property({type: Boolean}) adviceHasHintedZeros = false;

  @property({type: Boolean}) adviceHasDegree = false;

  @property({type: String}) inputType: ReadoutInputType =
    ReadoutInputType.regular;

  @property({type: String}) inputState: ReadoutInputState =
    ReadoutInputState.enabled;

  @property({type: Boolean}) inputHasFixedLength = false;

  @property({type: String}) inputSecondaryValue = '';

  @property({type: String}) inputDescription = '';

  @property({type: String}) inputValueLength = '';

  @property({type: Boolean}) inputHasHintedZeros = false;

  @property({type: Boolean}) inputHasDegree = false;

  @state() private sourcePickerContentVisible = false;

  private get isHorizontal() {
    return this.direction === ReadoutDirection.horizontal;
  }

  private get isVertical() {
    return this.direction === ReadoutDirection.vertical;
  }

  private get isEnhanced() {
    return this.type === ReadoutType.enhanced;
  }

  private get isStack() {
    return this.type === ReadoutType.stack;
  }

  private get showAdviceDivider() {
    return this.isHorizontal && this.hasAdvice && this.hasInput;
  }

  private get showInputDivider() {
    return this.hasInputDivider && this.hasInput;
  }

  private get showSourceDivider() {
    return this.hasSourceDivider && this.hasSrc;
  }

  private get showUnitZone() {
    return this.type === ReadoutType.regular && this.isHorizontal;
  }

  private get resolvedSourceType(): ReadoutSourceType {
    if (this.sourceType) {
      return this.sourceType;
    }

    return this.type === ReadoutType.regular ||
      ((this.type === ReadoutType.enhanced ||
        this.type === ReadoutType.stack) &&
        this.isVertical)
      ? ReadoutSourceType.small
      : ReadoutSourceType.regular;
  }
  private renderAdvice() {
    if (!this.hasAdvice) {
      return nothing;
    }

    return html`
      <div class="readout-segment-wrapper readout-advice" part="advice-wrapper">
        <slot name="advice">
          <obc-readout-advice
            .readoutStyle=${this.type}
            .direction=${this.direction}
            .type=${this.adviceType}
            .state=${this.adviceState}
            .hasFixedLength=${this.adviceHasFixedLength}
            .value=${this.adviceValue}
            .secondaryValue=${this.adviceSecondaryValue}
            .description=${this.adviceDescription}
            .valueLength=${this.adviceValueLength}
            .hasHintedZeros=${this.adviceHasHintedZeros}
            .hasDegree=${this.adviceHasDegree}
          >
            <slot name="advice-icon" slot="icon">
              <obi-placeholder slot="icon"></obi-placeholder>
            </slot>
          </obc-readout-advice>
        </slot>
      </div>
    `;
  }

  private renderInput() {
    if (!this.hasInput) {
      return nothing;
    }

    return html`
      <div class="readout-segment-wrapper readout-input" part="input-wrapper">
        <slot name="input">
          <obc-readout-input
            .readoutStyle=${this.type}
            .direction=${this.direction}
            .type=${this.inputType}
            .state=${this.inputState}
            .hasFixedLength=${this.inputHasFixedLength}
            .value=${this.inputValue}
            .secondaryValue=${this.inputSecondaryValue}
            .description=${this.inputDescription}
            .valueLength=${this.inputValueLength}
            .hasHintedZeros=${this.inputHasHintedZeros}
            .hasDegree=${this.inputHasDegree}
          >
            <slot name="input-icon" slot="icon">
              <obi-input-right slot="icon"></obi-input-right>
            </slot>
          </obc-readout-input>
        </slot>
      </div>
    `;
  }

  private renderInputDivider() {
    if (!this.showInputDivider) {
      return nothing;
    }

    return html`<div class="input-divider" part="input-divider"></div>`;
  }

  private renderAdviceDivider() {
    if (!this.showAdviceDivider) {
      return nothing;
    }

    return html`<div class="advice-divider" part="advice-divider"></div>`;
  }

  private renderSourceDivider() {
    if (!this.showSourceDivider) {
      return nothing;
    }

    return html`<div class="source-divider" part="source-divider"></div>`;
  }

  private renderValueZone() {
    return html`
      <div
        class=${classMap({
          'readout-segment-wrapper': true,
          'readout-value-wrapper': true,
        })}
        part="value-wrapper"
      >
        ${this.renderValueInput()}
      </div>
    `;
  }

  private renderSource() {
    return renderReadoutSource({
      hasSrc: this.hasSrc,
      hasSrcPicker:
        this.hasSrcPicker &&
        supportsReadoutSourcePicker(this.resolvedSourceType),
      src: this.src,
      sourceDeltaValue: this.sourceDeltaValue,
      sourceType: this.resolvedSourceType,
      readoutType: this.type,
      readoutDirection: this.direction,
      sourceHug: this.sourceHug,
      hasSourceLeadingIcon: this.hasSourceLeadingIcon,
      hasSourceTrailingIcon: this.hasSourceTrailingIcon,
      onTogglePicker: () => {
        this.sourcePickerContentVisible = !this.sourcePickerContentVisible;
      },
    });
  }

  private renderSourcePickerContent() {
    if (
      !(
        this.hasSrcPicker &&
        supportsReadoutSourcePicker(this.resolvedSourceType)
      ) ||
      !this.sourcePickerContentVisible
    ) {
      return nothing;
    }

    return html`
      <obc-context-menu
        class="source-picker-content"
        @click=${() => (this.sourcePickerContentVisible = false)}
      >
        <slot name="src-picker-content"></slot>
      </obc-context-menu>
    `;
  }

  private renderValueInput() {
    return html`
      <obc-readout-input
        .variant=${ReadoutInputVariant.value}
        .readoutStyle=${this.type}
        .direction=${this.direction}
        .value=${this.value}
        .showZeroPadding=${this.showZeroPadding}
        .maxDigits=${this.maxDigits}
        .fractionDigits=${this.fractionDigits}
      >
        ${this.hasLeadingIcon
          ? html`
              <slot name="leading-icon" slot="icon">
                <obi-placeholder slot="icon"></obi-placeholder>
              </slot>
            `
          : nothing}
        ${this.querySelector('[slot="value"]') !== null
          ? html`<slot name="value" slot="value"></slot>`
          : nothing}
      </obc-readout-input>
    `;
  }

  private renderHorizontalValueUnitZone(hasUnit: boolean) {
    return html`
      <div
        class="readout-segment-wrapper readout-value-unit-wrapper"
        part="value-unit-wrapper"
      >
        ${this.renderValueInput()}
        ${hasUnit
          ? renderReadoutUnitZone(
              this.unit,
              this.hasUnitFixedLength,
              this.unitLength
            )
          : nothing}
      </div>
    `;
  }

  private renderHorizontalLayout() {
    return html`
      <div
        class="readout-segment-wrapper readout-horizontal-layout"
        part="horizontal-layout"
      >
        ${this.type === ReadoutType.regular && this.isHorizontal
          ? renderReadoutLabelZone(
              this.label,
              this.hasLabelFixedLength,
              this.labelLength
            )
          : nothing}
        ${this.isEnhanced && this.isHorizontal
          ? renderReadoutMetaZone({
              labelValue: this.label,
              unitValue: this.unit,
              hasLabelFixedLength: this.hasLabelFixedLength,
              labelLength: this.labelLength,
              hasUnitFixedLength: this.hasUnitFixedLength,
              unitLength: this.unitLength,
            })
          : nothing}
        <div
          class="readout-segment-wrapper readout-inline-value-wrapper"
          part="inline-value-wrapper"
        >
          ${!(this.isEnhanced && this.isHorizontal) && this.hasAdvice
            ? this.renderAdvice()
            : nothing}
          ${!(this.isEnhanced && this.isHorizontal) && this.hasAdvice
            ? this.renderAdviceDivider()
            : nothing}
          ${this.hasInput ? this.renderInput() : nothing}
          ${this.renderInputDivider()}
          ${this.showUnitZone
            ? this.renderHorizontalValueUnitZone(true)
            : html`${this.renderValueInput()}`}
          ${this.isStack && this.isHorizontal
            ? renderReadoutMetaZone({
                labelValue: this.label,
                unitValue: this.unit,
                hasLabelFixedLength: this.hasLabelFixedLength,
                labelLength: this.labelLength,
                hasUnitFixedLength: this.hasUnitFixedLength,
                unitLength: this.unitLength,
              })
            : nothing}
          ${this.hasSrc ? this.renderSourceDivider() : nothing}
          ${this.hasSrc ? this.renderSource() : nothing}
        </div>
      </div>
    `;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          readout: true,
          [this.type]: true,
          [this.direction]: true,
          'has-source': this.hasSrc,
          'no-hug': !this.hug,
          'label-only': this.labelOnly,
        })}
      >
        ${!this.labelOnly && this.isVertical ? this.renderAdvice() : nothing}
        ${!this.labelOnly && this.isVertical ? this.renderInput() : nothing}
        ${!this.labelOnly && this.isVertical ? this.renderValueZone() : nothing}
        ${this.labelOnly || this.isVertical
          ? renderReadoutMetaZone({
              labelValue: this.label,
              unitValue: this.unit,
              hasLabelFixedLength: this.hasLabelFixedLength,
              labelLength: this.labelLength,
              hasUnitFixedLength: this.hasUnitFixedLength,
              unitLength: this.unitLength,
            })
          : nothing}
        ${!this.labelOnly && this.hasSrc && this.isVertical
          ? this.renderSource()
          : nothing}
        ${!this.labelOnly && this.isHorizontal
          ? this.renderHorizontalLayout()
          : nothing}
      </div>
      ${this.renderSourcePickerContent()}
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-readout': ObcReadout;
  }
}
