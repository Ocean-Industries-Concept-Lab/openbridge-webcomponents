import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {localized, msg} from '@lit/localize';
import compentStyle from './alert-button.css?inline';
import '../../icons/icon-notification.js';
import '../../icons/icon-notification-advice.js';
import '../../icons/icon-notification-advice-active.js';
import '../../icons/icon-silence-iec.js';
import '../alert-button-item/alert-button-item.js';
import {ObcAlertButtonType} from '../alert-button-item/alert-button-item.js';
import {AlertType, FlashingSpeed, type AlertCounts} from '../../types.js';
import {customElement} from '../../decorator.js';

export {ObcAlertButtonType};

/**
 * `<obc-alert-button>` – A compact, icon-based button for displaying alert or notification status and count.
 *
 * This component provides a visual indicator for active alerts or notifications, supporting different alert types (such as alarm, warning, or caution) and an optional counter badge. It can also include a secondary "silence" action button for muting alerts, adapting its layout responsively for different screen widths.
 *
 * Appears in toolbars or notification areas to give users a quick overview of alert status and provide direct access to alert-related actions. The bell itself is an `obc-alert-button-item`; use the item directly where no silence button or breakpoints are needed, or for its global counter.
 *
 * ## Features
 *
 * - **Variants:**
 *   - **Flat:** Minimal, icon-only button for space-constrained layouts.
 *   - **Normal:** Standard button with icon and optional alert counter.
 *   - **Enhanced:** Visually prominent button for high-priority alerts, with accent styling.
 * - **Alert Types:** Supports `alarm`, `warning`, `caution`, or no alert (idle). Icon and color adapt to the alert type.
 * - **Alert Counter:** Optional badge displays the number of active alerts (except in flat mode).
 * - **Global Counter:** `globalCounter` shows the per-severity `counts` and an optional `shelvedCount` before the bell and the total, as `obc-alert-button-item` draws them.
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
 * **TODO(designer):** The Figma Alert button has no flat Global counter, so below `flatMaxBreakpointPx` the button shows the flat bell without the counts.
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
 * @property nAlerts - Number of active alerts shown in the counter; 0 shows the idle state.
 * @property alertType - Alert type that selects the icon and colours: `alarm`, `warning`, `caution`, a `level-*` severity, or unset for the idle state.
 * @property type - Visual variant: `flat` (icon only), `normal` (default, icon and optional counter) or `enhanced` (emphasized for high-priority alerts).
 * @property large - Increases the button height and padding for touch-friendly or prominent use.
 * @property showSilenceButton - Shows the silence button when the width is at least `silenceButtonMinBreakpointPx` and the button is not flat.
 * @property silenceButtonDisabled - Disables the silence button when true.
 * @availableWhen silenceButtonDisabled showSilenceButton==true
 * @property counter - Shows the alert counter when there are active alerts and the button is not flat.
 * @property globalCounter - Shows the per-severity counts and the shelved count before the bell and the total (the item's global counter); a flat button shows the plain bell.
 * @property counts - Alert count per severity for the global counter badges (`countAlarm`, `countWarning`, `countCaution` and the `level-*` counts).
 * @availableWhen counts globalCounter==true
 * @property shelvedCount - Number of shelved alerts, shown after the global counter badges; hidden at zero.
 * @availableWhen shelvedCount globalCounter==true
 * @property blinking - Flashes the bell for active alerts of a flashing alert type (never for caution).
 * @property flashingSpeed - Flash tempo while `blinking` is on: `default` resolves from `alertType`, `fast`, `slow`, `very-slow` force a tempo, `fixed` never flashes.
 * @availableWhen flashingSpeed blinking==true
 * @property flatMaxBreakpointPx - Window width in px below which a `normal` or `enhanced` button switches to flat mode.
 * @availableWhen flatMaxBreakpointPx type!=flat
 * @property silenceButtonMinBreakpointPx - Minimum window width in px for showing the silence button.
 * @availableWhen silenceButtonMinBreakpointPx showSilenceButton==true
 * @fires {CustomEvent<void>} click-alert - Fired when the main alert button is clicked.
 * @fires {CustomEvent<void>} click-silence - Fired when the silence button is clicked.
 * @stable
 */
@customElement('obc-alert-button')
@localized()
export class ObcAlertButton extends LitElement {
  @property({type: Number}) nAlerts = 0;
  @property({type: String}) alertType?: AlertType;
  @property({type: String}) type = ObcAlertButtonType.Normal;
  @property({type: Boolean}) large = false;
  @property({type: Boolean}) showSilenceButton = false;
  @property({type: Boolean}) silenceButtonDisabled = false;
  @property({type: Boolean}) counter = false;
  @property({type: Boolean}) globalCounter = false;
  @property({type: Object, attribute: false}) counts: AlertCounts = {};
  @property({type: Number}) shelvedCount = 0;
  @property({type: Boolean}) blinking = false;
  @property({type: String}) flashingSpeed: FlashingSpeed =
    FlashingSpeed.Default;
  @property({type: Number}) flatMaxBreakpointPx = 0;
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
    const showSilence = this.showSilenceButtonDynamic;
    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`type-${this.activeType}`]: true,
          large: this.large,
        })}
      >
        <obc-alert-button-item
          .type=${this.activeType}
          .alertType=${this.alertType}
          .nAlerts=${this.nAlerts}
          .counter=${this.counter}
          .globalCounter=${this.globalCounter &&
          this.activeType !== ObcAlertButtonType.Flat}
          .counts=${this.counts}
          .shelvedCount=${this.shelvedCount}
          .blinking=${this.blinking}
          .flashingSpeed=${this.flashingSpeed}
          .fillHeight=${this.large}
          ?data-group-item-not-last=${showSilence}
          @click=${() => this.dispatchEvent(new CustomEvent('click-alert'))}
        ></obc-alert-button-item>
        ${showSilence
          ? html`
              <button
                class="silence-button"
                aria-label=${msg('Silence')}
                @click=${() =>
                  this.dispatchEvent(new CustomEvent('click-silence'))}
                ?disabled=${this.silenceButtonDisabled}
              >
                <div class="visible-wrapper">
                  <obi-silence-iec class="icon"></obi-silence-iec>
                </div>
              </button>
            `
          : nothing}
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
