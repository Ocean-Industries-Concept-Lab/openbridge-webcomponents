import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  alarmRectifiedA,
  alarmRectifiedB,
} from './icons/icon-alarm-rectified.js';
import {
  warningRectifiedA,
  warningRectifiedB,
} from './icons/icon-warning-rectified.js';
import {alarmSilencedA, alarmSilencedB} from './icons/icon-alarm-silenced.js';
import {
  warningSilencedA,
  warningSilencedB,
} from './icons/icon-warning-silenced.js';
import {alarmUnackA, alarmUnackB} from './icons/icon-alarm-unack.js';
import {warningUnackA, warningUnackB} from './icons/icon-warning-unack.js';
import '../../icons/icon-caution-color-iec.js';
import {customElement} from '../../decorator.js';
import {Alarm, AlarmStatus, AlertType} from '../../types.js';

enum AlertIconName {
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
 * `obc-alert-icon` – Animated alert icon for signaling alarm and warning states.
 *
 * Displays a specialized icon with a blinking effect to visually indicate alert or warning conditions. The icon type is determined by the `name` property, supporting both alarm and warning variants in different states (such as silenced, unacknowledged, or rectified).
 *
 * Appears in notification areas, alert banners, or status panels to draw attention to active or historical alert conditions. The blinking animation helps highlight urgency or status changes without requiring user interaction.
 *
 * ## Features
 * - **Multiple Icon Types:** Supports all alarm and warning types.
 * - **Blinking Animation:** Uses two SVG layers with alternating opacity to create a blinking effect, visually emphasizing the alert or warning state.
 * - **Adaptive Styling:** Applies different CSS variables for alarm and warning types to allow for distinct visual cues (e.g., color, blink timing).
 * - **Scalable:** Designed to fit any container size; scales with its parent element.
 *
 * ## Usage Guidelines
 * Use `obc-alert-icon` to visually represent the status of alarms or warnings in notification panels, alert lists, or system status areas. The blinking effect is intended to draw user attention to active or recent alert conditions. Select the appropriate `name` value to match the alert state you wish to indicate.
 *
 * **TODO(designer):** Provide guidance on when to use each icon variant (e.g., when to use "rectified" vs. "silenced"), and any best practices for icon placement or blink timing.
 *
 * ## Properties
 * - `type` (AlertType): The type of alarm to display.
 * - `status` (AlarmStatus): The status of the alarm to display.
 *
 * ## Best Practices
 * - Only use the blinking alert icon for states that require immediate or prominent user attention.
 * - Ensure the icon is sized appropriately for its context (e.g., 32x32px or 64x64px for status panels).
 * - Avoid using multiple blinking icons in close proximity to prevent visual overload.
 *
 * ## Example
 * ```html
 * <obc-alert-icon .alarmType=${alarm.type} .alarmStatus=${alarm.status}></obc-alert-icon>
 * ```
 *
 */
@customElement('obc-alert-icon')
export class ObcAlertIcon extends LitElement {
  @property({type: String}) type!: AlertType;
  @property({type: String}) status!: AlarmStatus;

  get icon() {
    if (this.type === AlertType.Alarm) {
      if (this.status === AlarmStatus.Rectified) {
        return mapping[AlertIconName.AlarmRectified];
      } else if (this.status === AlarmStatus.Unacknowledged) {
        return mapping[AlertIconName.AlarmUnack];
      } else {
        return mapping[AlertIconName.AlarmSilenced];
      }
    } else {
      if (this.status === AlarmStatus.Rectified) {
        return mapping[AlertIconName.WarningRectified];
      } else if (this.status === AlarmStatus.Unacknowledged) {
        return mapping[AlertIconName.WarningUnack];
      } else {
        return mapping[AlertIconName.WarningSilenced];
      }
    }
  }

  override render() {
    if (!this.type || !this.status) {
      return html`<div>No alarm</div>`;
    }
    if ([AlertType.Alarm, AlertType.Warning].includes(this.type)) {
      const icons = this.icon;
      const isWarning = this.type === AlertType.Warning;
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
    if (this.type === AlertType.Caution) {
      return html`<div class="wrapper">
        <obi-caution-color-iec usecsscolor></obi-caution-color-iec>
      </div>`;
    }
    return html`<div>No alarm</div>`;
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
