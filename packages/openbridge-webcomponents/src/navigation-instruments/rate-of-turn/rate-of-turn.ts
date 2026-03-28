import {LitElement, css, html} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {WatchCircleType, RotType, RotPosition} from '../watch/watch.js';
import {customElement} from '../../decorator.js';
import {Priority} from '../types.js';

export {RotType, RotPosition};

@customElement('obc-rate-of-turn')
export class ObcRateOfTurn extends LitElement {
  @property({type: Number}) rotationsPerMinute: number = 1;

  @property({type: String}) type: RotType = RotType.dots;
  @property({type: String}) position: RotPosition = RotPosition.scale;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: Number}) barStartAngle: number = 0;
  @property({type: Number}) barEndAngle: number = 30;
  @property({type: String}) watchCircleType: WatchCircleType =
    WatchCircleType.single;

  private get dotColor(): string {
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private get barBgColor(): string {
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

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
        .rotType=${this.type}
        .rotPosition=${this.position}
        .rotStartAngle=${this.barStartAngle}
        .rotEndAngle=${this.barEndAngle}
        .rotColor=${this.dotColor}
        .rotBarColor=${this.barBgColor}
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
