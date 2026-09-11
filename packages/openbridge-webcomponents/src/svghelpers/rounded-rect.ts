export interface RoundedRect {
  x: number;
  y: number;
  width: number;
  height: number;
  /** Corner radii in CSS order: top-left, top-right, bottom-right, bottom-left. */
  radii: [number, number, number, number];
}

/**
 * SVG path of a rectangle with per-corner radii, so a stroke can follow a
 * box whose corners are individually sharp (the alert frame's
 * `sharpEdge*` flags). Radii are clamped to half the shorter side.
 */
export function roundedRectPath({
  x,
  y,
  width,
  height,
  radii,
}: RoundedRect): string {
  const max = Math.min(width, height) / 2;
  const [tl, tr, br, bl] = radii.map((r) => Math.max(0, Math.min(r, max)));
  const right = x + width;
  const bottom = y + height;
  const arc = (r: number, endX: number, endY: number) =>
    r > 0 ? `A${r} ${r} 0 0 1 ${endX} ${endY}` : '';
  return [
    `M${x + tl} ${y}`,
    `H${right - tr}`,
    arc(tr, right, y + tr),
    `V${bottom - br}`,
    arc(br, right - br, bottom),
    `H${x + bl}`,
    arc(bl, x, bottom - bl),
    `V${y + tl}`,
    arc(tl, x + tl, y),
    'Z',
  ]
    .filter(Boolean)
    .join(' ');
}
