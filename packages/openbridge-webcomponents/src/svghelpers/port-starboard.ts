/**
 * Shared vocabulary for the maritime PORT/STBD (red/green) color mode.
 *
 * The mode is **additive**: it recolors selected parts of an instrument that
 * would otherwise use the regular/enhanced (gray/blue) palette. Parts not
 * selected, the focus/touch interaction state, and every neutral-value
 * fallback keep their priority-derived colors.
 *
 * ## The shade rule
 *
 * Colors map by the element's **normal-mode role**, never by its name — the
 * word "bar" means the light track in the rate-of-turn family but the dark
 * value fill in the azimuth thruster:
 *
 * | Normal-mode color                           | PORT/STBD replacement                     |
 * |---------------------------------------------|-------------------------------------------|
 * | `--instrument-{enhanced,regular}-tertiary`  | `--instrument-{starboard,port}-secondary` |
 * | `--instrument-{enhanced,regular}-secondary` | `--instrument-{starboard,port}-primary`   |
 * | `--instrument-{enhanced,regular}-primary`   | `--instrument-{starboard,port}-primary`   |
 *
 * This reproduces the rule already used by `watch.getRotColors()`,
 * `watch-flat.getRotColors()`, `rate-of-turn`, `rot-linear` and `rot-sector`,
 * so every port/starboard visual in the library stays consistent.
 *
 * Only the four `--instrument-{starboard,port}-{primary,secondary}-color`
 * tokens are emitted; raw `--base-*` primitives are deliberately never used.
 *
 * @experimental
 */

/** Parts of an instrument that can take part in the PORT/STBD color mode. */
export enum PortStarboardElement {
  /** Half-area tints: the radial face inside the rings, or a linear track's halves. */
  face = 'face',
  /** Value fills and bands. */
  bar = 'bar',
  /** Needles and pointers. */
  needle = 'needle',
  /** Colored zero lines and on-indicators. */
  zeroLine = 'zeroLine',
  /** Fore / propeller arrow glyphs. */
  arrow = 'arrow',
  /** Setpoint markers. Opt-in — not in the defaults. */
  setpoint = 'setpoint',
}

/**
 * Everything except {@link PortStarboardElement.setpoint}, which stays opt-in
 * while the design question "should the setpoint follow?" is open.
 */
export const PORT_STARBOARD_DEFAULT_ELEMENTS: PortStarboardElement[] = [
  PortStarboardElement.face,
  PortStarboardElement.bar,
  PortStarboardElement.needle,
  PortStarboardElement.zeroLine,
  PortStarboardElement.arrow,
];

/** `1` = starboard/forward (green), `-1` = port/reverse (red), `0` = neutral. */
export type PortStarboardSign = -1 | 0 | 1;

/** Which token pair applies, per the shade rule in the module docs. */
export enum PortStarboardShade {
  /** Light band/track fills — maps to the `-secondary-color` tokens. */
  light = 'light',
  /** Dark on-top fills, needles and markers — maps to the `-primary-color` tokens. */
  dark = 'dark',
}

/**
 * Neutral color for dark on-top elements at sign 0. A blue needle at zero
 * would imply a direction, so the rate-of-turn family renders it gray; this
 * mode matches that.
 */
export const PORT_STARBOARD_NEUTRAL_DARK_COLOR =
  'var(--instrument-regular-secondary-color)';

/** Narrow a measured value to a {@link PortStarboardSign}, guarding non-finite input. */
export function portStarboardSignOf(
  value: number | undefined | null
): PortStarboardSign {
  if (value === undefined || value === null || !Number.isFinite(value)) {
    return 0;
  }
  if (value > 0) return 1;
  if (value < 0) return -1;
  return 0;
}

/** Whether `element` takes part, given the master switch and the opt-in list. */
export function hasPortStarboardElement(
  enabled: boolean,
  elements: PortStarboardElement[] | undefined,
  element: PortStarboardElement
): boolean {
  if (!enabled) return false;
  const list = Array.isArray(elements)
    ? elements
    : PORT_STARBOARD_DEFAULT_ELEMENTS;
  return list.includes(element);
}

/**
 * The shade rule. Returns `undefined` at sign 0 so callers fall back to their
 * own priority-derived color.
 */
export function portStarboardColor(
  sign: PortStarboardSign,
  shade: PortStarboardShade
): string | undefined {
  if (sign === 0) return undefined;
  const side = sign > 0 ? 'starboard' : 'port';
  const role = shade === PortStarboardShade.light ? 'secondary' : 'primary';
  return `var(--instrument-${side}-${role}-color)`;
}

/** Input for {@link resolvePortStarboardColor}. */
export interface ResolvePortStarboardColorConfig {
  /** The instrument's `portStarboard` master switch. */
  enabled: boolean;
  /** The instrument's `portStarboardElements` list. */
  elements: PortStarboardElement[] | undefined;
  /** Which part is being colored. */
  element: PortStarboardElement;
  /** Direction sign derived from the relevant value. */
  sign: PortStarboardSign;
  /** The element's normal-mode role. */
  shade: PortStarboardShade;
  /**
   * Render {@link PORT_STARBOARD_NEUTRAL_DARK_COLOR} at sign 0 instead of
   * falling back to the priority color. Only meaningful for dark elements.
   * @default false
   */
  neutralDark?: boolean;
}

/**
 * Resolve one element's color, or `undefined` when the caller should keep its
 * existing priority-derived color. This is the single entry point components
 * should use.
 */
export function resolvePortStarboardColor(
  config: ResolvePortStarboardColorConfig
): string | undefined {
  const {enabled, elements, element, sign, shade, neutralDark = false} = config;
  if (!hasPortStarboardElement(enabled, elements, element)) {
    return undefined;
  }
  const color = portStarboardColor(sign, shade);
  if (color) return color;
  return neutralDark && shade === PortStarboardShade.dark
    ? PORT_STARBOARD_NEUTRAL_DARK_COLOR
    : undefined;
}
