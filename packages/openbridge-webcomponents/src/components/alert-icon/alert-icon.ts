import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {svg14AlarmSilencedA} from './icons/icon-14-alarm-silenced-a';
import {svg14AlarmSilencedB} from './icons/icon-14-alarm-silenced-b';
import {svg14AlarmUnackA} from './icons/icon-14-alarm-unack-a';
import {svg14AlarmUnackB} from './icons/icon-14-alarm-unack-b';
import {svg14WarningUnackA} from './icons/icon-14-warning-unack-a';
import {svg14WarningUnackB} from './icons/icon-14-warning-unack-b';

const mapping = {
  'alarm-silenced': {a: svg14AlarmSilencedA, b: svg14AlarmSilencedB},
  'alarm-unack': {a: svg14AlarmUnackA, b: svg14AlarmUnackB},
  'warning-unack': {a: svg14WarningUnackA, b: svg14WarningUnackB},
};

export const AlertIconNames = Object.keys(mapping) as AlertIconName[];
export type AlertIconName = keyof typeof mapping;

/**
 * Icon used for alerts and notification with blinking effect
 *
 * @prop {AlertIconName} name - Name of the icon.
 */
@customElement('obc-alert-icon')
export class ObcAlertIcon extends LitElement {
  @property({type: String}) name: AlertIconName = 'alarm-unack';

  override render() {
    const icons = mapping[this.name];
    const isWarning = this.name === 'warning-unack';
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
