import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './valve-analog-three-way-icon.css?inline';
import {customElement} from '../../decorator.js';
import {clampPercent} from '../../svghelpers/math.js';
import {
  ThreewayValveOrientation,
  threewayValveRotation,
} from '../threeway-valve-shared/threeway-valve-shared.js';

type Ports = [number, number, number];

const T_OUTLINE =
  'M14.1216 9.92409L20.47 5.95634C21.136 5.54006 22 6.0189 22 6.80433V17.1958C22 17.9813 21.136 18.4601 20.47 18.0438L14 14.0001L18.0438 20.4701C18.46 21.1361 17.9812 22.0001 17.1958 22.0001H6.80425C6.01881 22.0001 5.53997 21.1361 5.95625 20.4701L10 14.0001L3.53 18.0438C2.86395 18.4601 2 17.9813 2 17.1958V6.80433C2 6.0189 2.86395 5.54006 3.53 5.95634L10 10.0001H13.8566C13.9503 10.0001 14.0421 9.97375 14.1216 9.92409ZM10 11.0001C9.81258 11.0001 9.62893 10.9474 9.47 10.8481L3 6.80433L3 17.1958L9.47 13.1521C9.86488 12.9053 10.3778 12.9637 10.7071 13.293C11.0364 13.6222 11.0948 14.1352 10.848 14.5301L6.80425 21.0001H17.1958L13.152 14.5301C12.9052 14.1352 12.9636 13.6222 13.2929 13.293C13.6222 12.9637 14.1351 12.9053 14.53 13.1521L21 17.1958V6.80433L14.6516 10.7721C14.4132 10.9211 14.1377 11.0001 13.8566 11.0001H10Z';
const T_BODY =
  'M10 11.0004C9.81258 11.0004 9.62893 10.9478 9.47 10.8484L3 6.80469L3 17.1962L9.47 13.1524C9.86488 12.9056 10.3778 12.9641 10.7071 13.2933C11.0364 13.6226 11.0948 14.1356 10.848 14.5304L6.80425 21.0004H17.1958L13.152 14.5304C12.9052 14.1356 12.9636 13.6226 13.2929 13.2933C13.6222 12.9641 14.1351 12.9056 14.53 13.1524L21 17.1962V6.80469L14.6516 10.7724C14.4132 10.9214 14.1377 11.0004 13.8566 11.0004H10Z';

/**
 * Outline, plug and body when one port is shut, indexed by port. Taken from
 * `obi-threeway-analog-inleft-bottom-100`, `-inleft-left-100` and
 * `-inleft-left-0`.
 */
const PLUGGED: {outline: string; plug: string; ring: string; body: string}[] = [
  {
    outline:
      'M14.53 10.848C14.3711 10.9473 14.1874 11 14 11H11V14C11 14.1874 10.9473 14.3711 10.848 14.53L6.80425 21H17.1958L13.152 14.53C12.9052 14.1351 12.9636 13.6222 13.2929 13.2929C13.6222 12.9636 14.1351 12.9052 14.53 13.152L21 17.1958V6.80425L14.53 10.848ZM20.47 18.0438C21.136 18.46 22 17.9812 22 17.1958V6.80425C22 6.01881 21.136 5.53997 20.47 5.95625L14 10H10.5C10.2239 10 10 10.2239 10 10.5V14L5.95625 20.47C5.53997 21.136 6.01881 22 6.80425 22H17.1958C17.9812 22 18.46 21.136 18.0438 20.47L14 14L20.47 18.0438Z',
    plug: 'M3 17.0568L8 13.4854V10.5146L3 6.94321V17.0568Z',
    ring: 'M3 17.0568L8 13.4854V10.5146L3 6.94317V17.0568ZM3.58124 17.8705C2.91937 18.3433 2 17.8702 2 17.0568V6.94317C2 6.1298 2.91937 5.65667 3.58124 6.12944L8.58124 9.70086C8.84403 9.88858 9 10.1916 9 10.5146V13.4854C9 13.8083 8.84403 14.1114 8.58124 14.2991L3.58124 17.8705Z',
    body: 'M14.53 10.848C14.3711 10.9473 14.1874 11 14 11H11V14C11 14.1874 10.9473 14.3711 10.848 14.53L6.80426 21H17.1958L13.152 14.53C12.9052 14.1351 12.9636 13.6222 13.2929 13.2929C13.6222 12.9636 14.1351 12.9052 14.53 13.152L21 17.1958L21 6.80425L14.53 10.848Z',
  },
  {
    outline:
      'M14 11C14.1874 11 14.3711 10.9473 14.53 10.848L21 6.80425V17.1958L14.53 13.152C14.3711 13.0527 14.1874 13 14 13H10C9.81258 13 9.62893 13.0527 9.47 13.152L3 17.1958L3 6.80425L9.3484 10.772C9.5868 10.921 9.86227 11 10.1434 11H14ZM14 10H10.1434C10.0497 10 9.95786 9.97367 9.8784 9.924L3.53 5.95625C2.86395 5.53997 2 6.01881 2 6.80425V17.1958C2 17.9812 2.86395 18.46 3.53 18.0438L10 14H14L20.47 18.0438C21.136 18.46 22 17.9812 22 17.1958V6.80425C22 6.01881 21.136 5.53997 20.47 5.95625L14 10Z',
    plug: 'M10.5146 16L6.94317 21H17.0568L13.4854 16H10.5146Z',
    ring: 'M10.5146 16L6.94317 21H17.0568L13.4854 16H10.5146ZM6.12944 20.4188C5.65667 21.0806 6.1298 22 6.94317 22H17.0568C17.8702 22 18.3433 21.0806 17.8705 20.4188L14.2991 15.4188C14.1114 15.156 13.8083 15 13.4854 15H10.5146C10.1916 15 9.88858 15.156 9.70086 15.4188L6.12944 20.4188Z',
    body: 'M14 10.9999C14.1874 10.9999 14.3711 10.9472 14.53 10.8479L21 6.80416V17.1957L14.53 13.1519C14.3711 13.0526 14.1874 12.9999 14 12.9999H10C9.81258 12.9999 9.62893 13.0526 9.47 13.1519L3 17.1957L3 6.80416L9.3484 10.7719C9.5868 10.9209 9.86227 10.9999 10.1434 10.9999H14Z',
  },
  {
    outline:
      'M9.47 10.848C9.62893 10.9473 9.81258 11 10 11H13V14C13 14.1874 13.0527 14.3711 13.152 14.53L17.1958 21H6.80425L10.848 14.53C11.0948 14.1351 11.0364 13.6222 10.7071 13.2929C10.3778 12.9636 9.86488 12.9052 9.47 13.152L3 17.1958L3 6.80425L9.47 10.848ZM3.53 18.0438C2.86395 18.46 2 17.9812 2 17.1958V6.80425C2 6.01881 2.86395 5.53997 3.53 5.95625L10 10H13.5C13.7761 10 14 10.2239 14 10.5V14L18.0438 20.47C18.46 21.136 17.9812 22 17.1958 22H6.80425C6.01881 22 5.53997 21.136 5.95625 20.47L10 14L3.53 18.0438Z',
    plug: 'M21 17.0568L16 13.4854V10.5146L21 6.94321V17.0568Z',
    ring: 'M21 17.0568L16 13.4854L16 10.5146L21 6.94321V17.0568ZM20.4188 17.8706C21.0806 18.3433 22 17.8702 22 17.0568V6.94321C22 6.12984 21.0806 5.65671 20.4188 6.12948L15.4188 9.7009C15.156 9.88862 15 10.1917 15 10.5146L15 13.4854C15 13.8084 15.156 14.1114 15.4188 14.2991L20.4188 17.8706Z',
    body: 'M9.47 10.848C9.62893 10.9473 9.81258 11 10 11H13V14C13 14.1874 13.0527 14.3711 13.152 14.53L17.1958 21H6.80425L10.848 14.53C11.0948 14.1351 11.0364 13.6222 10.7071 13.2929C10.3778 12.9636 9.86488 12.9052 9.47 13.152L3 17.1958L3 6.80425L9.47 10.848Z',
  },
];

/** The port whose share of the split turns the handle, per inlet port. */
const SPLIT_PORT = [2, 0, 0];

/** Width of the shut band at a fully shut port, in icon units. */
const BAND_RANGE = 4;

const SECONDARY = 'fill: var(--automation-symbol-static-background-color)';
const TERTIARY = 'fill: var(--automation-symbol-on-border-color)';
const PRIMARY = 'fill: var(--automation-symbol-on-background-color)';

const CLOSED = svg`
  <mask id="closed-mask" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 21H7L11.5 15H12.5L17 21ZM3 17L3 7L9 11.5V12.5L3 17ZM21 7V17L15 12.5V11.5L21 7Z"/>
    <path d="M11 8C11 8.55228 11.4477 9 12 9C12.5523 9 13 8.55228 13 8V3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V8Z"/>
  </mask>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17 21H7L11.5 15H12.5L17 21ZM3 17L3 7L9 11.5V12.5L3 17ZM21 7V17L15 12.5V11.5L21 7Z" style="fill: var(--automation-symbol-off-background-color)"/>
  <path d="M11 8C11 8.55228 11.4477 9 12 9C12.5523 9 13 8.55228 13 8V3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V8Z" style="fill: var(--automation-symbol-off-border-color)"/>
  <path d="M17 21V22C17.3788 22 17.725 21.786 17.8944 21.4472C18.0638 21.1084 18.0273 20.703 17.8 20.4L17 21ZM7 21L6.2 20.4C5.97274 20.703 5.93618 21.1084 6.10557 21.4472C6.27496 21.786 6.62123 22 7 22V21ZM11.5 15V14C11.1852 14 10.8889 14.1482 10.7 14.4L11.5 15ZM12.5 15L13.3 14.4C13.1111 14.1482 12.8148 14 12.5 14V15ZM3 17H2C2 17.3788 2.214 17.725 2.55279 17.8944C2.89157 18.0638 3.29698 18.0273 3.6 17.8L3 17ZM3 7L3.6 6.2C3.29698 5.97274 2.89157 5.93618 2.55279 6.10557C2.214 6.27496 2 6.62123 2 7H3ZM9 11.5H10C10 11.1852 9.85181 10.8889 9.6 10.7L9 11.5ZM9 12.5L9.6 13.3C9.85181 13.1111 10 12.8148 10 12.5H9ZM21 7H22C22 6.62123 21.786 6.27496 21.4472 6.10557C21.1084 5.93618 20.703 5.97274 20.4 6.2L21 7ZM21 17L20.4 17.8C20.703 18.0273 21.1084 18.0638 21.4472 17.8944C21.786 17.725 22 17.3788 22 17H21ZM15 12.5H14C14 12.8148 14.1482 13.1111 14.4 13.3L15 12.5ZM15 11.5L14.4 10.7C14.1482 10.8889 14 11.1852 14 11.5H15ZM17 21V20H7V21V22H17V21ZM7 21L7.8 21.6L12.3 15.6L11.5 15L10.7 14.4L6.2 20.4L7 21ZM11.5 15V16H12.5V15V14H11.5V15ZM12.5 15L11.7 15.6L16.2 21.6L17 21L17.8 20.4L13.3 14.4L12.5 15ZM3 17H4L4 7H3H2L2 17H3ZM3 7L2.4 7.8L8.4 12.3L9 11.5L9.6 10.7L3.6 6.2L3 7ZM9 11.5H8V12.5H9H10V11.5H9ZM9 12.5L8.4 11.7L2.4 16.2L3 17L3.6 17.8L9.6 13.3L9 12.5ZM21 7H20V17H21H22V7H21ZM21 17L21.6 16.2L15.6 11.7L15 12.5L14.4 13.3L20.4 17.8L21 17ZM15 12.5H16V11.5H15H14V12.5H15ZM15 11.5L15.6 12.3L21.6 7.8L21 7L20.4 6.2L14.4 10.7L15 11.5ZM11 8H10C10 9.10457 10.8954 10 12 10V9V8H11ZM12 9V10C13.1046 10 14 9.10457 14 8H13H12V9ZM13 8H14V3H13H12V8H13ZM13 3H14C14 1.89543 13.1046 1 12 1V2V3H13ZM12 2V1C10.8954 1 10 1.89543 10 3H11H12V2ZM11 3H10V8H11H12V3H11Z" style="fill: var(--automation-symbol-off-background-color)" mask="url(#closed-mask)"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17 21H7L11.5 15H12.5L17 21ZM3 17L3 7L9 11.5V12.5L3 17ZM21 7V17L15 12.5V11.5L21 7ZM7 22H17C17.824 22 18.2944 21.0592 17.8 20.4L13.3 14.4C13.1111 14.1482 12.8148 14 12.5 14H11.5C11.1852 14 10.8889 14.1482 10.7 14.4L6.2 20.4C5.70557 21.0592 6.17595 22 7 22ZM2 17V7C2 6.17595 2.94076 5.70557 3.6 6.2L9.6 10.7C9.85181 10.8889 10 11.1852 10 11.5V12.5C10 12.8148 9.85181 13.1111 9.6 13.3L3.6 17.8C2.94076 18.2944 2 17.824 2 17ZM22 7V17C22 17.824 21.0592 18.2944 20.4 17.8L14.4 13.3C14.1482 13.1111 14 12.8148 14 12.5V11.5C14 11.1852 14.1482 10.8889 14.4 10.7L20.4 6.2C21.0592 5.70557 22 6.17595 22 7Z" style="fill: var(--automation-symbol-off-border-color)"/>
  <path d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V8C11 8.55228 11.4477 9 12 9C12.5523 9 13 8.55228 13 8V3ZM14 8C14 9.10457 13.1046 10 12 10C10.8954 10 10 9.10457 10 8V3C10 1.89543 10.8954 1 12 1C13.1046 1 14 1.89543 14 3V8Z" style="fill: var(--automation-symbol-off-border-color)"/>
`;

function renderHandle(cx: number, cy: number, angle: number) {
  return svg`<g transform="rotate(${angle} ${cx} ${cy})">
    <line x1=${cx} y1=${cy - 2.5} x2=${cx} y2=${cy + 2.5} stroke-width="3" stroke-linecap="round" style="stroke: var(--automation-symbol-on-border-color)"/>
    <line x1=${cx} y1=${cy - 2.5} x2=${cx} y2=${cy + 2.5} stroke-width="1" stroke-linecap="round" style="stroke: var(--automation-symbol-on-background-color)"/>
  </g>`;
}

/** The shut part of a partly open port: a shut band at the port end and a 1-unit edge line inside it. */
function renderBand(port: number, opening: number) {
  const width = (BAND_RANGE * (100 - opening)) / 100;
  if (port === 0) {
    const edge = 3 + width;
    return svg`<rect x="2" y="0" width=${edge - 2} height="24" style=${SECONDARY}/>
      <rect x=${edge} y="0" width="1" height="24" style=${TERTIARY}/>`;
  }
  if (port === 1) {
    const edge = 21 - width;
    return svg`<rect x="0" y=${edge} width="24" height=${22 - edge} style=${SECONDARY}/>
      <rect x="0" y=${edge - 1} width="24" height="1" style=${TERTIARY}/>`;
  }
  const edge = 21 - width;
  return svg`<rect x=${edge} y="0" width=${22 - edge} height="24" style=${SECONDARY}/>
    <rect x=${edge - 1} y="0" width="1" height="24" style=${TERTIARY}/>`;
}

/**
 * Three-way analog valve symbol whose ports open continuously from 0 to
 * 100 %.
 *
 * Draws the same symbol as the `obi-threeway-analog-*` icons. The bands, the
 * handle angle and the handle position are linear in the opening: exact at
 * 0 and 100 %, within a fraction of a unit of the icons' 25/50/75 steps.
 * Used as the icon of `obc-analog-threeway-valve`, and on its
 * own inside an `obc-automation-button`.
 *
 * ## Ports
 *
 * Ports are numbered from the side without a port: with `orientation`
 * `bottom`, port 1 is left, port 2 is the stem at the bottom and port 3 is
 * right. The numbering turns with the symbol.
 *
 * - A port between 0 and 100 % shows its shut part as a band at the port end.
 * - A port at 0 % is drawn plugged.
 * - With fewer than two ports open no flow can pass, and the closed symbol is
 *   shown.
 * - With all three ports at 100 % the generic open symbol is shown.
 *
 * The handle shows how the most open port (the inlet) splits between the two
 * others, the way the `inleft-*` icons do.
 *
 * TODO(designer): the `inleft-bottom` and `inleft-right` icons name their 0
 * and 100 steps the other way round from their 25/50/75 steps (at `-0` the
 * port the series opens is shut). The symbol follows the 25/50/75 steps.
 *
 * @property open1 - Opening of port 1 in percent (0–100).
 * @property open2 - Opening of port 2, the stem, in percent (0–100).
 * @property open3 - Opening of port 3 in percent (0–100).
 * @property orientation - Side the stem points to; `bottom` and `top` lay the valve on a horizontal pipe, `left` and `right` on a vertical one.
 * @stable
 */
@customElement('obc-valve-analog-three-way-icon')
export class ObcValveAnalogThreeWayIcon extends LitElement {
  @property({type: Number}) open1: number = 0;
  @property({type: Number}) open2: number = 0;
  @property({type: Number}) open3: number = 0;
  @property({type: String}) orientation: ThreewayValveOrientation =
    ThreewayValveOrientation.bottom;

  /**
   * Opening of the right port with the stem up. Setting any of `value`,
   * `value2`, `closed` or `horisontal` draws the symbol stem up, with the
   * left port fully open, and ignores `open1`–`open3` and `orientation`.
   * @deprecated Use `open1`–`open3` and `orientation`.
   */
  @property({type: Number}) value?: number;
  /**
   * Opening of the top port (the stem).
   * @deprecated Use `open1`–`open3` and `orientation`.
   */
  @property({type: Number}) value2?: number;
  /** @deprecated Set every opening to 0. */
  @property({type: Boolean}) closed?: boolean;
  /**
   * Makes the stem the fully open port; `value` then opens the left port and
   * `value2` the right one.
   * @deprecated Use `open1`–`open3` and `orientation`.
   */
  @property({type: Boolean}) horisontal?: boolean;

  private get usesLegacyProperties(): boolean {
    return (
      this.value !== undefined ||
      this.value2 !== undefined ||
      this.closed !== undefined ||
      this.horisontal !== undefined
    );
  }

  private get ports(): Ports {
    if (!this.usesLegacyProperties) {
      return [this.open1, this.open2, this.open3].map(clampPercent) as Ports;
    }
    if (this.closed) return [0, 0, 0];
    const value = clampPercent(this.value ?? 0);
    const value2 = clampPercent(this.value2 ?? 0);
    return this.horisontal ? [value2, 100, value] : [value, value2, 100];
  }

  private get rotation(): number {
    return threewayValveRotation(
      this.usesLegacyProperties
        ? ThreewayValveOrientation.top
        : this.orientation
    );
  }

  private renderOpen(ports: Ports) {
    if (ports.every((opening) => opening >= 100)) {
      return svg`
        <path fill-rule="evenodd" clip-rule="evenodd" d=${T_OUTLINE} style=${TERTIARY}/>
        <path fill-rule="evenodd" clip-rule="evenodd" d=${T_BODY} style=${PRIMARY}/>
        ${renderHandle(12, 3.5, 90)}
      `;
    }

    const plugged = ports.findIndex((opening) => opening === 0);
    const shape = plugged === -1 ? undefined : PLUGGED[plugged];
    const inlet = ports.indexOf(Math.max(...ports));
    const splitPort = SPLIT_PORT[inlet];
    const otherPort = 3 - inlet - splitPort;
    const split =
      (100 * ports[splitPort]) / (ports[splitPort] + ports[otherPort]);
    // Linear between the obi icons' end steps: (12, 5) with the split port
    // shut, (12, 5.5) with the other one shut.
    const cx = 12;
    const cy = 5 + (0.5 * split) / 100;
    const angle = (inlet === 0 ? -0.9 : 0.9) * split;

    return svg`
      <defs>
        <clipPath id="body"><path d=${T_BODY}/></clipPath>
      </defs>
      <path fill-rule="evenodd" clip-rule="evenodd" d=${shape?.outline ?? T_OUTLINE} style=${TERTIARY}/>
      ${
        shape
          ? svg`<path fill-rule="evenodd" clip-rule="evenodd" d=${shape.plug} style=${TERTIARY}/>
            <path fill-rule="evenodd" clip-rule="evenodd" d=${shape.ring} style=${SECONDARY}/>`
          : null
      }
      <path fill-rule="evenodd" clip-rule="evenodd" d=${shape?.body ?? T_BODY} style=${PRIMARY}/>
      <g clip-path="url(#body)">
        ${ports.map((opening, port) =>
          opening > 0 && opening < 100 ? renderBand(port, opening) : null
        )}
      </g>
      ${renderHandle(cx, cy, angle)}
    `;
  }

  override render() {
    const ports = this.ports;
    const passing = ports.filter((opening) => opening > 0).length >= 2;
    return html`<div class="wrapper">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="rotate(${this.rotation} 12 12)">
          ${passing ? this.renderOpen(ports) : CLOSED}
        </g>
      </svg>
    </div>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-valve-analog-three-way-icon': ObcValveAnalogThreeWayIcon;
  }
}
