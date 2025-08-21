import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './advice-floating-item.css?inline';

import '../floating-item/floating-item.js';
import '../../icons/icon-notification-advice-active.js';
import {
  ObcFloatingItemType,
  ObcFloatingItemDirection,
  ObcFloatingItemLineType,
} from '../floating-item/floating-item.js';

@customElement('obc-advice-floating-item')
export class ObcAdviceFloatingItem extends LitElement {
  @property({type: String}) type = ObcFloatingItemType.Regular;
  @property({type: String}) direction = ObcFloatingItemDirection.horizontal;
  @property({type: Boolean}) hasTimestamp = false;
  @property({type: Boolean}) hasDay = false;
  @property({type: Boolean}) action = false;
  @property({type: Boolean}) action2 = false;
  @property({type: String}) lineType = ObcFloatingItemLineType.singleLine;

  protected override render() {
    const isApplication = this.type === ObcFloatingItemType.Application;

    return html`
      <obc-floating-item
        .type=${this.type}
        .direction=${this.direction}
        .hasTimestamp=${this.hasTimestamp}
        .hasDay=${this.hasDay}
        .action=${this.action}
        .action2=${this.action2}
        .lineType=${this.lineType}
        @action-click=${(e: CustomEvent) =>
          this.dispatchEvent(
            new CustomEvent('action-click', {detail: e.detail})
          )}
        @action2-click=${(e: CustomEvent) =>
          this.dispatchEvent(
            new CustomEvent('action2-click', {detail: e.detail})
          )}
        @dismiss-click=${(e: CustomEvent) =>
          this.dispatchEvent(
            new CustomEvent('dismiss-click', {detail: e.detail})
          )}
      >
        ${isApplication
          ? html`
              <slot name="primary-icon" slot="primary-icon"></slot>
              <obi-notification-advice-active
                slot="secondary-icon"
                style="color: var(--instrument-starboard-primary-color)"
              ></obi-notification-advice-active>
            `
          : html`
              <obi-notification-advice-active
                slot="primary-icon"
                style="color: var(--instrument-starboard-primary-color)"
              ></obi-notification-advice-active>
            `}
        <slot name="title" slot="title"></slot>
        <slot name="description" slot="description"></slot>
        <slot name="time" slot="time"></slot>
        <slot name="day" slot="day"></slot>
        <slot name="action" slot="action"></slot>
        <slot name="action2" slot="action2"></slot>
      </obc-floating-item>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-advice-floating-item': ObcAdviceFloatingItem;
  }
}
