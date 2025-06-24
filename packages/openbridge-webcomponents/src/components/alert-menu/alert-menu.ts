import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './alert-menu.css?inline';
import '../button/button.js';
import '../card-list-button/card-list-button.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-silence-iec.js';
import '../../icons/icon-alert-list.js';
import '../../icons/icon-alerts.js';
import '../../icons/icon-alerts-shelf.js';
import '../../icons/icon-unacknowledged.js';
import '../tabbed-card/tabbed-card.js';
import {localized, msg} from '@lit/localize';
import {customElement} from '../../decorator.js';
import '../../building-blocks/alert-list/alert-list.js';
import {ObcAlertList} from '../../building-blocks/alert-list/alert-list.js';

export type ObcAckAllVisibleClickEvent = CustomEvent<{
  visibleElements: {element: HTMLElement; index: number}[];
  tabName: 'shelved' | 'unacked' | 'all';
}>;

/**
 * @slot unacked - The unacked alerts
 * @slot all - The all alerts
 * @slot shelved - The shelved alerts
 *
 * @fires ack-all-visible-click {ObcAckAllVisibleClickEvent} - Fired when the ack all visible button is clicked
 * @fires alert-list-click {CustomEvent} - Fired when the alert list button is clicked
 * @fires silence-click {CustomEvent} - Fired when the silence button is clicked
 * @fires go-to-alert-list-click {CustomEvent} - Fired when the go to alert list button is clicked
 */
@localized()
@customElement('obc-alert-menu')
export class ObcAlertMenu extends LitElement {
  @property({type: Boolean}) hasShelved: boolean = false;
  @property({type: Boolean}) canAckAll: boolean = false;

  private handleAckAllVisibleClick(tabName: string) {
    const panel = this.shadowRoot?.querySelector(
      `#alert-list-${tabName}`
    ) as ObcAlertList;
    const visibleElements = panel.getVisibleElements();
    this.dispatchEvent(
      new CustomEvent('ack-all-visible-click', {
        detail: {
          visibleElements: visibleElements,
          tabName: tabName,
        },
      })
    );
  }

  override render() {
    const tabs = [
      {
        name: 'unacked',
        emptyTitle: msg('No unacknowledged alerts'),
        emptyDescription: msg(
          "Go to the 'Alert list' for more details or to manage existing alerts."
        ),
        emptyIcon: html`<obi-unacknowledged></obi-unacknowledged>`,
      },
      {
        name: 'all',
        emptyTitle: msg('No active alerts'),
        emptyDescription: msg(
          "Go to the 'Alert list' for more details or to manage existing alerts."
        ),
        emptyIcon: html`<obi-alerts></obi-alerts>`,
      },
    ];
    if (this.hasShelved) {
      tabs.push({
        name: 'shelved',
        emptyTitle: msg('No shelved alerts'),
        emptyDescription: msg(
          "Go to the 'Alert list' for more details or to manage existing alerts."
        ),
        emptyIcon: html`<obi-alerts-shelf></obi-alerts-shelf>`,
      });
    }

    return html`
      <obc-tabbed-card
        .nTabs=${tabs.length}
        class="wrapper"
        part="wrapper"
        .selectedTab=${1}
      >
        <span slot="tab-title-0">${msg('Unacked')}</span>
        <span slot="tab-title-1">${msg('Active alerts')}</span>
        ${this.hasShelved
          ? html`<span slot="tab-title-2">${msg('Shelved')}</span>`
          : nothing}
        ${tabs.map(
          (v, i) => html`
            <div slot="tab-content-${i}" class="container">
              <obc-alert-list class="alert-list" id="alert-list-${v.name}">
                <slot name="${v.name}" slot="items"></slot>
                <slot name="empty-${v.name}-title" slot="empty-title"
                  >${v.emptyTitle}</slot
                >
                <slot
                  name="empty-${v.name}-description"
                  slot="empty-description"
                  >${v.emptyDescription}</slot
                >
                <slot name="empty-${v.name}-icon" slot="empty-icon"
                  >${v.emptyIcon}</slot
                >
              </obc-alert-list>
              <div class="action">
                <obc-button
                  variant="raised"
                  .disabled=${!this.canAckAll}
                  fullWidth
                  class="btn"
                  data-testid="ack-all-visible-button"
                  @click=${() => this.handleAckAllVisibleClick(v.name)}
                >
                  ${msg('ACK visible')}
                </obc-button>
                <obc-button
                  variant="normal"
                  fullWidth
                  class="btn"
                  hasLeadingIcon
                  @click=${() =>
                    this.dispatchEvent(new CustomEvent('silence-click'))}
                >
                  <obi-silence-iec slot="leading-icon"></obi-silence-iec>
                  ${msg('Silence')}
                </obc-button>
                <obc-button
                  variant="normal"
                  class="btn"
                  fullWidth
                  hasLeadingIcon
                  hasTrailingIcon
                  @click=${() =>
                    this.dispatchEvent(
                      new CustomEvent('go-to-alert-list-click')
                    )}
                >
                  <obi-alert-list slot="leading-icon"></obi-alert-list>
                  <obi-chevron-right-google
                    slot="trailing-icon"
                  ></obi-chevron-right-google>
                  ${msg('Alerts')}
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
