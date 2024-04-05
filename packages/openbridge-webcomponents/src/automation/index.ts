export enum LineMedium {
  normal = 'normal',
  empty = 'empty',
  water = 'water',
  air = 'air',
}
export type LineMediumType = keyof typeof LineMedium;

export enum LineType {
  fluid = 'fluid',
  electric = 'electric',
  air = 'air',
  connector = 'connector',
}
export type LineTypeType = keyof typeof LineType;

export function lineColor(medium: LineMediumType): {
  inner: string;
  outer: string;
} {
  let innerColor = '--automation-pipe-primary-color';
  if (medium === LineMedium.empty) {
    innerColor = '--automation-pipe-primary-inverted-color';
  } else if (medium === LineMedium.water || medium === LineMedium.air) {
    innerColor = '--automation-fresh-water';
  }
  return {inner: innerColor, outer: '--automation-pipe-tertiary-color'};
}

export function lineWidth(lineType: LineTypeType): number {
  if (lineType === LineType.electric) {
    return 2;
  } else if (lineType === LineType.connector) {
    return 1;
  } else if (lineType === LineType.fluid) {
    return 4;
  } else if (lineType === LineType.air) {
    return 10;
  }
  throw new Error('Unknown line type');
}
