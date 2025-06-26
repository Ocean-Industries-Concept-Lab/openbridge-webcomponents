import { LitElement, html, unsafeCSS } from 'lit'
import { property } from 'lit/decorators.js'
import {customElement} from '../../decorator.js';
import { classMap } from 'lit/directives/class-map.js'
import compentStyle from "./pagination.css?inline";
import "../toggle-button-option/toggle-button-option";
import "../toggle-button-group/toggle-button-group";
import "../icon-button/icon-button";
import "../../icons/icon-page-first-google.js";
import "../../icons/icon-chevron-left-google.js";
import "../../icons/icon-chevron-right-google.js";
import "../../icons/icon-page-last-google.js";

export enum PaginationType {
  regular = 'regular',
  flat = 'flat',
  condenced = 'condenced',
}

export type ObcPaginationValueChangeEvent = CustomEvent<{value: number}>;

/**
 * @fires value {ObcPaginationValueChangeEvent} - Emitted when the current page changes.
 */
@customElement('obc-pagination')
export class ObcPagination extends LitElement {
  @property({ type: String }) type: PaginationType = PaginationType.regular;
  @property({ type: Number }) pages = 3;
  @property({ type: Number }) currentPage = 1;

  private get isCondensed() {
    return this.type === PaginationType.condenced;
  }

  private get toggleButtonType() {
    return this.type === PaginationType.flat ? 'flat' : 'regular';
  }

  private get canNavigatePrevious() {
    return this.currentPage > 1;
  }

  private get canNavigateNext() {
    return this.currentPage < this.pages;
  }

  private handlePageChange(event: CustomEvent) {
    const newPage = parseInt(event.detail.value);
    if (newPage !== this.currentPage) {
      this.currentPage = newPage;
      this.dispatchEvent(new CustomEvent('value', {
        detail: { value: newPage },
        bubbles: true
      }));
    }
  }

  private handlePreviousClick() {
    if (this.canNavigatePrevious) {
      this.currentPage = this.currentPage - 1;
      this.dispatchEvent(new CustomEvent('value', {
        detail: { value: this.currentPage },
        bubbles: true
      }));
    }
  }

  private handleNextClick() {
    if (this.canNavigateNext) {
      this.currentPage = this.currentPage + 1;
      this.dispatchEvent(new CustomEvent('value', {
        detail: { value: this.currentPage },
        bubbles: true
      }));
    }
  }

  private handleFirstClick() {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.dispatchEvent(new CustomEvent('value', {
        detail: { value: this.currentPage },
        bubbles: true
      }));
    }
  }

  private handleLastClick() {
    if (this.currentPage !== this.pages) {
      this.currentPage = this.pages;
      this.dispatchEvent(new CustomEvent('value', {
        detail: { value: this.currentPage },
        bubbles: true
      }));
    }
  }

  private renderToggleButtonGroup() {
    return html`
      <div class="navigation-wrapper">
        <obc-icon-button 
          .variant=${'flat'}
          @click=${this.handleFirstClick}
          ?disabled=${!this.canNavigatePrevious}>
          <obi-page-first-google></obi-page-first-google>
        </obc-icon-button>
        
        <obc-icon-button 
          .variant=${'flat'}
          @click=${this.handlePreviousClick}
          ?disabled=${!this.canNavigatePrevious}>
          <obi-chevron-left-google></obi-chevron-left-google>
        </obc-icon-button>

        <obc-toggle-button-group
          .value="${this.currentPage.toString()}"
          .type="${this.toggleButtonType}"
          @value="${this.handlePageChange}">
          ${this.renderToggleButtons()}
        </obc-toggle-button-group>

        <obc-icon-button 
          .variant=${'flat'}
          @click=${this.handleNextClick}
          ?disabled=${!this.canNavigateNext}>
          <obi-chevron-right-google></obi-chevron-right-google>
        </obc-icon-button>
        
        <obc-icon-button 
          .variant=${'flat'}
          @click=${this.handleLastClick}
          ?disabled=${!this.canNavigateNext}>
          <obi-page-last-google></obi-page-last-google>
        </obc-icon-button>
      </div>
    `;
  }

  private renderToggleButtons() {
    const buttons = [];
    for (let i = 1; i <= this.pages; i++) {
      buttons.push(html`
        <obc-toggle-button-option
          .value="${i.toString()}"
          .type="${this.toggleButtonType}"
          .selected="${i === this.currentPage}">
          ${i}
        </obc-toggle-button-option>
      `);
    }
    return buttons;
  }

  private renderProgressIndicatorDots() {
    return html`
      <obc-progress-indicator-dots
        .total="${this.pages}"
        .current="${this.currentPage}"
        static>
      </obc-progress-indicator-dots>
    `;
  }

  private renderContent() {
    if (this.isCondensed) {
      return this.renderProgressIndicatorDots();
    }
    return this.renderToggleButtonGroup();
  }

  override render() {
    return html`
      <div class=${classMap({
        'wrapper': true,
        'type-regular': this.type === PaginationType.regular,
        'type-flat': this.type === PaginationType.flat,
        'type-condenced': this.type === PaginationType.condenced
      })}>
        <div class="content-container">
          ${this.renderContent()}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pagination': ObcPagination
  }
}