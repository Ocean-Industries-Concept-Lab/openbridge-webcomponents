import {html} from 'lit';
import type {TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {ObcShuffleButtonBase} from '../shuffle-button/shuffle-button-base.js';
import '../../icons/icon-hydraulic-01.js';
import '../../icons/icon-hydraulic-02.js';
import '../../icons/icon-hydraulic-05.js';
import '../../icons/icon-hydraulic-06.js';
import '../../icons/icon-hydraulic-07.js';
import '../../icons/icon-hydraulic-08.js';
import '../../icons/icon-hydraulic-16.js';

/**
 * Center-position symbol variant of `<obc-hydraulic-valve-4-3>`.
 * Each value maps to a different center (neutral) position symbol.
 */
export enum HydraulicValve43Type {
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
}

/**
 * `<obc-hydraulic-valve-4-3>` – Position selector symbol for a 4/3 directional valve.
 *
 * Shows the valve's three positions as icon thumbs on a shared track. The
 * selected position always occupies the fixed center slot; the other position
 * thumbs keep their logical order and shift to either side, so the component's
 * total width never changes (five 48px slots at regular size).
 *
 * ## Features / Variants
 * - `type` selects the center-position symbol (five variants).
 * - Controlled selection: clicking an option or pressing arrow keys fires
 *   `position-selected` with the requested position; the application updates
 *   `selectedPosition` when the change is confirmed.
 * - Scales with the component size classes (`obc-component-size-*`).
 *
 * ## Usage Guidelines
 * Use to display and command the position of a 4/3 directional valve. For
 * two-position valves use `<obc-hydraulic-valve-x-2>`; for a static check
 * valve symbol use `<obc-hydraulic-check-valve>`.
 *
 * ## Events
 * - `position-selected` – Fired when the user requests a position (click or
 *   arrow key). Detail: `{position: number}` (0 = left, 1 = center, 2 = right).
 *
 * @fires position-selected {PositionSelectedEvent} Position requested by the user.
 * @alpha
 */
@customElement('obc-hydraulic-valve-4-3')
export class ObcHydraulicValve43 extends ObcShuffleButtonBase {
  /**
   * Center-position symbol variant.
   *
   * @default HydraulicValve43Type.One
   */
  @property({type: String}) type: HydraulicValve43Type =
    HydraulicValve43Type.One;

  /**
   * Accessible name for the control.
   *
   * @default 'Hydraulic 4/3 valve'
   */
  @property({type: String}) override ariaLabel = 'Hydraulic 4/3 valve';

  protected override get positionCount(): number {
    return 3;
  }

  protected override renderPositionIcon(position: number): TemplateResult {
    if (position === 0) {
      return html`<obi-hydraulic-02></obi-hydraulic-02>`;
    }
    if (position === 2) {
      return html`<obi-hydraulic-07></obi-hydraulic-07>`;
    }
    switch (this.type) {
      case HydraulicValve43Type.Two:
        return html`<obi-hydraulic-16></obi-hydraulic-16>`;
      case HydraulicValve43Type.Three:
        return html`<obi-hydraulic-08></obi-hydraulic-08>`;
      case HydraulicValve43Type.Four:
        return html`<obi-hydraulic-05></obi-hydraulic-05>`;
      case HydraulicValve43Type.Five:
        return html`<obi-hydraulic-06></obi-hydraulic-06>`;
      case HydraulicValve43Type.One:
      default:
        return html`<obi-hydraulic-01></obi-hydraulic-01>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-hydraulic-valve-4-3': ObcHydraulicValve43;
  }
}
