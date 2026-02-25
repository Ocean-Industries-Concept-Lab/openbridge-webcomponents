import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './app-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * Enum for available size variants of `<obc-app-button>`.
 * - `Normal`: Standard size for most use cases.
 * - `Small`: Reduced size for dense layouts or secondary actions.
 */
export enum AppButtonSize {
  Normal = 'normal',
  Small = 'small',
}

/**
 * `<obc-app-button>` – A compact, icon-capable button component for primary and secondary actions.
 *
 * This button displays an icon and a label, supporting both regular and small sizes. It can visually indicate a "checked" or selected state, making it suitable for toggleable actions or as a selectable button in a group.
 *
 * ### Features
 * - **Icon support:** Accepts a custom icon via the `icon` slot, allowing for visual cues alongside the label.
 * - **Label:** Displays a text label, set via the `label` property.
 * - **Checked state:** Can be toggled to a "checked" appearance for selected or active actions.
 * - **Size variants:** Supports `normal` (default) and `small` sizes for flexible placement in toolbars or compact UIs.
 * - **Accessible touch target:** Ensures minimum size for usability.
 *
 * ### Variants
 * - **Normal:** Standard size for most use cases, providing a larger touch target and icon.
 * - **Small:** Reduced size for dense layouts or secondary actions.
 * - **Checked:** Visually highlights the button as selected or active.
 *
 * ### Usage Guidelines
 * Use `obc-app-button` for actions that benefit from both an icon and a label, such as toolbars, action panels, or toggleable controls. The `checked` state is ideal for representing toggled or selected actions (e.g., view modes, filters). For icon-only actions, consider a dedicated icon button component.
 * **TODO(designer):** Confirm if there are recommended scenarios or restrictions for using the checked state, and if this button is intended for use in toggle groups.
 *
 * ### Slots
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | icon      | Always          | Displays the leading icon for the button. Use an OpenBridge icon such as `<obi-placeholder></obi-placeholder>`. |
 *
 * ### Properties and Attributes
 * - `label` (string): Sets the button's text label. Default: "Button".
 * - `checked` (boolean): If true, applies the "checked" visual style.
 * - `size` (`'normal'` \| `'small'`): Controls the button's size. Default: `'normal'`.
 *
 * ### Best Practices
 * - Ensure the icon used in the `icon` slot is visually clear at small sizes.
 * - Use the `checked` state to indicate selection, not for general emphasis.
 * - Maintain consistent sizing within button groups for visual harmony.
 *
 * ### Example:
 * ```html
 * <obc-app-button label="Search" size="normal">
 *   <obi-search slot="icon"></obi-search>
 * </obc-app-button>
 * ```
 *
 * @slot icon - Displays the leading icon for the button.
 */
@customElement('obc-app-button')
export class ObcAppButton extends LitElement {
  /**
   * Sets the button's text label.
   * @default "Button"
   */
  @property({type: String}) label = 'Button';

  /**
   * If true, applies the "checked" visual style to indicate selection or active state.
   * @default false
   */
  @property({type: Boolean}) checked = false;

  /**
   * If true, hides the button's label.
   * @default false
   */
  @property({type: Boolean}) hideLabel = false;

  /**
   * If true, applies integration styles for the integration app bar.
   * @default false
   */
  @property({type: Boolean}) integration = false;

  /**
   * Controls the button's size variant. Accepts `'normal'` (default) or `'small'`.
   * @default AppButtonSize.Normal
   */
  @property({type: String}) size = AppButtonSize.Normal;

  @property({type: Boolean}) disabled = false;

  override render() {
    return html` <button
      class="${classMap({
        wrapper: true,
        checked: this.checked,
        small: this.size === AppButtonSize.Small,
        integration: this.integration,
        disabled: this.disabled,
      })}"
      ?disabled=${this.disabled}
    >
      <div class="icon-wrapper">
        <span class="icon">
          <slot name="icon"></slot>
        </span>
      </div>
      ${!this.hideLabel
        ? html`<div class="label">${this.label}</div>`
        : nothing}
    </button>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-app-button': ObcAppButton;
  }
}
