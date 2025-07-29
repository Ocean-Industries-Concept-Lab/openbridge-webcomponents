import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './vendor-button.css?inline';
import {customElement} from '../../decorator.js';

/**
 * `<obc-vendor-button>` – A button component that displays a vendor or company logo as its content.
 *
 * This component renders a clickable button containing an image, typically used to represent a third-party vendor, partner, or authentication provider (such as "Sign in with Vendor" buttons). The button is designed to visually highlight a brand or logo in a compact, interactive format.
 *
 * ### Features
 * - **Image-based button:** Displays a logo or brand image as the main content of the button.
 * - **Customizable image source:** Accepts any image URL via the `imageSrc` property.
 * - **Accessible labeling:** The `alt` property provides alternative text for screen readers.
 * - **Full-width layout:** The button stretches to fill its container's width by default.
 *
 * ### Usage Guidelines
 * Use `obc-vendor-button` when you need a button that represents a vendor, brand, or external service through its logo. Common scenarios include authentication flows (e.g., "Sign in with Google"), partner selection, or highlighting external integrations. Avoid using this component for generic actions or when a text label is required—use a standard button component instead.
 *
 * **TODO(designer):** Confirm if there are recommended minimum/maximum image dimensions, or if there are style guidelines for logo backgrounds (e.g., transparency, padding).
 *
 * ### Slots and Content Structure
 * This component does not use slots. The image is provided via the `imageSrc` property.
 *
 * ### Properties and Attributes
 * - `imageSrc` (string): URL of the image to display as the button's content.
 * - `alt` (string): Alternative text for the image, used for accessibility (default: "logo").
 *
 * ### Best Practices and Constraints
 * - Ensure the provided image is optimized for display at various sizes and maintains legibility.
 * - Use meaningful `alt` text to describe the logo or vendor for accessibility.
 * - Do not use this component for actions that require a text label or icon—use a standard button instead.
 *
 * ### Example:
 * ```html
 * <obc-vendor-button
 *   imageSrc="https://openbridge-demo.web.app/companylogo-day.png"
 *   alt="Acme Corp"
 * ></obc-vendor-button>
 * ```
 *
 * @slot - (none; content is provided via properties)
 */
@customElement('obc-vendor-button')
export class ObcVendorButton extends LitElement {
  /**
   * The URL of the image to display as the button's content.
   *
   * Typically this should be a logo or brand image representing a vendor or external service.
   */
  @property({type: String}) imageSrc = '';

  /**
   * Alternative text for the image, used for accessibility.
   *
   * This should describe the logo or vendor for screen readers.
   */
  @property({type: String}) alt = 'logo';

  override render() {
    return html`
      <button class="wrapper">
        <img src=${this.imageSrc} alt=${this.alt} />
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-vendor-button': ObcVendorButton;
  }
}
