/**
 * The handles and actuators a valve can carry, drawn for the `handle` slot of
 * `obc-automation-button`.
 *
 * Each one is drawn for the `top` side in a 24 × 24 box, and the button turns
 * the box to the handle's side. A regular handle's stem ends at the bottom edge
 * of the box, a small one's in the middle of it. The colours follow the state of
 * the device: `on` is outlined, `off` and `static` are filled.
 *
 * @module
 */
import {html, HTMLTemplateResult, svg, SVGTemplateResult} from 'lit';
import {
  AutomationButtonHandlePosition,
  AutomationButtonHandleSize,
} from './automation-button.js';

export enum ObcValveHandle {
  none = 'none',
  manualAveva = 'manual-aveva',
  manual = 'manual',
  leverOperator = 'lever-operator',
  pneumatic = 'pneumatic',
  electroHydraulic = 'electro-hydraulic',
  piston = 'piston',
  solenoid = 'solenoid',
  motor = 'motor',
  spring = 'spring',
}

export enum ValveHandleState {
  on = 'on',
  off = 'off',
  static = 'static',
}

interface HandlePaint {
  line: string;
  fill: string;
  border: string;
}

const PAINT: Record<ValveHandleState, HandlePaint> = {
  [ValveHandleState.on]: {
    line: 'var(--automation-symbol-on-line-color)',
    fill: 'var(--automation-symbol-on-background-color)',
    border: 'var(--automation-symbol-on-border-color)',
  },
  [ValveHandleState.off]: {
    line: 'var(--automation-symbol-off-line-color)',
    fill: 'var(--automation-symbol-off-background-color)',
    border: 'var(--automation-symbol-off-border-color)',
  },
  [ValveHandleState.static]: {
    line: 'var(--automation-symbol-static-line-color)',
    fill: 'var(--automation-symbol-static-background-color)',
    border: 'var(--automation-symbol-static-border-color)',
  },
};

const UPRIGHT_ANGLE: Record<string, number> = {
  [AutomationButtonHandlePosition.right]: -90,
  [AutomationButtonHandlePosition.bottom]: 180,
  [AutomationButtonHandlePosition.left]: 90,
};

export function stem(
  color: string,
  top: number,
  bottom = 24
): SVGTemplateResult {
  return svg`<path
    d="M12 ${bottom}V${top}"
    stroke-linecap="round"
    stroke=${color}
    vector-effect="non-scaling-stroke"
  />`;
}

/** The letter stays upright on every side, so it can be read when the handle turns. */
export function letter(
  text: string,
  color: string,
  position: AutomationButtonHandlePosition
): SVGTemplateResult {
  return svg`<text
    x="12"
    y="8"
    text-anchor="middle"
    dominant-baseline="central"
    fill=${color}
    transform="rotate(${UPRIGHT_ANGLE[position] ?? 0} 12 8)"
    style="font-family: var(--global-typography-font-family); font-size: var(--typography-primitives-font-size-071); font-weight: var(--typography-primitives-font-weight-600);"
  >
    ${text}
  </text>`;
}

function circleBody(paint: HandlePaint): SVGTemplateResult {
  return svg`<circle
    cx="12"
    cy="8"
    r="7.5"
    fill=${paint.fill}
    stroke=${paint.border}
    vector-effect="non-scaling-stroke"
  />`;
}

function regularArt(
  handle: ObcValveHandle,
  paint: HandlePaint,
  position: AutomationButtonHandlePosition
): SVGTemplateResult | false {
  switch (handle) {
    case ObcValveHandle.manualAveva:
      return svg`${stem(paint.line, 8)}
        <path
          d="M17 13V9H7C5.89543 9 5 8.10457 5 7V3C5 2.44772 5.44772 2 6 2C6.55228 2 7 2.44772 7 3V7H17C18.1046 7 19 7.89543 19 9V13C19 13.5523 18.5523 14 18 14C17.4477 14 17 13.5523 17 13Z"
          fill=${paint.line}
        />`;
    case ObcValveHandle.manual:
      return svg`${stem(paint.line, 8)}
        <path
          d="M18 7C18.5523 7 19 7.44772 19 8C19 8.55228 18.5523 9 18 9H6C5.44772 9 5 8.55228 5 8C5 7.44772 5.44772 7 6 7H18Z"
          fill=${paint.line}
        />`;
    case ObcValveHandle.leverOperator:
      return svg`<path
        d="M20 8L13 8C12.4477 8 12 8.44771 12 9L12 20"
        stroke-width="2"
        stroke-linecap="round"
        stroke=${paint.line}
        vector-effect="non-scaling-stroke"
      />`;
    case ObcValveHandle.pneumatic:
      return svg`<defs>
          <path
            id="actuator"
            d="M21 12C21.5523 12 22.0052 11.5512 21.95 11.0017C21.8526 10.0309 21.6135 9.07783 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C4.00035 5.85752 3.26375 6.95991 2.7612 8.17317C2.38648 9.07783 2.14736 10.0309 2.04996 11.0017C1.99482 11.5512 2.44772 12 3 12L12 12H21Z"
          />
          <mask id="actuator-inside" fill="white">
            <use href="#actuator" />
          </mask>
        </defs>
        ${stem(paint.line, 12)}
        <use href="#actuator" fill=${paint.fill} />
        <use
          href="#actuator"
          stroke-width="2"
          stroke=${paint.border}
          mask="url(#actuator-inside)"
          vector-effect="non-scaling-stroke"
        />`;
    case ObcValveHandle.electroHydraulic:
      return svg`${stem(paint.line, 12)}
        <rect
          x="4"
          y="4"
          width="16"
          height="8"
          rx="1"
          fill=${paint.fill}
          stroke=${paint.border}
          vector-effect="non-scaling-stroke"
        />`;
    case ObcValveHandle.piston:
      return svg`${stem(paint.line, 13)}
        <rect
          x="4.5"
          y="3.5"
          width="15"
          height="9"
          rx="0.5"
          fill=${paint.fill}
          stroke=${paint.border}
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M4 8H20"
          stroke=${paint.border}
          vector-effect="non-scaling-stroke"
        />`;
    case ObcValveHandle.solenoid:
      return svg`${stem(paint.line, 15)}
        <rect
          x="5.5"
          y="1.5"
          width="13"
          height="13"
          rx="1.5"
          fill=${paint.fill}
          stroke=${paint.border}
          vector-effect="non-scaling-stroke"
        />
        ${letter('S', paint.border, position)}`;
    case ObcValveHandle.motor:
      return svg`${stem(paint.line, 16)} ${circleBody(paint)}
      ${letter('M', paint.border, position)}`;
    case ObcValveHandle.spring:
      return svg`<path
        d="M12 24V16.0781C12 16.0322 12.0312 15.9922 12.0757 15.9811L15.6119 15.097C15.7129 15.0718 15.7129 14.9282 15.6119 14.903L8.38806 13.097C8.28706 13.0718 8.28706 12.9282 8.38806 12.903L15.6119 11.097C15.7129 11.0718 15.7129 10.9282 15.6119 10.903L8.38806 9.09701C8.28706 9.07177 8.28706 8.92823 8.38806 8.90299L15.6119 7.09701C15.7129 7.07177 15.7129 6.92823 15.6119 6.90299L8.38806 5.09701C8.28706 5.07176 8.28706 4.92823 8.38806 4.90299L16 2.99999"
        stroke-miterlimit="10.4334"
        stroke-linecap="round"
        stroke=${paint.line}
        vector-effect="non-scaling-stroke"
      />`;
    default:
      return false;
  }
}

function smallArt(
  handle: ObcValveHandle,
  paint: HandlePaint
): SVGTemplateResult | false {
  const {line} = paint;
  switch (handle) {
    case ObcValveHandle.manualAveva:
      return svg`${stem(line, 4, 12)}
        <path
          d="M8.25 4.75L14.25 4.75V6.5C14.25 6.91421 14.5858 7.25 15 7.25C15.4142 7.25 15.75 6.91421 15.75 6.5V3.25L9.75 3.25L9.75 1.5C9.75 1.08579 9.41421 0.75 9 0.75C8.58579 0.75 8.25 1.08579 8.25 1.5L8.25 4.75Z"
          fill=${line}
        />`;
    case ObcValveHandle.manual:
      return svg`${stem(line, 4, 12)}
        <path
          d="M8 2L16 2C16.5523 2 17 2.44772 17 3C17 3.55228 16.5523 4 16 4L8 4C7.44771 4 7 3.55228 7 3C7 2.44771 7.44771 2 8 2Z"
          fill=${line}
        />`;
    case ObcValveHandle.leverOperator:
      return svg`<path
          d="M11.5 12C11.5 12.2761 11.7239 12.5 12 12.5C12.2761 12.5 12.5 12.2761 12.5 12H12H11.5ZM12 2.99998H11.5V12H12H12.5V2.99998H12Z"
          fill=${line}
        />
        <path
          d="M17.0004 3C17.4146 3 17.7504 3.33579 17.7504 3.75C17.7504 4.16421 17.4146 4.5 17.0004 4.5H12V3H17.0004Z"
          fill=${line}
        />`;
    case ObcValveHandle.pneumatic:
      return svg`${stem(line, 5, 12)}
        <path
          d="M16 5C16 3.93913 15.5786 2.92172 14.8284 2.17157C14.0783 1.42143 13.0609 1 12 1C10.9391 1 9.92172 1.42143 9.17157 2.17157C8.42143 2.92172 8 3.93913 8 5L16 5Z"
          fill=${line}
        />`;
    case ObcValveHandle.electroHydraulic:
      return svg`${stem(line, 5, 12)}
        <path
          d="M8 2C8 1.44772 8.44772 1 9 1H15C15.5523 1 16 1.44772 16 2V4C16 4.55228 15.5523 5 15 5H9C8.44772 5 8 4.55228 8 4V2Z"
          fill=${line}
        />`;
    case ObcValveHandle.piston:
      return svg`${stem(line, 7, 12)}
        <path
          d="M15 1H9C8.44772 1 8 1.44772 8 2V3H16V2C16 1.44772 15.5523 1 15 1Z"
          fill=${line}
        />
        <path
          d="M9 7H15C15.5523 7 16 6.55228 16 6V5H8V6C8 6.55228 8.44772 7 9 7Z"
          fill=${line}
        />`;
    case ObcValveHandle.solenoid:
      return svg`${stem(line, 7, 12)}
        <path
          d="M9 2C9 1.44772 9.44772 1 10 1H14C14.5523 1 15 1.44772 15 2V6C15 6.55228 14.5523 7 14 7H10C9.44772 7 9 6.55228 9 6V2Z"
          fill=${line}
        />`;
    case ObcValveHandle.motor:
      return svg`${stem(line, 7, 12)}
        <rect x="9" y="1" width="6" height="6" rx="3" fill=${line} />`;
    case ObcValveHandle.spring:
      return svg`<path
        d="M12 12V9L14 8L10 6.5L14 5L10 3.5L14 2"
        stroke-linecap="round"
        stroke=${line}
        vector-effect="non-scaling-stroke"
      />`;
    default:
      return false;
  }
}

/** The `handle` slot content, or `false` for `none`. */
export function valveHandleIcon(
  handle: ObcValveHandle,
  position: AutomationButtonHandlePosition,
  state: ValveHandleState = ValveHandleState.on,
  size: AutomationButtonHandleSize = AutomationButtonHandleSize.regular
): HTMLTemplateResult | false {
  const art =
    size === AutomationButtonHandleSize.small
      ? smallArt(handle, PAINT[state])
      : regularArt(handle, PAINT[state], position);
  if (art === false) {
    return false;
  }
  return html`<svg
    slot="handle"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    ${art}
  </svg>`;
}
