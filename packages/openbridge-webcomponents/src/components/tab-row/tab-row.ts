import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import compentStyle from './tab-row.css?inline';
import '../tab-item/tab-item.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-placeholder.js';
import {customElement} from '../../decorator.js';
import '../../icons/icon-up-iec.js';
import {BadgeType, BadgeSize} from '../badge/badge.js';

export interface TabData {
  id: string;
  title: string;
  hasLeadingIcon?: boolean;
  hasBadge?: boolean;
  badgeCount?: number;
  badgeType?: BadgeType;
  badgeSize?: BadgeSize;
  badgeHideNumber?: boolean;
  showLeadingBadgeIcon?: boolean;
  disabled?: boolean;
}

@customElement('obc-tab-row')
export class ObcTabRow extends LitElement {
  @property({type: Array}) tabs: TabData[] = [];
  @property({type: String, attribute: 'selected-tab-id'}) selectedTabId = '';
  @property({type: Boolean, attribute: 'has-close'}) hasClose = true;
  @property({type: Boolean}) hug = false;
  @property({type: Boolean, attribute: 'has-add-new-tab'}) hasAddNewTab = false;

  private handleTabClick(_: Event, tabId: string) {
    const tabIndex = this.tabs.findIndex((t) => t.id === tabId);
    if (tabIndex === -1) return;
    this.selectedTabId = this.tabs[tabIndex].id;
    this.dispatchEvent(
      new CustomEvent('tab-selected', {
        detail: {tab: this.tabs[tabIndex], id: tabId, index: tabIndex},
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleTabClose(event: Event, tabId: string) {
    event.stopPropagation();
    const tabIndex = this.tabs.findIndex((t) => t.id === tabId);
    if (tabIndex === -1) return;
    const removedTab = this.tabs[tabIndex];
    this.tabs = [
      ...this.tabs.slice(0, tabIndex),
      ...this.tabs.slice(tabIndex + 1),
    ];
    if (removedTab.id === this.selectedTabId && this.tabs.length) {
      const newIdx = Math.min(tabIndex, this.tabs.length - 1);
      this.selectedTabId = this.tabs[newIdx].id;
    }
    this.dispatchEvent(
      new CustomEvent('tab-closed', {
        detail: {tab: removedTab, id: removedTab.id, index: tabIndex},
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleAddNewTab() {
    this.dispatchEvent(
      new CustomEvent('add-new-tab', {bubbles: true, composed: true})
    );
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
        .hasBadge=${tab.hasBadge ||
        (tab.badgeCount !== undefined && tab.badgeCount > 0)}
        .badgeCount=${tab.badgeCount || 0}
        .badgeType=${tab.badgeType ?? BadgeType.regular}
        .badgeSize=${tab.badgeSize ?? BadgeSize.regular}
        .badgeHideNumber=${tab.badgeHideNumber || false}
        .showLeadingBadgeIcon=${tab.showLeadingBadgeIcon || false}
        @tab-click=${(e: Event) => this.handleTabClick(e, tab.id)}
        @tab-close=${(e: Event) => this.handleTabClose(e, tab.id)}
      >
        ${tab.hasLeadingIcon !== false
          ? html`
              <slot name="tab-${tab.id}-icon" slot="leading-icon">
                <obi-placeholder></obi-placeholder>
              </slot>
            `
          : ''}
        <span slot="title">${tab.title}</span>
        ${tab.showLeadingBadgeIcon
          ? html`
              <slot name="tab-${tab.id}-badge-icon" slot="badge-icon">
                <obi-placeholder></obi-placeholder>
              </slot>
            `
          : ''}
      </obc-tab-item>
    `;
  }

  override render() {
    return html`
      <div class="wrapper" role="tablist">
        ${repeat(
          this.tabs,
          (t) => t.id,
          (t, i) => this.renderTab(t, i)
        )}
        ${this.hasAddNewTab
          ? html`
              <obc-icon-button
                class="add-new-tab"
                variant="flat"
                @click=${this.handleAddNewTab}
                aria-label="Add new tab"
              >
                <obi-up-iec></obi-up-iec>
              </obc-icon-button>
            `
          : ''}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}
