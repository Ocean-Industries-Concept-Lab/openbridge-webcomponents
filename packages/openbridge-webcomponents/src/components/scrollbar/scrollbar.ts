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
 * - **Custom styling:** Scrollbar colors, thumb, track, and buttons are styled via CSS variables for easy theming.
 * - **Touch target optimization:** Ensures scrollbar handles are large enough for comfortable interaction, especially on touch devices.
 * - **Scroll to bottom method:** Exposes a `scrollToBottom()` method to programmatically scroll content to the end.
 * - **Slot content:** Wraps any child content, making it flexible for lists, tables, or custom layouts.
 * - **Responsive:** Adapts to the container’s height and width, supporting both vertical and horizontal scrolling.
 *
 * ## Usage Guidelines
 * Use `obc-scrollbar` to provide a visually consistent and accessible scrolling experience for content that may overflow its container. Ideal for long lists, data tables, chat logs, or any area where default browser scrollbars are insufficient or inconsistent with the application’s design.
 *
 * Choose the `type` (wide, normal, thin) based on the context:
 * - **Wide:** Recommended for touch interfaces or when maximum accessibility is needed.
 * - **Normal:** Suitable for standard desktop use.
 * - **Thin:** For dense layouts where space is at a premium, but be mindful of accessibility.
 *
 * **TODO(designer):** Confirm if there are recommended minimum/maximum heights or content types for optimal usability.
 *
 * ## Example
 * ```html
 * <obc-scrollbar style="height: 500px" class="obc-wide-scrollbar">
 *   <div style="height: 1000px; width: 100%; background: linear-gradient(blue, red);"></div>
 * </obc-scrollbar>
 * ```
 * In this example, the scrollbar wraps a tall div, enabling vertical scrolling with a wide, styled scrollbar.
 *
 * ## Best Practices
 * - Use only one scrollbar per scrollable region to avoid nested scrollbars, which can confuse users.
 * - For accessibility, prefer the `wide` type on touch devices or when targeting users who may need larger controls.
 * - Ensure the container has a fixed height or max-height to enable scrolling.
 * - Use the `scrollToBottom()` method to programmatically scroll to the end (e.g., for chat or log viewers).
 * - The component does not provide built-in keyboard navigation; ensure child content is keyboard accessible if needed.
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
