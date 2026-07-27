import {LitElement, html, svg, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './speed-directions.css?inline';
import {VesselImage, vesselImages} from '../watch/watch.js';
import {
  SpeedDirectionsType,
  SpeedDirectionsFrameStyle,
  SpeedAxis,
  speedSteps,
  barLengthUnits,
  chevronCell,
  ATHWART_AXIS_OFFSET,
  VESSEL_CENTER_Y,
  FLAT_VIEWBOX,
} from './speed-directions-geometry.js';
import {renderSpeedChevrons, renderSpeedBar} from './speed-directions-art.js';
// (Task 5 adds renderAxisLine to this import when axis lines land.)

export {SpeedDirectionsType, SpeedDirectionsFrameStyle};

/**
 * Speed Directions - all-in-one directional speed instrument showing a vessel
 * top view with speed indicators along the vessel axes.
 *
 * ## Features / Variants
 * - Three indicator types: stepped chevron arrows on three axes
 *   (`alongAthwartArrows`), proportional bars with chevron tips
 *   (`alongAthwartBars`), and two-axis chevrons (`longLatArrows`).
 * - Three frame styles: `standalone`, `framed` (rounded square with center
 *   cross lines), `compass` (watch face with main tickmarks and north arrow).
 * - Value-driven: signed speeds in knots; an indicator renders only when its
 *   speed property is defined.
 *
 * ## Usage Guidelines
 * Use for docking/maneuvering speed overviews. For a single stepped-arrow
 * readout, use `obc-speed-arrows` instead.
 *
 * @experimental The API of this component is under design review and may
 * change in a future release.
 */
@customElement('obc-speed-directions')
export class ObcSpeedDirections extends LitElement {
  @property({type: String})
  type: SpeedDirectionsType = SpeedDirectionsType.alongAthwartArrows;

  @property({type: String})
  frameStyle: SpeedDirectionsFrameStyle = SpeedDirectionsFrameStyle.standalone;

  /** Signed speed along the vessel axis: positive fore, negative aft. */
  @property({type: Number})
  speedAlongKnots?: number = undefined;

  /**
   * Signed athwart speed at the bow: positive starboard, negative port.
   * @availableWhen type!=longLatArrows
   */
  @property({type: Number})
  speedAthwartBowKnots?: number = undefined;

  /**
   * Signed athwart speed at the stern: positive starboard, negative port.
   * @availableWhen type!=longLatArrows
   */
  @property({type: Number})
  speedAthwartSternKnots?: number = undefined;

  /**
   * Signed athwart speed at midship: positive starboard, negative port.
   * @availableWhen type==longLatArrows
   */
  @property({type: Number})
  speedAthwartKnots?: number = undefined;

  /** Knots per chevron step on the along axis. */
  @property({type: Number})
  alongSpeedStepKnots = 3;

  /** Knots per chevron step on the athwart axes. */
  @property({type: Number})
  athwartSpeedStepKnots = 1;

  /**
   * Along speed mapped to the full bar length.
   * @availableWhen type==alongAthwartBars
   */
  @property({type: Number})
  alongMaxSpeedKnots = 9;

  /**
   * Athwart speed mapped to the full bar length.
   * @availableWhen type==alongAthwartBars
   */
  @property({type: Number})
  athwartMaxSpeedKnots = 3;

  /**
   * Render inactive chevron bands as a tinted track.
   * @availableWhen type!=alongAthwartBars
   */
  @property({type: Boolean})
  tintedArrows = false;

  /**
   * Vessel image for the framed and compass styles; the standalone style
   * follows the design's fixed per-type vessel.
   * @availableWhen frameStyle!=standalone
   */
  @property({type: String})
  vesselImage: VesselImage = VesselImage.psvTop;

  private get isLongLat(): boolean {
    return this.type === SpeedDirectionsType.longLatArrows;
  }

  private axisSpeed(axis: SpeedAxis): number | undefined {
    switch (axis) {
      case 'along':
        return this.speedAlongKnots;
      case 'athwartBow':
        return this.speedAthwartBowKnots;
      case 'athwartStern':
        return this.speedAthwartSternKnots;
      case 'athwartMid':
        return this.speedAthwartKnots;
    }
  }

  private get axes(): SpeedAxis[] {
    return this.isLongLat
      ? ['along', 'athwartMid']
      : ['along', 'athwartBow', 'athwartStern'];
  }

  private stepKnots(axis: SpeedAxis): number {
    return axis === 'along'
      ? this.alongSpeedStepKnots
      : this.athwartSpeedStepKnots;
  }

  private renderChevronIndicators() {
    return this.axes.map((axis) => {
      const value = this.axisSpeed(axis);
      if (value === undefined) return nothing;
      const count = speedSteps(value, this.stepKnots(axis));
      const cell = chevronCell(this.type, this.frameStyle, axis, value >= 0);
      return renderSpeedChevrons(cell, count, this.tintedArrows);
    });
  }

  private renderVessel() {
    const standalone = this.frameStyle === SpeedDirectionsFrameStyle.standalone;
    const bars = this.type === SpeedDirectionsType.alongAthwartBars;
    const image = standalone
      ? bars
        ? VesselImage.psvTop
        : VesselImage.genericTop
      : this.vesselImage;
    const scale = standalone && !bars ? 2 : 1;
    return svg`<g transform="translate(0 ${VESSEL_CENTER_Y}) scale(${scale}) translate(-80 -80)">${vesselImages[image]}</g>`;
  }

  private renderContent() {
    const bars = this.type === SpeedDirectionsType.alongAthwartBars;
    if (bars) {
      return svg`${this.renderBarIndicators()}${this.renderVessel()}`;
    }
    return svg`${this.renderVessel()}${this.renderChevronIndicators()}`;
  }

  private renderBarIndicators() {
    const maxFor = (axis: SpeedAxis) =>
      axis === 'along' ? this.alongMaxSpeedKnots : this.athwartMaxSpeedKnots;
    return this.axes.map((axis) => {
      const value = this.axisSpeed(axis);
      if (value === undefined) return nothing;
      const length = barLengthUnits(value, maxFor(axis));
      const tip = speedSteps(value, this.stepKnots(axis));
      const originY =
        axis === 'athwartBow'
          ? -ATHWART_AXIS_OFFSET
          : axis === 'athwartStern'
            ? ATHWART_AXIS_OFFSET
            : 0;
      const rotation =
        axis === 'along' ? (value >= 0 ? 0 : 180) : value >= 0 ? 90 : 270;
      return renderSpeedBar(0, originY, rotation, length, tip);
    });
  }

  override render() {
    return html`<div class="container">
      <svg
        viewBox=${FLAT_VIEWBOX}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${this.renderContent()}
      </svg>
    </div>`;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-speed-directions': ObcSpeedDirections;
  }
}
