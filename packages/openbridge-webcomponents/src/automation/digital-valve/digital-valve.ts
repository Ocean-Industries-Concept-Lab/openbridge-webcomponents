import {html, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-twoway-digital-open.js';
import '../../icons/icon-twoway-digital-closed.js';
import '../../icons/icon-twoway-digital-static.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButton} from '../automation-button/abstract-automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {
  AutomationButtonHandlePosition,
  AutomationButtonHandleSize,
  AutomationButtonOrientation,
} from '../automation-button/automation-button.js';
import {Direction} from '../../types.js';
import {ObcValveHandle} from '../automation-button/valve-handle.js';

export enum DigitalValveVariant {
  regular = 'regular',
  flat = 'flat',
}

export {ObcValveHandle};

/**
 * The two-way on/off icon, in both icon slots of the automation button.
 *
 * TODO(designer): a static closed valve keeps the closed icon: `twoway-digital-static-closed`
 * is a plain frame in the icons file, so `download:icons` cannot generate it until it is a component.
 */
export function digitalValveIcon(
  open: boolean,
  isStatic: boolean = false
): TemplateResult {
  if (open && isStatic) {
    return html` <obi-twoway-digital-static
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-twoway-digital-static>
      <obi-twoway-digital-static
        usecsscolor
        slot="icon-silhouette"
        style="display: block; line-height: 0;"
      ></obi-twoway-digital-static>`;
  }
  if (open) {
    return html` <obi-twoway-digital-open
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-twoway-digital-open>
      <obi-twoway-digital-open
        usecsscolor
        slot="icon-silhouette"
        style="display: block; line-height: 0;"
      ></obi-twoway-digital-open>`;
  }
  return html` <obi-twoway-digital-closed
      usecsscolor
      slot="icon"
      style="display: block; line-height: 0;"
    ></obi-twoway-digital-closed>
    <obi-twoway-digital-closed
      usecsscolor
      slot="icon-silhouette"
      style="display: block; line-height: 0;"
    ></obi-twoway-digital-closed>`;
}

/** The On / Off status row of a two-way on/off valve. */
export function digitalValveReadouts(
  open: boolean,
  showStatus: boolean,
  showStatusIcon: boolean
): AutomationButtonReadoutStack[] {
  if (!showStatus) {
    return [];
  }
  return open
    ? [{type: 'state-on', value: 'On', hasIcon: showStatusIcon}]
    : [{type: 'state-off', value: 'Off', hasIcon: showStatusIcon}];
}

/**
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 *
 * @property flowDirection - Direction the medium flows through the valve; the symbol turns with it.
 *   When unset, `vertical` picks `down`, otherwise `right`.
 * @property handle - The handle or actuator drawn on the valve. It sits on top when the flow is to the
 *   right and turns with the flow.
 * @property invertHandlePosition - Put the handle on the other side of the valve.
 * @property handleSize - Size of the handle: `small` draws it from the symbol's centre, for symbols without a button around them.
 * @availableWhen handleSize handle!=none
 * @stable
 */
@customElement('obc-digital-valve')
export class ObcDigitalValve extends ObcAbstractAutomationButton {
  @property({type: Boolean}) open: boolean = false;
  /**
   * Draw the valve for a vertical pipe; used only while `flowDirection` is unset.
   * @deprecated Use `flowDirection`.
   */
  @property({type: Boolean}) vertical: boolean = false;
  @property({type: String}) flowDirection: Direction | undefined = undefined;
  @property({type: String}) handle: ObcValveHandle = ObcValveHandle.none;
  @property({type: Boolean}) invertHandlePosition: boolean = false;
  @property({type: String}) handleSize: AutomationButtonHandleSize =
    AutomationButtonHandleSize.regular;

  @property({type: String}) variant: DigitalValveVariant =
    DigitalValveVariant.regular;

  override get _on(): boolean {
    return this.open;
  }

  get _flowDirection(): Direction {
    if (this.flowDirection) {
      return this.flowDirection;
    }
    if (this.vertical) {
      return Direction.Down;
    }
    return Direction.Right;
  }

  protected override get _isVertical(): boolean {
    return (
      this._flowDirection === Direction.Up ||
      this._flowDirection === Direction.Down
    );
  }

  override get _orientation() {
    switch (this._flowDirection) {
      case Direction.Right:
      case Direction.Left:
        return AutomationButtonOrientation.horizontal;
      case Direction.Up:
      case Direction.Down:
        return AutomationButtonOrientation.verticalLeft;
    }
  }

  override get _handlePosition(): AutomationButtonHandlePosition {
    if (this.handle !== ObcValveHandle.none) {
      if (this.invertHandlePosition) {
        switch (this._flowDirection) {
          case Direction.Right:
            return AutomationButtonHandlePosition.bottom;
          case Direction.Left:
            return AutomationButtonHandlePosition.top;
          case Direction.Up:
            return AutomationButtonHandlePosition.right;
          case Direction.Down:
            return AutomationButtonHandlePosition.left;
        }
      } else {
        switch (this._flowDirection) {
          case Direction.Right:
            return AutomationButtonHandlePosition.top;
          case Direction.Left:
            return AutomationButtonHandlePosition.bottom;
          case Direction.Up:
            return AutomationButtonHandlePosition.left;
          case Direction.Down:
            return AutomationButtonHandlePosition.right;
        }
      }
    }
    return AutomationButtonHandlePosition.none;
  }

  override get _handleSize(): AutomationButtonHandleSize {
    return this.handleSize;
  }

  override get _handle() {
    return this.renderValveHandle(this.handle);
  }

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    return digitalValveReadouts(
      this.open,
      this.showStatus,
      this.showStatusIcon
    );
  }

  override get icon() {
    return digitalValveIcon(this.open, this.static);
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'obc-digital-valve': ObcDigitalValve;
  }
}
