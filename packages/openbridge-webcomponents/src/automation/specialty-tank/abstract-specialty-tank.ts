import {LitElement, TemplateResult, html, nothing, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './specialty-tank.css?inline';
import '../automation-badge/automation-badge.js';
import {ObcAutomationBadgeType} from '../automation-badge/automation-badge.js';
import {
  AutomationButtonBadgeAlert,
  AutomationButtonBadgeCommandLocked,
  AutomationButtonBadgeControl,
  AutomationButtonBadgeInterlock,
} from '../automation-button/abstract-automation-button.js';
import '../../components/alert-frame/alert-frame.js';
import {
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';
import {AlertType} from '../../types.js';
import '../../icons/icon-heat-google.js';
import '../../icons/icon-cold-google.js';

/**
 * Hot/cold fill geometry of a specialty tank. Drives both the medium fill
 * split and the divider through the `split-<mode>` CSS class on the tank
 * container.
 */
export enum SpecialtyTankSplitMode {
  /** Left half hot, right half cold, vertical divider bar. */
  vertical = 'vertical',
  /** Top half hot, bottom half cold, horizontal divider bar. */
  horizontal = 'horizontal',
  /** Two corner-to-corner triangles (top-left hot, bottom-right cold), no divider. */
  diagonal = 'diagonal',
}

/**
 * ## Abstract Specialty Tank
 *
 * Abstract base for the specialty-tank tiles (`obc-heat-pump`,
 * `obc-hydraulic-separator`, `obc-heat-exchanger`). Owns the shared frame,
 * badge row, hot/cold medium fill, corner glyphs, centered equipment-icon
 * frame, tag readout, and alert-frame overlay. Subclasses provide three
 * members: `equipmentIcon` (the centered `obi-*` icon), `splitMode` (the
 * hot/cold fill geometry), and `equipmentName` (the accessible-name
 * fallback used when `tag` is empty).
 *
 * ### Features / Variants
 * - `medium` toggles between the empty grey fill and the hot/cold colors.
 * - `showMediumIcons` toggles the flame (top-left) and snowflake
 *   (bottom-right) corner glyphs.
 * - `showTag` / `tag` control the identifier readout below the frame.
 * - Enum-driven badges (`badgeControl`, `badgeInterlock`,
 *   `badgeCommandLocked`, `badgeAlert`) render in the top-right badge row.
 * - Alert-frame overlay mirroring `obc-automation-tank`.
 *
 * ### Usage Guidelines
 * Not a custom element — extend it and register the subclass with
 * `@customElement`. The subclass carries the user-facing JSDoc consumed by
 * Storybook autodocs. The override points throw at runtime instead of being
 * declared `abstract` because the framework wrapper generators instantiate
 * every manifest class through a concrete `Constructor<T>` type — an
 * abstract class breaks the generated React wrapper build (same reason
 * `ObcAbstractAutomationButton` is concrete).
 *
 * @slot badges - Custom badges rendered in the top-right badge row,
 *   overriding the enum-driven defaults. The row collapses when both the
 *   slot and the badge enums are empty.
 * @slot tag - Text or element replacing the `tag` property readout below
 *   the frame. Hidden when `showTag` is `false`.
 * @slot alert-icon - Custom icon for the alert frame (alert only).
 * @slot alert-label - Label for the alert frame (alert only).
 * @slot alert-timer - Timer for the alert frame (alert only).
 *
 * @ignore
 */
export class ObcAbstractSpecialtyTank extends LitElement {
  /** Show the hot/cold medium colors instead of the empty grey fill. */
  @property({type: Boolean}) medium: boolean = false;
  /** Show the flame (top-left) and snowflake (bottom-right) corner glyphs. */
  @property({type: Boolean, attribute: false}) showMediumIcons: boolean = true;
  /** Show the tag readout below the tank frame. */
  @property({type: Boolean, attribute: false}) showTag: boolean = true;
  @property({type: String}) tag: string = '';

  @property({type: String}) badgeControl: AutomationButtonBadgeControl =
    AutomationButtonBadgeControl.None;
  /** Duty badge — reuses the interlock badge enum, whose `interlock` value renders the duty icon. */
  @property({type: String}) badgeInterlock: AutomationButtonBadgeInterlock =
    AutomationButtonBadgeInterlock.None;
  @property({type: String})
  badgeCommandLocked: AutomationButtonBadgeCommandLocked =
    AutomationButtonBadgeCommandLocked.None;
  @property({type: String}) badgeAlert: AutomationButtonBadgeAlert =
    AutomationButtonBadgeAlert.None;

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
  @property({type: Boolean, attribute: false}) showAlertCategoryIcon: boolean =
    true;
  /** @availableWhen alert==true */
  @property({type: Boolean}) showAlertIcon: boolean = false;

  @state() private _hasBadges = false;
  @state() private _hasTagSlot = false;

  get equipmentIcon(): TemplateResult {
    throw new Error('Method "equipmentIcon" must be implemented in subclass');
  }

  get splitMode(): SpecialtyTankSplitMode {
    throw new Error('Method "splitMode" must be implemented in subclass');
  }

  /** Accessible-name fallback used when `tag` is empty. */
  protected get equipmentName(): string {
    throw new Error('Method "equipmentName" must be implemented in subclass');
  }

  private _badgeControlType(): ObcAutomationBadgeType | null {
    switch (this.badgeControl) {
      case AutomationButtonBadgeControl.Local:
        return ObcAutomationBadgeType.Local;
      case AutomationButtonBadgeControl.LocalOnly:
        return ObcAutomationBadgeType.LocalOnly;
      case AutomationButtonBadgeControl.Manual:
        return ObcAutomationBadgeType.Manual;
      case AutomationButtonBadgeControl.ManualOnly:
        return ObcAutomationBadgeType.ManualOnly;
      case AutomationButtonBadgeControl.Auto:
        return ObcAutomationBadgeType.Auto;
      default:
        return null;
    }
  }

  private _badgeInterlockType(): ObcAutomationBadgeType | null {
    switch (this.badgeInterlock) {
      case AutomationButtonBadgeInterlock.Interlock:
        return ObcAutomationBadgeType.Interlock;
      case AutomationButtonBadgeInterlock.InterlockInhibit:
        return ObcAutomationBadgeType.InterlockInhibit;
      default:
        return null;
    }
  }

  private _badgeCommandLockedType(): ObcAutomationBadgeType | null {
    if (
      this.badgeCommandLocked ===
      AutomationButtonBadgeCommandLocked.CommandLocked
    ) {
      return ObcAutomationBadgeType.CommandLocked;
    }
    return null;
  }

  private _badgeAlertType(): ObcAutomationBadgeType | null {
    switch (this.badgeAlert) {
      case AutomationButtonBadgeAlert.Silence:
        return ObcAutomationBadgeType.AlertSilenced;
      case AutomationButtonBadgeAlert.Caution:
        return ObcAutomationBadgeType.Caution;
      case AutomationButtonBadgeAlert.Warning:
        return ObcAutomationBadgeType.Warning;
      case AutomationButtonBadgeAlert.Alarm:
        return ObcAutomationBadgeType.Alarm;
      case AutomationButtonBadgeAlert.LevelCritical:
        return ObcAutomationBadgeType.LevelCritical;
      case AutomationButtonBadgeAlert.LevelHigh:
        return ObcAutomationBadgeType.LevelHigh;
      case AutomationButtonBadgeAlert.LevelMedium:
        return ObcAutomationBadgeType.LevelMedium;
      case AutomationButtonBadgeAlert.LevelLow:
        return ObcAutomationBadgeType.LevelLow;
      case AutomationButtonBadgeAlert.LevelDiagnostic:
        return ObcAutomationBadgeType.LevelDiagnostic;
      default:
        return null;
    }
  }

  private _slotHasContent(e: Event): boolean {
    const slot = e.target as HTMLSlotElement;
    return slot
      .assignedNodes({flatten: true})
      .some(
        (n) =>
          n.nodeType === Node.ELEMENT_NODE ||
          (n.nodeType === Node.TEXT_NODE && !!n.textContent?.trim())
      );
  }

  private _onBadgesSlotChange(e: Event): void {
    this._hasBadges = this._slotHasContent(e);
  }

  private _onTagSlotChange(e: Event): void {
    this._hasTagSlot = this._slotHasContent(e);
  }

  override render() {
    const controlBadge = this._badgeControlType();
    const dutyBadge = this._badgeInterlockType();
    const commandLockedBadge = this._badgeCommandLockedType();
    const alertBadge = this._badgeAlertType();
    const hasEnumBadges =
      controlBadge !== null ||
      dutyBadge !== null ||
      commandLockedBadge !== null ||
      alertBadge !== null;

    const badgesHidden = !this._hasBadges && !hasEnumBadges;
    const tagHidden = !this.showTag || (!this._hasTagSlot && !this.tag);

    const badgesCell = html`
      <div class="badges" ?hidden=${badgesHidden}>
        <slot name="badges" @slotchange=${this._onBadgesSlotChange}>
          ${controlBadge
            ? html`<obc-automation-badge
                .type=${controlBadge}
              ></obc-automation-badge>`
            : nothing}
          ${dutyBadge
            ? html`<obc-automation-badge
                .type=${dutyBadge}
              ></obc-automation-badge>`
            : nothing}
          ${commandLockedBadge
            ? html`<obc-automation-badge
                .type=${commandLockedBadge}
              ></obc-automation-badge>`
            : nothing}
          ${alertBadge
            ? html`<obc-automation-badge
                .type=${alertBadge}
              ></obc-automation-badge>`
            : nothing}
        </slot>
      </div>
    `;

    const mediumFill =
      this.splitMode === SpecialtyTankSplitMode.diagonal
        ? html`<div class="fill fill-diagonal"></div>
            <svg
              class="divider-diagonal"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                class="divider-diagonal-border"
                x1="0"
                y1="100"
                x2="100"
                y2="0"
                vector-effect="non-scaling-stroke"
              />
              <line
                class="divider-diagonal-fill"
                x1="0"
                y1="100"
                x2="100"
                y2="0"
                vector-effect="non-scaling-stroke"
              />
            </svg>`
        : html`<div class="fill fill-hot"></div>
            <div class="fill fill-cold"></div>
            <div class="divider"></div>`;

    const mediumIcons = this.showMediumIcons
      ? html`<obi-heat-google
            class="corner-icon corner-icon-hot"
            aria-hidden="true"
          ></obi-heat-google>
          <obi-cold-google
            class="corner-icon corner-icon-cold"
            aria-hidden="true"
          ></obi-cold-google>`
      : nothing;

    const tankContainerClasses = classMap({
      'tank-container': true,
      [`split-${this.splitMode}`]: true,
      'has-medium': this.medium,
    });
    const tankContainer = html`
      <div class=${tankContainerClasses}>
        <div class="content-container">
          ${mediumFill}${mediumIcons}
          <div class="icon-frame">${this.equipmentIcon}</div>
        </div>
      </div>
    `;

    const tagCell = html`
      <div class="tag" ?hidden=${tagHidden}>
        <slot name="tag" @slotchange=${this._onTagSlotChange}>${this.tag}</slot>
      </div>
    `;

    const alertFrameOverlay = this.alert
      ? html`<obc-alert-frame
          class="alert-frame"
          .type=${this.alertFrameType}
          .thickness=${this.alertFrameThickness}
          .status=${this.alertFrameStatus}
          .showAlertCategoryIcon=${this.showAlertCategoryIcon}
          .showIcon=${this.showAlertIcon}
        >
          <span slot="icon"><slot name="alert-icon"></slot></span>
          <span slot="label"><slot name="alert-label"></slot></span>
          <span slot="timer"><slot name="alert-timer"></slot></span>
        </obc-alert-frame>`
      : nothing;

    return html`
      <button
        class="root"
        type="button"
        aria-label=${this.tag || this.equipmentName}
        aria-live="polite"
        aria-atomic="true"
      >
        <div class="halo">
          <div class="body">${badgesCell}${tankContainer}</div>
          ${tagCell}${alertFrameOverlay}
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}
