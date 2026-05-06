import {LitElement, css, html} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {WatchCircleType, RotType, RotPosition} from '../watch/watch.js';
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
 * - **Color priority**: Uses `priority` to select regular or enhanced color
 *   palette.
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

  static override styles = css`
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
  `;

  override render() {
    return html`<div class="container">
      <obc-watch
        .watchCircleType=${this.watchCircleType}
        .priority=${this.priority}
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
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rate-of-turn': ObcRateOfTurn;
  }
}
