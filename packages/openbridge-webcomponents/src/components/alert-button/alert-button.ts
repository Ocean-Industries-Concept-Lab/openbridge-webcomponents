import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-button.style';
import '../../icons/icon-14-alerts';
import {AlertType} from '../../types';

/**
 * Represents an alert button component.
 *
 * @fires click - Fires when the button is clicked.
 */
@customElement('obc-alert-button')
export class ObcAlertButton extends LitElement {
  @property({type: Number, attribute: 'n-alerts'}) nAlerts = 0;
  @property({type: String, attribute: 'alert-type'}) alertType = AlertType.None;
  @property({type: Boolean}) standalone = false;
  @property({type: Boolean}) counter = false;

  override render() {
    return html`
      <button
        class="wrapper type-${this.alertType} ${this.counter
          ? 'counter'
          : null} ${this.standalone ? 'standalone' : null}"
      >
        <div class="visible-wrapper">
          <obi-14-alerts class="icon"></obi-14-alerts>
          ${this.counter
            ? html`<div class="badge">${this.nAlerts}</div>`
            : null}
        </div>
      </button>
    `;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-button': ObcAlertButton;
  }
}
