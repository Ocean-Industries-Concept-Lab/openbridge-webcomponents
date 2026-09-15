import type {PipeValue, PipeSize, ThemeVars, MediumColor} from '../model/types.js'
import {STROKE_WEIGHTS} from '../model/types.js'

export interface PipeStroke {
  /** Drawn first (wider) — the border/outline layer */
  outlineColor: string
  outlineWeight: number
  /** Drawn on top (narrower) — the fill/color layer. null for closed/closed-dash (single stroke) */
  fillColor: string | null
  fillWeight: number | null
  /** dash pattern for closed-dash, empty array otherwise */
  dashPattern: number[]
}

export function resolvePipeStroke(
  value: PipeValue,
  size: PipeSize,
  theme: ThemeVars,
  /** Colours the medium-flow pair; ignored for every other value. */
  mediumColor?: MediumColor
): PipeStroke {
  const weights = STROKE_WEIGHTS[size]
  const dash: number[] = []

  switch (value) {
    // closed / closed-dash are a single mid-grey stroke at the *fill* weight
    // (from Figma: colour #8E8E8E = pipeOutlineInverted, width = fill weight, no
    // outline layer). closed is solid; closed-dash is 4-on/4-off square dashes.
    case 'closed':
      return {
        outlineColor: theme.pipeOutlineInverted,
        outlineWeight: weights.fill,
        fillColor: null,
        fillWeight: null,
        dashPattern: dash,
      }
    case 'closed-dash':
      return {
        outlineColor: theme.pipeOutlineInverted,
        outlineWeight: weights.fill,
        fillColor: null,
        fillWeight: null,
        dashPattern: [weights.fill, weights.fill], // square dashes: length = gap = line width
      }
    case 'empty':
      return {
        outlineColor: theme.pipeOutlineInverted,
        outlineWeight: weights.outline,
        fillColor: theme.pipeFillInverted,
        fillWeight: weights.fill,
        dashPattern: dash,
      }
    case 'medium-flow': {
      // The medium colour picks the border/background pair; without one the
      // generic (teal) pair applies — same colours as mediumColors.Teal.
      const pair = mediumColor ? theme.mediumColors[mediumColor] : undefined
      return {
        outlineColor: pair?.border ?? theme.genericBorder,
        outlineWeight: weights.outline,
        fillColor: pair?.background ?? theme.genericBackground,
        fillWeight: weights.fill,
        dashPattern: dash,
      }
    }
    case 'enhanced':
      return {
        outlineColor: theme.enhancedBorder,
        outlineWeight: weights.outline,
        fillColor: theme.enhancedBackground,
        fillWeight: weights.fill,
        dashPattern: dash,
      }
    case 'running':
      return {
        outlineColor: theme.runningBorder,
        outlineWeight: weights.outline,
        fillColor: theme.runningBackground,
        fillWeight: weights.fill,
        dashPattern: dash,
      }
    // open-flow and open-generic intentionally share the grey-outline/white-fill
    // pair from the Figma design — they are distinct value states elsewhere
    // (semantics, not appearance) but resolve to the same stroke here.
    case 'open-flow':
    case 'open-generic':
    default:
      return {
        outlineColor: theme.pipeOutlineColor,
        outlineWeight: weights.outline,
        fillColor: theme.pipeFillColor,
        fillWeight: weights.fill,
        dashPattern: dash,
      }
  }
}
