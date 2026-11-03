/**
 * The symbols of `norvar-water-station`, `norvar-wastewater-station` and
 * `norvar-map-symbol`.
 *
 * Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.
 *
 * The art lives here and not in `src/icons` because the symbols are not in the
 * icons file. Each symbol has one drawing for a button and one for the flat
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

export enum NorvarMapSymbolType {
  culvertWithGrate = 'culvert-with-grate',
  culvert = 'culvert',
  precipitationStation = 'precipitation-station',
  watercourseMeteringStation = 'watercourse-metering-station',
  discharge = 'discharge',
}

/** The operating state from the report. An alarm comes from `alert`, and `static` draws the medium instead. */
export enum NorvarStationState {
  ready = 'ready',
  running = 'running',
  unmonitored = 'unmonitored',
}

/** Symbol colours in one tone on the symbol background; `border` outlines the filled shapes. */
export function norvarStationPaint(
  color: string,
  border: string = color
): Paint {
  return {
    line: color,
    border,
    fill: 'var(--automation-symbol-on-background-color)',
  };
}

/** The design's running line colour has no token; the running border colour carries the same value. */
export const NORVAR_RUNNING_COLOR =
  'var(--automation-symbol-running-border-color)';
export const NORVAR_ALARM_COLOR = 'var(--alert-alarm-color)';
export const NORVAR_ALARM_OUTLINE_COLOR = 'var(--alert-alarm-outline-color)';
export const NORVAR_UNMONITORED_COLOR =
  'var(--automation-symbol-static-line-color)';

type Draw = (paint: Paint) => SVGTemplateResult;

export interface NorvarStationArt {
  /** The symbol inside a button. */
  button: Draw;
  /** The outline of the flat symbol, also used for its silhouette. */
  frame: Draw;
  /** What the flat symbol draws inside `frame`. */
  mark: Draw;
}

export interface NorvarMapSymbolArt extends NorvarStationArt {
  /** Round button, as the wastewater stations; the others are square. */
  round: boolean;
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
const METER_BUTTON =
  'M11.9998 15C16.2156 15 19.8746 17.3731 21.7211 20.8549C21.7561 20.921 21.7079 21 21.6332 21H2.36637C2.29164 21 2.24345 20.921 2.27847 20.8549C4.12496 17.3731 7.78402 15 11.9998 15ZM21.6332 3C21.7079 3 21.7561 3.07904 21.7211 3.14506C19.8746 6.62692 16.2156 9 11.9998 9C7.78402 8.99997 4.12496 6.62693 2.27847 3.14506C2.24345 3.07904 2.29163 3 2.36637 3H21.6332Z';
const METER_WATER_FLAT =
  'M11.9999 17C15.8193 17 19.2198 18.7857 21.4169 21.5667C21.8944 22.1711 21.4267 23 20.6564 23H3.34331C2.57307 23 2.10535 22.1711 2.58284 21.5667C4.77993 18.7857 8.18045 17 11.9999 17ZM20.6564 1C21.4267 1 21.8944 1.82889 21.4169 2.43328C19.2198 5.21428 15.8193 7 11.9999 7C8.18045 6.99996 4.77993 5.21428 2.58284 2.43327C2.10535 1.82888 2.57307 1 3.34331 1H20.6564Z';
const METER_WASTEWATER_FLAT =
  'M11.9999 15C14.6045 15 16.9758 15.9967 18.7553 17.6284C18.9142 17.7741 18.9999 17.9818 18.9999 18.1974C18.9999 18.6407 18.6405 19 18.1973 19H5.80246C5.35921 19 4.99988 18.6407 4.99988 18.1974C4.99988 17.9818 5.08555 17.7741 5.24444 17.6284C7.0239 15.9967 9.39521 15 11.9999 15ZM18.9999 5.80192C18.9999 6.01731 18.9143 6.22481 18.7555 6.3704C16.976 8.00258 14.6049 9 11.9999 9C9.39486 8.99997 7.0237 8.00262 5.2442 6.3704C5.08547 6.22481 4.99988 6.01731 4.99988 5.80192C4.99988 5.35903 5.35891 5 5.8018 5H18.198C18.6408 5 18.9999 5.35903 18.9999 5.80192Z';
const REDUCTION_BUTTON =
  'M20.4457 2C21.1726 2.00045 21.6566 2.7522 21.3558 3.41406L12.9086 21.9971C12.5533 22.7781 11.444 22.7786 11.0883 21.998L2.641 3.41406C2.34015 2.75204 2.824 2.00012 3.55116 2H20.4457Z';
const REDUCTION_FLAT =
  'M22.9999 0C23.3269 0 23.6163 0.15772 23.7988 0.400391L11.9999 24L0.201096 0.400391C0.383537 0.157698 0.672932 2.4346e-05 0.999924 0H22.9999Z';
const DAM_BUTTON =
  'M21.8395 8C21.8986 8 21.9448 8.05141 21.9384 8.11019C21.3861 13.1105 17.1472 16.9999 11.9997 17C6.85214 17 2.6134 13.1105 2.06108 8.11019C2.05458 8.05141 2.10081 8 2.15994 8H21.8395Z';
const DAM_FLAT =
  'M23 8C23.3082 8 23.5832 8.1401 23.7666 8.35938C22.6704 13.8568 17.8197 18 12 18C6.18026 18 1.32961 13.8568 0.233398 8.35938C0.416836 8.1401 0.691753 8 1 8H23Z';
const WATER_OVERFLOW_BUTTON =
  'M19 3.5C19.8284 3.5 20.5 4.17157 20.5 5V19C20.5 19.4142 20.332 19.7891 20.0605 20.0605L3.93945 3.93945C4.2109 3.66801 4.58579 3.5 5 3.5H19Z';
const WATER_OVERFLOW_FLAT =
  'M23 0C23.5523 2.57702e-07 24 0.447715 24 1V23C24 23.2689 23.8924 23.5117 23.7197 23.6914L0.307617 0.279297C0.48734 0.106594 0.731065 7.84301e-09 1 0H23Z';
const WASTEWATER_OVERFLOW_BUTTON =
  'M12.0002 3.00026C16.9706 3.00045 21.0002 7.02981 21.0002 12.0003C21.0001 15.1252 19.4064 17.877 16.9885 19.4905C16.7215 13.0995 11.4568 8.00038 5.00022 8.00026C4.63324 8.00026 4.26993 8.01684 3.91135 8.04909C5.37458 5.05911 8.44704 3.00026 12.0002 3.00026Z';
const WASTEWATER_OVERFLOW_FLAT =
  'M12.001 3C16.9715 3 21.001 7.02944 21.001 12C21.001 14.6575 19.8482 17.0449 18.0166 18.6924C17.3651 12.6801 12.2744 8.0001 6.0889 8C5.3192 8 4.5663 8.0725 3.8369 8.2109C5.2674 5.134 8.3843 3 12.001 3Z';
const CULVERT_GRATE_BUTTON =
  'M13 2L7.22265 5.85157C7.08355 5.9443 7 6.10042 7 6.26759V8M13 22L7.22265 18.1484C7.08355 18.0557 7 17.8996 7 17.7324V16M7 8H16.5C16.7761 8 17 8.22386 17 8.5V12M7 8V12M7 16H16.5C16.7761 16 17 15.7761 17 15.5V12M7 16V12M17 12H7';
const CULVERT_GRATE_FLAT =
  'M13 5L8.4855 7.7087C8.1843 7.88942 8 8.21493 8 8.56619V9M13 19L8.4855 16.2913C8.1843 16.1106 8 15.7851 8 15.4338V15M8 9H15C15.5523 9 16 9.44772 16 10V12M8 9V12M8 15H15C15.5523 15 16 14.5523 16 14V12M8 15V12M16 12H8';
const CULVERT_BUTTON =
  'M16 2L8.235 6.85313C8.08881 6.94449 8 7.10473 8 7.27712V16.7229C8 16.8953 8.08881 17.0555 8.235 17.1469L16 22';
const CULVERT_FLAT =
  'M14 5L9.4855 7.7087C9.1843 7.88942 9 8.21493 9 8.56619V15.4338C9 15.7851 9.1843 16.1106 9.4855 16.2913L14 19';
const UMBRELLA_BUTTON =
  'M20 10C20 8.94942 19.7931 7.90914 19.391 6.93853C18.989 5.96793 18.3997 5.08601 17.6569 4.34315C16.914 3.60028 16.0321 3.011 15.0615 2.60896C14.0909 2.20693 13.0506 2 12 2C10.9494 2 9.90914 2.20693 8.93853 2.60896C7.96793 3.011 7.08601 3.60028 6.34315 4.34315C5.60028 5.08601 5.011 5.96793 4.60896 6.93853C4.20693 7.90914 4 8.94943 4 10L12 10H20Z';
const UMBRELLA_HANDLE_BUTTON =
  'M12 10V18.5C12 19.8807 10.8807 21 9.5 21C8.11929 21 7 19.8807 7 18.5V18';
const UMBRELLA_FLAT =
  'M18 11C18 10.2121 17.8448 9.43185 17.5433 8.7039C17.2417 7.97595 16.7998 7.31451 16.2426 6.75736C15.6855 6.20021 15.0241 5.75825 14.2961 5.45672C13.5681 5.15519 12.7879 5 12 5C11.2121 5 10.4319 5.15519 9.7039 5.45672C8.97595 5.75825 8.31451 6.20021 7.75736 6.75736C7.20021 7.31451 6.75825 7.97595 6.45672 8.7039C6.15519 9.43185 6 10.2121 6 11L12 11H18Z';
const UMBRELLA_HANDLE_FLAT =
  'M12 11V16.5C12 17.3284 11.3284 18 10.5 18C9.67157 18 9 17.3284 9 16.5V16';
const WATERCOURSE_METER_BUTTON =
  'M14.75 17H9.25L7 15H3L3 20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V15H17L14.75 17Z';
const WATERCOURSE_METER_FLAT =
  'M8.25 17H15.75L18 15H22V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V15H6L8.25 17Z';
const DISCHARGE_DASHES_BUTTON =
  'M19.0719 4.92537L16.2434 7.7538M14.8292 9.16801L12.7079 11.2893M11.2937 12.7035L9.17237 14.8249M7.75815 16.2391L4.92973 19.0675';
const DISCHARGE_DASHES_FLAT =
  'M19.7796 4.21829L16.9512 7.04672M15.537 8.46093L12.7086 11.2894M11.2944 12.7036L8.46593 15.532M7.05172 16.9462L4.22329 19.7746';

/** A filled shape with a thin outline, the button drawing of most stations. */
const solid =
  (d: string): Draw =>
  ({line, border}) =>
    svg`<path
      d=${d}
      fill=${line}
      stroke=${border}
      vector-effect="non-scaling-stroke"
    />`;

const filled =
  (d: string): Draw =>
  ({line}) =>
    svg`<path d=${d} fill=${line} />`;

const stroked =
  (d: string, width: number): Draw =>
  ({line}) =>
    svg`<path
      d=${d}
      stroke=${line}
      stroke-width=${width}
      stroke-linecap="round"
      vector-effect="non-scaling-stroke"
    />`;

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

/** A 16-unit square or an 18-unit disc whose outline sits inside its size, as the design draws it. */
const solidSquare: Draw = ({line, border}) =>
  svg`<rect
    x="4.5"
    y="4.5"
    width="15"
    height="15"
    rx="0.5"
    fill=${line}
    stroke=${border}
    vector-effect="non-scaling-stroke"
  />`;

const solidDot =
  (radius: number): Draw =>
  ({line, border}) =>
    svg`<circle
      cx="12"
      cy="12"
      r=${radius - 0.5}
      fill=${line}
      stroke=${border}
      vector-effect="non-scaling-stroke"
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
/** Frame of the map symbols. */
const mapFrame = frameRect(2, 2);

/**
 * A mark on a thick outline, the overflow drawings.
 *
 * TODO(designer): the water overflow draws its alarm outline in the alarm outline colour, the
 * wastewater one in the alarm colour; both use the line colour here.
 */
const inOutline =
  (radius: number, d: string): Draw =>
  ({line}) =>
    svg`<rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx=${radius}
      stroke=${line}
      stroke-width="1.5"
      vector-effect="non-scaling-stroke"
    />
    <path d=${d} fill=${line} />`;

const RESERVOIR_BUTTON = solidSquare;
const TREATMENT_BUTTON = solidDot(9);
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
    button: solid(PUMP_LARGE),
    frame: squareFrame,
    mark: filled(PUMP_SMALL),
  },
  [NorvarWaterStationType.treatmentPlant]: {
    button: TREATMENT_BUTTON,
    frame: squareFrame,
    mark: dot(6),
  },
  [NorvarWaterStationType.meteringStation]: {
    button: solid(METER_BUTTON),
    frame: squareFrame,
    mark: filled(METER_WATER_FLAT),
  },
  [NorvarWaterStationType.reductionChamber]: {
    button: solid(REDUCTION_BUTTON),
    frame: fullSquareFrame,
    mark: filled(REDUCTION_FLAT),
  },
  [NorvarWaterStationType.dam]: {
    button: solid(DAM_BUTTON),
    frame: fullSquareFrame,
    mark: filled(DAM_FLAT),
  },
  [NorvarWaterStationType.overflow]: {
    button: inOutline(2, WATER_OVERFLOW_BUTTON),
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
    button: solid(PUMP_LARGE),
    frame: roundFrame,
    mark: filled(PUMP_SMALL),
  },
  [NorvarWastewaterStationType.treatmentPlant]: {
    button: TREATMENT_BUTTON,
    frame: roundFrame,
    mark: dot(6),
  },
  [NorvarWastewaterStationType.meteringStation]: {
    button: solid(METER_BUTTON),
    frame: roundFrame,
    mark: filled(METER_WASTEWATER_FLAT),
  },
  [NorvarWastewaterStationType.discharge]: {
    button: solidDot(4),
    frame: roundFrame,
    mark: dot(3),
  },
  [NorvarWastewaterStationType.overflow]: {
    button: inOutline(9, WASTEWATER_OVERFLOW_BUTTON),
    frame: roundFrame,
    mark: filled(WASTEWATER_OVERFLOW_FLAT),
  },
  [NorvarWastewaterStationType.manhole]: {
    button: MANHOLE_BUTTON,
    frame: roundFrame,
    mark: MANHOLE_MARK,
  },
};

const umbrella =
  (canopy: string, handle: string, width: number, solidCanopy: boolean): Draw =>
  ({line}) =>
    svg`<path
      d=${canopy}
      fill=${solidCanopy ? line : 'none'}
      stroke=${line}
      stroke-width=${width}
      stroke-linejoin="round"
      vector-effect="non-scaling-stroke"
    />
    ${stroked(handle, width)({line, fill: line, border: line})}`;

const dashes =
  (d: string, width: number): Draw =>
  ({line}) =>
    svg`<path
      d=${d}
      stroke=${line}
      stroke-width=${width}
      vector-effect="non-scaling-stroke"
    />`;

export const MAP_SYMBOL_ART: Record<NorvarMapSymbolType, NorvarMapSymbolArt> = {
  [NorvarMapSymbolType.culvertWithGrate]: {
    round: false,
    button: stroked(CULVERT_GRATE_BUTTON, 1.5),
    frame: mapFrame,
    mark: stroked(CULVERT_GRATE_FLAT, 1),
  },
  [NorvarMapSymbolType.culvert]: {
    round: false,
    button: stroked(CULVERT_BUTTON, 1.5),
    frame: mapFrame,
    mark: stroked(CULVERT_FLAT, 1),
  },
  // TODO(designer): the flat precipitation station draws an open canopy, the button a filled one.
  [NorvarMapSymbolType.precipitationStation]: {
    round: false,
    button: umbrella(UMBRELLA_BUTTON, UMBRELLA_HANDLE_BUTTON, 1.5, true),
    frame: mapFrame,
    mark: umbrella(UMBRELLA_FLAT, UMBRELLA_HANDLE_FLAT, 1, false),
  },
  [NorvarMapSymbolType.watercourseMeteringStation]: {
    round: false,
    button: ({line}) =>
      svg`<path
          d=${WATERCOURSE_METER_BUTTON}
          fill=${line}
          stroke=${line}
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
        />`,
    frame: mapFrame,
    mark: filled(WATERCOURSE_METER_FLAT),
  },
  [NorvarMapSymbolType.discharge]: {
    round: true,
    button: (paint) =>
      svg`${ring(10, 1.5)(paint)}${dashes(DISCHARGE_DASHES_BUTTON, 1.5)(paint)}`,
    frame: roundFrame,
    mark: dashes(DISCHARGE_DASHES_FLAT, 1),
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
