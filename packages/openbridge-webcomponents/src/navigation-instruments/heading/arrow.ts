import {SVGTemplateResult} from 'lit';
import {Priority} from '../types.js';
import {
  CogArrowStyle,
  HdgArrowStyle,
  cogArrow,
  hdgArrow,
} from '../course-arrows/course-arrows.js';

/** @deprecated Use `HdgArrowStyle`/`CogArrowStyle` from `course-arrows/course-arrows.js` instead. */
export enum ArrowStyle {
  HDG = 'HDG',
  COG = 'COG',
}

/**
 * Center-anchored needle art for the heading instrument.
 * @deprecated Use `hdgArrow`/`cogArrow` from `course-arrows/course-arrows.js`
 * with the `needle` style instead.
 */
export function arrow(
  style: ArrowStyle,
  angle: number,
  priority: Priority = Priority.regular
): SVGTemplateResult | SVGTemplateResult[] {
  if (style === ArrowStyle.HDG) {
    return hdgArrow(HdgArrowStyle.needle, angle, priority);
  } else if (style === ArrowStyle.COG) {
    return cogArrow(CogArrowStyle.needle, angle, priority);
  } else {
    return [];
  }
}
