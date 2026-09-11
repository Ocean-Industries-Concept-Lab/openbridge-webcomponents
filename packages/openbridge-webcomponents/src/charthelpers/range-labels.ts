/**
 * Min / max labels for charts below the label threshold: which values to
 * show and how much gutter their text needs. Pure; the chart measures on
 * its own canvas and draws with its own plugin.
 */
export interface RangeLabelFont {
  family: string;
  sizePx: number;
  weight: string;
}

/**
 * @param font - Family, size in px and weight of the label text
 * @returns The canvas `font` shorthand for that text
 */
export function rangeLabelFontString(font: RangeLabelFont): string {
  return `${font.weight} ${font.sizePx}px ${font.family}`;
}

/**
 * Chart.js' own line-height ratio, so the gutter matches its tick labels.
 *
 * @param font - The label font
 * @returns One text line in px
 */
export function rangeLabelLineHeight(font: RangeLabelFont): number {
  return Math.round(font.sizePx * 1.2);
}

/**
 * One decimal only when an end of the range needs it; both ends share it.
 *
 * @param value - The value to print
 * @param min - Lower end of the range the value belongs to
 * @param max - Upper end of the range
 * @returns The label text
 */
export function formatRangeValue(
  value: number,
  min: number,
  max: number
): string {
  const decimals = Number.isInteger(min) && Number.isInteger(max) ? 0 : 1;
  return value.toFixed(decimals);
}

/**
 * @param min - Lower end of the y range
 * @param max - Upper end of the y range
 * @returns `[min, 0, max]`, with 0 only strictly inside the range
 */
export function yRangeLabelValues(min: number, max: number): number[] {
  return min < 0 && max > 0 ? [min, 0, max] : [min, max];
}

export interface RangeLabelGutters {
  /** Room on the y-axis side: the widest label plus the gap. */
  side: number;
  /** Room below the plot: one line plus the gap. */
  bottom: number;
}

const SIDE_GAP = 8;
const BOTTOM_GAP = 4;

/**
 * The x labels sit in a band one line tall, so only their count matters;
 * their width is not measured.
 *
 * @param ctx - A 2d context to measure on; its font is restored afterwards
 * @param font - The label font
 * @param yTexts - Labels for the y side, empty when that side has none
 * @param xTexts - Labels for the bottom, empty when the x side has none
 * @returns Gutter sizes in px; 0 for a side without labels
 */
export function measureRangeLabelGutters(
  ctx: CanvasRenderingContext2D,
  font: RangeLabelFont,
  yTexts: string[],
  xTexts: string[]
): RangeLabelGutters {
  ctx.save();
  ctx.font = rangeLabelFontString(font);
  const widest = yTexts.reduce(
    (width, text) => Math.max(width, ctx.measureText(text).width),
    0
  );
  ctx.restore();
  return {
    side: yTexts.length ? Math.ceil(widest) + SIDE_GAP : 0,
    bottom: xTexts.length ? rangeLabelLineHeight(font) + BOTTOM_GAP : 0,
  };
}
