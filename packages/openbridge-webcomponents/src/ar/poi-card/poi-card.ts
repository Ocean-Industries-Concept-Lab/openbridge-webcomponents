import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './poi-card.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import '../poi-card-header/poi-card-header.js';
import {ObcPoiCardHeaderVariant} from '../poi-card-header/poi-card-header.js';

export {ObcPoiCardHeaderVariant};

/**
 * Event detail for card-click event.
 */
export interface PoiCardClickDetail {
  index: string;
}

export type PoiCardClickEvent = CustomEvent<PoiCardClickDetail>;

/**
 * Enum for POI Card pointer direction.
 */
export enum PointerDirection {
  None = 'none',
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

/**
 * `<obc-poi-card>` - A card container for displaying Point of Interest content.
 *
 * Wraps arbitrary content in a styled card with an optional header and directional
 * arrow pointer. Use this component to present detailed information about a selected
 * or highlighted POI such as a vessel, waypoint, or other tracked object.
 *
 * ## Features
 *
 * - **Directional pointer:** Arrow pointer in any direction (top, bottom, left, right) to anchor the card visually.
 * - **Configurable header:** Integrates `obc-poi-card-header` with all its variants (tag, condensed, regular, detailed).
 * - **Content sizing:** Hugs content by default, or uses fixed 256x256px size.
 * - **Interactive mode:** Enables click events, keyboard focus, and alert border states.
 *
 * ## Slots
 *
 * | Slot Name     | Purpose                                              |
 * |---------------|------------------------------------------------------|
 * | (default)     | Main card content                                    |
 * | leading-icon  | Icon before the title (regular header variant)       |
 * | poi-icon      | Icon for the POI target button (detailed header)     |
 *
 * ## Events
 *
 * | Event Name   | Detail              | Description                              |
 * |--------------|---------------------|------------------------------------------|
 * | `card-click` | `{ index: string }` | Fired when the card is clicked (interactive mode only) |
 *
 * ## Example
 *
 * ```html
 * <obc-poi-card
 *   pointerDirection="bottom"
 *   index="1"
 *   cardTitle="Vessel Name"
 *   source="AIS"
 *   interactive
 * >
 *   <div>Custom card content here</div>
 * </obc-poi-card>
 * ```
 *
 * @slot - Default slot for card content
 * @slot leading-icon - Icon before the title (regular header variant only)
 * @slot poi-icon - Icon for the POI target button (detailed header variant only)
 * @fires card-click - Fired when the card is clicked (interactive mode only)
 */
@customElement('obc-poi-card')
export class ObcPoiCard extends LitElement {
  @property({type: String}) pointerDirection: PointerDirection =
    PointerDirection.None;

  /** When true, uses fixed 256x256px size; otherwise sizes to content. */
  @property({type: Boolean}) fixedSize = false;

  @property({type: Boolean}) noHeader = false;

  @property({type: String}) headerVariant: ObcPoiCardHeaderVariant =
    ObcPoiCardHeaderVariant.Condensed;

  @property({type: String}) index = '1';

  @property({type: String}) cardTitle = '';

  /** Passed to header (detailed variant only). */
  @property({type: String}) description = '';

  /** Source badge text (e.g., "AIS", "RADAR"). Hidden when empty. */
  @property({type: String}) source = '';

  /** Passed to header (detailed variant only). */
  @property({type: String}) timestamp = '';

  /** Enables the leading-icon slot (regular header variant only). */
  @property({type: Boolean}) hasLeadingIcon = false;

  /** Enables the close button (detailed header variant only). */
  @property({type: Boolean}) hasCloseButton = false;

  /** Enables click events, keyboard focus, and alert border support. */
  @property({type: Boolean}) interactive = false;

  /** Shows alert/caution border rings. Requires `interactive` to be true. */
  @property({type: Boolean}) hasAlert = false;

  private handleCardClick() {
    if (!this.interactive) return;

    this.dispatchEvent(
      new CustomEvent<PoiCardClickDetail>('card-click', {
        detail: {index: this.index},
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.interactive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleCardClick();
    }
  }

  private renderPointerSvg(direction: 'top' | 'bottom' | 'left' | 'right') {
    // SVG paths for each direction
    // Top pointer points up (away from card), bottom points down, left points left, right points right
    const paths = {
      top: 'M6 0L12 6H0L6 0Z',
      bottom: 'M6 6L0 0H12L6 6Z',
      left: 'M0 6L6 0V12L0 6Z',
      right: 'M6 6L0 0V12L6 6Z',
    };

    const isVertical = direction === 'top' || direction === 'bottom';
    const width = isVertical ? 12 : 6;
    const height = isVertical ? 6 : 12;

    return html`
      <svg
        width="${width}"
        height="${height}"
        viewBox="0 0 ${width} ${height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="${paths[direction]}"
          fill="var(--overlay-border-outline-color)"
        />
      </svg>
    `;
  }

  private renderTopPointer() {
    if (this.pointerDirection !== PointerDirection.Top) return nothing;
    return html`
      <div class="pointer-container top">${this.renderPointerSvg('top')}</div>
    `;
  }

  private renderBottomPointer() {
    if (this.pointerDirection !== PointerDirection.Bottom) return nothing;
    return html`
      <div class="pointer-container bottom">
        ${this.renderPointerSvg('bottom')}
      </div>
    `;
  }

  private renderLeftPointer() {
    if (this.pointerDirection !== PointerDirection.Left) return nothing;
    return html`
      <div class="pointer-container left">${this.renderPointerSvg('left')}</div>
    `;
  }

  private renderRightPointer() {
    if (this.pointerDirection !== PointerDirection.Right) return nothing;
    return html`
      <div class="pointer-container right">
        ${this.renderPointerSvg('right')}
      </div>
    `;
  }

  private renderHeader() {
    if (this.noHeader) return nothing;
    return html`
      <obc-poi-card-header
        variant=${this.headerVariant}
        index=${this.index}
        cardTitle=${this.cardTitle}
        description=${this.description}
        source=${this.source}
        timestamp=${this.timestamp}
        ?hasLeadingIcon=${this.hasLeadingIcon}
        ?hasCloseButton=${this.hasCloseButton}
      >
        <slot name="leading-icon" slot="leading-icon"></slot>
        <slot name="poi-icon" slot="poi-icon"></slot>
      </obc-poi-card-header>
    `;
  }

  private renderAlertLayer() {
    if (!this.interactive || !this.hasAlert) return nothing;

    return html`
      <div class="alert-layer">
        <div class="ring-outer"></div>
        <div class="ring-middle alert"></div>
        <div class="ring-inner"></div>
      </div>
    `;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          'hug-content': !this.fixedSize,
          'fixed-size': this.fixedSize,
          interactive: this.interactive,
        })}
      >
        ${this.renderTopPointer()}
        <div class="center">
          ${this.renderLeftPointer()}
          <div
            class="content-box"
            tabindex=${this.interactive ? '0' : nothing}
            @click=${this.handleCardClick}
            @keydown=${this.handleKeyDown}
          >
            ${this.renderHeader()}
            <div class="content">
              <slot></slot>
            </div>
            ${this.renderAlertLayer()}
          </div>
          ${this.renderRightPointer()}
        </div>
        ${this.renderBottomPointer()}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-card': ObcPoiCard;
  }
}
