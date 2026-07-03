import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './transmitter.css?inline';
import {customElement} from '../../decorator.js';
import {LineType, lineWidth} from '../index.js';
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
import {ObcAlertFrameType} from '../../components/alert-frame/alert-frame.js';
import '../../components/alert-frame/alert-frame.js';

export enum TransmitterOrientation {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

export enum TransmitterType {
  indicator = 'indicator',
  value = 'value',
  horizontalGraph = 'horizontal-graph',
  verticalGraph = 'vertical-graph',
}

/**
 * `<obc-transmitter>` – A readout label that attaches to a line on a process
 * diagram via a leader line, showing a measured value, a tag identifier, or a
 * value paired with a trend graph.
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
 * - **`hasAlert`** – wraps the whole transmitter in an alarm `<obc-alert-frame>`.
 * - **Formatting** – `fractionDigits`, `minValueLength`, `hasHintedZeros` and
 *   `showZeroPadding` are forwarded to the value chip to control decimal
 *   precision and muted leading-zero padding (e.g. `0012.3`). The advice and
 *   setpoint segments reuse the same formatting.
 *
 * ### Slots
 * | Slot Name | Conditions              | Purpose                         |
 * |-----------|-------------------------|---------------------------------|
 * | icon      | value/graph + `hasIcon` | Leading icon in the value chip. |
 */
@customElement('obc-transmitter')
export class ObcTransmitter extends LitElement {
  @property({type: String}) orientation: TransmitterOrientation =
    TransmitterOrientation.bottom;
  @property({type: String}) type: TransmitterType = TransmitterType.value;
  @property({type: String}) lineType: LineType | undefined = undefined;

  @property({type: Number}) value?: number;
  @property({type: String}) unit = '';
  @property({type: Number}) fractionDigits = 1;
  @property({type: Number}) minValueLength = 0;
  @property({type: Boolean}) hasHintedZeros = false;
  @property({type: Boolean}) showZeroPadding = false;
  @property({type: String}) size: TransmitterButtonSize =
    TransmitterButtonSize.regular;
  @property({type: Boolean}) hasIcon = false;
  @property({type: Boolean}) hasAdvice = false;

  /** Wrap the transmitter in an `<obc-alert-frame>` (alarm) when true. */
  @property({type: Boolean}) hasAlert = false;

  /** Advisory value shown in the leading advice segment when `hasAdvice`. */
  @property({type: Number}) adviceValue?: number;

  @property({type: Boolean}) hasSetPoint = false;

  /** Target value shown in the setpoint segment when `hasSetPoint`. */
  @property({type: Number}) setpointValue?: number;

  /** Tag identifier shown when `type` is `indicator` (e.g. `TT`). */
  @property({type: String}) tag = '';

  /** Optional identifier shown below the chip (e.g. `#0000`). */
  @property({type: String}) idTag = '';

  /** Trend data for the graph types: `[xValues, yValues]`. */
  @property({type: Array}) data: [number[], number[]] = [[], []];

  private get hasGraph() {
    return (
      this.type === TransmitterType.horizontalGraph ||
      this.type === TransmitterType.verticalGraph
    );
  }

  private get lineOffset() {
    return this.lineType === undefined ? 0 : lineWidth(this.lineType) / 2;
  }

  private renderButton() {
    const isIndicator = this.type === TransmitterType.indicator;
    return html`
      <obc-transmitter-button
        class="chip"
        .variant=${isIndicator
          ? TransmitterButtonVariant.tag
          : TransmitterButtonVariant.value}
        .size=${this.size}
        .value=${this.value}
        .unit=${this.unit}
        .fractionDigits=${this.fractionDigits}
        .minValueLength=${this.minValueLength}
        .hasHintedZeros=${this.hasHintedZeros}
        .showZeroPadding=${this.showZeroPadding}
        .hasIcon=${this.hasIcon}
        .hasAdvice=${this.hasAdvice}
        .adviceValue=${this.adviceValue}
        .hasSetPoint=${this.hasSetPoint}
        .setpointValue=${this.setpointValue}
        .label=${this.tag}
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
    return html`<div class="id-tag">${this.idTag}</div>`;
  }

  private renderContent() {
    return html`
      <div class="content">
        <div class="body">${this.renderButton()} ${this.renderGraph()}</div>
        ${this.renderLabel()}
      </div>
    `;
  }

  override render() {
    const content = this.hasAlert
      ? html`
          <obc-alert-frame
            class="alert-frame"
            .type=${ObcAlertFrameType.Regular}
            .wrapContent=${true}
          >
            ${this.renderContent()}
          </obc-alert-frame>
        `
      : this.renderContent();

    return html`
      <div
        class=${classMap({
          transmitter: true,
          'has-alert': this.hasAlert,
          [`orientation-${this.orientation}`]: true,
          [`type-${this.type}`]: true,
        })}
        style="--offset: ${this.lineOffset}px;"
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
