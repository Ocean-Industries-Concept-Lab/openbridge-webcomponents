import {LitElement, css, html, nothing, svg, type SVGTemplateResult} from 'lit';
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
import {arcTickmarks, TickmarkType, type Tickmark} from '../watch/tickmark.js';
import {AdviceState, AdviceType, type AngleAdviceRaw} from '../watch/advice.js';
import {customElement} from '../../decorator.js';
import {Priority} from '../types.js';
import {
  CenterReadoutArrangement,
  centerReadoutStyles,
  renderCenterReadouts,
} from '../readout/center-readout.js';
import {ReadoutSize} from '../readout/readout.js';
import {
  computeZoomToFitArcFrame,
  normalizeArcAngle,
  shiftArcFrameToOuterEdge,
} from '../../svghelpers/arc-frame.js';
import {
  linearTickInterval,
  watchfaceLinear,
} from '../../building-blocks/instrument-linear/instrument-linear.js';
import type {
  LinearAdvice,
  LinearAdviceRaw,
} from '../../building-blocks/instrument-linear/advice.js';

export enum ObcPitchRollHeaveType {
  /** Pitch on the right, roll at the bottom, heave in the left band slot. */
  singleScale = 'single-scale',
  /** Pitch and roll mirrored onto both sides, heave centred. */
  dualScale = 'dual-scale',
}

export enum PitchRollHeavePriorityElement {
  pitch = 'pitch',
  roll = 'roll',
  heave = 'heave',
}

/** Half-side of the centre overlay viewBox in SVG units. */
const CENTRE_HALF = 200;

/**
 * Minimum diagonal clearance, in central-layer pixels, between the zoomed
 * heave column and the adjacent roll band. Matches the constant
 * `obc-pitch-roll` uses between its own adjacent arcs.
 */
const CORNER_GAP_PX = 32;

/** Numerical safety floor when an axis arc has to collapse for clearance. */
const MIN_ARC_HALF_DEG = 2;

/** Width of the tick lane inside the heave column, in SVG units. */
const HEAVE_SCALE_WIDTH = 24;

/** Band thickness at the natural, un-zoomed radii. */
const NOMINAL_BAND =
  OUTER_RING_RADIUS - innerRingRadiusFor(WatchCircleType.double);

/**
 * Clearance kept between the centred (`dual-scale`) heave column's corners and
 * the surrounding band, in central-layer pixels. Sized so the un-zoomed
 * default is untouched — there the corner sits 13.2 units inside the free
 * radius — while the tighter zoomed layout is pulled back off the bands.
 */
const HEAVE_CENTRE_GAP_PX = 10;

/**
 * The band slot the heave column fills, in central-layer coordinates.
 *
 * `outerR`/`innerR` bound the slot radially; `capRadius` is the radius of the
 * pitch arc's outer edge about its own origin, which is what the column's
 * height is measured against so the two line up. Un-zoomed the two radii
 * coincide; under zoom the arc is drawn on a shifted sub-watch and they differ.
 */
interface HeaveBand {
  outerR: number;
  innerR: number;
  capRadius: number;
  pitchDeg: number;
}

/**
 * Natural size of the heave column: as thick as the band slot, and tall enough
 * that its top and bottom edges sit level with the pitch arc's end caps.
 */
function heaveColumnSize(band: HeaveBand): {width: number; height: number} {
  return {
    width: band.outerR - band.innerR,
    height: 2 * band.capRadius * Math.sin((band.pitchDeg * Math.PI) / 180),
  };
}

/**
 * Distance from a point to an axis-aligned rectangle; 0 when the point is
 * inside. Used to keep the zoomed roll band clear of the heave column, which
 * — unlike the arc-to-arc case — is a rectangle, so a corner may clear it on
 * one axis alone.
 */
function distanceToRect(
  px: number,
  py: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number
): number {
  const dx = Math.max(0, x0 - px, px - x1);
  const dy = Math.max(0, y0 - py, py - y1);
  return Math.hypot(dx, dy);
}

/**
 * `<obc-pitch-roll-heave>` — Combined pitch, roll and heave indicator.
 *
 * Places a pitch arc, a roll arc and a linear heave column around one watch
 * face. The heave column occupies the same radial slot as the arcs, and its
 * height is derived from the pitch arc so its top and bottom edges sit level
 * with the pitch arc's end caps.
 *
 * Variants (`type`):
 * - `single-scale` (default) — pitch on the right, roll at the bottom, heave in
 *   the left slot, vessel silhouettes in the centre.
 * - `dual-scale` — pitch and roll mirrored onto the opposite sides, with the
 *   heave column moved to the centre.
 *
 * Set `hasReadout` to replace the centre content with stacked pitch, roll and
 * heave readouts, and `zoomToFitArc` to enlarge narrow arcs so they fill the
 * available space.
 *
 * @element obc-pitch-roll-heave
 * @experimental
 */
@customElement('obc-pitch-roll-heave')
export class ObcPitchRollHeave extends LitElement {
  @property({type: String}) type: ObcPitchRollHeaveType =
    ObcPitchRollHeaveType.singleScale;

  @property({type: Number}) pitch = 0;
  @property({type: Number}) roll = 0;
  @property({type: Number}) heave = 0;
  @property({type: Number}) minAvgPitch = 0;
  @property({type: Number}) maxAvgPitch = 0;
  @property({type: Number}) minAvgRoll = 0;
  @property({type: Number}) maxAvgRoll = 0;
  @property({type: Number}) minTrendHeave = 0;
  @property({type: Number}) maxTrendHeave = 0;
  /** Half-extent of the heave scale in metres; the column spans `±heaveRange`. */
  @property({type: Number}) heaveRange = 10;

  /**
   * Half-extent of the pitch arc in degrees. Also drives the heave column
   * height, which is `2 · outerRadius · sin(pitchArcAngle)` so the column's
   * edges stay level with the pitch arc's end caps.
   */
  @property({type: Number}) pitchArcAngle = 30;
  /** Half-extent of the roll arc in degrees. */
  @property({type: Number}) rollArcAngle = 45;
  @property({type: Boolean}) zoomToFitArc = false;

  /**
   * Replaces the centre content with stacked pitch, roll and heave readouts.
   * Ignored when `type` is `dual-scale`, where the heave column occupies the
   * centre.
   * @availableWhen type==singleScale
   */
  @property({type: Boolean}) hasReadout = false;
  /** @availableWhen hasReadout==true */
  @property({type: String}) pitchLabel = 'Pitch';
  /** @availableWhen hasReadout==true */
  @property({type: String}) rollLabel = 'Roll';
  /** @availableWhen hasReadout==true */
  @property({type: String}) heaveLabel = 'Heave';
  /**
   * Unit shown in the pitch and roll readouts.
   * @availableWhen hasReadout==true
   */
  @property({type: String}) unit = 'DEG';
  /**
   * Unit shown in the heave readout.
   * @availableWhen hasReadout==true
   */
  @property({type: String}) heaveUnit = 'm';
  /** @availableWhen hasReadout==true */
  @property({type: Number}) fractionDigits = 0;

  /** @availableWhen type==singleScale && hasReadout==false */
  @property({type: String}) vesselImageFore: VesselImage = VesselImage.psvFore;
  /** @availableWhen type==singleScale && hasReadout==false */
  @property({type: String}) vesselImageSide: VesselImage = VesselImage.psvSide;
  /** @availableWhen type==singleScale && hasReadout==false */
  @property({type: Number}) scaleForeImage = 1;

  @property({type: Number}) maxPitchAdvice: number | undefined = undefined;
  @property({type: Number}) maxRollAdvice: number | undefined = undefined;
  /** @availableWhen maxPitchAdvice!=undefined */
  @property({type: Boolean}) triggerPitchAdvice = false;
  /** @availableWhen maxRollAdvice!=undefined */
  @property({type: Boolean}) triggerRollAdvice = false;
  @property({type: Array}) heaveAdvice: LinearAdvice[] = [];

  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: Array, attribute: false})
  priorityElements: PitchRollHeavePriorityElement[] = [
    PitchRollHeavePriorityElement.pitch,
    PitchRollHeavePriorityElement.roll,
    PitchRollHeavePriorityElement.heave,
  ];

  private priorityFor(element: PitchRollHeavePriorityElement): Priority {
    const selected = Array.isArray(this.priorityElements)
      ? this.priorityElements
      : [];
    return selected.includes(element) ? this.priority : Priority.regular;
  }

  private needleColor(element: PitchRollHeavePriorityElement): string {
    return this.priorityFor(element) === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private barColor(element: PitchRollHeavePriorityElement): string {
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

  private get isDualScale(): boolean {
    return this.type === ObcPitchRollHeaveType.dualScale;
  }

  /** The centre readouts replace the vessels; never available in dual scale. */
  private get showsReadout(): boolean {
    return this.hasReadout && !this.isDualScale;
  }

  /**
   * Pitch half-extent, capped so a roll arc of the minimum size still fits in
   * the remaining quadrant.
   */
  private get requestedPitchArcAngle(): number {
    return Math.min(
      90 - MIN_ARC_HALF_DEG,
      normalizeArcAngle(this.pitchArcAngle, 30)
    );
  }

  /**
   * Roll half-extent, clamped so the pitch and roll arcs cannot meet: the two
   * diagonal gaps each span `90 - pitch - roll` degrees, so the pair has to
   * stay under 90° combined.
   */
  private get requestedRollArcAngle(): number {
    const roll = normalizeArcAngle(this.rollArcAngle, 45);
    const headroom = 90 - this.requestedPitchArcAngle;
    return Math.max(MIN_ARC_HALF_DEG, Math.min(roll, headroom));
  }

  override render() {
    const pitchReq = this.requestedPitchArcAngle;
    const rollReq = this.requestedRollArcAngle;
    const overlayViewBox = `-${CENTRE_HALF} -${CENTRE_HALF} ${CENTRE_HALF * 2} ${CENTRE_HALF * 2}`;

    const layout = this.zoomToFitArc
      ? this.zoomLayout(pitchReq, rollReq)
      : undefined;
    const band: HeaveBand = layout?.band ?? {
      outerR: OUTER_RING_RADIUS,
      innerR: innerRingRadiusFor(WatchCircleType.double),
      capRadius: OUTER_RING_RADIUS,
      pitchDeg: pitchReq,
    };

    return html`
      <div class="container">
        <svg viewBox=${overlayViewBox}>
          ${this.showsReadout ? nothing : this.renderCrosshair()}
          ${this.renderOverlayVessels()}
          ${this.zoomToFitArc || this.isDualScale
            ? nothing
            : this.renderComplement(pitchReq)}
          ${this.renderHeaveColumn(band)}
        </svg>
        ${layout
          ? this.renderZoomedArcs(layout)
          : this.renderFullWatch(pitchReq, rollReq)}
        ${this.showsReadout
          ? html`<div class="readout">
              ${renderCenterReadouts(
                [
                  {
                    value: this.pitch,
                    label: this.pitchLabel,
                    unit: this.unit,
                    fractionDigits: this.fractionDigits,
                    size: ReadoutSize.large,
                    priority: this.priorityFor(
                      PitchRollHeavePriorityElement.pitch
                    ),
                  },
                  {
                    value: this.roll,
                    label: this.rollLabel,
                    unit: this.unit,
                    fractionDigits: this.fractionDigits,
                    size: ReadoutSize.large,
                    priority: this.priorityFor(
                      PitchRollHeavePriorityElement.roll
                    ),
                  },
                  {
                    value: this.heave,
                    label: this.heaveLabel,
                    unit: this.heaveUnit,
                    fractionDigits: this.fractionDigits,
                    size: ReadoutSize.large,
                    priority: this.priorityFor(
                      PitchRollHeavePriorityElement.heave
                    ),
                  },
                ],
                CenterReadoutArrangement.stacked
              )}
            </div>`
          : nothing}
      </div>
    `;
  }

  /**
   * Crosshair drawn on the overlay rather than through `obc-watch`'s own
   * `crosshairEnabled`: the design has the arc bands covering the arms, but
   * `obc-watch` renders its crosshair after the bands, i.e. on top of them.
   * Drawing it here puts it under the watch layer, so the bands and the heave
   * column mask it naturally.
   */
  private renderCrosshair(): SVGTemplateResult {
    const r = OUTER_RING_RADIUS;
    return svg`
      <line
        x1=${-r} y1="0" x2=${r} y2="0"
        stroke="var(--instrument-frame-tertiary-color)"
        vector-effect="non-scaling-stroke"
      />
      <line
        x1="0" y1=${-r} x2="0" y2=${r}
        stroke="var(--instrument-frame-tertiary-color)"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  /**
   * Vessel silhouettes on the centre layer. Only needed under zoom — the
   * un-zoomed path hands them to `obc-watch` via `vessels`, while the zoomed
   * sub-watches have no room for them.
   */
  private renderOverlayVessels(): SVGTemplateResult | typeof nothing {
    if (!this.zoomToFitArc || this.isDualScale || this.showsReadout) {
      return nothing;
    }
    const vesselScale = 224 / 160;
    return svg`
      <g style="transform: rotate(${this.pitch}deg) scale(${vesselScale}) translate(-80px, -80px);">
        ${vesselImages[this.vesselImageSide]}
      </g>
      <g style="transform: rotate(${this.roll}deg) scale(${vesselScale * this.normalizedScaleForeImage}) translate(-80px, -80px);">
        ${vesselImages[this.vesselImageFore]}
      </g>
    `;
  }

  /**
   * Thin ring bridging the empty span across the top, from where the heave
   * column's upper edge crosses the outer ring round to the pitch arc's start.
   * Because the column height is derived from the pitch arc, both ends land at
   * `±pitchArcAngle` off the vertical, making the ring symmetric. The two
   * diagonal gaps lower down are left open by design.
   */
  private renderComplement(pitchDeg: number): SVGTemplateResult {
    const r = OUTER_RING_RADIUS;
    const rad = (pitchDeg * Math.PI) / 180;
    // Ring runs clockwise from (270 + pitchDeg) through 0 to (90 - pitchDeg).
    const x1 = -r * Math.cos(rad);
    const y1 = -r * Math.sin(rad);
    const x2 = r * Math.cos(rad);
    const y2 = -r * Math.sin(rad);
    return svg`
      <path
        d="M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  /**
   * Linear heave scale, built from the same building block `obc-heave` uses.
   *
   * The column fills the band's radial slot, so its width equals the band
   * thickness and its height keeps its top and bottom edges level with the
   * pitch arc's end caps. In `single-scale` it sits in the left slot and is
   * mirrored so the tick lane faces outward; in `dual-scale` it moves to the
   * centre, unmirrored, and shrinks if the zoomed bands leave too little room.
   */
  private renderHeaveColumn(band: HeaveBand): SVGTemplateResult {
    const {width, height: naturalHeight} = heaveColumnSize(band);
    let height = naturalHeight;
    let offsetX = -(band.outerR + band.innerR) / 2;

    if (this.isDualScale) {
      offsetX = 0;
      // The centred column has to stay inside whatever the bands leave free.
      // Only the height gives way: the column's thickness reads as a match for
      // the band thickness, and shrinking both would break that.
      const free = band.innerR - HEAVE_CENTRE_GAP_PX;
      const halfWidth = width / 2;
      const maxHalfHeight =
        free > halfWidth ? Math.sqrt(free * free - halfWidth * halfWidth) : 0;
      height = Math.min(height, 2 * maxHalfHeight);
    }

    const scaleWidth = HEAVE_SCALE_WIDTH * Math.min(1, width / NOMINAL_BAND);

    const gauge = watchfaceLinear(
      {
        height,
        width,
        scaleWidth,
        minValue: -this.heaveRange,
        maxValue: this.heaveRange,
      },
      [{min: this.minTrendHeave, max: this.maxTrendHeave}],
      {value: this.heave},
      {container: 'var(--instrument-frame-primary-color)'},
      {
        hideContainer: false,
        off: false,
        priority: this.priorityFor(PitchRollHeavePriorityElement.heave),
      },
      {
        mainTickmarks: [],
        primaryTickmarkInterval: 0,
        secondaryTickmarkInterval: linearTickInterval(height, this.heaveRange),
      },
      this.heaveAdvices
    );

    const mirror = this.isDualScale ? '' : ' scale(-1, 1)';
    return svg`<g transform="translate(${offsetX}, 0)${mirror}">${gauge}</g>`;
  }

  private get heaveAdvices(): LinearAdviceRaw[] {
    return this.heaveAdvice.map((advice) => {
      const isActive =
        this.maxTrendHeave >= advice.min && this.minTrendHeave <= advice.max;
      const state = isActive
        ? AdviceState.triggered
        : advice.hinted
          ? AdviceState.hinted
          : AdviceState.regular;
      return {...advice, state} satisfies LinearAdviceRaw;
    });
  }

  /**
   * Zoom-fit geometry, computed once per render and shared by the arc layer
   * and the heave column.
   *
   * Frames are built at the REQUESTED half-extents with the same math as
   * `obc-pitch` / `obc-roll`, so each sub-watch matches its standalone
   * equivalent. Two clearance passes then shorten only the *rendered* arcs —
   * the frames stay untouched, so band thickness, position and zoom level are
   * preserved:
   *
   * 1. pitch vs roll at the diagonal, ratio-preserving, exactly as
   *    `obc-pitch-roll` does it;
   * 2. roll vs the heave column, `single-scale` only, shortening the roll arc
   *    alone. Because the column's height follows the pitch arc, pass 1 already
   *    pulls the column in whenever pitch shrinks, so pitch needs no second
   *    pass.
   */
  private zoomLayout(pitchReq: number, rollReq: number) {
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
      const scale = (CENTRE_HALF * 2) / subArcFrame.width;
      const outerR = (OUTER_RING_RADIUS + baseFrame.radiusOffset) * scale;
      const innerR = (innerNat + baseFrame.radiusOffset) * scale;
      return {subArcFrame, outerR, innerR};
    };
    const pitchFrame = buildFrame(pitchReq);
    const rollFrame = buildFrame(rollReq);

    const OR = OUTER_RING_RADIUS;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
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
    // Diagonal gap between two adjacent cardinal bands. All such gaps in this
    // layout are congruent, so one pair stands in for the rest.
    const minGap = (apRad: number, arRad: number): number => {
      const cosP = Math.cos(apRad);
      const sinP = Math.sin(apRad);
      const cosR = Math.cos(arRad);
      const sinR = Math.sin(arRad);
      const p1x = pitchFrame.innerR * sinP;
      const p1y = pitchFrame.outerR - OR - pitchFrame.innerR * cosP;
      const p2x = pitchFrame.outerR * sinP;
      const p2y = pitchFrame.outerR - OR - pitchFrame.outerR * cosP;
      const q1x = OR - rollFrame.outerR + rollFrame.innerR * cosR;
      const q1y = -rollFrame.innerR * sinR;
      const q2x = OR - rollFrame.outerR + rollFrame.outerR * cosR;
      const q2y = -rollFrame.outerR * sinR;
      return Math.min(
        signedDist(p1x, p1y, q1x, q1y),
        signedDist(p2x, p2y, q2x, q2y)
      );
    };

    let aP = toRad(pitchReq);
    let aR = toRad(rollReq);
    if (minGap(aP, aR) < CORNER_GAP_PX) {
      let lo = 0;
      let hi = 1;
      for (let i = 0; i < 40; i++) {
        const mid = (lo + hi) / 2;
        if (minGap(aP * mid, aR * mid) >= CORNER_GAP_PX) {
          lo = mid;
        } else {
          hi = mid;
        }
      }
      aP *= lo;
      aR *= lo;
    }
    const pitchClampedDeg = Math.max(MIN_ARC_HALF_DEG, (aP * 180) / Math.PI);
    let rollClampedDeg = Math.max(MIN_ARC_HALF_DEG, (aR * 180) / Math.PI);

    const bandFor = (pitchDeg: number): HeaveBand => ({
      outerR: OR,
      innerR: OR - (pitchFrame.outerR - pitchFrame.innerR),
      capRadius: pitchFrame.outerR,
      pitchDeg,
    });

    if (!this.isDualScale) {
      // Roll's left end caps versus the heave column rectangle. Shrinking the
      // roll arc moves both caps toward the bottom cardinal, away from the
      // column, so the gap grows monotonically as the scalar shrinks.
      const band = bandFor(pitchClampedDeg);
      const {width, height} = heaveColumnSize(band);
      const x1 = -band.innerR;
      const x0 = x1 - width;
      const y1 = height / 2;
      const heaveGap = (arRad: number): number => {
        const cosR = Math.cos(arRad);
        const sinR = Math.sin(arRad);
        const outerX = -rollFrame.outerR * sinR;
        const outerY = OR - rollFrame.outerR + rollFrame.outerR * cosR;
        const innerX = -rollFrame.innerR * sinR;
        const innerY = OR - rollFrame.outerR + rollFrame.innerR * cosR;
        return Math.min(
          distanceToRect(outerX, outerY, x0, -y1, x1, y1),
          distanceToRect(innerX, innerY, x0, -y1, x1, y1)
        );
      };
      if (heaveGap(toRad(rollClampedDeg)) < CORNER_GAP_PX) {
        let lo = 0;
        let hi = rollClampedDeg;
        for (let i = 0; i < 40; i++) {
          const mid = (lo + hi) / 2;
          if (heaveGap(toRad(mid)) >= CORNER_GAP_PX) {
            lo = mid;
          } else {
            hi = mid;
          }
        }
        rollClampedDeg = Math.max(MIN_ARC_HALF_DEG, lo);
      }
    }

    return {
      pitchFrame,
      rollFrame,
      pitchClampedDeg,
      rollClampedDeg,
      band: bandFor(pitchClampedDeg),
    };
  }

  /**
   * Zoomed-arc layer: CSS-rotated `<obc-watch>` instances, each holding a
   * single arc rendered at the watch's natural top and rotated onto its
   * cardinal. `single-scale` places pitch right and roll bottom; `dual-scale`
   * mirrors both. The heave column lives on the centre overlay.
   */
  private renderZoomedArcs(layout: ReturnType<typeof this.zoomLayout>) {
    const {pitchFrame, rollFrame, pitchClampedDeg, rollClampedDeg} = layout;

    const subAreas = (halfDeg: number): WatchArea[] => [
      {
        startAngle: -halfDeg,
        endAngle: halfDeg,
        roundOutsideCut: true,
        roundInsideCut: true,
      },
    ];

    // Clip each sub-watch to the sector its (possibly shortened) arc covers so
    // the indicator cannot leak past the visible band.
    const sectorClip = (
      halfDeg: number,
      frame: typeof rollFrame.subArcFrame
    ): string => {
      const oxPct = (-frame.x / frame.width) * 100;
      const oyPct = (-frame.y / frame.height) * 100;
      const dxPct = oyPct * Math.tan((halfDeg * Math.PI) / 180);
      const lx = Math.max(0, oxPct - dxPct);
      const rx = Math.min(100, oxPct + dxPct);
      return `polygon(${oxPct}% ${oyPct}%, ${lx}% 0%, ${rx}% 0%)`;
    };

    const axis = (
      element: PitchRollHeavePriorityElement,
      frame: typeof rollFrame,
      halfDeg: number,
      value: number,
      avgMin: number,
      avgMax: number,
      max: number | undefined,
      trigger: boolean,
      cap: number
    ) => ({
      arcFrame: frame.subArcFrame,
      areas: subAreas(halfDeg),
      barAreas: [
        {
          startAngle: avgMin,
          endAngle: avgMax,
          fillColor: this.barColor(element),
        },
      ],
      needles: [
        {
          angle: value,
          fillColor: this.needleColor(element),
          strokeColor: 'var(--border-silhouette-color)',
        },
      ],
      advices: this.subAdvices(halfDeg, max, trigger, cap),
      tickmarks: [
        {angle: 0, type: TickmarkType.main},
        ...arcTickmarks(0, halfDeg),
      ],
      clipPath: sectorClip(halfDeg, frame.subArcFrame),
    });

    const pitchAxis = axis(
      PitchRollHeavePriorityElement.pitch,
      pitchFrame,
      pitchClampedDeg,
      this.pitch,
      this.minAvgPitch,
      this.maxAvgPitch,
      this.maxPitchAdvice,
      this.triggerPitchAdvice,
      30
    );
    const rollAxis = axis(
      PitchRollHeavePriorityElement.roll,
      rollFrame,
      rollClampedDeg,
      this.roll,
      this.minAvgRoll,
      this.maxAvgRoll,
      this.maxRollAdvice,
      this.triggerRollAdvice,
      45
    );

    const subWatch = (rotation: number, a: typeof pitchAxis) => html`
      <obc-watch
        class="sub-watch"
        style="transform: rotate(${rotation}deg); clip-path: ${a.clipPath};"
        .watchCircleType=${WatchCircleType.double}
        .zoomToFitArc=${true}
        .arcFrame=${a.arcFrame}
        .areas=${a.areas}
        .barAreas=${a.barAreas}
        .needles=${a.needles}
        .vessels=${[]}
        .tickmarks=${a.tickmarks}
        .advices=${a.advices}
      ></obc-watch>
    `;

    return html`
      ${subWatch(90, pitchAxis)} ${subWatch(180, rollAxis)}
      ${this.isDualScale
        ? html`${subWatch(270, pitchAxis)} ${subWatch(0, rollAxis)}`
        : nothing}
    `;
  }

  /** Caution bands for one sub-watch axis, at sub-watch-local angles. */
  private subAdvices(
    halfDeg: number,
    max: number | undefined,
    trigger: boolean,
    cap: number
  ): AngleAdviceRaw[] {
    if (max === undefined) return [];
    const outer = Math.min(halfDeg, cap);
    const inner = Math.min(max, outer);
    const state = trigger ? AdviceState.triggered : AdviceState.regular;
    return [
      {
        minAngle: -outer,
        maxAngle: -inner,
        type: AdviceType.caution,
        state,
        hideMinTickmark: true,
      },
      {
        minAngle: inner,
        maxAngle: outer,
        type: AdviceType.caution,
        state,
        hideMaxTickmark: true,
      },
    ];
  }

  /** Areas, tickmarks, bars and needles for the un-zoomed single watch. */
  private renderFullWatch(pitchDeg: number, rollDeg: number) {
    const arc = (center: number, half: number): WatchArea => ({
      startAngle: center - half,
      endAngle: center + half,
      roundOutsideCut: true,
      roundInsideCut: true,
    });

    const areas: WatchArea[] = [arc(90, pitchDeg), arc(180, rollDeg)];
    const tickmarks: Tickmark[] = [
      {angle: 90, type: TickmarkType.main},
      {angle: 180, type: TickmarkType.main},
      ...arcTickmarks(90, pitchDeg),
      ...arcTickmarks(180, rollDeg),
    ];
    const barAreas = [
      {
        startAngle: 90 + this.minAvgPitch,
        endAngle: 90 + this.maxAvgPitch,
        fillColor: this.barColor(PitchRollHeavePriorityElement.pitch),
      },
      {
        startAngle: 180 + this.minAvgRoll,
        endAngle: 180 + this.maxAvgRoll,
        fillColor: this.barColor(PitchRollHeavePriorityElement.roll),
      },
    ];
    const needles = [
      {
        angle: 90 + this.pitch,
        fillColor: this.needleColor(PitchRollHeavePriorityElement.pitch),
        strokeColor: 'var(--border-silhouette-color)',
      },
      {
        angle: 180 + this.roll,
        fillColor: this.needleColor(PitchRollHeavePriorityElement.roll),
        strokeColor: 'var(--border-silhouette-color)',
      },
    ];

    if (this.isDualScale) {
      areas.push(arc(270, pitchDeg), arc(0, rollDeg));
      tickmarks.push(
        {angle: 270, type: TickmarkType.main},
        {angle: 0, type: TickmarkType.main},
        ...arcTickmarks(270, pitchDeg),
        ...arcTickmarks(0, rollDeg)
      );
      barAreas.push(
        {
          startAngle: 270 + this.minAvgPitch,
          endAngle: 270 + this.maxAvgPitch,
          fillColor: this.barColor(PitchRollHeavePriorityElement.pitch),
        },
        {
          startAngle: this.minAvgRoll,
          endAngle: this.maxAvgRoll,
          fillColor: this.barColor(PitchRollHeavePriorityElement.roll),
        }
      );
      needles.push(
        {
          angle: 270 + this.pitch,
          fillColor: this.needleColor(PitchRollHeavePriorityElement.pitch),
          strokeColor: 'var(--border-silhouette-color)',
        },
        {
          angle: this.roll,
          fillColor: this.needleColor(PitchRollHeavePriorityElement.roll),
          strokeColor: 'var(--border-silhouette-color)',
        }
      );
    }

    return html`
      <obc-watch
        .watchCircleType=${WatchCircleType.double}
        .zoomToFitArc=${false}
        .areas=${areas}
        .barAreas=${barAreas}
        .needles=${needles}
        .vessels=${this.isDualScale || this.showsReadout
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
            ]}
        .tickmarks=${tickmarks}
        .advices=${this.advices(pitchDeg, rollDeg)}
      ></obc-watch>
    `;
  }

  private advices(pitchDeg: number, rollDeg: number): AngleAdviceRaw[] {
    const advices: AngleAdviceRaw[] = [];
    const push = (
      center: number,
      halfDeg: number,
      max: number | undefined,
      trigger: boolean,
      cap: number
    ) => {
      if (max === undefined) return;
      const outer = Math.min(halfDeg, cap);
      const inner = Math.min(max, outer);
      const state = trigger ? AdviceState.triggered : AdviceState.regular;
      advices.push({
        minAngle: center - outer,
        maxAngle: center - inner,
        type: AdviceType.caution,
        state,
        hideMinTickmark: true,
      });
      advices.push({
        minAngle: center + inner,
        maxAngle: center + outer,
        type: AdviceType.caution,
        state,
        hideMaxTickmark: true,
      });
    };
    push(90, pitchDeg, this.maxPitchAdvice, this.triggerPitchAdvice, 30);
    push(180, rollDeg, this.maxRollAdvice, this.triggerRollAdvice, 45);
    if (this.isDualScale) {
      push(270, pitchDeg, this.maxPitchAdvice, this.triggerPitchAdvice, 30);
      push(0, rollDeg, this.maxRollAdvice, this.triggerRollAdvice, 45);
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
    'obc-pitch-roll-heave': ObcPitchRollHeave;
  }
}
