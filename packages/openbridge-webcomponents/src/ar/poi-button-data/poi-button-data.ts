import '../building-blocks/poi-button/poi-button.js';
import '../../icons/icon-vessel-generic-default-filled.js';
import {ObcPoiButton} from '../building-blocks/poi-button/poi-button.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-poi-button-data>` extends `ObcPoiButton` to provide a data-focused POI button with a default fallback icon.
 *
 * ## Overview
 *
 * Use this component when a POI data button should behave like `obc-poi-button`
 * but automatically renders `obi-vessel-generic-default-filled` if no unslotted
 * default content is provided.
 * TODO(designer): Confirm intended product contexts where this wrapper should be preferred over direct `obc-poi-button`.
 *
 * ## Features/Variants
 *
 * - Inherits all visual variants, states, and layout behavior from `obc-poi-button`.
 * - Adds default-content fallback logic in `connectedCallback`.
 * - Leaves provided default content untouched when present.
 * - Leaves slotted content untouched (`header`).
 * - TODO(designer): Confirm whether alternative default icons are needed by variant/theme.
 *
 * ## Usage Guidelines
 *
 * - Prefer `<obc-poi-button-data>` when consumer markup may omit a default icon/content node.
 * - Use the same public properties as `obc-poi-button` (`data`, `value`, `type`, `hasHeader`, etc.).
 * - Provide explicit default content when a domain-specific icon should replace the fallback icon.
 *
 * ## Slots/Content
 *
 * - Default slot: Main icon/content for the POI object body (fallback icon is injected when empty).
 * - `header`: Optional custom header content forwarded to `obc-poi-button`.
 *
 * ## Events
 *
 * - Inherits events from `obc-poi-button`.
 * - `click`: Native click event from the interactive button surface.
 * - TODO(designer): Confirm whether analytics/semantic custom events should be emitted by this wrapper.
 *
 * ## Best Practices
 *
 * - Use this component to enforce consistent fallback visuals for data markers.
 * - Keep `data` rows and slotted `header` synchronized with domain state to avoid mixed UI semantics.
 * - Prefer explicit content for specialized icons; rely on fallback only as a safe default.
 *
 * ## Example
 *
 * ```html
 * <obc-poi-button-data
 *   value="unchecked"
 *   type="button"
 *   .data=${[]}
 * ></obc-poi-button-data>
 * ```
 *
 * @slot - Default icon/content slot for the POI object body.
 * @slot header - Optional custom header content.
 * @fires click - Native click event inherited from `obc-poi-button`.
 */
@customElement('obc-poi-button-data')
export class ObcPoiButtonData extends ObcPoiButton {
  override connectedCallback() {
    super.connectedCallback();
    this.ensureDefaultIcon();
  }

  private ensureDefaultIcon() {
    if (this.querySelector('obi-vessel-generic-default-filled:not([slot])')) {
      return;
    }

    const hasDefaultContent = Array.from(this.childNodes).some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent?.trim();
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        return !(node as Element).hasAttribute('slot');
      }
      return false;
    });

    if (!hasDefaultContent) {
      this.appendChild(
        document.createElement('obi-vessel-generic-default-filled')
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-button-data': ObcPoiButtonData;
  }
}
