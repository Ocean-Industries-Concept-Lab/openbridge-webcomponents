import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {localized, msg} from '@lit/localize';
import componentStyle from './alert-button-item.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-alerts.js';
import '../../icons/icon-alerts-active.js';
import '../../icons/icon-alerts-alarm-twotone.js';
import '../../icons/icon-alerts-warning-twotone.js';
import '../../icons/icon-alerts-caution-twotone.js';
import '../../manual-icon/icon-alerts-critical-twotone.js';
import '../../manual-icon/icon-alerts-diagnostic-twotone.js';
import '../alert-counter-item/alert-counter-item.js';
import {ObcAlertCounterItemType} from '../alert-counter-item/alert-counter-item.js';
import {
  AlertType,
  FlashingSpeed,
  type AlertCounts,
  type ResolvedFlashingSpeed,
} from '../../types.js';
import {
  AlertFlashPhase,
  AlertTwotoneComponent,
  alertCountsLabel,
  alertTypeLabel,
  getAlertTwotoneComponent,
  rankAlertCounts,
  resolveFlashingSpeed,
} from '../../alert-severity.js';
import {FlashingController} from '../../palettes/flashing-controller.js';

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
 * `<obc-alert-button-item>` – The bell button that shows the alert state and count.
 *
 * Shows the alert status as a bell in the style of the given alert type, with
 * an optional counter, or as a global counter: one badge per severity, then
 * the bell and the total. `obc-alert-button` renders the item next to its
 * silence button; use the item on its own where no silence button is needed.
 *
 * ---
 *
 * ### Features
 * - **Variants (`type`):** `flat` (icon only), `normal` (bordered, icon and
 *   counter) and `enhanced` (filled in the severity colour).
 * - **Alert types:** `alarm`, `warning`, `caution` and the `level-*` family;
 *   `nAlerts` of 0 shows the idle bell.
 * - **Counter:** `counter` shows `nAlerts` next to the bell, except in `flat`.
 * - **Global counter:** `globalCounter` shows the per-severity `counts` as
 *   badges, then the bell and `nAlerts`, always in the normal style.
 * - **Flashing:** `blinking` flashes the bell at the tempo `flashingSpeed`
 *   resolves (#1224).
 * - **Fill height:** `fillHeight` stretches the visible button to the host
 *   height, as the tall `obc-alert-button` does.
 *
 * ---
 *
 * ### Usage Guidelines
 * - Keep `nAlerts` and `counts` consistent; the item shows both as given.
 * - The generated label reads e.g. "Alerts, 12, 2 Alarm, 4 Warning,
 *   6 Caution"; an `aria-label` on the host replaces it.
 * - A native button, so Enter and Space activate it (APG button pattern).
 * - A parent that joins another button to the item's end sets the
 *   `data-group-item-not-last` attribute on the host.
 * - **TODO(designer):** the Figma file draws the flat item's hover, active and
 *   focused variants at 20 % opacity; the item uses the standard flat states.
 * - **TODO(designer):** the Figma file defines no flashing for the global
 *   counter, so it never flashes.
 *
 * ---
 *
 * ### Example
 *
 * ```html
 * <obc-alert-button-item alertType="alarm" nAlerts="3" counter blinking></obc-alert-button-item>
 * <obc-alert-button-item
 *   globalCounter
 *   nAlerts="12"
 *   .counts=${{countAlarm: 2, countWarning: 4, countCaution: 6}}
 * ></obc-alert-button-item>
 * ```
 *
 * @property type - Visual variant: `flat` (icon only), `normal` (default, bordered with the counter) or `enhanced` (filled in the severity colour).
 * @availableWhen type globalCounter==false
 * @property alertType - Alert type that selects the icon and colours: `alarm`, `warning`, `caution` or a `level-*` severity.
 * @availableWhen alertType globalCounter==false
 * @property nAlerts - Number of active alerts; 0 shows the idle bell and hides the counter.
 * @property counter - Shows `nAlerts` next to the bell (not in `flat`).
 * @availableWhen counter globalCounter==false
 * @property globalCounter - Shows the per-severity counts, the bell and the total instead of a single alert status.
 * @property counts - Alert count per severity for the global counter badges.
 * @availableWhen counts globalCounter==true
 * @property shelvedCount - Number of shelved alerts, shown after the global counter badges.
 * @availableWhen shelvedCount globalCounter==true
 * @property blinking - Flashes the bell while there are active alerts of a flashing alert type.
 * @availableWhen blinking globalCounter==false
 * @property flashingSpeed - Flash tempo while `blinking` is on: `default` resolves from `alertType`, `fast`, `slow`, `very-slow` force a tempo, `fixed` never flashes.
 * @availableWhen flashingSpeed blinking==true
 * @property fillHeight - Stretches the visible button to the host height instead of the 32 px visual target.
 * @property ariaLabel - Accessible name forwarded to the inner `<button>`, mapped to the `aria-label` attribute; replaces the generated label. `aria-labelledby` is not supported: ID references cannot cross the shadow boundary.
 * @fires click - Fired when the button is clicked.
 * @experimental
 */
@customElement('obc-alert-button-item')
@localized()
export class ObcAlertButtonItem extends LitElement {
  @property({type: String}) type: ObcAlertButtonType =
    ObcAlertButtonType.Normal;
  @property({type: String}) alertType?: AlertType;
  @property({type: Number}) nAlerts = 0;
  @property({type: Boolean}) counter = false;
  @property({type: Boolean}) globalCounter = false;
  @property({type: Object, attribute: false}) counts: AlertCounts = {};
  @property({type: Number}) shelvedCount = 0;
  @property({type: Boolean}) blinking = false;
  @property({type: String}) flashingSpeed: FlashingSpeed =
    FlashingSpeed.Default;
  @property({type: Boolean}) fillHeight = false;

  // Reactive so a consumer changing the name re-renders the shadow button.
  @property({type: String, attribute: 'aria-label'})
  override ariaLabel: string | null = null;

  protected readonly flashing = new FlashingController(
    this,
    () => this.resolvedFlashingSpeed
  );

  get resolvedFlashingSpeed(): ResolvedFlashingSpeed {
    if (
      this.globalCounter ||
      !this.blinking ||
      this.nAlerts <= 0 ||
      this.alertType === undefined
    ) {
      return FlashingSpeed.Fixed;
    }
    return resolveFlashingSpeed(
      this.flashingSpeed,
      this.alertType,
      AlertFlashPhase.Active
    );
  }

  private get accessibleName(): string {
    if (this.ariaLabel) {
      return this.ariaLabel;
    }
    const parts = [msg('Alerts')];
    if (this.nAlerts > 0) {
      parts.push(String(this.nAlerts));
    }
    if (this.globalCounter) {
      const breakdown = alertCountsLabel(this.counts, this.shelvedCount);
      if (breakdown) {
        parts.push(breakdown);
      }
    } else if (this.nAlerts > 0 && this.alertType) {
      parts.push(alertTypeLabel(this.alertType));
    }
    return parts.join(', ');
  }

  private renderTwotoneIcon() {
    const twotone = this.alertType
      ? getAlertTwotoneComponent(this.alertType)
      : AlertTwotoneComponent.Caution;
    switch (twotone) {
      case AlertTwotoneComponent.Critical:
        return html`<obi-alerts-critical-twotone
          useCssColor
          class="icon"
        ></obi-alerts-critical-twotone>`;
      case AlertTwotoneComponent.Diagnostic:
        return html`<obi-alerts-diagnostic-twotone
          useCssColor
          class="icon"
        ></obi-alerts-diagnostic-twotone>`;
      case AlertTwotoneComponent.Warning:
        return html`<obi-alerts-warning-twotone
          useCssColor
          class="icon"
        ></obi-alerts-warning-twotone>`;
      case AlertTwotoneComponent.Caution:
        return html`<obi-alerts-caution-twotone
          useCssColor
          class="icon"
        ></obi-alerts-caution-twotone>`;
      default:
        return html`<obi-alerts-alarm-twotone
          useCssColor
          class="icon"
        ></obi-alerts-alarm-twotone>`;
    }
  }

  /** The blink layer shows the opposite of the steady layer in each flash. */
  private renderIcon(styleType: ObcAlertButtonType, blinkLayer: boolean) {
    if (this.nAlerts === 0) {
      return html`<obi-alerts class="icon"></obi-alerts>`;
    }
    const enhanced = styleType === ObcAlertButtonType.Enhanced;
    if (blinkLayer) {
      return enhanced
        ? this.renderTwotoneIcon()
        : html`<obi-alerts class="icon"></obi-alerts>`;
    }
    return enhanced || this.globalCounter
      ? html`<obi-alerts-active class="icon"></obi-alerts-active>`
      : this.renderTwotoneIcon();
  }

  private renderCount() {
    return html`<span class="count">${this.nAlerts}</span>`;
  }

  private renderCounts() {
    if (rankAlertCounts(this.counts).length === 0 && this.shelvedCount <= 0) {
      return nothing;
    }
    return html`<obc-alert-counter-item
      .type=${ObcAlertCounterItemType.Badges}
      .counts=${this.counts}
      .shelvedCount=${this.shelvedCount}
    ></obc-alert-counter-item>`;
  }

  override render() {
    const styleType = this.globalCounter
      ? ObcAlertButtonType.Normal
      : this.type;
    const showCount =
      this.nAlerts > 0 &&
      (this.globalCounter ||
        (this.counter && styleType !== ObcAlertButtonType.Flat));
    const tempo = this.resolvedFlashingSpeed;
    return html`
      <button
        class=${classMap({
          'alert-button': true,
          [`type-${styleType}`]: true,
          [`alert-type-${this.alertType ?? 'none'}`]: true,
          counter: showCount && !this.globalCounter,
          'global-counter': this.globalCounter,
          'fill-height': this.fillHeight,
          [`flash-${tempo}`]: true,
        })}
        aria-label=${this.accessibleName}
      >
        ${tempo === FlashingSpeed.Fixed
          ? nothing
          : html`<div class="blink" aria-hidden="true">
              <div class="content">
                ${this.renderIcon(styleType, true)}
                ${showCount ? this.renderCount() : nothing}
              </div>
            </div>`}
        <div class="visible-wrapper">
          ${this.globalCounter ? this.renderCounts() : nothing}
          <div class="content">
            ${this.renderIcon(styleType, false)}
            ${showCount ? this.renderCount() : nothing}
          </div>
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-button-item': ObcAlertButtonItem;
  }
}
