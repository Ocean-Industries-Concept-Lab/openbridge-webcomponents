import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './tab-item.css?inline';
import '../icon-button/icon-button.js';
import {property} from 'lit/decorators.js';
import '../../icons/icon-close-google.js';
import '../badge/badge.js';
import {BadgeSize, BadgeType} from '../badge/badge.js';

@customElement('obc-tab-item')
export class ObcTabItem extends LitElement {
  @property({type: Boolean}) hug = false;
  @property({type: Boolean, reflect: true}) checked = false;
  @property({type: Boolean, attribute: 'has-close'}) hasClose = false;
  @property({type: Boolean, attribute: 'has-leading-icon'}) hasLeadingIcon =
    false;
  @property({type: Boolean, attribute: 'has-title'}) hasTitle = false;
  @property({type: Boolean, attribute: 'has-divider'}) hasDivider = false;
  @property({type: Boolean, attribute: 'has-badge'}) hasBadge = false;
  @property({type: String}) icon = 'placeholder';
  @property({type: String}) override title = 'Tab title';
  @property({type: Boolean}) disabled = false;
  @property({type: String}) badgeType: BadgeType = BadgeType.regular;
  @property({type: String}) badgeSize: BadgeSize = BadgeSize.regular;
  @property({type: Boolean}) badgeHideNumber = false;
  @property({type: Number}) badgeCount = 0;
  @property({type: Boolean}) showLeadingBadgeIcon = false;

  private handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    const clickEvent = new CustomEvent('tab-click', {
      detail: {title: this.title},
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(clickEvent);
  }

  private handleClose(event: Event) {
    event.stopPropagation();

    const closeEvent = new CustomEvent('tab-close', {
      detail: {title: this.title},
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(closeEvent);
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  override render() {
    const wrapperClasses = {
      wrapper: true,
      hug: this.hug,
      'has-close': this.hasClose,
      'has-leading-icon': this.hasLeadingIcon,
      'has-title': this.hasTitle,
      'has-divider': this.hasDivider && !this.checked,
      'has-badge': this.hasBadge,
      disabled: this.disabled,
    };

    return html`
      <div
        class=${classMap(wrapperClasses)}
        role="tab"
        tabindex=${this.disabled ? '-1' : '0'}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        ${this.hasClose
          ? html`
              <obc-icon-button
                class="close-button"
                variant="flat"
                @click=${this.handleClose}
                aria-label="Close tab"
                .disabled=${this.disabled}
                ><obi-close-google></obi-close-google
              ></obc-icon-button>
            `
          : nothing}

        <div class="content">
          ${this.hasLeadingIcon
            ? html`
                <div class="leading-icon">
                  <slot name="leading-icon"></slot>
                </div>
              `
            : nothing}
          ${this.hasTitle
            ? html` <div class="title">
                <slot name="title">${this.title}</slot>
              </div>`
            : nothing}
          ${this.hasBadge
            ? html`
                <obc-badge
                  class="badge"
                  .number=${this.badgeCount}
                  .type=${this.badgeType}
                  .size=${this.badgeSize}
                  .hideNumber=${this.badgeHideNumber}
                  .showIcon=${this.showLeadingBadgeIcon}
                >
                  ${this.showLeadingBadgeIcon
                    ? html`<slot name="badge-icon" slot="badge-icon"></slot>`
                    : nothing}
                </obc-badge>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-tab-item': ObcTabItem;
  }
}
