import {LineType, lineWidth} from '../index.js';

/** Edge of a transmitter's chip that the leader line attaches to. */
export enum TransmitterOrientation {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

/** Half the line's stroke width, so the leader line starts on the line's edge. */
export function transmitterLeaderOffset(
  lineType: LineType | undefined
): number {
  return lineType === undefined ? 0 : lineWidth(lineType) / 2;
}
