/**
 * Linear blending between two OpenBridge palettes.
 *
 * The palette tokens are generated into `variables.css` under flat
 * `:root[data-obc-theme="..."]` selectors and compiled into the single
 * `dist/openbridge.css` the demo loads. That stylesheet is same-origin, so the
 * token values are read back at runtime through the CSSOM rather than being
 * parsed or duplicated here.
 *
 * Only `rgb()` values are blended. Everything else in a theme block (px shadow
 * geometry, font weights, font-family strings and the two `url()` chevron data
 * URIs) is passed through untouched.
 */

export interface Rgb {
  r: number
  g: number
  b: number
  a: number
}

interface Hsl {
  h: number
  s: number
  l: number
  a: number
}

/**
 * Collect the custom properties a theme selector declares.
 *
 * Every matching rule is visited in document order and later declarations
 * overwrite earlier ones, which reproduces the CSS cascade. That matters twice:
 * `--on-primary-color` is declared three times inside each theme block, and
 * `manual.css` re-declares tokens that `variables.css` already set.
 */
export function readPaletteVars(selector: string): Map<string, string> {
  const vars = new Map<string, string>()

  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList
    try {
      rules = sheet.cssRules
    } catch {
      // Cross-origin stylesheet; not readable and not ours.
      continue
    }

    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule)) continue
      if (!rule.selectorText.includes(selector)) continue

      const style = rule.style
      for (let i = 0; i < style.length; i++) {
        const name = style.item(i)
        if (!name.startsWith('--')) continue
        vars.set(name, style.getPropertyValue(name).trim())
      }
    }
  }

  return vars
}

/**
 * Parse an `rgb()` colour. Accepts the 3-arg form and the legacy 4-arg form
 * with alpha (`rgb(0, 0, 0, 0.23)`) that the generated palette actually uses.
 * Returns null for anything that is not a colour, which is the caller's signal
 * to pass the value through unblended.
 */
export function parseRgb(value: string): Rgb | null {
  const match = /^rgba?\(([^)]+)\)$/i.exec(value.trim())
  if (!match) return null

  const parts = match[1].split(/[,/]/).map((p) => parseFloat(p.trim()))
  if (parts.length < 3 || parts.length > 4) return null
  if (parts.some((p) => Number.isNaN(p))) return null

  return { r: parts[0], g: parts[1], b: parts[2], a: parts.length === 4 ? parts[3] : 1 }
}

export function rgbToHsl({ r, g, b, a }: Rgb): Hsl {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255

  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const delta = max - min
  const l = (max + min) / 2

  if (delta === 0) {
    return { h: 0, s: 0, l, a }
  }

  const s = delta / (1 - Math.abs(2 * l - 1))

  let h: number
  if (max === rn) {
    h = 60 * (((gn - bn) / delta) % 6)
  } else if (max === gn) {
    h = 60 * ((bn - rn) / delta + 2)
  } else {
    h = 60 * ((rn - gn) / delta + 4)
  }
  if (h < 0) h += 360

  return { h, s, l, a }
}

export function hslToRgb({ h, s, l, a }: Hsl): Rgb {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const hp = (((h % 360) + 360) % 360) / 60
  const x = c * (1 - Math.abs((hp % 2) - 1))

  let r: number
  let g: number
  let b: number
  if (hp < 1) [r, g, b] = [c, x, 0]
  else if (hp < 2) [r, g, b] = [x, c, 0]
  else if (hp < 3) [r, g, b] = [0, c, x]
  else if (hp < 4) [r, g, b] = [0, x, c]
  else if (hp < 5) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]

  const m = l - c / 2
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255, a }
}

/**
 * Blend two colours in HSL space.
 *
 * Hue is interpolated along the shortest arc around the colour circle, so a
 * blend between hues near 0 and near 360 does not sweep the long way through
 * the whole spectrum. When one endpoint is achromatic (grey, black or white)
 * its hue is meaningless, so the other endpoint's hue is adopted to stop greys
 * drifting through an arbitrary colour on the way.
 */
export function blendHsl(from: Rgb, to: Rgb, t: number): Rgb {
  const a = rgbToHsl(from)
  const b = rgbToHsl(to)

  let ha = a.h
  let hb = b.h
  if (a.s === 0) ha = hb
  if (b.s === 0) hb = ha

  let delta = hb - ha
  if (delta > 180) delta -= 360
  if (delta < -180) delta += 360

  return hslToRgb({
    h: ha + delta * t,
    s: a.s + (b.s - a.s) * t,
    l: a.l + (b.l - a.l) * t,
    a: a.a + (b.a - a.a) * t
  })
}

function formatRgb({ r, g, b, a }: Rgb): string {
  const ch = (v: number) => Math.round(Math.min(255, Math.max(0, v)))
  const rgb = `${ch(r)}, ${ch(g)}, ${ch(b)}`
  // The generated palette carries float32 spew in its alpha values; round so
  // the emitted values stay readable.
  return a >= 1 ? `rgb(${rgb})` : `rgb(${rgb}, ${Math.round(a * 1000) / 1000})`
}

/**
 * Blend every token the two palettes share. Tokens whose values are not both
 * parseable colours are skipped entirely, so they keep resolving through the
 * normal cascade.
 */
export function computeBlend(
  from: Map<string, string>,
  to: Map<string, string>,
  t: number
): Map<string, string> {
  const blended = new Map<string, string>()

  for (const [name, fromValue] of from) {
    const toValue = to.get(name)
    if (toValue === undefined) continue

    const fromRgb = parseRgb(fromValue)
    const toRgb = parseRgb(toValue)
    if (!fromRgb || !toRgb) continue

    blended.set(name, formatRgb(blendHsl(fromRgb, toRgb, t)))
  }

  return blended
}
