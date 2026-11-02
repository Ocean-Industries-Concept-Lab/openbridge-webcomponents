/**
 * The symbol and actuators of `norvar-valve`.
 *
 * Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.
 *
 * The art lives here and not in `src/icons` because the symbols are not in the
 * icons file. The triangles and the middle field are chosen separately, so an
 * alarm does not hide the valve's position.
 *
 * @module
 */
import {html, HTMLTemplateResult, svg, SVGTemplateResult} from 'lit';
import {AutomationButtonHandlePosition} from '../automation-button/automation-button.js';
import {letter, stem} from '../automation-button/valve-handle.js';

export enum NorvarValveActuator {
  none = 'none',
  manual = 'manual',
  motor = 'motor',
  pneumatic = 'pneumatic',
  hydraulic = 'hydraulic',
  solenoid = 'solenoid',
  control = 'control',
}

/** What the middle field of the symbol shows. */
export enum NorvarValvePosition {
  open = 'open',
  closed = 'closed',
  /** Named `NORVAR-valve-caution` in the design file; it draws the middle position. */
  middle = 'middle',
}

export interface NorvarValveSymbolState {
  position: NorvarValvePosition;
  alarm: boolean;
  isStatic: boolean;
}

export interface Paint {
  line: string;
  fill: string;
  border: string;
}

export const ON_PAINT: Paint = {
  line: 'var(--automation-symbol-on-line-color)',
  fill: 'var(--automation-symbol-on-background-color)',
  border: 'var(--automation-symbol-on-border-color)',
};

export const STATIC_PAINT: Paint = {
  line: 'var(--automation-symbol-static-line-color)',
  fill: 'var(--automation-symbol-static-background-color)',
  border: 'var(--automation-symbol-static-border-color)',
};

const TRIANGLES =
  'M2 6.92095C2 6.11195 2.91047 5.63774 3.57324 6.10161L10.8301 11.1807C11.3985 11.5788 11.3985 12.4213 10.8301 12.8194L3.57324 17.8985C2.91047 18.3623 2 17.8881 2 17.0791V6.92095ZM20.4268 6.10161C21.0895 5.63774 22 6.11195 22 6.92095V17.0791C22 17.8881 21.0895 18.3623 20.4268 17.8985L13.1699 12.8194C12.6015 12.4213 12.6015 11.5788 13.1699 11.1807L20.4268 6.10161Z';

function middleField(
  position: NorvarValvePosition,
  paint: Paint,
  isStatic: boolean
): SVGTemplateResult {
  switch (position) {
    case NorvarValvePosition.open:
      return svg`<rect
        x="6"
        y="8"
        width="12"
        height="8"
        fill=${isStatic ? paint.fill : 'var(--automation-symbol-running-background-color)'}
        stroke=${paint.border}
        vector-effect="non-scaling-stroke"
      />`;
    case NorvarValvePosition.closed:
      return svg`<rect
        x="8"
        y="6"
        width="8"
        height="12"
        rx="1"
        fill=${paint.fill}
        stroke=${paint.border}
        vector-effect="non-scaling-stroke"
      />`;
    case NorvarValvePosition.middle:
      return svg`<path
          d="M18 16V8L6 16H18Z"
          fill=${isStatic ? paint.fill : 'var(--alert-caution-color)'}
        />
        <path d="M6 8V16L18 8H6Z" fill=${paint.fill} />
        <path
          d="M6 16V8H18V16H6ZM18 8L6 16"
          stroke=${paint.border}
          vector-effect="non-scaling-stroke"
        />`;
  }
}

/**
 * The `icon` and `icon-silhouette` slot content.
 *
 * TODO(designer): the design file only draws the alarm on a closed valve, with
 * red triangles. An open or middle valve in alarm keeps its own middle field.
 */
export function norvarValveIcon({
  position,
  alarm,
  isStatic,
}: NorvarValveSymbolState): HTMLTemplateResult {
  const paint = isStatic ? STATIC_PAINT : ON_PAINT;
  const triangleFill =
    alarm && !isStatic ? 'var(--alert-alarm-color)' : paint.fill;
  const box = 'display: block; width: 100%; height: 100%;';
  return html`<svg
      slot="icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style=${box}
    >
      <path
        d=${TRIANGLES}
        fill=${triangleFill}
        stroke=${paint.border}
        vector-effect="non-scaling-stroke"
      />
      ${middleField(position, paint, isStatic)}
    </svg>
    <svg
      slot="icon-silhouette"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style=${box}
    >
      <path d=${TRIANGLES} />
      <rect
        x=${position === NorvarValvePosition.closed ? 8 : 6}
        y=${position === NorvarValvePosition.closed ? 6 : 8}
        width=${position === NorvarValvePosition.closed ? 8 : 12}
        height=${position === NorvarValvePosition.closed ? 12 : 8}
      />
    </svg>`;
}

function letterBox(
  text: string,
  paint: Paint,
  position: AutomationButtonHandlePosition
): SVGTemplateResult {
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
    ${letter(text, paint.border, position)}`;
}

function actuatorArt(
  actuator: NorvarValveActuator,
  paint: Paint,
  position: AutomationButtonHandlePosition
): SVGTemplateResult | false {
  switch (actuator) {
    case NorvarValveActuator.manual:
      return svg`${stem(paint.line, 8)}
        <path
          d="M18 7C18.5523 7 19 7.44772 19 8C19 8.55228 18.5523 9 18 9H6C5.44772 9 5 8.55228 5 8C5 7.44772 5.44772 7 6 7H18Z"
          fill=${paint.line}
        />`;
    case NorvarValveActuator.motor:
      return svg`${stem(paint.line, 16)}
        <circle
          cx="12"
          cy="8"
          r="7.5"
          fill=${paint.fill}
          stroke=${paint.border}
          vector-effect="non-scaling-stroke"
        />
        ${letter('M', paint.border, position)}`;
    case NorvarValveActuator.pneumatic:
      return letterBox('P', paint, position);
    case NorvarValveActuator.hydraulic:
      return letterBox('H', paint, position);
    case NorvarValveActuator.solenoid:
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
        />
        <path
          d="M9 12L15 4"
          stroke=${paint.border}
          vector-effect="non-scaling-stroke"
        />`;
    case NorvarValveActuator.control:
      return svg`${stem(paint.line, 13)}
        <circle
          cx="12"
          cy="8"
          r="5"
          fill=${paint.fill}
          stroke=${paint.border}
          vector-effect="non-scaling-stroke"
        />`;
    default:
      return false;
  }
}

/** The `handle` slot content, or `false` for `none`. The design draws one paint for every valve state. */
export function norvarActuatorIcon(
  actuator: NorvarValveActuator,
  position: AutomationButtonHandlePosition,
  isStatic: boolean
): HTMLTemplateResult | false {
  const art = actuatorArt(
    actuator,
    isStatic ? STATIC_PAINT : ON_PAINT,
    position
  );
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
