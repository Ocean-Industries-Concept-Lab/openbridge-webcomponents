import {LitElement, html, nothing, unsafeCSS} from 'lit';
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
import {ObcTabbedCardChangeEvent} from '../tabbed-card/tabbed-card.js';
import '../scrollbar/scrollbar.js';

import {localized, msg} from '@lit/localize';
import {ObcAlertMenuItem} from '../alert-menu-item/alert-menu-item';

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
    const visibleElements = this.getVisibleElementsInCurrentTab(tabName);
    this.dispatchEvent(
      new CustomEvent('ack-all-visible-click', {
        detail: {
          visibleElements: visibleElements,
          tabName: tabName,
        },
      })
    );
  }

  private oldElementTop: Map<HTMLElement, number> = new Map();
  private mutationObservers: Record<string, MutationObserver> = {};
  private PANEL_NAMES = ['unacked', 'all', 'shelved'];
  private hasRenderedPanel = {
    unacked: false,
    all: false,
    shelved: false,
  };

  override firstUpdated() {
    // Add slot change listener to the panels
    this.PANEL_NAMES.forEach((panelName) => {
      const panel = this.shadowRoot?.querySelector(
        `slot[name=${panelName}]`
      ) as HTMLSlotElement;
      panel?.addEventListener('slotchange', () => {
        const panel = this.shadowRoot?.querySelector(
          `slot[name=${panelName}]`
        ) as HTMLSlotElement;
        if (!panel) return;
        const slotElements = panel.assignedElements();
        const isVueWrapper =
          slotElements.length === 1 && slotElements[0].tagName === 'SPAN';
        if (isVueWrapper) {
          this.setupMutationObserver(panelName);
        } else {
          this.handleSlotChange(panelName);
        }
      });

      requestAnimationFrame(() => {
        this.updateOldElementTop(panelName);
      });
    });
  }

  private updateOldElementTop(panelName: string) {
    const panel = this.shadowRoot?.querySelector(
      `slot[name=${panelName}]`
    ) as HTMLSlotElement;
    if (!panel) return;
    let elements = panel.assignedElements() as HTMLElement[];
    const isVueWrapper =
      elements.length === 1 && elements[0].tagName === 'SPAN';
    if (isVueWrapper) {
      elements = Array.from(elements[0].childNodes).filter(
        (child) => child.nodeType === Node.ELEMENT_NODE
      ) as HTMLElement[];
    }

    if (elements.length === 0) {
      return;
    }

    // Get the top of the element,
    // the element may be in an animation
    // we therefor sum the height of each element
    const firstElement = elements[0];
    const firstElementRect = firstElement.getBoundingClientRect();
    let top = firstElementRect.top;
    elements.forEach((element) => {
      const elementRect = element.getBoundingClientRect();
      this.oldElementTop.set(element, top);
      top += elementRect.height;
    });
  }

  private setupMutationObserver(panelName: string) {
    // If the panel is a vue wrapper, we need to observe the child nodes

    // Delete the old observer
    const oldObserver = this.mutationObservers[panelName];
    if (oldObserver) {
      oldObserver.disconnect();
      delete this.mutationObservers[panelName];
    }

    const panel = this.shadowRoot?.querySelector(
      `slot[name=${panelName}]`
    ) as HTMLSlotElement;
    if (!panel) return;
    const slotElements = panel.assignedElements();
    const isVueWrapper =
      slotElements.length === 1 && slotElements[0].tagName === 'SPAN';
    if (!isVueWrapper) {
      return;
    }
    const el = isVueWrapper ? slotElements[0] : panel;
    const observer = new MutationObserver(() => {
      this.handleSlotChange(panelName);
    });
    observer.observe(el, {childList: true, subtree: false});
    this.mutationObservers[panelName] = observer;
  }

  private handleSlotChange(panelName: string) {
    // Animate the elements to their new positions
    const panel = this.shadowRoot?.querySelector(
      `slot[name=${panelName}]`
    ) as HTMLSlotElement;
    if (!panel) return;
    let elements = panel.assignedElements() as HTMLElement[];
    const isVueWrapper =
      elements.length === 1 && elements[0].tagName === 'SPAN';
    if (isVueWrapper) {
      elements = Array.from(elements[0].childNodes).filter(
        (child) => child.nodeType === Node.ELEMENT_NODE
      ) as HTMLElement[];
    }
    const oldElementTop: Map<HTMLElement, number> = new Map(this.oldElementTop);

    requestAnimationFrame(() => {
      this.updateOldElementTop(panelName);
      elements.forEach((element) => {
        const elementRect = element.getBoundingClientRect();
        const oldTop = oldElementTop.get(element);
        if (oldTop === undefined) {
          // New element
          (element as ObcAlertMenuItem).animateIntro =
            this.hasRenderedPanel[
              panelName as keyof typeof this.hasRenderedPanel
            ];
          return;
        }
        const diff = oldTop - elementRect.top;
        if (diff === 0) return;
        element.style.transform = `translateY(${diff}px)`;
        element.style.transition = 'none';

        // Force a reflow to ensure the animation is applied
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        element.offsetHeight;

        // Remove the transition after the animation is complete
        element.style.transition = 'transform 100ms ease-in-out';
        element.style.transform = 'translateY(0px)';
      });
      this.hasRenderedPanel[panelName as keyof typeof this.hasRenderedPanel] =
        true;
    });
  }

  private onTabChange(event: ObcTabbedCardChangeEvent) {
    const panelName = this.PANEL_NAMES[event.detail.tab];
    this.hasRenderedPanel[panelName as keyof typeof this.hasRenderedPanel] =
      false;
    requestAnimationFrame(() => {
      this.updateOldElementTop(panelName);
    });
  }

  private getVisibleElementsInCurrentTab(
    tabName: string
  ): {element: HTMLElement; index: number}[] {
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

    let slottedElements = slot.assignedElements() as HTMLElement[];
    const scrollbarRect = scrollbar.getBoundingClientRect();

    // If using vue wrapper slottedElements is an span with obc-alert-menu-item children
    if (slottedElements.length === 1 && slottedElements[0].tagName === 'SPAN') {
      slottedElements = Array.from(slottedElements[0].childNodes).filter(
        (child) => child.nodeType === Node.ELEMENT_NODE
      ) as HTMLElement[];
    }

    // Filter for only visible elements that are within the scrollbar viewport
    return slottedElements
      .map((element, index) => ({element, index}))
      .filter(({element}) => {
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
    ];
    if (this.hasShelved) {
      tabs.push({
        name: 'shelved',
        emptyTitle: msg('No shelved alerts'),
        emptyDescription: msg(
          "Go to the 'Alert list' for more details or to manage existing alerts."
        ),
        emptyIcon: html`<obi-alerts-shelf
          class="empty icon"
        ></obi-alerts-shelf>`,
      });
    }

    return html`
      <obc-tabbed-card
        .nTabs=${tabs.length}
        class="wrapper"
        part="wrapper"
        .selectedTab=${1}
        @tab-change=${this.onTabChange}
      >
        <span slot="tab-title-0">${msg('Unacked')}</span>
        <span slot="tab-title-1">${msg('All active alerts')}</span>
        ${this.hasShelved
          ? html`<span slot="tab-title-2">${msg('Shelved')}</span>`
          : nothing}
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
                  fullWidth
                  class="btn"
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
                  @click=${() =>
                    this.dispatchEvent(
                      new CustomEvent('go-to-alert-list-click')
                    )}
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
