import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './alert-frame.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-alarm-badge.js';
import '../../icons/icon-warning-badge.js';
import '../../icons/icon-caution-badge.js';
import {customElement} from '../../decorator.js';

/**
 * Enum representing the available frame styles for an alert component.
 *
 * - Regular ("regular"): Standard alert frame layout.
 * - SmallSideFlip ("small-side-flip"): Flipped frame with a small side edge.
 * - LargeSideFlip ("large-side-flip"): Flipped frame with a large side edge.
 * - BottomFlip ("bottom-flip"): Frame flipped to the bottom position.
 */
export enum ObcAlertFrameType {
  Regular = 'regular',
  SmallSideFlip = 'small-side-flip',
  LargeSideFlip = 'large-side-flip',
  BottomFlip = 'bottom-flip',
}

/**
 * Thickness options for the alert frame border.
 * - `small`: Thin border (default).
 * - `large`: Thick border for higher emphasis.
 */
export enum ObcAlertFrameThickness {
  Small = 'small',
  Large = 'large',
}

/**
 * Status options for the alert frame, controlling color and icon.
 * - `alarm`: Highest severity (default).
 * - `warning`: Medium severity.
 * - `caution`: Lower severity.
 */
export enum ObcAlertFrameStatus {
  Alarm = 'alarm',
  Warning = 'warning',
  Caution = 'caution',
}

/**
 * `<obc-alert-frame>` – A bordered frame component for visually emphasizing alert or status messages.
 *
 * The alert frame provides a prominent outline and optional "flap" with status icon to draw attention to critical information or UI regions. It supports multiple visual variants and thicknesses, and can be configured to indicate different alert statuses (alarm, warning, caution). The component is designed to wrap content and visually distinguish it from the surrounding UI.
 *
 * ### Features
 * - **Variants (type):**
 *   - `regular`: Standard outlined frame with no flap or icon.
 *   - `small-side-flip`: Adds a small side flap with a status icon at the top right.
 *   - `large-side-flip`: Adds a larger, vertical side flap with a status icon and optional custom icon.
 *   - `bottom-flip`: Adds a bottom flap with a status icon, label, and timer slots.
 * - **Thickness options:** Choose between `small` (thin border) and `large` (thick border) for visual emphasis.
 * - **Status indication:** Displays different color schemes and icons for `alarm`, `warning`, or `caution` states.
 * - **Customizable corners:** Each corner can be set to a sharp (non-rounded) edge for integration with other UI elements.
 * - **Slot-based content:** Supports custom icons, labels, and timers in flap variants via named slots.
 *
 * ### Usage Guidelines
 * Use `obc-alert-frame` to highlight important content, such as alerts, warnings, or status panels. The flap variants are ideal for drawing extra attention to urgent or time-sensitive information, while the regular type provides a subtle but clear border. Choose the status to match the severity of the message (alarm, warning, caution). Adjust thickness for visual hierarchy—use large for high-priority alerts and small for less critical notices.
 *
 * **TODO(designer):** Provide guidance on when to use each flap type (small-side-flip, large-side-flip, bottom-flip) and recommended scenarios for sharp edge usage.
 *
 * ### Features/Variants
 * - **Type (Visual Variant):**
 *   - `regular`: Simple outlined frame, no flap or icon.
 *   - `small-side-flip`: Small right-side flap with status icon.
 *   - `large-side-flip`: Large vertical right-side flap with status icon and optional custom icon.
 *   - `bottom-flip`: Bottom flap with status icon, label, and timer.
 * - **Thickness:** `small` (default) or `large` for border width.
 * - **Status:** `alarm`, `warning`, or `caution`—affects color and icon.
 * - **Corner Customization:** Each corner can be made sharp (not rounded) via boolean properties.
 *
 * ### Slots and Content Structure
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | (default) | Always | Main content inside the alert frame. |
 * | icon | `large-side-flip` or `bottom-flip` | Custom icon displayed in the flap (in addition to status icon). |
 * | label | `bottom-flip` only | Label text shown in the bottom flap. |
 * | timer | `bottom-flip` only | Timer or time label in the bottom flap. |
 *
 * ### Properties and Attributes
 * - `type`: Selects the visual variant/flap style. Default is `small-side-flip`.
 * - `thickness`: Controls border thickness (`small` or `large`). Default is `small`.
 * - `status`: Sets the alert status and color/icon (`alarm`, `warning`, `caution`). Default is `alarm`.
 * - `sharpEdgeTopLeft`, `sharpEdgeTopRight`, `sharpEdgeBottomLeft`, `sharpEdgeBottomRight`: Boolean flags to make each corner sharp instead of rounded.
 *
 * ### Best Practices and Constraints
 * - Use the status property to match the severity of the alert.
 * - Only use the bottom-flip variant when both label and timer are relevant.
 * - For visual consistency, align sharp edge settings with adjacent UI elements.
 * - The default slot is for the main content; use named slots for icons, labels, and timers as needed.
 *
 * ### Example:
 * ```
 * <obc-alert-frame
 *   type="bottom-flip"
 *   thickness="large"
 *   status="warning"
 *   sharpEdgeTopLeft
 * >
 *   <obi-placeholder slot="icon"></obi-placeholder>
 *   <div slot="label">Low Battery</div>
 *   <div slot="timer">00:15</div>
 *   <div>Critical system message goes here.</div>
 * </obc-alert-frame>
 * ```
 *
 * @slot - Default slot for main alert content.
 * @slot icon - Custom icon for the flap (large-side-flip, bottom-flip).
 * @slot label - Label text for the bottom flap (bottom-flip only).
 * @slot timer - Timer or time label for the bottom flap (bottom-flip only).
 */
@customElement('obc-alert-frame')
export class ObcAlertFrame extends LitElement {
  /**
   * Visual variant of the alert frame.
   * - `regular`: Outlined frame only.
   * - `small-side-flip`: Small right-side flap with status icon.
   * - `large-side-flip`: Large vertical right-side flap with status icon and optional custom icon.
   * - `bottom-flip`: Bottom flap with status icon, label, and timer.
   *
   * Default: `small-side-flip`
   */
  @property({type: String}) type: ObcAlertFrameType =
    ObcAlertFrameType.SmallSideFlip;

  /**
   * Border thickness of the alert frame.
   * - `small`: Thin border (default).
   * - `large`: Thick border for higher emphasis.
   */
  @property({type: String}) thickness: ObcAlertFrameThickness =
    ObcAlertFrameThickness.Small;

  /**
   * Status of the alert, controlling color scheme and icon.
   * - `alarm`: Highest severity (default).
   * - `warning`: Medium severity.
   * - `caution`: Lower severity.
   */
  @property({type: String}) status: ObcAlertFrameStatus =
    ObcAlertFrameStatus.Alarm;

  /**
   * If true, the top-left corner will be sharp (not rounded).
   */
  @property({type: Boolean}) sharpEdgeTopLeft: boolean = false;

  /**
   * If true, the top-right corner will be sharp (not rounded).
   */
  @property({type: Boolean}) sharpEdgeTopRight: boolean = false;

  /**
   * If true, the bottom-left corner will be sharp (not rounded).
   */
  @property({type: Boolean}) sharpEdgeBottomLeft: boolean = false;

  /**
   * If true, the bottom-right corner will be sharp (not rounded).
   */
  @property({type: Boolean}) sharpEdgeBottomRight: boolean = false;

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          ['thickness-' + this.thickness]: true,
          [this.type]: true,
          [this.status]: true,
          'sharp-edge-top-left': this.sharpEdgeTopLeft,
          'sharp-edge-top-right': this.sharpEdgeTopRight,
          'sharp-edge-bottom-left': this.sharpEdgeBottomLeft,
          'sharp-edge-bottom-right': this.sharpEdgeBottomRight,
        })}
      >
        <slot></slot>
        ${this.flap()}
      </div>
    `;
  }

  private flap() {
    if (this.type === ObcAlertFrameType.Regular) {
      return nothing;
    }

    let icon = html`<obi-alarm-badge class="icon badge"></obi-alarm-badge>`;
    if (this.status === ObcAlertFrameStatus.Warning) {
      icon = html`<obi-warning-badge class="icon badge"></obi-warning-badge>`;
    } else if (this.status === ObcAlertFrameStatus.Caution) {
      icon = html`<obi-caution-badge class="icon badge"></obi-caution-badge>`;
    }

    if (this.type === ObcAlertFrameType.SmallSideFlip) {
      return html`<div class="flap small">
        ${icon}
        <div class="mask up"></div>
      </div>`;
    }
    if (this.type === ObcAlertFrameType.LargeSideFlip) {
      return html`<div class="flap large">
        ${icon}
        <div class="icon"><slot name="icon"></slot></div>
        <div class="mask up"></div>
        <div class="mask down"></div>
      </div>`;
    }
    if (this.type === ObcAlertFrameType.BottomFlip) {
      return html`<div class="flap bottom">
        ${icon}
        <div class="icon"><slot name="icon"></slot></div>
        <div class="label"><slot name="label"></slot></div>
        <div class="spacer"></div>
        <div class="timer"><slot name="timer"></slot></div>
        <div class="mask right"></div>
        <div class="mask left"></div>
      </div>`;
    }
    console.error('Unknown type of alert frame:', this.type);
    return nothing;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-frame': ObcAlertFrame;
  }
}
