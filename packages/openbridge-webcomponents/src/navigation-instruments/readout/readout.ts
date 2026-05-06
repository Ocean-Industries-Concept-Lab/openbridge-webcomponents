import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './readout.css?inline';
import {customElement} from '../../decorator.js';
import '../../components/context-menu-input/context-menu-input.js';
import {
  ContextMenuType,
  type ContextMenuOption,
  type ObcContextMenuInputItemClickEvent,
} from '../../components/context-menu-input/context-menu-input.js';
import {Priority} from '../types.js';
import '../../icons/icon-input-right.js';
import '../../icons/icon-placeholder.js';
import {
  ReadoutAdviceState,
  ReadoutAdviceFormat,
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
  ReadoutInputMode,
  ReadoutInputFormat,
  ReadoutInputVariant,
  ReadoutInputSize,
} from '../readout-input/readout-input.js';
import '../readout-input/readout-input.js';

export enum ReadoutVariant {
  regular = 'regular',
  enhanced = 'enhanced',
  stack = 'stack',
}

export enum ReadoutInputStyle {
  hidden = 'hidden',
  regular = 'regular',
  enhanced = 'enhanced',
}

export enum ReadoutAlertState {
  none = 'none',
  lowIntegrity = 'low-integrity',
  invalid = 'invalid',
  caution = 'caution',
  warning = 'warning',
  alarm = 'alarm',
}

export enum ReadoutInputInteraction {
  alwaysVisible = 'always-visible',
  flipFlop = 'flip-flop',
  popUp = 'pop-up',
}

export enum ReadoutDirection {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

export enum ReadoutStackVerticalAlignment {
  left = 'left',
  center = 'center',
  vertical = 'vertical',
}

export enum ReadoutPriorityElement {
  value = 'value',
  input = 'input',
  advice = 'advice',
  source = 'source',
  meta = 'meta',
}

export {ReadoutSourceType};

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
 * @fires source-flyout-click {CustomEvent<{src: string, sourceType?: ReadoutSourceType}>} Fired when the source row is clicked while `sourceType="flyout"`.
 * @fires source-change {CustomEvent<{value: string, label?: string}>} Fired when a source picker option is selected.
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
  @property({type: String}) variant: ReadoutVariant = ReadoutVariant.regular;

  /**
   * @deprecated Use `readoutInputStyle` for input emphasis instead of per-element priority selection.
   */
  @property({type: String}) priority?: Priority;

  @property({type: String}) valuePriority?: Priority;

  /**
   * @deprecated Not supported by the public readout API. Use `readoutInputStyle` instead.
   */
  @property({type: Array, attribute: false})
  priorityElements: ReadoutPriorityElement[] = [];

  @property({type: String}) readoutInputStyle: ReadoutInputStyle =
    ReadoutInputStyle.regular;

  @property({type: String}) alertState: ReadoutAlertState =
    ReadoutAlertState.none;

  @property({type: String}) inputInteraction: ReadoutInputInteraction =
    ReadoutInputInteraction.alwaysVisible;

  @property({type: String}) direction: ReadoutDirection =
    ReadoutDirection.vertical;

  @property({type: String})
  alignment: ReadoutStackVerticalAlignment =
    ReadoutStackVerticalAlignment.vertical;

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

  @property({type: Boolean}) valueHasFixedLength = false;

  @property({type: String}) valueLength = '';

  @property({type: Boolean}) valueHasHintedZeros = false;

  @property({type: Boolean}) hasDegree = false;

  @property({type: String}) unit = '';

  @property({type: String}) src = '';

  @property({type: String}) sourceDeltaValue = '';

  @property({type: Boolean}) labelOnly = false;

  @property({type: Boolean}) hasSrcPicker = false;

  @property({type: Boolean}) hasLeadingIcon = false;

  @property() adviceValue: number | string | undefined = '';

  /**
   * @deprecated Use `setpointValue` for the input/setpoint segment value.
   */
  @property() inputValue: number | string | undefined = '';

  @property() setpointValue: number | string | undefined = undefined;

  @property({type: String}) label = '';

  @property({type: String}) sourceType?: ReadoutSourceType;

  @property({type: Boolean, attribute: false}) sourceHug = true;

  @property({type: Boolean}) hasSourceLeadingIcon = false;

  @property({type: Boolean, attribute: false}) hasSourceTrailingIcon = true;

  @property({type: Boolean}) hasLabelFixedLength = false;

  @property({type: String}) labelLength = '';

  @property({type: Boolean}) hasUnitFixedLength = false;

  @property({type: String}) unitLength = '';

  @property({type: String}) adviceFormat: ReadoutAdviceFormat =
    ReadoutAdviceFormat.regular;

  @property({type: String}) adviceState: ReadoutAdviceState =
    ReadoutAdviceState.enabled;

  @property({type: String}) advicePriority?: Priority;

  @property({type: Boolean}) adviceHasFixedLength = false;

  @property({type: String}) adviceSecondaryValue = '';

  @property({type: String}) adviceDescription = '';

  @property({type: String}) adviceValueLength = '';

  @property({type: Boolean}) adviceHasHintedZeros = false;

  @property({type: String}) inputFormat: ReadoutInputFormat =
    ReadoutInputFormat.regular;

  /**
   * @deprecated Use `inputInteraction` where applicable.
   */
  @property({type: String}) inputInteractionMode?: ReadoutInputMode;

  @property({type: Boolean}) inputHasFixedLength = false;

  @property({type: String}) inputSecondaryValue = '';

  @property({type: String}) inputDescription = '';

  @property({type: String}) inputValueLength = '';

  @property({type: Boolean}) inputHasHintedZeros = false;

  @state() private sourcePickerContentVisible = false;

  @state() private sourcePickerOptions: ContextMenuOption[] = [];

  @query('slot[name="src-picker-content"]')
  private sourcePickerSlot?: HTMLSlotElement;

  private readonly onWindowPointerDown = (event: PointerEvent) => {
    if (!this.sourcePickerContentVisible) {
      return;
    }

    const path = event.composedPath();
    if (path.includes(this)) {
      return;
    }

    this.sourcePickerContentVisible = false;
  };

  private get isHorizontal() {
    return this.direction === ReadoutDirection.horizontal;
  }

  private get isVertical() {
    return this.direction === ReadoutDirection.vertical;
  }

  private get isEnhanced() {
    return this.variant === ReadoutVariant.enhanced;
  }

  private get isStack() {
    return this.variant === ReadoutVariant.stack;
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
    return this.variant === ReadoutVariant.regular && this.isHorizontal;
  }

  private priorityFor(element: ReadoutPriorityElement): Priority {
    const selected = Array.isArray(this.priorityElements)
      ? this.priorityElements
      : [];
    const priority = this.priority ?? Priority.regular;
    return selected.includes(element) ? priority : Priority.regular;
  }

  private isPriorityEnhanced(element: ReadoutPriorityElement): boolean {
    return this.priorityFor(element) === Priority.enhanced;
  }

  private resolveInputMode(): ReadoutInputMode | undefined {
    return this.inputInteractionMode;
  }

  private resolvedValueMode(): ReadoutInputMode | undefined {
    if (!this.inputInteractionRendered) {
      return undefined;
    }

    if (!this.isHorizontal) {
      return undefined;
    }

    if (this.interactionMode === ReadoutInputInteraction.alwaysVisible) {
      return ReadoutInputMode.input;
    }

    if (this.interactionMode === ReadoutInputInteraction.popUp) {
      return undefined;
    }

    return undefined;
  }

  private resolvedInputModeForInteraction(): ReadoutInputMode | undefined {
    if (!this.inputInteractionRendered) {
      return undefined;
    }

    if (this.isHorizontal) {
      if (this.interactionMode === ReadoutInputInteraction.alwaysVisible) {
        return undefined;
      }

      if (this.interactionMode === ReadoutInputInteraction.popUp) {
        return ReadoutInputMode.input;
      }
    }

    return this.resolveInputMode();
  }

  private resolveInputFormat(): ReadoutInputFormat | undefined {
    return this.inputFormat;
  }

  private get interactionMode(): ReadoutInputInteraction {
    return this.inputInteraction ?? ReadoutInputInteraction.alwaysVisible;
  }

  private get effectiveSetpointValue(): number | string | undefined {
    return this.setpointValue ?? this.inputValue;
  }

  private get isSetpointReached(): boolean {
    return this.value === this.effectiveSetpointValue;
  }

  private get shouldHideInputForInteraction(): boolean {
    if (!this.inputInteractionEnabled) {
      return false;
    }

    if (this.interactionMode === ReadoutInputInteraction.alwaysVisible) {
      return false;
    }

    if (
      this.interactionMode === ReadoutInputInteraction.popUp ||
      this.interactionMode === ReadoutInputInteraction.flipFlop
    ) {
      return this.isSetpointReached;
    }

    return false;
  }

  private resolvedInputVisible(): boolean {
    if (!this.hasInput) {
      return false;
    }

    if (this.readoutInputStyle === ReadoutInputStyle.hidden) {
      return false;
    }

    return true;
  }

  private get inputInteractionEnabled(): boolean {
    return this.resolvedInputVisible();
  }

  private get inputRendered(): boolean {
    return this.resolvedInputVisible() && !this.shouldHideInputForInteraction;
  }

  private get inputInteractionRendered(): boolean {
    return this.inputInteractionEnabled && this.inputRendered;
  }

  private resolvedInputPriorityFromStyle(): Priority {
    if (this.readoutInputStyle === ReadoutInputStyle.enhanced) {
      return Priority.enhanced;
    }

    return Priority.regular;
  }

  private get baseSize(): ReadoutInputSize {
    return this.variant === ReadoutVariant.regular
      ? ReadoutInputSize.medium
      : ReadoutInputSize.large;
  }

  private stepDownSize(size: ReadoutInputSize): ReadoutInputSize {
    switch (size) {
      case ReadoutInputSize.large:
        return ReadoutInputSize.medium;
      case ReadoutInputSize.medium:
        return ReadoutInputSize.regular;
      case ReadoutInputSize.regular:
        return ReadoutInputSize.small;
      default:
        return ReadoutInputSize.small;
    }
  }

  private get resolvedInputSegmentSize(): ReadoutInputSize {
    return this.baseSize;
  }

  private get resolvedValueInputSize(): ReadoutInputSize {
    if (!this.inputInteractionRendered) {
      return this.baseSize;
    }

    if (this.interactionMode === ReadoutInputInteraction.flipFlop) {
      if (this.variant === ReadoutVariant.regular) {
        return ReadoutInputSize.small;
      }

      return this.stepDownSize(this.resolvedInputSegmentSize);
    }

    return this.baseSize;
  }

  private get resolvedValuePriority(): Priority | undefined {
    if (this.valuePriority) {
      return this.valuePriority;
    }

    if (!this.inputInteractionRendered) {
      return this.variant === ReadoutVariant.enhanced
        ? Priority.enhanced
        : undefined;
    }

    if (this.interactionMode === ReadoutInputInteraction.alwaysVisible) {
      return Priority.enhanced;
    }

    if (this.interactionMode === ReadoutInputInteraction.flipFlop) {
      return Priority.enhanced;
    }

    if (this.interactionMode === ReadoutInputInteraction.popUp) {
      return Priority.enhanced;
    }

    if (this.variant === ReadoutVariant.enhanced) {
      return Priority.enhanced;
    }

    return undefined;
  }

  /**
   * Segment size mapping for nested input/advice segments.
   *
   * Mapping table (variant × direction):
   * - regular × vertical   → regular
   * - regular × horizontal → regular
   * - enhanced × vertical  → medium
   * - enhanced × horizontal→ medium
   * - stack × vertical     → medium
   * - stack × horizontal   → medium
   *
   * Rationale:
   * - Container must not rely on segment defaults (which are `small`).
   * - `regular` presentation uses regular-sized segments.
   * - `enhanced/stack` presentations use a larger segment baseline.
   */
  private get resolvedSegmentSize(): ReadoutInputSize {
    return this.variant === ReadoutVariant.regular
      ? ReadoutInputSize.regular
      : ReadoutInputSize.medium;
  }

  /**
   * Container-level layout decision for nested input/advice segments.
   *
   * - Hugging keeps icon + value compact (avoids full-width stretching).
   * - Non-hugging allows segments to participate in full-width compositions
   *   where left/right alignment is intentional.
   */
  private get shouldHugNestedSegments(): boolean {
    if (this.variant === ReadoutVariant.stack) {
      return false;
    }

    return this.hug;
  }

  private get resolvedSourceType(): ReadoutSourceType {
    if (this.sourceType) {
      return this.sourceType;
    }

    return this.variant === ReadoutVariant.regular ||
      ((this.variant === ReadoutVariant.enhanced ||
        this.variant === ReadoutVariant.stack) &&
        this.isVertical)
      ? ReadoutSourceType.small
      : ReadoutSourceType.regular;
  }

  private getSourcePickerNavigationItems() {
    const assignedElements =
      this.sourcePickerSlot?.assignedElements({flatten: true}) ?? [];

    return assignedElements.flatMap((element) => {
      if (!(element instanceof HTMLElement)) {
        return [];
      }

      if (element.localName === 'obc-navigation-item') {
        return [element];
      }

      return Array.from(element.querySelectorAll('obc-navigation-item'));
    });
  }

  private createSourcePickerOptionIcon(element: HTMLElement) {
    const iconElement = element.querySelector('[slot="icon"]');

    if (!(iconElement instanceof HTMLElement)) {
      return undefined;
    }

    return html`${iconElement.cloneNode(true)}`;
  }

  private getSourcePickerItemInfo(item: HTMLElement, index: number) {
    const itemWithValues = item as HTMLElement & {
      label?: string;
      value?: string;
    };
    const itemLabel = itemWithValues.label || item.getAttribute('label') || '';
    const itemValue =
      item.getAttribute('data-value') ||
      itemWithValues.value ||
      item.getAttribute('value') ||
      itemLabel ||
      `source-option-${index}`;

    return {itemLabel, itemValue};
  }

  private findSourcePickerOptionElement(value: string) {
    const navigationItems = this.getSourcePickerNavigationItems();
    for (const [index, item] of navigationItems.entries()) {
      const {itemValue} = this.getSourcePickerItemInfo(item, index);
      if (itemValue === value) {
        return item;
      }
    }
    return undefined;
  }

  private syncSourcePickerOptions() {
    const navigationItems = this.getSourcePickerNavigationItems();

    this.sourcePickerOptions = navigationItems.map((item, index) => {
      const {itemLabel, itemValue} = this.getSourcePickerItemInfo(item, index);

      return {
        value: itemValue,
        label: itemLabel,
        icon: this.createSourcePickerOptionIcon(item),
      };
    });
  }

  private handleSourcePickerItemClick(
    event: ObcContextMenuInputItemClickEvent
  ) {
    this.dispatchEvent(
      new CustomEvent('source-change', {
        bubbles: true,
        composed: true,
        detail: {
          value: event.detail.value,
          label: event.detail.option?.label,
        },
      })
    );
    this.findSourcePickerOptionElement(event.detail.value)?.click();
    this.sourcePickerContentVisible = false;
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (!changedProperties.has('sourcePickerContentVisible')) {
      return;
    }

    if (this.sourcePickerContentVisible) {
      window.addEventListener('pointerdown', this.onWindowPointerDown, true);
    } else {
      window.removeEventListener('pointerdown', this.onWindowPointerDown, true);
    }
  }

  private renderAdvice() {
    if (!this.hasAdvice) {
      return nothing;
    }

    const adviceSegmentSize =
      this.variant === ReadoutVariant.regular && this.isHorizontal
        ? this.resolvedInputSegmentSize
        : this.resolvedSegmentSize;

    return html`
      <div class="readout-segment-wrapper readout-advice" part="advice-wrapper">
        <slot name="advice">
          <obc-readout-advice
            data-obc-value-typography=${this.variant ===
              ReadoutVariant.regular && this.isVertical
              ? 'medium'
              : nothing}
            .readoutStyle=${this.variant}
            .direction=${this.direction}
            .size=${adviceSegmentSize}
            .hugContent=${this.shouldHugNestedSegments}
            .priority=${this.advicePriority ??
            (this.isPriorityEnhanced(ReadoutPriorityElement.advice)
              ? Priority.enhanced
              : undefined)}
            .format=${this.adviceFormat}
            .state=${this.adviceState}
            .hasFixedLength=${this.adviceHasFixedLength}
            .value=${this.adviceValue}
            .secondaryValue=${this.adviceSecondaryValue}
            .description=${this.adviceDescription}
            .valueLength=${this.adviceValueLength}
            .hasHintedZeros=${this.adviceHasHintedZeros}
            .fractionDigits=${this.fractionDigits}
            .hasDegree=${this.hasDegree}
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
    if (!this.inputRendered) {
      return nothing;
    }

    const inputReadoutStyle =
      this.isHorizontal &&
      this.interactionMode === ReadoutInputInteraction.alwaysVisible
        ? ReadoutVariant.regular
        : this.variant;
    const inputMode = this.resolvedInputModeForInteraction();

    return html`
      <div
        class=${classMap({
          'readout-segment-wrapper': true,
          'readout-input': true,
          'input-active':
            this.inputInteractionRendered &&
            this.interactionMode === ReadoutInputInteraction.popUp,
        })}
        part="input-wrapper"
      >
        <slot name="input">
          <obc-readout-input
            data-obc-value-typography=${this.variant ===
              ReadoutVariant.regular && this.isVertical
              ? 'medium'
              : nothing}
            .readoutStyle=${inputReadoutStyle}
            .direction=${this.direction}
            .size=${this.resolvedInputSegmentSize}
            .format=${this.resolveInputFormat()}
            .mode=${inputMode}
            .priority=${this.resolvedInputPriorityFromStyle()}
            .hugContent=${this.shouldHugNestedSegments}
            .hasFixedLength=${this.inputHasFixedLength}
            .value=${this.effectiveSetpointValue}
            .secondaryValue=${this.inputSecondaryValue}
            .description=${this.inputDescription}
            .valueLength=${this.inputValueLength}
            .hasHintedZeros=${this.inputHasHintedZeros}
            .fractionDigits=${this.fractionDigits}
            .hasDegree=${this.hasDegree}
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
          'value-active':
            this.inputInteractionRendered &&
            this.interactionMode === ReadoutInputInteraction.alwaysVisible,
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
      readoutType: this.variant,
      readoutDirection: this.direction,
      sourceHug: this.sourceHug,
      hasSourceLeadingIcon: this.hasSourceLeadingIcon,
      hasSourceTrailingIcon: this.hasSourceTrailingIcon,
      priorityEnhanced: this.isPriorityEnhanced(ReadoutPriorityElement.source),
      onTogglePicker: () => {
        this.sourcePickerContentVisible = !this.sourcePickerContentVisible;
      },
      onFlyoutClick: () => {
        this.dispatchEvent(
          new CustomEvent('source-flyout-click', {
            bubbles: true,
            composed: true,
            detail: {
              src: this.src,
              sourceType: this.resolvedSourceType,
            },
          })
        );
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
      <obc-context-menu-input
        .type=${ContextMenuType.Regular}
        .options=${this.sourcePickerOptions}
        .selectedValues=${this.src ? [this.src] : []}
        class="source-picker-content"
        @item-click=${this.handleSourcePickerItemClick}
        @close=${() => {
          this.sourcePickerContentVisible = false;
        }}
      ></obc-context-menu-input>
    `;
  }

  private renderSourcePickerSlot() {
    return html`
      <slot
        name="src-picker-content"
        hidden
        @slotchange=${this.syncSourcePickerOptions}
      ></slot>
    `;
  }

  private renderValueInput() {
    const elevateValueTypography =
      this.variant === ReadoutVariant.regular && this.isVertical;
    const valuePriority = this.resolvedValuePriority;
    const scopeValuePriority = valuePriority === Priority.enhanced;
    const valueReadoutStyle =
      (this.inputInteractionRendered &&
        this.interactionMode === ReadoutInputInteraction.flipFlop) ||
      (this.inputInteractionRendered &&
        this.isHorizontal &&
        this.interactionMode === ReadoutInputInteraction.popUp)
        ? ReadoutVariant.regular
        : this.variant;
    const valueMode = this.resolvedValueMode();

    return html`
      <obc-readout-input
        .variant=${ReadoutInputVariant.value}
        .readoutStyle=${valueReadoutStyle}
        .direction=${this.direction}
        .size=${this.resolvedValueInputSize}
        .mode=${valueMode}
        .hugContent=${this.shouldHugNestedSegments}
        data-obc-value-typography=${elevateValueTypography ? 'medium' : nothing}
        ?data-obc-priority-scoped=${scopeValuePriority}
        .priority=${valuePriority}
        .value=${this.value}
        .showZeroPadding=${this.showZeroPadding}
        .maxDigits=${this.maxDigits}
        .fractionDigits=${this.fractionDigits}
        .hasFixedLength=${this.valueHasFixedLength}
        .valueLength=${this.valueLength}
        .hasHintedZeros=${this.valueHasHintedZeros}
        .hasDegree=${this.hasDegree}
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
        ${this.variant === ReadoutVariant.regular && this.isHorizontal
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
          ${this.renderInput()} ${this.renderInputDivider()}
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
          [this.variant]: true,
          [this.direction]: true,
          'alignment-left': this.alignment === 'left',
          'alignment-center': this.alignment === 'center',
          'alignment-vertical': this.alignment === 'vertical',
          'interaction-always-visible':
            this.inputInteractionEnabled &&
            this.interactionMode === ReadoutInputInteraction.alwaysVisible,
          'interaction-flip-flop':
            this.inputInteractionEnabled &&
            this.interactionMode === ReadoutInputInteraction.flipFlop,
          'interaction-pop-up':
            this.inputInteractionEnabled &&
            this.interactionMode === ReadoutInputInteraction.popUp,
          'alert-none': this.alertState === ReadoutAlertState.none,
          'alert-low-integrity':
            this.alertState === ReadoutAlertState.lowIntegrity,
          'alert-invalid': this.alertState === ReadoutAlertState.invalid,
          'alert-caution': this.alertState === ReadoutAlertState.caution,
          'alert-warning': this.alertState === ReadoutAlertState.warning,
          'alert-alarm': this.alertState === ReadoutAlertState.alarm,
          'has-source': this.hasSrc,
          'has-input': this.hasInput,
          'has-input-button':
            this.isHorizontal && this.inputFormat === ReadoutInputFormat.button,
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
              priorityEnhanced: this.isPriorityEnhanced(
                ReadoutPriorityElement.meta
              ),
            })
          : nothing}
        ${!this.labelOnly && this.hasSrc && this.isVertical
          ? this.renderSource()
          : nothing}
        ${!this.labelOnly && this.isHorizontal
          ? this.renderHorizontalLayout()
          : nothing}
        ${this.renderSourcePickerSlot()}
      </div>
      ${this.renderSourcePickerContent()}
    `;
  }

  static override styles = unsafeCSS(componentStyle);

  override disconnectedCallback() {
    window.removeEventListener('pointerdown', this.onWindowPointerDown, true);
    super.disconnectedCallback();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-readout': ObcReadout;
  }
}
