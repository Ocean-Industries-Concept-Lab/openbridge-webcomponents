/**
 * The symbols of `norvar-pump`, `norvar-motor` and `norvar-fan`.
 *
 * Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.
 *
 * Each device has one shape while it runs and another while it stands still
 * (the pump's arrow turns down, the motor's bar lies down, the fan's triangle
 * turns right). The state picks the colours. A flat symbol stands on a disc
 * that turns dark while the device is stopped.
 *
 * @module
 */
import {html, HTMLTemplateResult, svg, SVGTemplateResult} from 'lit';
import {
  PUMP_LARGE,
  PUMP_SMALL,
  SILHOUETTE_PAINT,
  roundFrame,
} from '../norvar-shared/norvar-draw.js';

/** Whether the device can be started, beyond running or standing still. */
export enum NorvarAvailability {
  available = 'available',
  /** Avstilt: taken out of operation. */
  disabled = 'disabled',
  /** Sikkerhetsbryter av / Ikke driftsklar: the safety switch is off, or the device is not ready. */
  safetyOff = 'safety-off',
}

export interface NorvarMotorizedShape {
  /** The symbol inside a button. */
  button: string;
  /** The smaller symbol on the disc of the flat variant. */
  flat: string;
}

export interface NorvarMotorizedArt {
  running: NorvarMotorizedShape;
  stopped: NorvarMotorizedShape;
}

/** Colours of one state: the disc of the flat variant and the symbol on it. */
interface Look {
  discFill: string;
  discBorder: string;
  fill: string;
  stroke: string;
  /** Draws the cross of a device whose safety switch is off. */
  crossed: boolean;
}

const ON_BORDER = 'var(--automation-symbol-on-border-color)';

const RUNNING_LOOK: Look = {
  discFill: 'var(--automation-symbol-on-background-color)',
  discBorder: ON_BORDER,
  fill: 'var(--automation-symbol-running-background-color)',
  stroke: 'var(--automation-symbol-running-border-color)',
  crossed: false,
};

/**
 * TODO(designer): the stopped motor outlines its disc in the off border
 * colour, the stopped pump and fan in the off background colour; all use the
 * background colour here.
 */
const STOPPED_LOOK: Look = {
  discFill: 'var(--automation-symbol-off-background-color)',
  discBorder: 'var(--automation-symbol-off-background-color)',
  fill: 'var(--automation-symbol-off-border-color)',
  stroke: 'var(--automation-symbol-off-background-color)',
  crossed: false,
};

const UNAVAILABLE_LOOK: Look = {
  discFill: 'var(--automation-symbol-static-background-color)',
  discBorder: ON_BORDER,
  fill: 'var(--automation-symbol-static-background-color)',
  stroke: ON_BORDER,
  crossed: false,
};

const ALARM_LOOK: Look = {
  discFill: 'var(--automation-symbol-on-background-color)',
  discBorder: ON_BORDER,
  fill: 'var(--alert-alarm-color)',
  stroke: ON_BORDER,
  crossed: false,
};

export interface NorvarMotorizedSymbolState {
  running: boolean;
  availability: NorvarAvailability;
  alarm: boolean;
  isStatic: boolean;
}

function look({
  running,
  availability,
  alarm,
  isStatic,
}: NorvarMotorizedSymbolState): Look {
  if (isStatic) {
    return UNAVAILABLE_LOOK;
  }
  if (alarm) {
    return ALARM_LOOK;
  }
  if (availability !== NorvarAvailability.available) {
    return {
      ...UNAVAILABLE_LOOK,
      crossed: availability === NorvarAvailability.safetyOff,
    };
  }
  return running ? RUNNING_LOOK : STOPPED_LOOK;
}

/** The shape a device shows: unavailable devices stand still whatever `running` says. */
function shape(
  art: NorvarMotorizedArt,
  {running, availability, alarm}: NorvarMotorizedSymbolState
): NorvarMotorizedShape {
  const unavailable = !alarm && availability !== NorvarAvailability.available;
  return running && !unavailable ? art.running : art.stopped;
}

const CROSS_BUTTON = 'M2 2L22 22M2 22L22 2';
const CROSS_FLAT = 'M4 4L20 20M4 20L20 4';

function cross(d: string, width: number, color: string): SVGTemplateResult {
  return svg`<path
    d=${d}
    stroke=${color}
    stroke-width=${width}
    stroke-linecap="round"
    vector-effect="non-scaling-stroke"
  />`;
}

function symbol(d: string, {fill, stroke}: Look): SVGTemplateResult {
  return svg`<path
    d=${d}
    fill=${fill}
    stroke=${stroke}
    stroke-linecap="round"
    vector-effect="non-scaling-stroke"
  />`;
}

/** The `icon` slot content, and on a flat symbol the `icon-silhouette` too. */
export function norvarMotorizedIcon(
  art: NorvarMotorizedArt,
  flat: boolean,
  state: NorvarMotorizedSymbolState
): HTMLTemplateResult {
  const box = 'display: block; width: 100%; height: 100%;';
  const colors = look(state);
  const {button, flat: mark} = shape(art, state);
  const drawing = flat
    ? svg`${roundFrame({
        line: colors.stroke,
        fill: colors.discFill,
        border: colors.discBorder,
      })}${symbol(mark, colors)}${
        colors.crossed ? cross(CROSS_FLAT, 1, ON_BORDER) : ''
      }`
    : svg`${symbol(button, colors)}${
        colors.crossed ? cross(CROSS_BUTTON, 2, ON_BORDER) : ''
      }`;
  return html`<svg
      slot="icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style=${box}
    >
      ${drawing}
    </svg>
    ${
      flat
        ? html`<svg
            slot="icon-silhouette"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style=${box}
          >
            ${roundFrame(SILHOUETTE_PAINT)}
          </svg>`
        : ''
    }`;
}

export const PUMP_ART: NorvarMotorizedArt = {
  running: {
    button:
      'M15.1753 4.20029L21.9424 11.9341C21.9754 11.9719 21.9754 12.0281 21.9424 12.0659L15.1753 19.7997C15.1145 19.8692 15 19.8262 15 19.7339V15.6C15 15.5448 14.9552 15.5 14.9 15.5H2.1C2.04477 15.5 2 15.4552 2 15.4V8.6C2 8.54477 2.04477 8.5 2.1 8.5H14.9C14.9552 8.5 15 8.45523 15 8.4V4.26614C15 4.17381 15.1145 4.1308 15.1753 4.20029Z',
    flat: 'M14.1768 6.21219L18.9467 11.936C18.9776 11.9731 18.9776 12.0269 18.9467 12.064L14.1768 17.7878C14.1169 17.8597 14 17.8173 14 17.7238V14.6C14 14.5448 13.9552 14.5 13.9 14.5H5.1C5.04477 14.5 5 14.4552 5 14.4V9.6C5 9.54477 5.04477 9.5 5.1 9.5H13.9C13.9552 9.5 14 9.45523 14 9.4V6.27621C14 6.18268 14.1169 6.14033 14.1768 6.21219Z',
  },
  stopped: {
    button:
      'M19.7997 15.1753L12.0658 21.9424C12.0281 21.9754 11.9719 21.9754 11.9341 21.9424L4.20029 15.1753C4.1308 15.1145 4.17381 15 4.26614 15L8.4 15C8.45523 15 8.5 14.9552 8.5 14.9L8.5 2.1C8.5 2.04477 8.54477 2 8.6 2L15.4 2C15.4552 2 15.5 2.04477 15.5 2.1L15.5 14.9C15.5 14.9552 15.5448 15 15.6 15L19.7339 15C19.8262 15 19.8692 15.1145 19.7997 15.1753Z',
    flat: 'M17.7878 14.1768L12.064 18.9467C12.0269 18.9776 11.9731 18.9776 11.936 18.9467L6.21219 14.1768C6.14033 14.1169 6.18267 14 6.2762 14L9.4 14C9.45523 14 9.5 13.9552 9.5 13.9L9.5 5.1C9.5 5.04477 9.54477 5 9.6 5L14.4 5C14.4552 5 14.5 5.04477 14.5 5.1L14.5 13.9C14.5 13.9552 14.5448 14 14.6 14L17.7238 14C17.8173 14 17.8597 14.1169 17.7878 14.1768Z',
  },
};

export const MOTOR_ART: NorvarMotorizedArt = {
  running: {
    button:
      'M16 3.1L16 20.9C16 20.9552 15.9552 21 15.9 21L8.1 21C8.04477 21 8 20.9552 8 20.9L8 3.1C8 3.04477 8.04477 3 8.1 3L15.9 3C15.9552 3 16 3.04477 16 3.1Z',
    flat: 'M15 5.1L15 18.9C15 18.9552 14.9552 19 14.9 19L9.1 19C9.04477 19 9 18.9552 9 18.9L9 5.1C9 5.04477 9.04477 5 9.1 5L14.9 5C14.9552 5 15 5.04477 15 5.1Z',
  },
  stopped: {
    button:
      'M3.1 8H20.9C20.9552 8 21 8.04477 21 8.1V15.9C21 15.9552 20.9552 16 20.9 16H3.1C3.04477 16 3 15.9552 3 15.9V8.1C3 8.04477 3.04477 8 3.1 8Z',
    flat: 'M5.1 9H18.9C18.9552 9 19 9.04477 19 9.1V14.9C19 14.9552 18.9552 15 18.9 15H5.1C5.04477 15 5 14.9552 5 14.9V9.1C5 9.04477 5.04477 9 5.1 9Z',
  },
};

export const FAN_ART: NorvarMotorizedArt = {
  running: {
    button:
      'M3.80425 18L20.1958 18C20.9812 18 21.46 17.1361 21.0438 16.47L12.848 3.3568C12.4563 2.73013 11.5437 2.73013 11.152 3.3568L2.95625 16.47C2.53997 17.136 3.01881 18 3.80425 18Z',
    flat: 'M6.92066 16L17.0793 16C17.8884 16 18.3625 15.0893 17.8986 14.4265L12.8192 7.17033C12.4211 6.60161 11.5789 6.60162 11.1808 7.17033L6.10142 14.4265C5.63748 15.0893 6.11163 16 6.92066 16Z',
  },
  stopped: {button: PUMP_LARGE, flat: PUMP_SMALL},
};
