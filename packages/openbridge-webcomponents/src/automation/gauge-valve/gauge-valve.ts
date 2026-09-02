import {LitElement, html, unsafeCSS, nothing} from 'lit';
import type {PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import compentStyle from './gauge-valve.css?inline';
import {customElement} from '../../decorator.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import {
  computeRadialFrame,
  estimateLabelWidthPx,
  measureContainerPx,
  observeInnerBox,
} from '../../svghelpers/radial-frame.js';
import {CHART_DIMENSIONS} from '../../charthelpers/constants.js';
import {InstrumentState, Priority} from '../../navigation-instruments/types.js';
import {renderInstrumentReadout} from '../../navigation-instruments/readout/instrument-readout.js';
import {ReadoutSize} from '../../navigation-instruments/readout/readout.js';
import '../../navigation-instruments/readout/readout.js';
import '../../navigation-instruments/watch/watch.js';
import {
  OUTER_RING_RADIUS,
  WatchCircleType,
} from '../../navigation-instruments/watch/watch.js';
import type {
  WatchBarArea,
  WatchNeedle,
} from '../../navigation-instruments/watch/watch.js';
import {TickmarkType} from '../../navigation-instruments/watch/tickmark.js';
import type {Tickmark} from '../../navigation-instruments/watch/tickmark.js';
import '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {
  IdTagOrientation,
  type AutomationButtonReadoutStack,
} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {
  GaugeValveScalePosition,
  SCALE_ROTATION_DEG,
  TRACK_HALF_SPANS,
  type ValvePort,
  clampPercent,
  inletPercent,
  scaleAngle,
  valveAreas,
  valvePorts,
} from './gauge-valve-geometry.js';

/** Scale interval (%) between minor ticks. */
const TICK_SECONDARY_STEP = 5;

/** Scale interval (%) between major ticks. */
const TICK_PRIMARY_STEP = 25;

/** Side of the center actuator-icon box in SVG units (96/512 of the design). */
const ICON_SIZE = 96;

/** Near-edge anchor (SVG units from center) of the large-variant readout box. */
const READOUT_ANCHOR: Record<'twoWay' | 'threeWay', number> = {
  twoWay: 144,
  threeWay: 136,
};

/**
 * Base padding passed to `computeRadialFrame`. Large reproduces the Figma 512
 * canvas — `(176 + 80) * 2` — leaving room for the scale, labels and readout;
 * compact crops to the face with one unit of margin for the outline stroke.
 */
const BASE_PADDING: Record<'large' | 'compact', number> = {
  large: 80,
  compact: 9,
};

const SCALE_LABEL_VALUES = [0, 50, 100];

export enum GaugeValveType {
  twoWay = 'two-way',
  threeWay = 'three-way',
}

export enum GaugeValvePriority {
  regular = 'regular',
  enhanced = 'enhanced',
  medium = 'medium',
  off = 'off',
}

export enum GaugeValveStyle {
  fill = 'fill',
  tint = 'tint',
}

/**
 * Radial position gauge for analog valves.
 *
 * An `obc-watch` face with one track arc per port (90° sweep for two-way,
 * 60° for three-way) whose fill bar shows the flow through that port, and a
 * center slot for an actuator icon. Tracks, bars, cap pills, scale and
 * setpoint are all watch inputs.
 *
 * ## Features / Variants
 * - `type`: two-way (left + right tracks) or three-way (adds a bottom track)
 * - `large`: adds a scale with tick labels, a setpoint marker, and a value
 *   readout; the compact default instead shows the shared readout stack
 *   below the face with a percentage readout per port
 * - `priority`: colour emphasis of the value graphics — `regular` (default),
 *   `enhanced`, `medium`, or `off`. `off` blanks the tracks, bars and caps on
 *   a flat disc, disables the setpoint marker, and replaces the value readout
 *   with an "Off" state row; consumers should also swap the slotted actuator
 *   icon to its closed/off variant when setting `priority` to `off`
 * - `barStyle`: `tint` (default) fills the bar with the priority's tint
 *   colour and marks the fill edges with strong cap pills; `fill` paints the
 *   bar in the strong colour with square value edges, no cap pills (matching
 *   the fill mode of `obc-bar-vertical` and `obc-gauge-radial`)
 * - `scalePosition`: rotates the whole layout in 90° steps; consumers slot
 *   the orientation-matched actuator icon variant
 * - Setpoint support via the shared setpoint API (`setpoint`, `newSetpoint`,
 *   confirm animation included)
 * - `hasLabelStack`: toggles the compact-variant readout stack (an optional
 *   setpoint row, one value row per port, plus an optional `tag` identifier
 *   line); has no effect when `large`
 *
 * ## Sizing
 * The face contain-fits both axes of the host (the largest square that fits;
 * the compact label stack keeps its fixed text size below the face), like the
 * other radial instruments. Set `faceDiameter` to pin the ring to a fixed
 * pixel diameter instead — instruments sharing a `faceDiameter` have equal
 * ring circumference regardless of variant, matching
 * `obc-gauge-proportional`. The frame geometry comes from the shared
 * `computeRadialFrame()`.
 *
 * Readout text keeps a constant on-screen size (the instrument typography
 * contract), so the large variant hides its readout when the rendered ring
 * diameter drops below 192px (`CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS`) —
 * the same small-size breakpoint the donut and pie charts use to drop their
 * center readouts and labels. Scale tick labels degrade separately via the
 * radial frame's `labelsHidden` reserve cap.
 *
 * ## Usage Guidelines
 * Use for analog valve position/flow visualization on overview displays. For
 * schematic (P&ID) placement with button behavior, use `obc-analog-valve`
 * instead.
 *
 * ## Slots
 * | Slot   | Condition | Purpose                                  |
 * | ------ | --------- | ---------------------------------------- |
 * | `icon` | always    | Center actuator icon (`obi-*` component) |
 *
 * @property priority - Colour emphasis of the value graphics (the Figma "Type" axis); `off` blanks them on a flat disc
 * @property barStyle - Bar rendering (the Figma "Style" axis): tint (default) shows a tint bar with strong cap pills, fill a strong bar without pills
 * @property scalePosition - Rotates the whole layout — ports, scale, setpoint and readout side (the designs' two-way Direction / three-way Scale axis)
 * @property value - Through-flow of the right outlet port, 0-100 (%)
 * @property bottomValue - Bottom outlet flow, 0-100 (%).
 * @availableWhen bottomValue type==three-way
 * @property large - Show scale, labels, readout and setpoint layer
 * @property label - Readout label text.
 * @availableWhen label large==true
 * @property unit - Readout unit text.
 * @availableWhen unit large==true
 * @property tag - Identifier line under the compact readout stack, e.g. '#0001'.
 * @availableWhen tag large==false && hasLabelStack==true
 * @property hasLabelStack - Render the readout stack below the face in the compact variant.
 * @availableWhen hasLabelStack large==false
 * @property faceDiameter - Ring diameter in CSS pixels. When set, the face renders at a fixed
 *   intrinsic size (equal circumference across instruments sharing the
 *   value); when unset (default), the face contain-fits its container.
 * @slot icon - Center actuator icon (`obi-*` component)
 *
 * @experimental
 */
@customElement('obc-gauge-valve')
export class ObcGaugeValve extends SetpointMixin(LitElement) {
  @property({type: String}) type: GaugeValveType = GaugeValveType.twoWay;
  @property({type: String}) priority: GaugeValvePriority =
    GaugeValvePriority.regular;
  @property({type: String}) barStyle: GaugeValveStyle = GaugeValveStyle.tint;
  @property({type: String}) scalePosition: GaugeValveScalePosition =
    GaugeValveScalePosition.top;
  @property({type: Number}) value = 0;
  @property({type: Number}) bottomValue = 0;
  @property({type: Boolean}) large = false;
  @property({type: String}) label = '';
  @property({type: String}) unit = '';
  @property({type: String}) tag = '';
  @property({type: Boolean, attribute: false}) hasLabelStack = true;
  @property({type: Number, attribute: 'face-diameter', reflect: true})
  faceDiameter: number | undefined;

  private _resizeController = new ResizeController(this, {});

  override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    observeInnerBox(this._resizeController, this.renderRoot);
  }

  private get isThreeWay(): boolean {
    return this.type === GaugeValveType.threeWay;
  }

  private get isOff(): boolean {
    return this.priority === GaugeValvePriority.off;
  }

  private get rotation(): number {
    return SCALE_ROTATION_DEG[this.scalePosition];
  }

  /**
   * The shared instrument Priority tier for the setpoint marker and readout.
   * Only `enhanced` maps through; `medium` has no shared-Priority tier, so its
   * teal emphasis stays confined to the bars while marker and readout render
   * regular.
   */
  private get sharedPriority(): Priority {
    return this.priority === GaugeValvePriority.enhanced
      ? Priority.enhanced
      : Priority.regular;
  }

  private fillPercentFor(role: ValvePort['role']): number {
    if (role === 'through') return clampPercent(this.value);
    if (role === 'bottom') return clampPercent(this.bottomValue);
    return this.isThreeWay
      ? inletPercent(this.value, this.bottomValue)
      : clampPercent(this.value);
  }

  private get halfSpan(): number {
    return this.isThreeWay
      ? TRACK_HALF_SPANS.threeWay
      : TRACK_HALF_SPANS.twoWay;
  }

  private get barAreas(): WatchBarArea[] {
    if (this.isOff) return [];
    return valvePorts(this.isThreeWay, this.rotation).flatMap((port) => {
      const capHalf = (this.halfSpan * this.fillPercentFor(port.role)) / 100;
      if (capHalf <= 0) return [];
      return [
        {
          startAngle: port.centerAngle - capHalf,
          endAngle: port.centerAngle + capHalf,
          fillColor: 'var(--gauge-valve-bar-color)',
        },
      ];
    });
  }

  private get capNeedles(): WatchNeedle[] {
    if (this.isOff || this.barStyle !== GaugeValveStyle.tint) return [];
    return valvePorts(this.isThreeWay, this.rotation).flatMap((port) => {
      const capHalf = (this.halfSpan * this.fillPercentFor(port.role)) / 100;
      if (capHalf <= 0) return [];
      return [port.centerAngle - capHalf, port.centerAngle + capHalf].map(
        (angle) => ({
          angle,
          fillColor: 'var(--gauge-valve-cap-fill-color)',
          strokeColor: 'var(--gauge-valve-cap-border-color)',
        })
      );
    });
  }

  private scaleTickmarks(): Tickmark[] {
    if (!this.large) return [];
    const ticks: Tickmark[] = [];
    for (let pct = 0; pct <= 100; pct += TICK_SECONDARY_STEP) {
      const primary = pct % TICK_PRIMARY_STEP === 0;
      ticks.push({
        angle: scaleAngle(pct, this.rotation),
        type: primary ? TickmarkType.primary : TickmarkType.secondary,
        text: SCALE_LABEL_VALUES.includes(pct) ? String(pct) : undefined,
      });
    }
    return ticks;
  }

  private get labelStackReadouts(): AutomationButtonReadoutStack[] {
    if (this.isOff) {
      return [{type: 'state-off', value: 'Off', hasIcon: true}];
    }
    const readouts: AutomationButtonReadoutStack[] = [];
    if (this.setpoint !== undefined) {
      readouts.push({
        type: 'setpoint',
        value: clampPercent(this.setpoint),
        nDigits: 3,
      });
    }
    readouts.push({
      type: 'value',
      value: clampPercent(this.value),
      nDigits: 3,
      unit: '%',
      direction: 'right',
      icon: 'arrow',
    });
    if (this.isThreeWay) {
      readouts.push({
        type: 'value',
        value: clampPercent(this.bottomValue),
        nDigits: 3,
        unit: '%',
        direction: 'down',
        icon: 'arrow',
      });
    }
    return readouts;
  }

  private renderLabelStack() {
    return html`<obc-automation-button-readout-stack
      class="label-stack"
      .readouts=${this.labelStackReadouts}
      .tag=${this.tag || null}
      .idTagOrientation=${IdTagOrientation.bottom}
    ></obc-automation-button-readout-stack>`;
  }

  private renderReadout() {
    if (this.isOff) {
      return html`
        <obc-readout
          class="gauge-valve-readout"
          .size=${ReadoutSize.large}
          .hasSetpoint=${false}
          .hasAdvice=${false}
          .off=${true}
          .offText=${'Off'}
          .label=${this.label}
          .unit=${this.unit}
        ></obc-readout>
      `;
    }
    return renderInstrumentReadout({
      className: 'gauge-valve-readout',
      value: clampPercent(this.value),
      label: this.label,
      unit: this.unit,
      fractionDigits: 0,
      priority: this.sharedPriority,
    });
  }

  override render() {
    const frame = computeRadialFrame({
      basePadding: this.large ? BASE_PADDING.large : BASE_PADDING.compact,
      labelWidthPx: this.large
        ? estimateLabelWidthPx(SCALE_LABEL_VALUES.map(String))
        : 0,
      clips: {top: 0, bottom: 0, left: 0, right: 0},
      containerPx: measureContainerPx(this),
      faceDiameter: this.faceDiameter,
    });
    const facePx = 2 * OUTER_RING_RADIUS * frame.scale;
    const readoutVisible = facePx >= CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;
    const tickmarks = frame.labelsHidden
      ? this.scaleTickmarks().map((t) => ({...t, text: undefined}))
      : this.scaleTickmarks();
    const setpointAngle =
      this.large && this.setpoint !== undefined
        ? scaleAngle(this.setpoint, this.rotation)
        : undefined;
    const newSetpointAngle =
      this.large && this.newSetpoint !== undefined
        ? scaleAngle(this.newSetpoint, this.rotation)
        : undefined;
    // Near-edge % offset of the readout box from the scale-side frame edge;
    // the frame is symmetric, so one offset serves all four scale positions.
    const readoutAnchor = this.isThreeWay
      ? READOUT_ANCHOR.threeWay
      : READOUT_ANCHOR.twoWay;
    const readoutEdgePct = (
      ((-readoutAnchor - frame.y) / frame.height) *
      100
    ).toFixed(4);
    const anchors = `--scale: ${frame.scale}; --icon-size: ${(
      (ICON_SIZE / frame.width) *
      100
    ).toFixed(4)}%; --readout-edge: ${readoutEdgePct}%;`;
    const faceBoxStyle =
      frame.hostWidthPx !== undefined
        ? `width: ${frame.hostWidthPx}px; height: ${frame.hostHeightPx}px;`
        : nothing;
    return html`
      <div
        class="root ${this.large ? 'large' : 'small'} ${this.isThreeWay
          ? 'three-way'
          : 'two-way'} priority-${this.priority} style-${this
          .barStyle} scale-${this.scalePosition} ${this.faceDiameter !==
        undefined
          ? 'pinned'
          : ''}"
        style=${anchors}
      >
        <div class="face-area">
          <div
            class="face-box ${this.faceDiameter !== undefined
              ? 'face-pinned'
              : ''}"
            style=${faceBoxStyle}
          >
            ${this.isOff
              ? html`<svg class="layer" viewBox=${frame.viewBox}>
                  <circle
                    r=${OUTER_RING_RADIUS}
                    fill="var(--instrument-frame-secondary-color)"
                  />
                </svg>`
              : nothing}
            <obc-watch
              class="layer"
              .state=${this.isOff
                ? InstrumentState.off
                : InstrumentState.active}
              .priority=${this.sharedPriority}
              .watchCircleType=${WatchCircleType.double}
              .hasBackgroundCircle=${!this.isOff}
              .areas=${this.isOff
                ? []
                : valveAreas(this.isThreeWay, this.rotation)}
              .roundBandCuts=${true}
              .barAreas=${this.barAreas}
              .needles=${this.capNeedles}
              .tickmarks=${tickmarks}
              .angleSetpoint=${setpointAngle}
              .newAngleSetpoint=${newSetpointAngle}
              .atAngleSetpoint=${this.computeAtSetpoint(
                clampPercent(this.value)
              )}
              .angleSetpointAtZeroDeadband=${this.setpointAtZeroDeadband}
              .setpointOverride=${this.setpointOverride}
              .touching=${this.touching}
              .animateSetpoint=${this.animateSetpoint}
              .arcFrame=${frame}
            ></obc-watch>
            <div class="icon"><slot name="icon"></slot></div>
            ${this.large && readoutVisible ? this.renderReadout() : nothing}
          </div>
        </div>
        ${!this.large && this.hasLabelStack ? this.renderLabelStack() : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-valve': ObcGaugeValve;
  }
}
