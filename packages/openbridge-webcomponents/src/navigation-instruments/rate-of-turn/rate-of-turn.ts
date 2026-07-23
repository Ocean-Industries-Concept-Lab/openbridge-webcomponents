import {LitElement, css, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {WatchCircleType, RotType, RotPosition} from '../watch/watch.js';
import {Tickmark, TickmarkType} from '../watch/tickmark.js';
import {
  centerReadoutStyles,
  renderCenterReadouts,
} from '../readout/center-readout.js';
import {ReadoutSize} from '../readout/readout.js';
import instrumentReadoutStyle from '../readout/instrument-readout.css?inline';
import {ROT_ZERO_DEADBAND_DEG} from './rot-renderer.js';
import {customElement} from '../../decorator.js';
import {Priority} from '../types.js';

export {RotType, RotPosition};

/**
 * `<obc-rate-of-turn>` — Standalone rate-of-turn indicator rendered on a circular watch face.
 *
 * Wraps `<obc-watch>` to display a spinning-dot or arc-bar ROT visualization
 * without any additional instrument overlays. Useful for isolating the ROT
 * indicator in layouts where heading/compass elements are handled separately.
 *
 * ## Features
 *
 * - **Dot mode** (`rotType="dots"`): Five evenly-spaced dots spin at the
 *   resolved rotations-per-minute (derived from
 *   `rateOfTurnDegreesPerMinute × rotDotAnimationFactor / 360`).
 * - **Bar mode** (`rotType="bar"`): A banana-shaped arc from `barStartAngle`
 *   to `barEndAngle` with clipped spinning dots inside.
 * - **Track position**: Place the indicator on the outer scale ring
 *   (`rotPosition="scale"`) or the inner circle
 *   (`rotPosition="innerCircle"`).
 * - **Track bar** (`hasTrackBar`): A bar in the ring band growing from the
 *   twelve o'clock position to the measured rate of turn, with a needle
 *   marker at its end and sector tickmarks (pairs with
 *   `watchCircleType="double"` for the banded face).
 * - **Center readout** (`hasReadout`): A centered readout showing the
 *   measured rate of turn (label `ROT`, unit `DEG/min` by default).
 * - **Color priority**: Uses `priority` to select regular or enhanced color
 *   palette; `rotPortStarboard` colors the track bar and needle by turn
 *   direction.
 *
 * ## Usage Guidelines
 *
 * - Set `rateOfTurnDegreesPerMinute` to the current sensor value in degrees
 *   per minute (the maritime/AIS convention). Sign controls direction
 *   (positive = starboard / clockwise).
 * - Tune `rotDotAnimationFactor` to amplify the dot animation independently
 *   of the physical value (default `18` ≈ 1 rpm at 20°/min).
 * - In bar mode, `barStartAngle` and `barEndAngle` define the static arc
 *   span (0° = 12 o'clock, clockwise).
 * - Change `watchCircleType` to match the surrounding instrument ring style
 *   (e.g. `triple` for compass contexts).
 *
 * @element obc-rate-of-turn
 * @stable
 */
@customElement('obc-rate-of-turn')
export class ObcRateOfTurn extends LitElement {
  /**
   * Measured rate of turn in degrees per minute (positive = starboard).
   * When `undefined`, the legacy `rotationsPerMinute` value is used.
   */
  @property({type: Number}) rateOfTurnDegreesPerMinute: number | undefined;

  /**
   * Visual amplification applied to the spinning dot animation. Default `18`
   * keeps the legacy visual feel (≈1 rpm at 20°/min).
   */
  @property({type: Number}) rotDotAnimationFactor: number = 18;

  /**
   * @deprecated Use `rateOfTurnDegreesPerMinute` (and optionally
   * `rotDotAnimationFactor`) instead. Takes effect only when
   * `rateOfTurnDegreesPerMinute` is `undefined`.
   */
  @property({type: Number}) rotationsPerMinute: number = 1;

  @property({type: String}) rotType: RotType = RotType.dots;
  @property({type: String}) rotPosition: RotPosition = RotPosition.scale;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: Number}) barStartAngle: number = 0;
  @property({type: Number}) barEndAngle: number = 30;
  @property({type: String}) watchCircleType: WatchCircleType =
    WatchCircleType.single;
  @property({type: Boolean}) rotPortStarboard: boolean = false;
  @property({type: Number}) rotAtZeroDeadband: number = ROT_ZERO_DEADBAND_DEG;
  /**
   * When `true`, shows a bar in the ring band from the twelve o'clock
   * position to the measured rate of turn, with a needle marker at its end
   * and sector tickmarks. Pairs with `watchCircleType="double"` for the
   * banded face. Driven by `rateOfTurnDegreesPerMinute` only.
   */
  @property({type: Boolean}) hasTrackBar: boolean = false;
  /**
   * Bar-extent reference value in **degrees per minute**: the track bar
   * reaches ±`rotArcExtent` when the measured ROT equals ±`rotMaxValue`.
   * Default `60` aligns with ES-TRIN 2025/1 Art. 3.02.
   * @availableWhen hasTrackBar==true
   */
  @property({type: Number}) rotMaxValue: number = 60;
  /**
   * Arc extent of the track bar in degrees per direction. Default `60`.
   * @availableWhen hasTrackBar==true
   */
  @property({type: Number}) rotArcExtent: number = 60;
  /**
   * When `true`, shows a centered `<obc-readout>` with the measured rate of
   * turn. Shows a dash while `rateOfTurnDegreesPerMinute` is unset.
   */
  @property({type: Boolean}) hasReadout: boolean = false;
  /**
   * Readout label. Default `ROT`.
   * @availableWhen hasReadout==true
   */
  @property({type: String}) label = 'ROT';
  /**
   * Readout unit. Default `DEG/min`.
   * @availableWhen hasReadout==true
   */
  @property({type: String}) unit = 'DEG/min';
  /**
   * Number of fraction digits shown in the readout. Default `0`.
   * @availableWhen hasReadout==true
   */
  @property({type: Number}) fractionDigits = 0;

  private get trackBarAngle(): number {
    const max = this.rotMaxValue || 1;
    const rot = this.rateOfTurnDegreesPerMinute ?? 0;
    const ratio = Math.max(-1, Math.min(1, rot / max));
    return ratio * this.rotArcExtent;
  }

  private get trackBarColor(): string {
    if (this.rotPortStarboard) {
      const rot = this.rateOfTurnDegreesPerMinute ?? 0;
      if (rot > 0) {
        return 'var(--instrument-starboard-secondary-color)';
      }
      if (rot < 0) {
        return 'var(--instrument-port-secondary-color)';
      }
    }
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  private get trackNeedleColor(): string {
    if (this.rotPortStarboard) {
      const rot = this.rateOfTurnDegreesPerMinute ?? 0;
      if (rot > 0) {
        return 'var(--instrument-starboard-primary-color)';
      }
      if (rot < 0) {
        return 'var(--instrument-port-primary-color)';
      }
      return 'var(--instrument-regular-secondary-color)';
    }
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private get trackTickmarks(): Tickmark[] {
    const ticks: Tickmark[] = [{angle: 0, type: TickmarkType.main}];
    for (let angle = 30; angle <= this.rotArcExtent; angle += 30) {
      ticks.push({angle, type: TickmarkType.primary});
      ticks.push({angle: -angle, type: TickmarkType.primary});
    }
    return ticks;
  }

  static override styles = [
    unsafeCSS(instrumentReadoutStyle),
    centerReadoutStyles,
    css`
      * {
        box-sizing: border-box;
      }

      .container {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .container > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .center-readout-overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
    `,
  ];

  override render() {
    return html`<div class="container">
      <obc-watch
        .watchCircleType=${this.watchCircleType}
        .priority=${this.priority}
        .tickmarks=${this.hasTrackBar ? this.trackTickmarks : []}
        .barAreas=${this.hasTrackBar
          ? [
              {
                startAngle: 0,
                endAngle: this.trackBarAngle,
                fillColor: this.trackBarColor,
              },
            ]
          : []}
        .needles=${this.hasTrackBar
          ? [
              {
                angle: this.trackBarAngle,
                fillColor: this.trackNeedleColor,
                strokeColor: 'var(--border-silhouette-color)',
              },
            ]
          : []}
        .rotType=${this.rotType}
        .rotPosition=${this.rotPosition}
        .rotStartAngle=${this.barStartAngle}
        .rotEndAngle=${this.barEndAngle}
        .rateOfTurnDegreesPerMinute=${this.rateOfTurnDegreesPerMinute}
        .rotDotAnimationFactor=${this.rotDotAnimationFactor}
        .rotationsPerMinute=${this.rotationsPerMinute}
        .rotPortStarboard=${this.rotPortStarboard}
        .rotAtZeroDeadband=${this.rotAtZeroDeadband}
      ></obc-watch>
      ${this.hasReadout
        ? html`<div class="center-readout-overlay">
            ${renderCenterReadouts([
              {
                value: this.rateOfTurnDegreesPerMinute ?? null,
                label: this.label,
                unit: this.unit,
                fractionDigits: this.fractionDigits,
                size: ReadoutSize.large,
                priority: this.priority,
                centerValue: true,
                centerMeta: true,
              },
            ])}
          </div>`
        : nothing}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rate-of-turn': ObcRateOfTurn;
  }
}
