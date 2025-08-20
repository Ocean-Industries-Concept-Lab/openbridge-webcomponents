import {customElement} from '../../decorator.js';
import {LitElement, html, unsafeCSS} from 'lit';
import compentStyle from './divider.css?inline';

/**
 * `<obc-divider>` – A visual separator component for dividing content areas or UI elements.
 *
 * The divider provides a subtle, vertical line to visually separate items within a layout, such as between buttons in a toolbar or sections in a card. It helps organize content and improve readability without drawing excessive attention.
 *
 * ### Features
 * - **Vertical orientation:** Renders as a vertical line by default, suitable for separating horizontally arranged elements.
 * - **Compact size:** Designed to be unobtrusive, with a slim width and moderate height to fit within toolbars, menus, or cards.
 * - **Customizable color:** Uses a CSS variable (`--border-divider-color`) for easy theming and adaptation to different UI palettes.
 * - **Rounded edges:** Features a slight border-radius for a modern, polished appearance.
 *
 * ### Usage Guidelines
 * Use `obc-divider` to create clear visual separation between related UI elements, such as:
 * - Dividing buttons or controls in a horizontal toolbar.
 * - Separating grouped content within a card or panel.
 * - Breaking up sections in a menu or navigation bar.
 *
 * Avoid overusing dividers, as excessive separation can create visual clutter. For horizontal separation, use a horizontal rule or a dedicated horizontal divider component if available.
 *
 * **TODO(designer):** Confirm if a horizontal variant or orientation property is planned, and clarify any additional recommended use cases or constraints.
 *
 * ### Best Practices
 * - Place the divider between elements with appropriate spacing on either side for optimal visual balance.
 * - Use sparingly to maintain a clean and organized interface.
 * - The divider is purely decorative and should not be used as a focusable or interactive element.
 *
 * @slot - (none; this component does not use slots)
 */
@customElement('obc-divider')
export class ObcDivider extends LitElement {
  override render() {
    return html``;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-divider': ObcDivider;
  }
}
