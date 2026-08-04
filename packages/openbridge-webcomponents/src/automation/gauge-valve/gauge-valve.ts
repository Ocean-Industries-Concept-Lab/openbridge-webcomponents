import {LitElement, html, svg, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './gauge-valve.css?inline';
import {customElement} from '../../decorator.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import {
  drawSetpointMarker,
  deriveRadialSetpointConfig,
  getSetpointScale,
  SETPOINT_HEIGHT,
  SETPOINT_PATH_FILLED,
} from '../../svghelpers/setpoint.js';
import {InstrumentState, Priority} from '../../navigation-instruments/types.js';
import {renderInstrumentReadout} from '../../navigation-instruments/readout/instrument-readout.js';
import {ReadoutSize} from '../../navigation-instruments/readout/readout.js';
import '../../navigation-instruments/readout/readout.js';
import '../../icons/icon-arrow-right-google.js';
import '../../icons/icon-arrow-down-google.js';
import '../../icons/icon-off.js';
import {
  CENTER,
  SCALE_RADIUS,
  TRACK_INNER_RADIUS,
  TRACK_OUTER_RADIUS,
  TRACK_CORNER_RADIUS,
  TRACK_HALF_SPANS,
  CAP_INNER_RADIUS,
  CAP_OUTER_RADIUS,
  annularSectorPath,
  radialLinePath,
  clampPercent,
  inletPercent,
  polarToCartesian,
  scaleAngle,
} from './gauge-valve-geometry.js';

/**
 * Radial distance (px from center) of the setpoint marker BASE (outer edge).
 * The marker is anchored by its base — ~3px inside the r 188 outline in every
 * visual state — so the outline stroke always passes uninterrupted above it
 * (per the Figma refs); the tip position follows from the state's scale.
 */
const SETPOINT_BASE_RADIUS = 185;

/** Radial distance (px from center) of the 0/50/100 scale labels. */
const SCALE_LABEL_RADIUS = 202;

/**
 * Radial distance (px from center) of the common inner baseline that all
 * scale ticks grow outward from, inside the face.
 */
const TICK_BASELINE_RADIUS = 168;

/** Outer radius (px from center) of the minor scale ticks. */
const TICK_SECONDARY_OUTER_RADIUS = 176;

/** Major ticks run from the baseline out to the outline circle. */
const TICK_PRIMARY_OUTER_RADIUS = SCALE_RADIUS;

/** Scale interval (%) between minor ticks. */
const TICK_SECONDARY_STEP = 5;

/** Scale interval (%) between major ticks. */
const TICK_PRIMARY_STEP = 25;

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
 * Circular face with one track arc per port (90° sweep for two-way, 60° for
 * three-way) whose fill bar shows the flow through that port, and a center
 * slot for an actuator icon.
 *
 * ## Features / Variants
 * - `type`: two-way (left + right tracks) or three-way (adds a bottom track)
 * - `large`: adds a top scale with tick labels, a setpoint marker, and a
 *   value readout; the compact default instead shows a label stack below
 *   the face with a percentage readout per port
 * - `priority`: colour emphasis of the value graphics — `regular` (default),
 *   `enhanced`, `medium`, or `off`. `off` blanks the tracks, bars and caps on
 *   a flat disc, disables the setpoint marker, and replaces the value readout
 *   with an "Off" state row; consumers should also swap the slotted actuator
 *   icon to its closed/off variant when setting `priority` to `off`
 * - `barStyle`: bar colour weight — `tint` (default) fills the bar with the
 *   priority's tint colour, `fill` uses the strong colour and inverts the cap
 *   pills to light
 * - Setpoint support via the shared setpoint API (`setpoint`, `newSetpoint`, …)
 * - `hasLabelStack`: toggles the compact-variant readout stack (an optional
 *   setpoint row, one value row per port, plus an optional `tag` identifier
 *   line); has no effect when `large`
 *
 * ## Usage Guidelines
 * Use for analog valve position/flow visualization on overview displays. For
 * schematic (P&ID) placement with button behavior, use `obc-analog-valve`
 * instead.
 *
 * The `newSetpoint` confirm animation is not yet supported by the large
 * variant's setpoint marker; only the plain `setpoint` marker is rendered.
 *
 * The compact label stack is rendered inline by this component (per the
 * "Automation label stack" design); it is a candidate for extraction into
 * its own component later.
 *
 * ## Slots
 * | Slot   | Condition | Purpose                                  |
 * | ------ | --------- | ---------------------------------------- |
 * | `icon` | always    | Center actuator icon (`obi-*` component) |
 *
 * @slot icon - Center actuator icon (`obi-*` component)
 */
@customElement('obc-gauge-valve')
export class ObcGaugeValve extends SetpointMixin(LitElement) {
  @property({type: String}) type: GaugeValveType = GaugeValveType.twoWay;
  /** Colour emphasis of the value graphics (the Figma "Type" axis); `off` blanks them on a flat disc */
  @property({type: String}) priority: GaugeValvePriority =
    GaugeValvePriority.regular;
  /** Bar colour weight (the Figma "Style" axis): tint (default) or fill */
  @property({type: String}) barStyle: GaugeValveStyle = GaugeValveStyle.tint;
  /** Through-flow of the right outlet port, 0-100 (%) */
  @property({type: Number}) value = 0;
  /** Bottom outlet flow, 0-100 (%). Only used when type is three-way */
  @property({type: Number}) bottomValue = 0;
  /** Show scale, labels, readout and setpoint layer */
  @property({type: Boolean}) large = false;
  /** Readout label text, shown when large */
  @property({type: String}) label = '';
  /** Readout unit text, shown when large */
  @property({type: String}) unit = '';
  /** Identifier line under the compact readout stack, e.g. '#0001' */
  @property({type: String}) tag = '';
  /** Render the readout stack below the face in the compact variant */
  @property({type: Boolean, attribute: false}) hasLabelStack = true;

  private renderTrack(centerAngle: number, fillPercent: number) {
    const halfSpan =
      this.type === GaugeValveType.threeWay
        ? TRACK_HALF_SPANS.threeWay
        : TRACK_HALF_SPANS.twoWay;
    const pct = clampPercent(fillPercent);
    const capHalf = (halfSpan * pct) / 100;
    return svg`
      <path
        class="track"
        vector-effect="non-scaling-stroke"
        d=${annularSectorPath(TRACK_INNER_RADIUS, TRACK_OUTER_RADIUS, centerAngle - halfSpan, centerAngle + halfSpan, TRACK_CORNER_RADIUS)}
      />
      ${
        pct > 0
          ? svg`
        <path
          class="bar"
          d=${annularSectorPath(TRACK_INNER_RADIUS, TRACK_OUTER_RADIUS, centerAngle - capHalf, centerAngle + capHalf, TRACK_CORNER_RADIUS)}
        />
        ${[centerAngle - capHalf, centerAngle + capHalf].map(
          (angle) => svg`
            <path class="cap-back" d=${radialLinePath(CAP_INNER_RADIUS, CAP_OUTER_RADIUS, angle)} />
            <path class="cap-front" d=${radialLinePath(CAP_INNER_RADIUS, CAP_OUTER_RADIUS, angle)} />
          `
        )}
      `
          : nothing
      }
    `;
  }

  private get inletFillPercent(): number {
    return this.type === GaugeValveType.threeWay
      ? inletPercent(this.value, this.bottomValue)
      : clampPercent(this.value);
  }

  private renderPaddedValue(value: number) {
    const digits = String(Math.round(clampPercent(value)));
    const pad = '0'.repeat(Math.max(0, 3 - digits.length));
    return html`${pad ? html`<span class="pad">${pad}</span>` : nothing}<span
        >${digits}</span
      >`;
  }

  private renderLabelStack() {
    if (this.priority === GaugeValvePriority.off) {
      return html`
        <div class="label-stack">
          <div class="icon-cell value-row off-row">
            <obi-off class="row-icon"></obi-off>
          </div>
          <div class="value-cell value-row off-state">Off</div>
          ${this.tag ? html`<div class="tag-row">${this.tag}</div>` : nothing}
        </div>
      `;
    }
    return html`
      <div class="label-stack">
        ${this.setpoint !== undefined
          ? html`
              <div class="icon-cell setpoint-row">
                <svg
                  class="setpoint-glyph"
                  viewBox="2.5 -2.5 21 26"
                  aria-hidden="true"
                >
                  <path
                    d=${SETPOINT_PATH_FILLED}
                    transform="rotate(-90 13 10.5)"
                  />
                </svg>
              </div>
              <div class="value-cell setpoint-row setpoint-value">
                ${this.renderPaddedValue(this.setpoint)}
              </div>
            `
          : nothing}
        <div class="icon-cell value-row">
          <obi-arrow-right-google class="row-icon"></obi-arrow-right-google>
        </div>
        <div class="value-cell value-row value-primary">
          ${this.renderPaddedValue(this.value)}
        </div>
        <div class="unit-cell value-row">%</div>
        ${this.type === GaugeValveType.threeWay
          ? html`
              <div class="stack-divider"></div>
              <div class="icon-cell value-row">
                <obi-arrow-down-google class="row-icon"></obi-arrow-down-google>
              </div>
              <div class="value-cell value-row value-secondary">
                ${this.renderPaddedValue(this.bottomValue)}
              </div>
              <div class="unit-cell value-row">%</div>
            `
          : nothing}
        ${this.tag ? html`<div class="tag-row">${this.tag}</div>` : nothing}
      </div>
    `;
  }

  private renderScale() {
    const ticks = [];
    for (let pct = 0; pct <= 100; pct += TICK_SECONDARY_STEP) {
      if (pct % TICK_PRIMARY_STEP === 0) continue;
      ticks.push(svg`
        <path
          class="tick-secondary"
          d=${radialLinePath(TICK_BASELINE_RADIUS, TICK_SECONDARY_OUTER_RADIUS, scaleAngle(pct))}
        />
      `);
    }
    for (let pct = 0; pct <= 100; pct += TICK_PRIMARY_STEP) {
      ticks.push(svg`
        <path
          class="tick-primary"
          d=${radialLinePath(TICK_BASELINE_RADIUS, TICK_PRIMARY_OUTER_RADIUS, scaleAngle(pct))}
        />
      `);
    }
    const labels = [0, 50, 100].map((pct) => {
      const pos = polarToCartesian(SCALE_LABEL_RADIUS, scaleAngle(pct));
      return svg`<text class="scale-label" x=${pos.x} y=${pos.y}>${pct}</text>`;
    });
    return svg`
      ${ticks}
      ${labels}
    `;
  }

  private renderSetpoint() {
    if (this.setpoint === undefined) return nothing;
    const derived = deriveRadialSetpointConfig({
      state:
        this.priority === GaugeValvePriority.off
          ? InstrumentState.off
          : InstrumentState.active,
      priority: Priority.regular,
      atSetpoint: this.computeAtSetpoint(this.value),
      angleSetpoint: scaleAngle(this.setpoint),
      touching: this.touching,
      setpointOverride: this.setpointOverride,
    });
    const angle = scaleAngle(this.setpoint);
    const radius =
      SETPOINT_BASE_RADIUS -
      SETPOINT_HEIGHT * getSetpointScale(derived.visualState);
    const marker = drawSetpointMarker({
      visualState: derived.visualState,
      colorMode: derived.colorMode,
      disabled: derived.disabled,
      id: 'gauge-valve-setpoint',
    });
    return svg`
      <g
        class="setpoint-rotor"
        style="transform: translate(${CENTER}px, ${CENTER}px) rotate(${angle + 90}deg) translateX(${-radius}px) rotate(270deg);"
      >
        ${marker}
      </g>
    `;
  }

  private renderReadout() {
    if (this.priority === GaugeValvePriority.off) {
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
    });
  }

  override render() {
    const viewBox = this.large ? '0 0 512 512' : '67 67 378 378';
    const isOff = this.priority === GaugeValvePriority.off;
    return html`
      <div
        class="root ${this.large ? 'large' : 'small'} ${this.type ===
        GaugeValveType.threeWay
          ? 'three-way'
          : 'two-way'} priority-${this.priority} style-${this.barStyle}"
      >
        <div class="face-wrapper">
          <svg viewBox=${viewBox}>
            <circle class="face" cx=${CENTER} cy=${CENTER} r=${SCALE_RADIUS} />
            <circle
              class="outline"
              cx=${CENTER}
              cy=${CENTER}
              r=${SCALE_RADIUS}
            />
            ${isOff ? nothing : this.renderTrack(90, clampPercent(this.value))}
            ${isOff ? nothing : this.renderTrack(270, this.inletFillPercent)}
            ${!isOff && this.type === GaugeValveType.threeWay
              ? this.renderTrack(180, clampPercent(this.bottomValue))
              : nothing}
            ${this.large ? this.renderScale() : nothing}
            ${this.large ? this.renderSetpoint() : nothing}
          </svg>
          <div class="icon"><slot name="icon"></slot></div>
        </div>
        ${this.large ? this.renderReadout() : nothing}
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
