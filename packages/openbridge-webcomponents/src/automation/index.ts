export enum LineMedium {
  normal = 'normal',
  empty = 'empty',
  water = 'water',
  air = 'air',
}

export enum LineType {
  fluid = 'fluid',
  electric = 'electric',
  air = 'air',
  connector = 'connector',
}

export function lineColor(medium: LineMedium): {
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

export function lineWidth(lineType: LineType): number {
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
