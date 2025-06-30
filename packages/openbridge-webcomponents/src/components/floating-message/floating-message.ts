import { LitElement, html, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from '../../decorator.js';
import compentStyle from './floating-message.css?inline';

import '../button/button';           // <obc-button>
import '../icon-button/icon-button';
import "../../icons/icon-close-google.js";
import { IconButtonVariant } from '../icon-button/icon-button';

export enum ObcFloatingMessageType {
  Regular     = 'regular',
  Application = 'application',
}
export enum ObcFloatingMessageDirection {
  horizontal = 'horizontal',
  vertical   = 'vertical',
}

export enum ObcFloatinMessageLineType {
  singleLine = 'single-line',
  multiLine  = 'multi-line',
}

@customElement('obc-floating-message')
export class ObcFloatingMessage extends LitElement {
  @property({ type: String  }) type       = ObcFloatingMessageType.Regular;
  @property({ type: String  }) direction  = ObcFloatingMessageDirection.horizontal;
  @property({ type: Boolean }) hasTimestamp = false;
  @property({ type: Boolean }) hasDay       = false;
  @property({ type: Boolean }) action  = false;
  @property({ type: Boolean }) action2 = false;
  @property({ type: String  }) lineType = ObcFloatinMessageLineType.singleLine;

  /* ───────── events ───────── */
  private onActionClick  = () => this.dispatchEvent(new CustomEvent('action-click'));
  private onAction2Click = () => this.dispatchEvent(new CustomEvent('action2-click'));
  private onDismissClick = () => this.dispatchEvent(new CustomEvent('dismiss-click'));

  /* ───────── render ───────── */
  protected override render() {
    const horiz     = this.direction === ObcFloatingMessageDirection.horizontal;
    const showBtn1  = this.action;
    const showBtn2  = this.action && this.action2;

    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`type-${this.type}`] : true,
          horizontal: horiz,
          vertical  : !horiz,
          'has-action' : showBtn1,
          'has-action2': showBtn2,
          'single-line': this.lineType === ObcFloatinMessageLineType.singleLine,
          'multi-line' : this.lineType === ObcFloatinMessageLineType.multiLine,
        })}
      >
        <!-- content block -->
        <div class="content-container">
          <div class="notification-container">
            <!-- icons -->
            <div class="icon-container">
              <div class="icon primary">
                <slot name="primary-icon"></slot>
              </div>
              ${this.type === ObcFloatingMessageType.Application
                ? html`
                    <div class="icon secondary">
                      <slot name="secondary-icon"></slot>
                    </div>`
                : nothing}
            </div>

            <!-- text -->
            <div class="message-container">
              <div class="title-container">
                <div class="title"><slot name="title"></slot></div>
                ${this.hasTimestamp
                  ? html`
                      <div class="timestamp">
                        ${this.hasDay
                          ? html`<slot name="day"></slot>`
                          : nothing}
                        <slot name="time"></slot>
                      </div>`
                  : nothing}
              </div>
              <div class="notification">
                <slot name="description"></slot>
              </div>
            </div>

            <!-- ✕ for *vertical* layout -->
            ${!horiz
              ? html`
                  <obc-icon-button
                    class="dismiss-btn"
                    @click=${this.onDismissClick}
                  >
                    ✕
                  </obc-icon-button>`
              : nothing}
          </div>
        </div>

        <!-- action zone (horizontal always – vertical only for text buttons) -->
        ${horiz || showBtn1 || showBtn2
          ? html`
              <div class="action-container">
                <div class="action-buttons">
                ${showBtn1
                  ? html`
                      <obc-button @click=${this.onActionClick}>
                        <slot name="action"></slot>
                      </obc-button>`
                  : nothing}

                ${showBtn2
                  ? html`
                      <obc-button @click=${this.onAction2Click}>
                        <slot name="action2"></slot>
                      </obc-button>`
                  : nothing}
                </div>
                <!-- ✕ for *horizontal* layout -->
                ${horiz
                  ? html`
                      <obc-icon-button
                        .variant=${IconButtonVariant.flat}
                        @click=${this.onDismissClick}
                      >
                        <obi-close-google></obi-close-google>
                      </obc-icon-button>`
                  : nothing}
              </div>`
          : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-floating-message': ObcFloatingMessage;
  }
}
