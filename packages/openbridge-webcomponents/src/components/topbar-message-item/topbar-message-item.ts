import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './topbar-message-item.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

export enum ObcTopbarMessageItemAction {
  TextButton = 'text-button',
  IconButton = 'icon-button',
  IconNoClick = 'icon-no-click',
  None = 'none',
}

export enum ObcTopbarMessageItemType {
  Simple = 'simple',
  WithButton = 'with-button',
  WithIconButton = 'with-icon-button',
  Inactive = 'inactive',
}

export enum ObcTopbarMessageItemSize {
  Regular = 'regular',
  Tall = 'tall',
}

@customElement('obc-topbar-message-item')
export class ObcTopbarMessageItem extends LitElement {
  @property({type: String}) type: ObcTopbarMessageItemType =
    ObcTopbarMessageItemType.WithButton;

  @property({type: String}) size: ObcTopbarMessageItemSize =
    ObcTopbarMessageItemSize.Regular;

  @property({type: Boolean}) hasTitle = true;

  @property({type: Boolean}) hasDescription = true;

  @property({type: Boolean}) hasTimestamp = true;

  @property({type: Boolean}) hasTimestamp2 = false;

  @property({type: Boolean}) hasSecondaryIcon = false;

  @property({type: Boolean}) large = false;

  @property({type: Boolean}) empty = false;

  @property({type: String}) action = ObcTopbarMessageItemAction.None;

  private onMessageClick() {
    this.dispatchEvent(new CustomEvent('message-click'));
  }

  private onActionClick() {
    this.dispatchEvent(new CustomEvent('action-click'));
  }

  private get effectiveType(): ObcTopbarMessageItemType {
    if (this.empty) {
      return ObcTopbarMessageItemType.Inactive;
    }

    if (this.action !== ObcTopbarMessageItemAction.None) {
      switch (this.action) {
        case ObcTopbarMessageItemAction.TextButton:
          return ObcTopbarMessageItemType.WithButton;
        case ObcTopbarMessageItemAction.IconButton:
          return ObcTopbarMessageItemType.WithIconButton;
        case ObcTopbarMessageItemAction.IconNoClick:
          return ObcTopbarMessageItemType.WithIconButton;
        default:
          return ObcTopbarMessageItemType.Simple;
      }
    }

    return this.type;
  }

  private get effectiveSize(): ObcTopbarMessageItemSize {
    return this.large ? ObcTopbarMessageItemSize.Tall : this.size;
  }

  private get showPrimaryTimestamp(): boolean {
    return this.hasTimestamp;
  }

  private get showSecondaryTimestamp(): boolean {
    return this.hasTimestamp2;
  }

  override render() {
    const type = this.effectiveType;
    const size = this.effectiveSize;
    const isInactive = type === ObcTopbarMessageItemType.Inactive;
    const hasAction =
      type === ObcTopbarMessageItemType.WithButton ||
      type === ObcTopbarMessageItemType.WithIconButton;
    const isLarge = size === ObcTopbarMessageItemSize.Tall;

    return html`
      <div
        class=${classMap({
          wrapper: true,
          empty: isInactive,
          large: isLarge,
          [`action-${this.action}`]:
            this.action !== ObcTopbarMessageItemAction.None,
          [`type-${type}`]: true,
        })}
      >
        ${isInactive
          ? html`<div class="empty-message">
              <slot name="empty">No active messages</slot>
            </div>`
          : html`
              <button class="message-item-touch" @click=${this.onMessageClick}>
                <div class="message-item">
                  <div class="icon-container">
                    <div class="icon primary">
                      <slot name="primary-icon"></slot>
                    </div>
                    ${this.hasSecondaryIcon
                      ? html`<div class="icon secondary">
                          <slot name="secondary-icon"></slot>
                        </div>`
                      : nothing}
                  </div>
                  <div class="content-container">
                    <div class="title-container">
                      ${this.hasTitle
                        ? html`<div class="title">
                            <slot name="title"></slot>
                          </div>`
                        : nothing}
                      ${isLarge
                        ? html`
                            <div class="timestamp-container">
                              ${this.showPrimaryTimestamp
                                ? html`<div class="time">
                                    <slot name="time"></slot>
                                  </div>`
                                : nothing}
                              ${this.showSecondaryTimestamp
                                ? html`<div class="time">
                                    <slot name="time-secondary"></slot>
                                  </div>`
                                : nothing}
                            </div>
                          `
                        : nothing}
                    </div>
                    ${this.hasDescription
                      ? html`<div class="description">
                          <slot name="description"></slot>
                        </div>`
                      : nothing}
                    ${!isLarge
                      ? html`
                          <div class="spacer"></div>
                          <div class="timestamp-container">
                            ${this.showPrimaryTimestamp
                              ? html`<div class="time">
                                  <slot name="time"></slot>
                                </div>`
                              : nothing}
                            ${this.showSecondaryTimestamp
                              ? html`<div class="time secondary">
                                  <slot name="time-secondary"></slot>
                                </div>`
                              : nothing}
                          </div>
                        `
                      : nothing}
                  </div>
                </div>
              </button>
              ${type === ObcTopbarMessageItemType.WithButton
                ? html`
                    <button
                      class="action-wrapper action-text-button"
                      @click=${this.onActionClick}
                    >
                      <div class="action">
                        <slot name="action-text"></slot>
                      </div>
                    </button>
                  `
                : type === ObcTopbarMessageItemType.WithIconButton
                  ? html`
                      <button
                        class="action-wrapper action-icon-button"
                        @click=${this.onActionClick}
                      >
                        <div class="action">
                          <slot name="action-icon"></slot>
                        </div>
                      </button>
                    `
                  : nothing}
            `}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-topbar-message-item': ObcTopbarMessageItem;
  }
}