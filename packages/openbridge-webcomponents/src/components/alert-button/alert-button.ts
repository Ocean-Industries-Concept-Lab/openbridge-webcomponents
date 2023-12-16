import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./alert-button.css?inline";
import "../icon/icon"

export enum AlertType {
  Alarm = "alarm",
  Warning = "warning",
  Caution = "caution",
  Running = "running",
  Command = "command",
  Notification = "notification",
  Regular = "regular",
  Flat = "flat",
}



@customElement('obc-alert-button')
export class AlertButton extends LitElement {

  @property({ type: Number }) nAlerts = 0;
  @property({ type: String }) type = AlertType.Regular;
  @property({ type: Boolean }) standalone = false;
  @property({ type: Boolean }) counter = false;

  render() {
    return html`
        <button class="wrapper type-${this.type} ${this.counter ? 'counter' : null} ${this.standalone ? 'standalone': null}">
          <div class="visible-wrapper">
            <obc-icon icon="14-alerts" class="icon"></obc-icon>
            ${this.counter ? html`<div class="badge">${this.nAlerts}</div>`: null}
          </div>
        </button>
    `
  }

  static styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-button': AlertButton
  }
}
