import {LitElement, html, css, TemplateResult, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-caution-color-iec.js';
import {customElement} from '../../decorator.js';
import {AlertType} from '../../types.js';
import {
  getAlertBlinkMode,
  getBamAlertTypeForBlinking,
  supportsBlinking,
} from '../../alert-severity.js';
import '../../icons/icon-alarm-badge-outline.js';
import '../../icons/icon-warning-badge-outline.js';
import '../../icons/icon-caution-badge-outline.js';
import '../../icons/icon-alarm-acknowledged-iec.js';
import '../../icons/icon-warning-acknowledged-iec.js';
import '../../icons/icon-alarm-rectified-iec.js';
import '../../icons/icon-warning-rectified-iec.js';
import '../../icons/icon-alarm-rectified-outlined.js';
import '../../icons/icon-warning-rectified-outlined.js';
import '../../icons/icon-alarm-silenced-iec.js';
import '../../icons/icon-alarm-silenced-outlined.js';
import '../../icons/icon-warning-silenced-iec.js';
import '../../icons/icon-warning-silenced-outlined.js';
import '../../icons/icon-alarm-unacknowledged-iec.js';
import '../../icons/icon-alarm-acknowledged-outlined.js';
import '../../icons/icon-warning-unacknowledged-iec.js';
import '../../icons/icon-warning-unacknowledged-outlined.js';

import '../alert-frame/critical-badge.js';
import '../alert-frame/diagnostic-badge.js';
import {criticalA, criticalB} from './icons/icon-critical.js';
import {
  criticalUnacknowledgedA,
  criticalUnacknowledgedB,
} from './icons/icon-critical-unacknowledged.js';
import {
  criticalSilencedA,
  criticalSilencedB,
} from './icons/icon-critical-silenced.js';
import {
  criticalRectifiedA,
  criticalRectifiedB,
} from './icons/icon-critical-rectified.js';
import {criticalAcknowledged} from './icons/icon-critical-acknowledged.js';
import {
  lowUnacknowledgedA,
  lowUnacknowledgedB,
} from './icons/icon-low-unacknowledged.js';
import {lowSilencedA, lowSilencedB} from './icons/icon-low-silenced.js';
import {lowRectifiedA, lowRectifiedB} from './icons/icon-low-rectified.js';
import {lowAcknowledged} from './icons/icon-low-acknowledged.js';

enum AlertIconState {
  Silenced = 'silenced',
  Unacknowledged = 'unacknowledged',
  Acknowledged = 'acknowledged',
  Rectified = 'rectified',
}

enum AlertIconName {
  AlarmSilenced = 'alarm-silenced',
  AlarmUnack = 'alarm-unack',
  AlarmRectified = 'alarm-rectified',
  WarningUnack = 'warning-unack',
  WarningRectified = 'warning-rectified',
  WarningSilenced = 'warning-silenced',
  Critical = 'critical',
  CriticalUnack = 'critical-unack',
  CriticalSilenced = 'critical-silenced',
  CriticalRectified = 'critical-rectified',
  LowUnack = 'low-unack',
  LowSilenced = 'low-silenced',
  LowRectified = 'low-rectified',
}

const mapping = {
  [AlertIconName.AlarmSilenced]: {
    a: html`<obi-alarm-silenced-iec usecsscolor></obi-alarm-silenced-iec>`,
    b: html`<obi-alarm-silenced-outlined
      usecsscolor
    ></obi-alarm-silenced-outlined>`,
  },
  [AlertIconName.AlarmUnack]: {
    a: html`<obi-alarm-unacknowledged-iec
      usecsscolor
    ></obi-alarm-unacknowledged-iec>`,
    b: html`<obi-alarm-acknowledged-outlined
      usecsscolor
    ></obi-alarm-acknowledged-outlined>`,
  },
  [AlertIconName.AlarmRectified]: {
    a: html`<obi-alarm-rectified-iec usecsscolor></obi-alarm-rectified-iec>`,
    b: html`<obi-alarm-rectified-outlined
      usecsscolor
    ></obi-alarm-rectified-outlined>`,
  },
  [AlertIconName.WarningUnack]: {
    a: html`<obi-warning-unacknowledged-iec
      usecsscolor
    ></obi-warning-unacknowledged-iec>`,
    b: html`<obi-warning-unacknowledged-outlined
      usecsscolor
    ></obi-warning-unacknowledged-outlined>`,
  },
  [AlertIconName.WarningRectified]: {
    a: html`<obi-warning-rectified-iec
      usecsscolor
    ></obi-warning-rectified-iec>`,
    b: html`<obi-warning-rectified-outlined
      usecsscolor
    ></obi-warning-rectified-outlined>`,
  },
  [AlertIconName.WarningSilenced]: {
    a: html`<obi-warning-silenced-iec usecsscolor></obi-warning-silenced-iec>`,
    b: html`<obi-warning-silenced-outlined
      usecsscolor
    ></obi-warning-silenced-outlined>`,
  },
  [AlertIconName.Critical]: {
    a: criticalA,
    b: criticalB,
  },
  [AlertIconName.CriticalUnack]: {
    a: criticalUnacknowledgedA,
    b: criticalUnacknowledgedB,
  },
  [AlertIconName.CriticalSilenced]: {
    a: criticalSilencedA,
    b: criticalSilencedB,
  },
  [AlertIconName.CriticalRectified]: {
    a: criticalRectifiedA,
    b: criticalRectifiedB,
  },
  [AlertIconName.LowUnack]: {
    a: lowUnacknowledgedA,
    b: lowUnacknowledgedB,
  },
  [AlertIconName.LowSilenced]: {
    a: lowSilencedA,
    b: lowSilencedB,
  },
  [AlertIconName.LowRectified]: {
    a: lowRectifiedA,
    b: lowRectifiedB,
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
 * @stable
 */
@customElement('obc-alert-icon')
export class ObcAlertIcon extends LitElement {
  @property({type: String}) alertType: AlertType = AlertType.Alarm;
  /* @deprecated use `alertType` instead */
  @property({type: String}) type?: AlertType;
  /**
   * @availableWhen type in [Alarm, Warning, LevelHigh, LevelMedium, LevelLow]
   */
  @property({type: Boolean}) acknowledged?: boolean;
  /**
   * @availableWhen type in [Alarm, Warning, LevelHigh, LevelMedium, LevelLow]
   */
  @property({type: Boolean}) active?: boolean;
  @property({type: Boolean}) silenced?: boolean;

  private get _effectiveType(): AlertType {
    if (this.type) {
      return this.type;
    }
    return this.alertType;
  }

  private get bamType(): AlertType {
    return getBamAlertTypeForBlinking(this._effectiveType);
  }

  private get _effectiveState(): AlertIconState {
    if (this.active === false) {
      return AlertIconState.Rectified;
    } else if (this.acknowledged) {
      return AlertIconState.Acknowledged;
    } else if (this.silenced) {
      return AlertIconState.Silenced;
    } else if (this.active === true) {
      return AlertIconState.Unacknowledged;
    }
    return AlertIconState.Unacknowledged;
  }

  get icon() {
    if (this._effectiveType === AlertType.LevelCritical) {
      switch (this._effectiveState) {
        case AlertIconState.Rectified:
          return mapping[AlertIconName.CriticalRectified];
        case AlertIconState.Silenced:
          return mapping[AlertIconName.CriticalSilenced];
        case AlertIconState.Unacknowledged:
          return mapping[AlertIconName.CriticalUnack];
        default:
          return mapping[AlertIconName.Critical];
      }
    } else if (this._effectiveType === AlertType.LevelLow) {
      switch (this._effectiveState) {
        case AlertIconState.Rectified:
          return mapping[AlertIconName.LowRectified];
        case AlertIconState.Silenced:
          return mapping[AlertIconName.LowSilenced];
        case AlertIconState.Unacknowledged:
          return mapping[AlertIconName.LowUnack];
        default:
          return mapping[AlertIconName.LowUnack];
      }
    } else if (this.bamType === AlertType.Alarm) {
      switch (this._effectiveState) {
        case AlertIconState.Rectified:
          return mapping[AlertIconName.AlarmRectified];
        case AlertIconState.Silenced:
          return mapping[AlertIconName.AlarmSilenced];
        case AlertIconState.Unacknowledged:
          return mapping[AlertIconName.AlarmUnack];
        default:
          return null;
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

  private renderStaticIcon(): TemplateResult | typeof nothing {
    // Caution and diagnostic always show a fixed symbol, regardless of state.
    if (this._effectiveType === AlertType.Caution) {
      return html`<obi-caution-color-iec usecsscolor></obi-caution-color-iec>`;
    }
    if (this._effectiveType === AlertType.LevelDiagnostic) {
      return html`<obi-diagnostic-badge
        style="color: var(--alert-diagnostic-color);"
      ></obi-diagnostic-badge>`;
    }
    if (this._effectiveState === AlertIconState.Acknowledged) {
      if (this._effectiveType === AlertType.LevelCritical) {
        return html`${criticalAcknowledged}`;
      }
      if (this._effectiveType === AlertType.LevelLow) {
        return html`${lowAcknowledged}`;
      }
      switch (this.bamType) {
        case AlertType.Alarm:
          return html`<obi-alarm-acknowledged-iec
            usecsscolor
          ></obi-alarm-acknowledged-iec>`;
        case AlertType.Warning:
          return html`<obi-warning-acknowledged-iec
            usecsscolor
          ></obi-warning-acknowledged-iec>`;
        default:
          return nothing;
      }
    } else if (this._effectiveState === AlertIconState.Rectified) {
      if (this._effectiveType === AlertType.LevelCritical) {
        return html`${criticalRectifiedB}`;
      }
      if (this._effectiveType === AlertType.LevelLow) {
        return html`${lowRectifiedB}`;
      }
      switch (this.bamType) {
        case AlertType.Alarm:
          return html`<obi-alarm-rectified-outlined
            usecsscolor
          ></obi-alarm-rectified-outlined>`;
        case AlertType.Warning:
          return html`<obi-warning-rectified-outlined
            usecsscolor
          ></obi-warning-rectified-outlined>`;
        default:
          return nothing;
      }
    }
    return nothing;
  }

  override render() {
    if (!this._effectiveType) {
      return html`<div>No alarm</div>`;
    }
    if (supportsBlinking(this._effectiveType, this.acknowledged ?? false)) {
      const icons = this.icon;
      if (!icons) {
        throw new Error('No icon found');
      }
      const blinkMode = getAlertBlinkMode(this._effectiveType);
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

      svg,
      .a,
      .b {
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
