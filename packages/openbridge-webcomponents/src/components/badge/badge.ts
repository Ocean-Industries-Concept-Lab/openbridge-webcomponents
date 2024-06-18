import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './badge.css?inline';
import {classMap} from 'lit/directives/class-map.js';

export enum BadgeSize {
  regular = 'regular',
  large = 'large',
}

export enum BadgeType {
  alarm = 'alarm',
  warning = 'warning',
  caution = 'caution',
  running = 'running',
  notification = 'notification',
  enhance = 'enhance',
  regular = 'regular',
  flat = 'flat',
  empty = 'empty',
  automation = 'automation',
}

@customElement('obc-badge')
export class ObcBadge extends LitElement {
  @property({type: Number}) number = 0;
  @property({type: Boolean}) hideNumber = false;
  @property({type: String}) size: BadgeSize = BadgeSize.regular;
  @property({type: String}) type: BadgeType = BadgeType.regular;

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          ['size-' + this.size]: true,
          ['type-' + this.type]: true,
        })}
      >
        ${this.type !== BadgeType.empty
          ? html`
              <div class="icon"><slot></slot></div>
              ${!this.hideNumber
                ? html`<div class="number">${this.number}</div>`
                : ''}
            `
          : ''}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-badge': ObcBadge;
  }
}
