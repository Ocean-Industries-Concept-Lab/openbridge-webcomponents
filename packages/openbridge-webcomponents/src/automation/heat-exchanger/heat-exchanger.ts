import {TemplateResult, html} from 'lit';
import '../../icons/icon-heatexhanger.js';
import {
  ObcAbstractSpecialtyTank,
  SpecialtyTankSplitMode,
} from '../specialty-tank/abstract-specialty-tank.js';
import {customElement} from '../../decorator.js';

/**
 * ## Heat Exchanger
 *
 * Fixed-footprint instrument tile representing a heat exchanger. Shows a
 * framed hot/cold medium area split diagonally into two corner-to-corner
 * triangles (top-left hot, bottom-right cold, no divider), a centered
 * heat-exchanger icon in a rounded frame, optional flame/snowflake corner
 * glyphs, an optional badge row, and a tag readout below the frame.
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
 * Use for heat exchangers in automation system views. For heat pumps use
 * `obc-heat-pump` (vertical split) and for hydraulic separators use
 * `obc-hydraulic-separator` (horizontal split); the three tiles differ only
 * in center icon and fill geometry.
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
@customElement('obc-heat-exchanger')
export class ObcHeatExchanger extends ObcAbstractSpecialtyTank {
  override get equipmentIcon(): TemplateResult {
    return html`<obi-heatexhanger usecsscolor></obi-heatexhanger>`;
  }

  override get splitMode(): SpecialtyTankSplitMode {
    return SpecialtyTankSplitMode.diagonal;
  }

  protected override get equipmentName(): string {
    return 'Heat exchanger';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-heat-exchanger': ObcHeatExchanger;
  }
}
