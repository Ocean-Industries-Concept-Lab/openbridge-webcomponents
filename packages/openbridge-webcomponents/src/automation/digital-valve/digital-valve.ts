import {html, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-twoway-digital-open.js';
import '../../icons/icon-twoway-digital-closed.js';
import {customElement} from '../../decorator.js';
import {ObcAbstractAutomationButton} from '../automation-button/abstract-automation-button.js';
import {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {
  AutomationButtonHandlePosition,
  AutomationButtonOrientation,
  AutomationButtonReadoutPosition,
} from '../automation-button/automation-button.js';
import { Direction } from '../../types.js';

export enum DigitalValveVariant {
  regular = 'regular',
  flat = 'flat',
}

export enum ObcValveHandle {
  none = 'none',
  manual = 'manual',
}

/** The two-way on/off icon, in both icon slots of the automation button. */
export function digitalValveIcon(open: boolean): TemplateResult {
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
  showStatus: boolean
): AutomationButtonReadoutStack[] {
  if (!showStatus) {
    return [];
  }
  return open
    ? [{type: 'state-on', value: 'On', hasIcon: true}]
    : [{type: 'state-off', value: 'Off', hasIcon: true}];
}

/**
 * @ignition-base-height: 82px
 * @ignition-base-width: 66px
 * @ignition-center
 * @stable
 */
@customElement('obc-digital-valve')
export class ObcDigitalValve extends ObcAbstractAutomationButton {
  @property({type: Boolean}) open: boolean = false;
  // @deprecated - use flowDirection instead
  @property({type: Boolean}) vertical: boolean = false;
  // Standard flow direction through the valve.
  @property({type: String}) flowDirection: Direction | undefined = undefined;
  @property({type: String}) handle: ObcValveHandle = ObcValveHandle.none;
  // The handle is on top if the flow is to the right, and is rotated with the flow. The position can be inverted with `invertHandlePosition`.
  @property({type: Boolean}) invertHandlePosition: boolean = false;

  @property({type: String}) variant: DigitalValveVariant =
    DigitalValveVariant.regular;

  override get _on(): boolean {
    return this.open;
  }

  override get _readoutPosition() {
    if (this.readoutPosition) {
      return this.readoutPosition;
    }
    if (this.invertHandlePosition) {
      switch (this._flowDirection) {
        case Direction.Right:
          return AutomationButtonReadoutPosition.top;
        case Direction.Left:
          return AutomationButtonReadoutPosition.bottom;
        case Direction.Up:
          return AutomationButtonReadoutPosition.left;
        case Direction.Down:
          return AutomationButtonReadoutPosition.right;
      }
    }
    switch (this._flowDirection) {
      case Direction.Right:
        return AutomationButtonReadoutPosition.bottom;
      case Direction.Left:
        return AutomationButtonReadoutPosition.top;
      case Direction.Up:
        return AutomationButtonReadoutPosition.right;
      case Direction.Down:
        return AutomationButtonReadoutPosition.left;
    }
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
    if (this.handle === ObcValveHandle.manual) {
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

  override get _handle() {
    if (this.handle !== ObcValveHandle.manual) {
      return false;
    }
    return html`<svg
      slot="handle"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 8H18"
        stroke-width="2"
        stroke-linecap="round"
        stroke="var(--element-active-color)"
        vector-effect="non-scaling-stroke"
      />
      <path
        d="M12 24V8"
        stroke="var(--element-active-color)"
        vector-effect="non-scaling-stroke"
      />
    </svg>`;
  }

  override get extraReadouts(): AutomationButtonReadoutStack[] {
    return digitalValveReadouts(this.open, this.showStatus);
  }

  override get icon() {
    return digitalValveIcon(this.open);
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'obc-digital-valve': ObcDigitalValve;
  }
}
