/**
 * Drawing helpers shared by the NORVAR symbol art.
 *
 * Not part of the OpenBridge standard. Based on NORVAR report 153/2007 from
 * Norsk Vann BA.
 *
 * Every helper returns a {@link Draw} that paints into a 24-unit viewBox
 * centred on 12,12. The strokes do not scale, so a line keeps its width in
 * the button and in the flat variant.
 *
 * @module
 */
import {svg, SVGTemplateResult} from 'lit';
import {Paint} from '../norvar-valve/norvar-valve-art.js';

/** The large and small pump triangles; the stopped fan draws the same shapes. */
export const PUMP_LARGE =
  'M5 3.80425V20.1958C5 20.9812 5.86395 21.46 6.53 21.0438L19.6432 12.848C20.2699 12.4563 20.2699 11.5437 19.6432 11.152L6.53 2.95625C5.86395 2.53997 5 3.01881 5 3.80425Z';
export const PUMP_SMALL =
  'M8 6.92066V17.0793C8 17.8884 8.91069 18.3625 9.57346 17.8986L16.8297 12.8192C17.3984 12.4211 17.3984 11.5789 16.8297 11.1808L9.57346 6.10142C8.91069 5.63748 8 6.11163 8 6.92066Z';

export type Draw = (paint: Paint) => SVGTemplateResult;

/** Paint of the `icon-silhouette` slot, which takes its colours from the button. */
export const SILHOUETTE_PAINT: Paint = {
  line: 'inherit',
  fill: 'inherit',
  border: 'inherit',
};

/** Draws several drawings on top of each other, first one at the bottom. */
export const layers =
  (...draws: Draw[]): Draw =>
  (paint) =>
    svg`${draws.map((draw) => draw(paint))}`;

/** A filled shape with a thin outline, the button drawing of most stations. */
export const solid =
  (d: string): Draw =>
  ({line, border}) =>
    svg`<path
      d=${d}
      fill=${line}
      stroke=${border}
      vector-effect="non-scaling-stroke"
    />`;

export const filled =
  (d: string): Draw =>
  ({line}) =>
    svg`<path d=${d} fill=${line} />`;

export const stroked =
  (d: string, width: number): Draw =>
  ({line}) =>
    svg`<path
      d=${d}
      stroke=${line}
      stroke-width=${width}
      stroke-linecap="round"
      vector-effect="non-scaling-stroke"
    />`;

/** As {@link stroked}, with round corners where the line turns. */
export const outlined =
  (d: string, width: number): Draw =>
  ({line}) =>
    svg`<path
      d=${d}
      stroke=${line}
      stroke-width=${width}
      stroke-linecap="round"
      stroke-linejoin="round"
      vector-effect="non-scaling-stroke"
    />`;

export const square =
  (size: number, radius: number): Draw =>
  ({line}) =>
    svg`<rect
      x=${12 - size / 2}
      y=${12 - size / 2}
      width=${size}
      height=${size}
      rx=${radius}
      fill=${line}
    />`;

/** A square outline of `size` units centred on the symbol. */
export const squareOutline =
  (size: number, radius: number, width: number): Draw =>
  ({line}) =>
    svg`<rect
      x=${12 - size / 2}
      y=${12 - size / 2}
      width=${size}
      height=${size}
      rx=${radius}
      stroke=${line}
      stroke-width=${width}
      vector-effect="non-scaling-stroke"
    />`;

/** A 16-unit square whose outline sits inside its size, as the design draws it. */
export const solidSquare: Draw = ({line, border}) =>
  svg`<rect
    x="4.5"
    y="4.5"
    width="15"
    height="15"
    rx="0.5"
    fill=${line}
    stroke=${border}
    vector-effect="non-scaling-stroke"
  />`;

/** A disc whose outline sits inside `radius`, as the design draws it. */
export const solidDot =
  (radius: number): Draw =>
  ({line, border}) =>
    svg`<circle
      cx="12"
      cy="12"
      r=${radius - 0.5}
      fill=${line}
      stroke=${border}
      vector-effect="non-scaling-stroke"
    />`;

export const dot =
  (radius: number): Draw =>
  ({line}) =>
    svg`<circle cx="12" cy="12" r=${radius} fill=${line} />`;

/** A disc in the line colour with an outline in the same colour, the hub of the dampers. */
export const hub =
  (radius: number): Draw =>
  ({line}) =>
    svg`<circle
      cx="12"
      cy="12"
      r=${radius}
      fill=${line}
      stroke=${line}
      vector-effect="non-scaling-stroke"
    />`;

export const ring =
  (radius: number, width: number): Draw =>
  ({line}) =>
    svg`<circle
      cx="12"
      cy="12"
      r=${radius}
      stroke=${line}
      stroke-width=${width}
      vector-effect="non-scaling-stroke"
    />`;

export const frameRect = (inset: number, radius: number): Draw => {
  return ({fill, border}) =>
    svg`<rect
      x=${inset}
      y=${inset}
      width=${24 - 2 * inset}
      height=${24 - 2 * inset}
      rx=${radius}
      fill=${fill}
      stroke=${border}
      vector-effect="non-scaling-stroke"
    />`;
};

export const roundFrame: Draw = ({fill, border}) =>
  svg`<circle
    cx="12"
    cy="12"
    r="11.5"
    fill=${fill}
    stroke=${border}
    vector-effect="non-scaling-stroke"
  />`;

/** Frame of the symbols with room around their mark. */
export const squareFrame = frameRect(1.5, 1.5);
/** Frame of the symbols whose mark runs into the corners. */
export const fullSquareFrame = frameRect(0.5, 0.5);
/** Frame of the map, HVAC and boiler symbols. */
export const mapFrame = frameRect(2, 2);
