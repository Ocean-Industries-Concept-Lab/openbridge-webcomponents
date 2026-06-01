import type {Plugin, Chart, ChartDataset} from 'chart.js';
import {OUTER_LABEL_CONFIG} from './constants.js';
import {getCssVariableValue} from './colors.js';

/**
 * Configuration for outer label plugin (arc and polar)
 */
interface OuterLabelConfig {
  /** Pre-formatted label strings (one per data segment/sector) */
  formattedLabels: string[];
  /** Index to hide for pie charts in 'sunburst' mode (e.g., active sunburst parent) */
  hideIndex?: number | null;
  /** For polar charts: rotation offset in radians */
  rotationOffset?: number;
  /** For polar charts: chart diameter (calculated from layout helper) */
  chartDiameter?: number;
  /** Chart type: 'arc' (pie/donut) or 'polar' */
  type?: 'arc' | 'polar';
}

/**
 * Calculate the sum of all values in a chart data array
 * @param data - Array of chart segments with label and value properties
 * @returns The sum of all numeric values, coercing invalid values to 0
 */
export function calculateSumTotal(
  data: Array<{label: string; value: number}>
): number {
  return (data ?? []).reduce((sum, d) => sum + Number(d.value || 0), 0);
}

/**
 * Draws an outer label on a chart at a specified anchor point, aligning the text based on the angle.
 * Handles quadrant and edge cases for optimal label placement around a circle or polar chart.
 *
 * @param ctx - The canvas 2D rendering context to draw on
 * @param text - The label text to render
 * @param middleAngle - The angle (in radians) at which to anchor the label, measured from chart center
 * @param anchorX - The x-coordinate of the anchor point for the label
 * @param anchorY - The y-coordinate of the anchor point for the label
 */
function drawOuterLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  middleAngle: number,
  anchorX: number,
  anchorY: number
) {
  const THRESHOLD = 5 * (Math.PI / 180); // 5 degrees in radians
  const normalizedAngle =
    ((middleAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

  let textX: number;
  let textY: number;

  // Top: 270° (3π/2) - bottom edge of text touches anchor
  if (Math.abs(normalizedAngle - Math.PI * 1.5) < THRESHOLD) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    textX = anchorX;
    textY = anchorY;
  }
  // Bottom: 90° (π/2) - top edge of text touches anchor
  else if (Math.abs(normalizedAngle - Math.PI * 0.5) < THRESHOLD) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    textX = anchorX;
    textY = anchorY;
  }
  // Right: 0° (or 360°) - left edge of text touches anchor
  else if (
    normalizedAngle < THRESHOLD ||
    normalizedAngle > Math.PI * 2 - THRESHOLD
  ) {
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    textX = anchorX;
    textY = anchorY;
  }
  // Left: 180° (π) - right edge of text touches anchor
  else if (Math.abs(normalizedAngle - Math.PI) < THRESHOLD) {
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    textX = anchorX;
    textY = anchorY;
  }
  // Quadrant 1: 0° to 90° (excluding special cases) - top-left corner touches anchor
  else if (
    normalizedAngle > THRESHOLD &&
    normalizedAngle < Math.PI * 0.5 - THRESHOLD
  ) {
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    textX = anchorX;
    textY = anchorY;
  }
  // Quadrant 2: 90° to 180° - top-right corner touches anchor
  else if (
    normalizedAngle > Math.PI * 0.5 + THRESHOLD &&
    normalizedAngle < Math.PI - THRESHOLD
  ) {
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    textX = anchorX;
    textY = anchorY;
  }
  // Quadrant 3: 180° to 270° - bottom-right corner touches anchor
  else if (
    normalizedAngle > Math.PI + THRESHOLD &&
    normalizedAngle < Math.PI * 1.5 - THRESHOLD
  ) {
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    textX = anchorX;
    textY = anchorY;
  }
  // Quadrant 4: 270° to 360° - bottom-left corner touches anchor
  else {
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    textX = anchorX;
    textY = anchorY;
  }

  ctx.fillText(text, textX, textY);
}

/**
 * Create a Chart.js plugin that renders outer labels for arc (pie/donut) and polar charts.
 * @param host - The chart component element (for CSS variable access)
 * @param options - Plugin configuration (type: 'arc' | 'polar')
 * @returns Chart.js plugin
 */
export function createArcOuterLabelPlugin(
  host: HTMLElement,
  options: OuterLabelConfig
): Plugin<'pie' | 'doughnut' | 'polarArea'> {
  return {
    id: 'outerLabels',
    afterDatasetsDraw: (chart: Chart<'pie' | 'doughnut' | 'polarArea'>) => {
      const ctx = chart.ctx;
      const fontFamily = getCssVariableValue(
        host,
        OUTER_LABEL_CONFIG.fontFamily
      );
      const fontWeight = getCssVariableValue(
        host,
        OUTER_LABEL_CONFIG.fontWeightVar
      );
      const fontSize = getCssVariableValue(
        host,
        OUTER_LABEL_CONFIG.fontSizeVar
      );
      const fontColor = getCssVariableValue(
        host,
        OUTER_LABEL_CONFIG.fontColorVar
      );

      ctx.save();
      ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
      ctx.fillStyle = fontColor;
      ctx.textBaseline = 'middle';

      // Arc (pie/donut) chart logic
      if (!options.type || options.type === 'arc') {
        const dataset = chart.data.datasets?.[0] as
          | ChartDataset<'pie' | 'doughnut', number[]>
          | undefined;
        const labels = chart.data.labels ?? [];
        if (!dataset) return;

        const meta = chart.getDatasetMeta(0);
        if (!meta?.data.length) return;

        const values = (Array.isArray(dataset.data) ? dataset.data : []) as (
          | number
          | null
          | undefined
        )[];

        meta.data.forEach((element, index) => {
          const arc = element as unknown as import('chart.js').ArcElement;
          const label = labels[index];

          if (
            options.hideIndex !== null &&
            options.hideIndex !== undefined &&
            index === options.hideIndex
          )
            return;
          if (!arc || label === 'Remaining') return;

          const rawValue = Number(values[index] ?? 0);
          if (!Number.isFinite(rawValue) || rawValue <= 0) return;

          const middleAngle = (arc.startAngle + arc.endAngle) / 2;
          const cosAngle = Math.cos(middleAngle);
          const sinAngle = Math.sin(middleAngle);

          // Calculate the radial anchor point (8px from circle edge), OUTER_LABEL_CONFIG.labelGap
          const anchorRadius = arc.outerRadius + OUTER_LABEL_CONFIG.labelGap;
          const anchorX = arc.x + cosAngle * anchorRadius;
          const anchorY = arc.y + sinAngle * anchorRadius;

          // Get pre-formatted label from array
          const text = options.formattedLabels[index] || '';

          drawOuterLabel(ctx, text, middleAngle, anchorX, anchorY);
        });
      }
      // Polar chart logic
      else if (options.type === 'polar') {
        // Get polar scale and center
        const chartAny = chart as unknown as {
          scales: {r?: {xCenter: number; yCenter: number; drawingArea: number}};
        };
        const scale = chartAny.scales.r;
        if (!scale) return;

        const centerX = scale.xCenter;
        const centerY = scale.yCenter;
        const chartRadius =
          (options.chartDiameter ?? scale.drawingArea * 2) / 2;

        const numSectors = options.formattedLabels.length;
        if (numSectors === 0) return;

        const anglePerSector = (Math.PI * 2) / numSectors;
        const rotationOffset = options.rotationOffset ?? 0;

        options.formattedLabels.forEach((label, i) => {
          const startAngle = i * anglePerSector + rotationOffset - Math.PI / 2;
          const endAngle = startAngle + anglePerSector;
          const middleAngle = (startAngle + endAngle) / 2;

          const cosAngle = Math.cos(middleAngle);
          const sinAngle = Math.sin(middleAngle);

          // Calculate the radial anchor point (8px from circle edge)
          const anchorRadius = chartRadius + OUTER_LABEL_CONFIG.labelGap;
          const anchorX = centerX + cosAngle * anchorRadius;
          const anchorY = centerY + sinAngle * anchorRadius;

          drawOuterLabel(ctx, label, middleAngle, anchorX, anchorY);
        });
      }

      ctx.restore();
    },
  };
}
