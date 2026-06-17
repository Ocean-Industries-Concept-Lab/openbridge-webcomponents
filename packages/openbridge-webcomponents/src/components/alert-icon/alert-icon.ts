import {LitElement, html, css, TemplateResult, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {alarmRectifiedA} from './icons/icon-alarm-rectified.js';
import {warningRectifiedA} from './icons/icon-warning-rectified.js';
import {alarmSilencedA, alarmSilencedB} from './icons/icon-alarm-silenced.js';
import {
  warningSilencedA,
  warningSilencedB,
} from './icons/icon-warning-silenced.js';
import {alarmUnackA, alarmUnackB} from './icons/icon-alarm-unack.js';
import {warningUnackA, warningUnackB} from './icons/icon-warning-unack.js';
import '../../icons/icon-caution-color-iec.js';
import {customElement} from '../../decorator.js';
import {AlertType} from '../../types.js';
import {
  getAlertBadgeComponent,
  AlertBadgeComponent,
  getAlertBlinkMode,
  getBamAlertTypeForBlinking,
  supportsBlinking,
} from '../../alert-severity.js';
import '../../icons/icon-alarm-badge-outline.js';
import '../../icons/icon-warning-badge-outline.js';
import '../../icons/icon-caution-badge-outline.js';
import '../alert-frame/critical-badge.js';
import '../alert-frame/diagnostic-badge.js';
import {criticalA, criticalB} from './icons/icon-critical.js';

enum AlertIconName {
  AlarmSilenced = 'alarm-silenced',
  AlarmUnack = 'alarm-unack',
  AlarmRectified = 'alarm-rectified',
  WarningUnack = 'warning-unack',
  WarningRectified = 'warning-rectified',
  WarningSilenced = 'warning-silenced',
  Critical = 'critical',
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
    b: alarmRectifiedA,
  },
  [AlertIconName.WarningUnack]: {
    a: warningUnackA,
    b: warningUnackB,
  },
  [AlertIconName.WarningRectified]: {
    a: warningRectifiedA,
    b: warningRectifiedA,
  },
  [AlertIconName.WarningSilenced]: {
    a: warningSilencedA,
    b: warningSilencedB,
  },
  [AlertIconName.Critical]: {
    a: criticalA,
    b: criticalB,
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
  /** @availableWhen outline==false && type in [Alarm, Warning, LevelHigh, LevelMedium] */
  @property({type: Boolean}) acknowledged!: boolean;
  /** @availableWhen outline==false && type in [Alarm, Warning, LevelHigh, LevelMedium] */
  @property({type: Boolean}) active!: boolean;
  @property({type: Boolean}) outline!: boolean;

  private get bamType(): AlertType {
    return getBamAlertTypeForBlinking(this.type);
  }

  get icon() {
    if (this.type === AlertType.LevelCritical) {
      return mapping[AlertIconName.Critical];
    } else if (this.bamType === AlertType.Alarm) {
      if (this.active === false) {
        return mapping[AlertIconName.AlarmRectified];
      } else if (this.acknowledged) {
        return mapping[AlertIconName.AlarmSilenced];
      } else {
        return mapping[AlertIconName.AlarmUnack];
      }
    } else if (this.bamType === AlertType.Warning) {
      if (this.active === false) {
        return mapping[AlertIconName.WarningRectified];
      } else if (this.acknowledged) {
        return mapping[AlertIconName.WarningSilenced];
      } else {
        return mapping[AlertIconName.WarningUnack];
      }
    }

    return null;
  }

  private renderOutlineIcon(): TemplateResult {
    switch (getAlertBadgeComponent(this.type)) {
      case AlertBadgeComponent.Critical:
        return html`<obi-critical-badge></obi-critical-badge>`;
      case AlertBadgeComponent.Warning:
        return html`<obi-warning-badge-outline></obi-warning-badge-outline>`;
      case AlertBadgeComponent.Caution:
        return html`<obi-caution-badge-outline></obi-caution-badge-outline>`;
      case AlertBadgeComponent.Diagnostic:
        return html`<obi-diagnostic-badge
          style="color: var(--alert-diagnostic-color);"
        ></obi-diagnostic-badge>`;
      default:
        return html`<obi-alarm-badge-outline></obi-alarm-badge-outline>`;
    }
  }

  private renderStaticIcon(): TemplateResult | typeof nothing {
    if (this.type === AlertType.Caution || this.type === AlertType.LevelLow) {
      return html`<obi-caution-color-iec usecsscolor></obi-caution-color-iec>`;
    }
    if (this.type === AlertType.LevelDiagnostic) {
      return html`<obi-diagnostic-badge
        style="color: var(--alert-diagnostic-color);"
      ></obi-diagnostic-badge>`;
    }
    return nothing;
  }

  override render() {
    if (!this.type) {
      return html`<div>No alarm</div>`;
    }
    if (this.outline) {
      return html`<div class="wrapper">${this.renderOutlineIcon()}</div>`;
    }
    if (supportsBlinking(this.type) && !(this.type === AlertType.LevelLow)) {
      const icons = this.icon;
      if (!icons) {
        throw new Error('No icon found');
      }
      const blinkMode = getAlertBlinkMode(this.type);
      return html`
        <div
          class=${classMap({
            wrapper: true,
            [`blink-${blinkMode}`]: true,
          })}
        >
          <span class="a">${icons.a}</span>
          <span class="b">${icons.b}</span>
        </div>
      `;
    }
    return html`<div class="wrapper">${this.renderStaticIcon()}</div>`;
  }

  static override styles = css`
    .wrapper {
      height: 100%;
      width: 100%;
      position: relative;

      obi-diagnostic-badge,
      obi-critical-badge {
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }

      svg {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      &.blink-alarm .a {
        opacity: var(--alarm-blink-on);
      }

      &.blink-alarm .b {
        opacity: var(--alarm-blink-off);
      }

      &.blink-critical .a {
        opacity: var(--critical-blink-on);
      }

      &.blink-critical .b {
        opacity: var(--critical-blink-off);
      }

      &.blink-warning .a {
        opacity: var(--warning-blink-on);
      }

      &.blink-warning .b {
        opacity: var(--warning-blink-off);
      }

      &.blink-low .a {
        opacity: var(--low-blink-on);
      }

      &.blink-low .b {
        opacity: var(--low-blink-off);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-icon': ObcAlertIcon;
  }
}
