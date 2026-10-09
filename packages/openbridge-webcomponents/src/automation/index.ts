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
  let innerColor = '--automation-connector-on-background-color';
  if (medium === LineMedium.empty) {
    // TODO(designer): which Connector role is an empty pipe? Nothing in the
    // palette names one; no-flow is the nearest.
    innerColor = '--automation-connector-no-flow-background-color';
  } else if (medium === LineMedium.water || medium === LineMedium.air) {
    innerColor = '--automation-fresh-water';
  }
  return {inner: innerColor, outer: '--automation-connector-on-border-color'};
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
