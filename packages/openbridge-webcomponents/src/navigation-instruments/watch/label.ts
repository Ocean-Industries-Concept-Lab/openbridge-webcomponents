import {svg, SVGTemplateResult} from 'lit-html';

export interface RenderLabelsOptions {
  scale: number;
  rotation: number | undefined;
  /** When true, labels are placed inside the inner ring. */
  inside?: boolean;
  /** Inner ring radius used for inside label positioning (default: OUTER_RING_RADIUS). */
  innerRadius?: number;
  /** When true, always include the "N" label regardless of scale/inside heuristic. */
  includeNorth?: boolean;
  /**
   * Inside placement only: anchor the px-fixed label box flush against the
   * inner ring (`innerRadius - (labelWidth/2)/scale`) instead of the legacy
   * `gap/scale + labelWidth/2` offset, whose unit-fixed half-width lets the
   * labels drift toward the centre as the instrument shrinks. Matches the
   * outside placement, which is already flush against the outer band edge.
   */
  insideFlush?: boolean;
}

/** Position data for a single compass label. */
export interface LabelPosition {
  label: string;
  x: number;
  y: number;
}

/**
 * Computes the centre positions for NSEW compass labels.
 *
 * These positions are used both for rendering the labels themselves
 * and for building a crosshair knockout mask so the crosshair doesn't
 * bleed through the text.
 */
export function getLabelPositions(opts: {
  scale: number;
  inside: boolean;
  innerRadius: number;
  /** When true, always include the "N" label regardless of scale/inside heuristic. */
  includeNorth?: boolean;
  /** See {@link RenderLabelsOptions.insideFlush}. */
  insideFlush?: boolean;
}): LabelPosition[] {
  const {scale, inside, innerRadius, includeNorth, insideFlush} = opts;
  const labelWidth = 16;
  const gap = 8;
  const outerRadius = 368 / 2;

  const insideOffset = insideFlush
    ? innerRadius - labelWidth / 2 / scale
    : innerRadius - gap / scale - labelWidth / 2;
  const offset = (dir: number) =>
    dir * (inside ? insideOffset : outerRadius + gap / scale + labelWidth / 2);

  const positions: LabelPosition[] = [
    {label: 'E', x: offset(1), y: 0},
    {label: 'S', x: 0, y: offset(1)},
    {label: 'W', x: offset(-1), y: 0},
  ];

  // Include "N" as a text label when:
  // - explicitly requested (includeNorth === true), e.g. when northArrow is off
  // - at small scales where the decorative north arrow lacks the "N" glyph
  // - when inside, where the north arrow is a compact triangle without "N"
  const isSmall = scale < 0.58;
  if (includeNorth || isSmall || inside) {
    positions.push({label: 'N', x: 0, y: offset(-1)});
  }

  return positions;
}

/**
 * Renders the compass NSEW text labels (without the north arrow).
 *
 * When `inside` is false (default), labels sit outside the outer ring.
 * When `inside` is true, labels are positioned inside the ring.
 *
 * At small scales (< 0.58, roughly < 292 px), an "N" label is added
 * since the decorative north arrow is replaced by a compact triangle
 * that doesn't contain a letter.
 */
export function renderLabels(
  scaleOrOpts: number | RenderLabelsOptions,
  rotation?: number | undefined
): SVGTemplateResult {
  // Support both old positional signature and new options-object signature
  let scale: number;
  let rot: number | undefined;
  let inside: boolean;
  let innerRadius: number;
  let includeNorth: boolean | undefined;
  let insideFlush: boolean | undefined;
  if (typeof scaleOrOpts === 'number') {
    scale = scaleOrOpts;
    rot = rotation;
    inside = false;
    innerRadius = 368 / 2;
  } else {
    scale = scaleOrOpts.scale;
    rot = scaleOrOpts.rotation;
    inside = scaleOrOpts.inside ?? false;
    innerRadius = scaleOrOpts.innerRadius ?? 368 / 2;
    includeNorth = scaleOrOpts.includeNorth;
    insideFlush = scaleOrOpts.insideFlush;
  }

  const positions = getLabelPositions({
    scale,
    inside,
    innerRadius,
    includeNorth,
    insideFlush,
  });

  return svg`
    ${positions.map(
      (l) => svg`
        <text
          x="${l.x}"
          y="${l.y}"
          class="label"
          transform="rotate(${-(rot ?? 0)})"
          transform-origin="${l.x} ${l.y}"
        >
          ${l.label}
        </text>
      `
    )}
  `;
}

export interface RenderNorthMarkerOptions {
  scale: number;
  rotation: number | undefined;
}

/**
 * North-marker triangle copied from Figma. Own 384×408.963 canvas: the ring
 * box (384×384, r=192) starts at y=24.963 and the "N" label centre sits at
 * (192, 16.963) — 8 units above the ring box, inside the triangle.
 */
const NORTH_MARKER_PATH =
  'M212.597 22.5019C213.808 23.8852 212.665 26.0529 210.836 25.8748C204.639 25.2715 198.356 24.9628 192 24.9628C185.645 24.9628 179.362 25.2715 173.165 25.8748C171.336 26.0529 170.193 23.8852 171.404 22.502L190.495 0.68299C191.292 -0.227664 192.709 -0.227663 193.506 0.682991L212.597 22.5019Z';

/**
 * Renders the compact north marker used by heading-up watch faces: a small
 * triangle sitting on the outer ring with an "N" on top of it, at the same
 * radius as the outside NSEW labels (so it covers the plain top label
 * position). The triangle rotates with the compass card while the "N"
 * counter-rotates to stay upright, like the other labels.
 *
 * Both parts are px-fixed like the outside labels: the triangle is anchored
 * to the label position and scaled by `0.75 / scale` (the design's native
 * px-per-unit density), so the letter stays inside the triangle at any size.
 */
export function renderNorthMarker(
  opts: RenderNorthMarkerOptions
): SVGTemplateResult {
  const {scale, rotation: rot} = opts;
  // Keep in sync with getLabelPositions(): outside label centre radius.
  const labelY = -(368 / 2 + 8 / scale + 16 / 2);
  return svg`
    <g transform="translate(0, ${labelY}) scale(${0.75 / scale}) translate(-192, -16.963)">
      <path d=${NORTH_MARKER_PATH} fill="var(--instrument-tick-mark-secondary-color)"/>
    </g>
    <text
      x="0"
      y="${labelY}"
      class="label north-marker"
      transform="rotate(${-(rot ?? 0)})"
      transform-origin="0 ${labelY}"
    >
      N
    </text>
  `;
}

export interface RenderNorthArrowOptions {
  scale: number;
  rotation: number | undefined;
  /** When true, the arrow is placed inside the outer ring. */
  inside?: boolean;
}

/**
 * Renders the north arrow indicator for compass instruments.
 *
 * - **Outside (default)**: Large decorative triangle above the ring with an
 *   "N" glyph overlaid on the ring edge. At small scales (< 0.58), falls
 *   back to a compact triangle at the ring boundary.
 * - **Inside**: Small triangle at the outer ring boundary pointing inward
 *   (same as the watch `northArrow` indicator). At small scales, uses the
 *   same compact triangle, positioned inside.
 */
export function renderNorthArrow(
  opts: RenderNorthArrowOptions
): SVGTemplateResult {
  const {scale, rotation: rot, inside = false} = opts;
  const radius: number = 368 / 2;
  const isSmall = scale < 0.58;

  if (isSmall) {
    if (inside) {
      // Compact triangle just inside the outer ring
      return svg`
        <g transform="translate(0, ${-radius})">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M-17.8457 24.984 0 0 17.8458 24.984C11.9868 24.3338 6.0324 24 0 24-6.0323 24-11.9867 24.3338-17.8457 24.984Z"
            fill="var(--instrument-frame-tertiary-color)"/>
        </g>`;
    } else {
      // Compact triangle just outside the outer ring
      return svg`
        <defs>
          <mask id="circleMask">
            <rect x="-${radius}" y="-${radius}" width="${radius * 2}" height="${radius * 2}" fill="black"/>
            <circle cx="0" cy="0" r="${radius}" fill="white"/>
          </mask>
        </defs>
        <g mask="url(#circleMask)" transform="translate(0, ${-radius})">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M-17.8457 24.984 0 0 17.8458 24.984C11.9868 24.3338 6.0324 24 0 24-6.0323 24-11.9867 24.3338-17.8457 24.984Z"
            fill="var(--instrument-frame-tertiary-color)"/>
        </g>`;
    }
  }

  if (inside) {
    // Inside triangle at the ring boundary (same path as watch's old renderNorthArrow)
    return svg`
      <path transform="translate(-256, -256)" fill-rule="evenodd" clip-rule="evenodd"
        d="M238.152 96.9842L255.998 72L273.844 96.9839C267.985 96.3338 262.031 96 256 96C249.967 96 244.012 96.3339 238.152 96.9842Z"
        fill="var(--instrument-frame-tertiary-color)"/>
    `;
  }

  // Outside: large decorative triangle above the ring + "N" glyph
  return svg`
    <g transform="translate(0, ${(1 / scale - 1) * 188}) scale(${1 / scale})">
      <path transform="translate(-192, -224)"
        d="M 221.521 35.425 C 222.388 36.4644 222.821 36.9841 222.809 37.3627 C 222.8 37.6941 222.632 37.9916 222.354 38.1721 C 222.037 38.3783 221.361 38.2774 220.011 38.0756 A ${188 * scale} ${188 * scale} 0 0 0 163.989 38.0756 C 162.639 38.2774 161.964 38.3783 161.646 38.1721 C 161.368 37.9916 161.201 37.6941 161.191 37.3627 C 161.18 36.9841 161.613 36.4644 162.479 35.425 L 190.771 1.475 C 191.193 0.9685 191.404 0.7153 191.657 0.6229 C 191.879 0.5419 192.122 0.5419 192.343 0.6229 C 192.596 0.7153 192.807 0.9685 193.229 1.475 L 221.521 35.425 Z"
        fill="var(--instrument-tick-mark-secondary-color)"/>
    </g>

    <defs>
      <mask id="circleMask">
        <rect x="-${radius}" y="-${radius}" width="${radius * 2}" height="${radius * 2}" fill="black"/>
        <circle cx="0" cy="0" r="${radius}" fill="white"/>
      </mask>
    </defs>
    <g mask="url(#circleMask)" transform="translate(0, ${-(radius + 10 / scale + 30)}) scale(${0.75 / scale}, ${0.75 / scale}) rotate(${-(rot ?? 0)})" transform-origin="0 25">
      <path d="M5.003 29H2.091L-3.013 20.264H-3.077C-3.066 20.52-3.056 20.7813-3.045 21.048-3.034 21.3147-3.024 21.5867-3.013 21.864-2.992 22.1307-2.976 22.4027-2.965 22.68-2.954 22.9573-2.944 23.2347-2.933 23.512V29H-4.997V17.576H-2.101L2.987 26.232H3.035C3.024 25.9867 3.014 25.736 3.003 25.48 2.992 25.2133 2.982 24.952 2.971 24.696 2.971 24.4293 2.966 24.1627 2.955 23.896 2.944 23.6293 2.934 23.3627 2.923 23.096V17.576H5.003V29Z" fill="var(--element-active-inverted-color)"/>
    </g>
  `;
}
