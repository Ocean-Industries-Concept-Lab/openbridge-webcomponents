import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './advice-button.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-notification-advice.js';
import '../../icons/icon-notification-advice-active.js';

export enum AdviceButtonStyle {
  Flat = 'flat',
  Normal = 'normal',
  Enhanced = 'enhanced',
}

export interface AdviceButtonClickEvent {
  count: number;
  isActive: boolean;
}

@customElement('obc-advice-button')
export class ObcAdviceButton extends LitElement {
  @property({type: String}) buttonStyle: AdviceButtonStyle =
    AdviceButtonStyle.Flat;

  @property({type: Number}) count = 0;

  @property({type: Boolean}) showCount = false;

  @property({type: Boolean}) isActive = false;

  @property({type: String}) override ariaLabel = 'Advice';

  override render() {
    const useNormal =
      this.isActive && this.buttonStyle === AdviceButtonStyle.Normal;
    const useEnhanced =
      this.isActive && this.buttonStyle === AdviceButtonStyle.Enhanced;
    const useFlat =
      this.buttonStyle === AdviceButtonStyle.Flat ||
      (!useNormal && !useEnhanced);

    const hasCounter = (useNormal || useEnhanced) && this.showCount;

    const wrapperClasses = {
      wrapper: true,
      'is-active': this.isActive,
      'has-counter': hasCounter,
      flat: useFlat,
      normal: useNormal,
      enhanced: useEnhanced,
    };

    const visibleWrapperClasses = {
      'visible-wrapper': true,
    };

    return html`
      <button
        class="${classMap(wrapperClasses)}"
        @click="${this.handleClick}"
        aria-label="${this.ariaLabel}${hasCounter ? `, ${this.count} new` : ''}"
        aria-pressed="${this.isActive}"
        role="button"
        type="button"
      >
        <div class="${classMap(visibleWrapperClasses)}">
          <div class="icon-container">
            <slot name="icon"> ${this.renderDefaultIcon()} </slot>
          </div>
          ${hasCounter
            ? html` <span class="count-label">${this.count}</span> `
            : nothing}
        </div>
      </button>
    `;
  }

  private renderDefaultIcon() {
    if (this.isActive) {
      return html`<obi-notification-advice-active></obi-notification-advice-active>`;
    }
    return html`<obi-notification-advice></obi-notification-advice>`;
  }

  private handleClick() {
    const event = new CustomEvent<AdviceButtonClickEvent>('obc-click', {
      detail: {
        count: this.count,
        isActive: !this.isActive,
      },
      composed: true,
      bubbles: true,
    });

    this.dispatchEvent(event);
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-advice-button': ObcAdviceButton;
  }
}
