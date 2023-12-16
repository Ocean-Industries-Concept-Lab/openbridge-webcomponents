import {LitElement, unsafeCSS, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-menu.css?inline';
import {renderTime} from '../../time';
import '../button/button';
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

  render() {
    return html`
      <div class=${classMap({wrapper: true, narrow: this.narrow})}>
        <div class="header">
          <div class="title">Active alerts</div>
          <obc-button variant="raised" class="ack-all-btn">ACK ALL</obc-button>
        </div>
        <div class="divider"></div>
        ${this.alerts.map((a) => renderAlertItem(a))}
        <div class="divider"></div>
        <obc-button variant="flat" full-width left-align class="alert-list-btn"
          >Alert list
          <obc-icon
            icon="14-alert-list"
            slot="leading-icon"
            size="24"
          ></obc-icon>
          <obc-icon
            icon="02-chevron-right"
            slot="trailing-icon"
            size="24"
          ></obc-icon>
        </obc-button>
      </div>
    `;
  }

  static styles = unsafeCSS(compentStyle);
}

function renderAlertItem(alert: Alert) {
  const time = renderTime(alert.time);
  return html`
    <div class="alert">
      <div class="icon">
        <obc-icon icon="${alert.icon}" useCssColor size="32">
        </obc-icon>
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
