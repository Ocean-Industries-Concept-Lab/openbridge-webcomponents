import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import compentStyle from './tabbed-card.css?inline';

@customElement('obc-tabbed-card')
export class ObcTabbedCard extends LitElement {
  @property({type: Number}) nTabs: number = 1;
  @state() private selectedTab: number = 0;

  private _handleKeyDown(e: KeyboardEvent) {
    const targetButton = e.target as HTMLElement;
    if (!targetButton.classList.contains('tab-button')) return;

    const currentIndex = this.selectedTab;

    switch (e.key) {
      case 'ArrowRight':
        this.selectedTab = (currentIndex + 1) % this.nTabs;
        break;
      case 'ArrowLeft':
        this.selectedTab = (currentIndex - 1 + this.nTabs) % this.nTabs;
        break;
      case 'Home':
        this.selectedTab = 0;
        break;
      case 'End':
        this.selectedTab = this.nTabs - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    this._focusTab(this.selectedTab);
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
          @click="${() => (this.selectedTab = index)}"
          @focus="${() => (this.selectedTab = index)}"
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
