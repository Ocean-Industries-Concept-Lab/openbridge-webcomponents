import {LitElement, css, html, nothing, svg, type SVGTemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import '../../navigation-instruments/watch/watch.js';
import {
  OUTER_RING_RADIUS,
  WatchCircleType,
  innerRingRadiusFor,
  type WatchArea,
  type WatchVessel,
} from '../../navigation-instruments/watch/watch.js';
import {renderInstrumentReadout} from '../../navigation-instruments/readout/instrument-readout.js';
import {Priority} from '../../navigation-instruments/types.js';
import {TickmarkType} from '../../navigation-instruments/watch/tickmark.js';
import {
  AdviceState,
  AdviceType,
  type AngleAdviceRaw,
} from '../../navigation-instruments/watch/advice.js';
import {
  computeZoomToFitArcFrame,
  normalizeArcAngle,
  shiftArcFrameToOuterEdge,
  type ZoomToFitArcFrame,
} from '../../svghelpers/arc-frame.js';

/** Outer ring radius shared by the single-axis inclinometers. */
export const INCLINOMETER_WATCH_RADIUS = OUTER_RING_RADIUS;
/** Half-side of the centre overlay viewBox in SVG units. */
export const INCLINOMETER_CENTRE_HALF = 200;

/**
 * Abstract base for the single-axis inclinometers (`<obc-pitch>`, `<obc-roll>`).
 *
 * Captures everything the two share: the optional centre readout, the
 * `zoomToFitArc` arc-frame computation, the `regular`/`enhanced` colour getters,
 * the caution-band advice computation, the `<obc-watch>` scale layer, and the
 * two-layer (arc + centre) render scaffolding. Subclasses supply only the
 * axis-specific pieces via the abstract members: the centre angle (right vs
 * bottom), the measured value and average band, the default caution extent, and
 * the divergent centre-overlay SVG (indicator orientation, vessel scaling, and
 * the thin-ring complement paths).
 *
 * This class is conceptually abstract — it is never registered as a custom
 * element and must be subclassed. It is declared as a concrete `class` (with
 * hooks that throw if not overridden) rather than `abstract` so the
 * auto-generated framework wrappers' `createComponent` call type-checks, which
 * rejects abstract constructors. This mirrors `ObcChartLineBase`.
 *
 * @ignore This is an abstract base class. Use `obc-pitch` or `obc-roll` instead.
 * @experimental
 */
export class SingleAxisInclinometer extends LitElement {
  @property({type: Boolean}) zoomToFitArc: boolean = false;
  /**
   * When `true`, the centre shows an `<obc-readout>` with the value instead of
   * the horizon line, rotating indicator and vessel. Default `false`.
   */
  @property({type: Boolean}) hasReadout: boolean = false;
  /**
   * Colour palette for the scale fill / indicator and the readout value:
   * `regular` (default) or `enhanced`.
   */
  @property({type: String}) priority: Priority = Priority.regular;
  /**
   * Half-extent of the watch arc in degrees. The arc spans `centre ± arcAngle`
   * and values are placed at their true position within it. Default `45`
   * reproduces the historical 90°-wide arc.
   *
   * Smaller values render a narrower arc. Combined with `zoomToFitArc`, the
   * narrower arc is enlarged (its radius grows) on its own layer, while the
   * vessel image and the rotating indicator line stay at their natural size and
   * position on a separate central layer. The two layers are intentionally
   * visually disconnected.
   */
  @property({type: Number}) arcAngle: number = 45;

  protected _arcFrame: ZoomToFitArcFrame | undefined;

  // Axis-specific configuration provided by subclasses. The base implementations
  // throw; they are never reached because the class is never instantiated
  // directly (see the class-level note).
  /** Watch angle the arc is centred on (90° right for pitch, 180° bottom for roll). */
  protected get centerAngle(): number {
    throw new Error('centerAngle must be implemented in a subclass');
  }
  /** The measured value (pitch or roll) in degrees. */
  protected get value(): number {
    throw new Error('value must be implemented in a subclass');
  }
  /** Lower edge of the average band relative to the centre angle. */
  protected get avgMin(): number {
    throw new Error('avgMin must be implemented in a subclass');
  }
  /** Upper edge of the average band relative to the centre angle. */
  protected get avgMax(): number {
    throw new Error('avgMax must be implemented in a subclass');
  }
  /** Inner caution threshold; `undefined` hides the caution bands. */
  protected get maxAdvice(): number | undefined {
    throw new Error('maxAdvice must be implemented in a subclass');
  }
  /** Whether the caution bands are in the triggered state. */
  protected get triggerAdvice(): boolean {
    throw new Error('triggerAdvice must be implemented in a subclass');
  }
  /** Default outer caution extent in degrees (30° pitch, 45° roll). */
  protected get defaultAdviceOuter(): number {
    throw new Error('defaultAdviceOuter must be implemented in a subclass');
  }
  /** Whether the opposite-side scale is also shown. */
  protected get isDualScale(): boolean {
    throw new Error('isDualScale must be implemented in a subclass');
  }
  /** Vessel(s) drawn inside the scale layer in the non-zoomed, non-readout view. */
  protected get scaleVessels(): WatchVessel[] {
    throw new Error('scaleVessels must be implemented in a subclass');
  }

  // Readout configuration provided by subclasses (defaults differ per axis).
  /** Readout label. Overridden by subclasses. */
  label = '';
  /** Readout unit. Overridden by subclasses. */
  unit = '';
  /** Number of fraction digits shown in the readout. Overridden by subclasses. */
  fractionDigits = 0;

  /** Rotating indicator line in the centre overlay (orientation differs per axis). */
  protected renderIndicator(_needleTransform: string): SVGTemplateResult {
    throw new Error('renderIndicator() must be implemented in a subclass');
  }
  /** Vessel image in the centre overlay (image and scaling differ per axis). */
  protected renderVesselOverlay(_vesselScale: number): SVGTemplateResult {
    throw new Error('renderVesselOverlay() must be implemented in a subclass');
  }
  /** Thin-ring complement path(s) around the arc (geometry differs per axis). */
  protected renderComplement(_arcAngle: number): SVGTemplateResult {
    throw new Error('renderComplement() must be implemented in a subclass');
  }

  protected get scaleFillColor(): string {
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  protected get indicatorColor(): string {
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  override render() {
    const arcAngle = normalizeArcAngle(this.arcAngle, 45);
    const centerAngle = this.centerAngle;

    const areas: WatchArea[] = [
      {
        startAngle: centerAngle - arcAngle,
        endAngle: centerAngle + arcAngle,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
    ];

    if (this.zoomToFitArc) {
      const ext = 48;
      const targetSize = (176 + ext) * 2;
      // Pure arc-only fit (compass-sector style). The viewBox is centred on the
      // enlarged arc bbox, so the origin (centre of the instrument) is typically
      // OUTSIDE this viewBox. The vessel and central elements therefore need
      // their own normal-scale layer.
      const baseFrame = computeZoomToFitArcFrame({
        areas,
        outerRadius: OUTER_RING_RADIUS,
        innerRadius: innerRingRadiusFor(WatchCircleType.double),
        extension: ext,
        targetSize,
      });
      // Push the enlarged arc to the side so its outer edge aligns with the
      // central layer's outer ring. Direction is derived from the arc bbox
      // centre so left/right/top/bottom is handled automatically.
      this._arcFrame = shiftArcFrameToOuterEdge(
        baseFrame,
        OUTER_RING_RADIUS + baseFrame.radiusOffset,
        OUTER_RING_RADIUS,
        INCLINOMETER_CENTRE_HALF
      );
    } else {
      this._arcFrame = undefined;
    }

    const needleTransform = `rotate(${this.value} 0 0)`;
    const centreViewBox = `-${INCLINOMETER_CENTRE_HALF} -${INCLINOMETER_CENTRE_HALF} ${INCLINOMETER_CENTRE_HALF * 2} ${INCLINOMETER_CENTRE_HALF * 2}`;
    const vesselScale = 224 / 160;

    return html`
      <div class="container">
        <svg viewBox="${centreViewBox}">
          ${this.hasReadout
            ? nothing
            : svg`
                <line
                  x1="-${INCLINOMETER_WATCH_RADIUS}"
                  y1="0"
                  x2="${INCLINOMETER_WATCH_RADIUS}"
                  y2="0"
                  stroke="var(--instrument-frame-tertiary-color)"
                />
                ${this.renderIndicator(needleTransform)}
                ${this.renderVesselOverlay(vesselScale)}
              `}
          ${this.zoomToFitArc ? nothing : this.renderComplement(arcAngle)}
        </svg>
        ${this.renderScale(areas, false)}
        ${this.isDualScale ? this.renderScale(areas, true) : nothing}
        ${this.hasReadout
          ? html`<div class="readout">
              ${renderInstrumentReadout({
                value: this.value,
                valuePriority: this.priority,
                label: this.label,
                unit: this.unit,
                fractionDigits: this.fractionDigits,
              })}
            </div>`
          : nothing}
      </div>
    `;
  }

  // `opposite` rotates a second watch 180° onto the opposite arc for dual-scale
  // — a rotation (opposite end of the indicator), not a mirror. A separate watch
  // keeps the zoomed `arcFrame` correct.
  protected renderScale(areas: WatchArea[], opposite: boolean) {
    const centerAngle = this.centerAngle;
    return html`
      <obc-watch
        class=${opposite ? 'scale-opposite' : nothing}
        .priority=${this.priority}
        .watchCircleType=${WatchCircleType.double}
        .zoomToFitArc=${this.zoomToFitArc}
        .arcFrame=${this._arcFrame}
        tickmarksInside
        .areas=${areas}
        .barAreas=${[
          {
            startAngle: centerAngle + this.avgMin,
            endAngle: centerAngle + this.avgMax,
            fillColor: this.scaleFillColor,
          },
        ]}
        .needles=${[
          {
            angle: centerAngle + this.value,
            fillColor: this.indicatorColor,
            strokeColor: 'var(--border-silhouette-color)',
          },
        ]}
        .vessels=${opposite || this.zoomToFitArc || this.hasReadout
          ? []
          : this.scaleVessels}
        .tickmarks=${[{angle: centerAngle, type: TickmarkType.main}]}
        .advices=${this.advices}
      ></obc-watch>
    `;
  }

  protected get advices(): AngleAdviceRaw[] {
    const maxAdvice = this.maxAdvice;
    if (maxAdvice === undefined) {
      return [];
    }
    const arcAngle = normalizeArcAngle(this.arcAngle, 45);
    // Caution band fills the remainder of the arc out to the default caution
    // range (clamped to the arc edge).
    const outer = Math.min(arcAngle, this.defaultAdviceOuter);
    const inner = Math.min(maxAdvice, outer);
    const state = this.triggerAdvice
      ? AdviceState.triggered
      : AdviceState.regular;
    const centerAngle = this.centerAngle;
    return [
      {
        minAngle: centerAngle - outer,
        maxAngle: centerAngle - inner,
        type: AdviceType.caution,
        state: state,
        hideMinTickmark: true,
      },
      {
        minAngle: centerAngle + inner,
        maxAngle: centerAngle + outer,
        type: AdviceType.caution,
        state: state,
        hideMaxTickmark: true,
      },
    ];
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

    .readout {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .scale-opposite {
      transform: rotate(180deg);
    }
  `;
}
