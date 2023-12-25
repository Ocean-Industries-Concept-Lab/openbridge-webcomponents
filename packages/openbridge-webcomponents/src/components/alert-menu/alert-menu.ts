import {LitElement, unsafeCSS, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-menu.style';
import {renderTime} from '../../time';
import '../button/button';
import '../card-list-button/card-list-button';
import {classMap} from 'lit/directives/class-map.js';

export interface AlertAcknowledgeble {
  id: string;
  icon: string;
  message: string;
  type: 'alarm' | 'warning' | 'caution' | 'running';
  acknowledged: boolean;
  acknowledgeble: true;
  time: Date;
  timeSince: string;
}

export interface AlertNotAcknowledgeble {
  id: string;
  icon: string;
  message: string;
  type: 'alarm' | 'warning' | 'caution' | 'running';
  acknowledgeble: false;
  time: Date;
  timeSince: string;
}

export type Alert = AlertAcknowledgeble | AlertNotAcknowledgeble;

@customElement('obc-alert-menu')
export class AlertMenu extends LitElement {
  @property({attribute: false}) alerts: Array<Alert> = [];
  @property({type: Boolean}) narrow: boolean = false;

  override render() {
    return html`
      <div class=${classMap({wrapper: true, narrow: this.narrow})}>
        <div class="header">
          <div class="title">Active alerts</div>
          <obc-button variant="raised" class="ack-all-btn">ACK ALL</obc-button>
        </div>
        <div class="divider"></div>
        ${this.alerts.map((a) => renderAlertItem(a))}
        <div class="divider"></div>
        <obc-card-list-button class="alert-list-btn">
          <obc-icon
            slot="leading-icon"
            icon="14-alert-list"
            size="24"
          ></obc-icon>
          Alert list
          <obc-icon
            slot="trailing-icon"
            icon="02-chevron-right"
            size="24"
          ></obc-icon>
        </obc-card-list-button>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

function renderAlertItem(alert: Alert) {
  const time = renderTime(alert.time);
  return html`
    <div class="alert">
      <div class="icon">
        <obc-icon icon="${alert.icon}" use-css-color size="32"> </obc-icon>
      </div>
      <div class="message">${alert.message}</div>
      <div class="time-wrapper">
        <div class="time">${time}</div>
        <div class="time-since">${alert.timeSince}</div>
      </div>
      <div class="acknowledge">
        ${alert.acknowledgeble && !alert.acknowledged
          ? html`
              <obc-button class="acknowledge-button" full-width>ACK</obc-button>
            `
          : ''}
      </div>
    </div>
    <div class="divider"></div>
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-menu': AlertMenu;
  }
}
