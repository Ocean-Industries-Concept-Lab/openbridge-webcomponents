import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './badge.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import '../../icons/icon-alarm-badge.js';
import '../../icons/icon-warning-badge.js';
import '../../icons/icon-caution-badge.js';
import '../../icons/icon-running-color-iec.js';

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
  empty = 'empty',
  automation = 'automation',
  outline = 'outline',
}

export enum BadgeVariant {
  default = 'default',
  flat = 'flat',
}

@customElement('obc-badge')
export class ObcBadge extends LitElement {
  @property({type: Number}) number = 0;
  @property({type: Boolean}) hideNumber = false;
  @property({type: String}) type: string = BadgeType.regular;
  @property({type: String}) size: string = BadgeSize.regular;
  @property({type: String}) variant: BadgeVariant = BadgeVariant.default;
  @property({type: Boolean}) showIcon = false;

  private get effectiveType(): string {
    if (!this.showIcon && this.hideNumber) {
      return BadgeType.empty;
    }
    return this.type;
  }

  private renderIcon() {
    const isFlat = this.variant === BadgeVariant.flat;
    switch (this.type) {
      case BadgeType.alarm:
        return html`
          <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none">
            <path
              d="M5.29694 1.72622L1.05702 9.32693C0.838739 9.71823 0.729598 9.91388 0.748108 10.0741C0.764257 10.2138 0.83853 10.3403 0.952704 10.4225C1.08357 10.5167 1.3076 10.5167 1.75567 10.5167H10.233C10.6809 10.5167 10.9049 10.5167 11.0357 10.4225C11.1499 10.3403 11.2242 10.2139 11.2404 10.0741C11.2589 9.914 11.1498 9.71837 10.9317 9.3271L6.69433 1.7264C6.46616 1.31712 6.35207 1.11247 6.20181 1.04447C6.07082 0.985194 5.92064 0.985175 5.78964 1.04442C5.63936 1.11238 5.52522 1.317 5.29694 1.72622Z"
              fill=${isFlat ? 'var(--alert-alarm-color)' : 'currentColor'}
            />
          </svg>
        `;
      case BadgeType.warning:
        return html`
          <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none">
            <circle
              cx="6"
              cy="6"
              r="4.5"
              fill=${isFlat ? 'var(--alert-warning-color)' : 'currentColor'}
              stroke=${isFlat
                ? 'var(--alert-warning-outline-color)'
                : 'currentColor'}
            />
          </svg>
        `;
      case BadgeType.caution:
        return html`
          <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.2998 2H9.7002C9.848 2 9.92907 2.00015 9.9873 2.00488C9.98955 2.00507 9.99213 2.0047 9.99414 2.00488C9.99436 2.0072 9.9949 2.01006 9.99512 2.0127C9.99985 2.07093 10 2.152 10 2.2998V9.7002C10 9.848 9.99985 9.92907 9.99512 9.9873C9.99493 9.98958 9.99433 9.9921 9.99414 9.99414C9.9921 9.99433 9.98958 9.99493 9.9873 9.99512C9.92907 9.99985 9.848 10 9.7002 10H2.2998C2.152 10 2.07093 9.99985 2.0127 9.99512C2.01006 9.9949 2.0072 9.99436 2.00488 9.99414C2.0047 9.99213 2.00507 9.98955 2.00488 9.9873C2.00015 9.92907 2 9.848 2 9.7002V2.2998L2.00488 2.0127C2.0051 2.01009 2.00467 2.00718 2.00488 2.00488C2.00718 2.00467 2.01009 2.0051 2.0127 2.00488L2.2998 2Z"
              fill=${isFlat ? 'var(--alert-caution-color)' : 'currentColor'}
              stroke=${isFlat
                ? 'var(--alert-caution-outline-color)'
                : 'currentColor'}
            />
          </svg>
        `;
      case BadgeType.running:
        return html`
          <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6ZM2.89624 6.10353L3.60335 5.39642L5.24979 7.04287L8.39624 3.89642L9.10335 4.60353L5.24979 8.45708L2.89624 6.10353Z"
              fill=${isFlat ? 'var(--alert-running-color)' : 'currentColor'}
            />
          </svg>
        `;
      default:
        return html`<slot class="badge-icon" name="badge-icon"></slot>`;
    }
  }

  override render() {
    const isFlat = this.variant === BadgeVariant.flat;
    return html`
      <div
        class=${classMap({
          wrapper: true,
          ['size-' + this.size]: true,
          ['type-' + this.effectiveType]: !isFlat,
          ['variant-flat']: isFlat,
          hideNumber: this.hideNumber,
        })}
      >
        ${this.effectiveType !== BadgeType.empty
          ? html`
              ${this.showIcon
                ? html`
                    <div
                      class=${classMap({
                        icon: true,
                        ['type-' + this.type]: isFlat,
                      })}
                    >
                      ${this.renderIcon()}
                    </div>
                  `
                : nothing}
              ${!this.hideNumber
                ? html`<div class="number">
                    <span class="number-text">${this.number}</span>
                  </div>`
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
