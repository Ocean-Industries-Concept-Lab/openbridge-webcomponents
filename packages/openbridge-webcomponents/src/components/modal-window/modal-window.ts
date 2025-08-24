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

@customElement('obc-modal-window')
export class ObcModalWindow extends LitElement {
  @property({type: String}) size = ObcModalWindowSize.Large;
  @property({type: Boolean}) hasOptionalAction = false;
  @property({type: Boolean}) hasLeadingIcon = false;

  private onCloseClick = () =>
    this.dispatchEvent(new CustomEvent('close-click'));

  private onCancelClick = () =>
    this.dispatchEvent(new CustomEvent('cancel-click'));

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
          <obc-icon-button variant="flat" @click=${this.onCloseClick}>
            <obi-close-google></obi-close-google>
          </obc-icon-button>
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
            <obc-button
              @click=${this.onCancelClick}
              .fullWidth=${isSmall || isMedium}
            >
              <slot name="cancel-label">Cancel</slot>
            </obc-button>
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
