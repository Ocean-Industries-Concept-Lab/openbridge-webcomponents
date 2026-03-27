import {SVGTemplateResult} from 'lit';
import {renderRotDots, RotPosition} from '../rate-of-turn/rot-renderer.js';

function rot(
  color: string = 'var(--instrument-regular-secondary-color)',
  position: RotPosition = RotPosition.innerCircle
): SVGTemplateResult {
  return renderRotDots(color, position);
}

export {rot};
