export enum POIStyle {
  Normal = 'normal',
  Enhanced = 'enhanced',
}

export interface POILineParams {
  lineColor: string;
  outlineColor: string;
  width: number;
  lineWidth: number;
  outlineWidth: number;
  shadowAlpha: number;
  dotStart: number;
  lineEnd: number;
  filterDimensions: {x: number; y: number; width: number};
}

export const POI_LINE_CONFIG: Record<POIStyle, POILineParams> = {
  [POIStyle.Normal]: {
    lineColor: 'var(--element-active-inverted-color)',
    outlineColor: 'var(--element-disabled-color)',
    width: 4,
    lineWidth: 1,
    outlineWidth: 1,
    shadowAlpha: 0.8,
    dotStart: 2,
    lineEnd: 3,
    filterDimensions: {x: 0.5, y: 0.5, width: 3},
  },

  [POIStyle.Enhanced]: {
    lineColor: 'var(--instrument-enhanced-secondary-color)',
    outlineColor: 'var(--element-active-inverted-color)',
    width: 8,
    lineWidth: 1,
    outlineWidth: 2,
    shadowAlpha: 0.2,
    dotStart: 0,
    lineEnd: 3,
    filterDimensions: {x: 0, y: 0, width: 4},
  },
};
