import {describe, expect, it} from 'vitest'
import {
  DEFAULT_THEME,
  MEDIUM_COLORS,
  mediumColorsFromCss,
  themeFromCss,
  zoneThemeFromCss,
  alertColorsFromCss,
} from '../theme.js'
import type {MediumColor} from '../types.js'

/** Reader stub over a fake stylesheet. */
const css = (vars: Record<string, string>) => (name: string) => vars[name] ?? ''

describe('mediumColorsFromCss — OB palette variables → medium colour pairs', () => {
  it('reads background from -200 and border from -600', () => {
    const out = mediumColorsFromCss(
      css({
        '--base-teal-200': 'rgb(128, 202, 205)',
        '--base-teal-600': 'rgb(0, 67, 70)',
      })
    )
    expect(out.Teal).toEqual({
      background: 'rgb(128, 202, 205)',
      border: 'rgb(0, 67, 70)',
    })
  })

  it('dusk palette reads the border from -500 instead of -600', () => {
    const out = mediumColorsFromCss(
      css({
        '--base-teal-200': 'rgb(38, 88, 88)',
        '--base-teal-500': 'rgb(81, 192, 192)',
        '--base-teal-600': 'rgb(143, 224, 223)',
      }),
      'dusk'
    )
    expect(out.Teal.border).toBe('rgb(81, 192, 192)')
    expect(out.Teal.background).toBe('rgb(38, 88, 88)')
  })

  it('maps Neutral to the gray family and Green to the running family', () => {
    const out = mediumColorsFromCss(
      css({
        '--base-gray-200': 'rgb(190, 190, 190)',
        '--base-gray-600': 'rgb(61, 61, 61)',
        '--base-running-200': 'rgb(143, 206, 138)',
        '--base-running-600': 'rgb(0, 71, 0)',
      })
    )
    expect(out.Neutral).toEqual({
      background: 'rgb(190, 190, 190)',
      border: 'rgb(61, 61, 61)',
    })
    expect(out.Green).toEqual({
      background: 'rgb(143, 206, 138)',
      border: 'rgb(0, 71, 0)',
    })
  })

  it('falls back to DEFAULT_THEME per colour when variables are unset', () => {
    const out = mediumColorsFromCss(css({'--base-red-200': 'rgb(1, 2, 3)'}))
    expect(out.Red.background).toBe('rgb(1, 2, 3)')
    expect(out.Red.border).toBe(DEFAULT_THEME.mediumColors.Red.border)
    expect(out.Blue).toEqual(DEFAULT_THEME.mediumColors.Blue)
  })

  it('covers every medium colour and never returns empty strings', () => {
    const out = mediumColorsFromCss(css({}))
    for (const c of MEDIUM_COLORS as MediumColor[]) {
      expect(out[c].background).toBeTruthy()
      expect(out[c].border).toBeTruthy()
    }
  })
})

describe('themeFromCss — OB automation variables → full pipe theme', () => {
  it('reads each pipe token from its --automation-* variable', () => {
    const out = themeFromCss(
      css({
        '--automation-pipe-tertiary-color': 'rgb(1, 1, 1)',
        '--automation-pipe-primary-color': 'rgb(2, 2, 2)',
        '--automation-pipe-tertiary-inverted-color': 'rgb(3, 3, 3)',
        '--automation-pipe-primary-inverted-color': 'rgb(4, 4, 4)',
        '--automation-medium-enhanced-border': 'rgb(5, 5, 5)',
        '--automation-medium-enhanced-background': 'rgb(6, 6, 6)',
        '--automation-medium-running-border': 'rgb(7, 7, 7)',
        '--automation-medium-running-background': 'rgb(8, 8, 8)',
        '--border-silhouette-color': 'rgb(9, 9, 9)',
      })
    )
    expect(out.pipeOutlineColor).toBe('rgb(1, 1, 1)')
    expect(out.pipeFillColor).toBe('rgb(2, 2, 2)')
    expect(out.pipeOutlineInverted).toBe('rgb(3, 3, 3)')
    expect(out.pipeFillInverted).toBe('rgb(4, 4, 4)')
    expect(out.enhancedBorder).toBe('rgb(5, 5, 5)')
    expect(out.enhancedBackground).toBe('rgb(6, 6, 6)')
    expect(out.runningBorder).toBe('rgb(7, 7, 7)')
    expect(out.runningBackground).toBe('rgb(8, 8, 8)')
    expect(out.pipeDirectionHalo).toBe('rgb(9, 9, 9)')
  })

  it('resolves the generic pair from the teal base family (== Teal medium)', () => {
    const out = themeFromCss(
      css({
        '--base-teal-200': 'rgb(128, 202, 205)',
        '--base-teal-600': 'rgb(0, 67, 70)',
      })
    )
    expect(out.genericBackground).toBe('rgb(128, 202, 205)')
    expect(out.genericBorder).toBe('rgb(0, 67, 70)')
    expect(out.genericBackground).toBe(out.mediumColors.Teal.background)
    expect(out.genericBorder).toBe(out.mediumColors.Teal.border)
  })

  it('carries the named medium pairs through (folds in mediumColorsFromCss)', () => {
    const out = themeFromCss(
      css({
        '--base-red-200': 'rgb(9, 9, 9)',
        '--base-red-600': 'rgb(10, 10, 10)',
      })
    )
    expect(out.mediumColors.Red).toEqual({
      background: 'rgb(9, 9, 9)',
      border: 'rgb(10, 10, 10)',
    })
  })

  it('falls back to DEFAULT_THEME for every unset variable', () => {
    const out = themeFromCss(css({}))
    expect(out.pipeOutlineColor).toBe(DEFAULT_THEME.pipeOutlineColor)
    expect(out.pipeFillColor).toBe(DEFAULT_THEME.pipeFillColor)
    expect(out.enhancedBorder).toBe(DEFAULT_THEME.enhancedBorder)
    expect(out.runningBackground).toBe(DEFAULT_THEME.runningBackground)
    expect(out.genericBorder).toBe(DEFAULT_THEME.genericBorder)
    expect(out.mediumColors.Blue).toEqual(DEFAULT_THEME.mediumColors.Blue)
  })

  it('applies the dusk border step to the generic (teal) pair', () => {
    const out = themeFromCss(
      css({
        '--base-teal-200': 'rgb(38, 88, 88)',
        '--base-teal-500': 'rgb(81, 192, 192)',
        '--base-teal-600': 'rgb(143, 224, 223)',
      }),
      'dusk'
    )
    expect(out.genericBorder).toBe('rgb(81, 192, 192)')
  })

  it('never leaves a token empty when nothing is set', () => {
    const out = themeFromCss(css({}))
    for (const [key, value] of Object.entries(out)) {
      if (key === 'mediumColors') continue
      expect(value).toBeTruthy()
    }
  })
})

describe('zoneThemeFromCss — container/divider variables → zone colours', () => {
  it('reads fill from --container-background-color and border from --border-divider-color', () => {
    const out = zoneThemeFromCss(
      css({
        '--container-background-color': 'rgb(247, 247, 247)',
        '--border-divider-color': 'rgb(221, 221, 221)',
      })
    )
    expect(out).toEqual({
      fill: 'rgb(247, 247, 247)',
      border: 'rgb(221, 221, 221)',
    })
  })

  it('falls back per token to the day-palette raw values when unset', () => {
    expect(zoneThemeFromCss(css({}))).toEqual({fill: '#f7f7f7', border: '#dddddd'})
  })

  it('mixes a set fill with a fallback border', () => {
    const out = zoneThemeFromCss(css({'--container-background-color': 'rgb(1, 2, 3)'}))
    expect(out.fill).toBe('rgb(1, 2, 3)')
    expect(out.border).toBe('#dddddd')
  })

  it('treats an empty-string read as unset', () => {
    const out = zoneThemeFromCss(css({'--container-background-color': '  ', '--border-divider-color': ''}))
    expect(out).toEqual({fill: '#f7f7f7', border: '#dddddd'})
  })
})

describe('alertColorsFromCss — alert variables → dot fill/ring pairs', () => {
  it('reads each severity fill + outline (ring) from its --alert-* variables', () => {
    const out = alertColorsFromCss(
      css({
        '--alert-alarm-color': 'rgb(227, 0, 25)',
        '--alert-alarm-outline-color': 'rgb(171, 0, 0)',
        '--alert-warning-color': 'rgb(254, 148, 19)',
        '--alert-warning-outline-color': 'rgb(233, 103, 0)',
        '--alert-caution-color': 'rgb(255, 219, 66)',
        '--alert-caution-outline-color': 'rgb(179, 135, 0)',
      })
    )
    expect(out.alarm).toEqual({fill: 'rgb(227, 0, 25)', ring: 'rgb(171, 0, 0)'})
    expect(out.warning).toEqual({fill: 'rgb(254, 148, 19)', ring: 'rgb(233, 103, 0)'})
    expect(out.caution).toEqual({fill: 'rgb(255, 219, 66)', ring: 'rgb(179, 135, 0)'})
  })

  it('falls back to the day-palette raw hex values per token when unset', () => {
    const out = alertColorsFromCss(css({}))
    expect(out.alarm).toEqual({fill: '#e30019', ring: '#ab0000'})
    expect(out.warning).toEqual({fill: '#fe9413', ring: '#e96700'})
    expect(out.caution).toEqual({fill: '#ffdb42', ring: '#b38700'})
  })

  it('mixes set and unset per token, treating empty reads as unset', () => {
    const out = alertColorsFromCss(css({'--alert-alarm-color': 'rgb(9, 9, 9)', '--alert-warning-outline-color': '  '}))
    expect(out.alarm.fill).toBe('rgb(9, 9, 9)')
    expect(out.alarm.ring).toBe('#ab0000')
    expect(out.warning.ring).toBe('#e96700')
  })

  it('never leaves any fill or ring empty', () => {
    const out = alertColorsFromCss(css({}))
    for (const sev of ['alarm', 'warning', 'caution'] as const) {
      expect(out[sev].fill).toBeTruthy()
      expect(out[sev].ring).toBeTruthy()
    }
  })
})
