import {html, unsafeCSS} from 'lit';
import type {CSSResultGroup, TemplateResult} from 'lit';
import '../../icons/icon-hydraulic-separator.js';
import {
  ObcAbstractSpecialtyTank,
  SpecialtyTankFrame,
  SpecialtyTankSplitMode,
} from '../specialty-tank/abstract-specialty-tank.js';
import hostStyle from './hydraulic-separator.css?inline';
import {customElement} from '../../decorator.js';

/**
 * `<obc-hydraulic-separator>` – HVAC tile for a hydraulic separator.
 *
 * A 56×142 pressurized-tank silhouette whose graphic area splits
 * horizontally — hot on top, cold below — around a centered
 * hydraulic-separator icon, with an optional badge row above the frame and a
 * tag readout below it.
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
 * Use for hydraulic separators in automation system views. For heat pumps
 * use `obc-heat-pump` and for heat exchangers `obc-heat-exchanger`; the
 * three tiles differ only in footprint, icon and split geometry.
 *
 * @ignition-base-width: 56px
 * @ignition-base-height: 142px
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
@customElement('obc-hydraulic-separator')
export class ObcHydraulicSeparator extends ObcAbstractSpecialtyTank {
  protected override get equipmentIcon(): TemplateResult {
    return html`<obi-hydraulic-separator
      usecsscolor
    ></obi-hydraulic-separator>`;
  }

  protected override get equipmentName(): string {
    return 'Hydraulic separator';
  }

  protected override get frame(): SpecialtyTankFrame {
    return SpecialtyTankFrame.pressurized;
  }

  protected override get splitMode(): SpecialtyTankSplitMode {
    return SpecialtyTankSplitMode.horizontal;
  }

  static override styles: CSSResultGroup = [
    ObcAbstractSpecialtyTank.styles,
    unsafeCSS(hostStyle),
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-hydraulic-separator': ObcHydraulicSeparator;
  }
}
