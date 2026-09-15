import { computeBlend, readPaletteVars } from '@/utils/paletteBlend'

const DAY_SELECTOR = '[data-obc-theme="day"]'
const BRIGHT_SELECTOR = '[data-obc-theme="bright"]'

let palettes: { day: Map<string, string>; bright: Map<string, string> } | null = null

/**
 * Read both endpoint palettes once. Each block holds ~873 declarations, so
 * re-reading them on every slider tick would be wasteful. The stylesheet never
 * changes at runtime, so a module-level memo is safe.
 */
function getPalettes() {
  if (!palettes) {
    palettes = {
      day: readPaletteVars(DAY_SELECTOR),
      bright: readPaletteVars(BRIGHT_SELECTOR)
    }
  }
  return palettes
}

/** Custom properties currently written onto <html>, so they can be removed. */
const applied = new Set<string>()

function clearBlend() {
  const style = document.documentElement.style
  for (const name of applied) {
    style.removeProperty(name)
  }
  applied.clear()
}

/**
 * Apply a day -> bright blend to the document root.
 *
 * `blend` is a percentage: 0 is pure day, 100 is pure bright. At 0 the inline
 * properties are removed entirely rather than being set to the day values, so
 * the plain `data-obc-theme` palette governs again — inline styles on <html>
 * outrank every `:root[data-obc-theme=...]` rule, so leaving them in place
 * would pin the app to a light palette.
 *
 * While a blend is active the theme is pinned to day. Only colours are blended,
 * so without this the non-colour tokens (shadow geometry, the chevron icons)
 * would keep coming from whichever palette was selected, and the blend would
 * not start from the day palette its 0% endpoint claims.
 */
export function applyPaletteBlend(blend: number) {
  const t = Math.min(100, Math.max(0, blend)) / 100

  if (t === 0) {
    clearBlend()
    return
  }

  document.documentElement.setAttribute('data-obc-theme', 'day')

  const { day, bright } = getPalettes()
  const blended = computeBlend(day, bright, t)
  const style = document.documentElement.style

  // Drop properties that are no longer part of the blend before re-applying.
  for (const name of applied) {
    if (!blended.has(name)) style.removeProperty(name)
  }
  applied.clear()

  for (const [name, value] of blended) {
    style.setProperty(name, value)
    applied.add(name)
  }
}
