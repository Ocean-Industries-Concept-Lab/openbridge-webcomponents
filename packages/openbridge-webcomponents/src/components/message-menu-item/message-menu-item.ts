import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './message-menu-item.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../button/button.js';
import '../../icons/icon-chevron-down-google.js';
import '../../icons/icon-chevron-up-google.js';

export enum ObcMessageMenuItemSize {
  SingleLine = 'single-line',
  DoubleLine = 'double-line',
  MultiLine = 'multi-line',
}

@customElement('obc-message-menu-item')
export class ObcMessageMenuItem extends LitElement {
  @property({type: String}) size: ObcMessageMenuItemSize =
    ObcMessageMenuItemSize.SingleLine;
  @property({type: Boolean}) enhancedIcon: boolean = false;
  @property({type: Boolean}) open: boolean = false;
  @property({type: Boolean}) hasActionButton: boolean = false;

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          ['active-size-' + this.ActiveSize]: true,
          ['size-' + this.size]: true,
          ['enhanced-icon']: this.enhancedIcon,
        })}
        @click=${this.onMessageClick}
      >
        <div class="content-container">
          <div class="icon-container">
            <div class="icon tertiary">
              <slot name="tertiary-icon"></slot>
            </div>
            <div class="icon primary">
              <slot name="primary-icon"></slot>
            </div>
            <div class="icon secondary">
              <slot name="secondary-icon"></slot>
            </div>
          </div>
          <div class="text-container">
            <div class="title-container">
              <slot name="title"></slot>
            </div>
            <div class="description-container">
              <slot name="description"></slot>
            </div>
            <div class="date-container">
              <slot name="day"></slot>
              <slot name="time"></slot>
            </div>
            ${this.size === ObcMessageMenuItemSize.MultiLine
              ? nothing
              : html`<div class="chevron">
                  ${this.open
                    ? html`<obi-chevron-up-google></obi-chevron-up-google>`
                    : html`<obi-chevron-down-google></obi-chevron-down-google>`}
                </div>`}
          </div>
        </div>
        <div class="action-container">
          <div class="action icon">
            <slot name="action-icon"></slot>
          </div>
        </div>
      </button>
      ${this.hasActionButton
        ? html`<div class="action-button-container">
            <obc-button .variant="normal" @click=${this.onActionClick}>
              <slot name="action-label"></slot>
            </obc-button>
          </div>`
        : nothing}
    `;
  }

  private onMessageClick() {
    this.dispatchEvent(new CustomEvent('message-click'));
    this.open = !this.open;
  }

  private onActionClick(e: Event) {
    this.dispatchEvent(new CustomEvent('action-click'));
  }

  get ActiveSize() {
    if (this.size === ObcMessageMenuItemSize.MultiLine || this.open) {
      return ObcMessageMenuItemSize.MultiLine;
    }
    return this.size;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-message-menu-item': ObcMessageMenuItem;
  }
}
