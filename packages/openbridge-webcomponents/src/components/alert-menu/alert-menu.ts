import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
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
import '../scrollbar/scrollbar.js';

import {localized, msg} from '@lit/localize';

export type ObcAckAllVisibleClickEvent = CustomEvent<{
  visibleElements: HTMLElement[];
}>;

/**
 *
 * @fires ack-all-visible-click<ObcAckAllVisibleClickEvent> - Fired when the ack all visible button is clicked
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

  private handleAckAllVisibleClick(tabName: string) {
    const visibleElements = this.getVisibleElementsInCurrentTab(tabName);
    this.dispatchEvent(
      new CustomEvent('ack-all-visible-click', {
        detail: {
          visibleElements: visibleElements,
        },
      })
    );
  }

  private getVisibleElementsInCurrentTab(tabName: string): HTMLElement[] {
    // Find the scrollbar within the visible panel
    const scrollbar = this.shadowRoot?.querySelector(
      `#alert-list-${tabName}`
    ) as HTMLSlotElement;
    if (!scrollbar) return [];

    // Get all slotted elements in the visible tab's scrollbar
    const slot = scrollbar.querySelector(
      `slot[name=${tabName}]`
    ) as HTMLSlotElement;
    if (!slot) return [];

    const slottedElements = slot.assignedElements() as HTMLElement[];
    const scrollbarRect = scrollbar.getBoundingClientRect();

    // Filter for only visible elements that are within the scrollbar viewport
    return slottedElements.filter((element) => {
      const style = window.getComputedStyle(element);
      if (style.display === 'none' || style.visibility === 'hidden') {
        return false;
      }

      // Check if the element is within the scrollbar's viewport
      const elementRect = element.getBoundingClientRect();

      // Check if element overlaps with scrollbar viewport
      const isVisible = !(
        elementRect.top < scrollbarRect.top ||
        elementRect.bottom > scrollbarRect.bottom
      );

      return isVisible;
    });
  }

  override render() {
    const tabs = [
      {
        name: 'unacked',
        emptyTitle: msg('No unacknowledged alerts'),
        emptyDescription: msg(
          "Go to the 'Alert list' for more details or to manage existing alerts."
        ),
        emptyIcon: html`<obi-unacknowledged
          class="empty icon"
        ></obi-unacknowledged>`,
      },
      {
        name: 'all',
        emptyTitle: msg('No active alerts'),
        emptyDescription: msg(
          "Go to the 'Alert list' for more details or to manage existing alerts."
        ),
        emptyIcon: html`<obi-alerts class="empty icon"></obi-alerts>`,
      },
      {
        name: 'shelved',
        emptyTitle: msg('No shelved alerts'),
        emptyDescription: msg(
          "Go to the 'Alert list' for more details or to manage existing alerts."
        ),
        emptyIcon: html`<obi-alerts-shelf
          class="empty icon"
        ></obi-alerts-shelf>`,
      },
    ];
    return html`
      <obc-tabbed-card nTabs="3" class="wrapper" part="wrapper">
        <span slot="tab-title-0">${msg('Unacked')}</span>
        <span slot="tab-title-1">${msg('All active alerts')}</span>
        <span slot="tab-title-2">${msg('Shelved')}</span>
        ${tabs.map(
          (v, i) => html`
            <div slot="tab-content-${i}" class="container">
              <obc-scrollbar class="alert-list" id="alert-list-${v.name}">
                <slot name="${v.name}">
                  <div class="empty-list">
                    ${v.emptyIcon}
                    <slot name="empty-${v.name}-title">
                      <div class="empty-title" data-testid="empty-title">
                        ${v.emptyTitle}
                      </div>
                    </slot>
                    <slot name="empty-${v.name}-description">
                      <div class="empty-description">${v.emptyDescription}</div>
                    </slot>
                  </div>
                </slot>
              </obc-scrollbar>
              <div class="action">
                <obc-button
                  variant="raised"
                  .disabled=${!this.canAckAll}
                  fullWidth
                  class="btn"
                  data-testid="ack-all-visible-button"
                  @click=${() => this.handleAckAllVisibleClick(v.name)}
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
