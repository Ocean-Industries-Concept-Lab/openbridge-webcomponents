export enum POIStyle {
  Normal = 'normal',
  Raised = 'raised',
  Enhanced = 'enhanced',
  Input = 'input',
  Light = 'light',
  Track = 'track',
}

export enum POIState {
  solid = 'solid',
  dashed = 'dashed',
}

export interface POIStyleConfig {
  lineColor: string;
  outlineColor: string;
}

export const POI_STYLES: Record<POIStyle, POIStyleConfig> = {
  [POIStyle.Normal]: {
    lineColor: 'var(--element-active-inverted-color)',
    outlineColor: 'var(--element-disabled-color)',
  },
  [POIStyle.Raised]: {
    lineColor: 'var(--element-active-inverted-color)',
    outlineColor: 'var(--border-outline-color)',
  },
  [POIStyle.Enhanced]: {
    lineColor: 'var(--instrument-enhanced-secondary-color)',
    outlineColor: 'var(--element-active-inverted-color)',
  },
  [POIStyle.Input]: {
    lineColor: 'var(--instrument-enhanced-primary-color)',
    outlineColor: 'var(--element-active-inverted-color)',
  },
  [POIStyle.Light]: {
    lineColor: 'var(--instrument-port-color)',
    outlineColor: 'var(--element-active-color)',
  },
  [POIStyle.Track]: {
    lineColor: 'var(--instrument-enhanced-primary-color)',
    outlineColor: 'var(--element-active-inverted-color)',
  },
};
