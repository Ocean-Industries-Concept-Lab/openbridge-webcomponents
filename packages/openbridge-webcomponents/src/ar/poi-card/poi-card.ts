import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './poi-card.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import '../poi-card-header/poi-card-header.js';
import {ObcPoiCardHeaderVariant} from '../poi-card-header/poi-card-header.js';

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
 * `<obc-poi-card>` – A card component for displaying Point of Interest content.
 *
 * Displays a card with optional header and directional arrow pointer. The card content
 * is provided via a slot, allowing custom content to be inserted.
 *
 * ## Features
 *
 * - **Directional pointer:** Optional arrow pointer in any direction (top, bottom, left, right).
 * - **Optional header:** Uses `obc-poi-card-header` in condensed variant.
 * - **Content sizing:** Can hug content or use fixed 256x256px size.
 * - **Interactive states:** Supports focus and alert border states.
 *
 * ## Slots
 *
 * | Slot Name | Purpose |
 * |-----------|---------|
 * | (default) | Main card content |
 *
 * ## Example
 *
 * ```html
 * <obc-poi-card
 *   pointerDirection="bottom"
 *   index="1"
 *   title="Vessel"
 *   source="AIS"
 * >
 *   <div>Card content here</div>
 * </obc-poi-card>
 * ```
 *
 * @slot - Default slot for card content.
 */
@customElement('obc-poi-card')
export class ObcPoiCard extends LitElement {
  /** Direction of the arrow pointer. */
  @property({type: String}) pointerDirection: PointerDirection =
    PointerDirection.None;

  /** When true, card uses fixed 256x256px size; when false, sizes to content. */
  @property({type: Boolean}) fixedSize = false;

  /** Hide the poi-card-header. */
  @property({type: Boolean}) noHeader = false;

  /** Index/ID shown in the header badge. */
  @property({type: String}) index = '1';

  /** Title text shown in the header. */
  @property({type: String}) override title = '';

  /** Source badge text shown in the header (e.g., "SRC", "AIS"). */
  @property({type: String}) source = '';

  /** Disable interaction states (hover, focus). */
  @property({type: Boolean}) nonInteractive = false;

  /** Show focus border. */
  @property({type: Boolean}) hasFocus = false;

  /** Show alert/caution border. */
  @property({type: Boolean}) hasAlert = false;

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
        variant=${ObcPoiCardHeaderVariant.Condensed}
        index=${this.index}
        title=${this.title}
        source=${this.source}
      ></obc-poi-card-header>
    `;
  }

  private renderInteractionLayer() {
    if (this.nonInteractive) return nothing;
    if (!this.hasFocus && !this.hasAlert) return nothing;

    const hasInnerRing = this.hasAlert;

    return html`
      <div class="interaction-layer">
        <div class="ring-outer"></div>
        <div
          class="ring-middle ${this.hasFocus ? 'focus' : ''} ${this.hasAlert &&
          !this.hasFocus
            ? 'alert'
            : ''}"
        ></div>
        ${hasInnerRing ? html`<div class="ring-inner"></div>` : nothing}
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
          interactive: !this.nonInteractive,
        })}
      >
        ${this.renderTopPointer()}
        <div class="center">
          ${this.renderLeftPointer()}
          <div class="content-box">
            ${this.renderHeader()}
            <div class="content">
              <slot></slot>
            </div>
            ${this.renderInteractionLayer()}
          </div>
          ${this.renderRightPointer()}
        </div>
        ${this.renderBottomPointer()}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-card': ObcPoiCard;
  }
}
