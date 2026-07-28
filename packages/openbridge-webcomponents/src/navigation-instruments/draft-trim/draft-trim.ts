import {LitElement, html, css, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {watchfaceLinear} from '../../building-blocks/instrument-linear/instrument-linear.js';
import {VesselImage} from '../watch/watch.js';
import {vesselImages} from '../watch/vessel.js';
import {Priority} from '../types.js';

const GAUGE_WIDTH = 120;
const GAUGE_HEIGHT = 384;
const SCALE_WIDTH = 48;
const GAUGE_CENTER_X = 132;
const PANEL_HALF_WIDTH = 96;
const PANEL_HALF_HEIGHT = 168;
const WATER_INSET = 2;
const VESSEL_BASE_SCALE = 1.11;

/**
 * Draft-trim instrument
 *
 * Displays the vessel's draft at the aft and fore ends as two vertical linear
 * gauges, together with a side-profile vessel image tilted by the trim angle.
 * Each gauge fills from the waterline down to the measured draft and marks the
 * value with a rounded bar.
 *
 * ## Features / Variants
 * - Aft draft gauge on the left (scale facing outward) and fore draft gauge on
 *   the right, both spanning `-instrumentRange` to `instrumentRange` with the
 *   waterline at the center.
 * - Regular and enhanced color variants via the `priority` property.
 * - Configurable vessel image (side-profile), vessel scale, and tick mark
 *   intervals.
 *
 * ## Usage Guidelines
 * Use this component to show fore/aft draft readings and the resulting trim
 * attitude. For vertical motion around a mean level, use `obc-heave`; for
 * distance to the seabed, use `obc-depth-actual`.
 */
@customElement('obc-draft-trim')
export class ObcDraftTrim extends LitElement {
  @property({type: Number}) draftAft = 0;
  @property({type: Number}) draftFore = 0;
  /** Trim angle in degrees; positive values tilt the bow down. */
  @property({type: Number}) trim = 0;
  /** Draft value at the bottom of each gauge; the waterline is at zero. */
  @property({type: Number}) instrumentRange = 10;
  @property({type: Number}) primaryTickmarkInterval = 5;
  @property({type: Number}) secondaryTickmarkInterval = 1;
  @property({type: String}) vesselImage: VesselImage = VesselImage.psvSide;
  /** @availableWhen vesselImage!='' */
  @property({type: Number}) vesselScale = 1;
  @property({type: String}) priority: Priority = Priority.regular;

  private renderGauge(draft: number) {
    return watchfaceLinear(
      {
        height: GAUGE_HEIGHT,
        width: GAUGE_WIDTH,
        scaleWidth: SCALE_WIDTH,
        minValue: -this.instrumentRange,
        maxValue: this.instrumentRange,
      },
      [{min: -draft, max: 0}],
      {value: -draft},
      {container: 'var(--instrument-frame-primary-color)'},
      {hideContainer: false, off: false, priority: this.priority},
      {
        mainTickmarks: [0],
        primaryTickmarkInterval: this.primaryTickmarkInterval,
        secondaryTickmarkInterval: this.secondaryTickmarkInterval,
      },
      []
    );
  }

  override render() {
    const vesselScale = VESSEL_BASE_SCALE * this.vesselScale;

    return html`
      <div class="container">
        <svg viewBox="-192 -192 384 384">
          <rect
            x=${-PANEL_HALF_WIDTH + WATER_INSET}
            y="0"
            width=${(PANEL_HALF_WIDTH - WATER_INSET) * 2}
            height=${PANEL_HALF_HEIGHT}
            fill="var(--instrument-frame-secondary-color)"
          />
          <line
            x1=${-PANEL_HALF_WIDTH}
            x2=${PANEL_HALF_WIDTH}
            y1=${-PANEL_HALF_HEIGHT}
            y2=${-PANEL_HALF_HEIGHT}
            stroke="var(--instrument-frame-tertiary-color)"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
          <line
            x1=${-PANEL_HALF_WIDTH}
            x2=${PANEL_HALF_WIDTH}
            y1=${PANEL_HALF_HEIGHT}
            y2=${PANEL_HALF_HEIGHT}
            stroke="var(--instrument-frame-tertiary-color)"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
          <line
            x1=${-PANEL_HALF_WIDTH}
            x2=${PANEL_HALF_WIDTH}
            y1="0"
            y2="0"
            stroke="var(--instrument-frame-tertiary-color)"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
          <g
            style="transform: rotate(${this
              .trim}deg) scale(${vesselScale}) translate(-80px, -80px);"
          >
            ${this.vesselImage ? vesselImages[this.vesselImage] : nothing}
          </g>
          <g transform="translate(${GAUGE_CENTER_X}, 0)">
            ${this.renderGauge(this.draftFore)}
          </g>
          <g transform="translate(${-GAUGE_CENTER_X}, 0) scale(-1, 1)">
            ${this.renderGauge(this.draftAft)}
          </g>
        </svg>
      </div>
    `;
  }

  static override styles = css`
    * {
      box-sizing: border-box;
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .container > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-draft-trim': ObcDraftTrim;
  }
}
