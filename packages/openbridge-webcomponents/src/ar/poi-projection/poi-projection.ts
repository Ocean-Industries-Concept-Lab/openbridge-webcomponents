/**
 * Media-projection helpers for POI overlays.
 *
 * Maps points from media pixel space (video/image natural resolution) to
 * rendered screen space, accounting for `cover`/`contain` letterboxing.
 * This is the same math `obc-poi-controller` applies to its
 * detections-driven targets, exported as pure functions so applications
 * that manage their own POI elements can project coordinates without
 * re-implementing the transform.
 *
 * ### Usage Guidelines
 * - Build a {@link MediaProjection} once per resize/metadata change via
 *   {@link computeMediaProjection}; reuse it for every point in a frame.
 * - `renderWidth`/`renderHeight` come from the media element's
 *   `getBoundingClientRect()`; `mediaWidth`/`mediaHeight` from
 *   `videoWidth`/`videoHeight` (video) or `naturalWidth`/`naturalHeight`
 *   (image).
 * - {@link projectPointToLayer} additionally converts a projected
 *   point into `obc-poi-data` layer coordinates (`x` center px,
 *   `y` line length from the layer's bottom anchor), given the layer's
 *   bottom offset inside the projection container.
 *
 * ### Fit modes
 * - `cover`: media fills the container; overflow is cropped.
 * - `contain`: media letterboxes inside the container.
 */

/** Fit behavior matching `obc-poi-controller`'s `PoiFitMode` values. */
export enum MediaFit {
  Cover = 'cover',
  Contain = 'contain',
}

/** Natural and rendered media dimensions plus the fit mode. */
export interface MediaProjectionInput {
  /** Media natural width in px (`videoWidth`/`naturalWidth`). */
  mediaWidth: number;
  /** Media natural height in px (`videoHeight`/`naturalHeight`). */
  mediaHeight: number;
  /** Rendered element width in px. */
  renderWidth: number;
  /** Rendered element height in px. */
  renderHeight: number;
  fit: MediaFit;
}

/** Resolved projection: uniform scale plus letterbox offsets. */
export interface MediaProjection {
  scale: number;
  /** Horizontal letterbox offset in rendered px (negative when cropped). */
  offsetX: number;
  /** Vertical letterbox offset in rendered px (negative when cropped). */
  offsetY: number;
  /** Scaled media content width in rendered px. */
  contentWidth: number;
  /** Scaled media content height in rendered px. */
  contentHeight: number;
}

/**
 * Compute the projection for the given dimensions, or `null` when any
 * dimension is non-finite or zero (media not measured yet).
 */
export function computeMediaProjection(
  input: MediaProjectionInput
): MediaProjection | null {
  const {mediaWidth, mediaHeight, renderWidth, renderHeight, fit} = input;
  if (
    !Number.isFinite(mediaWidth) ||
    !Number.isFinite(mediaHeight) ||
    !Number.isFinite(renderWidth) ||
    !Number.isFinite(renderHeight) ||
    mediaWidth === 0 ||
    mediaHeight === 0 ||
    renderWidth === 0 ||
    renderHeight === 0
  ) {
    return null;
  }

  const scale =
    fit === MediaFit.Cover
      ? Math.max(renderWidth / mediaWidth, renderHeight / mediaHeight)
      : Math.min(renderWidth / mediaWidth, renderHeight / mediaHeight);

  const contentWidth = mediaWidth * scale;
  const contentHeight = mediaHeight * scale;
  return {
    scale,
    offsetX: (renderWidth - contentWidth) / 2,
    offsetY: (renderHeight - contentHeight) / 2,
    contentWidth,
    contentHeight,
  };
}

/** Project a point from media pixel space into rendered space. */
export function projectPoint(
  projection: MediaProjection,
  x: number,
  y: number
): {x: number; y: number} {
  return {
    x: projection.offsetX + x * projection.scale,
    y: projection.offsetY + y * projection.scale,
  };
}

/**
 * Project a media-space anchor point into `obc-poi-data` layer
 * coordinates.
 *
 * `layerBottom` is the POI layer's bottom edge measured in the same
 * rendered coordinate space as the projection container (e.g.
 * `layerRect.bottom - containerRect.top`). The returned `y` is the
 * connector line length extending downward from the layer to the
 * target point, clamped to `0` (matches how `obc-poi-controller`
 * positions its detection targets).
 */
export function projectPointToLayer(
  projection: MediaProjection,
  x: number,
  y: number,
  layerBottom: number
): {x: number; y: number} {
  const projected = projectPoint(projection, x, y);
  return {
    x: projected.x,
    y: Math.max(0, projected.y - layerBottom),
  };
}

/** Scale a media-space box dimension into rendered px, or `null`. */
export function projectBoxSize(
  projection: MediaProjection,
  size: number | null | undefined
): number | null {
  if (typeof size !== 'number' || !Number.isFinite(size)) {
    return null;
  }
  return size * projection.scale;
}
