import {customElement} from '../../decorator.js';
import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './scrollbar.css?inline';

/**
 * `<obc-scrollbar>` – A customizable scrollable container with styled scrollbars.
 *
 * Provides a scrollable area with visually enhanced, themeable scrollbars that support different thickness options. Designed to replace the browser’s default scrollbar with a consistent, accessible appearance and improved touch target sizing.
 *
 * Appears as a wrapper around content that may overflow vertically or horizontally, ensuring a uniform scrollbar experience across platforms.
 *
 * ## Features
 * - **Scrollbar thickness variants:** Supports `wide`, `normal`, and `thin` types to adapt to different UI density or accessibility needs.
 * - **Touch target optimization:** Ensures scrollbar handles are large enough for comfortable interaction, especially on touch devices where gloves are worn or for low sensitivity touch screens
 * - **Slot content:** Wraps any child content, making it flexible for lists, tables, or custom layouts.
 * - **Responsive:** Adapts to the container’s height and width, supporting both vertical and horizontal scrolling.
 *
 * ## Usage Guidelines
 *
 * Choose the `type` (obc-wide-scrollbar, obc-normal-scrollbar, obc-thin-scrollbar) based on the context, note that this is not a property of the component, but a CSS class.
 * - **obc-wide-scrollbar:** Recommended for touch interfaces where gloves are worn or for low sensitivity touch screens.
 * - **obc-normal-scrollbar:** Suitable for touch interfaces where a scrollbar is used to navigate.
 * - **obc-thin-scrollbar:** Suitable for desktop use or for touch interfaces where swipe gestures are used to navigate.
 *
 *
 * ## Example
 * ```html
 * <obc-scrollbar style="height: 500px" class="obc-wide-scrollbar">
 *   <div style="height: 1000px; width: 100%; background: linear-gradient(blue, red);"></div>
 * </obc-scrollbar>
 * ```
 *
 * ## Best Practices
 * - Use only one scrollbar per scrollable region to avoid nested scrollbars, which can confuse users.
 *
 * @slot - Default slot for scrollable content (renders all children inside the scrollable area)
 */
@customElement('obc-scrollbar')
export class ObcScrollbar extends LitElement {
  @property({type: Boolean, attribute: 'transparent-track'})
  transparentTrack = false;

  @state() private _thumbTop = 0;
  @state() private _thumbHeight = 0;
  @state() private _showOverlayThumb = false;

  private _resizeObserver: ResizeObserver | null = null;
  private _scrollHandler: (() => void) | null = null;
  private _wrapper: Element | null = null;

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          'transparent-track': this.transparentTrack,
        })}
      >
        <slot></slot>
      </div>
      ${this.transparentTrack && this._showOverlayThumb
        ? html`<div class="overlay-track">
            <div
              class="overlay-thumb"
              style="top:${this._thumbTop}%;height:${this._thumbHeight}%"
            ></div>
          </div>`
        : nothing}
    `;
  }

  override firstUpdated() {
    this._wrapper = this.shadowRoot?.querySelector('.wrapper') ?? null;
    if (this._wrapper) {
      this._resizeObserver = new ResizeObserver(() => {
        this._checkOverflow();
        this._updateOverlayThumb();
      });
      this._resizeObserver.observe(this._wrapper);
      const slot = this._wrapper.querySelector('slot');
      slot?.addEventListener('slotchange', () => {
        this._checkOverflow();
        this._updateOverlayThumb();
      });

      if (this.transparentTrack) {
        this._scrollHandler = () => this._updateOverlayThumb();
        this._wrapper.addEventListener('scroll', this._scrollHandler, {
          passive: true,
        });
      }
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    if (this._scrollHandler && this._wrapper) {
      this._wrapper.removeEventListener('scroll', this._scrollHandler);
      this._scrollHandler = null;
    }
    this._wrapper = null;
  }

  private _updateOverlayThumb() {
    if (!this.transparentTrack) return;
    if (!this._wrapper) return;
    const {scrollHeight, clientHeight, scrollTop} = this._wrapper;
    if (scrollHeight <= clientHeight) {
      this._showOverlayThumb = false;
      return;
    }
    this._showOverlayThumb = true;
    const trackHeight = clientHeight;
    const pad =
      parseFloat(
        getComputedStyle(this._wrapper).getPropertyValue(
          '--menu-navigation-components-scroll-bar-padding'
        )
      ) || 4;
    const usable = trackHeight - pad * 2;
    const thumbH = (clientHeight / scrollHeight) * usable;
    const thumbY = pad + (scrollTop / scrollHeight) * usable;
    this._thumbTop = (thumbY / trackHeight) * 100;
    this._thumbHeight = (thumbH / trackHeight) * 100;
  }

  private _checkOverflow() {
    if (!this._wrapper) return;
    const isOverflowing =
      this._wrapper.scrollHeight > this._wrapper.clientHeight;
    this.toggleAttribute('overflowing', isOverflowing);
  }

  /**
   * Scrolls the content area to the bottom.
   *
   * Useful for chat logs, notifications, or any scenario where the latest content should be visible.
   *
   * Throws an error if the internal wrapper is not found (should not occur in normal usage).
   */
  scrollToBottom() {
    if (!this._wrapper) {
      throw new Error('Wrapper not found');
    }
    this._wrapper.scrollTop = this._wrapper.scrollHeight;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-scrollbar': ObcScrollbar;
  }
}
