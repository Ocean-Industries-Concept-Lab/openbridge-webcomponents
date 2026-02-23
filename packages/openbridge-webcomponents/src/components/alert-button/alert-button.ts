import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import compentStyle from './alert-button.css?inline';
import '../../icons/icon-alerts.js';
import '../../icons/icon-alerts-active.js';
import '../../icons/icon-notification.js';
import '../../icons/icon-notification-filled.js';
import '../../icons/icon-notification-advice.js';
import '../../icons/icon-notification-advice-active.js';
import '../../icons/icon-silence-iec.js';
import '../../icons/icon-alerts-alarm-twotone.js';
import '../../icons/icon-alerts-warning-twotone.js';
import '../../icons/icon-alerts-caution-twotone.js';
import {AlertType} from '../../types.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * `ObcAlertButtonType` – Enum for alert button visual and behavioral variants.
 *
 * - `flat`: Minimal, icon-only button for compact spaces.
 * - `normal`: Standard button with icon and optional counter.
 * - `enhanced`: Emphasized button with additional styling for high-priority alerts.
 */
export enum ObcAlertButtonType {
  Flat = 'flat',
  Normal = 'normal',
  Enhanced = 'enhanced',
}

/**
 * `<obc-alert-button>` – A compact, icon-based button for displaying alert or notification status and count.
 *
 * This component provides a visual indicator for active alerts or notifications, supporting different alert types (such as alarm, warning, or caution) and an optional counter badge. It can also include a secondary "silence" action button for muting alerts, adapting its layout responsively for different screen widths.
 *
 * Appears in toolbars or notification areas to give users a quick overview of alert status and provide direct access to alert-related actions.
 *
 * ## Features
 *
 * - **Variants:**
 *   - **Flat:** Minimal, icon-only button for space-constrained layouts.
 *   - **Normal:** Standard button with icon and optional alert counter.
 *   - **Enhanced:** Visually prominent button for high-priority alerts, with accent styling.
 * - **Alert Types:** Supports `alarm`, `warning`, `caution`, or no alert (idle). Icon and color adapt to the alert type.
 * - **Alert Counter:** Optional badge displays the number of active alerts (except in flat mode).
 * - **Silence Button:** Optional secondary button to mute or silence alerts, shown when enabled and at sufficient width.
 * - **Blinking Animation:** Can animate (blink) to draw attention to active alerts (except for caution type).
 * - **Responsive Layout:** Automatically switches to flat mode below a configurable width, and hides the silence button below another configurable width.
 * - **Large Size Option:** Increases button height and padding for touch-friendly or prominent use.
 *
 * ## Usage Guidelines
 *
 * Use `<obc-alert-button>` to provide a persistent, easily accessible indicator of alert or notification status. Ideal for toolbars, headers, or notification panels where users need to be aware of active alerts and may need to silence them quickly.
 *
 * - Use the counter to show the number of active alerts when relevant.
 * - Use the silence button to provide a quick mute action, but only when space allows.
 * - Choose the variant (`flat`, `normal`, `enhanced`) based on available space and the importance of the alert.
 * - The blinking feature should be reserved for urgent or high-priority alerts to avoid unnecessary distraction.
 *
 * **TODO(designer):** Confirm if there are recommended default behaviors for auto-blinking, and if there are any design constraints for when to use each variant.
 *
 * ## Properties
 *
 * - `nAlerts` (number): Number of active alerts to display in the counter badge.
 * - `alertType` (`AlertType`): Type of alert (`alarm`, `warning`, `caution`, or undefined for idle).
 * - `type` (`ObcAlertButtonType`): Visual variant of the button (`flat`, `normal`, `enhanced`). Default is `normal`.
 * - `counter` (boolean): Whether to show the alert counter badge (not available in flat mode).
 * - `showSilenceButton` (boolean): Whether to display the silence button (hidden in flat mode or below min breakpoint).
 * - `silenceButtonDisabled` (boolean): Disables the silence button when true.
 * - `flatMaxBreakpointPx` (number): Maximum width (in px) for normal/enhanced mode; below this, switches to flat mode.
 * - `silenceButtonMinBreakpointPx` (number): Minimum width (in px) to show the silence button; below this, it is hidden.
 * - `blinking` (boolean): Enables blinking animation for active alerts (not for caution type).
 * - `large` (boolean): Increases button size for prominent or touch-friendly use.
 *
 * ## Events
 *
 * - `click-alert` – Fired when the main alert button is clicked.
 * - `click-silence` – Fired when the silence button is clicked.
 *
 * ## Best Practices & Constraints
 *
 * - Only show the counter when there are active alerts and the button is not in flat mode.
 * - The silence button is only visible if enabled, the width is above the minimum breakpoint, and the button is not flat.
 * - Blinking should be used sparingly to avoid overwhelming the user.
 * - Use the large variant for touch interfaces or when the button needs to stand out.
 *
 * ## Example
 *
 * ```html
 * <obc-alert-button
 *   nAlerts="3"
 *   alertType="alarm"
 *   type="enhanced"
 *   counter
 *   showSilenceButton
 *   blinking
 *   large
 *   flatMaxBreakpointPx="600"
 *   silenceButtonMinBreakpointPx="600"
 * ></obc-alert-button>
 * ```
 *
 * In this example, the button shows an alarm icon, a counter badge with "3", is styled as enhanced, blinks to indicate urgency, and includes a silence button if the width allows.
 *
 * @slot - No content slots. All content is provided via properties.
 * @fires click-alert {CustomEvent<void>} Fired when the main alert button is clicked.
 * @fires click-silence {CustomEvent<void>} Fired when the silence button is clicked.
 */
@customElement('obc-alert-button')
export class ObcAlertButton extends LitElement {
  /**
   * Number of active alerts to display in the counter badge.
   *
   * If set to 0, the button appears in the idle state.
   */
  @property({type: Number}) nAlerts = 0;

  /**
   * Type of alert to display.
   *
   * Determines the icon and color scheme. Can be `alarm`, `warning`, `caution`, or undefined for idle state.
   */
  @property({type: String}) alertType?: AlertType;

  /**
   * Visual variant of the button.
   *
   * - `flat`: Minimal, icon-only button for compact layouts.
   * - `normal`: Standard button with icon and optional counter (default).
   * - `enhanced`: Emphasized button for high-priority alerts.
   */
  @property({type: String}) type = ObcAlertButtonType.Normal;

  /**
   * Increases button size for touch-friendly or prominent use.
   *
   * Adds extra height and padding.
   */
  @property({type: Boolean}) large = false;

  /**
   * Whether to display the silence button.
   *
   * The silence button is only shown if this is true, the width is above `silenceButtonMinBreakpointPx`, and the button is not in flat mode.
   */
  @property({type: Boolean}) showSilenceButton = false;

  /**
   * Disables the silence button when true.
   */
  @property({type: Boolean}) silenceButtonDisabled = false;

  /**
   * Whether to show the alert counter badge.
   *
   * Only shown when there are active alerts and the button is not in flat mode.
   */
  @property({type: Boolean}) counter = false;

  /**
   * Enables blinking animation for active alerts.
   *
   * Blinking is only shown for alarm and warning types, not for caution.
   */
  @property({type: Boolean}) blinking = false;

  /**
   * Maximum width (in px) for normal/enhanced mode.
   *
   * If the available width is less than this value, the button switches to flat mode.
   * Only applies when `type` is set to `normal` or `enhanced`.
   */
  @property({type: Number}) flatMaxBreakpointPx = 0;

  /**
   * Minimum width (in px) to show the silence button.
   *
   * If the available width is less than this value, the silence button is hidden.
   * Only applies when `showSilenceButton` is true.
   */
  @property({type: Number}) silenceButtonMinBreakpointPx = 0;

  @state() private width = window.innerWidth;

  private resizeListener = () => {
    this.width = window.innerWidth;
  };

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.resizeListener);
  }

  override disconnectedCallback() {
    window.removeEventListener('resize', this.resizeListener);
    super.disconnectedCallback();
  }

  private alertIcon() {
    const isIdle = this.nAlerts === 0;
    if (isIdle) {
      return html`<obi-alerts class="icon"></obi-alerts>`;
    } else {
      if (this.type === ObcAlertButtonType.Enhanced) {
        return html`<obi-alerts-active class="icon"></obi-alerts-active>`;
      } else if (this.alertType === AlertType.Alarm) {
        return html`<obi-alerts-alarm-twotone
          useCssColor
          class="icon"
        ></obi-alerts-alarm-twotone>`;
      } else if (this.alertType === AlertType.Warning) {
        return html`<obi-alerts-warning-twotone
          useCssColor
          class="icon"
        ></obi-alerts-warning-twotone>`;
      } else {
        return html`<obi-alerts-caution-twotone
          useCssColor
          class="icon"
        ></obi-alerts-caution-twotone>`;
        //     }
      }
    }
  }

  private alertIconNegative() {
    const useIdle =
      this.nAlerts === 0 || this.type !== ObcAlertButtonType.Enhanced;
    if (useIdle) {
      return html`<obi-alerts class="icon"></obi-alerts>`;
    } else if (this.alertType === AlertType.Alarm) {
      return html`<obi-alerts-alarm-twotone
        useCssColor
        class="icon"
      ></obi-alerts-alarm-twotone>`;
    } else if (this.alertType === AlertType.Warning) {
      return html`<obi-alerts-warning-twotone
        useCssColor
        class="icon"
      ></obi-alerts-warning-twotone>`;
    } else {
      return html`<obi-alerts-caution-twotone
        useCssColor
        class="icon"
      ></obi-alerts-caution-twotone>`;
      //     }
    }
  }

  private get activeType(): ObcAlertButtonType {
    if (this.type === ObcAlertButtonType.Flat) {
      return ObcAlertButtonType.Flat;
    }
    if (this.width < this.flatMaxBreakpointPx) {
      return ObcAlertButtonType.Flat;
    }
    return this.type;
  }

  private get showSilenceButtonDynamic(): boolean {
    return (
      this.showSilenceButton &&
      this.width >= this.silenceButtonMinBreakpointPx &&
      this.activeType !== ObcAlertButtonType.Flat
    );
  }

  override render() {
    const hasAlerts = this.nAlerts > 0;
    const showCounter =
      this.counter && hasAlerts && this.activeType !== ObcAlertButtonType.Flat;
    const showBlinking =
      this.blinking && hasAlerts && this.alertType !== AlertType.Caution;
    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`alert-type-${this.alertType ?? 'none'}`]: true,
          counter: showCounter,
          'has-silence': this.showSilenceButtonDynamic,
          [`type-${this.activeType}`]: true,
          blinking: showBlinking,
          large: this.large,
        })}
      >
        <button
          class="alert-button"
          @click=${() => this.dispatchEvent(new CustomEvent('click-alert'))}
        >
          ${showBlinking
            ? html` <div class="blink">
                ${this.alertIconNegative()}
                ${showCounter
                  ? html`<div class="badge">${this.nAlerts}</div>`
                  : null}
              </div>`
            : nothing}
          <div class="visible-wrapper">
            ${this.alertIcon()}
            ${showCounter
              ? html`<div class="badge">${this.nAlerts}</div>`
              : nothing}
          </div>
        </button>

        ${this.showSilenceButtonDynamic
          ? html`
              <button
                class="silence-button"
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('click-silence'))}
                ?disabled=${this.silenceButtonDisabled}
              >
                <div class="visible-wrapper">
                  <obi-silence-iec class="icon"></obi-silence-iec>
                </div>
              </button>
            `
          : null}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-button': ObcAlertButton;
  }
}
