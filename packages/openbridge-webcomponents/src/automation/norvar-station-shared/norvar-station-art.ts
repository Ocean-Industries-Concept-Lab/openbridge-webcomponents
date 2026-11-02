/**
 * The symbols of `norvar-water-station` and `norvar-wastewater-station`.
 *
 * Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.
 *
 * The art lives here and not in `src/icons` because the symbols are not in the
 * icons file. Each station has one drawing for a button and one for the flat
 * variant, where a frame stands in for the button.
 *
 * @module
 */
import {html, HTMLTemplateResult, svg, SVGTemplateResult} from 'lit';
import {Paint} from '../norvar-valve/norvar-valve-art.js';

export enum NorvarWaterStationType {
  reservoir = 'reservoir',
  pumpStation = 'pump-station',
  treatmentPlant = 'treatment-plant',
  meteringStation = 'metering-station',
  reductionChamber = 'reduction-chamber',
  dam = 'dam',
  overflow = 'overflow',
  manhole = 'manhole',
}

export enum NorvarWastewaterStationType {
  detentionBasin = 'detention-basin',
  pumpStation = 'pump-station',
  treatmentPlant = 'treatment-plant',
  meteringStation = 'metering-station',
  discharge = 'discharge',
  overflow = 'overflow',
  manhole = 'manhole',
}

/** The operating state from the report. An alarm comes from `alert`, and `static` draws the medium instead. */
export enum NorvarStationState {
  ready = 'ready',
  running = 'running',
  unmonitored = 'unmonitored',
}

/** Symbol colours in one tone on the symbol background, as the report draws them. */
export function norvarStationPaint(color: string): Paint {
  return {
    line: color,
    border: color,
    fill: 'var(--automation-symbol-on-background-color)',
  };
}

export const NORVAR_RUNNING_COLOR =
  'var(--automation-symbol-running-background-color)';
export const NORVAR_ALARM_COLOR = 'var(--alert-alarm-color)';
export const NORVAR_UNMONITORED_COLOR =
  'var(--automation-symbol-static-background-color)';

type Draw = (paint: Paint) => SVGTemplateResult;

export interface NorvarStationArt {
  /** The symbol inside a button. */
  button: Draw;
  /** The outline of the flat symbol, also used for its silhouette. */
  frame: Draw;
  /** What the flat symbol draws inside `frame`. */
  mark: Draw;
}

const SILHOUETTE_PAINT: Paint = {
  line: 'inherit',
  fill: 'inherit',
  border: 'inherit',
};

const PUMP_LARGE =
  'M5 3.80425V20.1958C5 20.9812 5.86395 21.46 6.53 21.0438L19.6432 12.848C20.2699 12.4563 20.2699 11.5437 19.6432 11.152L6.53 2.95625C5.86395 2.53997 5 3.01881 5 3.80425Z';
const PUMP_SMALL =
  'M8 6.92066V17.0793C8 17.8884 8.91069 18.3625 9.57346 17.8986L16.8297 12.8192C17.3984 12.4211 17.3984 11.5789 16.8297 11.1808L9.57346 6.10142C8.91069 5.63748 8 6.11163 8 6.92066Z';
const METER_LARGE =
  'M11.9999 16C14.7489 16 17.2814 16.925 19.3045 18.4802C19.9899 19.0071 19.5694 20 18.7048 20H5.29487C4.43036 20 4.00983 19.0072 4.69522 18.4803C6.71829 16.925 9.25081 16 11.9999 16ZM18.7048 4C19.5694 4 19.9899 4.99286 19.3045 5.51975C17.2814 7.07496 14.7489 8 11.9999 8C9.25081 7.99997 6.71829 7.07496 4.69523 5.51974C4.00983 4.99284 4.43036 4 5.29487 4H18.7048Z';
const METER_WATER_FLAT =
  'M11.9999 17C15.8193 17 19.2198 18.7857 21.4169 21.5667C21.8944 22.1711 21.4267 23 20.6564 23H3.34331C2.57307 23 2.10535 22.1711 2.58284 21.5667C4.77993 18.7857 8.18045 17 11.9999 17ZM20.6564 1C21.4267 1 21.8944 1.82889 21.4169 2.43328C19.2198 5.21428 15.8193 7 11.9999 7C8.18045 6.99996 4.77993 5.21428 2.58284 2.43327C2.10535 1.82888 2.57307 1 3.34331 1H20.6564Z';
const METER_WASTEWATER_FLAT =
  'M11.9999 15C14.6045 15 16.9758 15.9967 18.7553 17.6284C18.9142 17.7741 18.9999 17.9818 18.9999 18.1974C18.9999 18.6407 18.6405 19 18.1973 19H5.80246C5.35921 19 4.99988 18.6407 4.99988 18.1974C4.99988 17.9818 5.08555 17.7741 5.24444 17.6284C7.0239 15.9967 9.39521 15 11.9999 15ZM18.9999 5.80192C18.9999 6.01731 18.9143 6.22481 18.7555 6.3704C16.976 8.00258 14.6049 9 11.9999 9C9.39486 8.99997 7.0237 8.00262 5.2442 6.3704C5.08547 6.22481 4.99988 6.01731 4.99988 5.80192C4.99988 5.35903 5.35891 5 5.8018 5H18.198C18.6408 5 18.9999 5.35903 18.9999 5.80192Z';
const REDUCTION_BUTTON =
  'M19.9999 2C20.6544 2 21.2337 2.31575 21.5986 2.80176L11.9999 22L2.40031 2.80176C2.76516 2.31549 3.34521 2 3.99992 2H19.9999Z';
const REDUCTION_FLAT =
  'M22.9999 0C23.3269 0 23.6163 0.15772 23.7988 0.400391L11.9999 24L0.201096 0.400391C0.383537 0.157698 0.672932 2.4346e-05 0.999924 0H22.9999Z';
const DAM_BUTTON =
  'M21.0005 11.3594C19.3806 14.6978 15.9594 17 11.9995 17C8.04119 17 4.62115 14.6996 3.00049 11.3633V8H21.0005V11.3594Z';
const DAM_FLAT =
  'M23 8C23.3082 8 23.5832 8.1401 23.7666 8.35938C22.6704 13.8568 17.8197 18 12 18C6.18026 18 1.32961 13.8568 0.233398 8.35938C0.416836 8.1401 0.691753 8 1 8H23Z';
const WATER_OVERFLOW_BUTTON =
  'M19.9999 2C21.1045 2 21.9999 2.89543 21.9999 4V20C21.9999 20.5523 21.7759 21.0521 21.414 21.4141L2.58586 2.58594C2.94779 2.22401 3.44764 2 3.99992 2H19.9999Z';
const WATER_OVERFLOW_FLAT =
  'M23 0C23.5523 2.57702e-07 24 0.447715 24 1V23C24 23.2689 23.8924 23.5117 23.7197 23.6914L0.307617 0.279297C0.48734 0.106594 0.731065 7.84301e-09 1 0H23Z';
const WASTEWATER_OVERFLOW_BUTTON =
  'M12.0002 3.00026C16.9706 3.00045 21.0002 7.02981 21.0002 12.0003C21.0001 15.1252 19.4064 17.877 16.9885 19.4905C16.7215 13.0995 11.4568 8.00038 5.00022 8.00026C4.63324 8.00026 4.26993 8.01684 3.91135 8.04909C5.37458 5.05911 8.44704 3.00026 12.0002 3.00026Z';
const WASTEWATER_OVERFLOW_FLAT =
  'M12.001 3C16.9715 3 21.001 7.02944 21.001 12C21.001 14.6575 19.8482 17.0449 18.0166 18.6924C17.3651 12.6801 12.2744 8.0001 6.0889 8C5.3192 8 4.5663 8.0725 3.8369 8.2109C5.2674 5.134 8.3843 3 12.001 3Z';

const filled =
  (d: string): Draw =>
  ({line}) =>
    svg`<path d=${d} fill=${line} />`;

const square =
  (size: number, radius: number): Draw =>
  ({line}) =>
    svg`<rect
      x=${12 - size / 2}
      y=${12 - size / 2}
      width=${size}
      height=${size}
      rx=${radius}
      fill=${line}
    />`;

const dot =
  (radius: number): Draw =>
  ({line}) =>
    svg`<circle cx="12" cy="12" r=${radius} fill=${line} />`;

const ring =
  (radius: number, width: number): Draw =>
  ({line}) =>
    svg`<circle
      cx="12"
      cy="12"
      r=${radius}
      stroke=${line}
      stroke-width=${width}
      vector-effect="non-scaling-stroke"
    />`;

const frameRect = (inset: number, radius: number): Draw => {
  return ({fill, border}) =>
    svg`<rect
      x=${inset}
      y=${inset}
      width=${24 - 2 * inset}
      height=${24 - 2 * inset}
      rx=${radius}
      fill=${fill}
      stroke=${border}
      vector-effect="non-scaling-stroke"
    />`;
};

const roundFrame: Draw = ({fill, border}) =>
  svg`<circle
    cx="12"
    cy="12"
    r="11.5"
    fill=${fill}
    stroke=${border}
    vector-effect="non-scaling-stroke"
  />`;

/** Frame of the symbols with room around their mark. */
const squareFrame = frameRect(1.5, 1.5);
/** Frame of the symbols whose mark runs into the corners. */
const fullSquareFrame = frameRect(0.5, 0.5);

/** A filled mark on the outline of a square, the button drawing of three water stations. */
const inSquare =
  (d: string): Draw =>
  ({line, border}) =>
    svg`<rect
      x="2.5"
      y="2.5"
      width="19"
      height="19"
      rx="1.5"
      stroke=${border}
      vector-effect="non-scaling-stroke"
    />
    <path d=${d} fill=${line} />`;

const RESERVOIR_BUTTON = square(16, 1);
const TREATMENT_BUTTON = dot(9);
const MANHOLE_BUTTON = ring(3.25, 1.5);
const MANHOLE_MARK = ring(2.5, 1);

export const WATER_STATION_ART: Record<
  NorvarWaterStationType,
  NorvarStationArt
> = {
  [NorvarWaterStationType.reservoir]: {
    button: RESERVOIR_BUTTON,
    frame: squareFrame,
    mark: square(10, 1),
  },
  [NorvarWaterStationType.pumpStation]: {
    button: filled(PUMP_LARGE),
    frame: squareFrame,
    mark: filled(PUMP_SMALL),
  },
  [NorvarWaterStationType.treatmentPlant]: {
    button: TREATMENT_BUTTON,
    frame: squareFrame,
    mark: dot(6),
  },
  [NorvarWaterStationType.meteringStation]: {
    button: filled(METER_LARGE),
    frame: squareFrame,
    mark: filled(METER_WATER_FLAT),
  },
  [NorvarWaterStationType.reductionChamber]: {
    button: inSquare(REDUCTION_BUTTON),
    frame: fullSquareFrame,
    mark: filled(REDUCTION_FLAT),
  },
  [NorvarWaterStationType.dam]: {
    button: inSquare(DAM_BUTTON),
    frame: fullSquareFrame,
    mark: filled(DAM_FLAT),
  },
  [NorvarWaterStationType.overflow]: {
    button: inSquare(WATER_OVERFLOW_BUTTON),
    frame: fullSquareFrame,
    mark: filled(WATER_OVERFLOW_FLAT),
  },
  // TODO(designer): the flat manhole has a round frame, unlike every other water station.
  [NorvarWaterStationType.manhole]: {
    button: MANHOLE_BUTTON,
    frame: roundFrame,
    mark: MANHOLE_MARK,
  },
};

export const WASTEWATER_STATION_ART: Record<
  NorvarWastewaterStationType,
  NorvarStationArt
> = {
  [NorvarWastewaterStationType.detentionBasin]: {
    button: RESERVOIR_BUTTON,
    frame: roundFrame,
    mark: square(10, 1),
  },
  [NorvarWastewaterStationType.pumpStation]: {
    button: filled(PUMP_LARGE),
    frame: roundFrame,
    mark: filled(PUMP_SMALL),
  },
  [NorvarWastewaterStationType.treatmentPlant]: {
    button: TREATMENT_BUTTON,
    frame: roundFrame,
    mark: dot(6),
  },
  [NorvarWastewaterStationType.meteringStation]: {
    button: filled(METER_LARGE),
    frame: roundFrame,
    mark: filled(METER_WASTEWATER_FLAT),
  },
  [NorvarWastewaterStationType.discharge]: {
    button: dot(4),
    frame: roundFrame,
    mark: dot(3),
  },
  [NorvarWastewaterStationType.overflow]: {
    button: (paint) =>
      svg`<path d=${WASTEWATER_OVERFLOW_BUTTON} fill=${paint.line} />
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke=${paint.border}
          vector-effect="non-scaling-stroke"
        />`,
    frame: roundFrame,
    mark: filled(WASTEWATER_OVERFLOW_FLAT),
  },
  [NorvarWastewaterStationType.manhole]: {
    button: MANHOLE_BUTTON,
    frame: roundFrame,
    mark: MANHOLE_MARK,
  },
};

/** The `icon` slot content, and on a flat symbol the `icon-silhouette` too. */
export function norvarStationIcon(
  art: NorvarStationArt,
  flat: boolean,
  paint: Paint
): HTMLTemplateResult {
  const box = 'display: block; width: 100%; height: 100%;';
  return html`<svg
      slot="icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style=${box}
    >
      ${flat ? svg`${art.frame(paint)}${art.mark(paint)}` : art.button(paint)}
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
            ${art.frame(SILHOUETTE_PAINT)}
          </svg>`
        : ''
    }`;
}
