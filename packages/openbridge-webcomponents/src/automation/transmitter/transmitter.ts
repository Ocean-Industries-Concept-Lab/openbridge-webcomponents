import {LitElement, html, nothing, unsafeCSS} from 'lit';
import type {TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './transmitter.css?inline';
import {customElement} from '../../decorator.js';
import {LineType} from '../index.js';
import {
  TransmitterOrientation,
  transmitterLeaderOffset,
} from './transmitter-shared.js';
import {
  TransmitterButtonSize,
  TransmitterButtonVariant,
} from '../transmitter-button/transmitter-button.js';
import '../transmitter-button/transmitter-button.js';
import {
  ObcIndicatorGraphSize,
  type ObcIndicatorGraphLayout,
} from '../../navigation-instruments/indicator-graph/indicator-graph.js';
import '../../navigation-instruments/indicator-graph/indicator-graph.js';
import {
  ObcAlertFrameMode,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';
import '../../components/alert-frame/alert-frame.js';
import {AlertType} from '../../types.js';

export {
  TransmitterOrientation,
  transmitterLeaderOffset,
} from './transmitter-shared.js';

export enum TransmitterType {
  indicator = 'indicator',
  value = 'value',
  horizontalGraph = 'horizontal-graph',
  verticalGraph = 'vertical-graph',
}

/**
 * `<obc-transmitter>` – A readout label that attaches to a line via a leader
 * line, showing a measured value, a tag identifier, or a value paired with a
 * trend graph.
 *
 * Positioning (orientation + leader line) follows `<obc-automation-readout>`.
 * The value chip is an `<obc-transmitter-button>` and the trend is an
 * `<obc-indicator-graph>` with its area fill enabled.
 *
 * ### Features / Variants
 * - **`type`** – `indicator` (tag pill), `value` (icon/value/unit), or value
 *   paired with a `horizontal-graph` (beside) or `vertical-graph` (below).
 * - **`orientation`** – `top`, `right`, `bottom`, `left`; controls which edge
 *   the leader line attaches to.
 * - **Segments** – opt into a leading advice segment with `hasAdvice`/
 *   `adviceValue` and a setpoint segment with `hasSetPoint`/`setpointValue`;
 *   both are read-only and shown in the value chip for non-`indicator` types.
 * - **Alert frame** – `hasAlert` wraps the whole transmitter in an
 *   `<obc-alert-frame>`. `alertFrameStatus`, `alertFrameType`,
 *   `alertFrameThickness` and `alertFrameMode` set its severity, flap, border
 *   and flashing, with the same names as on the automation devices; a flap
 *   carries the status badge and the `alert-icon`, `alert-label` and
 *   `alert-timer` slots.
 * - **Formatting** – `fractionDigits`, `maxDigits`, `hintedZeros` and
 *   `hasSignSpacer` are forwarded to the value chip to control decimal
 *   precision, muted leading-zero padding (e.g. `0012.3`) and the sign
 *   column. The advice and setpoint segments reuse the same formatting.
 *   `hasDegree` adds a degree column between the value and the unit.
 *   `value`, `adviceValue` and `setpointValue` render dashes when they are
 *   `NaN`, `null` or `undefined`.
 *
 * **TODO(designer):** the Figma Transmitter set (25656:45081) draws no alert
 * state, so the frame and its flaps follow the automation devices.
 *
 * ### Slots
 * | Slot Name   | Conditions                                               | Purpose                         |
 * |-------------|----------------------------------------------------------|---------------------------------|
 * | icon        | value/graph + `hasIcon`                                  | Leading icon in the value chip. |
 * | alert-icon  | `hasAlert` + `showAlertIcon`, large side/bottom/top flap | Custom icon in the alert flap.  |
 * | alert-label | `hasAlert`, bottom/top flap                              | Label in the alert flap.        |
 * | alert-timer | `hasAlert`, bottom/top flap                              | Timer in the alert flap.        |
 *
 * @property maxDigits - Integer digits to reserve / hint (independent of `fractionDigits`).
 * @property hasSignSpacer - Reserve a minus-sign column on every segment, filled by the real sign
 *   only while a value is negative, so the chip's width does not change
 *   across zero.
 * @property hasDegree - Show a degree column between the value and the unit (e.g. `12.3°` then `C`).
 * @property hasAlert - Wrap the transmitter in an `<obc-alert-frame>` when true.
 * @property alertFrameStatus - Severity of the alert frame, which picks its colour and flap badge:
 *   `alarm` (default), `warning`, `caution` or one of the `level-*` severities.
 * @availableWhen alertFrameStatus hasAlert==true
 * @property alertFrameType - Flap of the alert frame: `regular` (default) draws the outline alone,
 *   `small-side-flip`, `large-side-flip`, `bottom-flip` and `top-flip` add a flap
 *   with the status badge.
 * @availableWhen alertFrameType hasAlert==true
 * @property alertFrameThickness - Border of the alert frame: `small` (default) or `large`.
 * @availableWhen alertFrameThickness hasAlert==true
 * @property alertFrameMode - Acknowledgement state of the alert: `acked-active` (default) is steady,
 *   `unacked-active` flashes, `unacked-rectified` flashes a dashed frame.
 * @availableWhen alertFrameMode hasAlert==true
 * @property showAlertCategoryIcon - Show the status badge in the flap; a small side flap without it is not drawn.
 * @availableWhen showAlertCategoryIcon hasAlert==true && alertFrameType in [SmallSideFlip, LargeSideFlip, BottomFlip, TopFlip]
 * @property showAlertIcon - Show the `alert-icon` slot in a large side, bottom or top flap.
 * @availableWhen showAlertIcon hasAlert==true
 * @property adviceValue - Advisory value shown in the leading advice segment when `hasAdvice`.
 * @property setpointValue - Target value shown in the setpoint segment when `hasSetPoint`.
 * @property tag - Tag identifier shown when `type` is `indicator` (e.g. `TT`).
 * @property idTag - Optional identifier shown below the chip (e.g. `#0000`).
 * @property data - Trend data for the graph types: `[xValues, yValues]`.
 * @slot icon - Leading icon in the value chip.
 * @slot alert-icon - Custom icon in the alert flap, shown when `hasAlert` and `showAlertIcon`.
 * @slot alert-label - Label in a bottom or top alert flap, shown when `hasAlert`.
 * @slot alert-timer - Timer in a bottom or top alert flap, shown when `hasAlert`.
 *
 * @experimental
 */
@customElement('obc-transmitter')
export class ObcTransmitter extends LitElement {
  @property({type: String}) orientation: TransmitterOrientation =
    TransmitterOrientation.bottom;
  @property({type: String}) type: TransmitterType = TransmitterType.value;
  @property({type: String}) lineType: LineType | undefined = undefined;

  @property({type: Number}) value?: number | null;
  @property({type: String}) unit = '';
  @property({type: Number}) fractionDigits = 1;

  @property({type: Number}) maxDigits = 0;

  @property({type: Boolean}) hintedZeros = false;
  @property({type: Boolean}) hasSignSpacer = false;
  @property({type: Boolean}) hasDegree = false;
  @property({type: String}) size: TransmitterButtonSize =
    TransmitterButtonSize.regular;
  @property({type: Boolean}) hasIcon = false;
  @property({type: Boolean}) hasAdvice = false;

  @property({type: Boolean}) hasAlert = false;
  @property({type: String}) alertFrameStatus: AlertType = AlertType.Alarm;
  @property({type: String}) alertFrameType: ObcAlertFrameType =
    ObcAlertFrameType.Regular;
  @property({type: String}) alertFrameThickness: ObcAlertFrameThickness =
    ObcAlertFrameThickness.Small;
  @property({type: String}) alertFrameMode: ObcAlertFrameMode =
    ObcAlertFrameMode.ackedActive;
  @property({type: Boolean, attribute: false}) showAlertCategoryIcon = true;
  @property({type: Boolean}) showAlertIcon = false;

  @property({type: Number}) adviceValue?: number | null;

  @property({type: Boolean}) hasSetPoint = false;

  @property({type: Number}) setpointValue?: number | null;

  @property({type: String}) tag = '';

  @property({type: String}) idTag = '';

  @property({type: Array}) data: [number[], number[]] = [[], []];

  private get hasGraph() {
    return (
      this.type === TransmitterType.horizontalGraph ||
      this.type === TransmitterType.verticalGraph
    );
  }

  private renderButton() {
    const isIndicator = this.type === TransmitterType.indicator;
    return html`
      <obc-transmitter-button
        class="chip"
        .variant=${
          isIndicator
            ? TransmitterButtonVariant.tag
            : TransmitterButtonVariant.value
        }
        .size=${this.size}
        .value=${this.value}
        .unit=${this.unit}
        .fractionDigits=${this.fractionDigits}
        .maxDigits=${this.maxDigits}
        .hintedZeros=${this.hintedZeros}
        .hasSignSpacer=${this.hasSignSpacer}
        .hasDegree=${this.hasDegree}
        .hasIcon=${this.hasIcon}
        .hasAdvice=${this.hasAdvice}
        .adviceValue=${this.adviceValue}
        .hasSetPoint=${this.hasSetPoint}
        .setpointValue=${this.setpointValue}
        .label=${this.tag}
        .idTag=${this.idTag}
      >
        <slot name="icon" slot="icon"></slot>
      </obc-transmitter-button>
    `;
  }

  private renderGraph() {
    if (!this.hasGraph) {
      return nothing;
    }
    const layout: ObcIndicatorGraphLayout = {
      size: ObcIndicatorGraphSize.small,
      fill: true,
    };
    return html`
      <div class="graph-box">
        <obc-indicator-graph .data=${this.data} .layout=${layout}>
        </obc-indicator-graph>
      </div>
    `;
  }

  private renderLabel() {
    if (!this.idTag) {
      return nothing;
    }
    return html`<div class="id-tag" aria-hidden="true">${this.idTag}</div>`;
  }

  private renderContent() {
    return html`
      <div class="content">
        <div class="body">${this.renderButton()} ${this.renderGraph()}</div>
        ${this.renderLabel()}
      </div>
    `;
  }

  private renderAlertFrame(content: TemplateResult) {
    return html`
      <obc-alert-frame
        class="alert-frame"
        .type=${this.alertFrameType}
        .thickness=${this.alertFrameThickness}
        .status=${this.alertFrameStatus}
        .mode=${this.alertFrameMode}
        .showAlertCategoryIcon=${this.showAlertCategoryIcon}
        .showIcon=${this.showAlertIcon}
        .wrapContent=${true}
      >
        ${content}
        <span slot="icon"><slot name="alert-icon"></slot></span>
        <span slot="label"><slot name="alert-label"></slot></span>
        <span slot="timer"><slot name="alert-timer"></slot></span>
      </obc-alert-frame>
    `;
  }

  override render() {
    const content = this.hasAlert
      ? this.renderAlertFrame(this.renderContent())
      : this.renderContent();

    return html`
      <div
        class=${classMap({
          transmitter: true,
          'has-alert': this.hasAlert,
          [`orientation-${this.orientation}`]: true,
          [`type-${this.type}`]: true,
        })}
        style="--offset: ${transmitterLeaderOffset(this.lineType)}px;"
      >
        ${content}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-transmitter': ObcTransmitter;
  }
}
