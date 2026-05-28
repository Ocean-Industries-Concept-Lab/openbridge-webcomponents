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
  ReadoutSetpointMode,
  ReadoutSetpointFormat,
  ReadoutSetpointVariant,
  ReadoutSetpointSize,
} from '../readout-setpoint/readout-setpoint.js';
import '../readout-setpoint/readout-setpoint.js';

export enum ReadoutVariant {
  regular = 'regular',
  enhanced = 'enhanced',
  stack = 'stack',
}

export enum ReadoutAlertState {
  none = 'none',
  lowIntegrity = 'low-integrity',
  invalid = 'invalid',
  caution = 'caution',
  warning = 'warning',
  alarm = 'alarm',
}

export enum ReadoutSetpointInteraction {
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

export {ReadoutSourceType};

/**
 * `<obc-readout>` – A component for displaying navigation instrument data.
 *
 * This component is used to show a primary value, optional advice and setpoint segments, units, a label, and a source (e.g., GPS, Gyro).
 * It supports different readout styles, horizontal/vertical layouts, and configurable numeric formatting.
 *
 * ### Features
 * - **Readout Styles:** Supports `regular`, `enhanced`, and `stack` presentations.
 * - **Segments:** Optional advice, setpoint, and leading icon display in addition to the main value.
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
 * | setpoint            | Replaces the fallback setpoint segment when `hasSetpoint` is true.         |
 * | setpoint-icon       | Replaces the fallback setpoint icon when `hasSetpoint` is true.            |
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
 * @slot setpoint - Replaces the fallback setpoint segment.
 * @slot setpoint-icon - Replaces the fallback setpoint icon.
 * @slot leading-icon - Replaces the fallback leading icon beside the value.
 * @slot value - Replaces the formatted main value content.
 * @slot label - Replaces the label content.
 * @slot unit - Replaces the unit content.
 * @slot source - Replaces the source row content.
 * @slot src-picker-content - Provides the source picker context menu content.
 */
@customElement('obc-readout')
export class ObcReadout extends LitElement {
  @property({type: Number}) value?: number;
  @property({type: Boolean}) hasSetpoint = false;
  @property({type: Number}) setpointValue?: number;
  @property({type: String}) variant: ReadoutVariant = ReadoutVariant.regular;
  @property({type: Boolean}) hasDegree = false;
  @property({type: String}) label = '';
  @property({type: String}) unit?: string;
  @property({type: String}) src?: string;
  @property({type: Boolean}) off = false;
  @property({type: String}) valuePriority?: Priority;
  @property({type: String}) alertState: ReadoutAlertState =
    ReadoutAlertState.none;
  @property({type: String}) setpointInteraction: ReadoutSetpointInteraction =
    ReadoutSetpointInteraction.alwaysVisible;
  @property({type: String}) direction: ReadoutDirection =
    ReadoutDirection.vertical;

  /**
   * Override the size of the setpoint segment (when `hasSetpoint` is true).
   *
   * - In `alwaysVisible` and `popUp` interaction modes: any size value applies.
   * - In `flipFlop` mode: the override is honored only when strictly smaller
   *   than the variant's base size (medium for `regular`, large for
   *   `enhanced`/`stack`). Larger overrides are ignored, falling back to the
   *   default secondary size to preserve the flip-flop visual effect and
   *   prevent setpoint/value overlap.
   *
   * When unset, the setpoint size is derived from `variant` (and adjusted for
   * multi-line formats).
   */
  @property({type: String}) setpointSize?: ReadoutSetpointSize;
  @property({type: String})
  alignment: ReadoutStackVerticalAlignment =
    ReadoutStackVerticalAlignment.vertical;
  @property({type: Boolean}) hug = false;
  @property({type: Boolean}) hasSetpointDivider = false;
  @property({type: Boolean}) hasSourceDivider = false;
  @property({type: Boolean}) showZeroPadding = false;
  @property({type: Number}) fractionDigits = 0;
  @property({type: Number}) minValueLength = 0;
  @property({type: Boolean}) valueHasHintedZeros = false;

  @property({type: Boolean}) labelOnly = false;
  @property({type: Boolean}) hasSrcPicker = false;
  @property({type: Number}) sourceDeltaValue = 0;
  @property({type: String}) sourceType?: ReadoutSourceType;
  @property({type: Boolean}) hasLeadingIcon = false;

  @property({type: Boolean, attribute: false}) sourceHug = true;
  @property({type: Boolean}) hasSourceLeadingIcon = false;
  @property({type: Boolean, attribute: false}) hasSourceTrailingIcon = true;
  @property({type: Boolean}) hasAdvice = false;
  @property({type: Number}) adviceValue?: number;
  @property({type: String}) adviceFormat: ReadoutAdviceFormat =
    ReadoutAdviceFormat.regular;
  @property({type: String}) adviceState: ReadoutAdviceState =
    ReadoutAdviceState.enabled;
  @property({type: Number}) adviceSecondaryValue: number | undefined =
    undefined;
  @property({type: String}) adviceDescription = '';
  @property({type: Boolean}) adviceHasHintedZeros = false;
  @property({type: String}) setpointFormat: ReadoutSetpointFormat =
    ReadoutSetpointFormat.regular;
  @property({type: Number}) setpointSecondaryValue: number | undefined =
    undefined;
  @property({type: String}) setpointDescription = '';
  @property({type: Boolean}) setpointHasHintedZeros = false;

  @state()
  private deferredSetpointHidePhase: 'none' | 'hiding' | 'hidden' = 'none';
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

  private deferredSetpointHideTimer: number | undefined;

  private hasCompletedFirstUpdate = false;

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

  private get hasSrc() {
    return this.src !== undefined && this.src.trim() !== '';
  }

  private get showAdviceDivider() {
    return this.isHorizontal && this.hasAdvice && this.hasSetpoint;
  }

  private get showSetpointDivider() {
    return (
      this.hasSetpointDivider &&
      this.hasSetpoint &&
      (this.setpointRendered || this.setpointLayoutReserved)
    );
  }

  private get showSourceDivider() {
    return this.hasSourceDivider && this.hasSrc;
  }

  private get showUnitZone() {
    return this.variant === ReadoutVariant.regular && this.isHorizontal;
  }

  private get shouldRenderReadoutMetaZone(): boolean {
    return Boolean(this.label || this.unit || this.labelOnly);
  }

  private resolvedValueMode(): ReadoutSetpointMode | undefined {
    if (!this.setpointInteractionRendered) {
      return undefined;
    }

    if (!this.isHorizontal) {
      return undefined;
    }

    if (this.interactionMode === ReadoutSetpointInteraction.alwaysVisible) {
      return ReadoutSetpointMode.setpoint;
    }

    if (this.interactionMode === ReadoutSetpointInteraction.popUp) {
      return undefined;
    }

    return undefined;
  }

  private resolvedSetpointModeForInteraction():
    | ReadoutSetpointMode
    | undefined {
    if (this.isHorizontal) {
      if (this.interactionMode === ReadoutSetpointInteraction.alwaysVisible) {
        return undefined;
      }

      if (this.interactionMode === ReadoutSetpointInteraction.popUp) {
        return ReadoutSetpointMode.setpoint;
      }
    }

    return undefined;
  }

  private resolveSetpointFormat(): ReadoutSetpointFormat | undefined {
    return this.setpointFormat;
  }

  private get interactionMode(): ReadoutSetpointInteraction {
    return this.setpointInteraction;
  }

  private get isSetpointReached(): boolean {
    return this.value === this.setpointValue;
  }

  private get flipFlopValueFocused(): boolean {
    return (
      this.interactionMode === ReadoutSetpointInteraction.flipFlop &&
      this.isSetpointReached
    );
  }

  private get flipFlopSetpointFocused(): boolean {
    return (
      this.interactionMode === ReadoutSetpointInteraction.flipFlop &&
      !this.isSetpointReached
    );
  }

  private get shouldHideSetpointForInteraction(): boolean {
    if (!this.setpointInteractionEnabled) {
      return false;
    }

    if (this.interactionMode === ReadoutSetpointInteraction.alwaysVisible) {
      return false;
    }

    if (this.interactionMode === ReadoutSetpointInteraction.popUp) {
      return (
        this.isSetpointReached && this.deferredSetpointHidePhase === 'hidden'
      );
    }

    return false;
  }

  private resolvedSetpointVisible(): boolean {
    if (!this.hasSetpoint) {
      return false;
    }

    return true;
  }

  private get setpointInteractionEnabled(): boolean {
    return this.resolvedSetpointVisible();
  }

  private get setpointRendered(): boolean {
    return (
      this.resolvedSetpointVisible() && !this.shouldHideSetpointForInteraction
    );
  }

  private get setpointInteractionRendered(): boolean {
    return this.setpointInteractionEnabled && this.setpointRendered;
  }

  private get setpointLayoutReserved(): boolean {
    if (
      !this.setpointInteractionEnabled ||
      this.interactionMode !== ReadoutSetpointInteraction.popUp
    ) {
      return false;
    }

    if (this.isHorizontal && this.deferredSetpointHidePhase === 'hidden') {
      return false;
    }

    return true;
  }

  private get hasInteractiveSetpointContext(): boolean {
    if (this.interactionMode === ReadoutSetpointInteraction.flipFlop) {
      return this.hasSetpoint;
    }

    if (this.setpointInteractionRendered || this.setpointLayoutReserved) {
      return true;
    }

    return (
      this.setpointInteractionEnabled &&
      this.isHorizontal &&
      this.interactionMode === ReadoutSetpointInteraction.popUp &&
      this.deferredSetpointHidePhase === 'hidden'
    );
  }

  private get resolvedSetpointPriority(): Priority {
    return this.resolvedValuePriority ?? Priority.regular;
  }

  private get baseSize(): ReadoutSetpointSize {
    return this.variant === ReadoutVariant.regular
      ? ReadoutSetpointSize.medium
      : ReadoutSetpointSize.large;
  }

  private stepDownSize(size: ReadoutSetpointSize): ReadoutSetpointSize {
    switch (size) {
      case ReadoutSetpointSize.large:
        return ReadoutSetpointSize.medium;
      case ReadoutSetpointSize.medium:
        return ReadoutSetpointSize.regular;
      case ReadoutSetpointSize.regular:
        return ReadoutSetpointSize.small;
      default:
        return ReadoutSetpointSize.small;
    }
  }

  private static readonly READOUT_SETPOINT_SIZE_ORDER: ReadoutSetpointSize[] = [
    ReadoutSetpointSize.small,
    ReadoutSetpointSize.regular,
    ReadoutSetpointSize.medium,
    ReadoutSetpointSize.large,
  ];

  private sizeRank(size: ReadoutSetpointSize): number {
    return ObcReadout.READOUT_SETPOINT_SIZE_ORDER.indexOf(size);
  }

  private get isMultiLineSetpointFormat(): boolean {
    return (
      this.setpointFormat === ReadoutSetpointFormat.description ||
      this.setpointFormat === ReadoutSetpointFormat.range
    );
  }

  private get resolvedSetpointSegmentSize(): ReadoutSetpointSize {
    if (this.interactionMode === ReadoutSetpointInteraction.flipFlop) {
      if (this.flipFlopSetpointFocused) {
        return this.baseSize;
      }

      const secondarySize =
        this.variant === ReadoutVariant.regular
          ? ReadoutSetpointSize.small
          : this.stepDownSize(this.baseSize);

      if (
        this.setpointSize &&
        this.sizeRank(this.setpointSize) < this.sizeRank(this.baseSize)
      ) {
        return this.setpointSize;
      }

      return secondarySize;
    }

    if (this.setpointSize) {
      return this.setpointSize;
    }

    if (
      this.isMultiLineSetpointFormat &&
      this.variant !== ReadoutVariant.regular
    ) {
      return this.stepDownSize(this.baseSize);
    }

    return this.baseSize;
  }

  private get resolvedValueSetpointSize(): ReadoutSetpointSize {
    if (this.interactionMode === ReadoutSetpointInteraction.flipFlop) {
      const secondarySize =
        this.variant === ReadoutVariant.regular
          ? ReadoutSetpointSize.small
          : this.stepDownSize(this.baseSize);
      return this.flipFlopValueFocused ? this.baseSize : secondarySize;
    }

    return this.baseSize;
  }

  private get resolvedValuePriority(): Priority | undefined {
    if (this.valuePriority) {
      return this.valuePriority;
    }

    if (!this.hasInteractiveSetpointContext) {
      return this.variant === ReadoutVariant.enhanced
        ? Priority.enhanced
        : undefined;
    }

    if (this.interactionMode === ReadoutSetpointInteraction.alwaysVisible) {
      return Priority.enhanced;
    }

    if (this.interactionMode === ReadoutSetpointInteraction.flipFlop) {
      return Priority.enhanced;
    }

    if (this.interactionMode === ReadoutSetpointInteraction.popUp) {
      return Priority.enhanced;
    }

    if (this.variant === ReadoutVariant.enhanced) {
      return Priority.enhanced;
    }

    return undefined;
  }

  /**
   * Segment size mapping for nested setpoint/advice segments.
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
  private get resolvedSegmentSize(): ReadoutSetpointSize {
    return this.variant === ReadoutVariant.regular
      ? ReadoutSetpointSize.regular
      : ReadoutSetpointSize.medium;
  }

  /**
   * Container-level layout decision for nested setpoint/advice segments.
   *
   * - **Enhanced**: nested segments use full-width layout (`hugContent` off)
   *   regardless of readout `hug` (icon at the left edge, value at the right).
   * - **Regular / stack**: nested segments follow readout `hug` — compact when
   *   `hug` is true, stretched when `hug` is false.
   */
  private get shouldHugNestedSegments(): boolean {
    if (this.variant === ReadoutVariant.enhanced) {
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

    if (changedProperties.has('sourcePickerContentVisible')) {
      // TODO: Implement this in html instead.
      if (this.sourcePickerContentVisible) {
        window.addEventListener('pointerdown', this.onWindowPointerDown, true);
      } else {
        window.removeEventListener(
          'pointerdown',
          this.onWindowPointerDown,
          true
        );
      }
    }

    if (
      !(
        changedProperties.has('value') ||
        changedProperties.has('setpointValue') ||
        changedProperties.has('hasSetpoint') ||
        changedProperties.has('setpointInteraction')
      )
    ) {
      return;
    }

    if (this.interactionMode !== ReadoutSetpointInteraction.popUp) {
      this.deferredSetpointHidePhase = 'none';
      window.clearTimeout(this.deferredSetpointHideTimer);
      this.deferredSetpointHideTimer = undefined;
      return;
    }

    const shouldHideSetpoint = this.hasSetpoint && this.isSetpointReached;

    if (!this.hasCompletedFirstUpdate) {
      this.deferredSetpointHidePhase = shouldHideSetpoint ? 'hidden' : 'none';
      return;
    }

    if (!shouldHideSetpoint) {
      this.deferredSetpointHidePhase = 'none';
      window.clearTimeout(this.deferredSetpointHideTimer);
      this.deferredSetpointHideTimer = undefined;
      return;
    }

    if (this.deferredSetpointHidePhase !== 'none') {
      return;
    }

    this.deferredSetpointHidePhase = 'hiding';
    window.clearTimeout(this.deferredSetpointHideTimer);
    this.deferredSetpointHideTimer = window.setTimeout(() => {
      this.deferredSetpointHidePhase = 'hidden';
      this.deferredSetpointHideTimer = undefined;
    }, 160);
  }

  override firstUpdated() {
    this.hasCompletedFirstUpdate = true;
  }

  private renderAdvice() {
    if (!this.hasAdvice) {
      return nothing;
    }

    const adviceSegmentSize =
      this.variant === ReadoutVariant.regular && this.isHorizontal
        ? this.resolvedSetpointSegmentSize
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
            .priority=${this.resolvedValuePriority}
            .format=${this.adviceFormat}
            .state=${this.adviceState}
            .value=${this.adviceValue}
            .secondaryValue=${this.adviceSecondaryValue}
            .description=${this.adviceDescription}
            .minValueLength=${this.minValueLength}
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

  private renderSetpoint() {
    if (!this.hasSetpoint) {
      return nothing;
    }

    if (!this.setpointRendered && !this.setpointLayoutReserved) {
      return nothing;
    }

    const setpointReadoutStyle =
      this.isHorizontal &&
      this.interactionMode === ReadoutSetpointInteraction.alwaysVisible
        ? ReadoutVariant.regular
        : this.variant;
    const setpointMode = this.resolvedSetpointModeForInteraction();

    return html`
      <div
        class=${classMap({
          'readout-segment-wrapper': true,
          'readout-setpoint': true,
          'setpoint-hiding':
            this.interactionMode === ReadoutSetpointInteraction.popUp &&
            this.deferredSetpointHidePhase === 'hiding',
          'setpoint-hidden':
            this.interactionMode === ReadoutSetpointInteraction.popUp &&
            this.deferredSetpointHidePhase === 'hidden',
          'setpoint-active':
            this.setpointInteractionEnabled &&
            this.interactionMode === ReadoutSetpointInteraction.popUp,
        })}
        part="setpoint-wrapper"
      >
        <slot name="setpoint">
          <obc-readout-setpoint
            data-obc-value-typography=${this.variant ===
              ReadoutVariant.regular &&
            this.isVertical &&
            this.resolvedSetpointSegmentSize === ReadoutSetpointSize.medium
              ? 'medium'
              : nothing}
            ?data-obc-tabular-nums=${this.interactionMode ===
            ReadoutSetpointInteraction.flipFlop}
            .readoutStyle=${setpointReadoutStyle}
            .direction=${this.direction}
            .size=${this.resolvedSetpointSegmentSize}
            .format=${this.resolveSetpointFormat()}
            .mode=${setpointMode}
            .priority=${this.resolvedSetpointPriority}
            .hugContent=${this.shouldHugNestedSegments}
            .value=${this.setpointValue}
            .secondaryValue=${this.setpointSecondaryValue}
            .description=${this.setpointDescription}
            .minValueLength=${this.minValueLength}
            .hasHintedZeros=${this.setpointHasHintedZeros}
            .fractionDigits=${this.fractionDigits}
            .hasDegree=${this.hasDegree}
          >
            <slot name="setpoint-icon" slot="icon">
              <obi-input-right slot="icon"></obi-input-right>
            </slot>
          </obc-readout-setpoint>
        </slot>
      </div>
    `;
  }

  private renderSetpointDivider() {
    if (!this.showSetpointDivider) {
      return nothing;
    }

    return html`<div class="setpoint-divider" part="setpoint-divider"></div>`;
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
            this.setpointInteractionRendered &&
            (this.interactionMode ===
              ReadoutSetpointInteraction.alwaysVisible ||
              this.flipFlopValueFocused),
        })}
        part="value-wrapper"
      >
        ${this.renderValueInput()}
      </div>
    `;
  }

  private renderSource() {
    if (!this.hasSrc) {
      return nothing;
    }

    return renderReadoutSource({
      hasSrc: this.hasSrc,
      hasSrcPicker:
        this.hasSrcPicker &&
        supportsReadoutSourcePicker(this.resolvedSourceType),
      src: this.src ?? '',
      sourceDeltaValue: this.sourceDeltaValue,
      sourceType: this.resolvedSourceType,
      readoutType: this.variant,
      readoutDirection: this.direction,
      sourceHug: this.sourceHug,
      hasSourceLeadingIcon: this.hasSourceLeadingIcon,
      hasSourceTrailingIcon: this.hasSourceTrailingIcon,
      fractionDigits: this.fractionDigits,
      onTogglePicker: () => {
        this.sourcePickerContentVisible = !this.sourcePickerContentVisible;
      },
      onFlyoutClick: () => {
        this.dispatchEvent(
          new CustomEvent('source-flyout-click', {
            bubbles: true,
            composed: true,
            detail: {
              src: this.src ?? '',
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
      (this.hasInteractiveSetpointContext &&
        this.interactionMode === ReadoutSetpointInteraction.flipFlop) ||
      (this.hasInteractiveSetpointContext &&
        this.isHorizontal &&
        this.interactionMode === ReadoutSetpointInteraction.popUp)
        ? ReadoutVariant.regular
        : this.variant;
    const valueMode = this.resolvedValueMode();

    return html`
      <obc-readout-setpoint
        .variant=${ReadoutSetpointVariant.value}
        .readoutStyle=${valueReadoutStyle}
        .direction=${this.direction}
        .size=${this.resolvedValueSetpointSize}
        .mode=${valueMode}
        .hugContent=${this.shouldHugNestedSegments}
        data-obc-value-typography=${elevateValueTypography ? 'medium' : nothing}
        ?data-obc-tabular-nums=${this.interactionMode ===
        ReadoutSetpointInteraction.flipFlop}
        ?data-obc-priority-scoped=${scopeValuePriority}
        .priority=${valuePriority}
        .value=${this.value}
        .showZeroPadding=${this.showZeroPadding}
        .minValueLength=${this.minValueLength}
        .fractionDigits=${this.fractionDigits}
        .hasHintedZeros=${this.valueHasHintedZeros}
        .hasDegree=${this.hasDegree}
        .off=${this.off}
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
      </obc-readout-setpoint>
    `;
  }

  private renderHorizontalValueUnitZone(hasUnit: boolean) {
    return html`
      <div
        class="readout-segment-wrapper readout-value-unit-wrapper"
        part="value-unit-wrapper"
      >
        ${this.renderValueInput()}
        ${hasUnit && this.unit ? renderReadoutUnitZone(this.unit) : nothing}
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
          ? renderReadoutLabelZone(this.label)
          : nothing}
        ${this.isEnhanced &&
        this.isHorizontal &&
        this.shouldRenderReadoutMetaZone
          ? renderReadoutMetaZone({
              labelValue: this.label,
              unitValue: this.unit,
            })
          : nothing}
        <div
          class="readout-segment-wrapper readout-inline-value-wrapper"
          part="inline-value-wrapper"
        >
          ${this.hasAdvice ? this.renderAdvice() : nothing}
          ${this.hasAdvice ? this.renderAdviceDivider() : nothing}
          ${this.renderSetpoint()} ${this.renderSetpointDivider()}
          ${this.showUnitZone
            ? this.renderHorizontalValueUnitZone(true)
            : html`${this.renderValueInput()}`}
          ${this.isStack &&
          this.isHorizontal &&
          this.shouldRenderReadoutMetaZone
            ? renderReadoutMetaZone({
                labelValue: this.label,
                unitValue: this.unit,
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
            this.interactionMode === ReadoutSetpointInteraction.alwaysVisible,
          'interaction-flip-flop':
            this.setpointInteractionEnabled &&
            this.interactionMode === ReadoutSetpointInteraction.flipFlop,
          'interaction-pop-up':
            this.setpointInteractionEnabled &&
            this.interactionMode === ReadoutSetpointInteraction.popUp,
          'focus-setpoint':
            this.setpointInteractionEnabled && this.flipFlopSetpointFocused,
          'focus-value':
            this.setpointInteractionEnabled && this.flipFlopValueFocused,
          'alert-none': this.alertState === ReadoutAlertState.none,
          'alert-low-integrity':
            this.alertState === ReadoutAlertState.lowIntegrity,
          'alert-invalid': this.alertState === ReadoutAlertState.invalid,
          'alert-caution': this.alertState === ReadoutAlertState.caution,
          'alert-warning': this.alertState === ReadoutAlertState.warning,
          'alert-alarm': this.alertState === ReadoutAlertState.alarm,
          'has-source': this.hasSrc,
          'has-setpoint': this.hasSetpoint,
          'has-setpoint-button':
            this.isHorizontal &&
            this.setpointFormat === ReadoutSetpointFormat.button,
          'no-hug': !this.hug,
          'label-only': this.labelOnly,
        })}
      >
        ${!this.labelOnly && this.isVertical ? this.renderAdvice() : nothing}
        ${!this.labelOnly && this.isVertical ? this.renderSetpoint() : nothing}
        ${!this.labelOnly && this.isVertical ? this.renderValueZone() : nothing}
        ${(this.labelOnly || this.isVertical) &&
        this.shouldRenderReadoutMetaZone
          ? renderReadoutMetaZone({
              labelValue: this.label,
              unitValue: this.unit,
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
    window.clearTimeout(this.deferredSetpointHideTimer);
    super.disconnectedCallback();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-readout': ObcReadout;
  }
}
