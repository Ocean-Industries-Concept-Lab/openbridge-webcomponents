import {LitElement, html, css, nothing} from 'lit';
import {customElement} from '../../decorator.js';
import {
  LINEAR_LABEL_COLUMN,
  LINEAR_LABEL_GAP,
  formatLinearLabel,
  linearScaleLabel,
  watchfaceLinear,
} from '../../building-blocks/instrument-linear/instrument-linear.js';
import {property, state} from 'lit/decorators.js';
import type {PropertyValues} from 'lit';
import {VesselImage} from '../watch/watch.js';
import {vesselImages} from '../watch/vessel.js';
import {
  LinearAdvice,
  LinearAdviceRaw,
} from '../../building-blocks/instrument-linear/advice.js';
import {AdviceState} from '../watch/advice.js';
import {Priority} from '../types.js';
import {
  DEPTH_RANGES,
  resolveDepthRange,
  type DepthRange,
} from '../depth/depth-shared.js';

/** Drawn frame, in viewBox units; the viewBox is 384 so the labels fit beside it. */
const FRAME = 336;
const HALF_FRAME = FRAME / 2;
const VIEWBOX = 384;
const FRAME_RADIUS = 8;
/** The gauge pill: bar lane plus tick lane, at the frame's right edge. */
const GAUGE_WIDTH = 72;
const SCALE_WIDTH = 24;
/** Keel of the fore silhouettes in the 160-unit art, measured from its centre. */
const VESSEL_KEEL_OFFSET = 7;
const VESSEL_ART_HALF = 80;

/**
 * `<obc-depth-actual>` — draught and depth below the keel in cross section.
 *
 * A vessel sits on the waterline with its keel on the draft line; the seabed
 * pattern starts at the depth line. The gauge pill on the right fills from
 * the surface to the draft (dark) and to the depth (light) and marks the
 * depth with a pill. The three design ranges (Shallow 25, Regular 100, Deep
 * 1000) also decide how much air shows above the waterline and how large
 * the vessel is drawn; `autoRange` steps between them as the depth changes.
 *
 * @property depth - Depth below the surface.
 * @property draft - Draught, drawn as the vessel's keel line.
 * @property advice - Advice zones on the gauge, in depth units.
 * @property vesselScale - Factor on the range's vessel size.
 * @availableWhen vesselScale vesselImage!=''
 * @property vesselImage - Fore-view silhouette.
 * @property priority - `enhanced` draws the fills and lines in the enhanced palette.
 * @property ranges - Range ladder shared with `obc-depth`.
 * @property maxDepth - Explicit scale maximum; wins over `autoRange`.
 * @property autoRange - Steps the ladder with `depth`.
 * @property instrumentRange - Alias of `maxDepth`, kept for existing consumers.
 * @property primaryTickmarkInterval - Overrides the range's primary tick interval.
 * @property secondaryTickmarkInterval - Overrides the range's secondary tick interval.
 * @stable
 */
@customElement('obc-depth-actual')
export class ObcDepthActual extends LitElement {
  @property({type: Number}) depth = 0;
  @property({type: Number}) draft = 0;
  @property({type: Array}) advice: LinearAdvice[] = [];
  @property({type: Number}) vesselScale = 1;
  @property({type: String}) vesselImage: VesselImage = VesselImage.psvFore;
  @property({type: String}) priority: Priority = Priority.regular;

  @property({type: Array, attribute: false}) ranges: readonly DepthRange[] =
    DEPTH_RANGES;
  @property({type: Number}) maxDepth?: number = undefined;
  @property({type: Boolean}) autoRange = false;
  @property({type: Number}) primaryTickmarkInterval?: number = undefined;
  @property({type: Number}) secondaryTickmarkInterval?: number = undefined;

  /** @deprecated Use `maxDepth`. */
  @property({type: Number})
  get instrumentRange(): number | undefined {
    return this.maxDepth;
  }
  set instrumentRange(value: number | undefined) {
    this.maxDepth = value;
  }

  @state() private _range: DepthRange = DEPTH_RANGES[1];

  override willUpdate(changed: PropertyValues) {
    if (
      changed.has('depth') ||
      changed.has('maxDepth') ||
      changed.has('autoRange') ||
      changed.has('ranges')
    ) {
      this._range = resolveDepthRange({
        ranges: this.ranges,
        maxDepth: this.maxDepth,
        autoRange: this.autoRange,
        dataMax: this.depth,
        current: this._range,
      });
    }
  }

  /** The range in use. */
  get range(): DepthRange {
    return this._range;
  }

  /** Scale space is positive-up, so depths are negated. */
  private _toValue(value: number) {
    return -value;
  }

  private _getAdvice(): LinearAdviceRaw[] {
    return this.advice.map((advice) => {
      const isActive = this.depth >= advice.min && this.depth <= advice.max;
      const state = isActive
        ? AdviceState.triggered
        : advice.hinted
          ? AdviceState.hinted
          : AdviceState.regular;
      return {
        ...advice,
        min: this._toValue(advice.max),
        max: this._toValue(advice.min),
        state,
      } satisfies LinearAdviceRaw;
    });
  }

  override render() {
    const range = this._range;
    const maxDepth = range.maxDepth;
    const airHeight = range.airFraction * FRAME;
    const waterHeight = FRAME - airHeight;
    const waterTop = -HALF_FRAME + airHeight;
    const unitsPerDepth = waterHeight / maxDepth;
    const toY = (depth: number) => waterTop + depth * unitsPerDepth;
    const dividerX = HALF_FRAME - GAUGE_WIDTH;
    const scaleX = HALF_FRAME - SCALE_WIDTH;
    const labelX = HALF_FRAME + LINEAR_LABEL_GAP + LINEAR_LABEL_COLUMN / 2;
    const primary =
      this.primaryTickmarkInterval ?? range.primaryTickmarkInterval;
    const secondary =
      this.secondaryTickmarkInterval ?? range.secondaryTickmarkInterval;
    const darkColor =
      this.priority === Priority.enhanced
        ? 'var(--instrument-enhanced-secondary-color)'
        : 'var(--instrument-regular-secondary-color)';
    const vesselFactor = range.vesselScale * this.vesselScale;
    const depthY = toY(Math.min(this.depth, maxDepth));

    // The air band is labelled on the same scale, at the primary interval.
    // TODO(designer): the design's Regular exports a "25" over a 20 m air band (#1248).
    const airDepth = airHeight / unitsPerDepth;
    const airLabels = [];
    for (let v = primary; primary > 0 && v <= airDepth + 1e-9; v += primary) {
      airLabels.push(linearScaleLabel(labelX, toY(-v), formatLinearLabel(v)));
    }

    const frameOutline = `M ${HALF_FRAME} 0
      V ${-HALF_FRAME + FRAME_RADIUS}
      a ${FRAME_RADIUS} ${FRAME_RADIUS} 0 0 0 ${-FRAME_RADIUS} ${-FRAME_RADIUS}
      H ${-HALF_FRAME + FRAME_RADIUS}
      a ${FRAME_RADIUS} ${FRAME_RADIUS} 0 0 0 ${-FRAME_RADIUS} ${FRAME_RADIUS}
      V ${HALF_FRAME - FRAME_RADIUS}
      a ${FRAME_RADIUS} ${FRAME_RADIUS} 0 0 0 ${FRAME_RADIUS} ${FRAME_RADIUS}
      H ${HALF_FRAME - FRAME_RADIUS}
      a ${FRAME_RADIUS} ${FRAME_RADIUS} 0 0 0 ${FRAME_RADIUS} ${-FRAME_RADIUS}
      Z`;

    return html`
      <div class="container">
        <svg viewBox="${-VIEWBOX / 2} ${-VIEWBOX / 2} ${VIEWBOX} ${VIEWBOX}">
          <defs>
            <mask id="frameMask">
              <rect
                x=${-HALF_FRAME}
                y=${-HALF_FRAME}
                width=${FRAME}
                height=${FRAME}
                rx=${FRAME_RADIUS}
                fill="white"
              />
            </mask>
            <clipPath id="waterClip">
              <rect
                x=${-HALF_FRAME}
                y=${waterTop}
                width=${FRAME}
                height=${waterHeight}
                rx=${FRAME_RADIUS}
              />
            </clipPath>
            <pattern
              id="seabedPattern"
              patternUnits="userSpaceOnUse"
              patternTransform="matrix(8 0 0 16 ${-HALF_FRAME} ${depthY})"
              preserveAspectRatio="none"
              viewBox="0 0 16 32"
              width="1"
              height="1"
            >
              <g id="seabedInner">
                <rect
                  x="6"
                  y="6"
                  width="4"
                  height="4"
                  fill="var(--instrument-frame-tertiary-color)"
                />
              </g>
              <use xlink:href="#seabedInner" transform="translate(-16 0)" />
              <use xlink:href="#seabedInner" transform="translate(-8 16)" />
              <use xlink:href="#seabedInner" transform="translate(8 16)" />
            </pattern>
          </defs>

          <g mask="url(#frameMask)">
            <rect
              class="water"
              x=${-HALF_FRAME}
              y=${waterTop}
              width=${FRAME}
              height=${waterHeight}
              rx=${FRAME_RADIUS}
              fill="var(--instrument-frame-secondary-color)"
            />
            <rect
              class="seabed"
              x=${-HALF_FRAME}
              y=${depthY}
              width=${dividerX + HALF_FRAME}
              height=${HALF_FRAME - depthY}
              fill="url(#seabedPattern)"
            />
            <g
              transform="translate(${-GAUGE_WIDTH / 2}, ${toY(this.draft) -
              VESSEL_KEEL_OFFSET *
                vesselFactor}) scale(${vesselFactor}) translate(${-VESSEL_ART_HALF}, ${-VESSEL_ART_HALF})"
            >
              ${this.vesselImage ? vesselImages[this.vesselImage] : nothing}
            </g>
            <line
              class="draft-line"
              x1=${-HALF_FRAME}
              x2=${dividerX}
              y1=${toY(this.draft)}
              y2=${toY(this.draft)}
              stroke=${darkColor}
              stroke-width="1"
              vector-effect="non-scaling-stroke"
            />
            <line
              class="depth-line"
              x1=${-HALF_FRAME}
              x2=${dividerX}
              y1=${depthY}
              y2=${depthY}
              stroke=${darkColor}
              stroke-width="1"
              vector-effect="non-scaling-stroke"
            />
            <rect
              class="scale-lane"
              clip-path="url(#waterClip)"
              x=${scaleX}
              y=${waterTop}
              width=${SCALE_WIDTH}
              height=${waterHeight}
              fill="var(--instrument-frame-primary-color)"
            />
            <line
              class="divider"
              x1=${dividerX}
              x2=${dividerX}
              y1=${waterTop}
              y2=${HALF_FRAME}
              stroke="var(--instrument-frame-tertiary-color)"
              stroke-width="1"
              vector-effect="non-scaling-stroke"
            />
          </g>

          <g
            transform="translate(${dividerX + GAUGE_WIDTH / 2}, ${waterTop +
            waterHeight / 2})"
          >
            ${watchfaceLinear(
              {
                height: waterHeight,
                minValue: this._toValue(maxDepth),
                maxValue: this._toValue(0),
                width: GAUGE_WIDTH,
                scaleWidth: SCALE_WIDTH,
              },
              [
                {
                  min: this._toValue(Math.min(this.depth, maxDepth)),
                  max: this._toValue(0),
                },
                {
                  min: this._toValue(this.draft),
                  max: this._toValue(0),
                  fill: darkColor,
                },
              ],
              // A depth at or past the range end has no place to mark.
              // TODO(designer): the design's Deep example hides it; primary
              // ticks stay 20 units against the design's 24 (#1248).
              this.depth < maxDepth
                ? {value: this._toValue(this.depth)}
                : undefined,
              {container: 'var(--instrument-frame-primary-color)'},
              {
                hideContainer: true,
                hideTrack: true,
                off: false,
                priority: this.priority,
              },
              {
                primaryTickmarkInterval: primary,
                secondaryTickmarkInterval: secondary,
                labels: true,
                labelFormatter: (v) => formatLinearLabel(-v),
              },
              this._getAdvice()
            )}
          </g>
          ${airLabels}

          <path
            d=${frameOutline}
            stroke="var(--instrument-frame-tertiary-color)"
            fill="none"
            vector-effect="non-scaling-stroke"
          />
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

    svg {
      overflow: visible; /* the label column sits outside the frame, as in the design */
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-depth-actual': ObcDepthActual;
  }
}
