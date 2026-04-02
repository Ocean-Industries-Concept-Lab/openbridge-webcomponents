import {LitElement, css, html} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {WatchCircleType, RotType, RotPosition} from '../watch/watch.js';
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
 *   configured `rotationsPerMinute`.
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
 * - Set `rotationsPerMinute` to the current sensor value; sign controls
 *   spin direction (positive = clockwise).
 * - In bar mode, `barStartAngle` and `barEndAngle` define the static arc
 *   span (0° = 12 o'clock, clockwise).
 * - Change `watchCircleType` to match the surrounding instrument ring style
 *   (e.g. `triple` for compass contexts).
 *
 * @element obc-rate-of-turn
 */
@customElement('obc-rate-of-turn')
export class ObcRateOfTurn extends LitElement {
  @property({type: Number}) rotationsPerMinute: number = 1;

  @property({type: String}) rotType: RotType = RotType.dots;
  @property({type: String}) rotPosition: RotPosition = RotPosition.scale;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: Number}) barStartAngle: number = 0;
  @property({type: Number}) barEndAngle: number = 30;
  @property({type: String}) watchCircleType: WatchCircleType =
    WatchCircleType.single;

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
        .rotationsPerMinute=${this.rotationsPerMinute}
      ></obc-watch>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rate-of-turn': ObcRateOfTurn;
  }
}
