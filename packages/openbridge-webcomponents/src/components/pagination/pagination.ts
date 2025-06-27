import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './pagination.css?inline';

import '../toggle-button-option/toggle-button-option.js';
import '../toggle-button-group/toggle-button-group.js';
import '../icon-button/icon-button.js';
import '../progress-indicator-dots/progress-indicator-dots.js';
import '../../icons/icon-page-first-google.js';
import '../../icons/icon-chevron-left-google.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-page-last-google.js';
import { ObcToggleButtonOptionVariant } from '../toggle-button-option/toggle-button-option.js';

/**
 * obc-pagination – page navigation component with ARIA support.
 *
 * @fires value    {ObcPaginationValueChangeEvent}   Emitted whenever the current page changes.
 * @fires navigate {ObcPaginationNavigateEvent}      Emitted when a navigation arrow is clicked.
 */

export enum PaginationVariant {
  regular = 'regular',
  flat = 'flat',
  condensed = 'condensed',
}

export type ObcPaginationValueChangeEvent = CustomEvent<{value: number}>;
export type ObcPaginationNavigateEvent = CustomEvent<{
  action: 'first' | 'previous' | 'next' | 'last';
  currentPage: number;
}>;

@customElement('obc-pagination')
export class ObcPagination extends LitElement {
  @property({type: String}) variant: PaginationVariant = PaginationVariant.regular;
  @property({type: Number}) pages = 3;
  @property({type: Number, attribute: 'current-page'}) currentPage = 1;
  @property({type: Boolean, attribute: 'full-width', reflect: true}) fullWidth =
    false;

  private get isCondensed() {
    return this.variant === PaginationVariant.condensed;
  }

  private get toggleButtonVariant() {
    return this.variant === PaginationVariant.flat
      ? ObcToggleButtonOptionVariant.flat
      : ObcToggleButtonOptionVariant.regular;
  }

  private get validatedPages() {
    return Math.max(1, this.pages);
  }

  private get validatedCurrentPage() {
    return Math.max(1, Math.min(this.currentPage, this.validatedPages));
  }

  private get canNavigatePrevious() {
    return this.validatedCurrentPage > 1;
  }

  private get canNavigateNext() {
    return this.validatedCurrentPage < this.validatedPages;
  }

  private get canNavigateFirst() {
    return this.canNavigatePrevious;
  }

  private get canNavigateLast() {
    return this.canNavigateNext;
  }

  private get pageNumbers() {
    return Array.from({length: this.validatedPages}, (_, i) => i + 1);
  }

  private get announceMessage() {
    return `Page ${this.validatedCurrentPage} of ${this.validatedPages}`;
  }

  private setCurrentPage(newPage: number) {
    const page = Math.max(1, Math.min(newPage, this.validatedPages));
    if (page === this.currentPage) return;
    this.currentPage = page;
    this.dispatchEvent(
      new CustomEvent('value', {
        detail: {value: page},
      }) as ObcPaginationValueChangeEvent
    );
  }

  private dispatchNavigateEvent(
    action: 'first' | 'previous' | 'next' | 'last'
  ) {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: {action, currentPage: this.validatedCurrentPage},
      }) as ObcPaginationNavigateEvent
    );
  }

  private handlePageChange = (event: CustomEvent<{value: string}>) => {
    this.setCurrentPage(Number(event.detail.value));
  };

  private handleFirstClick = () => {
    if (!this.canNavigateFirst) return;
    this.setCurrentPage(1);
    this.dispatchNavigateEvent('first');
  };

  private handlePreviousClick = () => {
    if (!this.canNavigatePrevious) return;
    this.setCurrentPage(this.validatedCurrentPage - 1);
    this.dispatchNavigateEvent('previous');
  };

  private handleNextClick = () => {
    if (!this.canNavigateNext) return;
    this.setCurrentPage(this.validatedCurrentPage + 1);
    this.dispatchNavigateEvent('next');
  };

  private handleLastClick = () => {
    if (!this.canNavigateLast) return;
    this.setCurrentPage(this.validatedPages);
    this.dispatchNavigateEvent('last');
  };

  private renderToggleButtons() {
    return this.pageNumbers.map(
      (num) =>
        html`<obc-toggle-button-option
          .value=${num.toString()}
          .variant=${this.toggleButtonVariant}
          .selected=${num === this.validatedCurrentPage}
          .ariaLabel=${`Page ${num} of ${this.validatedPages}`}
        >
          ${num}
        </obc-toggle-button-option>`
    );
  }

  private renderProgressIndicatorDots() {
    return html`
      <obc-progress-indicator-dots
        .totalSteps=${this.validatedPages}
        .currentStep=${this.validatedCurrentPage}
      ></obc-progress-indicator-dots>
    `;
  }

  private renderNavigation() {
    return html`
      <div class="navigation-wrapper" role="navigation" aria-label="Pagination">
        <obc-icon-button
          variant="flat"
          aria-label="First page"
          aria-disabled=${!this.canNavigateFirst}
          ?disabled=${!this.canNavigateFirst}
          @click=${this.handleFirstClick}
        >
          <obi-page-first-google></obi-page-first-google>
        </obc-icon-button>

        <obc-icon-button
          variant="flat"
          aria-label="Previous page"
          aria-disabled=${!this.canNavigatePrevious}
          ?disabled=${!this.canNavigatePrevious}
          @click=${this.handlePreviousClick}
        >
          <obi-chevron-left-google></obi-chevron-left-google>
        </obc-icon-button>

        ${this.isCondensed
          ? this.renderProgressIndicatorDots()
          : html`<obc-toggle-button-group
              .value=${this.validatedCurrentPage.toString()}
              .variant=${this.toggleButtonVariant}
              @value=${this.handlePageChange}
            >
              ${this.renderToggleButtons()}
            </obc-toggle-button-group>`}

        <obc-icon-button
          variant="flat"
          aria-label="Next page"
          aria-disabled=${!this.canNavigateNext}
          ?disabled=${!this.canNavigateNext}
          @click=${this.handleNextClick}
        >
          <obi-chevron-right-google></obi-chevron-right-google>
        </obc-icon-button>

        <obc-icon-button
          variant="flat"
          aria-label="Last page"
          aria-disabled=${!this.canNavigateLast}
          ?disabled=${!this.canNavigateLast}
          @click=${this.handleLastClick}
        >
          <obi-page-last-google></obi-page-last-google>
        </obc-icon-button>
      </div>
    `;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          'type-regular': this.variant === PaginationVariant.regular,
          'type-flat': this.variant === PaginationVariant.flat,
          'type-condensed': this.variant === PaginationVariant.condensed,
        })}
      >
        <div class="content-container">${this.renderNavigation()}</div>
        <span
          aria-live="polite"
          aria-atomic="true"
          style="position:absolute;width:1px;height:1px;margin:-1px;clip:rect(0 0 0 0);overflow:hidden;"
        >
          ${this.announceMessage}
        </span>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pagination': ObcPagination;
  }
}
