import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './floating-message.css?inline';

import '../button/button.js'; // <obc-button>
import '../icon-button/icon-button.js';
import '../../icons/icon-close-google.js';
import {IconButtonVariant} from '../icon-button/icon-button.js';

export enum ObcFloatingMessageType {
  Regular = 'regular',
  Application = 'application',
}
export enum ObcFloatingMessageDirection {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export enum ObcFloatingMessageLineType {
  singleLine = 'single-line',
  multiLine = 'multi-line',
}

/**
 * obc-floating-message – transient toast / inline-notification component.
 *
 * ## Features
 *
 * - **Message types:** `regular` (default) or `application`.
 * - **Layout directions:** `horizontal` (default) or `vertical`
 * - **Line length:** `single-line` or `multi-line`
 * - Optional timestamp and day chip
 * - Up to two configurable action buttons, plus a dismiss icon
 * - Emits custom events so host apps never need to query the DOM
 *
 * ## Slots
 *
 * | Name             | Rendered when…                       | Purpose                          |
 * | ---------------- | ------------------------------------ | -------------------------------- |
 * | `primary-icon`   | always                               | Main icon                        |
 * | `secondary-icon` | `type="application"`                 | Secondary icon                   |
 * | `title`          | always                               | Message heading                  |
 * | `description`    | always                               | Detailed message text            |
 * | `time`           | `hasTimestamp`                       | Timestamp (HH:mm)                |
 * | `day`            | `hasTimestamp && hasDay`             | Day label                        |
 * | `action`         | `action`                             | First action-button label        |
 * | `action2`        | `action && action2`                  | Second action-button label       |
 *
 * ## Events
 *
 * - `action-click` — fired when the first action button is clicked
 * - `action2-click` — fired when the second action button is clicked
 * - `dismiss-click` — fired when the close icon is clicked
 *
 * @fires action-click  {CustomEvent<void>} Fired when the first action button is clicked.
 * @fires action2-click {CustomEvent<void>} Fired when the second action button is clicked.
 * @fires dismiss-click {CustomEvent<void>} Fired when the close icon is clicked.
 */
@customElement('obc-floating-message')
export class ObcFloatingMessage extends LitElement {
  /** Visual style of the message (`regular` | `application`). */
  @property({type: String}) type = ObcFloatingMessageType.Regular;

  /** Layout direction (`horizontal` | `vertical`). */
  @property({type: String}) direction = ObcFloatingMessageDirection.horizontal;

  /** Shows a timestamp (slot `time`) when `true`. */
  @property({type: Boolean}) hasTimestamp = false;

  /** Shows a day chip (slot `day`) next to the timestamp when `true`.
   * Only applied when `hasTimestamp` is also `true`. */
  @property({type: Boolean}) hasDay = false;

  /** Renders a primary action button (slot `action`) when `true`. */
  @property({type: Boolean}) action = false;

  /** Enables a secondary action button (slot `action2`).
   * Only applied when `action` is also `true`. */
  @property({type: Boolean}) action2 = false;

  /** Line wrapping style (`single-line` | `multi-line`). */
  @property({type: String}) lineType = ObcFloatingMessageLineType.singleLine;

  /** Dispatches **action-click**. */
  private onActionClick = () =>
    this.dispatchEvent(new CustomEvent('action-click'));

  /** Dispatches **action2-click**. */
  private onAction2Click = () =>
    this.dispatchEvent(new CustomEvent('action2-click'));

  /** Dispatches **dismiss-click**. */
  private onDismissClick = () =>
    this.dispatchEvent(new CustomEvent('dismiss-click'));

  protected override render() {
    const horiz = this.direction === ObcFloatingMessageDirection.horizontal;
    const showBtn1 = this.action;
    const showBtn2 = this.action && this.action2;

    const iconsTemplate =
      this.type === ObcFloatingMessageType.Application
        ? html` <div class="icon-container">
            <div class="icon primary">
              <div class="round-icon-box">
                <slot name="primary-icon"></slot>
              </div>
            </div>
            <div class="icon secondary">
              <slot name="secondary-icon"></slot>
            </div>
          </div>`
        : html` <div class="icon-container">
            <div class="icon primary">
              <slot name="primary-icon"></slot>
            </div>
          </div>`;

    // horizontal close → inside message container
    const closeInMessage = horiz
      ? html`<obc-icon-button
          .variant=${IconButtonVariant.flat}
          @click=${this.onDismissClick}
        >
          <obi-close-google></obi-close-google>
        </obc-icon-button>`
      : nothing;

    // vertical close → in the action container
    const dismissInAction = !horiz
      ? html`<obc-icon-button
          .variant=${IconButtonVariant.flat}
          @click=${this.onDismissClick}
        >
          <obi-close-google></obi-close-google>
        </obc-icon-button>`
      : nothing;

    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`type-${this.type}`]: true,
          horizontal: horiz,
          vertical: !horiz,
          'has-action': showBtn1,
          'has-action2': showBtn2,
          'single-line':
            this.lineType === ObcFloatingMessageLineType.singleLine,
          'multi-line': this.lineType === ObcFloatingMessageLineType.multiLine,
        })}
      >
        <div class="content-container">
          ${/* only render icons *outside* when horiz */ ''}
          ${horiz ? iconsTemplate : nothing}

          <div class="notification-container">
            ${horiz
              ? html`
                  <div class="horizontal-message-container">
                    <div class="message-container">
                      <div class="title-container">
                        <div class="title"><slot name="title"></slot></div>
                        ${this.hasTimestamp
                          ? html`<div class="timestamp">
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
                    ${closeInMessage}
                  </div>
                `
              : html`
                  ${/* non-horiz still gets icons INSIDE */ ''} ${iconsTemplate}
                  <div class="message-container">
                    <div class="title-container">
                      <div class="title"><slot name="title"></slot></div>
                      ${this.hasTimestamp
                        ? html`<div class="timestamp">
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
                `}
            ${horiz && (showBtn1 || showBtn2)
              ? html`
                  <div class="action-container">
                    ${showBtn1
                      ? html`<obc-button
                          @click=${this.onActionClick}
                          .fullWidth=${true}
                        >
                          <slot name="action"></slot>
                        </obc-button>`
                      : nothing}
                    ${showBtn2
                      ? html`<obc-button
                          @click=${this.onAction2Click}
                          .fullWidth=${true}
                        >
                          <slot name="action2"></slot>
                        </obc-button>`
                      : nothing}
                  </div>
                `
              : nothing}
          </div>

          ${/* vertical actions / dismiss */ ''}
          ${!horiz && (showBtn1 || showBtn2 || dismissInAction)
            ? html`
                <div class="vertical-outer-action-container">
                  <div class="action-container">
                    ${showBtn1
                      ? html`<obc-button
                          @click=${this.onActionClick}
                          .fullWidth=${true}
                        >
                          <slot name="action"></slot>
                        </obc-button>`
                      : nothing}
                    ${showBtn2
                      ? html`<obc-button
                          @click=${this.onAction2Click}
                          .fullWidth=${true}
                        >
                          <slot name="action2"></slot>
                        </obc-button>`
                      : nothing}
                  </div>
                  ${dismissInAction}
                </div>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-floating-message': ObcFloatingMessage;
  }
}
