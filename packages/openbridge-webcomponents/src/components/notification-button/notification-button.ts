import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import componentStyle from './notification-button.style';
import {classMap} from 'lit/directives/class-map.js';

@customElement('obc-notification-button')
export class NotificationButton extends LitElement {
  @property({type: Boolean, attribute: 'open-right'}) openRight = false;
  @property({type: Boolean, attribute: 'open-left'}) openLeft = false;
  @property({type: Boolean, attribute: 'corner-left'}) cornerLeft = false;
  @property({type: Boolean, attribute: 'corner-right'}) cornerRight = false;
  @property({type: Boolean}) icon = false;
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) indent = false;

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          'open-right': this.openRight,
          'open-left': this.openLeft,
          'corner-left': this.cornerLeft,
          'corner-right': this.cornerRight,
          icon: this.icon,
          indent: this.indent,
        })}
        ?disabled=${this.disabled}
      >
        <div class="visible-wrapper">
          <slot></slot>
        </div>
      </button>
    `;
  }

  static override styles = componentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-notification-button': NotificationButton;
  }
}
