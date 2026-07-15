import type {WatchArea} from '../navigation-instruments/watch/watch.js';
import {computeZoomToFitArcFrame, type ZoomToFitArcFrame} from './arc-frame.js';

/**
 * Shared frame computation for circular/radial watch-based instruments.
 *
 * Every radial instrument (watch, instrument-radial/gauge-radial, speed-gauge,
 * azimuth-thruster, compass, heading, rudder, pitch/roll, …) needs the same
 * three outputs to render: an SVG viewBox for `<obc-watch>` and its overlay,
 * a zoom radius offset, and — since issue #1021 — enough reserved room around
 * the outer ring that tick labels are not clipped when the instrument shrinks
 * inside a flex container.
 *
 * `computeRadialFrame()` is the single source of truth for that geometry.
 * Consumers call it once per render and pass the resulting frame to
 * `<obc-watch .arcFrame=...>` (which uses it verbatim) and to their own
 * overlay `<svg viewBox=...>`, guaranteeing the two layers stay aligned.
 *
 * ## Label reserve (issue #1021)
 *
 * Tick labels render at `font-size: calc(12px / scale)` so they keep a
 * constant on-screen size while the ring scales. Their footprint in SVG units
 * is therefore `px / scale`, where `scale = containerPx / viewBoxSide` — the
 * smaller the instrument, the more SVG units a label needs. The frame solves
 * the resulting equation in closed form:
 *
 * ```
 * side/2 >= (OUTER_RING_RADIUS + LABEL_RADIAL_PAD_UNITS) + P/scale
 * scale   = containerPx / side
 * => side = 2 * (OUTER_RING_RADIUS + LABEL_RADIAL_PAD_UNITS) / (1 - 2P/containerPx)
 * ```
 *
 * where `P` is the label's pixel cost beyond the ring (anchor offsets + text
 * width + edge padding). The viewBox never shrinks below the legacy
 * `(176 + basePadding) * 2` box, so instruments without labels — or with
 * labels that already fit — render byte-identical to the pre-#1021 output.
 *
 * When the reserve would exceed `LABEL_RESERVE_MAX_FRACTION` of the box, the
 * frame reports `labelsHidden: true` and falls back to the base box; callers
 * must then strip tick label texts (graceful degradation instead of clipping,
 * mirroring the canvas charts).
 *
 * ## Equal circumference (`faceDiameter`)
 *
 * When `faceDiameter` (px) is given, the outer-ring diameter is pinned:
 * `scale = faceDiameter / 368`. The frame then reports `hostWidthPx` /
 * `hostHeightPx` so the host element can adopt a fixed intrinsic size, and
 * instruments sharing a `faceDiameter` value have identical ring
 * circumference regardless of label width or arc extent — the SVG counterpart
 * of `obc-donut-chart`'s fixed-height ⇒ fixed-circumference contract.
 */

// Keep in sync with watch.ts OUTER_RING_RADIUS (importing it would be circular).
const OUTER_RING_RADIUS = 368 / 2;
/** Legacy viewBox base: `side = (RADIAL_VIEWBOX_BASE + padding) * 2`. */
const RADIAL_VIEWBOX_BASE = 176;
/** Non-scaled part of the tickmark text radius pad (`3/scale + 3` in tickmark.ts). */
const LABEL_RADIAL_PAD_UNITS = 3;
/** Scaled label anchor offsets in px: `3/scale` textRadius pad + `6/scale` xOffset. */
const LABEL_ANCHOR_OFFSET_PX = 9;
/** Breathing room between the label's far edge and the viewBox edge, in px. */
const LABEL_EDGE_PAD_PX = 4;
/** Approximate digit advance at 12px font-instrument-label. */
export const DIGIT_WIDTH_PX = 7;
/** Compass NSWE label width assumed by label.ts (`labelWidth = 16`). */
export const NSWE_LABEL_WIDTH_PX = 16;
/**
 * North-arrow glyph allowance for outside-decor reserves (px). The arrow
 * renders regardless of `showLabels`, so consumers charge this portion
 * whenever the arrow sits outside the ring.
 */
export const NORTH_ARROW_WIDTH_PX = 16;
/**
 * Labels are dropped (not clipped) when their reserve would exceed this share
 * of the box. 0.45 makes a 4-digit gauge hide labels below a ~182px container
 * — near the canvas charts' fixed MIN_HEIGHT_WITH_LABELS = 192px threshold —
 * while 2-digit labels survive down to ~120px. Designers may later prefer a
 * fixed pixel threshold instead (see charthelpers/constants.ts).
 */
export const LABEL_RESERVE_MAX_FRACTION = 0.45;

/** Per-edge viewBox crops in percent (0–100), matching obc-watch `clip*`. */
export interface RadialClips {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface RadialFrameOptions {
  /** Legacy padding: the frame never shrinks below `(176 + basePadding) * 2`. */
  basePadding: number;
  /** Max label pixel width at 12px font; 0/undefined = no outside labels. */
  labelWidthPx?: number;
  /** Un-zoomed viewBox crops; ignored when `zoomToFitArc` is set. */
  clips?: RadialClips;
  /** Host client box in px; absent or zero ⇒ scale-1 fallback (first paint). */
  containerPx?: {width: number; height: number};
  /** Outer-ring diameter in px; pins scale for equal circumference (mode b). */
  faceDiameter?: number;
  zoomToFitArc?: boolean;
  /** Visible arc segments; required for the zoom path. */
  areas?: WatchArea[];
  /** Innermost visible radius (depends on WatchCircleType); zoom path only. */
  innerRadius?: number;
}

export interface RadialFrame extends ZoomToFitArcFrame {
  /** Px per SVG unit implied by container or faceDiameter (1 when unknown). */
  scale: number;
  /** SVG units added beyond the base geometry for labels (0 when none/hidden). */
  labelReserve: number;
  /** True when the label reserve exceeded the cap; callers strip tick texts. */
  labelsHidden: boolean;
  /** Fixed host size in px; defined only when `faceDiameter` is set. */
  hostWidthPx?: number;
  /** Fixed host size in px; defined only when `faceDiameter` is set. */
  hostHeightPx?: number;
}

/**
 * Measure the host's available box in px. Radial instrument hosts render
 * inline by default, so clientWidth/Height are often 0 — fall back to the
 * parent box, like obc-watch's getScale() has always done (issue #1032).
 */
export function measureContainerPx(host: HTMLElement): {
  width: number;
  height: number;
} {
  let width = host.clientWidth;
  let height = host.clientHeight;
  if (width === 0 || height === 0) {
    const box = host.parentElement?.getBoundingClientRect();
    if (box) {
      width = box.width;
      height = box.height;
    }
  }
  return {width, height};
}

/**
 * Apply/remove the fixed intrinsic host size a `faceDiameter` frame pins.
 * The hosts render inline by default, so a pinned size also needs
 * `display: block` for width/height to apply. Returns whether the size is
 * currently pinned; pass that back as `wasPinned` on the next call so an
 * unpinned host's own inline styles are never clobbered.
 */
export function applyPinnedHostSize(
  host: HTMLElement,
  frame: RadialFrame | undefined,
  wasPinned: boolean
): boolean {
  if (frame?.hostWidthPx !== undefined && frame.hostHeightPx !== undefined) {
    host.style.width = `${frame.hostWidthPx}px`;
    host.style.height = `${frame.hostHeightPx}px`;
    host.style.display = 'block';
    return true;
  }
  if (wasPinned) {
    host.style.removeProperty('width');
    host.style.removeProperty('height');
    host.style.removeProperty('display');
  }
  return false;
}

/**
 * Estimate the widest label's pixel width at the 12px instrument label font.
 */
export function estimateLabelWidthPx(
  texts: readonly (string | undefined)[]
): number {
  let maxChars = 0;
  for (const t of texts) {
    if (t !== undefined && t.length > maxChars) {
      maxChars = t.length;
    }
  }
  return maxChars * DIGIT_WIDTH_PX;
}

function clipFractions(clips?: RadialClips): {fx: number; fy: number} {
  if (!clips) {
    return {fx: 1, fy: 1};
  }
  const fx = 1 - (clips.left + clips.right) / 100;
  const fy = 1 - (clips.top + clips.bottom) / 100;
  return {fx: fx > 0 ? fx : 1, fy: fy > 0 ? fy : 1};
}

function buildViewBox(side: number, clips?: RadialClips): ZoomToFitArcFrame {
  const {fx, fy} = clipFractions(clips);
  const width = side * fx;
  const height = side * fy;
  const x = -side / 2 + (side * (clips?.left ?? 0)) / 100;
  const y = -side / 2 + (side * (clips?.top ?? 0)) / 100;
  return {
    x,
    y,
    width,
    height,
    viewBox: `${x} ${y} ${width} ${height}`,
    radiusOffset: 0,
  };
}

function pinnedScale(opts: RadialFrameOptions): number | undefined {
  if (opts.faceDiameter === undefined) {
    return undefined;
  }
  const scale = opts.faceDiameter / (2 * OUTER_RING_RADIUS);
  return Number.isFinite(scale) && scale > 0 ? scale : undefined;
}

/** Container px available for the full (un-clipped) square, or undefined. */
function effectiveContainer(
  opts: RadialFrameOptions,
  fx: number,
  fy: number
): number | undefined {
  const w = opts.containerPx?.width ?? 0;
  const h = opts.containerPx?.height ?? 0;
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
    return undefined;
  }
  return Math.min(w / fx, h / fy);
}

function containerScale(
  opts: RadialFrameOptions,
  frame: {width: number; height: number}
): number | undefined {
  const w = opts.containerPx?.width ?? 0;
  const h = opts.containerPx?.height ?? 0;
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
    return undefined;
  }
  const scale = Math.min(w / frame.width, h / frame.height);
  return Number.isFinite(scale) && scale > 0 ? scale : undefined;
}

function withHostPx(
  frame: ZoomToFitArcFrame,
  opts: RadialFrameOptions,
  scale: number,
  labelReserve: number,
  labelsHidden: boolean
): RadialFrame {
  const result: RadialFrame = {
    ...frame,
    scale,
    labelReserve,
    labelsHidden,
  };
  if (opts.faceDiameter !== undefined) {
    result.hostWidthPx = frame.width * scale;
    result.hostHeightPx = frame.height * scale;
  }
  return result;
}

/**
 * Compute the viewBox frame for a radial instrument, reserving width-aware
 * room for outside tick labels. See the module documentation for the model.
 */
export function computeRadialFrame(opts: RadialFrameOptions): RadialFrame {
  const labelWidthPx = opts.labelWidthPx ?? 0;
  const labelCostPx =
    labelWidthPx > 0
      ? LABEL_ANCHOR_OFFSET_PX + labelWidthPx + LABEL_EDGE_PAD_PX
      : 0;

  if (opts.zoomToFitArc && opts.areas && opts.areas.length > 0) {
    return computeZoomedFrame(opts, labelCostPx);
  }

  const baseSide = (RADIAL_VIEWBOX_BASE + opts.basePadding) * 2;
  const {fx, fy} = clipFractions(opts.clips);
  const labelSideAt = (scale: number): number =>
    2 * (OUTER_RING_RADIUS + LABEL_RADIAL_PAD_UNITS + labelCostPx / scale);

  let side = baseSide;
  let labelsHidden = false;

  if (labelCostPx > 0) {
    const pinned = pinnedScale(opts);
    if (pinned !== undefined) {
      const grown = Math.max(baseSide, labelSideAt(pinned));
      labelsHidden =
        (2 * (labelCostPx / pinned)) / grown > LABEL_RESERVE_MAX_FRACTION;
      side = labelsHidden ? baseSide : grown;
    } else {
      const container = effectiveContainer(opts, fx, fy);
      if (container === undefined) {
        side = Math.max(baseSide, labelSideAt(1));
      } else if ((2 * labelCostPx) / container > LABEL_RESERVE_MAX_FRACTION) {
        labelsHidden = true;
      } else {
        side = Math.max(
          baseSide,
          (2 * (OUTER_RING_RADIUS + LABEL_RADIAL_PAD_UNITS)) /
            (1 - (2 * labelCostPx) / container)
        );
      }
    }
  }

  const frame = buildViewBox(side, opts.clips);
  const scale = pinnedScale(opts) ?? containerScale(opts, frame) ?? 1;
  return withHostPx(frame, opts, scale, (side - baseSide) / 2, labelsHidden);
}

function computeZoomedFrame(
  opts: RadialFrameOptions,
  labelCostPx: number
): RadialFrame {
  let reserve = 0;
  let labelsHidden = false;
  let frame: ZoomToFitArcFrame = zoomFrameAt(opts, opts.basePadding);

  if (labelCostPx > 0) {
    // Fixed-point on the extension: the reserve depends on the scale, and the
    // scale on the frame size. Converges monotonically; two passes suffice.
    for (let i = 0; i < 2; i++) {
      const passScale = zoomedScale(opts, frame);
      const reserveUnits = labelCostPx / passScale;
      if (
        (2 * reserveUnits) / Math.max(frame.width, frame.height) >
        LABEL_RESERVE_MAX_FRACTION
      ) {
        labelsHidden = true;
        reserve = 0;
        frame = zoomFrameAt(opts, opts.basePadding);
        break;
      }
      reserve = reserveUnits;
      frame = zoomFrameAt(opts, opts.basePadding + reserve);
    }
  }

  const scale = zoomedScale(opts, frame);
  return withHostPx(
    frame,
    opts,
    scale,
    labelsHidden ? 0 : reserve,
    labelsHidden
  );
}

function zoomFrameAt(
  opts: RadialFrameOptions,
  extension: number
): ZoomToFitArcFrame {
  return computeZoomToFitArcFrame({
    areas: opts.areas!,
    outerRadius: OUTER_RING_RADIUS,
    innerRadius: opts.innerRadius ?? OUTER_RING_RADIUS,
    extension,
    targetSize: (RADIAL_VIEWBOX_BASE + extension) * 2,
  });
}

function zoomedScale(
  opts: RadialFrameOptions,
  frame: ZoomToFitArcFrame
): number {
  if (opts.faceDiameter !== undefined) {
    const scale =
      opts.faceDiameter / (2 * (OUTER_RING_RADIUS + frame.radiusOffset));
    if (Number.isFinite(scale) && scale > 0) {
      return scale;
    }
  }
  return containerScale(opts, frame) ?? 1;
}
