import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './notification-button.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-notification.js';
import '../../icons/icon-notification-filled.js';

export enum NotificationButtonStyle {
  Flat = 'flat',
  Normal = 'normal',
  Enhanced = 'enhanced',
}

export interface NotificationButtonClickEvent {
  count: number;
  isActive: boolean;
}

@customElement('obc-notification-button')
export class ObcNotificationButton extends LitElement {
  @property({type: String}) buttonStyle: NotificationButtonStyle =
    NotificationButtonStyle.Flat;
  @property({type: Number}) count = 0;
  @property({type: Boolean}) showCount = false;
  @property({type: Boolean}) isActive = false;
  @property({type: String}) override ariaLabel = 'Notifications';

  override render() {
    // Apply normal/enhanced only when active
    const useNormal =
      this.isActive && this.buttonStyle === NotificationButtonStyle.Normal;
    const useEnhanced =
      this.isActive && this.buttonStyle === NotificationButtonStyle.Enhanced;
    const useFlat =
      this.buttonStyle === NotificationButtonStyle.Flat ||
      (!useNormal && !useEnhanced);

    // Show counter when using normal/enhanced styles and showCount is true
    const hasCounter = (useNormal || useEnhanced) && this.showCount;

    const wrapperClasses = {
      wrapper: true,
      'is-active': this.isActive,
      'has-counter': hasCounter,
      flat: useFlat,
      normal: useNormal,
      enhanced: useEnhanced,
    };

    const visibleWrapperClasses = {
      'visible-wrapper': true,
    };

    return html`
      <button
        class="${classMap(wrapperClasses)}"
        @click="${this.handleClick}"
        aria-label="${this.ariaLabel}${hasCounter ? `, ${this.count} new` : ''}"
        aria-pressed="${this.isActive}"
        role="button"
        type="button"
      >
        <div class="${classMap(visibleWrapperClasses)}">
          <div class="icon-container">
            <slot name="icon"> ${this.renderDefaultIcon()} </slot>
          </div>
          ${hasCounter
            ? html` <span class="count-label">${this.count}</span> `
            : nothing}
        </div>
      </button>
    `;
  }

  private renderDefaultIcon() {
    if (this.isActive) {
      return html`<obi-notification-filled></obi-notification-filled>`;
    }
    return html`<obi-notification></obi-notification>`;
  }

  private handleClick() {
    const event = new CustomEvent<NotificationButtonClickEvent>('obc-click', {
      detail: {
        count: this.count,
        isActive: !this.isActive,
      },
      composed: true,
      bubbles: true,
    });

    this.dispatchEvent(event);
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-notification-button': ObcNotificationButton;
  }
}
