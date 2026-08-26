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
 * Ring-anchored arrow-head art for the compass family.
 * @deprecated Use `hdgArrow`/`cogArrow` from `course-arrows/course-arrows.js`
 * with the `arrowHead` style instead.
 */
export function arrow(
  style: ArrowStyle,
  angle: number,
  priority: Priority = Priority.regular,
  radiusOffset = 0
): SVGTemplateResult | SVGTemplateResult[] {
  if (style === ArrowStyle.HDG) {
    return hdgArrow(HdgArrowStyle.arrowHead, angle, priority, radiusOffset);
  } else if (style === ArrowStyle.COG) {
    return cogArrow(CogArrowStyle.arrowHead, angle, priority, radiusOffset);
  } else {
    return [];
  }
}
