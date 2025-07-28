import { LitElement, html, unsafeCSS } from 'lit'
import { property, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import compentStyle from "./tab-row.css?inline";
import '../tab-item/tab-item.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-placeholder.js';
import {customElement} from '../../decorator.js';
import "../../icons/icon-up-iec.js";

export interface TabData {
  id: string;
  title: string;
  hasLeadingIcon?: boolean;
  hasBadge?: boolean;
  badgeCount?: number;
  badgeType?: string;
  badgeSize?: string;
  badgeHideNumber?: boolean;
  showLeadingBadgeIcon?: boolean;
  disabled?: boolean;
}

@customElement('obc-tab-row')
export class ObcTabRow extends LitElement {
  @property({ type: Array }) tabs: TabData[] = [];
  @property({ type: String, attribute: 'selected-tab-id' }) selectedTabId = '';
  @property({ type: Boolean, attribute: 'has-close' }) hasClose = true;
  @property({ type: Boolean }) hug = false;
  @property({ type: Boolean, attribute: 'has-add-new-tab' }) hasAddNewTab = false;
  
  @state() private internalTabs: TabData[] = [];

  override connectedCallback() {
    super.connectedCallback();
    this.internalTabs = [...this.tabs];
  }

  override updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('tabs')) {
      this.internalTabs = [...this.tabs];
    }
  }

  private handleTabClick(event: Event, tabId: string) {
    const tabIndex = this.internalTabs.findIndex(tab => tab.id === tabId);
    if (tabIndex !== -1) {
      const tab = this.internalTabs[tabIndex];
      this.selectedTabId = tab.id;
      
      this.requestUpdate();
      
      const selectEvent = new CustomEvent('tab-selected', {
        detail: { tab, id: tab.id, index: tabIndex },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(selectEvent);
    }
  }

  private handleTabClose(event: Event, tabId: string) {
    event.stopPropagation();
    
    const tabIndex = this.internalTabs.findIndex(tab => tab.id === tabId);
    if (tabIndex !== -1) {
      const removedTab = this.internalTabs[tabIndex];
      
      this.internalTabs = [
        ...this.internalTabs.slice(0, tabIndex),
        ...this.internalTabs.slice(tabIndex + 1)
      ];
      
      if (removedTab.id === this.selectedTabId && this.internalTabs.length > 0) {
        const newIndex = Math.min(tabIndex, this.internalTabs.length - 1);
        this.selectedTabId = this.internalTabs[newIndex].id;
      }
      
      const closeEvent = new CustomEvent('tab-closed', {
        detail: { tab: removedTab, id: removedTab.id, index: tabIndex },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(closeEvent);
      
      this.requestUpdate();
    }
  }

  private handleAddNewTab() {
    const addEvent = new CustomEvent('add-new-tab', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(addEvent);
  }

  private renderTab(tab: TabData, index: number) {
    const isFirst = index === 0;
    const isChecked = tab.id === this.selectedTabId;
    
    return html`
      <obc-tab-item
        .title=${tab.title}
        .checked=${isChecked}
        .hasClose=${this.hasClose}
        .hasLeadingIcon=${tab.hasLeadingIcon ?? true}
        .hasTitle=${true}
        .hasDivider=${!isFirst}
        .hug=${this.hug}
        .disabled=${tab.disabled || false}
        .hasBadge=${tab.hasBadge || (tab.badgeCount !== undefined && tab.badgeCount > 0)}
        .badgeCount=${tab.badgeCount || 0}
        .badgeType=${tab.badgeType || 'regular'}
        .badgeSize=${tab.badgeSize || 'regular'}
        .badgeHideNumber=${tab.badgeHideNumber || false}
        .showLeadingBadgeIcon=${tab.showLeadingBadgeIcon || false}
        @tab-click=${(e: Event) => this.handleTabClick(e, tab.id)}
        @tab-close=${(e: Event) => this.handleTabClose(e, tab.id)}
      >
        ${tab.hasLeadingIcon !== false ? html`
          <slot name="tab-${tab.id}-icon" slot="leading-icon">
            <obi-placeholder></obi-placeholder>
          </slot>
        ` : ''}
        <span slot="title">${tab.title}</span>
        ${tab.showLeadingBadgeIcon ? html`
          <slot name="tab-${tab.id}-badge-icon" slot="badge-icon">
            <obi-placeholder></obi-placeholder>
          </slot>
        ` : ''}
      </obc-tab-item>
    `;
  }

  override render() {
    return html`
      <div class="wrapper" role="tablist">
        ${repeat(
          this.internalTabs,
          (tab) => tab.id,
          (tab, index) => this.renderTab(tab, index)
        )}
        ${this.hasAddNewTab ? html`
          <obc-icon-button
            class="add-new-tab"
            variant="flat"
            @click=${this.handleAddNewTab}
            aria-label="Add new tab"
          >
            <obi-up-iec></obi-up-iec>
          </obc-icon-button>
        ` : ''}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-tab-row': ObcTabRow
  }
}