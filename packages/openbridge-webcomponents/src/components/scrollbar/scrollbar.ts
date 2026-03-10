import {customElement} from '../../decorator.js';
import {LitElement, html, unsafeCSS} from 'lit';
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
  override render() {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }

  /**
   * Scrolls the content area to the bottom.
   *
   * Useful for chat logs, notifications, or any scenario where the latest content should be visible.
   *
   * Throws an error if the internal wrapper is not found (should not occur in normal usage).
   */
  scrollToBottom() {
    const wrapper = this.shadowRoot?.querySelector('.wrapper');
    if (!wrapper) {
      throw new Error('Wrapper not found');
    }
    wrapper.scrollTop = wrapper.scrollHeight;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-scrollbar': ObcScrollbar;
  }
}
