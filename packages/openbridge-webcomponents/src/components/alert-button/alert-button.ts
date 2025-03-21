import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
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

export enum ObcAlertButtonType {
  Flat = 'flat',
  Normal = 'normal',
  Enhanced = 'enhanced',
}

/**
 * Button used for alerts and notification
 *
 * @prop {number} nAlerts - Number of alerts.
 * @prop {AlertType | undefined} alertType - Type of alert or undefined if no alerts
 * @prop {ObcAlertButtonType} type - Type of button.
 * @prop {boolean} counter - Show the number of alerts, not possible for flat type.
 * @prop {boolean} showSilenceButton - Show the silence button.
 * @prop {boolean} silenceButtonDisabled - Disable the silence button.
 * @prop {number} flatMaxBreakpoint - Set the max breakpoint for flat type. Requires that type is set to normal or enhanced. Will use flat type if the width is less than this value.
 * @prop {number} silenceButtonMinBreakpoint - Set the min breakpoint for silence button. Requires that showSilenceButton is set to true. Will hide the silence button if the width is less than this value.
 * @prop {boolean} blinking - Blink the alert icon.
 * @prop {boolean} large - Use large button.
 *
 * @fires click-alert - Fires when the button is clicked.
 * @fires click-silence - Fires when the silence button is clicked.
 */
@customElement('obc-alert-button')
export class ObcAlertButton extends LitElement {
  @property({type: Number}) nAlerts = 0;
  @property({type: String}) alertType?: AlertType;
  @property({type: String}) type = ObcAlertButtonType.Normal;
  @property({type: Boolean}) large = false;
  @property({type: Boolean}) showSilenceButton = false;
  @property({type: Boolean}) silenceButtonDisabled = false;
  @property({type: Boolean}) counter = false;
  @property({type: Boolean}) blinking = false;
  @property({type: Number}) flatMaxBreakpointPx = 0;
  @property({type: Number}) silenceButtonMinBreakpointPx = 0;

  @state() width = window.innerWidth;

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
      this.showSilenceButton && this.width >= this.silenceButtonMinBreakpointPx
    );
  }

  override render() {
    const hasAlerts = this.nAlerts > 0;
    const showCounter =
      this.counter && hasAlerts && this.activeType !== ObcAlertButtonType.Flat;
    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`alert-type-${this.alertType ?? 'none'}`]: true,
          counter: showCounter,
          'has-silence': this.showSilenceButtonDynamic,
          [`type-${this.activeType}`]: true,
          blinking: this.blinking,
          large: this.large,
        })}
      >
        <button
          class="alert-button"
          @click=${() => this.dispatchEvent(new CustomEvent('click-alert'))}
        >
          ${this.blinking
            ? html` <div class="blink">
                <obi-alerts class="icon"></obi-alerts>
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
