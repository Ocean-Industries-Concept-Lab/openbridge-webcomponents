import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './message-menu-item.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../button/button.js';
import '../../icons/icon-chevron-down-google.js';
import '../../icons/icon-chevron-up-google.js';
import {customElement} from '../../decorator.js';
import "../../icons/icon-alerts-shelf.js";

export enum ObcMessageMenuItemSize {
  SingleLine = 'single-line',
  DoubleLine = 'double-line',
  MultiLine = 'multi-line',
}

export enum ObcMessageMenuItemStackDirection {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

@customElement('obc-message-menu-item')
export class ObcMessageMenuItem extends LitElement {
  @property({type: String}) size: ObcMessageMenuItemSize = ObcMessageMenuItemSize.SingleLine;
  @property({type: String}) stackDirection: ObcMessageMenuItemStackDirection = ObcMessageMenuItemStackDirection.Horizontal;
  @property({type: Boolean}) enhancedIcon = false;
  @property({type: Boolean}) open = false;
  @property({type: Boolean}) hasPrimaryAction = false;
  @property({type: Boolean}) hasSecondaryAction = false;
  @property({type: Boolean}) hasTrailingIcon = false;
  @property({type: Boolean}) hasPrimaryIcon = false;
  @property({type: Boolean}) hasSecondaryIcon = false;
  @property({type: Boolean}) isShelved = false;
  @property({type: Boolean}) hasTimestamp = false;
  @property({type: Boolean}) hasDay = false;

  private get activeSize() {
    if (this.size === ObcMessageMenuItemSize.MultiLine || this.open) {
      return ObcMessageMenuItemSize.MultiLine;
    }
    return this.size;
  }

  private handleMessageClick() {
    if (this.size !== ObcMessageMenuItemSize.MultiLine) {
      this.open = !this.open;
    }
    
    this.dispatchEvent(new CustomEvent('message-click', {
      detail: { 
        open: this.open 
      },
      bubbles: true,
      composed: true
    }));
  }

  private handlePrimaryActionClick(e: Event) {
    e.stopPropagation();

    this.dispatchEvent(new CustomEvent('primary-action-click', {
      bubbles: true,
      composed: true
    }));
  }

  private handleSecondaryActionClick(e: Event) {
    e.stopPropagation();

    this.dispatchEvent(new CustomEvent('secondary-action-click', {
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          ['active-size-' + this.activeSize]: true,
          ['size-' + this.size]: true,
          ['enhanced-icon']: this.enhancedIcon,
          ['has-date']: this.hasTimestamp,
          ['stack-' + this.stackDirection]: true,
        })}
        @click=${this.handleMessageClick}
      >
        <div class="content-container">
          <div class="icon-container">
            ${this.isShelved
              ? html`<div class="icon">
                  <obi-alerts-shelf></obi-alerts-shelf>
                </div>`
              : nothing}
            ${this.hasPrimaryIcon
              ? html`<div class="icon primary">
                  <slot name="primary-icon"></slot>
                </div>`
              : nothing}
            ${this.hasSecondaryIcon
              ? html`<div class="icon secondary">
                  <slot name="secondary-icon"></slot>
                </div>`
              : nothing}
          </div>
          <div class="text-container">
            <div class="title-container">
              <slot name="title"></slot>
            </div>
            <div class="description-container">
              <slot name="description"></slot>
            </div>
            ${this.hasTimestamp
              ? html`<div class="date-container">
                  ${this.hasDay ? html`<slot name="day"></slot>` : nothing}
                  <slot name="time"></slot>
                </div>`
              : nothing}
            ${this.size === ObcMessageMenuItemSize.MultiLine
              ? nothing
              : html`<div class="chevron">
                  ${this.open
                    ? html`<obi-chevron-up-google></obi-chevron-up-google>`
                    : html`<obi-chevron-down-google></obi-chevron-down-google>`}
                </div>`}
          </div>
        </div>
        ${this.hasPrimaryAction || this.hasSecondaryAction || this.hasTrailingIcon
          ? html`<div class="action-button-container">
              ${this.hasSecondaryAction
                ? html`<obc-button variant="normal" @click=${this.handleSecondaryActionClick}>
                    <slot name="secondary-action-label"></slot>
                  </obc-button>`
                : nothing}
              ${this.hasPrimaryAction
                ? html`<obc-button variant="normal" @click=${this.handlePrimaryActionClick}>
                    <slot name="primary-action-label"></slot>
                  </obc-button>`
                : nothing}
              ${this.hasTrailingIcon
                ? html`<div class="trailing-icon">
                    <slot name="trailing-icon"></slot>
                  </div>`
                : nothing}
            </div>`
          : nothing}
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-message-menu-item': ObcMessageMenuItem;
  }
}