import {LitElement, unsafeCSS} from 'lit';
import {html, literal} from 'lit/static-html.js';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement} from '../../decorator.js';
import iconStyle from './button.css?inline';

/**
 * Enum for button visual variants.
 * - `normal`: Standard button appearance for primary actions.
 * - `raised`: Button with elevated styling for emphasis.
 * - `flat`: Minimal, low-emphasis button for secondary actions.
 */
export enum ButtonVariant {
  normal = 'normal',
  raised = 'raised',
  flat = 'flat',
}

/**
 * Enum for segment position in a segmented button group.
 * - `single`: Standalone button.
 * - `start`: First button in a group.
 * - `middle`: Middle button in a group.
 * - `end`: Last button in a group.
 */
export enum segmentPosition {
  single = 'single',
  start = 'start',
  middle = 'middle',
  end = 'end',
}

/**
 * `<obc-button>` – A versatile button component supporting icons, variants, and link behavior.
 *
 * The obc-button component provides a flexible, accessible button for triggering actions or navigation. It can display leading and/or trailing icons, adapt its appearance via multiple visual variants, and optionally render as a link when an `href` is provided. Designed for consistency and usability across a wide range of UI scenarios.
 *
 * ### Features
 * - **Variants:**
 *   - `normal` (default): Standard button appearance for primary actions.
 *   - `raised`: Button with elevated styling for emphasis.
 *   - `flat`: Minimal, low-emphasis button for secondary actions.
 * - **Icon Support:**
 *   - Leading icon (slot="leading-icon") and/or trailing icon (slot="trailing-icon") can be displayed.
 * - **Full Width:**
 *   - Set `fullWidth` to make the button expand to the width of its container.
 * - **Button or Link:**
 *   - Renders as a native `<button>` by default, or as an `<a>` anchor when `href` is set (with optional `target`).
 * - **Disabled State:**
 *   - Supports disabling for both button and link modes.
 * - **Segmented Group Support:**
 *   - `segmentPosition` property allows the button to visually join with others in a segmented group.
 *
 * ### Usage Guidelines
 * Use `obc-button` for interactive actions such as submitting forms, triggering dialogs, or navigating to other views.
 * - Choose the `normal` variant for primary actions, `raised` for extra emphasis, and `flat` for less prominent or inline actions.
 * - Use leading/trailing icons to visually reinforce the button's purpose (e.g., a download or arrow icon).
 * - When navigation is required, provide an `href` so the button renders as a link for proper semantics and accessibility.
 * - For icon-only buttons, supply an accessible label via the default slot or `aria-label`.
 * - Avoid using multiple buttons with conflicting actions in close proximity; follow standard UI guidelines for button grouping and emphasis.
 * - Use `segmentPosition` to visually group buttons for related actions.
 * - **TODO(designer):** Confirm if there are recommended icon sizes or spacing guidelines for best visual alignment.
 *
 * ### Slots
 * | Slot Name       | Renders When...           | Purpose                                      |
 * |-----------------|--------------------------|----------------------------------------------|
 * | (default)       | Always                    | Button label text (required for accessibility)|
 * | leading-icon    | `showLeadingIcon` is true | Icon displayed before the label              |
 * | trailing-icon   | `showTrailingIcon` is true| Icon displayed after the label               |
 *
 * ### Properties
 * - `variant` (ButtonVariant): Controls the visual style. Default is `normal`.
 * - `fullWidth` (boolean): Expands button to fill container width when true.
 * - `disabled` (boolean): Disables the button or link.
 * - `showLeadingIcon` (boolean): Shows the leading icon slot when true.
 * - `showTrailingIcon` (boolean): Shows the trailing icon slot when true.
 * - `href` (string): If set, renders as an anchor link.
 * - `target` (string): Link target (only applies when `href` is set).
 * - `segmentPosition` (segmentPosition): Visual grouping for segmented button layouts.
 *
 * ### Best Practices
 * - Always provide a clear label for accessibility, even if using only icons.
 * - Use only one primary action per view for clarity.
 * - When using as a link, ensure `href` points to a valid destination and consider `target="_blank"` for external links.
 * - Disabled state prevents all interaction and applies correct styling.
 * - For segmented groups, set `segmentPosition` appropriately on each button to ensure correct border radius and grouping.
 *
 * ### Example:
 * ```
 * <obc-button variant="raised" showLeadingIcon>
 *   <span slot="leading-icon"><obi-search></obi-search></span>
 *   Search
 * </obc-button>
 * ```
 *
 * @slot - Default slot for button label text (required for accessibility)
 * @slot leading-icon - Slot for an icon to appear before the label (shown when `showLeadingIcon` is true)
 * @slot trailing-icon - Slot for an icon to appear after the label (shown when `showTrailingIcon` is true)
 */
@customElement('obc-button')
export class ObcButton extends LitElement {
  /**
   * Controls the button's visual style.
   * - `normal`: Standard button (default)
   * - `raised`: Elevated button for emphasis
   * - `flat`: Minimal, low-emphasis button
   */
  @property({type: String}) variant: ButtonVariant = ButtonVariant.normal;

  /**
   * Expands the button to fill the width of its container when true.
   */
  @property({type: Boolean, reflect: true}) fullWidth = false;

  /**
   * Disables the button or link, preventing user interaction and applying disabled styling.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * Whether to show the leading icon slot (`slot="leading-icon"`).
   * When true, content in the `leading-icon` slot will be displayed before the label.
   */
  @property({type: Boolean}) showLeadingIcon = false;

  /**
   * Whether to show the trailing icon slot (`slot="trailing-icon"`).
   * When true, content in the `trailing-icon` slot will be displayed after the label.
   */
  @property({type: Boolean}) showTrailingIcon = false;

  /**
   * When provided, renders the button as an anchor link (`<a>`) instead of a native button.
   * Use for navigation actions.
   */
  @property({type: String}) href?: string = undefined;

  /**
   * Specifies the target for the anchor link (only applies when `href` is set).
   * Common values: `_blank`, `_self`, `_parent`, `_top`.
   */
  @property({type: String}) target?: string = undefined;

  /**
   * Defines the segment position when used in a segmented button group.
   * - `single`: Standalone button
   * - `start`: First button in a group
   * - `middle`: Middle button in a group
   * - `end`: Last button in a group
   */
  @property({type: String}) segmentPosition: segmentPosition =
    segmentPosition.single;

  private renderLeadingIcon() {
    if (this.showLeadingIcon) {
      return html`
        <span class="icon leading" part="icon leading">
          <slot name="leading-icon"></slot>
        </span>
      `;
    }
    return html``;
  }

  private renderTrailingIcon() {
    if (this.showTrailingIcon) {
      return html`
        <span class="icon trailing" part="icon trailing">
          <slot name="trailing-icon"></slot>
        </span>
      `;
    }
    return html``;
  }

  override render() {
    const tag = this.href ? literal`a` : literal`button`;

    return html`
      <${tag}
        class=${classMap({
          wrapper: true,
          ['variant-' + this.variant]: true,
          hasIconLeading: this.showLeadingIcon,
          hasIconTrailing: this.showTrailingIcon,
          'full-width': this.fullWidth,
          ['segment-position-' + this.segmentPosition]: true,
        })}
        ?disabled=${this.disabled}
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        part="wrapper"
      >
        <div class="visible-wrapper" part="visible-wrapper">
          ${this.renderLeadingIcon()}
          <span class="label" part="label">
            <slot></slot>
          </span>
          ${this.renderTrailingIcon()}
        </div>
      </${tag}>
    `;
  }

  static override styles = unsafeCSS(iconStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-button': ObcButton;
  }
}
