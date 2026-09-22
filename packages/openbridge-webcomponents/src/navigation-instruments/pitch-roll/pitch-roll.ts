import {LitElement, css, html, nothing, svg} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {
  VesselImage,
  VesselImageSize,
  WatchCircleType,
  type WatchArea,
  OUTER_RING_RADIUS,
  innerRingRadiusFor,
  vesselImages,
} from '../watch/watch.js';
import {arcTickmarks, TickmarkType} from '../watch/tickmark.js';
import {AdviceState, AdviceType, AngleAdviceRaw} from '../watch/advice.js';
import {customElement} from '../../decorator.js';
import {Priority} from '../types.js';
import {
  centerReadoutStyles,
  renderCenterReadouts,
} from '../readout/center-readout.js';
import {ReadoutSize} from '../readout/readout.js';
import {
  computeZoomToFitArcFrame,
  normalizeArcAngle,
  shiftArcFrameToOuterEdge,
} from '../../svghelpers/arc-frame.js';
import {degToRad, radToDeg} from '../../svghelpers/math.js';

export enum PitchRollPriorityElement {
  pitch = 'pitch',
  roll = 'roll',
}

export enum PitchRollType {
  /**
   * Pitch and roll arcs on both opposing sides (default). Unlike
   * `obc-pitch`/`obc-roll` this is the default, because it is the historical
   * behaviour of `obc-pitch-roll`.
   */
  dualScale = 'dual-scale',
  /**
   * One pitch arc on the right and one roll arc at the bottom, with a thin
   * ring completing the circle and rotating indicator lines in the centre.
   */
  singleScale = 'single-scale',
}

/** Half-side of the centre overlay viewBox in SVG units. */
const CENTRE_HALF = 200;

/**
 * Minimum diagonal Euclidean distance (in central-layer / display
 * pixels on the default 400 px container) required between adjacent
 * zoomed arc bands' nearest corners (inner-to-inner and outer-to-outer
 * checked, the smaller binds). When two adjacent requested arcs would
 * sit closer than this — or actually overlap — both axes' visible arcs
 * are shortened (ratio-preserving so `aP : aR = pitchReq : rollReq`)
 * just enough to reach this clearance. The frame itself stays
 * unchanged so band thickness, position and zoom level keep matching
 * the standalone `obc-pitch` / `obc-roll` instruments.
 */
const CORNER_GAP_PX = 32;

/** Numerical safety floor when an axis arc has to collapse for clearance. */
const MIN_ARC_HALF_DEG = 2;

/**
 * @property type - `dual-scale` (default) shows pitch and roll arcs on both opposing sides;
 *   `single-scale` shows one pitch arc on the right and one roll arc at the
 *   bottom, completed by a thin ring.
 * @availableWhen triggerPitchAdvice maxPitchAdvice!=undefined
 * @availableWhen triggerRollAdvice maxRollAdvice!=undefined
 * @property hasReadout - When `true`, the centre shows two stacked `<obc-readout>`s (pitch above
 *   roll) instead of the vessel images. Default `false`.
 * @property pitchLabel - Label for the pitch readout. Default `Pitch`.
 * @availableWhen pitchLabel hasReadout==true
 * @property rollLabel - Label for the roll readout. Default `Roll`.
 * @availableWhen rollLabel hasReadout==true
 * @property unit - Unit shown in both readouts. Default `DEG`.
 * @availableWhen unit hasReadout==true
 * @property fractionDigits - Number of fraction digits shown in both readouts. Default `0`.
 * @availableWhen fractionDigits hasReadout==true
 * @property arcAngle - Half-extent of each of the four watch arcs in degrees, measured from the
 *   arc's natural center (0°/90°/180°/270°). Each arc spans
 *   `center ± arcAngle`. Default `30` reproduces the historical 60°-wide
 *   arcs; smaller values produce narrower arcs that, combined with
 *   `zoomToFitArc`, reveal more detail in the relevant motion range.
 * @property pitchArcAngle - Per-axis override for the pitch arcs, top and bottom, falling back to
 *   `arcAngle` when undefined — for rectangular layouts where pitch and roll
 *   need different angular extents.
 * @property rollArcAngle - Per-axis override for the roll arcs, left and right, falling back to
 *   `arcAngle` when undefined.
 * @stable
 */
@customElement('obc-pitch-roll')
export class ObcPitchRoll extends LitElement {
  @property({type: String}) type: PitchRollType = PitchRollType.dualScale;
  @property({type: Number}) pitch = 0;
  @property({type: Number}) roll = 0;
  @property({type: Number}) minAvgPitch = 0;
  @property({type: Number}) maxAvgPitch = 0;
  @property({type: Number}) minAvgRoll = 0;
  @property({type: Number}) maxAvgRoll = 0;
  @property({type: String}) vesselImageFore: VesselImage = VesselImage.psvFore;
  @property({type: String}) vesselImageSide: VesselImage = VesselImage.psvSide;
  @property({type: Number}) scaleForeImage = 1;
  @property({type: Number}) maxPitchAdvice: number | undefined = undefined;
  @property({type: Number}) maxRollAdvice: number | undefined = undefined;
  @property({type: Boolean}) triggerPitchAdvice = false;
  @property({type: Boolean}) triggerRollAdvice = false;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: Array, attribute: false})
  priorityElements: PitchRollPriorityElement[] = [
    PitchRollPriorityElement.pitch,
    PitchRollPriorityElement.roll,
  ];
  @property({type: Boolean}) hasReadout: boolean = false;
  @property({type: String}) pitchLabel = 'Pitch';
  @property({type: String}) rollLabel = 'Roll';
  @property({type: String}) unit = 'DEG';
  @property({type: Number}) fractionDigits = 0;
  @property({type: Boolean}) zoomToFitArc: boolean = false;
  @property({type: Number}) arcAngle: number = 30;
  @property({type: Number}) pitchArcAngle?: number;
  @property({type: Number}) rollArcAngle?: number;

  private priorityFor(element: PitchRollPriorityElement): Priority {
    const selected = Array.isArray(this.priorityElements)
      ? this.priorityElements
      : [];
    return selected.includes(element) ? this.priority : Priority.regular;
  }

  private needleColor(element: PitchRollPriorityElement): string {
    return this.priorityFor(element) === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private barColor(element: PitchRollPriorityElement): string {
    return this.priorityFor(element) === Priority.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  private get normalizedScaleForeImage(): number {
    if (!Number.isFinite(this.scaleForeImage)) {
      return 1;
    }
    return Math.max(0, Math.min(2, this.scaleForeImage));
  }

  /** Requested (clamped to a minimum) half-extent for each axis. */
  private get requestedPitchArcAngle(): number {
    return normalizeArcAngle(this.pitchArcAngle ?? this.arcAngle, 30);
  }
  private get requestedRollArcAngle(): number {
    return normalizeArcAngle(this.rollArcAngle ?? this.arcAngle, 30);
  }

  private get isSingleScale(): boolean {
    return this.type === PitchRollType.singleScale;
  }

  override render() {
    const pitchReq = this.requestedPitchArcAngle;
    const rollReq = this.requestedRollArcAngle;
    const areas: WatchArea[] = [
      {
        startAngle: 90 - pitchReq,
        endAngle: 90 + pitchReq,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
      {
        startAngle: 180 - rollReq,
        endAngle: 180 + rollReq,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
    ];
    if (!this.isSingleScale) {
      areas.push(
        {
          startAngle: 270 - pitchReq,
          endAngle: 270 + pitchReq,
          roundOutsideCut: true,
          roundInsideCut: true,
        },
        {
          startAngle: 360 - rollReq,
          endAngle: rollReq,
          roundOutsideCut: true,
          roundInsideCut: true,
        }
      );
    }

    const overlayViewBox = `-${CENTRE_HALF} -${CENTRE_HALF} ${CENTRE_HALF * 2} ${CENTRE_HALF * 2}`;
    const vesselScale = 224 / 160;

    return html`
      <div class="container">
        <svg viewBox="${overlayViewBox}">
          ${
            this.isSingleScale && !this.zoomToFitArc
              ? this.renderRingComplement(pitchReq, rollReq)
              : nothing
          }
          ${
            this.hasReadout
              ? nothing
              : svg`
            ${
              this.isSingleScale
                ? svg`
                  <line
                    x1=${-OUTER_RING_RADIUS}
                    y1="0"
                    x2=${OUTER_RING_RADIUS}
                    y2="0"
                    stroke="var(--instrument-frame-tertiary-color)"
                  />
                  <line
                    x1="0"
                    y1=${-OUTER_RING_RADIUS}
                    x2="0"
                    y2=${OUTER_RING_RADIUS}
                    stroke="var(--instrument-frame-tertiary-color)"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2=${OUTER_RING_RADIUS - 10}
                    y2="0"
                    stroke="${this.needleColor(PitchRollPriorityElement.pitch)}"
                    transform="rotate(${this.pitch} 0 0)"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2=${OUTER_RING_RADIUS - 10}
                    stroke="${this.needleColor(PitchRollPriorityElement.roll)}"
                    transform="rotate(${this.roll} 0 0)"
                  />
                `
                : svg`
                  <line
                    x1="-150"
                    y1="0"
                    x2="150"
                    y2="0"
                    stroke="var(--instrument-frame-tertiary-color)"
                  />
                `
            }
            <g
              style="transform: rotate(${this.pitch}deg) scale(${vesselScale}) translate(-80px, -80px);"
            >
              ${this.zoomToFitArc ? vesselImages[this.vesselImageSide] : nothing}
            </g>
            <g
              style="transform: rotate(${this.roll}deg) scale(${vesselScale * this.normalizedScaleForeImage}) translate(-80px, -80px);"
            >
              ${this.zoomToFitArc ? vesselImages[this.vesselImageFore] : nothing}
            </g>
          `
          }
        </svg>
        ${
          this.zoomToFitArc
            ? this.renderZoomedArcs(pitchReq, rollReq)
            : this.renderFullWatch(areas)
        }
        ${
          this.hasReadout
            ? html`<div class="readout">
                ${renderCenterReadouts([
                  {
                    value: this.pitch,
                    label: this.pitchLabel,
                    unit: this.unit,
                    fractionDigits: this.fractionDigits,
                    size: ReadoutSize.large,
                    priority: this.priorityFor(PitchRollPriorityElement.pitch),
                  },
                  {
                    value: this.roll,
                    label: this.rollLabel,
                    unit: this.unit,
                    fractionDigits: this.fractionDigits,
                    size: ReadoutSize.large,
                    priority: this.priorityFor(PitchRollPriorityElement.roll),
                  },
                ])}
              </div>`
            : nothing
        }
      </div>
    `;
  }

  /**
   * Thin ring segments completing the circle between the single-scale arcs:
   * one short segment between the pitch (right) and roll (bottom) arcs, and
   * one long segment the other way around (left and top).
   */
  private renderRingComplement(pitchArc: number, rollArc: number) {
    const r = OUTER_RING_RADIUS;
    const pt = (deg: number): [number, number] => {
      const rad = degToRad(deg - 90);
      return [r * Math.cos(rad), r * Math.sin(rad)];
    };
    const segment = (from: number, to: number) => {
      if (to - from <= 0) {
        return nothing;
      }
      const [x1, y1] = pt(from);
      const [x2, y2] = pt(to);
      const large = to - from > 180 ? 1 : 0;
      return svg`
        <path
          d="M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}"
          fill="none"
          stroke="var(--instrument-frame-tertiary-color)"
        />
      `;
    };
    return svg`
      ${segment(90 + pitchArc, 180 - rollArc)}
      ${segment(180 + rollArc, 450 - pitchArc)}
    `;
  }

  /**
   * Zoomed-arc layer: four CSS-rotated `<obc-watch>` instances, each
   * containing a single arc rendered at the watch's natural top
   * (`0° ± arcAngle`). Each watch handles its own `zoomToFitArc` framing
   * so each visible arc spans almost the full container — exactly like the
   * pitch and roll narrow stories. The four are rotated 0 / 90 / 180 / 270
   * to land at top / right / bottom / left. Top + bottom carry pitch data,
   * left + right carry roll data.
   *
   * Each axis can request its own half-extent via `pitchArcAngle` /
   * `rollArcAngle`. The zoom-fit frame for each axis is computed with the
   * EXACT same math as `obc-pitch` / `obc-roll` at the requested
   * half-extent (same band thickness, same zoom level, same position) so
   * each cardinal sub-watch matches its standalone equivalent. With the
   * frames left untouched, two requested arcs may overlap at the
   * diagonals; to avoid that, both arcs are shortened (ratio-preserving:
   * `aP : aR = pitchReq : rollReq`) just enough that the diagonal
   * Euclidean distance between adjacent inner BBOX corners equals
   * {@link CORNER_GAP_PX}. The shortened half-extent is passed only to
   * the band's `areas` (and clamped advices) so the sub-watch renders a
   * shorter band with its native rounded end-caps; the frame itself is
   * unchanged.
   */
  private renderZoomedArcs(pitchReq: number, rollReq: number) {
    // ---- Per-axis zoom-fit frames (requested half-extents) -------------
    const ext = 48;
    const targetSize = (176 + ext) * 2;
    const innerNat = innerRingRadiusFor(WatchCircleType.double);
    const buildFrame = (halfDeg: number) => {
      const areas: WatchArea[] = [
        {
          startAngle: -halfDeg,
          endAngle: halfDeg,
          roundOutsideCut: true,
          roundInsideCut: true,
        },
      ];
      const baseFrame = computeZoomToFitArcFrame({
        areas,
        outerRadius: OUTER_RING_RADIUS,
        innerRadius: innerNat,
        extension: ext,
        targetSize,
      });
      const subArcFrame = shiftArcFrameToOuterEdge(
        baseFrame,
        OUTER_RING_RADIUS + baseFrame.radiusOffset,
        OUTER_RING_RADIUS,
        CENTRE_HALF
      );
      // Display scale: how many container px per obc-watch SVG unit.
      const scale = (CENTRE_HALF * 2) / subArcFrame.width;
      // Band radii in container px. `radiusOffset` shifts both, so the band
      // keeps its thickness; both arcs are centred on the watch SVG origin,
      // which sits `outerR - OR` along the band's cardinal direction.
      const outerR = (OUTER_RING_RADIUS + baseFrame.radiusOffset) * scale;
      const innerR = (innerNat + baseFrame.radiusOffset) * scale;
      return {subArcFrame, outerR, innerR};
    };
    // Frames are built at the REQUESTED half-extents — identical to
    // what `obc-pitch` / `obc-roll` produce when `zoomToFitArc=true`.
    // Each cardinal sub-watch therefore matches its standalone
    // equivalent (band thickness, length, position, zoom level).
    const pitchFrame = buildFrame(pitchReq);
    const rollFrame = buildFrame(rollReq);

    // Corner clearance is bought by shortening the visible arc, never by
    // moving the frames: only the half-extent passed to the band's `areas`
    // shrinks, so thickness, position and zoom stay as the standalone
    // instrument renders them.
    const OR = OUTER_RING_RADIUS;
    const aPreqRad = degToRad(pitchReq);
    const aRreqRad = degToRad(rollReq);
    /**
     * Signed diagonal gap between one corner pair, in container px.
     *
     * A band's edge endpoints at angle θ from its cardinal are
     * `P_out(θ) = (outerR·sinθ, (outerR − OR) − outerR·cosθ)` on the outer
     * edge and `P_in(θ)` with `innerR` on the inner edge; the right band is
     * that template rotated 90° clockwise, `(x, y) → (−y, x)`. What binds the
     * pitch–roll layout is the diagonal between the top band's right corners
     * and the right band's top corners: inner-corner against inner-corner and
     * outer-corner against outer-corner. Cap-line endpoints lie on the same
     * arcs, so every other point of the cap is at least as far away.
     *
     * The result is positive when the pair is diagonally clear — both Δx and
     * Δy positive — and negative once either projection has crossed, its
     * magnitude being the Euclidean distance between the corners. The caller
     * bisects on a scalar `s ∈ [0, 1]` (`aP = pitchReq·s`, `aR = rollReq·s`),
     * which preserves the requested pitch-to-roll ratio, until the smaller of
     * the inner and outer gaps reaches `CORNER_GAP_PX`.
     */
    const signedDist = (
      px: number,
      py: number,
      qx: number,
      qy: number
    ): number => {
      const dx = qx - px;
      const dy = qy - py;
      const mag = Math.hypot(dx, dy);
      return dx > 0 && dy > 0 ? mag : -mag;
    };
    const cornerGaps = (
      apRad: number,
      arRad: number
    ): {inner: number; outer: number} => {
      const cosP = Math.cos(apRad);
      const sinP = Math.sin(apRad);
      const cosR = Math.cos(arRad);
      const sinR = Math.sin(arRad);
      // Top band's right corners (container coords).
      const p1x = pitchFrame.innerR * sinP;
      const p1y = pitchFrame.outerR - OR - pitchFrame.innerR * cosP;
      const p2x = pitchFrame.outerR * sinP;
      const p2y = pitchFrame.outerR - OR - pitchFrame.outerR * cosP;
      // Right band's top corners = top template's left corners rotated
      // 90° CW: (x, y) → (−y, x).
      // Top template's −aR inner corner: (−innerR·sin aR,
      //   (outerR−OR) − innerR·cos aR) → rotated:
      //   (OR − outerR + innerR·cos aR, −innerR·sin aR)
      const q1x = OR - rollFrame.outerR + rollFrame.innerR * cosR;
      const q1y = -rollFrame.innerR * sinR;
      const q2x = OR - rollFrame.outerR + rollFrame.outerR * cosR;
      const q2y = -rollFrame.outerR * sinR;
      return {
        inner: signedDist(p1x, p1y, q1x, q1y),
        outer: signedDist(p2x, p2y, q2x, q2y),
      };
    };
    const minGap = (apRad: number, arRad: number): number => {
      const g = cornerGaps(apRad, arRad);
      return Math.min(g.inner, g.outer);
    };
    let aP = aPreqRad;
    let aR = aRreqRad;
    if (minGap(aPreqRad, aRreqRad) < CORNER_GAP_PX) {
      let lo = 0;
      let hi = 1;
      for (let i = 0; i < 40; i++) {
        const mid = (lo + hi) / 2;
        if (minGap(aPreqRad * mid, aRreqRad * mid) >= CORNER_GAP_PX) {
          lo = mid;
        } else {
          hi = mid;
        }
      }
      aP = aPreqRad * lo;
      aR = aRreqRad * lo;
    }
    const pitchClampedDeg = Math.max(MIN_ARC_HALF_DEG, radToDeg(aP));
    const rollClampedDeg = Math.max(MIN_ARC_HALF_DEG, radToDeg(aR));

    const subAreas = (halfDeg: number): WatchArea[] => [
      {
        startAngle: -halfDeg,
        endAngle: halfDeg,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
    ];
    const pitchAreas = subAreas(pitchClampedDeg);
    const rollAreas = subAreas(rollClampedDeg);

    const pitchAdvices = this.subAdvices('pitch', pitchClampedDeg);
    const rollAdvices = this.subAdvices('roll', rollClampedDeg);

    // Ladders span the CLAMPED extent so ticks never fall outside the band
    // that is actually drawn (or outside the sector clip below).
    const pitchTickmarks = [
      {angle: 0, type: TickmarkType.main},
      ...arcTickmarks(0, pitchClampedDeg),
    ];
    const rollTickmarks = [
      {angle: 0, type: TickmarkType.main},
      ...arcTickmarks(0, rollClampedDeg),
    ];

    /**
     * Clip path for one sub-watch, covering the angular sector the arc
     * actually draws.
     *
     * Without it the indicator pill and the bar's end-of-range limit lines
     * leak past the visible band whenever the value falls outside the clamped
     * range; advices are clamped to the band extent in `subAdvices`, so the
     * clip never touches them. The shape is a triangle in the element's CSS
     * box — one vertex at the watch origin, two where the sector edges meet
     * the top edge — built in unrotated local coordinates, so the CSS
     * rotation carries it to the right cardinal side.
     */
    const sectorClip = (
      halfDeg: number,
      frame: typeof rollFrame.subArcFrame
    ): string => {
      // Watch origin (SVG 0,0) in CSS percentages of the element box.
      // Element fills the 100% × 100% .container; obc-watch fills it with
      // viewBox = frame.{x,y,width,height}, so SVG (0,0) sits at:
      //   (-frame.x / frame.width, -frame.y / frame.height)
      const oxPct = (-frame.x / frame.width) * 100;
      const oyPct = (-frame.y / frame.height) * 100;
      // Sector half-angle, expressed as the horizontal offset (in pct)
      // a ray reaches when traveling from the origin up to the top edge.
      const dxPct = oyPct * Math.tan(degToRad(halfDeg));
      // Clamp to box bounds so half-angles ≥ 45° still produce a polygon
      // that reaches the corners instead of going off-canvas.
      const lx = Math.max(0, oxPct - dxPct);
      const rx = Math.min(100, oxPct + dxPct);
      return `polygon(${oxPct}% ${oyPct}%, ${lx}% 0%, ${rx}% 0%)`;
    };
    const pitchClip = sectorClip(pitchClampedDeg, pitchFrame.subArcFrame);
    const rollClip = sectorClip(rollClampedDeg, rollFrame.subArcFrame);

    const rollNeedles = [
      {
        angle: this.roll,
        fillColor: this.needleColor(PitchRollPriorityElement.roll),
        strokeColor: 'var(--border-silhouette-color)',
      },
    ];
    const pitchNeedles = [
      {
        angle: this.pitch,
        fillColor: this.needleColor(PitchRollPriorityElement.pitch),
        strokeColor: 'var(--border-silhouette-color)',
      },
    ];
    const rollBars = [
      {
        startAngle: this.minAvgRoll,
        endAngle: this.maxAvgRoll,
        fillColor: this.barColor(PitchRollPriorityElement.roll),
      },
    ];
    const pitchBars = [
      {
        startAngle: this.minAvgPitch,
        endAngle: this.maxAvgPitch,
        fillColor: this.barColor(PitchRollPriorityElement.pitch),
      },
    ];

    const subWatch = (
      rotation: number,
      arcFrame: typeof rollFrame.subArcFrame,
      areas: WatchArea[],
      barAreas: typeof rollBars,
      needles: typeof rollNeedles,
      advices: AngleAdviceRaw[],
      clipPath: string,
      tickmarks: typeof rollTickmarks
    ) => html`
      <obc-watch
        class="sub-watch"
        style="transform: rotate(${rotation}deg); clip-path: ${clipPath};"
        .watchCircleType=${WatchCircleType.double}
        .zoomToFitArc=${true}
        .arcFrame=${arcFrame}
        .areas=${areas}
        .barAreas=${barAreas}
        .needles=${needles}
        .vessels=${[]}
        .tickmarks=${tickmarks}
        .advices=${advices}
      ></obc-watch>
    `;

    return html`
      ${
        this.isSingleScale
          ? nothing
          : subWatch(
              0,
              rollFrame.subArcFrame,
              rollAreas,
              rollBars,
              rollNeedles,
              rollAdvices,
              rollClip,
              rollTickmarks
            )
      }
      ${subWatch(
        90,
        pitchFrame.subArcFrame,
        pitchAreas,
        pitchBars,
        pitchNeedles,
        pitchAdvices,
        pitchClip,
        pitchTickmarks
      )}
      ${subWatch(
        180,
        rollFrame.subArcFrame,
        rollAreas,
        rollBars,
        rollNeedles,
        rollAdvices,
        rollClip,
        rollTickmarks
      )}
      ${
        this.isSingleScale
          ? nothing
          : subWatch(
              270,
              pitchFrame.subArcFrame,
              pitchAreas,
              pitchBars,
              pitchNeedles,
              pitchAdvices,
              pitchClip,
              pitchTickmarks
            )
      }
    `;
  }

  /**
   * Caution advices for a single sub-watch axis, emitted at sub-watch local
   * angles (centred on 0°). The outer extent is clamped to the actually
   * rendered band half-extent (`halfDeg`) so advices fit naturally inside
   * the visible arc and are not visually cropped by the sub-watch's sector
   * clip-path. The clip-path itself remains in place to crop the needle.
   */
  private subAdvices(
    axis: 'pitch' | 'roll',
    halfDeg: number
  ): AngleAdviceRaw[] {
    const advices: AngleAdviceRaw[] = [];
    const max = axis === 'pitch' ? this.maxPitchAdvice : this.maxRollAdvice;
    if (max === undefined) return advices;
    const trigger =
      axis === 'pitch' ? this.triggerPitchAdvice : this.triggerRollAdvice;
    const cap = axis === 'pitch' ? 30 : 45;
    const outer = Math.min(halfDeg, cap);
    const inner = Math.min(max, outer);
    const state = trigger ? AdviceState.triggered : AdviceState.regular;
    advices.push({
      minAngle: -outer,
      maxAngle: -inner,
      type: AdviceType.caution,
      state,
      hideMinTickmark: true,
    });
    advices.push({
      minAngle: inner,
      maxAngle: outer,
      type: AdviceType.caution,
      state,
      hideMaxTickmark: true,
    });
    return advices;
  }

  /** Full unzoomed watch — original single-instance render. */
  private renderFullWatch(areas: WatchArea[]) {
    const barAreas = [
      {
        startAngle: 180 + this.minAvgRoll,
        endAngle: 180 + this.maxAvgRoll,
        fillColor: this.barColor(PitchRollPriorityElement.roll),
      },
      {
        startAngle: 90 + this.minAvgPitch,
        endAngle: 90 + this.maxAvgPitch,
        fillColor: this.barColor(PitchRollPriorityElement.pitch),
      },
    ];
    const needles = [
      {
        angle: 180 + this.roll,
        fillColor: this.needleColor(PitchRollPriorityElement.roll),
        strokeColor: 'var(--border-silhouette-color)',
      },
      {
        angle: 90 + this.pitch,
        fillColor: this.needleColor(PitchRollPriorityElement.pitch),
        strokeColor: 'var(--border-silhouette-color)',
      },
    ];
    const tickmarks = [
      {angle: 90, type: TickmarkType.main},
      {angle: 180, type: TickmarkType.main},
      ...arcTickmarks(90, this.requestedPitchArcAngle),
      ...arcTickmarks(180, this.requestedRollArcAngle),
    ];
    if (!this.isSingleScale) {
      barAreas.push(
        {
          startAngle: this.minAvgRoll,
          endAngle: this.maxAvgRoll,
          fillColor: this.barColor(PitchRollPriorityElement.roll),
        },
        {
          startAngle: 270 + this.minAvgPitch,
          endAngle: 270 + this.maxAvgPitch,
          fillColor: this.barColor(PitchRollPriorityElement.pitch),
        }
      );
      needles.push(
        {
          angle: this.roll,
          fillColor: this.needleColor(PitchRollPriorityElement.roll),
          strokeColor: 'var(--border-silhouette-color)',
        },
        {
          angle: 270 + this.pitch,
          fillColor: this.needleColor(PitchRollPriorityElement.pitch),
          strokeColor: 'var(--border-silhouette-color)',
        }
      );
      tickmarks.push(
        {angle: 0, type: TickmarkType.main},
        {angle: 270, type: TickmarkType.main},
        ...arcTickmarks(0, this.requestedRollArcAngle),
        ...arcTickmarks(270, this.requestedPitchArcAngle)
      );
    }

    return html`
      <obc-watch
        .watchCircleType=${WatchCircleType.double}
        .zoomToFitArc=${false}
        .areas=${areas}
        .barAreas=${barAreas}
        .needles=${needles}
        .vessels=${
          this.hasReadout
            ? []
            : [
                {
                  size: VesselImageSize.large,
                  vesselImage: this.vesselImageSide,
                  transform: `rotate(${this.pitch}deg)`,
                },
                {
                  size: VesselImageSize.large,
                  vesselImage: this.vesselImageFore,
                  transform: `rotate(${this.roll}deg) scale(${this.normalizedScaleForeImage})`,
                },
              ]
        }
        .tickmarks=${tickmarks}
        .advices=${this.advices}
      ></obc-watch>
    `;
  }

  private get advices(): AngleAdviceRaw[] {
    const pitchReq = this.requestedPitchArcAngle;
    const rollReq = this.requestedRollArcAngle;
    const advices = [];
    if (this.maxPitchAdvice !== undefined) {
      const outer = Math.min(pitchReq, 30);
      const inner = Math.min(this.maxPitchAdvice, outer);
      const state = this.triggerPitchAdvice
        ? AdviceState.triggered
        : AdviceState.regular;
      advices.push({
        minAngle: 90 - outer,
        maxAngle: 90 - inner,
        type: AdviceType.caution,
        state: state,
        hideMinTickmark: true,
      });
      advices.push({
        minAngle: 90 + inner,
        maxAngle: 90 + outer,
        type: AdviceType.caution,
        state: state,
        hideMaxTickmark: true,
      });
      if (!this.isSingleScale) {
        advices.push({
          minAngle: 270 - outer,
          maxAngle: 270 - inner,
          type: AdviceType.caution,
          state: state,
          hideMinTickmark: true,
        });
        advices.push({
          minAngle: 270 + inner,
          maxAngle: 270 + outer,
          type: AdviceType.caution,
          state: state,
          hideMaxTickmark: true,
        });
      }
    }
    if (this.maxRollAdvice !== undefined) {
      const outer = Math.min(rollReq, 45);
      const inner = Math.min(this.maxRollAdvice, outer);
      const state = this.triggerRollAdvice
        ? AdviceState.triggered
        : AdviceState.regular;
      advices.push({
        minAngle: 180 - outer,
        maxAngle: 180 - inner,
        type: AdviceType.caution,
        state: state,
        hideMinTickmark: true,
      });
      advices.push({
        minAngle: 180 + inner,
        maxAngle: 180 + outer,
        type: AdviceType.caution,
        state: state,
        hideMaxTickmark: true,
      });
      if (!this.isSingleScale) {
        advices.push({
          minAngle: -outer,
          maxAngle: -inner,
          type: AdviceType.caution,
          state: state,
          hideMinTickmark: true,
        });
        advices.push({
          minAngle: inner,
          maxAngle: outer,
          type: AdviceType.caution,
          state: state,
          hideMaxTickmark: true,
        });
      }
    }
    return advices;
  }

  static override styles = [
    centerReadoutStyles,
    css`
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
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pitch-roll': ObcPitchRoll;
  }
}
