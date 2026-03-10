import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './poi-card-header.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import '../../components/icon-button/icon-button.js';
import '../../icons/icon-close-google.js';
import '../poi-object-vessel/poi-object-vessel.js';

/**
 * Layout variants for POI Card Header.
 * - `tag`: Minimal numbered badge/pill for compact list views.
 * - `condensed`: Single-line with index badge, title, and optional source.
 * - `regular`: Single-line with index badge, leading icon slot, title, and source.
 * - `detailed`: Full header with POI icon, title, description, source, timestamp, and close button.
 */
export enum ObcPoiCardHeaderVariant {
  Tag = 'tag',
  Condensed = 'condensed',
  Regular = 'regular',
  Detailed = 'detailed',
}

/**
 * `<obc-poi-card-header>` - Header block for `obc-poi-card` with tag, condensed, regular, and detailed layouts.
 *
 * ## Overview
 * Use this component to render card identity metadata such as index, title, source, and optional detail rows.
 * Keywords/synonyms: card header, title bar, metadata header, marker header.
 *
 * ## Features/Variants
 * - `variant` (default `regular`):
 *   - `tag`: index badge only.
 *   - `condensed`: index + title + optional source.
 *   - `regular`: condensed layout with optional `leading-icon` slot.
 *   - `detailed`: POI icon, title, description, source, timestamp, and optional close button.
 * - `index` (default `"1"`): badge text.
 * - `cardTitle`, `description`, `source`, `timestamp`: textual metadata fields.
 * - `hasLeadingIcon` (default `false`): enables icon region for regular variant.
 * - `hasCloseButton` (default `false`): renders close action in detailed variant.
 *
 * ## Usage Guidelines
 * - Choose the variant based on available space and metadata density.
 * - Use `hasCloseButton` only when a parent can handle dismiss behavior.
 * - Keep `source` and `timestamp` short to avoid header crowding.
 *
 * ## Slots/Content
 * - `leading-icon`: Optional icon for the regular variant.
 * - `poi-icon`: Optional icon for the detailed variant POI target.
 *
 * ## Events
 * - `close-click`: Fired when the close button is pressed.
 *
 * ## Best Practices
 * - Keep `index` stable and human-readable.
 * - Use `tag` or `condensed` when the header is used in dense lists.
 *
 * ## Example
 * ```html
 * <obc-poi-card-header
 *   variant="detailed"
 *   index="1"
 *   cardTitle="Target"
 *   description="Tracked object"
 *   source="AIS"
 *   timestamp="2 min ago"
 *   hasCloseButton
 * >
 *   <obi-placeholder slot="poi-icon"></obi-placeholder>
 * </obc-poi-card-header>
 * ```
 *
 * @slot leading-icon - Optional icon for the regular variant.
 * @slot poi-icon - Optional icon for the detailed variant POI target.
 * @fires close-click {CustomEvent<void>} Fired when the close button is pressed.
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
            .objectStyle=${'regular'}
            .state=${'static-unchecked'}
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
