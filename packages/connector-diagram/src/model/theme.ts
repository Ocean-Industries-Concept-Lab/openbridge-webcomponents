import type {MediumColor, ThemeVars} from './types.js'

/**
 * Light-mode default theme — colour tokens from the Figma Palette variable
 * collection (see ThemeVars in types.ts for the token→variable mapping).
 */
export const DEFAULT_THEME: ThemeVars = {
  pipeOutlineColor: 'rgb(83,83,83)',
  pipeFillColor: 'rgb(255,255,255)',
  pipeOutlineInverted: 'rgb(142,142,142)',
  pipeFillInverted: 'rgb(205,205,205)',
  genericBorder: 'rgb(0,67,70)',
  genericBackground: 'rgb(128,202,205)',
  enhancedBorder: 'rgb(45,84,139)',
  enhancedBackground: 'rgb(93,143,213)',
  runningBorder: 'rgb(0,98,0)',
  runningBackground: 'rgb(57,162,52)',
  pipeDirectionHalo: 'rgb(247,247,247)',
  // Named medium colours for open pipes (medium-flow): background = the OB
  // day palette's --base-<family>-200, border = --base-<family>-600. These are
  // FALLBACKS for contexts without the OpenBridge stylesheet — live rendering
  // resolves the CSS variables instead (mediumColorsFromCss below) so palette
  // updates and theme switches apply without touching this table.
  mediumColors: {
    Neutral: {border: 'rgb(61,61,61)',   background: 'rgb(190,190,190)'},
    Enhanced: {border: 'rgb(45,84,139)', background: 'rgb(93,143,213)'},
    Blue:    {border: 'rgb(29,60,103)',  background: 'rgb(156,193,245)'},
    Cyan:    {border: 'rgb(0,65,91)',    background: 'rgb(130,199,230)'},
    Teal:    {border: 'rgb(0,67,70)',    background: 'rgb(128,202,205)'},
    Green:   {border: 'rgb(0,71,0)',     background: 'rgb(143,206,138)'},
    Yellow:  {border: 'rgb(72,58,0)',    background: 'rgb(202,187,121)'},
    Orange:  {border: 'rgb(91,49,0)',    background: 'rgb(230,176,129)'},
    Red:     {border: 'rgb(98,41,41)',   background: 'rgb(242,168,165)'},
    Purple:  {border: 'rgb(87,44,82)',   background: 'rgb(225,169,215)'},
    Indigo:  {border: 'rgb(63,51,101)',  background: 'rgb(190,179,242)'},
  },
}

/** Every medium colour, in the Figma mode-dropdown order (for toolbars). */
export const MEDIUM_COLORS: readonly MediumColor[] = [
  'Neutral',
  'Enhanced',
  'Blue',
  'Cyan',
  'Teal',
  'Green',
  'Yellow',
  'Orange',
  'Red',
  'Purple',
  'Indigo',
]

/** Figma colour-categorical mode → OB base-palette family in the CSS
 *  variables (`--base-<family>-…`). Names match 1:1 except Neutral (the CSS
 *  family is `gray`) and Green (no `--base-green-*` exists; `running` is the
 *  plain-green family — `mint` is the other candidate if this proves wrong).
 *  'Enhanced' is absent: it has no base family and resolves from the
 *  `--automation-medium-enhanced-*` pair instead. */
const MEDIUM_CSS_FAMILY: Record<Exclude<MediumColor, 'Enhanced'>, string> = {
  Neutral: 'gray',
  Blue: 'blue',
  Cyan: 'cyan',
  Teal: 'teal',
  Green: 'running',
  Yellow: 'yellow',
  Orange: 'orange',
  Red: 'red',
  Purple: 'purple',
  Indigo: 'indigo',
}

/** Reads one CSS custom property by name (e.g. `--base-teal-600`) and returns
 *  its value, or '' when unset. Hosts pass the OB webcomponents helper bound
 *  to an element in the themed document:
 *  `(name) => getCssVariableValue(hostEl, name)`. */
export type CssVarReader = (name: string) => string

/** The CSS custom-property pair carrying a medium colour — the ONE place that
 *  knows which variables back each colour. Categorical colours read their base
 *  family (`--base-<family>-200` background, `-600` border — `-500` in dusk,
 *  whose base scales run inverted); Enhanced has no base family and reads the
 *  dedicated `--automation-medium-enhanced-*` pair (palette-correct as-is, no
 *  dusk adjustment). Shared by mediumColorsFromCss and DOM hosts (toolbar
 *  swatches style with `var(<returned name>)`). */
export function mediumCssVars(
  color: MediumColor,
  obcTheme?: string | null
): {background: string; border: string} {
  if (color === 'Enhanced') {
    return {
      background: '--automation-medium-enhanced-background',
      border: '--automation-medium-enhanced-border',
    }
  }
  const family = MEDIUM_CSS_FAMILY[color]
  const borderStep = obcTheme === 'dusk' ? '500' : '600'
  return {background: `--base-${family}-200`, border: `--base-${family}-${borderStep}`}
}

/**
 * Resolve the medium colour pairs from the OpenBridge palette CSS variables
 * so pipes follow the active `data-obc-theme` palette (day/dusk/night/bright)
 * live instead of baking in hex values: background = `--base-<family>-200`,
 * border = `--base-<family>-600` — except the DUSK palette, whose base scales
 * run inverted (…-600 is light there), so its border reads `-500`.
 *
 * @param readVar  CSS variable reader — OB webcomponents'
 *                 `getCssVariableValue` bound to a host element.
 * @param obcTheme the active palette name — pass the root `data-obc-theme`
 *                 attribute value.
 *
 * Missing variables (no OB stylesheet loaded) fall back to DEFAULT_THEME's
 * day-palette values. Hosts should re-run this (and redraw) when
 * `data-obc-theme` changes — e.g. via a MutationObserver on <html>.
 */
export function mediumColorsFromCss(
  readVar: CssVarReader,
  obcTheme?: string | null
): ThemeVars['mediumColors'] {
  const out = {...DEFAULT_THEME.mediumColors}
  for (const color of MEDIUM_COLORS) {
    const vars = mediumCssVars(color, obcTheme)
    const background = (readVar(vars.background) ?? '').trim()
    const border = (readVar(vars.border) ?? '').trim()
    out[color] = {
      background: background || out[color].background,
      border: border || out[color].border,
    }
  }
  return out
}

/** ThemeVars token → the OpenBridge CSS custom property that carries its value
 *  (from the Figma `Color/Automation/*` variable collection). The webcomponents
 *  bundle re-publishes these per palette, so reading them makes the pipes follow
 *  the active `data-obc-theme` live — same idea as mediumColorsFromCss. The two
 *  `generic*` tokens have no dedicated automation variable (Generic == the Teal
 *  medium), so they resolve from the `--base-teal-*` family below, not here. */
const PIPE_CSS_VAR: Record<
  Exclude<keyof ThemeVars, 'mediumColors' | 'genericBorder' | 'genericBackground'>,
  string
> = {
  pipeOutlineColor: '--automation-pipe-tertiary-color',
  pipeFillColor: '--automation-pipe-primary-color',
  pipeOutlineInverted: '--automation-pipe-tertiary-inverted-color',
  pipeFillInverted: '--automation-pipe-primary-inverted-color',
  enhancedBorder: '--automation-medium-enhanced-border',
  enhancedBackground: '--automation-medium-enhanced-background',
  runningBorder: '--automation-medium-running-border',
  runningBackground: '--automation-medium-running-background',
  // The direction chevron's halo is a Border token, not an Automation one.
  pipeDirectionHalo: '--border-silhouette-color',
}

/**
 * Resolve the FULL theme — every pipe colour token, not just the medium pairs —
 * from the OpenBridge palette CSS variables, so open/empty/closed/enhanced/
 * running/generic pipes recolour with the active `data-obc-theme` palette
 * (day/dusk/night/bright) live instead of baking in the day-palette hex values.
 *
 * Each token reads its `--automation-*` custom property (PIPE_CSS_VAR above);
 * the generic (teal) pair and the named medium colours come from the base
 * palette families via mediumColorsFromCss (…-200 background, …-600 border,
 * …-500 in dusk). Any unset variable (no OB stylesheet loaded) falls back to
 * the matching DEFAULT_THEME value, so this is always safe to call.
 *
 * @param readVar  CSS variable reader — OB webcomponents'
 *                 `getCssVariableValue` bound to a host element.
 * @param obcTheme the active palette name — pass the root `data-obc-theme`
 *                 attribute value (only the medium/generic border step depends
 *                 on it; the automation tokens are palette-correct as read).
 *
 * Hosts should re-run this (and redraw) when `data-obc-theme` changes.
 */
export function themeFromCss(
  readVar: CssVarReader,
  obcTheme?: string | null
): ThemeVars {
  const out: ThemeVars = {...DEFAULT_THEME}
  for (const token of Object.keys(PIPE_CSS_VAR) as (keyof typeof PIPE_CSS_VAR)[]) {
    const value = (readVar(PIPE_CSS_VAR[token]) ?? '').trim()
    if (value) out[token] = value
  }
  const mediumColors = mediumColorsFromCss(readVar, obcTheme)
  out.mediumColors = mediumColors
  // Generic == the Teal medium pair (no dedicated automation variable).
  out.genericBackground = mediumColors.Teal.background
  out.genericBorder = mediumColors.Teal.border
  return out
}

// ---------------------------------------------------------------------------
// Zone + alert colours — for the background grouping boxes and the mini-map
// alert dots. Resolved from the OpenBridge palette CSS variables exactly like
// the pipe theme above (read the live custom property, fall back to the Figma
// day-palette raw value when unset), so zones and dots follow the active
// `data-obc-theme` without baking in hex values.
// ---------------------------------------------------------------------------

export interface ZoneTheme {
  fill: string
  border: string
}

export interface AlertDotColors {
  fill: string
  ring: string
}

/** Alert dot colours for the three mini-map severities (worst-wins in
 *  zoneStatuses). */
export interface AlertColors {
  alarm: AlertDotColors
  warning: AlertDotColors
  caution: AlertDotColors
}

/** OB custom properties carrying the zone box colours (confirmed present in the
 *  webcomponents bundle css). Day-palette raw values are the fallbacks. */
const ZONE_CSS_VAR = {
  fill: '--container-background-color',
  border: '--border-divider-color',
} as const

const ZONE_FALLBACK: ZoneTheme = {fill: '#f7f7f7', border: '#dddddd'}

/**
 * Resolve the zone box colours from the OpenBridge palette CSS variables — the
 * container background for the fill, the divider colour for the 1px border — so
 * zones recolour with the active `data-obc-theme` palette live. Any unset
 * variable (no OB stylesheet loaded) falls back to the Figma day-palette raw
 * value, so this is always safe to call.
 *
 * @param readVar CSS variable reader — OB webcomponents' `getCssVariableValue`
 *                bound to a host element.
 */
export function zoneThemeFromCss(readVar: CssVarReader): ZoneTheme {
  const fill = (readVar(ZONE_CSS_VAR.fill) ?? '').trim()
  const border = (readVar(ZONE_CSS_VAR.border) ?? '').trim()
  return {
    fill: fill || ZONE_FALLBACK.fill,
    border: border || ZONE_FALLBACK.border,
  }
}

/** OB custom properties carrying each alert severity's fill + outline (ring)
 *  colour (confirmed present in the webcomponents bundle css). Day-palette raw
 *  values are the fallbacks. */
const ALERT_CSS_VAR: Record<keyof AlertColors, {fill: string; ring: string}> = {
  alarm:   {fill: '--alert-alarm-color',   ring: '--alert-alarm-outline-color'},
  warning: {fill: '--alert-warning-color', ring: '--alert-warning-outline-color'},
  caution: {fill: '--alert-caution-color', ring: '--alert-caution-outline-color'},
}

const ALERT_FALLBACK: AlertColors = {
  alarm:   {fill: '#e30019', ring: '#ab0000'},
  warning: {fill: '#fe9413', ring: '#e96700'},
  caution: {fill: '#ffdb42', ring: '#b38700'},
}

/**
 * Resolve the three alert dot colour pairs (alarm / warning / caution) from the
 * OpenBridge palette CSS variables, so the mini-map dots follow the active
 * `data-obc-theme` palette live. Each severity reads its `--alert-*-color` for
 * the fill and `--alert-*-outline-color` for the ring; any unset variable falls
 * back to the Figma day-palette raw value, so this is always safe to call.
 *
 * @param readVar CSS variable reader — OB webcomponents' `getCssVariableValue`
 *                bound to a host element.
 */
export function alertColorsFromCss(readVar: CssVarReader): AlertColors {
  const out = {} as AlertColors
  for (const sev of Object.keys(ALERT_CSS_VAR) as (keyof AlertColors)[]) {
    const fill = (readVar(ALERT_CSS_VAR[sev].fill) ?? '').trim()
    const ring = (readVar(ALERT_CSS_VAR[sev].ring) ?? '').trim()
    out[sev] = {
      fill: fill || ALERT_FALLBACK[sev].fill,
      ring: ring || ALERT_FALLBACK[sev].ring,
    }
  }
  return out
}
