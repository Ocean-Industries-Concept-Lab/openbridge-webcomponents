import {LitElement, html, css, nothing, svg, type SVGTemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {
  verticalScaleTickmarks,
  watchfaceLinear,
} from '../../building-blocks/instrument-linear/instrument-linear.js';
import {
  LinearAdvice,
  resolveLinearAdvice,
} from '../../building-blocks/instrument-linear/advice.js';
import {VesselImage} from '../watch/watch.js';
import {vesselImages} from '../watch/vessel.js';
import {Priority} from '../types.js';

/** Height of the scales and of the centre panel, in SVG units. */
const BOX_HEIGHT = 336;
/** Width of one scale column, matching `obc-heave`. */
const GAUGE_WIDTH = 72;
/** Width of the tick lane inside a scale column. */
const SCALE_WIDTH = 24;
/** Distance from the centre to each scale column's centre. */
const GAUGE_OFFSET = BOX_HEIGHT / 2 - GAUGE_WIDTH / 2;
/** Half-width of the centre panel, i.e. the gap between the two columns. */
const CENTRE_HALF_WIDTH = GAUGE_OFFSET - GAUGE_WIDTH / 2;
/** Vessel box side, and its vertical offset from the waterline (Figma). */
const VESSEL_SIZE = 177.5;
const VESSEL_OFFSET_Y = 4.5;

/**
 * `<obc-draft-trim>` — Fore and aft draught indicator.
 *
 * Shows the draught at the bow and the stern on two vertical scales either
 * side of a vessel side view, each filled from the waterline down to its
 * measured value. The difference between the two is the vessel's trim.
 *
 * The centre panel is a static reference: the vessel sits at the waterline
 * and does not pitch with the trim — the two scales carry the values.
 *
 * @element obc-draft-trim
 * @experimental
 */
@customElement('obc-draft-trim')
export class ObcDraftTrim extends LitElement {
  /** Draught at the bow, positive below the waterline. */
  @property({type: Number}) draftFore = 0;
  /** Draught at the stern, positive below the waterline. */
  @property({type: Number}) draftAft = 0;
  /**
   * Half-extent of both scales. Each spans `±instrumentRange` around the
   * waterline, so the upper half reads as freeboard.
   */
  @property({type: Number}) instrumentRange = 10;
  /**
   * Advice zones, in the same positive-below-the-waterline units as the
   * draughts. Applied to both scales; each is triggered by its own draught.
   */
  @property({type: Array}) advice: LinearAdvice[] = [];
  @property({type: String}) vesselImage: VesselImage = VesselImage.psvSide;
  @property({type: String}) priority: Priority = Priority.regular;

  /**
   * Scale value for a draught. The scales run positive-up like `obc-heave`,
   * so a draught — measured downward from the waterline — is negated.
   */
  private scaleValue(draft: number): number {
    return -draft;
  }

  /** The advice zones mapped into scale space, so they too read downward. */
  private get scaleAdvice(): LinearAdvice[] {
    return this.advice.map((a) => ({...a, min: -a.max, max: -a.min}));
  }

  private renderScale(draft: number, mirrored: boolean): SVGTemplateResult {
    const value = this.scaleValue(draft);
    const gauge = watchfaceLinear(
      {
        height: BOX_HEIGHT,
        width: GAUGE_WIDTH,
        scaleWidth: SCALE_WIDTH,
        minValue: -this.instrumentRange,
        maxValue: this.instrumentRange,
      },
      [{min: Math.min(0, value), max: Math.max(0, value)}],
      {value},
      {container: 'var(--instrument-frame-primary-color)'},
      {
        hideContainer: false,
        off: false,
        priority: this.priority,
        maskId: mirrored ? 'draftAftMask' : 'draftForeMask',
      },
      verticalScaleTickmarks(this.instrumentRange),
      resolveLinearAdvice(
        this.scaleAdvice,
        Math.min(0, value),
        Math.max(0, value)
      )
    );
    const x = mirrored ? -GAUGE_OFFSET : GAUGE_OFFSET;
    return svg`<g transform="translate(${x}, 0)${mirrored ? ' scale(-1, 1)' : ''}">${gauge}</g>`;
  }

  private renderCentre(): SVGTemplateResult {
    const w = CENTRE_HALF_WIDTH;
    const h = BOX_HEIGHT / 2;
    const line = (y: number) =>
      svg`<line
        x1=${-w} x2=${w} y1=${y} y2=${y}
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />`;
    return svg`
      <rect
        x=${-w} y="0" width=${w * 2} height=${h}
        fill="var(--instrument-frame-secondary-color)"
      />
      ${line(-h)} ${line(0)} ${line(h)}
    `;
  }

  private renderVessel(): SVGTemplateResult {
    const scale = VESSEL_SIZE / 160;
    return svg`
      <g transform="translate(0, ${VESSEL_OFFSET_Y}) scale(${scale}) translate(-80, -80)">
        ${this.vesselImage ? vesselImages[this.vesselImage] : nothing}
      </g>
    `;
  }

  override render() {
    return html`
      <div class="container">
        <svg viewBox="-200 -200 400 400">
          ${this.renderCentre()} ${this.renderVessel()}
          ${this.renderScale(this.draftAft, true)}
          ${this.renderScale(this.draftFore, false)}
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
