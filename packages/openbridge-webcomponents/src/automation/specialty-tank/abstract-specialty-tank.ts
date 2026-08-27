import {LitElement, html, nothing, svg, unsafeCSS} from 'lit';
import type {CSSResultGroup, TemplateResult} from 'lit';
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
import {TankPositioning} from '../automation-tank/tank-positioning.js';

/**
 * What the graphic area of a specialty tank shows. Mirrors the Figma
 * `has Medium` property; its fourth value, Static, is the `static` property.
 */
export enum SpecialtyTankMedium {
  /** One grey area, no split. */
  regular = 'regular',
  /** Two grey halves separated by a gap. */
  graphic = 'graphic',
  /** Hot (red) and cold (blue) halves separated by a gap. */
  medium = 'medium',
}

/**
 * Hot/cold split geometry of a specialty tank. Drives the halves and the
 * gap between them through the `split-<mode>` class on the tank frame.
 */
export enum SpecialtyTankSplitMode {
  /** Left half hot, right half cold. */
  vertical = 'vertical',
  /** Top half hot, bottom half cold. */
  horizontal = 'horizontal',
  /** Two corner-to-corner triangles, top-left hot and bottom-right cold. */
  diagonal = 'diagonal',
}

/**
 * Frame silhouette of a specialty tank.
 */
export enum SpecialtyTankFrame {
  /** One rounded border box. */
  rounded = 'rounded',
  /** Pressurized-tank silhouette: domed caps on a side-bordered body. */
  pressurized = 'pressurized',
}

/**
 * Base class for the specialty-tank tiles `obc-heat-pump`,
 * `obc-hydraulic-separator` and `obc-heat-exchanger`. Owns the halo, badge
 * row, tank frame with its hot/cold graphic area and equipment icon, tag
 * readout and alert-frame overlay. Subclasses supply `equipmentIcon`,
 * `equipmentName`, `frame` and `splitMode`, plus their own host footprint.
 *
 * ## Layout
 * The same shell as a compact `obc-automation-tank`: a fixed host (or
 * `positioning="button"` to fill the parent), a 4px-padded halo holding
 * badges, the tank frame and the tag, the frame absorbing the space of
 * empty badge and tag cells. Hover, pressed, focus-visible and `activated`
 * are painted on the halo by the flat style mixin; `clickable` and `static`
 * switch the root between a `<button>`, a plain `<div>` and a
 * `<div role="img">` exactly as the tank does.
 *
 * Not declared `abstract`: the wrapper generators wrap every `LitElement`
 * subclass and pass its constructor as a concrete `Constructor<T>`, so the
 * override points throw instead (same as `ObcAbstractAutomationButton`).
 *
 * @property medium - What the graphic area shows: `regular` (one grey area), `graphic` (two grey halves) or `medium` (hot/cold halves).
 * @property static - Display-only tile with a flat grey frame and a bare icon, rendered as a non-interactive `<div role="img">`. Hides the graphic area.
 * @property showIcon - Show the equipment icon centered on the graphic area.
 * @property tag - Identifier rendered in the tag readout below the frame (for example `#0000`); also the accessible name. The cell collapses when empty.
 * @property positioning - Host positioning model — see `TankPositioning`. `button` (default) fills the parent, `point` uses the fixed design footprint with the P&ID anchor.
 * @property clickable - Whether the tile is interactive. `false` keeps the resting appearance but drops hover, pressed and focus states and leaves the tab order; property-only because the default is `true`.
 * @property activated - Paints the activated background on the halo. Needs an interactive tile.
 * @availableWhen activated clickable==true
 * @property badgeControl - Mode badge (auto / manual / local variants), first in the badge row.
 * @property badgeAlert - Alert badge, second in the badge row.
 * @property badgeInterlock - Interlock badge, third in the badge row.
 * @property badgeCommandLocked - Command-locked badge, last in the badge row.
 * @property alert - Show an alert-frame overlay around the halo, mirroring `obc-automation-tank`.
 * @property alertFrameType - Shape of the alert frame.
 * @availableWhen alertFrameType alert==true
 * @property alertFrameThickness - Thickness of the alert frame.
 * @availableWhen alertFrameThickness alert==true
 * @property alertFrameStatus - Alert status the frame is coloured for.
 * @availableWhen alertFrameStatus alert==true
 * @property showAlertCategoryIcon - Shows the alert category icon inside the frame.
 * @availableWhen showAlertCategoryIcon alert==true
 * @property showAlertIcon - Shows the slotted alert icon inside the frame.
 * @availableWhen showAlertIcon alert==true
 */
export class ObcAbstractSpecialtyTank extends LitElement {
  @property({type: String}) medium: SpecialtyTankMedium =
    SpecialtyTankMedium.regular;
  @property({type: Boolean, reflect: true}) static: boolean = false;
  @property({type: Boolean, attribute: false}) showIcon: boolean = true;
  @property({type: String}) tag: string = '';
  @property({type: String, reflect: true}) positioning: TankPositioning =
    TankPositioning.button;
  @property({type: Boolean, attribute: false}) clickable: boolean = true;
  @property({type: Boolean}) activated: boolean = false;

  @property({type: String}) badgeControl: AutomationButtonBadgeControl =
    AutomationButtonBadgeControl.None;
  @property({type: String}) badgeAlert: AutomationButtonBadgeAlert =
    AutomationButtonBadgeAlert.None;
  @property({type: String}) badgeInterlock: AutomationButtonBadgeInterlock =
    AutomationButtonBadgeInterlock.None;
  @property({type: String})
  badgeCommandLocked: AutomationButtonBadgeCommandLocked =
    AutomationButtonBadgeCommandLocked.None;

  @property({type: Boolean}) alert: boolean = false;
  @property({type: String}) alertFrameType: ObcAlertFrameType =
    ObcAlertFrameType.SmallSideFlip;
  @property({type: String}) alertFrameThickness: ObcAlertFrameThickness =
    ObcAlertFrameThickness.Small;
  @property({type: String}) alertFrameStatus: AlertType = AlertType.Alarm;
  @property({type: Boolean, attribute: false}) showAlertCategoryIcon: boolean =
    true;
  @property({type: Boolean}) showAlertIcon: boolean = false;

  @state() private _hasBadges = false;
  @state() private _hasTagSlot = false;

  protected get equipmentIcon(): TemplateResult {
    throw new Error('"equipmentIcon" must be implemented in the subclass');
  }

  /** Accessible-name fallback used when `tag` is empty. */
  protected get equipmentName(): string {
    throw new Error('"equipmentName" must be implemented in the subclass');
  }

  protected get frame(): SpecialtyTankFrame {
    throw new Error('"frame" must be implemented in the subclass');
  }

  protected get splitMode(): SpecialtyTankSplitMode {
    throw new Error('"splitMode" must be implemented in the subclass');
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

  private renderGraphic(): TemplateResult {
    if (this.medium === SpecialtyTankMedium.regular) {
      return html`<div class="area area-single"></div>`;
    }
    if (this.splitMode === SpecialtyTankSplitMode.diagonal) {
      return this.renderDiagonalSplit();
    }
    return html`
      <div class="halves">
        <div class="area area-hot"></div>
        <div class="area area-cold"></div>
      </div>
    `;
  }

  /**
   * Diagonal split in a unit viewBox stretched over the area
   * (`preserveAspectRatio="none"`); every stroke is `non-scaling` so the
   * borders and the gap keep their pixel widths at any aspect ratio. The
   * gap edges are drawn as one wide line per half, clipped to that half,
   * under the narrower frame-coloured gap line.
   */
  private renderDiagonalSplit(): TemplateResult {
    const hot = '0,0 1,0 0,1';
    const cold = '1,0 1,1 0,1';
    return html`
      <div class="diagonal">
        <svg viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true">
          ${svg`
            <defs>
              <clipPath id="clip-hot"><polygon points=${hot} /></clipPath>
              <clipPath id="clip-cold"><polygon points=${cold} /></clipPath>
            </defs>
            <polygon class="area-fill area-hot" points=${hot} />
            <polygon class="area-fill area-cold" points=${cold} />
            <polygon class="area-stroke area-hot" points=${hot} clip-path="url(#clip-hot)" vector-effect="non-scaling-stroke" />
            <polygon class="area-stroke area-cold" points=${cold} clip-path="url(#clip-cold)" vector-effect="non-scaling-stroke" />
            <line class="gap-edge area-hot" x1="1" y1="0" x2="0" y2="1" clip-path="url(#clip-hot)" vector-effect="non-scaling-stroke" />
            <line class="gap-edge area-cold" x1="1" y1="0" x2="0" y2="1" clip-path="url(#clip-cold)" vector-effect="non-scaling-stroke" />
            <line class="gap" x1="1" y1="0" x2="0" y2="1" vector-effect="non-scaling-stroke" />
          `}
        </svg>
      </div>
    `;
  }

  override render() {
    const controlBadge = this._badgeControlType();
    const alertBadge = this._badgeAlertType();
    const interlockBadge = this._badgeInterlockType();
    const commandLockedBadge = this._badgeCommandLockedType();
    const hasEnumBadges =
      controlBadge !== null ||
      alertBadge !== null ||
      interlockBadge !== null ||
      commandLockedBadge !== null;

    const badgesHidden = !this._hasBadges && !hasEnumBadges;
    const tagHidden = !this._hasTagSlot && !this.tag;

    const badgesCell = html`
      <div class="badges" ?hidden=${badgesHidden}>
        <slot name="badges" @slotchange=${this._onBadgesSlotChange}>
          ${controlBadge
            ? html`<obc-automation-badge
                .type=${controlBadge}
              ></obc-automation-badge>`
            : nothing}
          ${alertBadge
            ? html`<obc-automation-badge
                .type=${alertBadge}
              ></obc-automation-badge>`
            : nothing}
          ${interlockBadge
            ? html`<obc-automation-badge
                .type=${interlockBadge}
              ></obc-automation-badge>`
            : nothing}
          ${commandLockedBadge
            ? html`<obc-automation-badge
                .type=${commandLockedBadge}
              ></obc-automation-badge>`
            : nothing}
        </slot>
      </div>
    `;

    const tagCell = html`
      <div class="tag" ?hidden=${tagHidden}>
        <slot name="tag" @slotchange=${this._onTagSlotChange}>${this.tag}</slot>
      </div>
    `;

    const pressurized = this.frame === SpecialtyTankFrame.pressurized;
    const cap = (side: 'start' | 'end') =>
      pressurized
        ? html`<div class="cap cap-${side}"><div class="cap-dome"></div></div>`
        : nothing;
    const frameClasses = classMap({
      'tank-frame': true,
      [`frame-${this.frame}`]: true,
      [`split-${this.splitMode}`]: true,
      [`medium-${this.medium}`]: true,
      static: this.static,
    });
    const tankFrame = html`
      <div class=${frameClasses}>
        ${cap('start')}
        <div class="middle">
          <div class="content">
            ${this.static ? nothing : this.renderGraphic()}
            ${this.showIcon
              ? html`<div class="icon-frame">${this.equipmentIcon}</div>`
              : nothing}
          </div>
        </div>
        ${cap('end')}
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

    const halo = html`
      <div class="halo">
        ${badgesCell}${tankFrame}${tagCell}${alertFrameOverlay}
      </div>
    `;

    const isClickable = this.clickable && !this.static;
    const rootClasses = classMap({
      root: true,
      activated: this.activated,
      clickable: isClickable,
    });
    const name = this.tag || this.equipmentName;

    // Same three root shapes as obc-automation-tank; the live region stays on
    // all of them so a slotted alert label is announced regardless.
    if (this.static) {
      return html`<div
        class=${rootClasses}
        role="img"
        aria-label=${name}
        aria-live="polite"
        aria-atomic="true"
      >
        ${halo}
      </div>`;
    }
    if (!isClickable) {
      return html`<div
        class=${rootClasses}
        aria-live="polite"
        aria-atomic="true"
      >
        ${halo}
      </div>`;
    }
    return html`<button
      class=${rootClasses}
      type="button"
      aria-label=${name}
      aria-live="polite"
      aria-atomic="true"
    >
      ${halo}
    </button>`;
  }

  static override styles: CSSResultGroup = unsafeCSS(componentStyle);
}
