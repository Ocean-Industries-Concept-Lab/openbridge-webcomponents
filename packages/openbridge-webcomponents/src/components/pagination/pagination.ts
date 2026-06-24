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
import {ObcToggleButtonOptionVariant} from '../toggle-button-option/toggle-button-option.js';

/**
 * Enumerates the supported style variants for the Pagination component.
 *
 * - `regular`: Default pagination styling.
 * - `flat`: Borderless, flat appearance.
 * - `condensed`: More compact layout for tighter spacing.
 */
export enum PaginationVariant {
  regular = 'regular',
  flat = 'flat',
  condensed = 'condensed',
}

/**
 * Event fired when the current page changes.
 * @event
 */
export type ObcPaginationValueChangeEvent = CustomEvent<{value: number}>;

/**
 * Event fired when a navigation arrow is clicked.
 * @event
 */
export type ObcPaginationNavigateEvent = CustomEvent<{
  action: 'first' | 'previous' | 'next' | 'last';
  currentPage: number;
}>;

/**
 * Event fired when a page is selected.
 * @event
 */
export type ObcPaginationSelectPageEvent = CustomEvent<{
  page: number;
}>;

/**
 * `obc-pagination` – page navigation component for traversing multi-page content.
 *
 * Provides accessible, keyboard-navigable controls for moving between pages of content, such as tables, lists, or document sets. Includes support for ARIA live region updates and multiple visual variants to fit different UI layouts.
 *
 * Appears as a horizontal set of navigation buttons (first, previous, next, last) and page indicators, adapting its layout based on the selected variant. Designed for scenarios where users need to move between discrete pages of content, such as paginated tables, search results, or step-based flows.
 *
 * ## Features
 *
 * - **Variants:**
 *   - `regular` (default): Standard pagination with numbered page buttons and navigation arrows.
 *   - `flat`: Minimalist style with reduced elevation and flat toggle buttons.
 *   - `condensed`: Compact mode showing only progress indicator dots and navigation arrows, ideal for limited space.
 * - **Navigation Controls:**
 *   - First, previous, next, and last page buttons, each with ARIA labels and disabled states when navigation is not possible.
 * - **Page Indicators:**
 *   - Numbered toggle buttons for each page (regular/flat), or progress dots (condensed).
 * - **Full Width Option:**
 *   - Expands the pagination controls to fill the container width for better alignment in wide layouts.
 * - **Accessibility:**
 *   - ARIA live region announces current page for assistive technologies.
 *   - All controls are keyboard accessible.
 * - **Responsive:**
 *   - Condensed variant adapts to smaller containers with a simplified indicator.
 *
 * ## Usage Guidelines
 *
 * Use `obc-pagination` to allow users to navigate through paged content, such as tables, lists, or multi-step flows.
 * - Choose the `regular` or `flat` variant for standard pagination at the bottom of a page or section.
 * - Use the `condensed` variant when space is limited or when a minimal indicator is preferred.
 * - Set the `pages` property to the total number of pages, and `currentPage` to the active page (1-based index).
 * - The component disables navigation buttons automatically at the first and last page.
 *
 * **Best Practices:**
 * - Only use pagination when content is split into discrete, sequential pages.
 * - For infinite scroll or continuous loading, consider alternative navigation patterns.
 * - Keep the number of visible page buttons reasonable (Material Design recommends limiting to avoid overwhelming the user).
 * - Always provide clear feedback about the current page (the component announces this for screen readers).
 *
 * **TODO(designer):** Confirm if there are recommended maximums for number of pages, or if there are design guidelines for when to use condensed vs. flat vs. regular in specific contexts.
 *
 * ## Example
 *
 * ```html
 * <obc-pagination
 *   variant="regular"
 *   pages="5"
 *   current-page="2"
 * ></obc-pagination>
 * ```
 *
 * ## Events
 *
 * - `value` – Fired when the current page changes (via user interaction).
 * - `navigate` – Fired when a navigation arrow (first, previous, next, last) is clicked.
 * - `select-page` – Fired when a specific page is selected.
 *
 * @fires value {ObcPaginationValueChangeEvent} Emitted whenever the current page changes.
 * @fires navigate {ObcPaginationNavigateEvent} Emitted when a navigation arrow is clicked.
 * @fires select-page {ObcPaginationSelectPageEvent} Emitted when a specific page is selected.
 */
@customElement('obc-pagination')
export class ObcPagination extends LitElement {
  /**
   * Visual style variant of the pagination component.
   *
   * - `regular`: Standard pagination with numbered page buttons and navigation arrows.
   * - `flat`: Minimalist, low-elevation style with flat toggle buttons.
   * - `condensed`: Compact mode with progress indicator dots and navigation arrows only.
   *
   * Default: `regular`
   */
  @property({type: String}) variant: PaginationVariant =
    PaginationVariant.regular;

  /**
   * Total number of pages available for navigation.
   *
   * Must be a positive integer (minimum 1). If set below 1, defaults to 1.
   *
   * Default: `3`
   */
  @property({type: Number}) pages = 3;

  /**
   * The currently selected (active) page, 1-based index.
   *
   * If set below 1 or above the total number of pages, it is clamped to the valid range.
   *
   * Default: `1`
   */
  @property({type: Number, attribute: 'current-page'}) currentPage = 1;

  /**
   * Expands the pagination controls to fill the width of the container.
   *
   * When enabled, the page indicators (toggle button group or progress dots) stretch to align with the container.
   *
   * Default: `false`
   */
  @property({type: Boolean, attribute: 'full-width', reflect: true}) fullWidth =
    false;

  @property({type: Boolean}) disabled = false;

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
    return !this.disabled && this.validatedCurrentPage > 1;
  }

  private get canNavigateNext() {
    console.log(
      'canNavigateNext',
      this.disabled,
      this.validatedCurrentPage,
      this.validatedPages
    );
    return !this.disabled && this.validatedCurrentPage < this.validatedPages;
  }

  private get canNavigateFirst() {
    return !this.disabled && this.canNavigatePrevious;
  }

  private get canNavigateLast() {
    return !this.disabled && this.canNavigateNext;
  }

  private get pageNumbers() {
    return Array.from({length: this.validatedPages}, (_, i) => i + 1);
  }

  private get announceMessage() {
    return `Page ${this.validatedCurrentPage} of ${this.validatedPages}`;
  }

  private setCurrentPage(newPage: number) {
    const page = Math.max(1, Math.min(newPage, this.validatedPages));
    if (page === this.currentPage) {
      return false;
    }

    this.currentPage = page;
    this.dispatchEvent(
      new CustomEvent('value', {
        detail: {value: page},
      }) as ObcPaginationValueChangeEvent
    );

    return true;
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
    const success = this.setCurrentPage(Number(event.detail.value));

    if (success) {
      this.dispatchEvent(
        new CustomEvent('select-page', {
          detail: {page: Number(event.detail.value)},
        }) as ObcPaginationSelectPageEvent
      );
    }
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
      <div
        class=${classMap({'navigation-wrapper': true, disabled: this.disabled})}
        role="navigation"
        aria-label="Pagination"
      >
        <obc-icon-button
          variant="flat"
          aria-label="First page"
          aria-disabled=${this.canNavigateFirst}
          ?disabled=${!this.canNavigateFirst}
          @click=${this.handleFirstClick}
        >
          <obi-page-first-google></obi-page-first-google>
        </obc-icon-button>

        <obc-icon-button
          variant="flat"
          aria-label="Previous page"
          aria-disabled=${this.canNavigatePrevious}
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
              ?disabled=${this.disabled}
              @value=${this.handlePageChange}
            >
              ${this.renderToggleButtons()}
            </obc-toggle-button-group>`}

        <obc-icon-button
          variant="flat"
          aria-label="Next page"
          aria-disabled=${this.canNavigateNext}
          ?disabled=${!this.canNavigateNext}
          @click=${this.handleNextClick}
        >
          <obi-chevron-right-google></obi-chevron-right-google>
        </obc-icon-button>

        <obc-icon-button
          variant="flat"
          aria-label="Last page"
          aria-disabled=${this.canNavigateLast}
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
          disabled: this.disabled,
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
