import {LitElement, TemplateResult, html, nothing} from 'lit';
import {property, queryAssignedElements} from 'lit/decorators.js';
import '../automation-button/automation-button.js';
import {
  AutomationButtonDirection,
  AutomationButtonOrientation,
  AutomationButtonPositioning,
  AutomationButtonReadoutPosition,
  AutomationButtonState,
  AutomationButtonVariant,
} from '../automation-button/automation-button.js';
import {
  AutomationButtonReadoutStack,
  AutomationButtonReadoutStackSize,
} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {
  ObcAlertFrameThickness,
  ObcAlertFrameType,
  ObcAlertFrameMode,
} from '../../components/alert-frame/alert-frame.js';
import {AlertType} from '../../types.js';
import '../automation-badge/automation-badge.js';
import {ObcAutomationBadgeType} from '../automation-badge/automation-badge.js';
import {CircularProgressMode} from '../../building-blocks/circular-progress/circular-progress.js';

export enum AutomationButtonBadgeAlert {
  None = 'none',
  Silence = 'silence',
  Caution = 'caution',
  Warning = 'warning',
  Alarm = 'alarm',
  LevelCritical = 'level-critical',
  LevelHigh = 'level-high',
  LevelMedium = 'level-medium',
  LevelLow = 'level-low',
  LevelDiagnostic = 'level-diagnostic',
}

export enum AutomationButtonBadgeInterlock {
  None = 'none',
  Interlock = 'interlock',
  InterlockInhibit = 'interlock-inhibit',
}

export enum AutomationButtonBadgeControl {
  None = 'none',
  Local = 'local',
  LocalOnly = 'local-only',
  Manual = 'manual',
  ManualOnly = 'manual-only',
  Auto = 'auto',
}

export enum AutomationButtonBadgeCommandLocked {
  None = 'none',
  CommandLocked = 'command-locked',
}

/**
 * Abstract base class for automation device buttons (e.g. valves, pumps,
 * tanks). Subclasses provide the device symbol through the `icon` getter and
 * its on/off state through `_on`, while this class renders the underlying
 * `<obc-automation-button>` and forwards the shared slots and properties.
 *
 * ### Alert frame slots
 *
 * When `alert` is enabled the button is wrapped in an `<obc-alert-frame>`. The
 * alert frame can show a custom icon, label and timer, depending on the
 * selected `alertFrameType`. These are exposed as slots that are forwarded all
 * the way down to the alert frame:
 *
 * | Slot Name          | Renders When...                                              | Purpose                                                                 |
 * |--------------------|--------------------------------------------------------------|-------------------------------------------------------------------------|
 * | alert-frame-icon   | `alert` and `showAlertIcon` and `alertFrameType` in [`large-side-flip`, `bottom-flip`, `top-flip`] | Custom icon shown in the alert frame flap, in addition to the alert category icon. |
 * | alert-frame-label  | `alert` and `alertFrameType` in [`bottom-flip`, `top-flip`]  | Label text shown in the alert frame flap.                               |
 * | alert-frame-timer  | `alert` and `alertFrameType` in [`bottom-flip`, `top-flip`]  | Timer / clock shown in the alert frame flap.                            |
 *
 * The slot content is remapped on its way down: `alert-frame-icon` ->
 * `alert-icon` (`obc-automation-button`) -> `icon` (`obc-alert-frame`), and
 * likewise for the label and timer slots.
 *
 * @slot alert-frame-icon - Custom icon shown in the alert frame flap (requires `showAlertIcon` and a flap variant that supports an icon).
 * @slot alert-frame-label - Label text shown in the alert frame flap (`bottom-flip`/`top-flip`).
 * @slot alert-frame-timer - Timer / clock shown in the alert frame flap (`bottom-flip`/`top-flip`).
 * @slot badge-top-right - Custom badge in the top-right corner (overrides `badgeAlert`).
 * @slot badge-top-left - Custom badge in the top-left corner (overrides `badgeControl`).
 * @slot badge-bottom-left - Custom badge in the bottom-left corner (overrides `badgeInterlock`).
 * @slot badge-bottom-right - Custom badge in the bottom-right corner (overrides `badgeCommandLocked`).
 */
export class ObcAbstractAutomationButton extends LitElement {
  @property({type: Boolean, attribute: false}) showReadoutStack: boolean = true;
  /** @availableWhen showReadoutStack==true */
  @property({type: String}) readoutPosition: AutomationButtonReadoutPosition =
    AutomationButtonReadoutPosition.bottom;
  /** @availableWhen showReadoutStack==true */
  @property({type: String}) readoutSize: AutomationButtonReadoutStackSize =
    AutomationButtonReadoutStackSize.regular;
  @property({type: String}) positioning: AutomationButtonPositioning =
    AutomationButtonPositioning.point;
  @property({type: Boolean}) alert: boolean = false;
  /** @availableWhen alert==true */
  @property({type: String}) alertFrameType: ObcAlertFrameType =
    ObcAlertFrameType.SmallSideFlip;
  /** @availableWhen alert==true */
  @property({type: String}) alertFrameThickness: ObcAlertFrameThickness =
    ObcAlertFrameThickness.Small;
  /** @availableWhen alert==true */
  @property({type: String}) alertFrameStatus: AlertType = AlertType.Alarm;
  /** @availableWhen alert==true */
  @property({type: String}) alertFrameMode: ObcAlertFrameMode =
    ObcAlertFrameMode.ackedActive;
  /** @availableWhen alert==true */
  @property({type: Boolean, attribute: false}) showAlertCategoryIcon: boolean =
    true;
  /** @availableWhen alert==true */
  @property({type: Boolean}) showAlertIcon: boolean = false;
  /** Shows a progress indicator, used to indicate that an user action is in progress */
  @property({type: Boolean}) progress: boolean = false;
  /** @availableWhen progress==true */
  @property({type: String}) progressMode: CircularProgressMode =
    CircularProgressMode.indeterminate;
  /** @availableWhen progress==true && progressMode in [determinate, progressiveIndeterminate] */
  @property({type: Number}) progressValue: number = 0;
  @property({type: String}) tag: string | null = null;
  @property({type: String}) badgeControl: AutomationButtonBadgeControl =
    AutomationButtonBadgeControl.None;
  @property({type: String})
  badgeCommandLocked: AutomationButtonBadgeCommandLocked =
    AutomationButtonBadgeCommandLocked.None;
  @property({type: String}) badgeInterlock: AutomationButtonBadgeInterlock =
    AutomationButtonBadgeInterlock.None;
  @property({type: String}) badgeAlert: AutomationButtonBadgeAlert =
    AutomationButtonBadgeAlert.None;

  get icon(): TemplateResult {
    throw new Error('Method "icon" must be implemented in subclass');
  }

  get _on(): boolean {
    throw new Error('Method "_on" must be implemented in subclass');
  }

  get _variant(): AutomationButtonVariant {
    // @ts-expect-error - property should be defined in subclass
    return this.variant as AutomationButtonVariant;
  }

  get _orientation(): AutomationButtonOrientation {
    return AutomationButtonOrientation.horizontal;
  }

  get _direction(): AutomationButtonDirection {
    if ('direction' in this) {
      return this.direction as AutomationButtonDirection;
    }
    return AutomationButtonDirection.forward;
  }

  get extraReadouts(): AutomationButtonReadoutStack[] {
    return [];
  }

  @queryAssignedElements({slot: 'badge-top-right'})
  badgeTopRight!: HTMLElement[];
  @queryAssignedElements({slot: 'badge-top-left'})
  badgeTopLeft!: HTMLElement[];
  @queryAssignedElements({slot: 'badge-bottom-left'})
  badgeBottomLeft!: HTMLElement[];
  @queryAssignedElements({slot: 'badge-bottom-right'})
  badgeBottomRight!: HTMLElement[];

  private getBadgeSpacer(): boolean {
    if (!this.showReadoutStack) {
      return false;
    }

    const topLeft =
      this.badgeTopLeft.length > 0 || this.getBadgeControlType() !== null;
    const topRight =
      this.badgeTopRight.length > 0 || this.getBadgeAlertType() !== null;
    const bottomLeft =
      this.badgeBottomLeft.length > 0 || this.getBadgeInterlockType() !== null;
    const bottomRight =
      this.badgeBottomRight.length > 0 ||
      this.getBadgeCommandLockedType() !== null;
    if (this.readoutPosition === AutomationButtonReadoutPosition.top) {
      return topRight || topLeft;
    } else if (
      this.readoutPosition === AutomationButtonReadoutPosition.bottom
    ) {
      return bottomLeft || bottomRight;
    } else if (this.readoutPosition === AutomationButtonReadoutPosition.left) {
      return topLeft || bottomLeft;
    } else if (this.readoutPosition === AutomationButtonReadoutPosition.right) {
      return topRight || bottomRight;
    }
    return false;
  }

  private handleBadgeSlotChange() {
    this.requestUpdate();
  }

  private getBadgeAlertType(): ObcAutomationBadgeType | null {
    if (this.badgeAlert === AutomationButtonBadgeAlert.Silence) {
      return ObcAutomationBadgeType.AlertSilenced;
    } else if (this.badgeAlert === AutomationButtonBadgeAlert.Caution) {
      return ObcAutomationBadgeType.Caution;
    } else if (this.badgeAlert === AutomationButtonBadgeAlert.Warning) {
      return ObcAutomationBadgeType.Warning;
    } else if (this.badgeAlert === AutomationButtonBadgeAlert.Alarm) {
      return ObcAutomationBadgeType.Alarm;
    } else if (this.badgeAlert === AutomationButtonBadgeAlert.LevelCritical) {
      return ObcAutomationBadgeType.LevelCritical;
    } else if (this.badgeAlert === AutomationButtonBadgeAlert.LevelHigh) {
      return ObcAutomationBadgeType.LevelHigh;
    } else if (this.badgeAlert === AutomationButtonBadgeAlert.LevelMedium) {
      return ObcAutomationBadgeType.LevelMedium;
    } else if (this.badgeAlert === AutomationButtonBadgeAlert.LevelLow) {
      return ObcAutomationBadgeType.LevelLow;
    } else if (this.badgeAlert === AutomationButtonBadgeAlert.LevelDiagnostic) {
      return ObcAutomationBadgeType.LevelDiagnostic;
    }
    return null;
  }

  private getBadgeControlType(): ObcAutomationBadgeType | null {
    if (this.badgeControl === AutomationButtonBadgeControl.Local) {
      return ObcAutomationBadgeType.Local;
    } else if (this.badgeControl === AutomationButtonBadgeControl.LocalOnly) {
      return ObcAutomationBadgeType.LocalOnly;
    } else if (this.badgeControl === AutomationButtonBadgeControl.Manual) {
      return ObcAutomationBadgeType.Manual;
    } else if (this.badgeControl === AutomationButtonBadgeControl.ManualOnly) {
      return ObcAutomationBadgeType.ManualOnly;
    } else if (this.badgeControl === AutomationButtonBadgeControl.Auto) {
      return ObcAutomationBadgeType.Auto;
    }
    return null;
  }

  private getBadgeInterlockType(): ObcAutomationBadgeType | null {
    if (this.badgeInterlock === AutomationButtonBadgeInterlock.Interlock) {
      return ObcAutomationBadgeType.Interlock;
    } else if (
      this.badgeInterlock === AutomationButtonBadgeInterlock.InterlockInhibit
    ) {
      return ObcAutomationBadgeType.InterlockInhibit;
    }
    return null;
  }

  private getBadgeCommandLockedType(): ObcAutomationBadgeType | null {
    if (
      this.badgeCommandLocked ===
      AutomationButtonBadgeCommandLocked.CommandLocked
    ) {
      return ObcAutomationBadgeType.CommandLocked;
    }
    return null;
  }

  override render() {
    const readouts: AutomationButtonReadoutStack[] = [...this.extraReadouts];
    const badgeAlertType = this.getBadgeAlertType();
    const badgeControlType = this.getBadgeControlType();
    const badgeInterlockType = this.getBadgeInterlockType();
    const badgeCommandLockedType = this.getBadgeCommandLockedType();

    return html`<obc-automation-button
      .state=${this._on
        ? AutomationButtonState.open
        : AutomationButtonState.closed}
      .readouts=${readouts}
      .tag=${this.tag}
      .showReadoutStack=${this.showReadoutStack}
      .readoutPosition=${this.readoutPosition}
      .readoutSize=${this.readoutSize}
      ?alert=${this.alert}
      .alertFrameType=${this.alertFrameType}
      .alertFrameThickness=${this.alertFrameThickness}
      .alertFrameStatus=${this.alertFrameStatus}
      .alertFrameMode=${this.alertFrameMode}
      .showAlertCategoryIcon=${this.showAlertCategoryIcon}
      .showAlertIcon=${this.showAlertIcon}
      ?progress=${this.progress}
      .progressMode=${this.progressMode}
      .progressValue=${this.progressValue}
      .variant=${this._variant}
      .direction=${this._direction}
      .orientation=${this._orientation}
      .hasBadgeSpacer=${this.getBadgeSpacer()}
      .positioning=${this.positioning}
    >
      ${this.icon}
      <slot name="alert-frame-icon" slot="alert-icon"></slot>
      <slot name="alert-frame-label" slot="alert-label"></slot>
      <slot name="alert-frame-timer" slot="alert-timer"></slot>
      <slot
        name="badge-top-right"
        slot="badge-top-right"
        @slotchange=${this.handleBadgeSlotChange}
      >
        ${badgeAlertType
          ? html`<obc-automation-badge
              .type=${badgeAlertType}
            ></obc-automation-badge>`
          : nothing}
      </slot>
      <slot
        name="badge-top-left"
        slot="badge-top-left"
        @slotchange=${this.handleBadgeSlotChange}
      >
        ${badgeControlType
          ? html`<obc-automation-badge
              .type=${badgeControlType}
            ></obc-automation-badge>`
          : nothing}
      </slot>
      <slot
        name="badge-bottom-left"
        slot="badge-bottom-left"
        @slotchange=${this.handleBadgeSlotChange}
      >
        ${badgeInterlockType
          ? html`<obc-automation-badge
              .type=${badgeInterlockType}
            ></obc-automation-badge>`
          : nothing}
      </slot>
      <slot
        name="badge-bottom-right"
        slot="badge-bottom-right"
        @slotchange=${this.handleBadgeSlotChange}
      >
        ${badgeCommandLockedType
          ? html`<obc-automation-badge
              .type=${badgeCommandLockedType}
            ></obc-automation-badge>`
          : nothing}
      </slot>
    </obc-automation-button>`;
  }
}
