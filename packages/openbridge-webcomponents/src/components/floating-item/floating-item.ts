import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './floating-item.css?inline';

import '../button/button.js'; // <obc-button>
import '../icon-button/icon-button.js';
import '../../icons/icon-close-google.js';
import {IconButtonVariant} from '../icon-button/icon-button.js';

export enum ObcFloatingItemType {
  Regular = 'regular',
  Application = 'application',
}
export enum ObcFloatingItemDirection {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export enum ObcFloatingItemLineType {
  singleLine = 'single-line',
  multiLine = 'multi-line',
}

/**
 * `<obc-floating-item>` – A transient toast, inline notification, or floating message component for brief, non-blocking feedback.
 *
 * Appears temporarily to display status updates, confirmations, or alerts, floating above the UI without interrupting the user's workflow. Supports both single-line and multi-line content, optional timestamp, and up to two action buttons.
 *
 * ## Features
 *
 * - **Message types:**  
 *   - `regular` (default): Standard notification with a single icon.  
 *   - `application`: Enhanced visual style with primary and secondary icons.
 * - **Layout directions:**  
 *   - `horizontal` (default): Icon and content side-by-side, actions to the right.  
 *   - `vertical`: Icon and content stacked, actions below.
 * - **Line length:**  
 *   - `single-line` (default): Truncates message and title to one line.  
 *   - `multi-line`: Allows longer content, up to 8 lines.
 * - **Timestamp and day chip:**  
 *   - Optionally display a time label and day chip for contextual messages.
 * - **Actions:**  
 *   - Up to two configurable action buttons (primary and secondary), plus a dismiss/close icon.
 * - **Custom events:**  
 *   - Emits events for action and dismiss interactions, so host apps can respond without querying the DOM.
 *
 * ## Usage Guidelines
 *
 * Use `<obc-floating-item>` for brief, transient feedback such as form submissions, status updates, or non-critical alerts. Ideal when you want to confirm an action or notify the user without disrupting their workflow.  
 * Avoid using for persistent or critical alerts—use a dialog or alert banner for those cases.  
 * Only one floating message should be visible at a time to avoid overwhelming the user.  
 * For best results, keep messages concise and actions minimal (Material Design recommends at most one action in a snackbar; use the second action sparingly, e.g., for "Undo").
 *
 * **Keywords:** toast, snackbar, notification, floating message, inline alert, transient feedback
 *
 * ## Slots
 *
 * | Name             | Rendered when…                       | Purpose                          |
 * | ---------------- | ------------------------------------ | -------------------------------- |
 * | `primary-icon`   | always                               | Main icon to represent the message’s category. Use e.g. `<obi-placeholder></obi-placeholder>`. |
 * | `secondary-icon` | `type="application"`                 | Additional icon for application-type messages. |
 * | `title`          | always                               | Title or heading of the message. |
 * | `description`    | always                               | Detailed message text.           |
 * | `time`           | `hasTimestamp`                       | Timestamp label (e.g., "12:45"). |
 * | `day`            | `hasTimestamp && hasDay`             | Day label (e.g., "Mon").         |
 * | `action`         | `action`                             | Label for the primary action button. |
 * | `action2`        | `action && action2`                  | Label for the secondary action button. |
 *
 * ## Events
 *
 * - `action-click` – Fired when the primary action button is clicked.
 * - `action2-click` – Fired when the secondary action button is clicked.
 * - `dismiss-click` – Fired when the close icon is clicked.
 *
 * ## Example
 *
 * ```html
 * <obc-floating-item type="regular" hasTimestamp action>
 *   <div slot="primary-icon"><obi-placeholder></obi-placeholder></div>
 *   <span slot="title">Network Connected</span>
 *   <span slot="description">You are now online.</span>
 *   <span slot="time">14:32</span>
 *   <span slot="action">View</span>
 * </obc-floating-item>
 * ```
 *
 * In this example, the message appears with an icon, title, description, timestamp, and a single action button.
 *
 * ---
 *
 * @slot primary-icon - Main icon to represent the message’s category.
 * @slot secondary-icon - Additional icon for application-type messages.
 * @slot title - Title or heading of the message.
 * @slot description - Detailed message text.
 * @slot time - Timestamp label (e.g., "12:45").
 * @slot day - Day label (e.g., "Mon").
 * @slot action - Label for the primary action button.
 * @slot action2 - Label for the secondary action button.
 * @fires action-click {CustomEvent<void>} Fired when the first action button is clicked.
 * @fires action2-click {CustomEvent<void>} Fired when the second action button is clicked.
 * @fires dismiss-click {CustomEvent<void>} Fired when the close icon is clicked.
 */
@customElement('obc-floating-item')
export class ObcFloatingItem extends LitElement {
  /**
   * Visual style of the message.
   * - `regular` (default): Standard notification with a single icon.
   * - `application`: Enhanced style with primary and secondary icons.
   *
   * Use `application` when you want to visually distinguish system-level or application-specific messages.
   */
  @property({type: String}) type = ObcFloatingItemType.Regular;

  /**
   * Layout direction of the component.
   * - `horizontal` (default): Icon/content/actions arranged side-by-side.
   * - `vertical`: Icon/content stacked, actions below.
   *
   * Choose `vertical` for narrow containers or when space is limited.
   */
  @property({type: String}) direction = ObcFloatingItemDirection.horizontal;

  /**
   * Shows a timestamp (slot `time`) when `true`.
   * Enable to display a time label next to the title.
   */
  @property({type: Boolean}) hasTimestamp = false;

  /**
   * Shows a day chip (slot `day`) next to the timestamp when `true`.
   * Only applied when `hasTimestamp` is also `true`.
   * Use to provide additional context for the timestamp.
   */
  @property({type: Boolean}) hasDay = false;

  /**
   * Renders a primary action button (slot `action`) when `true`.
   * Use for the main action the user can take in response to the message.
   */
  @property({type: Boolean}) action = false;

  /**
   * Enables a secondary action button (slot `action2`).
   * Only applied when `action` is also `true`.
   * Use sparingly for secondary actions (e.g., "Undo").
   */
  @property({type: Boolean}) action2 = false;

  /**
   * Line wrapping style for the message content.
   * - `single-line` (default): Truncates to one line.
   * - `multi-line`: Allows up to 8 lines of content.
   *
   * Use `multi-line` for longer messages or detailed descriptions.
   */
  @property({type: String}) lineType = ObcFloatingItemLineType.singleLine;

  /** Dispatches **action-click** when the first action button is clicked. */
  private onActionClick = () =>
    this.dispatchEvent(new CustomEvent('action-click'));

  /** Dispatches **action2-click** when the second action button is clicked. */
  private onAction2Click = () =>
    this.dispatchEvent(new CustomEvent('action2-click'));

  /** Dispatches **dismiss-click** when the close icon is clicked. */
  private onDismissClick = () =>
    this.dispatchEvent(new CustomEvent('dismiss-click'));

  protected override render() {
    const horiz = this.direction === ObcFloatingItemDirection.horizontal;
    const showBtn1 = this.action;
    const showBtn2 = this.action && this.action2;

    const iconsTemplate =
      this.type === ObcFloatingItemType.Application
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
          'single-line': this.lineType === ObcFloatingItemLineType.singleLine,
          'multi-line': this.lineType === ObcFloatingItemLineType.multiLine,
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
    'obc-floating-item': ObcFloatingItem;
  }
}
