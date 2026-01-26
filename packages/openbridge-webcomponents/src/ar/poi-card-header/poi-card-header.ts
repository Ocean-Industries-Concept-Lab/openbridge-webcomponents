import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './poi-card-header.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import '../../components/icon-button/icon-button.js';
import '../../icons/icon-close-google.js';
import '../poi-object-vessel/poi-object-vessel.js';

/**
 * Enum for POI Card Header variants.
 * - `tag`: Minimal numbered badge/pill at top of content.
 * - `condensed`: Compact single-line with index badge, title, optional source.
 * - `regular`: Single-line with index badge, leading icon slot, title, source.
 * - `detailed`: Full header with POI icon, title, description, source, timestamp, close button.
 */
export enum ObcPoiCardHeaderVariant {
  Tag = 'tag',
  Condensed = 'condensed',
  Regular = 'regular',
  Detailed = 'detailed',
}

/**
 * `<obc-poi-card-header>` - A versatile header component for POI (Point of Interest) cards.
 *
 * Provides four distinct layout variants for displaying POI metadata such as index badges,
 * titles, descriptions, source labels, and timestamps. Commonly used at the top of POI cards
 * to identify targets like vessels, waypoints, or other tracked objects.
 *
 * ## Features
 *
 * - **Tag variant:** Minimal numbered badge/pill, ideal for compact list views.
 * - **Condensed variant:** Single-line with index, title, and optional source badge.
 * - **Regular variant:** Single-line with index, leading icon slot, title, and source badge.
 * - **Detailed variant:** Full header with POI icon button, title, description, source, timestamp, and close button.
 *
 * ## Slots
 *
 * | Slot Name     | Variant   | Purpose                                    |
 * |---------------|-----------|-------------------------------------------|
 * | leading-icon  | regular   | Icon displayed before the title            |
 * | poi-icon      | detailed  | Icon inside the POI target button          |
 *
 * ## Events
 *
 * | Event Name    | Detail | Description                                       |
 * |---------------|--------|---------------------------------------------------|
 * | `close-click` | void   | Fired when the close button is clicked (detailed) |
 *
 * ## Example
 *
 * ```html
 * <obc-poi-card-header
 *   variant="detailed"
 *   index="1"
 *   cardTitle="MV Explorer"
 *   description="Passenger vessel"
 *   source="AIS"
 *   timestamp="2 min ago"
 *   hasCloseButton
 * >
 *   <obi-vessel-type-passenger-outlined slot="poi-icon"></obi-vessel-type-passenger-outlined>
 * </obc-poi-card-header>
 * ```
 *
 * @slot leading-icon - Icon before the title (regular variant only)
 * @slot poi-icon - Icon for the POI target button (detailed variant only)
 * @fires close-click - Fired when the close button is clicked
 */
@customElement('obc-poi-card-header')
export class ObcPoiCardHeader extends LitElement {
  @property({type: String}) variant: ObcPoiCardHeaderVariant =
    ObcPoiCardHeaderVariant.Regular;

  @property({type: String}) index = '1';

  @property({type: String}) cardTitle = '';

  /** Shown only in detailed variant. */
  @property({type: String}) description = '';

  /** Source badge text (e.g., "AIS", "RADAR"). Hidden when empty. */
  @property({type: String}) source = '';

  /** Shown only in detailed variant. */
  @property({type: String}) timestamp = '';

  /** Enables the leading-icon slot (regular variant only). */
  @property({type: Boolean}) hasLeadingIcon = false;

  /** Enables the close button (detailed variant only). */
  @property({type: Boolean}) hasCloseButton = false;

  private get hasSource() {
    return this.source !== '';
  }

  private handleCloseClick(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('close-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private renderIndexBadge() {
    const isTag = this.variant === ObcPoiCardHeaderVariant.Tag;
    return html`
      <div class=${classMap({'index-badge': true, 'tag-style': isTag})}>
        <span class="index-text">${this.index}</span>
      </div>
    `;
  }

  private renderSourceBadge() {
    if (!this.hasSource) return nothing;
    return html`
      <div class="source-badge">
        <span class="source-text">${this.source}</span>
      </div>
    `;
  }

  private renderTagVariant() {
    return html` <div class="tag-container">${this.renderIndexBadge()}</div> `;
  }

  private renderCondensedVariant() {
    return html`
      <div class="id-container">${this.renderIndexBadge()}</div>
      <div class="header-container">
        <span class="title condensed-title">${this.cardTitle}</span>
      </div>
      ${this.renderSourceBadge()}
    `;
  }

  private renderRegularVariant() {
    return html`
      <div class="id-container">${this.renderIndexBadge()}</div>
      <div class="header-container">
        ${this.hasLeadingIcon
          ? html`<div class="icon-container">
              <slot class="leading-icon" name="leading-icon"></slot>
            </div>`
          : nothing}
        <span class="title">${this.cardTitle}</span>
      </div>
      ${this.renderSourceBadge()}
    `;
  }

  private renderDetailedVariant() {
    return html`
      <div class="id-container">${this.renderIndexBadge()}</div>
      <div class="detailed-content">
        <div class="poi-container">
          <obc-poi-object-vessel
            type="regular"
            vesselStyle="regular"
            state="static-unchecked"
          >
            <slot name="poi-icon"></slot>
          </obc-poi-object-vessel>
        </div>
        <div class="text-container">
          <span class="title detailed-title">${this.cardTitle}</span>
          <span class="description">${this.description}</span>
        </div>
        <div class="meta-container">
          ${this.renderSourceBadge()}
          ${this.timestamp
            ? html`<span class="timestamp">${this.timestamp}</span>`
            : nothing}
        </div>
      </div>
      ${this.hasCloseButton
        ? html`<obc-icon-button
            variant="flat"
            class="close-button"
            @click=${this.handleCloseClick}
          >
            <obi-close-google></obi-close-google>
          </obc-icon-button>`
        : nothing}
    `;
  }

  override render() {
    return html`
      <div
        part="wrapper"
        class=${classMap({
          wrapper: true,
          [`variant-${this.variant}`]: true,
        })}
      >
        ${this.variant === ObcPoiCardHeaderVariant.Tag
          ? this.renderTagVariant()
          : this.variant === ObcPoiCardHeaderVariant.Condensed
            ? this.renderCondensedVariant()
            : this.variant === ObcPoiCardHeaderVariant.Regular
              ? this.renderRegularVariant()
              : this.renderDetailedVariant()}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-card-header': ObcPoiCardHeader;
  }
}
