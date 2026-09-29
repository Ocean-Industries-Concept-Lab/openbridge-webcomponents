import {html, unsafeCSS} from 'lit';
import type {CSSResultGroup, TemplateResult} from 'lit';
import '../../icons/icon-heatpump.js';
import {
  ObcAbstractSpecialtyTank,
  SpecialtyTankFrame,
  SpecialtyTankSplitMode,
} from '../specialty-tank/abstract-specialty-tank.js';
import hostStyle from './heat-pump.css?inline';
import {customElement} from '../../decorator.js';

/**
 * `<obc-heat-pump>` – HVAC tile for a heat pump.
 *
 * A 152×96 rounded frame whose graphic area splits vertically — hot on the
 * left, cold on the right — around a centered heat-pump icon, with an
 * optional badge row above the frame and a tag readout below it.
 *
 * ## Features / Variants
 * - `medium` selects the graphic area: one grey area (`regular`), two grey
 *   halves (`graphic`) or hot/cold halves (`medium`).
 * - `static` renders a flat, display-only tile with a bare icon.
 * - Enum-driven badges (`badgeControl`, `badgeAlert`, `badgeInterlock`,
 *   `badgeCommandLocked`) or the `badges` slot fill the badge row; it
 *   collapses when empty, as does the tag cell.
 * - Alert-frame overlay with the same six properties and three slots as
 *   `obc-automation-tank`.
 * - `positioning`, `clickable` and `activated` behave as on
 *   `obc-automation-tank`.
 *
 * ## Usage Guidelines
 * Use for heat pumps in automation system views. For hydraulic separators use
 * `obc-hydraulic-separator` and for heat exchangers `obc-heat-exchanger`;
 * the three tiles differ only in footprint, icon and split geometry.
 *
 * @ignition-base-width: 152px
 * @ignition-base-height: 96px
 * @ignition-center-horizontal
 *
 * @slot badges - Custom badges, overriding the enum-driven defaults.
 * @slot tag - Text or element replacing the `tag` property readout.
 * @slot alert-icon - Custom icon for the alert frame.
 * @slot alert-label - Label for the alert frame.
 * @slot alert-timer - Timer for the alert frame.
 * @fires click - Fired when the tile is clicked. When `clickable` is `false` the tile renders a plain `<div>`, and in `static` mode a `<div role="img">`, instead of a `<button>` — in both cases it is not focusable or keyboard-activatable; pointer clicks still reach the host.
 * @beta
 */
@customElement('obc-heat-pump')
export class ObcHeatPump extends ObcAbstractSpecialtyTank {
  protected override get equipmentIcon(): TemplateResult {
    return html`<obi-heatpump usecsscolor></obi-heatpump>`;
  }

  protected override get equipmentName(): string {
    return 'Heat pump';
  }

  protected override get frame(): SpecialtyTankFrame {
    return SpecialtyTankFrame.rounded;
  }

  protected override get splitMode(): SpecialtyTankSplitMode {
    return SpecialtyTankSplitMode.vertical;
  }

  static override styles: CSSResultGroup = [
    ObcAbstractSpecialtyTank.styles,
    unsafeCSS(hostStyle),
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-heat-pump': ObcHeatPump;
  }
}
