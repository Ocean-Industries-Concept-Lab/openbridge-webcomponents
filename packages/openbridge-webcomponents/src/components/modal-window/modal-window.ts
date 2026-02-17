import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './modal-window.css?inline';

import '../button/button.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-close-google.js';

export enum ObcModalWindowSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

/**
 * Event fired when close action is clicked.
 */
export type ObcModalWindowCloseClickEvent = CustomEvent<void>;

/**
 * Event fired when cancel action is clicked.
 */
export type ObcModalWindowCancelClickEvent = CustomEvent<void>;

/**
 * Event fired when done action is clicked.
 */
export type ObcModalWindowDoneClickEvent = CustomEvent<void>;

/**
 * @fires close-click {ObcModalWindowCloseClickEvent} Fired when the close button is clicked.
 * @fires cancel-click {ObcModalWindowCancelClickEvent} Fired when the cancel button is clicked.
 * @fires done-click {ObcModalWindowDoneClickEvent} Fired when the done button is clicked.
 */
@customElement('obc-modal-window')
export class ObcModalWindow extends LitElement {
  @property({type: String}) size = ObcModalWindowSize.Large;
  @property({type: Boolean}) hasOptionalAction = false;
  @property({type: Boolean}) hasCancelAction = true;
  @property({type: Boolean}) hasCloseAction = true;
  @property({type: Boolean}) hasLeadingIcon = false;

  /**
   * Handles close-button-click and emits `close-click`.
   */
  private onCloseClick = () =>
    this.dispatchEvent(new CustomEvent('close-click'));

  /**
   * Handles cancel-button-click and emits `cancel-click`.
   */
  private onCancelClick = () =>
    this.dispatchEvent(new CustomEvent('cancel-click'));

  /**
   * Handles done-button-click and emits `done-click`.
   */
  private onDoneClick = () => this.dispatchEvent(new CustomEvent('done-click'));

  private onOptionClick = () =>
    this.dispatchEvent(new CustomEvent('option-click'));

  protected override render() {
    const isLarge = this.size === ObcModalWindowSize.Large;
    const isMedium = this.size === ObcModalWindowSize.Medium;
    const isSmall = this.size === ObcModalWindowSize.Small;

    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`size-${this.size}`]: true,
        })}
      >
        <div class="title-container">
          <div class="title-content">
            ${this.hasLeadingIcon
              ? html`<div class="leading-icon">
                  <slot name="leading-icon"></slot>
                </div>`
              : nothing}
            <div class="label-container">
              <slot name="title">Title</slot>
            </div>
          </div>
          ${this.hasCloseAction
            ? html`<obc-icon-button variant="flat" @click=${this.onCloseClick}>
                <obi-close-google></obi-close-google>
              </obc-icon-button>`
            : nothing}
          <div class="divider"></div>
        </div>

        <div class="content-area">
          <slot name="content"></slot>
        </div>

        <div class="action-container">
          <div class="divider"></div>
          ${this.hasOptionalAction
            ? html`<div class="optional-action-container">
                <obc-button @click=${this.onOptionClick} .fullWidth=${true}>
                  <slot name="option-label">Option</slot>
                </obc-button>
              </div>`
            : nothing}

          <div
            class=${classMap({
              'primary-action-container': true,
              'primary-action-horizontal': isLarge || isMedium,
              'primary-action-vertical': isSmall,
            })}
          >
            ${this.hasCancelAction
              ? html`<obc-button
                  @click=${this.onCancelClick}
                  .fullWidth=${isSmall || isMedium}
                >
                  <slot name="cancel-label">Cancel</slot>
                </obc-button>`
              : nothing}
            <obc-button
              variant="raised"
              @click=${this.onDoneClick}
              .fullWidth=${isSmall || isMedium}
            >
              <slot name="done-label">Done</slot>
            </obc-button>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-modal-window': ObcModalWindow;
  }
}
