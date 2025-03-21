import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import { alarmRectifiedA, alarmRectifiedB } from './icons/icon-alarm-rectified';
import { warningRectifiedA, warningRectifiedB } from './icons/icon-warning-rectified';
import { alarmSilencedA, alarmSilencedB } from './icons/icon-alarm-silenced';
import { warningSilencedA, warningSilencedB } from './icons/icon-warning-silenced';
import { alarmUnackA, alarmUnackB } from './icons/icon-alarm-unack';
import { warningUnackA, warningUnackB } from './icons/icon-warning-unack';

export enum AlertIconName {
  AlarmSilenced = 'alarm-silenced',
  AlarmUnack = 'alarm-unack',
  AlarmRectified = 'alarm-rectified',
  WarningUnack = 'warning-unack',
  WarningRectified = 'warning-rectified',
  WarningSilenced = 'warning-silenced',
}

const mapping = {
  [AlertIconName.AlarmSilenced]: {
    a: alarmSilencedA,
    b: alarmSilencedB,
  },
  [AlertIconName.AlarmUnack]: {
    a: alarmUnackA,
    b: alarmUnackB,
  },
  [AlertIconName.AlarmRectified]: {
    a: alarmRectifiedA,
    b: alarmRectifiedB,
  },
  [AlertIconName.WarningUnack]: {
    a: warningUnackA,
    b: warningUnackB,
  },
  [AlertIconName.WarningRectified]: {
    a: warningRectifiedA,
    b: warningRectifiedB,
  },
  [AlertIconName.WarningSilenced]: {
    a: warningSilencedA,
    b: warningSilencedB,
  },
};

/**
 * Icon used for alerts and notification with blinking effect
 *
 * @prop {AlertIconName} name - Name of the icon.
 */
@customElement('obc-alert-icon')
export class ObcAlertIcon extends LitElement {
  @property({type: String}) name: AlertIconName = AlertIconName.AlarmSilenced;

  override render() {
    const icons = mapping[this.name];
    const isWarning = this.name.startsWith('warning');
    return html`
      <div
        class=${classMap({
          wrapper: true,
          warning: isWarning,
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
      position: relative;
    }
    .wrapper svg {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    :not(.warning) {
      .a {
        opacity: var(--alarm-blink-on);
      }

      .b {
        opacity: var(--alarm-blink-off);
      }
    }

    .warning {
      .a {
        opacity: var(--warning-blink-on);
      }

      .b {
        opacity: var(--warning-blink-off);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-icon': ObcAlertIcon;
  }
}
