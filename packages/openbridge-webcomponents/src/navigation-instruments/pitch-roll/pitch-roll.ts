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
import {TickmarkType} from '../watch/tickmark.js';
import {AdviceState, AdviceType, AngleAdviceRaw} from '../watch/advice.js';
import {customElement} from '../../decorator.js';
import {Priority} from '../types.js';
import {
  computeZoomToFitArcFrame,
  normalizeArcAngle,
  shiftArcFrameToOuterEdge,
} from '../../svghelpers/arc-frame.js';

export enum PitchRollPriorityElement {
  pitch = 'pitch',
  roll = 'roll',
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

@customElement('obc-pitch-roll')
export class ObcPitchRoll extends LitElement {
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
  @property({type: Boolean}) zoomToFitArc: boolean = false;
  /**
   * Half-extent of each of the four watch arcs in degrees, measured from the
   * arc's natural center (0°/90°/180°/270°). Each arc spans
   * `center ± arcAngle`. Default `30` reproduces the historical 60°-wide
   * arcs; smaller values produce narrower arcs that, combined with
   * `zoomToFitArc`, reveal more detail in the relevant motion range.
   */
  @property({type: Number}) arcAngle: number = 30;
  /**
   * Optional per-axis override for the pitch arcs (top + bottom). Falls
   * back to {@link arcAngle} when undefined. Useful for rectangular layouts
   * where pitch and roll need different angular extents.
   */
  @property({type: Number}) pitchArcAngle?: number;
  /**
   * Optional per-axis override for the roll arcs (left + right). Falls
   * back to {@link arcAngle} when undefined.
   */
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

  override render() {
    const pitchReq = this.requestedPitchArcAngle;
    const rollReq = this.requestedRollArcAngle;
    const areas = [
      {
        startAngle: 90 - pitchReq,
        endAngle: 90 + pitchReq,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
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
      },
      {
        startAngle: 180 - rollReq,
        endAngle: 180 + rollReq,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
    ];

    const overlayViewBox = `-${CENTRE_HALF} -${CENTRE_HALF} ${CENTRE_HALF * 2} ${CENTRE_HALF * 2}`;
    const vesselScale = 224 / 160;

    return html`
      <div class="container">
        <svg viewBox="${overlayViewBox}">
          ${svg`
            <line
              x1="-150"
              y1="0"
              x2="150"
              y2="0"
              stroke="var(--instrument-frame-tertiary-color)"
            />
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
          `}
        </svg>
        ${this.zoomToFitArc
          ? this.renderZoomedArcs(pitchReq, rollReq)
          : this.renderFullWatch(areas)}
      </div>
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
    const tickmarks = [{angle: 0, type: TickmarkType.main}];

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
      // Outer- and inner-arc circle radii of the band, in central
      // (container) px. The watch renders the area between
      // (OUTER_RING_RADIUS + radiusOffset) and (innerRingRadius +
      // radiusOffset), so radiusOffset shifts BOTH radii (band
      // thickness stays constant). Both arcs are centred at the watch's
      // SVG origin; that origin sits at central-coords (0, outerR-OR)
      // along the band's cardinal direction (= outerR-OR below centre
      // for the top band).
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

    // ---- Method A: shorten visible arc to clear adjacent corners --------
    // The frames stay UNCHANGED; only the half-extent passed to the
    // band's `areas` shrinks. obc-watch then renders a shorter arc with
    // its native rounded end-caps — same band thickness, same position,
    // same zoom level.
    //
    // Geometry of one band (top, cardinal = -y in container coords):
    //   outer-edge endpoint at angle θ from cardinal
    //     P_out(θ) = (outerR·sin θ, (outerR − OR) − outerR·cos θ)
    //   inner-edge endpoint at angle θ
    //     P_in(θ)  = (innerR·sin θ, (outerR − OR) − innerR·cos θ)
    // The right band is the same template rotated 90° CW
    // (CSS rotate(90deg)): (x, y) → (−y, x).
    //
    // For pitch–roll layout the binding constraint is the diagonal
    // gap between the top band's right corners and the right band's
    // top corners (and analogously for the other three diagonals). Two
    // pairs need to clear each other:
    //   (a) inner-corner vs inner-corner   (P1 = P_in_top(+aP),
    //                                       Q1 = rotate(P_in_right(−aR)))
    //   (b) outer-corner vs outer-corner   (P2 = P_out_top(+aP),
    //                                       Q2 = rotate(P_out_right(−aR)))
    // Cap-line endpoints lie on the same arcs so any other point on
    // the cap is at least as far away.
    //
    // Define a SIGNED diagonal gap: positive when the two corners are
    // diagonally clear (both Δx > 0 AND Δy > 0), negative when either
    // projection has crossed (i.e. the bands overlap). Its magnitude
    // is the Euclidean distance between the corner pair. We bisect on
    // a scalar s ∈ [0, 1] (aP = pitchReq·s, aR = rollReq·s) so the
    // requested pitch:roll RATIO is preserved, until the MIN of the
    // inner and outer signed gaps equals CORNER_GAP_PX.
    const OR = OUTER_RING_RADIUS;
    const aPreqRad = (pitchReq * Math.PI) / 180;
    const aRreqRad = (rollReq * Math.PI) / 180;
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
    const pitchClampedDeg = Math.max(MIN_ARC_HALF_DEG, (aP * 180) / Math.PI);
    const rollClampedDeg = Math.max(MIN_ARC_HALF_DEG, (aR * 180) / Math.PI);

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

    // Clip each sub-watch to the angular sector actually covered by the
    // (possibly shortened) arc so the indicator pill and bar end-of-range
    // limit lines cannot leak past the visible band when the value falls
    // outside the clamped range. Advices are clamped to the band extent
    // in `subAdvices` so they fit naturally and are not affected by this
    // clip. The clip is a triangle in the element's CSS box, with one
    // vertex at the watch origin (SVG 0,0 mapped to CSS px) and two
    // vertices at the intersection of the sector edges with the top edge
    // of the box. Applied in unrotated local coords; CSS rotation then
    // carries it to the correct cardinal side.
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
      const dxPct = oyPct * Math.tan((halfDeg * Math.PI) / 180);
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
      clipPath: string
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
      ${subWatch(
        0,
        rollFrame.subArcFrame,
        rollAreas,
        rollBars,
        rollNeedles,
        rollAdvices,
        rollClip
      )}
      ${subWatch(
        90,
        pitchFrame.subArcFrame,
        pitchAreas,
        pitchBars,
        pitchNeedles,
        pitchAdvices,
        pitchClip
      )}
      ${subWatch(
        180,
        rollFrame.subArcFrame,
        rollAreas,
        rollBars,
        rollNeedles,
        rollAdvices,
        rollClip
      )}
      ${subWatch(
        270,
        pitchFrame.subArcFrame,
        pitchAreas,
        pitchBars,
        pitchNeedles,
        pitchAdvices,
        pitchClip
      )}
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
    return html`
      <obc-watch
        .watchCircleType=${WatchCircleType.double}
        .zoomToFitArc=${false}
        .areas=${areas}
        .barAreas=${[
          {
            startAngle: this.minAvgRoll,
            endAngle: this.maxAvgRoll,
            fillColor: this.barColor(PitchRollPriorityElement.roll),
          },
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
          {
            startAngle: 270 + this.minAvgPitch,
            endAngle: 270 + this.maxAvgPitch,
            fillColor: this.barColor(PitchRollPriorityElement.pitch),
          },
        ]}
        .needles=${[
          {
            angle: this.roll,
            fillColor: this.needleColor(PitchRollPriorityElement.roll),
            strokeColor: 'var(--border-silhouette-color)',
          },
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
          {
            angle: 270 + this.pitch,
            fillColor: this.needleColor(PitchRollPriorityElement.pitch),
            strokeColor: 'var(--border-silhouette-color)',
          },
        ]}
        .vessels=${[
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
        ]}
        .tickmarks=${[
          {angle: 0, type: TickmarkType.main},
          {angle: 90, type: TickmarkType.main},
          {angle: 180, type: TickmarkType.main},
          {angle: 270, type: TickmarkType.main},
        ]}
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
    if (this.maxRollAdvice !== undefined) {
      const outer = Math.min(rollReq, 45);
      const inner = Math.min(this.maxRollAdvice, outer);
      const state = this.triggerRollAdvice
        ? AdviceState.triggered
        : AdviceState.regular;
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
    }
    return advices;
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
    'obc-pitch-roll': ObcPitchRoll;
  }
}
