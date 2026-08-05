import {LitElement, html, svg, unsafeCSS, nothing} from 'lit';
import type {PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
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
import {roundedArch} from '../../svghelpers/roundedArch.js';
import {
  computeRadialFrame,
  estimateLabelWidthPx,
  measureContainerPx,
  observeInnerBox,
} from '../../svghelpers/radial-frame.js';
import {InstrumentState, Priority} from '../../navigation-instruments/types.js';
import {renderInstrumentReadout} from '../../navigation-instruments/readout/instrument-readout.js';
import {ReadoutSize} from '../../navigation-instruments/readout/readout.js';
import '../../navigation-instruments/readout/readout.js';
import '../../icons/icon-arrow-right-google.js';
import '../../icons/icon-arrow-down-google.js';
import '../../icons/icon-off.js';
import {
  SCALE_RADIUS,
  TRACK_INNER_RADIUS,
  TRACK_OUTER_RADIUS,
  TRACK_CORNER_RADIUS,
  TRACK_HALF_SPANS,
  CAP_INNER_RADIUS,
  CAP_OUTER_RADIUS,
  radialLinePath,
  clampPercent,
  inletPercent,
  polarToCartesian,
  scaleAngle,
} from './gauge-valve-geometry.js';

/**
 * Radial distance (SVG units from center) of the setpoint marker BASE (outer
 * edge). The marker is anchored by its base — ~3 units inside the r 184
 * outline in every visual state — so the outline stroke always passes
 * uninterrupted above it (per the Figma refs); the tip position follows from
 * the state's scale.
 */
const SETPOINT_BASE_RADIUS = 181;

/** Radial distance (SVG units from center) of the 0/50/100 scale labels. */
const SCALE_LABEL_RADIUS = 198;

/**
 * Radial distance (SVG units from center) of the common inner baseline that
 * all scale ticks grow outward from, inside the face.
 */
const TICK_BASELINE_RADIUS = 164;

/** Outer radius (SVG units from center) of the minor scale ticks. */
const TICK_SECONDARY_OUTER_RADIUS = 172;

/** Major ticks run from the baseline out to the outline circle. */
const TICK_PRIMARY_OUTER_RADIUS = SCALE_RADIUS;

/** Scale interval (%) between minor ticks. */
const TICK_SECONDARY_STEP = 5;

/** Scale interval (%) between major ticks. */
const TICK_PRIMARY_STEP = 25;

/** Side of the center actuator-icon box in SVG units (96/512 of the design). */
const ICON_SIZE = 96;

/** Top edge (SVG y) of the large-variant readout container per valve type. */
const READOUT_ANCHOR_Y: Record<'twoWay' | 'threeWay', number> = {
  twoWay: -144,
  threeWay: -136,
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
 * - `barStyle`: `tint` (default) fills the bar with the priority's tint
 *   colour and marks the fill edges with strong cap pills; `fill` paints the
 *   bar in the strong colour with square value edges, no cap pills, clipped
 *   to the track silhouette (matching the fill mode of `obc-bar-vertical`
 *   and `obc-gauge-radial`)
 * - Setpoint support via the shared setpoint API (`setpoint`, `newSetpoint`, …)
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
 * `obc-gauge-radial-proportional`. The frame geometry comes from the shared
 * `computeRadialFrame()`.
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
  /** Bar rendering (the Figma "Style" axis): tint (default) shows a tint bar with strong cap pills, fill a strong bar without pills */
  @property({type: String}) barStyle: GaugeValveStyle = GaugeValveStyle.tint;
  /** Through-flow of the right outlet port, 0-100 (%) */
  @property({type: Number}) value = 0;
  /**
   * Bottom outlet flow, 0-100 (%).
   * @availableWhen type==three-way
   */
  @property({type: Number}) bottomValue = 0;
  /** Show scale, labels, readout and setpoint layer */
  @property({type: Boolean}) large = false;
  /**
   * Readout label text.
   * @availableWhen large==true
   */
  @property({type: String}) label = '';
  /**
   * Readout unit text.
   * @availableWhen large==true
   */
  @property({type: String}) unit = '';
  /**
   * Identifier line under the compact readout stack, e.g. '#0001'.
   * @availableWhen large==false && hasLabelStack==true
   */
  @property({type: String}) tag = '';
  /**
   * Render the readout stack below the face in the compact variant.
   * @availableWhen large==false
   */
  @property({type: Boolean, attribute: false}) hasLabelStack = true;
  /**
   * Ring diameter in CSS pixels. When set, the face renders at a fixed
   * intrinsic size (equal circumference across instruments sharing the
   * value); when unset (default), the face contain-fits its container.
   */
  @property({type: Number, attribute: 'face-diameter', reflect: true})
  faceDiameter: number | undefined;

  private _resizeController = new ResizeController(this, {});

  override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    observeInnerBox(this._resizeController, this.renderRoot);
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

  private renderTrack(centerAngle: number, fillPercent: number) {
    const halfSpan =
      this.type === GaugeValveType.threeWay
        ? TRACK_HALF_SPANS.threeWay
        : TRACK_HALF_SPANS.twoWay;
    const pct = clampPercent(fillPercent);
    const capHalf = (halfSpan * pct) / 100;
    const barCorner = Math.min(
      TRACK_CORNER_RADIUS,
      (capHalf * Math.PI * TRACK_INNER_RADIUS) / 180
    );
    const sector = (halfExtent: number, cornerRadius: number) =>
      roundedArch({
        startAngle: centerAngle - halfExtent,
        endAngle: centerAngle + halfExtent,
        r: TRACK_INNER_RADIUS,
        R: TRACK_OUTER_RADIUS,
        roundOutsideCut: cornerRadius > 0,
        roundInsideCut: cornerRadius > 0,
        roundRadius: cornerRadius,
      });
    const isFill = this.barStyle === GaugeValveStyle.fill;
    const trackPath = sector(halfSpan, TRACK_CORNER_RADIUS);
    const clipId = `gauge-valve-track-clip-${centerAngle}`;
    return svg`
      <path
        class="track"
        vector-effect="non-scaling-stroke"
        d=${trackPath}
      />
      ${
        pct > 0
          ? svg`
        ${
          isFill
            ? svg`<clipPath id=${clipId}><path d=${trackPath} /></clipPath>`
            : nothing
        }
        <path
          class="bar"
          clip-path=${isFill ? `url(#${clipId})` : nothing}
          d=${isFill ? sector(capHalf, 0) : sector(capHalf, barCorner)}
        />
        ${
          isFill
            ? nothing
            : [centerAngle - capHalf, centerAngle + capHalf].map(
                (angle) => svg`
            <path class="cap-back" d=${radialLinePath(CAP_INNER_RADIUS, CAP_OUTER_RADIUS, angle)} />
            <path class="cap-front" d=${radialLinePath(CAP_INNER_RADIUS, CAP_OUTER_RADIUS, angle)} />
          `
              )
        }
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

  private renderScale(labelsHidden: boolean) {
    const ticks = [];
    for (let pct = 0; pct <= 100; pct += TICK_SECONDARY_STEP) {
      if (pct % TICK_PRIMARY_STEP === 0) continue;
      ticks.push(svg`
        <path
          class="tick-secondary"
          vector-effect="non-scaling-stroke"
          d=${radialLinePath(TICK_BASELINE_RADIUS, TICK_SECONDARY_OUTER_RADIUS, scaleAngle(pct))}
        />
      `);
    }
    for (let pct = 0; pct <= 100; pct += TICK_PRIMARY_STEP) {
      ticks.push(svg`
        <path
          class="tick-primary"
          vector-effect="non-scaling-stroke"
          d=${radialLinePath(TICK_BASELINE_RADIUS, TICK_PRIMARY_OUTER_RADIUS, scaleAngle(pct))}
        />
      `);
    }
    const labels = labelsHidden
      ? nothing
      : SCALE_LABEL_VALUES.map((pct) => {
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
      priority: this.sharedPriority,
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
        style="transform: rotate(${angle + 90}deg) translateX(${-radius}px) rotate(270deg);"
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
    const isOff = this.priority === GaugeValvePriority.off;
    const pct = (y: number) =>
      `${(((y - frame.y) / frame.height) * 100).toFixed(4)}%`;
    const readoutY =
      this.type === GaugeValveType.threeWay
        ? READOUT_ANCHOR_Y.threeWay
        : READOUT_ANCHOR_Y.twoWay;
    const anchors = `--scale: ${frame.scale}; --icon-size: ${(
      (ICON_SIZE / frame.width) *
      100
    ).toFixed(4)}%; --readout-top: ${pct(readoutY)};`;
    const faceBoxStyle =
      frame.hostWidthPx !== undefined
        ? `width: ${frame.hostWidthPx}px; height: ${frame.hostHeightPx}px;`
        : nothing;
    return html`
      <div
        class="root ${this.large ? 'large' : 'small'} ${this.type ===
        GaugeValveType.threeWay
          ? 'three-way'
          : 'two-way'} priority-${this.priority} style-${this.barStyle} ${this
          .faceDiameter !== undefined
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
            <svg class="layer" viewBox=${frame.viewBox}>
              <circle class="face" r=${SCALE_RADIUS} />
              <circle
                class="outline"
                vector-effect="non-scaling-stroke"
                r=${SCALE_RADIUS}
              />
              ${isOff
                ? nothing
                : this.renderTrack(90, clampPercent(this.value))}
              ${isOff ? nothing : this.renderTrack(270, this.inletFillPercent)}
              ${!isOff && this.type === GaugeValveType.threeWay
                ? this.renderTrack(180, clampPercent(this.bottomValue))
                : nothing}
              ${this.large ? this.renderScale(frame.labelsHidden) : nothing}
              ${this.large ? this.renderSetpoint() : nothing}
            </svg>
            <div class="icon"><slot name="icon"></slot></div>
            ${this.large ? this.renderReadout() : nothing}
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
