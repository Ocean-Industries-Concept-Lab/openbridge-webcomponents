import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-menu.css?inline';
import '../button/button';
import '../card-list-button/card-list-button';
import '../../icons/icon-02-chevron-right';
import '../../icons/icon-14-alert-list';

import {localized, msg} from '@lit/localize';

/**
 *
 * @fires ack-all-click - Fired when the ack button is clicked
 * @fires alert-list-click - Fired when the alert list button is clicked
 */
@localized()
@customElement('obc-alert-menu')
export class ObcAlertMenu extends LitElement {
  @property({type: Boolean}) empty: boolean = false;

  override render() {
    return html`
      <div class="wrapper">
        <div class="header">
          <div class="title">${msg('Active alerts')}</div>
          ${this.empty
            ? null
            : html`<obc-button
                variant="raised"
                class="ack-all-btn"
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('ack-all-click'))}
              >
                ${msg('ACK ALL')}
              </obc-button> `}
        </div>
        <div class="divider"></div>
        <slot></slot>
        ${this.empty
          ? html`<div class="empty">
              <slot name="empty">${msg('No active alerts')}</slot>
            </div>`
          : null}
        <div class="spacer"></div>
        <div class="divider"></div>
        <obc-card-list-button
          class="alert-list-btn"
          @click=${() => {
            this.dispatchEvent(new CustomEvent('alert-list-click'));
          }}
        >
          <obi-14-alert-list slot="leading-icon"></obi-14-alert-list>
          ${msg('Alert list')}
          <obi-02-chevron-right slot="trailing-icon"></obi-02-chevron-right>
        </obc-card-list-button>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-menu': ObcAlertMenu;
  }
}
