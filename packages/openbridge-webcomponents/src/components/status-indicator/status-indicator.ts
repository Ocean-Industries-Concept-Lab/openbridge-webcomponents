import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './status-indicator.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {property} from 'lit/decorators.js';

export enum StatusIndicatorStatus {
  active = 'active',
  inactive = 'inactive',
  caution = 'caution',
  warning = 'warning',
  alarm = 'alarm',
  running = 'running',
}

@customElement('obc-status-indicator')
export class ObcStatusIndicator extends LitElement {
  @property({type: String}) status = StatusIndicatorStatus.active;
  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          ['state-' + this.status]: true,
        })}
      >
        <div class="indicator-container">
          <div class="indicator"></div>
        </div>
        <div class="label">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-status-indicator': ObcStatusIndicator;
  }
}
