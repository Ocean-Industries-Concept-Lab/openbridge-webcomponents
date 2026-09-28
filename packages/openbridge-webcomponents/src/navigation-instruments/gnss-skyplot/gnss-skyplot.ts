import {LitElement, PropertyValues, html, nothing, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import componentStyle from './gnss-skyplot.css?inline';
import '../watch/watch.js';
import {WatchCircleType} from '../watch/watch.js';
import {Tickmark, TickmarkType} from '../watch/tickmark.js';
import {concentricGrid} from '../watch/concentric-grid.js';
import {customElement} from '../../decorator.js';
import {Priority} from '../types.js';
import {clamp, degToRad} from '../../svghelpers/math.js';
import {
  applyPinnedHostSize,
  computeRadialFrame,
  estimateLabelWidthPx,
  measureContainerPx,
  observeInnerBox,
  type RadialFrame,
} from '../../svghelpers/radial-frame.js';

export enum SatelliteConstellation {
  gps = 'gps',
  glonass = 'glonass',
  galileo = 'galileo',
  beidou = 'beidou',
}

/** One satellite as the receiver reports it. */
export interface Satellite {
  /** Vehicle number shown inside the marker. */
  id: string | number;
  /** Bearing from north in degrees, clockwise. */
  azimuth: number;
  /** Angle above the horizon in degrees; `90` is overhead. */
  elevation: number;
  /** Source constellation; drives the marker hue while `colorByConstellation`. */
  constellation?: SatelliteConstellation;
  /** Whether the receiver uses this satellite in its position fix. */
  tracked?: boolean;
}

/** Elevation 0° sits on the outermost grid ring; 90° at the centre. */
const SCALE_RADIUS = 160;
/** Evenly spaced elevation rings between the centre and the horizon. */
const GRID_DIVISIONS = 4;
/** Radius of the satellite marker; the design's 24 px disc. */
const MARKER_RADIUS = 12;
/** Azimuths carrying a labelled tickmark, and the label at each. */
const AZIMUTH_LABELS = [
  '000',
  '045',
  '090',
  '135',
  '180',
  '225',
  // TODO(designer): the design file reads `-90` here, inherited from the
  // attitude plot's label component. Azimuth runs 0–360, and the movement
  // plot on the same page reads `270` (Figma 23787-69676).
  '270',
  '315',
] as const;

const CONSTELLATION_NAMES: Record<SatelliteConstellation, string> = {
  [SatelliteConstellation.gps]: 'GPS',
  [SatelliteConstellation.glonass]: 'GLONASS',
  [SatelliteConstellation.galileo]: 'Galileo',
  [SatelliteConstellation.beidou]: 'BeiDou',
};

/**
 * `<obc-gnss-skyplot>` – Polar plot of the satellites a GNSS receiver can see,
 * placed by azimuth and elevation on a concentric watch face.
 *
 * Each satellite is a disc carrying its vehicle number: the bearing sets the
 * angle, the elevation the distance from the centre, so a satellite overhead
 * sits at the middle of the face and one on the horizon at the outer ring.
 * A filled disc marks a satellite the receiver uses in its fix; a tinted one
 * marks a satellite it can see but does not use.
 *
 * ## Features / Variants
 *
 * - **`priority`:** `regular` (default) draws the markers in neutral greys,
 *   `enhanced` in the accent ramp.
 * - **`colorByConstellation`:** gives each constellation its own hue from the
 *   categorical palette, so a mixed-constellation fix is readable at a glance.
 *   A satellite with no `constellation` keeps the `priority` hue.
 * - **`showLegend`:** a key for the constellations present, in the lower left.
 * - **`showLabels`:** azimuth labels every 45° outside the ring.
 *
 * ## Usage Guidelines
 *
 * Use when the operator needs to see where the fix is coming from — a gap in
 * the sky, a constellation low on the horizon, satellites dropping out of the
 * solution. For position drift against a commanded point use
 * `obc-position-deviation`; for combined attitude use `obc-pitch-roll-yaw`.
 *
 * ## Best Practices
 *
 * - Pass elevation in degrees, not a normalised radius — the component owns
 *   the mapping from elevation to distance and clamps out-of-range values.
 * - Keep `id` short. The marker is 24 px across and the design's numbers run
 *   to three digits.
 *
 * ## Example
 *
 * ```html
 * <obc-gnss-skyplot colorByConstellation showLegend></obc-gnss-skyplot>
 * <script>
 *   document.querySelector('obc-gnss-skyplot').satellites = [
 *     {id: 23, azimuth: 45, elevation: 62, constellation: 'gps', tracked: true},
 *     {id: 7, azimuth: 310, elevation: 18, constellation: 'beidou'},
 *   ];
 * </script>
 * ```
 *
 * @property satellites - The satellites to plot; each carries its own azimuth, elevation,
 *   constellation and tracked state.
 * @property priority - Color priority of the markers that have no constellation hue.
 * @property colorByConstellation - When `true`, the marker hue comes from the satellite's
 *   `constellation` instead of `priority`.
 * @property showLegend - When `true`, shows a key for the constellations present.
 * @availableWhen showLegend colorByConstellation==true
 * @property showLabels - When `true` (default), shows the azimuth labels outside the ring.
 * @property faceDiameter - Outer-ring diameter in CSS pixels. When set, the instrument renders at a
 *   fixed intrinsic size derived from the ring and label reserve, so instruments
 *   sharing the same value have identical ring circumference. When unset
 *   (default), the instrument fills its container.
 * @experimental
 */
@customElement('obc-gnss-skyplot')
export class ObcGnssSkyplot extends LitElement {
  @property({type: Array, attribute: false}) satellites: Satellite[] = [];
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: Boolean}) colorByConstellation = false;
  @property({type: Boolean}) showLegend = false;
  @property({type: Boolean, attribute: false}) showLabels = true;
  @property({type: Number, attribute: 'face-diameter'})
  faceDiameter: number | undefined;

  private _resizeController = new ResizeController(this, {});
  private _frame: RadialFrame | undefined;
  /** Whether the host size styles were set by applyPinnedHostSize. */
  private _hostSizePinned = false;

  override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    observeInnerBox(this._resizeController, this.renderRoot);
  }

  override updated(changed: PropertyValues): void {
    super.updated(changed);
    this._hostSizePinned = applyPinnedHostSize(
      this,
      this._frame,
      this._hostSizePinned
    );
  }

  /** Distance from the centre for an elevation, clamped to the visible sky. */
  private radiusFor(elevation: number): number {
    const safe = Number.isFinite(elevation) ? clamp(elevation, 0, 90) : 0;
    return (SCALE_RADIUS * (90 - safe)) / 90;
  }

  /** The hue class a satellite's marker carries. */
  private hueFor(satellite: Satellite): string {
    if (this.colorByConstellation && satellite.constellation) {
      return `hue-${satellite.constellation}`;
    }
    return this.priority === Priority.enhanced ? 'hue-enhanced' : 'hue-regular';
  }

  /** The constellations present, in enum order, for the legend. */
  private get legendEntries(): SatelliteConstellation[] {
    const present = new Set(
      this.satellites
        .map((s) => s.constellation)
        .filter((c): c is SatelliteConstellation => c !== undefined)
    );
    return Object.values(SatelliteConstellation).filter((c) => present.has(c));
  }

  private renderSatellites() {
    return this.satellites.map((satellite) => {
      const radius = this.radiusFor(satellite.elevation);
      const rad = degToRad(satellite.azimuth);
      const x = radius * Math.sin(rad);
      const y = -radius * Math.cos(rad);
      const classes = `marker ${this.hueFor(satellite)} ${
        satellite.tracked ? 'tracked' : ''
      }`;
      return svg`
        <g class=${classes} transform="translate(${x} ${y})">
          <circle
            r=${MARKER_RADIUS + 0.5}
            class="marker-halo"
            vector-effect="non-scaling-stroke"
          />
          <circle
            r=${MARKER_RADIUS - 0.5}
            class="marker-disc"
            vector-effect="non-scaling-stroke"
          />
          <text class="marker-id">${satellite.id}</text>
        </g>
      `;
    });
  }

  private renderLegend() {
    const entries = this.legendEntries;
    // The swatches carry constellation hues; without colorByConstellation the
    // markers do not, and the key would contradict the plot.
    if (
      !this.showLegend ||
      !this.colorByConstellation ||
      entries.length === 0
    ) {
      return nothing;
    }
    return html`
      <div class="legend">
        ${entries.map(
          (constellation) => html`
            <div class="legend-item">
              <span class="legend-swatch hue-${constellation}"></span>
              <span class="legend-label"
                >${CONSTELLATION_NAMES[constellation]}</span
              >
            </div>
          `
        )}
      </div>
    `;
  }

  override render() {
    const frame = computeRadialFrame({
      basePadding: 24,
      labelWidthPx: this.showLabels ? estimateLabelWidthPx(AZIMUTH_LABELS) : 0,
      containerPx: measureContainerPx(this),
      faceDiameter: this.faceDiameter,
    });
    this._frame = frame;

    const showLabels = this.showLabels && !frame.labelsHidden;
    const tickmarks: Tickmark[] = AZIMUTH_LABELS.map((text, index) => ({
      angle: index * 45,
      type: TickmarkType.main,
      text: showLabels ? text : undefined,
    }));

    return html`
      <div class="container">
        <obc-watch
          .arcFrame=${frame}
          .watchCircleType=${WatchCircleType.single}
          .tickmarks=${tickmarks}
          .priority=${this.priority}
        ></obc-watch>
        <svg viewBox=${frame.viewBox} style="--scale: ${frame.scale}">
          ${concentricGrid({
            radius: SCALE_RADIUS,
            divisions: GRID_DIVISIONS,
            spokes: AZIMUTH_LABELS.length,
            // The watch's inner ring already sits on the outermost division.
            hasOuterRing: false,
          })}
          ${this.renderSatellites()}
        </svg>
        ${this.renderLegend()}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gnss-skyplot': ObcGnssSkyplot;
  }
}
