import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './sequence-connector.css?inline';

export enum SequenceConnectorType {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum SequenceConnectorState {
  notStarted = 'not-started',
  loading = 'loading',
  completed = 'completed',
  stepsBetween = 'steps-between',
}

export enum SequenceConnectorDirection {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

/**
 * `<obc-sequence-connector>` renders the connecting line.
 *
 * - Use `type` to match the adjacent step size.
 * - Use `state="loading"` with `loading-bar-percent` to show progress.
 * - Use `direction` to switch between horizontal and vertical connectors.
 *
 * Example:
 * ```html
 * <obc-sequence-connector
 *   type="medium"
 *   state="loading"
 *   direction="horizontal"
 *   loading-bar-percent="66"
 * ></obc-sequence-connector>
 * ```
 */
@customElement('obc-sequence-connector')
export class ObcSequenceConnector extends LitElement {
  @property({type: String}) type: SequenceConnectorType =
    SequenceConnectorType.medium;
  @property({type: String}) state: SequenceConnectorState =
    SequenceConnectorState.notStarted;
  @property({type: String}) direction: SequenceConnectorDirection =
    SequenceConnectorDirection.horizontal;
  @property({type: Number, attribute: 'loading-bar-percent'})
  loadingBarPercent = 66;

  private get wrapperClasses() {
    return {
      'sequence-connector': true,
      [`type-${this.type}`]: true,
      [`state-${this.state}`]: true,
    };
  }

  private get containerClasses() {
    return {
      [`direction-${this.direction}`]: true,
      [`state-${this.state}`]: true,
    };
  }

  private get clampedLoadingBarPercent(): number {
    return Math.min(100, Math.max(0, this.loadingBarPercent));
  }

  override render() {
    return html`
      <div class=${classMap(this.containerClasses)}>
        <div
          class=${classMap(this.wrapperClasses)}
          style=${styleMap({
            '--loading-bar-percent': `${this.clampedLoadingBarPercent}%`,
          })}
          part="wrapper"
        >
          <div class="line" part="line">
            ${this.state === SequenceConnectorState.loading
              ? html`<span class="loading-bar" part="loading-bar"></span>`
              : nothing}
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-sequence-connector': ObcSequenceConnector;
  }
}
