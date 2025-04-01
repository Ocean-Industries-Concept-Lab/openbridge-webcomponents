import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-menu.css?inline';
import '../button/button.js';
import '../card-list-button/card-list-button.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-silence-iec.js';
import '../../icons/icon-alert-list.js';
import '../tabbed-card/tabbed-card.js';
import '../scrollbar/scrollbar.js';

import {localized, msg} from '@lit/localize';

/**
 *
 * @fires ack-all-visible-click - Fired when the ack all visible button is clicked
 * @fires alert-list-click - Fired when the alert list button is clicked
 */
@localized()
@customElement('obc-alert-menu')
export class ObcAlertMenu extends LitElement {
  @property({type: Boolean}) emptyUnacked: boolean = false;
  @property({type: Boolean}) emptyShelved: boolean = false;
  @property({type: Boolean}) emptyAll: boolean = false;
  @property({type: Boolean}) canAckAll: boolean = false;
  @property({type: Boolean}) canSilence: boolean = false;

  override render() {
    const tabs = ['unacked', 'shelved', 'all'];
    return html`
      <obc-tabbed-card nTabs="3" class="wrapper" part="wrapper">
        <span slot="tab-title-0">${msg('Unacked')}</span>
        <span slot="tab-title-1">${msg('Shelved')}</span>
        <span slot="tab-title-2">${msg('All alerts')}</span>
        ${tabs.map(
          (v, i) => html`
            <div slot="tab-content-${i}" class="container">
              <obc-scrollbar class="alert-list">
                <slot name="${v}"> </slot>
              </obc-scrollbar>
              <div class="action">
                <obc-button
                  variant="raised"
                  .disabled=${!this.canAckAll}
                  fullWidth
                  class="btn"
                  @click=${() =>
                    this.dispatchEvent(
                      new CustomEvent('ack-all-visible-click')
                    )}
                >
                  ${msg('ACK all visible')}
                </obc-button>
                <obc-button
                  variant="normal"
                  .disabled=${!this.canSilence}
                  fullWidth
                  class="btn"
                  @click=${() => this.dispatchEvent(new CustomEvent('silence'))}
                >
                  <obi-silence-iec slot="leading-icon"></obi-silence-iec>
                  ${msg('Silence')}
                </obc-button>
                <obc-button
                  variant="normal"
                  class="btn"
                  fullWidth
                  @click=${() =>
                    this.dispatchEvent(new CustomEvent('go-to-alert-list'))}
                >
                  <obi-alert-list slot="leading-icon"></obi-alert-list>
                  <obi-chevron-right-google
                    slot="trailing-icon"
                  ></obi-chevron-right-google>
                  ${msg('Alert list')}
                </obc-button>
              </div>
            </div>
          `
        )}
      </obc-tabbed-card>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-menu': ObcAlertMenu;
  }
}
