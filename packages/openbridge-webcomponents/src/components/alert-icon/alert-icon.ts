import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { svg14AlarmSilencedA } from './icons/icon-14-alarm-silenced-a';
import { svg14AlarmSilencedB } from './icons/icon-14-alarm-silenced-b';
import { svg14AlarmUnackA } from './icons/icon-14-alarm-unack-a';
import { svg14AlarmUnackB } from './icons/icon-14-alarm-unack-b';
import { svg14WarningUnackA } from './icons/icon-14-warning-unack-a';
import { svg14WarningUnackB } from './icons/icon-14-warning-unack-b';

export enum AlertIconName {
  AlarmSilenced = 'alarm-silenced',
  AlarmUnack = 'alarm-unack',
  WarningUnack = 'warning-unack',
}

const mapping = {
  [AlertIconName.AlarmSilenced]: { a: svg14AlarmSilencedA, b: svg14AlarmSilencedB },
  [AlertIconName.AlarmUnack]: { a: svg14AlarmUnackA, b: svg14AlarmUnackB },
  [AlertIconName.WarningUnack]: { a: svg14WarningUnackA, b: svg14WarningUnackB },
};

export const AlertIconNames = Object.keys(mapping) as AlertIconName[];

/**
 * Icon used for alerts and notification with blinking effect
 *
 * @prop {boolean} blinkValue - This value should alternate between true and false to make the icon blink.
 * @prop {AlertIconName} name - Name of the icon.
 */
@customElement('obc-alert-icon')
export class ObcAlertIcon extends LitElement {
  @property({ type: Boolean }) blinkValue = false;
  @property({ type: String }) name: AlertIconName = AlertIconName.AlarmUnack;

  override render() {
    const icons = mapping[this.name];
    return html`
      <div
        class=${classMap({
      wrapper: true,
      'show-a': this.blinkValue,
      'show-b': !this.blinkValue,
    })}
      >
        <span class="a">${icons.a}</span>
        <span class="b">${icons.b}</span>
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: 100%;
      width: 100%;
    }
    .wrapper * {
      height: 100%;
      width: 100%;
    }
    .a,
    .b {
      display: none;
    }

    .show-a .a {
      display: revert;
    }

    .show-b .b {
      display: revert;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-icon': ObcAlertIcon;
  }
}
