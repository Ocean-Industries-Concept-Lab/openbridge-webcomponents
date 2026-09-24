import {SVGTemplateResult, svg, nothing} from 'lit';
import {degToRad} from '../../svghelpers/math.js';

/** Radius of the small circle marking the face centre. */
export const GRID_CENTER_CIRCLE_RADIUS = 12;

export interface ConcentricGridOptions {
  /** Radius of the outermost grid ring. */
  radius: number;
  /** Evenly spaced rings between the centre and `radius`. */
  divisions?: number;
  /** Radius of the circle marking the face centre; `0` hides it. */
  centerRadius?: number;
  /** Evenly spaced radial spokes, counted over the full circle; `0` hides them. */
  spokes?: number;
  /**
   * Whether the ring at `radius` is drawn. Instruments whose band edge already
   * sits there leave it off so the two strokes do not double up.
   */
  hasOuterRing?: boolean;
  /** Stroke for every line; defaults to the tertiary frame colour. */
  stroke?: string;
}

/**
 * Polar reference grid: evenly spaced rings, a centre circle and radial spokes.
 *
 * The design language draws the same face under several instruments — the
 * attitude plot, the skyplot and the movement plot all read a bearing off the
 * spokes and a magnitude off the rings — so the geometry lives here rather than
 * in any one of them. Angles follow the watch convention: 0° at the top,
 * clockwise.
 *
 * An even spoke count is emitted as diameters, half as many elements, so no
 * seam is left where two collinear rays would meet at the centre. An odd count
 * has no collinear pairs and is emitted as individual rays.
 */
export function concentricGrid({
  radius,
  divisions = 4,
  centerRadius = GRID_CENTER_CIRCLE_RADIUS,
  spokes = 4,
  hasOuterRing = true,
  stroke = 'var(--instrument-frame-tertiary-color)',
}: ConcentricGridOptions): SVGTemplateResult {
  const rings: SVGTemplateResult[] = [];
  const lastRing = hasOuterRing ? divisions : divisions - 1;
  for (let i = 1; i <= lastRing; i++) {
    rings.push(svg`
      <circle
        cx="0"
        cy="0"
        r=${(radius * i) / divisions}
        fill="none"
        stroke=${stroke}
        vector-effect="non-scaling-stroke"
      />
    `);
  }

  const paired = spokes % 2 === 0;
  const lines: SVGTemplateResult[] = [];
  for (let i = 0; i < (paired ? spokes / 2 : spokes); i++) {
    const rad = degToRad((i * 360) / spokes);
    const x = radius * Math.sin(rad);
    const y = -radius * Math.cos(rad);
    lines.push(svg`
      <line
        x1=${paired ? -x : 0}
        y1=${paired ? -y : 0}
        x2=${x}
        y2=${y}
        stroke=${stroke}
        vector-effect="non-scaling-stroke"
      />
    `);
  }

  return svg`
    ${rings}
    ${
      centerRadius > 0
        ? svg`
          <circle
            cx="0"
            cy="0"
            r=${centerRadius}
            fill="none"
            stroke=${stroke}
            vector-effect="non-scaling-stroke"
          />
        `
        : nothing
    }
    ${lines}
  `;
}
