import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './readout-list-item.css?inline';
import {customElement} from '../../decorator.js';
import {ReadoutSetpointSize} from '../readout-setpoint/readout-setpoint.js';
import {ReadoutSetpointValueTypography} from '../readout-setpoint/readout-setpoint.js';
import {Priority} from '../types.js';
import '../readout-setpoint/readout-setpoint.js';
import '../../icons/icon-input-right.js';
import {ReadoutSetpointMode} from '../readout-setpoint/readout-setpoint.js';
import {
  AlertFrameConfig,
  wrapWithAlertFrame,
} from '../../components/alert-frame/alert-frame';

export enum ReadoutListItemDataState {
  none = 'none',
  lowIntegrity = 'low-integrity',
  invalid = 'invalid',
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
  setpoint = 'setpoint',
  setpointFlipFlop = 'setpoint-flip-flop',
}

/**
 * `<obc-readout-list-item>` – A compact inline readout row for lists.
 *
 * Renders a compact label/value/unit composition with a dedicated size scale and stacking modes for unit and source placement. Use it when you need dense, consistent readout rows in tables or lists without bringing in the full `<obc-readout>` segment layout.
 *
 * ### Features
 * - **Sizes:** `base`, `priority`, and `enhanced` typography/padding scales.
 * - **Stacking modes:** `trailing-unit`, `leading-unit`, and `leading-src` control where unit/source appear relative to the label/value.
 * - **Priority styling:** `priority` controls emphasis and setpoint presentation (`regular`, `enhanced`, `setpoint`, `setpoint-flip-flop`).
 * - **Data states:** Supports `dataState` styling for `low-integrity` and `invalid` data quality.
 * - **Alert frame:** Optional `alert` wrapper for caution, warning, alarm, and other alert-frame statuses.
 * - **Formatting:** Supports numeric formatting, fixed-length width templates, hinted zeros, and optional degree suffix (`°`).
 *
 * ### Usage Guidelines
 * Use this component for dense readouts in list contexts. Prefer `<obc-readout>` when you need multi-segment advice/setpoint/source composition, rich layouts, or source picker/flyout behavior.
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
  dataState: ReadoutListItemDataState = ReadoutListItemDataState.none;

  @property({type: Object}) alert: AlertFrameConfig | false = false;

  @property({type: String}) label = '';
  @property({type: String}) unit = '';
  @property({type: String}) src = '';

  @property({type: Number}) value: number | undefined = undefined;
  @property({type: Number}) setpointValue: number | undefined = undefined;

  @property({type: Boolean}) hasSetpoint = false;

  @property({type: Boolean}) hasDegree = false;
  @property({type: Boolean}) hasUnit = false;
  @property({type: Boolean}) hasLabel = false;
  @property({type: Boolean}) hasSource = false;
  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: Boolean}) hasValueIcon = false;

  @property({type: Number}) fractionDigits = 0;
  @property({type: Boolean}) showZeroPadding = false;

  @property({type: Number}) minValueLength = 0;
  @property({type: Boolean}) hasHintedZeros = false;

  @property({type: Boolean}) labelOnly = false;

  private get resolvedMainValueSize(): ReadoutSetpointSize {
    return this.size === ReadoutListItemSize.enhanced
      ? ReadoutSetpointSize.large
      : this.size === ReadoutListItemSize.priority
        ? ReadoutSetpointSize.medium
        : ReadoutSetpointSize.regular;
  }

  private get resolvedValueSize(): ReadoutSetpointSize {
    if (this.priority === ReadoutListItemPriority.setpointFlipFlop) {
      if (this.size === ReadoutListItemSize.priority) {
        return ReadoutSetpointSize.small;
      }

      if (this.size === ReadoutListItemSize.enhanced) {
        return ReadoutSetpointSize.regular;
      }
    }

    if (this.size === ReadoutListItemSize.enhanced) {
      return ReadoutSetpointSize.large;
    }
    return ReadoutSetpointSize.regular;
  }

  private get resolvedValueTypography():
    | ReadoutSetpointValueTypography
    | undefined {
    if (
      this.priority === ReadoutListItemPriority.setpointFlipFlop &&
      this.resolvedValueSize === ReadoutSetpointSize.small
    ) {
      return undefined;
    }

    if (
      this.priority === ReadoutListItemPriority.setpointFlipFlop &&
      this.size === ReadoutListItemSize.enhanced
    ) {
      return ReadoutSetpointValueTypography.regular;
    }

    switch (this.size) {
      case ReadoutListItemSize.enhanced:
        return ReadoutSetpointValueTypography.large;
      case ReadoutListItemSize.priority:
        return ReadoutSetpointValueTypography.medium;
      case ReadoutListItemSize.base:
      default:
        return ReadoutSetpointValueTypography.regular;
    }
  }

  private get resolvedSetpointSize(): ReadoutSetpointSize {
    if (!this.hasSetpoint) {
      return ReadoutSetpointSize.small;
    }

    if (
      this.priority === ReadoutListItemPriority.setpoint ||
      this.priority === ReadoutListItemPriority.setpointFlipFlop
    ) {
      return this.resolvedMainValueSize;
    }

    return ReadoutSetpointSize.small;
  }

  private get resolvedActualPriority(): Priority {
    if (
      this.priority === ReadoutListItemPriority.enhanced ||
      (this.priority === ReadoutListItemPriority.setpoint &&
        !this.hasSetpoint) ||
      this.priority === ReadoutListItemPriority.setpointFlipFlop
    ) {
      return Priority.enhanced;
    }

    return Priority.regular;
  }

  private get resolvedActualMode(): ReadoutSetpointMode {
    return this.priority === ReadoutListItemPriority.enhanced
      ? ReadoutSetpointMode.setpoint
      : ReadoutSetpointMode.display;
  }

  private get resolvedSetpointPriority(): Priority {
    if (
      !this.hasSetpoint ||
      this.priority === ReadoutListItemPriority.regular
    ) {
      return Priority.regular;
    }

    return Priority.enhanced;
  }

  private get resolvedSetpointMode(): ReadoutSetpointMode {
    if (
      this.hasSetpoint &&
      this.priority === ReadoutListItemPriority.setpoint
    ) {
      return ReadoutSetpointMode.setpoint;
    }
    return ReadoutSetpointMode.display;
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

  private renderSetpoint() {
    if (!this.hasSetpoint) {
      return nothing;
    }

    return html`
      <obc-readout-setpoint
        .variant=${'setpoint'}
        .readoutStyle=${'regular'}
        .direction=${'horizontal'}
        .size=${this.resolvedSetpointSize}
        .priority=${this.resolvedSetpointPriority}
        .mode=${this.resolvedSetpointMode}
        .hugContent=${true}
        .value=${this.setpointValue}
        .showZeroPadding=${this.showZeroPadding}
        .fractionDigits=${this.fractionDigits}
        .minValueLength=${this.minValueLength}
        .hasHintedZeros=${this.hasHintedZeros}
        .hasDegree=${this.hasDegree}
      >
        <obi-input-right slot="icon"></obi-input-right>
      </obc-readout-setpoint>
    `;
  }

  private renderActualValue() {
    return html`
      <obc-readout-setpoint
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
        .fractionDigits=${this.fractionDigits}
        .minValueLength=${this.minValueLength}
        .hasHintedZeros=${this.hasHintedZeros}
        .hasDegree=${this.hasDegree}
      >
        ${this.renderValueIconSlot()}
      </obc-readout-setpoint>
    `;
  }

  private renderValue() {
    return html`
      <div class="value-wrap" part="value-wrap">
        ${this.hasSetpoint
          ? html`<div class="value-cluster" part="value-cluster">
              ${this.renderSetpoint()} ${this.renderActualValue()}
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
    return wrapWithAlertFrame(
      this.alert,
      html`
        <div
          class=${classMap({
            root: true,
            [`size-${this.size}`]: true,
            [`stacking-${this.stacking}`]: true,
            'priority-enhanced':
              this.priority === ReadoutListItemPriority.enhanced,
            'priority-setpoint':
              this.priority === ReadoutListItemPriority.setpoint,
            'priority-setpoint-flip-flop':
              this.priority === ReadoutListItemPriority.setpointFlipFlop,
            'data-none': this.dataState === ReadoutListItemDataState.none,
            'data-low-integrity':
              this.dataState === ReadoutListItemDataState.lowIntegrity,
            'data-invalid': this.dataState === ReadoutListItemDataState.invalid,
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

            ${this.labelOnly
              ? nothing
              : html`
                  <div class="value-container" part="value-container">
                    ${this.renderValue()} ${this.renderTrailingUnit()}
                  </div>

                  ${this.renderTrailingSource()}
                `}
          </div>
        </div>
      `
    );
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-readout-list-item': ObcReadoutListItem;
  }
}
