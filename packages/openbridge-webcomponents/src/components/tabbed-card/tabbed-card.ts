import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './tabbed-card.css?inline';

export type ObcTabbedCardChangeEvent = CustomEvent<{
  tab: number;
}>;

/**
 * @summary A component that displays a list of tabs with associated content.
 * @description The `obc-tabbed-card` component displays a list of tabs with associated content.
 * @property {number} nTabs - The number of tabs to display.
 * @property {number} selectedTab - The index of the selected tab.
 *
 * @fires {ObcTabbedCardChangeEvent} tab-change - Emitted when the selected tab changes.
 *
 * @slot tab-title-0 - The title of the first tab.
 * @slot tab-content-0 - The content of the first tab.
 * @slot tab-title-1 - The title of the second tab.
 * @slot tab-content-1 - The content of the second tab.
 * @slot tab-title-2 - The title of the third tab.
 * @slot tab-content-2 - The content of the third tab.
 * @slot tab-title-3 - The title of the fourth tab.
 * @slot tab-content-3 - The content of the fourth tab.
 * @slot tab-title-4 - The title of the fifth tab.
 * @slot tab-content-4 - The content of the fifth tab.
 */
@customElement('obc-tabbed-card')
export class ObcTabbedCard extends LitElement {
  @property({type: Number}) nTabs: number = 1;
  @property({type: Number}) selectedTab: number = 0;

  private _handleKeyDown(e: KeyboardEvent) {
    const targetButton = e.target as HTMLElement;
    if (!targetButton.classList.contains('tab-button')) return;

    const currentIndex = this.selectedTab;

    switch (e.key) {
      case 'ArrowRight':
        this.setSelectedTab((currentIndex + 1) % this.nTabs);
        break;
      case 'ArrowLeft':
        this.setSelectedTab((currentIndex - 1 + this.nTabs) % this.nTabs);
        break;
      case 'Home':
        this.setSelectedTab(0);
        break;
      case 'End':
        this.setSelectedTab(this.nTabs - 1);
        break;
      default:
        return;
    }

    e.preventDefault();
    this._focusTab(this.selectedTab);
  }

  private setSelectedTab(index: number) {
    this.selectedTab = index;
    this.dispatchEvent(new CustomEvent('tab-change', {detail: {tab: index}}));
  }

  private _focusTab(index: number) {
    const button = this.shadowRoot?.querySelector(
      `button[data-index="${index}"]`
    ) as HTMLButtonElement;
    button?.focus();
  }

  private _generateTabHeaders() {
    return [...Array(this.nTabs)].map((_, index) => {
      const hasDivider =
        index !== this.nTabs - 1 &&
        this.selectedTab !== index &&
        index + 1 !== this.selectedTab;
      return html`
        <button
          class="tab-button ${hasDivider ? 'has-divider' : ''}"
          role="tab"
          aria-selected="${this.selectedTab === index}"
          aria-controls="panel-${index}"
          id="tab-${index}"
          data-index="${index}"
          tabindex="${this.selectedTab === index ? 0 : -1}"
          @click="${() => this.setSelectedTab(index)}"
          @focus="${() => this.setSelectedTab(index)}"
        >
          <span><slot name="tab-title-${index}">Tab ${index + 1}</slot></span>
        </button>
      `;
    });
  }

  private _generateTabPanels() {
    return [...Array(this.nTabs)].map(
      (_, index) => html`
        <div
          role="tabpanel"
          id="panel-${index}"
          aria-labelledby="tab-${index}"
          tabindex="0"
          ?hidden="${this.selectedTab !== index}"
        >
          <slot name="tab-content-${index}"></slot>
        </div>
      `
    );
  }

  override render() {
    return html`
      <div class="tab-container" @keydown="${this._handleKeyDown}">
        <div class="tab-header" role="tablist" aria-label="Tab List">
          ${this._generateTabHeaders()}
        </div>
        <div class="tab-panels">${this._generateTabPanels()}</div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-tabbed-card': ObcTabbedCard;
  }
}
