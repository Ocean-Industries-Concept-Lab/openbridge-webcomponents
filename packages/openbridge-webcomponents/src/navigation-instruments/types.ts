export enum Size {
  small = 's',
  medium = 'm',
  large = 'l',
}

export enum InstrumentState {
  inCommand = 'inCommand',
  active = 'active',
  loading = 'loading',
  off = 'off',
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
  outerLastChild = 'outerLastChild',
}
