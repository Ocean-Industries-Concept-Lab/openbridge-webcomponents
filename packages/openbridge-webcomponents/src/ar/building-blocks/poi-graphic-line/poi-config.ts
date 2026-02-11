export enum POIStyle {
  Normal = 'normal',
  Enhanced = 'enhanced',
  Regular = 'regular',
  Selected = 'selected',
  Alarm = 'alarm',
  Caution = 'caution',
  Warning = 'warning',
  Route = 'route',
}

export enum POILineType {
  Regular = 'regular',
  Dashed = 'dashed',
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
  dashArray?: string;
  dashOffset?: number;
  strokeLinecap?: 'round' | 'butt' | 'square';
  dashOutlineAndShadow?: boolean;
}

export type POIStyleVariant =
  | POIStyle.Regular
  | POIStyle.Selected
  | POIStyle.Alarm
  | POIStyle.Caution
  | POIStyle.Warning
  | POIStyle.Route;

const REGULAR_STYLE: POILineParams = {
  lineColor: 'var(--overlay-element-active-color)',
  outlineColor: 'var(--element-disabled-color)',
  width: 6,
  lineWidth: 1,
  outlineWidth: 1,
  shadowAlpha: 0.8,
  dotStart: 2,
  lineEnd: 3,
  filterDimensions: {x: 0.5, y: 0.5, width: 3},
};

const ACTIVE_STYLE_BASE = {
  width: 8,
  lineWidth: 1.5,
  outlineWidth: 2,
  shadowAlpha: 0.2,
  dotStart: 0,
  lineEnd: 3,
  filterDimensions: {x: 0, y: 0, width: 4},
} satisfies Omit<POILineParams, 'lineColor' | 'outlineColor'>;

const DASHED_DEFAULTS = {
  dashArray: '1 3',
  dashOffset: 0,
  strokeLinecap: 'butt',
} satisfies Pick<POILineParams, 'dashArray' | 'dashOffset' | 'strokeLinecap'>;

const ROUTE_STYLE: POILineParams = {
  lineColor: 'var(--instrument-enhanced-secondary-color)',
  outlineColor: 'var(--overlay-element-active-color)',
  width: 8,
  lineWidth: 1.5,
  outlineWidth: 2,
  shadowAlpha: 0.2,
  dotStart: 0,
  lineEnd: 3,
  filterDimensions: {x: 0, y: 0, width: 4},
};

const NEUTRAL_DASHED_STYLE: POILineParams = {
  ...REGULAR_STYLE,
  ...DASHED_DEFAULTS,
};

const REGULAR_DASHED_STYLE: POILineParams = {
  ...NEUTRAL_DASHED_STYLE,
  dashOutlineAndShadow: true,
};

const SELECTED_DASHED_STYLE: POILineParams = {
  ...REGULAR_STYLE,
  lineColor: 'var(--overlay-element-active-color)',
  outlineColor: 'var(--element-active-color)',
  width: 8,
  lineWidth: 1,
  outlineWidth: 2,
  shadowAlpha: ACTIVE_STYLE_BASE.shadowAlpha,
  ...DASHED_DEFAULTS,
};

const ROUTE_DASHED_STYLE: POILineParams = {
  ...ROUTE_STYLE,
  lineWidth: 1,
  outlineWidth: 2,
  lineColor: 'var(--base-blue-500)',
  outlineColor: 'var(--base-blue-050)',
  dashArray: '4 3',
  dashOffset: 0,
  strokeLinecap: 'butt',
};

const STYLE_CONFIG: Record<
  POIStyleVariant,
  Record<POILineType, POILineParams>
> = {
  [POIStyle.Regular]: {
    [POILineType.Regular]: REGULAR_STYLE,
    [POILineType.Dashed]: REGULAR_DASHED_STYLE,
  },
  [POIStyle.Selected]: {
    [POILineType.Regular]: {
      lineColor: 'var(--overlay-element-active-color)',
      outlineColor: 'var(--element-active-color)',
      ...ACTIVE_STYLE_BASE,
    },
    [POILineType.Dashed]: SELECTED_DASHED_STYLE,
  },
  [POIStyle.Alarm]: {
    [POILineType.Regular]: {
      lineColor: 'var(--alert-alarm-color)',
      outlineColor: 'var(--on-alarm-color)',
      ...ACTIVE_STYLE_BASE,
    },
    [POILineType.Dashed]: REGULAR_DASHED_STYLE,
  },
  [POIStyle.Caution]: {
    [POILineType.Regular]: {
      lineColor: 'var(--alert-caution-color)',
      outlineColor: 'var(--alert-caution-outline-color)',
      ...ACTIVE_STYLE_BASE,
    },
    [POILineType.Dashed]: REGULAR_DASHED_STYLE,
  },
  [POIStyle.Warning]: {
    [POILineType.Regular]: {
      lineColor: 'var(--alert-warning-color)',
      outlineColor: 'var(--on-warning-color)',
      ...ACTIVE_STYLE_BASE,
    },
    [POILineType.Dashed]: REGULAR_DASHED_STYLE,
  },
  [POIStyle.Route]: {
    [POILineType.Regular]: ROUTE_STYLE,
    [POILineType.Dashed]: ROUTE_DASHED_STYLE,
  },
};

export function resolvePOIStyle(style: POIStyle | string): POIStyleVariant {
  switch (style) {
    case POIStyle.Enhanced:
    case POIStyle.Selected:
      return POIStyle.Selected;
    case POIStyle.Alarm:
      return POIStyle.Alarm;
    case POIStyle.Caution:
      return POIStyle.Caution;
    case POIStyle.Warning:
      return POIStyle.Warning;
    case POIStyle.Route:
      return POIStyle.Route;
    case POIStyle.Normal:
    case POIStyle.Regular:
    default:
      return POIStyle.Regular;
  }
}

export const POI_LINE_CONFIG: Record<POIStyle, POILineParams> = {
  [POIStyle.Normal]: STYLE_CONFIG[POIStyle.Regular][POILineType.Regular],
  [POIStyle.Enhanced]: STYLE_CONFIG[POIStyle.Selected][POILineType.Regular],
  [POIStyle.Regular]: STYLE_CONFIG[POIStyle.Regular][POILineType.Regular],
  [POIStyle.Selected]: STYLE_CONFIG[POIStyle.Selected][POILineType.Regular],
  [POIStyle.Alarm]: STYLE_CONFIG[POIStyle.Alarm][POILineType.Regular],
  [POIStyle.Caution]: STYLE_CONFIG[POIStyle.Caution][POILineType.Regular],
  [POIStyle.Warning]: STYLE_CONFIG[POIStyle.Warning][POILineType.Regular],
  [POIStyle.Route]: STYLE_CONFIG[POIStyle.Route][POILineType.Regular],
};

export function getPOILineConfig(
  style: POIStyle | string,
  lineType: POILineType | string = POILineType.Regular
): POILineParams {
  const resolvedStyle = resolvePOIStyle(style);
  const resolvedType =
    lineType === POILineType.Dashed ? POILineType.Dashed : POILineType.Regular;
  return STYLE_CONFIG[resolvedStyle][resolvedType];
}

export const POI_STYLE_OPTIONS: POIStyle[] = [
  POIStyle.Regular,
  POIStyle.Selected,
  POIStyle.Alarm,
  POIStyle.Caution,
  POIStyle.Warning,
  POIStyle.Route,
];

export const POI_LINE_TYPE_OPTIONS: POILineType[] = [
  POILineType.Regular,
  POILineType.Dashed,
];

export const POI_VISUAL_VARIANTS: Array<{
  style: POIStyle;
  type: POILineType;
}> = [
  {
    style: POIStyle.Regular,
    type: POILineType.Regular,
  },
  {
    style: POIStyle.Selected,
    type: POILineType.Regular,
  },
  {
    style: POIStyle.Alarm,
    type: POILineType.Regular,
  },
  {
    style: POIStyle.Warning,
    type: POILineType.Regular,
  },
  {
    style: POIStyle.Caution,
    type: POILineType.Regular,
  },
  {
    style: POIStyle.Route,
    type: POILineType.Regular,
  },
  {
    style: POIStyle.Regular,
    type: POILineType.Dashed,
  },
  {
    style: POIStyle.Selected,
    type: POILineType.Dashed,
  },
  {
    style: POIStyle.Alarm,
    type: POILineType.Dashed,
  },
  {
    style: POIStyle.Warning,
    type: POILineType.Dashed,
  },
  {
    style: POIStyle.Caution,
    type: POILineType.Dashed,
  },
  {
    style: POIStyle.Route,
    type: POILineType.Dashed,
  },
];
