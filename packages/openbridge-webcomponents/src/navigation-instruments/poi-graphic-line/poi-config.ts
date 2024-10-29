export enum POIStyle {
  normal = 'normal',
  raised = 'raised',
  enhanced = 'enhanced',
  input = 'input',
  light = 'light',
  track = 'track',
}

export enum POIState {
  solid = 'solid',
  dashed = 'dashed',
}

export interface POIStyleConfig {
  path: (height: number, width: number) => string;
  vbHeight: (height: number) => number;
  lineWidth: number;
  outlineWidth: number;
  lineColor: string;
  outlineColor: string;
  filterAttributes: (height: number) => Record<string, number>;
  colorMatrixValues: string;
  linearGradient: (height: number) => Record<string, number>;
}

export const POI_STYLES: Record<POIStyle, POIStyleConfig> = {
  [POIStyle.normal]: {
    path: (height) => `M24 1L2 ${height + 1}`,
    vbHeight: (height) => height + 3,
    lineWidth: 1,
    outlineWidth: 1,
    lineColor: 'var(--element-active-inverted-color)',
    outlineColor: 'var(--element-disabled-color)',
    filterAttributes: (height) => ({
      x: 0.5,
      y: 0.5,
      width: 3,
      height: height + 3,
    }),
    colorMatrixValues: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0',
    linearGradient: (height) => ({x1: 2.5, y1: 1, x2: 2.5, y2: height + 1}),
  },
  [POIStyle.raised]: {
    path: (height, width) =>
      `M${width / 2} ${width / 2}L${width / 2} ${height + 2}`,
    vbHeight: (height) => height + 4,
    lineWidth: 2,
    outlineWidth: 4,
    lineColor: 'var(--element-active-inverted-color)',
    outlineColor: 'var(--border-outline-color)',
    filterAttributes: (height) => ({x: 0, y: 0, width: 6, height: height + 6}),
    colorMatrixValues: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0',
    linearGradient: (height) => ({x1: 2.5, y1: 1, x2: 2.5, y2: height + 1}),
  },
  [POIStyle.enhanced]: {
    path: (height, width) =>
      `M${width / 2} ${width / 2}L${width / 2} ${height + 2}`,
    vbHeight: (height) => height + 3,
    lineWidth: 1,
    outlineWidth: 2,
    lineColor: 'var(--instrument-enhanced-secondary-color)',
    outlineColor: 'var(--element-active-inverted-color)',
    filterAttributes: (height) => ({x: 0, y: 0, width: 4, height: height}),
    colorMatrixValues: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0',
    linearGradient: (height) => ({x1: 2.5, y1: 1, x2: 2.5, y2: height}),
  },
  [POIStyle.input]: {
    path: (height) => `M2 1L2 ${height + 1}`,
    vbHeight: (height) => height + 3,
    lineWidth: 1,
    outlineWidth: 2,
    lineColor: 'var(--instrument-enhanced-primary-color)',
    outlineColor: 'var(--element-active-inverted-color)',
    filterAttributes: (height) => ({x: 0, y: 0, width: 4, height: height + 4}),
    colorMatrixValues: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0',
    linearGradient: (height) => ({x1: 2.5, y1: 1, x2: 2.5, y2: height + 1}),
  },
  [POIStyle.light]: {
    path: (height) => `M2 1L2 ${height + 1}`,
    vbHeight: (height) => height + 3,
    lineWidth: 1,
    outlineWidth: 2,
    lineColor: 'var(--instrument-port-color)',
    outlineColor: 'var(--element-active-color)',
    filterAttributes: (height) => ({x: 0, y: 0, width: 4, height: height + 4}),
    colorMatrixValues: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0',
    linearGradient: (height) => ({x1: 2.5, y1: 1, x2: 2.5, y2: height + 1}),
  },
  [POIStyle.track]: {
    path: (height) => `M2 2L2 ${height + 2}`,
    vbHeight: (height) => height + 4,
    lineWidth: 2,
    outlineWidth: 4,
    lineColor: 'var(--instrument-enhanced-primary-color)',
    outlineColor: 'var(--element-active-inverted-color)',
    filterAttributes: (height) => ({x: 0, y: 0, width: 4, height: height + 4}),
    colorMatrixValues: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0',
    linearGradient: (height) => ({x1: 2.5, y1: 1, x2: 2.5, y2: height + 1}),
  },
};
