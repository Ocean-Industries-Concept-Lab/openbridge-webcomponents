import {SVGTemplateResult, svg, nothing} from 'lit';
import {InstrumentState, Priority} from '../types.js';

/**
 * Renders the resultant force bar SVG for the wind propulsion instrument.
 *
 * The bar is a 48×280 rounded rectangle with a directional arrow above it.
 * Force (0–maxForce) fills the bar from top down proportional to the force value.
 *
 * All coordinates are in a 512×512 canvas with center at (256, 256).
 * The consumer wraps the output in `<g transform="translate(-256, -256)">`.
 *
 * @param force - Current force value (clamped to 0–maxForce).
 * @param maxForce - Maximum force value representing a full bar.
 * @param state - Instrument state (active, loading, off).
 * @param priority - Color priority (enhanced = blue, regular = gray).
 * @param maskId - Unique mask ID to avoid SVG ID collisions.
 */
export function renderForceBar(
  force: number,
  maxForce: number,
  state: InstrumentState,
  priority: Priority,
  maskId: string
): SVGTemplateResult | typeof nothing {
  const safeMax = Number.isFinite(maxForce) && maxForce > 0 ? maxForce : 100;
  const clampedForce = Number.isFinite(force)
    ? Math.max(0, Math.min(safeMax, force))
    : 0;

  const barX = 232;
  const barY = 116;
  const barWidth = 48;
  const barHeight = 280;

  const solidHeight = (clampedForce / safeMax) * barHeight;

  let containerFill: string;
  let containerStroke: string;
  let arrowFill: string;
  let arrowStroke: string;
  let fillColor: string;

  if (state === InstrumentState.off) {
    return nothing;
  } else if (state === InstrumentState.loading) {
    containerFill = 'var(--instrument-frame-secondary-color)';
    containerStroke = 'var(--instrument-frame-tertiary-color)';
    arrowFill = 'var(--instrument-frame-tertiary-color)';
    arrowStroke = 'var(--border-silhouette-color)';
    fillColor = 'transparent';
  } else if (priority === Priority.enhanced) {
    containerFill = 'var(--instrument-frame-secondary-color)';
    containerStroke = 'var(--instrument-frame-tertiary-color)';
    arrowFill = 'var(--instrument-enhanced-secondary-color)';
    arrowStroke = 'var(--border-silhouette-color)';
    fillColor = 'var(--instrument-enhanced-secondary-color)';
  } else {
    containerFill = 'var(--instrument-frame-secondary-color)';
    containerStroke = 'var(--instrument-frame-tertiary-color)';
    arrowFill = 'var(--instrument-regular-secondary-color)';
    arrowStroke = 'var(--border-silhouette-color)';
    fillColor = 'var(--instrument-regular-secondary-color)';
  }

  return svg`
    <rect x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" rx="8"
      fill="${containerFill}" stroke="${containerStroke}" vector-effect="non-scaling-stroke"/>
    <path d="M256.329 95.624L271.869 109.222C272.27 109.572 272.5 110.078 272.5 110.61C272.5 112.018 270.987 112.908 269.757 112.224L256.001 104.572L242.244 112.312C241.017 113.002 239.5 112.114 239.5 110.706C239.5 110.177 239.728 109.675 240.124 109.325L255.669 95.625L255.999 95.335L256.329 95.624Z"
      fill="${arrowFill}" stroke="${arrowStroke}" vector-effect="non-scaling-stroke"/>
    <mask id="${maskId}" style="mask-type:alpha" maskUnits="userSpaceOnUse"
      x="${barX - 1}" y="${barY - 1}" width="${barWidth + 2}" height="${barHeight + 2}">
      <rect x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" rx="8"
        fill="white" stroke="black"/>
    </mask>
    <g mask="url(#${maskId})">
      ${
        solidHeight > 0
          ? svg`<rect x="${barX}" y="${barY}" width="${barWidth}" height="${solidHeight}"
            fill="${fillColor}" stroke="${fillColor}" vector-effect="non-scaling-stroke"/>`
          : nothing
      }
    </g>
  `;
}
