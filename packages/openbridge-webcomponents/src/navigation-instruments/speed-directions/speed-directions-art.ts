import {svg, nothing, SVGTemplateResult} from 'lit';
import {
  CHEVRON_PATHS,
  renderChevronBand,
} from '../speed-arrows/speed-arrows-art.js';
import {
  BAR_WIDTH,
  AXIS_LINE_HALF,
  CellSpec,
} from './speed-directions-geometry.js';

const ACTIVE_FILL = 'var(--instrument-enhanced-secondary-color)';
const ART_STROKE = 'var(--instrument-frame-secondary-color)';
const INACTIVE_FILL = 'var(--instrument-frame-secondary-color)';
const INACTIVE_STROKE = 'var(--border-outline-color)';
const BAR_FILL = 'var(--instrument-enhanced-tertiary-color)';

function chevronBands(count: number, tinted: boolean): SVGTemplateResult[] {
  const bands: SVGTemplateResult[] = [];
  for (let i = 0; i < 3; i++) {
    if (tinted || i < count) {
      const active = i < count;
      bands.push(
        renderChevronBand(
          CHEVRON_PATHS[i],
          active ? ACTIVE_FILL : INACTIVE_FILL,
          active ? ART_STROKE : INACTIVE_STROKE
        )
      );
    }
  }
  return bands;
}

/* Bar-tip icons are top-anchored in their box (Figma "speed-arrows-low/
   medium" 48-box assets): the topmost band straddles the bar tip. */
function tipChevronBands(count: number): SVGTemplateResult[] {
  const bands: SVGTemplateResult[] = [];
  for (let i = 2; i > 2 - count; i--) {
    bands.push(renderChevronBand(CHEVRON_PATHS[i], ACTIVE_FILL, ART_STROKE));
  }
  return bands;
}

/** Chevron stack in a placement cell; the 96-box art is scaled to the cell. */
export function renderSpeedChevrons(
  cell: CellSpec,
  count: 0 | 1 | 2 | 3,
  tinted: boolean
): SVGTemplateResult | typeof nothing {
  if (count === 0 && !tinted) return nothing;
  const s = cell.size / 96;
  return svg`<g transform="translate(${cell.cx} ${cell.cy}) rotate(${cell.rotationDeg}) scale(${s}) translate(-48 -48)">${chevronBands(count, tinted)}</g>`;
}

/**
 * Proportional bar with chevron tip, drawn pointing "up" in local coordinates
 * from (0,0) and placed via translate+rotate. Tip chevron box (48) top edge
 * sits 12 units beyond the bar end (Figma extraction).
 */
export function renderSpeedBar(
  originX: number,
  originY: number,
  rotationDeg: number,
  lengthUnits: number,
  tipChevrons: 0 | 1 | 2 | 3
): SVGTemplateResult | typeof nothing {
  if (lengthUnits <= 0 || tipChevrons === 0) return nothing;
  const chevronScale = 48 / 96;
  return svg`<g transform="translate(${originX} ${originY}) rotate(${rotationDeg})">
    <rect x=${-BAR_WIDTH / 2} y=${-lengthUnits} width=${BAR_WIDTH} height=${lengthUnits} fill=${BAR_FILL} stroke=${ART_STROKE} vector-effect="non-scaling-stroke" stroke-linecap="square"></rect>
    <g transform="translate(-24 ${-lengthUnits - 12}) scale(${chevronScale})">${tipChevronBands(tipChevrons)}</g>
  </g>`;
}

/** Thin axis line through/parallel to the center, tick-mark tertiary color. */
export function renderAxisLine(
  orientation: 'h' | 'v',
  offset: number,
  half: number = AXIS_LINE_HALF
): SVGTemplateResult {
  return orientation === 'h'
    ? svg`<line x1=${-half} y1=${offset} x2=${half} y2=${offset} stroke="var(--instrument-tick-mark-tertiary-color)" stroke-linecap="round" vector-effect="non-scaling-stroke"></line>`
    : svg`<line x1=${offset} y1=${-half} x2=${offset} y2=${half} stroke="var(--instrument-tick-mark-tertiary-color)" stroke-linecap="round" vector-effect="non-scaling-stroke"></line>`;
}
