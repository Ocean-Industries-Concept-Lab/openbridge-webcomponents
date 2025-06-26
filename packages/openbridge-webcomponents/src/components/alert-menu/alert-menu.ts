import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query, queryAssignedElements, state} from 'lit/decorators.js';
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
import {ObcTabbedCardChangeEvent} from '../tabbed-card/tabbed-card.js';
import {
  ObcAlertMenuItem,
  ObcAlertMenuItemStatus,
} from '../alert-menu-item/alert-menu-item.js';

export type ObcAckAllVisibleClickEvent = CustomEvent<{
  visibleElements: {element: HTMLElement; index: number}[];
  tabName: 'shelved' | 'unacked' | 'all';
}>;

/**
 * @slot - The alerts items as ObcAlertMenuItem
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
  @state() private _selectedTabIndex = 1;

  @query('obc-alert-list')
  private alertList!: ObcAlertList;

  @queryAssignedElements({flatten: true})
  private alertItems!: HTMLElement[];

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

  private onTabChange(e: ObcTabbedCardChangeEvent) {
    this._selectedTabIndex = e.detail.tab;
    this.alertList.updatePosition();
  }

  private getAlertItems(): ObcAlertMenuItem[] {
    const alertItems = this.alertItems;
    const isVueWrapper =
      alertItems.length === 1 && alertItems[0].tagName === 'SPAN';
    if (isVueWrapper) {
      return Array.from(alertItems[0].childNodes).filter(
        (child) => child.nodeType === Node.ELEMENT_NODE
      ) as ObcAlertMenuItem[];
    }
    const filter = this._tabs[this._selectedTabIndex].filter;
    return (alertItems as ObcAlertMenuItem[]).filter(filter);
  }

  private _tabs = [
    {
      name: 'unacked',
      emptyTitle: msg('No unacknowledged alerts'),
      emptyDescription: msg(
        "Go to the 'Alert list' for more details or to manage existing alerts."
      ),
      emptyIcon: html`<obi-unacknowledged></obi-unacknowledged>`,
      class: 'unacked',
      filter: (item: ObcAlertMenuItem) => {
        return (
          item.status === ObcAlertMenuItemStatus.Unacknowledged && !item.shelved
        );
      },
    },
    {
      name: 'all',
      emptyTitle: msg('No active alerts'),
      emptyDescription: msg(
        "Go to the 'Alert list' for more details or to manage existing alerts."
      ),
      emptyIcon: html`<obi-alerts></obi-alerts>`,
      class: 'all',
      filter: (item: ObcAlertMenuItem) => {
        return !item.shelved;
      },
    },
    {
      name: 'shelved',
      emptyTitle: msg('No shelved alerts'),
      emptyDescription: msg(
        "Go to the 'Alert list' for more details or to manage existing alerts."
      ),
      emptyIcon: html`<obi-alerts-shelf></obi-alerts-shelf>`,
      class: 'shelved',
      filter: (item: ObcAlertMenuItem) => {
        return item.shelved;
      },
    },
  ];

  override render() {
    const tabs = this._tabs.filter((t) =>
      this.hasShelved ? true : t.name !== 'shelved'
    );

    const t = tabs[this._selectedTabIndex];
    const empty = this.getAlertItems().length === 0;

    return html`
      <obc-tabbed-card
        .nTabs=${tabs.length}
        class="wrapper"
        part="wrapper"
        .selectedTab=${1}
        hasDefaultSlotOnly
        @tab-change=${this.onTabChange}
      >
        <span slot="tab-title-0">${msg('Unacked')}</span>
        <span slot="tab-title-1">${msg('Active alerts')}</span>
        ${this.hasShelved
          ? html`<span slot="tab-title-2">${msg('Shelved')}</span>`
          : nothing}
        <div class="container">
          <obc-alert-list class="alert-list ${t.class}" .empty=${empty}>
            <slot></slot>
            <slot name="empty-${t.name}-title" slot="empty-title"
              >${t.emptyTitle}</slot
            >
            <slot name="empty-${t.name}-description" slot="empty-description"
              >${t.emptyDescription}</slot
            >
            <slot name="empty-${t.name}-icon" slot="empty-icon"
              >${t.emptyIcon}</slot
            >
          </obc-alert-list>
          <div class="action">
            <obc-button
              variant="raised"
              .disabled=${!this.canAckAll}
              fullWidth
              class="btn"
              data-testid="ack-all-visible-button"
              @click=${() => this.handleAckAllVisibleClick(t.name)}
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
                this.dispatchEvent(new CustomEvent('go-to-alert-list-click'))}
            >
              <obi-alert-list slot="leading-icon"></obi-alert-list>
              <obi-chevron-right-google
                slot="trailing-icon"
              ></obi-chevron-right-google>
              ${msg('Alerts')}
            </obc-button>
          </div>
        </div>
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
