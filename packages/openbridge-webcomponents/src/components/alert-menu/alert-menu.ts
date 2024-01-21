import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-menu.style';
import '../button/button';
import '../card-list-button/card-list-button';
import '../../icons/icon-02-chevron-right';
import '../../icons/icon-14-alert-list';
import {classMap} from 'lit/directives/class-map.js';

/**
 *
 * @fires ack-all-click - Fired when the ack button is clicked
 */
@customElement('obc-alert-menu')
export class ObcAlertMenu extends LitElement {
  @property({type: Boolean}) narrow: boolean = false;
  @property({type: Boolean}) empty: boolean = false;

  override render() {
    return html`
      <div class=${classMap({wrapper: true, narrow: this.narrow})}>
        <div class="header">
          <div class="title">Active alerts</div>
          ${this.empty
            ? null
            : html`<obc-button
                variant="raised"
                class="ack-all-btn"
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('ack-all-click'))}
              >
                ACK ALL
              </obc-button> `}
        </div>
        <div class="divider"></div>
        <slot></slot>
        ${this.empty
          ? html`<div class="empty">
              <slot name="empty">No active alerts</slot>
            </div>`
          : null}
        <div class="divider"></div>
        <obc-card-list-button class="alert-list-btn">
          <obi-14-alert-list slot="leading-icon"></obi-14-alert-list>
          Alert list
          <obi-02-chevron-right slot="trailing-icon"></obi-02-chevron-right>
        </obc-card-list-button>
      </div>
    `;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-menu': ObcAlertMenu;
  }
}
