import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './advice-message-item.css?inline';
import '../topbar-message-item/topbar-message-item.js';
import {
  ObcTopbarMessageItemType,
  ObcTopbarMessageItemSize,
} from '../topbar-message-item/topbar-message-item.js';
import '../../icons/icon-notification-advice-active.js';
import '../../icons/icon-close-google.js';

@customElement('obc-advice-message-item')
export class ObcAdviceMessageItem extends LitElement {
  @property({type: String}) override title = '';
  @property({type: String}) description = '';
  @property({type: String}) time = '';
  @property({type: String}) timeSecondary = '';
  @property({type: String}) actionLabel = 'View';
  @property({type: String}) type:
    | 'simple'
    | 'with-button'
    | 'with-icon-button'
    | 'inactive' = 'simple';
  @property({type: String}) size: 'regular' | 'tall' = 'regular';
  @property({type: Boolean}) hasTitle = true;
  @property({type: Boolean}) hasDescription = true;
  @property({type: Boolean}) hasTimestamp = true;
  @property({type: Boolean}) hasTimestamp2 = false;
  @property({type: Boolean}) hasSecondaryIcon = false;
  @property({type: Boolean}) large = false;
  @property({type: Boolean}) empty = false;
  @property({type: String}) emptyText = 'No active advice';

  private get mappedType(): ObcTopbarMessageItemType {
    if (this.empty || this.type === 'inactive') {
      return ObcTopbarMessageItemType.Inactive;
    }

    switch (this.type) {
      case 'with-button':
        return ObcTopbarMessageItemType.WithButton;
      case 'with-icon-button':
        return ObcTopbarMessageItemType.WithIconButton;
      case 'simple':
        return ObcTopbarMessageItemType.Simple;
      default:
        return ObcTopbarMessageItemType.Simple;
    }
  }

  private get mappedSize(): ObcTopbarMessageItemSize {
    if (this.large) {
      return ObcTopbarMessageItemSize.Tall;
    }
    return this.size === 'tall'
      ? ObcTopbarMessageItemSize.Tall
      : ObcTopbarMessageItemSize.Regular;
  }

  private handleMessageClick() {
    this.dispatchEvent(new CustomEvent('message-click'));
  }

  private handleActionClick() {
    this.dispatchEvent(new CustomEvent('action-click'));
  }

  override render() {
    return html`
      <obc-topbar-message-item
        .type=${this.mappedType}
        .size=${this.mappedSize}
        .hasTitle=${this.hasTitle}
        .hasDescription=${this.hasDescription}
        .hasTimestamp=${this.hasTimestamp}
        .hasTimestamp2=${this.hasTimestamp2}
        .hasSecondaryIcon=${this.hasSecondaryIcon}
        .large=${this.large}
        .empty=${this.empty}
        @message-click=${this.handleMessageClick}
        @action-click=${this.handleActionClick}
      >
        <obi-notification-advice-active
          slot="primary-icon"
        ></obi-notification-advice-active>

        ${this.hasSecondaryIcon
          ? html`<slot name="secondary-icon" slot="secondary-icon"></slot>`
          : nothing}
        ${this.title && this.hasTitle
          ? html`<span slot="title">${this.title}</span>`
          : nothing}
        ${this.description && this.hasDescription
          ? html`<span slot="description">${this.description}</span>`
          : nothing}
        ${this.time && this.hasTimestamp
          ? html`<span slot="time">${this.time}</span>`
          : nothing}
        ${this.timeSecondary && this.hasTimestamp2
          ? html`<span slot="time-secondary">${this.timeSecondary}</span>`
          : nothing}
        ${this.type === 'with-button'
          ? html`<span slot="action-text">${this.actionLabel}</span>`
          : this.type === 'with-icon-button'
            ? html`<obi-close-google slot="action-icon"></obi-close-google>`
            : nothing}

        <span slot="empty">${this.emptyText}</span>
      </obc-topbar-message-item>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-advice-message-item': ObcAdviceMessageItem;
  }
}
