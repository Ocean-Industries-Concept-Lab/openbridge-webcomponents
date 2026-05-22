import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './readout-list-item.css?inline';
import {customElement} from '../../decorator.js';
import {ReadoutInputSize} from '../readout-input/readout-input.js';
import {ReadoutInputValueTypography} from '../readout-input/readout-input.js';
import {Priority} from '../types.js';
import '../readout-input/readout-input.js';
import '../../icons/icon-input-right.js';
import {ReadoutInputMode} from '../readout-input/readout-input.js';

export enum ReadoutListItemAlertState {
  none = 'none',
  lowIntegrity = 'low-integrity',
  invalid = 'invalid',
  caution = 'caution',
  warning = 'warning',
  alarm = 'alarm',
}

export enum ReadoutListItemSize {
  base = 'base',
  priority = 'priority',
  enhanced = 'enhanced',
}

export enum ReadoutListItemStacking {
  trailingUnit = 'trailing-unit',
  leadingUnit = 'leading-unit',
  leadingSrc = 'leading-src',
}

export enum ReadoutListItemPriority {
  regular = 'regular',
  enhanced = 'enhanced',
  input = 'input',
  inputFlipFlop = 'input-flip-flop',
}

/**
 * `<obc-readout-list-item>` – A compact inline readout row for lists.
 *
 * Renders a compact label/value/unit composition with a dedicated size scale and stacking modes for unit and source placement. Use it when you need dense, consistent readout rows in tables or lists without bringing in the full `<obc-readout>` segment layout.
 *
 * ### Features
 * - **Sizes:** `base`, `priority`, and `enhanced` typography/padding scales.
 * - **Stacking modes:** `trailing-unit`, `leading-unit`, and `leading-src` control where unit/source appear relative to the label/value.
 * - **Priority styling:** `priority` controls emphasis and input presentation (`regular`, `enhanced`, `input`, `input-flip-flop`).
 * - **Alert states:** Supports `alertState` styling for integrity/invalid and attention states (`caution`, `warning`, `alarm`).
 * - **Formatting:** Supports numeric formatting, fixed-length width templates, hinted zeros, and optional degree suffix (`°`).
 *
 * ### Usage Guidelines
 * Use this component for dense readouts in list contexts. Prefer `<obc-readout>` when you need multi-segment advice/input/source composition, rich layouts, or source picker/flyout behavior.
 *
 * ### Slots
 * | Slot Name     | Renders When             | Purpose |
 * |---------------|--------------------------|---------|
 * | leading-icon  | `hasLeadingIcon` is true | Optional leading icon before the label. |
 * | value-icon    | `hasValueIcon` is true   | Optional icon next to the value. |
 *
 * @slot leading-icon - Optional leading icon before the label.
 * @slot value-icon - Optional icon next to the value.
 */
@customElement('obc-readout-list-item')
export class ObcReadoutListItem extends LitElement {
  @property({type: String}) size: ReadoutListItemSize =
    ReadoutListItemSize.base;
  @property({type: String})
  stacking: ReadoutListItemStacking = ReadoutListItemStacking.trailingUnit;
  @property({type: String})
  priority: ReadoutListItemPriority = ReadoutListItemPriority.regular;
  @property({type: String})
  alertState: ReadoutListItemAlertState = ReadoutListItemAlertState.none;

  @property({type: String}) label = '';
  @property({type: String}) unit = '';
  @property({type: String}) src = '';

  @property() value: number | string | undefined = undefined;
  @property() inputValue: number | string | undefined = undefined;

  @property({type: Boolean}) hasInput = false;

  @property({type: Boolean}) hasDegree = false;
  @property({type: Boolean}) hasUnit = false;
  @property({type: Boolean}) hasLabel = false;
  @property({type: Boolean}) hasSource = false;
  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: Boolean}) hasValueIcon = false;

  @property({type: Number}) maxDigits = 1;
  @property({type: Number}) fractionDigits = 0;
  @property({type: Boolean}) showZeroPadding = false;

  @property({type: Boolean}) hasFixedLength = false;
  @property({type: String}) valueLength = '';
  @property({type: Boolean}) hasHintedZeros = false;

  private get resolvedMainValueSize(): ReadoutInputSize {
    return this.size === ReadoutListItemSize.enhanced
      ? ReadoutInputSize.large
      : this.size === ReadoutListItemSize.priority
        ? ReadoutInputSize.medium
        : ReadoutInputSize.regular;
  }

  private get resolvedValueSize(): ReadoutInputSize {
    if (this.priority === ReadoutListItemPriority.inputFlipFlop) {
      if (this.size === ReadoutListItemSize.priority) {
        return ReadoutInputSize.small;
      }

      if (this.size === ReadoutListItemSize.enhanced) {
        return ReadoutInputSize.regular;
      }
    }

    if (this.size === ReadoutListItemSize.enhanced) {
      return ReadoutInputSize.large;
    }
    return ReadoutInputSize.regular;
  }

  private get resolvedValueTypography():
    | ReadoutInputValueTypography
    | undefined {
    if (
      this.priority === ReadoutListItemPriority.inputFlipFlop &&
      this.resolvedValueSize === ReadoutInputSize.small
    ) {
      return undefined;
    }

    if (
      this.priority === ReadoutListItemPriority.inputFlipFlop &&
      this.size === ReadoutListItemSize.enhanced
    ) {
      return ReadoutInputValueTypography.regular;
    }

    switch (this.size) {
      case ReadoutListItemSize.enhanced:
        return ReadoutInputValueTypography.large;
      case ReadoutListItemSize.priority:
        return ReadoutInputValueTypography.medium;
      case ReadoutListItemSize.base:
      default:
        return ReadoutInputValueTypography.regular;
    }
  }

  private get resolvedInputSize(): ReadoutInputSize {
    if (!this.hasInput) {
      return ReadoutInputSize.small;
    }

    if (
      this.priority === ReadoutListItemPriority.input ||
      this.priority === ReadoutListItemPriority.inputFlipFlop
    ) {
      return this.resolvedMainValueSize;
    }

    return ReadoutInputSize.small;
  }

  private get resolvedActualPriority(): Priority {
    if (
      this.priority === ReadoutListItemPriority.enhanced ||
      (this.priority === ReadoutListItemPriority.input && !this.hasInput) ||
      this.priority === ReadoutListItemPriority.inputFlipFlop
    ) {
      return Priority.enhanced;
    }

    return Priority.regular;
  }

  private get resolvedActualMode(): ReadoutInputMode {
    return this.priority === ReadoutListItemPriority.enhanced
      ? ReadoutInputMode.input
      : ReadoutInputMode.display;
  }

  private get resolvedInputPriority(): Priority {
    if (!this.hasInput || this.priority === ReadoutListItemPriority.regular) {
      return Priority.regular;
    }

    return Priority.enhanced;
  }

  private get resolvedInputMode(): ReadoutInputMode {
    if (this.hasInput && this.priority === ReadoutListItemPriority.input) {
      return ReadoutInputMode.input;
    }
    return ReadoutInputMode.display;
  }

  private get showsTrailingSource(): boolean {
    return (
      this.hasSource && this.stacking !== ReadoutListItemStacking.leadingSrc
    );
  }

  private get stacksLeadingUnitVertically(): boolean {
    return (
      this.stacking === ReadoutListItemStacking.leadingUnit &&
      this.size === ReadoutListItemSize.enhanced
    );
  }

  private get stacksLeadingSrcVertically(): boolean {
    return (
      this.stacking === ReadoutListItemStacking.leadingSrc &&
      this.size === ReadoutListItemSize.enhanced
    );
  }

  private renderLabelContainer() {
    if (!this.hasLabel) {
      return nothing;
    }

    const showsLeadingUnit =
      this.stacking === ReadoutListItemStacking.leadingUnit && this.hasUnit;
    const showsLeadingSrc =
      this.stacking === ReadoutListItemStacking.leadingSrc && this.hasSource;

    if (showsLeadingUnit && !this.stacksLeadingUnitVertically) {
      return html`
        <div class="label-inline" part="label-inline">
          <div class="label" part="label">${this.label}</div>
          <div class="unit unit-leading" part="unit-leading">${this.unit}</div>
        </div>
      `;
    }

    if (showsLeadingSrc && !this.stacksLeadingSrcVertically) {
      return html`
        <div class="label-inline" part="label-inline">
          <div class="label" part="label">${this.label}</div>
          <div class="source source-inline" part="source-inline">
            ${this.src}
          </div>
        </div>
      `;
    }

    return html`
      <div class="label-stack" part="label-stack">
        <div class="label" part="label">${this.label}</div>
        ${showsLeadingUnit
          ? html`<div class="unit unit-leading" part="unit-leading">
              ${this.unit}
            </div>`
          : nothing}
        ${showsLeadingSrc
          ? html`<div class="source source-inline" part="source-inline">
              ${this.src}
            </div>`
          : nothing}
      </div>
    `;
  }

  private renderValueIconSlot() {
    if (!this.hasValueIcon) {
      return nothing;
    }
    return html`<span class="value-icon" slot="icon" aria-hidden="true">
      <slot name="value-icon"></slot>
    </span>`;
  }

  private renderInput() {
    if (!this.hasInput) {
      return nothing;
    }

    return html`
      <obc-readout-input
        .variant=${'input'}
        .readoutStyle=${'regular'}
        .direction=${'horizontal'}
        .size=${this.resolvedInputSize}
        .priority=${this.resolvedInputPriority}
        .mode=${this.resolvedInputMode}
        .hugContent=${true}
        .value=${this.inputValue}
        .showZeroPadding=${this.showZeroPadding}
        .maxDigits=${this.maxDigits}
        .fractionDigits=${this.fractionDigits}
        .hasFixedLength=${this.hasFixedLength}
        .valueLength=${this.valueLength}
        .hasHintedZeros=${this.hasHintedZeros}
        .hasDegree=${this.hasDegree}
      >
        <obi-input-right slot="icon"></obi-input-right>
      </obc-readout-input>
    `;
  }

  private renderActualValue() {
    return html`
      <obc-readout-input
        .variant=${'value'}
        .readoutStyle=${'regular'}
        .direction=${'horizontal'}
        .size=${this.resolvedValueSize}
        .valueTypography=${this.resolvedValueTypography ?? undefined}
        .priority=${this.resolvedActualPriority}
        .mode=${this.resolvedActualMode}
        .hugContent=${true}
        .value=${this.value}
        .showZeroPadding=${this.showZeroPadding}
        .maxDigits=${this.maxDigits}
        .fractionDigits=${this.fractionDigits}
        .hasFixedLength=${this.hasFixedLength}
        .valueLength=${this.valueLength}
        .hasHintedZeros=${this.hasHintedZeros}
        .hasDegree=${this.hasDegree}
      >
        ${this.renderValueIconSlot()}
      </obc-readout-input>
    `;
  }

  private renderValue() {
    return html`
      <div class="value-wrap" part="value-wrap">
        ${this.hasInput
          ? html`<div class="value-cluster" part="value-cluster">
              ${this.renderInput()} ${this.renderActualValue()}
            </div>`
          : this.renderActualValue()}
      </div>
    `;
  }

  private renderTrailingUnit() {
    if (
      !this.hasUnit ||
      this.stacking === ReadoutListItemStacking.leadingUnit
    ) {
      return nothing;
    }

    return html`<div class="unit unit-trailing" part="unit-trailing">
      ${this.unit}
    </div>`;
  }

  private renderTrailingSource() {
    if (!this.showsTrailingSource) {
      return nothing;
    }

    return html`
      <div class="divider" part="divider" aria-hidden="true"></div>
      <div class="source source-trailing" part="source-trailing">
        ${this.src}
      </div>
    `;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          root: true,
          [`size-${this.size}`]: true,
          [`stacking-${this.stacking}`]: true,
          'priority-enhanced':
            this.priority === ReadoutListItemPriority.enhanced,
          'priority-input': this.priority === ReadoutListItemPriority.input,
          'priority-input-flip-flop':
            this.priority === ReadoutListItemPriority.inputFlipFlop,
          [`alert-${this.alertState}`]: true,
          'has-leading-icon': this.hasLeadingIcon,
          'has-value-icon': this.hasValueIcon,
        })}
        part="root"
      >
        <div class="content" part="content">
          <div class="label-container" part="label-container">
            ${this.hasLeadingIcon
              ? html`<span class="leading-icon" aria-hidden="true"
                  ><slot name="leading-icon"></slot
                ></span>`
              : nothing}
            ${this.renderLabelContainer()}
          </div>

          <div class="value-container" part="value-container">
            ${this.renderValue()} ${this.renderTrailingUnit()}
          </div>

          ${this.renderTrailingSource()}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-readout-list-item': ObcReadoutListItem;
  }
}
