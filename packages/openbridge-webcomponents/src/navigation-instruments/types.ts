export enum Size {
  small = 's',
  medium = 'm',
  large = 'l',
}

export enum InstrumentState {
  active = 'active',
  loading = 'loading',
  off = 'off',
}

export enum Priority {
  regular = 'regular',
  enhanced = 'enhanced',
}

/**
 * Frame style for instruments and scales.
 * Affects visual appearance and may influence layout calculations.
 */
export enum FrameStyle {
  regular = 'regular',
  flat = 'flat',
  framed = 'framed',
  instrument = 'instrument',
}

/**
 * Border radius position for components in a layout.
 * Determines which corners receive rounded borders based on component position.
 */
export enum BorderRadiusPosition {
  innerFirstChild = 'innerFirstChild',
  middleChild = 'middleChild',
  middleRoundedChild = 'middleRoundedChild',
  outerLastChild = 'outerLastChild',
}
