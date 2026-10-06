import {html} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-threeway-digital-open.js';
import '../../icons/icon-threeway-digital-closed.js';
import '../../icons/icon-threeway-digital-closed-left.js';
import '../../icons/icon-threeway-digital-closed-bottom.js';
import '../../icons/icon-threeway-digital-closed-right.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButton} from '../automation-button/abstract-automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {
  ThreewayValveFlow,
  ThreewayValveOrientation,
  threewayValveReadouts,
  threewayValveRotation,
} from '../threeway-valve-shared/threeway-valve-shared.js';

export enum DigitalThreewayValveVariant {
  regular = 'regular',
  flat = 'flat',
}

/**
 * `<obc-digital-threeway-valve>` – three-way on/off valve for process
 * diagrams, with one open/closed state per port.
 *
 * ## Features
 *
 * - **Three ports:** `open1`, `open2` and `open3` open or close each port.
 *   Ports are numbered from the side without a port: with `orientation`
 *   `bottom`, port 1 is left, port 2 is the stem at the bottom and port 3 is
 *   right. The numbering turns with the symbol.
 * - **Orientation:** `bottom` and `top` lay the valve on a horizontal pipe,
 *   `left` and `right` on a vertical one; the value names the side the stem
 *   points to.
 * - **Flow readout:** `flows` lists one readout row per flow, each with an
 *   optional arrow direction and either a value with a unit (`%` when left out)
 *   or a state, `{open}`, shown as `Open` or `Closed` after the arrow, or
 *   after the on/off icon when there is no direction. Without flows the
 *   readout shows `Open` or `Closed`.
 * - Badges, alert frame, progress and readout placement come from the shared
 *   automation button base.
 *
 * ## Usage Guidelines
 *
 * Use where a valve directs flow between three pipes and each port is either
 * open or closed. With one port closed the symbol shows that port plugged;
 * with fewer than two ports open no flow can pass, and the valve shows as
 * closed. For a valve that opens its ports continuously use
 * `obc-analog-threeway-valve`; for a two-port valve use `obc-digital-valve`.
 *
 * TODO(designer): no icon shows a single open port, so that case uses the
 * closed symbol.
 *
 * @property open1 - Opens port 1.
 * @property open2 - Opens port 2, the stem.
 * @property open3 - Opens port 3.
 * @property orientation - Side the stem points to.
 * @property flows - Readout rows, one per flow: an optional arrow direction with either a value and optional unit (default `%`) or `open` for an `Open`/`Closed` state.
 * @property variant - Visual style of the button surround.
 * @slot badge-top-right - Content projected into the top-right badge position; overrides `badgeAlert`.
 * @slot badge-top-left - Content projected into the top-left badge position; overrides `badgeControl`.
 * @slot badge-bottom-left - Content projected into the bottom-left badge position; overrides `badgeInterlock`.
 * @slot badge-bottom-right - Content projected into the bottom-right badge position; overrides `badgeCommandLocked`.
 * @fires click - Fired when the valve is clicked.
 * @experimental
 */
@customElement('obc-digital-threeway-valve')
export class ObcDigitalThreewayValve extends ObcAbstractAutomationButton {
  @property({type: Boolean}) open1: boolean = false;
  @property({type: Boolean}) open2: boolean = false;
  @property({type: Boolean}) open3: boolean = false;
  @property({type: String}) orientation: ThreewayValveOrientation =
    ThreewayValveOrientation.bottom;
  @property({type: Array, attribute: false}) flows: ThreewayValveFlow[] = [];
  @property({type: String}) variant: DigitalThreewayValveVariant =
    DigitalThreewayValveVariant.regular;

  private get ports(): boolean[] {
    return [this.open1, this.open2, this.open3];
  }

  override get _on(): boolean {
    return this.ports.filter(Boolean).length >= 2;
  }

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    if (!this.showStatus) {
      return [];
    }
    return threewayValveReadouts(this._on, this.flows);
  }

  private renderIcon(slot: string) {
    const style = `display: block; transform: rotate(${threewayValveRotation(
      this.orientation
    )}deg); line-height: 0;`;
    const ports = this.ports;
    if (!this._on) {
      return html`<obi-threeway-digital-closed
        usecsscolor
        slot=${slot}
        style=${style}
      ></obi-threeway-digital-closed>`;
    }
    switch (ports.indexOf(false)) {
      case 0:
        return html`<obi-threeway-digital-closed-left
          usecsscolor
          slot=${slot}
          style=${style}
        ></obi-threeway-digital-closed-left>`;
      case 1:
        return html`<obi-threeway-digital-closed-bottom
          usecsscolor
          slot=${slot}
          style=${style}
        ></obi-threeway-digital-closed-bottom>`;
      case 2:
        return html`<obi-threeway-digital-closed-right
          usecsscolor
          slot=${slot}
          style=${style}
        ></obi-threeway-digital-closed-right>`;
      default:
        return html`<obi-threeway-digital-open
          usecsscolor
          slot=${slot}
          style=${style}
        ></obi-threeway-digital-open>`;
    }
  }

  override get icon() {
    return html`${this.renderIcon('icon')}${this.renderIcon('icon-silhouette')}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-digital-threeway-valve': ObcDigitalThreewayValve;
  }
}
