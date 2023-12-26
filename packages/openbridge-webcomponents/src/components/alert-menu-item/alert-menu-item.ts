import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-menu-item.style';
import {renderTime} from '../../time';
import {classMap} from 'lit/directives/class-map.js';

@customElement('obc-alert-menu-item')
export class AlertMenuItem extends LitElement {
  @property({type: String}) message = 'Message';
  @property({type: String}) time = '2021-01-01T00:00:00Z';
  @property({type: String, attribute: 'time-since'}) timeSince = '1h';
  @property({type: Boolean}) acknowledgeble = false;
  @property({type: Boolean}) acknowledged = false;
  @property({type: Boolean}) narrow = false;

  override render() {
    const time = renderTime(new Date(this.time));
    return html`
      <div class=${classMap({alert: true, narrow: this.narrow})}>
        <div class="icon">
          <slot name="icon"> </slot>
        </div>
        <div class="message">${this.message}</div>
        <div class="time-wrapper">
          <div class="time">${time}</div>
          <div class="time-since">${this.timeSince}</div>
        </div>
        <div class="acknowledge">
          ${this.acknowledgeble && !this.acknowledged
            ? html`
                <obc-button class="acknowledge-button" full-width
                  >ACK</obc-button
                >
              `
            : ''}
        </div>
      </div>
    `;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-alert-menu-item': AlertMenuItem;
  }
}
