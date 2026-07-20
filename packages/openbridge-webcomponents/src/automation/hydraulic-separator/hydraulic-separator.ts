import {TemplateResult, html} from 'lit';
import '../../icons/icon-hydraulic-separator.js';
import {
  ObcAbstractSpecialtyTank,
  SpecialtyTankSplitMode,
} from '../specialty-tank/abstract-specialty-tank.js';
import {customElement} from '../../decorator.js';

/**
 * ## Hydraulic Separator
 *
 * Fixed-footprint instrument tile representing a hydraulic separator. Shows
 * a framed hot/cold medium area split horizontally (top hot, bottom cold)
 * with a centered divider bar, a centered hydraulic-separator icon in a
 * rounded frame, optional flame/snowflake corner glyphs, an optional badge
 * row, and a tag readout below the frame.
 *
 * ### Features / Variants
 * - `medium` toggles between the empty grey fill and the hot/cold colors.
 * - `showMediumIcons` toggles the flame (top-left) and snowflake
 *   (bottom-right) corner glyphs.
 * - `showTag` / `tag` control the identifier readout below the frame.
 * - Enum-driven badges (`badgeControl`, `badgeInterlock`,
 *   `badgeCommandLocked`, `badgeAlert`) render in the top-right badge row;
 *   the `badges` slot overrides them.
 * - Alert-frame overlay mirroring `obc-automation-tank` (`alert`,
 *   `alertFrameType`, `alertFrameThickness`, `alertFrameStatus`,
 *   `showAlertCategoryIcon`, `showAlertIcon`).
 *
 * ### Usage Guidelines
 * Use for hydraulic separators in automation system views. For heat pumps
 * use `obc-heat-pump` (vertical split) and for heat exchangers use
 * `obc-heat-exchanger` (diagonal split); the three tiles differ only in
 * center icon and fill geometry.
 *
 * @ignition-base-width: 90px
 * @ignition-base-height: 163px
 * @ignition-center-horizontal
 * @beta
 *
 * @slot badges - Custom badges, overriding the enum-driven defaults.
 * @slot tag - Text or element replacing the `tag` property readout.
 * @slot alert-icon - Custom icon for the alert frame.
 * @slot alert-label - Label for the alert frame.
 * @slot alert-timer - Timer for the alert frame.
 */
@customElement('obc-hydraulic-separator')
export class ObcHydraulicSeparator extends ObcAbstractSpecialtyTank {
  override get equipmentIcon(): TemplateResult {
    return html`<obi-hydraulic-separator
      usecsscolor
    ></obi-hydraulic-separator>`;
  }

  override get splitMode(): SpecialtyTankSplitMode {
    return SpecialtyTankSplitMode.horizontal;
  }

  protected override get equipmentName(): string {
    return 'Hydraulic separator';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-hydraulic-separator': ObcHydraulicSeparator;
  }
}
