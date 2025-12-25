import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './integration-fleet-button.css?inline';
import {property} from 'lit/decorators.js';
import {msg} from '@lit/localize';
import '../../components/badge/badge.js';

export interface IntegrationFleetButtonReadout {
  label: string;
  value: string;
  unit: string;
}

@customElement('obc-integration-fleet-button')
export class ObcIntegrationFleetButton extends LitElement {
  @property({type: Boolean}) selected: boolean = false;
  @property({type: String}) fleetName: string = '';
  @property({type: String}) status: string = '';
  @property({type: Array, attribute: false})
  readouts: IntegrationFleetButtonReadout[] = [];
  @property({type: String}) alertTopic: string = '';
  @property({type: Object, attribute: false}) alerts: {
    alarm: number;
    warning: number;
    caution: number;
  } = {alarm: 0, warning: 0, caution: 0};

  override render() {
    const hasAlert =
      this.alerts.alarm > 0 ||
      this.alerts.warning > 0 ||
      this.alerts.caution > 0;
    return html`
      <button class="wrapper ${this.selected ? 'selected' : ''}">
        <div class="header">
          <div class="fleet-name">${this.fleetName}</div>
          <div class="status">${this.status}</div>
        </div>
        <div class="content">
          <div class="readouts">
            ${this.readouts.map(
              (readout) =>
                html`<div class="readout">
                  <div class="readout-label">${readout.label}</div>
                  <div class="readout-value">${readout.value}</div>
                  <div class="readout-unit">${readout.unit}</div>
                </div>`
            )}
          </div>
          <div class="alerts ${hasAlert ? 'has-alert' : 'no-alert'}">
            <div class="alert-icon ">
              <slot name="alert-topic-icon"></slot>
            </div>
            <div class="alert-topic">${this.alertTopic}</div>
            <div class="alert-counts">
              ${hasAlert ? this.renderAlertCount() : msg('No alerts')}
            </div>
          </div>
        </div>
      </button>
    `;
  }

  renderAlertCount() {
    const {alarm, warning, caution} = this.alerts;
    const divs = [];
    if (alarm > 0) {
      divs.push(
        html`<obc-badge
          type="alarm"
          .number="${alarm}"
          size="large"
        ></obc-badge>`
      );
    }
    if (caution > 0) {
      divs.push(
        html`<obc-badge
          type="caution"
          .number="${caution}"
          size="large"
        ></obc-badge>`
      );
    }
    if (warning > 0) {
      divs.push(
        html`<obc-badge
          type="warning"
          .number="${warning}"
          size="large"
        ></obc-badge>`
      );
    }
    return divs;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-fleet-button': ObcIntegrationFleetButton;
  }
}
