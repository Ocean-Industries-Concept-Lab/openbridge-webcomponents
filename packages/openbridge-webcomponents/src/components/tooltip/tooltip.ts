import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './tooltip.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import '../../icons/icon-placeholder.js';

/**
 * Enum for tooltip display type.
 *
 * - `icon`: Shows only an icon.
 * - `label`: Shows text with optional leading icon.
 *
 * Use `TooltipType.icon` for icon-only tooltips and `TooltipType.label` for tooltips with text (and optionally an icon).
 */
export enum TooltipType {
  icon = 'icon',
  label = 'label',
}

/**
 * Enum for tooltip visual style and semantic meaning.
 *
 * - `normal`: Standard informational tooltip (default).
 * - `enhanced`: Highlighted/important notification (blue).
 * - `eco`: Environmental/positive state (green).
 * - `raised`: Elevated/raised appearance.
 * - `caution`: Indicates caution or minor issues (yellow).
 * - `warning`: Highlights warnings or potential problems (orange).
 * - `alarm`: Signals critical or urgent conditions (red).
 *
 * Each variant changes the background and icon/text color to visually communicate its meaning.
 */
export enum TooltipVariant {
  normal = 'normal',
  raised = 'raised',
  enhanced = 'enhanced',
  eco = 'eco',
  alarm = 'alarm',
  warning = 'warning',
  caution = 'caution',
}

/**
 * `<obc-tooltip>` – A compact tooltip component for displaying contextual information, status, or alerts.
 *
 * Appears above UI elements to provide brief, non-intrusive feedback or status cues. Supports both icon-only and text-based tooltips, with multiple visual variants for different semantic meanings (such as warning, alarm, or informational).
 *
 * ---
 *
 * ### Features
 * - **Display Types:**
 *   - `label`: Shows a text label, with optional leading icon (default).
 *   - `icon`: Shows only an icon, for minimal status indication.
 * - **Variants:**
 *   - `normal`: Standard informational tooltip.
 *   - `enhanced`: Highlighted/important notification (blue).
 *   - `eco`: Environmental/positive state (green).
 *   - `raised`: Elevated/raised appearance.
 *   - `caution`: Indicates caution or minor issues (yellow).
 *   - `warning`: Highlights warnings or potential problems (orange).
 *   - `alarm`: Signals critical or urgent conditions (red).
 * - **Icon Support:** Slot for custom icon; can be shown in both `icon` and `label` types.
 * - **Customizable Label:** Text content can be set for label tooltips.
 * - **Responsive Styling:** Adapts color and elevation based on variant.
 * - **Bottom Arrow:** Includes a visual arrow pointing to the referenced element.
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `obc-tooltip` to provide additional context, status, or alerts related to a UI element. Ideal for:
 * - Indicating status or feedback with minimal interruption.
 * - Supplementing controls or indicators with brief explanations.
 * - Highlighting warnings, cautions, or critical states using the appropriate variant.
 *
 * For icon-only tooltips, use `type="icon"` and supply an icon via the `icon` slot. For text-based tooltips, use `type="label"` and set the `label` property, optionally showing an icon with `showIcon`.
 *
 * **TODO(designer):** Clarify best practices for when to use each variant (e.g., when to use `enhanced` vs. `normal`), and any recommended maximum label length.
 *
 * ---
 *
 * ### Slots
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | `icon`    | Always (if `type="icon"` or `type="label"` with `showIcon=true`) | Leading icon representing the tooltip's context or status. |
 *
 * ---
 *
 * ### Properties and Attributes
 * - `type`: Controls whether the tooltip displays only an icon or a label (with optional icon). Default is `label`.
 * - `variant`: Sets the visual style and semantic meaning. Default is `normal`.
 * - `label`: Text content for the tooltip (used only when `type="label"`).
 * - `showIcon`: Whether to show the leading icon in label mode. Has no effect in icon mode.
 *
 * ---
 *
 * ### Best Practices and Constraints
 * - Keep tooltip content concise for quick readability.
 * - Use the semantic variant that matches the importance or type of message (e.g., use `alarm` for critical alerts).
 * - For icon-only tooltips, ensure the icon is universally recognizable.
 * - Avoid using tooltips for persistent or critical information that requires user action—consider alert banners or dialogs for those cases.
 *
 * ---
 *
 * ### Example:
 *
 * ```html
 * <obc-tooltip type="label" variant="warning" label="Low battery" showIcon>
 *   <obi-placeholder slot="icon"></obi-placeholder>
 * </obc-tooltip>
 * ```
 * In this example, the tooltip displays a warning icon and the label "Low battery" with warning styling.
 *
 * @slot icon - Leading icon slot (shown when `type="icon"` or `type="label"` with `showIcon=true`)
 */
@customElement('obc-tooltip')
export class ObcTooltip extends LitElement {
  /**
   * Type of tooltip display.
   *
   * - `icon`: Shows only an icon.
   * - `label`: Shows text with optional leading icon.
   *
   * Default: `label`
   */
  @property({type: String}) type: TooltipType = TooltipType.label;

  /**
   * Visual style and semantic meaning of the tooltip.
   *
   * - `normal` (default): Standard informational tooltip.
   * - `enhanced`: Highlighted/important notification (blue).
   * - `eco`: Environmental/positive state (green).
   * - `raised`: Elevated/raised visual style.
   * - `caution`: Indicates caution or minor issues (yellow).
   * - `warning`: Highlights warnings or potential problems (orange).
   * - `alarm`: Signals critical or urgent conditions (red).
   *
   * Default: `normal`
   */
  @property({type: String}) variant: TooltipVariant = TooltipVariant.normal;

  /**
   * Text content displayed in the tooltip (only used when `type="label"`).
   *
   * Default: `'Label'`
   */
  @property({type: String}) label = 'Label';

  /**
   * Whether to show the leading icon when `type="label"`.
   * Has no effect when `type="icon"`.
   *
   * Default: `false`
   */
  @property({type: Boolean}) showIcon = false;

  override render() {
    const showIconSlot =
      this.type === TooltipType.icon ||
      (this.type === TooltipType.label && this.showIcon);

    return html`
      <div
        class=${classMap({
          wrapper: true,
          [this.type]: true,
          [this.variant]: true,
        })}
      >
        ${showIconSlot
          ? html`
              <div class="icon-container">
                <slot name="icon">
                  <obi-placeholder></obi-placeholder>
                </slot>
              </div>
            `
          : nothing}
        ${this.type === TooltipType.label
          ? html`
              <div class="label-container">
                <span class="label-text">${this.label}</span>
              </div>
            `
          : nothing}

        <div class="bottom-arrow">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M5 6L0 0H10L5 6Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-tooltip': ObcTooltip;
  }
}
