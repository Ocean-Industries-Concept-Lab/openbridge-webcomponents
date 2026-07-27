import {html, svg, LitElement, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import type {PropertyValues} from 'lit';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {
  applyPinnedHostSize,
  computeRadialFrame,
  estimateLabelWidthPx,
  measureContainerPx,
  observeInnerBox,
  type RadialFrame,
} from '../../svghelpers/radial-frame.js';
import {InstrumentState, Priority} from '../types.js';
import {SetpointBundle} from '../../svghelpers/setpoint-bundle.js';
import '../watch/watch.js';
import {
  OUTER_RING_RADIUS,
  WatchCircleType,
  innerRingRadiusFor,
  type WatchBarArea,
  type WatchNeedle,
} from '../watch/watch.js';
import {Tickmark, TickmarkStyle, TickmarkType} from '../watch/tickmark.js';
import {PropellerImage, propellerImages} from '../watch/propeller.js';
import {customElement} from '../../decorator.js';
import componentStyle from './top-view-propulsion.css?inline';

export enum TopViewPropulsionType {
  power = 'power',
  pitchRpm = 'pitch-rpm',
}

const FULL_CIRCLE_END_ANGLE = 359.999;
const LOADING_ARC_RADIUS = (OUTER_RING_RADIUS + 320 / 2) / 2;
const PROPELLER_SCALE = 224 / 160;
/* pitch-rpm subdivision of the 112..160 band (Figma: divider outer edge at
   264 diameter): secondary pitch lane 112..120, white divider 120..128,
   primary sub-band 128..160. */
const BAND_INNER_RADIUS = innerRingRadiusFor(WatchCircleType.double);
const BAND_OUTER_RADIUS = innerRingRadiusFor(WatchCircleType.single);
const SECONDARY_LINE_WIDTH = 8;
const DIVIDER_WIDTH = 8;
const SECONDARY_LANE_RADIUS = BAND_INNER_RADIUS + SECONDARY_LINE_WIDTH / 2;
const DIVIDER_RADIUS =
  BAND_INNER_RADIUS + SECONDARY_LINE_WIDTH + DIVIDER_WIDTH / 2;
const PRIMARY_SUBBAND_INNER_RADIUS =
  BAND_INNER_RADIUS + SECONDARY_LINE_WIDTH + DIVIDER_WIDTH;
const RPM_NEEDLE_LENGTH = BAND_OUTER_RADIUS - PRIMARY_SUBBAND_INNER_RADIUS;

function percentToAngle(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.max(-100, Math.min(100, value)) * 1.8;
}

function arcPath(radius: number, startDeg: number, endDeg: number): string {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const x1 = radius * Math.cos(toRad(startDeg));
  const y1 = radius * Math.sin(toRad(startDeg));
  const x2 = radius * Math.cos(toRad(endDeg));
  const y2 = radius * Math.sin(toRad(endDeg));
  const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  const sweep = endDeg > startDeg ? 1 : 0;
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${x2} ${y2}`;
}

/**
 * Top View Propulsion - a propulsion gauge on a circular watch face with a
 * top-view propeller in the center.
 *
 * ## Features / Variants
 * - `power` type: signed percent value shown as a tinted arc on the inner
 *   track from the thick zero line, with a needle at the arc end.
 * - `pitch-rpm` type: rpm on the primary track (same rendering as power)
 *   plus pitch as a thin secondary arc at the track's inner edge with its
 *   own zero mark and end nub.
 * - Interchangeable center propeller art (`PropellerImage`).
 * - Full setpoint support (marker, adjustment preview, at-setpoint states)
 *   for the primary axis (power or rpm).
 * - Loading progress arc on the outer ring while `state` is `loading`.
 *
 * ## Usage Guidelines
 * Use for a propulsion unit overview. For an azimuthing unit with a
 * direction bar, use `obc-azimuth-thruster` instead.
 *
 * @experimental The API of this component is under design review and may
 * change in a future release.
 */
@customElement('obc-top-view-propulsion')
export class ObcTopViewPropulsion extends LitElement {
  @property({type: String}) type: TopViewPropulsionType =
    TopViewPropulsionType.power;

  /**
   * Signed power in percent: 0 at the top, positive clockwise, ±100% = ±180°.
   * @availableWhen type==power
   */
  @property({type: Number}) power = 0;
  /** @availableWhen type==power */
  @property({type: Number}) powerSetpoint: number | undefined;
  /** @availableWhen type==power && powerSetpoint!=undefined */
  @property({type: Number}) newPowerSetpoint: number | undefined;
  /** @availableWhen type==power && powerSetpoint!=undefined && autoAtPowerSetpoint==false */
  @property({type: Boolean}) atPowerSetpoint = false;
  /** @availableWhen type==power && powerSetpoint!=undefined */
  @property({type: Number}) powerSetpointAtZeroDeadband = 0.1;
  /** @availableWhen type==power && powerSetpoint!=undefined */
  @property({type: Boolean}) powerSetpointOverride = false;
  /** @availableWhen type==power && powerSetpoint!=undefined */
  @property({type: Boolean, attribute: false}) autoAtPowerSetpoint = true;
  /** @availableWhen type==power && powerSetpoint!=undefined && autoAtPowerSetpoint==true */
  @property({type: Number}) autoAtPowerSetpointDeadband = 1;

  /**
   * Signed rpm in percent of the maximum: 0 at the top, positive clockwise,
   * ±100% = ±180°. Shown on the primary track.
   * @availableWhen type==pitch-rpm
   */
  @property({type: Number}) rpm = 0;
  /** @availableWhen type==pitch-rpm */
  @property({type: Number}) rpmSetpoint: number | undefined;
  /** @availableWhen type==pitch-rpm && rpmSetpoint!=undefined */
  @property({type: Number}) newRpmSetpoint: number | undefined;
  /** @availableWhen type==pitch-rpm && rpmSetpoint!=undefined && autoAtRpmSetpoint==false */
  @property({type: Boolean}) atRpmSetpoint = false;
  /** @availableWhen type==pitch-rpm && rpmSetpoint!=undefined */
  @property({type: Number}) rpmSetpointAtZeroDeadband = 0.1;
  /** @availableWhen type==pitch-rpm && rpmSetpoint!=undefined */
  @property({type: Boolean}) rpmSetpointOverride = false;
  /** @availableWhen type==pitch-rpm && rpmSetpoint!=undefined */
  @property({type: Boolean, attribute: false}) autoAtRpmSetpoint = true;
  /** @availableWhen type==pitch-rpm && rpmSetpoint!=undefined && autoAtRpmSetpoint==true */
  @property({type: Number}) autoAtRpmSetpointDeadband = 1;

  /**
   * Signed pitch in percent: 0 at the top, positive clockwise, ±100% = ±180°.
   * Shown as the thin secondary arc.
   * @availableWhen type==pitch-rpm
   */
  @property({type: Number}) pitch = 0;

  /** @availableWhen powerSetpoint!=undefined || rpmSetpoint!=undefined */
  @property({type: Boolean}) touching = false;
  /** @availableWhen powerSetpoint!=undefined || rpmSetpoint!=undefined */
  @property({type: Boolean}) animateSetpoint = false;

  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) priority: Priority = Priority.regular;
  /**
   * Loading progress in percent, shown as an arc on the outer ring.
   * @availableWhen state==loading
   */
  @property({type: Number}) loading = 0;

  /**
   * Interval (in degrees) for primary tickmarks.
   * When undefined or <= 0, no primary tickmarks are shown (only the zero line).
   */
  @property({type: Number}) primaryTickmarkInterval: number | undefined = 90;
  /**
   * Interval (in degrees) for secondary tickmarks.
   * When undefined or <= 0, no secondary tickmarks are shown.
   */
  @property({type: Number}) secondaryTickmarkInterval: number | undefined =
    undefined;
  /**
   * Interval (in degrees) for tertiary tickmarks.
   * When undefined or <= 0, no tertiary tickmarks are shown.
   */
  @property({type: Number}) tertiaryTickmarkInterval: number | undefined =
    undefined;
  @property({type: Boolean}) showLabels = false;
  @property({type: Boolean}) tickmarksInside = false;
  @property({type: String}) tickmarkStyle: TickmarkStyle =
    TickmarkStyle.regular;
  @property({type: Boolean, attribute: false}) hasLabelSpacer = true;

  @property({type: String}) propeller: PropellerImage =
    PropellerImage.fourBlade;

  /**
   * Outer-ring diameter in CSS pixels. When set, the instrument renders at a
   * fixed intrinsic size derived from the ring, arc shape and label reserve —
   * so instruments sharing the same value have identical ring circumference
   * regardless of label width or arc extent (like obc-donut-chart's
   * fixedHeight). When unset (default), the instrument fills its container.
   */
  @property({type: Number, attribute: 'face-diameter'})
  faceDiameter: number | undefined;

  private _powerSp = new SetpointBundle({
    defaultDeadband: 1,
    defaultZeroDeadband: 0.1,
    onAnimationEnd: () => this.requestUpdate(),
  });
  private _rpmSp = new SetpointBundle({
    defaultDeadband: 1,
    defaultZeroDeadband: 0.1,
    onAnimationEnd: () => this.requestUpdate(),
  });

  private _frame: RadialFrame | undefined;
  private _hostSizePinned = false;
  private _resizeController = new ResizeController(this, {});

  override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    observeInnerBox(this._resizeController, this.renderRoot);
  }

  override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    this._powerSp.sync({
      setpoint: this.powerSetpoint,
      newSetpoint: this.newPowerSetpoint,
      atSetpoint: this.atPowerSetpoint,
      touching: this.touching,
      autoAtSetpoint: this.autoAtPowerSetpoint,
      autoAtSetpointDeadband: this.autoAtPowerSetpointDeadband,
      setpointAtZeroDeadband: this.powerSetpointAtZeroDeadband,
      setpointOverride: this.powerSetpointOverride,
      animateSetpoint: this.animateSetpoint,
    });
    this._rpmSp.sync({
      setpoint: this.rpmSetpoint,
      newSetpoint: this.newRpmSetpoint,
      atSetpoint: this.atRpmSetpoint,
      touching: this.touching,
      autoAtSetpoint: this.autoAtRpmSetpoint,
      autoAtSetpointDeadband: this.autoAtRpmSetpointDeadband,
      setpointAtZeroDeadband: this.rpmSetpointAtZeroDeadband,
      setpointOverride: this.rpmSetpointOverride,
      animateSetpoint: this.animateSetpoint,
    });
  }

  private get isPitchRpm(): boolean {
    return this.type === TopViewPropulsionType.pitchRpm;
  }

  private get primaryValue(): number {
    return this.isPitchRpm ? this.rpm : this.power;
  }

  private get primarySp(): SetpointBundle {
    return this.isPitchRpm ? this._rpmSp : this._powerSp;
  }

  private get primarySetpoint(): number | undefined {
    return this.isPitchRpm ? this.rpmSetpoint : this.powerSetpoint;
  }

  private get primaryNewSetpoint(): number | undefined {
    return this.isPitchRpm ? this.newRpmSetpoint : this.newPowerSetpoint;
  }

  private get primaryZeroDeadband(): number {
    return this.isPitchRpm
      ? this.rpmSetpointAtZeroDeadband
      : this.powerSetpointAtZeroDeadband;
  }

  private get primarySetpointOverride(): boolean {
    return this.isPitchRpm
      ? this.rpmSetpointOverride
      : this.powerSetpointOverride;
  }

  override updated(changed: PropertyValues): void {
    super.updated(changed);
    this._hostSizePinned = applyPinnedHostSize(
      this,
      this._frame,
      this._hostSizePinned
    );
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._powerSp.dispose();
    this._rpmSp.dispose();
  }

  private get isActive(): boolean {
    return (
      this.state !== InstrumentState.loading &&
      this.state !== InstrumentState.off
    );
  }

  private get isEnhanced(): boolean {
    return this.priority === Priority.enhanced;
  }

  private getTickmarks(): Tickmark[] {
    const tickmarks: Tickmark[] = [];
    const skipAngles: number[] = [];

    const labelText = (angle: number): string | undefined => {
      if (!this.showLabels) return undefined;
      return angle <= 180 ? `${angle}` : `${angle - 360}`;
    };

    tickmarks.push({
      angle: 0,
      type: TickmarkType.zeroLineThick,
      text: this.showLabels ? '0' : undefined,
      color:
        this.isActive && this.isEnhanced
          ? 'var(--instrument-enhanced-tertiary-color)'
          : undefined,
    });
    skipAngles.push(0);

    const addInterval = (
      interval: number | undefined,
      type: TickmarkType,
      withLabels = false
    ) => {
      if (interval === undefined || interval <= 0 || !Number.isFinite(interval))
        return;
      for (let i = interval; i < 360; i += interval) {
        if (skipAngles.includes(i)) continue;
        tickmarks.push({
          angle: i,
          type,
          text: withLabels ? labelText(i) : undefined,
        });
        skipAngles.push(i);
      }
    };

    addInterval(this.primaryTickmarkInterval, TickmarkType.primary, true);
    addInterval(this.secondaryTickmarkInterval, TickmarkType.secondary);
    addInterval(this.tertiaryTickmarkInterval, TickmarkType.tertiary);

    return tickmarks;
  }

  private getBarAreas(): WatchBarArea[] {
    const areas: WatchBarArea[] = [
      {
        startAngle: 0,
        endAngle: FULL_CIRCLE_END_ANGLE,
        fillColor: 'var(--instrument-frame-secondary-color)',
      },
    ];
    const valueAngle = percentToAngle(this.primaryValue);
    if (this.isActive && Math.abs(valueAngle) > 0.1) {
      areas.push({
        startAngle: Math.min(0, valueAngle),
        endAngle: Math.max(0, valueAngle),
        fillColor: this.isEnhanced
          ? 'var(--instrument-enhanced-tertiary-color)'
          : 'var(--instrument-regular-tertiary-color)',
        innerRadius: this.isPitchRpm ? PRIMARY_SUBBAND_INNER_RADIUS : undefined,
      });
    }
    return areas;
  }

  private getNeedles(): WatchNeedle[] {
    const fill = !this.isActive
      ? 'var(--instrument-frame-tertiary-color)'
      : this.isEnhanced
        ? 'var(--instrument-enhanced-secondary-color)'
        : 'var(--instrument-regular-secondary-color)';
    const stroke = !this.isActive
      ? 'var(--border-silhouette-color)'
      : this.isEnhanced
        ? 'var(--instrument-enhanced-tertiary-color)'
        : 'var(--instrument-regular-tertiary-color)';
    return [
      {
        angle: percentToAngle(this.primaryValue),
        fillColor: fill,
        strokeColor: stroke,
        length: this.isPitchRpm ? RPM_NEEDLE_LENGTH : undefined,
      },
    ];
  }

  private get secondaryColor(): string {
    if (!this.isActive) {
      return 'var(--instrument-frame-tertiary-color)';
    }
    return this.isEnhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private renderSecondaryArc() {
    if (!this.isPitchRpm) {
      return nothing;
    }
    const r = SECONDARY_LANE_RADIUS;
    const divider = svg`<circle
      r=${DIVIDER_RADIUS}
      fill="none"
      stroke="var(--instrument-frame-primary-color)"
      stroke-width=${DIVIDER_WIDTH}
    ></circle>`;
    const pitchAngle = percentToAngle(this.pitch);
    if (!this.isActive || Math.abs(pitchAngle) < 0.5) {
      return svg`
        ${divider}
        <circle
          cx="0" cy=${-r}
          r=${SECONDARY_LINE_WIDTH / 2}
          fill=${this.secondaryColor}
        ></circle>
      `;
    }
    const toRad = ((pitchAngle - 90) * Math.PI) / 180;
    const endX = r * Math.cos(toRad);
    const endY = r * Math.sin(toRad);
    return svg`
      ${divider}
      <path
        d=${arcPath(r, 0, pitchAngle)}
        fill="none"
        stroke=${this.secondaryColor}
        stroke-width=${SECONDARY_LINE_WIDTH}
        stroke-linecap="butt"
      ></path>
      <circle
        cx=${endX} cy=${endY}
        r=${SECONDARY_LINE_WIDTH / 2}
        fill=${this.secondaryColor}
      ></circle>
    `;
  }

  private renderLoadingArc() {
    if (this.state !== InstrumentState.loading || this.loading <= 0) {
      return nothing;
    }
    const endAngle = percentToAngle(Math.abs(this.loading)) * 2;
    return svg`<path
      d=${arcPath(LOADING_ARC_RADIUS, 0, Math.min(endAngle, FULL_CIRCLE_END_ANGLE))}
      fill="none"
      stroke=${
        this.isEnhanced
          ? 'var(--instrument-enhanced-secondary-color)'
          : 'var(--instrument-regular-secondary-color)'
      }
      stroke-width="8"
      stroke-linecap="round"
    ></path>`;
  }

  private renderPropeller() {
    return svg`<g transform="scale(${PROPELLER_SCALE}) translate(-80 -80)">${
      propellerImages[this.propeller]
    }</g>`;
  }

  override render() {
    const tickmarks = this.getTickmarks();

    const frame = computeRadialFrame({
      basePadding: this.hasLabelSpacer ? 24 : 16,
      labelWidthPx:
        this.hasLabelSpacer && !this.tickmarksInside
          ? estimateLabelWidthPx(tickmarks.map((t) => t.text))
          : 0,
      containerPx: measureContainerPx(this),
      faceDiameter: this.faceDiameter,
    });
    this._frame = frame;
    const shownTickmarks = frame.labelsHidden
      ? tickmarks.map((t) => ({...t, text: undefined}))
      : tickmarks;

    const setpointAngle =
      this.primarySetpoint !== undefined
        ? percentToAngle(this.primarySetpoint)
        : undefined;
    const newSetpointAngle =
      this.primaryNewSetpoint !== undefined
        ? percentToAngle(this.primaryNewSetpoint)
        : undefined;

    return html`
      <div class="container">
        <obc-watch
          .touching=${this.touching}
          .arcFrame=${frame}
          .tickmarks=${shownTickmarks}
          .state=${this.state}
          .priority=${this.priority}
          .barAreas=${this.getBarAreas()}
          .needles=${this.getNeedles()}
          .angleSetpoint=${setpointAngle}
          .newAngleSetpoint=${newSetpointAngle}
          .atAngleSetpoint=${this.primarySp.computeAtSetpoint(
            this.primaryValue
          )}
          .angleSetpointAtZeroDeadband=${this.primaryZeroDeadband * 1.8}
          .setpointOverride=${this.primarySetpointOverride}
          .animateSetpoint=${this.animateSetpoint}
          .tickmarksInside=${this.tickmarksInside}
          .tickmarkStyle=${this.tickmarkStyle}
        ></obc-watch>
        <svg viewBox=${frame.viewBox} xmlns="http://www.w3.org/2000/svg">
          ${this.renderLoadingArc()} ${this.renderSecondaryArc()}
          ${this.renderPropeller()}
        </svg>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-top-view-propulsion': ObcTopViewPropulsion;
  }
}
