import {html} from 'lit';
import type {TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {ObcShuffleButtonBase} from '../shuffle-button/shuffle-button-base.js';

/**
 * Detail payload for the `position-selected` event:
 * the zero-based position the user requested (0 = first, 1 = second).
 */
export interface PositionSelectedDetail {
  position: number;
}
import '../../icons/icon-hydraulic-01.js';
import '../../icons/icon-hydraulic-02.js';
import '../../icons/icon-hydraulic-07.js';
import '../../icons/icon-hydraulic-10.js';
import '../../icons/icon-hydraulic-11.js';

/**
 * Port/position configuration of `<obc-hydraulic-valve-x-2>`:
 * `2/2`, `3/2` or `4/2` (ports/positions). Each value maps to its own pair of
 * position symbols.
 */
export enum HydraulicValveX2Type {
  TwoTwo = '2/2',
  ThreeTwo = '3/2',
  FourTwo = '4/2',
}

/**
 * `<obc-hydraulic-valve-x-2>` – Position selector symbol for a two-position valve.
 *
 * Shows the valve's two positions as icon thumbs on a shared track. The
 * selected position always occupies the fixed center slot; the option thumb
 * sits to its left or right depending on logical order, and an empty spacer
 * slot keeps the total width constant (three 48px slots at regular size).
 *
 * ## Features / Variants
 * - `type` selects the port/position configuration: `2/2`, `3/2` or `4/2`.
 * - `vertical` stacks the positions top to bottom and rotates the symbols to
 *   match a vertical flow path.
 * - Controlled selection: clicking the option or pressing arrow keys fires
 *   `position-selected`; the application updates `selectedPosition` when the
 *   change is confirmed.
 * - Scales with the component size classes (`obc-component-size-*`).
 *
 * ## Usage Guidelines
 * Use to display and command the position of a two-position valve. For 4/3
 * directional valves use `<obc-hydraulic-valve-4-3>`; for a static check
 * valve symbol use `<obc-hydraulic-check-valve>`.
 *
 * ## Events
 * - `position-selected` – Fired when the user requests a position (click or
 *   arrow key). Detail: `{position: number}` (0 = first, 1 = second).
 *
 * @alpha
 * @fires position-selected {CustomEvent<PositionSelectedDetail>} Position requested by the user.
 */
@customElement('obc-hydraulic-valve-x-2')
export class ObcHydraulicValveX2 extends ObcShuffleButtonBase {
  /**
   * Port/position configuration.
   *
   * @default HydraulicValveX2Type.TwoTwo
   */
  @property({type: String}) type: HydraulicValveX2Type =
    HydraulicValveX2Type.TwoTwo;

  /**
   * Accessible name for the control.
   *
   * @default 'Hydraulic valve'
   */
  @property({type: String}) override ariaLabel = 'Hydraulic valve';

  protected override get positionCount(): number {
    return 2;
  }

  protected override renderPositionIcon(position: number): TemplateResult {
    switch (this.type) {
      case HydraulicValveX2Type.ThreeTwo:
        return position === 0
          ? html`<obi-hydraulic-11></obi-hydraulic-11>`
          : html`<obi-hydraulic-10></obi-hydraulic-10>`;
      case HydraulicValveX2Type.FourTwo:
        return position === 0
          ? html`<obi-hydraulic-02></obi-hydraulic-02>`
          : html`<obi-hydraulic-07></obi-hydraulic-07>`;
      case HydraulicValveX2Type.TwoTwo:
      default:
        return position === 0
          ? html`<obi-hydraulic-02></obi-hydraulic-02>`
          : html`<obi-hydraulic-01></obi-hydraulic-01>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-hydraulic-valve-x-2': ObcHydraulicValveX2;
  }
}
