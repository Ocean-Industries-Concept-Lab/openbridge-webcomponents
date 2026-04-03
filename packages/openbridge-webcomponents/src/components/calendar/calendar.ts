import {LitElement, html, unsafeCSS, nothing, type PropertyValues} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './calendar.css?inline';
import {
  CalendarType,
  type CalendarEvent,
  type DateCellInfo,
  isSameDay,
  toDateKey,
  groupEventsByDate,
  getMonthYearLabel,
  getWeekdayNames,
  getMonthGrid,
} from './calendar-utils.js';
import {DateItemSize} from '../date-item/date-item.js';

import '../date-item/date-item.js';
import '../event-list/event-list.js';
import '../button/button.js';
import '../icon-button/icon-button.js';
import '../dropdown-button/dropdown-button.js';
import '../divider/divider.js';
import '../scrollbar/scrollbar.js';
import '../navigation-item/navigation-item.js';
import '../../icons/icon-calendar-google.js';
import '../../icons/icon-chevron-left-google.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-up-iec.js';
import '../../icons/icon-calendar-date-google.js';
import '../../icons/icon-application-open-google.js';

export {
  CalendarType,
  type CalendarEvent,
  type DateCellInfo,
} from './calendar-utils.js';

/**
 * `<obc-calendar>` – A composite calendar component for date selection and event browsing.
 *
 * **Synonyms:** calendar widget, date picker, schedule view, planner, agenda calendar
 *
 * Displays a month-view date grid with selectable dates, event indicators, and an optional
 * scrollable event panel. Supports four size variants that adapt header layout, grid density,
 * and event panel placement to fit different viewport sizes and use cases.
 *
 * ## Features / Variants
 *
 * - **Small:** Single-week strip with compact cells. Ideal for inline or dropdown use.
 * - **Regular:** Full month grid stacked above the event list. The standard calendar layout.
 * - **Large:** Side-by-side month grid (left) and event panel (right). Adds a "New event" button.
 * - **XLarge:** Full-page layout with `large` date cells showing inline events. No floating chrome
 *   or footer. Raised "New event" button and a static month/year label replace the dropdown.
 * - **Month navigation:** Previous/next chevron buttons and a "Today" shortcut.
 * - **Date selection:** Clicking a date highlights it, auto-navigates if out-of-month, and
 *   dispatches `date-select`.
 * - **Event panel:** Chronologically sorted event lists starting from the selected date, rendered
 *   inside a scrollable area. Controlled via `hasEventList`.
 * - **Footer:** Optional navigation link row, always hidden in `xlarge` or via `hasFooter = false`.
 * - **Locale-aware:** Weekday labels, month names, and formatting respect the `locale` property.
 * - **Configurable week start:** `firstDayOfWeek` (0 = Sunday, 1 = Monday default).
 *
 * ## Usage Guidelines
 *
 * Use `regular` for dropdown/popover calendars, `small` for inline date strips, `large` for
 * side panels with room for events, and `xlarge` for dedicated full-page calendar views. Provide
 * events as a flat `CalendarEvent[]` array; the component groups and distributes them into the
 * grid and event panel automatically.
 *
 * ## Example
 *
 * ```html
 * <obc-calendar
 *   type="large"
 *   .date=${new Date(2026, 0, 15)}
 *   .selectedDate=${new Date(2026, 0, 15)}
 *   .events=${myEvents}
 *   hasEventList
 *   @date-select=${(e) => console.log('Selected:', e.detail.date)}
 * ></obc-calendar>
 * ```
 *
 * @fires {CustomEvent<{date: Date}>} month-change - Fired when the displayed month changes via navigation.
 * @fires {CustomEvent<{date: Date, events: CalendarEvent[]}>} date-select - Fired when a date cell is clicked.
 * @fires {CustomEvent<void>} today-click - Fired when the "Today" button is clicked.
 * @fires {CustomEvent<void>} new-event-click - Fired when the "+ New event" button is clicked (Large/XLarge only).
 * @fires {CustomEvent<void>} calendar-click - Fired when the footer "Calendar" navigation link is clicked.
 */
@customElement('obc-calendar')
export class ObcCalendar extends LitElement {
  @property({type: String}) type = CalendarType.Regular;
  @property({attribute: false}) date: Date = new Date();
  @property({attribute: false}) selectedDate: Date | null = null;
  @property({attribute: false}) events: CalendarEvent[] = [];
  @property({type: Boolean, attribute: false}) hasEventList = true;
  @property({type: Boolean, attribute: false}) hasFooter = true;
  @property({type: String}) locale?: string;
  @property({type: Number}) firstDayOfWeek = 1;

  @state() private _displayMonth: Date = new Date();

  override willUpdate(changed: PropertyValues) {
    if (changed.has('date')) {
      this._displayMonth = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        1
      );
    }
  }

  private get _monthOptions(): {value: string; label: string}[] {
    const options = [];
    for (let i = -6; i <= 6; i++) {
      const d = new Date(
        this._displayMonth.getFullYear(),
        this._displayMonth.getMonth() + i,
        1
      );
      options.push({
        value: `${d.getFullYear()}-${d.getMonth()}`,
        label: getMonthYearLabel(d, this.locale),
      });
    }
    return options;
  }

  private get _monthValue(): string {
    return `${this._displayMonth.getFullYear()}-${this._displayMonth.getMonth()}`;
  }

  private _navigateDay(offset: number) {
    const base = this.selectedDate ?? new Date();
    const next = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate() + offset
    );
    this.selectedDate = next;
    if (
      next.getMonth() !== this._displayMonth.getMonth() ||
      next.getFullYear() !== this._displayMonth.getFullYear()
    ) {
      this._displayMonth = new Date(next.getFullYear(), next.getMonth(), 1);
      this.dispatchEvent(
        new CustomEvent('month-change', {
          bubbles: true,
          composed: true,
          detail: {date: this._displayMonth},
        })
      );
    }
    this.dispatchEvent(
      new CustomEvent('date-select', {
        bubbles: true,
        composed: true,
        detail: {date: next, events: []},
      })
    );
  }

  private _handlePrevDay() {
    this._navigateDay(-1);
  }

  private _handleNextDay() {
    this._navigateDay(1);
  }

  private _handleTodayClick() {
    const today = new Date();
    this._displayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.selectedDate = today;
    this.dispatchEvent(
      new CustomEvent('today-click', {bubbles: true, composed: true})
    );
    this.dispatchEvent(
      new CustomEvent('date-select', {
        bubbles: true,
        composed: true,
        detail: {date: today, events: []},
      })
    );
  }

  private _handleNewEventClick() {
    this.dispatchEvent(
      new CustomEvent('new-event-click', {bubbles: true, composed: true})
    );
  }

  private _handleDateClick(cell: DateCellInfo) {
    this.selectedDate = cell.date;
    if (!cell.isCurrentMonth) {
      this._displayMonth = new Date(
        cell.date.getFullYear(),
        cell.date.getMonth(),
        1
      );
    }
    this.dispatchEvent(
      new CustomEvent('date-select', {
        bubbles: true,
        composed: true,
        detail: {date: cell.date, events: cell.events},
      })
    );
  }

  private _handleMonthDropdownChange(e: Event) {
    const detail = (e as CustomEvent<{value: string}>).detail;
    const [year, month] = detail.value.split('-').map(Number);
    this._displayMonth = new Date(year, month, 1);
    this.dispatchEvent(
      new CustomEvent('month-change', {
        bubbles: true,
        composed: true,
        detail: {date: this._displayMonth},
      })
    );
  }

  private _handleCalendarClick() {
    this.dispatchEvent(
      new CustomEvent('calendar-click', {bubbles: true, composed: true})
    );
  }

  override render() {
    const isSmall = this.type === CalendarType.Small;
    const isXLarge = this.type === CalendarType.XLarge;
    const isLarge = this.type === CalendarType.Large;
    const showNewEvent = (isLarge || isXLarge) && this.hasEventList;
    const showFooter = this.hasFooter && !isXLarge;

    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`type-${this.type}`]: true,
        })}
      >
        ${this._renderHeader(showNewEvent, isXLarge)}
        ${this._renderContent(isSmall, isXLarge)}
        ${showFooter ? this._renderFooter() : nothing}
      </div>
    `;
  }

  private _renderHeader(showNewEvent: boolean, isXLarge: boolean) {
    if (isXLarge) {
      const monthYearLabel = getMonthYearLabel(this._displayMonth, this.locale);
      return html`
        <div class="title-container">
          <div class="xlarge-label">
            <obi-calendar-google></obi-calendar-google>
            <span class="month-label">${monthYearLabel}</span>
          </div>
          ${showNewEvent
            ? html`
                <obc-button
                  variant="raised"
                  showLeadingIcon
                  @click=${this._handleNewEventClick}
                >
                  <obi-up-iec slot="leading-icon"></obi-up-iec>
                  New event
                </obc-button>
              `
            : nothing}
          ${this._renderNavigation()}
        </div>
      `;
    }

    return html`
      <div class="title-container">
        <obc-dropdown-button
          flat
          style="flex: 1 1 0; min-width: 0;"
          .options=${this._monthOptions}
          .value=${this._monthValue}
          @change=${this._handleMonthDropdownChange}
        ></obc-dropdown-button>
        ${showNewEvent
          ? html`
              <obc-button
                variant="flat"
                showLeadingIcon
                @click=${this._handleNewEventClick}
              >
                <obi-up-iec slot="leading-icon"></obi-up-iec>
                New event
              </obc-button>
            `
          : nothing}
        <obc-divider></obc-divider>
        ${this._renderNavigation()}
      </div>
    `;
  }

  private _renderNavigation() {
    return html`
      <div class="navigation-container">
        <obc-icon-button
          variant="flat"
          cornerLeft
          @click=${this._handlePrevDay}
        >
          <obi-chevron-left-google></obi-chevron-left-google>
        </obc-icon-button>
        <obc-button variant="flat" @click=${this._handleTodayClick}
          >Today</obc-button
        >
        <obc-icon-button
          variant="flat"
          cornerRight
          @click=${this._handleNextDay}
        >
          <obi-chevron-right-google></obi-chevron-right-google>
        </obc-icon-button>
      </div>
    `;
  }

  private _renderContent(isSmall: boolean, isXLarge: boolean) {
    return html`
      <div class="content-container">
        ${this._renderCalendarGrid(isSmall, isXLarge)}
        ${this.hasEventList ? this._renderEventPanel() : nothing}
      </div>
    `;
  }

  private _renderCalendarGrid(isSmall: boolean, isXLarge: boolean) {
    const weekdayNames = getWeekdayNames(this.locale, this.firstDayOfWeek);
    const grid = getMonthGrid(
      this._displayMonth.getFullYear(),
      this._displayMonth.getMonth(),
      this.firstDayOfWeek,
      this.events
    );
    const dateItemSize = isXLarge ? DateItemSize.Large : DateItemSize.Small;

    let displayGrid = grid;
    if (isSmall && this.selectedDate) {
      const targetDate = this.selectedDate;
      const weekIndex = grid.findIndex((week) =>
        week.some((cell) => isSameDay(cell.date, targetDate))
      );
      displayGrid = weekIndex >= 0 ? [grid[weekIndex]] : [grid[0]];
    }

    return html`
      <div class="calendar-container">
        <div class="days-container">
          ${weekdayNames.map(
            (name) => html`<div class="day-label">${name}</div>`
          )}
        </div>
        <div class="grid-container">
          ${displayGrid.map(
            (week) => html`
              <div class="grid-row">
                ${week.map(
                  (cell) => html`
                    <obc-date-item
                      .size=${dateItemSize}
                      .date=${cell.dayNumber}
                      .events=${cell.events}
                      ?isToday=${cell.isToday}
                      ?checked=${this.selectedDate
                        ? isSameDay(cell.date, this.selectedDate)
                        : false}
                      ?disabled=${!cell.isCurrentMonth}
                      @date-click=${() => this._handleDateClick(cell)}
                    ></obc-date-item>
                  `
                )}
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  private _renderEventPanel() {
    const selectedDate = this.selectedDate ?? new Date();
    const eventMap = groupEventsByDate(this.events);
    const sortedKeys = Array.from(eventMap.keys()).sort();
    const startKey = toDateKey(selectedDate);
    const endMonth = new Date(
      this._displayMonth.getFullYear(),
      this._displayMonth.getMonth() + 1,
      0
    );
    const endKey = toDateKey(endMonth);
    const relevantKeys = sortedKeys.filter(
      (key) => key >= startKey && key <= endKey
    );

    return html`
      <div class="event-panel">
        <obc-scrollbar class="obc-thin-scrollbar">
          ${relevantKeys.map((key) => {
            const [y, m, d] = key.split('-').map(Number);
            const eventDate = new Date(y, m - 1, d);
            const events = eventMap.get(key) ?? [];
            return html`
              <obc-event-list
                .date=${eventDate}
                .events=${events}
                .locale=${this.locale}
                .showHeader=${true}
              ></obc-event-list>
            `;
          })}
        </obc-scrollbar>
      </div>
    `;
  }

  private _renderFooter() {
    return html`
      <div class="footer-container">
        <obc-navigation-item
          label="Calendar"
          hasIcon
          hasTrailingIcon
          @click=${this._handleCalendarClick}
        >
          <obi-calendar-date-google slot="icon"></obi-calendar-date-google>
          <obi-application-open-google
            slot="trailing-icon"
          ></obi-application-open-google>
        </obc-navigation-item>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-calendar': ObcCalendar;
  }
}
